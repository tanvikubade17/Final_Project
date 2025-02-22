import React, { useState, useEffect } from "react";
import './staff.css';

const Staff = () => {
    const [staffList, setStaffList] = useState([]);
    
      // Fetch staff data from the backend
     useEffect(()=>{
        const fetchStaff = async() =>{
            try{
                const response = await fetch("http://localhost:8080/staff/getAll",{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if(!response.ok) {
                    throw new Error("Failed to Fetch");
                }
                const data = await response.json();
                const formattedStaff = data.map(staff => ({
                    name: staff.staffName,
                    role: staff.staffRole,
                    img: staff.photoUrl,
                    email: staff.staffEmail
                }));
                setStaffList(formattedStaff);
            }catch(error){
                console.error("Error Fetching Data", error);
            }
        };
    
        fetchStaff();
     }, [])
  return (
    <div>
      {/* <h1 className="tag">Our Elites</h1> */}
    <div className="wrapper">
      {staffList.map((staff,index) => (
        <div className="card">
          <img src = {staff.img} alt="Staff1"/>
          <div className="info">
            <h1>{staff.name}</h1>
            {/* <p>A profound teacher at sm-vita with over 25 years of experience</p>
            <a href='#' className="btn">Read...</a> */}
          </div>
        </div>
      ))}
      </div>
      </div>
  );
}

export default Staff;