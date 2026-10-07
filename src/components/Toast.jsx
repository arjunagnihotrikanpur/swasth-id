import { CheckCircle2, AlertTriangle } from 'lucide-react';

// Simple notification banner. type: "success" | "error"
export default function Toast({ type = 'success', message }) {
  if (!message) return null;
  const isSuccess = type === 'success';

  return (
    <div
      role={isSuccess ? 'status' : 'alert'}
      className={`flex items-start gap-3 rounded-xl border p-4 text-sm font-medium ${
        isSuccess
          ? 'border-teal-200 bg-teal-50 text-teal-800'
          : 'border-red-200 bg-red-50 text-red-700'
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      ) : (
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      )}
      <span>{message}</span>
    </div>
  );
}
