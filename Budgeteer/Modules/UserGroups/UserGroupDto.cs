using System.Collections.Generic;

namespace Budgeteer.Modules.UserGroups
{
	public class UserGroupDto
	{
		public string Name { get; set; }

		public int CreatorId { get; set; }

		public List<int> UserIds { get; set; }
	}
}
