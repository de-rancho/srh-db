import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionService } from './services/connection.service';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { DegreeSelectionComponent } from './components/degree-selection/degree-selection.component';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
// nksfadnkfndnf //
import { ReactiveFormsModule } from '@angular/forms';
import { NabVarComponent } from './test/nab-var/nab-var.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './test/home/home.component';
import { AlertsComponent } from './test/alerts/alerts.component';
import { BrowserCacheLocation, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { MSAL_INSTANCE, MsalModule, MsalService } from '@azure/msal-angular';
import { OAuthSettings } from './test/oauth';
import { CalendarComponent } from './test/calendar/calendar.component';
import { MailComponent } from './test/mail/mail.component';
import { DateCustomPipe } from './test/dateCustom.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddNewComponent } from './components/add-new/add-new.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HighlightTextPipe } from './pipes/highlight-text.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { MatIconModule } from '@angular/material/icon';
import { StudentDataComponent } from './components/student-data/student-data.component';
import { StudentCompentecesComponent } from './components/student-compenteces/student-compenteces.component';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        DegreeSelectionComponent,
        NabVarComponent,
        HomeComponent,
        AlertsComponent,
        CalendarComponent,
        MailComponent,
        DateCustomPipe,
        AddNewComponent,
        HighlightTextPipe,
        CustomSelectComponent,
        CustomSelectComponent,
        StudentDataComponent,
        StudentCompentecesComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        MatSelectModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        NgbModule,
        MsalModule,
        MatButtonModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule
    ],
    providers: [ConnectionService,
        {
            provide: MSAL_INSTANCE,
            useFactory: MSALInstanceFactory
        },
        MsalService,
        // {provide: LOCALE_ID, useValue: 'fr-FR'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

let msalInstance: IPublicClientApplication | undefined;

export function MSALInstanceFactory(): IPublicClientApplication {
    msalInstance = msalInstance ?? new PublicClientApplication({
        auth: {
            clientId: OAuthSettings.appId,
            redirectUri: OAuthSettings.redirectUri,
            postLogoutRedirectUri: OAuthSettings.redirectUri
        },
        cache: {
            cacheLocation: BrowserCacheLocation.LocalStorage,
        }
    });

    return msalInstance;
}
