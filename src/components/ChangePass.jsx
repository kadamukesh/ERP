import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

const ChangePass = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    role: "faculty", // Default role set to "faculty"
  });

  const [message, setMessage] = useState(""); // State for messages
  const [isSuccess, setIsSuccess] = useState(null); // State for message type

  const handleInput = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatePassUrl =
        passwords.role === "faculty"
          ? "http://localhost:8080/updatepass"
          : "http://localhost:8080/updateSpass"; // Use different URI for student role

      const updatePassPayload = {
        password: passwords.oldPassword,
        newPassword: passwords.newPassword,
      };

      // Send the request to the backend
      const response = await axios.put(updatePassUrl, updatePassPayload);

      // Check for success status and response data
      if (response.status === 200) {
        if (response.data === "Password updated successfully") {
          setMessage("Password updated successfully");
          setIsSuccess(true);
          toast.success("Password updated successfully");

          // Redirect after a slight delay
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
        } else {
          // This case should not happen if the backend is returning correct messages
          setMessage("Password update failed. Please try again.");
          setIsSuccess(false);
          toast.error("Password update failed. Please try again.");
        }
      } else {
        setMessage("Unexpected error occurred. Please try again.");
        setIsSuccess(false);
        toast.error("Unexpected error occurred. Please try again.");
      }
    } catch (error) {
      // Handle error response
      if (error.response) {
        if (error.response.status === 400) {
          setMessage("Old password is incorrect. Please try again.");
          setIsSuccess(false);
          toast.error("Old password is incorrect. Please try again.");
        } else {
          setMessage("Password update failed. Please try again.");
          setIsSuccess(false);
          toast.error("Password update failed. Please try again.");
        }
      } else {
        // Handle network error or other issues
        setMessage("An unexpected error occurred. Please try again later.");
        setIsSuccess(false);
        toast.error("An unexpected error occurred. Please try again later.");
      }
      console.error("Password Update Error:", error);
    }
  };

  return (
    <>
      <section className="bg-gray-300 min-h-screen flex justify-center items-center px-8">
        <main>
          <div className="py-12 grid grid-cols-2 items-center bg-gray-300 w-full">
            <div className="text-center">
              <img
                src="/images/changep.png"
                alt="a girl is trying to log in"
                className="w-5/5 h-auto mx-auto right-11"
              />
            </div>
            <div className="p-8">
              <h1 className="mb-6 text-2xl font-semibold border-b-2 border-blue-600 inline-block">
                Change Password
              </h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="oldPassword"
                    className="block text-md font-medium text-gray-600 mb-2"
                  >
                    Old Password
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    placeholder="Enter your old password"
                    id="oldPassword"
                    required
                    value={passwords.oldPassword}
                    onChange={handleInput}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="newPassword"
                    className="block text-md font-medium text-gray-600 mb-2"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter your new password"
                    id="newPassword"
                    required
                    value={passwords.newPassword}
                    onChange={handleInput}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Role Selection with Icons */}
                <div className="mb-6">
                  <label
                    htmlFor="role"
                    className="block text-md font-medium text-gray-600 mb-2"
                  >
                    Select Role
                  </label>
                  <div className="relative w-full">
                    <select
                      name="role"
                      value={passwords.role}
                      onChange={handleInput}
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option value="faculty">Faculty</option>
                      <option value="student">Student</option>
                    </select>

                    <div className="absolute right-4 top-3 flex items-center">
                      {passwords.role === "faculty" && (
                        <FaChalkboardTeacher className="text-lg text-gray-600" />
                      )}
                      {passwords.role === "student" && (
                        <FaUserGraduate className="text-lg text-gray-600" />
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  Update Password
                </button>
              </form>

              {/* Display success/error message */}
              {message && (
                <p
                  className={`mt-4 text-md ${
                    isSuccess ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </main>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </section>
    </>
  );
};

export default ChangePass;
