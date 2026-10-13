/* iLearn mini-games: small data-driven puzzles. ILGames.play(host, spec, done) renders one.
   done({stars, mistakes}) is called when the player finishes.
   Spec types: sort, order, match, bits, gate, scramble, bug, rows, tf */
(function(root){
  "use strict";
  var doc = root.document;

  function esc(x){ return String(x == null ? "" : x).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function shuffle(a){ a = a.slice(); for(var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function el(tag, cls, html){ var e = doc.createElement(tag); if(cls) e.className = cls; if(html != null) e.innerHTML = html; return e; }
  function btn(label, cls, fn){ var b = el("button", cls || "gm-btn", label); b.type = "button"; if(fn) b.addEventListener("click", fn); return b; }
  function flash(node, cls){ node.classList.add(cls); setTimeout(function(){ node.classList.remove(cls); }, 450); }

  /* ---- logic expression evaluator (for the gate puzzle, and for the data lint) ---- */
  function evalExpr(expr, vals){
    var toks = expr.replace(/\(/g, " ( ").replace(/\)/g, " ) ").trim().split(/\s+/), i = 0;
    function peek(){ return toks[i]; }
    function next(){ return toks[i++]; }
    function prim(){
      var t = next();
      if(t === "NOT") return prim() ? 0 : 1;
      if(t === "("){ var v = or(); next(); return v; }
      if(vals.hasOwnProperty(t)) return vals[t] ? 1 : 0;
      throw new Error("bad token " + t);
    }
    function bin(sub, ops){
      var l = sub();
      while(ops.indexOf(peek()) !== -1){
        var op = next(), r = sub();
        l = op === "AND" ? (l & r) : op === "NAND" ? ((l & r) ? 0 : 1) : op === "OR" ? (l | r) : op === "NOR" ? ((l | r) ? 0 : 1) : (l ^ r);
      }
      return l;
    }
    function and(){ return bin(prim, ["AND", "NAND"]); }
    function or(){ return bin(and, ["OR", "NOR", "XOR"]); }
    var v = or();
    if(i < toks.length) throw new Error("trailing tokens");
    return v;
  }

  /* ---- shared chrome: header, progress, result screen ---- */
  function shell(host, spec, total){
    host.innerHTML = "";
    var wrap = el("div", "gm");
    wrap.appendChild(el("div", "gm-title", "🎮 " + esc(spec.title || "Puzzle")));
    if(spec.prompt) wrap.appendChild(el("p", "gm-prompt", spec.prompt));
    var meta = el("div", "gm-meta"), prog = el("span", "gm-prog", ""), mist = el("span", "gm-mist", "");
    meta.appendChild(prog); meta.appendChild(mist); wrap.appendChild(meta);
    var stage = el("div", "gm-stage"); wrap.appendChild(stage);
    host.appendChild(wrap);
    var st = { mistakes: 0, step: 0, total: total };
    st.update = function(){ prog.textContent = Math.min(st.step, total) + " / " + total; mist.textContent = st.mistakes ? "Slips: " + st.mistakes : "No slips yet ✨"; };
    st.update();
    st.stage = stage; st.wrap = wrap;
    return st;
  }
  function starsFor(m){ return m === 0 ? 3 : m <= 2 ? 2 : 1; }
  function finish(st, done){
    var stars = starsFor(st.mistakes);
    st.stage.innerHTML = "";
    var r = el("div", "gm-result",
      '<div class="gm-confetti" aria-hidden="true">🎉 ✨ 🎊 ✨ 🎉</div><div class="gm-stars" aria-label="' + stars + ' stars">' + "⭐".repeat(stars) + '<span class="off">' + "⭐".repeat(3 - stars) + "</span></div><p><b>" +
      (stars === 3 ? "Perfect run!" : stars === 2 ? "Nicely done!" : "Puzzle solved!") + "</b> " + (st.mistakes ? st.mistakes + " slip" + (st.mistakes === 1 ? "" : "s") + ". Play again for 3 stars." : "No slips at all.") + "</p>");
    st.stage.appendChild(r);
    st.step = st.total; st.update();
    done({ stars: stars, mistakes: st.mistakes });
  }

  /* ---- 1. sort: put each item in the right bucket ---- */
  function sortGame(host, spec, done){
    var queue = shuffle(spec.items), st = shell(host, spec, spec.items.length);
    function show(){
      st.stage.innerHTML = "";
      if(!queue.length) return finish(st, done);
      var item = queue[0], card = el("div", "gm-card gm-big", esc(item[0]));
      st.stage.appendChild(card);
      var row = el("div", "gm-row");
      spec.cats.forEach(function(c, ci){
        row.appendChild(btn(esc(c), "gm-btn gm-cat", function(){
          if(item[1] === ci){ flash(card, "gm-ok"); queue.shift(); st.step++; st.update(); setTimeout(show, 280); }
          else { st.mistakes++; st.update(); flash(card, "gm-bad"); queue.push(queue.shift()); setTimeout(show, 480); }
        }));
      });
      st.stage.appendChild(row);
    }
    show();
  }

  /* ---- 2. order: tap the steps in the right order ---- */
  function orderGame(host, spec, done){
    var st = shell(host, spec, spec.steps.length), picked = 0;
    var list = el("ol", "gm-list"), pool = el("div", "gm-pool");
    st.stage.appendChild(list); st.stage.appendChild(pool);
    shuffle(spec.steps.map(function(s, i){ return [s, i]; })).forEach(function(p){
      var b = btn(esc(p[0]), "gm-btn gm-chip", function(){
        if(p[1] === picked){
          var li = el("li", "gm-ok", esc(p[0])); list.appendChild(li); b.remove(); picked++; st.step++; st.update();
          if(picked === spec.steps.length) setTimeout(function(){ finish(st, done); }, 350);
        } else { st.mistakes++; st.update(); flash(b, "gm-bad"); }
      });
      pool.appendChild(b);
    });
  }

  /* ---- 3. match: pair each term with its meaning ---- */
  function matchGame(host, spec, done){
    var st = shell(host, spec, spec.pairs.length), selL = null, left = el("div", "gm-col"), right = el("div", "gm-col"), cols = el("div", "gm-cols");
    cols.appendChild(left); cols.appendChild(right); st.stage.appendChild(cols);
    var lbtns = [];
    spec.pairs.forEach(function(p, i){
      var b = btn(esc(p[0]), "gm-btn gm-term", function(){
        if(b.disabled) return;
        lbtns.forEach(function(x){ x.classList.remove("sel"); }); selL = i; b.classList.add("sel");
      });
      lbtns.push(b); left.appendChild(b);
    });
    shuffle(spec.pairs.map(function(p, i){ return [p[1], i]; })).forEach(function(p){
      var b = btn(esc(p[0]), "gm-btn gm-def", function(){
        if(b.disabled) return;
        if(selL === null){ flash(b, "gm-bad"); return; }
        if(selL === p[1]){
          b.disabled = true; b.classList.add("gm-ok"); lbtns[selL].disabled = true; lbtns[selL].classList.remove("sel"); lbtns[selL].classList.add("gm-ok");
          selL = null; st.step++; st.update();
          if(st.step === spec.pairs.length) setTimeout(function(){ finish(st, done); }, 350);
        } else { st.mistakes++; st.update(); flash(b, "gm-bad"); }
      });
      right.appendChild(b);
    });
  }

  /* ---- 4. bits: flip bits to make a target number ---- */
  function bitsGame(host, spec, done){
    var n = spec.bits || 8, st = shell(host, spec, spec.targets.length), idx = 0;
    function round(){
      st.stage.innerHTML = "";
      var target = spec.targets[idx], vals = [], cur = 0;
      st.stage.appendChild(el("div", "gm-card gm-big", "Make <b>" + target + "</b>"));
      var cells = el("div", "gm-bits"), readout = el("div", "gm-readout", "Total: <b>0</b>");
      for(var k = 0; k < n; k++){
        (function(k){
          var pv = Math.pow(2, n - 1 - k), col = el("div", "gm-bitcol", '<span class="pv">' + pv + "</span>");
          var b = btn("0", "gm-btn gm-bit", function(){
            vals[k] = vals[k] ? 0 : 1; b.textContent = vals[k]; b.classList.toggle("on", !!vals[k]);
            cur = 0; vals.forEach(function(v, j){ if(v) cur += Math.pow(2, n - 1 - j); });
            readout.innerHTML = "Total: <b>" + cur + "</b>";
          });
          vals[k] = 0; col.appendChild(b); cells.appendChild(col);
        })(k);
      }
      st.stage.appendChild(cells); st.stage.appendChild(readout);
      var row = el("div", "gm-row");
      row.appendChild(btn("Check", "gm-btn gm-go", function(){
        if(cur === target){ st.step++; st.update(); idx++; if(idx >= spec.targets.length) finish(st, done); else round(); }
        else { st.mistakes++; st.update(); flash(readout, "gm-bad"); }
      }));
      st.stage.appendChild(row);
    }
    round();
  }

  /* ---- 5. gate: set the switches so the output matches the goal ---- */
  function gateGame(host, spec, done){
    var st = shell(host, spec, spec.rounds.length), idx = 0;
    function round(){
      st.stage.innerHTML = "";
      var r = spec.rounds[idx], vals = {};
      r.inputs.forEach(function(k){ vals[k] = 0; });
      st.stage.appendChild(el("div", "gm-card gm-big", "<code>X = " + esc(r.expr) + "</code><br><small>Make X = <b>" + r.out + "</b></small>"));
      var sw = el("div", "gm-row"), lamp = el("div", "gm-lamp", ""), fn = function(){ var o = evalExpr(r.expr, vals); lamp.textContent = "X = " + o; lamp.classList.toggle("on", !!o); };
      r.inputs.forEach(function(k){
        var b = btn(k + " = 0", "gm-btn gm-switch", function(){ vals[k] = vals[k] ? 0 : 1; b.textContent = k + " = " + vals[k]; b.classList.toggle("on", !!vals[k]); fn(); });
        sw.appendChild(b);
      });
      st.stage.appendChild(sw); st.stage.appendChild(lamp); fn();
      var row = el("div", "gm-row");
      row.appendChild(btn("Lock it in", "gm-btn gm-go", function(){
        if(evalExpr(r.expr, vals) === r.out){ st.step++; st.update(); idx++; if(idx >= spec.rounds.length) finish(st, done); else round(); }
        else { st.mistakes++; st.update(); flash(lamp, "gm-bad"); }
      }));
      st.stage.appendChild(row);
    }
    round();
  }

  /* ---- 6. scramble: unscramble the keyword ---- */
  function scrambleGame(host, spec, done){
    var st = shell(host, spec, spec.words.length), idx = 0;
    function round(){
      st.stage.innerHTML = "";
      var w = spec.words[idx][0].toUpperCase(), clue = spec.words[idx][1], typed = "", used = [];
      var letters = w.replace(/ /g, "").split(""), order;
      do { order = shuffle(letters.map(function(c, i){ return i; })); } while(letters.length > 2 && order.every(function(o, i){ return o === i; }));
      st.stage.appendChild(el("div", "gm-card", "<b>Clue:</b> " + esc(clue)));
      var slot = el("div", "gm-slot", ""), pool = el("div", "gm-pool");
      function paint(){
        var out = "", k = 0;
        for(var i = 0; i < w.length; i++){ out += w.charAt(i) === " " ? " &nbsp; " : "<i>" + (k < typed.length ? esc(typed.charAt(k++)) : "_") + "</i>"; }
        slot.innerHTML = out;
      }
      paint(); st.stage.appendChild(slot); st.stage.appendChild(pool);
      var chips = [];
      order.forEach(function(oi){
        var b = btn(esc(letters[oi]), "gm-btn gm-letter", function(){
          typed += letters[oi]; b.disabled = true; used.push(b); paint();
          if(typed.length === letters.length){
            if(typed === w.replace(/ /g, "")){ st.step++; st.update(); idx++; setTimeout(function(){ if(idx >= spec.words.length) finish(st, done); else round(); }, 350); }
            else { st.mistakes++; st.update(); flash(slot, "gm-bad"); typed = ""; used.forEach(function(x){ x.disabled = false; }); used = []; paint(); }
          }
        });
        chips.push(b); pool.appendChild(b);
      });
      var row = el("div", "gm-row");
      row.appendChild(btn("⌫ Undo", "gm-btn", function(){ if(!typed) return; typed = typed.slice(0, -1); var u = used.pop(); if(u) u.disabled = false; paint(); }));
      st.stage.appendChild(row);
    }
    round();
  }

  /* ---- 7. bug: tap the line that contains the error ---- */
  function bugGame(host, spec, done){
    var st = shell(host, spec, spec.rounds.length), idx = 0;
    function round(){
      st.stage.innerHTML = "";
      var r = spec.rounds[idx], locked = false;
      if(r.goal) st.stage.appendChild(el("p", "gm-prompt", esc(r.goal)));
      var code = el("div", "gm-code");
      r.lines.forEach(function(line, i){
        var b = btn("<span class='n'>" + (i + 1) + "</span><code>" + esc(line) + "</code>", "gm-btn gm-line", function(){
          if(locked) return;
          if(i === r.bug){
            locked = true; b.classList.add("gm-ok");
            st.stage.appendChild(el("div", "gm-why", "<b>Bug found!</b> " + esc(r.why)));
            st.step++; st.update();
            var go = btn(idx + 1 >= spec.rounds.length ? "Finish" : "Next bug →", "gm-btn gm-go", function(){ idx++; if(idx >= spec.rounds.length) finish(st, done); else round(); });
            st.stage.appendChild(go);
          } else { st.mistakes++; st.update(); flash(b, "gm-bad"); }
        });
        code.appendChild(b);
      });
      st.stage.appendChild(code);
    }
    round();
  }

  /* ---- 8. rows: tick the rows a query would return ---- */
  function rowsGame(host, spec, done){
    var st = shell(host, spec, spec.rounds.length), idx = 0;
    function round(){
      st.stage.innerHTML = "";
      var r = spec.rounds[idx], sel = {};
      st.stage.appendChild(el("pre", "gm-sql", esc(r.query)));
      var t = el("table", "gm-table"), head = "<tr><th></th>" + spec.columns.map(function(c){ return "<th>" + esc(c) + "</th>"; }).join("") + "</tr>";
      t.innerHTML = head;
      spec.rows.forEach(function(row, i){
        var tr = el("tr", "", "<td><input type='checkbox' aria-label='Row " + (i + 1) + "'></td>" + row.map(function(c){ return "<td>" + esc(c) + "</td>"; }).join(""));
        tr.querySelector("input").addEventListener("change", function(e){ sel[i] = e.target.checked; tr.classList.toggle("sel", e.target.checked); });
        t.appendChild(tr);
      });
      var wrap = el("div", "gm-tablewrap"); wrap.appendChild(t); st.stage.appendChild(wrap);
      st.stage.appendChild(el("p", "gm-hint", "Tick every row the query will output, then check."));
      var row = el("div", "gm-row");
      row.appendChild(btn("Check", "gm-btn gm-go", function(){
        var ok = spec.rows.every(function(x, i){ return !!sel[i] === (r.answer.indexOf(i) !== -1); });
        if(ok){ st.step++; st.update(); idx++; if(idx >= spec.rounds.length) finish(st, done); else round(); }
        else { st.mistakes++; st.update(); flash(wrap, "gm-bad"); }
      }));
      st.stage.appendChild(row);
    }
    round();
  }

  /* ---- 9. tf: fact or myth ---- */
  function tfGame(host, spec, done){
    var items = shuffle(spec.items), st = shell(host, spec, items.length), idx = 0;
    function round(){
      st.stage.innerHTML = "";
      var it = items[idx], card = el("div", "gm-card gm-big", esc(it[0])), row = el("div", "gm-row"), shown = false;
      st.stage.appendChild(card);
      [["✅ Fact", true], ["❌ Myth", false]].forEach(function(o){
        row.appendChild(btn(o[0], "gm-btn gm-cat", function(){
          if(shown) return; shown = true;
          var ok = it[1] === o[1];
          if(!ok){ st.mistakes++; st.update(); }
          flash(card, ok ? "gm-ok" : "gm-bad");
          st.stage.appendChild(el("div", ok ? "gm-why" : "gm-why bad", (ok ? "<b>Correct.</b> " : "<b>Not quite.</b> ") + esc(it[2] || "")));
          st.step++; st.update();
          st.stage.appendChild(btn(idx + 1 >= items.length ? "Finish" : "Next →", "gm-btn gm-go", function(){ idx++; if(idx >= items.length) finish(st, done); else round(); }));
        }));
      });
      st.stage.appendChild(row);
    }
    round();
  }

  var TYPES = { sort: sortGame, order: orderGame, match: matchGame, bits: bitsGame, gate: gateGame, scramble: scrambleGame, bug: bugGame, rows: rowsGame, tf: tfGame };

  function play(host, spec, done){
    var fn = TYPES[spec.type];
    if(!fn){ host.textContent = "Unknown puzzle type."; return; }
    injectCss(); fn(host, spec, done || function(){});
  }

  /* ---- data check used by the lint: returns a list of problems for a spec ---- */
  function validate(spec){
    var p = [];
    if(!TYPES[spec.type]) return ["unknown type " + spec.type];
    if(!spec.title) p.push("no title");
    function uniq(a){ var s = {}; return a.every(function(x){ if(s[x]) return false; s[x] = 1; return true; }); }
    if(spec.type === "sort"){
      if(!spec.cats || spec.cats.length < 2) p.push("needs 2+ cats");
      if(!spec.items || spec.items.length < 5) p.push("needs 5+ items");
      else { spec.items.forEach(function(i){ if(!(i[1] >= 0 && i[1] < spec.cats.length)) p.push("bad category for " + i[0]); }); if(!uniq(spec.items.map(function(i){ return i[0]; }))) p.push("duplicate item"); spec.cats.forEach(function(c, ci){ if(!spec.items.some(function(i){ return i[1] === ci; })) p.push("empty category " + c); }); }
    }
    if(spec.type === "order"){ if(!spec.steps || spec.steps.length < 3) p.push("needs 3+ steps"); else if(!uniq(spec.steps)) p.push("duplicate step"); }
    if(spec.type === "match"){ if(!spec.pairs || spec.pairs.length < 3) p.push("needs 3+ pairs"); else { if(!uniq(spec.pairs.map(function(x){ return x[0]; }))) p.push("duplicate term"); if(!uniq(spec.pairs.map(function(x){ return x[1]; }))) p.push("duplicate meaning"); } }
    if(spec.type === "bits"){ var n = spec.bits || 8; (spec.targets || []).forEach(function(t){ if(!(t >= 1 && t < Math.pow(2, n))) p.push("target out of range " + t); }); if(!spec.targets || spec.targets.length < 2) p.push("needs 2+ targets"); }
    if(spec.type === "gate"){
      (spec.rounds || []).forEach(function(r, i){
        try { var seen = {}, any = false; (function walk(k, vals){ if(k === r.inputs.length){ if(evalExpr(r.expr, vals) === r.out) any = true; return; } [0, 1].forEach(function(v){ var c = Object.assign({}, vals); c[r.inputs[k]] = v; walk(k + 1, c); }); })(0, {}); if(!any) p.push("round " + i + " impossible"); var start = {}; r.inputs.forEach(function(k){ start[k] = 0; }); if(evalExpr(r.expr, start) === r.out) p.push("round " + i + " already solved at start"); } catch(e){ p.push("round " + i + " " + e.message); }
      });
      if(!spec.rounds || spec.rounds.length < 2) p.push("needs 2+ rounds");
    }
    if(spec.type === "scramble"){ if(!spec.words || spec.words.length < 3) p.push("needs 3+ words"); (spec.words || []).forEach(function(w){ if(!/^[A-Za-z0-9 ]+$/.test(w[0])) p.push("bad word " + w[0]); if(!w[1]) p.push("no clue for " + w[0]); }); }
    if(spec.type === "bug"){ if(!spec.rounds || spec.rounds.length < 2) p.push("needs 2+ rounds"); (spec.rounds || []).forEach(function(r, i){ if(!(r.bug >= 0 && r.bug < r.lines.length)) p.push("round " + i + " bad bug index"); if(!r.why) p.push("round " + i + " no explanation"); }); }
    if(spec.type === "rows"){ if(!spec.rounds || !spec.rows) p.push("needs rows and rounds"); else spec.rounds.forEach(function(r, i){ if(!r.answer.length) p.push("round " + i + " empty answer"); r.answer.forEach(function(a){ if(a < 0 || a >= spec.rows.length) p.push("round " + i + " bad row index"); }); }); }
    if(spec.type === "tf"){ if(!spec.items || spec.items.length < 5) p.push("needs 5+ statements"); else { var t = spec.items.filter(function(i){ return i[1] === true; }).length; if(t === 0 || t === spec.items.length) p.push("all facts or all myths"); } }
    return p;
  }

  var cssDone = false;
  function injectCss(){
    if(cssDone || !doc) return; cssDone = true;
    var s = doc.createElement("style");
    s.textContent =
      ".gm{ border:2px dashed var(--accent,#0f766e); border-radius:14px; padding:14px 16px; margin:14px 0; background:var(--surface,#fff); }" +
      ".gm-title{ font-weight:800; font-size:16px; } .gm-prompt{ margin:6px 0 0; font-size:14.5px; color:var(--muted,#555); }" +
      ".gm-meta{ display:flex; justify-content:space-between; font-size:12.5px; font-weight:700; color:var(--muted,#555); margin:8px 0; }" +
      ".gm-stage{ min-height:90px; } .gm-row{ display:flex; gap:10px; flex-wrap:wrap; margin-top:12px; }" +
      ".gm-btn{ font:inherit; font-weight:700; padding:10px 14px; border-radius:10px; border:1.5px solid var(--line,#ccc); background:var(--surface,#fff); color:var(--ink,#111); cursor:pointer; text-align:left; transition:transform .12s; }" +
      ".gm-btn:hover:not(:disabled){ border-color:var(--accent,#0f766e); } .gm-btn:active:not(:disabled){ transform:scale(.97); } .gm-btn:disabled{ cursor:default; }" +
      ".gm-go{ background:var(--accent,#0f766e); color:#fff; border-color:var(--accent,#0f766e); margin-top:12px; } .gm-cat{ flex:1 1 140px; text-align:center; }" +
      ".gm-card{ border:1px solid var(--line,#ccc); background:var(--bg,#f4f6f8); border-radius:12px; padding:14px 16px; margin-top:6px; } .gm-big{ font-size:20px; font-weight:800; text-align:center; padding:22px 14px; }" +
      ".gm-big small{ font-size:14px; font-weight:600; color:var(--muted,#555); } .gm-big code{ font-size:18px; }" +
      ".gm-ok{ border-color:var(--correct,#16a34a) !important; background:var(--correct-bg,#dcfce7) !important; } .gm-bad{ border-color:var(--incorrect,#dc2626) !important; background:var(--incorrect-bg,#fee2e2) !important; animation:gmshake .4s; }" +
      "@keyframes gmshake{ 25%{ transform:translateX(-6px); } 75%{ transform:translateX(6px); } }" +
      ".gm-pool{ display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; } .gm-chip{ text-align:left; }" +
      ".gm-list{ margin:8px 0 0 22px; padding:0; } .gm-list li{ padding:7px 10px; margin:4px 0; border:1.5px solid; border-radius:8px; font-weight:600; }" +
      ".gm-cols{ display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:6px; } .gm-col{ display:grid; gap:8px; align-content:start; } .gm-term.sel{ border-color:var(--accent,#0f766e); box-shadow:0 0 0 2px var(--accent-tint,#cfe); } .gm-def,.gm-term{ font-size:14px; }" +
      ".gm-bits{ display:flex; gap:6px; justify-content:center; flex-wrap:wrap; margin-top:12px; } .gm-bitcol{ display:flex; flex-direction:column; align-items:center; gap:4px; } .gm-bitcol .pv{ font-size:12px; font-weight:700; color:var(--muted,#555); }" +
      ".gm-bit{ width:42px; height:48px; text-align:center; font-size:20px; padding:0; } .gm-bit.on,.gm-switch.on{ background:var(--accent,#0f766e); color:#fff; border-color:var(--accent,#0f766e); } .gm-readout{ text-align:center; margin-top:10px; font-size:17px; }" +
      ".gm-lamp{ margin-top:12px; text-align:center; font-weight:800; font-size:18px; padding:10px; border-radius:10px; border:1.5px solid var(--line,#ccc); background:var(--bg,#f4f6f8); } .gm-lamp.on{ background:#fef9c3; border-color:#eab308; }" +
      ".gm-slot{ margin-top:12px; font-size:24px; font-weight:800; letter-spacing:4px; text-align:center; } .gm-slot i{ font-style:normal; display:inline-block; min-width:22px; border-bottom:3px solid var(--line,#ccc); margin:0 3px; } .gm-letter{ width:44px; text-align:center; padding:10px 0; }" +
      ".gm-code{ display:grid; gap:4px; margin-top:8px; } .gm-line{ display:flex; gap:12px; align-items:baseline; padding:7px 10px; font-weight:500; } .gm-line .n{ color:var(--muted,#555); width:18px; font-size:12px; } .gm-line code{ font-family:ui-monospace,Menlo,Consolas,monospace; font-size:13.5px; white-space:pre-wrap; }" +
      ".gm-why{ margin-top:10px; padding:10px 12px; border-radius:10px; background:var(--correct-bg,#dcfce7); font-size:14px; } .gm-why.bad{ background:var(--incorrect-bg,#fee2e2); }" +
      ".gm-sql{ background:var(--bg,#f4f6f8); border:1px solid var(--line,#ccc); border-radius:8px; padding:10px 12px; font-size:13.5px; overflow-x:auto; margin:6px 0 0; } .gm-tablewrap{ overflow-x:auto; margin-top:8px; border-radius:6px; }" +
      ".gm-table{ border-collapse:collapse; font-size:14px; } .gm-table th,.gm-table td{ border:1px solid var(--line,#ccc); padding:6px 10px; } .gm-table th{ background:var(--bg,#f4f6f8); } .gm-table tr.sel td{ background:var(--accent-tint,#e0f2f1); } .gm-hint{ font-size:13px; color:var(--muted,#555); margin:8px 0 0; }" +
      ".gm-result{ text-align:center; padding:6px 0; } .gm-confetti{ font-size:26px; } .gm-stars{ font-size:34px; margin:4px 0; } .gm-stars .off{ filter:grayscale(1); opacity:.3; }" +
      "@media (max-width:520px){ .gm-cols{ grid-template-columns:1fr; } .gm-bit{ width:36px; } }";
    doc.head.appendChild(s);
  }

  root.ILGames = { play: play, validate: validate, evalExpr: evalExpr, TYPES: Object.keys(TYPES) };
})(typeof window !== "undefined" ? window : this);
