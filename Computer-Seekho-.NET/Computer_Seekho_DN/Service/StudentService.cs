using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Computer_Seekho_DN.Exceptions;
using Computer_Seekho_DN.DTO;

namespace Computer_Seekho_DN.Service;

public class StudentService : IStudentService
{
    private readonly ComputerSeekhoDbContext _context;
    private readonly IClosureReasonService _closureReasonService;
    private readonly IEnquiryService _enquiryService;
    private readonly IStudentService _studentService;
    private readonly ICourseService _courseService;

    public StudentService(ComputerSeekhoDbContext context, IEnquiryService enquiryService, IClosureReasonService closureReasonService, ICourseService courseService)
    {
        _context = context;
        _closureReasonService = closureReasonService;
        _enquiryService = enquiryService;
        _courseService = courseService;
    }

    public async Task<IEnumerable<StudentDto>> GetAllStudents()
    {
        return _context.Students.Select(student => new StudentDto
        {
            Id = student.StudentId,
            PhotoUrl = student.PhotoUrl,
            Name = student.StudentName,
            Mobile = student.StudentMobile,
            Course = student.Course.CourseName,
            Batch = student.Batch.BatchName,
            PendingFees = student.PaymentDue
        })
        .ToList();
    }

    public async Task<Student> GetStudentById(int studentId)
    {
        Student? student = await _context.Students.FindAsync(studentId) ?? throw new NotFoundException($"Student not found with id {studentId}");
        return student;
    }

    public async Task<Student> AddStudent(Student student,int enquiryId)
    {
        int id = student.CourseId;
        Course course = await _courseService.GetCourseById(id);
        student.PaymentDue = (int)course.CourseFee;
        await _enquiryService.DeactivateEnquiry(enquiryId,"Admitted Successfully");
        await _closureReasonService.AddClosureReason(new ClosureReason { EnquirerName = student.StudentName, ClosureReasonDesc = "Admitted Successfully" });
        _context.Students.Add(student);
        await _context.SaveChangesAsync();
        return student;
    }

    public async Task DeleteByStudentId(int studentId)
    {
        Student? student = await _context.Students.FindAsync(studentId) ?? throw new NotFoundException($"Student not found with id {studentId}");
        _context.Students.Remove(student);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> UpdateStudent(Student student)
    {
        if (student == null)
        {
            return false;
        }

        _context.Entry(student).State = EntityState.Modified;

        await _context.SaveChangesAsync();
        return true;
    }
}