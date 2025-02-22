import React, { useState, useEffect } from "react";
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
import toast from 'react-hot-toast'

const StudentForm = ({ selectedEnquiry }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    studentAddress: "",
    studentGender: "",
    photoUrl: "",
    studentDob: dayjs(),
    studentQualification: "",
    studentMobile: "",
    studentEmail: "",
    batch: { batchId: 1 },
    course: { courseId: 1 },
  });

  useEffect(() => {
    if (selectedEnquiry) {
      setFormData({
        studentName: selectedEnquiry.enquirerName || "",
        studentMobile: selectedEnquiry.enquirerMobile || "",
        course: {courseId:Number(selectedEnquiry.course)}|| "",
        batch: {batchId:Number(selectedEnquiry.batch)}
      });
    }
  }, [selectedEnquiry]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData,
      ...(name === "course"
        ? { course: { ...formData.course, courseId: Number(value) } }
        : name === "batch"
          ? { batch: { ...formData.batch, batchId: Number(value) } }
          : { [name]: value })
    }));
  };

  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      enquiryDate: formData.enquiryDate ? dayjs(formData.enquiryDate).format("YYYY-MM-DD") : null,
      followUpDate: formData.followUpDate ? dayjs(formData.followUpDate).format("YYYY-MM-DD") : null,
    };

    try {
      const response = await fetch(`http://localhost:8080/student/add/${selectedEnquiry.enquiryId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Failed to add Enquiry");
      }
      const newEnquiry = await response.json();
      toast.success(newEnquiry.message || "Student Registered!");
      await deleteEnquiryHandler();
      
    } catch (error) {
      toast.error("Error adding Enquiry. Please try again.");
    }
  };

  const deleteEnquiryHandler = async () => {
    const id = selectedEnquiry?.enquiryId;

    if (!id) return;

    try {
      const response = await fetch(`http://localhost:8080/enquiries/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(response.status === 404 ? "Enquiry not found!" : "Failed to delete enquiry");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", justifyContent: "center", mb: "15px" }}>
        <Typography
          variant="h4"
          color="#B1C29E"
          sx={{ fontWeight: 700, fontFamily: "'Roboto Slab', serif" }}
        >
          Student Form
        </Typography>
      </Box>
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
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit} style={{ marginTop: "2px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="studentAddress"
                  value={formData.studentAddress}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="studentGender"
                    value={formData.studentGender}
                    onChange={handleChange}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Photo URL"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    value={formData.studentDob}
                    onChange={(newValue) => handleDateChange("studentDob", newValue)}
                    sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Qualification"
                  name="studentQualification"
                  value={formData.studentQualification}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mobile"
                  name="studentMobile"
                  type="number"
                  value={formData.studentMobile}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="studentEmail"
                  type="email"
                  value={formData.studentEmail}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}>
                  <InputLabel>Course</InputLabel>
                  <Select name="course" value={formData.course.courseId} onChange={handleChange}>
                    <MenuItem value={1}>DAC</MenuItem>
                    <MenuItem value={2}>DBDA</MenuItem>
                    <MenuItem value={3}>PRE-CAT</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth required sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}>
                  <InputLabel>Batch</InputLabel>
                  <Select name="batch" value={formData.batch.batchId} onChange={handleChange}>
                    <MenuItem value={1}>Batch 1</MenuItem>
                    <MenuItem value={2}>Batch 2</MenuItem>
                    <MenuItem value={3}>Batch 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
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
                  Submit Student
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default StudentForm;
