import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/components/Login.jsx";
import Register from "./components/Register.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Premium from "./components/Premiun/Premium.jsx";
import Dashboard from "../src/components/Dashboard.jsx";
import LandingYoung from "./components/Landings/LandingYoung.jsx";
import AdminDashboard from "./components/Administra/AdminDashboard.jsx";
import ManageUsers from "./components/Administra/ManageUsers";
import ManageScholarships from "./components/Administra/ManageScholarships";
import UploadVideos from "./components/Administra/UploadVideos";
import "./App.css";
import Childlandingpage from "./components/childlandingpage.jsx";
import DemoLandingPage from "./components/DemoLandingPage.jsx";
import ManageCourses from "./components/Administra/ManageCourses";
import EditCourse from "./components/Administra/EditCourse";
import ManageAdmin from "./components/Administra/manageAdmin/ManageAdmin.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Administra/dashboard" element={<AdminDashboard />} />
        <Route path="/Administra/manage-admin" element={<ManageAdmin />} />
        <Route path="/Administra/manage-users" element={<ManageUsers />} />
        <Route path="/Administra/manage-scholarships"element={<ManageScholarships />}/>
        <Route path="/Administra/upload-videos" element={<UploadVideos />} />
        <Route path="/Administra/manage-courses" element={<ManageCourses />} />
        <Route path="/Administra/edit-course/:courseId" element={<EditCourse />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/landingyoung" element={<LandingYoung />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/childlandingpage" element={<Childlandingpage />} />
        <Route path="/DemoLandingPage" element={<DemoLandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
