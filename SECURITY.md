# Security guide — iLearnCS practice quiz

This site is static (GitHub Pages) + Firebase Auth + Firestore. **Anything in
the HTML/JS is public.** Security therefore lives in two places that are not
visible to students: Firebase Authentication (passwords are stored hashed by
Google — we never see or store them) and `firestore.rules` (server-side).

## What the code now guarantees

| Threat | Defence |
| --- | --- |
| Admin username/e-mail visible in page source | Removed from `admin.html` and `firebase-config.js`. Admin = a document at `admins/{uid}`; the dashboard asks the server, nothing is hard-coded. |
| Passwords | Never stored client-side, in the repo, or in Firestore. Firebase Auth hashes them (scrypt). Minimum raised to 8 characters. |
| Student reads/changes another student's data | Rules derive ownership from `request.auth.uid`; document ids must be `uid_key`; no student can `list` any collection. |
| Student promotes themselves to admin | `admins/*` is read-only for own doc, **no client can write it**; only the Firebase console can create one. |
| Student edits own profile (class/e-mail/name) | `users/{uid}`: create once, no update/delete by the owner; e-mail must equal the verified token e-mail. |
| Forged scores / junk data | Every write is key-whitelisted, typed, range-checked (`score <= total`, `pct 0–100`), list/size-capped; `recordedAt == request.time` (server clock). Attempt caps (2; `comm9618`/`comm9618_exam` once) unchanged. |
| Stored XSS reaching the teacher | Rules reject `< > &` in names; admin dashboard coerces every number/string on load and escapes on render; strict CSP (inline scripts allowed by hash only, `object-src 'none'`). |
| Clickjacking | `framebust.js` loaded first on every page. |
| Unknown collections | `match /{document=**} { allow read, write: if false; }` |
| Deleting graded records | Students cannot; only admins. |

Regenerate the CSP after editing any inline `<script>`: `node tools/csp.js`.

## ⚠ Owner-only steps (cannot be done from code) — do these IN ORDER

1. **Create the admin marker doc FIRST** (otherwise you lock yourself out):
   Firebase console → Authentication → Users → copy your teacher account's **User UID**.
   Firestore → *Start collection* `admins` → Document ID = that UID → add any field
   (e.g. `role: "teacher"`) → Save.
2. **Publish the rules:** Firestore → Rules → paste the whole of `firestore.rules` → Publish.
3. **Rotate the admin password** (the admin e-mail was visible in earlier versions
   and remains in git history): Authentication → Users → ⋮ → Reset password, then
   use a long unique passphrase and turn on a password manager.
4. **App Check** (blocks scripts that call your API outside your site):
   Build → App Check → register the web app with reCAPTCHA v3/Enterprise →
   *Enforce* for Firestore and Authentication. (Then add the App Check
   initialisation to the client — ask Claude to wire it once you have the site key.)
5. **Restrict the API key:** Google Cloud console → APIs & Services → Credentials →
   the browser key → *Application restrictions: Websites* → add your GitHub Pages
   origin (and `localhost` for testing); *API restrictions*: Identity Toolkit,
   Token Service, Firestore.
6. **Authentication → Settings:** enable *Email enumeration protection*, set a
   *password policy* (min 8, upper/lower/number), keep only *Email/Password*
   enabled under Sign-in method, and add only your real domain under
   *Authorized domains*.
7. **Backups:** Firestore → Disaster recovery → enable *Point-in-time recovery*
   and a daily backup schedule.
8. **Budget alert:** Google Cloud → Billing → Budgets & alerts → set a low cap with
   e-mail alerts (protects against abuse-driven cost).
9. **E-mail verification (new accounts):** nothing to enable, but check Authentication →
   Templates → *Email address verification* → pencil icon → Sender name: `iLearnCS learning hub` (also subject, language) and that your
   GitHub Pages domain is under Authorized domains. Accounts created on/after 18 Oct 2026
   must click the link; older accounts are grandfathered. Republish `firestore.rules` so the
   server enforces it too (`verifiedOrLegacy()`).
10. **2-step verification** on the Google account that owns the Firebase project and
   on the GitHub account that owns the repo.

## Rules Playground checklist (Firestore → Rules → Rules Playground)

The Firestore emulator could not be run in the build environment, so verify once
by hand after publishing:

* Unauthenticated `get /users/anyone` → **deny**.
* Authenticated as student A: `get /attempts/{A}_datarep` → allow; `get /attempts/{B}_datarep` → deny; `list /attempts` → deny.
* Student A `create /users/{A}` with `class` + e-mail not matching token → **deny**; matching → allow.
* Student A `create /admins/{A}` → **deny**.
* Student A `create /attempts/{A}_datarep` with `score` > `total` → **deny**; with extra field → **deny**; valid, `recordedAt = request.time` → allow.
* As the admin (has `admins/{uid}` doc): `list /attempts` → allow.

## Known limitations

* The old admin e-mail is still in git history (cannot be fully removed from a
  public repo without rewriting history); treat it as public and rely on a strong
  rotated password + 2-step verification + App Check.
* Firestore rules cannot rate-limit; App Check + Authentication's built-in
  throttling cover brute-force and bulk-write abuse.
* Rules cannot validate every element inside lists (e.g. `perQuestion`); the
  dashboard therefore treats all stored data as untrusted (coerce + escape + CSP).
