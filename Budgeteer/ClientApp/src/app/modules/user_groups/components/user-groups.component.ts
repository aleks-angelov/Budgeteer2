import { Component } from '@angular/core';
import { UserGroupsService } from '../user-groups.service';

@Component({
	selector: 'usergroups-root',
	templateUrl: 'user-groups.component.html'
})

export class UserGroupsComponent {
	hasExisting: boolean;

	constructor(userGroupsService: UserGroupsService) {
		this.hasExisting = userGroupsService.currentUserGroup ? true : false;
	}
}
