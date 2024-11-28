import React, { useState, useEffect } from "react";
import axios from "axios";
import Stopbar from "./Stopbar.jsx";
import Ssidebar from "./Ssidebar.jsx";

const StudentCourseReg = () => {
  const [availableMappings, setAvailableMappings] = useState([]);
  const [selectedMappings, setSelectedMappings] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAvailableMappings();
  }, []);

  const fetchAvailableMappings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/faculty-course-mappings"
      );
      setAvailableMappings(response.data);
    } catch (err) {
      setError("Failed to fetch available courses. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMappingSelection = (mappingId) => {
    setSelectedMappings((prev) => {
      if (prev.includes(mappingId)) {
        return prev.filter((id) => id !== mappingId);
      } else {
        return [...prev, mappingId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (selectedMappings.length === 0) {
      setError("Please select at least one course to register");
      return;
    }

    const studentUsername = localStorage.getItem("studentUsername");
    if (!studentUsername) {
      setError("Student username not found. Please log in again.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/register-courses",
        {
          studentUsername: studentUsername,
          mappingIds: selectedMappings,
        }
      );
      setMessage("Successfully registered for the selected courses!");
      setSelectedMappings([]);
      fetchAvailableMappings(); // Refresh the available courses
    } catch (err) {
      setError(
        err.response?.data ||
          "An error occurred during registration. Please try again."
      );
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
          <h1 className="text-3xl font-bold mb-6">Course Registration</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <fieldset disabled={isLoading}>
              <legend className="block text-gray-700 text-lg font-bold mb-4">
                Available Courses
              </legend>
              {isLoading ? (
                <p className="text-gray-600">Loading courses...</p>
              ) : (
                <div className="max-h-60 overflow-y-auto">
                  {availableMappings.map((mapping) => (
                    <div
                      key={mapping.mappingid}
                      className="flex items-center mb-2"
                    >
                      <input
                        type="checkbox"
                        id={`mapping-${mapping.mappingid}`}
                        checked={selectedMappings.includes(mapping.mappingid)}
                        onChange={() =>
                          handleMappingSelection(mapping.mappingid)
                        }
                        className="mr-2"
                      />
                      <label
                        htmlFor={`mapping-${mapping.mappingid}`}
                        className="text-sm text-gray-700"
                      >
                        {mapping.course.coursetitle} - {mapping.faculty.name}{" "}
                        (Section: {mapping.section})
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </fieldset>
            <div className="mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register for Selected Courses"}
              </button>
            </div>
          </form>
          {message && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{message}</span>
            </div>
          )}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentCourseReg;