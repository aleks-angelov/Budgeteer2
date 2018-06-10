using System;
using System.Linq.Expressions;

using Budgeteer.Infrastructure;

namespace Budgeteer.Modules.Users
{
	public class UserFilter : EntityFilter<User>
	{
		public string Email { get; set; }

		public override Expression<Func<User, bool>> GetPredicate()
		{
			var predicate = PredicateBuilder.True<User>();

			if(!string.IsNullOrWhiteSpace(Email))
			{
				var email = Email.Trim().ToLower();
				predicate = predicate.And(e => e.Email.Trim().ToLower() == email);
			}

			return predicate;
		}
	}
}
