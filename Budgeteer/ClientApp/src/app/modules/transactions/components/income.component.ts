import { Component, OnInit } from '@angular/core';

import { BaseStatisticsComponent } from './base-statistics.component';
import { CategoryType } from '../../../infrastructure/models/category-type';

@Component({
	selector: 'transactions-income',
	templateUrl: 'base-statistics.component.html'
})

export class IncomeComponent extends BaseStatisticsComponent implements OnInit {
	ngOnInit() {
		this.initialize(CategoryType.Credit);
	}
}
