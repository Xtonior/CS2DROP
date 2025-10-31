using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CaseItem2SkinItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "CaseItemSkinItem",
                columns: table => new
                {
                    CasesId = table.Column<Guid>(type: "TEXT", nullable: false),
                    SkinsId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CaseItemSkinItem", x => new { x.CasesId, x.SkinsId });
                    table.ForeignKey(
                        name: "FK_CaseItemSkinItem_Cases_CasesId",
                        column: x => x.CasesId,
                        principalTable: "Cases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CaseItemSkinItem_Skins_SkinsId",
                        column: x => x.SkinsId,
                        principalTable: "Skins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CaseItemSkinItem_SkinsId",
                table: "CaseItemSkinItem",
                column: "SkinsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CaseItemSkinItem");

            migrationBuilder.AddColumn<Guid>(
                name: "CaseItemId",
                table: "Skins",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Skins_CaseItemId",
                table: "Skins",
                column: "CaseItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Skins_Cases_CaseItemId",
                table: "Skins",
                column: "CaseItemId",
                principalTable: "Cases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
