using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreAPI.Entities
{
    public class Orders
    {
        [Key]
        public int orderId { get; set; }
        [ForeignKey("Book")]
        public int bookId { get; set; }
        [ForeignKey("Users")]
        public int userId { get; set; }



    }
}
