import React from 'react'
import { BsFacebook } from "react-icons/bs";
import { IoLogoTwitter } from "react-icons/io5";
import { SiInstagram } from "react-icons/si";
import "./footer.css";
const Footer = () => {
  return (
    <footer>
    <div className="footer-content">
        <p>
            &copy; 2025 Your E-Learning platform. All rights reserved. <br/> made with ❤️ <a href="">Gyana</a>
        </p>
        <div className="social-links">
            <a href=""><BsFacebook></BsFacebook></a>
            <a href=""><IoLogoTwitter></IoLogoTwitter></a>
            <a href=""><SiInstagram></SiInstagram></a>
        </div>
    </div>
   </footer>
  )
}

export default Footer
