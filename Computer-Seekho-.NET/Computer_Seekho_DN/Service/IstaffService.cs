using Computer_Seekho_DN.Models;
using Microsoft.AspNetCore.Mvc;

namespace Computer_Seekho_DN.Service;

public interface IstaffService
{
    Task<Staff> GetStaff(int id);
    Task<bool> DeleteStaff(int id);
    Task<IEnumerable<Staff>> GetAllStaff();
    Task<Staff> Add(Staff record);
    Task<Staff> Update(Staff record);
    Task<int> getStaffIdByStaffUsername(string username);
}
