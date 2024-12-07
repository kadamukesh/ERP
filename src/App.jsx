import React from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import NotFound from "./components/NotFound.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Adminhome from "./components/Admin/Adminhome.jsx";
import AddStudent from "./components/Admin/AddStudent.jsx";
import ViewStudents from "./components/Admin/ViewStudents.jsx";
import UpdateStudent from "./components/Admin/UpdateStudent.jsx";
import AddFaculty from "./components/Admin/AddFaculty.jsx";
import ViewFaculty from "./components/Admin/ViewFaculty.jsx";
import UpdateFaculty from "./components/Admin/UpdateFaculty.jsx";
import UpdateCourse from "./components/Admin/UpdateCourse.jsx";
import ViewCourse from "./components/Admin/ViewCourse.jsx";
import AddCourse from "./components/Admin/AddCourse.jsx";
import Facultyhome from "./components/Faculty/Facultyhome.jsx";
import Studenthome from "./components/Student/Studenthome.jsx";
import Sprofile from "./components/Student/Sprofile.jsx";
import ChangePass from "./components/ChangePass.jsx";
import Fprofile from "./components/Faculty/Fprofile.jsx";
import Welcome from "./Welcome.jsx";
import FacultyCourseMapping from "./components/Admin/FacultyCourseMapping.jsx";

import MyCourses from "./components/Faculty/MyCourses.jsx";
import Feedback from "./components/Student/Feedback.jsx";
import FacultyLeave from "./components/Faculty/FacultyLeave.jsx";
import StudentLeave from "./components/Student/StudentLeave.jsx";
import LeaveStatus from "./components/Faculty/LeaveStatus.jsx";
import AdminLeaveManagement from "./components/Admin/AdminLeaveManagement.jsx";
import SLeaveStatus from "./components/Student/SLeaveStatus.jsx";
import SAdminLeaveManagement from "./components/Admin/SAdminLeaveManagement.jsx";
import StudentCourseReg from "./components/Student/StudentCourseReg.jsx";
import RegCourses from "./components/Student/RegCourses.jsx";
import ViewFeedback from "./components/Faculty/ViewFeedback.jsx";
import MapCounselling from "./components/Admin/MapCounselling.jsx";
import Mycounsellor from "./components/Student/Mycounsellor.jsx";
import AssignedStudents from "./components/Faculty/AssignedStudents.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Welcome />
            </>
          }
        />

        {/* Add */}
        <Route
          exact
          path="index2"
          element={
            <>
              <Navbar /> <Home />
            </>
          }
        />

        <Route
          exact
          path="login"
          element={
            <>
              <Navbar /> <Login />
            </>
          }
        />

        <Route
          exact
          path="about"
          element={
            <>
              <Navbar /> <About />
            </>
          }
        />

        <Route
          exact
          path="contact"
          element={
            <>
              <Navbar /> <Contact />
            </>
          }
        />

        <Route
          exact
          path="adminhome"
          element={
            <>
              <Adminhome />
            </>
          }
        />

        <Route
          exact
          path="addstudent"
          element={
            <>
              <AddStudent />
            </>
          }
        />

        <Route
          exact
          path="viewstudent"
          element={
            <>
              <ViewStudents />
            </>
          }
        />

        <Route
          exact
          path="updatestudent"
          element={
            <>
              <UpdateStudent />
            </>
          }
        />

        <Route
          exact
          path="addfaculty"
          element={
            <>
              <AddFaculty />
            </>
          }
        />
        <Route
          exact
          path="viewfaculty"
          element={
            <>
              <ViewFaculty />
            </>
          }
        />
        <Route
          exact
          path="updatefaculty"
          element={
            <>
              <UpdateFaculty />
            </>
          }
        />

        <Route
          exact
          path="addcourse"
          element={
            <>
              <AddCourse />
            </>
          }
        />
        <Route
          exact
          path="viewcourse"
          element={
            <>
              <ViewCourse />
            </>
          }
        />
        <Route
          exact
          path="updatecourse"
          element={
            <>
              <UpdateCourse />
            </>
          }
        />

        <Route
          exact
          path="facultycoursemapping"
          element={
            <>
              <FacultyCourseMapping />
            </>
          }
        />

        <Route
          exact
          path="mappingcounselling"
          element={
            <>
              <MapCounselling />
            </>
          }
        />

        <Route
          exact
          path="mycounselling"
          element={
            <>
              <Mycounsellor />
            </>
          }
        />

        <Route
          exact
          path="myassigned"
          element={
            <>
              <AssignedStudents />
            </>
          }
        />

        <Route
          exact
          path="adminleave"
          element={
            <>
              <AdminLeaveManagement />
            </>
          }
        />
        <Route
          exact
          path="sadminleave"
          element={
            <>
              <SAdminLeaveManagement />
            </>
          }
        />

        <Route
          exact
          path="scoursereg"
          element={
            <>
              <StudentCourseReg />
            </>
          }
        />

        <Route
          exact
          path="regcourses"
          element={
            <>
              <RegCourses />
            </>
          }
        />

        {/* Faculty */}
        <Route
          exact
          path="facultyhome"
          element={
            <>
              <Facultyhome />
            </>
          }
        />

        <Route
          exact
          path="/facultyprofile"
          element={
            <>
              <Fprofile />
            </>
          }
        />

        <Route
          exact
          path="/mycourses"
          element={
            <>
              <MyCourses />
            </>
          }
        />

        <Route
          exact
          path="/fleave"
          element={
            <>
              <FacultyLeave />
            </>
          }
        />

        <Route
          exact
          path="/fleavestatus"
          element={
            <>
              <LeaveStatus />
            </>
          }
        />

        <Route
          exact
          path="/vfeedback"
          element={
            <>
              <ViewFeedback />
            </>
          }
        />

        {/* student */}
        <Route
          exact
          path="studenthome"
          element={
            <>
              <Studenthome />
            </>
          }
        />

        <Route
          exact
          path="/sleave"
          element={
            <>
              <StudentLeave />
            </>
          }
        />

        <Route
          exact
          path="/sleavestatus"
          element={
            <>
              <SLeaveStatus />
            </>
          }
        />

        <Route
          exact
          path="/studentprofile"
          element={
            <>
              <Sprofile />
            </>
          }
        />

        <Route
          exact
          path="/feedback"
          element={
            <>
              <Feedback />
            </>
          }
        />

        <Route
          exact
          path="changepass"
          element={
            <>
              <ChangePass />
            </>
          }
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
