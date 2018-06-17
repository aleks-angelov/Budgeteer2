import { EntityFilter } from '../../../infrastructure/base/entity-filter';
import { Category, CategoryType } from '../../categories/models/category';
import { UserGroup } from '../../user_groups/models/user-group';
import { User } from '../../users/models/user';

export class TransactionFilter extends EntityFilter {
	dateFrom: Date;
	dateUntil: Date;
	note: string;
	type: CategoryType;
	categoryId: number;
	userId: number;
	userGroupId?: number;

	category: Category;
	user: User;
	userGroup?: UserGroup;

	constructor() {
		super();
		this.dateUntil = new Date();
	}
}
