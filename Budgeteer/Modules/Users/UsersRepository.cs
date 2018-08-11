﻿using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

using Budgeteer.Infrastructure;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Budgeteer.Modules.Users
{
	public class UsersRepository : EntitiesRepository<UserModel, UserFilterModel>
	{
		private readonly IConfiguration _configuration;

		public UsersRepository(EntityContext context, IConfiguration configuration)
					: base(context) { _configuration = configuration; }

		public async Task<UserModel> Authenticate(LoginDtoModel loginModel)
		{
			var user = await _entitySet
				.AsNoTracking()
				.SingleOrDefaultAsync(e => e.Email == loginModel.Email);

			if (user != null && PasswordHasher.VerifyPassword(user.PasswordHash, loginModel.Password))
			{
				user.PasswordHash = null;
				user.AuthToken = GenerateAuthToken(loginModel.Email);
				return user;
			}

			return null;
		}

		public async Task<UserModel> Register(SignupDtoModel signupModel)
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
			return newUser;
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
