// Cloudflare Worker: sends YOU a Telegram alert when a student books a live session or joins the waiting list.
// The bot token and your chat id live only here, as Worker secrets (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID).
//
// How it stays safe: the website sends the student's sign-in token. This Worker uses that token to read the
// booking from Firestore AS THE STUDENT (the security rules only let a student read their own booking), and only
// alerts you if the booking really exists and is fresh. A stranger cannot make it send fake alerts, and the
// alert text is built here from the stored record, never from what the browser sends.
const ALLOWED_ORIGINS = ["https://ashraf2k.github.io", "https://ilearnhub.web.app", "https://ilearnhub.firebaseapp.com"];
const PROJECT_ID = "practicequestions-6cfd1";
const DAYS = { sat: "Saturday", sun: "Sunday", mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday" };
const CAP = 5, MINUTES = 90, FRESH_MS = 10 * 60 * 1000;
const hits = new Map();   // per-isolate limits

function clean(s, n){ return String(s == null ? "" : s).replace(/[\u0000-\u001f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, n); }
function cors(origin){ return { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Vary": "Origin" }; }
function f12(m){ const h = Math.floor(m / 60) % 24, mm = m % 60, ap = h >= 12 ? "PM" : "AM"; return (h % 12 || 12) + ":" + (mm < 10 ? "0" : "") + mm + " " + ap; }
export function slotLabel(key){
  const m = /^(sat|sun|mon|tue|wed|thu)_(\d{2})(\d{2})$/.exec(String(key)); if(!m) return null;
  const a = Number(m[2]) * 60 + Number(m[3]), A = f12(a), B = f12(a + MINUTES);
  return DAYS[m[1]] + " " + (A.slice(-2) === B.slice(-2) ? A.slice(0, -3) : A) + "–" + B + " (Saudi time)";
}
function uidOf(token){
  try {
    const p = JSON.parse(atob(String(token).split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    if(p.aud !== PROJECT_ID || !p.user_id || !/^[A-Za-z0-9]{10,40}$/.test(p.user_id)) return null;
    return p.user_id;
  } catch(e){ return null; }
}
const sv = (f, k) => f && f[k] && (f[k].stringValue != null ? f[k].stringValue : f[k].timestampValue != null ? f[k].timestampValue : f[k].integerValue != null ? Number(f[k].integerValue) : null);
async function fsGet(path, token){
  const r = await fetch("https://firestore.googleapis.com/v1/projects/" + PROJECT_ID + "/databases/(default)/documents/" + path, { headers: { Authorization: "Bearer " + token } });
  return r.ok ? (await r.json()).fields || {} : null;
}
// Returns the alert text, or null if the booking does not exist / is not fresh.
export async function buildAlert(kind, token){
  const uid = uidOf(token); if(!uid) return null;
  const col = kind === "waitlist" ? "liveWaitlist" : kind === "booking" ? "liveBookings" : null; if(!col) return null;
  const f = await fsGet(col + "/" + uid, token); if(!f) return null;
  const when = Date.parse(sv(f, "createdAt")); if(!when || Date.now() - when > FRESH_MS) return null;
  const label = slotLabel(sv(f, "slotKey")); if(!label) return null;
  const who = clean(sv(f, "name"), 60) || "A student", lvl = clean(sv(f, "class"), 20), ses = clean(sv(f, "examSession"), 30);
  const info = who + (lvl ? " · " + lvl : "") + (ses ? " · " + ses : "");
  if(kind === "waitlist") return "⏳ WAITING LIST (slot is full)\n" + info + "\n" + label + "\nOpen the dashboard → Live sessions to move them in when a place opens.";
  const sl = await fsGet("liveSlots/" + sv(f, "slotKey"), token);
  const n = sl ? sv(sl, "count") : null;
  return "📅 NEW LIVE-SESSION BOOKING\n" + info + "\n" + label + (typeof n === "number" ? "\nSlot now: " + n + " of " + CAP + " booked" : "") + "\nWhatsApp number: see the dashboard → Live sessions.";
}

export default {
  async fetch(request, env){
    const origin = request.headers.get("Origin") || "";
    const ok = ALLOWED_ORIGINS.includes(origin);
    if(request.method === "OPTIONS") return new Response(null, { status: ok ? 204 : 403, headers: ok ? cors(origin) : {} });
    if(request.method !== "POST" || !ok) return new Response("Forbidden", { status: 403 });
    const ip = request.headers.get("CF-Connecting-IP") || "?", now = Date.now();
    const recent = (hits.get(ip) || []).filter(t => now - t < 600000);
    if(recent.length >= 8) return new Response("Too many", { status: 429, headers: cors(origin) });
    recent.push(now); hits.set(ip, recent);
    let body; try { body = JSON.parse(await request.text()); } catch(e){ return new Response("Bad request", { status: 400, headers: cors(origin) }); }
    const text = await buildAlert(body && body.kind, body && body.idToken);
    if(!text) return new Response("No such booking", { status: 404, headers: cors(origin) });
    const key = (uidOf(body.idToken) || "") + ":" + body.kind;   // one alert per student and kind every 10 minutes
    if(hits.get(key) && now - hits.get(key) < 600000) return new Response("ok", { status: 200, headers: cors(origin) });
    hits.set(key, now);
    const r = await fetch("https://api.telegram.org/bot" + env.TELEGRAM_BOT_TOKEN + "/sendMessage", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, disable_web_page_preview: true })
    });
    return new Response(r.ok ? "ok" : "telegram error", { status: r.ok ? 200 : 502, headers: cors(origin) });
  }
};
