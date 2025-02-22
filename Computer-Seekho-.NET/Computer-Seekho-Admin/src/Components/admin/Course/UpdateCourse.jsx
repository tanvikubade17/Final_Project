import React, { useState } from "react";
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
import toast, { Toaster } from "react-hot-toast";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    courseDuration: "",
    courseSyllabus: "",
    courseFee: "",
    coverPhoto: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await fetch("http://localhost:8080/course/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add course");
      }

      const newCourse = await response.json();
      toast.success(newCourse.message);

      setFormData({
        courseName: "",
        courseDescription: "",
        courseDuration: "",
        courseSyllabus: "",
        courseFee: "",
        courseIsActive: "",
        coverPhoto: "",
      });

    } catch (error) {
      toast.error("Error adding course. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Toaster />
      <Box sx={{ display: "flex", justifyContent: "center", mb: "15px" }}>
        <Typography
          variant="h4"
          color="#B1C29E"
          sx={{ fontWeight: 700, fontFamily: "'Roboto Slab', serif" }}
        >
          Add Course
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
              {/* Course Name */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Course Name"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}
                />
              </Grid>

              {/* Course Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Course Description"
                  name="courseDescription"
                  value={formData.courseDescription}
                  onChange={handleChange}
                  required
                  multiline
                  rows={3}
                  variant="outlined"
                  sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Course Duration (months)"
                  name="courseDuration"
                  type="number"
                  value={formData.courseDuration}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Course Fee"
                  name="courseFee"
                  type="number"
                  value={formData.courseFee}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Course Syllabus"
                  name="courseSyllabus"
                  value={formData.courseSyllabus}
                  onChange={handleChange}
                  required
                  multiline
                  rows={3}
                  variant="outlined"
                  sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cover Photo URL"
                  name="coverPhoto"
                  value={formData.coverPhoto}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundImage: "linear-gradient(to right, #B1C29E, rgb(250, 218, 122))",
                    color: "#FEFFFF",
                    "&:hover": { backgroundImage: "linear-gradient(to right, #FADA7A, #F0A04B)" },
                    py: 1.5,
                    mt: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddCourse;
