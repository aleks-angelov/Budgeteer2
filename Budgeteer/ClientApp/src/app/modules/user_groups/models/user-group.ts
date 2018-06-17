import { Entity } from '../../../infrastructure/base/entity';
import { User } from '../../users/models/user';

export class UserGroup extends Entity {
	name: string;
	creatorId: number;
	users: User[];

	constructor() {
		super();
		this.users = [];
	}
}
