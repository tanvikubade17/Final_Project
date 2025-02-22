import React, { useState,useEffect } from "react";
import { Card, CardContent, Typography, Box, Grid, Divider, IconButton } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { blue, green, grey } from "@mui/material/colors";
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import AddEnquiryComponent from "../Enquiry/AddEnquiry"; 
import toast from "react-hot-toast";

const GetInTouch = () => {
  const [enquiries,setEnquiries] = useState([ ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const handleAccept = (enquiry) => {
    setSelectedEnquiry(enquiry); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:8080/getInTouch/getAll");
        if (!response.ok) throw new Error("Something went wrong!");

        const result = await response.json();
        setEnquiries(result);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchStudents();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxHeight: 700,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        📩 New Enquiries
      </Typography>
      <Grid container spacing={2}>
  {enquiries.length > 0 ? (
    enquiries.map((enquiry, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 220,
            p: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
            borderRadius: 3,
            transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)", // Shadow enhancement on hover
            },
            position: "relative",
            backgroundColor: "#fff",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: green[500],
            }}
            onClick={() => handleAccept(enquiry)} 
          >
            <CheckCircleIcon />
          </IconButton>

          <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <MessageIcon sx={{ mr: 2, color: blue[500] }} />
              <Typography variant="body1" sx={{ fontWeight: "bold", color: grey[800] }}>
                {enquiry.enquirerName}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: grey[600] }}>
              <b>Email:</b> {enquiry.email}
            </Typography>
            <Typography variant="body2" sx={{ color: grey[600] }}>
              <b>Mobile:</b> {enquiry.mobile}
            </Typography>
            <Typography variant="body2" sx={{ color: grey[600] }}>
              <b>Course:</b> {enquiry.courseName || "N/A"}
            </Typography>
            <Typography variant="body2" sx={{ color: grey[600], flexGrow: 1 }}>
              <b>Message:</b> {enquiry.enquiryMessage || "N/A"}
            </Typography>
          </CardContent>
        </Card>
        {index < enquiries.length - 1 && <Divider />}
      </Grid>
    ))
  ) : (
    <Typography align="center" sx={{ width: "100%", color: grey[600] }}>
      No new enquiries
    </Typography>
  )}
</Grid>



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
          <AddEnquiryComponent selectedEnquiry={selectedEnquiry} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default GetInTouch;
