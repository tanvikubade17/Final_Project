using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Repository;
using Computer_Seekho_DN.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Controllers;

[Route("enquiries")]
[ApiController]
public class EnquiryController : ControllerBase
{
    private IEnquiryService _enquiryService;

    private readonly ComputerSeekhoDbContext _dbContext;

    public EnquiryController(IEnquiryService enquiryService, ComputerSeekhoDbContext dbContext)
    {
        _enquiryService = enquiryService;
        _dbContext = dbContext;
    }

    [HttpPost("add")]
    public async Task<IActionResult> CreateEnquiry([FromBody] Enquiry enquiry)
    {
        if (enquiry == null) return BadRequest(new { message = "Invalid Details" });
        var createdEnquiry = await _enquiryService.CreateEnquiry(enquiry);
        return Ok(new { message = "Enquiry Added " });
    }

    [HttpGet("getAll")]
    public async Task<IActionResult> GetAllEnquiries()
    {
        var enquiries = await _enquiryService.GetAllEnquiry();
        return Ok(enquiries);
    }

    [HttpGet("get/{enquiryId}")]
    public async Task<IActionResult> GetEnquiryById(int enquiryId)
    {
        var enquiry = await _enquiryService.GetEnquiryById(enquiryId);
        return Ok(enquiry);
    }

    [HttpGet("getbystaff/{staffName}")]

    public async Task<IActionResult> GetEnquiriesByStaffName(string staffName)
    {
        var enquiries = await _dbContext.Enquiries.Include(e => e.Staff).Where(e => e.Staff != null && e.Staff.StaffName == staffName).ToListAsync();

        return Ok(enquiries);
    }

    [HttpPut("update/{enquiryId}")]
    public async Task<IActionResult> UpdateEnquiry(int enquiryId, [FromBody] Enquiry enquiry)
    {
        if (enquiry == null)
        {
            return BadRequest("Invalid enquiry data.");
        }

        var updatedEnquiry = await _enquiryService.UpdateEnquiry(enquiryId, enquiry);

        if (updatedEnquiry == null)
        {
            return NotFound($"Enquiry with ID {enquiryId} not found.");
        }

        return Ok(new {message = "Updated Enquiry"});
    }

    [HttpPatch("updateEnquirerQuery/{enquiryId}")]
    public async Task<IActionResult> UpdateMessage(int enquiryId, [FromBody] string message)
    {
        await _enquiryService.UpdateMessage(enquiryId, message);
        return Ok(new { message = "Updated Enquiry" });
    }

    [HttpDelete("delete/{enquiryId}")]
    public async Task<IActionResult> DeleteEnquiry(int enquiryId)
    {
        await _enquiryService.DeleteEnqiury(enquiryId);
        return Ok(new { message = "Deleted Enquiry" });
    }

    [HttpPut("deactivate/{enquiryId}")]
    public async Task<IActionResult> DeactivateEnquiry(int enquiryId, [FromBody] string message)
    {
        await _enquiryService.DeactivateEnquiry(enquiryId, message);
        return Ok(new { message = "Deactivated Enquiry" });
    }
}
