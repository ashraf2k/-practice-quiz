/* A Level iLearn visuals, part 9: quantum cryptography (quantum key distribution, 9618 topic 17.1).
   A simplified, original BB84-style simulation that follows the five steps in the syllabus: photons, polarising filters,
   beam splitters, comparing the filters in public, and detecting an eavesdropper. */
(function(root){
  "use strict";
  var V = root.ILEARN_VIZ, el = V.el, btn = V.btn, row = V.row, esc = V.esc;
  var N = 12;                                  // photons per run
  var FIL = ["+", "×"];                   // filter / beam splitter type: + (vertical/horizontal) or x (diagonal)
  // polarisation: filter 0 (+): bit 1 = vertical, bit 0 = horizontal; filter 1 (x): bit 1 = 45 degrees right, bit 0 = 45 degrees left
  var ANG = [[0, 90], [135, 45]];              // ANG[filter][bit] in degrees (0 = horizontal, anticlockwise)
  var GLYPH = [["─", "│"], ["╲", "╱"]];
  var NAME = [["horizontal", "vertical"], ["45° left", "45° right"]];

  function makeRng(seed){ var s = seed >>> 0 || 1; return function(){ s = (s + 0x6D2B79F5) >>> 0; var t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  // Measuring a photon with a splitter of the same type gives the true bit; with the other type the result is random and the photon is changed.
  function measure(ph, f, rnd){ return f === ph.f ? ph.b : (rnd() < 0.5 ? 1 : 0); }

  function simulate(seed, eve){
    var rnd = makeRng(seed), rows = [], i;
    for(i = 0; i < N; i++){
      var b = rnd() < 0.5 ? 1 : 0, sf = rnd() < 0.5 ? 1 : 0, ph = { f: sf, b: b }, r = { bit: b, sf: sf, ph0: ph };
      if(eve){ var ef = rnd() < 0.5 ? 1 : 0, eb = measure(ph, ef, rnd); r.ef = ef; r.eb = eb; ph = { f: ef, b: eb }; }   // Eve measures, then re-sends what she found
      r.ph1 = ph;
      var rf = rnd() < 0.5 ? 1 : 0; r.rf = rf; r.rb = measure(ph, rf, rnd);
      r.match = rf === sf; rows.push(r);
    }
    var kept = rows.map(function(r, k){ return r.match ? k : -1; }).filter(function(k){ return k >= 0; });
    var sample = kept.filter(function(k, j){ return j % 2 === 0; });          // every other kept bit is compared in public (and then discarded)
    var bad = sample.filter(function(k){ return rows[k].bit !== rows[k].rb; });
    return { rows: rows, kept: kept, sample: sample, key: kept.filter(function(k){ return sample.indexOf(k) < 0; }), bad: bad };
  }
  // Pick a run that teaches well: at least 4 kept bits, and (when Eve is listening) at least one mismatch in the compared sample.
  function goodRun(eve){
    var base = Math.floor(Math.random() * 1e6) + 1, t, sim;
    for(t = 0; t < 400; t++){ sim = simulate(base + t, eve); if(sim.kept.length >= 7 && sim.kept.length <= 10 && (!eve || sim.bad.length >= 1) && (eve || sim.bad.length === 0)) return sim; }
    return sim;
  }

  V.reg("qkd", function(box){
    var eve = false, sim = goodRun(false), view = el("div"), cap = el("div", "vlog"), pl, bEve, bNew, anim = 0;
    var W = 700, H = 150, X0 = 90, X1 = 610, XE = 350;
    function pol(ang, x, y, col){ var r = 15, rad = ang * Math.PI / 180; return '<line x1="' + (x - r * Math.cos(rad)).toFixed(1) + '" y1="' + (y + r * Math.sin(rad)).toFixed(1) + '" x2="' + (x + r * Math.cos(rad)).toFixed(1) + '" y2="' + (y - r * Math.sin(rad)).toFixed(1) + '" stroke="' + col + '" stroke-width="4" stroke-linecap="round"/>'; }
    function scene(t, i){   // t in 0..1 = how far the current photon has travelled; i = photon index (or -1 for none)
      var r = i >= 0 && i < N ? sim.rows[i] : null, s = '';
      s += '<rect class="ac" x="12" y="38" width="130" height="74" rx="10"/><text class="b mid" x="77" y="58">Sender</text>' +
        '<rect class="ac" x="558" y="38" width="130" height="74" rx="10"/><text class="b mid" x="623" y="58">Receiver</text>' +
        '<line class="wr hi" x1="142" y1="75" x2="558" y2="75"/><text class="mu sm mid" x="350" y="132">fibre optic cable</text>';
      if(eve) s += '<rect class="no" x="' + (XE - 52) + '" y="14" width="104" height="38" rx="9"/><text class="b mid" x="' + XE + '" y="38">Eve (spy)</text><line class="wr dash" x1="' + XE + '" y1="52" x2="' + XE + '" y2="75"/>';
      if(r){
        s += '<text class="mid sm" x="77" y="78">bit ' + r.bit + ' • filter ' + FIL[r.sf] + '</text>' +
          '<text class="mid sm" x="623" y="78">splitter ' + FIL[r.rf] + '</text>';
        var ph = (eve && t >= 0.5) ? r.ph1 : r.ph0, x = X0 + 52 + (X1 - 52 - X0 - 52) * t;
        s += '<circle cx="' + x.toFixed(1) + '" cy="75" r="19" fill="var(--diff-moderate-bg)" stroke="var(--diff-moderate)" stroke-width="2"/>' + pol(ANG[ph.f][ph.b], x, 75, "var(--ink)");
        if(t >= 1) s += '<text class="b mid" x="623" y="102" style="font-size:15px">reads ' + r.rb + (r.match ? '' : ' (guess)') + '</text>';
      }
      return V.svg(W, H, s);
    }
    function paint(t, i){ var s = scene(t, i); var old = view.querySelector(".vsvg"); if(old) old.replaceWith(s); else view.insertBefore(s, view.firstChild); }
    function table(i){   // i = current step
      var vis = Math.min(i + 1, N), showMatch = i >= N, showKey = i >= N + 1, showCheck = i >= N + 2, k;
      function rowOf(label, fn, cls){ var h = '<tr><th style="text-align:left;white-space:nowrap">' + label + '</th>'; for(k = 0; k < N; k++) h += k < vis ? fn(sim.rows[k], k) : '<td>&nbsp;</td>'; return h + '</tr>'; }
      var h = '<div class="vscroll"><table class="vt" style="font-size:13px"><tr><th></th>' + Array.apply(null, Array(N)).map(function(_, j){ return '<th>' + (j + 1) + '</th>'; }).join("") + '</tr>';
      h += rowOf("Sender’s bit", function(r){ return '<td>' + r.bit + '</td>'; });
      h += rowOf("Sender’s filter", function(r){ return '<td>' + FIL[r.sf] + '</td>'; });
      h += rowOf("Photon sent", function(r){ return '<td title="' + NAME[r.sf][r.bit] + '" style="font-size:17px">' + GLYPH[r.sf][r.bit] + '</td>'; });
      if(eve) h += rowOf("Eve measures with", function(r){ return '<td class="no">' + FIL[r.ef] + '</td>'; });
      h += rowOf("Receiver’s splitter", function(r){ return '<td>' + FIL[r.rf] + '</td>'; });
      h += rowOf("Receiver reads", function(r){ return '<td>' + r.rb + '</td>'; });
      h += rowOf("Same filter type?", function(r){ return showMatch ? (r.match ? '<td class="ok">✔</td>' : '<td class="no">✘</td>') : '<td>&nbsp;</td>'; });
      h += rowOf("Key bit kept", function(r, j){ return showKey ? (r.match ? '<td class="hi">' + r.rb + '</td>' : '<td>–</td>') : '<td>&nbsp;</td>'; });
      if(showCheck) h += rowOf("Compared in public", function(r, j){ var s = sim.sample.indexOf(j) >= 0; return s ? (r.bit === r.rb ? '<td class="ok">same</td>' : '<td class="no">differ</td>') : '<td>&nbsp;</td>'; });
      return h + '</table></div>';
    }
    var tbl = el("div");
    function stepText(i){
      if(i < N){
        var r = sim.rows[i], t = "<b>Photon " + (i + 1) + ".</b> The sender picks a random bit (<b>" + r.bit + "</b>) and a random polarising filter (<b>" + FIL[r.sf] + "</b>), so the photon is polarised <b>" + NAME[r.sf][r.bit] + "</b>. ";
        if(eve) t += "<b>Eve</b> measures it with a " + FIL[r.ef] + " splitter" + (r.ef === r.sf ? " (the right type, so she learns the bit and sends an identical photon on)." : " (the wrong type: she gets a random answer and the photon’s state is <b>changed</b>).") + " ";
        t += "The receiver’s beam splitter is <b>" + FIL[r.rf] + "</b>: " + (r.match ? "the same type as the sender’s filter, so the reading is reliable" : "a different type, so the reading is only a guess") + ".";
        return t;
      }
      if(i === N) return "<b>Step 4.</b> The receiver tells the sender (openly) <b>which beam splitters were used</b>, not the bits. The sender replies which of them matched the filters. " + sim.kept.length + " of " + N + " photons matched.";
      if(i === N + 1) return "<b>Step 5.</b> Only the bits where the filters matched are kept: they form the shared <b>key</b>. The other bits are thrown away.";
      var bad = sim.bad.length;
      return "<b>Checking for an eavesdropper.</b> The two sides compare a sample of the key bits in public (" + sim.sample.length + " bits, then discarded). " +
        (bad ? "<span class='vbad'>" + bad + " bit" + (bad > 1 ? "s differ" : " differs") + ": measuring the photons changed them, so the eavesdropper is <b>detected</b>. The key is discarded and a new one is requested.</span>"
             : "<span class='vok'>All the compared bits agree, so no eavesdropper was detected. The remaining " + sim.key.length + " bits (" + sim.key.map(function(k){ return sim.rows[k].rb; }).join("") + ") become the secret key.</span>");
    }
    function show(i){
      cancelAnimationFrame(anim); tbl.innerHTML = table(i); cap.innerHTML = stepText(i);
      if(i < N){
        var t0 = null, dur = 1100;
        (function f(ts){ if(!view.isConnected) return; if(t0 === null) t0 = ts; var t = Math.min(1, (ts - t0) / dur); paint(t, i); if(t < 1) anim = requestAnimationFrame(f); })(performance.now());
      }else paint(0, -1);
    }
    function reset(){ cancelAnimationFrame(anim); tbl.innerHTML = table(-1); cap.innerHTML = "Press <b>Play</b> or <b>Step</b> to send " + N + " photons from the sender to the receiver."; paint(0, -1); }
    pl = V.player(box, { count: function(){ return N + 3; }, show: show, reset: reset, ms: 2300 });
    bEve = btn("", function(){ eve = !eve; bEve.textContent = eve ? "🕵️ Eve is listening: turn her off" : "🕵️ Add an eavesdropper (Eve)"; bEve.classList.toggle("on", eve); restart(); });
    bEve.textContent = "🕵️ Add an eavesdropper (Eve)";
    bNew = btn("🎲 New random run", function(){ restart(); });
    function restart(){ pl.querySelectorAll("button")[2].click(); sim = goodRun(eve); reset(); }   // the Reset button halts any playing animation and returns to step 0
    box.appendChild(el("p", null, "<b>Quantum key distribution (QKD)</b> shares an encryption key using single photons. Watch twelve photons travel along the cable, then add a spy and see how she is caught."));
    box.appendChild(pl); box.appendChild(row(bEve, bNew)); box.appendChild(view); box.appendChild(cap); box.appendChild(tbl);
    reset();
  });
})(typeof window !== "undefined" ? window : this);
