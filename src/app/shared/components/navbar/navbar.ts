import {Component, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {RouterLink} from '@angular/router';
import {MatListItem} from '@angular/material/list';
import {AuthService} from '../../../core/services/auth/auth.service';

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
    styleUrl: './navbar.css',
})
export class Navbar {
    @ViewChild('sidenav') sidenav!: MatSidenav;
    isHandset = false;

    constructor(private breakpointObserver: BreakpointObserver, private _authenticationService: AuthService) {
        this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
            this.isHandset = result.matches;
            if (this.sidenav) {
                if (this.isHandset) this.sidenav.close();
                else this.sidenav.open();
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
