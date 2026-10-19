/* iLearn (10BR) visuals, part 2: software, the internet, security, automation, algorithms, programming, databases and logic gates. */
(function(root){
  "use strict";
  var V = root.ILEARN_VIZ, el = V.el, btn = V.btn, row = V.row, esc = V.esc, svg = V.svg;
  function pad(s, n){ s = String(s); while(s.length < n) s = "0" + s; return s; }
  function tabsFor(box, defs, cur, on){ var t = row(); defs.forEach(function(d){ var b = btn(d[1], function(){ cur.v = d[0]; Array.prototype.forEach.call(t.children, function(x){ x.className = "vb" + (x.dataset.k === cur.v ? " on" : ""); }); on(); }); b.dataset.k = d[0]; if(d[0] === cur.v) b.className = "vb on"; t.appendChild(b); }); return t; }

  /* ---------- 4.1.4 interrupts ---------- */
  V.reg("interrupt", function(box){
    var t, queue, running, log, view = el("div"), lg = el("div", "vlog"), stop = null, hist, TOTAL = 14, base;
    function reset(){ t = 0; queue = []; running = "video"; hist = []; base = 0; draw("The processor is running a <b>video</b> task (priority 3). Fire an interrupt while it runs."); }
    function draw(msg){
      var h = '<div class="vcells">'; for(var k = 0; k < Math.max(TOTAL, hist.length); k++){ var c = hist[k]; h += '<div class="vcell ' + (c ? (c === "ISR" ? "no" : (c === "wait" ? "wa" : "ok")) : "") + '" style="min-width:36px;font-size:11px">' + (c === "video" ? "▶" : c === "ISR" ? "ISR" : (c || "")) + "</div>"; }
      h += '</div><div class="ln-muted" style="font-size:12px">each box is one fetch-decode-execute cycle (▶ = the video task, ISR = interrupt service routine)</div>';
      h += "<div><b>Interrupt queue:</b> " + (queue.length ? queue.map(function(q){ return '<span class="vcell" style="display:inline-block;margin:2px;min-width:0;padding:3px 8px">' + q.n + " (priority " + q.p + ")</span>"; }).join("") : "<span class='ln-muted'>empty</span>") + "</div>" + "<div><b>Done:</b> video task " + Math.min(base, TOTAL) + " of " + TOTAL + " cycles</div>";
      view.innerHTML = h; if(msg) lg.innerHTML = msg;
    }
    function tick(){
      // end of a cycle: check the queue
      if(base >= TOTAL){ if(queue.length){ var q = queue.shift(); hist.push("ISR"); draw("The video has finished, so the waiting <b>" + q.n + "</b> interrupt is now handled by its ISR."); return true; } if(stop){ stop(); stop = null; } draw("The video task is finished and the queue is empty."); return false; }
      var top = queue.length ? queue.slice().sort(function(a, b){ return b.p - a.p; })[0] : null;
      if(top && top.p > 3){ queue.splice(queue.indexOf(top), 1); hist.push("ISR"); draw("End of the cycle: the processor checks the queue. <b>" + top.n + "</b> has a <b>higher priority</b> (" + top.p + " > 3), so it <b>stores the video task</b>, finds the source and runs the <b>ISR</b>. Afterwards the stored task is restored."); return true; }
      hist.push("video"); base++; draw(top ? "End of the cycle: <b>" + top.n + "</b> (priority " + top.p + ") is not higher than the video (3), so the video carries on with the next cycle and the interrupt <b>waits in the queue</b>." : "The processor runs a fetch-decode-execute cycle of the video task, then checks the queue: nothing waiting."); return true;
    }
    function go(){ if(stop) return; stop = V.timer(box, tick, 800); }
    function fire(n, p){ queue.push({ n: n, p: p }); draw("<b>" + n + "</b> interrupt (priority " + p + ") joins the queue. The processor will look at it at the end of the current cycle."); }
    box.appendChild(row(btn("▶ Run the video", go, "p"), btn("Mouse click (priority 1)", function(){ fire("mouse click", 1); }), btn("Hardware failure (priority 5)", function(){ fire("hardware failure", 5); }), btn("↺ Reset", function(){ if(stop){ stop(); stop = null; } reset(); })));
    box.appendChild(view); box.appendChild(lg); reset();
  });

  /* ---------- 5.1.2 URL parts ---------- */
  V.reg("url", function(box){
    var inp = el("input", "vin mono"), out = el("div", "vres");
    inp.value = "https://www.bbc.co.uk/news/technology"; inp.style.width = "100%"; inp.style.maxWidth = "440px"; inp.setAttribute("aria-label", "URL");
    function draw(){
      var m = /^(https?):\/\/([^\/\s]+)(\/.*)?$/i.exec(inp.value.trim());
      if(!m){ out.innerHTML = "<span class='vbad'>Not in the form protocol://domain/page.</span> Start with http:// or https://."; return; }
      out.innerHTML = "<div class='vmono' style='font-size:15px'><span style='background:var(--accent-tint);padding:2px 4px;border-radius:4px'>" + m[1].toLowerCase() + "://</span><span style='background:var(--correct-bg);padding:2px 4px;border-radius:4px'>" + esc(m[2]) + "</span><span style='background:var(--diff-moderate-bg);padding:2px 4px;border-radius:4px'>" + esc(m[3] || "") + "</span></div><ul style='margin:8px 0 0 18px'><li><b>Protocol</b>: <b>" + m[1].toLowerCase() + "</b> — the rules used to transfer the data" + (m[1].toLowerCase() === "https" ? " (HTTPS is the secure, encrypted version)" : " (HTTP is not encrypted)") + ".</li><li><b>Domain name</b>: <b>" + esc(m[2]) + "</b> — the name of the website's server; a DNS turns it into an IP address.</li><li><b>Web page / file name</b>: <b>" + esc(m[3] || "(none: the site's home page)") + "</b> — the page wanted.</li></ul>";
    }
    inp.addEventListener("input", draw); box.appendChild(el("p", null, "Edit the URL and watch it split into its three parts.")); box.appendChild(inp); box.appendChild(out); draw();
  });

  /* ---------- 5.1.5 how a web page is found and shown ---------- */
  V.reg("webfetch", function(box){
    var found = true, https = true, view = el("div"), log = el("div", "vlog"), pl, tabs = row();
    function steps(){ var s = [
      { a: "B", t: "You type <b>www.example.com</b> in the browser. The browser sends the domain name to a <b>domain name server (DNS)</b>." },
      { a: "D", t: found ? "The DNS searches its database and returns the matching <b>IP address</b>: <b>93.184.216.34</b>." : "The DNS cannot find the name and asks another DNS. <b>No DNS has it</b>, so the browser is told the website was not found." }];
      if(!found) return s;
      s.push({ a: "S1", t: "The browser uses the IP address to send a request to the <b>web server</b> using <b>" + (https ? "HTTPS (encrypted)" : "HTTP (not encrypted)") + "</b>." });
      s.push({ a: "S2", t: "The web server sends back the page data: <b>HTML, CSS and any script</b> (such as JavaScript)." });
      s.push({ a: "R", t: "The browser <b>renders</b> the HTML and CSS and runs the script to display the web page." }); return s; }
    function show(i){
      var s = steps()[i], h = '<rect class="' + (s.a === "B" || s.a === "R" ? "ac" : "bx") + '" x="15" y="40" width="110" height="80" rx="8"/><text class="mid b" x="70" y="75">Your browser</text><text class="mid sm mu" x="70" y="95">' + (s.a === "R" ? "page shown ✓" : "") + '</text><rect class="' + (s.a === "D" ? "ac" : "bx") + '" x="215" y="5" width="110" height="55" rx="8"/><text class="mid b" x="270" y="38">DNS</text><rect class="' + (s.a === "S1" || s.a === "S2" ? "ac" : "bx") + '" x="415" y="40" width="110" height="80" rx="8"/><text class="mid b" x="470" y="75">Web server</text><text class="mid sm mu" x="470" y="95">93.184.216.34</text>';
      h += '<line class="wr' + (s.a === "B" || s.a === "D" ? " hi" : "") + '" x1="125" y1="55" x2="215" y2="35"/><line class="wr' + (s.a === "S1" || s.a === "S2" ? " hi" : "") + '" x1="125" y1="95" x2="415" y2="95"/>';
      if(s.a === "B") h += '<text class="sm b" x="130" y="30">domain name ➜</text>'; if(s.a === "D") h += '<text class="sm b" x="130" y="30">' + (found ? "⬅ IP address" : "✗ not found") + "</text>";
      if(s.a === "S1") h += '<text class="sm b mid" x="270" y="88">request ➜</text>'; if(s.a === "S2") h += '<text class="sm b mid" x="270" y="88">⬅ HTML + CSS + script</text>';
      view.innerHTML = ""; view.appendChild(svg(540, 140, h)); log.innerHTML = s.t;
    }
    function build(){ if(pl) pl.remove(); pl = V.player(box, { count: function(){ return steps().length; }, show: show, reset: function(){ view.innerHTML = ""; view.appendChild(svg(540, 140, "")); log.innerHTML = "Press <b>Step</b> to follow what happens when you type a URL."; }, ms: 2000 }); box.insertBefore(pl, view); Array.prototype.forEach.call(tabs.querySelectorAll("[data-k]"), function(b){ var on = (b.dataset.k === "ok" && found) || (b.dataset.k === "nf" && !found) || (b.dataset.k === "https" && https) || (b.dataset.k === "http" && !https); b.className = "vb" + (on ? " on" : ""); }); }
    [["ok", "Site found", function(){ found = true; }], ["nf", "DNS cannot find it", function(){ found = false; }], ["https", "HTTPS", function(){ https = true; }], ["http", "HTTP", function(){ https = false; }]].forEach(function(d){ var b = btn(d[1], function(){ d[2](); if(pl) pl.halt(); build(); }); b.dataset.k = d[0]; tabs.appendChild(b); });
    box.appendChild(tabs); box.appendChild(view); box.appendChild(log); build();
  });

  /* ---------- 5.1.6 cookies ---------- */
  V.reg("cookies", function(box){
    var kind = "session", state, view = el("div"), lg = el("div", "vlog"), cur = { v: "session" };
    function reset(){ state = { visits: 0, cart: [], closed: false, later: false, cookie: false }; draw("Press <b>Add to basket</b>, then close the browser and come back."); }
    function draw(msg){
      var cookie = state.cookie ? (kind === "session" ? (state.closed ? "<span class='vbad'>deleted when the browser closed</span>" : "stored temporarily in the browser") : "stored on the hard drive with an expiry date") : "none yet";
      var remembered = state.later ? (kind === "persistent" && state.cookie) : true;
      view.innerHTML = '<div class="vtwo"><div class="vres"><b>🛒 Shop website</b><br>' + (state.later && !remembered ? "Welcome. Your basket is empty." : (state.later ? "Welcome back, Sam! Basket: " + state.cart.join(", ") : "Basket: " + (state.cart.length ? state.cart.join(", ") : "empty"))) + '</div><div class="vres"><b>🍪 Cookie</b><br>' + cookie + "</div></div>";
      if(msg) lg.innerHTML = msg;
    }
    var items = ["trainers", "hoodie", "cap"];
    function add(){ if(state.closed){ return; } var it = items[state.cart.length % 3]; state.cart.push(it); state.cookie = true; draw("“" + it + "” added. The server asks the browser to store a <b>" + kind + " cookie</b> so it can remember the basket."); }
    function close_(){ if(!state.cookie){ draw("Add something first."); return; } state.closed = true; draw(kind === "session" ? "The browser is closed. A <b>session cookie</b> is temporary, so it is <b>deleted</b>." : "The browser is closed. The <b>persistent cookie</b> stays on the hard drive until it expires or is deleted."); }
    function later(){ if(!state.closed){ draw("Close the browser first."); return; } state.later = true; draw(kind === "session" ? "You return later: the cookie is gone, so the site does not recognise you and the basket is <b>empty</b>. (Good for items in a shopping cart for one visit.)" : "You return later: the browser sends the cookie to the server, which <b>remembers you</b>. (Good for staying logged in or remembering preferences.)"); }
    var t = tabsFor(box, [["session", "Session cookie"], ["persistent", "Persistent cookie"]], cur, function(){ kind = cur.v; reset(); });
    box.appendChild(t); box.appendChild(row(btn("Add to basket", add, "p"), btn("Close the browser", close_), btn("Come back a week later", later), btn("↺ Reset", reset)));
    box.appendChild(view); box.appendChild(lg); reset();
  });

  /* ---------- 5.2.2 blockchain ledger ---------- */
  V.reg("blockchain", function(box){
    var recs = ["Amy pays Raj 0.5 coin", "Raj pays Lee 0.2 coin", "Lee pays Amy 0.1 coin"], times = ["3 May 10:02", "3 May 10:09", "3 May 10:15"], orig, view = el("div"), lg = el("div", "vlog");
    function hash(s){ var h = 5381, i; for(i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0; return pad(h.toString(16).toUpperCase(), 8); }
    function sigs(r){ var prev = "00000000", out = []; r.forEach(function(x, i){ prev = hash(x + times[i] + prev); out.push(prev); }); return out; }
    orig = sigs(recs);
    function draw(msg){
      var now = sigs(recs), bad = false, h = '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:stretch">';
      recs.forEach(function(r, i){ if(now[i] !== orig[i]) bad = true; var ok = !bad; h += '<div style="flex:1 1 150px;border:2px solid var(--' + (ok ? "correct" : "incorrect") + ');background:var(--' + (ok ? "correct" : "incorrect") + '-bg);border-radius:10px;padding:8px"><b>Block ' + (i + 1) + "</b><br><small>" + times[i] + "</small><br><input class='vin' data-i='" + i + "' value='" + esc(r) + "' style='width:100%;margin:4px 0' aria-label='Record " + (i + 1) + "'><br><small>signature:</small> <b class='vmono'>" + now[i] + "</b><br>" + (ok ? "✓ valid" : "✗ does not match the ledger") + "</div>"; });
      view.innerHTML = h + "</div>";
      Array.prototype.forEach.call(view.querySelectorAll("input"), function(inp){ inp.addEventListener("change", function(){ recs[+inp.dataset.i] = inp.value; draw("You changed a record, so its signature changed and no longer matches. Everyone else's copy of the ledger still shows the original, so the change is spotted. In a blockchain each signature also depends on the block before it, so one edit breaks every later block too."); }); });
      if(msg) lg.innerHTML = msg;
    }
    box.appendChild(el("p", null, "Each payment is a <b>block</b> with a digital signature, date and time. Try to change a record (edit the text and press Enter or click away). The signature shown is a simple stand-in for the real encryption.")); box.appendChild(row(btn("Restore the ledger", function(){ recs = ["Amy pays Raj 0.5 coin", "Raj pays Lee 0.2 coin", "Lee pays Amy 0.1 coin"]; draw("Ledger restored."); })));
    box.appendChild(view); box.appendChild(lg); draw("Anyone can view the ledger. Past payments cannot be changed without it being obvious, so no bank is needed to keep the records.");
  });

  /* ---------- 5.3 caesar cipher for symmetric encryption ---------- */
  V.reg("caesar", function(box){
    var inp = el("input", "vin mono"), key = el("input"), out = el("div", "vres");
    inp.value = "MEET AT NOON"; inp.maxLength = 20; inp.style.width = "180px"; key.type = "range"; key.min = 1; key.max = 25; key.value = 3; inp.setAttribute("aria-label", "Plain text"); key.setAttribute("aria-label", "Key");
    function enc(s, k){ return s.toUpperCase().replace(/[A-Z]/g, function(c){ return String.fromCharCode((c.charCodeAt(0) - 65 + k + 26) % 26 + 65); }); }
    function draw(){
      var k = +key.value, c = enc(inp.value, k);
      out.innerHTML = "Plain text: <b class='vmono'>" + esc(inp.value.toUpperCase()) + "</b><br>⬇ <b>encrypt</b> with the key (shift by <b>" + k + "</b>)<br>Cipher text: <b class='vmono'>" + esc(c) + "</b><br>⬇ <b>decrypt</b> with the <b>same key</b> (shift back by " + k + ")<br>Plain text again: <b class='vmono'>" + esc(enc(c, -k)) + "</b><br><span class='ln-muted'>In <b>symmetric</b> encryption the same secret key encrypts and decrypts, so the key must be shared safely. This simple shift cipher is only a model: real encryption uses very complex keys.</span>";
    }
    inp.addEventListener("input", draw); key.addEventListener("input", draw);
    box.appendChild(row(el("label", null, "Message "), inp, el("label", null, "Key "), key)); box.appendChild(out); draw();
  });

  /* ---------- 5.3.1a brute-force ---------- */
  V.reg("brute", function(box){
    var inp = el("input", "vin mono"), out = el("div", "vres"), lock = false, bl = btn("", function(){ lock = !lock; draw(); });
    inp.value = "mrsnuffles01"; inp.style.width = "220px"; inp.setAttribute("aria-label", "Password to test");
    function fmt(sec){ if(sec < 1) return "less than a second"; var u = [["years", 31557600], ["days", 86400], ["hours", 3600], ["minutes", 60], ["seconds", 1]], i; for(i = 0; i < u.length; i++) if(sec >= u[i][1]) return (sec / u[i][1] >= 1e6 ? (sec / u[i][1]).toExponential(2) : Math.round(sec / u[i][1]).toLocaleString()) + " " + u[i][0]; return "?"; }
    function draw(){
      var p = inp.value, set = 0; if(/[a-z]/.test(p)) set += 26; if(/[A-Z]/.test(p)) set += 26; if(/\d/.test(p)) set += 10; if(/[^A-Za-z0-9]/.test(p)) set += 32;
      var combos = set ? Math.pow(set, p.length) : 0, sec = combos / 1e9 / 2, wm = /^([A-Za-z]+)(\d{0,4})$/.exec(p), wordish = !!wm && wm[1].length <= 14;
      if(wordish) sec = 1e5 * Math.pow(10, wm[2].length) / 1e9 / 2;
      bl.textContent = lock ? "Account locks after 3 wrong attempts: ON" : "Account locks after 3 wrong attempts: OFF";
      out.innerHTML = "Characters used: <b>" + set + "</b> different symbols × length <b>" + p.length + "</b><br>Possible combinations if the password were random: <b>" + (combos > 1e15 ? combos.toExponential(2) : combos.toLocaleString()) + "</b><br>" + (wordish ? "<span class='vwarn'>It is a word (or name) with a few numbers on the end.</span> A program tries lists of common words and names first, so it is found much sooner than a random password.<br>" : "") + "A program trying <b>1 billion guesses a second</b> would take about <b>" + (lock ? "forever: it gets only 3 guesses before the account is locked" : fmt(sec)) + "</b>.<br>" + (lock ? "<span class='vok'>Locking the account stops a program making thousands of guesses.</span>" : (sec < 3600 * 24 * 30 ? "<span class='vbad'>Weak: quick to crack.</span>" : "<span class='vok'>Strong against guessing: long, with upper and lower case letters, numbers and symbols, and not a word.</span>"));
    }
    inp.addEventListener("input", draw); box.appendChild(el("p", null, "Type a password to see how many combinations a brute-force program would have to try. Compare <b>mrsnuffles01</b> with <b>1gH6dk@dnlwm!dosTsjlp</b>.")); box.appendChild(row(inp, bl)); box.appendChild(out); draw();
  });

  /* ---------- 5.3.1c DDoS ---------- */
  V.reg("ddos", function(box){
    var bots = false, proxy = false, load = 8, view = el("div"), lg = el("div", "vlog"), t = 0;
    function draw(){
      var inbound = bots ? (proxy ? 20 : 100) : 8; load += (inbound - load) * 0.3; var L = Math.round(load), down = L > 80, h = "";
      var i; for(i = 0; i < 3; i++) h += '<rect class="bx" x="10" y="' + (15 + i * 38) + '" width="70" height="28" rx="6"/><text class="mid sm" x="45" y="' + (33 + i * 38) + '">real user</text><line class="wr" x1="80" y1="' + (29 + i * 38) + '" x2="' + (proxy ? 200 : 330) + '" y2="80"/>';
      for(i = 0; i < 6; i++){ var on = bots; h += '<rect class="' + (on ? "no" : "bx") + '" x="10" y="' + (135 + i * 0) + '" width="0" height="0"/>'; }
      for(i = 0; i < 5; i++) h += '<rect class="' + (bots ? "no" : "bx") + '" x="' + (10 + i * 15) + '" y="130" width="12" height="12" rx="3"/>';
      h += '<text class="sm mu" x="10" y="160">' + (bots ? "botnet: infected computers all send requests" : "botnet: sleeping (zombie computers)") + "</text>";
      if(bots) h += '<line stroke="var(--incorrect)" stroke-width="3" x1="85" y1="136" x2="' + (proxy ? 200 : 330) + '" y2="86"/>';
      if(proxy) h += '<rect class="ac" x="200" y="55" width="70" height="50" rx="8"/><text class="mid b sm" x="235" y="78">proxy</text><text class="mid sm" x="235" y="93">filters</text><line class="wr hi" x1="270" y1="80" x2="330" y2="80"/>';
      h += '<rect class="' + (down ? "no" : "ok") + '" x="330" y="50" width="100" height="60" rx="8"/><text class="mid b" x="380" y="78">Web server</text><text class="mid sm" x="380" y="96">' + (down ? "CRASHED" : "running") + '</text><rect class="bx" x="450" y="30" width="26" height="100" rx="5"/><rect fill="var(--' + (L > 80 ? "incorrect" : (L > 50 ? "diff-moderate" : "correct")) + ')" x="450" y="' + (130 - L) + '" width="26" height="' + L + '" rx="5"/><text class="sm mid" x="463" y="146">load</text>';
      view.innerHTML = ""; view.appendChild(svg(500, 170, h));
      lg.innerHTML = !bots ? "Normal traffic: the server copes easily." : (proxy ? "A <b>proxy server</b> filters and slows the flood of requests, so the web server stays up and real users can still get in." : (down ? "<span class='vbad'>The server is flooded and crashes. Real users see “site unavailable”.</span>" : "Requests are flooding in…"));
    }
    box.appendChild(row(btn("Wake up the bots (attack!)", function(){ bots = true; }, "p"), btn("Switch the proxy server on/off", function(){ proxy = !proxy; }), btn("↺ Reset", function(){ bots = false; proxy = false; load = 8; })));
    box.appendChild(view); box.appendChild(lg); draw(); V.timer(box, function(){ draw(); }, 350);
  });

  /* ---------- 5.3.1f phishing: spot the clues ---------- */
  V.reg("phish", function(box){
    var clues = [
      ["from", "Sender: support@paypa1-security.com", "The sender's address is a look-alike domain (paypa1, with the number 1)."],
      ["greet", "Dear Customer,", "A generic greeting: a real company usually uses your name."],
      ["urgent", "Your account will be CLOSED in 24 hours unless you act now!", "Urgency and threats are used to make you panic and not think."],
      ["link", "Click here to verify: http://secure-login.example-pay.ru/verify", "The link goes to a different, unrelated website (and not even HTTPS)."],
      ["spell", "We have notice unusual activty on you account.", "Spelling and grammar mistakes are common in phishing emails."]
    ], found = {}, view = el("div"), lg = el("div", "vlog");
    function draw(){
      var n = Object.keys(found).length;
      view.innerHTML = '<div class="vres">' + clues.map(function(c){ return '<div><button type="button" data-k="' + c[0] + '" style="all:unset;cursor:pointer;display:block;padding:4px 6px;border-radius:6px;' + (found[c[0]] ? "background:var(--correct-bg);outline:2px solid var(--correct)" : "outline:1px dashed var(--line)") + ';margin:4px 0;width:calc(100% - 12px)">' + esc(c[1]) + "</button>" + (found[c[0]] ? "<small class='vok'>✓ " + esc(c[2]) + "</small>" : "") + "</div>"; }).join("") + "</div>";
      Array.prototype.forEach.call(view.querySelectorAll("button"), function(b){ b.addEventListener("click", function(){ found[b.dataset.k] = true; draw(); }); });
      lg.innerHTML = n === clues.length ? "<span class='vok'>You found all five warning signs.</span> <b>Phishing</b> = fake emails that trick you into giving personal data. Never click the link: go to the real website yourself." : "Found " + n + " of " + clues.length + " warning signs. Click the lines of the email that look suspicious.";
    }
    box.appendChild(el("p", null, "<b>Spot the phishing clues.</b> Click every part of this email that looks suspicious.")); box.appendChild(view); box.appendChild(lg); draw();
  });

  /* ---------- 6.1 an automated system: sensor, ADC, microprocessor, actuator ---------- */
  V.reg("autosys", function(box){
    var P = { heat: { name: "Central heating", unit: "°C", min: 5, max: 30, v: 17, stored: 20, low: true, act: "heater", on: "Heating ON", off: "Heating OFF", sensor: "temperature sensor", rule: "reading < stored minimum (20 °C)?" }, light: { name: "Street light", unit: " lux", min: 0, max: 100, v: 20, stored: 30, low: true, act: "lamp", on: "Lamp ON", off: "Lamp OFF", sensor: "light sensor", rule: "reading < stored value (30 lux)?" } }, cur = { v: "heat" }, sl = el("input"), view = el("div"), lg = el("div", "vlog");
    sl.type = "range"; sl.setAttribute("aria-label", "Sensor reading");
    function draw(){
      var p = P[cur.v], v = +sl.value, action = v < p.stored, adc = pad(Math.max(0, Math.min(255, Math.round(v))).toString(2), 8), box_ = function(x, w, cls, a, b){ return '<rect class="' + cls + '" x="' + x + '" y="40" width="' + w + '" height="70" rx="8"/><text class="mid b sm" x="' + (x + w / 2) + '" y="62">' + a + '</text><text class="mid sm" x="' + (x + w / 2) + '" y="84">' + b + "</text>"; };
      var h = box_(10, 105, "ac", "Sensor", "reads " + v + p.unit) + box_(145, 90, "bx", "ADC", adc.slice(0, 4) + " " + adc.slice(4)) + box_(265, 120, "bx", "Microprocessor", action ? "yes: send signal" : "no: do nothing") + box_(415, 110, action ? "ok" : "bx", "Actuator", action ? p.on : p.off);
      h += '<text class="sm mu mid" x="62" y="125">analogue</text><text class="sm mu mid" x="190" y="125">digital</text><text class="sm mid" x="325" y="125">' + p.rule + '</text><line class="wr hi" x1="115" y1="75" x2="145" y2="75"/><line class="wr hi" x1="235" y1="75" x2="265" y2="75"/><line class="wr' + (action ? " v1" : "") + '" x1="385" y1="75" x2="415" y2="75"/><path class="wr dash" d="M470 40 V15 H62 V40" fill="none"/><text class="sm mu mid" x="270" y="12">the process repeats until the system is switched off</text>';
      view.innerHTML = ""; view.appendChild(svg(540, 140, h));
      lg.innerHTML = "The sensor only <b>gathers</b> data. The <b>ADC</b> converts the analogue reading to binary because the microprocessor only understands digital data. The microprocessor <b>compares</b> it with the stored value and, if needed, signals the <b>actuator</b>. Now: " + (action ? "<b>" + v + p.unit + " is below " + p.stored + p.unit + "</b>, so the actuator is switched on." : "the reading is not below " + p.stored + p.unit + ", so nothing needs to happen.");
    }
    var t = tabsFor(box, [["heat", "Central heating"], ["light", "Street light"]], cur, function(){ var p = P[cur.v]; sl.min = p.min; sl.max = p.max; sl.value = p.v; draw(); });
    sl.min = 5; sl.max = 30; sl.value = 17; sl.addEventListener("input", draw);
    box.appendChild(t); box.appendChild(row(el("label", null, "Change the sensor reading "), sl)); box.appendChild(view); box.appendChild(lg); draw();
  });

  /* ---------- 6.3.3a machine learning: supervised and unsupervised ---------- */
  V.reg("mlearn", function(box){
    var data = [[1.2, 1.5, "A"], [1.6, 2.2, "A"], [2.0, 1.2, "A"], [1.4, 2.8, "A"], [2.2, 2.4, "A"], [5.8, 5.6, "B"], [6.4, 6.6, "B"], [5.2, 6.4, "B"], [6.8, 5.4, "B"], [6.0, 7.0, "B"]], newPts = [], mode = "sup", view = el("div"), lg = el("div", "vlog"), cur = { v: "sup" };
    function cent(lab, arr){ var s = arr.filter(function(p){ return p[2] === lab; }), x = 0, y = 0; s.forEach(function(p){ x += p[0]; y += p[1]; }); return [x / s.length, y / s.length]; }
    function draw(msg){
      var X = function(x){ return 30 + x * 55; }, Y = function(y){ return 190 - y * 22; }, h = '<line class="wr" x1="30" y1="190" x2="440" y2="190"/><line class="wr" x1="30" y1="190" x2="30" y2="15"/><text class="sm mu" x="32" y="12">feature 2 (e.g. ear length)</text><text class="sm mu end" x="440" y="206">feature 1 (e.g. height)</text>';
      var cA = cent("A", data), cB = cent("B", data);
      data.forEach(function(p){ h += '<circle cx="' + X(p[0]) + '" cy="' + Y(p[1]) + '" r="7" fill="' + (mode === "sup" ? (p[2] === "A" ? "var(--accent)" : "var(--diff-moderate)") : "var(--muted)") + '"/>' + (mode === "sup" ? '<text class="mid sm w b" x="' + X(p[0]) + '" y="' + (Y(p[1]) + 4) + '">' + (p[2] === "A" ? "D" : "H") + "</text>" : ""); });
      if(mode === "unsup"){ h += '<ellipse cx="' + X(cA[0]) + '" cy="' + Y(cA[1]) + '" rx="60" ry="45" fill="none" stroke="var(--accent)" stroke-width="2" stroke-dasharray="5 4"/><ellipse cx="' + X(cB[0]) + '" cy="' + Y(cB[1]) + '" rx="62" ry="47" fill="none" stroke="var(--diff-moderate)" stroke-width="2" stroke-dasharray="5 4"/>'; }
      newPts.forEach(function(p){ var dA = Math.hypot(p[0] - cA[0], p[1] - cA[1]), dB = Math.hypot(p[0] - cB[0], p[1] - cB[1]), lab = dA < dB ? "A" : "B"; h += '<circle cx="' + X(p[0]) + '" cy="' + Y(p[1]) + '" r="8" fill="var(--bg)" stroke="' + (lab === "A" ? "var(--accent)" : "var(--diff-moderate)") + '" stroke-width="3"/><text class="mid b sm" x="' + X(p[0]) + '" y="' + (Y(p[1]) + 4) + '">?</text>'; });
      view.innerHTML = ""; var s = svg(460, 215, h); s.style.cursor = "crosshair"; s.addEventListener("click", function(e){ var r = s.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * 460, y = (e.clientY - r.top) / r.height * 215, fx = (x - 30) / 55, fy = (190 - y) / 22; if(fx < 0 || fy < 0) return; newPts.push([fx, fy]); if(newPts.length > 3) newPts.shift(); var pp = newPts[newPts.length - 1], dA = Math.hypot(pp[0] - cA[0], pp[1] - cA[1]), dB = Math.hypot(pp[0] - cB[0], pp[1] - cB[1]); draw(mode === "sup" ? "The new animal (ringed) is closest to the typical <b>" + (dA < dB ? "dog" : "horse") + "</b> that the program learned from the labelled examples, so it decides: <b>" + (dA < dB ? "dog" : "horse") + "</b>." : "The new point joins the closer of the two groups the program found."); });
      view.appendChild(s);
      lg.innerHTML = msg || (mode === "sup" ? "<b>Supervised learning:</b> the programmer labels the data (D = dog, H = horse). The program learns what each looks like, then labels new examples. Click the chart to add a new animal." : "<b>Unsupervised learning:</b> the data has <b>no labels</b>. The program finds patterns and groups (clusters) by itself. Click to add new points.");
    }
    box.appendChild(tabsFor(box, [["sup", "Supervised (labelled)"], ["unsup", "Unsupervised (no labels)"]], cur, function(){ mode = cur.v; newPts = []; draw(); })); box.appendChild(view); box.appendChild(lg); draw();
  });

  /* ---------- 6.3.3b expert system ---------- */
  V.reg("expert", function(box){
    var Q = { start: ["Is the green light on?", "q2", "Press the power button. (Rule: IF green light is off THEN printer has no power.)"], q2: ["Is the red light on?", "q3", "Printer is on and ready. Try printing a test page."], q3: ["Is paper loaded in the tray?", "Printer is out of ink: replace the cartridge. (Rule: IF red light on AND paper loaded THEN check ink.)", "Load paper and press resume. (Rule: IF red light on AND no paper THEN load paper.)"] }, node = "start", trail = [], view = el("div"), lg = el("div", "vlog");
    function draw(){
      var q = Q[node], final = !q;
      view.innerHTML = '<div class="vtwo"><div class="vres"><b>User interface</b><br>' + trail.map(function(t){ return "<div class='ln-muted'>❓ " + esc(t[0]) + " → <b>" + t[1] + "</b></div>"; }).join("") + (final ? "<div class='vok'>💡 " + esc(node) + "</div>" : "<div><b>❓ " + q[0] + '</b></div><div style="margin-top:6px"></div>') + '</div><div class="vres"><b>Inside the expert system</b><br><span style="display:block;padding:4px;border-radius:6px;background:var(--accent-tint)">Knowledge base: facts about the printer lights</span><span style="display:block;padding:4px;margin-top:4px;border-radius:6px;background:var(--accent-tint)">Rule base: IF … THEN … rules</span><span style="display:block;padding:4px;margin-top:4px;border-radius:6px;background:var(--' + (final ? "correct-bg" : "accent-tint") + ')">Inference engine: chooses the next question / the answer</span></div></div>';
      if(!final){ var r = el("div"); r.appendChild(btn("Yes", function(){ trail.push([q[0], "Yes"]); node = Q[node][1]; draw(); }, "p")); r.appendChild(btn("No", function(){ trail.push([q[0], "No"]); node = node === "start" ? Q.start[2] : (node === "q2" ? Q.q2[2] : Q.q3[2]); draw(); })); view.querySelector(".vres div:last-child").appendChild(r); }
      lg.innerHTML = final ? "The inference engine used the <b>knowledge base</b> and <b>rule base</b> to reach a conclusion, just as an expert would." : "The expert system asks questions and, depending on the answers, asks a different question or gives a conclusion.";
    }
    box.appendChild(row(btn("↺ Start again", function(){ node = "start"; trail = []; draw(); }))); box.appendChild(view); box.appendChild(lg); draw();
  });

  /* ---------- 7.1 program development life cycle ---------- */
  V.reg("pdlc", function(box){
    var S = [["1. Analysis", "Find out what the problem is and what the program must do: requirements, inputs, processes and outputs. Write a requirements specification.", "Interview teachers: record points per student and show house totals."], ["2. Design", "Plan the solution before coding, using structure diagrams, flowcharts and pseudocode.", "Draw a structure diagram and flowchart for adding points and showing totals."], ["3. Coding", "Write the program in a programming language, following the design. Code is also tested as it is written.", "Write the house-points program from the design."], ["4. Testing", "Run the program with test data to check it works, does not crash and meets the requirements. Fix errors found.", "Enter normal and wrong data. If an error appears, go back and fix it."]], sel = 0, view = el("div");
    function draw(){
      var h = "", cx = 270, cy = 90, k; S.forEach(function(s, i){ var a = i * Math.PI / 2 - Math.PI / 2, x = cx + Math.cos(a) * 140, y = cy + Math.sin(a) * 58; h += '<g data-i="' + i + '" style="cursor:pointer"><rect class="' + (i === sel ? "ac" : "bx") + '" x="' + (x - 62) + '" y="' + (y - 18) + '" width="124" height="36" rx="18"/><text class="mid b" x="' + x + '" y="' + (y + 4) + '">' + s[0] + "</text></g>"; });
      h += '<path class="wr hi dash" d="M330 55 Q400 90 330 125" fill="none"/><path class="wr hi dash" d="M210 125 Q140 90 210 55" fill="none"/><text class="sm mu mid" x="270" y="95">repeat if errors are found</text>';
      view.innerHTML = ""; var s = svg(540, 190, h); Array.prototype.forEach.call(s.querySelectorAll("g"), function(g){ g.addEventListener("click", function(){ sel = +g.dataset.i; draw(); }); }); view.appendChild(s);
      var d = el("div", "vres"); d.innerHTML = "<b>" + S[sel][0] + "</b><br>" + S[sel][1] + "<br><span class='ln-muted'>School house-points program: " + S[sel][2] + "</span>"; view.appendChild(d);
    }
    box.appendChild(el("p", null, "Click each stage of the cycle.")); box.appendChild(view); draw();
  });

  /* ---------- 7.4c linear search ---------- */
  V.reg("lsearch", function(box){
    var data = [5, 3, 9, 4, 8], inp = el("input", "vin mono"), view = el("div"), lg = el("div", "vlog"), pl;
    inp.type = "number"; inp.value = 4; inp.style.width = "70px"; inp.setAttribute("aria-label", "Value to find");
    function steps(){ var t = +inp.value, s = [], i; for(i = 0; i < data.length; i++){ var hit = data[i] === t; s.push({ i: i, hit: hit, m: "Check item " + (i + 1) + ": is " + data[i] + " = " + t + "? " + (hit ? "<b class='vok'>Yes: found at position " + (i + 1) + ". Stop.</b>" : "No.") }); if(hit) return s; } s.push({ i: -1, m: "<b class='vbad'>End of the list reached: " + t + " is not in the list.</b>" }); return s; }
    function show(k){ var s = steps()[k]; view.innerHTML = '<div class="vcells">' + data.map(function(v, i){ return '<div class="vcell ' + (s.i === i ? (s.hit ? "ok" : "hi") : (i < s.i || (s.i === -1) ? "no" : "")) + '">' + v + "<small>position " + (i + 1) + "</small></div>"; }).join("") + "</div>"; lg.innerHTML = s.m; }
    function build(){ if(pl) pl.remove(); pl = V.player(box, { count: function(){ return steps().length; }, show: show, reset: function(){ view.innerHTML = '<div class="vcells">' + data.map(function(v, i){ return '<div class="vcell">' + v + "<small>position " + (i + 1) + "</small></div>"; }).join("") + "</div>"; lg.innerHTML = "A linear search checks each item <b>one at a time</b>, starting at the first. The list does not need to be sorted."; }, ms: 1000 }); box.insertBefore(pl, view); }
    inp.addEventListener("input", build); box.appendChild(row(el("label", null, "Search for "), inp)); box.appendChild(view); box.appendChild(lg); build();
  });

  /* ---------- 7.6 test data ---------- */
  V.reg("testdata", function(box){
    var lo = 10, hi = 100, inp = el("input", "vin mono"), out = el("div", "vres"), view = el("div");
    inp.value = "35"; inp.style.width = "120px"; inp.setAttribute("aria-label", "Test value");
    function draw(){
      var s = inp.value.trim(), n = Number(s), isNum = s !== "" && /^-?\d+$/.test(s), tags = [];
      if(!isNum) tags.push(["Abnormal", "wrong data type: this is not an integer", "no"]);
      else {
        var valid = n >= lo && n <= hi; if(!valid) tags.push(["Abnormal", "outside the range " + lo + " to " + hi + " so the program should reject it", "no"]);
        if(valid && n !== lo && n !== hi) tags.push(["Normal", "valid data that the program should accept", "ok"]);
        if(n === lo || n === hi) tags.push(["Extreme", "the " + (n === lo ? "smallest" : "largest") + " value that is accepted", "wa"]);
        if(n === lo - 1 || n === lo || n === hi || n === hi + 1) tags.push(["Boundary", "on one side of a limit: the " + (valid ? "last value accepted" : "first value rejected"), "wa"]);
      }
      out.innerHTML = tags.map(function(t){ return "<div><span class='vcell " + t[2] + "' style='display:inline-block;min-width:80px;font-family:inherit;font-weight:700'>" + t[0] + "</span> " + t[1] + "</div>"; }).join("");
      var h = '<line class="wr" x1="20" y1="45" x2="520" y2="45"/>', X = function(v){ return 20 + (v + 20) / 160 * 500; };
      h += '<rect class="ok" x="' + X(lo) + '" y="30" width="' + (X(hi) - X(lo)) + '" height="30" opacity=".5"/><text class="mid b" x="' + X(lo) + '" y="22">' + lo + '</text><text class="mid b" x="' + X(hi) + '" y="22">' + hi + '</text><text class="mid sm mu" x="' + X(55) + '" y="50">accepted</text><text class="mid sm" x="' + X(-8) + '" y="50">rejected</text><text class="mid sm" x="' + X(130) + '" y="50">rejected</text>';
      if(isNum) h += '<circle cx="' + X(Math.max(-20, Math.min(140, n))) + '" cy="45" r="7" fill="var(--accent)"/>';
      view.innerHTML = ""; view.appendChild(svg(540, 80, h));
    }
    inp.addEventListener("input", draw); box.appendChild(el("p", null, "A program accepts an age from <b>10 to 100</b> inclusive. Type a test value (try 35, 10, 9, 100, 101, 150, -5 and twelve) to see which type of test data it is."));
    box.appendChild(row(el("label", null, "Test value "), inp)); box.appendChild(view); box.appendChild(out); draw();
  });

  /* ---------- 7.5a validation checks ---------- */
  V.reg("valid", function(box){
    var R = { range: ["Range check", "Age must be between 0 and 100", "25", function(s){ var n = Number(s); return s !== "" && !isNaN(n) && n >= 0 && n <= 100 ? [1, "within 0 to 100"] : [0, "not between 0 and 100"]; }], length: ["Length check", "Password must have at least 8 characters", "secret99", function(s){ return s.length >= 8 ? [1, s.length + " characters"] : [0, "only " + s.length + " characters"]; }], type: ["Type check", "Age must be an integer", "25", function(s){ return /^-?\d+$/.test(s) ? [1, "it is an integer"] : [0, "not a whole number"]; }], presence: ["Presence check", "Surname must not be left empty", "Khan", function(s){ return s.trim().length ? [1, "something was entered"] : [0, "nothing entered"]; }], format: ["Format check", "Date must look like NN/NN/NNNN", "05/03/2011", function(s){ return /^\d\d\/\d\d\/\d{4}$/.test(s) ? [1, "matches the pattern NN/NN/NNNN"] : [0, "does not match the pattern NN/NN/NNNN"]; }] }, cur = { v: "range" }, inp = el("input", "vin mono"), out = el("div", "vres"), rule = el("div", "ln-muted");
    inp.style.width = "200px"; inp.setAttribute("aria-label", "Data to validate");
    function draw(){ var r = R[cur.v], res = r[3](inp.value); rule.innerHTML = "<b>" + r[0] + ":</b> " + r[1]; out.innerHTML = res[0] ? "<span class='vok'>✓ Accepted</span> (" + res[1] + ")." + (cur.v === "range" ? " <span class='ln-muted'>Validation only checks the data is <i>reasonable</i>: typing 25 as 52 would also pass.</span>" : "") : "<span class='vbad'>✗ Rejected</span> (" + res[1] + "). The program would ask again."; }
    box.appendChild(tabsFor(box, Object.keys(R).map(function(k){ return [k, R[k][0].replace(" check", "")]; }), cur, function(){ inp.value = R[cur.v][2]; draw(); }));
    inp.value = R.range[2]; inp.addEventListener("input", draw); box.appendChild(rule); box.appendChild(row(el("label", null, "Type data "), inp)); box.appendChild(out); draw();
  });

  /* ---------- 7.7 / 7.4a / 8.1.4c trace tables ---------- */
  var TR = {
    total: { title: "Totalling in a WHILE loop", code: ["Total ← 0", "Count ← 1", "WHILE Count <= 4 DO", "   Total ← Total + Count * 2", "   Count ← Count + 1", "ENDWHILE", "OUTPUT Total"], cols: ["Total", "Count", "Count <= 4?", "OUTPUT"], gen: function(){ var r = [], T = 0, C = 1; r.push([1, { Total: 0 }, 1]); r.push([2, { Count: 1 }]); while(true){ var c = C <= 4; r.push([3, { "Count <= 4?": c ? "yes" : "no" }]); if(!c) break; T += C * 2; r.push([4, { Total: T }, 1]); C++; r.push([5, { Count: C }]); } r.push([7, { OUTPUT: T }]); return r; } },
    count: { title: "Totalling and counting in a FOR loop (inputs 4, 7, 2)", code: ["Total ← 0", "Count ← 0", "FOR Index ← 1 TO 3", "   INPUT Number", "   Total ← Total + Number", "   IF Number > 5 THEN Count ← Count + 1", "NEXT Index", "OUTPUT Total, Count"], cols: ["Index", "Number", "Total", "Count", "OUTPUT"], gen: function(){ var r = [], T = 0, C = 0; r.push([1, { Total: 0 }, 1]); r.push([2, { Count: 0 }]); [4, 7, 2].forEach(function(n, i){ r.push([3, { Index: i + 1 }, 1]); r.push([4, { Number: n }]); T += n; r.push([5, { Total: T }]); if(n > 5){ C++; r.push([6, { Count: C }]); } else r.push([6, {}]); }); r.push([8, { OUTPUT: T + ", " + C }]); return r; } },
    whilel: { title: "WHILE loop (pre-condition)", code: ["Number ← 30", "WHILE Number > 9 DO", "   Number ← Number - 9", "ENDWHILE", "OUTPUT Number"], cols: ["Number", "Number > 9?", "OUTPUT"], gen: function(){ var r = [], N = 30; r.push([1, { Number: 30 }, 1]); while(true){ var c = N > 9; r.push([2, { "Number > 9?": c ? "yes" : "no, stop" }]); if(!c) break; N -= 9; r.push([3, { Number: N }, 1]); } r.push([5, { OUTPUT: N }]); return r; } },
    forl: { title: "FOR loop (count-controlled)", code: ["Total ← 0", "FOR Index ← 1 TO 5", "   Total ← Total + Index", "NEXT Index", "OUTPUT Total"], cols: ["Index", "Total", "OUTPUT"], gen: function(){ var r = [], T = 0; r.push([1, { Total: 0 }, 1]); for(var i = 1; i <= 5; i++){ r.push([2, { Index: i }, 1]); T += i; r.push([3, { Total: T }]); } r.push([5, { OUTPUT: T }]); return r; } },
    repeat: { title: "REPEAT UNTIL loop (post-condition)", code: ["Number ← 1", "REPEAT", "   Number ← Number * 2", "   OUTPUT Number", "UNTIL Number >= 20"], cols: ["Number", "Number >= 20?", "OUTPUT"], gen: function(){ var r = [], N = 1; r.push([1, { Number: 1 }, 1]); while(true){ N *= 2; r.push([3, { Number: N }, 1]); r.push([4, { OUTPUT: N }]); var c = N >= 20; r.push([5, { "Number >= 20?": c ? "yes, stop" : "no, repeat" }]); if(c) break; } return r; } }
  };
  V.reg("trace", function(box, o){
    var T = TR[o.p || "total"], steps = T.gen(), rows, cur, view = el("div"), lg = el("div", "vlog"), pl;
    function show(i){
      var r = steps[i], last = null, k, key;
      rows = [];
      for(k = 0; k <= i; k++){
        var ch = steps[k][1], keys = Object.keys(ch); if(!keys.length) continue;
        var cur_ = rows[rows.length - 1];
        if(!cur_ || steps[k][2] || keys.some(function(x){ return cur_.v[x] !== undefined; })){ cur_ = { v: {}, w: [] }; rows.push(cur_); }
        keys.forEach(function(x){ cur_.v[x] = ch[x]; });
        if(k === i) cur_.w = keys;
      }
      var h = '<div class="vtwo"><div><pre class="ln-pre" style="margin:0;white-space:pre-wrap">' + T.code.map(function(l, k){ return '<span style="display:block;' + (k + 1 === r[0] ? "background:var(--accent-tint);font-weight:700" : "") + '">' + esc(l) + "</span>"; }).join("") + "</pre></div><div>" + V.table(T.cols, rows.map(function(x){ return T.cols.map(function(c){ return { t: x.v[c] === undefined ? "" : esc(String(x.v[c])), c: x.w.indexOf(c) >= 0 ? "hi" : "" }; }); })) + "</div></div>";
      view.innerHTML = h; lg.innerHTML = "Line " + r[0] + ": " + (Object.keys(r[1]).length ? "a new value is written in the trace table." : "no variable changes, so nothing is written.");
    }
    function build(){ if(pl) pl.remove(); rows = []; pl = V.player(box, { count: function(){ return steps.length; }, show: show, reset: function(){ rows = []; view.innerHTML = '<div class="vtwo"><div><pre class="ln-pre" style="margin:0;white-space:pre-wrap">' + T.code.map(function(l){ return '<span style="display:block">' + esc(l) + "</span>"; }).join("") + "</pre></div><div>" + V.table(T.cols, []) + "</div></div>"; lg.innerHTML = "<b>" + T.title + ".</b> Press <b>Step</b> to do a dry run one line at a time. Only write a value when it changes or is output."; }, ms: 1100 }); box.insertBefore(pl, view); }
    box.appendChild(view); box.appendChild(lg); build();
  });

  /* ---------- 8.1.2 data types ---------- */
  V.reg("dtype", function(box){
    var inp = el("input", "vin mono"), out = el("div", "vres");
    inp.value = "07123456789"; inp.style.width = "200px"; inp.setAttribute("aria-label", "Data value");
    function draw(){
      var s = inp.value, t = [];
      if(/^-?\d+$/.test(s)) t.push("INTEGER (a whole number)"); if(/^-?\d+\.\d+$/.test(s)) t.push("REAL (has a fractional part)"); if(/^'.'$/.test(s)) t.push("CHAR (one character in single quotes)"); if(/^".*"$/.test(s)) t.push("STRING (characters in double quotes)"); if(/^(TRUE|FALSE)$/.test(s)) t.push("BOOLEAN (only TRUE or FALSE)");
      var note = /^0\d{5,}$/.test(s) ? "<br><span class='vwarn'>A phone number should be stored as a STRING: it has a leading zero and you never calculate with it.</span>" : "";
      out.innerHTML = t.length ? "<b>" + t.join(" or ") + "</b>" + note + (/^-?\d+$/.test(s) ? "<br><span class='ln-muted'>If you will not calculate with it, a STRING (put quotes round it) is better.</span>" : "") : "<span class='vbad'>Not recognised.</span> Strings need double quotes (\"Hello\"), chars need single quotes ('x'), reals need a digit each side of the point (0.5).";
    }
    inp.addEventListener("input", draw); box.appendChild(el("p", null, "Type a value to see its data type. Try 5, -3, 4.7, 'x', \"Hello\", TRUE and 07123456789.")); box.appendChild(row(inp)); box.appendChild(out); draw();
  });

  /* ---------- 8.1.7 library routines ---------- */
  V.reg("libr", function(box){
    var a = el("input", "vin mono"), b = el("input", "vin mono"), out = el("div", "vres");
    a.type = b.type = "number"; a.value = 472; b.value = 10; a.style.width = b.style.width = "90px"; a.setAttribute("aria-label", "a"); b.setAttribute("aria-label", "b");
    function draw(){
      var x = +a.value, y = +b.value; if(!y){ out.innerHTML = "<span class='vbad'>b cannot be 0.</span>"; return; }
      var d = Math.trunc(x / y), m = x - d * y;
      out.innerHTML = x + " ÷ " + y + " = " + d + " remainder " + m + "<br><b>DIV(" + x + ", " + y + ") = " + d + "</b> (the whole-number part)<br><b>MOD(" + x + ", " + y + ") = " + m + "</b> (the remainder)<br>" + (y === 10 ? "<span class='ln-muted'>With 10: DIV removes the last digit and MOD gives the last digit.</span><br>" : "") + (y === 2 ? "<span class='ln-muted'>MOD(N, 2) = " + m + ", so " + x + " is " + (m ? "odd" : "even") + ".</span><br>" : "") + "<b>ROUND(" + (x / y) + ", 1) = " + (Math.round(x / y * 10) / 10) + "</b>";
    }
    a.addEventListener("input", draw); b.addEventListener("input", draw); box.appendChild(el("p", null, "Choose two whole numbers (try 472 and 10, then 17 and 2).")); box.appendChild(row(el("label", null, "a "), a, el("label", null, "b "), b)); box.appendChild(out); draw();
  });

  /* ---------- 8.2 arrays ---------- */
  V.reg("arrays", function(box, o){
    var kind = o.kind || "1d", view = el("div"), lg = el("div", "vlog"), pl;
    if(kind === "1d"){
      var arr = ["Asha", "Ben", "Chen", "Dina", "Eli"], sel = 0;
      function draw1(){ view.innerHTML = '<div class="vcells">' + arr.map(function(v, i){ return '<button type="button" class="vcell ' + (i === sel ? "hi" : "") + '" data-i="' + i + '" style="cursor:pointer;font:inherit;font-weight:700;min-width:64px">' + v + "<small>index " + (i + 1) + "</small></button>"; }).join("") + "</div>"; lg.innerHTML = "<b>Names[" + (sel + 1) + "]</b> holds <b>" + arr[sel] + "</b>. An array stores many values of the same type under one name; the <b>index</b> picks one item. A FOR loop with Index from 1 to 5 can read every item."; Array.prototype.forEach.call(view.querySelectorAll("button"), function(b){ b.addEventListener("click", function(){ sel = +b.dataset.i; draw1(); }); }); }
      box.appendChild(el("p", null, "DECLARE Names : ARRAY[1:5] OF STRING. Click an item to read it.")); box.appendChild(view); box.appendChild(lg); draw1();
    } else {
      var N = 3, steps = [], r, c; for(r = 1; r <= N; r++) for(c = 1; c <= N; c++) steps.push([r, c]);
      function show(i){ var done = steps.slice(0, i + 1), cur_ = steps[i], h = '<div class="vtwo"><div><pre class="ln-pre" style="margin:0;white-space:pre-wrap">FOR Row ← 1 TO 3\n   FOR Column ← 1 TO 3\n      Table[Row, Column] ← Row * Column\n   NEXT Column\nNEXT Row</pre></div><div><table class="vt"><tr><th></th>' + [1, 2, 3].map(function(x){ return "<th>Col " + x + "</th>"; }).join("") + "</tr>";
        for(r = 1; r <= N; r++){ h += "<tr><th>Row " + r + "</th>"; for(c = 1; c <= N; c++){ var d = done.some(function(s){ return s[0] === r && s[1] === c; }); h += "<td class='" + (cur_[0] === r && cur_[1] === c ? "hi" : "") + "'>" + (d ? r * c : "") + "</td>"; } h += "</tr>"; }
        view.innerHTML = h + "</table></div></div>"; lg.innerHTML = "Row = <b>" + cur_[0] + "</b> (outer loop), Column = <b>" + cur_[1] + "</b> (inner loop): Table[" + cur_[0] + ", " + cur_[1] + "] ← " + cur_[0] + " × " + cur_[1] + " = <b>" + cur_[0] * cur_[1] + "</b>. The inner loop completes all its columns before the outer loop moves to the next row."; }
      pl = V.player(box, { count: function(){ return steps.length; }, show: show, reset: function(){ view.innerHTML = '<div class="ln-muted">A 2D array needs two indexes (row, column) and nested loops.</div>'; lg.innerHTML = "Press <b>Step</b> to fill the table."; }, ms: 900 });
      box.appendChild(pl); box.appendChild(view); box.appendChild(lg);
    }
  });

  /* ---------- 9.4 SQL query builder ---------- */
  V.reg("sql", function(box){
    var T = [["P1", "Asha", "Reds", 42, true], ["P2", "Ben", "Blues", 35, false], ["P3", "Chen", "Reds", 51, true], ["P4", "Dina", "Greens", 35, true], ["P5", "Eli", "Blues", 60, true]], F = ["ID", "Name", "Team", "Points", "Active"];
    var fieldSel = el("select", "vin"), aggSel = el("select", "vin"), wf = el("select", "vin"), wo = el("select", "vin"), wv = el("select", "vin"), lg = el("select", "vin"), ob = el("select", "vin"), odir = el("select", "vin"), out = el("div"), sqlBox = el("pre", "ln-pre");
    [["*", "all fields (*)"], ["Name", "Name"], ["Name, Points", "Name, Points"], ["Name, Team", "Name, Team"], ["ID, Name, Team, Points, Active", "every field listed"]].forEach(function(o){ var e = el("option", null, o[1]); e.value = o[0]; fieldSel.appendChild(e); });
    [["", "no function"], ["SUM(Points)", "SUM(Points)"], ["COUNT(ID)", "COUNT(ID)"]].forEach(function(o){ var e = el("option", null, o[1]); e.value = o[0]; aggSel.appendChild(e); });
    [["", "no WHERE"], ["Team = \"Reds\"", "Team = \"Reds\""], ["Points > 40", "Points > 40"], ["Active = TRUE", "Active = TRUE"], ["Team = \"Blues\"", "Team = \"Blues\""], ["Points = 35", "Points = 35"]].forEach(function(o){ var e = el("option", null, o[1]); e.value = o[0]; wf.appendChild(e); });
    [["", "—"], ["AND Active = TRUE", "AND Active = TRUE"], ["OR Team = \"Blues\"", "OR Team = \"Blues\""], ["AND Points > 40", "AND Points > 40"]].forEach(function(o){ var e = el("option", null, o[1]); e.value = o[0]; wo.appendChild(e); });
    [["", "no ORDER BY"], ["Points ASC", "Points ASC"], ["Points DESC", "Points DESC"], ["Name ASC", "Name ASC"]].forEach(function(o){ var e = el("option", null, o[1]); e.value = o[0]; ob.appendChild(e); });
    function test(cond, r){ var m = /^(\w+) (=|>) (.+)$/.exec(cond), f = F.indexOf(m[1]), v = m[3].replace(/"/g, ""), x = r[f]; if(typeof x === "boolean") v = v === "TRUE"; else if(typeof x === "number") v = +v; return m[2] === "=" ? x === v : x > v; }
    function draw(){
      var cond = wf.value, extra = wo.value, rows = T.slice(), sql = "SELECT " + (aggSel.value || fieldSel.value) + "\nFROM Players";
      if(!cond) extra = "";
      if(cond){ var c1 = cond, c2 = extra ? extra.replace(/^(AND|OR) /, "") : "", op = extra ? extra.split(" ")[0] : ""; rows = rows.filter(function(r){ var a = test(c1, r); if(!c2) return a; var b = test(c2, r); return op === "AND" ? a && b : a || b; }); sql += "\nWHERE " + cond + (extra ? " " + extra : ""); }
      if(ob.value && !aggSel.value){ var p = ob.value.split(" "), fi = F.indexOf(p[0]); rows.sort(function(a, b){ var r = a[fi] > b[fi] ? 1 : a[fi] < b[fi] ? -1 : 0; return p[1] === "DESC" ? -r : r; }); sql += "\nORDER BY " + ob.value; }
      sqlBox.textContent = sql;
      if(aggSel.value){ var v = aggSel.value.indexOf("SUM") === 0 ? rows.reduce(function(s, r){ return s + r[3]; }, 0) : rows.length; out.innerHTML = V.table([esc(aggSel.value)], [[{ t: v, c: "hi" }]]); return; }
      var cols = fieldSel.value === "*" ? F : fieldSel.value.split(", "); out.innerHTML = V.table(cols, rows.map(function(r){ return cols.map(function(c){ var x = r[F.indexOf(c)]; return typeof x === "boolean" ? (x ? "TRUE" : "FALSE") : x; }); }));
    }
    [fieldSel, aggSel, wf, wo, ob].forEach(function(s){ s.addEventListener("change", draw); });
    var tbl = V.table(F, T.map(function(r){ return r.map(function(x){ return typeof x === "boolean" ? (x ? "TRUE" : "FALSE") : x; }); }));
    box.appendChild(el("p", null, "This is the <b>Players</b> table. Build a query with the menus and see the SQL and the records it returns.")); box.appendChild(el("div", null, tbl));
    box.appendChild(row(el("label", null, "SELECT "), fieldSel, el("label", null, "or a function "), aggSel)); box.appendChild(row(el("label", null, "WHERE "), wf, wo, el("label", null, "ORDER BY "), ob)); box.appendChild(sqlBox); box.appendChild(out); draw();
  });

  /* ---------- 10 logic gates ---------- */
  var GS = { NOT: "NOT", AND: "AND", OR: "OR", NAND: "NAND", NOR: "NOR", XOR: "XOR" };
  function gf(g, a, b){ switch(g){ case "NOT": return a ? 0 : 1; case "AND": return a & b; case "OR": return a | b; case "NAND": return (a & b) ? 0 : 1; case "NOR": return (a | b) ? 0 : 1; case "XOR": return a ^ b; } }
  // draws a gate symbol with its left edge at x and vertical centre at y; returns svg markup (width 60, height 40)
  function sym(g, x, y, on){
    var s = 'fill="var(--surface)" stroke="var(--ink)" stroke-width="2"', h = "", bub = g === "NAND" || g === "NOR" || g === "NOT";
    var X = x, Y = y - 20;
    if(g === "AND" || g === "NAND") h = '<path ' + s + ' d="M' + X + " " + Y + " H" + (X + 28) + " A20 20 0 0 1 " + (X + 28) + " " + (Y + 40) + " H" + X + ' Z"/>';
    else if(g === "OR" || g === "NOR" || g === "XOR") h = '<path ' + s + ' d="M' + X + " " + Y + " Q" + (X + 32) + " " + Y + " " + (X + 52) + " " + (Y + 20) + " Q" + (X + 32) + " " + (Y + 40) + " " + X + " " + (Y + 40) + " Q" + (X + 14) + " " + (Y + 20) + " " + X + " " + Y + ' Z"/>' + (g === "XOR" ? '<path fill="none" stroke="var(--ink)" stroke-width="2" d="M' + (X - 7) + " " + Y + " Q" + (X + 7) + " " + (Y + 20) + " " + (X - 7) + " " + (Y + 40) + '"/>' : "");
    else h = '<path ' + s + ' d="M' + X + " " + Y + " L" + (X + 46) + " " + (Y + 20) + " L" + X + " " + (Y + 40) + ' Z"/>';
    var tip = g === "NOT" ? 46 : (g === "AND" || g === "NAND" ? 48 : 52);
    if(bub){ h += '<circle cx="' + (X + tip + 4) + '" cy="' + y + '" r="4" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/>'; tip += 8; }
    h += '<text class="mid sm mu" x="' + (X + 22) + '" y="' + (y + 4) + '" opacity=".0">' + g + "</text>";
    return { svg: h, out: X + tip };
  }
  V.reg("gate", function(box, o){
    var g = o.g || "AND", A = 0, B = 0, view = el("div"), tbl = el("div"), cur = { v: g }, sw = function(n){ var s = el("span", "vsw"), b = el("button", "", "0"); b.type = "button"; b.addEventListener("click", function(){ if(n === "A") A ^= 1; else B ^= 1; b.textContent = n === "A" ? A : B; b.className = (n === "A" ? A : B) ? "one" : ""; draw(); }); s.appendChild(document.createTextNode("Input " + n + " ")); s.appendChild(b); return s; };
    function draw(){
      var two = cur.v !== "NOT", q = gf(cur.v, A, B), s = sym(cur.v, 150, 80), col = function(v){ return v ? "var(--correct)" : "var(--muted)"; };
      var h = two ? '<line stroke="' + col(A) + '" stroke-width="3" x1="40" y1="64" x2="150" y2="64"/><line stroke="' + col(B) + '" stroke-width="3" x1="40" y1="96" x2="150" y2="96"/><text class="b" x="14" y="68">A ' + A + '</text><text class="b" x="14" y="100">B ' + B + "</text>" : '<line stroke="' + col(A) + '" stroke-width="3" x1="40" y1="80" x2="150" y2="80"/><text class="b" x="14" y="84">A ' + A + "</text>";
      h += s.svg + '<line stroke="' + col(q) + '" stroke-width="3" x1="' + s.out + '" y1="80" x2="360" y2="80"/><circle cx="372" cy="80" r="13" fill="' + (q ? "var(--correct)" : "var(--surface)") + '" stroke="var(--ink)" stroke-width="2"/><text class="b mid" x="372" y="85" style="fill:' + (q ? "var(--on-accent)" : "var(--ink)") + '">' + q + '</text><text class="sm mid mu" x="372" y="110">X</text><text class="b mid" x="' + (150 + 26) + '" y="30">' + cur.v + " gate</text>";
      view.innerHTML = ""; view.appendChild(svg(420, 130, h));
      var rows = two ? [[0, 0], [0, 1], [1, 0], [1, 1]].map(function(p){ var cl = p[0] === A && p[1] === B ? "hi" : ""; return [{ t: p[0], c: cl }, { t: p[1], c: cl }, { t: gf(cur.v, p[0], p[1]), c: cl }]; }) : [[0], [1]].map(function(p){ var cl = p[0] === A ? "hi" : ""; return [{ t: p[0], c: cl }, { t: gf("NOT", p[0]), c: cl }]; });
      tbl.innerHTML = V.table(two ? ["A", "B", "X"] : ["A", "X"], rows);
    }
    var t = tabsFor(box, Object.keys(GS).map(function(k){ return [k, k]; }), cur, draw);
    box.appendChild(t); box.appendChild(row(sw("A"), sw("B"))); box.appendChild(view); box.appendChild(tbl); draw();
    box.appendChild(el("div", "vlog", "Memory trick: <b>AND</b> = both, <b>OR</b> = either (or both), <b>NOT</b> = flip, <b>NAND</b>/<b>NOR</b> = AND/OR then flip, <b>XOR</b> = the inputs are different."));
  });

  // circuits: nodes are inputs (A,B,C) or gates {g, in:[...]}; the last gate is the output X
  var CIRC = {
    c1: { text: "X = A AND (NOT B)", gates: [{ id: "n1", g: "NOT", in: ["B"] }, { id: "X", g: "AND", in: ["A", "n1"] }], ins: ["A", "B"] },
    c2: { text: "X = (A AND B) OR C", gates: [{ id: "g1", g: "AND", in: ["A", "B"] }, { id: "X", g: "OR", in: ["g1", "C"] }], ins: ["A", "B", "C"] },
    c3: { text: "X = (A OR B) AND (NOT C)", gates: [{ id: "g1", g: "OR", in: ["A", "B"] }, { id: "n1", g: "NOT", in: ["C"] }, { id: "X", g: "AND", in: ["g1", "n1"] }], ins: ["A", "B", "C"] },
    c4: { text: "X = (A NAND B) XOR C", gates: [{ id: "g1", g: "NAND", in: ["A", "B"] }, { id: "X", g: "XOR", in: ["g1", "C"] }], ins: ["A", "B", "C"] }
  };
  V.reg("circ", function(box, o){
    var cur = { v: o.c || "c2" }, vals = { A: 0, B: 0, C: 0 }, view = el("div"), tbl = el("div"), sws = row();
    function evalC(C, v){ var node = {}; C.ins.forEach(function(k){ node[k] = v[k]; }); C.gates.forEach(function(g){ node[g.id] = gf(g.g, node[g.in[0]], g.in.length > 1 ? node[g.in[1]] : 0); }); return node; }
    function draw(){
      var C = CIRC[cur.v], node = evalC(C, vals), col = function(v){ return v ? "var(--correct)" : "var(--muted)"; }, h = "", pos = {}, W = 540;
      var inY = {}; C.ins.forEach(function(k, i){ inY[k] = 30 + i * 52; pos[k] = [30, inY[k]]; });
      var lvl = {}; C.gates.forEach(function(g){ lvl[g.id] = 1 + Math.max.apply(null, g.in.map(function(n){ return lvl[n] || 0; })); });
      var maxL = Math.max.apply(null, Object.keys(lvl).map(function(k){ return lvl[k]; })), byL = {};
      C.gates.forEach(function(g){ (byL[lvl[g.id]] = byL[lvl[g.id]] || []).push(g); });
      var outs = {}; C.ins.forEach(function(k){ outs[k] = [60, inY[k]]; h += '<text class="b" x="8" y="' + (inY[k] + 4) + '">' + k + "</text>"; });
      Object.keys(byL).forEach(function(L){ byL[L].forEach(function(g, i){ var gx = 110 + (L - 1) * 150, gy = L == maxL ? 15 + (C.ins.length * 52) / 2 : 30 + i * 70 + (g.in.length === 1 ? 10 : 0); if(L == maxL) gy = 15 + (C.ins.length - 1) * 26 + 15; var s = sym(g.g, gx, gy);
        g.in.forEach(function(n, k){ var o_ = outs[n], iy = g.in.length === 1 ? gy : gy - 10 + k * 20; h += '<polyline fill="none" stroke="' + col(node[n]) + '" stroke-width="2.5" points="' + o_[0] + "," + o_[1] + " " + ((o_[0] + gx) / 2) + "," + o_[1] + " " + ((o_[0] + gx) / 2) + "," + iy + " " + gx + "," + iy + '"/>'; });
        h += s.svg + '<text class="sm mid mu" x="' + (gx + 24) + '" y="' + (gy - 26) + '">' + g.g + "</text>"; outs[g.id] = [s.out, gy]; }); });
      var xo = outs.X; h += '<line stroke="' + col(node.X) + '" stroke-width="2.5" x1="' + xo[0] + '" y1="' + xo[1] + '" x2="' + (xo[0] + 40) + '" y2="' + xo[1] + '"/><circle cx="' + (xo[0] + 55) + '" cy="' + xo[1] + '" r="13" fill="' + (node.X ? "var(--correct)" : "var(--surface)") + '" stroke="var(--ink)" stroke-width="2"/><text class="b mid" x="' + (xo[0] + 55) + '" y="' + (xo[1] + 5) + '" style="fill:' + (node.X ? "var(--on-accent)" : "var(--ink)") + '">' + node.X + '</text><text class="mid sm mu" x="' + (xo[0] + 55) + '" y="' + (xo[1] + 28) + '">X</text>';
      view.innerHTML = ""; view.appendChild(svg(W, 54 + C.ins.length * 52, '<g transform="translate(0,22)">' + h + "</g>"));
      var combos = [], n = C.ins.length, i; for(i = 0; i < Math.pow(2, n); i++){ var v = {}; C.ins.forEach(function(k, j){ v[k] = (i >> (n - 1 - j)) & 1; }); combos.push(v); }
      tbl.innerHTML = V.table(C.ins.concat(["X"]), combos.map(function(v){ var cl = C.ins.every(function(k){ return v[k] === vals[k]; }) ? "hi" : "", r = C.ins.map(function(k){ return { t: v[k], c: cl }; }); r.push({ t: evalC(C, v).X, c: cl || "" }); return r; }));
      sws.innerHTML = ""; C.ins.forEach(function(k){ var s = el("span", "vsw"), b = el("button", vals[k] ? "one" : "", String(vals[k])); b.type = "button"; b.addEventListener("click", function(){ vals[k] ^= 1; draw(); }); s.appendChild(document.createTextNode(k + " ")); s.appendChild(b); sws.appendChild(s); });
    }
    box.appendChild(tabsFor(box, Object.keys(CIRC).map(function(k){ return [k, CIRC[k].text]; }), cur, draw)); box.appendChild(sws); box.appendChild(view); box.appendChild(tbl);
    box.appendChild(el("div", "vlog", "Work out the brackets first: each operator in the expression is one gate. Flip the inputs and watch the signal pass through each gate; the highlighted row of the truth table shows the current inputs."));
    draw();
  });
})(typeof window !== "undefined" ? window : this);
