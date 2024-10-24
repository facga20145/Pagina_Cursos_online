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
import DemoLandingPage from './components/DemoLandingPage.jsx';
import PlanesKids from './components/PlanesKids.jsx';
import Comunidad from './components/comunidad.jsx';
import Foro from './components/foro.jsx';
import Admin from './components/Admin/Admin.jsx';
import Profile from './components/UserProfile/Profile.jsx';     

// Importamos las nuevas páginas de los cursos
import HtmlKids from './components/paginasCursos/paginasNiños/HtmlKids.jsx';
import CssKids from './components/paginasCursos/paginasNiños/CssKids.jsx';
import JavaKids from './components/paginasCursos/paginasNiños/JavaKids.jsx';
import PhpKids from './components/paginasCursos/paginasNiños/PhpKids.jsx';
import JavaScriptKids from './components/paginasCursos/paginasNiños/JavaScriptKids.jsx';
import PythonKids from './components/paginasCursos/paginasNiños/PythonKids.jsx';
import Pago from './components/Pago.jsx';

import KidPlan from './components/KidPlan.jsx';
import YoungPlan from './components/YoungPlan.jsx';
import Beca from './components/beca.jsx';
import CertificatePage from './components/Certificado/CertifactePage.jsx'

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
        <Route path="/profile" element={<Profile/>} />
        <Route path="/Pago" element={<Pago/>} />
        
        <Route path="/html-course" element={<HtmlKids/>} />
        <Route path="/css-course" element={<CssKids />} />
        <Route path="/java-course" element={<JavaKids />} />
        <Route path="/javascript-course" element={<JavaScriptKids />} />
        <Route path="/php-course" element={<PhpKids />} />
        <Route path="/python-course" element={<PythonKids/>} />
        <Route path="/KidPlan" element={<KidPlan/>} />
        <Route path="/YoungPlan" element={<YoungPlan/>} />
        <Route path="/Beca" element={<Beca/>} />
        <Route path="/Certificado" element={<CertificatePage/>} />

      </Routes>
    </Router>
  );
}

export default App;
