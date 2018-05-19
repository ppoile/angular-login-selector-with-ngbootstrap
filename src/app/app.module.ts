import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginSelectorComponent } from './login-selector/login-selector.component';

const routes: Routes = [
  { path: 'ttt', component: LoginSelectorComponent },
  { path: '', redirectTo: '/ttt', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    LoginSelectorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes, { enableTracing: false }),
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
