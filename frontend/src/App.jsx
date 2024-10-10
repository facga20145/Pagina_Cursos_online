import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/Login.jsx';
import Register from './components/Register.jsx';
import LandingPage from './components/LandingPage.jsx';
import Dashboard from '../src/components/Dashboard.jsx';
import DemoLandingPage from './components/DemoLandingPage.jsx'
import './App.css';
import Childlandingpage from './components/childlandingpage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landingpage" element={<LandingPage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/demolandingpage" element={<DemoLandingPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path='/childlandingpage' element={<Childlandingpage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
