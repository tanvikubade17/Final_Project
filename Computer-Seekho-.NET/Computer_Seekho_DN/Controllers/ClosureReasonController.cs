using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Computer_Seekho_DN.Controllers;

[Route("closureReason")]
[ApiController]
public class ClosureReasonController : ControllerBase
{
    private readonly IClosureReasonService _closureReasonService;

    public ClosureReasonController(IClosureReasonService closureReasonService)
    {
        _closureReasonService = closureReasonService;
    }

    [HttpGet("getAll")]
    public async Task<ActionResult<IEnumerable<ClosureReason>>> GetClosureReasons()
    {
        var closureReasons = await _closureReasonService.GetAllClosureReasons();
        return Ok(closureReasons);
    }

    [HttpGet("get/{id}")]
    public async Task<ActionResult<ClosureReason>> GetClosureReason(int id)
    {
        var closureReason = await _closureReasonService.GetClosureReasonById(id);

        if (closureReason == null)
        {
            return NotFound(new { message = "Closure reason not found." });
        }

        return Ok(closureReason);
    }

    [HttpPost("add")]
    public async Task<ActionResult<ClosureReason>> PostClosureReason(ClosureReason closureReason)
    {
        if (closureReason == null)
        {
            return BadRequest(new { message = "Invalid data." });
        }

        var createdClosureReason = await _closureReasonService.AddClosureReason(closureReason);

        if (createdClosureReason == null)
        {
            return BadRequest(new { message = "Failed to add closure reason." });
        }

        return Ok(new {message = "Closure Reason Added"});
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteClosureReason(int id)
    {
        var isDeleted = await _closureReasonService.DeleteClosureReason(id);

        if (!isDeleted)
        {
            return NotFound(new { message = "Closure reason not found." });
        }

        return NoContent();
    }
}