using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Budgeteer.Infrastructure
{
	public static class EntityApiConventions
	{
		#region GET

		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesDefaultResponseType]
		public static void GetFiltered(object filter)
		{ }

		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesDefaultResponseType]
		public static void Get(int id)
		{ }

		#endregion GET

		#region POST

		[ProducesResponseType(StatusCodes.Status201Created)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesDefaultResponseType]
		public static void Post(object entity)
		{ }

		#endregion POST

		#region PUT

		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesDefaultResponseType]
		public static void Put(int id, object entity)
		{ }

		#endregion PUT

		#region DELETE

		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesDefaultResponseType]
		public static void Delete(int id)
		{ }

		#endregion DELETE
	}
}
