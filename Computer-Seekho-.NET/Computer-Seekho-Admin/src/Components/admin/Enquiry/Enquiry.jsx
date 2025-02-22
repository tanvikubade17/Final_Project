import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmDialog from '../Utility/ConfirmDialog';
import StudentForm from './StudentForm';
import './Enquiry.css';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import UpdateMessage from './UpdateMesage';
import AddEnquiry from './AddEnquiry';

function Enquiry() {
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [enquiry, setEnquiry] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [enquiryId,setEnquiryId] = useState(0);
  const [dialogTitle, setDialogTitle] = useState(""); 
  const [event,setEvent] = useState("");

  const navigate = useNavigate();

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);


  const jwt = sessionStorage.getItem('token');

  if (!jwt) {
    navigate("/")
  }
  const payloadBase64 = jwt.split(".")[1];
  const payloadJson = atob(payloadBase64);
  const payload = JSON.parse(payloadJson);
  const username = payload.username;

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const response = await fetch(`http://localhost:8080/enquiries/getbystaff/${username}`);
        if (!response.ok) throw new Error("Something went wrong!");

        const result = await response.json();
        setEnquiry(result);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchEnquiry();
  }, []);

  const deleteInquiryHandler = () => {
    setIsConfirmOpen(false);
  };

  const openConfirmDialog = (staffId) => {
    setSelectedEnquiry(staffId);
    setIsConfirmOpen(true);
  };

  const openRegisterForm = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEnquiryOpen(false);
  };

  const handleUpdate = (newMessage) => {
    if(event === "Update"){
    updateMessage(newMessage);
    }
    if(event === "Close"){
      closeEnquiry(newMessage);
    }
    closeDialog();
  };

  const updateMessage = async(message)=>{
      const response = await fetch(`http://localhost:8080/enquiries/updateMessage/${enquiryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });
      if(response.status === 200){
        toast.success("Updated successfully");
        return;
      }

      toast.error(response.message);
  }

  const closeEnquiry = async(message)=>{
    const response = await fetch(`http://localhost:8080/enquiries/deactivate/${enquiryId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    if(response.status === 200){
      toast.success("Updated successfully");
      setEnquiry((prevEnquiry) => prevEnquiry.filter((enquiry) => enquiry.enquiryId !== enquiryId));
      return;
    }

    toast.error(response.message);
}

const openEnquiryForm = () => {
  setIsEnquiryOpen(true); 
};


  return (
    <div className="container">
      <Toaster />
      <h3 className="title">Enquiry</h3>
      <div className="actions">
      <button
          className="add-btn"
          onClick={() => openEnquiryForm()}
        >
          Add Enquiry
        </button>
        <input
          placeholder="Search..."
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-container">
        <table className="enquiry-table">
          <thead>
            <tr className='table-header'>
              <th className="id-column" style={{ color: "white" }}>No</th>
              <th style={{ color: "white", textAlign: 'center' }}>Enquirer Name</th>
              <th style={{ color: "white", textAlign: 'center' }}>Course</th>
              <th style={{ color: "white", textAlign: 'center' }}>Mobile</th>
              <th style={{ color: "white", textAlign: 'center' }}>Date</th>
              <th style={{ color: "white", textAlign: 'center' }}>Follow Up  Counter</th>
              <th style={{ color: "white", textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
        </table>
        <div className="table-body-container">
          <table className="enquiry-table">
            <tbody>
              {enquiry
                .filter((item) =>
                  search === "" ||
                  item.enquirerName.toLowerCase().includes(search.toLowerCase()) ||
                  item.courseName.toLowerCase().includes(search.toLowerCase()) ||
                  item.followUpDate.includes(search)
                )
                .map((item, idx) => (
                  <tr key={idx}>
                    <td className="id-column">{idx + 1}</td>
                    <td>{item.enquirerName}</td>
                    <td>{item.courseName}</td>
                    <td>{item.enquirerMobile}</td>
                    <td>{item.followUpDate}</td>
                    <td>{item.enquiryCounter}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button
                          className="button-call"
                          onClick={() => {
                            setEvent("Update")
                            setEnquiryId(item.enquiryId);
                            setDialogTitle("Update FollowUp Message");
                            openDialog();
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="button-register"
                          onClick={() => openRegisterForm(item)}
                        >
                          Register
                        </button>
                        <button
                          className="button-close"
                          
                          onClick={() => {
                            setEvent("Close")
                            setEnquiryId(item.enquiryId);
                            setDialogTitle("Closure Reason");
                            openDialog();
                          }
                          }
                        >
                          Close
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
        onConfirm={deleteInquiryHandler}
        message="Are you sure you want to delete this enquiry?"
      />

      <Dialog
        open={isEnquiryOpen}
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
          <AddEnquiry/>
          
        </DialogContent>
      </Dialog>



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
          <StudentForm selectedEnquiry={selectedEnquiry} />
          
        </DialogContent>
      </Dialog>
      <UpdateMessage isOpen={isDialogOpen} onClose={closeDialog} onUpdate={handleUpdate} dialogTitle={dialogTitle}/>
    </div>
  );
}

export default Enquiry;
