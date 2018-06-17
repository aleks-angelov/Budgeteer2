import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Entity } from './entity';
import { EntityFilter } from './entity-filter';
import { Utils } from './utils';

export abstract class EntitiesService<T extends Entity, TFilter extends EntityFilter> {
	protected baseUrl = environment.apiUrl;

	constructor(protected httpClient: HttpClient, urlSuffix: string) {
		this.baseUrl += urlSuffix;
	}

	create(entity: T) {
		Utils.prune(entity);
		return this.httpClient.post<T>(this.baseUrl, entity);
	}

	readFiltered(filter: TFilter) {
		return this.httpClient.post<T[]>(this.baseUrl + 'Filtered', filter);
	}

	read(id: number) {
		return this.httpClient.get<T>(this.baseUrl + id);
	}

	update(entity: T) {
		Utils.prune(entity);
		return this.httpClient.put<T>(this.baseUrl + entity.id, entity);
	}

	delete(id: number) {
		return this.httpClient.delete<void>(this.baseUrl + id);
	}
}
