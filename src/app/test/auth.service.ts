import { Injectable } from '@angular/core';
import { OAuthSettings } from './oauth';
import { MsalService } from '@azure/msal-angular';
import { AlertsService } from './alerts.service';
import { User } from './user';

import { Client } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { AuthenticationResult, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { lastValueFrom, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public authenticated: boolean;
    public user?: User;
    public graphClient?: Client;

    constructor(
        private msalService: MsalService,
        private alertsService: AlertsService,
        private router: Router
    ) {
        const accounts = this.msalService.instance.getAllAccounts();
        this.authenticated = accounts.length > 0;
        if (this.authenticated) {
            this.msalService.instance.setActiveAccount(accounts[0]);
        }
        this.getUser().then((user) => {
            this.user = user;
        });
    }

    // Prompt the user to sign in and
    // grant consent to the requested permission scopes
    async signIn(): Promise<void> {
        try {
            const result = await lastValueFrom(
                this.msalService.loginPopup(OAuthSettings)
            );

            if (result) {
                this.msalService.instance.setActiveAccount(result.account);
                this.authenticated = true;
                this.user = await this.getUser();

                await this.router.navigate(['/mail']);
            }
        } catch (reason: any) {
            this.alertsService.addError(
                'Login failed',
                JSON.stringify(reason, null, 2)
            );
        }
    }

    // Sign out
    async signOut(): Promise<void> {
        await this.msalService.logout();
        this.user = undefined;
        this.graphClient = undefined;
        this.authenticated = false;
    }

    handleRedirects(): Observable<AuthenticationResult> {
        return this.msalService.handleRedirectObservable();
    }

    private async getUser(): Promise<User | undefined> {
        if (!this.authenticated) {
            return undefined;
        }

        // Create an authentication provider for the current user
        const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
            this.msalService.instance as PublicClientApplication,
            {
                account: this.msalService.instance.getActiveAccount()!,
                scopes: OAuthSettings.scopes,
                interactionType: InteractionType.Popup,
            }
        );

        // Initialize the Graph client
        this.graphClient = Client.initWithMiddleware({
            authProvider,
        });


        const a = await this.graphClient;

        // Get the user from Graph (GET /me)
        const graphUser: MicrosoftGraph.User = await this.graphClient
            .api('/me')
            .select('displayName,mail,mailboxSettings,userPrincipalName')
            .get();

        const user = new User();
        user.displayName = graphUser.displayName ?? '';
        // Prefer the mail property, but fall back to userPrincipalName
        user.email = graphUser.mail ?? graphUser.userPrincipalName ?? '';
        user.timeZone = graphUser.mailboxSettings?.timeZone ?? 'UTC';

        // Use default avatar
        user.avatar = '/assets/no-profile-photo.png';

        return user;
    }
}
