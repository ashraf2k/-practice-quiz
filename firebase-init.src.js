// ============================================================
// Firebase glue layer — bundled (via esbuild) into firebase-init.js
// and vendored into the repo, the same way jspdf.min.js is vendored
// rather than pulled from a CDN at runtime. This file is the SOURCE;
// do not edit firebase-init.js by hand, rebuild it from this instead.
//
// Exposes a small, plain (non-module) global API — window.PQFirebase —
// so the rest of the site's existing classic <script> code (quiz.html,
// admin.html) can call it without itself becoming an ES module.
// ============================================================
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

// Filled in by firebase-config.js, which must load BEFORE this script
// (it defines window.FIREBASE_CONFIG). Kept in its own tiny file so the
// project keys are easy to find/replace and aren't buried in a build
// artifact.
var firebaseConfig = window.FIREBASE_CONFIG;

var app = initializeApp(firebaseConfig);
var auth = getAuth(app);
var db = getFirestore(app);

// Classroom computers are often shared between students. Session
// persistence ties the login to this browser TAB: closing the tab (or
// the browser) signs the student out automatically, so the next student
// to sit down doesn't inherit the previous one's account. Signing out
// explicitly always works too. (Reload / navigating within the same tab
// keeps the session, so mid-quiz page transitions are unaffected.)
var authReady = setPersistence(auth, browserSessionPersistence);

function friendlyAuthError(err){
  var code = err && err.code;
  var map = {
    "auth/email-already-in-use": "An account with that email already exists. Try logging in instead.",
    "auth/invalid-email": "That doesn't look like a valid email address.",
    "auth/weak-password": "Please choose a password with at least 6 characters.",
    "auth/user-not-found": "No account found with that email. Sign up first.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/too-many-requests": "Too many attempts — please wait a bit and try again.",
    "auth/network-request-failed": "Couldn't reach the server. Check your internet connection."
  };
  return (code && map[code]) || (err && err.message) || "Something went wrong. Please try again.";
}

// ---------- Auth ----------

function signUp(email, password, name, cls){
  return authReady
    .then(function(){ return createUserWithEmailAndPassword(auth, email, password); })
    .then(function(cred){
      var uid = cred.user.uid;
      return setDoc(doc(db, "users", uid), {
        name: name,
        email: email,
        class: cls,
        createdAt: serverTimestamp()
      }).then(function(){ return { uid: uid, name: name, email: email, class: cls }; });
    })
    .catch(function(err){ throw new Error(friendlyAuthError(err)); });
}

function logIn(email, password){
  return authReady
    .then(function(){ return signInWithEmailAndPassword(auth, email, password); })
    .then(function(cred){ return getMyProfile(cred.user.uid); })
    .catch(function(err){ throw new Error(friendlyAuthError(err)); });
}

function logOut(){
  return signOut(auth);
}

function resetPassword(email){
  return sendPasswordResetEmail(auth, email)
    .catch(function(err){ throw new Error(friendlyAuthError(err)); });
}

// callback(user) fires with `null` when signed out, or
// { uid, email, name, class } (profile merged in) once signed in.
function onAuthChange(callback){
  return onAuthStateChanged(auth, function(user){
    if(!user){ callback(null); return; }
    getMyProfile(user.uid).then(function(profile){
      callback(profile || { uid: user.uid, email: user.email, name: "", class: "" });
    }).catch(function(){
      callback({ uid: user.uid, email: user.email, name: "", class: "" });
    });
  });
}

function getMyProfile(uid){
  return getDoc(doc(db, "users", uid)).then(function(snap){
    if(!snap.exists()) return null;
    var d = snap.data();
    return { uid: uid, name: d.name, email: d.email, class: d.class };
  });
}

// ---------- Attempts (replaces the Apps Script backend) ----------

function attemptId(uid, examKey){ return uid + "_" + examKey; }

// Returns the stored attempt record for the signed-in student and exam,
// or null if they haven't completed it yet.
function getMyAttempt(uid, examKey){
  return getDoc(doc(db, "attempts", attemptId(uid, examKey))).then(function(snap){
    return snap.exists() ? snap.data() : null;
  });
}

// Creates the attempt document. Firestore security rules reject a second
// write to the same (uid, examKey) pair, so "one attempt per student" is
// enforced by the database itself, not just by the page's own JS.
// `answers` is the canonical-indexed selections (same shape as before);
// `hints` is a parallel array of booleans (true where a hint was used on
// that question) — stored for real this time, unlike the old Sheets
// backend, which could only carry a selected-option index.
function recordAttempt(uid, examKey, record){
  var ref = doc(db, "attempts", attemptId(uid, examKey));
  return setDoc(ref, {
    uid: uid,
    examKey: examKey,
    name: record.name,
    class: record.cls,
    score: record.score,
    total: record.total,
    answers: record.answers,
    hints: record.hints || [],
    completedAt: record.completedAt,
    minutesTaken: record.minutesTaken != null ? record.minutesTaken : null,
    recordedAt: serverTimestamp()
  }, { merge: false })
  .then(function(){ return { ok: true }; })
  .catch(function(err){
    // Someone else already wrote this exact (uid, examKey) doc — most
    // likely a duplicate submit (double click, retry after a flaky
    // connection). Treat it the same as "already recorded" rather than
    // surfacing a scary permission error.
    if(err && err.code === "permission-denied") return { ok: false, alreadyRecorded: true };
    throw err;
  });
}

// Admin-only (enforced by security rules, not just this check): every
// attempt across every student/exam, newest first.
function listAllAttempts(){
  var q = query(collection(db, "attempts"), orderBy("recordedAt", "desc"));
  return getDocs(q).then(function(snap){
    var out = [];
    snap.forEach(function(d){ out.push(d.data()); });
    return out;
  });
}

window.PQFirebase = {
  signUp: signUp,
  logIn: logIn,
  logOut: logOut,
  resetPassword: resetPassword,
  onAuthChange: onAuthChange,
  getMyProfile: getMyProfile,
  getMyAttempt: getMyAttempt,
  recordAttempt: recordAttempt,
  listAllAttempts: listAllAttempts
};
