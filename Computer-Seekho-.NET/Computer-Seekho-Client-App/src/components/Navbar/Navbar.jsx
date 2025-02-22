import React, { useState, useEffect } from "react";
// import logo from "../images/Logo.png";
import "./Navbar.css"; // Import the CSS file

// Menu links
const MenuLinks = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Placement", link: "/Placement" },
  { id: 3, name: "Courses", link: "CourseDetails" },
  { id: 4, name: "Beyond Classes", link: "Gallery" },
  { id: 5, name: "About Us", link: "About" },
  { id: 6, name: "Contact Us", link: "/ContactUs" }
]
// Dropdown items for "Courses"
const courseDropdown = ["PG-DAC", "PG-DBDA", "Pre-CAT"];

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Function to detect scroll and update sticky state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true); // Make navbar sticky after 50px scroll
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${isSticky ? "sticky" : ""}`}>
      <div className="navbar-container">
        <div className="">

          {/* <a href="#" className="navbar-logo">
            <img src={logo} alt="SmVita Logo" />
          </a> */}

          {/* Navigation Menu */}
          <div className="navbar-menu">
            <ul>
              {MenuLinks.map((data) => (
                <li
                  key={data.id}
                  onMouseEnter={() => data.name === "Courses" && setIsHovered(true)}
                  onMouseLeave={() => data.name === "Courses" && setIsHovered(false)}
                >
                  <a href={data.link}>{data.name}</a>

                  {/* Dropdown - Show only on hover */}
                  {data.name === "Courses" && isHovered && (
                    <div className="dropdown">
                      {courseDropdown.map((course, i) => (
                        <span key={i}>{course}</span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;