using Computer_Seekho_DN.Exceptions;
using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Computer_Seekho_DN.Service
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly ComputerSeekhoDbContext _context;

        public AuthService(IConfiguration configuration, ComputerSeekhoDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        // Inside the AuthService class
        public async Task<string> AuthenticateAsync(string username, string password)
        {
            // Check if the staff exists in the database
            var staff = await _context.Staff
                .Where(s => s.StaffUsername == username)
                .FirstOrDefaultAsync() ?? throw new NotFoundException("Username Not Found");

            if (!BCrypt.Net.BCrypt.Verify(password, staff.StaffPassword))
            {
                throw new UnauthorizedException("Invalid Password");
            }
            return GenerateJwtToken(staff);
        }

        public string GenerateJwtToken(Staff staff)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"] ?? "ComputerSeekho"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                //new Claim(ClaimTypes.NameIdentifier, staff.StaffId.ToString()),
                new Claim("username", staff.StaffUsername),
                new Claim("Role", staff.StaffRole), // Teaching or Non-Teaching
                new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not found"))
            );

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpiryMinutes"] ?? "60")),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}