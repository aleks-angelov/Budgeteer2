using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Budgeteer.Infrastructure
{
	[Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public abstract class EntitiesController<T, TFilter> : ControllerBase
		where T : EntityModel
		where TFilter : EntityFilterModel<T>, new()
	{
		protected readonly EntitiesRepository<T, TFilter> _repository;

		protected EntitiesController(EntitiesRepository<T, TFilter> repository)
		{
			_repository = repository;
		}

		// POST: api/Entities/Filtered
		[HttpPost("Filtered")]
		public virtual async Task<ActionResult<List<T>>> GetFiltered(TFilter filter)
		{
			if (!ModelState.IsValid) { return BadRequest(ModelState); }

			var filteredEntities = await _repository.ReadFiltered(filter);

			return Ok(filteredEntities);
		}

		// GET: api/Entities/5
		[HttpGet("{id}")]
		public virtual async Task<ActionResult<T>> Get(int id)
		{
			if (!ModelState.IsValid) { return BadRequest(ModelState); }

			var entity = await _repository.Read(id);

			if (entity == null) { return NotFound(); }

			return Ok(entity);
		}

		// PUT: api/Entities/5
		[HttpPut("{id}")]
		public virtual async Task<IActionResult> Put(int id, T entity)
		{
			if (!ModelState.IsValid) { return BadRequest(ModelState); }

			if (id != entity.Id) { return BadRequest(); }

			try { await _repository.Update(entity); }
			catch (DbUpdateConcurrencyException)
			{
				if (!_repository.Exists(entity.Id)) { return NotFound(); }
				else { throw; }
			}

			return NoContent();
		}

		// POST: api/Entities
		[HttpPost]
		public virtual async Task<ActionResult<T>> Post(T entity)
		{
			if (!ModelState.IsValid) { return BadRequest(ModelState); }

			await _repository.Create(entity);

			return CreatedAtAction("Post", new { id = entity.Id }, entity);
		}

		// DELETE: api/Entities/5
		[HttpDelete("{id}")]
		public virtual async Task<IActionResult> Delete(int id)
		{
			if (!ModelState.IsValid) { return BadRequest(ModelState); }

			var entity = await _repository.Read(id);

			if (entity == null) { return NotFound(); }

			await _repository.Delete(entity);

			return NoContent();
		}
	}
}
