import React, { useEffect, useState } from "react";
import Stopbar from "./Stopbar.jsx";
import Ssidebar from "./Ssidebar.jsx";

const InfoCard = ({ label, value }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md hover:bg-blue-50 transition-transform transform hover:scale-105 duration-300 w-full border border-gray-100">
      <p className="text-blue-700 text-sm mb-2 font-medium">{label}</p>
      <p className="text-gray-900 text-lg font-semibold break-all">
        {value || "Not provided"}
      </p>
    </div>
  );
};

const Sprofile = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [studentUsername, setStudentUsername] = useState("");
  const [studentDept, setStudentDept] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentContact, setStudentContact] = useState("");
  const [studentDob, setStudentDob] = useState("");
  const [studentAtype, setStudentAtype] = useState("");
  const [studentUid, setStudentUid] = useState("");
  const [studentImage, setStudentImage] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (!storedName) {
      window.location.href = "/login";
    } else {
      setName(storedName);
    }
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("studentUsername");
    const storedImage = localStorage.getItem("studentImage");
    const storedGender = localStorage.getItem("sgender");
    const storedDept = localStorage.getItem("dept");
    const storedEmail = localStorage.getItem("email");
    const storedContact = localStorage.getItem("contact");
    const storedDob = localStorage.getItem("dob");
    const storedAtype = localStorage.getItem("atype");
    const storedUid = localStorage.getItem("uid");
    const storedAge = localStorage.getItem("age");

    if (storedImage) setStudentImage(storedImage);
    if (storedUsername) setStudentUsername(storedUsername);
    if (storedDept) setStudentDept(storedDept);
    if (storedAge) setStudentAge(storedAge);
    if (storedEmail) setStudentEmail(storedEmail);
    if (storedContact) setStudentContact(storedContact);
    if (storedDob) setStudentDob(storedDob);
    if (storedAtype) setStudentAtype(storedAtype);
    if (storedUid) setStudentUid(storedUid);
    if (storedGender) setGender(storedGender);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Stopbar />
      <div className="flex flex-1">
        <Ssidebar />
        <div className="flex-1 p-4 overflow-auto profile-content">
          <div className="max-w-7xl mx-auto px-4">
            {/* Profile Header */}
            <div className="flex flex-col items-center mb-12 pt-8">
              <div className="relative mb-4 group">
                {studentImage ? (
                  <img
                    src={`data:image/png;base64,${studentImage}`}
                    alt="Student"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 group-hover:border-blue-600 transition-transform transform hover:scale-105 duration-300 shadow-lg"
                  />
                ) : (
                  <img
                    src="/images/admin.png"
                    alt="Default"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 group-hover:border-blue-600 transition-transform transform hover:scale-105 duration-300 shadow-lg"
                  />
                )}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-6 py-1 rounded-full text-sm font-medium shadow-md group-hover:bg-blue-600 transition-colors duration-300">
                    {studentUsername}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{name}</h1>
              <p className="text-blue-600 text-lg mb-2">{studentDept}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
              <InfoCard label="Department" value={studentDept} />
              <InfoCard label="Age" value={studentAge} />
              <InfoCard label="Gender" value={gender} />
              <InfoCard label="Email" value={studentEmail} />
              <InfoCard label="Contact" value={studentContact} />
              <InfoCard label="Date of Birth" value={studentDob} />
              <InfoCard label="Account Type" value={studentAtype} />
              <InfoCard label="University ID" value={studentUid} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Styles for the scrollable profile content */
        .profile-content {
          max-height: calc(100vh - 64px);
          overflow-y: auto;
        }

        /* Custom scrollbar for profile content */
        .profile-content::-webkit-scrollbar {
          width: 8px;
        }

        .profile-content::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .profile-content::-webkit-scrollbar-thumb {
          background: #c3c3c3;
          border-radius: 4px;
        }

        .profile-content::-webkit-scrollbar-thumb:hover {
          background: #888;
        }
      `}</style>
    </div>
  );
};

export default Sprofile;
