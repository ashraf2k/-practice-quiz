/* Animated explainers for the Unit 1 tutorial (Technology, IP and Security). Every scene is drawn in SVG and runs on a time value f (0..1).
   window.TECHANIM.mount(box, topic) builds the player; the steps under the picture follow the animation. */
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", D = 15000;
  function E(tag, a, p, txt){ var e = document.createElementNS(NS, tag); if(a) for(var k in a) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; if(p) p.appendChild(e); return e; }
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function ez(x){ x = cl(x); return x < .5 ? 2 * x * x : 1 - 2 * (1 - x) * (1 - x); }
  function lp(a, b, t){ return a + (b - a) * t; }
  function sg(f, a, b){ return cl((f - a) / (b - a)); }
  var FONT = "system-ui,Segoe UI,Arial,sans-serif";
  var C = { bg: "#eef3f9", ink: "#1d2a3a", mute: "#6b7a8d", blue: "#2f7de1", green: "#1f9d55", red: "#d8382f", amber: "#e8a020", card: "#fff", line: "#b8c5d6", dark: "#33404f" };
  function T(p, x, y, s, o){ o = o || {}; var a = { x: x, y: y, "font-size": o.s || 9, "font-family": FONT, fill: o.c || C.ink, "text-anchor": o.a || "middle", "font-weight": o.w || 700 }; if(o.o != null) a.opacity = o.o; return E("text", a, p, s); }
  function R(p, x, y, w, h, o){ o = o || {}; return E("rect", { x: x, y: y, width: w, height: h, rx: o.r == null ? 4 : o.r, fill: o.f || C.card, stroke: o.s || C.line, "stroke-width": o.sw == null ? 1 : o.sw, opacity: o.o == null ? 1 : o.o }, p); }
  function Cc(p, x, y, r, f, o){ o = o || {}; return E("circle", { cx: x, cy: y, r: r, fill: f, stroke: o.s || "none", "stroke-width": o.sw || 1, opacity: o.o == null ? 1 : o.o }, p); }
  function G(p, o){ return E("g", o || {}, p); }
  function at(g, x, y, s, op){ g.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") scale(" + (s == null ? 1 : s) + ")"); if(op != null) g.setAttribute("opacity", op); }
  // ----- little icons, all centred on (0,0) -----
  function person(p, col){ var g = G(p); Cc(g, 0, -8, 6, col || C.blue); E("path", { d: "M-10,12 Q-10,0 0,0 Q10,0 10,12Z", fill: col || C.blue }, g); return g; }
  function hacker(p){ var g = G(p); Cc(g, 0, -8, 7, "#222"); E("path", { d: "M-12,14 Q-12,0 0,0 Q12,0 12,14Z", fill: "#222" }, g); R(g, -5, -10, 10, 3, { f: C.red, s: "none", r: 1 }); return g; }
  function phone(p, w, h){ var g = G(p); R(g, -w / 2, -h / 2, w, h, { f: "#fff", s: C.dark, sw: 1.8, r: 8 }); Cc(g, 0, h / 2 - 5, 1.8, C.dark); return g; }
  function server(p, col){ var g = G(p); for(var i = 0; i < 3; i++){ R(g, -17, -22 + i * 15, 34, 12, { f: col || "#d6dfeb", s: C.dark, r: 3 }); Cc(g, 9, -16 + i * 15, 1.8, C.green); E("line", { x1: -12, y1: -16 + i * 15, x2: 2, y2: -16 + i * 15, stroke: C.dark, "stroke-width": 1.2 }, g); } return g; }
  function bug(p, col, s){ var g = G(p), c = col || C.red; E("ellipse", { cx: 0, cy: 0, rx: 4, ry: 5, fill: c }, g); Cc(g, 0, -6, 2.5, c); [-1, 0, 1].forEach(function(k){ E("line", { x1: -4, y1: k * 3, x2: -8, y2: k * 3 + k * 2, stroke: c, "stroke-width": 1 }, g); E("line", { x1: 4, y1: k * 3, x2: 8, y2: k * 3 + k * 2, stroke: c, "stroke-width": 1 }, g); }); if(s) g.setAttribute("transform", "scale(" + s + ")"); return g; }
  function lock(p, open, col){ var g = G(p); E("path", { d: open ? "M-5,-4 V-9 a5,5 0 0 1 10,0" : "M-5,-4 V-8 a5,5 0 0 1 10,0 V-4", fill: "none", stroke: col || C.dark, "stroke-width": 2 }, g); R(g, -8, -4, 16, 12, { f: col || C.amber, s: C.dark, r: 2, sw: 1 }); Cc(g, 0, 2, 1.8, C.dark); return g; }
  function doc(p, col){ var g = G(p); E("path", { d: "M-8,-10 H4 L9,-5 V10 H-8Z", fill: col || "#fff", stroke: C.dark, "stroke-width": 1.2 }, g); E("path", { d: "M4,-10 V-5 H9", fill: "none", stroke: C.dark, "stroke-width": 1 }, g); [-2, 2, 6].forEach(function(y){ E("line", { x1: -5, y1: y, x2: 5, y2: y, stroke: C.line, "stroke-width": 1 }, g); }); return g; }
  function computer(p, col){ var g = G(p); R(g, -14, -11, 28, 19, { f: col || "#fff", s: C.dark, sw: 1.5, r: 2 }); R(g, -6, 10, 12, 3, { f: C.dark, s: "none", r: 1 }); return g; }
  function cam(p, col){ var g = G(p); R(g, -10, -6, 20, 12, { f: col || "#fff", s: C.dark, r: 3 }); Cc(g, 0, 0, 3.6, C.dark); Cc(g, 0, 0, 1.4, "#fff"); return g; }
  function router(p, col){ var g = G(p); R(g, -12, -2, 24, 9, { f: col || "#fff", s: C.dark, r: 2 }); E("line", { x1: -8, y1: -2, x2: -10, y2: -11, stroke: C.dark, "stroke-width": 1.5 }, g); E("line", { x1: 8, y1: -2, x2: 10, y2: -11, stroke: C.dark, "stroke-width": 1.5 }, g); Cc(g, -6, 3, 1.3, C.green); Cc(g, -2, 3, 1.3, C.green); return g; }
  function cloud(p, col){ var g = G(p); E("path", { d: "M-18,8 a9,9 0 0 1 3,-17 a12,12 0 0 1 22,-2 a9,9 0 0 1 9,19Z", fill: col || "#fff", stroke: C.line, "stroke-width": 1.2 }, g); return g; }
  function tick(p, c){ return E("path", { d: "M-4,0 L-1,3 L5,-4", fill: "none", stroke: c || C.green, "stroke-width": 2.2, "stroke-linecap": "round", "stroke-linejoin": "round" }, p); }
  function cross(p, c){ return E("path", { d: "M-4,-4 L4,4 M4,-4 L-4,4", fill: "none", stroke: c || C.red, "stroke-width": 2.2, "stroke-linecap": "round" }, p); }
  function eye(p){ var g = G(p); E("path", { d: "M-12,0 Q0,-10 12,0 Q0,10 -12,0Z", fill: "#fff", stroke: C.dark, "stroke-width": 1.4 }, g); Cc(g, 0, 0, 4, C.dark); Cc(g, 1, -1, 1.3, "#fff"); return g; }
  function line(p, x1, y1, x2, y2, col, w, dash){ var a = { x1: x1, y1: y1, x2: x2, y2: y2, stroke: col || C.line, "stroke-width": w || 1.5 }; if(dash) a["stroke-dasharray"] = dash; return E("line", a, p); }
  function mv(el, x, y){ el.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")"); }
  function vis(el, o){ el.setAttribute("opacity", o); }
  function rnd(seed){ var s = seed; return function(){ s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

  var S = {};
  function base(){
    var svg = E("svg", { viewBox: "0 0 340 230", class: "gm-svg tk-svg", role: "img", "aria-label": "Animated explanation of the steps" });
    R(svg, 0, 0, 340, 230, { f: C.bg, s: "none", r: 0 });
    var layer = G(svg), cap = T(svg, 170, 222, "", { s: 10, c: C.ink }); cap.setAttribute("paint-order", "stroke"); cap.setAttribute("stroke", C.bg); cap.setAttribute("stroke-width", 3);
    return { svg: svg, g: layer, cap: cap };
  }

  // ===== 1. collecting data =====
  S.collect = function(B){
    var g = B.g, p = G(g); at(p, 70, 105, 1);
    phone(p, 92, 118);
    var rows = ["Contacts", "Location", "Camera"].map(function(n, i){ var y = -34 + i * 24; T(p, -38, y + 3, n, { a: "start", s: 8.5, c: C.ink }); R(p, 18, y - 5, 20, 10, { f: "#cfd6df", s: "none", r: 5 }); return { y: y, knob: Cc(p, 23, y, 4, "#fff", { s: C.dark, sw: .8 }) }; });
    var btn = G(p); R(btn, -26, 38, 52, 13, { f: C.blue, s: "none", r: 6 }); T(btn, 0, 47.5, "Allow", { s: 8, c: "#fff" });
    var srv = G(g); at(srv, 275, 70, 1); server(srv); T(srv, 0, 34, "Company", { s: 9 });
    var pk = []; ["#e8a020", "#2f7de1", "#1f9d55", "#d8382f", "#9b59b6", "#e8a020"].forEach(function(c, i){ pk.push(Cc(g, 0, 0, 3.4, c, { o: 0 })); });
    var prof = G(g); at(prof, 275, 165, 1); R(prof, -52, -34, 104, 62, { r: 6 }); Cc(prof, -36, -16, 7, C.blue); T(prof, -24, -13, "Profile of you", { s: 8.5, a: "start" });
    var pl = ["Likes: sport, games", "Buys: t-shirts", "Lives: near school"].map(function(s, i){ return T(prof, -42, 2 + i * 11, s, { s: 7.5, a: "start", c: C.mute, o: 0 }); });
    var ad = G(g); R(ad, 0, 0, 74, 34, { f: C.amber, s: C.dark, sw: 1.2, r: 6 }); T(ad, 37, 15, "50% OFF", { s: 10 }); T(ad, 37, 27, "T-SHIRTS!", { s: 8.5 }); line(ad, 0, 17, -24, 17, C.amber, 2);
    var cur = E("polygon", { points: "0,0 0,12 3.4,9.4 5.8,14.6 8,13.6 5.6,8.4 10,8", fill: "#fff", stroke: "#000", "stroke-width": .9 }, g);
    return { marks: [.25, .5, .75, 1], frame: function(f){
      var s1 = sg(f, .03, .2);
      rows.forEach(function(r, i){ var on = sg(f, .03 + i * .05, .08 + i * .05); r.knob.setAttribute("cx", lp(23, 33, on)); r.knob.previousSibling.setAttribute("fill", on > .5 ? C.green : "#cfd6df"); });
      mv(cur, lp(120, 66, ez(sg(f, .05, .2))) + 70 - 70, lp(160, 150, ez(sg(f, .05, .2)))); btn.setAttribute("opacity", f < .25 ? 1 : .35);
      cur.setAttribute("opacity", f < .27 ? 1 : 0);
      pk.forEach(function(d, i){ var t = sg(f, .26 + i * .035, .46 + i * .035); vis(d, t > 0 && t < 1 ? 1 : 0); d.setAttribute("cx", lp(100, 255, ez(t))); d.setAttribute("cy", lp(88 + (i % 3) * 14, 72, ez(t)) + Math.sin(t * 6) * 4); });
      vis(prof, f >= .5 ? 1 : 0); pl.forEach(function(t, i){ vis(t, f > .56 + i * .06 ? 1 : 0); });
      var a = f >= .75 ? ez(sg(f, .75, .85)) : 0; ad.setAttribute("opacity", a); at(ad, 136 + (1 - a) * -14, 80, 1, a);
      B.cap.textContent = f < .25 ? "Tap Allow..." : f < .5 ? "Data travels to the company" : f < .75 ? "A profile is built" : "Targeted advert!";
    } };
  };

  // ===== 2. Cambridge Analytica =====
  S.cambridge = function(B){
    var g = B.g;
    var app = G(g); at(app, 170, 62, 1); R(app, -34, -18, 68, 36, { f: C.blue, s: "none", r: 8 }); T(app, 0, -3, "Quiz app", { s: 9, c: "#fff" }); T(app, 0, 9, "Your Digital Life", { s: 6.5, c: "#dbe9ff", w: 600 });
    var me = G(g); at(me, 50, 135, 1); person(me, C.blue); T(me, 0, 24, "Quiz user", { s: 7.5 });
    var fr = [[110, 160], [60, 182], [160, 182]].map(function(q){ var x = G(g); at(x, q[0], q[1], .85); person(x, "#8a97a8"); return x; }); T(g, 110, 205, "their friends", { s: 7.5, c: C.mute });
    var l1 = line(g, 52, 125, 150, 80, C.green, 2, "5 3"), allow = T(g, 78, 108, "Allow", { s: 8, c: C.green, a: "end" });
    var lf = [[110, 152, 150, 82], [64, 174, 140, 80], [156, 174, 160, 80]].map(function(q){ return line(g, q[0], q[1], q[2], q[3], C.red, 1.6, "3 3"); });
    var ft = T(g, 100, 138, "friends never agreed!", { s: 8, c: C.red, a: "start" });
    var ca = G(g); at(ca, 290, 62, 1); R(ca, -42, -20, 84, 40, { f: "#2b2f3a", s: "none", r: 6 }); T(ca, 0, -4, "Cambridge", { s: 8.5, c: "#fff" }); T(ca, 0, 8, "Analytica", { s: 8.5, c: "#fff" });
    var pk = [0, 1, 2, 3].map(function(i){ return R(g, 0, 0, 8, 8, { f: C.amber, s: C.dark, r: 2, sw: .8, o: 0 }); });
    var cnt = T(g, 290, 92, "87 million profiles", { s: 8.5, c: C.red, o: 0 });
    var vot = [[245, 140], [295, 150], [245, 180], [295, 190]].map(function(q){ var x = G(g); at(x, q[0], q[1], .9); person(x, "#8a97a8"); return x; });
    var ads = vot.map(function(q, i){ var a = G(g); R(a, 0, 0, 30, 14, { f: "#fff", s: C.red, sw: 1, r: 3 }); T(a, 15, 10, "VOTE!", { s: 7, c: C.red }); a.setAttribute("opacity", 0); return a; });
    return { marks: [.25, .5, .75, 1], frame: function(f){
      var a = sg(f, .03, .2); l1.setAttribute("opacity", a); vis(allow, a);
      lf.forEach(function(l, i){ vis(l, sg(f, .27 + i * .04, .33 + i * .04)); }); vis(ft, sg(f, .3, .4));
      pk.forEach(function(d, i){ var t = sg(f, .52 + i * .05, .72 + i * .05); vis(d, t > 0 && t < 1 ? 1 : 0); at(d, lp(180, 262, ez(t)), lp(66, 52, ez(t)), 1); });
      vis(cnt, sg(f, .65, .75));
      ads.forEach(function(a, i){ var t = sg(f, .77 + i * .04, .92 + i * .02); a.setAttribute("opacity", t > 0 ? 1 : 0); var x0 = 290, y0 = 85, x1 = vot[i].getAttribute("transform").match(/translate\(([\d.]+) ([\d.]+)/); at(a, lp(x0 - 15, +x1[1] - 15, ez(t)), lp(y0, +x1[2] - 28, ez(t)), 1); });
      B.cap.textContent = f < .25 ? "People log in with Facebook" : f < .5 ? "The app also collects friends' data" : f < .75 ? "The data is sent to Cambridge Analytica" : "Voters get targeted political adverts";
    } };
  };

  // ===== 3. benefits vs risks =====
  S.balance = function(B){
    var g = B.g;
    E("path", { d: "M170,150 L152,196 H188Z", fill: "#b8c5d6", stroke: C.dark, "stroke-width": 1.4 }, g);
    var beam = G(g), L = G(beam), Rr = G(beam);
    R(beam, -110, -3, 220, 6, { f: C.dark, s: "none", r: 3 }); Cc(beam, 0, 0, 5, C.amber, { s: C.dark });
    [[L, -100, C.green], [Rr, 100, C.red]].forEach(function(q){ var x = q[1]; line(q[0], x - 24, 0, x - 24, 28, C.dark, 1); line(q[0], x + 24, 0, x + 24, 28, C.dark, 1); E("path", { d: "M" + (x - 34) + ",28 H" + (x + 34) + " Q" + x + ",50 " + (x - 34) + ",28Z", fill: q[2], opacity: .9 }, q[0]); });
    var tl = T(L, -100, 60, "Benefits", { s: 9.5, c: C.green }), tr = T(Rr, 100, 60, "Risks", { s: 9.5, c: C.red });
    var ben = ["services", "health", "safety"].map(function(s, i){ return T(L, -100, 18 + i * 0, s, { s: 7.5, c: C.dark, o: 0 }); });
    var rk = ["misuse", "bias", "spying"].map(function(s, i){ return T(Rr, 100, 18, s, { s: 7.5, c: C.dark, o: 0 }); });
    var flags = [[0, "#e34", "#fff"], [1, "#2f7de1", "#fff"], [2, "#1f9d55", "#fff"]].map(function(q, i){ var x = G(g); at(x, 126 + i * 36, 66, 1); line(x, 0, 0, 0, 22, C.dark, 1.4); R(x, 0, 0, 24, 14, { f: q[1], s: "none", r: 1 }); T(x, 12, 10, ["Law A", "Law B", "Law C"][i], { s: 6.5, c: "#fff" }); x.setAttribute("opacity", 0); return x; });
    var eth = G(g); at(eth, 170, 140, 1); R(eth, -26, -9, 52, 18, { f: C.amber, s: C.dark, sw: 1, r: 9 }); T(eth, 0, 3.5, "Ethics", { s: 9 }); eth.setAttribute("opacity", 0);
    at(beam, 170, 120, 1);
    return { marks: [.25, .5, .75, 1], frame: function(f){
      var ang = f < .25 ? lp(0, 10, ez(sg(f, 0, .18))) : f < .5 ? lp(10, -10, ez(sg(f, .25, .42))) : f < .75 ? -10 + Math.sin(sg(f, .5, .75) * 18) * 2.5 : lp(-10, 0, ez(sg(f, .75, .92)));
      // positive angle: left side goes down
      beam.setAttribute("transform", "translate(170 120) rotate(" + (-ang).toFixed(2) + ")");
      L.setAttribute("transform", "rotate(" + ang.toFixed(2) + " -100 0)"); Rr.setAttribute("transform", "rotate(" + ang.toFixed(2) + " 100 0)");
      ben.forEach(function(t, i){ t.setAttribute("y", 18 + i * 0); vis(t, 0); }); rk.forEach(function(t){ vis(t, 0); });
      var lt = f < .25 ? "better services, health care, safety" : f < .5 ? "misuse, bias, spying, fraud" : f < .75 ? "different laws in each country" : "ethics balances both sides";
      flags.forEach(function(x, i){ vis(x, f >= .5 && f < .75 ? sg(f, .5 + i * .05, .56 + i * .05) : 0); });
      vis(eth, f >= .75 ? ez(sg(f, .75, .85)) : 0);
      tl.setAttribute("opacity", f < .5 || f >= .75 ? 1 : .4); tr.setAttribute("opacity", f < .25 || f >= .5 ? 1 : 1);
      B.cap.textContent = lt;
    } };
  };

  // ===== 4. data breach =====
  S.breach = function(B){
    var g = B.g;
    var db = G(g); at(db, 85, 100, 1);
    E("path", { d: "M-34,-34 v62 a34,12 0 0 0 68,0 v-62", fill: "#d6dfeb", stroke: C.dark, "stroke-width": 1.5 }, db); E("ellipse", { cx: 0, cy: -34, rx: 34, ry: 12, fill: "#e6edf6", stroke: C.dark, "stroke-width": 1.5 }, db);
    T(db, 0, 50, "Company database", { s: 8.5 });
    var r = rnd(5), recs = []; for(var i = 0; i < 12; i++){ var x = -22 + (i % 4) * 14.5, y = -20 + Math.floor(i / 4) * 16; recs.push({ e: R(db, x - 5, y - 4, 10, 8, { f: C.blue, s: "none", r: 2 }), x: 85 + x, y: 100 + y }); }
    var lk = G(g); at(lk, 85, 40, 1); var lc = lock(lk, false, C.green);
    var counter = T(g, 85, 22, "", { s: 9.5, c: C.red });
    var hk = G(g); at(hk, 275, 140, 1.6); hacker(hk); T(g, 275, 190, "Hacker", { s: 8.5 });
    var beam = line(g, 258, 132, 120, 80, C.red, 2, "5 4");
    var fl = recs.map(function(q){ return R(g, 0, 0, 10, 8, { f: C.blue, s: "none", r: 2, o: 0 }); });
    var bub = G(g); at(bub, 255, 45, 1); R(bub, -62, -22, 124, 42, { f: "#fff", s: C.green, sw: 1.6, r: 8 }); T(bub, 0, -6, "Security alert", { s: 8.5, c: C.green }); T(bub, 0, 8, "Change your password!", { s: 8.5 });
    return { marks: [.22, .45, .72, 1], frame: function(f){
      counter.textContent = f < .22 ? "millions of accounts" : f >= .45 ? "3 billion accounts (Yahoo)" : "";
      var atk = sg(f, .22, .4); beam.setAttribute("opacity", f >= .22 && f < .72 ? 1 : 0);
      lk.innerHTML = ""; lock(lk, f >= .4, f >= .4 ? C.red : C.green);
      recs.forEach(function(q, i){ var t = sg(f, .46 + i * .02, .66 + i * .02); vis(q.e, t > 0 ? .18 : 1); var d = fl[i]; vis(d, t > 0 && t < 1 ? 1 : 0); at(d, lp(q.x - 5, 255, ez(t)), lp(q.y - 4, 135 - (i % 3) * 8, ez(t)), 1); });
      var b = f >= .75 ? ez(sg(f, .75, .85)) : 0; bub.setAttribute("opacity", b);
      B.cap.textContent = f < .22 ? "A company stores records of millions of people" : f < .45 ? "A hacker breaks in" : f < .72 ? "Private records are stolen" : "People are told to change their passwords";
    } };
  };

  // ===== 5. protect your privacy =====
  S.protect = function(B){
    var g = B.g;
    var items = [["Strong, unique password", "Aa1#"], ["Multi-factor authentication", "2FA"], ["Check app permissions", "OK?"], ["VPN on public Wi-Fi + updates", "VPN"]];
    var rows = items.map(function(it, i){ var y = 22 + i * 40, r = G(g); at(r, 0, y, 1); var bx = R(r, 90, 0, 240, 32, { r: 8 }); Cc(r, 112, 16, 10, "#fff", { s: C.line, sw: 1.5 }); var tk = G(r); at(tk, 112, 16, 1); tick(tk); tk.setAttribute("opacity", 0); T(r, 132, 20, it[0], { s: 10, a: "start" }); var ic = G(r); R(ic, 18, 0, 56, 32, { f: "#dbe9ff", s: "none", r: 8 }); T(ic, 46, 20, it[1], { s: 11, c: C.blue }); return { g: r, bx: bx, tk: tk }; });
    return { marks: [.25, .5, .75, 1], frame: function(f){
      var k = f < .25 ? 0 : f < .5 ? 1 : f < .75 ? 2 : 3;
      rows.forEach(function(r, i){ var on = f >= .06 + i * .22; vis(r.tk, on ? sg(f, .06 + i * .22, .12 + i * .22) : 0); r.bx.setAttribute("stroke", i === k ? C.blue : C.line); r.bx.setAttribute("stroke-width", i === k ? 2.4 : 1); r.g.setAttribute("opacity", f < i * .22 ? .5 : 1); });
      B.cap.textContent = f > .9 ? "\u2714 Your data is safer" : "";
    } };
  };

  // ===== 6. DDoS =====
  S.ddos = function(B){
    var g = B.g;
    var hk = G(g); at(hk, 40, 40, 1.2); hacker(hk); T(g, 40, 70, "Hacker", { s: 8.5 });
    var pos = [[110, 40], [150, 60], [110, 100], [150, 120], [110, 160], [150, 180]], dev = pos.map(function(q, i){ var x = G(g); at(x, q[0], q[1], 1); var d = [cam, router, cam, router, cam, router][i](x); return { g: x, x: q[0], y: q[1] }; });
    var infl = pos.map(function(q, i){ return line(g, 58, 46, q[0] - 12, q[1], C.red, 1.3, "4 3"); });
    var red = pos.map(function(q){ var b = bug(g, C.red, .9); b.setAttribute("opacity", 0); return b; });
    var nb = T(g, 130, 204, "botnet", { s: 9.5, c: C.red, o: 0 });
    var srv = G(g); at(srv, 290, 105, 1.2); server(srv); var down = G(g); at(down, 290, 105, 1); R(down, -26, -8, 52, 16, { f: C.red, s: "none", r: 4 }); T(down, 0, 3.5, "DOWN", { s: 9.5, c: "#fff" }); down.setAttribute("opacity", 0);
    R(g, 262, 150, 56, 7, { f: "#dbe3ee", s: C.line, r: 3, sw: .8 }); var load = R(g, 262, 150, 0, 7, { f: C.green, s: "none", r: 3 }); T(g, 290, 170, "server load", { s: 7.5, c: C.mute });
    var pk = []; for(var i = 0; i < 18; i++) pk.push(Cc(g, 0, 0, 2.6, C.red, { o: 0 }));
    var us = G(g); at(us, 215, 195, 1); person(us, C.blue); T(g, 215, 222, "", { s: 1 });
    var ub = Cc(g, 0, 0, 3.4, C.blue, { o: 0 }), ux = G(g); at(ux, 262, 150, 1.4); cross(ux); ux.setAttribute("opacity", 0);
    return { marks: [.22, .4, .75, 1], frame: function(f){
      infl.forEach(function(l, i){ vis(l, f < .4 ? sg(f, .03 + i * .02, .1 + i * .02) : 0); });
      red.forEach(function(b, i){ var t = sg(f, .08 + i * .02, .2 + i * .02); vis(b, t); mv(b, pos[i][0] + 12, pos[i][1] - 12); });
      vis(nb, sg(f, .26, .36));
      var send = sg(f, .42, .75);
      pk.forEach(function(d, i){ var s = pos[i % 6], ph = ((send * 4 + i * .17) % 1), on = send > 0 && f < .96; vis(d, on ? 1 : 0); d.setAttribute("cx", lp(s[0] + 14, 268, ph)); d.setAttribute("cy", lp(s[1], 105 + (i % 3) * 6 - 6, ph)); });
      var ld = f < .42 ? .05 : f < .75 ? lp(.05, 1, sg(f, .42, .75)) : 1; load.setAttribute("width", 56 * ld); load.setAttribute("fill", ld > .8 ? C.red : ld > .5 ? C.amber : C.green);
      vis(down, f >= .78 ? 1 : 0);
      var u = sg(f, .78, .95); vis(ub, u > 0 && u < 1 ? 1 : 0); ub.setAttribute("cx", lp(225, 262, u)); ub.setAttribute("cy", lp(188, 150, u)); vis(ux, u >= 1 || f > .93 ? 1 : 0);
      B.cap.textContent = f < .22 ? "Weak IoT devices are infected" : f < .4 ? "They become a botnet" : f < .75 ? "All bots flood the server at once" : "Real users cannot get in";
    } };
  };

  // ===== 7. phishing =====
  S.phishing = function(B){
    var g = B.g;
    var em = G(g); R(em, 20, 14, 180, 84, { r: 6 }); R(em, 20, 14, 180, 16, { f: "#e8edf4", s: C.line, r: 6 }); T(em, 28, 25, "From: Big Prize <win@pr1ze-mail.xyz>", { s: 7.5, a: "start" }); T(em, 28, 46, "You WON $1,000,000!!", { s: 11, a: "start", c: C.red }); T(em, 28, 62, "Act NOW or lose it. Dear customer,", { s: 8, a: "start", c: C.mute, w: 600 });
    var lnk = G(g); R(lnk, 28, 72, 92, 16, { f: C.blue, s: "none", r: 4 }); T(lnk, 74, 83.5, "Click here to claim", { s: 8, c: "#fff" });
    var cur = E("polygon", { points: "0,0 0,12 3.4,9.4 5.8,14.6 8,13.6 5.6,8.4 10,8", fill: "#fff", stroke: "#000", "stroke-width": .9 }, g);
    var br = G(g); R(br, 130, 108, 190, 100, { r: 6 }); R(br, 130, 108, 190, 14, { f: "#e8edf4", s: C.line, r: 6 }); T(br, 138, 118, "http://my-bank-login.xyz", { s: 7.5, a: "start", c: C.red }); T(br, 225, 136, "Log in to your bank", { s: 9 });
    R(br, 150, 146, 150, 14, { f: "#f3f6fa", s: C.line, r: 3 }); R(br, 150, 166, 150, 14, { f: "#f3f6fa", s: C.line, r: 3 });
    var typed = T(br, 156, 156, "", { s: 9, a: "start", c: C.dark }), typed2 = T(br, 156, 176, "", { s: 9, a: "start", c: C.dark });
    var stole = G(g); at(stole, 290, 60, 1.3); hacker(stole); T(g, 290, 94, "Attacker", { s: 8, o: 1 });
    var pk = Cc(g, 0, 0, 3.6, C.red, { o: 0 });
    var fl = [[210, 38, "check the sender"], [100, 108, "urgent / greedy"]];
    var c1 = G(g), c2 = G(g), c3 = G(g); at(c3, 80, 128, 1);
    R(c1, 0, 0, 0, 0, { o: 0 });
    var ok = G(g); at(ok, 66, 176, 1); E("path", { d: "M0,-18 L18,-11 V4 Q18,16 0,24 Q-18,16 -18,4 V-11Z", fill: C.green, opacity: .2, stroke: C.green, "stroke-width": 2 }, ok); var okt = G(ok); at(okt, 0, 3, 1.3); tick(okt); var okc = T(g, 66, 212, "Do not click!", { s: 10, c: C.green });
    var f1 = T(g, 210, 30, "", { s: 1 });
    var tag1 = G(g); R(tag1, 8, 108, 116, 14, { f: "#fff3d6", s: C.amber, r: 4 }); T(tag1, 66, 118, "1. check the sender", { s: 7.5 });
    var tag2 = G(g); R(tag2, 8, 126, 116, 14, { f: "#fff3d6", s: C.amber, r: 4 }); T(tag2, 66, 136, "2. prizes + urgency = trick", { s: 7 });
    var tag3 = G(g); R(tag3, 8, 144, 116, 14, { f: "#fff3d6", s: C.amber, r: 4 }); T(tag3, 66, 154, "3. type the real address", { s: 7.5 });
    return { marks: [.22, .42, .7, 1], frame: function(f){
      var a = ez(sg(f, 0, .15)); em.setAttribute("opacity", a); at(em, 0, (1 - a) * -20, 1); lnk.setAttribute("opacity", a);
      var c = sg(f, .22, .42); mv(cur, lp(210, 70, ez(c)), lp(130, 82, ez(c))); vis(cur, f >= .2 && f < .5 ? 1 : 0); lnk.firstChild.setAttribute("fill", f > .38 && f < .5 ? "#1a56a8" : C.blue);
      vis(br, ez(sg(f, .44, .52)));
      var n1 = Math.floor(sg(f, .5, .62) * 8), n2 = Math.floor(sg(f, .58, .68) * 8); typed.textContent = "user@mail".slice(0, n1); typed2.textContent = "••••••••".slice(0, n2);
      var s = sg(f, .62, .72); vis(pk, s > 0 && s < 1 ? 1 : 0); pk.setAttribute("cx", lp(240, 290, ez(s))); pk.setAttribute("cy", lp(160, 80, ez(s)));
      vis(stole, f >= .6 ? 1 : 0);
      var sv = f >= .72 ? 1 : 0; ok.setAttribute("opacity", sv * ez(sg(f, .72, .8))); vis(okc, sv * ez(sg(f, .72, .8)));
      vis(tag1, sg(f, .74, .8)); vis(tag2, sg(f, .8, .86)); vis(tag3, sg(f, .86, .92));
      vis(stole, f >= .6 ? 1 : 0);
      B.cap.textContent = f < .22 ? "A tempting email arrives" : f < .5 ? "You click the link" : f < .72 ? "A fake site steals your details" : "";
    } };
  };

  // ===== 8. virus, worm, trojan =====
  S.malware1 = function(B){
    var g = B.g, lanes = [34, 98, 162];
    var names = ["Virus", "Worm", "Trojan"], cols = [C.red, C.amber, C.blue];
    lanes.forEach(function(y, i){ R(g, 8, y - 26, 324, 56, { f: "#fff", s: C.line, r: 8 }); T(g, 44, y + 3, names[i], { s: 10.5, c: cols[i] }); });
    // virus lane: infected file spreads when opened
    var vf = [0, 1, 2, 3].map(function(i){ var x = G(g); at(x, 120 + i * 50, 34, 1); doc(x); var b = G(x); at(b, 0, 0, 1.2); bug(b, C.red); vis(b, 0); return { g: x, b: b }; }); var vc = E("polygon", { points: "0,0 0,12 3.4,9.4 5.8,14.6 8,13.6 5.6,8.4 10,8", fill: "#fff", stroke: "#000", "stroke-width": .9 }, g);
    // worm lane: computers in a network
    var wc = [0, 1, 2, 3, 4].map(function(i){ var x = G(g); at(x, 110 + i * 46, 98, .9); computer(x); return x; }); var wl = [0, 1, 2, 3].map(function(i){ return line(g, 124 + i * 46, 98, 142 + i * 46, 98, C.line, 2); });
    var wb = [0, 1, 2, 3, 4].map(function(i){ var b = G(g); at(b, 110 + i * 46, 96, 1.2); bug(b, C.amber); vis(b, 0); return b; });
    // trojan lane: gift box
    var gb = G(g); at(gb, 150, 162, 1); R(gb, -24, -16, 48, 34, { f: "#e8f1ff", s: C.blue, sw: 1.6, r: 4 }); T(gb, 0, 4, "FREE GAME", { s: 7.5 }); var lid = G(gb); R(lid, -27, -26, 54, 10, { f: C.blue, s: "none", r: 3 });
    var tb = G(g); at(tb, 150, 150, 1.6); bug(tb, C.blue); vis(tb, 0); var tcomp = G(g); at(tcomp, 270, 162, 1); computer(tcomp); var tbug = G(g); at(tbug, 270, 160, 1.3); bug(tbug, C.blue); vis(tbug, 0); T(g, 200, 181, "looks useful, hides harm", { s: 7.5, c: C.mute, a: "start", w: 600 });
    return { marks: [.2, .4, .65, 1], frame: function(f){
      vf.forEach(function(q, i){ vis(q.b, f >= .2 + i * .045 && f < .4 + .05 ? 1 : (f >= .2 + i * .045 ? 1 : 0)); });
      vis(vc, f >= .2 && f < .4 ? 1 : 0); mv(vc, lp(110, 125 + 0, sg(f, .2, .24)), 52);
      vf.forEach(function(q){ if(f < .2) vis(q.b, 0); });
      wb.forEach(function(b, i){ var t = sg(f, .42 + i * .045, .46 + i * .045); vis(b, t); });
      wl.forEach(function(l, i){ l.setAttribute("stroke", f >= .42 + i * .045 + .02 ? C.amber : C.line); });
      var o = sg(f, .66, .76); lid.setAttribute("transform", "translate(" + (o * 22).toFixed(1) + " " + (o * 2).toFixed(1) + ") rotate(" + (o * 24) + " -27 -16)");
      vis(tb, f >= .7 && f < .8 ? sg(f, .7, .74) : 0); mv(tb, lp(150, 270, ez(sg(f, .74, .9))) - 150 + 150 - 0, lp(150, 150, 1)); at(tb, lp(150, 270, ez(sg(f, .74, .9))), 150 - Math.sin(sg(f, .74, .9) * 3.14) * 12, 1.4); vis(tb, f >= .7 ? (f > .9 ? 0 : 1) : 0);
      vis(tbug, f > .9 ? 1 : 0);
      B.cap.textContent = f < .2 ? "Malware = harmful software" : f < .4 ? "Virus: spreads when you open a file" : f < .65 ? "Worm: spreads across the network by itself" : "Trojan: pretends to be useful";
    } };
  };

  // ===== 9. ransomware, spyware, adware, bots, rootkits =====
  S.malware2 = function(B){
    var g = B.g, names = ["Ransomware", "Spyware", "Adware", "Bots", "Rootkit"], tiles = names.map(function(n, i){ var t = G(g); at(t, 34 + i * 68, 54, 1); var bx = R(t, -30, -34, 60, 68, { r: 8 }); var ic = G(t); at(ic, 0, -6, 1.1); if(i === 0){ lock(ic, false, C.red); } else if(i === 1) eye(ic); else if(i === 2){ R(ic, -11, -9, 22, 17, { f: "#fff3d6", s: C.amber, r: 3 }); T(ic, 0, 4, "SALE", { s: 7, c: C.red }); } else if(i === 3){ R(ic, -8, -8, 16, 12, { f: "#fff", s: C.dark, r: 3 }); Cc(ic, -3, -3, 1.6, C.red); Cc(ic, 3, -3, 1.6, C.red); line(ic, 0, -8, 0, -13, C.dark, 1.2); Cc(ic, 0, -14, 1.5, C.red); } else { Cc(ic, 0, -2, 9, "#555"); R(ic, -5, -5, 10, 4, { f: C.red, s: "none", r: 1 }); } T(t, 0, 24, n, { s: 8.5 }); return { g: t, bx: bx }; });
    var demo = G(g); R(demo, 10, 110, 320, 90, { r: 10 });
    var title = T(demo, 170, 128, "", { s: 11, c: C.red }), l1 = T(demo, 170, 148, "", { s: 9, w: 600 }), l2 = T(demo, 170, 164, "", { s: 9, w: 600, c: C.mute }), l3 = T(demo, 170, 180, "", { s: 8.5, w: 600, c: C.mute });
    G(demo);
    var pop = [0, 1, 2].map(function(i){ var x = G(demo); R(x, 230 + i * 12, 118 + i * 8, 46, 24, { f: "#fff3d6", s: C.amber, r: 3 }); T(x, 253 + i * 12, 134 + i * 8, "BUY!", { s: 8, c: C.red }); vis(x, 0); return x; });
    var txt = [["Ransomware", "It locks your screen or files.", "The attacker asks for money (a ransom).", "Crypt, screen locker, scareware, double extortion"],
               ["Spyware", "It secretly watches what you do.", "A keylogger records every key you press.", "Passwords go to the attacker."],
               ["Adware", "It shows unwanted adverts.", "It can slow your device and let other malware in.", ""],
               ["Bots and rootkits", "Bots obey the attacker and form a botnet.", "A rootkit hides malware and gives admin access.", "It is hard to find."]];
    return { marks: [.25, .5, .75, 1], frame: function(f){
      var k = f < .25 ? 0 : f < .5 ? 1 : f < .75 ? 2 : 3;
      tiles.forEach(function(t, i){ var on = i === k || (k === 3 && i === 4); t.bx.setAttribute("stroke", on ? C.blue : C.line); t.bx.setAttribute("stroke-width", on ? 2.6 : 1); at(t.g, 34 + i * 68, 54 - (on ? 3 : 0) , on ? 1.06 : 1, on ? 1 : .6); });
      var x = txt[k]; title.textContent = x[0]; l1.textContent = x[1]; l2.textContent = x[2]; l3.textContent = x[3];
      title.setAttribute("fill", [C.red, C.dark, C.amber, C.dark][k]);
      pop.forEach(function(p, i){ vis(p, k === 2 ? sg(f, .5 + i * .05, .55 + i * .05) : 0); });
      B.cap.textContent = "";
    } };
  };

  // ===== 10. firewall, antivirus, updates =====
  S.defence = function(B){
    var g = B.g;
    var net = G(g); at(net, 40, 80, 1); cloud(net); T(net, 0, 4, "Internet", { s: 8 });
    var wall = G(g); at(wall, 140, 80, 1); for(var r = 0; r < 6; r++) for(var c = 0; c < 2; c++) R(wall, -9 + c * 10 - (r % 2) * 5, -48 + r * 17, 14, 15, { f: "#e8a27a", s: "#a8603a", sw: 1, r: 1 }); T(wall, 0, 62, "Firewall", { s: 9.5, c: "#a8603a" });
    var pc = G(g); at(pc, 285, 80, 1.5); computer(pc); T(g, 285, 118, "Your computer", { s: 8.5 });
    var pk = []; for(var i = 0; i < 8; i++){ pk.push({ e: Cc(g, 0, 0, 4, i % 2 ? C.green : C.red, { o: 0 }), bad: i % 2 === 0, y: 50 + (i % 4) * 22 }); }
    var file = G(g); at(file, 285, 168, 1.2); doc(file); var fb = G(file); at(fb, 0, 0, 1.2); bug(fb, C.red);
    var scan = line(g, 258, 150, 258, 190, C.blue, 2); scan.setAttribute("opacity", 0); var av = T(g, 285, 200, "", { s: 9, c: C.blue });
    var upd = G(g); at(upd, 100, 178, 1); R(upd, -48, -14, 96, 28, { f: "#fff", s: C.green, sw: 1.6, r: 7 }); T(upd, 0, -2, "Update installed", { s: 8.5, c: C.green }); T(upd, 0, 9, "security fix applied", { s: 7.5, c: C.mute, w: 600 }); upd.setAttribute("opacity", 0);
    var crack = E("path", { d: "M135,70 l4,8 l-5,6 l5,8", fill: "none", stroke: C.red, "stroke-width": 1.6 }, g);
    return { marks: [.22, .45, .72, 1], frame: function(f){
      var flow = f < .72 ? sg(f, .02, .72) : 1;
      pk.forEach(function(q, i){ var t = ((flow * 3 + i * .125) % 1), on = f >= .02 && f < .46; var x, y = q.y; if(q.bad){ x = lp(60, 128, t); if(t > .93) on = false; } else { x = lp(60, 262, t); } if(f >= .22 && f < .46 || f < .22){ } vis(q.e, on ? 1 : 0); q.e.setAttribute("cx", x); q.e.setAttribute("cy", y); });
      pk.forEach(function(q){ if(!q.bad && f >= .46) vis(q.e, 0); });
      vis(file, f >= .45 ? 1 : 0); fb.setAttribute("opacity", f < .68 ? 1 : lp(1, 0, sg(f, .68, .74)));
      vis(scan, f >= .5 && f < .72 ? 1 : 0); scan.setAttribute("transform", "translate(" + (Math.sin(sg(f, .5, .7) * 12) * 0 + 0) + " 0)"); scan.setAttribute("y1", lp(150, 186, (sg(f, .5, .7) * 3) % 1)); scan.setAttribute("y2", lp(150, 186, (sg(f, .5, .7) * 3) % 1));
      scan.setAttribute("x1", 268); scan.setAttribute("x2", 302);
      av.textContent = f < .45 ? "" : f < .68 ? "Antivirus scanning..." : "Malware removed";
      vis(upd, f >= .74 ? ez(sg(f, .74, .84)) : 0); crack.setAttribute("opacity", f >= .74 ? lp(1, 0, sg(f, .78, .88)) : 1);
      B.cap.textContent = f < .22 ? "Good and bad traffic arrive" : f < .45 ? "The firewall blocks untrusted traffic" : f < .72 ? "Antivirus finds and removes malware" : "Updates fix weak spots";
    } };
  };

  // ===== 11. passwords, MFA, encryption, backups =====
  S.auth = function(B){
    var g = B.g;
    R(g, 14, 14, 150, 22, { r: 6 }); var pw = T(g, 22, 29, "", { s: 11, a: "start", c: C.dark }); R(g, 14, 40, 150, 7, { f: "#dbe3ee", s: "none", r: 3 }); var bar = R(g, 14, 40, 0, 7, { f: C.red, s: "none", r: 3 }); var st = T(g, 14, 62, "", { s: 9, a: "start" });
    var ph = G(g); at(ph, 255, 52, 1); phone(ph, 50, 78); var code = T(ph, 0, 0, "", { s: 12, c: C.blue }); var vf = T(ph, 0, 18, "", { s: 8, c: C.green }); T(ph, 0, -22, "Your code", { s: 7.5, c: C.mute, w: 600 });
    var en = G(g); R(en, 14, 100, 96, 30, { r: 6 }); T(en, 62, 120, "Hello!", { s: 12 }); var enl = line(g, 112, 115, 168, 115, C.dark, 2); var lk = G(g); at(lk, 140, 105, 1); lock(lk, false, C.amber); var enb = R(g, 170, 100, 96, 30, { f: "#2b2f3a", s: "none", r: 6 }); var ct = T(g, 218, 120, "x9#Kq!", { s: 12, c: "#7CFC9A" }); var ky = T(g, 140, 138, "key", { s: 8, c: C.amber });
    var pcc = G(g); at(pcc, 46, 190, 1); computer(pcc); var cl2 = G(g); at(cl2, 250, 190, 1.4); cloud(cl2); T(cl2, 0, 4, "Backup", { s: 7 }); var fl = G(g); at(fl, 80, 188, 1); doc(fl); var ok = G(g); at(ok, 250, 168, 1); tick(ok); var arr = line(g, 70, 190, 220, 190, C.line, 1.5, "4 3");
    var pwd = "M7#kPz9!qLw2";
    return { marks: [.25, .5, .75, 1], frame: function(f){
      var n = Math.floor(sg(f, .02, .22) * pwd.length); pw.textContent = pwd.slice(0, n); var s = n / pwd.length; bar.setAttribute("width", 150 * s); bar.setAttribute("fill", s < .4 ? C.red : s < .75 ? C.amber : C.green); st.textContent = n ? (s < .4 ? "weak" : s < .75 ? "medium" : "strong!") : "";
      var m = sg(f, .27, .46); code.textContent = m > .2 ? "482 913" : ""; vf.textContent = m > .8 ? "Verified" : "";
      vis(en, f >= .5 ? 1 : 0); vis(enl, f >= .5 ? 1 : 0); vis(enb, f >= .56 ? 1 : 0);
      vis(en, f >= .5 ? 1 : 0); en.setAttribute("opacity", f >= .5 ? 1 : 0); ct.setAttribute("opacity", f >= .56 ? 1 : 0); lk.setAttribute("opacity", f >= .52 ? 1 : 0); ky.setAttribute("opacity", f >= .52 ? 1 : 0); 
      var b = sg(f, .77, .95); fl.setAttribute("opacity", f >= .75 ? 1 : 0); at(fl, lp(80, 238, ez(b)), lp(188, 190, ez(b)), 1, f >= .75 ? (b >= 1 ? 0 : 1) : 0); arr.setAttribute("opacity", f >= .75 ? 1 : 0); vis(ok, f >= .95 ? 1 : 0); pcc.setAttribute("opacity", f >= .75 ? 1 : 0); cl2.setAttribute("opacity", f >= .75 ? 1 : 0);
      B.cap.textContent = f < .25 ? "A long mixed password is strong" : f < .5 ? "A second check: a code on your phone" : f < .75 ? "Encryption: only the key can read it" : "A backup keeps a safe copy";
    } };
  };

  // ===== 12. trade-offs =====
  S.tradeoff = function(B){
    var g = B.g, rows = [["Accessibility", "Security", "many steps to log in"], ["Privacy", "Monitoring", "CCTV records everyone"], ["Openness", "Control", "filter blocks good sites too"], ["Cost", "Security", "better protection costs more"]], items = [];
    rows.forEach(function(r, i){ var y = 28 + i * 48, w = G(g); R(w, 8, y - 20, 324, 42, { r: 8 }); T(w, 56, y + 4, r[0], { s: 9.5, c: C.blue }); T(w, 284, y + 4, r[1], { s: 9.5, c: C.red }); E("path", { d: "M170," + (y + 8) + " l-8,12 h16Z", fill: "#b8c5d6", stroke: C.dark, "stroke-width": 1 }, w); var bm = G(w); at(bm, 170, y + 8, 1); R(bm, -52, -2.5, 104, 5, { f: C.dark, s: "none", r: 2 }); Cc(bm, -44, -9, 6, C.blue); Cc(bm, 44, -9, 6, C.red); var note = T(w, 170, y - 12, r[2], { s: 7.5, c: C.mute, w: 600 }); items.push({ w: w, bm: bm, note: note }); });
    return { marks: [.25, .5, .75, 1], frame: function(f){
      var k = f < .25 ? 0 : f < .5 ? 1 : f < .75 ? 2 : 3, ph = (f * 4) % 1;
      items.forEach(function(q, i){ var on = i === k; q.w.setAttribute("opacity", on ? 1 : .45); var ang = on ? Math.sin(ph * 6.28 * 1.5) * 12 * Math.min(1, ph * 4) : 0; q.bm.setAttribute("transform", "translate(170 " + (28 + i * 48 + 8) + ") rotate(" + ang.toFixed(1) + ")"); q.note.setAttribute("opacity", on ? 1 : 0); });
      B.cap.textContent = "";
    } };
  };

  // ---------- player (same markup and classes as the GIMP player) ----------
  var reduce = false; try{ reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){}
  var cur = null;
  function mount(box, topic){
    if(cur){ cur.dead = true; cur = null; }
    box.textContent = "";
    var wrap = document.createElement("div"); wrap.className = "gm-player"; box.appendChild(wrap);
    var path = document.createElement("div"); path.className = "gm-path"; path.textContent = topic.path; wrap.appendChild(path);
    var B = base(); wrap.appendChild(B.svg);
    var ctl = document.createElement("div"); ctl.className = "gm-ctl"; wrap.appendChild(ctl);
    var play = document.createElement("button"); play.type = "button"; play.className = "btn btn-secondary"; ctl.appendChild(play);
    var rep = document.createElement("button"); rep.type = "button"; rep.className = "btn btn-secondary"; rep.textContent = "↻ Replay"; ctl.appendChild(rep);
    var ol = document.createElement("ol"); ol.className = "gm-steps"; wrap.appendChild(ol);
    var anim = S[topic.anim](B), M = anim.marks, items = topic.steps.map(function(s, i){
      var li = document.createElement("li"), b = document.createElement("button"); b.type = "button"; b.textContent = s; li.appendChild(b); ol.appendChild(li);
      b.addEventListener("click", function(){ seek(i === 0 ? 0 : M[i - 1] + .002, true); }); return li; });
    var f = reduce ? .995 : 0, last = 0, paused = reduce, me = { dead: false }; cur = me;
    function draw(){ anim.frame(f); var k = 0; while(k < M.length - 1 && f >= M[k]) k++; items.forEach(function(li, i){ li.className = i === k ? "on" : i < k ? "past" : ""; }); }
    function seek(v, pause){ f = v; if(pause){ paused = true; label(); } draw(); }
    function label(){ play.textContent = paused ? "▶ Play" : "⏸ Pause"; }
    play.addEventListener("click", function(){ paused = !paused; if(!paused && f > .99) f = 0; label(); });
    rep.addEventListener("click", function(){ f = 0; paused = false; label(); });
    label(); draw();
    function tick(ts){
      if(me.dead || !document.body.contains(box)) return; requestAnimationFrame(tick);
      var dt = last ? Math.min(100, ts - last) : 0; last = ts;
      if(paused) return; f += dt / D; if(f >= 1.12) f = 0; draw();
      if(f > 1) f = 1;
    }
    requestAnimationFrame(tick);
  }
  window.TECHANIM = { mount: mount, kinds: Object.keys(S) };
})();
