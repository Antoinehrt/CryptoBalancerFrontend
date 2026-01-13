import {Component, inject} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-login',
    imports: [CommonModule],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {
    private authService = inject(AuthService);

    isAuthenticated$ = this.authService.isAuthenticated$;
    currentUser$ = this.authService.currentUser$;
    isLoading = false;

    loginWithGoogle(): void {
        this.isLoading = true;
        this.authService.loginWithGoogle();
    }
}
