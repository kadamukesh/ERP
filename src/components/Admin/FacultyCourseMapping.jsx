import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import axios from "axios";

const FacultyCourseMapping = () => {
  const [faculties, setFaculties] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    fid: "",
    cid: "",
    section: "",
    ftype: "",
    academicYear: "",
    semester: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch faculties data
    axios
      .get("http://localhost:8080/viewfaculty")
      .then((response) => setFaculties(response.data))
      .catch((error) =>
        setError("Error fetching faculties. Please try again later.")
      );

    // Fetch courses data
    axios
      .get("http://localhost:8080/viewcourse")
      .then((response) => setCourses(response.data))
      .catch((error) =>
        setError("Error fetching courses. Please try again later.")
      );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    axios
      .post("http://localhost:8080/fcoursemapping", formData)
      .then((response) => {
        setMessage(response.data.message);
        setFormData({
          fid: "",
          cid: "",
          section: "",
          ftype: "",
          academicYear: "",
          semester: "",
        }); // Clear form
      })
      .catch((error) => {
        setError(
          error.response?.data?.message ||
            "An error occurred during form submission."
        );
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-10 bg-gray-100">
          <h1 className="text-3xl font-bold text-center mb-6">
            Faculty Course Mapping
          </h1>

          {/* Display success or error message */}
          {message && (
            <p className="text-center text-green-500 font-semibold mb-4">
              {message}
            </p>
          )}
          {error && (
            <p className="text-center text-red-500 font-semibold mb-4">
              {error}
            </p>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block font-semibold mb-2">
                  Select Faculty
                </label>
                <select
                  name="fid"
                  value={formData.fid}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">--Select--</option>
                  {faculties.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.id} - {faculty.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Select Course
                </label>
                <select
                  name="cid"
                  value={formData.cid}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">--Select--</option>
                  {courses.map((course) => (
                    <option key={course.courseid} value={course.courseid}>
                      {course.coursecode} - {course.coursetitle}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Provide Section
                </label>
                <input
                  type="number"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  min="1"
                  max="30"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Select Faculty Type
                </label>
                <select
                  name="ftype"
                  value={formData.ftype}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">--Select--</option>
                  <option value="MAIN">Main Faculty</option>
                  <option value="ASSISTANCE">Assistance Faculty</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Academic Year
                </label>
                <select
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">--Select--</option>
                  <option value="2023-2024">2023-2024</option>
                  <option value="2024-2025">2024-2025</option>
                  <option value="2025-2026">2025-2026</option>
                  <option value="2026-2027">2026-2027</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">Semester</label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">--Select--</option>
                  <option value="Odd">Odd</option>
                  <option value="Even">Even</option>
                  <option value="Summer">Summer</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-colors duration-200"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    fid: "",
                    cid: "",
                    section: "",
                    ftype: "",
                    academicYear: "",
                    semester: "",
                  })
                }
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-colors duration-200"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FacultyCourseMapping;
