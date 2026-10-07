import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

// Wrap a page with this to make it login-only.
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner label="Checking your login..." fullPage />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
