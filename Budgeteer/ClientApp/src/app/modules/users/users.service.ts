import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EntitiesService } from '../../infrastructure/base/entities.service';
import { LoginDto } from '../../infrastructure/models/login-dto';
import { SignupDto } from '../../infrastructure/models/signup-dto';
import { User } from '../../infrastructure/models/user';
import { UserFilter } from '../../infrastructure/models/user-filter';

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
