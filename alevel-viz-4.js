/* A Level iLearn visuals, part 4: Boolean laws, email and peer-to-peer protocols, regression, translators and BNF. */
(function(root){
  "use strict";
  var V = root.ILEARN_VIZ, el = V.el, btn = V.btn, row = V.row, esc = V.esc, ov = V.ov;

  /* ---------- 15.2 De Morgan's laws ---------- */
  V.reg("demorgan", function(box){
    var law = 1, A = 0, B = 0, view = el("div"), tabs = row();
    function draw(){
      var L = law === 1 ? ["NOT (A AND B)", function(a, b){ return a & b ? 0 : 1; }, ov("A") + " OR " + ov("B"), function(a, b){ return (a ? 0 : 1) | (b ? 0 : 1); }] : ["NOT (A OR B)", function(a, b){ return a | b ? 0 : 1; }, ov("A") + " AND " + ov("B"), function(a, b){ return (a ? 0 : 1) & (b ? 0 : 1); }];
      var rows = [], i, same = true;
      for(i = 0; i < 4; i++){ var a = i >> 1, b = i & 1, l = L[1](a, b), r = L[3](a, b), cur = a === A && b === B ? "hi" : ""; if(l !== r) same = false; rows.push([{ t: a, c: cur }, { t: b, c: cur }, { t: l, c: cur || "ok" }, { t: r, c: cur || "ok" }]); }
      view.innerHTML = V.table(["A", "B", L[0], L[2]], rows) + "<div class='vres'>Current inputs A = <b>" + A + "</b>, B = <b>" + B + "</b>: left side = <b>" + L[1](A, B) + "</b>, right side = <b>" + L[3](A, B) + "</b>. " + (same ? "<span class='vok'>The two columns are identical in every row</span>, so the two expressions are equivalent." : "") + "</div>" +
        "<div class='vlog'>" + (law === 1 ? "Break the bar, change the AND to an OR: " + ov("A·B") + " = " + ov("A") + " + " + ov("B") : "Break the bar, change the OR to an AND: " + ov("A + B") + " = " + ov("A") + " · " + ov("B")) + "</div>";
      Array.prototype.forEach.call(tabs.querySelectorAll("button[data-l]"), function(x){ x.className = "vb" + (+x.dataset.l === law ? " on" : ""); });
    }
    function sw(name){ var s = el("span", "vsw"), b = el("button", "", "0"); b.type = "button"; b.addEventListener("click", function(){ if(name === "A") A ^= 1; else B ^= 1; b.textContent = name === "A" ? A : B; b.className = (name === "A" ? A : B) ? "one" : ""; draw(); }); s.appendChild(document.createTextNode(name + " ")); s.appendChild(b); return s; }
    [[1, "Law 1: NOT (A AND B)"], [2, "Law 2: NOT (A OR B)"]].forEach(function(l){ var b = btn(l[1], function(){ law = l[0]; draw(); }); b.dataset.l = l[0]; tabs.appendChild(b); });
    box.appendChild(tabs); box.appendChild(row(sw("A"), sw("B"))); box.appendChild(view); draw();
  });

  /* ---------- 14.1 email: SMTP, POP3 and IMAP ---------- */
  V.reg("email", function(box){
    var proto = "IMAP", view = el("div"), log = el("div", "vlog"), pl, tabs = row();
    function steps(){ return [
      { at: 0, t: "Sara writes an email in her email client (the program on her laptop)." },
      { at: 1, t: "Her client uses <b>SMTP</b> to <b>push</b> the email to her own mail server (sending uses SMTP; attachments are sent using MIME)." },
      { at: 2, t: "Her mail server uses <b>SMTP</b> again to pass the email on to the <b>recipient's mail server</b>, which stores it in his mailbox." },
      { at: 3, t: proto === "POP3" ? "The recipient's client connects using <b>POP3</b> (a <b>pull</b> protocol), downloads the new email and disconnects. The email is <b>deleted from the server</b>, so it is no longer on his other devices." : "The recipient's client connects using <b>IMAP</b> (a <b>pull</b> protocol). Only a <b>copy</b> is downloaded: the original stays on the server, so the mailbox stays synchronised and he can read it on several devices." }
    ]; }
    function show(i){
      var s = steps()[i], names = ["Sara's laptop<br><small>email client</small>", "Sara's mail server", "Recipient's mail server", "Recipient's phone<br><small>email client</small>"], h = '<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center">';
      names.forEach(function(n, k){ var on = (s.at === 0 && k === 0) || (s.at === 1 && (k === 0 || k === 1)) || (s.at === 2 && (k === 1 || k === 2)) || (s.at === 3 && (k === 2 || k === 3)); h += '<div class="vcell ' + (on ? "hi" : "") + '" style="margin:0;font-family:inherit;min-width:110px;padding:10px 6px">' + n + (k === 2 && s.at >= 2 && !(s.at === 3 && proto === "POP3") ? "<div>✉ stored</div>" : "") + (k === 2 && s.at === 3 && proto === "POP3" ? "<div>(deleted)</div>" : "") + (k === 3 && s.at === 3 ? "<div>✉ received</div>" : "") + "</div>" + (k < 3 ? '<div style="font-weight:700">' + (k === 0 ? "SMTP ➜" : k === 1 ? "SMTP ➜" : (proto + " ⬅")) + "</div>" : ""); });
      view.innerHTML = h + "</div>"; log.innerHTML = s.t;
    }
    function build(){ if(pl) pl.remove(); pl = V.player(box, { count: function(){ return 4; }, show: show, reset: function(){ view.innerHTML = ""; log.innerHTML = "Press <b>Step</b> to follow an email from sender to recipient."; }, ms: 2400 }); box.insertBefore(pl, view); Array.prototype.forEach.call(tabs.children, function(b){ b.className = "vb" + (b.dataset.p === proto ? " on" : ""); }); }
    ["POP3", "IMAP"].forEach(function(p){ var b = btn("Recipient uses " + p, function(){ proto = p; if(pl) pl.halt(); build(); }); b.dataset.p = p; tabs.appendChild(b); });
    box.appendChild(tabs); box.appendChild(view); box.appendChild(log); build();
  });

  /* ---------- 14.1 BitTorrent: a swarm sharing pieces ---------- */
  V.reg("p2p", function(box){
    var NP = 6, peers = ["Seed A", "Peer B", "Peer C", "Peer D"], have, tick, view = el("div"), log = el("div", "vlog");
    function reset(){ have = peers.map(function(p, i){ var a = []; for(var k = 0; k < NP; k++) a.push(i === 0 ? 1 : 0); return a; }); tick = 0; }
    function count(k){ var c = 0; have.forEach(function(h){ c += h[k]; }); return c; }
    function stepSim(){
      var used = {}, moves = [];
      for(var i = 1; i < peers.length; i++){
        var missing = []; for(var k = 0; k < NP; k++) if(!have[i][k]) missing.push(k);
        missing.sort(function(a, b){ return count(a) - count(b) || a - b; });
        for(var m = 0; m < missing.length; m++){
          var pc = missing[m], prov = -1;
          for(var j = 0; j < peers.length; j++){ if(j !== i && have[j][pc] && !used[j]){ prov = j; break; } }
          if(prov >= 0){ used[prov] = true; moves.push([i, pc, prov]); break; }
        }
      }
      moves.forEach(function(mv){ have[mv[0]][mv[1]] = 1; });
      tick++; return moves;
    }
    function draw(moves){
      var h = '<div class="vscroll"><table class="vt"><tr><th></th>' + [1, 2, 3, 4, 5, 6].map(function(k){ return "<th>Piece " + k + "</th>"; }).join("") + "<th>Status</th></tr>";
      have.forEach(function(row_, i){ var done = row_.every(Boolean); h += "<tr><th>" + peers[i] + "</th>" + row_.map(function(v, k){ var fresh = moves && moves.some(function(mv){ return mv[0] === i && mv[1] === k; }); return "<td class='" + (fresh ? "hi" : (v ? "ok" : "")) + "'>" + (v ? "✓" : "") + "</td>"; }).join("") + "<td>" + (i === 0 ? "seed (has the whole file)" : done ? "<b>complete: now a seed</b>" : "downloading") + "</td></tr>"; });
      view.innerHTML = h + "</table></div>";
    }
    var pl = V.player(box, { count: function(){ return 30; }, show: function(i){ var mv = stepSim(); draw(mv); log.innerHTML = "Time " + tick + ": " + (mv.length ? mv.map(function(m){ return "<b>" + peers[m[0]] + "</b> downloads piece " + (m[1] + 1) + " from " + peers[m[2]]; }).join("; ") + "." : "everyone has the whole file.") + " (Each peer can upload to only one other peer at a time here.)"; if(have.every(function(h){ return h.every(Boolean); })){ pl.halt(); pl.setDone(); } }, reset: function(){ reset(); draw(null); log.innerHTML = "A seed holds all six pieces of the file. Three peers have none. A <b>tracker</b> (not drawn) tells them who else is in the swarm. Press <b>Step</b>."; }, ms: 1300 });
    pl.setDone = function(){ var b = pl.querySelectorAll("button"); b[1].disabled = true; };
    box.appendChild(pl); box.appendChild(view); box.appendChild(log); reset(); draw(null); log.innerHTML = "A seed holds all six pieces of the file. Three peers have none. A <b>tracker</b> (not drawn) tells them who else is in the swarm. Press <b>Step</b>.";
  });

  /* ---------- 18.1 regression: fit a line to data ---------- */
  V.reg("regress", function(box){
    var pts = [[1, 3.1], [2, 4.8], [3, 7.4], [4, 8.7], [5, 11.2], [6, 12.6], [7, 15.3], [8, 16.4]], m = 0.5, c = 8, sm = el("input"), sc = el("input"), view = el("div"), log = el("div", "vlog");
    sm.type = "range"; sm.min = -1; sm.max = 4; sm.step = 0.05; sm.value = m; sc.type = "range"; sc.min = -2; sc.max = 12; sc.step = 0.1; sc.value = c;
    sm.setAttribute("aria-label", "Gradient"); sc.setAttribute("aria-label", "Intercept");
    function best(){ var n = pts.length, sx = 0, sy = 0, sxy = 0, sxx = 0; pts.forEach(function(p){ sx += p[0]; sy += p[1]; sxy += p[0] * p[1]; sxx += p[0] * p[0]; }); var bm = (n * sxy - sx * sy) / (n * sxx - sx * sx); return [bm, (sy - bm * sx) / n]; }
    V.regressBest = best;
    function draw(){
      m = +sm.value; c = +sc.value; var sse = 0, h = '<line class="wr" x1="40" y1="190" x2="400" y2="190"/><line class="wr" x1="40" y1="190" x2="40" y2="10"/><text class="sm mu" x="42" y="12">dependent variable (effect)</text><text class="sm mu end" x="400" y="206">independent variable (cause)</text>';
      var X = function(x){ return 40 + x * 40; }, Y = function(y){ return 190 - y * 10; };
      pts.forEach(function(p){ var pr = m * p[0] + c, e = p[1] - pr; sse += e * e; h += '<line stroke="var(--incorrect)" stroke-width="1.5" x1="' + X(p[0]) + '" y1="' + Y(p[1]) + '" x2="' + X(p[0]) + '" y2="' + Y(pr) + '"/>'; });
      h += '<line stroke="var(--accent)" stroke-width="3" x1="' + X(0) + '" y1="' + Y(c) + '" x2="' + X(9) + '" y2="' + Y(m * 9 + c) + '"/>';
      pts.forEach(function(p){ h += '<circle cx="' + X(p[0]) + '" cy="' + Y(p[1]) + '" r="5" fill="var(--ink)"/>'; });
      view.innerHTML = ""; view.appendChild(V.svg(420, 215, h)); var b = best(), bs = 0; pts.forEach(function(p){ var e = p[1] - (b[0] * p[0] + b[1]); bs += e * e; });
      log.innerHTML = "Function: <b>y = " + m.toFixed(2) + "x + " + c.toFixed(1) + "</b>. Total squared error (the red gaps) = <b>" + sse.toFixed(1) + "</b>. The best-fit line (y = " + b[0].toFixed(2) + "x + " + b[1].toFixed(2) + ") has an error of only " + bs.toFixed(1) + ". Predict: when x = 10, y ≈ <b>" + (m * 10 + c).toFixed(1) + "</b>.";
    }
    sm.addEventListener("input", draw); sc.addEventListener("input", draw);
    box.appendChild(el("p", null, "<b>Regression</b> is supervised learning: it finds a mathematical function that links the independent variable (the cause) to the dependent variable (the effect) so that it can <b>predict</b> new values. Learning means making the difference between the predicted and actual values (the red gaps) as small as possible."));
    box.appendChild(row(el("label", null, "Gradient "), sm, el("label", null, "Intercept "), sc, btn("Find the best fit", function(){ var b = best(); sm.value = b[0]; sc.value = b[1]; draw(); }, "p")));
    box.appendChild(view); box.appendChild(log); draw();
  });

  /* ---------- 16.2 interpreter against compiler ---------- */
  V.reg("interp", function(box){
    var withErr = true, view = el("div"), log = el("div", "vlog"), pl;
    var prog = ["a = 5", "b = a * 2", "c = b +", "print(c)"];
    function stepsI(){ var s = [], i; for(i = 0; i < 4; i++){ if(withErr && i === 2){ s.push({ k: "interp", line: i, msg: "Line 3: the interpreter translates it and finds a <b>syntax error</b>. Execution <b>stops here</b>; lines 1 and 2 have already run." }); return s; } s.push({ k: "interp", line: i, msg: "Line " + (i + 1) + ": translated, then executed straight away." }); } return s; }
    function stepsC(){ var s = []; s.push({ k: "compile", msg: "The compiler analyses the <b>whole program</b> first." }); if(withErr){ s.push({ k: "compile", err: 2, msg: "A syntax error on line 3 is reported. <b>No object code is produced</b> and nothing has run." }); return s; } s.push({ k: "compile", ok: true, msg: "No errors: <b>object code</b> is produced for the whole program." }); s.push({ k: "run", msg: "The object code runs, with no translator needed. It can be run again and again without recompiling." }); return s; }
    function code(hl, err, done){ return '<div class="vres vmono" style="margin:4px 0">' + prog.map(function(l, i){ return '<div style="' + (hl === i ? "background:var(--accent-tint);font-weight:700;" : "") + (err === i ? "color:var(--incorrect);font-weight:700;" : "") + '">' + (i + 1) + "  " + esc(l) + (err === i ? "   ← error" : "") + (done !== undefined && done > i ? "   ✓" : "") + "</div>"; }).join("") + "</div>"; }
    function show(i){
      var I = stepsI(), C = stepsC(), si = I[Math.min(i, I.length - 1)], sc = C[Math.min(i, C.length - 1)];
      var ih = '<b>Interpreter</b> (one statement at a time)' + code(i < I.length ? si.line : I[I.length - 1].line, withErr && i >= 2 ? 2 : undefined, i < I.length ? i + (withErr ? 0 : 1) : undefined) + '<div class="vlog">' + (i < I.length ? si.msg : "Finished.") + "</div>";
      var ch = '<b>Compiler</b> (whole program, then run)' + code(sc.k === "compile" ? -1 : -1, sc.err) + '<div class="vlog">' + (i < C.length ? sc.msg : (withErr ? "Stopped: fix the error and compile again." : "Finished.")) + "</div>";
      view.innerHTML = '<div class="vtwo"><div>' + ih + "</div><div>" + ch + "</div></div>"; log.innerHTML = "";
    }
    function build(){ if(pl) pl.remove(); pl = V.player(box, { count: function(){ return 4; }, show: show, reset: function(){ view.innerHTML = '<div class="vtwo"><div><b>Interpreter</b>' + code(-1) + '</div><div><b>Compiler</b>' + code(-1) + "</div></div>"; }, ms: 1800 }); box.insertBefore(pl, view); }
    var bE = btn("", function(){ withErr = !withErr; bE.textContent = withErr ? "Remove the error from line 3" : "Put an error in line 3"; if(pl) pl.halt(); build(); });
    bE.textContent = "Remove the error from line 3";
    box.appendChild(row(bE)); box.appendChild(view); box.appendChild(log); build();
  });

  /* ---------- 16.2 BNF: does the string match the rules? ---------- */
  V.reg("bnf", function(box){
    var G = {
      variable: { rules: "&lt;variable&gt; ::= &lt;letter&gt;&lt;digit&gt;\n&lt;letter&gt; ::= A | B | C\n&lt;digit&gt; ::= 1 | 2 | 3", def: "A1", check: function(s){ var d = []; if(s.length !== 2) return { ok: false, why: "A &lt;variable&gt; is exactly one letter followed by one digit (2 characters)." }; if("ABC".indexOf(s[0]) < 0) return { ok: false, why: "The first character must be a &lt;letter&gt;: A, B or C, but this one is " + esc(s[0]) + "." }; if("123".indexOf(s[1]) < 0) return { ok: false, why: "The second character must be a &lt;digit&gt;: 1, 2 or 3, but this one is " + esc(s[1]) + "." }; return { ok: true, steps: ["&lt;variable&gt;", "&lt;letter&gt;&lt;digit&gt;", s[0] + "&lt;digit&gt;", s] }; } },
      integer: { rules: "&lt;integer&gt; ::= &lt;digit&gt; | &lt;integer&gt;&lt;digit&gt;\n&lt;digit&gt; ::= 0|1|2|3|4|5|6|7|8|9", def: "1999", check: function(s){ if(!s.length) return { ok: false, why: "An &lt;integer&gt; needs at least one &lt;digit&gt;." }; for(var i = 0; i < s.length; i++) if("0123456789".indexOf(s[i]) < 0) return { ok: false, why: "&lsquo;" + esc(s[i]) + "&rsquo; is not a &lt;digit&gt;." }; var D="&lt;digit&gt;", n=s.length, k, st=["&lt;integer&gt;"]; for(k=1;k<n;k++) st.push("&lt;integer&gt;"+new Array(k+1).join(D)); st.push(new Array(n+1).join(D)); for(k=1;k<=n;k++) st.push(s.slice(0,k)+new Array(n-k+1).join(D)); st=st.filter(function(x,i){return st.indexOf(x)===i;}); return { ok: true, steps: st }; } }
    };
    var cur = "variable", inp = el("input", "vin mono"), rules = el("pre", "ln-pre"), out = el("div", "vres"), tabs = row();
    inp.style.width = "160px"; inp.setAttribute("aria-label", "String to test");
    function run(){ var r = G[cur].check(inp.value.trim()); out.innerHTML = r.ok ? "<span class='vok'>✓ Valid.</span> Derivation:<br>" + r.steps.map(function(s){ return "<span class='vmono'>" + s + "</span>"; }).join(" ⇒<br>") : "<span class='vbad'>✗ Invalid.</span> " + r.why; }
    function load(k){ cur = k; rules.innerHTML = G[k].rules; inp.value = G[k].def; Array.prototype.forEach.call(tabs.children, function(b){ b.className = "vb" + (b.dataset.k === k ? " on" : ""); }); run(); }
    [["variable", "Letter then digit"], ["integer", "Recursive integer"]].forEach(function(g){ var b = btn(g[1], function(){ load(g[0]); }); b.dataset.k = g[0]; tabs.appendChild(b); });
    inp.addEventListener("input", run);
    box.appendChild(el("p", null, "Type a string and see whether it can be built from the BNF rules. Try A1, CC, 1A and Z2 for the first grammar, and 7, 42, 1999 and 4a for the second."));
    box.appendChild(tabs); box.appendChild(rules); box.appendChild(row(el("label", null, "String: "), inp)); box.appendChild(out); load("variable");
  });
})(typeof window !== "undefined" ? window : this);
