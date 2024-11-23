import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

const UpdateStudent = () => {
  const [student, setStudent] = useState({
    uid: "", // Added uid field
    name: "",
    contact: "",
    department: "",
    email: "",
    admissionType: "",
  });

  const [message, setMessage] = useState("");

  // Function to handle form input changes
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the updated student data to the backend using axios.put
    axios
      .put(`http://localhost:8080/updatestudent`, student)
      .then((response) => {
        setMessage("Student updated successfully!"); // Set success message

        // Redirect to /viewstudent after a short delay (1 second)
      })
      .catch((error) => {
        console.error("There was an error updating the student!", error);
        // Set error message
        setTimeout(() => {
          window.location.href = "/viewstudent"; // Redirect using window.location.href
        }, 1000);
      });
  };

  // Clear form
  const handleClear = () => {
    setStudent({
      uid: "", // Clear uid field
      name: "",
      contact: "",
      department: "",
      email: "",
      admissionType: "",
    });
  };

  // You can fetch the student's existing data by ID here using useEffect if necessary.
  useEffect(() => {
    const studentId = "1"; // Example student ID, you may get this from props or route params
    axios
      .get(`http://localhost:8080/viewstudent/${studentId}`)
      .then((response) => {
        setStudent(response.data); // Pre-fill form with existing student data
      })
      .catch((error) => {
        console.error("There was an error fetching the student data!", error);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <Topbar />

      {/* Sidebar and Content Section */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-10 bg-gray-100">
          <h1
            className="text-3xl font-bold text-center underline" // Added underline class
            style={{ marginBottom: "20px" }}
          >
            Update Student
          </h1>

          {/* Display update message */}
          {message && <p className="text-center text-green-500">{message}</p>}

          {/* Form to update student */}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700">UID:</label>
              <input
                type="text"
                name="uid"
                value={student.uid}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Contact:</label>
              <input
                type="text"
                name="contact"
                value={student.contact}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Department:</label>
              <input
                type="text"
                name="department"
                value={student.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Admission Type:</label>
              <input
                type="text"
                name="admissionType"
                value={student.admissionType}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Update Student
              </button>

              <button
                type="button" // Set button type as "button" for the clear action
                onClick={handleClear} // Call clear function on click
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
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

export default UpdateStudent;
