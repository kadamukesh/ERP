import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import axios from "axios";

const MapCounselling = () => {
  const [faculties, setFaculties] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchFaculties();
    fetchStudents();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get("http://localhost:8080/viewfaculty");
      setFaculties(response.data);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/viewstudent");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/map-counselling",
        {
          facultyId: selectedFaculty,
          studentId: selectedStudent,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error mapping faculty to student");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-10 bg-gray-100">
          <h1 className="text-3xl font-bold text-center mb-6">
            Faculty Student Counselling Mapping
          </h1>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="faculty" className="block mb-2">
                Select Faculty:
              </label>
              <select
                id="faculty"
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select a faculty</option>
                {faculties.map((faculty) => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="student" className="block mb-2">
                Select Student:
              </label>
              <select
                id="student"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select a student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Map Faculty to Student
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-green-600 font-semibold">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapCounselling;
