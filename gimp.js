/* GIMP tutorial engine: lesson + animated demo + 5-question quiz + written question per topic.
   Progress is saved in this browser, per student. The playground runs in web-sandbox.html inside a sandboxed iframe. */
(function(){
  "use strict";
  var W = window.GIMPTUT || { langs: [] };
  var $ = function(id){ return document.getElementById(id); };
  function el(tag, cls, txt){ var e = document.createElement(tag); if(cls) e.className = cls; if(txt != null) e.textContent = txt; return e; }
  function html(tag, cls, h){ var e = el(tag, cls); e.innerHTML = h; return e; }   // only for text written by us in webtut-*.js

  var user = null, prog = {}, li = 0, ti = 0, dirty = false, frame = null, saveT = 0;
  var PKEY = function(){ return "pq_gimp_v1_" + ((user && user.uid) || "anon"); };
  function loadProg(){ try{ prog = JSON.parse(localStorage.getItem(PKEY()) || "{}") || {}; }catch(e){ prog = {}; } }
  function saveProg(){ try{ localStorage.setItem(PKEY(), JSON.stringify(prog)); }catch(e){} }
  function P(tid){ return prog[tid] || (prog[tid] = { mcq: {}, written: "", seen: false, t: 0 }); }
  // ---- save to the school database (practiceProgress, key "gimp") so teachers can review it and it follows the student ----
  var cloudT = 0, TOTAL = 0;
  function snapshot(){
    var topics = {}, d = 0, last = 0;
    Object.keys(prog).forEach(function(k){
      var p = prog[k]; if(!p) return;
      var m = {}; Object.keys(p.mcq || {}).forEach(function(q){ var x = p.mcq[q]; m[q] = { pick: String(x.pick || "").slice(0, 140), ok: x.ok === true }; });
      topics[k] = { mcq: m, written: String(p.written || "").slice(0, 4000), seen: p.seen === true, t: p.t || 0 };
      if(done(k)) d++; if((p.t || 0) > last) last = p.t;
    });
    return { topics: topics, done: d, total: TOTAL, lastActive: last };
  }
  function pushCloud(){
    clearTimeout(cloudT);
    cloudT = setTimeout(function(){
      var F = window.PQFirebase;
      if(user && F && F.saveProgress) F.saveProgress(user.uid, "gimp", snapshot());
    }, 1500);
  }
  function touch(tid){ P(tid).t = Date.now(); saveProg(); pushCloud(); }
  function cloudLoad(){
    var F = window.PQFirebase;
    if(!F || !F.getMyProgress) return Promise.resolve();
    return F.getMyProgress(user.uid, "gimp").then(function(rec){
      if(!rec || !rec.topics) return;
      Object.keys(rec.topics).forEach(function(k){
        var c = rec.topics[k], l = prog[k];
        if(!c || (l && (l.t || 0) >= (c.t || 0))) return;
        prog[k] = { mcq: c.mcq || {}, written: c.written || "", seen: c.seen === true, t: c.t || 0 };
      });
      saveProg();
    }, function(){});
  }
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
        user = p; $("wb-gate").hidden = true; $("wb-app").hidden = false; loadProg(); TOTAL = W.langs.reduce(function(n, L){ return n + L.topics.length; }, 0); cloudLoad().then(start);
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

  // ---------- lesson + animation ----------
  function renderLesson(){
    var t = topic(), box = $("wb-lesson"); box.textContent = "";
    box.appendChild(el("h2", null, W.langs[li].title + ": " + t.title));
    t.lesson.forEach(function(b){
      if(typeof b === "string") box.appendChild(html("p", null, b));
      else if(b.h) box.appendChild(el("h3", null, b.h));
      else if(b.tip) box.appendChild(html("div", "wb-tip", "<b>Tip:</b> " + b.tip));
    });
  }
  function renderDemo(){
    var t = topic(), box = $("wb-demo"); box.textContent = "";
    box.appendChild(el("h2", null, "Watch how: " + t.title));
    var host = el("div"); box.appendChild(host);
    if(window.GIMPANIM && window.GIMPANIM.mount && t.anim) window.GIMPANIM.mount(host, t);
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
          p.mcq[key] = { pick: text, ok: text === q.o[0] }; touch(t.id); lock(text); renderQuizFoot(box, t); renderLangs(); renderTopics();
        });
        opts.appendChild(b);
      });
      wrap.appendChild(opts); wrap.appendChild(why); box.appendChild(wrap);
      if(prev){ answered++; if(prev.ok) right++; lock(prev.pick); }
    });
    var foot = el("div"); foot.id = "wb-foot"; box.appendChild(foot); renderQuizFoot(box, t);

    var wr = el("div", "wb-q wb-written");
    wr.appendChild(el("p", "wb-q-t", "Written question: " + t.written.q));
    var ta = el("textarea"); ta.maxLength = 4000; ta.placeholder = "Write your answer here. It is saved as you type."; ta.value = p.written || ""; ta.setAttribute("aria-label", "Your written answer");
    wr.appendChild(ta);
    var row = el("div", "wb-row"), chk = el("button", "btn", "Show model answer"); chk.type = "button";
    var note = el("span", "wb-sub", "");
    row.appendChild(chk); row.appendChild(note); wr.appendChild(row);
    var modelBox = el("div"); wr.appendChild(modelBox);
    function enable(){ var ok = ta.value.trim().length >= 15; chk.disabled = !ok; note.textContent = ok ? "" : "Write your own answer first (at least a sentence), then compare."; }
    ta.addEventListener("input", function(){ p.written = ta.value; clearTimeout(saveT); saveT = setTimeout(function(){ touch(t.id); }, 700); enable(); });
    function showModel(){
      modelBox.textContent = "";
      var m = el("div", "wb-model"); m.appendChild(el("b", null, "Model answer"));
      var pre = el("pre"); pre.textContent = t.written.model; m.appendChild(pre);
      m.appendChild(el("b", null, "Compare with yours. Did your answer include:"));
      var ul = el("ul"); t.written.check.forEach(function(c){ var li2 = el("li"), lab = el("label"), cb = el("input"); cb.type = "checkbox"; lab.appendChild(cb); lab.appendChild(html("span", null, " " + c.replace(/</g, "&lt;"))); li2.appendChild(lab); ul.appendChild(li2); });
      m.appendChild(ul); m.appendChild(el("p", "wb-sub", "Missed something? Improve your answer above, then try the steps in GIMP.")); modelBox.appendChild(m);
      if(!p.seen){ p.seen = true; touch(t.id); } renderLangs(); renderTopics();
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
    b.addEventListener("click", function(){ p.mcq = {}; touch(t.id); renderAll(false); });
    s.appendChild(b); foot.appendChild(s);
  }

  function renderAll(topicChanged){
    renderLangs(); renderTopics(); renderLesson(); renderDemo(); renderQuiz();
    if(topicChanged) window.scrollTo({ top: 0 });
  }
  function start(){ renderAll(true); }
  init();
})();
