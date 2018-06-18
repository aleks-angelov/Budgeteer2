
import { Entity } from './entity';
import { User } from './user';

export class UserGroup extends Entity {
	name: string;
	creatorId: number;
	users: User[];
}
