import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {RiskProfile} from '../risk-profile/risk-profile';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-strategy-card',
    imports: [
        NgIf,
        RiskProfile,
        MatButton
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
    twoYear?: number;
    @Input()
    pnl?: number;
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
