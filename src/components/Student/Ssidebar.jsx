import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import axios from "axios"; // Ensure axios is imported
import { SlNotebook } from "react-icons/sl";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { VscFeedback } from "react-icons/vsc";
import { FaUserGraduate } from "react-icons/fa6";
import { PiExamDuotone } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";

import {
  MdAppRegistration,
  MdOutlineFreeCancellation,
  MdSchedule,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Ssidebar = () => {
  // This should print the actual ID if it's defined.

  const [students, setStudents] = useState([]);
  const [counsellingDropdown, setCounsellingDropdown] = useState(false);
  const [facultyCoursesDropdown, setFacultyCoursesDropdown] = useState(false);
  const [feedbackDropdown, setFeedbackDropdown] = useState(false);
  const [leaveDropdown, setLeaveDropdown] = useState(false);
  const [timetableDropdown, settimetableDropdown] = useState(false);
  const [studentinfo, setstudentinfodropdown] = useState(false);
  const [fee, setfeedropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/viewstudent")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the students!", error);
      });
  }, []);

  useEffect(() => {
    if (
      location.pathname.includes("/scoursereg") ||
      location.pathname.includes("/regcourses")
    ) {
      setCounsellingDropdown(true);
    } else {
      setCounsellingDropdown(false);
    }
    if (
      location.pathname.includes("/payfee") ||
      location.pathname.includes("/viewallpayments")
    ) {
      setfeedropdown(true);
    } else {
      setfeedropdown(false);
    }

    if (
      location.pathname.includes("/sleave") ||
      location.pathname.includes("/sleavestatus")
    ) {
      setstudentinfodropdown(true);
    } else {
      setstudentinfodropdown(false);
    }

    if (location.pathname.includes("/feedback")) {
      setFeedbackDropdown(true);
    } else {
      setFeedbackDropdown(false);
    }
  }, [location.pathname]);

  const DoubleArrowIcon = () => {
    return (
      <span style={{ fontSize: "14px", marginRight: "3px" }}>&gt;&gt;</span>
    );
  };

  return (
    <div
      className={`bg-gray-800 h-screen text-white shadow-md transition-all duration-300 ${
        isSidebarOpen ? "w-66" : "w-20"
      }`}
    >
      <div className="p-6 flex justify-between items-center">
        <Link to="/studenthome">
          <h1 className={`text-2xl font-bold ${isSidebarOpen ? "" : "hidden"}`}>
            Student Dashboard
          </h1>
        </Link>
        <button
          onClick={toggleSidebar}
          className="text-white p-2 focus:outline-none"
        >
          <span className="text-2xl">{isSidebarOpen ? "☰" : "❯"}</span>
        </button>
      </div>

      <nav className="px-6">
        <Link
          to="/Studenthome"
          className="flex items-center space-x-2 py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
        >
          <AiFillHome className="text-xl" />
          <span className={`${isSidebarOpen ? "" : "hidden"}`}>Home</span>
        </Link>

        {/* <Link
          to="#"
          className="flex items-center space-x-2 py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
        >
          <MdAppRegistration className="text-xl" />
          <span>Attendance Register</span>
        </Link> */}

        {/* Counselling Dropdown */}
        <div>
          <button
            onClick={() => setCounsellingDropdown(!counsellingDropdown)}
            className="flex items-center justify-between w-full py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <FaRegEdit className="text-xl" />
              <span className={`${isSidebarOpen ? "" : "hidden"}`}>
                Registration
              </span>
            </div>
            {counsellingDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {counsellingDropdown && (
            <div className="ml-6 transition-transform duration-300 ease-in-out transform translate-y-0">
              <Link
                to="/scoursereg"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Course Registration
              </Link>

              <Link
                to="/regcourses"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                View My courses
              </Link>
            </div>
          )}
        </div>

        {/* Courses Dropdown */}
        <div>
          <button
            onClick={() => setFacultyCoursesDropdown(!facultyCoursesDropdown)}
            className="flex items-center justify-between w-full py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <SlNotebook className="text-xl" />
              <span className={`${isSidebarOpen ? "" : "hidden"}`}>
                Courses
              </span>
            </div>
            {facultyCoursesDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {facultyCoursesDropdown && (
            <div className="ml-6 transition-transform duration-300 ease-in-out transform translate-y-0">
              <Link
                to="/viewCourseContent"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                View Course Content
              </Link>
            </div>
          )}
        </div>

        {/* Feedback Dropdown */}
        <div>
          <button
            onClick={() => setFeedbackDropdown(!feedbackDropdown)}
            className="flex items-center justify-between w-full py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <VscFeedback className="text-xl" />
              <span className={`${isSidebarOpen ? "" : "hidden"}`}>
                Feedback
              </span>
            </div>
            {feedbackDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {feedbackDropdown && (
            <div className="ml-6 transition-transform duration-300 ease-in-out transform translate-y-0">
              <Link
                to="/feedback"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Submit Feedback
              </Link>
            </div>
          )}
        </div>

        {/* Leave Management */}
        <div>
          <button
            onClick={() => setfeedropdown(!fee)}
            className="flex items-center justify-between w-full py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <MdOutlineFreeCancellation className="text-xl" />
              <span className={`${isSidebarOpen ? "" : "hidden"}`}>
                Fee Payments
              </span>
            </div>
            {fee ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {fee && (
            <div className="ml-6 transition-transform duration-300 ease-in-out transform translate-y-0">
              <Link
                to="/payfee"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Pay - Fee
              </Link>
              <Link
                to="/viewallpayments"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                View Payments
              </Link>
            </div>
          )}
        </div>

        {/* Timetable Dropdown */}
        {/* <div>
          <button
            onClick={() => settimetableDropdown(!timetableDropdown)}
            className="flex items-center justify-between w-full py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <MdSchedule className="text-xl" />
              <span>Time Tables</span>
            </div>
            {timetableDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {timetableDropdown && (
            <div className="ml-6 transition-transform duration-300 ease-in-out transform translate-y-0">
              <Link
                to="#"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                My Timetable
              </Link>
            </div>
          )}
        </div> */}

        {/* Student Info Dropdown */}
        <div>
          <button
            onClick={() => setstudentinfodropdown(!studentinfo)}
            className="flex items-center justify-between w-full py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <FaUserGraduate className="text-xl" />
              <span className={`${isSidebarOpen ? "" : "hidden"}`}>
                Hostel Management
              </span>
            </div>
            {studentinfo ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {studentinfo && (
            <div className="ml-6 transition-transform duration-300 ease-in-out transform translate-y-0">
              {/* <Link
                to="#"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Room Registration
              </Link>

              <Link
                to="#"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                My Hostel Room Info
              </Link> */}

              <Link
                to="/sleave"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Apply Out Pass
              </Link>

              <Link
                to="/sleavestatus"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Out Pass Status
              </Link>
            </div>
          )}
        </div>

        {/* Exam section */}

        <Link
          to="/mycounselling"
          className="flex items-center space-x-2 py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
        >
          <FaUserTie className="text-xl" />
          <span className={`${isSidebarOpen ? "" : "hidden"}`}>
            My Councellor
          </span>
        </Link>

        <Link
          to="/studentProfile"
          className="flex items-center space-x-2 py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
        >
          <CgProfile className="text-xl" />
          <span className={`${isSidebarOpen ? "" : "hidden"}`}>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default Ssidebar;
