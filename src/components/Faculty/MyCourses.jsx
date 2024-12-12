import React, { useEffect, useState } from "react";
import Ftopbar from "./Ftopbar.jsx";
import Fsidebar from "./Fsidebar.jsx";
import axios from "axios";

export default function MyCourses() {
  const [facultyCourses, setFacultyCourses] = useState([]);

  useEffect(() => {
    const facultyId = localStorage.getItem("fid");
    if (facultyId) {
      axios
        .get(
          `https://springbootprojecterp.up.railway.app/vfcmByid/${facultyId}`
        )
        .then((response) => {
          setFacultyCourses(response.data);
        })
        .catch((error) => {
          console.error("Error fetching faculty course mappings:", error);
        });
    }
  }, []);

  const cardColors = [
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-pink-100",
    "bg-purple-100",
    "bg-indigo-100",
    "bg-red-100",
    "bg-teal-100",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Ftopbar />
      <div className="flex flex-1">
        <Fsidebar />
        <div className="flex-1 p-10 bg-gray-100">
          <h1 className="text-3xl font-bold text-center mb-20">My Courses</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {facultyCourses.length > 0 ? (
              facultyCourses.map((course, index) => (
                <div
                  key={course.mappingid}
                  className={`${
                    cardColors[index % cardColors.length]
                  } p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105`}
                >
                  <div className="text-xl font-bold mb-2 text-gray-800">
                    {course.course.coursetitle}
                  </div>
                  <div className="text-md font-semibold text-gray-700">
                    {course.course.coursecode}
                  </div>
                  <div className="text-sm text-gray-600">
                    Credits: {course.course.credits}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    {course.course.ltps}
                  </div>
                  <div className="border-t border-gray-300 pt-4 mt-4">
                    <div className="text-lg font-semibold text-gray-800 mb-2">
                      Faculty Details
                    </div>
                    <div className="text-sm text-gray-700">
                      Name: {course.faculty.name}
                    </div>
                    <div className="text-sm text-gray-700">
                      Designation: {course.faculty.designation}
                    </div>
                    <div className="text-sm text-gray-700">
                      Department: {course.faculty.department}
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    Section: {course.section}
                  </div>
                  <div className="text-sm text-gray-600">
                    Faculty Type: {course.facultytype}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-lg">
                No courses found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
