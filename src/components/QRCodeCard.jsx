import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Eye } from 'lucide-react';

// Shows the user's QR code. The QR only contains a link - never medical data.
export default function QRCodeCard({ userId }) {
  const wrapperRef = useRef(null);
  const emergencyUrl = `${window.location.origin}/emergency/${userId}`;

  const handleDownload = () => {
    const canvas = wrapperRef.current?.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'mediqr-emergency-qr.png';
    link.click();
  };

  return (
    <div className="card text-center">
      <h2 className="text-xl font-bold text-gray-900">Your Emergency QR</h2>
      <p className="mx-auto mt-2 max-w-xs text-sm text-gray-600">
        Anyone can scan this code to see your emergency medical information. No login needed.
        Keep it in your wallet, phone case, ID card or keychain.
      </p>

      <div
        ref={wrapperRef}
        className="mx-auto mt-5 inline-block rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
      >
        <QRCodeCanvas
          value={emergencyUrl}
          size={512}
          level="M"
          marginSize={2}
          fgColor="#0f172a"
          bgColor="#ffffff"
          style={{ width: 220, height: 220 }}
          role="img"
          aria-label="QR code that opens your emergency medical profile"
        />
      </div>

      <p className="mx-auto mt-3 max-w-xs break-all text-xs text-gray-500">{emergencyUrl}</p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button type="button" onClick={handleDownload} className="btn-primary">
          <Download className="h-4 w-4" aria-hidden="true" />
          Download QR
        </button>
        <Link to={`/emergency/${userId}`} className="btn-secondary">
          <Eye className="h-4 w-4" aria-hidden="true" />
          View Emergency Profile
        </Link>
      </div>
    </div>
  );
}
