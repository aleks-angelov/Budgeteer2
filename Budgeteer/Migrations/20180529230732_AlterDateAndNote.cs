using System;

using Microsoft.EntityFrameworkCore.Migrations;

namespace Budgeteer.Migrations
{
	public partial class AlterDateAndNote : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AlterColumn<string>(
				name: "Note",
				table: "Transactions",
				maxLength: 100,
				nullable: true,
				oldClrType: typeof(string),
				oldMaxLength: 100);

			migrationBuilder.AlterColumn<DateTime>(
				name: "Date",
				table: "Transactions",
				type: "datetime2(3)",
				nullable: false,
				oldClrType: typeof(DateTime));
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AlterColumn<string>(
				name: "Note",
				table: "Transactions",
				maxLength: 100,
				nullable: false,
				oldClrType: typeof(string),
				oldMaxLength: 100,
				oldNullable: true);

			migrationBuilder.AlterColumn<DateTime>(
				name: "Date",
				table: "Transactions",
				nullable: false,
				oldClrType: typeof(DateTime),
				oldType: "datetime2(3)");
		}
	}
}
