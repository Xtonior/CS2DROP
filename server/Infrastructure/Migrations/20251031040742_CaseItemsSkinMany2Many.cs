using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CaseItemsSkinMany2Many : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Skins_Cases_CaseItemId",
                table: "Skins");

            migrationBuilder.AlterColumn<Guid>(
                name: "CaseItemId",
                table: "Skins",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Skins_Cases_CaseItemId",
                table: "Skins",
                column: "CaseItemId",
                principalTable: "Cases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Skins_Cases_CaseItemId",
                table: "Skins");

            migrationBuilder.AlterColumn<Guid>(
                name: "CaseItemId",
                table: "Skins",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AddForeignKey(
                name: "FK_Skins_Cases_CaseItemId",
                table: "Skins",
                column: "CaseItemId",
                principalTable: "Cases",
                principalColumn: "Id");
        }
    }
}
