using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreAPI.Entities
{
    public class BookImages
    {
        [Key]
        public string imageName { get; set; }
        public string imageUrl { get; set; }
        [ForeignKey("Book")]
        public string bookId { get; set; }
    }
}
