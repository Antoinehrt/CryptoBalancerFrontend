import {Component, inject, OnInit} from '@angular/core';
import {StrategyCard} from '../../shared/components/strategy-card/strategy-card';
import {StrategyModel} from '../../core/models/strategy.model';
import {PageTitleService} from '../../core/services/page-title/page-title.service';

@Component({
  selector: 'app-strategy',
    imports: [
        StrategyCard
    ],
  templateUrl: './strategy.html',
  styleUrl: './strategy.css',
})

export class Strategy implements OnInit{
    private _pageTitleService = inject(PageTitleService);

    strategies: StrategyModel[] =  [
        {
            id: 1,
            icon: '',
            title: 'Constant Mix',
            description: 'Stratégie de rééquilibrage automatique maintenant une allocation constante entre actifs risqués et non risqués',
            marketType: 'Volatile',
            riskProfile: 5
        },
        {
            id: 2,
            icon: '',
            title: 'Hold',
            description: 'Stratégie passive d\'achat et de conservation à long terme sans rééquilibrage',
            marketType: 'Haussier',
            riskProfile: 3
        }
    ];

    ngOnInit(): void {
        this._pageTitleService.setPageTitle("Strategies");
    }

}
