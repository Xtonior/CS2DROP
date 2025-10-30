using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CaseItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CaseItemId",
                table: "Skins",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Skins_CaseItemId",
                table: "Skins",
                column: "CaseItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Skins_Cases_CaseItemId",
                table: "Skins",
                column: "CaseItemId",
                principalTable: "Cases",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Skins_Cases_CaseItemId",
                table: "Skins");

            migrationBuilder.DropIndex(
                name: "IX_Skins_CaseItemId",
                table: "Skins");

            migrationBuilder.DropColumn(
                name: "CaseItemId",
                table: "Skins");
        }
    }
}
