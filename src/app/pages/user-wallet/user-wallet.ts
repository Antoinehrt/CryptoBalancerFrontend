import {Component, inject} from '@angular/core';
import {PageTitleService} from '../../core/services/page-title/page-title.service';
import {WalletService} from '../../core/services/wallet/wallet.service';
import {UserService} from '../../core/services/user/user.service';
import {UserDto} from '../../core/dto/user-dto';
import {WalletDto} from '../../core/dto/wallet-dto';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-user-wallet',
  imports: [],
  templateUrl: './user-wallet.html',
  styleUrl: './user-wallet.css',
})
export class UserWallet {
    private _pageTitleService = inject(PageTitleService);
    private _userService = inject(UserService);
    private _walletService = inject(WalletService);

    wallet?: WalletDto;
    user?: UserDto;

    constructor() {
        this._pageTitleService.setPageTitle('My Wallet');
        this._userService.getCurrentUser().pipe(
            switchMap(user => {
                this.user = user;
                return this._walletService.getWalletFromUser(user.id);
            })
        ).subscribe(wallet => {
            this.wallet = wallet;
        });
        console.log(this.wallet);
    }
}
