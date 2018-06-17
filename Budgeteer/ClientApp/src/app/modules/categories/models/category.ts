import { Entity } from '../../../infrastructure/base/entity';
import { Transaction } from '../../transactions/models/transaction';

export enum CategoryType {
	Debit = 0,
	Credit = 1,
	Savings = 2
}

export class Category extends Entity {
	name: string;
	type: CategoryType;
	isActive: boolean;
	transactions: Transaction[];
}
