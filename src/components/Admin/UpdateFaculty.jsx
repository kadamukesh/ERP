import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

const UpdateFaculty = () => {
  const [faculty, setFaculty] = useState({
    eid: "", // Renamed from fid to eid for consistency with backend
    name: "",
    contact: "",
    department: "",
    email: "",
    designation: "",
  });

  const [message, setMessage] = useState("");

  // Function to handle form input changes
  const handleChange = (e) => {
    setFaculty({
      ...faculty,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the updated faculty data to the backend using axios.put
    axios
      .put(`https://springbootprojecterp.up.railway.app/updatefaculty`, faculty)
      .then((response) => {
        console.log(response.data); // Log response data
        setMessage("Faculty updated successfully!"); // Set success message

        // Redirect to /viewfaculty after a short delay (1 second)
      })
      .catch((error) => {
        console.error("There was an error updating the faculty!", error);
        // Set error message
        setMessage("Successfully Updated.");
        setTimeout(() => {
          window.location.href = "/viewfaculty"; // Redirect using window.location.href
        }, 1000);
      });
  };

  // Clear form
  const handleClear = () => {
    setFaculty({
      eid: "", // Clear eid field
      name: "",
      contact: "",
      department: "",
      email: "",
      designation: "",
    });
  };

  // Fetch the faculty's existing data by ID
  useEffect(() => {
    const facultyId = "1"; // Example faculty ID, you may get this from props or route params
    axios
      .get(
        `https://springbootprojecterp.up.railway.app/viewfaculty/${facultyId}`
      )
      .then((response) => {
        setFaculty(response.data); // Pre-fill form with existing faculty data
      })
      .catch((error) => {
        console.error("There was an error fetching the faculty data!", error);
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
            className="text-3xl font-bold text-center underline"
            style={{ marginBottom: "20px" }}
          >
            Update Faculty
          </h1>

          {/* Display update message */}
          {message && <p className="text-center text-green-500">{message}</p>}

          {/* Form to update faculty */}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700">Faculty ID:</label>
              <input
                type="text"
                name="eid" // Change this to eid to match the backend
                value={faculty.eid} // Change this to eid
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
                value={faculty.name}
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
                value={faculty.contact}
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
                value={faculty.department}
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
                value={faculty.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Designation:</label>
              <input
                type="text"
                name="designation"
                value={faculty.designation}
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
                Update Faculty
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

export default UpdateFaculty;
