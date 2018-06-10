using System.Threading.Tasks;

using Budgeteer.Infrastructure;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Budgeteer.Modules.Users
{
	[AllowAnonymous]
	public class UsersController : EntitiesController<User, UserFilter>
	{
		public UsersController(UsersRepository repository)
			: base(repository) { }

		// POST: api/Users/Authenticate
		[HttpPost("Authenticate")]
		public async Task<ActionResult<User>> Authenticate(LoginDto loginModel)
		{
			var user = await (_repository as UsersRepository).Authenticate(loginModel);

			if(user == null)
			{
				return Unauthorized();
			}

			return Ok(user);
		}

		// POST: api/Users/Register
		[HttpPost("Register")]
		public async Task<ActionResult<User>> Register(SignupDto signupModel)
		{
			var user = await (_repository as UsersRepository).Register(signupModel);

			return CreatedAtAction("Register", user);
		}
	}
}
