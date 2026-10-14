#!/usr/bin/env node
// Regenerates the Content-Security-Policy <meta> tag on every page, hashing
// each inline <script> so only the exact scripts we shipped can run.
// Run after ANY edit to an inline script:   node tools/csp.js
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const root = path.join(__dirname, "..");
const pages = fs.readdirSync(root).filter(f => f.endsWith(".html"));
const MARK = /<meta http-equiv="Content-Security-Policy"[^>]*>\s*/;
for (const f of pages) {
  const p = path.join(root, f);
  let html = fs.readFileSync(p, "utf8");
  html = html.replace(MARK, "");
  const hashes = [];
  html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (m, attrs, body) => {
    if (/\bsrc\s*=/.test(attrs) || !body.trim()) return m;
    hashes.push("'sha256-" + crypto.createHash("sha256").update(body, "utf8").digest("base64") + "'");
    return m;
  });
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'wasm-unsafe-eval' https://cdn.jsdelivr.net " + hashes.join(" "),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "media-src 'self' blob:",
    "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com wss://*.firebaseio.com https://cdn.jsdelivr.net https://huggingface.co https://*.huggingface.co https://*.hf.co",
    "frame-src https://www.youtube-nocookie.com https://www.youtube.com https://*.firebaseapp.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join("; ");
  const tag = '<meta http-equiv="Content-Security-Policy" content="' + csp.replace(/\s+/g, " ") + '" />\n';
  // framebust.js must load first
  if (!/framebust\.js/.test(html)) html = html.replace(/(<meta charset[^>]*>\s*)/i, "$1<script src=\"framebust.js\"></script>\n");
  html = html.replace(/(<meta charset[^>]*>\s*)/i, "$1" + tag);
  fs.writeFileSync(p, html);
  console.log(f, hashes.length + " inline script hash(es)");
}
