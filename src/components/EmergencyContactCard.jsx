import { Phone, UserRound } from 'lucide-react';

export default function EmergencyContactCard({ name, relationship, phone }) {
  const hasContact = name || phone;

  return (
    <section className="rounded-xl border-2 border-red-200 bg-red-50 p-5 shadow-sm sm:p-6">
      <h2 className="mb-3 flex items-center gap-3 text-lg font-bold text-gray-900">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-600">
          <UserRound className="h-5 w-5" aria-hidden="true" />
        </span>
        Emergency Contact
      </h2>

      {hasContact ? (
        <>
          {name && <p className="text-2xl font-extrabold text-gray-900">{name}</p>}
          {relationship && <p className="text-lg text-gray-700">Relationship: {relationship}</p>}
          {phone && (
            <>
              <p className="mt-1 text-xl font-semibold text-gray-900">{phone}</p>
              <a
                href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                className="btn-danger mt-4 w-full !py-4 text-lg"
              >
                <Phone className="h-6 w-6" aria-hidden="true" />
                CALL CONTACT
              </a>
            </>
          )}
        </>
      ) : (
        <p className="text-lg text-gray-700">No emergency contact has been saved.</p>
      )}
    </section>
  );
}
