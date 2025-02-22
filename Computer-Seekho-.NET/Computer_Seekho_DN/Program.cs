using Microsoft.EntityFrameworkCore;
using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Service;
using Computer_Seekho_DN.Repository;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Computer_Seekho_DN.Exceptions;
using Org.BouncyCastle.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
            )
        };
    });
builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        policy =>
        {
            policy.WithOrigins("*")
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .WithExposedHeaders("Authorization");
        });
});


// Configure MySQL Database Connection
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ComputerSeekhoDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Register your service dependencies
builder.Services.AddScoped<IAlbumService, AlbumService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IBatchService, BatchSevice>();
builder.Services.AddScoped<IClosureReasonService,ClosureReasonService>();
builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<IEnquiryService,EnquiryService>();
builder.Services.AddScoped<IGetInTouchService, GetInTouchService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddScoped<IpaymentService, PaymentService>();
builder.Services.AddScoped<IpaymentTypeService, PaymentTypeService>();
builder.Services.AddScoped<IPlacementService, PlacementService>();
builder.Services.AddScoped<IRecruiterService, RecruiterService>();
builder.Services.AddScoped<IstaffService, StaffService>();
builder.Services.AddScoped<IStudentService, StudentService>();



builder.Services.AddExceptionHandler<AppExceptionHandler>();


// Enable Swagger for API documentation (optional)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable middleware for error handling during development
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler( _ => { });

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors("AllowSpecificOrigins");
app.MapControllers();
app.Run();