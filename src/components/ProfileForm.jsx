import { useState } from 'react';
import { Save } from 'lucide-react';
import VaccinationList from './VaccinationList';
import { BLOOD_GROUPS, GENDERS, EMPTY_PROFILE, calculateAge } from '../utils/profile';

function Section({ title, description, children }) {
  return (
    <fieldset className="card">
      <legend className="sr-only">{title}</legend>
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({ id, label, required, full, children }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="label">
        {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function ProfileForm({ initialData, onSubmit, saving }) {
  const [form, setForm] = useState({
    ...EMPTY_PROFILE,
    ...initialData,
    vaccinations: initialData?.vaccinations ?? [],
  });

  const setField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));
  const handleChange = (e) => setField(e.target.name, e.target.value);

  // When the date of birth changes, fill in the age automatically (still editable).
  const handleDobChange = (e) => {
    const dob = e.target.value;
    setForm((prev) => ({ ...prev, dateOfBirth: dob, age: calculateAge(dob) || prev.age }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = {
      ...form,
      fullName: form.fullName.trim(),
      emergencyContactName: form.emergencyContactName.trim(),
      emergencyContactPhone: form.emergencyContactPhone.trim(),
      emergencyContactRelationship: form.emergencyContactRelationship.trim(),
      allergies: form.allergies.trim(),
      medicalConditions: form.medicalConditions.trim(),
      medications: form.medications.trim(),
      medicalHistory: form.medicalHistory.trim(),
      age: form.age === '' ? '' : Number(form.age),
      vaccinations: form.vaccinations
        .map((v) => ({ name: v.name.trim(), date: v.date }))
        .filter((v) => v.name !== ''),
    };
    onSubmit(cleaned);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Section title="Personal Information">
        <Field id="fullName" label="Full Name" required full>
          <input id="fullName" name="fullName" className="input" required value={form.fullName} onChange={handleChange} placeholder="e.g. Arjun Agnihotri" autoComplete="name" />
        </Field>
        <Field id="dateOfBirth" label="Date of Birth">
          <input id="dateOfBirth" name="dateOfBirth" type="date" className="input" value={form.dateOfBirth} onChange={handleDobChange} autoComplete="bday" />
        </Field>
        <Field id="age" label="Age">
          <input id="age" name="age" type="number" min="0" max="120" className="input" value={form.age} onChange={handleChange} placeholder="Years" />
        </Field>
        <Field id="gender" label="Gender">
          <select id="gender" name="gender" className="input" value={form.gender} onChange={handleChange}>
            <option value="">Select gender</option>
            {GENDERS.map((g) => (<option key={g} value={g}>{g}</option>))}
          </select>
        </Field>
      </Section>

      <Section title="Emergency Information" description="This is the first thing a responder will look for.">
        <Field id="bloodGroup" label="Blood Group" required>
          <select id="bloodGroup" name="bloodGroup" className="input" required value={form.bloodGroup} onChange={handleChange}>
            <option value="">Select blood group</option>
            {BLOOD_GROUPS.map((b) => (<option key={b} value={b}>{b}</option>))}
          </select>
        </Field>
        <Field id="emergencyContactRelationship" label="Relationship">
          <input id="emergencyContactRelationship" name="emergencyContactRelationship" className="input" value={form.emergencyContactRelationship} onChange={handleChange} placeholder="e.g. Father, Mother, Friend" />
        </Field>
        <Field id="emergencyContactName" label="Emergency Contact Name" required>
          <input id="emergencyContactName" name="emergencyContactName" className="input" required value={form.emergencyContactName} onChange={handleChange} placeholder="Contact's full name" />
        </Field>
        <Field id="emergencyContactPhone" label="Emergency Contact Phone Number" required>
          <input id="emergencyContactPhone" name="emergencyContactPhone" type="tel" className="input" required pattern="[0-9+\-\s()]{7,20}" title="Enter a valid phone number (7 to 20 digits)" value={form.emergencyContactPhone} onChange={handleChange} placeholder="e.g. 9876543210" autoComplete="tel" />
        </Field>
      </Section>

      <Section title="Medical Information" description="Leave a box empty if it does not apply to you.">
        <Field id="allergies" label="Allergies" full>
          <textarea id="allergies" name="allergies" rows={2} className="input" value={form.allergies} onChange={handleChange} placeholder="e.g. Penicillin, peanuts" />
        </Field>
        <Field id="medicalConditions" label="Medical Conditions" full>
          <textarea id="medicalConditions" name="medicalConditions" rows={2} className="input" value={form.medicalConditions} onChange={handleChange} placeholder="e.g. Asthma, diabetes" />
        </Field>
        <Field id="medications" label="Current Medications" full>
          <textarea id="medications" name="medications" rows={2} className="input" value={form.medications} onChange={handleChange} placeholder="Medicine names and doses, if any" />
        </Field>
        <Field id="medicalHistory" label="Previous Medical History" full>
          <textarea id="medicalHistory" name="medicalHistory" rows={3} className="input" value={form.medicalHistory} onChange={handleChange} placeholder="Past surgeries, major illnesses, etc." />
        </Field>
      </Section>

      <fieldset className="card">
        <legend className="sr-only">Vaccinations</legend>
        <h2 className="text-lg font-bold text-gray-900">Vaccinations</h2>
        <p className="mt-1 mb-5 text-sm text-gray-600">Add each vaccine you have received.</p>
        <VaccinationList value={form.vaccinations} onChange={(list) => setField('vaccinations', list)} />
      </fieldset>

      <div className="flex justify-end">
        <button type="submit" disabled={saving} className="btn-primary w-full sm:w-auto">
          <Save className="h-4 w-4" aria-hidden="true" />
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
  );
}
