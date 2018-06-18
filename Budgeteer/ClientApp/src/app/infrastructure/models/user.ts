
import { Entity } from './entity';
import { UserGroup } from './user-group';

export class User extends Entity {
	email: string;
	name: string;
	passwordHash: string;
	userGroupId: number;
	userGroup: UserGroup;
	authToken: string;
}
