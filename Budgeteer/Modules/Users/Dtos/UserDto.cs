using Budgeteer.Modules.UserGroups;

namespace Budgeteer.Modules.Users
{
	public class UserDtoModel
	{
		public int Id { get; set; }

		public string Email { get; set; }

		public string Name { get; set; }

		public int? UserGroupId { get; set; }
		public UserGroupModel UserGroup { get; set; }

		public string AuthToken { get; set; }
	}
}
