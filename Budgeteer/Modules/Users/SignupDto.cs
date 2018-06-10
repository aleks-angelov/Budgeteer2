using System.ComponentModel.DataAnnotations;

namespace Budgeteer.Modules.Users
{
	public class SignupDto : LoginDto
	{
		[MaxLength(50)]
		[Required]
		public string Name { get; set; }
	}
}
