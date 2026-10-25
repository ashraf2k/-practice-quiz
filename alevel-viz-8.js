/* A Level iLearn visuals, part 8: digital certificates, machine learning, dictionaries, file handling, exceptions and two matching / ordering games. */
(function(root){
  "use strict";
  var V = root.ILEARN_VIZ, el = V.el, btn = V.btn, row = V.row, esc = V.esc;
  function tabsRow(items, cur, set){ var r = row(); items.forEach(function(it){ var b = btn(it[1], function(){ set(it[0]); }); b.dataset.k = it[0]; r.appendChild(b); }); r.mark = function(k){ Array.prototype.forEach.call(r.children, function(b){ b.className = "vb" + (b.dataset.k === k ? " on" : ""); }); }; r.mark(cur); return r; }
  var seed = 7; function rnd(){ seed = (seed * 16807) % 2147483647; return seed / 2147483647; }

  /* ---------- 17.1 digital certificate: can the browser trust this website? ---------- */
  V.reg("certs", function(box){
    var SC = {
      good: { name: "Valid certificate", c: { owner: "www.mybank.com", issuer: "TrustCA", expiry: "2027-03-01", sig: "valid", key: "(public key)" }, site: "www.mybank.com", checks: [true, true, true, true], verdict: "ok" },
      expired: { name: "Expired", c: { owner: "www.mybank.com", issuer: "TrustCA", expiry: "2025-01-01", sig: "valid", key: "(public key)" }, site: "www.mybank.com", checks: [true, true, false, true], verdict: "no" },
      wrong: { name: "Wrong website", c: { owner: "www.shop.com", issuer: "TrustCA", expiry: "2027-03-01", sig: "valid", key: "(public key)" }, site: "www.mybank.com", checks: [true, false, true, true], verdict: "no" },
      unknown: { name: "Unknown issuer (self-signed)", c: { owner: "www.mybank.com", issuer: "Me-myself-CA", expiry: "2027-03-01", sig: "valid", key: "(public key)" }, site: "www.mybank.com", checks: [false, true, true, true], verdict: "no" },
      forged: { name: "Altered after signing", c: { owner: "www.mybank.com", issuer: "TrustCA", expiry: "2027-03-01", sig: "does not match", key: "(attacker's key)" }, site: "www.mybank.com", checks: [true, true, true, false], verdict: "no" } };
    var cur = "good", view = el("div"), step = 0;
    var Q = ["Is the certificate issued by a certificate authority (CA) the browser trusts?", "Does the name on the certificate match the website being visited?", "Is the certificate still in date?", "Decrypt the CA's digital signature with the CA's public key: does the digest match a new hash of the certificate?"];
    function draw(){
      var s = SC[cur], c = s.c;
      var h = "<div class='vtwo'><div class='vcell hi' style='text-align:left;min-width:230px'><small>DIGITAL CERTIFICATE</small><br>Owner: <b>" + esc(c.owner) + "</b><br>Public key: <b>" + esc(c.key) + "</b><br>Issued by: <b>" + esc(c.issuer) + "</b><br>Expires: <b>" + c.expiry + "</b><br>CA digital signature: <b>" + c.sig + "</b></div><div><small>The browser is visiting <b>" + s.site + "</b>. The browser already holds the public keys of the CAs it trusts (TrustCA, ...).</small></div></div><div class='vlog'>";
      for(var i = 0; i < Q.length; i++){ if(i < step){ h += "<div>" + (s.checks[i] ? "✔ " : "✘ ") + Q[i] + " <b>" + (s.checks[i] ? "Yes" : "No") + "</b></div>"; } }
      h += "</div>";
      if(step >= Q.length || (step > 0 && !s.checks[step - 1])){ h += s.verdict === "ok" ? "<div class='vres vok'>All four checks pass: the public key can be <b>trusted</b>, so the browser uses it to agree a session key and shows the padlock (HTTPS).</div>" : "<div class='vres vbad'>A check failed, so the browser <b>warns the user</b> and the public key is not trusted: it could belong to an impostor.</div>"; }
      view.innerHTML = h;
    }
    var tabs = row(); Object.keys(SC).forEach(function(k){ var b = btn(SC[k].name, function(){ cur = k; step = 0; Array.prototype.forEach.call(tabs.children, function(x){ x.className = "vb" + (x.dataset.k === k ? " on" : ""); }); draw(); }); b.dataset.k = k; b.className = "vb" + (k === cur ? " on" : ""); tabs.appendChild(b); });
    box.appendChild(tabs);
    box.appendChild(row(btn("Run the next check ›", function(){ var s = SC[cur]; if(step < Q.length && (step === 0 || s.checks[step - 1])) step++; draw(); }, "p"), btn("↺ Restart", function(){ step = 0; draw(); })));
    box.appendChild(view); draw();
  });

  /* ---------- 18.1 AI, machine learning, deep learning: sort the examples ---------- */
  V.reg("aiml", function(box){
    var ITEMS = [["A chess program that follows hand-written rules and searches moves", "AI"], ["A spam filter that improves by studying thousands of labelled emails", "ML"], ["A neural network with many hidden layers that recognises faces", "DL"], ["A satnav that finds the shortest route with A*", "AI"], ["A system that learns to predict house prices from past sales (regression)", "ML"], ["A deep neural network that translates speech into text", "DL"]];
    var i = 0, score = 0, view = el("div"), log = el("div", "vlog");
    function draw(msg){
      if(i >= ITEMS.length){ view.innerHTML = "<div class='vres vok'>Finished: <b>" + score + " / " + ITEMS.length + "</b>. Remember: deep learning is a type of machine learning, which is a type of AI.</div>"; log.innerHTML = ""; return; }
      var s = '<svg class="vsvg" viewBox="0 0 540 150" style="max-width:420px"><circle cx="270" cy="75" r="70" class="bx"/><circle cx="270" cy="95" r="48" class="ac"/><circle cx="270" cy="110" r="26" class="ok"/><text x="270" y="22" class="mid b">AI</text><text x="270" y="68" class="mid b">Machine learning</text><text x="270" y="114" class="mid b sm">Deep learning</text></svg>';
      view.innerHTML = s + "<div class='vres'><b>" + esc(ITEMS[i][0]) + "</b></div>";
      var r = row(); [["AI", "AI (not machine learning)"], ["ML", "Machine learning (not deep)"], ["DL", "Deep learning"]].forEach(function(o){ r.appendChild(btn(o[1], function(){ var ok = ITEMS[i][1] === o[0]; if(ok) score++; i++; draw(ok ? "Correct." : "Not quite: that one belongs in the <b>" + ({ AI: "AI-only", ML: "machine-learning", DL: "deep-learning" }[ITEMS[i - 1][1]]) + "</b> ring."); })); }); view.appendChild(r);
      log.innerHTML = msg || "Where does this example sit? AI is the widest ring.";
    }
    box.appendChild(view); box.appendChild(log); draw();
  });

  /* ---------- 18.1 supervised, unsupervised and reinforcement learning ---------- */
  V.reg("mlkinds", function(box){
    var tab = "sup", view = el("div"), log = el("div", "vlog"), ctl = el("div");
    var P = []; seed = 11; for(var i = 0; i < 8; i++){ P.push([60 + rnd() * 120, 40 + rnd() * 100, "A"]); P.push([300 + rnd() * 120, 60 + rnd() * 100, "B"]); }
    var NEWP = null, cl = null, G = { n: 4, goal: [3, 3], trap: [1, 2], start: [0, 0] }, Q = null, eps = 0, path = [];
    function svgPts(pts, extra){
      var s = ""; pts.forEach(function(p){ var col = p[2] === "A" ? "var(--accent)" : p[2] === "B" ? "var(--diff-hard)" : "var(--muted)"; s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="6" style="fill:' + col + '" /><text x="' + (p[0] + 9) + '" y="' + (p[1] + 4) + '" class="sm mu">' + (p[2] !== "?" ? p[2] : "") + "</text>"; });
      return s + (extra || "");
    }
    function drawSup(){
      var pts = P.slice(); var ex = "";
      if(NEWP){ var d = P.map(function(p){ return [Math.hypot(p[0] - NEWP[0], p[1] - NEWP[1]), p[2]]; }).sort(function(a, b){ return a[0] - b[0]; }).slice(0, 3); var va = d.filter(function(x){ return x[1] === "A"; }).length; var lab = va >= 2 ? "A" : "B"; ex = '<circle cx="' + NEWP[0] + '" cy="' + NEWP[1] + '" r="9" style="fill:none;stroke:var(--ink);stroke-width:2"/><text x="' + (NEWP[0] + 12) + '" y="' + (NEWP[1] + 4) + '" class="b">predicted: ' + lab + "</text>"; log.innerHTML = "The new point's 3 nearest labelled neighbours vote: <b>" + va + " × A, " + (3 - va) + " × B</b>, so the model predicts <b>" + lab + "</b>. It could only do this because the training data had <b>labels</b>."; }
      else log.innerHTML = "<b>Supervised learning</b>: every training example has a label (A or B). Click anywhere in the box to ask the trained model to classify a new point.";
      var sv = V.svg(540, 190, '<rect x="1" y="1" width="538" height="188" class="bx"/>' + svgPts(pts, ex)); sv.style.cursor = "crosshair";
      sv.addEventListener("click", function(e){ var r = sv.getBoundingClientRect(); NEWP = [(e.clientX - r.left) * 540 / r.width, (e.clientY - r.top) * 190 / r.height]; drawSup(); });
      view.innerHTML = ""; view.appendChild(sv);
    }
    function kmeans(){
      var pts = P.map(function(p){ return [p[0], p[1], "?"]; });
      if(!cl){ cl = { c: [[80, 160], [400, 50]], it: 0, asg: null }; }
      var c = cl.c, asg = pts.map(function(p){ return Math.hypot(p[0] - c[0][0], p[1] - c[0][1]) <= Math.hypot(p[0] - c[1][0], p[1] - c[1][1]) ? 0 : 1; });
      var s = '<rect x="1" y="1" width="538" height="188" class="bx"/>';
      pts.forEach(function(p, i){ var col = cl.it === 0 ? "var(--muted)" : asg[i] ? "var(--diff-hard)" : "var(--accent)"; s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="6" style="fill:' + col + '"/>'; });
      c.forEach(function(k, i){ s += '<path d="M' + (k[0] - 9) + " " + (k[1] - 9) + "L" + (k[0] + 9) + " " + (k[1] + 9) + "M" + (k[0] + 9) + " " + (k[1] - 9) + "L" + (k[0] - 9) + " " + (k[1] + 9) + '" style="stroke:' + (i ? "var(--diff-hard)" : "var(--accent)") + ';stroke-width:3"/>'; });
      view.innerHTML = ""; view.appendChild(V.svg(540, 190, s)); cl.asg = asg;
      log.innerHTML = cl.it === 0 ? "<b>Unsupervised learning</b>: the data has <b>no labels</b>. The algorithm must find structure itself. Press the button: it starts with two guessed group centres (crosses)." : "Iteration " + cl.it + ": each point joins its nearest centre, then each centre moves to the middle of its group. After a few steps the two natural clusters appear.";
    }
    function stepK(){ if(!cl) cl = { c: [[80, 160], [400, 50]], it: 0 }; if(cl.it > 0 || true){ var pts = P, a = [[0, 0, 0], [0, 0, 0]]; pts.forEach(function(p){ var d0 = Math.hypot(p[0] - cl.c[0][0], p[1] - cl.c[0][1]), d1 = Math.hypot(p[0] - cl.c[1][0], p[1] - cl.c[1][1]), k = d0 <= d1 ? 0 : 1; a[k][0] += p[0]; a[k][1] += p[1]; a[k][2]++; }); [0, 1].forEach(function(k){ if(a[k][2]) cl.c[k] = [a[k][0] / a[k][2], a[k][1] / a[k][2]]; }); } cl.it++; kmeans(); }
    // reinforcement: tiny grid world solved by Q-learning
    function qInit(){ Q = []; for(var y = 0; y < G.n; y++){ Q.push([]); for(var x = 0; x < G.n; x++) Q[y].push([0, 0, 0, 0]); } eps = 0; path = []; }
    var DIR = [[0, -1, "↑"], [1, 0, "→"], [0, 1, "↓"], [-1, 0, "←"]];
    function train(n){
      for(var e = 0; e < n; e++){ var x = 0, y = 0, steps = 0; while(steps++ < 60){ var a = rnd() < 0.25 ? Math.floor(rnd() * 4) : Q[y][x].indexOf(Math.max.apply(null, Q[y][x])); var nx = Math.min(G.n - 1, Math.max(0, x + DIR[a][0])), ny = Math.min(G.n - 1, Math.max(0, y + DIR[a][1]));
        var r = (nx === G.goal[0] && ny === G.goal[1]) ? 10 : (nx === G.trap[0] && ny === G.trap[1]) ? -10 : -1; var best = Math.max.apply(null, Q[ny][nx]); Q[y][x][a] += 0.5 * (r + 0.9 * best - Q[y][x][a]); x = nx; y = ny; if(r === 10 || r === -10) break; } eps++; }
      drawRL();
    }
    function drawRL(){
      var s = ""; var cw = 70;
      for(var y = 0; y < G.n; y++) for(var x = 0; x < G.n; x++){ var g = x === G.goal[0] && y === G.goal[1], t = x === G.trap[0] && y === G.trap[1], b = Q[y][x].indexOf(Math.max.apply(null, Q[y][x])), learned = eps > 0 && Math.max.apply(null, Q[y][x]) !== 0;
        s += '<rect x="' + (100 + x * cw) + '" y="' + (8 + y * cw * 0.62) + '" width="' + cw + '" height="' + (cw * 0.62) + '" class="' + (g ? "ok" : t ? "no" : x === 0 && y === 0 ? "ac" : "bx") + '"/><text x="' + (100 + x * cw + cw / 2) + '" y="' + (8 + y * cw * 0.62 + 27) + '" class="mid b">' + (g ? "+10 goal" : t ? "−10 trap" : learned ? DIR[b][2] : (x === 0 && y === 0 ? "start" : "")) + "</text>"; }
      view.innerHTML = ""; view.appendChild(V.svg(540, 190, s));
      log.innerHTML = eps === 0 ? "<b>Reinforcement learning</b>: no labels, only <b>rewards</b> (+10 for the goal) and <b>punishments</b> (−10 for the trap, −1 for each wasted move). The agent learns by trial and error. Press Train." : "After <b>" + eps + "</b> practice runs, the arrow in each square shows the move the agent has learned is best. It has learned to reach the goal and avoid the trap without being told the route.";
    }
    function controls(){
      ctl.innerHTML = "";
      if(tab === "sup") ctl.appendChild(row(btn("Clear my point", function(){ NEWP = null; drawSup(); })));
      if(tab === "unsup") ctl.appendChild(row(btn("Next iteration ›", stepK, "p"), btn("↺ Reset", function(){ cl = null; kmeans(); })));
      if(tab === "rl") ctl.appendChild(row(btn("Train 5 runs", function(){ train(5); }), btn("Train 100 runs", function(){ train(100); }, "p"), btn("↺ Forget everything", function(){ qInit(); drawRL(); })));
    }
    function show(){ controls(); if(tab === "sup") drawSup(); else if(tab === "unsup") kmeans(); else { if(!Q) qInit(); drawRL(); } }
    var tabs = tabsRow([["sup", "Supervised"], ["unsup", "Unsupervised"], ["rl", "Reinforcement"]], tab, function(k){ tab = k; tabs.mark(k); show(); });
    box.appendChild(tabs); box.appendChild(ctl); box.appendChild(view); box.appendChild(log); show();
  });

  /* ---------- 19.1 dictionary: hash table against linked list ---------- */
  V.reg("dict", function(box){
    var M = 7, mode = "hash", data = [["Ali", 72], ["Sara", 88], ["Omar", 65], ["Lina", 91]], view = el("div"), log = el("div", "vlog"), kin = el("input", "vin mono"), vin = el("input", "vin mono");
    kin.value = "Noor"; kin.style.width = "90px"; vin.type = "number"; vin.value = 80; vin.style.width = "70px";
    function h(k){ var s = 0; for(var i = 0; i < k.length; i++) s += k.charCodeAt(i); return s % M; }
    function draw(msg){
      var out = "";
      if(mode === "hash"){
        var b = []; for(var i = 0; i < M; i++) b.push([]); data.forEach(function(d){ b[h(d[0])].push(d); });
        out += "<div class='vnote'>Index = (sum of the character codes of the key) MOD " + M + ". Each index holds the items that hash there.</div>" + V.table(["Index", "Key : value pairs stored"], b.map(function(l, i){ return [i, l.map(function(d){ return d[0] + " : " + d[1]; }).join("  |  ") || "-"]; }));
      } else {
        out += "<div class='vnote'>The pairs are nodes in a linked list: a search starts at the head and follows the pointers.</div><div class='vcells'>" + data.map(function(d, i){ return "<div class='vcell'><small>node " + i + "</small><b>" + esc(d[0]) + " : " + d[1] + "</b></div>"; }).join("<span style='align-self:center'>→</span>") + "</div>";
      }
      view.innerHTML = out; log.innerHTML = msg || "An ADT <b>dictionary</b> stores key-value pairs. Operations: insert a pair, find the value for a key, delete a pair.";
    }
    function find(){
      var k = kin.value; if(mode === "hash"){ var b = h(k), tries = 0, v = null; data.forEach(function(d){ if(h(d[0]) === b){ tries++; if(d[0] === k) v = d[1]; } }); draw(v === null ? "<b>" + esc(k) + "</b> hashes to index " + b + ". Only that bucket is searched (" + tries + " item" + (tries === 1 ? "" : "s") + "): <b>not found</b>." : "<b>" + esc(k) + "</b> hashes to index " + b + "; found <b>" + v + "</b> after checking " + tries + " item" + (tries === 1 ? "" : "s") + " in that bucket only."); }
      else { var n = 0, v2 = null; for(var i = 0; i < data.length; i++){ n++; if(data[i][0] === k){ v2 = data[i][1]; break; } } draw(v2 === null ? "Searched all " + n + " nodes: <b>" + esc(k) + " not found</b>." : "Found <b>" + v2 + "</b> after visiting " + n + " node" + (n === 1 ? "" : "s") + " from the head."); }
    }
    function ins(){ var k = kin.value.trim(); if(!k) return; var i = data.map(function(d){ return d[0]; }).indexOf(k); if(i >= 0) data[i][1] = +vin.value; else data.push([k, +vin.value]); draw("Inserted / updated <b>" + esc(k) + "</b>."); }
    function del(){ var k = kin.value, i = data.map(function(d){ return d[0]; }).indexOf(k); if(i < 0){ draw("<b>" + esc(k) + "</b> is not in the dictionary."); return; } data.splice(i, 1); draw("Deleted <b>" + esc(k) + "</b>."); }
    var tabs = tabsRow([["hash", "Built as a hash table"], ["list", "Built from a linked list"]], mode, function(k){ mode = k; tabs.mark(k); draw(); });
    box.appendChild(tabs); box.appendChild(row(el("label", null, "Key: "), kin, el("label", null, "Value: "), vin, btn("Insert", ins), btn("Find", find, "p"), btn("Delete", del))); box.appendChild(view); box.appendChild(log); draw();
  });

  /* ---------- 20.2 text file handling: WRITE, APPEND, READ ---------- */
  V.reg("fileops", function(box){
    var file, mode, ptr, view = el("div"), log = el("div", "vlog"), inp = el("input", "vin mono"), n = 1;
    inp.value = "Line one"; inp.style.width = "160px";
    function reset(){ file = ["Ahmed,12", "Basma,15"]; mode = null; ptr = 0; draw("The file Marks.txt already holds two lines. A file must be opened in a mode before it is used."); }
    function draw(msg){
      var code = "OPEN FILE \"Marks.txt\" FOR " + (mode || "…") + "\n" + (mode === "READ" ? "WHILE NOT EOF(\"Marks.txt\")\n   READFILE \"Marks.txt\", Line\nENDWHILE" : mode ? "WRITEFILE \"Marks.txt\", Line" : "") + (mode ? "\nCLOSEFILE \"Marks.txt\"" : "");
      var h = "<pre class='vpre'>" + esc(code) + "</pre><div class='vcells'>" + (file.length ? file.map(function(l, i){ return "<div class='vcell" + (mode === "READ" && i === ptr ? " hi" : mode === "READ" && i < ptr ? " ok" : "") + "'><small>line " + (i + 1) + (mode === "READ" && i === ptr ? " ◀ next READFILE" : "") + "</small><b>" + esc(l) + "</b></div>"; }).join("") : "<div class='vcell'><small>empty file</small></div>") + (mode === "READ" ? "<div class='vcell " + (ptr >= file.length ? "hi" : "") + "'><small>EOF</small><b>" + (ptr >= file.length ? "TRUE" : "FALSE") + "</b></div>" : "") + "</div>";
      view.innerHTML = h; log.innerHTML = msg || "";
    }
    function open(m){ mode = m; if(m === "WRITE"){ file = []; draw("Opened for <b>WRITE</b>: any existing contents are <b>deleted</b> (overwritten)."); } else if(m === "APPEND") draw("Opened for <b>APPEND</b>: the old lines stay and new lines go at the <b>end</b>."); else { ptr = 0; draw("Opened for <b>READ</b>: reading starts at the first line. Test <b>EOF</b> before each READFILE; reading past the last line is an error."); } }
    var r1 = row(btn("OPEN … FOR WRITE", function(){ open("WRITE"); }), btn("OPEN … FOR APPEND", function(){ open("APPEND"); }), btn("OPEN … FOR READ", function(){ open("READ"); }), btn("CLOSEFILE", function(){ mode = null; draw("File closed. The data is saved; open it again before using it."); }), btn("↺ Reset", reset));
    var r2 = row(el("label", null, "Text: "), inp, btn("WRITEFILE", function(){ if(mode !== "WRITE" && mode !== "APPEND"){ draw("<span class='vbad'>Error:</span> the file must be open for WRITE or APPEND first."); return; } file.push(inp.value); draw("Line written at the end of the file."); inp.value = "Line " + (++n + 1); }), btn("READFILE", function(){ if(mode !== "READ"){ draw("<span class='vbad'>Error:</span> the file must be open for READ first."); return; } if(ptr >= file.length){ draw("<span class='vbad'>Error: end of file.</span> There is nothing left to read; EOF should have been tested first."); return; } draw("Read line " + (ptr + 1) + ": <b>" + esc(file[ptr]) + "</b>"); ptr++; setTimeout(function(){}, 0); }));
    box.appendChild(r1); box.appendChild(r2); box.appendChild(view); box.appendChild(log); reset();
  });

  /* ---------- 20.2 exception handling ---------- */
  V.reg("except", function(box){
    var inp = el("input", "vin mono"), on = true, view = el("div"), log = el("div", "vlog");
    inp.value = "abc"; inp.style.width = "90px";
    var CODE = ["OUTPUT \"Enter a number to divide 100 by\"", "TRY", "   INPUT Num", "   Result ← 100 / INTEGER(Num)", "   OUTPUT Result", "EXCEPT", "   OUTPUT \"Please enter a non-zero whole number\"", "ENDTRY", "OUTPUT \"Program carries on\""];
    var CODE_NO = ["OUTPUT \"Enter a number to divide 100 by\"", "INPUT Num", "Result ← 100 / INTEGER(Num)", "OUTPUT Result", "OUTPUT \"Program carries on\""];
    function draw(){
      var v = inp.value.trim(), bad = !/^-?\d+$/.test(v) || +v === 0, code = on ? CODE : CODE_NO, hl, out;
      if(on){ hl = bad ? [0, 1, 2, 3, 5, 6, 7, 8] : [0, 1, 2, 3, 4, 7, 8]; out = bad ? ["Please enter a non-zero whole number", "Program carries on"] : [String(100 / +v), "Program carries on"]; }
      else { hl = bad ? [0, 1, 2] : [0, 1, 2, 3, 4]; out = bad ? ["<span class='vbad'>RUN-TIME ERROR: the program crashes</span>"] : [String(100 / +v), "Program carries on"]; }
      view.innerHTML = "<pre class='vpre'>" + code.map(function(l, i){ return (hl.indexOf(i) >= 0 ? "▶ " : "  ") + esc(l); }).join("\n") + "</pre><div class='vres'>Output:<br>" + out.join("<br>") + "</div>";
      log.innerHTML = on ? (bad ? "The error occurs inside TRY, so the program jumps to <b>EXCEPT</b>, handles it and then carries on." : "No error occurs, so the EXCEPT part is skipped.") : (bad ? "With <b>no exception handling</b>, an invalid input stops the program. The lines after the error never run." : "With valid input the program works, but it is not protected against bad input.");
    }
    inp.addEventListener("input", draw);
    box.appendChild(row(el("label", null, "User types: "), inp, btn("Exception handling: ON", function(){ on = !on; this.textContent = "Exception handling: " + (on ? "ON" : "OFF"); draw(); }), el("small", "mu", " Try abc, 0 and 5")));
    box.appendChild(view); box.appendChild(log); draw();
  });

  /* ---------- generic matching game ---------- */
  var SETS = {
    os: { title: "Match the description to the term", pairs: [["A fixed time slice allotted to a process", "Quantum"], ["A process moves from running to ready, or from waiting to ready", "Pre-emption / becomes ready"], ["The system that gives the illusion of unlimited memory", "Virtual memory"], ["The algorithm that decides which ready process runs next", "Scheduler"], ["Restoring a process's saved state when it takes control of the CPU again", "Context switch"], ["Physical and logical memory split into fixed-size blocks", "Paging"], ["Logical memory split into variable-size blocks", "Segmentation"], ["A process being continuously denied the resources it needs", "Starvation"]] },
    ml: { title: "Match the machine learning description", pairs: [["Training data is labelled; the model learns to predict the label", "Supervised learning"], ["No labels; the algorithm finds groups or patterns itself", "Unsupervised learning"], ["Learns by trial and error from rewards and punishments", "Reinforcement learning"], ["Error is passed backwards through the network to adjust weights", "Back propagation"], ["Finds the equation that best fits the sample data", "Regression"], ["Neural network with many hidden layers", "Deep learning"], ["The actual output is compared with this to find the error", "Expected output"], ["A node's importance of an input is set by this", "Weight"]] },
    net: { title: "Match the networking description", pairs: [["Set of rules governing communication across a network", "Protocol"], ["Pull protocol used by a client to fetch email", "POP3"], ["Push protocol used to send email to a server", "SMTP"], ["Used to request web pages with the GET method", "HTTP"], ["Splits data into packets and checks they all arrive", "TCP (transport layer)"], ["Adds IP addresses and is connectionless", "IP (internet layer)"], ["Table a router uses to choose the next hop", "Routing table"], ["Limit on the number of hops a packet may take", "Hop count"]] }
  };
  V.reg("match", function(box, o){
    var S = SETS[(o && o.set) || "os"], order = S.pairs.map(function(p, i){ return i; }), i = 0, score = 0, view = el("div"), log = el("div", "vlog");
    seed = 5; order.sort(function(){ return rnd() - 0.5; });
    var terms = S.pairs.map(function(p){ return p[1]; });
    function draw(msg){
      if(i >= order.length){ view.innerHTML = "<div class='vres vok'><b>" + score + " / " + order.length + "</b> correct on the first try. Play again to improve.</div>"; view.appendChild(row(btn("↺ Play again", function(){ i = 0; score = 0; seed = Math.floor(Math.random() * 1000) + 1; order.sort(function(){ return rnd() - 0.5; }); draw(); }))); log.innerHTML = ""; return; }
      var p = S.pairs[order[i]]; view.innerHTML = "<div class='vnote'>" + S.title + " (" + (i + 1) + " of " + order.length + ")</div><div class='vres'><b>" + esc(p[0]) + "</b></div>";
      var r = row(); terms.slice().sort().forEach(function(t){ r.appendChild(btn(t, function(){ if(t === p[1]){ score += (this.dataset.w ? 0 : 1); i++; draw("Correct: <b>" + esc(p[1]) + "</b>."); } else { this.dataset.w = 1; this.disabled = true; log.innerHTML = "Not that one: try again."; wrong = true; } })); }); view.appendChild(r); log.innerHTML = msg || "";
    }
    var wrong = false; box.appendChild(view); box.appendChild(log); draw();
  });

  /* ---------- generic ordering game: arrange the stages ---------- */
  var ORD = {
    tls: { title: "Put the SSL/TLS handshake into the correct order", steps: ["The browser requests a secure page (https) from the web server", "The web server sends back its SSL digital certificate containing its public key and the CA's digital signature", "The browser checks the digital signature and the certificate with the trusted CA's public key", "Once trusted, the browser uses the public key to encrypt a temporary session key and sends it to the server", "The server decrypts the session key with its private key and sends back an acknowledgement", "Browser and server encrypt all further traffic with the session key"] },
    cycle: { title: "Put the interrupt handling steps in order", steps: ["An interrupt signal is raised", "The current instruction finishes", "The processor checks for interrupts at the end of the cycle", "The PC and register contents are saved on the stack", "The interrupt service routine (ISR) runs", "The saved values are restored and the interrupted program continues"] }
  };
  V.reg("order", function(box, o){
    var S = ORD[(o && o.set) || "tls"], answer = [], pool, view = el("div"), log = el("div", "vlog");
    seed = 3; function shuffle(){ pool = S.steps.map(function(s, i){ return i; }).sort(function(){ return rnd() - 0.5; }); answer = []; }
    function draw(msg){
      var h = "<div class='vnote'>" + S.title + ". Click the steps in order.</div><ol class='vol'>" + answer.map(function(i){ return "<li>" + esc(S.steps[i]) + "</li>"; }).join("") + "</ol>";
      view.innerHTML = h;
      if(pool.length){ var r = el("div"); pool.forEach(function(i){ var b = btn(S.steps[i], function(){ if(S.steps[i] === S.steps[answer.length]){ answer.push(i); pool = pool.filter(function(x){ return x !== i; }); draw("Correct, that comes next."); } else { log.innerHTML = "Not the next step. What has to happen first?"; } }); b.style.cssText = "display:block;margin:4px 0;text-align:left"; r.appendChild(b); }); view.appendChild(r); }
      else view.appendChild(row(btn("↺ Shuffle again", function(){ shuffle(); draw(); })));
      log.innerHTML = msg || (pool.length ? "" : "<span class='vok'>All in the right order.</span>");
    }
    box.appendChild(view); box.appendChild(log); shuffle(); draw();
  });
})(typeof window !== "undefined" ? window : this);
