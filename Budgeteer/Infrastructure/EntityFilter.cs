using System;
using System.Linq.Expressions;

namespace Budgeteer.Infrastructure
{
	public abstract class EntityFilterModel<T>
		where T : EntityModel
	{
		public virtual Expression<Func<T, bool>> GetPredicate()
		{
			var predicate = PredicateBuilder.True<T>();

			return predicate;
		}
	}
}
