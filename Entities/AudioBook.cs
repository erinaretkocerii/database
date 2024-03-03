using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreAPI.Entities
{
    public class AudioBook
    {
        [Key]
        public int audioBookId { get; set; }
        public string audioBookName { get; set; }
        public string length { get; set; }
        public int price { get; set; }

    }
}
