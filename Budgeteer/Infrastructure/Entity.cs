using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Budgeteer.Infrastructure
{
	public abstract class EntityModel
	{
		[Key]
		public int Id { get; set; }

		[NotMapped]
		public bool InEditMode { get; set; }
	}
}
