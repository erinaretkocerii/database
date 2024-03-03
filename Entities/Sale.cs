using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreAPI.Entities
{
    public class Sale
    {
        [Key]
        public int saleId { get; set; }
        public string saleNote { get; set; }
		[ForeignKey("Book")]
        public int bookId { get; set; }
        [ForeignKey("Staff")]
        public int staffId { get; set; }
    }
}
