using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Computer_Seekho_DN.Controllers;

[Route("News")]
[ApiController]
public class NewsController : ControllerBase
{
    private readonly INewsService _newsService;

    public NewsController(INewsService newsService)
    {
        _newsService = newsService;
    }

    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<News>>> GetAllImages()
    {
        var images = await _newsService.GetAllImages();
        return Ok(images);
    }

    [HttpPost("add")]
    public async Task<ActionResult<News>> SaveImage([FromBody] News image)
    {
        if (image == null)
            return BadRequest("Invalid image data.");

        var savedImage = await _newsService.SaveImage(image);
        return Ok(new { message = "News Added" });
    }

    [HttpGet("get/{id}")]
    public async Task<ActionResult<News>> GetImageById(int id)
    {
        var image = await _newsService.GetImageById(id);
        if (image == null)
            return NotFound();

        return Ok(image);
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteImage(int id)
    {
        await _newsService.DeleteImage(id);
        return NoContent(); // 204 No Content
    }
}