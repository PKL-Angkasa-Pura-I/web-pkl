import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/admin/Home';
import Login from './pages/admin/Login';
import Editkuota from './pages/admin/Editkuota';
import UserHome from './pages/user/UserHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/admin" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editkuota" element={<Editkuota />} />
      </Routes>
    </Router>
  );
}

export default App;
