import { Component, OnInit } from '@angular/core';

import { BaseStatisticsComponent } from './base-statistics.component';
import { CategoryType } from '../../../infrastructure/models/category-type';

@Component({
	selector: 'transactions-transfers',
	templateUrl: 'base-statistics.component.html'
})

export class TransfersComponent extends BaseStatisticsComponent implements OnInit {
	ngOnInit() {
		this.initialize(CategoryType.Transfers);
	}
}
