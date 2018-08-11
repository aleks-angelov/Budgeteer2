import { DecimalPipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';
import { chart } from 'highcharts';
import { CategoryType } from 'src/app/infrastructure/models/category-type';
import { Category } from '../../../infrastructure/models/category';
import { CategoryFilter } from '../../../infrastructure/models/category-filter';
import { Transaction } from '../../../infrastructure/models/transaction';
import { TransactionFilter } from '../../../infrastructure/models/transaction-filter';
import { ChartsService } from '../../../infrastructure/services/charts.service';
import { CategoriesService } from '../../categories/categories.service';
import { UsersService } from '../../users/users.service';
import { TransactionsService } from '../transactions.service';

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
	transfersCategories: Category[];

	overallBalance: number;
	inEditMode: boolean;

	removalTransaction: Transaction;
	removalIndex: number;
	showRemovalModal: boolean;

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
		this.transfersCategories = [];

		this.inEditMode = false;

		this.showRemovalModal = false;
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
		const newTransaction = new Transaction();
		newTransaction.date = new Date();
		newTransaction.type = CategoryType.Debit;

		if (this.usersService.currentUser) {
			newTransaction.userId = this.usersService.currentUser.id;
		}

		this.transactions.unshift(newTransaction);
		newTransaction.inEditMode = true;
		this.inEditMode = true;
	}

	exportTransactions() {
		this.transactionsService.export()
			.subscribe(file => saveAs(file));
	}

	editTransaction(transaction: Transaction) {
		this.originalTransaction = new Transaction();
		Object.assign(this.originalTransaction, transaction);
		transaction.inEditMode = true;
		this.inEditMode = true;
	}

	prepareRemoval(transaction: Transaction, index: number) {
		this.removalTransaction = transaction;
		this.removalIndex = index;
		this.showRemovalModal = true;
	}

	removeTransaction(transaction: Transaction, index = 0) {
		if (transaction.id) {
			this.transactionsService.delete(transaction.id)
				.subscribe(() => {
					this.transactions.splice(index, 1);
					this.calculateOverallBalance();
					this.showRemovalModal = false;
				});
		} else {
			this.transactions.splice(index, 1);
		}
	}

	saveTransaction(transaction: Transaction) {
		transaction.date = new Date(transaction.date);
		transaction.inEditMode = false;

		if (transaction.id) {
			this.transactionsService.update(transaction)
				.subscribe();
		} else {
			this.transactionsService.create(transaction)
				.subscribe(tr => this.transactions[0] = tr);
		}

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
						} else { this.transfersCategories.push(category); }
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
			} else if (transaction.type === CategoryType.Transfers && transaction.category) {
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
