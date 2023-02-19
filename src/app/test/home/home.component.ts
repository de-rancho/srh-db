import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
    selector: 'srh-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    // Is a user logged in?
    authenticated = false;
    // The user
    user?: User = undefined;

    constructor(protected authService: AuthService) {
    }

    ngOnInit(): void {
    }

    async signIn(): Promise<void> {
        await this.authService.signIn();
    }
}
