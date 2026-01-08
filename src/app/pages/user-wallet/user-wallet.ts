import {Component, OnInit, signal} from '@angular/core';
import {CommonModule, CurrencyPipe, DecimalPipe} from '@angular/common';
import {PageTitleService} from '../../core/services/page-title/page-title.service';
import {WalletFacadeService} from '../../core/services/wallet/wallet-facade.service';
import {Asset} from '../../core/models/asset';

@Component({
    selector: 'app-user-wallet',
    standalone: true,
    imports: [
        CommonModule,
        CurrencyPipe,
        DecimalPipe
    ],
    templateUrl: './user-wallet.html',
    styleUrl: './user-wallet.css',
})
export class UserWallet implements OnInit {
    assets = signal<Asset[]>([]);
    isLoading = signal(true);

    constructor(
        private _walletBusinessService: WalletFacadeService,
        private _pageTitle: PageTitleService
    ) {
    }

    ngOnInit(): void {
        this._pageTitle.setPageTitle('My Wallet');

        this._walletBusinessService.loadWallet().subscribe({
            next: assets => {
                this.assets.set(assets);
                this.isLoading.set(false);
            },
            error: () => this.isLoading.set(false)
        });
    }
}
