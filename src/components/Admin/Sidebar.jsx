import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineUser, AiOutlineBook } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { VscFeedback } from "react-icons/vsc";

const Sidebar = () => {
  const [studentDropdown, setStudentDropdown] = useState(false);
  const [facultyDropdown, setFacultyDropdown] = useState(false);
  const [courseDropdown, setCourseDropdown] = useState(false);
  const [feedbackDropdown, setFeedbackDropdown] = useState(false);
  const location = useLocation();

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
                Add Student
              </Link>
              <Link
                to="/viewstudent"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                View Students
              </Link>
              <Link
                to="/updatestudent"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
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
                Add Faculty
              </Link>
              <Link
                to="/viewfaculty"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                View Faculty
              </Link>
              <Link
                to="/updatefaculty"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
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
                Add Course
              </Link>
              <Link
                to="/viewcourse"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                View Courses
              </Link>

              <Link
                to="/facultycoursemapping"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
                Faculty Course Mapping
              </Link>
              <Link
                to="/updatecourse"
                className="block py-2 hover:bg-gray-600 hover:text-white rounded-md transition duration-300"
              >
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
                View feedback
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
