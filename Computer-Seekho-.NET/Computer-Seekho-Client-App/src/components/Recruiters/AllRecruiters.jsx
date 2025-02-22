import { useState, useEffect } from "react";
import "./AllRecruiters.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const AllRecruiters = () => {
    const [recruiters, setRecruiters] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/recruiter/getAll")
            .then((response) => response.json())
            .then((data) => setRecruiters(data))
            .catch((error) => console.error("Error fetching recruiters:", error));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="all-recruiters-container">
                <h2 className="all-recruiters-title">All Recruiters</h2>
                <div className="recruiters-grid">
                    {recruiters.map((recruiter, index) => (
                        <div key={index} className="recruiter-card">
                            <img
                                src={recruiter.recruiterImage}
                                alt="Recruiter"
                                className="recruiter-image"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AllRecruiters;
