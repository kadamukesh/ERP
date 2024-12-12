import React from "react";
import "../App.css";
import "./css/Home.css";
import Footer from "./Footer";

function Home() {
  return (
    <div className="home-container">
      <div className="media-container">
        <video
          src="/videos/video-1.mp4"
          autoPlay
          loop
          muted
          className="background-video"
        />
        <div className="background-image" />
      </div>
      <div className="content">
        <img src="/images/erp.png" alt="ERP" className="erp-logo" />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
