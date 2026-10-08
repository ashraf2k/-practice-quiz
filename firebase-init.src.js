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
  browserLocalPersistence,
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
  where,
  writeBatch,
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

// Classroom computers are often shared between students, so by default the
// login is tied to this browser TAB: closing the tab (or the browser) signs
// the student out automatically, so the next student to sit down doesn't
// inherit the previous one's account. A student on their OWN device can tick
// "Remember me" at login: the login is then kept on this device (local
// persistence) until they log out. A small flag in localStorage records that
// choice so the right persistence is used when the page next loads.
// (Reload / navigating within the same tab keeps the session either way.)
var REMEMBER_KEY = "ilearncs_remember_me";
function getRemembered(){
  try { return window.localStorage.getItem(REMEMBER_KEY) === "1"; } catch(e){ return false; }
}
function setRemembered(on){
  try {
    if(on) window.localStorage.setItem(REMEMBER_KEY, "1");
    else window.localStorage.removeItem(REMEMBER_KEY);
  } catch(e){}
}
var authReady = setPersistence(auth, getRemembered() ? browserLocalPersistence : browserSessionPersistence);

// Picks where the login that is about to happen is stored. Always called
// before a sign-in / sign-up so each login decides for itself.
function applyPersistence(remember){
  return setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence)
    .catch(function(){
      // Local storage unavailable (private mode, blocked): fall back to session.
      return setPersistence(auth, browserSessionPersistence);
    })
    .then(function(){ setRemembered(!!remember); });
}

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

