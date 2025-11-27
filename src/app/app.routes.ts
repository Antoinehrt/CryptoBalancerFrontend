import { Routes } from '@angular/router';
import {Home} from './pages/home/home';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    //{path: '404-not-found', component: NotFoundComponent},
    {path: '**', redirectTo: '404-not-found'}
];
