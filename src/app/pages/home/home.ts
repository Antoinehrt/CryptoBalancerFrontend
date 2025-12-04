import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {PageTitleService} from '../../core/services/page-title.service';

@Component({
    selector: 'app-home',
    imports: [MatButtonModule],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home implements OnInit {
    constructor(private pageTitleService: PageTitleService, private router: Router) {
    }

    ngOnInit() {
        this.pageTitleService.setPageTitle('Home');
    }

    navigateToWalletCreation() {
        this.router.navigate(['/wallet-creation']);
    }
}
