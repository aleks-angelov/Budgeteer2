using Budgeteer.Infrastructure;

namespace Budgeteer.Modules.Categories
{
	public class CategoriesRepository : EntitiesRepository<Category, CategoryFilter>
	{
		public CategoriesRepository(EntityContext context)
			: base(context) { }
	}
}
