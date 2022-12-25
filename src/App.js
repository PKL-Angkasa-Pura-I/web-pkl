import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Pengajuan from './pages/Pengajuan';
import PengajuanProfile from './pages/PengajuanProfile';
import TambahPengjuan from './pages/TambahPengajuan';
import Form from './pages/Form';
import Logout from './pages/Logout';
import FormBidangKeahlian from './pages/FormBidangKeahlian';
import axios from 'axios';
import Editkuota from './pages/Editkuota';
import UserHome from './pages/user/UserHome';
import CekAjuan from './pages/user/CekAjuan';
import Pendaftaran from './pages/user/Pendaftaran';
import FAQ from './pages/user/FAQ';
import EditBidangKeahlian from './pages/EditBidangKeahlian';
import ChangePassword from './pages/ChangePassword';

function App() {
  (function() {
    const token = localStorage.getItem('ap_data') ? JSON.parse(localStorage.getItem('ap_data')).token : undefined
    if(token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    }
  })();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/cekajuan" element={<CekAjuan />} />
        <Route path="/daftar" element={<Pendaftaran />} />
        <Route path="/faq" element={<FAQ />} />


        <Route path="/admin" element={<Home />} />
        <Route path="/admin/ChangePassword" element={<ChangePassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editkuota" element={<Editkuota />} />
        <Route path="/editBidangKeahlian" element={<EditBidangKeahlian />} />
        <Route path="/editkuota/:id" element={<FormBidangKeahlian />} />
        <Route path="/pengajuan" element={<Pengajuan />} />
        <Route path="/tambah" element={<TambahPengjuan/>} />
        <Route path="/profile/:id" element={<PengajuanProfile />} />
        <Route path="/Form/:id" element={<Form/>} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
