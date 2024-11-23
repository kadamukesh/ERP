import React from "react";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

const UpdateCourse = () => {
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
            className="text-3xl font-bold text-center bottom-40"
            style={{ marginBottom: "200px" }}
          >
            Update Course
          </h1>

          {/* Icon and Text Section */}
          <div className="grid grid-cols-4 gap-10 mt-10 text-center"></div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
