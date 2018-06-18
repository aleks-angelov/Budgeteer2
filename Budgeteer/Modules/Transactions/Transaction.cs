using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Budgeteer.Infrastructure;
using Budgeteer.Modules.Categories;
using Budgeteer.Modules.Users;

namespace Budgeteer.Modules.Transactions
{
	public class TransactionModel : EntityModel
	{
		[Column(TypeName = "datetime2(3)")]
		public DateTime Date { get; set; }

		public double Amount { get; set; }

		[MaxLength(100)]
		public string Note { get; set; }

		public CategoryTypeEnum Type { get; set; }

		public int CategoryId { get; set; }
		public CategoryModel Category { get; set; }

		public int UserId { get; set; }
		public UserModel User { get; set; }
	}
}
