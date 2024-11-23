import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import { FaBook, FaTrophy, FaChalkboardTeacher, FaTools } from "react-icons/fa";

const AdminHome = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    const storedUsername = localStorage.getItem("adminUsername");
    if (!storedUsername) {
      navigate("/login"); // Redirect if not logged in
    } else {
      setUsername(storedUsername); // Set username if available
    }
  }, [navigate]); // Include navigate in dependency array
  //login ayinappudu manaki local storage value unte ostadi

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <Topbar />

      {/* Sidebar and Content Section */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-10 bg-gray-100">
          <h1
            className="text-3xl font-bold text-center"
            style={{ marginBottom: "200px" }}
          >
            Welcome {username}
          </h1>

          {/* Icon and Text Section */}
          <div className="grid grid-cols-4 gap-10 mt-10 text-center">
            <div>
              <FaBook className="text-blue-500 text-6xl mx-auto mb-4" />
              <p className="text-lg font-semibold">Journals & Conferences</p>
            </div>
            <div>
              <FaTrophy className="text-blue-500 text-6xl mx-auto mb-4" />
              <p className="text-lg font-semibold">Awards & Recognitions</p>
            </div>
            <div>
              <FaChalkboardTeacher className="text-blue-500 text-6xl mx-auto mb-4" />
              <p className="text-lg font-semibold">
                Workshops, Seminars & Guest Lectures
              </p>
            </div>
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

export default AdminHome;
