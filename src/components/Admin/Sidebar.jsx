import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineUser, AiOutlineBook } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineFreeCancellation } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import { MdSupportAgent } from "react-icons/md";

const Sidebar = () => {
  const [studentDropdown, setStudentDropdown] = useState(false);
  const [facultyDropdown, setFacultyDropdown] = useState(false);
  const [courseDropdown, setCourseDropdown] = useState(false);
  const [feedbackDropdown, setFeedbackDropdown] = useState(false);
  const [leaveDropdown, setLeaveDropdown] = useState(false);

  const [counsellingdropdown, setCounsellingDropdown] = useState(false);
  const location = useLocation();
  const DoubleArrowIcon = () => {
    return (
      <span style={{ fontSize: "14px", marginRight: "3px" }}>&gt;&gt;</span>
    );
  };

  useEffect(() => {
    if (
      location.pathname.includes("/addstudent") ||
      location.pathname.includes("/viewstudent") ||
      location.pathname.includes("/updatestudent")
    ) {
      setStudentDropdown(true);
    } else {
      setStudentDropdown(false);
    }

    if (
      location.pathname.includes("/addfaculty") ||
      location.pathname.includes("/viewfaculty") ||
      location.pathname.includes("/updatefaculty")
    ) {
      setFacultyDropdown(true);
    } else {
      setFacultyDropdown(false);
    }

    if (
      location.pathname.includes("/addcourse") ||
      location.pathname.includes("/viewcourse") ||
      location.pathname.includes("/updatecourse") ||
      location.pathname.includes("/facultycoursemapping")
    ) {
      setCourseDropdown(true);
    } else {
      setCourseDropdown(false);
    }
  }, [location.pathname]);

  return (
    <div className="bg-gray-800 h-screen w-66 text-white shadow-md">
      <div className="p-6">
        <Link to="/adminhome">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </Link>
      </div>

      <nav className="px-6">
        <Link
          to="/adminhome"
          className="flex items-center space-x-2 py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
        >
          <AiFillHome className="text-xl" />
          <span>Home</span>
        </Link>

        {/* Student Dropdown */}
        <div>
          <button
            onClick={() => setStudentDropdown(!studentDropdown)}
            className="flex items-center justify-between w-full py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <AiOutlineUser className="text-xl" />
              <span>Student</span>
            </div>
            {studentDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {studentDropdown && (
            <div className="ml-6 transition-transform duration-300 ease-in-out transform translate-y-0">
              <Link
                to="/addstudent"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Add Student
              </Link>
              <Link
                to="/viewstudent"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                View Students
              </Link>
              <Link
                to="/updatestudent"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Update Student
              </Link>
            </div>
          )}
        </div>

        {/* Faculty Dropdown */}
        <div>
          <button
            onClick={() => setFacultyDropdown(!facultyDropdown)}
            className="flex items-center justify-between w-full py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <FaChalkboardTeacher className="text-xl" />
              <span>Faculty</span>
            </div>
            {facultyDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {facultyDropdown && (
            <div className="ml-6 transition-transform duration-300 ease-in-out transform translate-y-0">
              <Link
                to="/addfaculty"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Add Faculty
              </Link>
              <Link
                to="/viewfaculty"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                View Faculty
              </Link>
              <Link
                to="/updatefaculty"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Update Faculty
              </Link>
            </div>
          )}
        </div>

        {/* Courses Dropdown */}
        <div>
          <button
            onClick={() => setCourseDropdown(!courseDropdown)}
            className="flex items-center justify-between w-full py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <AiOutlineBook className="text-xl" />
              <span>Courses</span>
            </div>
            {courseDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {courseDropdown && (
            <div className="ml-6 transition-transform duration-300 ease-in-out transform translate-y-0">
              <Link
                to="/addcourse"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Add Course
              </Link>
              <Link
                to="/viewcourse"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                View Courses
              </Link>

              <Link
                to="/facultycoursemapping"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Faculty Course Mapping
              </Link>
              <Link
                to="/updatecourse"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Update Course
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
                View feedback
              </Link>
            </div>
          )}
        </div>

        {/* Counselling Dropdown */}
        <div>
          <button
            onClick={() => setCounsellingDropdown(!counsellingdropdown)}
            className="flex items-center justify-between w-full py-2 hover:bg-gray-700 rounded-md transition duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <MdSupportAgent className="text-xl" />
              <span>Counselling</span>
            </div>
            {counsellingdropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {counsellingdropdown && (
            <div className="ml-6 transition-transform duration-300 ease-in-out transform translate-y-0">
              <Link
                to="/mappingcounselling"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Map Counselling
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
                to="/adminleave"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Leave Request of Faculty
              </Link>
              <Link
                to="/sadminleave"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                <DoubleArrowIcon />
                Leave Request of Student
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
