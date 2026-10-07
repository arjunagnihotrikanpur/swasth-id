import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { friendlyAuthError } from '../utils/errors';
import Toast from '../components/Toast';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user && !loading) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/dashboard');
    } catch (err) {
      setError(friendlyAuthError(err));
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <div className="card w-full">
        <h1 className="text-2xl font-extrabold text-gray-900">Welcome back</h1>
        <p className="mt-1 text-gray-600">Log in to manage your emergency profile.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <Toast type="error" message={error} />
          <div>
            <label htmlFor="email" className="label">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              <input id="email" type="email" required autoComplete="email" className="input !pl-11" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="label">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              <input id="password" type="password" required autoComplete="current-password" className="input !pl-11" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          New to MediQR?{' '}
          <Link to="/register" className="font-semibold text-blue-600 hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
