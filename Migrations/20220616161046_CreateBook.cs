using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookstoreAPI.Migrations
{
    public partial class CreateBook : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "bookId",
                table: "Category",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Book",
                columns: table => new
                {
                    bookId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    isbn = table.Column<int>(type: "int", nullable: false),
                    bookName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    author = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    bookDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    price = table.Column<int>(type: "int", nullable: false),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Book", x => x.bookId);
                    
                });

            migrationBuilder.CreateIndex(
                name: "IX_Category_bookId",
                table: "Category",
                column: "bookId");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_Book_bookId",
                table: "Category",
                column: "bookId",
                principalTable: "Book",
                principalColumn: "bookId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_Book_bookId",
                table: "Category");

            migrationBuilder.DropTable(
                name: "Book");

            migrationBuilder.DropIndex(
                name: "IX_Category_bookId",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "bookId",
                table: "Category");
        }
    }
}
