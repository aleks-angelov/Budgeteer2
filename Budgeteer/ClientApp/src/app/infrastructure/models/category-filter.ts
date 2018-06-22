
import { EntityFilter } from './entity-filter';
import { CategoryType } from './category-type';

export class CategoryFilter extends EntityFilter {
	name: string;
	type?: CategoryType;
	isActive?: boolean;
}
