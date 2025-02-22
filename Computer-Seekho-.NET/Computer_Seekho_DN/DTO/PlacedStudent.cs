namespace Computer_Seekho_DN.DTO;

public class PlacedStudent
{
    public int BatchId { get; set; }
    public string BatchName { get; set; }
    public string StudentName { get; set; }
    public string PhotoUrl { get; set; }
    public string RecruiterName { get; set; }
    public PlacedStudent() { }
    public PlacedStudent(int batchId, string batchName, string studentName, string photoUrl, string recruiterName)
    {
        BatchId = batchId;
        BatchName = batchName;
        StudentName = studentName;
        PhotoUrl = photoUrl;
        RecruiterName = recruiterName;
    }
}
