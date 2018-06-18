
import { Entity } from './entity';
import { CategoryType } from './category-type';

export class Category extends Entity {
	name: string;
	type: CategoryType;
	isActive: boolean;
}
