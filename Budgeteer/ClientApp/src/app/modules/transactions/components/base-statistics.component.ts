import { DecimalPipe } from '@angular/common';
import { ElementRef, ViewChild } from '@angular/core';
import { chart } from 'highcharts';

import { ChartsService } from '../../../infrastructure/services/charts.service';
import { CategoriesService } from '../../categories/categories.service';
import { TransactionsService } from '../transactions.service';
import { UserGroupsService } from '../../user_groups/user-groups.service';
import { Category } from '../../../infrastructure/models/category';
import { CategoryFilter } from '../../../infrastructure/models/category-filter';
import { CategoryType } from '../../../infrastructure/models/category-type';
import { Transaction } from '../../../infrastructure/models/transaction';
import { TransactionFilter } from '../../../infrastructure/models/transaction-filter';
import { User } from '../../../infrastructure/models/user';
import { UserGroup } from '../../../infrastructure/models/user-group';

export abstract class BaseStatisticsComponent {
	categories: Category[];
	categoryType: CategoryType;
	userGroup: UserGroup;

	categoryTransactions: Transaction[];
	categoryTransactionFilter: TransactionFilter;
	categoryTotal: number;

	userTransactions: Transaction[];
	userTransactionFilter: TransactionFilter;
	userTotal: number;

	seriesColor: string;
	seriesPrefix: string;

	categoryHistoryChart: Highcharts.ChartObject;
	@ViewChild('categoryHistoryChartTarget') categoryHistoryChartTarget: ElementRef;

	categoryDistributionChart: Highcharts.ChartObject;
	@ViewChild('categoryDistributionChartTarget') categoryDistributionChartTarget: ElementRef;

	userHistoryChart: Highcharts.ChartObject;
	@ViewChild('userHistoryChartTarget') userHistoryChartTarget: ElementRef;

	userDistributionChart: Highcharts.ChartObject;
	@ViewChild('userDistributionChartTarget') userDistributionChartTarget: ElementRef;

	constructor(
		protected categoriesService: CategoriesService,
		protected chartsService: ChartsService,
		protected decimalPipe: DecimalPipe,
		protected transactionsService: TransactionsService,
		protected userGroupsService: UserGroupsService
	) {
		this.categories = [];
		this.userGroup = new UserGroup();

		this.categoryTransactions = [];
		this.categoryTransactionFilter = new TransactionFilter();

		this.userTransactions = [];
		this.userTransactionFilter = new TransactionFilter();
	}

	initialize(categoryType: CategoryType) {
		this.categoryType = categoryType;
		this.setSeriesMetadata();

		const filter = new CategoryFilter();
		filter.type = this.categoryType;

		this.categoriesService.readFiltered(filter)
			.subscribe(categories => {
				this.categories = categories || [];
				this.userGroup = this.userGroupsService.currentUserGroup || new UserGroup();

				this.categoryTransactionFilter.categoryId = this.categories[0].id;
				this.categoryTransactionFilter.category = this.categories[0];
				this.categoryTransactionFilter.userGroupId = this.userGroup.id;
				this.categoryTransactionFilter.userGroup = this.userGroup;
				this.resetFilter(this.categoryTransactionFilter);

				if (this.userGroup.users) {
					this.userTransactionFilter.userId = this.userGroup.users[0].id;
					this.userTransactionFilter.user = this.userGroup.users[0];
				}
				this.userTransactionFilter.userGroupId = this.userGroup.id;
				this.userTransactionFilter.userGroup = this.userGroup;
				this.resetFilter(this.userTransactionFilter);
			});
	}

	changeFilterCategory(category: Category) {
		this.categoryTransactionFilter.categoryId = category.id;
		this.categoryTransactionFilter.category = category;
	}

	changeFilterUser(user: User) {
		this.userTransactionFilter.userId = user.id;
		this.userTransactionFilter.user = user;
	}

	applyFilter(filter: TransactionFilter) {
		this.transactionsService.readFiltered(filter)
			.subscribe(transactions => {
				if (transactions) {
					for (let i = 0; i < transactions.length; i++) {
						transactions[i].date = new Date(transactions[i].date);
					}

					if (filter.categoryId) {
						this.categoryTransactions = transactions;
						this.calculateCategoryTotal();
					} else if (filter.userId) {
						this.userTransactions = transactions;
						this.calculateUserTotal();
					}
				}
			});
	}

	resetFilter(filter: TransactionFilter) {
		if (filter.categoryId && this.categories.length) {
			filter.categoryId = this.categories[0].id;
			filter.category = this.categories[0];
		} else if (filter.userId && this.userGroup.users && this.userGroup.users.length) {
			filter.userId = this.userGroup.users[0].id;
			filter.user = this.userGroup.users[0];
		}

		filter.dateUntil = new Date();
		filter.dateFrom = this.chartsService.getPreviousYearDate(filter.dateUntil);
		filter.type = this.categoryType;
		this.applyFilter(filter);
	}

