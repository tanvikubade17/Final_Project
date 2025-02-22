using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Repository;
using Computer_Seekho_DN.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Service;
public class CourseService : ICourseService
{
    private readonly ComputerSeekhoDbContext _context;

    public CourseService(ComputerSeekhoDbContext context)
    {
        _context = context;
    }

    public async Task<Course> GetCourseById(int courseId)
    {
        var course = await _context.Courses.FindAsync(courseId);
        return course;
    }

    public async Task<IEnumerable<Course>> GetAllCourses()
    {
        var courses = await _context.Courses.ToListAsync();
        return courses;
    }

    public Task<Course> AddCourse(Course course)
    {
        throw new NotImplementedException();
    }

    public Task<Course> UpdateCourse(int courseId, Course course)
    {
        throw new NotImplementedException();
    }

    public Task<Course> DeleteCourse(int courseId)
    {
        throw new NotImplementedException();
    }

    public Task<Course>? FindCourseByName(string courseName)
    {
        throw new NotImplementedException();
    }
}