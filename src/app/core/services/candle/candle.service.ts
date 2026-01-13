import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CandleDto} from '../../dto/candle-dto';


@Injectable({
  providedIn: 'root',
})
export class CandleService {
    private apiUrl = environment.apiUrl + 'candle/';
    private http = inject(HttpClient);

    getCandlesBySymbol(symbol: string): Observable<CandleDto[]>{
        return this.http.get<CandleDto[]>(`${this.apiUrl}getCandlesBySymbol/${symbol}`);
    }
}
