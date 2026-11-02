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

// NOTE: no admin e-mail is kept here. Admin access is granted server-side by
// an admins/{uid} document (see SECURITY.md) -- never by a value in the page.

// Group codes (classes) are named by level: 10BR... = IGCSE, AS... = AS Level,
// A2... = A Level. Older pages decide what a student may open from the old
// class names (10BR*, 11BR, 12BR); this maps the new codes onto them.
window.PQ_LEGACY_CLASS = function(c){
  c = String(c || "").replace(/\s+/g, "");
  if(/^IGCSE/i.test(c)) return "10BR";
  if(/^AS/i.test(c)) return "11BR";
  if(/^A2/i.test(c)) return "12BR";
  return c;
};
window.PQ_LEVEL_OF = function(c){
  var m = /^(10)BR/i.exec(String(c || "").replace(/\s+/g, ""));
  if(m) return "10";
  var l = window.PQ_LEGACY_CLASS(c);
  var n = /^(11|12)BR/i.exec(l);
  return n ? n[1] : "";
};
