using System.Threading.Tasks;

using Budgeteer.Infrastructure;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Budgeteer.Modules.Users
{
	[AllowAnonymous]
	public class UsersController : EntitiesController<UserModel, UserFilterModel>
	{
		public UsersController(UsersRepository repository)
			: base(repository) { }

		// POST: api/Users/Authenticate
		[HttpPost("Authenticate")]
		public async Task<ActionResult<UserModel>> Authenticate(LoginDtoModel loginModel)
		{
			var user = await (_repository as UsersRepository).Authenticate(loginModel);

			if (user == null)
			{
				return Unauthorized();
			}

			return Ok(user);
		}

		// POST: api/Users/Register
		[HttpPost("Register")]
		public async Task<ActionResult<UserModel>> Register(SignupDtoModel signupModel)
		{
			var user = await (_repository as UsersRepository).Register(signupModel);

			return CreatedAtAction("Register", user);
		}
	}
}
