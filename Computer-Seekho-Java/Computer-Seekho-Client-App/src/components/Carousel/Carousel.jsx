import React, { useState, useEffect } from "react";
import mainImage from "../images/HomeImage.png";
import slider1 from "../images/outDoor.jpg";
import slider2 from "../images/HomeImage.png";

const images = [mainImage, slider1, slider2]; // Array of images

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Cycle through images
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div className="carousel-container w-full relative">
      <div className="image-container flex justify-center items-center min-h-screen">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Carousel;
