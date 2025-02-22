import React, { useState, useEffect } from "react";
import "./CoursePage.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const CoursePage = () => {
  const [openSection, setOpenSection] = useState(null);
  const [courseData, setCourseData] = useState({});

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch("http://localhost:8080/course/getAll");
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, []);

  const courseSections = [
    {
      title: "C++ Programming",
      details: [
        "Getting Started with C++",
        "Operators & Expressions",
        "Control Structures (Loops & Conditionals)",
        "Functions in C++",
        "Object-Oriented Programming Concepts",
        "Constructors and Destructors",
        "Inheritance & Polymorphism",
        "Exception Handling",
        "File Handling in C++",
        "Templates & STL"
      ],
    },
    {
      title: "Concepts of OS & Software Development Methodologies",
      details: [
        "Introduction to OS",
        "Linux Basics & Shell Scripting",
        "Processes & Memory Management",
        "Virtual Memory & Deadlock Handling",
        "Software Development Life Cycle (SDLC)",
        "Git & Version Control",
        "Agile Development & Scrum",
        "DevOps & Continuous Integration",
        "Introduction to Docker & Kubernetes"
      ],
    },
    {
      title: "Object-Oriented Programming Using Java",
      details: [
        "Java Introduction & JVM Architecture",
        "Primitive Data Types & Arrays",
        "OOP Concepts in Java",
        "Encapsulation, Inheritance, Polymorphism",
        "Interfaces & Abstract Classes",
        "Exception Handling",
        "File I/O & Serialization",
        "Java Collections Framework",
        "Multithreading & Synchronization",
        "Lambda Expressions & Stream API"
      ],
    }
  ];

  return (
    <div>
      <Navbar />
      <div className="course-container">
        {/* Course Banner */}
        <div className="course-banner">
          <img src={courseData.coverPhoto} alt="Course Banner" />
          <div className="course-overview-overlay">
            <h2>PG DAC</h2>
            <p>{courseData.courseDescription}</p>
          </div>
        </div>

        {/* Course Overview */}
        <div className="course-overview">
          <h2>Overview</h2>
          <ul>
            <li><strong>Course Name:</strong> PG-DAC</li>
            <li><strong>Duration:</strong> 6 months</li>
            <li><strong>Eligibility:</strong> Graduates in Engineering, MCA, M.Sc. (IT/Computer Science), or equivalent</li>
            <li><strong>Objective:</strong> Advanced computing & software development</li>
          </ul>
        </div>

        {/* Course Content */}
        <div className="course-content">
          <h2>Course Content</h2>
          <div className="accordion">
            {courseSections.map((section, index) => (
              <div key={index} className="accordion-item">
                <button className="accordion-header" onClick={() => toggleSection(index)}>
                  {section.title}
                </button>
                <div className={`accordion-content ${openSection === index ? "open" : ""}`}>
                  <ul>
                    {section.details.map((detail, i) => (
                      <li key={i} className="lecture-item">
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default CoursePage;