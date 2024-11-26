import React, { useEffect, useState } from "react";
import axios from "axios";
import { Check, X } from "lucide-react";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

const AdminLeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/faculty/appliedforleave"
      );
      setLeaveRequests(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching leave requests", error);
      setError("Failed to load leave requests. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (leaveId, status) => {
    if (!leaveId) {
      console.error("Leave ID is undefined");
      alert("Failed to update leave status. Invalid leave ID.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/admin/update/${leaveId}?status=${status}`
      );
      setLeaveRequests(
        leaveRequests.map((request) =>
          request.leaveId === leaveId ? { ...request, status } : request
        )
      );
      alert(`Leave request ${status.toLowerCase()} successfully`);
    } catch (error) {
      console.error("Error updating leave status", error);
      alert("Failed to update leave status. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
  };

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
          <h1 className="text-3xl font-bold text-center mb-6">
            Leave Requests
          </h1>

          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="text-center p-4 text-red-600">
              <p>{error}</p>
              <button
                onClick={fetchLeaveRequests}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Faculty Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaveRequests.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No leave requests available
                      </td>
                    </tr>
                  ) : (
                    leaveRequests.map((request) => (
                      <tr key={request.leaveId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {request.faculty && request.faculty.name
                            ? request.faculty.name
                            : "No Faculty"}
                        </td>
                        <td className="px-6 py-4">{request.reason}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatDate(request.startDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatDate(request.endDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              request.status === "Accepted"
                                ? "bg-green-100 text-green-800"
                                : request.status === "Rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {request.status === "Pending" && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  handleStatusUpdate(
                                    request.leaveId,
                                    "Accepted"
                                  )
                                }
                                className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(
                                    request.leaveId,
                                    "Rejected"
                                  )
                                }
                                className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                              >
                                <X className="w-4 h-4 mr-1" />
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLeaveManagement;
