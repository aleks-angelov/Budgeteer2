using Budgeteer.Infrastructure;

namespace Budgeteer.Modules.Categories
{
	public class CategoriesRepository : EntitiesRepository<CategoryModel, CategoryFilterModel>
	{
		public CategoriesRepository(EntityContext context)
			: base(context) { }
	}
}
