import {Component, Input} from '@angular/core';
import {RiskProfile} from '../risk-profile/risk-profile';
import {MatButton} from '@angular/material/button';
import {CurrencyPipe} from '@angular/common';

@Component({
    selector: 'app-strategy-card',
    imports: [
        RiskProfile,
        MatButton,
        CurrencyPipe
    ],
    templateUrl: './strategy-card.html',
    styleUrl: './strategy-card.css',
})
export class StrategyCard {

    @Input()
    icon?: string;
    @Input()
    title!: string;
    @Input()
    description?: string;
    @Input()
    marketType?: string;
    @Input()
    maxDrawdown?: number;
    @Input()
    returnPercent?: number;
    @Input()
    totalCost?: number;
    @Input()
    riskProfile!: number;

    @Input()
    showModifyButton = false;
    @Input()
    onModify?: () => void;

    @Input()
    showChooseButton = false;
    @Input()
    onChoose?: () => void;


    protected readonly RiskProfile = RiskProfile;
}
