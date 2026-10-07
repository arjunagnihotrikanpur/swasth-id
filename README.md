# Swasth ID - Your medical information. One scan away.

> **This project is intended only as a college demonstration. It is NOT a production-ready medical information system. Real medical information is highly sensitive and would require strong authentication, authorization, encryption, auditing, privacy controls, consent management, secure infrastructure, and compliance with applicable laws and regulations.**

## 1. Project overview

Swasth ID is a simple emergency medical information system. Every registered person gets a unique QR code that can be kept in a wallet, phone case, ID card or keychain. If that person is in an accident, anyone can scan the QR code (no login needed) and instantly see a clear emergency page with blood group, allergies, medical conditions, medications, vaccinations and an emergency contact with a one-tap **CALL CONTACT** button.

The QR code contains only a link such as `https://your-site.com/emergency/USER_UID`. It does **not** contain medical data, so you can edit your profile at any time without printing a new QR.

## 2. Features

- Email/password registration and login (Firebase Authentication)
- Medical profile form with dynamic vaccination list (create and edit)
- Dashboard with profile completion percentage and QR preview
- QR code generation and PNG download (`mediqr-emergency-qr.png`)
- Public, mobile-friendly emergency page with loading, not-found and error states
- Friendly error messages (raw Firebase errors are never shown)
- Responsive Tailwind UI for desktop, tablet and mobile

## 3. Tech stack

React 18 + Vite, JavaScript, Tailwind CSS 3, React Router 6, Firebase Authentication, Cloud Firestore, `qrcode.react`, `lucide-react` (icons).

## 4. Installation

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
cd mediqr
npm install
```

## 5. Firebase setup (step by step)

### 5.1 Create a Firebase project

1. Go to <https://console.firebase.google.com> and sign in with a Google account.
2. Click **Create a project**, name it `mediqr`, and finish the wizard (Google Analytics can be turned off).

### 5.2 Enable Email/Password authentication

1. In the left menu open **Build > Authentication** and click **Get started**.
2. Open the **Sign-in method** tab, choose **Email/Password**, switch **Enable** on, and click **Save**.

### 5.3 Create the Firestore database

1. Open **Build > Firestore Database** and click **Create database**.
2. Choose a location near you (for India, `asia-south1` Mumbai is a good choice).
3. Start in **production mode** (we add proper rules in step 5.6).

### 5.4 Create the Firebase Web App

1. Click the **gear icon > Project settings**.
2. Under **General > Your apps**, click the **web icon `</>`**.
3. Give the app a nickname (e.g. `mediqr-web`). You can skip Firebase Hosting for now. Click **Register app**.
4. Firebase shows a `firebaseConfig` object with `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId` and `appId`. Keep this page open.

### 5.5 Add the credentials to `.env`

In the project root (same folder as `package.json`) copy the example file:

```bash
# Mac / Linux
cp .env.example .env
# Windows (Command Prompt)
copy .env.example .env
```

Open `.env` and paste each value after the `=` sign (no quotes, no spaces):

```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=mediqr-xxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mediqr-xxxx
VITE_FIREBASE_STORAGE_BUCKET=mediqr-xxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef
```

`.env` is already in `.gitignore`. After editing `.env` you must **stop and restart** `npm run dev`.

### 5.6 Add the Firestore security rules

1. Open **Firestore Database > Rules**.
2. Replace everything with the contents of `firestore.rules` from this project and click **Publish**.

What the rules do:

- Anyone can read **one** profile if they know its ID (needed for the public QR page).
- Nobody can list or browse all profiles.
- Only the logged-in owner can create or update their own profile.
- Nobody can delete profiles.

## 6. Run and build

```bash
npm run dev       # development server at http://localhost:5173
npm run build     # production build into the dist/ folder
npm run preview   # preview the production build locally
```

## 7. Testing the complete QR flow

1. Run `npm run dev` and open <http://localhost:5173>.
2. Click **Create Your MediQR**, register with any email and a password of at least 6 characters.
3. You land on the dashboard. Click **Create Profile** and fill in the form. Suggested **exhibition sample data** (example only, not real medical data):
   - Full name: Arjun Agnihotri, Age: 20, Blood group: O+
   - Allergies: leave empty (shows "No known allergies"), Conditions: empty, Medications: empty
   - Vaccinations: COVID-19, Tetanus
   - Emergency contact: your father's name, relationship Father, and a phone number
4. Click **Save Profile**. A success message appears.
5. Back on the dashboard, click **View Emergency Profile** to see the public page, or **Download QR** to save the PNG.
6. **Scanning with a phone:** `localhost` is not reachable from your phone. Either deploy the app (section 8) and scan the QR from the deployed site, or run `npm run dev -- --host`, open the shown network address (e.g. `http://192.168.1.5:5173`) on the laptop, and download the QR from there. Phone and laptop must be on the same Wi-Fi.
7. Open the QR in a private/incognito window to confirm the emergency page works without login.

