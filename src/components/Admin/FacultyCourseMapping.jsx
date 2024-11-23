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
        setFormData({ fid: "", cid: "", section: "", ftype: "" }); // Clear form
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
            <p className="text-center text-green-500 font-semibold">
              {message}
            </p>
          )}
          {error && (
            <p className="text-center text-red-500 font-semibold">{error}</p>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white p-6 rounded shadow-md"
          >
            <div className="mb-4">
              <label className="block font-semibold mb-2">Select Faculty</label>
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

            <div className="mb-4">
              <label className="block font-semibold mb-2">Select Course</label>
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

            <div className="mb-4">
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

            <div className="mb-4">
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

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({ fid: "", cid: "", section: "", ftype: "" })
                }
                className="bg-gray-400 text-white px-4 py-2 rounded"
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
