using System;
using System.Linq.Expressions;

using Budgeteer.Infrastructure;

namespace Budgeteer.Modules.Users
{
	public class UserFilterModel : EntityFilterModel<UserModel>
	{
		public string Email { get; set; }

		public override Expression<Func<UserModel, bool>> GetPredicate()
		{
			var predicate = PredicateBuilder.True<UserModel>();

			if (!string.IsNullOrWhiteSpace(Email))
			{
				var email = Email.Trim().ToLower();
				predicate = predicate.And(e => e.Email.Trim().ToLower() == email);
			}

			return predicate;
		}
	}
}
