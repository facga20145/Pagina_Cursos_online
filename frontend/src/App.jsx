import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/Login.jsx';
import Register from './components/Register.jsx';
import LandingPage from './components/LandingPage.jsx';
import Premium from './components/Premiun/Premium.jsx';
import Dashboard from '../src/components/Dashboard.jsx'; 
import LandingYoung from './components/Landings/LandingYoung.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import ManageUsers from './components/Admin/ManageUsers';
import ManageScholarships from './components/Admin/ManageScholarships';
import UploadVideos from './components/Admin/UploadVideos';
import './App.css';
import Childlandingpage from './components/childlandingpage.jsx';
import DemoLandingPage from './components/DemoLandingPage.jsx'
import Comunidad from './components/comunidad.jsx';
import Foro from './components/foro.jsx';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/manage-scholarships" element={<ManageScholarships />} />
        <Route path="/admin/upload-videos" element={<UploadVideos />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/landingyoung" element={<LandingYoung />} />
        <Route path="/" element={<LandingPage />} />
        <Route path='/childlandingpage' element={<Childlandingpage/>}/>
        <Route path="/DemoLandingPage" element={<DemoLandingPage />} />
        <Route path="/comunidad" element={<Comunidad />}/>
        <Route path="/foro" element={<Foro />}/>
      </Routes>
    </Router>
  );
}

export default App;
