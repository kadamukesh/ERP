import React, { useState, useEffect } from "react";
import axios from "axios";
import Ssidebar from "./Ssidebar";
import Stopbar from "./Stopbar";

const ViewCourseContent = () => {
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courseContents, setCourseContents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState("");

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
        `http://localhost:8080/registered-courses/${studentUsername}`
      );
      setRegisteredCourses(response.data);
    } catch (err) {
      setError("Failed to fetch registered courses. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewMaterials = async (fcmId, courseName) => {
    setSelectedCourseName(courseName);
    setIsModalOpen(true);
    setModalLoading(true);
    setCourseContents([]);
    setModalError("");

    try {
      const response = await axios.get(
        `http://localhost:8080/viewCourseContentBySection?fcmId=${fcmId}`
      );
      setCourseContents(response.data);
    } catch (err) {
      console.error("Error fetching course contents:", err);
      setModalError("Failed to fetch course contents.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourseName("");
    setCourseContents([]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Stopbar />
      <div className="flex flex-1">
        <Ssidebar />
        <div className="flex-1 p-10 bg-gray-100">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            View Course Material
          </h1>
          {isLoading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : registeredCourses.length === 0 ? (
            <p className="text-center text-red-600">
              No Registered Courses Found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="py-2 px-4 border">#</th>
                    <th className="py-2 px-4 border">Course Name</th>
                    <th className="py-2 px-4 border">Course Code</th>
                    <th className="py-2 px-4 border">Section</th>
                    <th className="py-2 px-4 border">Faculty Name</th>
                    <th className="py-2 px-4 border">Material</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredCourses.map((mapping, index) => (
                    <tr
                      key={mapping.id}
                      className="hover:bg-gray-100 transition"
                    >
                      <td className="py-2 px-4 border text-center">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 border">
                        {mapping.course.coursetitle}
                      </td>
                      <td className="py-2 px-4 border">
                        {mapping.course.coursecode}
                      </td>
                      <td className="py-2 px-4 border">{mapping.section}</td>
                      <td className="py-2 px-4 border">
                        {mapping.faculty.name}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        <button
                          onClick={() =>
                            handleViewMaterials(
                              mapping.mappingid,

                              mapping.course.coursetitle
                            )
                          }
                          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                        >
                          View Material
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Course Materials */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-4xl">
            {/* Modal Header */}
            <div className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center rounded-t-lg">
              <h2 className="text-xl font-bold">
                Materials for {selectedCourseName}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-gray-200 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {modalLoading ? (
                <p className="text-center text-gray-600">
                  Loading materials...
                </p>
              ) : modalError ? (
                <p className="text-center text-red-600">{modalError}</p>
              ) : courseContents.length === 0 ? (
                <p className="text-center text-gray-600">
                  No materials available.
                </p>
              ) : (
                <ul className="space-y-4">
                  {courseContents.map((content, index) => (
                    <li key={index} className="border-b pb-2">
                      <a
                        href={content.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {content.title || `Material ${index + 1}`}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCourseContent;
