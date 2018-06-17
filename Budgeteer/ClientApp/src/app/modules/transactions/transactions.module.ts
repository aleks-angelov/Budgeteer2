import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IncomeComponent } from './components/income.component';
import { OverviewComponent } from './components/overview.component';
import { SavingsComponent } from './components/savings.component';
import { SpendingComponent } from './components/spending.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule
	],
	exports: [],
	declarations: [
		OverviewComponent,
		SpendingComponent,
		IncomeComponent,
		SavingsComponent
	],
	providers: [DecimalPipe]
})
export class TransactionsModule { }
