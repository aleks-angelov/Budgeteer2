using Budgeteer.Infrastructure;

namespace Budgeteer.Modules.Transactions
{
	public class TransactionsController : EntitiesController<TransactionModel, TransactionFilterModel>
	{
		public TransactionsController(TransactionsRepository repository)
			: base(repository) { }
	}
}
