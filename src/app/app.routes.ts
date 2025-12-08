import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {WalletCreation} from './pages/wallet-creation/wallet-creation';
import {Test} from './pages/test/test';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    {path: 'wallet-creation', component: WalletCreation},
    {path: 'test', component: Test},
    //{path: '404-not-found', component: NotFoundComponent},
    {path: '**', redirectTo: '404-not-found'}
];
