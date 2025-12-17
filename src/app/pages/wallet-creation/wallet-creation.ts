import {Component, OnInit} from '@angular/core';
import {PageTitleService} from '../../core/services/page-title/page-title.service';
import {MatFormField, MatLabel} from '@angular/material/input';
import {ChartComponent} from '../../shared/components/chart/chart';
import {ChartDataPoint} from '../../core/models/chart-data-point';
import {MatSelect, MatOption} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Asset} from '../../core/models/asset';
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

    assets: Asset[] = [];

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
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {
        this.assetForm = this.fb.group({
            symbol: ['', Validators.required],
            quantity: ['', [Validators.required, Validators.min(0.00001)]]
        });
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
                const existingAssetIndex = this.assets.findIndex(asset => asset.symbol === formValue.symbol);

                if (existingAssetIndex >= 0) {
                    this.assets[existingAssetIndex].quantity += parseFloat(formValue.quantity);
                    this.showMessage(`Quantity updated for ${selectedSymbol}`);
                } else {
                    const newAsset: Asset = {
                        id: this.generateId(),
                        symbol: formValue.symbol,
                        name: selectedSymbol,
                        quantity: parseFloat(formValue.quantity),
                        percentage: 0
                    };
                    this.assets.push(newAsset);
                    this.showMessage(`${selectedSymbol} added to your wallet`);
                }

                this.calculatePercentages();

                this.assetForm.reset();
            }
        } else {
            this.showMessage('Please complete every field', true);
        }
    }

    removeAsset(assetId: string) {
        this.assets = this.assets.filter(asset => asset.id !== assetId);
        this.calculatePercentages();
        this.showMessage('Asset supprimé du portefeuille');
    }

    private calculatePercentages() {
        const totalQuantity = this.assets.reduce((sum, asset) => sum + asset.quantity, 0);

        this.assets.forEach(asset => {
            asset.percentage = totalQuantity > 0 ? Math.round((asset.quantity / totalQuantity) * 10000) / 100 : 0;
        });
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    private showMessage(message: string, isError = false) {
        this.snackBar.open(message, 'Close', {
            duration: 3000,
            panelClass: isError ? 'error-snackbar' : 'success-snackbar'
        });
    }
}
