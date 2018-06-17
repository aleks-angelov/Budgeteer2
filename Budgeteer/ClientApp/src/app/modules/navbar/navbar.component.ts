import { Component } from '@angular/core';

import { UsersService } from '../users/users.service';

@Component({
	selector: 'header-navbar',
	templateUrl: 'navbar.component.html'
})

export class NavbarComponent {
	constructor(private usersService: UsersService) { }

	isAuthenticated() {
		return this.usersService.currentUser !== undefined;
	}
}
