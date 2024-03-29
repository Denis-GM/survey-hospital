import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found-page/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
	{ 
		path: '', 
		loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule)
	},
	{ 
		path: 'account', 
		loadChildren: () => import('./account/account.module').then(m => m.AccountModule) 
	},
	{ 
		path: 'main', 
		loadChildren: () => import('./employee/employee.module')
			.then(m => m.AdminAnalyticalModule),
		canActivate: [AuthGuard],
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
