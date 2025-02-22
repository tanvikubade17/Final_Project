import React, { useState } from "react";
import "./CardAs.css";
import visionLogo from "../images/altair.png";
import missionLogo from "../images/bg.png";
import cdacViewLogo from "../images/capg.png";
import awardsLogo from "../images/nse.png";
import historyLogo from "../images/tata.png";
import directorsViewLogo from "../images/atos.png";

const cardData = [
  { id: 1, title: "Vision", logo: visionLogo, description: "Detailed 1500-word vision description here..." },
  { id: 2, title: "Mission", logo: missionLogo, description: "Detailed 1500-word mission description here..." },
  { id: 3, title: "CDAC View", logo: cdacViewLogo, description: "Detailed 1500-word CDAC view description here..." },
  { id: 4, title: "Awards", logo: awardsLogo, description: "Detailed 1500-word awards description here..." },
  { id: 5, title: "History", logo: historyLogo, description: "Detailed 1500-word history description here..." },
  { id: 6, title: "Directors View", logo: directorsViewLogo, description: "Detailed 1500-word director's view description here..." },
];

const ExpandableCards = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="cards-container">
      {cardData.map((card) => (
        <div 
          key={card.id} 
          className={`card ${selectedCard === card.id ? "expanded" : ""}`} 
          onClick={() => setSelectedCard(card.id)}
        >
          <img src={card.logo} alt={card.title} className="card-logo" />
          <h3>{card.title}</h3>
        </div>
      ))}

      {selectedCard !== null && (
        <div className="overlay">
          <div className="popup">
            <h2>{cardData.find((c) => c.id === selectedCard)?.title}</h2>
            <p>{cardData.find((c) => c.id === selectedCard)?.description}</p>
            <button className="close-btn" onClick={() => setSelectedCard(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableCards;
