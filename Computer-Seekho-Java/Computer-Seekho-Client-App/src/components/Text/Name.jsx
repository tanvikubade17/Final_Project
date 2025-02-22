import React from "react";
import "./Name.css"; // Import the CSS file
import logo from "../images/Logo.png"; // Import the logo image

const Name = () => {
  return (
    <div className="heading-container1">
      {/* Heading Section */}
      <div className="heading-content1">
        <img src={logo} alt="USM Logo" className="heading-logo1" /> {/* Logo Image */}
        <span className="heading-text1">
          USM's Shriram Mantri Vidyanidhi Info Tech Academy
        </span>
      </div>
    </div>
  );
};

export default Name;
