using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Computer_Seekho_DN.Service;
using Computer_Seekho_DN.Models;
using System.Text.Json;
using System.Text;
using Computer_Seekho_DN.DTO;

namespace Computer_Seekho_DN.Controllers;

[Route("student")]
[ApiController]
public class StudentController : ControllerBase
{
    private readonly IStudentService _studentService;

    public StudentController(IStudentService studentService)
    {
        _studentService = studentService;
    }

    [HttpGet("getAll")]
    public async Task<ActionResult<IEnumerable<StudentDto>>> GetAllStudents()
    {
        var student = await _studentService.GetAllStudents();
        return Ok(student);
    }

    [HttpDelete("delete/{studentId}")]
    public async Task<ActionResult> DeleteByStudentId(int studentId)
    {
        await _studentService.DeleteByStudentId(studentId);
        return Ok(new { message = "Student deleted successfully." });
    }

    [HttpPost("add/{enquiryId}")]
    public async Task<ActionResult<Student>> AddStudent([FromBody]Student student,int enquiryId)
    {
        if (student == null)
        {
            return BadRequest();
        }
        else
        {
            await _studentService.AddStudent(student, enquiryId);
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    String Url = "http://localhost:9003/email";
                    var data = new Dictionary<string, object>
             {
                 { "to", student.StudentEmail },
                 { "studentName", student.StudentName }
             };
                    String jsonData = JsonSerializer.Serialize(data);
                    StringContent emailrequest = new StringContent(jsonData, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await client.PostAsync(Url, emailrequest);
                    if (response.IsSuccessStatusCode)
                    {
                        return Ok(new { message = "Student added successfully." });
                    }
                    return Ok(new { message = "Student added successfully." });
                }
            }catch (Exception ex)
            {
                return Ok(new {message = "Email Not Sent"});
            }


        }
    }

}