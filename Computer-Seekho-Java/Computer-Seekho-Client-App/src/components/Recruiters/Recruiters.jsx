import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Res.css';

const Recruiter = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize navigate

  // Fetch recruiters data
  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await fetch('http://localhost:8080/recruiter/getAll'); // API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch recruiters data');
        }
        const data = await response.json();
        // Limit to 5 recruiters
        setRecruiters(data.slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecruiters();
  }, []);

  if (loading) {
    return <div className="major-recruiters">Loading recruiters...</div>;
  }

  if (error) {
    return <div className="major-recruiters">Error: {error}</div>;
  }

  return (
    <div className="major-recruiters">
      <h2 className="section-title">Major Recruiters</h2>
      <div className="recruiters-grid">
        {recruiters.map((recruiter, index) => (
          <div key={index} className="recruiter-card">
            <img
              src={recruiter.recruiterPhotoUrl || 'https://via.placeholder.com/100'} // Fallback to placeholder
              alt={recruiter.recruiterName}
              className="recruiter-logo"
            />
            <h3 className="recruiter-name">{recruiter.recruiterName}</h3>
          </div>
        ))}
      </div>
      <button
        className="see-more-button"
        onClick={() => navigate('/AllRecruiters')} // Navigate to /ourrecruiters
      >
        SEE MORE
      </button>
    </div>
  );
};

export default Recruiter;
