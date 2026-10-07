import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

// One collection: "users". The document ID is the Firebase Auth UID.
const COLLECTION = 'users';

// Read one profile. Returns null when it does not exist.
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, COLLECTION, uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// Create a brand-new profile for this user.
export async function createUserProfile(uid, data) {
  await setDoc(doc(db, COLLECTION, uid), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

// Update an existing profile.
export async function updateUserProfile(uid, data) {
  await updateDoc(doc(db, COLLECTION, uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}
