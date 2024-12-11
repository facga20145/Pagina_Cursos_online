import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landings/Landing/Landing.jsx'
import Login from '../src/components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import LandingPage from './components/Landings/LandingAdult/LandingPage.jsx';
import Premium from './components/Premiun/Premium.jsx';
import LandingYoung from './components/Landings/LandingYoung/LandingYoung.jsx';
import ManageUsers from './components/Admin/ManageUsers';
import ManageScholarships from './components/Admin/ManageScholarships';
import UploadVideos from './components/Admin/UploadVideos';
import './App.css';
import Childlandingpage from './components/Landings/Landingkids/Childlandingpage.jsx';
import PlanesKids from './components/WebCart/WebCartKids/PlanesKids.jsx';
import Comunidad from './components/Comunidad/comunidad.jsx';
import Foro from './components/Foro/foro.jsx';
import Admin from './components/Admin/Admin.jsx';
import Profile from './components/UserProfile/Profile.jsx';     

// Importamos las nuevas páginas de los cursos
import HtmlKids from './components/paginasCursos/paginasNiños/HtmlKids.jsx';
import CssKids from './components/paginasCursos/paginasNiños/CssKids.jsx';
import JavaKids from './components/paginasCursos/paginasNiños/JavaKids.jsx';
import PhpKids from './components/paginasCursos/paginasNiños/PhpKids.jsx';
import JavaScriptKids from './components/paginasCursos/paginasNiños/JavaScriptKids.jsx';
import PythonKids from './components/paginasCursos/paginasNiños/PythonKids.jsx';
import Pago from './components/Pago/pagoKids/Pago.jsx';
import CourseDetail from './components/paginasCursos/CourseDetail.jsx';

import KidPlan from './components/Planes Pago/KidPlan.jsx';
import YoungPlan from './components/Planes Pago/YoungPlan.jsx';
import Beca from './components/becas/beca.jsx';
import CertificatePage from './components/Certificado/CertifactePage.jsx'
import RutasPage from './components/Rutas/RutasPage/RutasPage.jsx';
import CoursePayment from "./components/pagoCurso/CoursePayment.jsx";

//Impotacion para el quizz
import Quiz from './components/Quizz/Quiz.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landingyoung" element={<LandingYoung />} />
        <Route path="/menu" element={<LandingPage/>} />
        <Route path='/'element={<Landing/>}/>
        <Route path='/childlandingpage' element={<Childlandingpage/>}/>
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
        <Route path="/Quiz" element={<Quiz/>} />
        <Route path="/Certificado" element={<CertificatePage/>} />
        <Route path="/RutasPage" element={<RutasPage/>} />
        <Route path="/curso/:idCurso" element={<CourseDetail />} />
        <Route path="/pago-curso" element={<CoursePayment />} />

      </Routes>
    </Router>
  );
}

export default App;
