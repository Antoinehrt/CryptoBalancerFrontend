import {Component, inject} from '@angular/core';
import {PageTitleService} from '../../core/services/page-title/page-title.service';
import {MatInputModule} from '@angular/material/input';
import {ChartComponent} from '../../shared/components/chart/chart';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CommonModule} from '@angular/common';
import {AssetService} from '../../core/services/asset/asset.service';
import {WalletService} from '../../core/services/wallet/wallet.service';
import {UserService} from '../../core/services/user/user.service';
import {forkJoin, of, switchMap} from 'rxjs';
import {WalletModel} from '../../core/models/wallet.model';
import {AssetModel} from '../../core/models/asset.model';
import {AssetDto} from '../../core/dto/asset.dto';
import {MatIcon} from '@angular/material/icon';
import {WalletFacadeService} from '../../core/services/wallet/wallet-facade.service';
import {CandleModel} from '../../core/models/candle.model';
import {Router} from '@angular/router';
import {AddAssetForm} from '../../shared/components/add-asset-form/add-asset-form';

@Component({
    selector: 'app-wallet-creation',
    imports: [
        CommonModule,
        MatInputModule,
        MatButtonModule,
        ChartComponent,
        ReactiveFormsModule,
        MatIconButton,
        MatIcon,
        AddAssetForm
    ],
    templateUrl: './wallet-creation.html',
    styleUrl: './wallet-creation.css',
})
export class WalletCreation {
    private _pageTitleService = inject(PageTitleService);
    private _assetService = inject(AssetService);
    private _snackBar = inject(MatSnackBar);
    private _walletService = inject(WalletService);
    private _userService = inject(UserService);
    private _walletFacadeService = inject(WalletFacadeService);
    private router = inject(Router);

    wallet!: WalletModel;
    chartData: CandleModel[];

    constructor() {

        this.wallet = {
            id: 0,
            userId: 0,
            items: []
        };

        this.chartData = this.generateChartData();
        this._pageTitleService.setPageTitle('WalletModel Creation');
    }

    addAsset($event: AssetDto): void {
        const existing = this.wallet.items.find(a => a.symbol === $event.symbol);
        if (existing) {
            existing.quantity += $event.amount;
            this.wallet = this._walletFacadeService.recalculatePercentages(this.wallet);
            return;
        }

        this._assetService.getAssetPrice($event.symbol).subscribe({
            next: ({price}) => {
                this.wallet.items.push({
                    symbol: $event.symbol,
                    quantity: $event.amount,
                    price,
                    percentage: 0
                });

                this.wallet = this._walletFacadeService.recalculatePercentages(this.wallet);
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
                this.router.navigate(['/backtest']);
            },
            error: (err) => {
                const errorMessage = this.getErrorMessage(err);
                this.showMessage(errorMessage, true);
            }
        });
    }

    trackBySymbol(_: number, asset: AssetModel): string {
        return asset.symbol;
    }

    private toAssetDto(asset: AssetModel): AssetDto {
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

    private generateChartData(): CandleModel[] {
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
