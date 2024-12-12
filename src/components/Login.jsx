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
    const adminData = await tryLogin(
      "https://springbootprojecterp.up.railway.app/checkadminLogin",
      {
        username: user.username,
        password: user.password,
      }
    );

    if (adminData) {
      localStorage.setItem("adminUsername", user.username);
      window.location.href = "/adminhome";
      return;
    }

    // Try faculty login
    const facultyData = await tryLogin(
      "https://springbootprojecterp.up.railway.app/checkfacultyLogin",
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
      "https://springbootprojecterp.up.railway.app/checkstudentLogin",
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

    toast.error("Invalid credentials. Please try again.");
  };

  return (
    <section className="min-h-screen bg-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-300 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image Section - Hidden on mobile */}
            <div className="hidden md:block text-center">
              <img
                src="/images/login.png"
                alt="Login illustration"
                className="max-w-[57%] mx-auto h-auto"
              />
            </div>

            {/* Form Section */}
            <div className="p-4 md:p-8">
              <h1 className="text-2xl md:text-3xl font-semibold mb-6 border-b-2 border-blue-600 inline-block">
                Login Form
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-base md:text-lg font-medium text-gray-700"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-base md:text-lg font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 focus:outline-none"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="captcha"
                    className="block mb-2 text-base md:text-lg font-medium text-gray-700"
                  >
                    Verification Code
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div
                      className="bg-gray-200 py-2 px-4 rounded-md font-bold text-xl md:text-2xl cursor-pointer select-none"
                      style={{ fontFamily: "monospace" }}
                      onClick={generateCaptcha}
                    >
                      {captcha}
                    </div>
                    <input
                      type="text"
                      name="captchaInput"
                      placeholder="Enter code"
                      id="captcha"
                      required
                      value={user.captchaInput}
                      onChange={handleInput}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Click on the code to regenerate
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Login
                  </button>

                  <div className="text-center">
                    <a
                      href="/changepass"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Change Password?
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </section>
  );
};

export default Login;
