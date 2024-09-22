import React from "react";
import playStore from "../../images/playstore.png";
import appStore from "../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer" className="bg-slate-700">
      <div className="leftFooter text-slate-700">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p className="text-slate-300">High Quality is our first priority</p>

        <p className="text-slate-300">Copyrights 2024 &copy; sachin843413</p>
      </div>

      <div className="rightFooter">
        <h4 className="text-slate-300">Follow Us</h4>
        <a href="https://www.instagram.com/_s_y_0210/" className="text-slate-300">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;