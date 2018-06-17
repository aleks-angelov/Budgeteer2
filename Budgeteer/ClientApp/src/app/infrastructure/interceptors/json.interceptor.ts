import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from '../base/utils';

@Injectable()
export class JsonInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const contentType = req.detectContentTypeHeader();
		if (!req.body || contentType !== 'application/json' || typeof req.body !== 'object') {
			return next.handle(req);
		}

		const newBody = Utils.clone(req.body);
		Utils.prune(newBody);
		const newReq = req.clone({ body: newBody });

		return next.handle(newReq);
	}
}
