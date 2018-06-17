import { Injectable } from '@angular/core';
import { EntitiesService } from '../../infrastructure/base/entities.service';
import { Category } from './models/category';
import { CategoryFilter } from './models/category-filter';
import { HttpClient } from '@angular/common/http';
import { CategoriesModule } from './categories.module';

@Injectable({
	providedIn: CategoriesModule
})
export class CategoriesService extends EntitiesService<Category, CategoryFilter> {
	constructor(httpClient: HttpClient) { super(httpClient, 'Categories/'); }
}
