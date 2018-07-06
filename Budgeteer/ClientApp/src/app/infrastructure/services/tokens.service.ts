import { Injectable } from '@angular/core';
import { InfrastructureModule } from '../infrastructure.module';

@Injectable({
	providedIn: InfrastructureModule
})
export class TokensService {
	getToken(): string | null {
		return localStorage.getItem('token');
	}

	setToken(newToken: string) {
		localStorage.setItem('token', newToken);
	}

	removeToken() {
		localStorage.removeItem('token');
	}
}
