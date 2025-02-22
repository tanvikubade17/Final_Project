using Computer_Seekho_DN.Models;
using System.Threading.Tasks;

namespace Computer_Seekho_DN.Service;

public interface IAuthService
{
    Task<string> AuthenticateAsync(string username, string password);
    string GenerateJwtToken(Staff staff);
}