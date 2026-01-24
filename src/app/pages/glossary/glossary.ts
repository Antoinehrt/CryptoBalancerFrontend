import {Component, computed, inject, signal} from '@angular/core';
import {GlossaryTerm} from '../../core/models/glossaryTerm.model';
import {PageTitleService} from '../../core/services/page-title/page-title.service';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-glossary',
    imports: [
        MatFormField,
        MatIcon,
        MatLabel
    ],
  templateUrl: './glossary.html',
  styleUrl: './glossary.css',
})
export class Glossary {

    private _pageTitleService = inject(PageTitleService);

    private glossaryTerms: GlossaryTerm[] = [
        {
            key: 'pnl',
            label: 'P&L (Profit & Loss)',
            shortDef: 'Measures profit or loss over a period.',
            category: 'Performance'
        },
        {
            key: 'strategy',
            label: 'Strategy',
            shortDef: 'A strategy defines how assets are selected, weighted, and managed over time.',
            category: 'General'
        },
        {
            key: 'asset',
            label: 'Asset',
            shortDef: 'An asset is any financial instrument that has value and can be traded.',
            category: 'General'
        },
        {
            key: 'wallet',
            label: 'Wallet',
            shortDef: 'A wallet is where your assets are stored and tracked.',
            category: 'General'
        },
        {
            key: 'portfolio',
            label: 'Portfolio',
            shortDef: 'A portfolio is the combination of all assets you hold.',
            category: 'General'
        },
        {
            key: 'risk_profile',
            label: 'Risk Profile',
            shortDef: 'A risk profile indicates how much risk a strategy or portfolio takes.',
            category: 'Risk'
        },
        {
            key: 'max_drawdown',
            label: 'Max Drawdown',
            shortDef: 'The maximum loss from a peak to a trough over a period.',
            category: 'Risk'
        }
    ];
    terms = signal<GlossaryTerm[]>(this.glossaryTerms);
    search = signal('');

    constructor() {
        this._pageTitleService.setPageTitle("Glossary");
    }


    filteredTerms = computed(() =>
        this.terms().filter(t =>
            t.label.toLowerCase().includes(this.search().toLowerCase())
        )
    );

}
