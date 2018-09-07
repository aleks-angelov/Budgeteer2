import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupDto } from '../../../infrastructure/models/signup-dto';
import { TokensService } from '../../../infrastructure/services/tokens.service';
import { UsersService } from '../users.service';

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
			.subscribe(userDto => {
				if (userDto) {
					this.usersService.currentUser = userDto;
					this.tokensService.setToken(userDto.authToken);
					this.router.navigate(['/Transactions/Overview']);
				}
			}, ((error: HttpErrorResponse) => console.log(error.statusText)));
	}
}
