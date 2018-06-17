import { Component } from '@angular/core';
import { UserGroup } from '../models/user-group';
import { UserGroupsService } from '../user-groups.service';

@Component({
	selector: 'usergroups-update',
	templateUrl: 'group-update.component.html'
})

export class GroupUpdateComponent {
	group: UserGroup;

	constructor(userGroupsService: UserGroupsService) {
		if (userGroupsService.currentUserGroup) {
			this.group = userGroupsService.currentUserGroup;
		}
	}
}
