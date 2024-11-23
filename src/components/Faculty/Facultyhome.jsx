import { useNavigate } from "react-router-dom";
import { FaBook, FaTrophy, FaChalkboardTeacher, FaTools } from "react-icons/fa"; // Import icons from react-icons
import Fsidebar from "./Fsidebar.jsx";
import Ftopbar from "./Ftopbar.jsx";
import React, { useState, useEffect } from "react"; // Add useState and useEffect

const FacultyHome = () => {
  // const [username, setUsername] = useState("");
  const navigate = useNavigate(); // Hook to navigate

  // useEffect(() => {
  //   const storedUsername = localStorage.getItem("facultyUsername");
  //   if (!storedUsername) {
  //     navigate("/login"); // Redirect if not logged in
  //   } else {
  //     setUsername(storedUsername); // Set username if available
  //   }
  // }, [navigate]); // Include navigate in dependency array

  const [sname, setSName] = useState("");

  useEffect(() => {
    const storedSName = localStorage.getItem("sname");
    if (!storedSName) {
      window.location.href = "/login"; // Redirect if not logged in
    } else {
      setSName(storedSName); // Set username if available
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <Ftopbar />
      {/* Sidebar and Content Section */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Fsidebar />
        {/* Main Content */}
        <div className="flex-1 p-10 bg-gray-100">
          <h1
            className="text-3xl font-bold text-center bottom-40"
            style={{ marginBottom: "200px" }}
          >
            Welcome {sname}
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

export default FacultyHome;
