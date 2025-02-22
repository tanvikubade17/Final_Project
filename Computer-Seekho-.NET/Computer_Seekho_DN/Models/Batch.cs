using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Models;

[Table("batch")]
[Index("CourseId", Name = "FKlyo26rvg0hs090cwqxgxrw0xn")]
public partial class Batch
{
    [Key]
    [Column("batch_id")]
    public int BatchId { get; set; }

    [Column("batch_end_time")]
    public DateOnly? BatchEndTime { get; set; }

    [Column("batch_is_active", TypeName = "bit(1)")]
    public ulong? BatchIsActive { get; set; }

    [Column("batch_name")]
    [StringLength(255)]
    public string? BatchName { get; set; }

    [Column("batch_photo_url")]
    [StringLength(255)]
    public string? BatchPhotoUrl { get; set; }

    [Column("batch_start_time")]
    public DateOnly? BatchStartTime { get; set; }

    [Column("course_id")]
    public int? CourseId { get; set; }

    [ForeignKey("CourseId")]
    [InverseProperty("Batches")]
    public virtual Course? Course { get; set; }

    [InverseProperty("Batch")]
    [JsonIgnore]
    public virtual ICollection<Placement> Placements { get; set; } = new List<Placement>();

    [InverseProperty("Batch")]
    [JsonIgnore]
    public virtual ICollection<Student> Students { get; set; } = new List<Student>();

    [InverseProperty("Batch")]
    [JsonIgnore]
    public virtual ICollection<VideoMaster> VideoMasters { get; set; } = new List<VideoMaster>();
}
