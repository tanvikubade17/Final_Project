import React, { useState,useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const AddEnquiryComponent = ({selectedEnquiry}) => {

  const[staffId,setStaffId] = useState(1);

  const jwt = sessionStorage.getItem('token');

    if (!jwt) {
      navigate("/")
    }
    const payloadBase64 = jwt.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    const username = payload.username;


  const [formData, setFormData] = useState({
    enquirerName: "",
    enquirerAddress: "",
    enquirerMobile: "",
    enquirerAlternateMobile: "",
    enquirerEmailId: "",
    enquiryDate: dayjs(),
    enquirerQuery: "",
    courseName: "",
    followUpDate: dayjs().add(3,'day'),
  });

   useEffect(() => {
      if (selectedEnquiry) {
        setFormData({
          enquirerName: selectedEnquiry.enquirerName || "",
          enquirerMobile: selectedEnquiry.mobile || "",
          enquirerEmailId:selectedEnquiry.email,
          courseName: selectedEnquiry.courseName || "",
          enquirerQuery:selectedEnquiry.enquiryMessage || "",
          enquiryDate: dayjs(),
          followUpDate: dayjs().add(3,'day'),
        });
      }
    }, [selectedEnquiry]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const id = await getStaffIdHandler(username);
  
    const formattedData = {
      ...formData,
      enquiryDate: formData.enquiryDate ? dayjs(formData.enquiryDate).format("YYYY-MM-DD") : null,
      followUpDate: formData.followUpDate ? dayjs(formData.followUpDate).format("YYYY-MM-DD") : null,
      enquiryCounter: 0, staffId : id
    };
  
    console.log(formattedData);
  
    try {
      const response = await fetch("http://localhost:8080/enquiries/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add Enquiry");
      }
      const newEnquiry = await response.json();
      toast.success(newEnquiry.message || "Enquiry added successfully!");
      await deleteEnquiryHandler();
  
      setFormData({
        enquirerName: "",
        enquirerAddress: "",
        enquirerMobile: "",
        enquirerAlternateMobile: "",
        enquirerEmailId: "",
        enquiryDate: dayjs(),
        enquirerQuery: "",
        courseName: "",
        followUpDate: dayjs().add(3, "day")
      });
  
    } catch (error) {
      toast.error("Error adding Enquiry. Please try again.");
    }
  };
  
  

  const deleteEnquiryHandler = async () => {
    const id = selectedEnquiry?.getInTouchId;
    console.log("Deleting enquiry with ID:", id);

    if (!id) return;
  
    try {
      const response = await fetch(`http://localhost:8080/getinTouch/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(response.status === 404 ? "Enquiry not found!" : "Failed to delete enquiry");
      }

      toast.success("Enquiry deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
};

const getStaffIdHandler = async (username) => {
  try {
    const response = await fetch(`http://localhost:8080/staff/username/${username}`);
    if (!response.ok) {
      throw new Error("Failed to fetch staff ID");
    }
    const data = await response.json();
    return Number(data);
  } catch (error) {
    toast.error(error.message);
  }
};

  

  return (
    <Container maxWidth="md">
      <Card
        sx={{
          boxShadow: 6,
          borderRadius: 3,
          backgroundColor: "#FEFFFF",
          backgroundImage: "linear-gradient(135deg, #FEFFFF 30%, #F5F7FA 100%)",
          border: "1px solid #DDD",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.02)",
          },
          height: "auto",
          overflow: "hidden"
        }}
      >
        <CardContent sx={{ paddingBottom: "16px" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="enquirerName"
                  value={formData.enquirerName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{
                    backgroundColor: "#FEFFFF",
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                />
              </Grid>
             
              <Grid item xs={6}>
                <FormControl fullWidth required sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}>
                  <InputLabel>Course</InputLabel>
                  <Select name="courseName" value={formData.courseName} onChange={handleChange}>
                    <MenuItem value={"DAC"}>DAC</MenuItem>
                    <MenuItem value={"DBDA"}>DBDA</MenuItem>
                    <MenuItem value={"PRE-CAT"}>PRE-CAT</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="enquirerAddress"
                  value={formData.enquirerAddress}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{
                    backgroundColor: "#FEFFFF",
                    borderRadius: 2,
                    boxShadow: 2,
                    minHeight: "30px",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mobile"
                  name="enquirerMobile"
                  type="number"
                  value={formData.enquirerMobile}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{
                    backgroundColor: "#FEFFFF",
                    borderRadius: 2,
                    boxShadow: 2,
                    minHeight: "30px",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Alternate Mobile"
                  name="enquirerAlternateMobile"
                  type="number"
                  value={formData.enquirerAlternateMobile}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#FEFFFF",
                    borderRadius: 2,
                    boxShadow: 2,
                    minHeight: "40px", 
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="enquirerEmailId"
                  type="email"
                  value={formData.enquirerEmailId}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{
                    backgroundColor: "#FEFFFF",
                    borderRadius: 2,
                    boxShadow: 2,
                    minHeight: "40px",
                  }}
                />
                
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Enquiry Date"
                    value={formData.enquiryDate}
                    onChange={(newValue) => handleDateChange("enquiryDate", newValue)}
                    sx={{
                      backgroundColor: "#FEFFFF",
                      borderRadius: 2,
                      boxShadow: 2,
                      minHeight: "40px", 
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Follow-Up Date"
                    value={formData.followUpDate}
                    onChange={(newValue) => handleDateChange("followUpDate", newValue)}
                    sx={{
                      backgroundColor: "#FEFFFF",
                      borderRadius: 2,
                      boxShadow: 2,
                      minHeight: "40px", 
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Query"
                  name="enquirerQuery"
                  multiline
                  rows={3}
                  value={formData.enquirerQuery}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{
                    backgroundColor: "#FEFFFF",
                    borderRadius: 2,
                    boxShadow: 2,
                    minHeight: "40px", 
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"variant="contained" fullWidth
                  sx={{
                    backgroundImage: "linear-gradient(to right, #B1C29E,rgb(250, 218, 122))",
                    color: "#FEFFFF",
                    "&:hover": { backgroundImage: "linear-gradient(to right, #FADA7A  , #F0A04B)" },
                    py: 1.5,
                    mt: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                >
                  Submit Enquiry
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddEnquiryComponent;
