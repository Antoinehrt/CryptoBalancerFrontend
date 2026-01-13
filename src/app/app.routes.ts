import {Routes} from '@angular/router';
import {Home} from './pages/home/home';
import {WalletCreation} from './pages/wallet-creation/wallet-creation';
import {Test} from './pages/test/test';
import {Login} from './pages/login/login';
import {Profile} from './pages/profile/profile';
import {authGuard} from './core/guard/auth/auth.guard';
import {UserWallet} from './pages/user-wallet/user-wallet';
import {hasWalletGuard} from './core/guard/has-wallet/has-wallet.guard';
import {noWalletGuard} from './core/guard/no-wallet/no-wallet.guard';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    {path: 'login', component: Login},
    {path: 'profile', component: Profile, canActivate: [authGuard]},
    {path: 'wallet-creation', component: WalletCreation, canActivate: [authGuard, noWalletGuard]},
    {path: 'wallet', component: UserWallet, canActivate: [authGuard, hasWalletGuard]},
    {path: 'test', component: Test},
    //{path: '404-not-found', component: NotFoundComponent},
    {path: '**', redirectTo: '404-not-found'}
];
