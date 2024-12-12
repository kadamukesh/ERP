import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCourse = () => {
  const [course, setCourse] = useState({
    coursecode: "",
    coursetitle: "",
    ltps: "",
    credits: "",

    department: "",
  });

  // Options for the dropdowns

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://springbootprojecterp.up.railway.app/addcourse",
        course,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data);
        window.location.href = "/viewCourse";
      } else {
        toast.error("Failed to add Course. Please try again.");
      }
    } catch (error) {
      toast.error("Error adding Course.");
      console.error("Add Course Error:", error);
    }
  };

  const handleClear = () => {
    setCourse({
      coursecode: "",
      coursetitle: "",
      ltps: "",
      credits: "",

      department: "",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
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
              Add New Course
            </h1>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-gray-700">Course Code:</label>
                <input
                  type="text"
                  name="coursecode"
                  value={course.coursecode}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                />
              </div>
              <div>
                <label className="text-gray-700">Course Title:</label>
                <input
                  type="text"
                  name="coursetitle"
                  value={course.coursetitle}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                />
              </div>
              <div>
                <label className="text-gray-700">Course Credits:</label>
                <input
                  type="number"
                  name="credits"
                  value={course.credits}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                />
              </div>
              <div>
                <label className="text-gray-700">Course L-T-P-S:</label>
                <input
                  type="text"
                  name="ltps"
                  value={course.ltps}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                />
              </div>

              <div>
                <label className="text-gray-700">Department:</label>
                <input
                  type="text"
                  name="department"
                  value={course.department}
                  onChange={handleChange}
                  required
                  className="border w-full p-2 rounded-md focus:ring focus:border-blue-300"
                />
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                type="submit"
                onClick={handleClick}
                className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md"
                style={{ width: "150px", fontSize: "16px" }}
              >
                Add Course
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
    </div>
  );
};

export default AddCourse;
