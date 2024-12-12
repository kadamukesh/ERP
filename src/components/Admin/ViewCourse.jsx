import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://springbootprojecterp.up.railway.app/viewcourse"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.coursecode.toLowerCase().includes(search.toLowerCase()) ||
      course.coursetitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-10 bg-gray-100">
          <h1 className="text-3xl font-bold text-center mb-8">View Courses</h1>

          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-3xl">
              <input
                type="text"
                placeholder="Search by Course Code or Title"
                value={search}
                onChange={handleSearchChange}
                className="w-full p-4 pl-10 border border-gray-300 rounded-full shadow-sm focus:ring focus:border-blue-300 text-gray-700"
              />
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Course Table */}
          <div className="overflow-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-6 py-3 text-left font-semibold">
                    Course Code
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Course Title
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">L-T-P-S</th>
                  <th className="px-6 py-3 text-left font-semibold">Credits</th>
                  <th className="px-6 py-3 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course, index) => (
                    <tr
                      key={course.coursecode}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-blue-100 transition-colors duration-200`}
                    >
                      <td className="px-6 py-4 border-b text-gray-700">
                        {course.coursecode}
                      </td>
                      <td className="px-6 py-4 border-b text-gray-700">
                        {course.coursetitle}
                      </td>
                      <td className="px-6 py-4 border-b text-gray-700">
                        {course.ltps}
                      </td>
                      <td className="px-6 py-4 border-b text-gray-700">
                        {course.credits}
                      </td>
                      <td className="px-6 py-4 border-b text-center">
                        <button className="text-blue-500 hover:text-blue-700 mx-2">
                          <FaEdit />
                        </button>
                        <button className="text-red-500 hover:text-red-700 mx-2">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 py-4">
                      No courses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
