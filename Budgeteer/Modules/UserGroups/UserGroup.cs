using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using Budgeteer.Infrastructure;
using Budgeteer.Modules.Users;

namespace Budgeteer.Modules.UserGroups
{
	public class UserGroup : Entity
	{
		[MaxLength(50)]
		[Required]
		public string Name { get; set; }

		public int CreatorId { get; set; }

		public List<User> Users { get; set; }
	}
}
