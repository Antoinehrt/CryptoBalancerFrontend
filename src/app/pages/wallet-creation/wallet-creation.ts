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
import {WalletService} from '../../core/services/wallet/wallet.service';
import {UserService} from '../../core/services/user/user.service';

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
export class WalletCreation {
    assetForm: FormGroup;

    wallet!: WalletDto;

    private percentages: Record<string, number> = {};

    chartData: ChartDataPoint[];

    symbols?: string[];

    constructor(
        private _pageTitleService: PageTitleService,
        private _cryptoService: CryptoService,
        private _fb: FormBuilder,
        private _snackBar: MatSnackBar,
        private _walletService: WalletService,
        private _userService: UserService,
    ) {
        this.assetForm = this._fb.group({
            symbol: ['', Validators.required],
            quantity: ['', [Validators.required, Validators.min(0.00001)]]
        });

        this.wallet = {
            id: 0,
            userId: 0,
            crypto: []
        };
    }

        this.chartData = this.generateChartData();
        this._pageTitleService.setPageTitle('Wallet Creation');
        this._cryptoService.getAllSymbols().subscribe(symbols => this.symbols = symbols);
    }

    addAsset(): void {
        if (!this.assetForm.valid) {
            this.showMessage('Please complete every field', true);
            return;
        }

        const {symbol, quantity} = this.assetForm.value;
        if (!symbol) return;

        const qty = parseFloat(quantity);
        const existing = this.wallet.crypto.find(c => c.symbol === symbol);

        if (existing) {
            existing.quantity = (existing.quantity || 0) + qty;
            this.showMessage(`Quantity updated for ${symbol}`);
            this.calculatePercentages();
            this.assetForm.reset();
            return;
        }

        this._cryptoService.getCryptoPrice(symbol).subscribe({
            next: (price) => {
                const newCrypto: CryptoDto = {
                    id: this.generateNumericId(),
                    symbol,
                    price: price.price,
                    quantity: qty
                };
                this.wallet.crypto.push(newCrypto);
                this.showMessage(`${symbol} added to your wallet`);
                this.calculatePercentages();
                this.assetForm.reset();
            },
            error: () => {
                this.showMessage(`Impossible to find the price for ${symbol}`, true);
            }
        });
    }

    removeCrypto(symbol: string): void {
        this.wallet.crypto = this.wallet.crypto.filter(c => c.symbol !== symbol);
        delete this.percentages[symbol];
        this.calculatePercentages();
        this.showMessage('Asset removed from the wallet');
    }

    private calculatePercentages(): void {
        const totalValue = this.wallet.crypto.reduce((sum, c) => sum + (c.quantity || 0) * (c.price ?? 0), 0);

        this.wallet.crypto.forEach(c => {
            const value = (c.quantity || 0) * (c.price ?? 0);
            this.percentages[c.symbol] = totalValue > 0 ? Math.round((value / totalValue) * 10000) / 100 : 0;
        });
    }

    private generateNumericId(): number {
        return Math.floor(Math.random() * 1_000_000_000);
    }

    getQuantity(symbol: string): number {
        const crypto = this.wallet.crypto.find(c => c.symbol === symbol);
        return crypto?.quantity || 0;
    }

    getPercentage(symbol: string): number {
        return this.percentages[symbol] || 0;
    }

    private showMessage(message: string, isError = false): void {
        this._snackBar.open(message, 'Close', {
            duration: 3000,
            panelClass: isError ? 'error-snackbar' : 'success-snackbar'
        });
    }

    saveWallet(): void {
        this._userService.getCurrentUser().subscribe({
            next: (user) => {
                this._walletService.createWallet(user.id).subscribe({
                    next: () => {
                        let completedCalls = 0;
                        const totalCalls = this.wallet.crypto.length;

                        if (totalCalls === 0) {
                            this.showMessage('Wallet created successfully');
                            return;
                        }

                        this.wallet.crypto.forEach(crypto => {
                            this._walletService.addCryptoToWalletFromUser(user.id, crypto).subscribe({
                                next: () => {
                                    completedCalls++;
                                    if (completedCalls === totalCalls) {
                                        this.showMessage('Wallet saved successfully');
                                    }
                                },
                                error: () => {
                                    this.showMessage(`Error adding ${crypto.symbol}`, true);
                                }
                            });
                        });
                    },
                    error: () => this.showMessage('Error creating wallet', true)
                });
            },
            error: () => this.showMessage('Error fetching user', true)
        });
    private generateChartData(): ChartDataPoint[] {
        return Array.from({ length: 12 }, (_, i) => ({
            amount: 0,
            time: new Date(new Date().getFullYear(), i, 1)
        }));
    }
    }
}
