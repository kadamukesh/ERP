import React, { useState, useEffect } from "react";
import axios from "axios";
import Stopbar from "./Stopbar.jsx";
import Ssidebar from "./Ssidebar.jsx";

const RegCourses = () => {
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRegisteredCourses();
  }, []);

  const fetchRegisteredCourses = async () => {
    const studentUsername = localStorage.getItem("studentUsername");
    console.log(studentUsername);
    if (!studentUsername) {
      setError("Student username not found. Please log in again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://springbootprojecterp.up.railway.app/registered-courses/${studentUsername}`
      );
      setRegisteredCourses(response.data);
    } catch (err) {
      setError("Failed to fetch registered courses. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Stopbar />
      <div className="flex flex-1">
        <Ssidebar />
        <main className="flex-1 p-10 bg-gray-100">
          <h1 className="text-3xl font-bold mb-6">Registered Courses</h1>
          {isLoading ? (
            <p className="text-gray-600">Loading registered courses...</p>
          ) : error ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              {registeredCourses.length === 0 ? (
                <p className="text-gray-600">
                  You haven't registered for any courses yet.
                </p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {registeredCourses.map((course) => (
                    <li key={course.mappingid} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            CourseTitle:{course.course.coursetitle}
                          </p>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            Credits:{course.course.credits}
                          </p>
                          <p className="text-sm text-gray-500">
                            Instructor: {course.faculty.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Section: {course.section}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RegCourses;
