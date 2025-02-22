using Computer_Seekho_DN.Models;
using Microsoft.AspNetCore.Mvc;

namespace Computer_Seekho_DN.Service;

public interface IRecruiterService
{
    Task<bool> DeleteRecruiter(int id);
    Task<IEnumerable<Recruiter>> GetAllRecruiters();
    Task<Recruiter> Add(Recruiter record);
}