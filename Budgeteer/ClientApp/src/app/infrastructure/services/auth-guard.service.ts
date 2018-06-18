import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from '../../modules/users/users.service';
import { InfrastructureModule } from '../infrastructure.module';

@Injectable({
	providedIn: InfrastructureModule
})
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private usersService: UsersService) { }

	canActivate() {
		if (this.usersService.currentUser) {
			return true;
		} else {
			this.router.navigate(['']);
			return false;
		}
	}
}
