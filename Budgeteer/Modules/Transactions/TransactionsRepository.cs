using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Budgeteer.Infrastructure;

using Microsoft.EntityFrameworkCore;

namespace Budgeteer.Modules.Transactions
{
	public class TransactionsRepository : EntitiesRepository<Transaction, TransactionFilter>
	{
		public TransactionsRepository(EntityContext context)
			: base(context) { }

		public override async Task<List<Transaction>> ReadFiltered(TransactionFilter filter)
		{
			var predicate = filter.GetPredicate();
			var result = await _context.Transactions
				.AsNoTracking()
				.Where(predicate)
				.OrderByDescending(e => e.Date)
				.Include(e => e.Category)
				.Include(e => e.User)
				.ToListAsync();

			return result;
		}

		public override async Task<Transaction> Read(int id)
		{
			var result = await _context.Transactions
				.AsNoTracking()
				.Include(e => e.Category)
				.Include(e => e.User)
				.SingleOrDefaultAsync(e => e.Id == id);

			return result;
		}
	}
}
