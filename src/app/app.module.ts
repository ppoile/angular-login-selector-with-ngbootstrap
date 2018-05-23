import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { InMemoryDataService }  from './in-memory-data.service';
import { LoginSelectorComponent } from './login-selector/login-selector.component';
import { TestResultsComponent } from './test-results/test-results.component';

const routes: Routes = [
  { path: 'testresults', component: TestResultsComponent },
  { path: '', redirectTo: '/testresults', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    LoginSelectorComponent,
    TestResultsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }),
    NgbModule.forRoot(),
    RouterModule.forRoot(routes, { enableTracing: false }),
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
