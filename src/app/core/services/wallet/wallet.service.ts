import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {WalletDto} from '../../dto/wallet-dto';
import {Observable} from 'rxjs';
import {CryptoDto} from '../../dto/crypto-dto';

@Injectable({
    providedIn: 'root',
})
export class WalletService {
    private apiUrl = environment.apiUrl + 'wallet/';
    private http = inject(HttpClient);

    createWallet(wallet: WalletDto): Observable<WalletDto>{
        return this.http.post<WalletDto>(`${this.apiUrl}${wallet.userId}/create`, wallet);
    }

    getWalletFromUser(userId: number): Observable<WalletDto>{
        return this.http.get<WalletDto>(`${this.apiUrl}getWalletByUserId/${userId}`);
    }

    addCryptoToWalletFromUser(userId: number, crypto: CryptoDto): Observable<CryptoDto>{
        return this.http.post<CryptoDto>(`${this.apiUrl}${userId}/addItemToWalletByUserID`, crypto);
    }

}
