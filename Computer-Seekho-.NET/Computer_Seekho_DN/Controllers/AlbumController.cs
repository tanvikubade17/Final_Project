using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Computer_Seekho_DN.Controllers;

[Route("album")]
[ApiController]
public class AlbumController : ControllerBase
{
    private readonly IAlbumService _albumService;

    public AlbumController(IAlbumService albumService)
    {
        _albumService = albumService;
    }

    [HttpPost("add")]
    public async Task<IActionResult> CreateAlbum([FromBody] Album album)
    {
        if(album == null) { return BadRequest(new { message = "Invalid Details" }); }
        var savedAlbum = await _albumService.SaveAlbumAsync(album);
        return Ok(new {message = "Album Added"});
    }

    [HttpGet("getAll")]
    public async Task<IActionResult> GetAllAlbums()
    {
        var albums = await _albumService.GetAllAlbumsAsync();
        return Ok(albums);
    }

    [HttpGet("get/{id}")]
    public async Task<IActionResult> GetAlbumById(int id)
    {
        var album = await _albumService.GetAlbumByIdAsync(id);
        return album != null ? Ok(album) : NotFound();
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateAlbum(int id, [FromBody] Album albumDetails)
    {
        bool isUpdated = await _albumService.UpdateAlbumAsync(albumDetails);
        return isUpdated ? Ok("Album updated successfully") : NotFound("Album not found");
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteAlbum(int id)
    {
        bool isDeleted = await _albumService.DeleteAlbumAsync(id);
        return isDeleted ? Ok(new { message = "Deleted Successfully" }) : NotFound(new { message = "Album not found" });
    }
}
