using System;
using System.Linq.Expressions;

namespace Budgeteer.Infrastructure
{
	public abstract class EntityFilter<T>
		where T : Entity
	{
		public virtual Expression<Func<T, bool>> GetPredicate()
		{
			var predicate = PredicateBuilder.True<T>();

			return predicate;
		}
	}
}
