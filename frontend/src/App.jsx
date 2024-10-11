import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/Login.jsx';
import Register from './components/Register.jsx';
import LandingPage from './components/LandingPage.jsx';
import Premium from './components/Premiun/Premium.jsx'
import Dashboard from '../src/components/Dashboard.jsx';
import LandingYoung from './components/Landings/LandingYoung.jsx'
import './App.css';
import Childlandingpage from './components/childlandingpage.jsx';
import DemoLandingPage from './components/DemoLandingPage.jsx'
import Administrador from './components/Administrador.jsx';
import PlanesKids from './components/PlanesKids.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landingpage" element={<LandingPage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/premium" element={<Premium />} />
        <Route path='/register' element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/landingyoung" element={<LandingYoung />} />
        <Route path="/" element={<LandingPage />} />
        <Route path='/childlandingpage' element={<Childlandingpage/>}/>
        <Route path="/DemoLandingPage" element={<DemoLandingPage />} />
        <Route path='/admin' element={<Administrador/>} />
        <Route path='/planesKids' element={<PlanesKids/>} />
      </Routes>
    </Router>
  );
}

export default App;
