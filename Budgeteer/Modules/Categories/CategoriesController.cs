using Budgeteer.Infrastructure;

namespace Budgeteer.Modules.Categories
{
	public class CategoriesController : EntitiesController<CategoryModel, CategoryFilterModel>
	{
		public CategoriesController(CategoriesRepository repository)
			: base(repository) { }
	}
}
