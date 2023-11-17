import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSurveysPatientComponent } from './list-surveys-patient/list-surveys-patient.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

const routes: Routes = [
	{ 
		path: 'patient', 
		component: ListSurveysPatientComponent,
	},
	{ 
		path: 'employee', 
		children: [
			{ 
				path: 'account', 
				loadChildren: () => import('./account/account.module').then(m => m.AccountModule) 
			},
			{ 
				path: 'main', 
				loadChildren: () => import('./administrative-analytical/admin-analytical.module')
					.then(m => m.AdminAnalyticalModule) 
			},
		]
	},
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
