using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Computer_Seekho_DN.Exceptions;

namespace Computer_Seekho_DN.Service;

public class StaffService : IstaffService
{
    private readonly ComputerSeekhoDbContext _context;
    public StaffService(ComputerSeekhoDbContext context)
    {
        _context = context;
    }

    public async Task<Staff> Add(Staff record)
    {
        record.StaffRole = "ROLE_"+record.StaffRole;
        record.StaffUsername = record.StaffEmail; 
        record.StaffPassword = BCrypt.Net.BCrypt.HashPassword("rootpassword");
        _context.Add(record);
        await _context.SaveChangesAsync();
        return record;
    }

    public async Task<bool> DeleteStaff(int id)
    {
        Staff staff = _context.Staff.Find(id);
        if (staff == null)
        {
            return false;
        }
        _context.Staff.Remove(staff);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Staff>> GetAllStaff()
    {

        return await _context.Staff.ToListAsync();
    }

    public async Task<Staff> GetStaff(int id)
    {
        return await _context.Staff.FindAsync(id);
    }

    public async Task<int> getStaffIdByStaffUsername(string username)
    {
        Staff staff = await _context.Staff.FirstOrDefaultAsync(staff => staff.StaffUsername == username);
        if (staff == null)
        {
            throw new NotFoundException($"Student Not Found with Username {username}");
        }
        return staff.StaffId;

    }

    public async Task<Staff> Update(Staff record)
    {
        record.StaffRole = "ROLE_" + record.StaffRole;
        record.StaffUsername = record.StaffEmail;
        record.StaffPassword = BCrypt.Net.BCrypt.HashPassword("rootpassword");
        int id = record.StaffId;
        _context.Entry(record).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }catch(DbUpdateConcurrencyException ex)
        {
            if (!StaffExists(id))
            {
                return null;
            }
            else
            {
                throw;
            }
        }
        return record;
    }
    private bool StaffExists(int id)
    {
        return (_context.Staff?.Any(e => e.StaffId == id)).GetValueOrDefault();
    }
}
