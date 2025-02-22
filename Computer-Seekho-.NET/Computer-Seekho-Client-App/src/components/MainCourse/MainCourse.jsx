import React, { useEffect, useState } from "react";
import "./MainCourse.css"; // Import the CSS for styling

const MainCourse = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch("http://localhost:8080/course/getAll");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.length > 0) {
          setCourse(data[0]); // Assuming fetching one course
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setLoading(false);
      }
    };

    fetchCourseData();
  }, []);

  if (loading) return <p className="loading">Loading course details...</p>;
  if (!course) return <p className="error">No course found.</p>;

  return (
    <div className="main-course-container">
      {/* Course Name Above the Cover Image */}
      <h1 className="main-course-title">{course.courseName}</h1>

      {/* Course Cover Image */}
      <div className="main-course-banner">
        <img src={course.coverPhoto} alt="Course Banner" className="course-cover-photo" />
      </div>

      {/* Course Content Section */}
      <div className="main-course-content">
        <p className="main-course-description">{course.courseDescription}</p>

        <div className="main-course-info">
          <p><strong>📚 Syllabus:</strong> {course.courseSyllabus}</p>
          <p><strong>⏳ Duration:</strong> {course.courseDuration}</p>
          <p><strong>💰 Fees:</strong> ₹{course.courseFees}</p>
        </div>
      </div>
    </div>
  );
};

export default MainCourse;
