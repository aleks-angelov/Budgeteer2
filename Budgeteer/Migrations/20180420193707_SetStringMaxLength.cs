using Microsoft.EntityFrameworkCore.Migrations;

namespace Budgeteer.Migrations
{
	public partial class SetStringMaxLength : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AlterColumn<string>(
				name: "Name",
				table: "Users",
				maxLength: 50,
				nullable: false,
				oldClrType: typeof(string));

			migrationBuilder.AlterColumn<string>(
				name: "Email",
				table: "Users",
				maxLength: 50,
				nullable: false,
				oldClrType: typeof(string));

			migrationBuilder.AlterColumn<string>(
				name: "Name",
				table: "UserGroups",
				maxLength: 50,
				nullable: false,
				oldClrType: typeof(string));

			migrationBuilder.AlterColumn<string>(
				name: "Note",
				table: "Transactions",
				maxLength: 100,
				nullable: false,
				oldClrType: typeof(string));

			migrationBuilder.AlterColumn<string>(
				name: "Name",
				table: "Categories",
				maxLength: 50,
				nullable: false,
				oldClrType: typeof(string));
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AlterColumn<string>(
				name: "Name",
				table: "Users",
				nullable: false,
				oldClrType: typeof(string),
				oldMaxLength: 50);

			migrationBuilder.AlterColumn<string>(
				name: "Email",
				table: "Users",
				nullable: false,
				oldClrType: typeof(string),
				oldMaxLength: 50);

			migrationBuilder.AlterColumn<string>(
				name: "Name",
				table: "UserGroups",
				nullable: false,
				oldClrType: typeof(string),
				oldMaxLength: 50);

			migrationBuilder.AlterColumn<string>(
				name: "Note",
				table: "Transactions",
				nullable: false,
				oldClrType: typeof(string),
				oldMaxLength: 100);

			migrationBuilder.AlterColumn<string>(
				name: "Name",
				table: "Categories",
				nullable: false,
				oldClrType: typeof(string),
				oldMaxLength: 50);
		}
	}
}
