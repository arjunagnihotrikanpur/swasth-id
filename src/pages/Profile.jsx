import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, createUserProfile, updateUserProfile } from '../services/userService';
import { PROFILE_LOAD_ERROR, PROFILE_SAVE_ERROR } from '../utils/errors';
import ProfileForm from '../components/ProfileForm';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState({ type: 'success', message: '' });

  // Load any existing profile so it can be edited.
  useEffect(() => {
    let cancelled = false;
    getUserProfile(user.uid)
      .then((data) => !cancelled && setProfile(data))
      .catch(() => !cancelled && setLoadError(PROFILE_LOAD_ERROR))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [user.uid]);

  const handleSave = async (formData) => {
    setSaving(true);
    setNotice({ type: 'success', message: '' });
    try {
      if (profile) {
        await updateUserProfile(user.uid, formData);
      } else {
        await createUserProfile(user.uid, formData);
      }
      setProfile({ ...(profile || {}), ...formData });
      setNotice({ type: 'success', message: 'Profile saved. Your QR code now shows the latest information.' });
    } catch {
      setNotice({ type: 'error', message: PROFILE_SAVE_ERROR });
    } finally {
      setSaving(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) return <LoadingSpinner label="Loading your profile..." fullPage />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to dashboard
      </Link>
      <h1 className="mt-3 text-3xl font-extrabold text-gray-900">
        {profile ? 'Edit Medical Profile' : 'Create Medical Profile'}
      </h1>
      <p className="mt-1 text-gray-600">
        This information will be visible to anyone who scans your QR code.
      </p>

      <div className="mt-6 space-y-6">
        {loadError && <Toast type="error" message={loadError} />}
        <Toast type={notice.type} message={notice.message} />
        {!loadError && <ProfileForm initialData={profile} onSubmit={handleSave} saving={saving} />}
      </div>
    </div>
  );
}
