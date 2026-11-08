/* Web basics tutorial engine: lesson + 5-question quiz + written question per topic, and a safe code playground.
   Progress is saved in this browser, per student. The playground runs in web-sandbox.html inside a sandboxed iframe. */
(function(){
  "use strict";
  var W = window.WEBTUT || { langs: [] };
  var $ = function(id){ return document.getElementById(id); };
  function el(tag, cls, txt){ var e = document.createElement(tag); if(cls) e.className = cls; if(txt != null) e.textContent = txt; return e; }
  function html(tag, cls, h){ var e = el(tag, cls); e.innerHTML = h; return e; }   // only for text written by us in webtut-*.js

  var user = null, prog = {}, li = 0, ti = 0, dirty = false, frame = null, saveT = 0;
  var PKEY = function(){ return "pq_webtut_v1_" + ((user && user.uid) || "anon"); };
  function loadProg(){ try{ prog = JSON.parse(localStorage.getItem(PKEY()) || "{}") || {}; }catch(e){ prog = {}; } }
  function saveProg(){ try{ localStorage.setItem(PKEY(), JSON.stringify(prog)); }catch(e){} }
  function P(tid){ return prog[tid] || (prog[tid] = { mcq: {}, written: "", seen: false }); }
  function done(tid){ var p = prog[tid]; return !!(p && p.seen && Object.keys(p.mcq || {}).length >= 5); }
  function shuffle(a){ a = a.slice(); for(var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  // ---------- access: 10AM students (and teachers, to preview) ----------
  function allowed(profile, role){
    if(role) return true;
    var cls = String((profile && profile.class) || "");
    try{ cls = window.PQ_LEGACY_CLASS ? window.PQ_LEGACY_CLASS(cls) : cls; }catch(e){}
    return /^10AM/i.test(cls);
  }
  function gateMsg(msg, bad, link){
    var g = $("wb-gate"); g.hidden = false; g.className = "wb-gate" + (bad ? " bad" : ""); g.textContent = msg;
    if(link){ g.appendChild(document.createTextNode(" ")); var a = el("a", null, link[0]); a.href = link[1]; g.appendChild(a); }
  }
  function init(){
    var F = window.PQFirebase;
    if(!F || !F.onAuthChange){ return setTimeout(init, 150); }
    F.onAuthChange(function(p){
      if(!p || !p.uid){ gateMsg("Please log in to open this tutorial.", true, ["Go to log in", "index.html"]); return; }
      var roleP = F.getStaffRole ? F.getStaffRole(p.uid) : Promise.resolve("");
      Promise.resolve(roleP).then(function(role){
        if(!allowed(p, role)){ gateMsg("This tutorial is for 10AM students.", true, ["Back to your home page", "quiz.html"]); return; }
        user = p; $("wb-gate").hidden = true; $("wb-app").hidden = false; loadProg(); start();
      }, function(){ gateMsg("Could not check your account. Please refresh.", true); });
    });
  }

  // ---------- navigation ----------
  function topic(){ return W.langs[li].topics[ti]; }
  function renderLangs(){
    var box = $("wb-langs"); box.textContent = "";
    W.langs.forEach(function(L, i){
      var n = L.topics.filter(function(t){ return done(t.id); }).length;
      var b = el("button", i === li ? "on" : "", L.title); b.type = "button"; b.setAttribute("role", "tab"); b.setAttribute("aria-selected", i === li ? "true" : "false");
      b.appendChild(el("small", null, n + "/" + L.topics.length));
      b.addEventListener("click", function(){ li = i; ti = 0; renderAll(true); });
      box.appendChild(b);
    });
  }
  function renderTopics(){
    var box = $("wb-topics"); box.textContent = "";
    W.langs[li].topics.forEach(function(t, i){
      var b = el("button", (i === ti ? "on " : "") + (done(t.id) ? "done" : ""), (i + 1) + ". " + t.title); b.type = "button"; b.setAttribute("role", "tab");
      b.addEventListener("click", function(){ ti = i; renderAll(true); });
      box.appendChild(b);
    });
  }

  // ---------- lesson ----------
  function codeBlock(text, title, ex){
    var w = el("div", "wb-code"), top = el("div", "wb-code-top"); top.appendChild(el("span", null, title || "Code"));
    if(ex){ var b = el("button", "wb-try", "Try it ▶"); b.type = "button"; b.addEventListener("click", function(){ loadExample(ex, true); }); top.appendChild(b); }
    w.appendChild(top); var pre = el("pre"); pre.textContent = text; w.appendChild(pre); return w;
  }
  function exText(ex){ return [ex.html, ex.css, ex.js].filter(Boolean).length > 1 ? null : (ex.html || ex.css || ex.js || ""); }
  function renderLesson(){
    var t = topic(), box = $("wb-lesson"); box.textContent = "";
    box.appendChild(el("h2", null, W.langs[li].title + ": " + t.title));
    t.lesson.forEach(function(b){
      if(typeof b === "string") box.appendChild(html("p", null, b));
      else if(b.h) box.appendChild(el("h3", null, b.h));
      else if(b.tip) box.appendChild(html("div", "wb-tip", "<b>Tip:</b> " + b.tip));
      else if(b.code) box.appendChild(codeBlock(b.code, "Syntax"));
      else if(b.ex){
        var ex = b.ex, wrap = el("div"), firstKey = ex.html ? "html" : ex.css ? "css" : "js";
        [["html", "HTML"], ["css", "CSS"], ["js", "JavaScript"]].forEach(function(k){
          if(ex[k[0]]){ wrap.appendChild(codeBlock(ex[k[0]], (k[0] === firstKey ? ex.title + " - " : "") + k[1], k[0] === firstKey ? ex : null)); }
        });
        box.appendChild(wrap);
      }
    });
  }

  // ---------- quiz + written ----------
  function renderQuiz(){
    var t = topic(), p = P(t.id), box = $("wb-quiz"); box.textContent = "";
    box.appendChild(el("h2", null, "Check yourself: " + t.title));
    box.appendChild(el("p", "wb-sub", "Five multiple-choice questions, then one written question."));
    var answered = 0, right = 0;
    t.mcq.forEach(function(q, qi){
      var wrap = el("div", "wb-q"), key = String(qi), prev = p.mcq[key];
      wrap.appendChild(el("p", "wb-q-t", (qi + 1) + ". " + q.q));
      var opts = el("div", "wb-opts"), why = el("p", "wb-why"); why.hidden = true;
      var order = shuffle(q.o);
      function lock(pick){
        Array.prototype.forEach.call(opts.children, function(b){
          b.disabled = true;
          if(b.textContent === q.o[0]) b.className = "wb-opt ok";
          else if(b.textContent === pick) b.className = "wb-opt no";
        });
        why.hidden = false; why.textContent = (pick === q.o[0] ? "Correct. " : "Not quite. The answer is: " + q.o[0] + ". ") + q.why;
      }
      order.forEach(function(text){
        var b = el("button", "wb-opt", text); b.type = "button";
        b.addEventListener("click", function(){
          p.mcq[key] = { pick: text, ok: text === q.o[0] }; saveProg(); lock(text); renderQuizFoot(box, t); renderLangs(); renderTopics();
        });
        opts.appendChild(b);
      });
      wrap.appendChild(opts); wrap.appendChild(why); box.appendChild(wrap);
      if(prev){ answered++; if(prev.ok) right++; lock(prev.pick); }
    });
    var foot = el("div"); foot.id = "wb-foot"; box.appendChild(foot); renderQuizFoot(box, t);

    var wr = el("div", "wb-q wb-written");
    wr.appendChild(html("p", "wb-q-t", "Written question: " + t.written.q));
    var ta = el("textarea"); ta.placeholder = "Write your answer here. It is saved in this browser as you type."; ta.value = p.written || ""; ta.setAttribute("aria-label", "Your written answer");
    wr.appendChild(ta);
    var row = el("div", "wb-row"), chk = el("button", "btn", "Show model answer"); chk.type = "button";
    var note = el("span", "wb-sub", "");
    row.appendChild(chk); row.appendChild(note); wr.appendChild(row);
    var modelBox = el("div"); wr.appendChild(modelBox);
    function enable(){ var ok = ta.value.trim().length >= 15; chk.disabled = !ok; note.textContent = ok ? "" : "Write your own answer first (at least a sentence), then compare."; }
    ta.addEventListener("input", function(){ p.written = ta.value; clearTimeout(saveT); saveT = setTimeout(saveProg, 400); enable(); });
    function showModel(){
      modelBox.textContent = "";
      var m = el("div", "wb-model"); m.appendChild(el("b", null, "Model answer"));
      var pre = el("pre"); pre.textContent = t.written.model; m.appendChild(pre);
      m.appendChild(el("b", null, "Compare with yours. Did your answer include:"));
      var ul = el("ul"); t.written.check.forEach(function(c){ var li2 = el("li"), lab = el("label"), cb = el("input"); cb.type = "checkbox"; lab.appendChild(cb); lab.appendChild(html("span", null, " " + c.replace(/</g, "&lt;"))); li2.appendChild(lab); ul.appendChild(li2); });
      m.appendChild(ul); m.appendChild(el("p", "wb-sub", "Missed something? Improve your answer above, then try it in the practice window.")); modelBox.appendChild(m);
      p.seen = true; saveProg(); renderLangs(); renderTopics();
    }
    chk.addEventListener("click", showModel); enable(); if(p.seen) showModel();
    box.appendChild(wr);
  }
  function renderQuizFoot(box, t){
    var p = P(t.id), foot = box.querySelector("#wb-foot"); if(!foot) return; foot.textContent = "";
    var n = Object.keys(p.mcq).length, ok = 0; Object.keys(p.mcq).forEach(function(k){ if(p.mcq[k].ok) ok++; });
    if(n < t.mcq.length) return;
    var s = el("div", "wb-score"); s.appendChild(el("span", null, "Quiz score: " + ok + " / " + t.mcq.length + (ok === t.mcq.length ? " - perfect!" : "")));
    var b = el("button", "btn btn-secondary", "Try the quiz again"); b.type = "button";
    b.addEventListener("click", function(){ p.mcq = {}; saveProg(); renderAll(false); });
    s.appendChild(b); foot.appendChild(s);
  }

  // ---------- playground ----------
  var ED = {};
  function loadExample(ex, run){
    ED.html.value = ex.html || ""; ED.css.value = ex.css || ""; ED.js.value = ex.js || "";
    dirty = false;
    var first = ex.html ? "html" : ex.css ? "css" : ex.js ? "js" : "html";
    // show the editor that matters for this example: JS-only examples open the JS tab, CSS examples the CSS tab
    showEd(ex.js && !ex.css && !ex.html ? "js" : (ex.css ? "css" : "html"));
    if(run) runCode();
    var pl = $("wb-play"); if(run && pl.getBoundingClientRect().top > window.innerHeight * 0.85) pl.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function showEd(name){
    Array.prototype.forEach.call(document.querySelectorAll(".wb-edtabs button"), function(b){ b.classList.toggle("on", b.dataset.ed === name); });
    ["html", "css", "js"].forEach(function(k){ ED[k].hidden = k !== name; });
  }
  function log(text, cls){
    var c = $("wb-console"), line = document.createElement("div"); if(cls) line.className = cls; line.textContent = text; c.appendChild(line); c.scrollTop = c.scrollHeight;
  }
  function stopCode(msg){
    var wrap = $("wb-frame-wrap"); wrap.textContent = ""; frame = null;
    wrap.appendChild(el("p", "wb-empty", msg || "Stopped."));
  }
  function runCode(){
    var wrap = $("wb-frame-wrap"); wrap.textContent = ""; $("wb-console").textContent = "";
    var f = document.createElement("iframe");
    f.setAttribute("sandbox", "allow-scripts");                 // no same-origin access, no forms, no pop-ups, no navigation of the page
    f.setAttribute("title", "Result of your code");
    f.src = "web-sandbox.html"; frame = f; wrap.appendChild(f);
    var payload = { type: "run", html: ED.html.value, css: ED.css.value, js: ED.js.value };
    f.__payload = payload;
  }
  window.addEventListener("message", function(e){
    if(!frame || e.source !== frame.contentWindow) return;
    var d = e.data || {};
    if(d.type === "ready" && frame.__payload){ frame.contentWindow.postMessage(frame.__payload, "*"); frame.__payload = null; }
    else if(d.type === "console"){
      var cls = d.level === "error" ? "e" : d.level === "warn" ? "w" : (d.level === "alert" || d.level === "prompt" || d.level === "confirm") ? "a" : "";
      log((cls === "a" ? d.level + ": " : (cls === "e" ? "Error: " : "")) + String(d.text).slice(0, 2000), cls);
    }
  });
  function setupPlayground(){
    ["html", "css", "js"].forEach(function(k){ ED[k] = $("ed-" + k); });
    Array.prototype.forEach.call(document.querySelectorAll(".wb-edtabs button"), function(b){ b.addEventListener("click", function(){ showEd(b.dataset.ed); }); });
    var tabOk = true;
    ["html", "css", "js"].forEach(function(k){
      ED[k].addEventListener("input", function(){ dirty = true; });
      ED[k].addEventListener("keydown", function(e){
        if(e.key === "Escape"){ tabOk = false; return; }
        if(e.key === "Tab" && !e.shiftKey && tabOk){
          e.preventDefault(); var s = ED[k].selectionStart, en = ED[k].selectionEnd;
          ED[k].value = ED[k].value.slice(0, s) + "  " + ED[k].value.slice(en); ED[k].selectionStart = ED[k].selectionEnd = s + 2; dirty = true;
        } else if(e.key !== "Tab" && e.key !== "Shift") tabOk = true;
      });
    });
    $("wb-run").addEventListener("click", runCode);
    $("wb-stop").addEventListener("click", function(){ stopCode("Stopped. Press Run to start again."); });
    $("wb-reset").addEventListener("click", function(){
      var ex = firstExample(topic()); if(ex) loadExample(ex, false); stopCode("Reset. Press Run to see the result.");
    });
  }
  function firstExample(t){ for(var i = 0; i < t.lesson.length; i++){ if(t.lesson[i] && t.lesson[i].ex) return t.lesson[i].ex; } return null; }

  function renderAll(topicChanged){
    renderLangs(); renderTopics(); renderLesson(); renderQuiz();
    if(topicChanged && !dirty){ var ex = firstExample(topic()); if(ex) loadExample(ex, false); stopCode("Press Run to see the result."); }
    if(topicChanged) window.scrollTo({ top: 0 });
  }
  function start(){
    setupPlayground();
    // continue where the student stopped: first topic not done in the first language
    renderAll(true);
  }
  init();
})();
