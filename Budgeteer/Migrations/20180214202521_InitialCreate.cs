using System;

using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Budgeteer.Migrations
{
	public partial class InitialCreate : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable(
				name: "Categories",
				columns: table => new
				{
					Id = table.Column<int>(nullable: false)
						.Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
					IsActive = table.Column<bool>(nullable: false),
					Name = table.Column<string>(nullable: false),
					Type = table.Column<int>(nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Categories", x => x.Id);
				});

			migrationBuilder.CreateTable(
				name: "UserGroups",
				columns: table => new
				{
					Id = table.Column<int>(nullable: false)
						.Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
					CreatorId = table.Column<int>(nullable: false),
					Name = table.Column<string>(nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_UserGroups", x => x.Id);
				});

			migrationBuilder.CreateTable(
				name: "Users",
				columns: table => new
				{
					Id = table.Column<int>(nullable: false)
						.Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
					Email = table.Column<string>(nullable: false),
					Name = table.Column<string>(nullable: false),
					PasswordHash = table.Column<string>(nullable: false),
					UserGroupId = table.Column<int>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Users", x => x.Id);
					table.ForeignKey(
						name: "FK_Users_UserGroups_UserGroupId",
						column: x => x.UserGroupId,
						principalTable: "UserGroups",
						principalColumn: "Id",
						onDelete: ReferentialAction.Restrict);
				});

			migrationBuilder.CreateTable(
				name: "Transactions",
				columns: table => new
				{
					Id = table.Column<int>(nullable: false)
						.Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
					Amount = table.Column<double>(nullable: false),
					CategoryId = table.Column<int>(nullable: false),
					Date = table.Column<DateTime>(nullable: false),
					Note = table.Column<string>(nullable: false),
					Type = table.Column<int>(nullable: false),
					UserId = table.Column<int>(nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Transactions", x => x.Id);
					table.ForeignKey(
						name: "FK_Transactions_Categories_CategoryId",
						column: x => x.CategoryId,
						principalTable: "Categories",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
					table.ForeignKey(
						name: "FK_Transactions_Users_UserId",
						column: x => x.UserId,
						principalTable: "Users",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateIndex(
				name: "IX_Transactions_CategoryId",
				table: "Transactions",
				column: "CategoryId");

			migrationBuilder.CreateIndex(
				name: "IX_Transactions_UserId",
				table: "Transactions",
				column: "UserId");

			migrationBuilder.CreateIndex(
				name: "IX_Users_UserGroupId",
				table: "Users",
				column: "UserGroupId");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				name: "Transactions");

			migrationBuilder.DropTable(
				name: "Categories");

			migrationBuilder.DropTable(
				name: "Users");

			migrationBuilder.DropTable(
				name: "UserGroups");
		}
	}
}
