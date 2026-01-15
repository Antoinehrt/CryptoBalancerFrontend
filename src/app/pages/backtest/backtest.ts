import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user/user.service';
import {BacktestCalculationService} from '../../core/services/backtest/backtest-calculation.service';

@Component({
  selector: 'app-backtest',
  imports: [],
  templateUrl: './backtest.html',
  styleUrl: './backtest.css',
})
export class Backtest implements OnInit {

    private _backtestCalculationService = inject(BacktestCalculationService);
    private _userService = inject(UserService);

    ngOnInit(): void {
        this._backtestCalculationService.calculateKPIs(1).subscribe(response => {
            console.log(response);
        });
    }



}
