import { Injectable, inject } from '@angular/core';
import {forkJoin, Observable, of, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';
import {Asset} from '../../models/asset';
import {Wallet} from '../../models/wallet';
import {WalletService} from './wallet.service';
import {AssetService} from '../asset/asset.service';

@Injectable({ providedIn: 'root' })
export class WalletFacadeService {
    private _walletService = inject(WalletService)
    private _assetService = inject(AssetService);

    loadWallet(userId: number): Observable<Asset[]> {
        return this._walletService.getWalletFromUser(userId).pipe(
            switchMap(wallet => {
                if (!wallet.items?.length) {
                    return of([]);
                }

                return forkJoin(
                    wallet.items.map(item =>
                        this._assetService.getAssetPrice(item.symbol).pipe(
                            map(price => ({
                                id: item.id ?? 0,
                                symbol: item.symbol,
                                quantity: item.amount ?? 0,
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

    recalculatePercentages(wallet: Wallet): Wallet {
        const total = wallet.items.reduce(
            (sum, a) => sum + a.quantity * a.price, 0
        );

        wallet.items.forEach(a => {
            a.percentage = total
                ? +(a.quantity * a.price / total * 100).toFixed(2)
                : 0;
        });
        return wallet;
    }
}
