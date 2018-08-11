using System.Collections.Generic;
using System.Threading.Tasks;

using Budgeteer.Infrastructure;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Budgeteer.Modules.Transactions
{
	public class TransactionsController : EntitiesController<TransactionModel, TransactionFilterModel>
	{
		public TransactionsController(TransactionsRepository repository)
			: base(repository) { }

		// POST: api/Transactions/Filtered
		[HttpPost("Filtered")]
		public override async Task<ActionResult<List<TransactionModel>>> GetFiltered(TransactionFilterModel filter)
		{
			var filteredEntities = await _repository.ReadFiltered(filter);

			return Ok(filteredEntities);
		}

		// PUT: api/Transactions/5
		[HttpPut("{id}")]
		public override async Task<IActionResult> Put(int id, TransactionModel entity)
		{
			if (id != entity.Id) { return BadRequest(); }

			try { await _repository.Update(entity); }
			catch (DbUpdateConcurrencyException)
			{
				if (!_repository.Exists(entity.Id)) { return NotFound(); }
				else { throw; }
			}

			return NoContent();
		}

		// POST: api/Transactions
		[HttpPost]
		public override async Task<ActionResult<TransactionModel>> Post(TransactionModel entity)
		{
			await _repository.Create(entity);

			return CreatedAtAction("Post", new { id = entity.Id }, entity);
		}

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