> The QR is built from `window.location.origin`, so always download the QR from the **final deployed address** you will use at the exhibition.

## 8. Deployment

### Option A: Vercel (easiest)

1. Push the project to a GitHub repository (`.env` is ignored, which is correct).
2. On <https://vercel.com> choose **Add New > Project** and import the repository. Vercel detects Vite automatically.
3. Open **Settings > Environment Variables** and add the six `VITE_FIREBASE_*` values.
4. Deploy. `vercel.json` makes sure `/emergency/...` links work when opened directly.
5. In Firebase Console go to **Authentication > Settings > Authorized domains** and add your Vercel domain (e.g. `mediqr.vercel.app`).

### Option B: Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting     # use existing project; public directory: dist; single-page app: Yes; do NOT overwrite index.html
npm run build
firebase deploy --only hosting
```

Your site will be at `https://YOUR-PROJECT.web.app` (already an authorized domain). `firebase.json` is included.

After deploying, log in on the live site, open the dashboard and **download the QR again** so it points to the live address.

## 9. Architecture (easy to explain)

```
React -> Firebase Authentication -> Firestore -> Unique User ID -> QR Code -> Emergency URL -> Public Emergency Profile
```

1. The user registers; Firebase Authentication creates a unique **UID**.
2. The medical profile is saved in Firestore at `users/{UID}` (one collection, document ID = UID).
3. The dashboard generates a QR code from `https://site/emergency/{UID}`.
4. Anyone scanning it opens `/emergency/:userId`, a public route that reads `users/{userId}` and shows it in a large, easy-to-read layout.

```
src/
  components/   Navbar, Footer, ProtectedRoute, QRCodeCard, MedicalCard, LoadingSpinner,
                EmergencyContactCard, ProfileForm, VaccinationList, Toast
  pages/        Home, Login, Register, Dashboard, Profile, EmergencyProfile
  context/      AuthContext (login state shared across the app)
  firebase/     config.js (reads .env)
  services/     userService.js (all Firestore reads/writes)
  utils/        friendly error messages, profile helpers
```

Firestore document fields: `fullName, dateOfBirth, age, gender, bloodGroup, emergencyContactName, emergencyContactPhone, emergencyContactRelationship, allergies, medicalConditions, medications, medicalHistory, vaccinations, createdAt, updatedAt`.

## 10. Limitations and privacy warning

Because the emergency page is public **by design**, anyone who has (or guesses/obtains) the link can read the profile. The UID is long and hard to guess, but this is still weak protection. The simple Firestore rules here are for a demo only.

Before any real-world use this would need, at minimum: consent management, controlled/limited public data, rate limiting and abuse protection, access logging and auditing, encryption, a secure and compliant hosting setup, a way to revoke or regenerate QR links, data-deletion features, and review against applicable laws and regulations. **MediQR makes no claim of HIPAA, GDPR or any other compliance and must not be used to store real patients' data.** It gives no medical advice or diagnosis.

Other limits: no password reset page, no email verification, no admin or doctor accounts, one profile per user, and data is only as accurate as the user keeps it.
