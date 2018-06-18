using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Budgeteer.Infrastructure;
using Budgeteer.Modules.UserGroups;

using Newtonsoft.Json;

namespace Budgeteer.Modules.Users
{
	public class UserModel : EntityModel
	{
		[MaxLength(50)]
		[Required]
		public string Email { get; set; }

		[MaxLength(50)]
		[Required]
		public string Name { get; set; }

		[Required]
		public string PasswordHash { get; set; }

		public int? UserGroupId { get; set; }
		public UserGroupModel UserGroup { get; set; }

		[NotMapped]
		[Required]
		public string AuthToken { get; set; }
	}
}
