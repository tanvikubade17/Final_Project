using Computer_Seekho_DN.DTO;
using Computer_Seekho_DN.Models;
using Microsoft.AspNetCore.Mvc;

namespace Computer_Seekho_DN.Service;

public interface IStudentService
{
    Task<IEnumerable<StudentDto>> GetAllStudents();
    Task<Student> GetStudentById(int id);
    Task<Student> AddStudent(Student student,int enquiryId);
    Task DeleteByStudentId(int studentId);
    Task<bool> UpdateStudent(Student student);
}