import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EntitiesService } from '../../infrastructure/base/entities.service';
import { Transaction } from './models/transaction';
import { TransactionFilter } from './models/transaction-filter';
import { TransactionsModule } from './transactions.module';

@Injectable({
	providedIn: TransactionsModule
})
export class TransactionsService extends EntitiesService<Transaction, TransactionFilter> {
	constructor(httpClient: HttpClient) { super(httpClient, 'Transactions/'); }
}
