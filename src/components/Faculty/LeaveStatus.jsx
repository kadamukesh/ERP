import React, { useState, useEffect } from "react";
import axios from "axios";
import Fsidebar from "./Fsidebar";
import Ftopbar from "./Ftopbar";

const LeaveStatus = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const facultyId = localStorage.getItem("fid");
    if (!facultyId) {
      setError("Faculty ID not found. Please log in again.");
      return;
    }

    axios
      .get(`https://springbootprojecterp.up.railway.app/faculty/${facultyId}`)
      .then((response) => {
        setLeaves(response.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError("No leaves found for this faculty.");
        } else {
          setError("An error occurred while fetching data.");
          console.error("Error details:", err);
        }
      });
  }, []);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Ftopbar />
      <div className="flex flex-1">
        <Fsidebar />
        <div className="flex-1 p-10 bg-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Faculty Leaves
          </h2>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {leaves.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {leaves.map((leave, index) => (
                    <li
                      key={index}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-900">
                            {leave.leaveType}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(leave.startDate)} to{" "}
                            {formatDate(leave.endDate)}
                          </p>
                          <p className="text-sm text-gray-600">
                            Reason: {leave.reason}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            leave.status === "Accepted"
                              ? "bg-green-100 text-green-700"
                              : leave.status === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {leave.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No leave records found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveStatus;
