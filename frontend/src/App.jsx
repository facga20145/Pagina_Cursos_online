import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/Login.jsx';
import Register from './components/Register.jsx';
import LandingPage from './components/LandingPage.jsx';
import Premium from './components/Premiun/Premium.jsx'
import Dashboard from '../src/components/Dashboard.jsx';
import LandingYoung from './components/Landings/LandingYoung.jsx'
import './App.css';
import Childlandingpage from './components/childlandingpage.jsx';

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
      </Routes>
    </Router>
  );
}

export default App;
