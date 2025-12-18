import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {PageTitleService} from '../../core/services/page-title/page-title.service';

@Component({
    selector: 'app-home',
    imports: [MatButtonModule],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home {
    private pageTitleService = inject(PageTitleService);
    private router = inject(Router);

    constructor() {
        this.pageTitleService.setPageTitle('Home');
    }

    navigateToWalletCreation() {
        this.router.navigate(['/wallet-creation']);
    }
}
