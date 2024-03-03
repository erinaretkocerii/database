using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreAPI.Entities
{
    public class Report
    {
        [Key]
        public int reportId { get; set; }
        public string reportText { get; set; }
        public string dateReported { get; set; }
        [ForeignKey("Staff")]
        public int staffId { get; set; }
    }
}
