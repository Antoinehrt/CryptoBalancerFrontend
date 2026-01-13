import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserDto } from '../../dto/user.dto';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    private currentUserSubject = new BehaviorSubject<UserDto | null>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    private authInitializedSubject = new BehaviorSubject<boolean>(false);
    authInitialized$ = this.authInitializedSubject.asObservable();

    constructor() {
        this.initializeAuth();
    }

    private initializeAuth(): void {
        this.getCurrentUser().subscribe({
            next: (user) => {
                this.currentUserSubject.next(user);
                this.isAuthenticatedSubject.next(true);
                this.authInitializedSubject.next(true);
            },
            error: () => {
                this.currentUserSubject.next(null);
                this.isAuthenticatedSubject.next(false);
                this.authInitializedSubject.next(true);
            }
        });
    }

    loginWithGoogle(): void {
        window.location.href = `${this.apiUrl}auth/google/login`;
    }

    getCurrentUser(): Observable<UserDto> {
        return this.http.get<UserDto>(`${this.apiUrl}user/getUser/me`, {
            withCredentials: true
        }).pipe(
            tap(user => {
                this.currentUserSubject.next(user);
                this.isAuthenticatedSubject.next(true);
            })
        );
    }

    logout(): void {
        this.http.post(`${this.apiUrl}auth/logout`, {}, { withCredentials: true }).subscribe({
            next: () => {
                localStorage.removeItem('authToken');
                this.currentUserSubject.next(null);
                this.isAuthenticatedSubject.next(false);
            },
            error: () => {
                localStorage.removeItem('authToken');
                this.currentUserSubject.next(null);
                this.isAuthenticatedSubject.next(false);
            }
        });
    }
}
