import React from "react";
import "../App.css";
import "./css/Home.css";
import Footer from "./Footer";

function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <video
        src="/videos/video-1.mp4"
        autoPlay
        loop
        muted
        className="w-full h-auto"
      />
      <Footer />
    </div>
  );
}

export default Home;
