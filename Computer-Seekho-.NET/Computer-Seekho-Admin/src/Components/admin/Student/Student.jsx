import React,{ useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmDialog from "../Utility/ConfirmDialog";
import "./Student.css";

const Student = () => {
    const [search, setSearch] = useState("");
    const [courseFilter, setCourseFilter] = useState("");
    const [student, setStudent] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const openConfirmDialog = (studentId) => {
      setSelectedStudentId(studentId);
      setIsConfirmOpen(true);
    }; 

    const deleteStudentHandler = async () => {
      if (!selectedStudentId) return;
      try {
        const response = await fetch(`http://localhost:8080/student/delete/${selectedStudentId}`, {
          method: "DELETE",
        });

        if (response.status === 404) {
          throw new Error("Student not found!");
        } else if (response.ok) {
          const result = await response.json();
          toast.success(result.message);

          setStudent((prevStudent) => prevStudent.filter((student) => student.id !== selectedStudentId));
        }
        setIsConfirmOpen(false);
      } catch (error) {
        toast.error(error.message);
        setIsConfirmOpen(false);
      }
    };

    useEffect(() => {
      const fetchStudents = async () => {
        try {
          const response = await fetch("http://localhost:8080/student/getAll");
          if (!response.ok) throw new Error("Something went wrong!");

          const result = await response.json();
          setStudent(result);
        } catch (error) {
          toast.error(error.message);
        }
      };
      fetchStudents();
    }, []);

    return (
      <div className="container">
        <Toaster/>
        <h3 className="title">Student</h3>
        <div className="actions">
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
            <option value="">All Course</option>
            <option value="DAC">DAC</option>
            <option value="DBDA">DBDA</option>
          </select>
        </div>
  
        <div className="table-container">
          <table className="student-table">
            <thead>
              <tr className='table-header'>
                <th className="id-column" style={{color:"white"}}>No</th>
                <th style={{color:"white",textAlign:'center'}}>Photo</th>
                <th style={{color:"white",textAlign:'center'}}>Name</th>
                <th style={{color:"white",textAlign:'center'}}>Mobile</th>
                <th style={{color:"white",textAlign:'center'}}>Courses</th>
                <th style={{color:"white",textAlign:'center'}}>Batch</th>
                <th style={{color:"white",textAlign:'center'}}>Pending Fees</th>
                <th style={{color:"white",textAlign:'center'}}> </th>
              </tr>
            </thead>
          </table>
          <div className="table-body-container">
            <table className="student-table">
              <tbody>
                {student
                  .filter((item) =>
                    search === "" ||
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.mobile.includes(search) ||
                    item.course.includes(search) ||
                    item.batch.toLowerCase().includes(search.toLowerCase())
                  )
                  .filter((item) =>
                    courseFilter === "" || item.course === courseFilter
                  )
                  .map((item, idx) => (
                    <tr key={idx}>
                      <td className="id-column">{idx + 1}</td>
                      <td><img src={item.photoUrl || ""} alt={item.name} className="avatar" /></td>
                      <td>{item.name}</td>
                      <td>{item.mobile}</td>
                      <td>{item.course}</td>
                      <td>{item.batch}</td>
                      <td>{item.pendingFees}</td>
                      <td>  
                        {/* <button
                          className="button-delete"
                          onClick={() => openConfirmDialog(item.id)} // Fix: Use item.id consistently
                        >
                          Delete
                        </button> */}
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
          onConfirm={deleteStudentHandler}
          message="Are you sure you want to delete this student?"
        />
      </div>
    );
}

export default Student;
