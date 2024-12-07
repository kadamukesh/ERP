import React, { useState, useEffect } from "react";
import { FaUserGraduate, FaSpinner } from "react-icons/fa";
import Fsidebar from "./Fsidebar.jsx";
import Ftopbar from "./Ftopbar.jsx";

const AssignedStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignedStudents = async () => {
      try {
        // Assume the faculty ID is stored in localStorage after login
        const facultyId = localStorage.getItem("fid");
        const response = await fetch(
          `http://localhost:8080/${facultyId}/assigned-students`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch assigned students");
        }
        const data = await response.json();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAssignedStudents();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Ftopbar />
      <div className="flex flex-1">
        <Fsidebar />
        <div className="flex-1 p-10 bg-gray-100">
          <h1 className="text-3xl font-bold mb-6">Assigned Students</h1>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : students.length === 0 ? (
            <div className="text-gray-500 text-center">
              No students assigned yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <FaUserGraduate className="text-3xl text-blue-500 mr-4" />
                    <h2 className="text-xl font-semibold">{student.name}</h2>
                  </div>
                  <div className="text-gray-600">
                    <p>
                      <strong>ID:</strong> {student.uid}
                    </p>
                    <p>
                      <strong>Email:</strong> {student.email}
                    </p>
                    <p>
                      <strong>Department:</strong> {student.department}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignedStudents;
