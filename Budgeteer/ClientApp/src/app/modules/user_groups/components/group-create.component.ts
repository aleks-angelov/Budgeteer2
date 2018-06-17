import { Component } from '@angular/core';
import { UserGroup } from '../models/user-group';
import { UserGroupsService } from '../user-groups.service';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/models/user';
import { UserFilter } from '../../users/models/user-filter';


@Component({
	selector: 'usergroups-create',
	templateUrl: 'group-create.component.html'
})

export class GroupCreateComponent {
	userGroup: UserGroup;

	constructor(
		private userGroupsService: UserGroupsService,
		private usersService: UsersService) {
		this.userGroup = new UserGroup();
		if (this.usersService.currentUser) {
			this.userGroup.creatorId = this.usersService.currentUser.id;
			this.userGroup.users.push(this.usersService.currentUser);
		}
	}

	addUser() {
		this.userGroup.users.push(new User());
	}

	findUser(email: string) {
		const filter = new UserFilter();
		filter.email = email;
		this.usersService.readFiltered(filter)
			.subscribe(users => {
				if (users && users.length && this.userGroup.users) {
					this.userGroup.users.pop();
					this.userGroup.users.push(users[0]);
				}
			});
	}

	removeUser(index: number) {
		this.userGroup.users.splice(index, 1);
	}

	create() {
		this.userGroupsService.create(this.userGroup)
			.subscribe(userGroup => this.userGroup = userGroup);
	}
}
