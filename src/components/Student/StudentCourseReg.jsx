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
  const [academicYears, setAcademicYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  useEffect(() => {
    fetchAcademicYearsAndSemesters();
  }, []);

  useEffect(() => {
    if (selectedAcademicYear && selectedSemester) {
      fetchAvailableMappings();
    }
  }, [selectedAcademicYear, selectedSemester]);

  const fetchAcademicYearsAndSemesters = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/academic-years-and-semesters"
      );
      setAcademicYears(response.data.academicYears);
      setSemesters(response.data.semesters);
    } catch (err) {
      setError(
        "Failed to fetch academic years and semesters. Please try again later."
      );
      console.error("Error fetching academic years and semesters:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAvailableMappings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/faculty-course-mappings?academicYear=${selectedAcademicYear}&semester=${selectedSemester}`
      );
      setAvailableMappings(response.data);
    } catch (err) {
      setError("Failed to fetch available courses. Please try again later.");
      console.error("Error fetching available mappings:", err);
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
      console.error("Error registering courses:", err);
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
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="academicYear"
              >
                Academic Year
              </label>
              <select
                id="academicYear"
                value={selectedAcademicYear}
                onChange={(e) => setSelectedAcademicYear(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Academic Year</option>
                {academicYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="semester"
              >
                Semester
              </label>
              <select
                id="semester"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Semester</option>
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </div>
            <fieldset disabled={isLoading}>
              <legend className="block text-gray-700 text-lg font-bold mb-4">
                Available Courses
              </legend>
              {isLoading ? (
                <p className="text-gray-600">Loading courses...</p>
              ) : availableMappings.length === 0 ? (
                <p className="text-gray-600">
                  No courses available for registration.
                </p>
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
                        {mapping.course?.coursetitle || "Unknown Course"} -{" "}
                        {mapping.faculty?.name || "Unknown Faculty"} (Section:{" "}
                        {mapping.section || "N/A"})
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
                disabled={isLoading || availableMappings.length === 0}
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
