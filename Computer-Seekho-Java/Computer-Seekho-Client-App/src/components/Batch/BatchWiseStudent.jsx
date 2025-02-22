import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import './Batch.css';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Placedstudent = () => {
    const [PlacedstudentList, setPlacedstudentList] = useState([]);
    const { batchId } = useParams();
    console.log(batchId);

    // Fetch staff data from the backend
    useEffect(() => {
        const fetchPlacedstudent = async () => {
            try {
                const response = await fetch(`http://localhost:8080/placement/getByBatch/${batchId}`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to Fetch");
                }
                const data = await response.json();
                const formattedStudents = data.map(Placedstudent => ({
                    name: Placedstudent.studentName,
                    img: Placedstudent.photoUrl,
                    company: Placedstudent.recruiterName
                }));
                setPlacedstudentList(formattedStudents);
            } catch (error) {
                console.error("Error Fetching Data", error);
            }
        };

        fetchPlacedstudent();
    }, [])
    return (
        <div>
            <Navbar />
            <div className="wrapper">
                {/* <Navbar/> */}
                {PlacedstudentList.map((student, index) => (
                    <div className="card">
                        <img src={student.img} alt="Staff1" />
                        <div className="info">
                            <h1>{student.name}</h1>
                            <p>{student.company}</p>
                            {/* <a href='#' className="btn">Read...</a> */}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Placedstudent;