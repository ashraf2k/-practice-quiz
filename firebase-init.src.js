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
  deleteDoc,
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

// Creates (attemptNumber 1) or retakes (attemptNumber 2) the attempt
// document. Firestore security rules enforce exactly this shape — a
// fresh create must be attemptNumber 1, and the one allowed retake must
// move an existing attemptNumber-1 doc to attemptNumber 2 — so "at most
// two attempts per student per exam" is enforced by the database itself,
// not just by the page's own JS. The caller (quiz.html) is what decides
// which attemptNumber this write is, since it already checked
// getMyAttempt() before offering a fresh attempt vs. a retake.
// `answers` is the canonical-indexed selections (same shape as before);
// `hints` is a parallel array of booleans (true where a hint was used on
// that question). `record.firstAttempt`, when this is the retake
// (attemptNumber 2), is a small snapshot of the first attempt's score so
// the teacher's admin view can still see it even though this write
// replaces the first attempt's answers/score as the one that counts.
function recordAttempt(uid, examKey, record){
  var ref = doc(db, "attempts", attemptId(uid, examKey));
  var payload = {
    uid: uid,
    examKey: examKey,
    name: record.name,
    class: record.cls,
    attemptNumber: record.attemptNumber || 1,
    score: record.score,
    total: record.total,
    answers: record.answers,
    hints: record.hints || [],
    completedAt: record.completedAt,
    minutesTaken: record.minutesTaken != null ? record.minutesTaken : null,
    recordedAt: serverTimestamp()
  };
  if(record.firstAttempt) payload.firstAttempt = record.firstAttempt;
  return setDoc(ref, payload, { merge: false })
  .then(function(){ return { ok: true }; })
  .catch(function(err){
    // Blocked by the rules above — a duplicate submit (double click,
    // retry after a flaky connection), or the student has already used
    // both attempts. Treat it the same as "already recorded" rather than
    // surfacing a scary permission error; the student still sees their
    // just-finished results either way (see finishAttempt() in quiz.html).
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

// Admin-only (enforced by security rules, not just this check): wipes a
// single student's attempt at a single exam, letting them take it again
// as if they'd never attempted it -- the next write for that
// uid+examKey is treated as a brand-new attemptNumber 1 (see the
// "create" rule in firestore.rules, which requires the document not to
// already exist). This is the only way to undo the "at most two
// attempts" limit for a student who, say, submitted a test run by
// mistake or whose retake also needs clearing.
function deleteAttempt(uid, examKey){
  return deleteDoc(doc(db, "attempts", attemptId(uid, examKey)))
    .then(function(){ return { ok: true }; });
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
  listAllAttempts: listAllAttempts,
  deleteAttempt: deleteAttempt
};
