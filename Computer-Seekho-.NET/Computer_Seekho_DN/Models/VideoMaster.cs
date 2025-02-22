using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Models;

[Table("video_master")]
[Index("CourseId", Name = "FK1rnanwb6rkh6lqgxwv904gm7r")]
[Index("BatchId", Name = "FKpml7p8oa2sjadyfxuigwqywj0")]
public partial class VideoMaster
{
    [Key]
    [Column("video_id")]
    public int VideoId { get; set; }

    [Column("end_date")]
    public DateOnly? EndDate { get; set; }

    [Column("start_date")]
    public DateOnly? StartDate { get; set; }

    [Column("video_description")]
    [StringLength(60)]
    public string? VideoDescription { get; set; }

    [Column("is_active", TypeName = "bit(1)")]
    public ulong? IsActive { get; set; }

    [Column("video_url")]
    [StringLength(255)]
    public string? VideoUrl { get; set; }

    [Column("batch_id")]
    public int? BatchId { get; set; }

    [Column("course_id")]
    public int? CourseId { get; set; }

    [ForeignKey("BatchId")]
    [InverseProperty("VideoMasters")]
    public virtual Batch? Batch { get; set; }

    [ForeignKey("CourseId")]
    [InverseProperty("VideoMasters")]
    public virtual Course? Course { get; set; }
}
