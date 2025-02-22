import React, { useState } from "react";
import Card from "./Card";
import "./CardStacker.css"; // Import the CSS file

const CardStacker = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="card-stacker">
      {data.map((eachData, index) => (
        <div
          key={index}
          className={`card-wrapper ${
            hoveredIndex !== null ? "spread" : ""
          } ${hoveredIndex === index ? "hovered" : ""}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Card
            title={eachData.title}
            subtitle={eachData.subtitle}
            rating={eachData.rating}
            backgroundColors={eachData.backgroundColors}
            image={eachData.image}
          />
        </div>
      ))}
    </div>
  );
};

export default CardStacker;
