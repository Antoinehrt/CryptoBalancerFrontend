import {Component, DestroyRef, inject, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {RouterLink} from '@angular/router';
import {MatListItem} from '@angular/material/list';
import {AuthService} from '../../../core/services/auth/auth.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-navbar',
    imports: [
        MatSidenavContainer,
        MatSidenav,
        MatSidenavContent,
        RouterLink,
        MatListItem
    ],
    templateUrl: './navbar.html',
    styleUrl: './navbar.scss',
})
export class Navbar {
    @ViewChild('sidenav') sidenav!: MatSidenav;
    isHandset = false;
    private destroyRef = inject(DestroyRef);
    private breakpointObserver = inject(BreakpointObserver);
    private _authenticationService = inject(AuthService);

    constructor() {
        this.breakpointObserver
            .observe([Breakpoints.Handset])
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(result => {
                this.isHandset = result.matches;
                if (this.sidenav) {
                    this.isHandset ? this.sidenav.close() : this.sidenav.open();
                }
            });
    }

    ngAfterViewInit() {
        if (this.isHandset) this.sidenav.close();
        else this.sidenav.open();
    }

    closeIfHandset() {
        if (this.isHandset) this.sidenav.close();
    }

    logout() {
        this._authenticationService.logout();
    }
}
