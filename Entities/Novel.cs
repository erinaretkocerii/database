using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreAPI.Entities
{
    public class Novel
    {
        [Key]
        public int novelId { get; set; }
        public string novelName { get; set; }
        public string novelist { get; set; }
        public int price { get; set; }

    }
}
