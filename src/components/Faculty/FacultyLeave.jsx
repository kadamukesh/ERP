import React, { useEffect, useState } from "react";
import Ftopbar from "./Ftopbar.jsx";
import Fsidebar from "./Fsidebar.jsx";
import axios from "axios";
import { Calendar } from "lucide-react";

export default function FacultyLeave() {
  const [formData, setFormData] = useState({
    reason: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [facultyId, setFacultyId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("fid");
    if (id) {
      setFacultyId(id);
    } else {
      setError("Faculty ID not found. Please log in again.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const validateDates = () => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (end < start) {
      setError("End date cannot be before start date");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateDates()) return;

    if (!facultyId) {
      setError("Faculty ID not available. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const payload = { ...formData, facultyId };
      console.log("Sending payload:", payload);
      // Change this line in your handleSubmit function
      await axios.post("http://localhost:8080/faculty/leave/apply", payload);

      setSuccess("Leave request submitted successfully!");
      setFormData({
        reason: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.error("Error submitting leave request", error);
      setError("Failed to submit leave request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Ftopbar />
      <div className="flex flex-1">
        <Fsidebar />
        <div className="flex-1 p-10 bg-gray-100">
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <Calendar className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">
                Apply for Leave
              </h2>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reason for Leave
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows="3"
                  placeholder="Please provide your reason for leave"
                />
              </div>

              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "Submit Leave Request"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
