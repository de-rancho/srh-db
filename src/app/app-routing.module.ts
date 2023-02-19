import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AddNewComponent } from './components/add-new/add-new.component';

const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'new', component: AddNewComponent},
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
