import { TuiDialogModule, TuiAlertModule, TuiButtonModule } from "@taiga-ui/core";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiInputModule} from '@taiga-ui/kit';
import {TuiTextfieldControllerModule} from '@taiga-ui/core';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ButtonComponent } from './components/button/button.component';
import { RouterModule } from "@angular/router";
import { SearchComponent } from "./components/search/search.component";

@NgModule({
  declarations: [
    FooterComponent,
    NotFoundComponent,
    NavBarComponent,
    ButtonComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,

    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
  ],
  exports: [
    FooterComponent,
    NavBarComponent,
    SearchComponent,

    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
  ],
  // providers: [
  //   {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}
  // ],
})
export class SharedModule { }
