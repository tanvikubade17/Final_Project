using System;
using System.Collections.Generic;
using Computer_Seekho_DN.Models;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace Computer_Seekho_DN.Repository;

public partial class ComputerSeekhoDbContext : DbContext
{
    public ComputerSeekhoDbContext()
    {
    }

    public ComputerSeekhoDbContext(DbContextOptions<ComputerSeekhoDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Album> Albums { get; set; }

    public virtual DbSet<Batch> Batches { get; set; }

    public virtual DbSet<ClosureReason> ClosureReasons { get; set; }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<Enquiry> Enquiries { get; set; }

    public virtual DbSet<GetInTouch> GetInTouches { get; set; }

    public virtual DbSet<Image> Images { get; set; }

    public virtual DbSet<News> News { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<PaymentType> PaymentTypes { get; set; }

    public virtual DbSet<Placement> Placements { get; set; }

    public virtual DbSet<Receipt> Receipts { get; set; }

    public virtual DbSet<Recruiter> Recruiters { get; set; }

    public virtual DbSet<Staff> Staff { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<VideoMaster> VideoMasters { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;database=csdb;user=root;password=root", ServerVersion.Parse("8.0.40-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Album>(entity =>
        {
            entity.HasKey(e => e.AlbumId).HasName("PRIMARY");
        });

        modelBuilder.Entity<Batch>(entity =>
        {
            entity.HasKey(e => e.BatchId).HasName("PRIMARY");

            entity.HasOne(d => d.Course).WithMany(p => p.Batches).HasConstraintName("FKlyo26rvg0hs090cwqxgxrw0xn");
        });

        modelBuilder.Entity<ClosureReason>(entity =>
        {
            entity.HasKey(e => e.ClosureReasonId).HasName("PRIMARY");
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.CourseId).HasName("PRIMARY");
        });

        modelBuilder.Entity<Enquiry>(entity =>
        {
            entity.HasKey(e => e.EnquiryId).HasName("PRIMARY");

            entity.Property(e => e.EnquiryIsActive).HasDefaultValueSql("'1'");

            entity.HasOne(d => d.Staff).WithMany(p => p.Enquiries).HasConstraintName("FKeud7g3l135dchk6imapeqd5ih");
        });

        modelBuilder.Entity<GetInTouch>(entity =>
        {
            entity.HasKey(e => e.GetInTouchId).HasName("PRIMARY");
        });

        modelBuilder.Entity<Image>(entity =>
        {
            entity.HasKey(e => e.ImageId).HasName("PRIMARY");

            entity.HasOne(d => d.Album).WithMany(p => p.Images).HasConstraintName("FK724cv7ds8vwsp7mpi6e5s7keq");
        });

        modelBuilder.Entity<News>(entity =>
        {
            entity.HasKey(e => e.NewsId).HasName("PRIMARY");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PRIMARY");

            entity.HasOne(d => d.PaymentType).WithMany(p => p.Payments).HasConstraintName("FKik05b744ogv4a8llk3cdlh2vl");

            entity.HasOne(d => d.Student).WithMany(p => p.Payments).HasConstraintName("FKo0lgt74t3bsgmnfq54pcdew7y");
        });

        modelBuilder.Entity<PaymentType>(entity =>
        {
            entity.HasKey(e => e.PaymentTypeId).HasName("PRIMARY");
        });

        modelBuilder.Entity<Placement>(entity =>
        {
            entity.HasKey(e => e.PlacementId).HasName("PRIMARY");

            entity.HasOne(d => d.Batch).WithMany(p => p.Placements).HasConstraintName("FKfjp90ouyl79cs2u450vca7ip9");

            entity.HasOne(d => d.Recruiter).WithMany(p => p.Placements).HasConstraintName("FKmeq262aa8o8iqkv0m6jpj9wog");

            entity.HasOne(d => d.Student).WithOne(p => p.Placement).HasConstraintName("FKtnlbpdla0lw8qpqb9pq0wfwvj");
        });

        modelBuilder.Entity<Receipt>(entity =>
        {
            entity.HasKey(e => e.ReceiptId).HasName("PRIMARY");

            entity.HasOne(d => d.Payment).WithOne(p => p.Receipt).HasConstraintName("FKpj1qn6plxs457bis4afrydj5");
        });

        modelBuilder.Entity<Recruiter>(entity =>
        {
            entity.HasKey(e => e.RecruiterId).HasName("PRIMARY");
        });

        modelBuilder.Entity<Staff>(entity =>
        {
            entity.HasKey(e => e.StaffId).HasName("PRIMARY");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.StudentId).HasName("PRIMARY");

            entity.HasOne(d => d.Batch).WithMany(p => p.Students).HasConstraintName("FK17mfv6a26cwnmli2b6vm00dn7");

            entity.HasOne(d => d.Course).WithMany(p => p.Students).HasConstraintName("FKdfypyqt0stgfc0aij9kcxm99s");
        });

        modelBuilder.Entity<VideoMaster>(entity =>
        {
            entity.HasKey(e => e.VideoId).HasName("PRIMARY");

            entity.HasOne(d => d.Batch).WithMany(p => p.VideoMasters).HasConstraintName("FKpml7p8oa2sjadyfxuigwqywj0");

            entity.HasOne(d => d.Course).WithMany(p => p.VideoMasters).HasConstraintName("FK1rnanwb6rkh6lqgxwv904gm7r");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
