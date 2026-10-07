import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Droplets,
  FileText,
  Phone,
  UserPlus,
  QrCode,
  ScanLine,
  HeartPulse,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const steps = [
  { icon: UserPlus, title: 'Create', text: 'Create your medical profile.' },
  { icon: QrCode, title: 'Get Your QR', text: 'Receive a unique QR connected to your profile.' },
  { icon: ScanLine, title: 'Scan in an Emergency', text: 'Anyone can scan the QR to view emergency information.' },
];

const features = [
  { icon: ShieldAlert, title: 'Emergency Ready', text: 'Opens instantly on any phone camera.', color: 'bg-red-50 text-red-600' },
  { icon: Droplets, title: 'Blood Group', text: 'Shown first, in large clear type.', color: 'bg-blue-50 text-blue-600' },
  { icon: FileText, title: 'Medical History', text: 'Allergies, conditions and medicines.', color: 'bg-teal-50 text-teal-600' },
  { icon: Phone, title: 'Emergency Contact', text: 'One tap to call a family member.', color: 'bg-amber-50 text-amber-700' },
];

// A small CSS-only preview of the emergency page, shown in the hero.
function PhonePreview() {
  return (
    <div className="mx-auto w-64 rotate-2 rounded-[2rem] border-8 border-gray-900 bg-gray-50 p-3 shadow-2xl sm:w-72" aria-hidden="true">
      <div className="rounded-xl bg-red-600 px-3 py-2 text-center text-xs font-extrabold tracking-wide text-white">
        EMERGENCY MEDICAL PROFILE
      </div>
      <div className="mt-3 text-center">
        <p className="text-lg font-extrabold text-gray-900">Arjun Agnihotri</p>
        <p className="text-sm text-gray-600">Age 20</p>
      </div>
      <div className="mt-3 rounded-xl bg-red-50 py-3 text-center">
        <p className="text-xs font-semibold text-red-700">Blood Group</p>
        <p className="text-4xl font-extrabold text-red-600">O+</p>
      </div>
      <div className="mt-3 space-y-2">
        <div className="rounded-lg bg-white p-2 text-xs text-gray-700 shadow-sm">
          <span className="font-bold">Allergies:</span> No known allergies
        </div>
        <div className="rounded-lg bg-white p-2 text-xs text-gray-700 shadow-sm">
          <span className="font-bold">Vaccinations:</span> COVID-19, Tetanus
        </div>
      </div>
      <div className="mt-3 rounded-xl bg-red-600 py-2 text-center text-xs font-bold text-white">
        CALL CONTACT
      </div>
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-gray-50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-blue-700 shadow-sm ring-1 ring-blue-100">
              <HeartPulse className="h-4 w-4 text-teal-500" aria-hidden="true" />
              Emergency medical information
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
              Your medical information. One scan away.
            </h1>
            <p className="mt-4 max-w-lg text-lg text-gray-600">
              Create a personal emergency medical profile and connect it to a unique QR code.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={user ? '/dashboard' : '/register'} className="btn-primary !py-4 text-base">
                Create Your MediQR
              </Link>
              <a href="#how-it-works" className="btn-secondary !py-4 text-base">
                How It Works
              </a>
            </div>
          </div>
          <PhonePreview />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">How It Works</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-gray-600">
          Three simple steps from sign-up to a code you can carry anywhere.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="card text-center transition hover:-translate-y-1 hover:shadow-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">{i + 1}. {title}</h3>
              <p className="mt-2 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">What a responder sees</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, text, color }) => (
              <div key={title} className="rounded-xl border border-gray-200 p-5 transition hover:shadow-md">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-bold text-gray-900">{title}</h3>
                <p className="mt-1 text-sm text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-3xl font-extrabold text-gray-900">Ready in two minutes</h2>
        <p className="mx-auto mt-2 max-w-lg text-gray-600">
          Make an account, fill in your details, and download your QR code.
        </p>
        <Link to={user ? '/dashboard' : '/register'} className="btn-primary mt-6 !py-4 text-base">
          Create Your MediQR
        </Link>
      </section>
    </div>
  );
}
