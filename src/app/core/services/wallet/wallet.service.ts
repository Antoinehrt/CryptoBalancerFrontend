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

    createWallet(userId: number): Observable<WalletDto>{
        return this.http.post<WalletDto>(`${this.apiUrl}${userId}/create`, {});
    }

    getWalletFromUser(userId: number): Observable<WalletDto>{
        return this.http.get<WalletDto>(`${this.apiUrl}getWalletByUserId/${userId}`);
    }

    addCryptoToWalletFromUser(userId: number, crypto: CryptoDto): Observable<CryptoDto>{
        return this.http.post<CryptoDto>(`${this.apiUrl}${userId}/addItemToWalletByUserID`, crypto);
    }

    walletExists(userId: number): Observable<boolean>{
        return this.http.get<boolean>(`${this.apiUrl}/exists/${userId}`);
    }

}
