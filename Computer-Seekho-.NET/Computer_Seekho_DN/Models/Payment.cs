using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Models;

[Table("payments")]
[Index("PaymentTypeId", Name = "FKik05b744ogv4a8llk3cdlh2vl")]
[Index("StudentId", Name = "FKo0lgt74t3bsgmnfq54pcdew7y")]
public partial class Payment
{
    [Key]
    [Column("payment_id")]
    public int PaymentId { get; set; }

    [Column("amount")]
    public int? Amount { get; set; }

    [Column("payment_date")]
    public DateOnly? PaymentDate { get; set; }

    [Column("payment_type_id")]
    public int? PaymentTypeId { get; set; }

    [Column("student_id")]
    public int StudentId { get; set; }

    [ForeignKey("PaymentTypeId")]
    [InverseProperty("Payments")]
    public virtual PaymentType? PaymentType { get; set; }

    [InverseProperty("Payment")]
    [JsonIgnore]
    public virtual Receipt? Receipt { get; set; }

    [ForeignKey("StudentId")]
    [InverseProperty("Payments")]
    public virtual Student? Student { get; set; }
}
