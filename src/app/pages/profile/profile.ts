import {Component, inject} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';
import {AsyncPipe, DatePipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
    imports: [
        NgIf,
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
