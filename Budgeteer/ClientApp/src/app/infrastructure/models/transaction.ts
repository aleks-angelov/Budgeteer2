
import { Entity } from './entity';
import { CategoryType } from './category-type';
import { Category } from './category';
import { User } from './user';

export class Transaction extends Entity {
	date: Date;
	amount: number;
	note: string;
	type: CategoryType;
	categoryId: number;
	category: Category;
	userId: number;
	user: User;
}
