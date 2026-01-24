import {Component, inject, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {PageTitleService} from '../../../core/services/page-title/page-title.service';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [
        MatToolbar,
        MatFormField,
        MatInput,
        MatIcon,
        MatIconButton,
        AsyncPipe,
        MatLabel
    ],
    templateUrl: './header.html',
    styleUrl: './header.css',
})
export class Header implements OnInit {
    private _pageTitleService = inject(PageTitleService);
    private router = inject(Router);

    pageTitle$!: Observable<string>;

    ngOnInit() {
        this.pageTitle$ = this._pageTitleService.pageTitle$;
    }


    protected navigateToProfile() {
        this.router.navigate(['/profile']);
    }
}
