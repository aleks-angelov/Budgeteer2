import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EntitiesService } from '../../infrastructure/base/entities.service';
import { LoginDto } from './models/login-dto';
import { SignupDto } from './models/signup-dto';
import { User } from './models/user';
import { UserFilter } from './models/user-filter';

@Injectable({
	providedIn: 'root'
})
export class UsersService extends EntitiesService<User, UserFilter> {
	currentUser?: User;

	constructor(httpClient: HttpClient) { super(httpClient, 'Users/'); }

	authenticate(loginModel: LoginDto): Observable<User> {
		const url = this.baseUrl + 'Authenticate';
		return this.httpClient.post<User>(url, loginModel);
	}

	register(signupModel: SignupDto): Observable<User> {
		const url = this.baseUrl + 'Register';
		return this.httpClient.post<User>(url, signupModel);
	}
}
