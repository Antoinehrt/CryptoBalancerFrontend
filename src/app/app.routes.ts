import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {WalletCreation} from './pages/wallet-creation/wallet-creation';
import {Test} from './pages/test/test';
import {Login} from './pages/login/login';
import {Profile} from './pages/profile/profile';
import {authGuard} from './core/guard/auth-guard';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    {path: 'login', component: Login},
    {path: 'profile', component: Profile, canActivate: [authGuard]},
    {path: 'wallet-creation', component: WalletCreation, canActivate: [authGuard]},
    {path: 'test', component: Test},
    //{path: '404-not-found', component: NotFoundComponent},
    {path: '**', redirectTo: '404-not-found'}
];
