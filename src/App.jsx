import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { isFirebaseConfigured } from './firebase/config';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import EmergencyProfile from './pages/EmergencyProfile';

// Shown instead of the app if the .env file has not been filled in yet.
function SetupNotice() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20">
      <div className="card border-amber-300">
        <h1 className="text-2xl font-extrabold text-gray-900">Firebase is not set up yet</h1>
        <p className="mt-2 text-gray-700">
          Copy <code className="rounded bg-gray-100 px-1.5 py-0.5">.env.example</code> to{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5">.env</code>, paste your Firebase web
          app values into it, then stop and restart <code className="rounded bg-gray-100 px-1.5 py-0.5">npm run dev</code>.
        </p>
        <p className="mt-2 text-sm text-gray-600">The README explains exactly where to find these values.</p>
      </div>
    </div>
  );
}

export default function App() {
  if (!isFirebaseConfigured) return <SetupNotice />;

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/emergency/:userId" element={<EmergencyProfile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
