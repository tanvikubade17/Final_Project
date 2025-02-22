using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Computer_Seekho_DN.Service;
using Computer_Seekho_DN.Models;

namespace Computer_Seekho_DN.Controllers;

[Route("recruiter")]
[ApiController]
public class RecruiterController : ControllerBase
{
    private readonly IRecruiterService _service;

    public RecruiterController(IRecruiterService service)
    {
        _service = service;
    }

    [HttpGet("getAll")]
    public async Task<ActionResult<IEnumerable<Recruiter>>> GetAllRecruiters()
    {
        var recruiters = await _service.GetAllRecruiters();
        return Ok(recruiters);
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddRecruiter([FromBody] Recruiter recruiter)
    {
        var result = await _service.Add(recruiter);
        return Ok(new { message = "Recruiter Added" });
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteRecruiter(int id)
    {
        var deletedRecruiter = await _service.DeleteRecruiter(id);
        if (!deletedRecruiter)
        {
            return NotFound(new { message = "Recruiter not found" });
        }
        return Ok(new { message = "Recruiter deleted successfully" });
    }
}