import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

const routes: Routes = [
	{ 
		path: 'patient', 
		loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule)
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
	{ 
		path: 'fill', 
		loadChildren: () => import('./survey-solution/survey-solution.module')
			.then(m => m.SurveySolutionModule)
  	},
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
