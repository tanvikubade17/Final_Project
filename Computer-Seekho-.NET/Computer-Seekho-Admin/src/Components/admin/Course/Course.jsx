import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmDialog from "../Utility/ConfirmDialog";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import "./Course.css";
import AddCourse from './AddCourse';

const Course = () => {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [course, setCourse] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const token = sessionStorage.getItem("token");

  const deleteCourseHandler = async () => {
    if (!selectedCourse) return;

    try {
      const response = await fetch(`http://localhost:8080/course/delete/${selectedCourse.courseId}`, {
        method: "DELETE",
        // headers:{
        //   "Authorization": `Bearer ${token}`,
        // }
      });

      if (response.status === 404) {
        throw new Error("Course not found!");
      } else if (response.ok) {
        const result = await response.json();
        toast.success(result.message);

        setCourse((prevCourse) => prevCourse.filter((item) => item.courseId !== selectedCourse.courseId));
      }
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error(error.message);
      setIsConfirmOpen(false);
    }
  };

  const openConfirmDialog = (course) => {
    setSelectedCourse(course);
    setIsConfirmOpen(true);
  };

  const openUpdateForm = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8080/course/getAll", {
          // headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const result = await response.json();
        setCourse(result);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="container">
      <Toaster />
      <h3 className="title">Courses</h3>
      <div className="actions">
        <button className="add-btn" onClick={() => openUpdateForm(null)}>
          Add Course
        </button>
        <input
          placeholder="Search..."
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="course-dropdown"
        >
          <option value="">All Courses</option>
          <option value="DAC">DAC</option>
          <option value="DBDA">DBDA</option>
          <option value="PRE CAT">PRE CAT</option>
        </select>
      </div>

      <div className="table-container">
        <table className="course-table">
          <thead>
            <tr className='table-header'>
              <th className="id-column" style={{color:"white"}}>No</th>
              <th style={{color:"white",textAlign:'center'}}>Photo</th>
              <th style={{color:"white",textAlign:'center'}}>Name</th>
              <th style={{color:"white",textAlign:'center'}}>Duration</th>
              <th style={{color:"white",textAlign:'center'}}>Fee</th>
              <th style={{color:"white",textAlign:'center'}}>Action</th>
            </tr>
          </thead>
        </table>
        <div className="table-body-container">
          <table className="course-table">
            <tbody>
              {course
                .filter((item) =>
                  search === "" ||
                  item.courseName.toLowerCase().includes(search.toLowerCase()) ||
                  item.courseDuration.includes(search) ||
                  item.courseFee.includes(search)
                )
                .filter((item) =>
                  courseFilter === "" || item.courseName === courseFilter
                )
                .map((item, idx) => (
                  <tr key={idx}>
                    <td className="id-column">{idx + 1}</td>
                    <td><img src={item.coverPhoto || ""} alt={item.courseName} className="avatar" /></td>
                    <td>{item.courseName}</td>
                    <td>{item.courseDuration}</td>
                    <td>{item.courseFee}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button
                          className="button-register"
                          onClick={() => openUpdateForm(item)}
                        >
                          Update
                        </button>
                        <button
                          className="button-close"
                          onClick={() => openConfirmDialog(item)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={deleteCourseHandler}
        message="Are you sure you want to delete this course?"
      />

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            overflow: 'hidden',
            padding: '20px', 
          },
        }}
      >
        <DialogTitle>
          <IconButton
            edge="end"
            color="inherit"
            onClick={closeModal}
            aria-label="close"
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ overflow: 'hidden' }}>
          <AddCourse course={selectedCourse} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Course;
