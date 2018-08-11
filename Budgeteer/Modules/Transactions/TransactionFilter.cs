using System;
using System.Linq.Expressions;

using Budgeteer.Infrastructure;
using Budgeteer.Modules.Categories;
using Budgeteer.Modules.UserGroups;
using Budgeteer.Modules.Users;

namespace Budgeteer.Modules.Transactions
{
	public class TransactionFilterModel : EntityFilterModel<TransactionModel>
	{
		public DateTime? DateFrom { get; set; }

		public DateTime? DateUntil { get; set; }

		public string Note { get; set; }

		public CategoryTypeEnum? Type { get; set; }

		public int? CategoryId { get; set; }
		public CategoryModel Category { get; set; }

		public int? UserId { get; set; }
		public UserModel User { get; set; }

		public int? UserGroupId { get; set; }
		public UserGroupModel UserGroup { get; set; }

		public override Expression<Func<TransactionModel, bool>> GetPredicate()
		{
			var predicate = PredicateBuilder.True<TransactionModel>();

			if (DateFrom.HasValue)
			{
				predicate = predicate.And(e => e.Date.Date >= DateFrom.Value.Date);
			}

			if (DateUntil.HasValue)
			{
				predicate = predicate.And(e => e.Date.Date <= DateUntil.Value.Date);
			}

			if (!string.IsNullOrWhiteSpace(Note))
			{
				var note = Note.Trim().ToLower();
				predicate = predicate.And(e => e.Note.Trim().ToLower().Contains(note));
			}

			if (Type.HasValue)
			{
				predicate = predicate.And(e => e.Type == Type.Value);
			}

			if (CategoryId.HasValue)
			{
				predicate = predicate.And(e => e.CategoryId == CategoryId.Value);
			}

			if (UserId.HasValue)
			{
				predicate = predicate.And(e => e.UserId == UserId.Value);
			}

			if (UserGroupId.HasValue)
			{
				predicate = predicate.And(e => e.User.UserGroupId == UserGroupId.Value);
			}

			return predicate;
		}
	}
}
