using System.ComponentModel.DataAnnotations;

namespace Budgeteer.Infrastructure
{
	public abstract class Entity
	{
		[Key]
		public int Id { get; set; }
	}
}
