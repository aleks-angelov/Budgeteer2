using Microsoft.EntityFrameworkCore.Migrations;

namespace Budgeteer.Migrations
{
	public partial class MakeUserEmailUnique : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AddUniqueConstraint(
				name: "AK_Users_Email",
				table: "Users",
				column: "Email");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropUniqueConstraint(
				name: "AK_Users_Email",
				table: "Users");
		}
	}
}
