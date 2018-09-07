import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from '../../infrastructure/models/login-dto';
import { SignupDto } from '../../infrastructure/models/signup-dto';
import { User } from '../../infrastructure/models/user';
import { UserDto } from '../../infrastructure/models/user-dto';
import { UserFilter } from '../../infrastructure/models/user-filter';
import { EntitiesService } from '../../infrastructure/services/entities.service';

@Injectable({
	providedIn: 'root'
})
export class UsersService extends EntitiesService<User, UserFilter> {
	currentUser?: UserDto;

	constructor(httpClient: HttpClient) { super(httpClient, 'Users/'); }

	authenticate(loginModel: LoginDto): Observable<UserDto> {
		const url = this.baseUrl + 'Authenticate';
		return this.httpClient.post<UserDto>(url, loginModel);
	}

	register(signupModel: SignupDto): Observable<UserDto> {
		const url = this.baseUrl + 'Register';
		return this.httpClient.post<UserDto>(url, signupModel);
	}
}
