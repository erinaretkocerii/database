using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreAPI.Entities
{
    public class Supplier
    {
        [Key]
        public int supplierId { get; set; }
        public string supplierName { get; set; }
        public string supplierAddress { get; set; }

        public string phone { get; set; }
     

    }
}
