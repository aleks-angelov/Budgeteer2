using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Budgeteer.Modules;

using Microsoft.EntityFrameworkCore;

namespace Budgeteer.Infrastructure
{
	public abstract class EntitiesRepository<T, TFilter>
		where T : Entity
		where TFilter : EntityFilter<T>, new()
	{
		protected readonly EntityContext _context;
		protected readonly DbSet<T> _entitySet;

		protected EntitiesRepository(EntityContext context)
		{
			_context = context;
			_entitySet = context.Set<T>();
		}

		public virtual async Task Create(T entity)
		{
			_entitySet.Add(entity);

			await _context.SaveChangesAsync();
		}

		public virtual async Task<List<T>> ReadFiltered(TFilter filter)
		{
			var predicate = filter.GetPredicate();
			var result = await _entitySet
				.AsNoTracking()
				.Where(predicate)
				.ToListAsync();

			return result;
		}

		public virtual async Task<T> Read(int id)
		{
			var result = await _entitySet
				.AsNoTracking()
				.SingleOrDefaultAsync(e => e.Id == id);

			return result;
		}

		public virtual async Task Update(T entity)
		{
			_context.Entry(entity).State = EntityState.Modified;

			await _context.SaveChangesAsync();
		}

		public virtual async Task Delete(T entity)
		{
			_entitySet.Remove(entity);

			await _context.SaveChangesAsync();
		}

		public virtual bool Exists(int id)
		{
			var result = _entitySet.Any(e => e.Id == id);

			return result;
		}
	}
}
