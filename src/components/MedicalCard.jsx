// A big, easy-to-read card used on the public emergency page.
export default function MedicalCard({ title, icon: Icon, children, tone = 'blue' }) {
  const tones = {
    blue: 'bg-blue-50 text-blue-700',
    red: 'bg-red-50 text-red-600',
    teal: 'bg-teal-50 text-teal-700',
    amber: 'bg-amber-50 text-amber-700',
  };

  return (
    <section className="card !p-5 sm:!p-6">
      <h2 className="mb-3 flex items-center gap-3 text-lg font-bold text-gray-900">
        {Icon && (
          <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${tones[tone]}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
        {title}
      </h2>
      <div className="text-lg leading-relaxed text-gray-800">{children}</div>
    </section>
  );
}
