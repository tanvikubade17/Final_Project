import React, { useEffect, useState } from "react";
import "./StaffDetails.css"; // ✅ Ensure this file exists in the correct path

const StaffDetails = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/staff/getAll") // Replace with actual API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched staff data:", data);
        setStaffList(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching staff data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="staff-container">
      <h1 className="title">Our Instructors</h1>
      {loading ? (
        <p>Loading staff data...</p>
      ) : staffList.length > 0 ? (
        <div className="staff-list">
          {staffList.reduce((rows, staff, index) => {
            if (index % 2 === 0) {
              rows.push([staff]);
            } else {
              rows[rows.length - 1].push(staff);
            }
            return rows;
          }, []).map((row, rowIndex) => (
            <div className="staff-row" key={rowIndex}>
              {row.map(staff => (
                <div className="staff-card" key={staff.staffId}>
                  <div className="staff-header">
                    <h2 className="staff-name">{staff.staffName}</h2>
                    <p className="staff-title">{staff.staffRole.replace("ROLE_", "")}</p>
                    <img src={staff.photoUrl} alt={staff.staffName} className="staff-image" />
                  </div>
                  <div className="staff-info">
                    <p>📧 {staff.staffEmail}</p>
                    <p>📞 {staff.staffMobile}</p>
                    <p>⚥ {staff.staffGender}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No faculty data found.</p>
      )}
    </div>
  );
};

export default StaffDetails;
