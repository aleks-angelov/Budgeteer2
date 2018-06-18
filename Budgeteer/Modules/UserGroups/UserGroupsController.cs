using Budgeteer.Infrastructure;

namespace Budgeteer.Modules.UserGroups
{
	public class UserGroupsController : EntitiesController<UserGroupModel, UserGroupFilterModel>
	{
		public UserGroupsController(UserGroupsRepository repository)
			: base(repository) { }
	}
}
