using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Models;

[Table("student")]
[Index("BatchId", Name = "FK17mfv6a26cwnmli2b6vm00dn7")]
[Index("CourseId", Name = "FKdfypyqt0stgfc0aij9kcxm99s")]
public partial class Student
{
    [Key]
    [Column("student_id")]
    public int StudentId { get; set; }

    [Column("payment_due")]
    public int PaymentDue { get; set; }

    [Column("photo_url")]
    [StringLength(255)]
    public string? PhotoUrl { get; set; }

    [Column("student_address")]
    [StringLength(60)]
    public string? StudentAddress { get; set; }

    [Column("student_dob")]
    public DateOnly? StudentDob { get; set; }

    [Column("student_email")]
    [StringLength(30)]
    public string? StudentEmail { get; set; }

    [Column("student_gender")]
    [StringLength(10)]
    public string? StudentGender { get; set; }

    [Column("student_mobile")]
    [StringLength(255)]
    public string? StudentMobile { get; set; }

    [Column("student_name")]
    [StringLength(30)]
    public string StudentName { get; set; } = null!;

    [Column("student_qualification")]
    [StringLength(20)]
    public string? StudentQualification { get; set; }

    [Column("batch_id")]
    public int? BatchId { get; set; }

    [Column("course_id")]
    public int CourseId { get; set; }

    [ForeignKey("BatchId")]
    [InverseProperty("Students")]
    public virtual Batch? Batch { get; set; }

    [ForeignKey("CourseId")]
    [InverseProperty("Students")]
    public virtual Course? Course { get; set; }

    [InverseProperty("Student")]
    [JsonIgnore]
    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    [InverseProperty("Student")]
    [JsonIgnore]
    public virtual Placement? Placement { get; set; }
}
