import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
export default ({ children }) => {
  const auth = useSelector(s => s.auth.isAuthenticated);
  return auth ? children : <Navigate to="/" />;
};
