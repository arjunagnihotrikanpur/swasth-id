// Turns raw Firebase error codes into friendly messages. Raw errors are never shown to users.
export function friendlyAuthError(error) {
  // Real error stays in the browser console for debugging; users see the friendly text.
  console.error('Firebase auth error:', error?.code, error?.message);
  switch (error?.code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
    case 'auth/invalid-login-credentials':
      return 'Incorrect email or password. Please check and try again.';
    case 'auth/invalid-email':
      return 'That email address does not look right.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Try logging in instead.';
    case 'auth/weak-password':
      return 'Please choose a stronger password (at least 6 characters).';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.';
    case 'auth/operation-not-allowed':
    case 'auth/configuration-not-found':
      return 'Email/Password sign-in is not enabled in Firebase yet. In the Firebase Console open Authentication > Sign-in method and enable Email/Password.';
    case 'auth/invalid-api-key':
    case 'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
      return 'The Firebase API key in your .env file is not valid. Copy it again from Project settings and restart npm run dev.';
    case 'auth/network-request-failed':
      return 'Network problem. Check your internet connection and try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

export const PROFILE_LOAD_ERROR =
  'We could not load your profile. Check your internet connection and try again.';
export const PROFILE_SAVE_ERROR =
  'We could not save your profile. Please try again in a moment.';
