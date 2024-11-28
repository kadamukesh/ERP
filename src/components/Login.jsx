import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    captchaInput: "",
  });

  const [captcha, setCaptcha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const generateCaptcha = () => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captchaStr = "";
    for (let i = 0; i < 6; i++) {
      captchaStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(captchaStr);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.captchaInput !== captcha) {
      toast.error("Invalid CAPTCHA. Please try again.");
      generateCaptcha();
      return;
    }

    const tryLogin = async (url, payload) => {
      try {
        const response = await axios.post(url, payload);
        return response.data;
      } catch (error) {
        console.error("Login attempt failed:", error);
        return null;
      }
    };

    // Try admin login
    const adminData = await tryLogin("http://localhost:8080/checkadminLogin", {
      username: user.username,
      password: user.password,
    });

    if (adminData) {
      localStorage.setItem("adminUsername", user.username);
      window.location.href = "/adminhome";
      return;
    }

    // Try faculty login
    const facultyData = await tryLogin(
      "http://localhost:8080/checkfacultyLogin",
      {
        eid: user.username,
        password: user.password,
      }
    );

    if (facultyData && facultyData.role === "faculty") {
      localStorage.setItem("facultyUsername", user.username);
      localStorage.setItem("facultyImage", facultyData.image);
      localStorage.setItem("sname", facultyData.sname);
      localStorage.setItem("age", facultyData.age);
      localStorage.setItem("email", facultyData.email);
      localStorage.setItem("contact", facultyData.contact);
      localStorage.setItem("dob", facultyData.dob);
      localStorage.setItem("address", facultyData.address);
      localStorage.setItem("eid", facultyData.eid);
      localStorage.setItem("mstatus", facultyData.mstatus);
      localStorage.setItem("desig", facultyData.desig);
      localStorage.setItem("dept", facultyData.dept);
      localStorage.setItem("gender", facultyData.gender);
      localStorage.setItem("fid", facultyData.fid);
      window.location.href = "/facultyhome";
      return;
    }

    // Try student login
    const studentData = await tryLogin(
      "http://localhost:8080/checkstudentLogin",
      {
        uid: user.username,
        password: user.password,
      }
    );

    if (studentData && studentData.role === "student") {
      localStorage.setItem("studentUsername", user.username);
      localStorage.setItem("name", studentData.name);
      localStorage.setItem("sgender", studentData.sgender);
      localStorage.setItem("studentImage", studentData.image);
      localStorage.setItem("dept", studentData.dept);
      localStorage.setItem("age", studentData.age);
      localStorage.setItem("email", studentData.email);
      localStorage.setItem("contact", studentData.contact);
      localStorage.setItem("dob", studentData.dob);
      localStorage.setItem("atype", studentData.atype);
      localStorage.setItem("uid", studentData.uid);
      localStorage.setItem("sid", studentData.sid);
      window.location.href = "/studenthome";
      return;
    }

    // If all login attempts fail
    toast.error("Invalid credentials. Please try again.");
  };

  return (
    <section className="bg-gray-300 min-h-screen flex justify-center items-center px-8">
      <main>
        <div className="py-12 grid grid-cols-2 items-center bg-gray-300 w-full">
          <div className="text-center">
            <img
              src="/images/login.png"
              alt="a girl is trying to log in"
              className="w-3/5 h-auto mx-auto"
            />
          </div>
          <div className="p-8">
            <h1 className="mb-6 text-2xl font-semibold border-b-2 border-blue-600 inline-block">
              Login Form
            </h1>

            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-lg font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Your Username"
                  id="username"
                  required
                  autoComplete="off"
                  value={user.username}
                  onChange={handleInput}
                  className="w-4/5 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mt-6 mb-2 text-lg font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative w-4/5">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Your Password"
                    id="password"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-3 text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="captcha"
                  className="block mb-2 text-lg font-medium text-gray-700"
                >
                  Verification Code
                </label>
                <div className="flex items-center space-x-4">
                  <div
                    className="bg-gray-200 py-2 px-4 rounded-md font-bold text-2xl cursor-pointer"
                    style={{ fontFamily: "monospace" }}
                    onClick={generateCaptcha}
                  >
                    {captcha}
                  </div>
                  <input
                    type="text"
                    name="captchaInput"
                    placeholder="Enter verification code"
                    id="captcha"
                    required
                    value={user.captchaInput}
                    onChange={handleInput}
                    className="w-30 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Click on the code to regenerate.
                </p>
              </div>

              <button
                type="submit"
                className="mt-4 px-4 py-1 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              >
                Login
              </button>

              <div className="mt-1 flex justify-start ">
                <a href="/changepass" className="text-blue-500 hover:underline">
                  Change Password?
                </a>
              </div>
            </form>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
            />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Login;
