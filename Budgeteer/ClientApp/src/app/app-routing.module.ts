import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { IncomeComponent } from './modules/transactions/components/income.component';
import { OverviewComponent } from './modules/transactions/components/overview.component';
import { SavingsComponent } from './modules/transactions/components/savings.component';
import { SpendingComponent } from './modules/transactions/components/spending.component';
import { RegistratonComponent } from './modules/users/components/registration.component';
import { UserGroupsComponent } from './modules/user_groups/components/user-groups.component';
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
				path: 'Savings',
				component: SavingsComponent
			}
		]
	},
	{
		path: 'UserGroups',
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				pathMatch: 'full',
				component: UserGroupsComponent
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
