import { Entity } from '../../../infrastructure/base/entity';
import { Transaction } from '../../transactions/models/transaction';
import { UserGroup } from '../../user_groups/models/user-group';

export class User extends Entity {
	email: string;
	name: string;
	// passwordHash: string;
	userGroupId?: number;
	userGroup?: UserGroup;
	transactions: Transaction[];

	authToken: string;
}
