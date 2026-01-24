import {Component, inject} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';
import {AsyncPipe, DatePipe} from '@angular/common';

@Component({
    selector: 'app-profile',
    imports: [
        AsyncPipe,
        DatePipe
    ],
    templateUrl: './profile.html',
    styleUrl: './profile.css',
})
export class Profile {
    private authService = inject(AuthService);

    currentUser$ = this.authService.currentUser$;
}
