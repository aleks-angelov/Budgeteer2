import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { TokensService } from '../services/tokens.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private router: Router,
		private tokensService: TokensService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.url.indexOf('api/Users') !== -1) { return next.handle(req); }

		const authToken = this.tokensService.getToken();
		if (authToken) {
			const authReq = req.clone({
				setHeaders: { Authorization: `Bearer ${authToken}` }
			});
			return next.handle(authReq);
		}

		this.router.navigate(['']);
		return EMPTY;
	}
}
