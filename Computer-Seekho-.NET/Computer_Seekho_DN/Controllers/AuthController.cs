using Computer_Seekho_DN.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Text;
using System.Threading.Tasks;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService service;

    public AuthController(IAuthService service)
    {
        this.service = service;
    }

    [HttpPost("signIn")]
    public async Task<IActionResult> Login()
    {
        if (Request.Headers.TryGetValue("Authorization", out var authHeader))
        {

            if (authHeader.ToString().StartsWith("Basic ", StringComparison.OrdinalIgnoreCase))
            {
                string encodedCredentials = authHeader.ToString().Substring("Basic ".Length).Trim();
                byte[] credentialBytes = Convert.FromBase64String(encodedCredentials);
                string decodedCredentials = Encoding.UTF8.GetString(credentialBytes);

                // Split username and password (assuming "username:password" format)
                var credentials = decodedCredentials.Split(':');
                if (credentials.Length == 2)
                {
                    string username = credentials[0];
                    string password = credentials[1];


                    string token = await service.AuthenticateAsync(username, password);

                    if (string.IsNullOrEmpty(token))
                    {
                        return Unauthorized("Invalid username or password");
                    }

                    Response.Headers.Add("Authorization", $"Bearer {token}");

                    return Ok("Login successfully");
                }
            }
            return Unauthorized("Invalid Authorization header format");
        }

        return BadRequest("Authorization header not found");
    }
}