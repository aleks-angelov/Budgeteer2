import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Entity } from '../models/entity';
import { EntityFilter } from '../models/entity-filter';

export abstract class EntitiesService<T extends Entity, TFilter extends EntityFilter> {
	protected baseUrl = environment.apiUrl;

	constructor(protected httpClient: HttpClient, urlSuffix: string) {
		this.baseUrl += urlSuffix;
	}

	readFiltered(filter: TFilter) {
		return this.httpClient.post<T[]>(this.baseUrl + 'Filtered', filter);
	}

	read(id: number) {
		return this.httpClient.get<T>(this.baseUrl + id);
	}

	update(entity: T) {
		return this.httpClient.put<void>(this.baseUrl + entity.id, entity);
	}

	create(entity: T) {
		return this.httpClient.post<T>(this.baseUrl, entity);
	}

	delete(id: number) {
		return this.httpClient.delete<void>(this.baseUrl + id);
	}
}
