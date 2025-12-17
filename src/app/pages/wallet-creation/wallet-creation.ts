import {Component, OnInit} from '@angular/core';
import {PageTitleService} from '../../core/services/page-title/page-title.service';
import {MatFormField, MatLabel} from '@angular/material/input';
import {ChartComponent} from '../../shared/components/chart/chart';
import {ChartDataPoint} from '../../core/models/chart-data-point';
import {MatSelect, MatOption} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WalletDto} from '../../core/dto/wallet-dto';
import {CryptoDto} from '../../core/dto/crypto-dto';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CommonModule} from '@angular/common';
import {CryptoService} from '../../core/services/crypto/crypto.service';

@Component({
    selector: 'app-wallet-creation',
    imports: [
        CommonModule,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        MatInputModule,
        MatButtonModule,
        ChartComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './wallet-creation.html',
    styleUrl: './wallet-creation.css',
})
export class WalletCreation implements OnInit {
    assetForm: FormGroup;

    wallet!: WalletDto;

    private holdings: Record<string, number> = {};
    private percentages: Record<string, number> = {};

    chartData: ChartDataPoint[] = [
        {amount: 0, time: new Date(2024, 0, 1)},
        {amount: 0, time: new Date(2024, 1, 1)},
        {amount: 0, time: new Date(2024, 2, 1)},
        {amount: 0, time: new Date(2024, 3, 1)},
        {amount: 0, time: new Date(2024, 4, 1)},
        {amount: 0, time: new Date(2024, 5, 1)},
        {amount: 0, time: new Date(2024, 6, 1)},
        {amount: 0, time: new Date(2024, 7, 1)},
        {amount: 0, time: new Date(2024, 8, 1)},
        {amount: 0, time: new Date(2024, 9, 1)},
        {amount: 0, time: new Date(2024, 10, 1)},
        {amount: 0, time: new Date(2024, 11, 1)}
    ];

    symbols?: String[];

    constructor(
        private _pageTitleService: PageTitleService,
        private _cryptoService: CryptoService,
        private _fb: FormBuilder,
        private _snackBar: MatSnackBar,
    ) {
        this.assetForm = this._fb.group({
            symbol: ['', Validators.required],
            quantity: ['', [Validators.required, Validators.min(0.00001)]]
        });

        this.wallet = {
            id: this.generateNumericId(),
            userId: 0,
            crypto: []
        };
    }

    ngOnInit() {
        this._pageTitleService.setPageTitle('Wallet Creation');
        this._cryptoService.getAllSymbols().subscribe(symbols => {
            this.symbols = symbols
        })
    }

    addAsset() {
        if (this.assetForm.valid) {
            const formValue = this.assetForm.value;
            const selectedSymbol = formValue.symbol;

            if (selectedSymbol) {
                const existingIndex = this.wallet.crypto.findIndex(c => c.symbol === selectedSymbol);

                const qty = parseFloat(formValue.quantity);

                if (existingIndex >= 0) {

                    this.holdings[selectedSymbol] = (this.holdings[selectedSymbol] || 0) + qty;
                    this.showMessage(`Quantity updated for ${selectedSymbol}`);
                } else {
                    this._cryptoService.getCryptoPrice(selectedSymbol).subscribe({
                        next: (price) => {
                            const newCrypto: CryptoDto = {
                                id: this.generateNumericId(),
                                symbol: selectedSymbol,
                                price: price.price
                            };
                            this.wallet.crypto.push(newCrypto);
                            this.holdings[selectedSymbol] = qty;
                            this.showMessage(`${selectedSymbol} added to your wallet`);
                            this.calculatePercentages();
                            this.assetForm.reset();
                        },
                        error: () => {
                            this.showMessage(`Impossible de récupérer le prix pour ${selectedSymbol}`, true);
                        }
                    });
                    return;
                }

                this.calculatePercentages();

                this.assetForm.reset();
            }
        } else {
            this.showMessage('Please complete every field', true);
        }
    }

    removeCrypto(symbol: string) {
        this.wallet.crypto = this.wallet.crypto.filter(c => c.symbol !== symbol);
        delete this.holdings[symbol];
        delete this.percentages[symbol];
        this.calculatePercentages();
        this.showMessage('Asset supprimé du portefeuille');
    }

    private calculatePercentages() {
        const totalValue = this.wallet.crypto.reduce((sum, crypto) => {
            const qty = this.holdings[crypto.symbol] || 0;
            const price = crypto.price ?? 0;
            return sum + qty * price;
        }, 0);

        this.wallet.crypto.forEach(crypto => {
            const qty = this.holdings[crypto.symbol] || 0;
            const price = crypto.price ?? 0;
            const value = qty * price;
            this.percentages[crypto.symbol] = totalValue > 0 ? Math.round((value / totalValue) * 10000) / 100 : 0;
        });
    }

    private generateNumericId(): number {
        return Math.floor(Math.random() * 1_000_000_000);
    }

    getQuantity(symbol: string): number {
        return this.holdings[symbol] || 0;
    }

    getPercentage(symbol: string): number {
        return this.percentages[symbol] || 0;
    }

    private showMessage(message: string, isError = false) {
        this._snackBar.open(message, 'Close', {
            duration: 3000,
            panelClass: isError ? 'error-snackbar' : 'success-snackbar'
        });
    }
}
