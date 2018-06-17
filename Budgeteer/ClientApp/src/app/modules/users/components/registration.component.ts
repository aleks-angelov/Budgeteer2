import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupDto } from '../models/signup-dto';
import { UsersService } from '../users.service';
import { TokensService } from '../../../infrastructure/services/tokens.service';

@Component({
	selector: 'users-registration',
	templateUrl: 'registration.component.html'
})

export class RegistratonComponent {
	signupModel: SignupDto;

	constructor(
		private router: Router,
		private tokensService: TokensService,
		private usersService: UsersService) {
		this.signupModel = new SignupDto();
	}

	register() {
		this.usersService.register(this.signupModel)
			.subscribe(user => {
				if (user) {
					this.usersService.currentUser = user;
					this.tokensService.setToken(user.authToken);
					this.router.navigate(['/Transactions/Overview']);
				}
			}, ((error: HttpErrorResponse) => console.log(error.statusText)));
	}
}
