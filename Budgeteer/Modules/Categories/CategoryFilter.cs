using System;
using System.Linq.Expressions;

using Budgeteer.Infrastructure;

namespace Budgeteer.Modules.Categories
{
	public class CategoryFilterModel : EntityFilterModel<CategoryModel>
	{
		public string Name { get; set; }

		public CategoryTypeEnum? Type { get; set; }

		public bool? IsActive { get; set; }

		public override Expression<Func<CategoryModel, bool>> GetPredicate()
		{
			var predicate = PredicateBuilder.True<CategoryModel>();

			if(!string.IsNullOrWhiteSpace(Name))
			{
				var name = Name.Trim().ToLower();
				predicate = predicate.And(e => e.Name.Trim().ToLower().Contains(name));
			}

			if(Type.HasValue)
			{
				predicate = predicate.And(e => e.Type == Type.Value);
			}

			if(IsActive.HasValue)
			{
				predicate = predicate.And(e => e.IsActive == IsActive.Value);
			}

			return predicate;
		}
	}
}
