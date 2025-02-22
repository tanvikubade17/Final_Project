import React, { Suspense } from "react";
import "./LandPage.css"; 


const Name = React.lazy(() => import("../Text/Name"));
const Navbar = React.lazy(() => import("../Navbar/Navbar"));
const Carousel = React.lazy(() => import("../Carousel/Carousel"));
const Course = React.lazy(() => import("../CourseCard/Course"));
const News = React.lazy(() => import("../News/News"));
const Recruiters = React.lazy(() => import("../Recruiters/Recruiters"));
const Footer = React.lazy(() => import("../Footer/Footer"));

// Spinner Component
const Spinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
  </div>
);

const LandPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Name />
      <Navbar />
      <Carousel />
      <Course />
      <News />
      <Recruiters />
      <Footer />
    </Suspense>
  );
};

export default LandPage;
