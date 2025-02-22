using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Repository;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Service;

public class EnquiryService : IEnquiryService
{
    private readonly ComputerSeekhoDbContext context;

    private readonly Staff staff;

    public EnquiryService(ComputerSeekhoDbContext context)
    {
        this.context = context;
    }

    public async Task<Enquiry> CreateEnquiry(Enquiry enquiry)
    {
        context.Enquiries.Add(enquiry);
        await context.SaveChangesAsync();
        return enquiry;
    }

    public async Task<IEnumerable<Enquiry>> GetAllEnquiry()
    {
        return await context.Enquiries.ToListAsync();
    }

    public async Task<Enquiry> GetEnquiryById(int enqiuryId)
    {
        var enquiry = await context.Enquiries.FindAsync(enqiuryId);

        if (enquiry == null)
        {
            throw new KeyNotFoundException($"Enquiry with {enqiuryId} not found");
        }
        return enquiry;
    }

    public async Task<IEnumerable<Enquiry>> GetEnquiryByStaff(Staff staffUsername)
    {
        if (staffUsername == null)
        {
            throw new ArgumentNullException(nameof(staffUsername), "staff cannot be null");
        }
        return await context.Enquiries.Where(e => e.Staff == staffUsername).ToListAsync();
    }

    public async Task<Enquiry> UpdateEnquiry(int enquiryId, Enquiry enquiry)
    {
        var existingEnquiry = await context.Enquiries.FindAsync(enquiryId);

        if (existingEnquiry == null)
        {
            throw new KeyNotFoundException($"Enquiry with Id {enquiryId} not found");
        }

        enquiry.EnquiryCounter++;
        //context.Entry(enquiry).State = EntityState.Modified;

        existingEnquiry.ClosureReason = enquiry.ClosureReason;
        existingEnquiry.EnquirerAddress = enquiry.EnquirerAddress;
        existingEnquiry.EnquirerEmailId = enquiry.EnquirerEmailId;
        existingEnquiry.EnquirerMobile = enquiry.EnquirerMobile;
        existingEnquiry.EnquirerName = enquiry.EnquirerName;
        existingEnquiry.EnquirerQuery = enquiry.EnquirerQuery;
        existingEnquiry.EnquiryDate = enquiry.EnquiryDate;
        existingEnquiry.FollowUpDate = enquiry.FollowUpDate;
        existingEnquiry.StaffId = enquiry.StaffId;
        existingEnquiry.StudentName = enquiry.StudentName;
        existingEnquiry.CourseName = enquiry.CourseName;
        existingEnquiry.EnquiryCounter = enquiry.EnquiryCounter;
        existingEnquiry.EnquiryIsActive = enquiry.EnquiryIsActive;

        await context.SaveChangesAsync();
        return existingEnquiry;
    }

    public async Task<int> UpdateMessage(int enquiryId, string message)
    {
        var enquiry = await context.Enquiries.FindAsync(enquiryId);

        if (enquiry == null)
        {
            throw new KeyNotFoundException($"enquiry Id {enquiryId} not found");
        }

        enquiry.EnquirerQuery = message;
        enquiry.EnquiryCounter++;
        context.Entry(enquiry).State = EntityState.Modified;
        return await context.SaveChangesAsync();
    }

    public async Task DeactivateEnquiry(int enquiryId, string message)
    {
        var enquiry = await context.Enquiries.FindAsync(enquiryId);
        if (enquiry == null)
        {
            throw new KeyNotFoundException($"Enquiry with {enquiryId} not found");
        }

        enquiry.EnquiryIsActive = true;
        enquiry.ClosureReason = message;
        await context.SaveChangesAsync();
    }

    public async Task DeleteEnqiury(int enqiuryId)
    {
        var enquiry = context.Enquiries.FirstOrDefault(e => e.EnquiryId == enqiuryId);

        if (enquiry == null)
        {
            throw new KeyNotFoundException($"Enquiry with {enqiuryId} not found");
        }

        context.Enquiries.Remove(enquiry);
        await context.SaveChangesAsync();
    }
}
