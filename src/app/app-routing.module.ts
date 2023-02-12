import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './test/home/home.component';
import { CalendarComponent } from './test/calendar/calendar.component';
import { MailComponent } from './test/mail/mail.component';

const routes: Routes = [
    {path: '', component: MainComponent},
    // { path: 'calendar', component: CalendarComponent },
    // { path: 'mail', component: MailComponent },

    // {path: 'test', component: HomeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
