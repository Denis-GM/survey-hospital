import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TUI_SANITIZER } from "@taiga-ui/core";

import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';
import { ListSurveysPatientComponent } from './list-surveys-patient/list-surveys-patient.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { AdminAnalyticalModule } from "./administrative-analytical/admin-analytical.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ListSurveysPatientComponent
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
    AdminAnalyticalModule
  ], 
  providers: [
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
