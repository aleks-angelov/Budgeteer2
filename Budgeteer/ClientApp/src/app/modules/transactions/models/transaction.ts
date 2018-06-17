import { Entity } from '../../../infrastructure/base/entity';
import { Category, CategoryType } from '../../categories/models/category';
import { User } from '../../users/models/user';

export class Transaction extends Entity {
	date: Date;
	amount: number;
	note: string;
	type: CategoryType;
	categoryId: number;
	category: Category;
	userId: number;
	user: User;

	inEditMode: boolean;

	constructor() {
		super();
		this.date = new Date();
		this.type = CategoryType.Debit;
		this.userId = 1;
		this.inEditMode = true;
	}
}
