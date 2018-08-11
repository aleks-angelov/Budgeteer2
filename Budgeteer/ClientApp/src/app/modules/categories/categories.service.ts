import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntitiesService } from '../../infrastructure/services/entities.service';
import { Category } from '../../infrastructure/models/category';
import { CategoryFilter } from '../../infrastructure/models/category-filter';
import { CategoriesModule } from './categories.module';

@Injectable({
	providedIn: CategoriesModule
})
export class CategoriesService extends EntitiesService<Category, CategoryFilter> {
	constructor(httpClient: HttpClient) { super(httpClient, 'Categories/'); }
}
