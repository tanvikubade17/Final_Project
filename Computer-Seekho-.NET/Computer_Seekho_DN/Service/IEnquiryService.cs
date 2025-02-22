using Computer_Seekho_DN.Models;

namespace Computer_Seekho_DN.Service;

public interface IEnquiryService
{
    Task<Enquiry> CreateEnquiry(Enquiry enquiry);

    Task<Enquiry> UpdateEnquiry(int enqiuryId, Enquiry enquiry);

    Task DeleteEnqiury(int enqiuryId);

    Task<Enquiry> GetEnquiryById(int enqiuryId);

    Task<IEnumerable<Enquiry>> GetAllEnquiry();

    Task<IEnumerable<Enquiry>> GetEnquiryByStaff(Staff staffUsername);

    Task<int> UpdateMessage(int enquiryId, string message);

    Task DeactivateEnquiry(int enquiryId, string message);
}
