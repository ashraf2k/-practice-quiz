/* chatbot-ai.js - Phase 3: learning search for SIGNED-IN students only (no AI model; retrieves from the real iLearn lessons).
   Plugs into window.PQChatbot handlers m2 (ask), m3 (resources), m4 (exam preparation). */
(function(){
  "use strict";
  var CB = window.PQChatbot; if(!CB) return;
  var S = CB.state, esc = CB.esc, t = CB.t;
  var PAGE = { igcse: "learn.html", as: "as.html", a2: "alevel.html" };
  var NAME = { igcse: "IGCSE", as: "AS Level", a2: "A Level" };
  var X = {
    en:{ gate:"The learning assistant is for registered students. Please log in with your iLearn / iSolve account to use it.", login:"Log in", signup:"Create an account",
      askPrompt:"Ask me about any Computer Science topic from your course. For example: \"What is a compiler?\" or \"How is sound stored?\"", resPrompt:"What topic do you want learning resources for? Type a topic (for example \"binary\" or \"networks\").", examPrompt:"What would you like help with?",
      found:"Here is what I found in your course lessons:", openL:"Open lesson", none:"I could not find that in your course lessons, so I won't guess. Try different words, or ask the teacher.", nonePlus:"Contact the teacher", srcNote:"These are excerpts from the website's own lessons. They are not Cambridge mark schemes.",
      noLevel:"I could not tell which course your account belongs to, so I can't search the lessons yet. Please ask the teacher to check your class.", more:"Search another topic", practice:"Practise this topic (iSolve)",
      eOpt1:"Past-paper practice", eOpt2:"Paper structure guide", eOpt3:"Revise a topic", eOpt4:"Revision planning",
      paperPractice:"Past-paper practice for your course is in the exam practice area.", guide:"The paper-structure guide is on this page.", plan:"I can't build a personal timetable yet. A good start: open iLearn, finish each topic's lessons in order, then practise that topic in iSolve before moving on.",
      revise:"Type the topic you want to revise.", oPractice:"Open exam practice", oGuide:"Open the AS/A Level paper guide", suggest:"Suggested", explain:"Explain", mainmenu:"Main menu" },
    ar:{ gate:"المساعد التعليمي متاح للطلاب المسجّلين فقط. يرجى تسجيل الدخول بحساب iLearn / iSolve لاستخدامه.", login:"تسجيل الدخول", signup:"إنشاء حساب",
      askPrompt:"اسألني عن أي موضوع في علوم الحاسوب من دورتك. مثال: \"What is a compiler?\" أو \"How is sound stored?\"", resPrompt:"عن أي موضوع تريد مصادر تعلّم؟ اكتب الموضوع (مثل \"binary\" أو \"networks\").", examPrompt:"بماذا تريد المساعدة؟",
      found:"هذا ما وجدته في دروس دورتك:", openL:"افتح الدرس", none:"لم أجد ذلك في دروس دورتك، ولن أخمّن. جرّب كلمات أخرى أو اسأل المعلّم.", nonePlus:"تواصل مع المعلّم", srcNote:"هذه مقتطفات من دروس الموقع نفسها وليست مخططات تصحيح كامبريدج. (الدروس مكتوبة بالإنجليزية.)",
      noLevel:"لم أستطع تحديد دورتك من حسابك، لذلك لا يمكنني البحث في الدروس بعد. اطلب من المعلّم مراجعة صفّك.", more:"ابحث عن موضوع آخر", practice:"تدرّب على هذا الموضوع (iSolve)",
      eOpt1:"التدرّب على الأوراق السابقة", eOpt2:"دليل هيكل الورقة", eOpt3:"مراجعة موضوع", eOpt4:"خطة المراجعة",
      paperPractice:"التدرّب على الأوراق السابقة لدورتك موجود في منطقة التدرّب على الامتحانات.", guide:"دليل هيكل الورقة في هذه الصفحة.", plan:"لا أستطيع إعداد جدول شخصي بعد. بداية جيدة: افتح iLearn وأنهِ دروس كل موضوع بالترتيب ثم تدرّب عليه في iSolve قبل الانتقال.",
      revise:"اكتب الموضوع الذي تريد مراجعته.", oPractice:"افتح التدرّب على الامتحانات", oGuide:"افتح دليل ورقة AS/A Level", suggest:"اقتراحات", explain:"اشرح", mainmenu:"القائمة الرئيسية" }
  };
  function x(k){ return (X[S.lang] && X[S.lang][k]) || X.en[k]; }

  // ----- who is allowed, and which course -----
  var authDone = false, authWait = [];
  function whenAuth(fn){ if(authDone) fn(); else authWait.push(fn); }
  function settle(){ if(authDone) return; authDone = true; var w = authWait; authWait = []; w.forEach(function(f){ f(); }); }
  var levels = null;   // null = not a student; array of allowed level keys
  function levelOfClass(c){
    var cls = String(c || ""); try { if(window.PQ_LEGACY_CLASS) cls = window.PQ_LEGACY_CLASS(cls); } catch(e){}
    return /^10BR/i.test(cls) ? "igcse" : /^11BR/i.test(cls) ? "as" : /^12BR/i.test(cls) ? "a2" : null;
  }
  try {
    if(window.PQFirebase && window.PQFirebase.onAuthChange){
      window.PQFirebase.onAuthChange(function(u){
        if(!u || u.needsProfile){ levels = null; settle(); return; }
        if(u.role === "parent"){ levels = null; settle(); return; }
        var chk = window.PQFirebase.checkIsAdmin ? window.PQFirebase.checkIsAdmin(u.uid) : Promise.resolve(false);
        chk.then(function(adm){ var l = levelOfClass(u.class); levels = adm ? ["igcse", "as", "a2"] : (l ? [l] : []); settle(); }, function(){ levels = []; settle(); });
      });
      setTimeout(settle, 6000);
    } else settle();
  } catch(e){ settle(); }

  // ----- index (loaded only for allowed students) -----
  var idxP = null;
  function loadIndex(){
    if(window.PQ_CB_INDEX) return Promise.resolve(window.PQ_CB_INDEX);
    if(idxP) return idxP;
    idxP = new Promise(function(ok, no){ var s = document.createElement("script"); s.src = "chatbot-index.js?v=1"; s.onload = function(){ ok(window.PQ_CB_INDEX); }; s.onerror = no; document.head.appendChild(s); });
    return idxP;
  }
  var STOP = "a an the is are was were be been of to in on for and or what how why when which who does do did can could should would about with from by as at it its this that these those me my i you your please tell explain describe define give example examples mean means meaning between difference use used using".split(" ");
  function stem(w){ return w.replace(/(ing|ed|es|s)$/, function(m, a, off){ return off >= 3 ? "" : m; }); }
  function terms(q){ return String(q).toLowerCase().replace(/[^a-z0-9.\s]/g, " ").split(/\s+/).filter(function(w){ return w.length > 1 && STOP.indexOf(w) < 0; }).map(stem); }
  function search(q, lv){
    var qt = terms(q); if(!qt.length) return [];
    var res = [];
    lv.forEach(function(k){
      (window.PQ_CB_INDEX[k] || []).forEach(function(l){
        var title = terms(l.title).join(" "), text = " " + terms(l.text).join(" ") + " ", sc = 0, hit = 0;
        qt.forEach(function(w){
          var inT = title.indexOf(w) > -1, c = text.split(" " + w).length - 1;
          if(inT) sc += 6; if(c) sc += Math.min(c, 5);
          if(inT || c) hit++;
          if(/^\d+(\.\d+)+/.test(w) && String(l.code).indexOf(w) === 0) sc += 10, hit++;
        });
        if(hit >= Math.min(2, qt.length) && sc >= 4) res.push({ lv: k, l: l, sc: sc * (hit / qt.length) });
      });
    });
    return res.sort(function(a, b){ return b.sc - a.sc; }).slice(0, 3);
  }
  function snippet(l, q){
    var qt = terms(q), sents = l.text.split(/(?<=[.!?])\s+/).filter(function(s){ return s.length > 25; }), best = sents[0] || l.text, bs = -1;
    sents.forEach(function(s){ var n = terms(s).filter(function(w){ return qt.indexOf(w) > -1; }).length; if(n > bs){ bs = n; best = s; } });
    return best.length > 330 ? best.slice(0, 327) + "…" : best;
  }

  // ----- conversation -----
  var mode = null;
  function gate(){
    CB.botSay(esc(x("gate"))).then(function(){ CB.chips([{ label: x("login"), say: false, run: function(){ location.href = "quiz.html"; } }, { label: x("signup"), say: false, run: function(){ location.href = "quiz.html#signup"; } }, { label: x("mainmenu"), say: false, run: CB.viewMenu }]); });
  }
  function guarded(fn){ return function(){ mode = null; whenAuth(function(){ if(!levels){ gate(); return; } if(!levels.length){ CB.botSay(esc(x("noLevel"))); return; } fn(); }); }; }
  function answer(q){
    loadIndex().then(function(){
      var r = search(q, levels);
      if(!r.length){ return CB.botSay(esc(x("none"))).then(function(){ CB.chips([{ label: x("nonePlus"), run: function(){ CB.startChat ? CB.startChat("m6") : CB.viewMenu(); } }, { label: x("more"), run: function(){ CB.botSay(esc(x("askPrompt"))); } }]); }); }
      return CB.botSay(esc(x("found"))).then(function(){
        r.forEach(function(h){
          CB.addMsg("bot", '<div class="cb-course"><b>' + esc(h.l.code + " " + h.l.title) + '</b><small>' + esc(NAME[h.lv]) + '</small><div style="margin:6px 0">' + esc(snippet(h.l, q)) + '</div><div class="lk"><a href="' + PAGE[h.lv] + '#lesson=' + encodeURIComponent(h.l.id) + '">' + esc(x("openL")) + '</a></div></div>', true);
        });
        CB.addMsg("bot", '<small>' + esc(x("srcNote")) + '</small>', true);
        CB.chips([{ label: x("more"), run: function(){ CB.botSay(esc(x("askPrompt"))); } }, { label: x("mainmenu"), run: CB.viewMenu }]);
      });
    }).catch(function(){ CB.botSay(esc(x("none"))); });
  }
  CB.handlers.m2 = guarded(function(){ mode = "ask"; CB.botSay(esc(x("askPrompt"))); });
  CB.handlers.m3 = guarded(function(){ mode = "ask"; CB.botSay(esc(x("resPrompt"))); });
  CB.handlers.m4 = guarded(function(){
    CB.botSay(esc(x("examPrompt"))).then(function(){
      CB.chips([
        { label: x("eOpt1"), run: function(){ CB.botSay(esc(x("paperPractice"))).then(function(){ CB.chips([{ label: x("oPractice"), say: false, run: function(){ location.href = "exam-practice.html"; } }, { label: x("mainmenu"), say: false, run: CB.viewMenu }]); }); } },
        { label: x("eOpt2"), run: function(){ CB.botSay(esc(x("guide"))).then(function(){ CB.chips([{ label: x("oGuide"), say: false, run: function(){ location.href = "as-guide.html"; } }, { label: x("mainmenu"), say: false, run: CB.viewMenu }]); }); } },
        { label: x("eOpt3"), run: function(){ mode = "ask"; CB.botSay(esc(x("revise"))); } },
        { label: x("eOpt4"), run: function(){ CB.botSay(esc(x("plan"))).then(function(){ CB.chips([{ label: x("mainmenu"), say: false, run: CB.viewMenu }]); }); } }]);
    });
  });
  CB.onText = function(q){ if(CB.textHandler){ var h = CB.textHandler; CB.textHandler = null; h(q); return; } if(mode === "ask") answer(q); else guarded(function(){ mode = "ask"; answer(q); })(); };
  CB.setMode = function(m){ mode = m; };

  // ----- page-aware suggestions -----
  var lastKey = "";
  function pageContext(){
    var p = location.pathname.split("/").pop() || "index.html", lv = p === "learn.html" ? "igcse" : p === "as.html" ? "as" : p === "alevel.html" ? "a2" : null, ttl = "";
    if(lv){ var h = document.querySelector("#view-lesson:not(.hidden) h2, #view-lesson:not(.hidden) h1"); if(h) ttl = h.textContent.replace(/^\s*[\d.]+[a-z]?\s*/, "").trim(); }
    return { page: p, lv: lv, lesson: ttl };
  }
  function suggestions(){
    var c = pageContext(), out = [];
    if(c.lesson) out.push({ q: c.lesson, label: x("explain") + ": " + (c.lesson.length > 38 ? c.lesson.slice(0, 36) + "…" : c.lesson) });
    var lv = c.lv || (levels && levels.length === 1 ? levels[0] : null);
    if(lv && window.PQ_CB_INDEX && window.PQ_CB_INDEX[lv]){
      var arr = window.PQ_CB_INDEX[lv], seed = (c.lesson ? c.lesson.length : 7) + arr.length;
      for(var i = 0; i < 3 && out.length < 3; i++){ var l = arr[(seed * (i + 3) * 7) % arr.length]; if(l && l.title !== c.lesson) out.push({ q: l.title, label: l.title.length > 40 ? l.title.slice(0, 38) + "…" : l.title }); }
    }
    return out.slice(0, 3);
  }
  function paintSugg(force){
    var host = document.querySelector("#pqcb .cb-sugg"); if(!host) return;
    if(S.screen !== "chat" || !levels || !levels.length){ host.hidden = true; return; }
    var s = suggestions(), key = location.pathname + location.hash + "|" + JSON.stringify(s.map(function(a){ return a.q; })) + S.lang;
    if(!force && key === lastKey) return; lastKey = key;
    host.hidden = !s.length; host.innerHTML = s.map(function(a, i){ return '<button class="cb-chip" type="button" data-s="' + i + '">' + esc(a.label) + '</button>'; }).join("");
    host.onclick = function(e){ var b = e.target.closest("button"); if(!b) return; var a = s[+b.getAttribute("data-s")]; mode = "ask"; CB.addMsg("me", a.q); answer(a.q); };
  }
  var foot = document.querySelector("#pqcb .cb-foot");
  if(foot){ var sg = document.createElement("div"); sg.className = "cb-sugg"; sg.hidden = true; foot.insertBefore(sg, foot.firstChild); }
  setInterval(function(){ if(document.getElementById("pqcb").classList.contains("open")) paintSugg(false); }, 1500);
  document.addEventListener("click", function(e){ if(e.target.closest && e.target.closest("#pqcb")) setTimeout(function(){ paintSugg(true); }, 700); });
})();
