using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreAPI.Entities
{
    public class Staff
    {
        [Key]
        public int staffId { get; set; }
        public string staffPosition { get; set; }
        public int salary { get; set; }
    }
}
