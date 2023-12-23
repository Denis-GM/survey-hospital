import { TuiDialogModule, TuiAlertModule, TuiButtonModule } from "@taiga-ui/core";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiInputModule} from '@taiga-ui/kit';
import {TuiTextfieldControllerModule} from '@taiga-ui/core';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './not-found-page/not-found.component';
import { ButtonComponent } from './components/button/button.component';
import { RouterModule } from "@angular/router";
import { SearchComponent } from "./components/search/search.component";
import { ModalWindowComponent } from './components/modal-window-link/modal-window-link.component';
import { NgxPermissionsModule } from "ngx-permissions";

@NgModule({
  declarations: [
    FooterComponent,
    NotFoundComponent,
    ButtonComponent,
    SearchComponent,
    ModalWindowComponent,
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
    
    NgxPermissionsModule.forChild()
  ],
  exports: [
    FooterComponent,
    SearchComponent,
    ButtonComponent,
    ModalWindowComponent,

    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
  ],
  // providers: [
  //   {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}
  // ],
})
export class SharedModule { }
