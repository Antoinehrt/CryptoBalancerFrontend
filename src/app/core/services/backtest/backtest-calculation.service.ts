import {inject, Injectable} from '@angular/core';
import {BacktestService} from './backtest.service';
import {BacktestResultDto} from '../../dto/backtest-result.dto';
import {KpisModel} from '../../models/kpis.model';
import {AvailableStrategiesEnum} from '../../enums/available-strategies.enum';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BacktestCalculationService {

    private _backtestService = inject(BacktestService);

    public calculateKPIs (userId: number): Observable<KpisModel[]>{
        const strategies = Object.values(AvailableStrategiesEnum);

        return forkJoin(
            strategies.map(strategy =>
                this._backtestService.runStrategy(userId, strategy).pipe(
                    map((datas: BacktestResultDto) => {

                        const initial = datas.data[0].value;
                        const final = datas.data[datas.data.length - 1].value;

                        const returnPercent = ((final - initial) / initial) * 100;
                        const totalCost = datas.data[datas.data.length - 1].cost;

                        let peak = datas.data[0].value;
                        let maxDrawDown = 0;

                        for (const row of datas.data) {
                            if (row.value > peak) peak = row.value;
                            const drawDown = ((peak - row.value) / peak) * 100;
                            if (drawDown > maxDrawDown) maxDrawDown = drawDown;
                        }

                        const riskProfile = Math.min(5, Math.ceil(maxDrawDown / 10));

                        return {
                            strategyName: strategy,
                            returnPercent,
                            totalCost,
                            maxDrawdown: maxDrawDown,
                            riskProfile
                        } as KpisModel;
                    })
                )
            )
        );
    }
}
