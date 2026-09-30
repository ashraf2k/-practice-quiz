// ============================================================
// Your Firebase project's public web config (from the Firebase console:
// Project settings -> General -> Your apps -> the </> web app).
//
// These values are NOT secret -- they identify your project the way a
// shop's address is public. Real security comes from the Firestore
// security rules (firestore.rules in this repo), not from hiding these.
//
// Must load BEFORE firebase-init.js.
// ============================================================
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyAJpB6nUeK17VNG5AGgW6t_XWPS20Av7uI",
  authDomain: "practicequestions-6cfd1.firebaseapp.com",
  projectId: "practicequestions-6cfd1",
  storageBucket: "practicequestions-6cfd1.firebasestorage.app",
  messagingSenderId: "835613816535",
  appId: "1:835613816535:web:bf6a211a9599cad479a292"
};

// The teacher/admin email(s) allowed into the admin dashboard. This is
// only used for a friendly client-side hint -- the REAL enforcement is
// in firestore.rules (isAdmin()), so editing this list alone does not
// grant access; the matching email must also be in firestore.rules.
window.ADMIN_EMAILS = ["ashraf2k@gmail.com"];
