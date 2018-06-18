using System.Threading.Tasks;

using Budgeteer.Infrastructure;
using Budgeteer.Modules.Users;

using Microsoft.EntityFrameworkCore;

namespace Budgeteer.Modules.UserGroups
{
	public class UserGroupsRepository : EntitiesRepository<UserGroupModel, UserGroupFilterModel>
	{
		public UserGroupsRepository(EntityContext context)
			: base(context) { }

		public override async Task<UserGroupModel> Read(int id)
		{
			var result = await _context.UserGroups
				.AsNoTracking()
				.Include(e => e.Users)
				.SingleOrDefaultAsync(e => e.Id == id);

			for(var i = 0; i < result.Users.Count; i++)
			{
				result.Users[i] = new UserModel
				{
					Id = result.Users[i].Id,
					Name = result.Users[i].Name
				};
			}

			return result;
		}
	}
}
