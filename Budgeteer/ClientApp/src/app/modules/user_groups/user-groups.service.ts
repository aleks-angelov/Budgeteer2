import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EntitiesService } from '../../infrastructure/base/entities.service';
import { UserGroup } from '../../infrastructure/models/user-group';
import { UserGroupFilter } from '../../infrastructure/models/user-group-filter';

@Injectable({
	providedIn: 'root'
})
export class UserGroupsService extends EntitiesService<UserGroup, UserGroupFilter> {
	currentUserGroup?: UserGroup;

	constructor(httpClient: HttpClient) { super(httpClient, 'UserGroups/'); }
}
