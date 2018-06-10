using System.ComponentModel.DataAnnotations;

namespace Budgeteer.Modules.Users
{
	public class LoginDto
	{
		[MaxLength(50)]
		[Required]
		public string Email { get; set; }

		[MaxLength(50)]
		[Required]
		public string Password { get; set; }
	}
}
