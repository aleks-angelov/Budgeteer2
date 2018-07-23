import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { IncomeComponent } from './modules/transactions/components/income.component';
import { OverviewComponent } from './modules/transactions/components/overview.component';
import { TransfersComponent } from './modules/transactions/components/transfers.component';
import { SpendingComponent } from './modules/transactions/components/spending.component';
import { RegistratonComponent } from './modules/users/components/registration.component';
import { AuthGuard } from './infrastructure/services/auth-guard.service';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: HomeComponent
	},
	{
		path: 'Transactions',
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'Overview'
			},
			{
				path: 'Overview',
				component: OverviewComponent
			},
			{
				path: 'Spending',
				component: SpendingComponent
			},
			{
				path: 'Income',
				component: IncomeComponent
			},
			{
				path: 'Transfers',
				component: TransfersComponent
			}
		]
	},
	{
		path: 'Users',
		children: [
			{
				path: 'Registration',
				component: RegistratonComponent
			}
		]
	},
	{
		path: '**',
		component: HomeComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
