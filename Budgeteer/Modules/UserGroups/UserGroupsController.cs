using Budgeteer.Infrastructure;

namespace Budgeteer.Modules.UserGroups
{
	public class UserGroupsController : EntitiesController<UserGroup, UserGroupFilter>
	{
		public UserGroupsController(UserGroupsRepository repository)
			: base(repository) { }
	}
}
