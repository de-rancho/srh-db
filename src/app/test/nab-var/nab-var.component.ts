import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-nab-var',
    templateUrl: './nab-var.component.html',
    styleUrls: ['./nab-var.component.scss']
})
export class NabVarComponent implements OnInit {

    // Should the collapsed nav show?
    showNav = false;

    get authenticated(): boolean {
        return this.authService.authenticated;
    }

    // The user
    get user(): User | undefined {
        return this.authService.user;
    }

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    // Used by the Bootstrap navbar-toggler button to hide/show
    // the nav in a collapsed state
    toggleNavBar(): void {
        this.showNav = !this.showNav;
    }

    async signIn(): Promise<void> {
        await this.authService.signIn();
    }

    signOut(): void {
        this.authService.signOut();
    }

}
