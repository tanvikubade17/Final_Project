
using Microsoft.AspNetCore.Mvc;
using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Service;

namespace Computer_Seekho_DN.Controllers;

[Route("image")]
[ApiController]
public class ImageController : ControllerBase
{
    private readonly IImageService _imageService;

    public ImageController(IImageService imageService)
    {
        _imageService = imageService;
    }

    // GET: api/image
    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<Image>>> GetAllImages()
    {
        var images = await _imageService.GetAllImagesAsync();
        return Ok(images);
    }

    // POST: api/image
    [HttpPost("add")]
    public async Task<ActionResult<Image>> AddImage([FromBody] Image image)
    {
        if (image == null)
        {
            return BadRequest("Invalid image data.");
        }

        var addedImage = await _imageService.AddImageAsync(image);
        return Ok(new { message = "Image added" });
    }

    // DELETE: api/image/{id}
    [HttpDelete("get/{id}")]
    public async Task<IActionResult> DeleteImage(int id)
    {
        var result = await _imageService.DeleteImageAsync(id);
        if (!result)
        {
            return NotFound("Image not found.");
        }

        return NoContent();
    }
}
