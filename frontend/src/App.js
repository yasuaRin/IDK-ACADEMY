import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import UploadScorePage from './pages/UploadScorePage';
import ScoreHistoryPage from './pages/ScoreHistoryPage';
import PrivateRoute from './components/PrivateRoute';
import { useSelector } from 'react-redux';


export default function App() {

  const reduxAuth = useSelector(s => s.auth.isAuthenticated);
  const localAuth = !!localStorage.getItem('token');
  const auth = reduxAuth || localAuth;

  return (
    <Router>
      <Routes>
        <Route path="/" element={auth ? <DashboardPage /> : <LoginPage />} />
        <Route path="/:token" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/upload" element={<PrivateRoute><UploadScorePage /></PrivateRoute>} />
        <Route path="/scores" element={<PrivateRoute><ScoreHistoryPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}
