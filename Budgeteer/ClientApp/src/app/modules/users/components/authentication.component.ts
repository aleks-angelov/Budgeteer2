import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/modules/users/models/login-dto';
import { UserGroupsService } from '../../user_groups/user-groups.service';
import { UsersService } from '../users.service';
import { TokensService } from '../../../infrastructure/services/tokens.service';

@Component({
	selector: 'users-authentication',
	templateUrl: 'authentication.component.html'
})

export class AuthenticationComponent {
	loginModel: LoginDto;

	constructor(
		private router: Router,
		private tokensService: TokensService,
		private userGroupsService: UserGroupsService,
		private usersService: UsersService) {
		this.loginModel = new LoginDto();
	}

	isAuthenticated() {
		return this.usersService.currentUser !== undefined;
	}

	authenticate() {
		this.usersService.authenticate(this.loginModel)
			.subscribe(user => {
				if (user) {
					this.usersService.currentUser = user;
					this.tokensService.setToken(user.authToken);

					if (user.userGroupId) {
						this.userGroupsService.read(user.userGroupId)
							.subscribe(userGroup => this.userGroupsService.currentUserGroup = userGroup);
					}
					this.router.navigate(['/Transactions/Overview']);
				}
			}, ((error: HttpErrorResponse) => console.log(error.statusText)));
	}

	unauthenticate() {
		this.usersService.currentUser = undefined;
		this.tokensService.removeToken();

		this.userGroupsService.currentUserGroup = undefined;
		this.router.navigate(['']);
	}

	getUserFirstName(): string {
		if (this.usersService.currentUser) {
			const userNames = this.usersService.currentUser.name.split(' ');
			return userNames[0];
		}
		return '';
	}
}
