import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AssetService {
    private apiUrl = environment.apiUrl + 'crypto/';
    private http = inject(HttpClient);

    getAllSymbols(): Observable<string[]>{
        return this.http.get<any>(`${this.apiUrl}getAllSymbols`).pipe(
            map(response => {
                return response.symbols;
            })
        );
    }

    getAssetPrice(symbol: string): Observable<{price: number}>{
        return this.http.get<{price: number}>(`${this.apiUrl}price/${symbol}`)
    }
}
