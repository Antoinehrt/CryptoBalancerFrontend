import {Component} from '@angular/core';
import {StrategyCard} from '../../shared/components/strategy-card/strategy-card';

@Component({
    selector: 'app-test',
    imports: [
        StrategyCard
    ],
    templateUrl: './test.html',
    styleUrl: './test.css',
})
export class Test {
    riskProfile: number = 1;
    pnl: number = 22;
    twoYear: number = 0.33;
    description: string = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium."
}
