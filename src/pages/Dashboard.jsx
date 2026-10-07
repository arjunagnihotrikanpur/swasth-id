import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pencil, LogOut, Droplets, UserRound, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../services/userService';
import { profileCompletion } from '../utils/profile';
import { PROFILE_LOAD_ERROR } from '../utils/errors';
import QRCodeCard from '../components/QRCodeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';

function SummaryRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-500">{label}</p>
        <p className="truncate font-semibold text-gray-900">{value || 'Not added yet'}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    getUserProfile(user.uid)
      .then((data) => !cancelled && setProfile(data))
      .catch(() => !cancelled && setError(PROFILE_LOAD_ERROR))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [user.uid]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) return <LoadingSpinner label="Loading your dashboard..." fullPage />;

  const completion = profileCompletion(profile);
  const firstName = profile?.fullName?.split(' ')[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Welcome{firstName ? `, ${firstName}` : ''}
          </h1>
          <p className="mt-1 text-gray-600">{user.email}</p>
        </div>
        <div className="flex gap-3">
          <Link to="/profile" className="btn-primary">
            <Pencil className="h-4 w-4" aria-hidden="true" />
            {profile ? 'Edit Profile' : 'Create Profile'}
          </Link>
          <button type="button" onClick={handleLogout} className="btn-secondary">
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </button>
        </div>
      </div>

      {error && <div className="mt-6"><Toast type="error" message={error} /></div>}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900">Profile Summary</h2>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-gray-700">Profile completion</span>
              <span className="text-blue-700">{completion}%</span>
            </div>
            <div
              className="mt-2 h-3 overflow-hidden rounded-full bg-gray-200"
              role="progressbar"
              aria-valuenow={completion}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Profile completion"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-teal-500 transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          {profile ? (
            <div className="mt-5 space-y-3">
              <SummaryRow icon={UserRound} label="Name" value={profile.fullName} />
              <SummaryRow icon={Droplets} label="Blood group" value={profile.bloodGroup} />
              <SummaryRow
                icon={Phone}
                label="Emergency contact"
                value={
                  profile.emergencyContactName
                    ? `${profile.emergencyContactName}${profile.emergencyContactRelationship ? ` (${profile.emergencyContactRelationship})` : ''}`
                    : ''
                }
              />
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-blue-300 bg-blue-50 p-5">
              <p className="font-semibold text-blue-900">You have not created your profile yet.</p>
              <p className="mt-1 text-sm text-blue-800">
                Fill in your medical details to activate your QR code.
              </p>
              <Link to="/profile" className="btn-primary mt-4">Create Profile</Link>
            </div>
          )}
        </div>

        <QRCodeCard userId={user.uid} />
      </div>

      {!profile && (
        <p className="mt-4 text-sm text-gray-600">
          Your QR code is ready, but the emergency page stays empty until you create your profile.
        </p>
      )}
    </div>
  );
}
