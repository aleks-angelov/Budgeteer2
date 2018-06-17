import { Injectable } from '@angular/core';
import { InfrastructureModule } from '../infrastructure.module';

@Injectable({
	providedIn: InfrastructureModule
})
export class TokensService {
	getToken(): string | null {
		return localStorage.getItem('budgeteer_token');
	}

	setToken(newToken: string) {
		localStorage.setItem('budgeteer_token', newToken);
	}

	removeToken() {
		localStorage.removeItem('budgeteer_token');
	}
}
