using System.Text.RegularExpressions;
using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Controllers;

[Route("batch")]
[ApiController]
public class BatchController : ControllerBase
{
    private readonly IBatchService batchservice;
    public BatchController(IBatchService batchservice)
    {
        this.batchservice = batchservice;
    }
    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<Batch>?>> GetAllBatches()
    {
        return Ok(await batchservice.GetAllBatches());
    }

    [HttpGet("get/{name}")]
    public async Task<ActionResult<Batch>> GetBatchByBatchId(String name)
    {
        var batch = await batchservice.GetBatchByBatchId(name);
        return batch == null ? NotFound() : batch;
    }
    [HttpPut("update")]
    public async Task<IActionResult> PutEmployee([FromBody] Batch batch)
    {
        var update = await batchservice.Update(batch);
        if (!update)
        {
            return NotFound(new { message = "student not found" });
        }
        return Ok(new { message = "student updated" });

    }

    [HttpPost("add")]
    public async Task<ActionResult> PostBatch(Batch batch)
    {
        if (batch == null)
        {
            return BadRequest(new {message = "Invalid Details"});
        }
        else
        {
            var batch1 = await batchservice.Add(batch);
            return Ok(new {message = "Batch Added"});
        }

    }
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        await batchservice.DeleteBatch(id);
        return Ok();
    }
}