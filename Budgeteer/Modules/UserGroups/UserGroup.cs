using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using Budgeteer.Infrastructure;
using Budgeteer.Modules.Users;

namespace Budgeteer.Modules.UserGroups
{
	public class UserGroupModel : EntityModel
	{
		[MaxLength(50)]
		[Required]
		public string Name { get; set; }

		public int CreatorId { get; set; }

		public List<UserModel> Users { get; set; }
	}
}
