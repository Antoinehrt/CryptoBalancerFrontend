import {Component} from '@angular/core';
import {AvailableStrategiesEnum} from '../../core/enums/available-strategies.enum';
import {StrategyCard} from '../../shared/components/strategy-card/strategy-card';

@Component({
  selector: 'app-strategy',
    imports: [
        StrategyCard
    ],
  templateUrl: './strategy.html',
  styleUrl: './strategy.css',
})

export class Strategy{

    strategies: AvailableStrategiesEnum[];


    constructor() {
        this.strategies = Object.values(AvailableStrategiesEnum);
    }

}
