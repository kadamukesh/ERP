import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddFaculty = () => {
  const [faculty, setFaculty] = useState({
    EId: "",
    name: "",
    gender: "",
    age: "",
    department: "",
    email: "",
    contact: "",
    dateofbirth: "",
    maritalStatus: "",
    designation: "",
    photo: null,
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setFaculty({ ...faculty, [e.target.name]: e.target.files[0] });
    } else {
      setFaculty({ ...faculty, [e.target.name]: e.target.value });
    }
  };

  const validate = () => {
    let errors = {};

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@(gmail\.com|yahoo\.com|.*\.in)$/;
    if (!emailPattern.test(faculty.email)) {
      errors.email = "Email must end with @gmail.com, .in, or @yahoo.com";
    }

    // Contact validation
    if (!/^\d{10}$/.test(faculty.contact)) {
      errors.contact = "Contact number must be exactly 10 digits";
    }

    // Password validation
    if (faculty.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formData = new FormData();
    // Remove the 'photo' field if it's not needed
    Object.keys(faculty).forEach((key) => {
      formData.append(key, faculty[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/addfaculty", // Ensure the endpoint is correct
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        window.location.href = "/viewfaculty"; // Redirect to view page
      } else if (response.status === 409) {
        toast.error(
          response.data || "ID already exists in Faculty or Student records"
        );
      } else {
        toast.error("Failed to add faculty. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data || "Error adding Faculty.");
      } else {
        toast.error("Network error. Please try again later.");
      }
      console.error("Add Faculty Error:", error);
    }
  };

  const handleClear = () => {
    setFaculty({
      EId: "",
      name: "",
      gender: "",
      age: "",
      department: "",
      email: "",
      contact: "",
      dateofbirth: "",
      maritalStatus: "",
      designation: "",
      photo: null,
      password: "",
      address: "",
    });
    setErrors({});
  };

  return (
    <div className="flex flex-col max-h-screen">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-10 bg-gray-300 overflow-y-auto">
          <form
            className="space-y-6 bg-white p-8 rounded-md shadow-md"
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
              backgroundColor: "#fff",
              border: "1px solid #dcdde1",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              paddingBottom: "2rem",
            }}
          >
            <h1
              className="text-3xl font-bold text-center underline mb-8"
              style={{ color: "#2c3e50" }}
            >
              Add New Faculty
            </h1>
            <div className="grid grid-cols-2 gap-6">
              {/* Employee ID */}
              <div>
                <label className="text-gray-700">Employee ID:</label>
                <input
                  type="text"
                  name="EId"
                  value={faculty.EId}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{ backgroundColor: "#f1f2f6", borderColor: "#bdc3c7" }}
                />
              </div>

              {/* Name */}
              <div>
                <label className="text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={faculty.name}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{ backgroundColor: "#f1f2f6", borderColor: "#bdc3c7" }}
                />
              </div>

              {/* Gender */}
              <div>
                <label className="text-gray-700">Gender:</label>
                <select
                  name="gender"
                  value={faculty.gender}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{ backgroundColor: "#f1f2f6", borderColor: "#bdc3c7" }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Marital Status */}
              <div>
                <label className="text-gray-700">Marital Status</label>
                <select
                  name="maritalStatus"
                  value={faculty.maritalStatus}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{ backgroundColor: "#f1f2f6", borderColor: "#bdc3c7" }}
                >
                  <option value="">Select Marital Status</option>
                  <option value="Married">Married</option>
                  <option value="Unmarried">Unmarried</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Designation */}
              <div>
                <label className="text-gray-700">Designation Type</label>
                <select
                  name="designation"
                  value={faculty.designation}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{ backgroundColor: "#f1f2f6", borderColor: "#bdc3c7" }}
                >
                  <option value="">Select Designation</option>
                  <option value="Assistant Professor">
                    Assistant Professor
                  </option>
                  <option value="Associate Professor">
                    Associate Professor
                  </option>
                  <option value="Head of Department (HOD)">
                    Head of Department (HOD)
                  </option>
                </select>
              </div>

              {/* Age */}
              <div>
                <label className="text-gray-700">Age:</label>
                <input
                  type="number"
                  name="age"
                  value={faculty.age}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{ backgroundColor: "#f1f2f6", borderColor: "#bdc3c7" }}
                />
              </div>

              {/* Department */}
              <div>
                <label className="text-gray-700">Department:</label>
                <input
                  type="text"
                  name="department"
                  value={faculty.department}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{ backgroundColor: "#f1f2f6", borderColor: "#bdc3c7" }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-700">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={faculty.email}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{ backgroundColor: "#f1f2f6", borderColor: "#bdc3c7" }}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>

              {/* Contact */}
              <div>
                <label className="text-gray-700">Contact:</label>
                <input
                  type="tel"
                  name="contact"
                  value={faculty.contact}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{ backgroundColor: "#f1f2f6", borderColor: "#bdc3c7" }}
                />
                {errors.contact && (
                  <span className="text-red-500">{errors.contact}</span>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="text-gray-700">Date of Birth:</label>
                <input
                  type="date"
                  name="dateofbirth"
                  value={faculty.dateofbirth}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{ backgroundColor: "#f1f2f6", borderColor: "#bdc3c7" }}
                />
              </div>

              {/* Address */}
              <div className="col-span-2">
                <label className="text-gray-700">Address:</label>
                <textarea
                  name="address"
                  value={faculty.address}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{ backgroundColor: "#f1f2f6", borderColor: "#bdc3c7" }}
                />
              </div>

              {/* Password */}
              <div className="col-span-2">
                <label className="text-gray-700">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={faculty.password}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{ backgroundColor: "#f1f2f6", borderColor: "#bdc3c7" }}
                />
                {errors.password && (
                  <span className="text-red-500">{errors.password}</span>
                )}
              </div>

              {/* Photo Upload */}
              <div className="col-span-2">
                <label className="text-gray-700">Upload Photo:</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  accept="image/*"
                />
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add Faculty
              </button>
              <button
                onClick={handleClear}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Clear
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default AddFaculty;
