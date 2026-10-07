export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];
export const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];

export const EMPTY_PROFILE = {
  fullName: '',
  dateOfBirth: '',
  age: '',
  gender: '',
  bloodGroup: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  emergencyContactRelationship: '',
  allergies: '',
  medicalConditions: '',
  medications: '',
  medicalHistory: '',
  vaccinations: [],
};

// Fields that count towards the "profile completion" percentage.
const IMPORTANT_FIELDS = [
  'fullName',
  'dateOfBirth',
  'age',
  'gender',
  'bloodGroup',
  'emergencyContactName',
  'emergencyContactPhone',
  'emergencyContactRelationship',
];

export function profileCompletion(profile) {
  if (!profile) return 0;
  const filled = IMPORTANT_FIELDS.filter((key) => String(profile[key] ?? '').trim() !== '').length;
  return Math.round((filled / IMPORTANT_FIELDS.length) * 100);
}

export function calculateAge(dateString) {
  if (!dateString) return '';
  const dob = new Date(dateString);
  if (Number.isNaN(dob.getTime())) return '';
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age -= 1;
  return age >= 0 ? String(age) : '';
}
