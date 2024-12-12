import React, { useState, useEffect } from "react";
import axios from "axios";
import Fsidebar from "./Fsidebar.jsx";
import Ftopbar from "./Ftopbar.jsx";

const UploadContent = () => {
  const [facultyCourses, setFacultyCourses] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch sections for dropdown
  useEffect(() => {
    const facultyId = localStorage.getItem("fid");
    if (facultyId) {
      axios
        .get(
          `https://springbootprojecterp.up.railway.app/vfcmByid/${facultyId}`
        )
        .then((response) => {
          setFacultyCourses(response.data);
        })
        .catch((error) => {
          console.error("Error fetching faculty course mappings:", error);
        });
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !selectedSection || !title) {
      setMessage("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fcmId", selectedSection);
    formData.append("title", title);

    try {
      setIsSubmitting(true);
      setMessage("");
      const response = await axios.post(
        `https://springbootprojecterp.up.railway.app/uploadContent`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Content uploaded successfully!");
      setTitle("");
      setFile(null);
      setSelectedSection("");
    } catch (error) {
      console.error("Error uploading content:", error);
      setMessage("Failed to upload content. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Ftopbar />
      <div className="flex flex-1">
        <Fsidebar />
        <div className="flex-1 p-10 bg-gray-100">
          <h1 className="text-3xl font-bold mb-6">Upload Content</h1>

          {message && (
            <p
              className={`text-center mb-4 ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <form
            className="max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-md"
            onSubmit={handleSubmit}
          >
            {/* Title Input */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-semibold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter title"
              />
            </div>

            {/* Section Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="section"
                className="block text-gray-700 font-semibold mb-2"
              >
                Select Section
              </label>
              <select
                id="section"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled>
                  Choose a section
                </option>
                {facultyCourses.map((course) => (
                  <option key={course.mappingid} value={course.mappingid}>
                    {course.course.coursetitle} - {course.course.coursecode}
                  </option>
                ))}
              </select>
            </div>

            {/* File Upload */}
            <div className="mb-4">
              <label
                htmlFor="file"
                className="block text-gray-700 font-semibold mb-2"
              >
                Upload File
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadContent;
