
import { UserGroup } from './user-group';

export class UserDto {
	id: number;
	email: string;
	name: string;
	userGroupId?: number;
	userGroup: UserGroup;
	authToken: string;
}
