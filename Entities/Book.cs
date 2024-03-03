using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreAPI.Entities
{
    public class Book
    {
        [Key]
        public int bookId { get; set; }
        public int isbn { get; set; }
        public string bookName { get; set; }
        public string author{ get; set; }
        public string bookDescription { get; set; }
        public int price { get; set; }
        [ForeignKey("Category")]
        public string categoryName { get; set; }



    }
}
