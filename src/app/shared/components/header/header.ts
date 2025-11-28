import {Component, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatBadge} from '@angular/material/badge';
import {PageTitleService} from '../../../core/services/page-title.service';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';

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
    pageTitle$!: Observable<string>;
    constructor(private pageTitleService: PageTitleService) {
    }

    ngOnInit() {
        this.pageTitle$ = this.pageTitleService.pageTitle$;
    }
}
