import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {WalletDto} from '../../dto/wallet-dto';
import {Observable} from 'rxjs';
import {AssetDto} from '../../dto/asset-dto';

@Injectable({
    providedIn: 'root',
})
export class WalletService {
    private apiUrl = environment.apiUrl + 'wallet/';
    private http = inject(HttpClient);

    createWallet(userId: number): Observable<WalletDto>{
        return this.http.post<WalletDto>(`${this.apiUrl}${userId}/create`, {});
    }

    getWalletFromUser(userId: number): Observable<WalletDto>{
        return this.http.get<WalletDto>(`${this.apiUrl}getWalletByUserId/${userId}`);
    }

    addAssetToWalletFromUser(userId: number, assetDto: AssetDto): Observable<WalletDto>{
        const symbol = assetDto.symbol;
        const amount = assetDto.quantity || 0;
        return this.http.post<WalletDto>(`${this.apiUrl}${userId}/addItemToWalletByUserID?symbol=${symbol}&amount=${amount}`, {});
    }

    walletExists(userId: number): Observable<boolean>{
        return this.http.get<boolean>(`${this.apiUrl}exists/${userId}`);
    }

}
