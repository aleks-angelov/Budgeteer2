using Budgeteer.Modules.Categories;
using Budgeteer.Modules.Transactions;
using Budgeteer.Modules.UserGroups;
using Budgeteer.Modules.Users;

using Microsoft.EntityFrameworkCore;

namespace Budgeteer.Modules
{
	public class EntityContext : DbContext
	{
		public DbSet<CategoryModel> Categories { get; set; }

		public DbSet<TransactionModel> Transactions { get; set; }

		public DbSet<UserModel> Users { get; set; }

		public DbSet<UserGroupModel> UserGroups { get; set; }

		public EntityContext(DbContextOptions<EntityContext> options)
			: base(options) { }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<TransactionModel>()
				.HasOne(t => t.Category)
				.WithMany()
				.HasForeignKey(t => t.CategoryId)
				.IsRequired();

			modelBuilder.Entity<TransactionModel>()
				.HasOne(t => t.User)
				.WithMany()
				.HasForeignKey(t => t.UserId)
				.IsRequired();

			modelBuilder.Entity<UserModel>()
				.HasAlternateKey(u => u.Email);

			modelBuilder.Entity<UserGroupModel>()
				.HasMany(ug => ug.Users)
				.WithOne(u => u.UserGroup)
				.HasForeignKey(u => u.UserGroupId);
		}
	}
}
