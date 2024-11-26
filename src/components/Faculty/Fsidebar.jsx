import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaHandsHelping } from "react-icons/fa";
import { SlNotebook } from "react-icons/sl";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { VscFeedback } from "react-icons/vsc";
import { FaUserGraduate } from "react-icons/fa6";
import { PiExamDuotone } from "react-icons/pi";

import {
  MdAppRegistration,
  MdOutlineFreeCancellation,
  MdSchedule,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Fsidebar = () => {
  const [counsellingDropdown, setCounsellingDropdown] = useState(false);
  const [facultyCoursesDropdown, setFacultyCoursesDropdown] = useState(false);
  const [feedbackDropdown, setFeedbackDropdown] = useState(false);
  const [leaveDropdown, setLeaveDropdown] = useState(false);
  const [timetableDropdown, settimetableDropdown] = useState(false);
  const [studentinfo, setstudentinfodropdown] = useState(false);
  const [exam, setexamdropdown] = useState(false);
  const DoubleArrowIcon = () => {
    return (
      <span style={{ fontSize: "14px", marginRight: "3px" }}>&gt;&gt;</span>
    );
  };

  return (
    <div className="bg-gray-800 h-screen w-64 text-white shadow-md overflow-y-auto sidebar">
      <style>
        {`
          .sidebar {
            max-height: calc(98vh - 100px); /* Adjust this if necessary */
            overflow-y: auto; /* Enable vertical scrolling */
          }
          .sidebar::-webkit-scrollbar {
            width: 8px; /* Width of the scrollbar */
          }
          .sidebar::-webkit-scrollbar-thumb {
            background: #555; /* Color of the scrollbar thumb */
            border-radius: 4px; /* Rounded corners */
          }
          .sidebar::-webkit-scrollbar-track {
            background: #222; /* Background color of the scrollbar track */
          }
        `}
      </style>

      <div className="p-6">
        <h1 className="text-xl font-bold">Faculty Dashboard</h1>
      </div>

      <nav className="px-6">
        <Link
          to="/facultyhome"
          className="flex items-center space-x-2 py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
        >
          <AiFillHome className="text-xl" />
          <span>Home</span>
        </Link>

        <Link
          to="#"
          className="flex items-center space-x-2 py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
        >
          <MdAppRegistration className="text-xl" />
          <span>Attendance Registration</span>
        </Link>

        {/* Counselling Dropdown */}
        <div>
          <button
            onClick={() => setCounsellingDropdown(!counsellingDropdown)}
            className="flex items-center justify-between w-full py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <FaHandsHelping className="text-xl" />
              <span>Counselling</span>
            </div>
            {counsellingDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {counsellingDropdown && (
            <div className="ml-6 transition-transform duration-300 ease-in-out transform translate-y-0">
              <Link
                to="#"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Assigned Students
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
              <span>Courses</span>
            </div>
            {facultyCoursesDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {facultyCoursesDropdown && (
            <div className="ml-6 transition-transform duration-300 ease-in-out transform translate-y-0">
              <Link
                to="/mycourses"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                My Courses
              </Link>
              <Link
                to="#"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                View Course Handouts
              </Link>
              <Link
                to="#"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Courses Offered Info
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
              <span>Feedback</span>
            </div>
            {feedbackDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {feedbackDropdown && (
            <div className="ml-6 transition-transform duration-300 ease-in-out transform translate-y-0">
              <Link
                to="#"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                My Feedback Analysis
              </Link>
            </div>
          )}
        </div>

        {/* Leave Management */}
        <div>
          <button
            onClick={() => setLeaveDropdown(!leaveDropdown)}
            className="flex items-center justify-between w-full py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <MdOutlineFreeCancellation className="text-xl" />
              <span>Leave Management</span>
            </div>
            {leaveDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {leaveDropdown && (
            <div className="ml-6 transition-transform duration-300 ease-in-out transform translate-y-0">
              <Link
                to="/fleave"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Apply Leave
              </Link>
              <Link
                to="/fleavestatus"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Leave Status
              </Link>
            </div>
          )}
        </div>

        {/* Timetable Dropdown */}
        <div>
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
                View Timetable
              </Link>
              <Link
                to="#"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Student Timetable
              </Link>
            </div>
          )}
        </div>

        {/* Student Info Dropdown */}
        <div>
          <button
            onClick={() => setstudentinfodropdown(!studentinfo)}
            className="flex items-center justify-between w-full py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <FaUserGraduate className="text-xl" />
              <span>Student Information</span>
            </div>
            {studentinfo ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {studentinfo && (
            <div className="ml-6 transition-transform duration-300 ease-in-out transform translate-y-0">
              <Link
                to="#"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                End Exam Result
              </Link>
              <Link
                to="#"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Students Profile
              </Link>
              <Link
                to="#"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Students CGPA
              </Link>
              <Link
                to="#"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Students Fee details
              </Link>
              <Link
                to="#"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Students Attendance Register
              </Link>
            </div>
          )}
        </div>

        {/* Exam section */}

        <div>
          <button
            onClick={() => setexamdropdown(!exam)}
            className="flex items-center justify-between w-full py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <PiExamDuotone className="text-xl" />
              <span>Exam Section</span>
            </div>
            {exam ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {exam && (
            <div className="ml-6 transition-transform duration-300 ease-in-out transform translate-y-0">
              <Link
                to="#"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Post Subject Marks
              </Link>
              <Link
                to="#"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Post Internal Marks
              </Link>
            </div>
          )}
        </div>
        <Link
          to="/facultyprofile"
          className="flex items-center space-x-2 py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
        >
          <CgProfile className="text-xl" />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default Fsidebar;
