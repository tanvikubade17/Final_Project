import React, { useEffect, useState } from "react";
import "./style.css";

const Card = ({ newsTitle, newsDescription, newsUrl }) => {
  return (
    <div className="box1">
      <img src={newsUrl} alt="news" />
      <div className="overlay1">
        <h3>{newsTitle}</h3>
        <p>{newsDescription}</p>
       
      </div>
    </div>
  );
};

const PlacementCards = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/News/all") // Replace with your actual API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch placements");
        }
        return response.json();
      })
      .then((data) => {
        setPlacements(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading placements...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="card-area1">
      <div className="wrapper1">
        <h1 className="gossip-heading1">Gossip at Vita</h1>
        <div className="box-area1">
          {placements.map((placement, index) => (
            <Card key={index} {...placement} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacementCards;