function signUp(email, password, name, cls, remember){
  return authReady
    .then(function(){ return applyPersistence(remember); })
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

function logIn(email, password, remember){
  return authReady
    .then(function(){ return applyPersistence(remember); })
    .then(function(){ return signInWithEmailAndPassword(auth, email, password); })
    .then(function(cred){
      return isArchived(cred.user.uid).then(function(archived){
        if(archived){
          setRemembered(false);
          return signOut(auth).then(function(){ throw new Error(ARCHIVED_MESSAGE); });
        }
        return getMyProfile(cred.user.uid);
      });
    })
    .catch(function(err){ throw new Error(friendlyAuthError(err)); });
}

function logOut(){
  // Logging out also forgets "Remember me", so the next sign-in starts fresh.
  setRemembered(false);
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
    isArchived(user.uid).then(function(archived){
      if(archived){ setRemembered(false); return signOut(auth).then(function(){ callback(null); }); }
      return getMyProfile(user.uid).then(function(profile){
        callback(profile || { uid: user.uid, email: user.email, name: "", class: "" });
      });
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

// ---------- Exam-paper attempts (exam-practice.html) ----------
// A separate, simpler collection from "attempts" above: topical
// exam-question practice allows UNLIMITED retakes (see firestore.rules),
// so there's no attemptNumber gating -- every completed run just
// overwrites the student's one document for that uid+paperKey, which
// always reflects their latest result.

function examAttemptId(uid, paperKey){ return uid + "_" + paperKey; }

function getMyExamAttempt(uid, paperKey){
  return getDoc(doc(db, "examAttempts", examAttemptId(uid, paperKey))).then(function(snap){
    return snap.exists() ? snap.data() : null;
  });
}

// Admin-only (enforced by security rules, not just this check): every
// Topical Real Exam Questions result across every student/paper, newest
// first. Mirrors listAllAttempts() above, but reads the separate
// examAttempts collection -- since exam-practice.html allows unlimited
// retakes, each document is just one student's latest run on one paper.
function listAllExamAttempts(){
  var q = query(collection(db, "examAttempts"), orderBy("recordedAt", "desc"));
  return getDocs(q).then(function(snap){
    var out = [];
    snap.forEach(function(d){ out.push(d.data()); });
    return out;
  });
}

// Admin-only (enforced by security rules, not just this check): clears a
// single student's saved exam-practice result for one paper. Unlike
// deleteAttempt() above this doesn't "free up" a retake -- exam-practice
// already allows unlimited retakes -- it just removes the record so it
// no longer shows as attempted (e.g. a mistaken test run).
function deleteExamAttempt(uid, paperKey){
  return deleteDoc(doc(db, "examAttempts", examAttemptId(uid, paperKey)))
    .then(function(){ return { ok: true }; });
}

// `record`: { name, cls, perQuestion, totalEarned, totalMarks, pct,
// topicStats, completedAt, minutesTaken }. perQuestion/topicStats are
// plain arrays of plain objects (Firestore-safe), built by
// exam-practice.html.
function recordExamAttempt(uid, paperKey, record){
  var ref = doc(db, "examAttempts", examAttemptId(uid, paperKey));
  var payload = {
    uid: uid,
    paperKey: paperKey,
    name: record.name,
    class: record.cls,
    perQuestion: record.perQuestion,
    totalEarned: record.totalEarned,
    totalMarks: record.totalMarks,
    pct: record.pct,
    topicStats: record.topicStats,
    completedAt: record.completedAt,
    minutesTaken: record.minutesTaken != null ? record.minutesTaken : null,
    recordedAt: serverTimestamp()
  };
  return setDoc(ref, payload, { merge: false })
    .then(function(){ return { ok: true }; })
    .catch(function(err){
      return { ok: false, error: (err && err.message) || "Could not save." };
    });
}

// Admin-only (enforced by security rules, not just this check): lets the
// teacher re-read a student's typed answer and correct the mark a question
// was given. The self/auto-graded mark from exam-practice.html isn't
// always right -- especially on the single-attempt "real exam" papers
// (e.g. comm9618_exam) where the student never gets a chance to notice or
// fix a mis-grade themselves. Unlike recordExamAttempt() above (a full
// overwrite from the student's own completed run), this is a partial
// `merge: true` write that only touches the marking fields, leaving uid,
// paperKey, name, class, completedAt, minutesTaken and recordedAt exactly
// as the student's original submission left them.
// `record`: { perQuestion, totalEarned, totalMarks, pct, topicStats,
// regradedBy, regradedAt }. admin.html recomputes all of these from its
// own edited per-question marks -- the same derivation exam-practice.html's
// finishAttempt() does for a fresh attempt -- and stamps who/when so the
// change is auditable later.
function regradeExamAttempt(uid, paperKey, record){
  var ref = doc(db, "examAttempts", examAttemptId(uid, paperKey));
  var payload = {
    perQuestion: record.perQuestion,
    totalEarned: record.totalEarned,
    totalMarks: record.totalMarks,
    pct: record.pct,
    topicStats: record.topicStats,
    regradedBy: record.regradedBy != null ? record.regradedBy : null,
    regradedAt: record.regradedAt != null ? record.regradedAt : null
  };
  return setDoc(ref, payload, { merge: true })
    .then(function(){ return { ok: true }; })
    .catch(function(err){
      return { ok: false, error: (err && err.message) || "Could not save." };
    });
}

// ---------- MCQ practice progress (resume support, quiz.html) ----------
// Separate from "attempts" above: this is scratch/working state for an
// UNFINISHED attempt, saved after every question so a student can close
// the tab and pick up later (same device or a different one, since this
// lives in Firestore, not localStorage). It never gates the 2-attempt
// cap by itself -- that's still entirely decided by the `attempts`
// collection and its rules, same as always. quiz.html deletes this doc
// once the attempt is actually finished (or explicitly abandoned via
// "Start over", which records a real attempt first -- see
// submitInProgressThenRestart() there).

function progressId(uid, examKey){ return uid + "_" + examKey; }

function getMyProgress(uid, examKey){
  return getDoc(doc(db, "practiceProgress", progressId(uid, examKey))).then(function(snap){
    return snap.exists() ? snap.data() : null;
  });
}

// `snapshot` is a plain object matching quiz.html's in-memory `state`
// shape closely enough to rebuild it on resume: { attemptNumber,
// questionOrder, optionOrder, index, answers, hintUsedFor, streak, adapt,
// firstAttemptSnapshot, startedAt }. Best-effort: a failed autosave is
// swallowed rather than surfaced, since losing one checkpoint just means
// falling back to the previous one (or, worst case, the start of the
// attempt) rather than breaking the quiz the student is actively taking.
function saveProgress(uid, examKey, snapshot){
  var ref = doc(db, "practiceProgress", progressId(uid, examKey));
  var payload = Object.assign({ uid: uid, examKey: examKey, updatedAt: serverTimestamp() }, snapshot);
  return setDoc(ref, payload, { merge: false }).then(function(){ return { ok: true }; }).catch(function(err){
    return { ok: false, error: (err && err.message) || "Could not save." };
  });
}

function deleteProgress(uid, examKey){
  return deleteDoc(doc(db, "practiceProgress", progressId(uid, examKey)))
    .then(function(){ return { ok: true }; })
    .catch(function(){ return { ok: false }; });
}

// ---------- Exam-paper progress (resume support, exam-practice.html) ----------
// Same idea as above, for the topical free-response papers. Unlike the
// MCQ side there's no attempt cap to interact with -- unlimited retakes
// were already the design -- so this is purely a convenience checkpoint.

function examProgressId(uid, paperKey){ return uid + "_" + paperKey; }

function getMyExamProgress(uid, paperKey){
  return getDoc(doc(db, "examProgress", examProgressId(uid, paperKey))).then(function(snap){
    return snap.exists() ? snap.data() : null;
  });
}

// `snapshot`: { pool, order, index, level, streak, results, startedAt }.
function saveExamProgress(uid, paperKey, snapshot){
  var ref = doc(db, "examProgress", examProgressId(uid, paperKey));
  var payload = Object.assign({ uid: uid, paperKey: paperKey, updatedAt: serverTimestamp() }, snapshot);
  return setDoc(ref, payload, { merge: false }).then(function(){ return { ok: true }; }).catch(function(err){
    return { ok: false, error: (err && err.message) || "Could not save." };
  });
}

function deleteExamProgress(uid, paperKey){
  return deleteDoc(doc(db, "examProgress", examProgressId(uid, paperKey)))
    .then(function(){ return { ok: true }; })
    .catch(function(){ return { ok: false }; });
}

// ---------- Archive (admin "archive a student") ----------
// Archiving moves EVERYTHING stored for one student (profile, graded
// attempts, exam-paper attempts, resume checkpoints) out of the live
// collections and into archive/{uid} (a small summary document) plus
// archive/{uid}/items/* (one copy of each original document). Restoring
// writes every copy back to where it came from and removes the archive
// entry. An archived uid can no longer sign in (see isArchived above).
// Needs the matching rules in firestore.rules (admin-only, except that
// a student may read their OWN archive/{uid} summary -- that is how
// login knows to turn an archived account away).
var ARCHIVED_MESSAGE = "This account has been archived. Please speak to your teacher.";
var ARCHIVE_COLLECTIONS = ["attempts", "examAttempts", "practiceProgress", "examProgress"];

function isArchived(uid){
  return getDoc(doc(db, "archive", uid)).then(function(snap){ return snap.exists(); })
    .catch(function(){ return false; });
}

function archiveStudent(uid, adminEmail){
  var items = [];
  var profile = null;
  return getDoc(doc(db, "users", uid)).then(function(snap){
    if(snap.exists()) profile = snap.data();
    return Promise.all(ARCHIVE_COLLECTIONS.map(function(col){
      return getDocs(query(collection(db, col), where("uid", "==", uid))).then(function(qs){
        qs.forEach(function(d){ items.push({ col: col, docId: d.id, data: d.data() }); });
      });
    }));
  }).then(function(){
    if(profile) items.push({ col: "users", docId: uid, data: profile });
    var name = (profile && profile.name) || "";
    var cls = (profile && profile.class) || "";
    var email = (profile && profile.email) || "";
    items.forEach(function(it){
      if(!name && it.data && it.data.name) name = it.data.name;
      if(!cls && it.data && it.data.class) cls = it.data.class;
    });
    // 1) Copy everything into the archive FIRST (a failure here leaves
    //    the live data untouched). Batches of <= 400 writes.
    var chunks = [];
    for(var i = 0; i < items.length; i += 400) chunks.push(items.slice(i, i + 400));
    var copy = Promise.resolve();
    chunks.forEach(function(chunk){
      copy = copy.then(function(){
        var b = writeBatch(db);
        chunk.forEach(function(it){
          b.set(doc(db, "archive", uid, "items", it.col + "__" + it.docId), it);
        });
        return b.commit();
      });
    });
    return copy.then(function(){
      return setDoc(doc(db, "archive", uid), {
        uid: uid, name: name, class: cls, email: email,
        archivedAt: new Date().toISOString(),
        archivedBy: adminEmail || null,
        itemCount: items.length
      });
    }).then(function(){
      // 2) Only now remove the originals.
      var delChunks = [];
      for(var j = 0; j < items.length; j += 400) delChunks.push(items.slice(j, j + 400));
      var del = Promise.resolve();
      delChunks.forEach(function(chunk){
        del = del.then(function(){
          var b = writeBatch(db);
          chunk.forEach(function(it){ b.delete(doc(db, it.col, it.docId)); });
          return b.commit();
        });
      });
      return del;
    }).then(function(){ return { ok: true, itemCount: items.length, name: name }; });
  });
}

function listArchivedStudents(){
  return getDocs(collection(db, "archive")).then(function(snap){
    var out = [];
    snap.forEach(function(d){ out.push(d.data()); });
    return out;
  });
}

function archiveItems(uid){
  return getDocs(collection(db, "archive", uid, "items")).then(function(snap){
    var out = [];
    snap.forEach(function(d){ out.push({ ref: d.ref, item: d.data() }); });
    return out;
  });
}

function restoreStudent(uid){
  return archiveItems(uid).then(function(entries){
    var chunks = [];
    for(var i = 0; i < entries.length; i += 400) chunks.push(entries.slice(i, i + 400));
    var put = Promise.resolve();
    chunks.forEach(function(chunk){
      put = put.then(function(){
        var b = writeBatch(db);
        chunk.forEach(function(e){ b.set(doc(db, e.item.col, e.item.docId), e.item.data); });
        return b.commit();
      });
    });
    return put.then(function(){ return removeArchiveEntry(uid, entries); })
      .then(function(){ return { ok: true, itemCount: entries.length }; });
  });
}

function removeArchiveEntry(uid, entries){
  var chunks = [];
  for(var i = 0; i < entries.length; i += 400) chunks.push(entries.slice(i, i + 400));
  var del = Promise.resolve();
  chunks.forEach(function(chunk){
    del = del.then(function(){
      var b = writeBatch(db);
      chunk.forEach(function(e){ b.delete(e.ref); });
      return b.commit();
    });
  });
  return del.then(function(){ return deleteDoc(doc(db, "archive", uid)); });
}

// Permanent removal from the archive (nothing is left anywhere).
function deleteArchivedStudent(uid){
  return archiveItems(uid).then(function(entries){ return removeArchiveEntry(uid, entries); })
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
  deleteAttempt: deleteAttempt,
  getMyExamAttempt: getMyExamAttempt,
  recordExamAttempt: recordExamAttempt,
  listAllExamAttempts: listAllExamAttempts,
  deleteExamAttempt: deleteExamAttempt,
  regradeExamAttempt: regradeExamAttempt,
  getMyProgress: getMyProgress,
  saveProgress: saveProgress,
  deleteProgress: deleteProgress,
  getMyExamProgress: getMyExamProgress,
  saveExamProgress: saveExamProgress,
  deleteExamProgress: deleteExamProgress,
  archiveStudent: archiveStudent,
  listArchivedStudents: listArchivedStudents,
  restoreStudent: restoreStudent,
  deleteArchivedStudent: deleteArchivedStudent
};
