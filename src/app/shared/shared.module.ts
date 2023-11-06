import { TuiDialogModule, TuiAlertModule, TuiButtonModule } from "@taiga-ui/core";

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
  ],
  exports: [
    FooterComponent,
    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
  ],
  // providers: [
  //   {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}
  // ],
})
export class SharedModule { }
