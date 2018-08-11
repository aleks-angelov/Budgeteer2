import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntitiesService } from '../../infrastructure/services/entities.service';
import { Transaction } from '../../infrastructure/models/transaction';
import { TransactionFilter } from '../../infrastructure/models/transaction-filter';
import { TransactionsModule } from './transactions.module';


@Injectable({
	providedIn: TransactionsModule
})
export class TransactionsService extends EntitiesService<Transaction, TransactionFilter> {
	constructor(httpClient: HttpClient) { super(httpClient, 'Transactions/'); }

	export() {
		return this.httpClient.get<File>(this.baseUrl + 'Export');
	}
}
