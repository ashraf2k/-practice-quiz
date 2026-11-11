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
import { initializeApp, deleteApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  initializeAuth,
  inMemoryPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect
} from "firebase/auth";
import {
  initializeFirestore,
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
  updateDoc,
  deleteField,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

// Filled in by firebase-config.js, which must load BEFORE this script
// (it defines window.FIREBASE_CONFIG). Kept in its own tiny file so the
// project keys are easy to find/replace and aren't buried in a build
// artifact.
var firebaseConfig = window.FIREBASE_CONFIG;

var app = initializeApp(firebaseConfig);
var auth = getAuth(app);
// School networks/proxies often break Firestore's default streaming
// transport, which shows up as "could not be saved". Auto-detect that and
// fall back to long-polling (plain HTTPS requests) so saves still work.
var db = initializeFirestore(app, { experimentalAutoDetectLongPolling: true });

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

// Names/classes end up in the teacher dashboard and are validated by the
// Firestore rules (no < > &). Strip those characters up-front so a student
// with e.g. "&" in their name is never blocked, and no markup can be stored.
function cleanName(n){
  return String(n == null ? "" : n).replace(/[<>&]/g, "").replace(/\s+/g, " ").trim().slice(0, 80);
}
function cleanClass(c){
  return String(c == null ? "" : c).replace(/[^A-Za-z0-9 ._-]/g, "").trim().slice(0, 20);
}
function num(v, fallback){
  var n = Number(v);
  return isFinite(n) ? n : (fallback == null ? 0 : fallback);
}
var MIN_PASSWORD = 8;
// Planned exam session: required for accounts created on/after this moment (5 Nov 2026, 00:49 Riyadh time).
var SESSION_REQUIRED_FROM = Date.parse("2026-11-04T21:49:00Z");
var EXAM_SESSIONS = ["Feb/March 2027", "May/June 2027", "Oct/Nov 2027", "May/June 2028 or later"];

function friendlyAuthError(err){
  var code = err && err.code;
  var map = {
    "auth/email-already-in-use": "An account with that email already exists. Try logging in instead.",
    "auth/invalid-email": "That doesn't look like a valid email address.",
    "auth/weak-password": "Please choose a stronger password (at least 8 characters).",
    "auth/user-not-found": "No account found with that email. Sign up first.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/too-many-requests": "Too many attempts — please wait a bit and try again.",
    "auth/network-request-failed": "Couldn't reach the server. Check your internet connection."
  };
  return (code && map[code]) || (err && err.message) || "Something went wrong. Please try again.";
}

// ---------- Auth ----------

// E-mail verification is required for accounts created on/after this date.
// Older (existing) accounts are grandfathered so nobody is locked out.
// Keep in step with verifiedOrLegacy() in firestore.rules.
var authBusy = false;   // true while signUp/logIn/resend is mid-flight
var VERIFY_REQUIRED_FROM = Date.parse("2026-10-17T21:00:00Z");
function needsVerification(user){
  if(!user || user.emailVerified) return false;
  var created = Date.parse(user.metadata && user.metadata.creationTime);
  return !(created < VERIFY_REQUIRED_FROM);
}

function signUp(email, password, name, cls, remember, examSession){
  name = cleanName(name); cls = cleanClass(cls);
  if(EXAM_SESSIONS.indexOf(examSession) < 0) return Promise.reject(new Error("Please choose your planned exam session."));
  if(!name) return Promise.reject(new Error("Please enter your name (letters and numbers only, no < > or &)."));
  if(!cls) return Promise.reject(new Error("Please choose your class."));
  if(!password || String(password).length < MIN_PASSWORD) return Promise.reject(new Error("Please choose a password with at least " + MIN_PASSWORD + " characters."));
  authBusy = true;
  return authReady
    .then(function(){ return applyPersistence(remember); })
    .then(function(){ return createUserWithEmailAndPassword(auth, email, password); })
    .then(function(cred){
      var uid = cred.user.uid;
      return setDoc(doc(db, "users", uid), {
        name: name,
        email: email,
        class: cls,
        examSession: examSession,
        certificate: STUDENT_LEVELS.indexOf(cls) >= 0 ? cls : "",
        createdAt: serverTimestamp(),
        sub: { plan: "trial", start: serverTimestamp() }   // 24-hour free trial; the rules force start == server time
      }).then(function(){
        // The account is unusable until this link is clicked. A failed send
        // does not fail sign-up; the student can press "Resend" on the next screen.
        return sendEmailVerification(cred.user).then(function(){ return true; }, function(){ return false; });
      }).then(function(sent){
        // Not logged in until the link is clicked: end the session now.
        setRemembered(false);
        return signOut(auth).then(function(){ return { email: email, needsVerification: true, verificationSent: sent }; });
      });
    })
    .then(function(r){ authBusy = false; return r; }, function(err){ authBusy = false; throw new Error(friendlyAuthError(err)); });
}

// ---------- Sign in with Google ----------
// Needs: Firebase console -> Authentication -> Sign-in method -> Google -> Enable.
// A returning student (or an old e-mail/password student who uses the same Gmail
// address) gets their existing profile. A brand-new Google user has no profile yet and
// must pick IGCSE / AS / A2 (completeGoogleProfile) before continuing.
var STUDENT_LEVELS = ["IGCSE", "AS", "A2"];
function isGoogleUser(user){
  return !!(user && user.providerData && user.providerData.some(function(p){ return p && p.providerId === "google.com"; }));
}
function googleSignIn(remember){
  authBusy = true;
  var provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return authReady
    .then(function(){ return applyPersistence(remember); })
    .then(function(){
      return signInWithPopup(auth, provider).catch(function(err){
        if(err && (err.code === "auth/popup-blocked" || err.code === "auth/operation-not-supported-in-this-environment")){
          return signInWithRedirect(auth, provider).then(function(){ return new Promise(function(){}); });
        }
        throw err;
      });
    })
    .then(function(cred){
      return isArchived(cred.user.uid).then(function(archived){
        if(archived){ setRemembered(false); return signOut(auth).then(function(){ throw new Error(ARCHIVED_MESSAGE); }); }
        return getMyProfile(cred.user.uid).then(function(p){
          if(p && p.blocked){ setRemembered(false); return signOut(auth).then(function(){ throw new Error(BLOCKED_MESSAGE); }); }
          return p ? { profile: p } : { needsProfile: true, uid: cred.user.uid, email: cred.user.email, name: cleanName(cred.user.displayName || "") };
        });
      });
    })
    .then(function(r){ authBusy = false; return r; }, function(err){
      authBusy = false;
      if(err && (err.code === "auth/popup-closed-by-user" || err.code === "auth/cancelled-popup-request")) throw new Error("Google sign-in was cancelled.");
      if(err && err.code === "auth/operation-not-allowed") throw new Error("Google sign-in is not switched on yet. Please tell your teacher.");
      if(err && err.code === "auth/unauthorized-domain") throw new Error("This website address is not yet allowed for Google sign-in. Please tell your teacher.");
      throw new Error(err && err.message && !err.code ? err.message : friendlyAuthError(err));
    });
}
// Creates the profile of a first-time Google user. The class is the level
// (IGCSE / AS / A2) until a teacher approves a class code.
function completeGoogleProfile(name, level, examSession){
  name = cleanName(name); level = String(level || "");
  if(EXAM_SESSIONS.indexOf(examSession) < 0) return Promise.reject(new Error("Please choose your planned exam session."));
  if(!name) return Promise.reject(new Error("Please enter your full name."));
  if(STUDENT_LEVELS.indexOf(level) < 0) return Promise.reject(new Error("Please choose IGCSE, AS or A2."));
  var u = auth.currentUser;
  if(!u) return Promise.reject(new Error("Please sign in again."));
  return setDoc(doc(db, "users", u.uid), { name: name, email: u.email, class: level, examSession: examSession, certificate: level, createdAt: serverTimestamp(), sub: { plan: "trial", start: serverTimestamp() } })
    .then(function(){ return getMyProfile(u.uid); });
}
// A student created after the exam-session rule came in, but without a session (e.g. an older cached sign-up
// page): set it once. The security rules allow exactly these two fields, and only while they are missing.
function saveMySession(uid, examSession, certificate){
  if(EXAM_SESSIONS.indexOf(examSession) < 0) return Promise.reject(new Error("Please choose your planned exam session."));
  if(STUDENT_LEVELS.indexOf(certificate) < 0) return Promise.reject(new Error("Please choose your certificate."));
  return updateDoc(doc(db, "users", uid), { examSession: examSession, certificate: certificate }).then(function(){ return getMyProfile(uid); });
}

function logIn(email, password, remember){
  authBusy = true;
  return authReady
    .then(function(){ return applyPersistence(remember); })
    .then(function(){ return signInWithEmailAndPassword(auth, email, password); })
    .then(function(cred){
      // Not verified: no login. End the session and tell the page.
      if(needsVerification(cred.user)){ setRemembered(false); return signOut(auth).then(function(){ return { email: cred.user.email, needsVerification: true }; }); }
      return isArchived(cred.user.uid).then(function(archived){
        if(archived){
          setRemembered(false);
          return signOut(auth).then(function(){ throw new Error(ARCHIVED_MESSAGE); });
        }
        return getMyProfile(cred.user.uid).then(function(p){
          if(p && p.blocked){
            setRemembered(false);
            return signOut(auth).then(function(){ throw new Error(BLOCKED_MESSAGE); });
          }
          return p;
        });
      });
    })
    .then(function(r){ authBusy = false; return r; }, function(err){ authBusy = false; throw new Error(friendlyAuthError(err)); });
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
  function handle(user){
    if(!user){ callback(null); return; }
    // Not verified yet: never treated as logged in. Any leftover session is
    // ended (except while sign-up / login is itself in progress).
    if(needsVerification(user)){
      if(!authBusy){ setRemembered(false); signOut(auth).then(function(){}, function(){}); }
      callback(null); return;
    }
    isArchived(user.uid).then(function(archived){
      if(archived){ setRemembered(false); return signOut(auth).then(function(){ callback(null); }); }
      return getMyProfile(user.uid).then(function(profile){
        if(profile && profile.blocked){ setRemembered(false); return signOut(auth).then(function(){ callback(null); }); }
        callback(profile || { uid: user.uid, email: user.email, name: cleanName(user.displayName || ""), class: "", needsProfile: isGoogleUser(user) });
      });
    }).catch(function(){
      callback({ uid: user.uid, email: user.email, name: "", class: "" });
    });
  }
  return onAuthStateChanged(auth, handle);
}

// Re-sends the verification link for an account that has not been verified
// yet. Needs the e-mail + password again because the student is (rightly)
// not logged in; the session is ended straight after.
function resendVerification(email, password){
  authBusy = true;
  return authReady
    .then(function(){ return applyPersistence(false); })
    .then(function(){ return signInWithEmailAndPassword(auth, email, password); })
    .then(function(cred){
      if(!needsVerification(cred.user)) return signOut(auth).then(function(){ return { alreadyVerified: true }; });
      return sendEmailVerification(cred.user).then(function(){ return signOut(auth); }).then(function(){ return { sent: true }; });
    })
    .then(function(r){ authBusy = false; return r; }, function(err){ authBusy = false; throw new Error(friendlyAuthError(err)); });
}

// ---------- subscriptions ----------
// users/{uid}.sub is written only by an admin (security rules). A new account carries { plan: "trial", start } and
// its expiry is start + 24 h. No sub field = an existing student with full access (legacy).
var SUB_PLANS = { trial: "Free trial", monthly: "Monthly", quarterly: "3-Month", biannual: "6-Month", exams: "Until exams", custom: "Custom" };
function tsMs(t){ return t && t.toMillis ? t.toMillis() : (t instanceof Date ? t.getTime() : 0); }
function subFrom(d){
  var s = d && d.sub;
  if(!s || typeof s !== "object") return null;
  var plan = String(s.plan || ""), start = tsMs(s.start);
  var exp = s.expiry ? tsMs(s.expiry) : (plan === "trial" ? start + 86400000 : 0);
  return { plan: plan, label: SUB_PLANS[plan] || plan, isTrial: plan === "trial" || s.isTrial === true,
           startMs: start, expiryMs: exp, suspended: s.suspended === true, graceMs: tsMs(s.grace),
           by: String(s.by || ""), modifiedMs: tsMs(s.modified) };
}
// Live subscription of the signed-in student (fires again when an admin changes it, so access can end without a re-login).
function watchMySubscription(uid, cb){
  return onSnapshot(doc(db, "users", uid), function(snap){ cb(snap.exists() ? subFrom(snap.data()) : null, snap.exists()); },
    function(){ cb(undefined, true); });
}
function subHistoryList(uid){
  return getDocs(query(collection(db, "users", uid, "subHistory"), orderBy("at", "desc"))).then(function(snap){
    var out = []; snap.forEach(function(d){ var x = d.data() || {};
      out.push({ id: d.id, action: x.action || "", plan: x.plan || "", prevPlan: x.prevPlan || "", prevExpiryMs: tsMs(x.prevExpiry), newExpiryMs: tsMs(x.newExpiry),
                 startMs: tsMs(x.startDate), atMs: tsMs(x.at), by: x.by || "", reason: x.reason || "" }); });
    return out;
  });
}
// Admin only. items: [{ uid, action, plan, startMs, expiryMs, suspended, graceMs, reason, prevPlan, prevExpiryMs }].
// Each student is written on its own (user update + history entry in one atomic batch) so one failure does not stop the others.
function assignSubscriptions(items, adminName, adminUid){
  var by = cleanAdminName(adminName), ok = [], failed = [], i = 0;
  function one(it){
    var sub = { plan: String(it.plan), start: new Date(it.startMs), expiry: new Date(it.expiryMs),
                isTrial: it.plan === "trial", suspended: it.suspended === true, by: by, byUid: String(adminUid || ""), modified: serverTimestamp() };
    if(it.graceMs) sub.grace = new Date(it.graceMs);
    var hist = { action: String(it.action || "assign"), plan: String(it.plan), startDate: new Date(it.startMs), newExpiry: new Date(it.expiryMs),
                 at: serverTimestamp(), by: by, byUid: String(adminUid || "") };
    if(it.prevPlan) hist.prevPlan = String(it.prevPlan);
    if(it.prevExpiryMs) hist.prevExpiry = new Date(it.prevExpiryMs);
    if(it.reason) hist.reason = String(it.reason).slice(0, 200);
    // Concurrent edits: if another admin changed this student since the list was loaded, refuse instead of overwriting.
    var guard = (it.expectExpiryMs === undefined) ? Promise.resolve() : getDoc(doc(db, "users", it.uid)).then(function(snap){
      var cur = snap.exists() ? subFrom(snap.data()) : null, curMs = cur ? cur.expiryMs : 0;
      if(curMs !== Number(it.expectExpiryMs || 0)) throw new Error("changed by someone else meanwhile - refresh and try again");
    });
    return guard.then(function(){
      var b = writeBatch(db);
      b.update(doc(db, "users", it.uid), { sub: sub });
      b.set(doc(collection(db, "users", it.uid, "subHistory")), hist);
      return b.commit();
    }).then(function(){ ok.push(it.uid); }, function(e){ failed.push({ uid: it.uid, error: (e && e.message) || "failed" }); });
  }
  function next(){
    var chunk = items.slice(i, i + 6); i += 6;
    if(!chunk.length) return Promise.resolve({ ok: ok, failed: failed });
    return Promise.all(chunk.map(one)).then(next);
  }
  return next();
}

function getMyProfile(uid){
  return getDoc(doc(db, "users", uid)).then(function(snap){
    if(!snap.exists()) return null;
    var d = snap.data();
    var cm = d.createdAt && d.createdAt.toMillis ? d.createdAt.toMillis() : 0;
    var role = d.role || "student";
    return { uid: uid, name: d.name, email: d.email, class: d.class, blocked: d.blocked === true, role: role,
             examSession: d.examSession || "", certificate: d.certificate || "", createdMs: cm, sub: subFrom(d),
             // Students who joined after the exam-session rule came in must pick their session once.
             needsSession: role === "student" && !d.examSession && cm >= SESSION_REQUIRED_FROM };
  });
}

var BLOCKED_MESSAGE = "This account has been blocked. Please speak to your teacher.";

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
// Re-read the account and force a fresh ID token (picks up a changed
// email_verified flag). Never rejects.
function refreshToken(){
  var u = auth.currentUser;
  if(!u) return Promise.resolve();
  return u.reload().catch(function(){}).then(function(){ return u.getIdToken(true); }).catch(function(){});
}

function recordAttempt(uid, examKey, record){
  var ref = doc(db, "attempts", attemptId(uid, examKey));
  var payload = {
    uid: uid,
    examKey: examKey,
    name: cleanName(record.name),
    class: cleanClass(record.cls),
    attemptNumber: record.attemptNumber || 1,
    score: num(record.score),
    total: num(record.total),
    answers: record.answers,
    hints: record.hints || [],
    completedAt: record.completedAt,
    minutesTaken: record.minutesTaken != null ? record.minutesTaken : null,
    recordedAt: serverTimestamp()
  };
  if(record.firstAttempt) payload.firstAttempt = record.firstAttempt;
  // Retry transient failures (flaky school Wi-Fi: unavailable / timeout /
  // network) a few times with a short back-off before giving up.
  var refreshed = false;
  function attempt(n){
    return setDoc(ref, payload, { merge: false })
      .then(function(){ return { ok: true }; })
      .catch(function(err){
        var code = err && err.code;
        // Blocked by the rules above -- a duplicate submit or both attempts
        // already used. Not retried; quiz.html re-reads the server copy.
        if(code === "permission-denied"){
          // A stale sign-in token (e.g. the e-mail was verified after the
          // token was issued) is refused by the rules. Refresh it once and
          // retry before treating this as a real refusal.
          if(!refreshed){ refreshed = true; return refreshToken().then(function(){ return attempt(n); }); }
          return { ok: false, alreadyRecorded: true, code: code };
        }
        var transient = !code || code === "unavailable" || code === "deadline-exceeded" || code === "resource-exhausted" || code === "aborted" || code === "cancelled" || code === "internal";
        if(transient && n < 3){
          return new Promise(function(r){ setTimeout(r, 1200 * n); }).then(function(){ return attempt(n + 1); });
        }
        if(err && !err.code) err.code = "network";
        throw err;
      });
  }
  return attempt(1);
}

// Admin-only (enforced by security rules): every registered student profile,
// so students who have not submitted any quiz yet (e.g. only used iLearn) are
// still listed in the teacher reports.
function listAllUsers(){
  return getDocs(collection(db, "users")).then(function(snap){
    var out = [];
    snap.forEach(function(d){ var x = d.data() || {}; out.push({ uid: d.id, name: x.name || "", email: x.email || "", className: x["class"] || "", blocked: x.blocked === true, role: x.role || "student", createdMs: x.createdAt && x.createdAt.toMillis ? x.createdAt.toMillis() : 0, sub: subFrom(x), examSession: x.examSession || "" }); });
    return out;
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
    name: cleanName(record.name),
    class: cleanClass(record.cls),
    perQuestion: record.perQuestion,
    totalEarned: num(record.totalEarned),
    totalMarks: num(record.totalMarks),
    pct: num(record.pct),
    topicStats: record.topicStats,
    completedAt: record.completedAt,
    minutesTaken: record.minutesTaken != null ? record.minutesTaken : null,
    recordedAt: serverTimestamp()
  };
  function save(retry){
    return setDoc(ref, payload, { merge: false })
      .then(function(){ return { ok: true }; })
      .catch(function(err){
        if(retry && err && err.code === "permission-denied") return refreshToken().then(function(){ return save(false); });
        return { ok: false, error: (err && err.message) || "Could not save.", code: err && err.code };
      });
  }
  return save(true);
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

// Admin: move a student to another class. The class is stored on the
// profile (users/{uid}) AND copied onto every result / progress document
// (the admin dashboard groups by the copy), so all of them are updated
// together. Profile is written first so the student's next login already
// sees the new class even if a later batch fails (safe to simply retry).
function changeStudentClass(uid, newClass){
  newClass = String(newClass || "").trim();
  if(!uid || !newClass) return Promise.reject(new Error("Missing student or class."));
  var refs = [];
  return Promise.all(ARCHIVE_COLLECTIONS.map(function(col){
    return getDocs(query(collection(db, col), where("uid", "==", uid))).then(function(qs){
      qs.forEach(function(d){ refs.push(d.ref); });
    });
  })).then(function(){
    return getDoc(doc(db, "users", uid));
  }).then(function(snap){
    if(snap.exists()) return setDoc(doc(db, "users", uid), { class: newClass }, { merge: true });
  }).then(function(){
    var chain = Promise.resolve();
    for(var i = 0; i < refs.length; i += 400){
      (function(chunk){
        chain = chain.then(function(){
          var b = writeBatch(db);
          chunk.forEach(function(r){ b.update(r, { class: newClass }); });
          return b.commit();
        });
      })(refs.slice(i, i + 400));
    }
    return chain;
  }).then(function(){ return { uid: uid, class: newClass, updated: refs.length }; });
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

// ---------- Admin: manage students (add / edit / block / delete) ----------
function cleanAdminName(v){
  return String(v || "").replace(/<[^>]*>/g, " ").replace(/[<>&]/g, "").replace(/\s+/g, " ").trim().slice(0, 80);
}

// Admin: rename a student (profile only; results keep the name they were saved with).
function adminRenameStudent(uid, name){
  name = cleanAdminName(name);
  if(!uid || !name) return Promise.reject(new Error("Please enter a name."));
  return setDoc(doc(db, "users", uid), { name: name }, { merge: true }).then(function(){ return { uid: uid, name: name }; });
}

// Admin: block / unblock. A blocked student is signed out at the next login
// check and (via firestore.rules) cannot write anything. Data is kept.
function setStudentBlocked(uid, blocked){
  if(!uid) return Promise.reject(new Error("Missing student."));
  var p = blocked ? { blocked: true } : { blocked: deleteField() };
  return updateDoc(doc(db, "users", uid), p).then(function(){ return { uid: uid, blocked: !!blocked }; });
}

// Admin: create a student account. Uses a SECOND, throw-away Firebase app so
// the admin stays signed in. The student gets a verification e-mail and can
// also use "Forgot password" to choose their own password.
function adminCreateStudent(name, email, cls, password){
  name = cleanAdminName(name); cls = String(cls || "").trim(); email = String(email || "").trim();
  if(!name) return Promise.reject(new Error("Please enter the student's name."));
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return Promise.reject(new Error("Please enter a valid e-mail address."));
  if(!/^[A-Za-z0-9 ._-]{1,20}$/.test(cls)) return Promise.reject(new Error("Please choose the class."));
  if(!password || String(password).length < MIN_PASSWORD) return Promise.reject(new Error("The password needs at least " + MIN_PASSWORD + " characters."));
  var sec = initializeApp(firebaseConfig, "adminCreate" + Date.now());
  var secAuth = initializeAuth(sec, { persistence: inMemoryPersistence });
  var uid = "", sent = false;
  return createUserWithEmailAndPassword(secAuth, email, password).then(function(cred){
    uid = cred.user.uid;
    return setDoc(doc(db, "users", uid), { name: name, email: email, class: cls, createdAt: serverTimestamp(), sub: { plan: "trial", start: serverTimestamp() } }).then(function(){
      return sendEmailVerification(cred.user).then(function(){ sent = true; }, function(){ sent = false; });
    });
  }).then(function(){
    return signOut(secAuth).catch(function(){});
  }).then(function(){
    return deleteApp(sec).catch(function(){});
  }).then(function(){ return { uid: uid, name: name, email: email, class: cls, verificationSent: sent }; },
  function(err){ deleteApp(sec).catch(function(){}); throw new Error(friendlyAuthError(err)); });
}

// Admin: remove a student for good. Their data is erased and a tiny marker is
// left in archive/{uid} so the old login keeps being turned away.
function adminDeleteStudent(uid, adminEmail){
  return archiveStudent(uid, adminEmail).then(function(r){
    return deleteArchivedStudent(uid).then(function(){
      return setDoc(doc(db, "archive", uid), { uid: uid, name: r.name || "", class: "", email: "", deleted: true,
        archivedAt: new Date().toISOString(), archivedBy: adminEmail || null, itemCount: 0 });
    });
  }).then(function(){ return { ok: true }; });
}

// ---------- Groups (classes with a code), join requests, roles, parent links ----------
// groups/{CODE}: { code, name, level: "10"|"11"|"12", teacherUid, teacherName, open, createdAt }
// The code starts with 10BR (IGCSE), AS (AS Level) or A2 (A Level): older pages use that
// prefix to decide what a student may open (see PQ_LEGACY_CLASS in firebase-config.js).
var GROUP_PREFIX = { "10": "10BR", "11": "AS", "12": "A2" };
function cleanGroupCode(c){ return String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 20); }

function listGroups(){
  return getDocs(collection(db, "groups")).then(function(snap){
    var out = []; snap.forEach(function(d){ var x = d.data() || {}; x.code = x.code || d.id; out.push(x); });
    return out.sort(function(a, b){ return String(a.code).localeCompare(String(b.code)); });
  });
}
function saveGroup(g){
  var code = cleanGroupCode(g && g.code), lv = String(g && g.level || "");
  if(!GROUP_PREFIX[lv]) return Promise.reject(new Error("Choose a level (IGCSE, AS or A2)."));
  if(code.indexOf(GROUP_PREFIX[lv]) !== 0) return Promise.reject(new Error("The code for this level must start with " + GROUP_PREFIX[lv] + "."));
  if(code.length < 5) return Promise.reject(new Error("The code is too short."));
  var name = cleanAdminName(g.name) || code;
  var rec = { code: code, name: name, level: lv, teacherUid: String(g.teacherUid || ""), teacherName: cleanAdminName(g.teacherName), open: g.open !== false, createdAt: g.createdAt || new Date().toISOString() };
  return setDoc(doc(db, "groups", code), rec).then(function(){ return rec; });
}
function deleteGroup(code){ return deleteDoc(doc(db, "groups", cleanGroupCode(code))); }
function getGroup(code){
  code = cleanGroupCode(code); if(!code) return Promise.resolve(null);
  return getDoc(doc(db, "groups", code)).then(function(snap){ return snap.exists() ? snap.data() : null; }).catch(function(){ return null; });
}

// Student: ask to join a class by its code. The teacher approves in the dashboard.
function requestJoin(uid, code){
  code = cleanGroupCode(code);
  if(!code) return Promise.reject(new Error("Please enter the class code."));
  return getGroup(code).then(function(g){
    if(!g) throw new Error("No class has that code. Please check it with your teacher.");
    if(g.open === false) throw new Error("This class is not accepting new students.");
    return getDoc(doc(db, "users", uid)).then(function(me){
      var rid = uid + "_" + code, ref = doc(db, "joinRequests", rid);
      return getDoc(ref).then(function(old){
        if(old.exists() && old.data().status === "pending") return { ok: true, already: true, group: g };
        var rec = { uid: uid, code: code, name: me.data().name, status: "pending", createdAt: serverTimestamp() };
        return setDoc(ref, rec).then(function(){ return { ok: true, group: g }; });
      });
    });
  });
}
function getMyJoinRequests(uid){
  return getDocs(query(collection(db, "joinRequests"), where("uid", "==", uid))).then(function(snap){
    var out = []; snap.forEach(function(d){ var x = d.data(); x.id = d.id; x.createdMs = x.createdAt && x.createdAt.toMillis ? x.createdAt.toMillis() : 0; delete x.createdAt; out.push(x); });
    return out.sort(function(a, b){ return b.createdMs - a.createdMs; });
  });
}
function cancelJoin(uid, code){ return deleteDoc(doc(db, "joinRequests", uid + "_" + cleanGroupCode(code))); }
function listJoinRequests(){
  return getDocs(collection(db, "joinRequests")).then(function(snap){
    var out = []; snap.forEach(function(d){ var x = d.data(); x.id = d.id; x.createdMs = x.createdAt && x.createdAt.toMillis ? x.createdAt.toMillis() : 0; delete x.createdAt; out.push(x); });
    return out.sort(function(a, b){ return b.createdMs - a.createdMs; });
  });
}
// Admin/teacher: approve (moves the student into the group, results included) or decline.
function decideJoin(req, approve, adminEmail){
  var ref = doc(db, "joinRequests", req.id);
  var go = approve ? changeStudentClass(req.uid, req.code) : Promise.resolve();
  return go.then(function(){
    return updateDoc(ref, { status: approve ? "approved" : "declined", decidedBy: adminEmail || null });
  }).then(function(){ return { ok: true }; });
}

// Admin: set a person's role. admin = a document at admins/{uid}; the others are users/{uid}.role.
var ROLES = ["student", "parent", "collaborator", "teacher", "admin"];
function setUserRole(uid, role, myUid){
  if(ROLES.indexOf(role) < 0) return Promise.reject(new Error("Unknown role."));
  if(uid === myUid && role !== "admin") return Promise.reject(new Error("You cannot remove your own admin access."));
  var ops = [];
  if(role === "admin") ops.push(setDoc(doc(db, "admins", uid), { since: new Date().toISOString() }));
  else if(uid !== myUid) ops.push(deleteDoc(doc(db, "admins", uid)));
  return Promise.all(ops).then(function(){
    return updateDoc(doc(db, "users", uid), role === "student" ? { role: deleteField() } : { role: role });
  }).then(function(){ return { uid: uid, role: role }; });
}
function listAdminUids(){
  // Admin documents can be read one by one only; the roster tells us who to check.
  return Promise.resolve([]);
}
function checkAdminUids(uids){
  return Promise.all(uids.map(function(u){ return getDoc(doc(db, "admins", u)).then(function(s){ return s.exists(); }, function(){ return false; }); }))
    .then(function(flags){ var out = {}; uids.forEach(function(u, i){ out[u] = flags[i]; }); return out; });
}

// Parents <-> students (admin links them; a parent will only see linked children).
function listParentLinks(){
  return getDocs(collection(db, "parentLinks")).then(function(snap){ var out = []; snap.forEach(function(d){ out.push(d.data()); }); return out; });
}
// children: [{ uid, name, class }]  (the name/class are copied so a parent can show them)
function setParentLinks(parentUid, children){
  var ids = children.map(function(c){ return c.uid; });
  return getDocs(query(collection(db, "parentLinks"), where("parentUid", "==", parentUid))).then(function(snap){
    var b = writeBatch(db), have = {};
    snap.forEach(function(d){ have[d.data().childUid] = d.ref; });
    Object.keys(have).forEach(function(c){ if(ids.indexOf(c) < 0) b.delete(have[c]); });
    children.forEach(function(c){ b.set(doc(db, "parentLinks", parentUid + "_" + c.uid), { parentUid: parentUid, childUid: c.uid, childName: cleanAdminName(c.name), childClass: String(c.class || "").slice(0, 20), createdAt: new Date().toISOString() }); });
    return b.commit();
  }).then(function(){ return { ok: true }; });
}

// Parent: the children a teacher linked to this account.
function listMyChildren(parentUid){
  return getDocs(query(collection(db, "parentLinks"), where("parentUid", "==", parentUid))).then(function(snap){
    var out = []; snap.forEach(function(d){ out.push(d.data()); });
    return out.sort(function(a, b){ return String(a.childName).localeCompare(String(b.childName)); });
  });
}
// Parent / staff: everything saved for one student (rules allow it only for a linked parent or staff).
function getChildData(childUid){
  var keys = ["ilearn", "ilearnAS", "ilearn12"];
  return Promise.all([
    getDocs(query(collection(db, "attempts"), where("uid", "==", childUid))),
    getDocs(query(collection(db, "examAttempts"), where("uid", "==", childUid))),
    Promise.all(keys.map(function(k){ return getMyProgress(childUid, k).catch(function(){ return null; }); }))
  ]).then(function(r){
    var a = [], e = []; r[0].forEach(function(d){ a.push(d.data()); }); r[1].forEach(function(d){ e.push(d.data()); });
    var prog = {}; keys.forEach(function(k, i){ if(r[2][i]) prog[k] = r[2][i]; });
    return { attempts: a, examAttempts: e, progress: prog };
  });
}

function listArchivedStudents(){
  return getDocs(collection(db, "archive")).then(function(snap){
    var out = [];
    snap.forEach(function(d){ var x = d.data(); if(x && !x.deleted) out.push(x); });
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

// ---------- Student feedback on the iLearn journey ----------
// One document per student per journey (id = uid_ilearn10br). A student can
// create it and later edit it; only admins can list every response.
function feedbackId(uid, key){ return uid + "_" + key; }

function getMyFeedback(uid, key){
  return getDoc(doc(db, "feedback", feedbackId(uid, key))).then(function(snap){
    return snap.exists() ? snap.data() : null;
  });
}

function submitFeedback(uid, key, record){
  var ref = doc(db, "feedback", feedbackId(uid, key));
  return getDoc(ref).then(function(snap){
    var payload = Object.assign({}, record, { uid: uid, journey: key, updatedAt: serverTimestamp() });
    if(!snap.exists()) payload.createdAt = serverTimestamp();
    else payload.createdAt = snap.data().createdAt;
    return setDoc(ref, payload, { merge: false });
  }).then(function(){ return { ok: true }; }).catch(function(err){
    return { ok: false, code: (err && err.code) || "", error: (err && err.message) || "Could not send your feedback." };
  });
}


// ---------- Course enquiries (from the chat assistant) ----------
// Anyone may CREATE one (see firestore.rules for the strict field checks); only staff can read or manage them.
// The promise resolves only after the server has stored the record, so the chat never claims a save that did not happen.
function submitCourseEnquiry(rec){
  var ref = doc(db, "courseEnquiries", rec.ref);
  var payload = Object.assign({}, rec, { status: "new", isRead: false, createdAt: serverTimestamp() });
  var uid = auth.currentUser && auth.currentUser.uid; if(uid) payload.uid = uid;
  var timer;
  var timeout = new Promise(function(_, no){ timer = setTimeout(function(){ no({ code: "timeout", message: "The server did not answer in time." }); }, 20000); });
  return Promise.race([setDoc(ref, payload), timeout]).then(function(){ clearTimeout(timer); return { ok: true, ref: rec.ref }; })
    .catch(function(err){ clearTimeout(timer); return { ok: false, code: (err && err.code) || "", error: (err && err.message) || "Could not save." }; });
}
function enquiryRow(d){
  var x = d.data() || {}, t = x.createdAt && x.createdAt.toMillis ? x.createdAt.toMillis() : 0;
  x.id = d.id; x.createdMs = t; delete x.createdAt; delete x.updatedAt; return x;
}
// Staff only: live list, newest first. onRows(rows, added) - "added" holds only records that arrived AFTER the first load
// (never our own pending writes), so the dashboard can alert exactly once per new item. Returns the unsubscribe function.
function subscribeLive(name, onRows, onError){
  var first = true;
  return onSnapshot(collection(db, name), function(snap){
    var out = [], added = [];
    snap.forEach(function(d){ out.push(enquiryRow(d)); });
    if(!first) snap.docChanges().forEach(function(c){ if(c.type === "added" && !c.doc.metadata.hasPendingWrites) added.push(enquiryRow(c.doc)); });
    first = false;
    out.sort(function(a, b){ return b.createdMs - a.createdMs; }); onRows(out, added);
  }, function(err){ if(onError) onError(err); });
}
function subscribeCourseEnquiries(onRows, onError){ return subscribeLive("courseEnquiries", onRows, onError); }
function updateCourseEnquiry(id, patch){
  var allowed = {}; ["status", "notes", "isRead"].forEach(function(k){ if(k in patch) allowed[k] = patch[k]; });
  allowed.updatedAt = serverTimestamp();
  return updateDoc(doc(db, "courseEnquiries", id), allowed).then(function(){ return { ok: true }; })
    .catch(function(err){ return { ok: false, error: (err && err.message) || "Could not update." }; });
}

// ---------- Messages and support requests from the chat assistant ----------
function submitChatMessage(rec){
  var ref = doc(db, "chatMessages", rec.ref);
  var payload = Object.assign({}, rec, { status: "unread", isRead: false, createdAt: serverTimestamp() });
  var uid = auth.currentUser && auth.currentUser.uid; if(uid) payload.uid = uid;
  var timer;
  var timeout = new Promise(function(_, no){ timer = setTimeout(function(){ no({ code: "timeout", message: "The server did not answer in time." }); }, 20000); });
  return Promise.race([setDoc(ref, payload), timeout]).then(function(){ clearTimeout(timer); return { ok: true, ref: rec.ref }; })
    .catch(function(err){ clearTimeout(timer); return { ok: false, code: (err && err.code) || "", error: (err && err.message) || "Could not save." }; });
}
function subscribeChatMessages(onRows, onError){ return subscribeLive("chatMessages", onRows, onError); }
function updateChatMessage(id, patch){
  var allowed = {}; ["status", "notes", "isRead", "replies", "readAt"].forEach(function(k){ if(k in patch) allowed[k] = patch[k]; });
  if(allowed.isRead === true && !("readAt" in allowed)) allowed.readAt = serverTimestamp();
  if(allowed.readAt === "now") allowed.readAt = serverTimestamp();
  allowed.updatedAt = serverTimestamp();
  return updateDoc(doc(db, "chatMessages", id), allowed).then(function(){ return { ok: true }; })
    .catch(function(err){ return { ok: false, error: (err && err.message) || "Could not update." }; });
}

// Admin-only (enforced by security rules): every feedback response, newest first.
function listAllFeedback(){
  return getDocs(collection(db, "feedback")).then(function(snap){
    var out = [];
    snap.forEach(function(d){
      var x = d.data() || {};
      var t = x.createdAt && x.createdAt.toMillis ? x.createdAt.toMillis() : 0;
      var u = x.updatedAt && x.updatedAt.toMillis ? x.updatedAt.toMillis() : t;
      x.id = d.id; x.createdMs = t; x.updatedMs = u; delete x.createdAt; delete x.updatedAt;
      out.push(x);
    });
    out.sort(function(a, b){ return (b.updatedMs || b.createdMs) - (a.updatedMs || a.createdMs); });
    return out;
  });
}

// ---------- Live sessions (small online groups, max 5 per slot) ----------
// liveBookings/{uid}   : one booking per student (id = uid, so nobody can hold two places)
// liveSlots/{slotKey}  : { count } how many places are taken (0-5); changed only together with a booking (see rules)
function liveLoad(uid){
  return Promise.all([getDocs(collection(db, "liveSlots")), getDoc(doc(db, "liveBookings", uid)), getDoc(doc(db, "liveWaitlist", uid))]).then(function(r){
    var counts = {}; r[0].forEach(function(d){ var c = (d.data() || {}).count; counts[d.id] = typeof c === "number" ? c : 0; });
    function pick(s){ if(!s.exists()) return null; var x = Object.assign({ id: s.id }, s.data()); if(x.createdAt && x.createdAt.toMillis) x.createdMs = x.createdAt.toMillis(); delete x.createdAt; return x; }
    return { counts: counts, mine: pick(r[1]), wait: pick(r[2]) };
  });
}
function liveSlotCount(key){
  return getDoc(doc(db, "liveSlots", key)).then(function(s){ var c = s.exists() ? (s.data() || {}).count : 0; return typeof c === "number" ? c : 0; });
}
function liveBook(uid, profile, slotKey, whatsapp, iso){
  return liveSlotCount(slotKey).then(function(c){
    if(c >= 5) return { ok: false, code: "full" };
    var b = writeBatch(db), rec = { uid: uid, slotKey: slotKey, name: profile.name, email: String(profile.email || "").trim(), whatsapp: whatsapp,
      "class": profile["class"], status: "booked", createdAt: serverTimestamp() };
    if(iso) rec.iso = iso;
    if(profile.examSession) rec.examSession = profile.examSession;
    b.set(doc(db, "liveBookings", uid), rec);
    b.set(doc(db, "liveSlots", slotKey), { count: c + 1, updatedAt: serverTimestamp() });
    b.delete(doc(db, "liveWaitlist", uid));
    return b.commit().then(function(){ return { ok: true }; }, function(err){
      // Someone else took the last place (or the counter moved): tell the page to refresh.
      return liveSlotCount(slotKey).then(function(n){ return { ok: false, code: n >= 5 ? "full" : (err && err.code === "permission-denied" ? "changed" : "error"), detail: err && err.code }; }, function(){ return { ok: false, code: "error" }; });
    });
  }, function(err){ return { ok: false, code: "error", detail: err && err.code }; });
}
// A student cancels their own booking; staff use the same call to free a place.
function liveCancel(uid, slotKey){
  return liveSlotCount(slotKey).then(function(c){
    var b = writeBatch(db);
    b.delete(doc(db, "liveBookings", uid));
    b.set(doc(db, "liveSlots", slotKey), { count: Math.max(0, c - 1), updatedAt: serverTimestamp() });
    return b.commit().then(function(){ return { ok: true }; });
  }).catch(function(err){ return { ok: false, code: (err && err.code) || "error" }; });
}
function liveJoinWaitlist(uid, profile, slotKey, whatsapp, iso){
  return liveSlotCount(slotKey).then(function(c){
    if(c < 5) return { ok: false, code: "notfull" };
    var rec = { uid: uid, slotKey: slotKey, name: profile.name, email: String(profile.email || "").trim(), whatsapp: whatsapp, "class": profile["class"], status: "waiting", createdAt: serverTimestamp() };
    if(iso) rec.iso = iso; if(profile.examSession) rec.examSession = profile.examSession;
    return setDoc(doc(db, "liveWaitlist", uid), rec).then(function(){ return { ok: true }; });
  }).catch(function(err){ return { ok: false, code: (err && err.code) || "error" }; });
}
function liveLeaveWaitlist(uid){
  return deleteDoc(doc(db, "liveWaitlist", uid)).then(function(){ return { ok: true }; }, function(err){ return { ok: false, code: (err && err.code) || "error" }; });
}
// Staff: move a waiting student into the slot (only if a place is free and they hold no booking).
function liveAdminPromote(w){
  return Promise.all([liveSlotCount(w.slotKey), getDoc(doc(db, "liveBookings", w.id))]).then(function(r){
    if(r[0] >= 5) return { ok: false, code: "full" };
    if(r[1].exists()) return { ok: false, code: "hasBooking" };
    var rec = { uid: w.id, slotKey: w.slotKey, name: w.name, email: w.email, whatsapp: w.whatsapp, "class": w["class"], status: "booked", createdAt: serverTimestamp() };
    if(w.iso) rec.iso = w.iso; if(w.examSession) rec.examSession = w.examSession;
    var b = writeBatch(db);
    b.set(doc(db, "liveBookings", w.id), rec);
    b.set(doc(db, "liveSlots", w.slotKey), { count: r[0] + 1, updatedAt: serverTimestamp() });
    b.delete(doc(db, "liveWaitlist", w.id));
    return b.commit().then(function(){ return { ok: true }; });
  }).catch(function(err){ return { ok: false, code: (err && err.code) || "error" }; });
}
function subscribeLiveWaitlist(onRows, onError){ return subscribeLive("liveWaitlist", onRows, onError); }
// Fresh sign-in token, sent to the notification Worker so it can check the booking really exists.
function getIdToken(){ return auth.currentUser ? auth.currentUser.getIdToken() : Promise.resolve(null); }
// ---------- My exam timetable (one private document per student) ----------
function getExamPlan(uid){
  return getDoc(doc(db, "examPlans", uid)).then(function(s){ return s.exists() ? s.data() : null; }).catch(function(){ return null; });
}
// Staff: every student's saved plan (rules allow staff to read; students only see their own).
function listExamPlans(){
  return getDocs(collection(db, "examPlans")).then(function(snap){
    var out = []; snap.forEach(function(d){ var x = d.data() || {}; out.push({ uid: d.id, items: Array.isArray(x.items) ? x.items : [], keyAM: x.keyAM || "", keyPM: x.keyPM || "", updatedMs: x.updatedAt && x.updatedAt.toMillis ? x.updatedAt.toMillis() : 0 }); });
    return out;
  });
}
function saveExamPlan(uid, plan){
  var rec = { items: (plan.items || []).slice(0, 14).map(String), keyAM: String(plan.keyAM || ""), keyPM: String(plan.keyPM || ""), updatedAt: serverTimestamp() };
  return setDoc(doc(db, "examPlans", uid), rec).then(function(){ return { ok: true }; }, function(err){ return { ok: false, code: (err && err.code) || "error" }; });
}
function subscribeLiveBookings(onRows, onError){ return subscribeLive("liveBookings", onRows, onError); }


// ---------- Tuition booking (hidden page: weekly slots) ----------
// tuitionConfig/main      : admin settings + the list of bookable slot keys (day_HHMM)
// tuitionTaken/{slotKey}  : public "this slot is taken" marker (no names)
// tuitionBookings/{uid_1|uid_2} : a student's booking, at most two per student
// tuitionLedger/{owner}   : admin-only: paid / sessions completed / note
function tuCfgRef(){ return doc(db, "tuitionConfig", "main"); }
function tuitionGetConfig(){
  return getDoc(tuCfgRef()).then(function(s){ return s.exists() ? s.data() : null; });
}
function tuitionLoad(uid){
  return Promise.all([
    tuitionGetConfig(),
    getDocs(collection(db, "tuitionTaken")),
    getDocs(query(collection(db, "tuitionBookings"), where("uid", "==", uid)))
  ]).then(function(r){
    var taken = {}, mine = [];
    r[1].forEach(function(d){ taken[d.id] = true; });
    r[2].forEach(function(d){ var x = d.data() || {}; mine.push({ id: d.id, slotKey: x.slotKey, status: x.status, name: x.name, grade: x.grade, assigned: !!x.assigned, changeTo: x.changeTo || "", changeResult: x.changeResult || "" }); });
    return { config: r[0], taken: taken, mine: mine };
  });
}
function tuitionBook(uid, profile, slotKey){
  return getDocs(query(collection(db, "tuitionBookings"), where("uid", "==", uid))).then(function(snap){
    var seats = { "1": null, "2": null };
    snap.forEach(function(d){ var n = d.id.split("_")[1]; if(n in seats) seats[n] = d.data() || {}; });
    var seat = null;
    ["1", "2"].forEach(function(n){ if(!seat && !seats[n]) seat = n; });
    ["1", "2"].forEach(function(n){ if(!seat && seats[n] && seats[n].status === "declined") seat = n; });
    if(!seat) return { ok: false, code: "limit" };
    var batch = writeBatch(db);
    batch.set(doc(db, "tuitionBookings", uid + "_" + seat), { uid: uid, slotKey: slotKey, name: profile.name, grade: profile["class"], status: "pending", createdAt: serverTimestamp() });
    batch.set(doc(db, "tuitionTaken", slotKey), { taken: true, at: serverTimestamp() });
    return batch.commit().then(function(){ return { ok: true }; }, function(err){
      // If the marker already exists somebody else got there first.
      return getDoc(doc(db, "tuitionTaken", slotKey)).then(function(t){
        return { ok: false, code: t.exists() ? "taken" : ((err && err.code) || "error"), error: (err && err.message) || "" };
      }, function(){ return { ok: false, code: (err && err.code) || "error" }; });
    });
  }).catch(function(err){ return { ok: false, code: (err && err.code) || "error", error: (err && err.message) || "" }; });
}
// Student: withdraw a pending request (frees the slot) or dismiss a declined one.
function tuitionCancel(bid, slotKey, status){
  var batch = writeBatch(db);
  batch.delete(doc(db, "tuitionBookings", bid));
  if(status === "pending") batch.delete(doc(db, "tuitionTaken", slotKey));
  return batch.commit().then(function(){ return { ok: true }; }, function(err){ return { ok: false, code: (err && err.code) || "error" }; });
}
// Student: ask to move an approved booking to another free slot (the teacher decides).
function tuitionRequestChange(bid, newKey){
  return updateDoc(doc(db, "tuitionBookings", bid), { changeTo: newKey, changeAt: serverTimestamp(), changeResult: deleteField() })
    .then(function(){ return { ok: true }; }, function(err){ return { ok: false, code: (err && err.code) || "error" }; });
}
// Student: withdraw a change request, or dismiss the "declined" note.
function tuitionClearChange(bid){
  return updateDoc(doc(db, "tuitionBookings", bid), { changeTo: deleteField(), changeAt: deleteField(), changeResult: deleteField() })
    .then(function(){ return { ok: true }; }, function(err){ return { ok: false, code: (err && err.code) || "error" }; });
}
// Admin: approve (move the booking) or decline a change request.
function tuitionDecideChange(b, approve){
  var ref = doc(db, "tuitionBookings", b.id);
  if(!approve) return updateDoc(ref, { changeTo: deleteField(), changeAt: deleteField(), changeResult: "declined" })
    .then(function(){ return { ok: true }; }, function(err){ return { ok: false, code: (err && err.code) || "error" }; });
  return getDoc(doc(db, "tuitionTaken", b.changeTo)).then(function(t){
    if(t.exists()) return { ok: false, code: "taken" };
    var batch = writeBatch(db);
    batch.update(ref, { slotKey: b.changeTo, changeTo: deleteField(), changeAt: deleteField(), changeResult: deleteField() });
    batch.delete(doc(db, "tuitionTaken", b.slotKey));
    batch.set(doc(db, "tuitionTaken", b.changeTo), { taken: true, at: serverTimestamp() });
    return batch.commit().then(function(){ return { ok: true }; });
  }).catch(function(err){ return { ok: false, code: (err && err.code) || "error" }; });
}

// ----- admin -----
function tuitionAdminLoad(){
  return Promise.all([tuitionGetConfig(), getDocs(collection(db, "tuitionBookings")), getDocs(collection(db, "tuitionLedger")), getDocs(collection(db, "tuitionTaken"))]).then(function(r){
    var bookings = [], ledger = {}, taken = {};
    r[1].forEach(function(d){ var x = d.data() || {}; x.id = d.id; x.createdMs = x.createdAt && x.createdAt.toMillis ? x.createdAt.toMillis() : 0; delete x.createdAt; delete x.decidedAt; delete x.changeAt; bookings.push(x); });
    r[2].forEach(function(d){ var x = d.data() || {}; delete x.updatedAt; ledger[d.id] = x; });
    r[3].forEach(function(d){ taken[d.id] = true; });
    return { config: r[0], bookings: bookings, ledger: ledger, taken: taken };
  });
}
function tuitionSaveConfig(cfg){ return setDoc(tuCfgRef(), Object.assign({}, cfg, { updatedAt: serverTimestamp() })); }
// status: "approved" | "declined" | "pending"
function tuitionSetStatus(b, status){
  var batch = writeBatch(db), ref = doc(db, "tuitionBookings", b.id), tk = doc(db, "tuitionTaken", b.slotKey);
  batch.set(ref, { status: status, decidedAt: serverTimestamp() }, { merge: true });
  if(status === "declined") batch.delete(tk); else batch.set(tk, { taken: true, at: serverTimestamp() });
  return batch.commit().then(function(){ return { ok: true }; }, function(err){ return { ok: false, code: (err && err.code) || "error" }; });
}
function tuitionAdminRemove(b){
  var batch = writeBatch(db);
  batch.delete(doc(db, "tuitionBookings", b.id)); batch.delete(doc(db, "tuitionTaken", b.slotKey));
  return batch.commit().then(function(){ return { ok: true }; }, function(err){ return { ok: false, code: (err && err.code) || "error" }; });
}
// A student who has no account (or an existing one you enter by hand), approved straight away.
function tuitionAdminAdd(rec){
  var owner = "manual_" + Math.random().toString(36).slice(2, 10), batch = writeBatch(db);
  batch.set(doc(db, "tuitionBookings", owner + "_1"), { uid: owner, slotKey: rec.slotKey, name: rec.name, grade: rec.grade, status: "approved", manual: true, createdAt: serverTimestamp() });
  batch.set(doc(db, "tuitionTaken", rec.slotKey), { taken: true, at: serverTimestamp() });
  batch.set(doc(db, "tuitionLedger", owner), { name: rec.name, grade: rec.grade, paid: false, sessionsDone: 0, note: "", updatedAt: serverTimestamp() });
  return batch.commit().then(function(){ return { ok: true }; }, function(err){ return { ok: false, code: (err && err.code) || "error" }; });
}
// Admin: put a REGISTERED student into a slot (approved at once). It appears in that student's own bookings.
function tuitionAdminAssign(rec){
  var batch = writeBatch(db);
  batch.set(doc(db, "tuitionBookings", rec.uid + "_" + rec.seat), { uid: rec.uid, slotKey: rec.slotKey, name: rec.name, grade: rec.grade, status: "approved", assigned: true, createdAt: serverTimestamp() });
  batch.set(doc(db, "tuitionTaken", rec.slotKey), { taken: true, at: serverTimestamp() });
  batch.set(doc(db, "tuitionLedger", rec.uid), { name: rec.name, grade: rec.grade, updatedAt: serverTimestamp() }, { merge: true });
  return batch.commit().then(function(){ return { ok: true }; }, function(err){ return { ok: false, code: (err && err.code) || "error" }; });
}
function tuitionLedgerSave(owner, data){
  return setDoc(doc(db, "tuitionLedger", owner), Object.assign({}, data, { updatedAt: serverTimestamp() }), { merge: true })
    .then(function(){ return { ok: true }; }, function(err){ return { ok: false, code: (err && err.code) || "error" }; });
}

// True only if admins/{uid} exists. The rules let a user read ONLY their own
// admins doc, so this reveals nothing about anyone else.
function checkIsAdmin(uid){
  // Teachers and collaborators also get the dashboard / preview pages (what they can
  // actually read or change is decided by firestore.rules, not by this check).
  return getStaffRole(uid).then(function(r){ return !!r; });
}
// "admin" | "teacher" | "collaborator" | "" (not staff)
function getStaffRole(uid){
  return getDoc(doc(db, "admins", uid)).then(function(snap){
    if(snap.exists()) return "admin";
    return getDoc(doc(db, "users", uid)).then(function(u){
      var r = u.exists() ? u.data().role : "";
      return (r === "teacher" || r === "collaborator") ? r : "";
    });
  }).catch(function(){ return ""; });
}

window.PQFirebase = {
  watchMySubscription: watchMySubscription,
  subHistoryList: subHistoryList,
  assignSubscriptions: assignSubscriptions,
  checkIsAdmin: checkIsAdmin,
  getStaffRole: getStaffRole,
  listMyChildren: listMyChildren,
  getChildData: getChildData,
  getMyFeedback: getMyFeedback,
  submitFeedback: submitFeedback,
  listAllFeedback: listAllFeedback,
  submitCourseEnquiry: submitCourseEnquiry,
  subscribeCourseEnquiries: subscribeCourseEnquiries,
  updateCourseEnquiry: updateCourseEnquiry,
  submitChatMessage: submitChatMessage,
  subscribeChatMessages: subscribeChatMessages,
  updateChatMessage: updateChatMessage,
  liveLoad: liveLoad,
  liveBook: liveBook,
  liveCancel: liveCancel,
  liveJoinWaitlist: liveJoinWaitlist,
  liveLeaveWaitlist: liveLeaveWaitlist,
  liveAdminPromote: liveAdminPromote,
  subscribeLiveWaitlist: subscribeLiveWaitlist,
  getIdToken: getIdToken,
  getExamPlan: getExamPlan,
  saveExamPlan: saveExamPlan,
  listExamPlans: listExamPlans,
  subscribeLiveBookings: subscribeLiveBookings,
  saveMySession: saveMySession,
  EXAM_SESSIONS: EXAM_SESSIONS,
  tuitionLoad: tuitionLoad,
  tuitionBook: tuitionBook,
  tuitionCancel: tuitionCancel,
  tuitionRequestChange: tuitionRequestChange,
  tuitionClearChange: tuitionClearChange,
  tuitionDecideChange: tuitionDecideChange,
  tuitionAdminLoad: tuitionAdminLoad,
  tuitionSaveConfig: tuitionSaveConfig,
  tuitionSetStatus: tuitionSetStatus,
  tuitionAdminRemove: tuitionAdminRemove,
  tuitionAdminAdd: tuitionAdminAdd,
  tuitionAdminAssign: tuitionAdminAssign,
  tuitionLedgerSave: tuitionLedgerSave,
  signUp: signUp,
  logIn: logIn,
  logOut: logOut,
  resetPassword: resetPassword,
  resendVerification: resendVerification,
  onAuthChange: onAuthChange,
  getMyProfile: getMyProfile,
  getMyAttempt: getMyAttempt,
  recordAttempt: recordAttempt,
  listAllUsers: listAllUsers,
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
  changeStudentClass: changeStudentClass,
  archiveStudent: archiveStudent,
  listArchivedStudents: listArchivedStudents,
  restoreStudent: restoreStudent,
  deleteArchivedStudent: deleteArchivedStudent,
  adminRenameStudent: adminRenameStudent,
  setStudentBlocked: setStudentBlocked,
  adminCreateStudent: adminCreateStudent,
  adminDeleteStudent: adminDeleteStudent,
  googleSignIn: googleSignIn,
  completeGoogleProfile: completeGoogleProfile,
  listGroups: listGroups,
  saveGroup: saveGroup,
  deleteGroup: deleteGroup,
  getGroup: getGroup,
  requestJoin: requestJoin,
  getMyJoinRequests: getMyJoinRequests,
  cancelJoin: cancelJoin,
  listJoinRequests: listJoinRequests,
  decideJoin: decideJoin,
  setUserRole: setUserRole,
  checkAdminUids: checkAdminUids,
  listParentLinks: listParentLinks,
  setParentLinks: setParentLinks
};
