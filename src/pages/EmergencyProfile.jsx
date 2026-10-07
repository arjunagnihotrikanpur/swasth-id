import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Droplets, ShieldAlert, Stethoscope, Pill, FileText, Syringe, SearchX, AlertTriangle } from 'lucide-react';
import { getUserProfile } from '../services/userService';
import LoadingSpinner from '../components/LoadingSpinner';
import MedicalCard from '../components/MedicalCard';
import EmergencyContactCard from '../components/EmergencyContactCard';

// Public page - no login needed. Opened when someone scans the QR code.
export default function EmergencyProfile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | notfound | error

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    getUserProfile(userId)
      .then((data) => {
        if (cancelled) return;
        if (data) {
          setProfile(data);
          setStatus('ready');
        } else {
          setStatus('notfound');
        }
      })
      .catch(() => !cancelled && setStatus('error'));
    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (status === 'loading') {
    return <LoadingSpinner label="Loading emergency information..." fullPage />;
  }

  if (status === 'notfound') {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <SearchX className="mx-auto h-14 w-14 text-gray-400" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-extrabold text-gray-900">Profile not found</h1>
        <p className="mt-2 text-gray-600">
          This QR code may be invalid, or the profile may no longer exist.
        </p>
        <Link to="/" className="btn-secondary mt-6">Go to MediQR home</Link>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <AlertTriangle className="mx-auto h-14 w-14 text-amber-500" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-extrabold text-gray-900">Could not load profile</h1>
        <p className="mt-2 text-gray-600">
          Check your internet connection and scan the code again.
        </p>
        <button type="button" onClick={() => window.location.reload()} className="btn-primary mt-6">
          Try again
        </button>
      </div>
    );
  }

  const {
    fullName, age, bloodGroup, allergies, medicalConditions, medications,
    medicalHistory, vaccinations = [], emergencyContactName,
    emergencyContactPhone, emergencyContactRelationship,
  } = profile;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:py-10">
      {/* Header */}
      <header className="rounded-xl bg-red-600 p-5 text-center text-white shadow-md">
        <p className="flex items-center justify-center gap-2 text-sm font-extrabold tracking-wide sm:text-base">
          <ShieldAlert className="h-5 w-5" aria-hidden="true" />
          EMERGENCY MEDICAL PROFILE
        </p>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{fullName || 'Name not provided'}</h1>
        {age !== '' && age !== undefined && <p className="mt-1 text-xl font-semibold">Age: {age}</p>}
      </header>

      <div className="mt-5 space-y-5">
        {/* Blood group */}
        <section className="rounded-xl border-2 border-red-200 bg-white p-6 text-center shadow-sm" aria-label="Blood group">
          <p className="flex items-center justify-center gap-2 text-lg font-bold text-gray-700">
            <Droplets className="h-6 w-6 text-red-500" aria-hidden="true" />
            Blood Group
          </p>
          <p className="mt-1 text-7xl font-extrabold text-red-600">{bloodGroup || 'Unknown'}</p>
        </section>

        <MedicalCard title="Allergies" icon={ShieldAlert} tone="red">
          {allergies ? <p className="whitespace-pre-line font-semibold">{allergies}</p> : <p className="text-gray-600">No known allergies</p>}
        </MedicalCard>

        <MedicalCard title="Medical Conditions" icon={Stethoscope} tone="blue">
          {medicalConditions ? <p className="whitespace-pre-line font-semibold">{medicalConditions}</p> : <p className="text-gray-600">No known medical conditions</p>}
        </MedicalCard>

        <MedicalCard title="Current Medications" icon={Pill} tone="teal">
          {medications ? <p className="whitespace-pre-line font-semibold">{medications}</p> : <p className="text-gray-600">No current medications</p>}
        </MedicalCard>

        {medicalHistory && (
          <MedicalCard title="Medical History" icon={FileText} tone="amber">
            <p className="whitespace-pre-line">{medicalHistory}</p>
          </MedicalCard>
        )}

        {vaccinations.length > 0 && (
          <MedicalCard title="Vaccinations" icon={Syringe} tone="teal">
            <ul className="space-y-1.5">
              {vaccinations.map((v, i) => (
                <li key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-gray-100 pb-1.5 last:border-0">
                  <span className="font-semibold">{v.name}</span>
                  {v.date && <span className="text-base text-gray-600">{v.date}</span>}
                </li>
              ))}
            </ul>
          </MedicalCard>
        )}

        <EmergencyContactCard
          name={emergencyContactName}
          relationship={emergencyContactRelationship}
          phone={emergencyContactPhone}
        />

        {/* Disclaimer */}
        <aside className="rounded-xl border border-amber-300 bg-amber-50 p-5 text-amber-900">
          <p className="flex items-center gap-2 font-bold">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            Important
          </p>
          <p className="mt-1 text-sm leading-relaxed">
            This information is provided for emergency reference only. It may not be complete or up
            to date. Always contact qualified medical professionals in an emergency.
          </p>
        </aside>
      </div>
    </div>
  );
}
