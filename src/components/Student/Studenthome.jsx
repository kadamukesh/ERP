import React, { useEffect, useState } from "react";
import { FaBook, FaTrophy, FaChalkboardTeacher, FaTools } from "react-icons/fa"; // Import icons from react-icons
import Stopbar from "./Stopbar.jsx";
import Ssidebar from "./Ssidebar.jsx";

const Studenthome = () => {
  // const [username, setUsername] = useState("");

  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (!storedName) {
      window.location.href = "/login"; // Redirect if not logged in
    } else {
      setName(storedName); // Set username if available
    }
  }, []);

  // useEffect(() => {
  //   const storedUsername = localStorage.getItem("studentUsername");
  //   if (!storedUsername) {
  //     window.location.href = "/login"; // Redirect if not logged in
  //   } else {
  //     setUsername(storedUsername); // Set username if available
  //   }
  // }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <Stopbar />
      {/* Sidebar and Content Section */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Ssidebar />
        {/* Main Content */}
        <div className="flex-1 p-10 bg-gray-100">
          <h1
            className="text-3xl font-bold text-center"
            style={{ marginBottom: "200px" }}
          >
            Welcome {name} {/* Displaying the username here */}
          </h1>

          {/* Icon and Text Section */}
          <div className="grid grid-cols-4 gap-10 mt-10 text-center">
            {/* Journals & Conferences */}
            <div>
              <FaBook className="text-blue-500 text-6xl mx-auto mb-4" />
              <p className="text-lg font-semibold">Journals & Conferences</p>
            </div>

            {/* Awards & Recognitions */}
            <div>
              <FaTrophy className="text-blue-500 text-6xl mx-auto mb-4" />
              <p className="text-lg font-semibold">Awards & Recognition</p>
            </div>

            {/* Workshops, Seminars & Guest Lectures */}
            <div>
              <FaChalkboardTeacher className="text-blue-500 text-6xl mx-auto mb-4" />
              <p className="text-lg font-semibold">
                Workshops, Seminars & Guest Lectures
              </p>
            </div>

            {/* Projects & Consultancy */}
            <div>
              <FaTools className="text-blue-500 text-6xl mx-auto mb-4 " />
              <p className="text-lg font-semibold">Projects & Consultancy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studenthome;
