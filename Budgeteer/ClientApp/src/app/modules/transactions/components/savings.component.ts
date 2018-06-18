import { Component, OnInit } from '@angular/core';

import { BaseStatisticsComponent } from './base-statistics.component';
import { CategoryType } from '../../../infrastructure/models/category-type';

@Component({
	selector: 'transactions-savings',
	templateUrl: 'base-statistics.component.html'
})

export class SavingsComponent extends BaseStatisticsComponent implements OnInit {
	ngOnInit() {
		this.initialize(CategoryType.Savings);
	}
}
