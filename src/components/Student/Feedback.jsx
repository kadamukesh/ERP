import React, { useState, useEffect } from "react";
import Stopbar from "./Stopbar";
import Ssidebar from "./Ssidebar";

const Feedback = () => {
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [feedbackResponses, setFeedbackResponses] = useState({});
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState([]);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await fetch("http://localhost:8080/viewfaculty", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setFaculties(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching faculties:", error);
      setError("Failed to fetch faculties. Please try again later.");
    }
  };

  const handleFacultyClick = async (faculty) => {
    setSelectedFaculty(faculty);
    setSelectedSection("");
    setFeedbackResponses({});
    setSuccessMessage(null);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8080/vfcmByid/${faculty.id}`,
        { method: "GET", credentials: "include" }
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const uniqueSections = [
        ...new Set(data.map((mapping) => mapping.section)),
      ];
      setSections(uniqueSections);
    } catch (error) {
      console.error("Error fetching sections:", error);
      setError("Failed to fetch sections. Please try again later.");
    }
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    setFeedbackResponses({});
    setSuccessMessage(null);
    setError(null);
  };

  const handleFeedbackChange = (questionId, value) => {
    setFeedbackResponses((prev) => ({
      ...prev,
      [questionId]: parseInt(value, 10),
    }));
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();

    if (!selectedFaculty || !selectedSection) {
      setError(
        "Please select a faculty and a section before submitting feedback."
      );
      return;
    }

    if (Object.keys(feedbackResponses).length !== 5) {
      setError("Please provide feedback for all questions.");
      return;
    }

    const feedbackKey = `${selectedFaculty.id}-${selectedSection}`;
    if (submittedFeedbacks.includes(feedbackKey)) {
      setError("Feedback already submitted for this faculty and section.");
      return;
    }

    const payload = {
      facultyId: selectedFaculty.id,
      section: selectedSection,
      responses: feedbackResponses,
    };

    try {
      const response = await fetch("http://localhost:8080/addfeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      setSuccessMessage("Feedback submitted successfully!");
      setSubmittedFeedbacks([...submittedFeedbacks, feedbackKey]);
      setFeedbackResponses({});
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("Failed to submit feedback. Please try again later.");
    }
  };

  const feedbackQuestions = [
    { id: "q1", question: "How well does the faculty explain the subject?" },
    { id: "q2", question: "How approachable is the faculty for doubts?" },
    {
      id: "q3",
      question: "How well does the faculty engage students in the class?",
    },
    { id: "q4", question: "How fair are the faculty's evaluation methods?" },
    {
      id: "q5",
      question:
        "How likely are you to recommend this faculty's course to others?",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Stopbar />
      <div className="flex flex-1 overflow-hidden">
        <Ssidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <h1 className="text-4xl font-bold text-center py-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg animate-gradient">
            Student Feedback
          </h1>
          <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4 animate-fade-in">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-4 animate-fade-in">
                {successMessage}
              </div>
            )}
            {!selectedFaculty ? (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6 text-indigo-800">
                  Select a Faculty
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {faculties.map((faculty) => (
                    <div
                      key={faculty.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      onClick={() => handleFacultyClick(faculty)}
                    >
                      <div className="p-6">
                        <img
                          src={`data:image/jpeg;base64,${faculty.image}`}
                          alt="Faculty"
                          className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-indigo-200 transition-transform duration-300 transform hover:scale-105"
                        />
                        <h3 className="font-semibold text-xl text-center mt-4 text-indigo-700">
                          {faculty.name}
                        </h3>
                        <p className="text-purple-600 text-center mt-2">
                          {faculty.department}
                        </p>
                        <p className="text-indigo-500 text-center mt-1">
                          {faculty.eid}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto animate-fade-in">
                <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                  <h2 className="text-3xl font-semibold mb-6 text-indigo-800">
                    Feedback for {selectedFaculty.name}
                  </h2>
                  <div className="mb-6">
                    <label className="block text-indigo-700 text-lg font-semibold mb-2">
                      Select Section:
                    </label>
                    <select
                      value={selectedSection}
                      onChange={handleSectionChange}
                      className="w-full p-3 border-2 rounded-lg border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select a section</option>
                      {sections.map((section) => (
                        <option key={section} value={section}>
                          Section {section}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedSection && (
                    <div className="space-y-10">
                      {feedbackQuestions.map((q) => (
                        <div
                          key={q.id}
                          className="pb-8 border-b-2 border-indigo-100 last:border-b-0"
                        >
                          <p className="text-xl font-medium mb-6 text-indigo-800">
                            {q.question}
                          </p>
                          <div className="flex justify-center gap-8">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <label
                                key={`${q.id}-${rating}`}
                                className="relative inline-block group"
                              >
                                <input
                                  type="radio"
                                  name={q.id}
                                  value={rating}
                                  onChange={() =>
                                    handleFeedbackChange(q.id, rating)
                                  }
                                  checked={feedbackResponses[q.id] === rating}
                                  className="sr-only peer"
                                />
                                <div className="w-14 h-14 flex items-center justify-center rounded-full border-3 cursor-pointer transition-all duration-300 peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:border-indigo-600 border-indigo-300 text-indigo-600 hover:border-indigo-500 hover:bg-indigo-50 group-hover:scale-110">
                                  {rating}
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {selectedSection && (
                  <div className="sticky bottom-4 bg-white rounded-xl shadow-lg p-6 animate-slide-up">
                    <button
                      onClick={handleSubmitFeedback}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Submit Feedback
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
