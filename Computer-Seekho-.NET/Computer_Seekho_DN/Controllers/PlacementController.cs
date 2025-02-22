using Computer_Seekho_DN.DTO;
using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Computer_Seekho_DN.Controllers;

[Route("placement")]
[ApiController]
public class PlacementController : ControllerBase
{
    private readonly IPlacementService _placementService;
    public PlacementController(IPlacementService placementService)
    {
        _placementService = placementService;
    }


    [HttpGet("gatAll")]
    public async Task<ActionResult<IEnumerable<Placement>>> GetPlacement()
    {
        var list = await _placementService.GetPlacement();
        return Ok(list);
    }

    [HttpGet("get/{id}")]
    public async Task<ActionResult<Placement>> GetById(int id)
    {
        var stu = await _placementService.GetById(id);
        if(stu == null) return NotFound(new {message = "Placement Details Not Found"});
        return Ok(stu);
    }

    [HttpPost("add")]
    public async Task<ActionResult> add(Placement placement)
    {
        if (placement == null) return BadRequest(new { message = "Invalid Details" });
        await _placementService.Add(placement);
        return Ok(new { message = "Placement Details Added" });
    }

    [HttpGet("getByBatch/{id}")]
    public async Task<ActionResult<IEnumerable<PlacedStudent>>> GetByBatch(int id)
    {
        return Ok(await _placementService.GetByBatch(id));
    }
}
