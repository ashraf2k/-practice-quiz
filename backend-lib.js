// ============================================================
// Backend (Google Apps Script Web App) — shared by quiz.html and
// admin.html so there is exactly one place to paste the deployed
// Web App URL. See the setup instructions sent alongside this repo
// (Practice_Quiz_Backend_AppsScript.gs). It must end in /exec.
//
// Left blank, the quiz runs in local-device-only mode (each browser
// only knows about attempts made on itself) and the admin dashboard
// has nothing to show.
// ============================================================
var BACKEND_URL = "";
var FETCH_TIMEOUT_MS = 8000;

function fetchWithTimeout(url, opts){
  var controller = (typeof AbortController !== "undefined") ? new AbortController() : null;
  if(controller) opts.signal = controller.signal;
  var timer = controller ? setTimeout(function(){ controller.abort(); }, FETCH_TIMEOUT_MS) : null;
  return fetch(url, opts).finally(function(){ if(timer) clearTimeout(timer); });
}
