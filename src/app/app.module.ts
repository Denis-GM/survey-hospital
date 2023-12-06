import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TUI_SANITIZER } from "@taiga-ui/core";

import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AdminAnalyticalModule } from "./employee/employee.module";
import { HttpClientModule } from "@angular/common/http";
import { PatientModule } from "./patient/patient.module";
import { SurveySolutionModule } from "./survey-solution/survey-solution.module";
import { CookieService } from "ngx-cookie-service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    TuiRootModule,

    SharedModule,
    AccountModule,
    AdminAnalyticalModule,
    SurveySolutionModule,
    PatientModule,
  ], 
  providers: [
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
