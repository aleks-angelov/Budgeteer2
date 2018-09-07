using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

using AutoMapper;

using Budgeteer.Infrastructure;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Budgeteer.Modules.Users
{
	public class UsersRepository : EntitiesRepository<UserModel, UserFilterModel>
	{
		private readonly IConfiguration _configuration;
		private readonly IMapper _mapper;

		public UsersRepository(
			EntityContext context,
			IConfiguration configuration,
			IMapper mapper)
			: base(context)
		{
			_configuration = configuration;
			_mapper = mapper;
		}

		public async Task<UserDtoModel> Authenticate(LoginDtoModel loginModel)
		{
			var existingUser = await _entitySet
				.AsNoTracking()
				.SingleOrDefaultAsync(e => e.Email == loginModel.Email);

			if (existingUser != null && PasswordHasher.VerifyPassword(existingUser.PasswordHash, loginModel.Password))
			{
				existingUser.PasswordHash = null;
				existingUser.AuthToken = GenerateAuthToken(loginModel.Email);
				return _mapper.Map<UserDtoModel>(existingUser);
			}

			return null;
		}

		public async Task<UserDtoModel> Register(SignupDtoModel signupModel)
		{
			var newUser = new UserModel
			{
				Email = signupModel.Email.Trim(),
				Name = signupModel.Name.Trim(),
				PasswordHash = PasswordHasher.HashPassword(signupModel.Password)
			};

			_entitySet.Add(newUser);
			await SaveChangesAsync();

			newUser.PasswordHash = null;
			newUser.AuthToken = GenerateAuthToken(signupModel.Email);
			return _mapper.Map<UserDtoModel>(newUser);
		}

		private string GenerateAuthToken(string userEmail)
		{
			var claims = new[] { new Claim(ClaimTypes.Email, userEmail) };
			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["SecurityKey"]));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				issuer: "budgeteer.com",
				audience: "budgeteer.com",
				claims: claims,
				expires: DateTime.Now.AddHours(1),
				signingCredentials: creds);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}
