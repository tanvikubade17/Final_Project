import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import ConfirmDialog from "./ConfirmDialog";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import AddStaff from "./AddStaff";
import "./Staff.css";

function Staff() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [staff, setStaff] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const deleteStaffHandler = async () => {
    if (!selectedStaffId) return;
    try {
      const response = await fetch(`http://localhost:8080/staff/delete/${selectedStaffId}`, {
        method: "DELETE",
        // headers:{
        //   "Authorization": `Bearer ${token}`,
        // }
      });

      if (response.status === 404) {
        throw new Error("Staff not found!");
      } else if (response.ok) {
        const result = await response.json();
        toast.success(result.message);
        setStaff((prevStaff) => prevStaff.filter((staff) => staff.staffId !== selectedStaffId));
      }
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error(error.message);
      setIsConfirmOpen(false);
    }
  };

  const openConfirmDialog = (staffId) => {
    setSelectedStaffId(staffId);
    setIsConfirmOpen(true);
  };

  const openRegisterForm = () => {
    // setSelectedEnquiry(staff);
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch("http://localhost:8080/staff/getAll", {
          // headers:{
          //   "Authorization": `Bearer ${token}`,
          // }
        });
        
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const result = await response.json();
        console.log(result);
        setStaff(result);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchStaff();
  }, []);

  return (
    <div className="container">
      <Toaster />
      <h3 className="title">Staff</h3>
      <div className="actions">
        <button
          className="add-btn"
          onClick={() => openRegisterForm()}
        >
          Add Staff
        </button>
        <input
          placeholder="Search..."
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="role-dropdown"
        >
          <option value="">All Roles</option>
          <option value="ROLE_TEACHING">Teaching</option>
          <option value="ROLE_NON_TEACHING">NonTeaching</option>
        </select>
      </div>

      <div className="table-container">
        <table className="staff-table">
          <thead>
            <tr className="table-header">
            <th className="id-column" style={{ color: "white"}}>No</th>
              <th style={{ color: "white" }}>Photo</th>
              <th style={{ color: "white"}}>Name</th>
              <th style={{ color: "white"}}>Email</th>
              <th style={{ color: "white"}}>Mobile</th>
              <th style={{ color: "white"}}>Role</th>
              <th style={{ color: "white"}}>Action</th>
            </tr>
          </thead>
        </table>
        <div className="table-body-container">
          <table className="staff-table">
            <tbody>
              {staff
                .filter((item) =>
                  search === "" ||
                  item.staffName.toLowerCase().includes(search.toLowerCase()) ||
                  item.staffEmail.toLowerCase().includes(search.toLowerCase()) ||
                  item.staffMobile.includes(search) ||
                  item.staffRole.toLowerCase().includes(search.toLowerCase())
                )
                .filter((item) =>
                  roleFilter === "" || item.staffRole === roleFilter
                )
                .map((item, idx) => (
                  <tr key={idx}>
                    <td className="id-column">{idx + 1}</td>
                    <td><img src={item.photoUrl || ""} alt={item.staffName} className="avatar" /></td>
                    <td>{item.staffName}</td>
                    <td>{item.staffEmail}</td>
                    <td>{item.staffMobile}</td>
                    <td>{item.staffRole.substring(5)}</td>
                    <td>
                      <button
                        className="button-delete"
                        onClick={() => openConfirmDialog(item.staffId)}
                      >
                        Delete
                      </button>
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
        onConfirm={deleteStaffHandler}
        message="Are you sure you want to delete this staff member?"
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
          <AddStaff/>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Staff;
