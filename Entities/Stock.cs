using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreAPI.Entities
{
    public class Stock
    {
        [Key]
        public int stockId { get; set; }
        public int amount { get; set; }
        [ForeignKey("Book")]
        public int bookId { get; set; }

    }
}
