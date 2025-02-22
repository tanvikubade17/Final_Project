namespace Computer_Seekho_DN.DTO;

public class PaymentDTO
{
    public string StudentName { get; set; }
    public string StudentEmail { get; set; }
    public int Amount { get; set; }
    public DateOnly PaymentDate { get; set; }
    public string PaymentTypeDesc { get; set; }

    public PaymentDTO(string studentName, string studentEmail, int amount, DateOnly paymentDate, string paymentTypeDesc)
    {
        StudentName = studentName;
        StudentEmail = studentEmail;
        Amount = amount;
        PaymentDate = paymentDate;
        PaymentTypeDesc = paymentTypeDesc;
    }
}
