using Budgeteer.Modules.Categories;
using Budgeteer.Modules.Transactions;
using Budgeteer.Modules.UserGroups;
using Budgeteer.Modules.Users;

using Microsoft.EntityFrameworkCore;

namespace Budgeteer.Modules
{
	public class EntityContext : DbContext
	{
		public DbSet<Category> Categories { get; set; }

		public DbSet<Transaction> Transactions { get; set; }

		public DbSet<User> Users { get; set; }

		public DbSet<UserGroup> UserGroups { get; set; }

		public EntityContext(DbContextOptions<EntityContext> options)
			: base(options) { }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Transaction>()
				.HasOne(t => t.Category)
				.WithMany()
				.HasForeignKey(t => t.CategoryId)
				.IsRequired();

			modelBuilder.Entity<Transaction>()
				.HasOne(t => t.User)
				.WithMany()
				.HasForeignKey(t => t.UserId)
				.IsRequired();

			modelBuilder.Entity<User>()
				.HasAlternateKey(u => u.Email);

			modelBuilder.Entity<UserGroup>()
				.HasMany(ug => ug.Users)
				.WithOne(u => u.UserGroup)
				.HasForeignKey(u => u.UserGroupId);
		}
	}
}
