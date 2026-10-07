import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ label = 'Loading...', fullPage = false }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-3 text-gray-600 ${
        fullPage ? 'min-h-[60vh]' : 'py-10'
      }`}
    >
      <Loader2 className="h-9 w-9 animate-spin text-blue-600" aria-hidden="true" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
