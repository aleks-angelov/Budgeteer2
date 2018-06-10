using Budgeteer.Infrastructure;

namespace Budgeteer.Modules.Categories
{
	public class CategoriesController : EntitiesController<Category, CategoryFilter>
	{
		public CategoriesController(CategoriesRepository repository)
			: base(repository) { }
	}
}
