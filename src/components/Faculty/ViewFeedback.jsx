import React, { useState, useEffect } from "react";
import axios from "axios";
import Ftopbar from "./Ftopbar.jsx";
import Fsidebar from "./Fsidebar.jsx";

export default function ViewFeedback() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const facultyId = localStorage.getItem("fid");
      if (!facultyId) {
        setError("Faculty ID not found. Please log in again.");
        return;
      }
      const response = await axios.get(
        `http://localhost:8080/${facultyId}/courses`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCourses(response.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to fetch courses. Please try again later.");
    }
  };

  const handleCourseSelect = async (courseId) => {
    if (!courseId) return;

    const course = courses.find((c) => c.courseid === parseInt(courseId));
    setSelectedCourse(course);

    try {
      const facultyId = localStorage.getItem("fid");
      if (!facultyId) {
        setError("Faculty ID not found. Please log in again.");
        return;
      }
      const response = await axios.get(
        `http://localhost:8080/${facultyId}/feedback/${courseId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFeedback(response.data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
      setError("Failed to fetch feedback. Please try again later.");
    }
  };

  const calculateAverageRating = (questionId) => {
    const ratings = feedback
      .filter((f) => f.questionId === questionId)
      .map((f) => f.rating);
    if (ratings.length === 0) return "No ratings yet";
    const average = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    return average.toFixed(2);
  };

  return (
    <div className="flex flex-col h-screen">
      <Ftopbar />
      <div className="flex flex-1 overflow-hidden">
        <Fsidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">View Feedback</h1>
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                {error}
              </div>
            )}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Select a Course:</h2>
              <select
                onChange={(e) => handleCourseSelect(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.courseid} value={course.courseid}>
                    {course.coursetitle} ({course.coursecode})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
            {selectedCourse && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Feedback for {selectedCourse.coursetitle}
                </h2>
                <div className="space-y-6">
                  {["q1", "q2", "q3", "q4", "q5"].map((questionId) => (
                    <div key={questionId} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        {questionId === "q1" &&
                          "How well does the faculty explain the subject?"}
                        {questionId === "q2" &&
                          "How approachable is the faculty for doubts?"}
                        {questionId === "q3" &&
                          "How well does the faculty engage students in the class?"}
                        {questionId === "q4" &&
                          "How fair are the faculty's evaluation methods?"}
                        {questionId === "q5" &&
                          "How likely are students to recommend this faculty's course to others?"}
                      </h3>
                      <p className="text-lg font-medium text-indigo-600">
                        Average Rating: {calculateAverageRating(questionId)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
