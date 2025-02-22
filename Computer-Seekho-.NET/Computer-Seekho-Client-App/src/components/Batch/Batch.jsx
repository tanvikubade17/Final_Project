import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import './Batch.css';

const Staff = () => {
    const [BatchList, setBatchList] = useState([]);
    const navigate = useNavigate();
    // Fetch staff data from the backend
    useEffect(() => {
        const fetchBatch = async () => {
            try {
                const response = await fetch("http://localhost:8080/batch/all", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to Fetch");
                }
                const data = await response.json();
                const formattedBatch = data.map(batch => ({
                    Id: batch.batchId,
                    name: batch.batchName,
                    img: batch.batchPhotoUrl,
                }));
                setBatchList(formattedBatch);
            } catch (error) {
                console.error("Error Fetching Data", error);
            }
        };

        fetchBatch();
    }, [])
    return (
        <div>
            <Navbar />
            <div className="wrapper">
                {BatchList.map((batch, index) => (
                    <div className="card">
                        <img src={batch.img} alt="Staff1" />
                        <div className="info">
                            <h1>{batch.name}</h1>
                            <a onClick={() => navigate(`/BatchWiseStudent/${batch.Id}`)} href='#' className="btn">See More</a>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Staff;