	protected setSeriesMetadata() {
		switch (this.categoryType) {
			case CategoryType.Debit: {
				this.seriesColor = '#434348';
				this.seriesPrefix = 'Spending';
				break;
			}
			case CategoryType.Credit: {
				this.seriesColor = '#7CB5EC';
				this.seriesPrefix = 'Income';
				break;
			}
			case CategoryType.Transfers: {
				this.seriesColor = '#90ED7D';
				this.seriesPrefix = 'Transfers';
				break;
			}
			default: {
				this.seriesColor = '#434348';
				this.seriesPrefix = 'Other';
				break;
			}
		}
	}

	protected calculateCategoryTotal() {
		this.categoryTotal = 0;
		for (const transaction of this.categoryTransactions) {
			this.categoryTotal += transaction.amount;
		}

		this.createCategoryCharts();
	}

	protected calculateUserTotal() {
		this.userTotal = 0;
		for (const transaction of this.userTransactions) {
			this.userTotal += transaction.amount;
		}

		this.createUserCharts();
	}

	protected createCategoryCharts() {
		this.createCategoryHistoryChart();
		this.createCategoryDistributionChart();
	}

	protected createUserCharts() {
		this.createUserHistoryChart();
		this.createUserDistributionChart();
	}

	protected createCategoryHistoryChart() {
		this.categoryHistoryChart = chart
			(this.categoryHistoryChartTarget.nativeElement, this.chartsService.columnChartOptions);
		const pipedCategoryTotal = this.decimalPipe.transform(this.categoryTotal, '1.2-2');
		this.categoryHistoryChart.setTitle(this.chartsService.getChartTitle
			(`${this.seriesPrefix} for ${this.categoryTransactionFilter.category.name}: ${pipedCategoryTotal} лв.`));
		this.categoryHistoryChart.xAxis[0].setCategories
			(this.chartsService.getColumnChartXAxisLabelsByPeriod(this.categoryTransactions));
		const categoryHistoryChartSeries = this.chartsService.getColumnChartSeries(this.categoryTransactions,
			undefined, [this.categoryTransactionFilter.category]);
		if (categoryHistoryChartSeries.length) {
			categoryHistoryChartSeries[0].color = this.seriesColor;
			for (let i = 0; i < categoryHistoryChartSeries.length; i++) {
				this.categoryHistoryChart.addSeries(categoryHistoryChartSeries[i]);
			}
		}
	}

	protected createCategoryDistributionChart() {
		this.categoryDistributionChart = chart
			(this.categoryDistributionChartTarget.nativeElement, this.chartsService.pieChartOptions);
		this.categoryDistributionChart.setTitle
			(this.chartsService.getChartTitle(`${this.seriesPrefix} Distribution for ${this.categoryTransactionFilter.category.name}`));
		this.categoryDistributionChart.addSeries
			(this.chartsService.getPieChartSeries(this.categoryTransactions, undefined, this.userGroup.users));
	}

	protected createUserHistoryChart() {
		this.userHistoryChart = chart
			(this.userHistoryChartTarget.nativeElement, this.chartsService.columnChartOptions);
		const pipedUserTotal = this.decimalPipe.transform(this.userTotal, '1.2-2');
		this.userHistoryChart.setTitle(this.chartsService.getChartTitle
			(`${this.seriesPrefix} of ${this.userTransactionFilter.user.name}: ${pipedUserTotal} лв.`));
		this.userHistoryChart.xAxis[0].setCategories
			(this.chartsService.getColumnChartXAxisLabelsByPeriod(this.userTransactions));
		const userHistoryChartSeries =
			this.chartsService.getColumnChartSeries(this.userTransactions, [this.categoryType], undefined);
		if (userHistoryChartSeries.length) {
			userHistoryChartSeries[0].color = this.seriesColor;
			for (let i = 0; i < userHistoryChartSeries.length; i++) {
				this.userHistoryChart.addSeries(userHistoryChartSeries[i]);
			}
		}
	}

	protected createUserDistributionChart() {
		this.userDistributionChart = chart
			(this.userDistributionChartTarget.nativeElement, this.chartsService.pieChartOptions);
		this.userDistributionChart.setTitle
			(this.chartsService.getChartTitle(`${this.seriesPrefix} Distribution of ${this.userTransactionFilter.user.name}`));
		this.userDistributionChart.addSeries
			(this.chartsService.getPieChartSeries(this.userTransactions, this.categories, undefined));
	}
}
