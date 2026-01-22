import {Component, inject, OnInit, signal} from '@angular/core';
import {UserService} from '../../core/services/user/user.service';
import {BacktestCalculationService} from '../../core/services/backtest/backtest-calculation.service';
import {StrategyCard} from '../../shared/components/strategy-card/strategy-card';
import {KpisModel} from '../../core/models/kpis.model';
import {PageTitleService} from '../../core/services/page-title/page-title.service';

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

    //TODO : id user dynamic

    ngOnInit(): void {
        this._pageTitleService.setPageTitle("Backtest");
        this._backtestCalculationService.calculateKPIs(1).subscribe({
            next: response => {
                this.kpis = response;
                console.log(this.kpis.at(1)?.totalCost);
                this.isLoading.set(false);
            }
        });
    }



}
