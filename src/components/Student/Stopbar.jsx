import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
const Stopbar = () => {
  const navigate = useNavigate();
  const [studentUsername, setStudentUsername] = useState("");
  const [studentImage, setStudentImage] = useState(null);

  useEffect(() => {
    // Fetch the student username and image from localStorage
    const storedUsername = localStorage.getItem("studentUsername");
    const storedImage = localStorage.getItem("studentImage");

    if (storedUsername) {
      setStudentUsername(storedUsername);
    }

    if (storedImage) {
      setStudentImage(storedImage);
    }
  }, []);

  const handleLogout = () => {
    // Remove username and image from localStorage and navigate to login page
    localStorage.removeItem("storedUsername");
    localStorage.removeItem("storedImage");
    localStorage.removeItem("name"); // Also remove 'name' key
    localStorage.removeItem("storedGender");
    localStorage.removeItem("storedAge");
    localStorage.removeItem("storedDept");
    localStorage.removeItem("storedEmail");
    localStorage.removeItem("storedContact");
    localStorage.removeItem("storedDob");
    localStorage.removeItem("storedAtype");
    localStorage.removeItem("storedUid");

    navigate("/login");
  };

  return (
    <div className="w-full">
      {/* First Bar */}
      <div className="bg-gray-200 py-2 flex justify-between items-center px-4 shadow-md transition-all duration-500 ease-in-out hover:shadow-lg">
        <div className="flex items-center space-x-2 animate-fadeIn">
          <img
            src="/images/logo1.png"
            alt="Logo"
            className="w-10 h-10 transform hover:rotate-12 transition duration-300"
          />
          <span
            className="text-xl text-red-700 font-semibold"
            style={{
              alignItems: "center",
              textAlign: "center",
              marginLeft: "80vh",
            }}
          >
            Student Portal
          </span>
          <span className="text-blue-500 font-bold animate-pulse">---ERP</span>
        </div>
        <div className="flex items-center text-black hover:scale-105 transition duration-300 ease-in-out">
          {studentImage ? (
            <img
              src={`data:image/png;base64,${studentImage}`}
              alt="Student"
              className="w-10 h-11 rounded-full mr-2 border-2 border-red-600 transition-all duration-300 transform hover:scale-110"
            />
          ) : (
            <img
              src="/images/admin.png"
              alt="Default"
              className="w-15 h-11 rounded-full mr-2 border-2 border-red-600 transition-all duration-300 transform hover:scale-110"
            />
          )}
          <span className="text-black font-semibold">
            {studentUsername || "Student"}
          </span>
        </div>
      </div>

      {/* Second Bar */}
      <div className="bg-red-600 py-3 flex justify-between items-center px-4 shadow-lg transition-all duration-300 ease-in-out hover:bg-red-700">
        <div className="flex items-center">
          <div className="px-3 py-1 text-white font-bold tracking-wider animate-slideInLeft">
            KLU ERP
          </div>
        </div>
        <div
          className="flex items-center space-x-2 cursor-pointer hover:text-rose-500 p-2 rounded transition duration-200 ease-in-out"
          onClick={handleLogout}
        >
          <IoMdLogOut className="text-black text-2xl" />
          <span className="text-black font-semibold">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Stopbar;
