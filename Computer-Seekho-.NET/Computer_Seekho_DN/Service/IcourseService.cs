using Computer_Seekho_DN.Models;
using Microsoft.AspNetCore.Mvc;

namespace Computer_Seekho_DN.Service;

public interface ICourseService
{
    Task<Course>? GetCourseById(int courseId);
    Task<IEnumerable<Course>> GetAllCourses();
    Task<Course> AddCourse(Course course);
    Task<Course> UpdateCourse(int courseId, Course course);
    Task<Course> DeleteCourse(int courseId);
    Task<Course>? FindCourseByName(string courseName);

}