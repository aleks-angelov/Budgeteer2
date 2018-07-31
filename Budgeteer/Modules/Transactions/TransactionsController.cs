using System.Threading.Tasks;

using Budgeteer.Infrastructure;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Budgeteer.Modules.Transactions
{
	public class TransactionsController : EntitiesController<TransactionModel, TransactionFilterModel>
	{
		public TransactionsController(TransactionsRepository repository)
			: base(repository) { }

		// GET: api/Transactions/Export
		[AllowAnonymous]
		[HttpGet("Export")]
		public async Task<IActionResult> Export()
		{
			var contents = await (_repository as TransactionsRepository).Export();

			return File(contents, "text/csv", "Transactions.csv");
		}
	}
}
