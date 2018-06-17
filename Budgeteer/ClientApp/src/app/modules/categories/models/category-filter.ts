import { EntityFilter } from '../../../infrastructure/base/entity-filter';
import { CategoryType } from './category';

export class CategoryFilter extends EntityFilter {
	name: string;
	type: CategoryType;
	isActive: boolean;

	constructor() {
		super();
		this.isActive = true;
	}
}
