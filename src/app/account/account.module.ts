import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TuiDataListWrapperModule, TuiInputModule, TuiSelectModule } from '@taiga-ui/kit';
import {TuiHintModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import { NgxPermissionsModule } from 'ngx-permissions';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent},
  { path: 'login', component: AuthorizationComponent },
  // { path: '', redirectTo: 'login' }
]

@NgModule({
  declarations: [
    RegistrationComponent,
    AuthorizationComponent,
    HeaderComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,

    TuiInputModule,
    TuiHintModule,
    TuiTextfieldControllerModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    
    NgxPermissionsModule.forChild()
  ],
  providers: [],
  exports: [RouterModule]
})
export class AccountModule { }
