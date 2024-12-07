import React, { useState, useEffect } from "react";
import axios from "axios";
import Ssidebar from "./Ssidebar";
import Stopbar from "./Stopbar";

const Mycounsellor = () => {
  const [counselor, setCounselor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounselorDetails = async () => {
      try {
        // Assuming the student's ID is stored in localStorage after login
        const studentId = localStorage.getItem("sid");
        const response = await axios.get(
          `http://localhost:8080/student/${studentId}/counselor`
        );
        setCounselor(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch counselor details. Please try again later.");
        setLoading(false);
      }
    };

    fetchCounselorDetails();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Stopbar />
      <div className="flex flex-1">
        <Ssidebar />
        <div className="flex-1 p-10 bg-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            My Counselor Details
          </h2>
          {loading ? (
            <p>Loading counselor details...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : counselor ? (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name:
                </label>
                <p className="text-gray-700">{counselor.name}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email:
                </label>
                <p className="text-gray-700">{counselor.email}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Department:
                </label>
                <p className="text-gray-700">{counselor.department}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Contact:
                </label>
                <p className="text-gray-700">{counselor.contact}</p>
              </div>
            </div>
          ) : (
            <p>No counselor assigned yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mycounsellor;
