import { DecimalPipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { chart } from 'highcharts';

import { ChartsService } from '../../../infrastructure/services/charts.service';
import { Transaction } from '../models/transaction';
import { TransactionFilter } from '../models/transaction-filter';
import { CategoryType, Category } from '../../categories/models/category';
import { CategoriesService } from '../../categories/categories.service';
import { TransactionsService } from '../transactions.service';
import { CategoryFilter } from '../../categories/models/category-filter';
import { UsersService } from '../../users/users.service';

@Component({
	selector: 'transactions-overview',
	templateUrl: 'overview.component.html'
})

export class OverviewComponent implements OnInit {
	transactions: Transaction[];
	transactionFilter: TransactionFilter;
	originalTransaction: Transaction;

	categoryType = CategoryType;
	categoryTypes: CategoryType[];

	debitCategories: Category[];
	creditCategories: Category[];
	savingsCategories: Category[];

	overallBalance: number;
	inEditMode: boolean;

	overviewHistoryChart: Highcharts.ChartObject;
	@ViewChild('overviewHistoryChartTarget') overviewHistoryChartTarget: ElementRef;
	overviewDistributionChart: Highcharts.ChartObject;
	@ViewChild('overviewDistributionChartTarget') overviewDistributionChartTarget: ElementRef;

	constructor(
		private categoriesService: CategoriesService,
		private chartsService: ChartsService,
		private decimalPipe: DecimalPipe,
		private transactionsService: TransactionsService,
		private usersService: UsersService) {
		this.transactions = [];
		this.transactionFilter = new TransactionFilter();
		if (this.usersService.currentUser) {
			this.transactionFilter.userId = this.usersService.currentUser.id;
		}

		this.categoryTypes = [1, 0, 2];

		this.debitCategories = [];
		this.creditCategories = [];
		this.savingsCategories = [];

		this.inEditMode = false;
	}

	ngOnInit() {
		this.getCategories();
		this.getTransactions();
	}

	changeFilterCategory(category: Category) {
		this.transactionFilter.categoryId = category.id;
		this.transactionFilter.category = category;
	}

	applyFilter() {
		this.transactionsService.readFiltered(this.transactionFilter)
			.subscribe(transactions => this.transactions = transactions || []);
	}

	resetFilter() {
		this.transactionFilter = new TransactionFilter();
		if (this.usersService.currentUser) {
			this.transactionFilter.userId = this.usersService.currentUser.id;
		}
		this.applyFilter();
	}

	changeCategory(transaction: Transaction, category: Category) {
		transaction.categoryId = category.id;
		transaction.category = category;
	}

	addTransaction() {
		this.transactions.unshift(new Transaction());
		this.inEditMode = true;
	}

	editTransaction(transaction: Transaction) {
		this.originalTransaction = new Transaction();
		Object.assign(this.originalTransaction, transaction);
		transaction.inEditMode = true;
		this.inEditMode = true;
	}

	removeTransaction(transaction: Transaction, index = 0) {
		if (transaction.id) {
			this.transactionsService.delete(transaction.id)
				.subscribe(() => {
					this.transactions.splice(index, 1);
					this.calculateOverallBalance();
				});
		} else {
			this.transactions.splice(index, 1);
		}
	}

	saveTransaction(transaction: Transaction) {
		if (transaction.id) {
			this.transactionsService.update(transaction)
				.subscribe(tr => transaction = tr);
		} else {
			this.transactionsService.create(transaction)
				.subscribe(tr => this.transactions[0] = tr);
		}
		transaction.inEditMode = false;
		this.inEditMode = false;
		this.calculateOverallBalance();
	}

	cancelTransaction(transaction: Transaction) {
		if (transaction.id) {
			Object.assign(transaction, this.originalTransaction);
			transaction.inEditMode = false;
		} else {
			this.removeTransaction(transaction);
		}
		this.inEditMode = false;
	}

	private getCategories() {
		this.categoriesService.readFiltered(new CategoryFilter())
			.subscribe(categories => {
				if (categories) {
					for (const category of categories) {
						if (category.type === CategoryType.Debit) {
							this.debitCategories.push(category);
						} else if (category.type === CategoryType.Credit) {
							this.creditCategories.push(category);
						} else { this.savingsCategories.push(category); }
					}
				}
			});
	}

	private getTransactions() {
		this.transactionsService.readFiltered(this.transactionFilter)
			.subscribe(transactions => {
				if (transactions) {
					for (let i = 0; i < transactions.length; i++) {
						transactions[i].date = new Date(transactions[i].date);
					}
					this.transactions = transactions;

					this.calculateOverallBalance();
				}
			});
	}
	private calculateOverallBalance() {
		this.overallBalance = 0;
		for (const transaction of this.transactions) {
			if (transaction.type === CategoryType.Debit) {
				this.overallBalance -= transaction.amount;
			} else if (transaction.type === CategoryType.Credit) {
				this.overallBalance += transaction.amount;
			} else if (transaction.type === CategoryType.Savings && transaction.category) {
				if (transaction.category.name === 'Deposit') {
					this.overallBalance -= transaction.amount;
				} else if (transaction.category.name === 'Withdrawal') {
					this.overallBalance += transaction.amount;
				}
			}
		}

		this.createOverviewCharts();
	}

	private createOverviewCharts() {
		this.createOverviewHistoryChart();
		this.createOverviewDistributionChart();
	}

	private createOverviewHistoryChart() {
		this.overviewHistoryChart = chart(this.overviewHistoryChartTarget.nativeElement, this.chartsService.columnChartOptions);
		const pipedOverallBalance = this.decimalPipe.transform(this.overallBalance, '1.2-2');
		this.overviewHistoryChart.setTitle(this.chartsService.getChartTitle(`Overall Balance: ${pipedOverallBalance} лв.`));
		this.overviewHistoryChart.xAxis[0].setCategories(this.chartsService.getColumnChartXAxisLabelsByPeriod(this.transactions));
		const historyChartSeries = this.chartsService.getColumnChartSeries(this.transactions, this.categoryTypes, undefined);
		for (let i = 0; i < historyChartSeries.length; i++) {
			this.overviewHistoryChart.addSeries(historyChartSeries[i]);
		}
	}

	private createOverviewDistributionChart() {
		this.overviewDistributionChart = chart(this.overviewDistributionChartTarget.nativeElement, this.chartsService.pieChartOptions);
		this.overviewDistributionChart.setTitle(this.chartsService.getChartTitle('Overall Spending Distribution'));
		this.overviewDistributionChart.addSeries(this.chartsService.getPieChartSeries(this.transactions, this.debitCategories, undefined));
	}
}
