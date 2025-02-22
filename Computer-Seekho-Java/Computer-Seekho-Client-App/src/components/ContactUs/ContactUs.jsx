import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import "./ContactUs.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    enquirerName: "",
    email: "",
    mobile: "",
    courseName: "",
    enquiryMessage: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.enquirerName) newErrors.enquirerName = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.mobile) {
      newErrors.mobile = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Phone number is invalid";
    }
    if (!formData.courseName) newErrors.courseName = "Course name is required";
    if (!formData.enquiryMessage) newErrors.enquiryMessage = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const response = await fetch("http://localhost:8080/getInTouch/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast.success("Your message has been sent successfully!");
        setFormData({
          enquirerName: "",
          email: "",
          mobile: "",
          courseName: "",
          enquiryMessage: ""
        });
      } else {
        alert("Failed to send your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div>
        <Navbar />
        {/* Main Body */}
        <div className="section contact">
          <div className="container">
            <div className="contact-container">
              <div className="connect-with-us">
                <h3 className="contact-page">CONNECT WITH US</h3>
                <div className="address">
                  <p>ADDRESS: SM VITA, Gulmohar Road, MHADA Colony, Vile Parle West, Mumbai, Maharashtra 400049</p>
                  <p>PHONE: +91 93240 95272</p>
                  <p>EMAIL: smvita.academic@gmail.com</p>
                </div>
                <div className="map">
                  <iframe className="gmap_iframe" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
                    src="https://maps.google.com/maps?width=652&amp;height=400&amp;hl=en&amp;q=Sm-VITA&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    width="100%" height="450" allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
              {/* </div> */}
              <div className="get-a-callback">
                <h3 className="contact-page">GET A CALLBACK</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Your Name</label>
                    <input type="text" className="form-control border-0" id="enquirerName" name="enquirerName" placeholder="Name" onChange={handleChange} value={formData.enquirerName} />
                    {errors.enquirerName && <p className="error">{errors.enquirerName}</p>}
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control border-0" id="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>
                  <div className="form-group">
                    <label>Phone no.</label>
                    <input type="tel" className="form-control border-0" id="mobile" name="mobile" placeholder="Phone" onChange={handleChange} value={formData.mobile} />
                    {errors.mobile && <p className="error">{errors.mobile}</p>}
                  </div>
              <div className="form-group">
                <label>Course</label>
                <input type="text" className="form-control border-0" id="courseName" name="courseName" placeholder="Course" onChange={handleChange} value={formData.courseName} />
                {errors.courseName && <p className="error">{errors.courseName}</p>}
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="enquiryMessage" className="form-control border-0" id="enquiryMessage" rows="6" placeholder="Message" onChange={handleChange} value={formData.enquiryMessage}></textarea>
                {errors.enquiryMessage && <p className="error">{errors.enquiryMessage}</p>}
              </div>
              <input id="submit" type="submit" className="btn btn-pri btn-pill float-right mb-4" value="Send" />
            </form>
          </div>
          </div>
        </div>
        </div >
  {/* <Footer/> */ }
      </div >
  <Footer />
    </div >
  );
};

export default ContactUs;
