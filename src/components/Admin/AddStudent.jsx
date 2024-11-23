import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStudent = () => {
  const [student, setStudent] = useState({
    uid: "",
    name: "",
    gender: "",
    age: "",
    department: "",
    email: "",
    contact: "",
    dateofbirth: "",

    admissionType: "",

    photo: null, // added field for photo
    password: "", // added field for password
    address: "", // added field for address
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setStudent({ ...student, [e.target.name]: e.target.files[0] });
    } else {
      setStudent({ ...student, [e.target.name]: e.target.value });
    }
  };

  const validate = () => {
    let errors = {};

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@(gmail\.com|yahoo\.com|.*\.in)$/;
    if (!emailPattern.test(student.email)) {
      errors.email = "Email must end with @gmail.com, .in, or @yahoo.com";
    }

    // Contact validation
    if (!/^\d{10}$/.test(student.contact)) {
      errors.contact = "Contact number must be exactly 10 digits";
    }

    // Password validation
    if (student.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formData = new FormData();
    formData.append(
      "student",
      new Blob([JSON.stringify(student)], { type: "application/json" })
    );
    formData.append("photo", student.photo);

    try {
      const response = await axios.post(
        "http://localhost:8080/addstudent",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        window.location.href = "/viewstudent";
      } else if (response.status === 409) {
        toast.error(
          response.data || "ID already exists in Student or Faculty records"
        );
      } else {
        toast.error("Failed to add student. Please try again.");
      }
    } catch (error) {
      console.error("Add Student Error:", error);
      toast.error(error.response?.data || "Error adding student.");
    }
  };

  const handleClear = () => {
    setStudent({
      uid: "",
      name: "",
      gender: "",
      age: "",
      department: "",
      email: "",
      contact: "",
      dateofbirth: "",

      admissionType: "",

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
              maxHeight: "80vh", // Set a maximum height for scrolling
              overflowY: "auto", // Enable vertical scrolling
              backgroundColor: "#fff",
              border: "1px solid #dcdde1",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              paddingBottom: "2rem", // Adjust bottom padding
            }}
          >
            <h1
              className="text-3xl font-bold text-center underline mb-8"
              style={{ color: "#2c3e50" }}
            >
              Add New Student
            </h1>
            <div className="grid grid-cols-2 gap-6">
              {/* Student ID */}
              <div>
                <label className="text-gray-700">Student ID:</label>
                <input
                  type="text"
                  name="uid"
                  value={student.uid}
                  onChange={handleChange}
                  required
                  pattern="\d{10}"
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  title="Student ID must be exactly 10 digits."
                  style={{
                    backgroundColor: "#f1f2f6",
                    borderColor: "#bdc3c7",
                  }}
                />
              </div>

              {/* Name */}
              <div>
                <label className="text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={student.name}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{
                    backgroundColor: "#f1f2f6",
                    borderColor: "#bdc3c7",
                  }}
                />
              </div>

              {/* Gender */}
              <div>
                <label className="text-gray-700">Gender:</label>
                <select
                  name="gender"
                  value={student.gender}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{
                    backgroundColor: "#f1f2f6",
                    borderColor: "#bdc3c7",
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Age */}
              <div>
                <label className="text-gray-700">Age:</label>
                <input
                  type="number"
                  name="age"
                  value={student.age}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{
                    backgroundColor: "#f1f2f6",
                    borderColor: "#bdc3c7",
                  }}
                />
              </div>

              {/* Department */}
              <div>
                <label className="text-gray-700">Department:</label>
                <input
                  type="text"
                  name="department"
                  value={student.department}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{
                    backgroundColor: "#f1f2f6",
                    borderColor: "#bdc3c7",
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-700">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={student.email}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{
                    backgroundColor: "#f1f2f6",
                    borderColor: "#bdc3c7",
                  }}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>

              {/* Contact */}
              <div>
                <label className="text-gray-700">Contact:</label>
                <input
                  type="text"
                  name="contact"
                  value={student.contact}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{
                    backgroundColor: "#f1f2f6",
                    borderColor: "#bdc3c7",
                  }}
                />
                {errors.contact && (
                  <span className="text-red-500">{errors.contact}</span>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-gray-700">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={student.password}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{
                    backgroundColor: "#f1f2f6",
                    borderColor: "#bdc3c7",
                  }}
                />
                {errors.password && (
                  <span className="text-red-500">{errors.password}</span>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="text-gray-700">Address:</label>
                <textarea
                  type="text"
                  name="address"
                  value={student.address}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{
                    backgroundColor: "#f1f2f6",
                    borderColor: "#bdc3c7",
                  }}
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="text-gray-700">Date of Birth:</label>
                <input
                  type="date"
                  name="dateofbirth"
                  value={student.dateofbirth}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{
                    backgroundColor: "#f1f2f6",
                    borderColor: "#bdc3c7",
                  }}
                />
              </div>

              {/* Admission Type */}
              <div>
                <label className="text-gray-700">Admission Type:</label>
                <select
                  name="admissionType"
                  value={student.admissionType}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{
                    backgroundColor: "#f1f2f6",
                    borderColor: "#bdc3c7",
                  }}
                >
                  <option value="">Select Admission Type</option>
                  <option value="Regular">Regular</option>
                  <option value="Lateral Entry">Lateral Entry</option>
                  <option value="NRI Admission">Foreign/NRI Admission</option>
                </select>
              </div>

              {/* Upload Photo */}
              <div>
                <label className="text-gray-700">Upload Photo:</label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                  style={{
                    backgroundColor: "#f1f2f6",
                    borderColor: "#bdc3c7",
                  }}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-4 mt-6">
              <button
                type="submit"
                onClick={handleClick}
                className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md"
                style={{ width: "150px", fontSize: "16px" }}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                style={{ width: "150px", fontSize: "16px" }}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Add ToastContainer for notifications */}
      <ToastContainer />
    </div>
  );
};

export default AddStudent;
