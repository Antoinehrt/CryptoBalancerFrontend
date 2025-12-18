import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {WalletService} from '../../services/wallet/wallet.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

export const walletExistsGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const walletService = inject(WalletService);
    const router = inject(Router);

    return authService.getCurrentUser().pipe(
        switchMap(user => walletService.walletExists(user.id).pipe(
            map(exists => {
                if (exists) return router.createUrlTree(['/wallet']);
                return true;
            }),
            catchError(err => {
                if (err.status === 401) {
                    return of(router.createUrlTree(['/login']));
                }
                return of(true);
            })
        )),
        catchError(() => of(router.createUrlTree(['/login'])))
    );
};
