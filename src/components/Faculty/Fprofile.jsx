import React, { useEffect, useState } from "react";
import Ftopbar from "./Ftopbar.jsx";
import Fsidebar from "./Fsidebar.jsx";

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

export default function Fprofile() {
  const [facultyUsername, setFacultyUsername] = useState("");
  const [facultyImage, setFacultyImage] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [eid, setEid] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const storedFacultyUsername = localStorage.getItem("facultyUsername");
    const storedFacultyImage = localStorage.getItem("facultyImage");
    const storedName = localStorage.getItem("sname");
    const storedAge = localStorage.getItem("age");
    const storedEmail = localStorage.getItem("email");
    const storedContact = localStorage.getItem("contact");
    const storedDob = localStorage.getItem("dob");
    const storedAddress = localStorage.getItem("address");
    const storedEid = localStorage.getItem("eid");
    const storedMaritalStatus = localStorage.getItem("mstatus");
    const storedDesignation = localStorage.getItem("desig");
    const storedDepartment = localStorage.getItem("dept");
    const storedGender = localStorage.getItem("gender");

    if (storedFacultyUsername) setFacultyUsername(storedFacultyUsername);
    if (storedFacultyImage) setFacultyImage(storedFacultyImage);
    if (storedName) setName(storedName);
    if (storedAge) setAge(storedAge);
    if (storedEmail) setEmail(storedEmail);
    if (storedContact) setContact(storedContact);
    if (storedDob) setDob(storedDob);
    if (storedAddress) setAddress(storedAddress);
    if (storedEid) setEid(storedEid);
    if (storedMaritalStatus) setMaritalStatus(storedMaritalStatus);
    if (storedDesignation) setDesignation(storedDesignation);
    if (storedDepartment) setDepartment(storedDepartment);
    if (storedGender) setGender(storedGender);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Ftopbar />
      <div className="flex flex-1">
        <Fsidebar />
        <div className="flex-1 p-4 overflow-auto profile-content">
          <div className="max-w-7xl mx-auto px-4">
            {/* Profile Header */}
            <div className="flex flex-col items-center mb-12 pt-8">
              <div className="relative mb-4 group">
                {facultyImage ? (
                  <img
                    src={`data:image/png;base64,${facultyImage}`}
                    alt="Faculty"
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
                    {facultyUsername}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{name}</h1>
              <p className="text-blue-600 text-lg mb-2">{department}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
              <InfoCard label="Department" value={department} />
              <InfoCard label="Age" value={age} />
              <InfoCard label="Gender" value={gender} />
              <InfoCard label="Email" value={email} />
              <InfoCard label="Contact" value={contact} />
              <InfoCard label="Date of Birth" value={dob} />
              <InfoCard label="Address" value={address} />
              <InfoCard label="Employee ID" value={eid} />
              <InfoCard label="Marital Status" value={maritalStatus} />
              <InfoCard label="Designation" value={designation} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
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
}
