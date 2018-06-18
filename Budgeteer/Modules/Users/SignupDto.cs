using System.ComponentModel.DataAnnotations;

namespace Budgeteer.Modules.Users
{
	public class SignupDtoModel : LoginDtoModel
	{
		[MaxLength(50)]
		[Required]
		public string Name { get; set; }
	}
}
