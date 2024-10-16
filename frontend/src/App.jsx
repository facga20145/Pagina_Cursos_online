import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/Login/Login.jsx';
import Register from './components/Register.jsx';
import LandingPage from './components/Landings/LandingAdult/LandingPage.jsx';
import Premium from './components/Premiun/Premium.jsx';
import Dashboard from '../src/components/Dashboard.jsx'; 
import LandingYoung from './components/Landings/LandingYoung/LandingYoung.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import ManageUsers from './components/Admin/ManageUsers';
import ManageScholarships from './components/Admin/ManageScholarships';
import UploadVideos from './components/Admin/UploadVideos';
import './App.css';
import Childlandingpage from './components/Landings/Landingkids/Childlandingpage.jsx';
import DemoLandingPage from './components/DemoLandingPage.jsx'
import PlanesKids from './components/PlanesKids.jsx';
import Comunidad from './components/comunidad.jsx';
import Foro from './components/foro.jsx';
import Admin from './components/Admin/Admin.jsx';
import KidPlan from './components/KidPlan.jsx';
import YoungPlan from './components/YoungPlan.jsx';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/landingyoung" element={<LandingYoung />} />
        <Route path="/" element={<LandingPage />} />
        <Route path='/childlandingpage' element={<Childlandingpage/>}/>
        <Route path="/DemoLandingPage" element={<DemoLandingPage />} />
        <Route path="/planesKids" element={<PlanesKids/>} />
        <Route path="/Comunidad" element={<Comunidad/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/Foro" element={<Foro/>} />
        <Route path="/KidPlan" element={<KidPlan/>} />
        <Route path="/YoungPlan" element={<YoungPlan/>} />
        

      </Routes>
    </Router>
  );
}

export default App;
