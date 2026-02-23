import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import NoticeManagement from './components/NoticeTable';
import ComplaintManagement from './components/ComplaintTable';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<AdminLogin />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/notices" element={<NoticeManagement />} />
            <Route path="/complaints" element={<ComplaintManagement />} />
            {/* Fallback to login */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;