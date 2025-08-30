import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Internships from './pages/Internships';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentDashboard from './dashboard/StudentDashboard';
import AdminDashboard from './dashboard/AdminDashboard';
import { isAuthenticated, getCurrentUser } from './utils/auth';
import Layout from './components/Layout';

function PrivateRoute({ children, role }) {
  const user = getCurrentUser();
  if (!isAuthenticated() || !user || user.role !== role) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Layout noContainer><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/internships" element={<Layout><Internships /></Layout>} />
      {/* Private routes with role-based access */}
      <Route
        path="/student/dashboard"
        element={
          <PrivateRoute role="student">
            <StudentDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;
