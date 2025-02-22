namespace Computer_Seekho_DN.DTO;

public class StudentDto
{
    public int Id { get; set; }
    public string PhotoUrl { get; set; }
    public string Name { get; set; }
    public string Mobile { get; set; }
    public string Course { get; set; }
    public string Batch { get; set; }
    public int PendingFees { get; set; }

    // Default Constructor
    public StudentDto() { }

    // Parameterized Constructor
    public StudentDto(int id, string photoUrl, string name, string mobile, string course, string batch, int pendingFees)
    {
        Id = id;
        PhotoUrl = photoUrl;
        Name = name;
        Mobile = mobile;
        Course = course;
        Batch = batch;
        PendingFees = pendingFees;
    }
}

