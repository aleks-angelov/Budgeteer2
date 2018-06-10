using System;
using System.Text;

using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Budgeteer.Modules.Users
{
	public static class PasswordHasher
	{
		private static readonly byte[] salt = Encoding.UTF8.GetBytes("NZsP6NnmfBuYeJrrAKNuVQ==");

		public static string HashPassword(string password)
		{
			var hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
			password: password,
			salt: salt,
			prf: KeyDerivationPrf.HMACSHA1,
			iterationCount: 10000,
			numBytesRequested: 256 / 8));

			return hashedPassword;
		}

		public static bool VerifyPassword(string passwordHash, string password)
		{
			var hashedPassword = HashPassword(password);
			return passwordHash == hashedPassword;
		}
	}
}
