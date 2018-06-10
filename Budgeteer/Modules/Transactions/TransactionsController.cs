using Budgeteer.Infrastructure;

namespace Budgeteer.Modules.Transactions
{
	public class TransactionsController : EntitiesController<Transaction, TransactionFilter>
	{
		public TransactionsController(TransactionsRepository repository)
			: base(repository) { }
	}
}
