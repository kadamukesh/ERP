import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ssidebar from "./Ssidebar.jsx";
import Stopbar from "./Stopbar.jsx";
import {
  FaBook,
  FaTrophy,
  FaChalkboardTeacher,
  FaTools,
  FaBars,
} from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
const StudentHome = () => {
  const [name, setName] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (!storedName) {
      window.location.href = "/login"; // Redirect if not logged in
    } else {
      setName(storedName); // Set username if available
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <div className="lg:hidden">
        <div className="flex justify-between items-center bg-blue-600 text-white p-4">
          <button onClick={toggleMobileMenu} className="text-2xl">
            <FaBars />
          </button>
          <h1 className="text-xl font-bold">KLU ERP</h1>

          <button
            onClick={() => {
              localStorage.removeItem("adminUsername");
              navigate("/login");
            }}
            className="flex items-center gap-2 text-white"
          >
            <IoMdLogOut className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="hidden lg:block">
        <Stopbar />
      </div>

      {/* Sidebar and Content Section */}
      <div className="flex flex-1">
        {/* Sidebar - hidden on mobile, shown on larger screens */}
        <div className="hidden lg:block">
          <Ssidebar />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 lg:hidden">
            <div className="w-64 h-full bg-white shadow-lg">
              <div className="p-4 border-b">
                <button
                  onClick={toggleMobileMenu}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>
              <Ssidebar />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-10 bg-gray-100">
          <h1 className="text-2xl lg:text-3xl font-bold text-center mb-8 lg:mb-16">
            Welcome {name}
          </h1>

          {/* Icon and Text Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 mt-6 lg:mt-10 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaBook className="text-blue-500 text-4xl lg:text-6xl mx-auto mb-4" />
              <p className="text-sm lg:text-lg font-semibold">
                Journals & Conferences
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaTrophy className="text-blue-500 text-4xl lg:text-6xl mx-auto mb-4" />
              <p className="text-sm lg:text-lg font-semibold">
                Awards & Recognitions
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaChalkboardTeacher className="text-blue-500 text-4xl lg:text-6xl mx-auto mb-4" />
              <p className="text-sm lg:text-lg font-semibold">
                Workshops, Seminars & Guest Lectures
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaTools className="text-blue-500 text-4xl lg:text-6xl mx-auto mb-4" />
              <p className="text-sm lg:text-lg font-semibold">
                Projects & Consultancy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
