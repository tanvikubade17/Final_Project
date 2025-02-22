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
import toast, { Toaster } from 'react-hot-toast';

const AddStaff = () => {
  const [formData, setFormData] = useState({
    staffName: "",
    photoUrl: "",
    staffEmail: "",
    staffMobile: "",
    staffGender: "",
    staffRole: "",  
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8080/staff/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add staff");
      }
  
      const newStaff = await response.json();
      toast.success(newStaff.message);
        handleStaffAdded(newStaff);
        setFormData({
        staffName: "",
        photoUrl: "",
        staffEmail: "",
        staffMobile: "",
        staffGender: "",
        staffRole: "",
      });
  
    } catch (error) {
      toast.error("Error adding staff. Please try again.");
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
          Staff Form
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
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <TextField
                  fullWidth
                  label="Photo URL"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ mt: 2, backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="staffName"
                  value={formData.staffName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="staffEmail"
                  type="email"
                  value={formData.staffEmail}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mobile"
                  name="staffMobile"
                  type="number"
                  value={formData.staffMobile}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth required sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}>
                  <InputLabel>Gender</InputLabel>
                  <Select name="staffGender" value={formData.staffGender} onChange={handleChange}>
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth required sx={{ backgroundColor: "#FEFFFF", borderRadius: 2, boxShadow: 2 }}>
                  <InputLabel>Role</InputLabel>
                  <Select name="staffRole" value={formData.staffRole} onChange={handleChange}>
                    <MenuItem value={"TEACHING"}>Teaching</MenuItem>
                    <MenuItem value={"NON_TEACHING"}>Non-Teaching</MenuItem>
                  </Select>
                </FormControl>
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

export default AddStaff;
