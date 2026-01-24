import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BacktestResultDto} from '../../dto/backtest-result.dto';

@Injectable({
  providedIn: 'root',
})
export class BacktestService {
    private apiUrl = environment.apiUrl + 'strategy/';
    private http = inject(HttpClient);

    runStrategy(userId: number, strategyName: string): Observable<BacktestResultDto>{
        return this.http.post<BacktestResultDto>(`${this.apiUrl}${strategyName}?userId=${userId}`, {});
    }
}
