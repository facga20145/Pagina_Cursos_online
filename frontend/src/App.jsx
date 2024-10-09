import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/Login.jsx';
import Register from './components/Register.jsx';
import LandingPage from './components/LandingPage.jsx';
import Premium from './components/Premiun/Premium.jsx'
import Dashboard from '../src/components/Dashboard.jsx';
import DemoLandingPage from './components/DemoLandingPage.jsx'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landingpage" element={<LandingPage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/premium" element={<Premium />} />
        <Route path='/register' element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/demolandingpage" element={<DemoLandingPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
