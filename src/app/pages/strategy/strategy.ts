import {Component, inject, OnInit} from '@angular/core';
import {StrategyCard} from '../../shared/components/strategy-card/strategy-card';
import {StrategyModel} from '../../core/models/strategy.model';
import {PageTitleService} from '../../core/services/page-title/page-title.service';
import {UserService} from '../../core/services/user/user.service';
import {WalletService} from '../../core/services/wallet/wallet.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-strategy',
    imports: [
        StrategyCard
    ],
  templateUrl: './strategy.html',
  styleUrl: './strategy.scss',
})

export class Strategy implements OnInit{
    private _pageTitleService = inject(PageTitleService);
    private _userService = inject(UserService);
    private _walletService = inject(WalletService);
    private _snackBar = inject(MatSnackBar);

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

    getChooseHandler(strategy: StrategyModel): () => void {
        return () => this.chooseStrategy(strategy);
    }

    chooseStrategy(strategy: StrategyModel): void {
        this._userService.getCurrentUser().subscribe({
            next: (user) => {
                const strategyKey = this.mapStrategyToKey(strategy);
                this._walletService.updateWalletStrategy(user.id, strategyKey).subscribe({
                    next: () => {
                        this._snackBar.open('Stratégie mise à jour avec succès', 'Fermer', { duration: 3000 });
                    },
                    error: () => {
                        this._snackBar.open('Erreur lors de la mise à jour de la stratégie', 'Fermer', { duration: 3000 });
                    }
                });
            },
            error: () => {
                this._snackBar.open('Impossible de récupérer l’utilisateur courant', 'Fermer', { duration: 3000 });
            }
        });
    }

    private mapStrategyToKey(strategy: StrategyModel): string {
        switch (strategy.title.toLowerCase()) {
            case 'hold':
                return 'hold';
            case 'constant mix':
                return 'constant_mix';
            default:
                return strategy.title.toLowerCase().replace(/\s+/g, '_');
        }
    }

}
