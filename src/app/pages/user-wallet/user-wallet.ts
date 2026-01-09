import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule, CurrencyPipe, DecimalPipe} from '@angular/common';
import {PageTitleService} from '../../core/services/page-title/page-title.service';
import {WalletFacadeService} from '../../core/services/wallet/wallet-facade.service';
import {Asset} from '../../core/models/asset';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {WalletService} from '../../core/services/wallet/wallet.service';
import {UserService} from '../../core/services/user/user.service';
import {switchMap} from 'rxjs';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-user-wallet',
    standalone: true,
    imports: [
        CommonModule,
        CurrencyPipe,
        DecimalPipe,
        MatIconButton,
        MatIcon,
        FormsModule
    ],
    templateUrl: './user-wallet.html',
    styleUrl: './user-wallet.css',
})
export class UserWallet implements OnInit {

    private _userService = inject(UserService);
    private _walletService = inject(WalletService);
    private _walletFacadeService = inject(WalletFacadeService);
    private _pageTitle = inject(PageTitleService);

    assets = signal<Asset[]>([]);
    isLoading = signal(true);
    editingAssetSymbol = signal<string | null>(null);
    editingValues = signal<{ quantity: number } | null>(null);


    private userId: number = 0;

    ngOnInit(): void {
        this._pageTitle.setPageTitle('My Wallet');

        this._userService.getCurrentUser().pipe(
            switchMap(user => {
                this.userId = user.id;
                return this._walletFacadeService.loadWallet(user.id)
            })
        ).subscribe({
            next: assets => {
                this.assets.set(assets);
                this.isLoading.set(false);
            },
            error: () => this.isLoading.set(false)
        });
    }

    protected modifyAsset(symbol: string, quantity: number) {
        if (quantity <= 0) return this.removeAsset(symbol);
        this._walletService.updateAssetQuantityInWallet(this.userId, symbol, quantity).pipe(
            switchMap(() => this._walletFacadeService.loadWallet(this.userId))
        ).subscribe({
           next: assets => this.updateAssets(assets),
            error: (error) => console.error('Error while updating quantity', error),
        });


    }

    protected removeAsset(symbol: string) {
        this._walletService.removeAssetFromWallet(this.userId, symbol).pipe(
            switchMap(() => this._walletFacadeService.loadWallet(this.userId))
        ).subscribe({
            next: assets => this.updateAssets(assets),
            error: (error) => console.error('Error while removing asset', error),
        });
    }

    private updateAssets(assets: Asset[]){
        this.assets.set(assets);
        this.isLoading.set(false);
    }

    protected startEdit(asset: Asset) {
        this.editingAssetSymbol.set(asset.symbol);
        this.editingValues.set({quantity: asset.quantity});
    }

    protected saveEdit(symbol: string) {
        const values = this.editingValues();
        if (values) this.modifyAsset(symbol, values.quantity);
        this.cancelEdit();
    }

    protected cancelEdit() {
        this.editingAssetSymbol.set(null);
        this.editingValues.set(null);
    }

    protected isEditing(symbol: string): boolean {
        return this.editingAssetSymbol() === symbol;
    }
}
