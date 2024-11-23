import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
const Ftopbar = () => {
  const navigate = useNavigate();
  const [facultyUsername, setFacultyUsername] = useState("");
  const [facultyImage, setFacultyImage] = useState(null);

  useEffect(() => {
    // Fetch the student username and image from localStorage
    const storedUsername = localStorage.getItem("facultyUsername");
    const storedImage = localStorage.getItem("facultyImage");

    if (storedUsername) {
      setFacultyUsername(storedUsername);
    }

    if (storedImage) {
      setFacultyImage(storedImage);
    }
  }, []);
  const handleLogout = () => {
    // Add your logout logic here if needed (e.g., clearing session storage)
    localStorage.removeItem("storedUsername");
    localStorage.removeItem("storedImage");
    localStorage.removeItem("sname"); // Also remove 'name' key4

    localStorage.removeItem("age");
    localStorage.removeItem("email");
    localStorage.removeItem("contact");
    localStorage.removeItem("dob");
    localStorage.removeItem("address");
    localStorage.removeItem("eid");
    localStorage.removeItem("mstatus");
    localStorage.removeItem("desig");
    localStorage.removeItem("dept");
    localStorage.removeItem("gender");

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
            Staff Portal
          </span>
          <span className="text-blue-500 font-bold animate-pulse">---ERP</span>
        </div>
        <div className="flex items-center text-black hover:scale-105 transition duration-300 ease-in-out">
          {facultyImage ? (
            <img
              src={`data:image/png;base64,${facultyImage}`}
              alt="faculty"
              className="w-12 h-12 rounded-full mr-2 border-2 border-red-600 transition-all duration-300 transform hover:scale-110"
            />
          ) : (
            <img
              src="/images/admin.png"
              alt="Default"
              className="w-12 h-12 rounded-full mr-2 border-2 border-red-600 transition-all duration-300 transform hover:scale-110"
            />
          )}

          <span className="text-black font-semibold">
            {facultyUsername || "faculty"}
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

export default Ftopbar;
