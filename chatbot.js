/* chatbot.js - floating learning assistant (Phase 2: interface, contact form, menu, conversation shell).
   Self-contained: injects its own DOM, lazy-loads chatbot-phone.js on first open. Later phases plug into CB.handlers. */
(function(){
  "use strict";
  if(window.PQChatbot || document.getElementById("pqcb")) return;
  var STORE = "pq_cb_v1";
  var T = {
    en:{ title:"Learning Assistant", sub:"iLearn · iSolve", open:"Open chat", close:"Close", menu:"Main menu", newc:"New conversation", lang:"عربي",
      hello:"Hello! Welcome to our learning platform.", intro:"I'm your AI Learning Assistant. I'm here to help you explore courses, understand Computer Science topics, find learning resources, and prepare for your examinations.", how:"How can I help you today?",
      name:"Full name", optional:"(optional)", email:"Email address", phone:"Mobile phone number", cc:"Country code", search:"Search country or code…",
      consent:"I agree that my name, email and phone number are stored so the teacher can reply to me. I can ask for them to be deleted at any time.", privacy:"We only collect what is needed to answer your enquiries. We never ask for passwords or card details.", start:"Start chatting",
      eName:"Please enter at least 2 characters.", eEmail:"Please enter a valid email address, e.g. name@example.com.", ePhone:"This phone number does not look valid for the selected country.", eConsent:"Please tick the box to continue.",
      welcomeBack:"Welcome back", notYou:"Not you? Use different details", menuQ:"Choose an option:",
      m1:"Explore Computer Science Courses", m1d:"IGCSE, AS Level and A Level", m2:"Ask a Computer Science Question", m2d:"Topics, programming, algorithms, pseudocode", m3:"Find Learning Resources", m3d:"Notes, videos, quizzes, past papers", m4:"Examination Preparation", m4d:"Syllabus, techniques, revision planning",
      m5:"Do you want to book an online Computer Science course?", m5d:"Tell us what you need and the teacher will contact you", m6:"Contact Support", m6d:"Problems, payments, or message the teacher", best:"Popular",
      type:"Type your message…", send:"Send", courses:"Here are the courses on this website:", lessons:"lessons", sample:"Free sample", login:"Log in to start", mainmenu:"Main menu",
      soon:"This part of the assistant is being connected and is not available yet. In the meantime you can try the free sample or go back to the menu.", soonSample:"Try the free sample", unavailable:"I can't answer that yet." },
    ar:{ title:"مساعد التعلّم", sub:"iLearn · iSolve", open:"افتح المحادثة", close:"إغلاق", menu:"القائمة الرئيسية", newc:"محادثة جديدة", lang:"English",
      hello:"مرحباً بك في منصتنا التعليمية!", intro:"أنا مساعدك الذكي للتعلّم. أساعدك على استكشاف الدورات وفهم موضوعات علوم الحاسوب وإيجاد مصادر التعلّم والاستعداد لامتحاناتك.", how:"كيف يمكنني مساعدتك اليوم؟",
      name:"الاسم الكامل", optional:"(اختياري)", email:"البريد الإلكتروني", phone:"رقم الجوال", cc:"رمز الدولة", search:"ابحث عن دولة أو رمز…",
      consent:"أوافق على حفظ اسمي وبريدي الإلكتروني ورقم جوالي ليتمكّن المعلّم من الرد عليّ. ويمكنني طلب حذفها في أي وقت.", privacy:"نجمع فقط ما يلزم للرد على استفساراتك. لا نطلب كلمات المرور ولا بيانات البطاقات أبداً.", start:"ابدأ المحادثة",
      eName:"أدخل حرفين على الأقل.", eEmail:"أدخل بريداً إلكترونياً صحيحاً مثل name@example.com.", ePhone:"رقم الجوال غير صالح للدولة المختارة.", eConsent:"يرجى تحديد المربع للمتابعة.",
      welcomeBack:"أهلاً بعودتك", notYou:"لست أنت؟ استخدم بيانات أخرى", menuQ:"اختر خياراً:",
      m1:"استكشف دورات علوم الحاسوب", m1d:"IGCSE وAS وA Level", m2:"اسأل سؤالاً في علوم الحاسوب", m2d:"موضوعات وبرمجة وخوارزميات وشبه الشيفرة", m3:"ابحث عن مصادر التعلّم", m3d:"ملاحظات وفيديوهات واختبارات وأوراق سابقة", m4:"التحضير للامتحانات", m4d:"المنهج والتقنيات وخطة المراجعة",
      m5:"هل تريد حجز دورة علوم حاسوب عبر الإنترنت؟", m5d:"أخبرنا باحتياجاتك وسيتواصل معك المعلّم", m6:"تواصل مع الدعم", m6d:"مشكلة أو دفع أو رسالة للمعلّم", best:"الأكثر طلباً",
      type:"اكتب رسالتك…", send:"إرسال", courses:"هذه هي الدورات المتاحة في الموقع:", lessons:"درساً", sample:"نموذج مجاني", login:"سجّل الدخول للبدء", mainmenu:"القائمة الرئيسية",
      soon:"هذا الجزء من المساعد قيد الربط وغير متاح بعد. يمكنك في الأثناء تجربة النموذج المجاني أو العودة إلى القائمة.", soonSample:"جرّب النموذج المجاني", unavailable:"لا أستطيع الإجابة على هذا بعد." }
  };
  var COURSES = [
    { key:"igcse", en:"Cambridge IGCSE Computer Science (0478/0984)", ar:"كامبريدج IGCSE علوم الحاسوب (0478/0984)", n:155 },
    { key:"as", en:"Cambridge International AS Level Computer Science (9618)", ar:"كامبريدج AS Level علوم الحاسوب (9618)", n:75 },
    { key:"a2", en:"Cambridge International A Level Computer Science (9618)", ar:"كامبريدج A Level علوم الحاسوب (9618)", n:129 }
  ];
  var S = { lang: "en", visitor: null, screen: "contact", msgs: [], user: null };
  try { var sv = JSON.parse(localStorage.getItem(STORE) || "null"); if(sv){ if(sv.lang) S.lang = sv.lang; if(sv.visitor) S.visitor = sv.visitor; } } catch(e){}
  function save(){ try { localStorage.setItem(STORE, JSON.stringify({ lang: S.lang, visitor: S.visitor })); } catch(e){} }
  function t(k){ return (T[S.lang] && T[S.lang][k]) || T.en[k] || k; }
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){ return { "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]; }); }
  function $(sel, r){ return (r || root).querySelector(sel); }

  // ---------- DOM ----------
  var root = document.createElement("div"); root.id = "pqcb";
  root.innerHTML = '<button class="cb-fab" type="button" aria-expanded="false" aria-controls="cb-win"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 11h7M8.5 14h4"/></svg><span class="cb-dot"></span></button>' +
    '<section class="cb-win" id="cb-win" role="dialog" aria-label="Learning Assistant"><header class="cb-head"><span class="cb-av" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z"/><path d="M7 10v5c0 1.5 2.2 3 5 3s5-1.5 5-3v-5"/></svg></span><div><b data-t="title"></b><small data-t="sub"></small></div><span class="sp"></span><button class="cb-icon" type="button" data-a="menu" hidden></button><button class="cb-icon" type="button" data-a="lang"></button><button class="cb-icon" type="button" data-a="close" aria-label="Close">✕</button></header>' +
    '<div class="cb-body" aria-live="polite"></div><div class="cb-foot" hidden><div class="cb-row"><input class="cb-in" type="text" maxlength="1000" autocomplete="off"><button class="cb-send" type="button" aria-label="Send"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></button></div></div></section>';
  document.body.appendChild(root);
  var fab = $(".cb-fab"), body = $(".cb-body"), foot = $(".cb-foot"), inp = $(".cb-in");

  function chrome(){
    root.setAttribute("dir", S.lang === "ar" ? "rtl" : "ltr"); root.setAttribute("lang", S.lang);
    root.querySelectorAll("[data-t]").forEach(function(n){ n.textContent = t(n.getAttribute("data-t")); });
    $('[data-a=lang]').textContent = t("lang"); $('[data-a=menu]').textContent = "☰"; $('[data-a=menu]').title = t("menu"); $('[data-a=menu]').setAttribute("aria-label", t("menu"));
    $('[data-a=menu]').hidden = S.screen === "contact" || S.screen === "menu";
    fab.setAttribute("aria-label", t("open")); inp.placeholder = t("type"); $(".cb-send").setAttribute("aria-label", t("send"));
    foot.hidden = S.screen !== "chat";
  }
  function scroll(){ body.scrollTop = body.scrollHeight; }

  // ---------- contact form ----------
  var phoneReady = null;
  function loadPhone(){
    if(window.PQPhone) return Promise.resolve();
    if(phoneReady) return phoneReady;
    phoneReady = new Promise(function(ok, no){ var s = document.createElement("script"); s.src = "chatbot-phone.js?v=1"; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
    return phoneReady;
  }
  function viewContact(){
    S.screen = "contact"; chrome();
    var v = S.visitor || S.prefill || {};
    body.innerHTML = '<div class="cb-h">' + esc(t("hello")) + '</div><p class="cb-sub">' + esc(t("intro")) + '<br><b>' + esc(t("how")) + '</b></p>' +
      '<form novalidate id="cb-form"><div class="cb-field" data-f="name"><label for="cb-name">' + esc(t("name")) + ' <span class="cb-o">' + esc(t("optional")) + '</span></label><input id="cb-name" type="text" autocomplete="name" maxlength="80"><div class="cb-err"></div></div>' +
      '<div class="cb-field" data-f="email"><label for="cb-email">' + esc(t("email")) + ' *</label><input id="cb-email" type="email" autocomplete="email" dir="ltr" maxlength="120"><div class="cb-err"></div></div>' +
      '<div class="cb-field" data-f="phone"><label for="cb-phone">' + esc(t("phone")) + ' *</label><div class="cb-phone"><button type="button" class="cb-cc" id="cb-cc" aria-haspopup="listbox" aria-label="' + esc(t("cc")) + '"></button><input id="cb-phone" type="tel" autocomplete="tel-national" inputmode="tel" dir="ltr" maxlength="20"></div><div id="cb-cclist"></div><div class="cb-err"></div></div>' +
      '<label class="cb-consent" data-f="consent"><input type="checkbox" id="cb-consent"><span>' + esc(t("consent")) + '</span></label><div class="cb-err" data-e="consent" style="margin:-8px 0 8px"></div>' +
      '<button class="cb-btn" type="submit">' + esc(t("start")) + '</button><p class="cb-note">' + esc(t("privacy")) + ' <a href="privacy.html" target="_blank" rel="noopener">Privacy</a></p></form>';
    var iso = v.iso || "SA", form = $("#cb-form");
    if(v.name) $("#cb-name").value = v.name;
    if(v.email) $("#cb-email").value = v.email;
    if(v.national) $("#cb-phone").value = v.national;
    loadPhone().then(function(){
      var list = window.PQPhone.countries;
      function paintCC(){ var c = list.filter(function(x){ return x.iso === iso; })[0]; $("#cb-cc").textContent = c.flag + " " + c.dial + " ▾"; }
      paintCC();
      $("#cb-cc").onclick = function(){
        var host = $("#cb-cclist"); if(host.firstChild){ host.innerHTML = ""; return; }
        host.innerHTML = '<div class="cb-list" role="listbox"><div class="s"><input type="search" class="cb-in" style="width:100%" placeholder="' + esc(t("search")) + '" aria-label="' + esc(t("search")) + '"></div><div class="rows"></div></div>';
        var q = $("input", host), rows = $(".rows", host);
        function fill(){
          var f = q.value.trim().toLowerCase().replace(/^\+/, "");
          rows.innerHTML = list.filter(function(c){ return !f || c.en.toLowerCase().indexOf(f) > -1 || (c.ar || "").indexOf(f) > -1 || c.dial.slice(1).indexOf(f) === 0 || c.iso.toLowerCase() === f; })
            .map(function(c){ return '<button type="button" role="option" data-i="' + c.iso + '"' + (c.iso === iso ? ' class="on"' : '') + '><span>' + c.flag + '</span><span>' + esc(S.lang === "ar" ? c.ar : c.en) + '</span><em dir="ltr">' + c.dial + '</em></button>'; }).join("");
        }
        fill(); q.oninput = fill; q.focus();
        rows.onclick = function(e){ var b = e.target.closest("button"); if(!b) return; iso = b.getAttribute("data-i"); paintCC(); host.innerHTML = ""; $("#cb-phone").focus(); };
      };
      form.onsubmit = function(e){
        e.preventDefault();
        var name = $("#cb-name").value.trim(), email = $("#cb-email").value.trim(), raw = $("#cb-phone").value.trim(), ok = true;
        function bad(f, msg){ var el = form.querySelector('[data-f=' + f + ']'); el.classList.toggle("bad", !!msg); var er = el.querySelector(".cb-err"); if(er) er.textContent = msg || ""; if(msg) ok = false; }
        bad("name", name && name.length < 2 ? t("eName") : "");
        bad("email", /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "" : t("eEmail"));
        var pv = window.PQPhone.validate(iso, raw); bad("phone", pv.ok ? "" : t("ePhone"));
        var cons = $("#cb-consent").checked; $('[data-e=consent]').textContent = cons ? "" : t("eConsent"); if(!cons) ok = false;
        if(!ok){ var first = form.querySelector(".bad input"); if(first) first.focus(); return; }
        S.visitor = { name: name, email: email, phone: pv.e164, iso: iso, national: raw, consent: true, consentAt: new Date().toISOString() }; save();
        viewMenu(true);
      };
    });
  }

  // ---------- menu ----------
  var ICONS = { m1:"🎓", m2:"💬", m3:"📚", m4:"📝", m5:"🚀", m6:"🛟" };
  function viewMenu(first){
    S.screen = "menu"; chrome();
    var v = S.visitor || {}, nm = (v.name || "").split(" ")[0];
    var card = function(k, hero){ return '<button class="cb-card' + (hero ? ' hero' : '') + '" type="button" data-m="' + k + '"><span class="ic" aria-hidden="true">' + ICONS[k] + '</span><span><b>' + esc(t(k)) + '</b><span class="d">' + esc(t(k + "d")) + '</span></span>' + (hero ? '<span class="tag">' + esc(t("best")) + '</span>' : '') + '</button>'; };
    body.innerHTML = (first === true ? '' : '') + '<div class="cb-h">' + (nm ? esc(t("welcomeBack")) + ", " + esc(nm) + "!" : esc(t("hello"))) + '</div><p class="cb-sub">' + esc(t("menuQ")) + '</p><div class="cb-grid">' +
      card("m5", true) + card("m1") + card("m2") + card("m3") + card("m4") + card("m6") + '</div>' + (S.visitor && !S.user ? '<button class="cb-btn alt" type="button" data-a="forget">' + esc(t("notYou")) + '</button>' : '');
    body.scrollTop = 0;
  }

  // ---------- conversation ----------
  function addMsg(who, html, isHtml){
    var d = document.createElement("div"); d.className = "cb-msg " + who; if(isHtml) d.innerHTML = html; else d.textContent = html; body.appendChild(d); scroll(); return d;
  }
  function typing(ms){
    var d = document.createElement("div"); d.className = "cb-msg bot"; d.innerHTML = '<span class="cb-typing" aria-label="…"><i></i><i></i><i></i></span>'; body.appendChild(d); scroll();
    return new Promise(function(res){ setTimeout(function(){ d.remove(); res(); }, ms || 600); });
  }
  function botSay(html){ return typing(550).then(function(){ addMsg("bot", html, true); }); }
  function chips(list){
    var d = document.createElement("div"); d.className = "cb-chips";
    d.innerHTML = list.map(function(c, i){ return '<button class="cb-chip" type="button" data-c="' + i + '">' + esc(c.label) + '</button>'; }).join("");
    d.onclick = function(e){ var b = e.target.closest("button"); if(!b) return; var c = list[+b.getAttribute("data-c")]; d.remove(); if(c.say !== false) addMsg("me", c.label); c.run(); };
    body.appendChild(d); scroll();
  }
  function startChat(key){
    S.screen = "chat"; chrome(); body.innerHTML = ""; inp.focus();
    var h = CB.handlers[key]; if(h) h(); else soon();
  }
  function soonChips(){ chips([{ label: t("soonSample"), run: function(){ location.href = "sample.html"; } }, { label: t("mainmenu"), run: viewMenu }]); }
  function soon(){ botSay(esc(t("soon"))).then(soonChips); }
  function coursesHandler(){
    botSay(esc(t("courses"))).then(function(){
      COURSES.forEach(function(c){
        addMsg("bot", '<div class="cb-course"><b>' + esc(c[S.lang]) + '</b><small>' + c.n + ' ' + esc(t("lessons")) + ' · iLearn + iSolve</small><div class="lk"><a href="sample.html?level=' + c.key + '">' + esc(t("sample")) + '</a><a href="quiz.html">' + esc(t("login")) + '</a></div></div>', true);
      });
      chips([{ label: t("m5"), run: function(){ startChat("m5"); } }, { label: t("mainmenu"), run: viewMenu }]);
    });
  }
  // Later phases replace these (m2 AI search, m3 resources, m4 exam prep, m5 enquiry, m6 support).
  var CB = window.PQChatbot = { state: S, t: t, esc: esc, addMsg: addMsg, botSay: botSay, chips: chips, viewMenu: viewMenu,
    handlers: { m1: coursesHandler, m2: soon, m3: soon, m4: soon, m5: soon, m6: soon },
    onText: function(txt){ botSay(esc(t("unavailable")) + "<br>" + esc(t("soon"))).then(soonChips); } };
  function sendText(){
    var v = inp.value.trim(); if(!v) return; inp.value = "";
    if(/[؀-ۿ]/.test(v) && S.lang !== "ar"){ S.lang = "ar"; save(); chrome(); }
    addMsg("me", v); CB.onText(v);
  }

  // ---------- events ----------
  function setOpen(o){
    root.classList.toggle("open", o); fab.setAttribute("aria-expanded", o ? "true" : "false");
    if(o && !body.firstChild) (S.visitor ? viewMenu : viewContact)();
    if(o) setTimeout(function(){ var f = body.querySelector("input,button"); if(f && S.screen === "contact") f.focus(); }, 250); else fab.focus();
  }
  fab.onclick = function(){ setOpen(!root.classList.contains("open")); };
  root.addEventListener("click", function(e){
    var m = e.target.closest("[data-m]"); if(m){ startChat(m.getAttribute("data-m")); return; }
    var a = e.target.closest("[data-a]"); if(!a) return; var k = a.getAttribute("data-a");
    if(k === "close") setOpen(false);
    else if(k === "menu") viewMenu();
    else if(k === "lang"){ S.lang = S.lang === "ar" ? "en" : "ar"; save(); (S.screen === "contact" ? viewContact : S.screen === "menu" ? viewMenu : chrome)(); }
    else if(k === "forget"){ S.visitor = null; save(); viewContact(); }
  });
  $(".cb-send").onclick = sendText;
  inp.addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); sendText(); } });
  document.addEventListener("keydown", function(e){ if(e.key === "Escape" && root.classList.contains("open")) setOpen(false); });
  chrome();

  // Signed-in students: skip asking for what the account already holds (name/email); phone is still needed.
  try {
    if(window.PQFirebase && window.PQFirebase.onAuthChange) window.PQFirebase.onAuthChange(function(u){
      S.user = u && !u.needsProfile ? u : null;
      if(S.user && !S.visitor && (S.user.email || S.user.name)) { S.prefill = { name: S.user.name || "", email: S.user.email || "" }; S.visitor = null; }
    });
  } catch(e){}
})();
