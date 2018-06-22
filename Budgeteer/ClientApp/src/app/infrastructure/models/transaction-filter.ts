
import { EntityFilter } from './entity-filter';
import { CategoryType } from './category-type';
import { Category } from './category';
import { User } from './user';
import { UserGroup } from './user-group';

export class TransactionFilter extends EntityFilter {
	dateFrom?: Date;
	dateUntil?: Date;
	note: string;
	type?: CategoryType;
	categoryId?: number;
	category: Category;
	userId?: number;
	user: User;
	userGroupId?: number;
	userGroup: UserGroup;
}
