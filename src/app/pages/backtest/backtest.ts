import {Component, inject, OnInit, signal} from '@angular/core';
import {UserService} from '../../core/services/user/user.service';
import {BacktestCalculationService} from '../../core/services/backtest/backtest-calculation.service';
import {StrategyCard} from '../../shared/components/strategy-card/strategy-card';
import {KpisModel} from '../../core/models/kpis.model';
import {PageTitleService} from '../../core/services/page-title/page-title.service';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-backtest',
    imports: [
        StrategyCard
    ],
  templateUrl: './backtest.html',
  styleUrl: './backtest.css',
})
export class Backtest implements OnInit {

    private _backtestCalculationService = inject(BacktestCalculationService);
    private _userService = inject(UserService);
    private _pageTitleService = inject(PageTitleService)

    protected isLoading = signal(true);
    protected kpis: KpisModel[] = [];
    private userId: number = -1;

      ngOnInit(): void {
        this._pageTitleService.setPageTitle("Backtest");
        this._userService.getCurrentUser().pipe(
            switchMap(user => {
                this.userId = user.id;

                return this._backtestCalculationService.calculateKPIs(user.id);
            })
        ).subscribe({
            next: response => {
                this.kpis = response;
                this.isLoading.set(false);
            }
        });
    }



}
