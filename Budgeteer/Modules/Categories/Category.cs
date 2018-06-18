using System.ComponentModel.DataAnnotations;

using Budgeteer.Infrastructure;

using Newtonsoft.Json;

namespace Budgeteer.Modules.Categories
{
	public class CategoryModel : EntityModel
	{
		[MaxLength(50)]
		[Required]
		public string Name { get; set; }

		public CategoryTypeEnum Type { get; set; }

		public bool IsActive { get; set; }
	}
}
