using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Budgeteer.Infrastructure;
using Budgeteer.Modules.Categories;

using Microsoft.EntityFrameworkCore;

namespace Budgeteer.Modules.Transactions
{
	public class TransactionsRepository : EntitiesRepository<TransactionModel, TransactionFilterModel>
	{
		public TransactionsRepository(EntityContext context)
			: base(context) { }

		public override async Task<List<TransactionModel>> ReadFiltered(TransactionFilterModel filter)
		{
			filter.Category = null;
			filter.User = null;
			filter.UserGroup = null;

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

		public override async Task<TransactionModel> Read(int id)
		{
			var result = await _context.Transactions
				.AsNoTracking()
				.Include(e => e.Category)
				.Include(e => e.User)
				.SingleOrDefaultAsync(e => e.Id == id);

			return result;
		}

		public override async Task Update(TransactionModel entity)
		{
			entity.Category = null;
			entity.User = null;

			await base.Update(entity);
		}

		public override async Task Create(TransactionModel entity)
		{
			var category = entity.Category;
			entity.Category = null;

			var user = entity.User;
			entity.User = null;

			await base.Create(entity);

			entity.Category = category;
			entity.User = user;
		}

		public async Task<byte[]> Export()
		{
			var transactions = await _context.Transactions
				.AsNoTracking()
				.OrderByDescending(e => e.Date)
				.Include(e => e.Category)
				.ToListAsync();

			var textBuilder = new StringBuilder();
			textBuilder.AppendLine("Date;Type;Category;Amount;Note");

			for (var i = 0; i < transactions.Count; i++)
			{
				var date = transactions[i].Date;
				var data = $"{date.Day}.{date.Month}.{date.Year};";
				switch (transactions[i].Type)
				{
					case CategoryTypeEnum.Debit:
						data += "Expense;";
						break;

					case CategoryTypeEnum.Credit:
						data += "Income;";
						break;

					case CategoryTypeEnum.Transfers:
						data += (transactions[i].Category.Name == "Deposit") ? "Expense;" : "Income;";
						break;
				}
				data += $"{transactions[i].Category.Name};";
				data += $"{transactions[i].Amount.ToString("F2")};";
				data += transactions[i].Note;

				textBuilder.AppendLine(data);
			}

			var text = textBuilder.ToString();
			return Encoding.UTF8.GetBytes(text);
		}
	}
}
