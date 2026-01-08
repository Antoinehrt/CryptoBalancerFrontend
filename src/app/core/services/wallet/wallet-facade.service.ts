import {UserService} from '../user/user.service';
import {WalletService} from './wallet.service';
import {AssetService} from '../asset/asset.service';
import {Injectable} from "@angular/core";
import {forkJoin, Observable, of, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';
import {Asset} from '../../models/asset';

@Injectable({ providedIn: 'root' })
export class WalletFacadeService {

    constructor(
        private userService: UserService,
        private walletService: WalletService,
        private cryptoService: AssetService
    ) {}

    loadWallet(): Observable<Asset[]> {
        return this.userService.getCurrentUser().pipe(
            switchMap(user =>
                this.walletService.getWalletFromUser(user.id)
            ),
            switchMap(wallet => {
                if (!wallet.items?.length) {
                    return of([]);
                }

                return forkJoin(
                    wallet.items.map(item =>
                        this.cryptoService.getAssetPrice(item.symbol).pipe(
                            map(price => ({
                                id: item.id ?? 0,
                                symbol: item.symbol,
                                quantity: item.quantity ?? 0,
                                price: price.price,
                                percentage: 0
                            }) as Asset)
                        )
                    )
                );
            }),
            map(items => {
                const total = items.reduce(
                    (sum, i) => sum + i.quantity * i.price, 0
                );

                return items.map(i => ({
                    ...i,
                    percentage: total
                        ? +(i.quantity * i.price / total * 100).toFixed(2)
                        : 0
                }));
            })
        );
    }
}
