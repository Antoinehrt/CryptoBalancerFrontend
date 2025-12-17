import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {WalletDto} from '../../dto/wallet-dto';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CryptoDto} from '../../dto/crypto-dto';

@Injectable({
    providedIn: 'root',
})
export class CryptoService {
    private apiUrl = environment.apiUrl + 'crypto/';
    private http = inject(HttpClient);

    getAllSymbols(): Observable<String[]>{
        return this.http.get<any>(`${this.apiUrl}getAllSymbols`).pipe(
            map(response => {
                return response.symbols;
            })
        );
    }

    getCryptoPrice(symbol: String): Observable<CryptoDto>{
        return this.http.get<CryptoDto>(`${this.apiUrl}price/${symbol}`)
    }

}
