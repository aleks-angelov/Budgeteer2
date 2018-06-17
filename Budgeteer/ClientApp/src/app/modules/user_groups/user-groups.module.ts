import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserGroupsComponent } from './components/user-groups.component';
import { GroupCreateComponent } from './components/group-create.component';
import { GroupUpdateComponent } from './components/group-update.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule
	],
	exports: [],
	declarations: [
		GroupCreateComponent,
		GroupUpdateComponent,
		UserGroupsComponent
	],
	providers: []
})
export class UserGroupsModule { }
