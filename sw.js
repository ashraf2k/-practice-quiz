// Minimal service worker: makes the site installable as an app.
// Network-first for everything so students always get the latest quizzes;
// the cache is only a fallback for the app shell when offline.
var CACHE = "ilearncs-shell-v1";
var SHELL = ["./", "./index.html", "./shared.css", "./logo.png", "./icons/icon-192.png"];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(SHELL); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET" || new URL(req.url).origin !== location.origin) return; // never touch Firebase etc.
  e.respondWith(fetch(req).then(function(res){
    if(res && res.ok){ var copy = res.clone(); caches.open(CACHE).then(function(c){ c.put(req, copy); }); }
    return res;
  }).catch(function(){ return caches.match(req).then(function(m){ return m || caches.match("./index.html"); }); }));
});
