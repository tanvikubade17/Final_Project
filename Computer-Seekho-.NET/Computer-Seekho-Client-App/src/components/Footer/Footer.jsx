import React from 'react';
import './Footer.css';
import logo from '../images/Logo.png';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Information */}
        <div className="footer-section brand-info">
          <h2>SM VITA</h2>
          <p>Empowering learners worldwide with quality courses. Join us to start your journey of knowledge and growth.</p>
          <img src={logo} alt="Computer Seekho Logo" className="left-0 size-40" />
        </div>

        {/* Navigation Links */}
        <div className="footer-section navigation">
          <h3>Navigation</h3>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section contact-info">
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:support@SMVita.com">support@SMVita.com</a></p>
          <p>Phone: +91-9876543210</p>
          <p>Address: Mumbai, India</p>
          <p>Business Hours: 9 AM - 6 PM IST</p>
        </div>

        {/* Social Media Links */}
        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook<i className="fab fa-facebook"></i></a><br></br>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter<i className="fab fa-twitter"></i></a><br></br>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">Linkedin<i className="fab fa-linkedin"></i></a><br></br>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram<i className="fab fa-instagram"></i></a><br></br>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Youtube<i className="fab fa-youtube"></i></a><br></br>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="footer-section dynamic-content">
          <h3>Trending Courses</h3>
          <ul>
            <li><a href="/course-1">Dac</a></li>
            <li><a href="/course-2">Dbda</a></li>
            <li><a href="/course-3">Mscit</a></li>
          </ul>
          <h3>Upcoming Events</h3>
          <p>Join our next webinar: "Future of Online Learning" - Jan 30th, 2025</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Computer Seekho. All Rights Reserved.</p>
        <p>100% Secure Payments | SSL Certified</p>
      </div>
    </footer>
  );
};

export default Footer;