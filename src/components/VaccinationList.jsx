import { Plus, Trash2 } from 'lucide-react';

// Dynamic list: add and remove vaccination entries.
export default function VaccinationList({ value, onChange }) {
  const updateItem = (index, field, newValue) => {
    onChange(value.map((item, i) => (i === index ? { ...item, [field]: newValue } : item)));
  };
  const addItem = () => onChange([...value, { name: '', date: '' }]);
  const removeItem = (index) => onChange(value.filter((_, i) => i !== index));

  return (
    <div className="space-y-3">
      {value.length === 0 && (
        <p className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-600">
          No vaccinations added yet. Use the button below to add one.
        </p>
      )}

      {value.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-1 gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 sm:grid-cols-[1fr_190px_auto] sm:items-end"
        >
          <div>
            <label htmlFor={`vac-name-${index}`} className="label">Vaccine name</label>
            <input
              id={`vac-name-${index}`}
              className="input"
              type="text"
              placeholder="e.g. COVID-19, Tetanus"
              value={item.name}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`vac-date-${index}`} className="label">Date (optional)</label>
            <input
              id={`vac-date-${index}`}
              className="input"
              type="date"
              value={item.date}
              onChange={(e) => updateItem(index, 'date', e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="btn-secondary !px-3 !py-3 text-red-600"
            aria-label={`Remove vaccination ${index + 1}`}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            <span className="sm:hidden">Remove</span>
          </button>
        </div>
      ))}

      <button type="button" onClick={addItem} className="btn-secondary">
        <Plus className="h-4 w-4" aria-hidden="true" />
        Add vaccination
      </button>
    </div>
  );
}
