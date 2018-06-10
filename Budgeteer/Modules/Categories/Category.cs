using System.ComponentModel.DataAnnotations;

using Budgeteer.Infrastructure;

using Newtonsoft.Json;

namespace Budgeteer.Modules.Categories
{
	public enum CategoryType
	{
		Debit = 0,
		Credit = 1,
		Savings = 2
	}

	public class Category : Entity
	{
		[MaxLength(50)]
		[Required]
		public string Name { get; set; }

		public CategoryType Type { get; set; }

		public bool IsActive { get; set; }
	}
}
