import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDto } from '../../dto/userDto';
import { environment } from '../../../../environments/environment';

interface LoginResponse {
    message: string;
    user: UserDto;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false)
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    private currentUserSubject = new BehaviorSubject<UserDto | null>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
    }

    loginWithGoogle(): void {
        window.location.href = `${this.apiUrl}auth/google/login`;
    }

    /*loginWithGoogle(): void {
        const width = 600;
        const height = 700;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;

        const popup = window.open(
            `${this.apiUrl}auth/google/login`,
            'google_oauth',
            `width=${width},height=${height},top=${top},left=${left}`
        );

        if (!popup) return;

        const timer = setInterval(() => {
            if (popup.closed) {
                clearInterval(timer);
            }
        }, 500);
    }
*/
}
