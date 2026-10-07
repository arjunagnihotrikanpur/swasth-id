import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { friendlyAuthError } from '../utils/errors';
import Toast from '../components/Toast';

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user && !loading) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Your password must be at least 6 characters long.');
      return;
    }
    if (password !== confirm) {
      setError('The two passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await register(email.trim(), password);
      navigate('/dashboard');
    } catch (err) {
      setError(friendlyAuthError(err));
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <div className="card w-full">
        <h1 className="text-2xl font-extrabold text-gray-900">Create your account</h1>
        <p className="mt-1 text-gray-600">Next, you will fill in your emergency profile.</p>

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
              <input id="password" type="password" required autoComplete="new-password" className="input !pl-11" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
            </div>
          </div>
          <div>
            <label htmlFor="confirm" className="label">Confirm password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              <input id="confirm" type="password" required autoComplete="new-password" className="input !pl-11" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Type the password again" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
