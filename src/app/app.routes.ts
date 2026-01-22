import {Routes} from '@angular/router';
import {Home} from './pages/home/home';
import {WalletCreation} from './pages/wallet-creation/wallet-creation';
import {Login} from './pages/login/login';
import {Profile} from './pages/profile/profile';
import {authGuard} from './core/guards/auth/auth.guard';
import {UserWallet} from './pages/user-wallet/user-wallet';
import {hasWalletGuard} from './core/guards/has-wallet/has-wallet.guard';
import {noWalletGuard} from './core/guards/no-wallet/no-wallet.guard';
import {Backtest} from './pages/backtest/backtest';
import {Strategy} from './pages/strategy/strategy';
import {Glossary} from './pages/glossary/glossary';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    {path: 'login', component: Login},
    {path: 'profile', component: Profile, canActivate: [authGuard]},
    {path: 'wallet-creation', component: WalletCreation, canActivate: [authGuard, noWalletGuard]},
    {path: 'wallet', component: UserWallet, canActivate: [authGuard, hasWalletGuard]},
    {path: 'backtest', component: Backtest, canActivate: [authGuard, hasWalletGuard]},
    {path: 'strategies', component: Strategy},
    {path: 'glossary', component: Glossary},
    //{path: '404-not-found', component: NotFoundComponent},
    {path: '**', redirectTo: '404-not-found'}
];
