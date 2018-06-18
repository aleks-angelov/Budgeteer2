import { Injectable } from '@angular/core';
import { DataPoint, IndividualSeriesOptions, TitleOptions } from 'highcharts';

import { InfrastructureModule } from '../infrastructure.module';
import { Category } from '../models/category';
import { CategoryType } from '../models/category-type';
import { Transaction } from '../models/transaction';
import { User } from '../models/user';

@Injectable({
	providedIn: InfrastructureModule
})
export class ChartsService {
	readonly columnChartOptions: Highcharts.Options = {
		chart: {
			type: 'column'
		},
		xAxis: {
			categories: [],
			crosshair: true
		},
		yAxis: {
			labels: {
				format: '{value} лв.'
			},
			title: {
				text: undefined
			}
		},
		tooltip: {
			headerFormat: '<span>{point.key}</span><table>',
			pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y:.2f} лв.</b></td></tr>',
			footerFormat: '</table>',
			shared: true,
			useHTML: true
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0
			}
		},
		series: [],
		credits: {
			enabled: false
		}
	};

	readonly pieChartOptions: Highcharts.Options = {
		chart: {
			type: 'pie'
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle'
		},
		tooltip: {
			headerFormat: undefined,
			pointFormat: '{point.name}: <b>{point.y:.2f} лв.</b> ({point.percentage:.1f}%)'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [],
		credits: {
			enabled: false
		}
	};

	getPreviousYearDate(date: Date) {
		return new Date(new Date().setFullYear(date.getFullYear() - 1));
	}

	getChartTitle(text: string): TitleOptions {
		const title: TitleOptions = {
			style: {
				'color': '#333333',
				'fontSize': '1rem'
			},
			text: text
		};

		return title;
	}

	getColumnChartXAxisLabelsByPeriod(transactions: Transaction[]): string[] {
		if (transactions.length) {
			const monthLabels: string[] = [];
			let dateFrom = transactions[transactions.length - 1].date;
			const dateUntil = transactions[0].date;

			const dateUntilPreviousYear = this.getPreviousYearDate(dateUntil);
			if (dateFrom < dateUntilPreviousYear) { dateFrom = dateUntilPreviousYear; }

			const dateFromYear = dateFrom.getFullYear() % 100;
			const dateUntilYear = dateUntil.getFullYear() % 100;

			if (dateFromYear !== dateUntilYear) {
				for (let month = dateFrom.getMonth(); month < 12; month++) {
					const label = `${month < 9 ? '0' : ''}${month + 1}.${dateFromYear}`;
					monthLabels.push(label);
				}
				for (let month = 0; month <= dateUntil.getMonth(); month++) {
					const label = `${month < 9 ? '0' : ''}${month + 1}.${dateUntilYear}`;
					monthLabels.push(label);
				}
			} else {
				for (let month = dateFrom.getMonth(); month <= dateUntil.getMonth(); month++) {
					const label = `${month < 9 ? '0' : ''}${month + 1}.${dateFromYear}`;
					monthLabels.push(label);
				}
			}

			return monthLabels;
		}

		return [];
	}

	getColumnChartSeries(transactions: Transaction[], types?: CategoryType[], categories?: Category[]): IndividualSeriesOptions[] {
		if (transactions.length) {
			if (types) {
				return this.getColumnSeriesByTypes(transactions, types);
			} else if (categories) {
				return this.getColumnSeriesByCategories(transactions, categories);
			}
		}

		return [];
	}

	getPieChartSeries(transactions: Transaction[], categories?: Category[], users?: User[]): IndividualSeriesOptions {
		if (transactions.length) {
			if (categories) {
				return this.getPieChartSeriesByCategories(transactions, categories);
			} else if (users) {
				return this.getPieChartSeriesByUsers(transactions, users);
			}
		}

		return {};
	}

	private getColumnSeriesByTypes(transactions: Transaction[], types: CategoryType[]): IndividualSeriesOptions[] {
		const columnSeries = new Array<IndividualSeriesOptions>(types.length);
		for (let i = 0; i < types.length; i++) {
			const typeSeries: IndividualSeriesOptions = {
				name: CategoryType[types[i]],
				data: []
			};
			columnSeries[i] = typeSeries;
		}

		let currentMonth = transactions[0].date.getMonth() + 1;
		for (let i = 0; i < transactions.length; i++) {
			if (transactions[i].date.getMonth() !== currentMonth) {
				for (let j = 0; j < columnSeries.length; j++) {
					(columnSeries[j].data as number[]).unshift(0);
				}
				currentMonth = transactions[i].date.getMonth();
			}

			const typeIndex = types.findIndex(type => type === transactions[i].type);
			if (typeIndex !== -1) {
				if (transactions[i].type !== CategoryType.Savings || transactions[i].category.name === 'Deposit') {
					(columnSeries[typeIndex].data as number[])[0] += transactions[i].amount;
				} else {
					(columnSeries[typeIndex].data as number[])[0] -= transactions[i].amount;
				}
			}
		}

		return columnSeries;
	}

	private getColumnSeriesByCategories(transactions: Transaction[], categories: Category[]): IndividualSeriesOptions[] {
		const columnSeries = new Array<IndividualSeriesOptions>(categories.length);
		for (let i = 0; i < categories.length; i++) {
			const categorySeries: IndividualSeriesOptions = {
				name: categories[i].name,
				data: []
			};
			columnSeries[i] = categorySeries;
		}

		let currentMonth = transactions[0].date.getMonth() + 1;
		for (let i = 0; i < transactions.length; i++) {
			if (transactions[i].date.getMonth() !== currentMonth) {
				for (let j = 0; j < columnSeries.length; j++) {
					(columnSeries[j].data as number[]).unshift(0);
				}
				currentMonth = transactions[i].date.getMonth();
			}

			const categoryIndex = categories.findIndex(category => category.id === transactions[i].categoryId);
			if (categoryIndex !== -1) {
				if (transactions[i].category.name !== 'Withdrawal') {
					(columnSeries[categoryIndex].data as number[])[0] += transactions[i].amount;
				} else {
					(columnSeries[categoryIndex].data as number[])[0] -= transactions[i].amount;
				}
			}
		}

		return columnSeries;
	}

	private getPieChartSeriesByCategories(transactions: Transaction[], categories: Category[]): IndividualSeriesOptions {
		const pieSeries: IndividualSeriesOptions = {
			name: undefined,
			data: new Array<DataPoint>(categories.length)
		};
		const pieSeriesData = pieSeries.data as DataPoint[];
		for (let i = 0; i < categories.length; i++) {
			pieSeriesData[i] = {};
			pieSeriesData[i].name = categories[i].name;
			pieSeriesData[i].y = 0;
		}

		for (let i = 0; i < transactions.length; i++) {
			const categoryIndex = pieSeriesData.findIndex(dataPoint => dataPoint.name === transactions[i].category.name);
			if (categoryIndex !== -1) {
				(pieSeriesData[categoryIndex].y as number) += transactions[i].amount;
			}
		}

		return pieSeries;
	}

	private getPieChartSeriesByUsers(transactions: Transaction[], users: User[]): IndividualSeriesOptions {
		const pieSeries: IndividualSeriesOptions = {
			name: undefined,
			data: new Array<DataPoint>(users.length)
		};
		const pieSeriesData = pieSeries.data as DataPoint[];
		for (let i = 0; i < users.length; i++) {
			pieSeriesData[i] = {};
			pieSeriesData[i].name = users[i].name;
			pieSeriesData[i].y = 0;
		}

		for (let i = 0; i < transactions.length; i++) {
			const userIndex = pieSeriesData.findIndex(dataPoint => dataPoint.name === transactions[i].user.name);
			if (userIndex !== -1) {
				(pieSeriesData[userIndex].y as number) += transactions[i].amount;
			}
		}

		return pieSeries;
	}
}
