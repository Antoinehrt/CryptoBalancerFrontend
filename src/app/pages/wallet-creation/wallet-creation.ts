import {Component, inject} from '@angular/core';
import {PageTitleService} from '../../core/services/page-title/page-title.service';
import {MatFormField, MatInputModule, MatLabel} from '@angular/material/input';
import {ChartComponent} from '../../shared/components/chart/chart';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CommonModule} from '@angular/common';
import {AssetService} from '../../core/services/asset/asset.service';
import {WalletService} from '../../core/services/wallet/wallet.service';
import {UserService} from '../../core/services/user/user.service';
import {forkJoin, of, switchMap} from 'rxjs';
import {Wallet} from '../../core/models/wallet';
import {Asset} from '../../core/models/asset';
import {AssetDto} from '../../core/dto/asset.dto';
import {MatIcon} from '@angular/material/icon';
import {WalletFacadeService} from '../../core/services/wallet/wallet-facade.service';
import {Candle} from '../../core/models/candle';

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
        MatIconButton,
        MatIcon
    ],
    templateUrl: './wallet-creation.html',
    styleUrl: './wallet-creation.css',
})
export class WalletCreation {
    private _pageTitleService = inject(PageTitleService);
    private _assetService = inject(AssetService);
    private _fb = inject(FormBuilder);
    private _snackBar = inject(MatSnackBar);
    private _walletService = inject(WalletService);
    private _userService = inject(UserService);
    private _walletFacadeService = inject(WalletFacadeService);

    assetForm: FormGroup;
    wallet!: Wallet;
    chartData: Candle[];
    symbols?: string[];

    constructor(
    ) {
        this.assetForm = this._fb.group({
            symbol: ['', Validators.required],
            quantity: ['', [Validators.required, Validators.min(0.00001)]]
        });

        this.wallet = {
            id: 0,
            userId: 0,
            items: []
        };

        this.chartData = this.generateChartData();
        this._pageTitleService.setPageTitle('Wallet Creation');
        this._assetService.getAllSymbols().subscribe(symbols => this.symbols = symbols);
    }

    addAsset(): void {
        if (this.assetForm.invalid) return;

        const {symbol, quantity} = this.assetForm.value;
        const qty = +quantity;

        const existing = this.wallet.items.find(a => a.symbol === symbol);
        if (existing) {
            existing.quantity += qty;
            this.wallet = this._walletFacadeService.recalculatePercentages(this.wallet);
            this.assetForm.reset();
            return;
        }

        this._assetService.getAssetPrice(symbol).subscribe({
            next: ({price}) => {
                this.wallet.items.push({
                    symbol,
                    quantity: qty,
                    price,
                    percentage: 0
                });

                this.wallet = this._walletFacadeService.recalculatePercentages(this.wallet);
                this.assetForm.reset();
            }
        });
    }

    removeAsset(symbol: string): void {
        this.wallet.items = this.wallet.items.filter(a => a.symbol !== symbol);
        this.wallet = this._walletFacadeService.recalculatePercentages(this.wallet);
    }

    saveWallet(): void {
        this._userService.getCurrentUser().pipe(
            switchMap(user =>
                this._walletService.createWallet(user.id).pipe(
                    switchMap(() => {
                        if (this.wallet.items.length === 0) {
                            return of(null);
                        }

                        const addAssetRequests = this.wallet.items.map(asset =>
                            this._walletService.addAssetToWalletFromUser(user.id, this.toAssetDto(asset))
                        );

                        return forkJoin(addAssetRequests);
                    })
                )
            )
        ).subscribe({
            next: () => {
                this.showMessage('Wallet saved successfully');
            },
            error: (err) => {
                const errorMessage = this.getErrorMessage(err);
                this.showMessage(errorMessage, true);
            }
        });
    }

    trackBySymbol(_: number, asset: Asset): string {
        return asset.symbol;
    }

    private toAssetDto(asset: Asset): AssetDto {
        return {
            id: 0,
            symbol: asset.symbol,
            amount: asset.quantity,
        };
    }


    private showMessage(message: string, isError = false): void {
        this._snackBar.open(message, 'Close', {
            duration: 3000,
            panelClass: isError ? 'error-snackbar' : 'success-snackbar'
        });
    }

    private generateChartData(): Candle[] {
        return Array.from({length: 12}, (_, i) => ({
            id: i,
            symbol: '',
            open_time: new Date(new Date().getFullYear(), i, 1),
            open: 0,
            close: 0,
            high: 0,
            low: 0
        }));
    }

    private getErrorMessage(error: any): string {
        if (!error) return 'An error occurred';
        if (error.error?.message) return error.error.message;
        if (error.status === 401) return 'Authentication failed. Please log in again.';
        if (error.status === 403) return 'You do not have permission to perform this action.';
        if (error.status === 500) return 'Server error. Please try again later.';
        return 'Error saving wallet. Please try again.';
    }

}
