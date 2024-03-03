using BookstoreAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private DataContext _context;

        public ReportController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Report>>> Get()
        {
            return Ok(await _context.Report.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Report>>> Get(int id)
        {
            var report = await _context.Report.FindAsync(id);
            if (report == null)
                return BadRequest("Report not found.");
            return Ok(report);
        }

        [HttpPost]
        public async Task<ActionResult<List<Report>>> CreateReport(Report report)
        {
            _context.Report.Add(report);
            await _context.SaveChangesAsync();

            return Ok(await _context.Report.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Report>>> UpdateReport(Report request)
        {
            var dbReport = await _context.Report.FindAsync(request.reportId);
            if (dbReport == null)
                return BadRequest("Report not found.");

            dbReport.reportText = request.reportText;
            dbReport.dateReported = request.dateReported;
			dbReport.staffId = request.staffId;

            await _context.SaveChangesAsync();

            return Ok(await _context.Report.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReport(int id)
        {
            var dbReport = await _context.Report.FindAsync(id);
            if (dbReport == null)
                return BadRequest("Report not found.");

            _context.Report.Remove(dbReport);
            await _context.SaveChangesAsync();

            return Ok(await _context.Report.ToListAsync());
        }
    }
}

