import React from "react";
import "./aboutSection.css";
const About = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <h1>About Us</h1>

        <div>
          <div>
            <p>Sachin Kumar</p>
            <span>
              This is a sample wesbite made by @Sachin Kumar. Only with the
              purpose to learn MERN stack.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <a href="https://www.instagram.com/_s_y_0210/" target="blank">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
