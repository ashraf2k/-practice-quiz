/* chatbot-support.js - Phase 5: messages to the teacher / administrator and support requests (menu option 6),
   plus handover from the assistant ("Contact the teacher"). Saved to Firestore (chatMessages) via PQFirebase.submitChatMessage. */
(function(){
  "use strict";
  var CB = window.PQChatbot; if(!CB) return;
  var S = CB.state, esc = CB.esc;
  var OPTS = [
    { id:"teacher", kind:"message", recipient:"teacher", en:"Send a message to the teacher", ar:"أرسل رسالة إلى المعلّم" },
    { id:"admin", kind:"message", recipient:"administrator", en:"Message the administrator", ar:"راسل المسؤول" },
    { id:"technical", kind:"support", reason:"technical", recipient:"administrator", en:"Technical problem", ar:"مشكلة تقنية" },
    { id:"payment", kind:"support", reason:"payment", recipient:"administrator", en:"Payment question", ar:"سؤال عن الدفع" },
    { id:"registration", kind:"support", reason:"registration", recipient:"administrator", en:"Registration problem", ar:"مشكلة في التسجيل" },
    { id:"complaint", kind:"support", reason:"complaint", recipient:"administrator", en:"Complaint", ar:"شكوى" },
    { id:"general", kind:"support", reason:"general", recipient:"teacher", en:"General enquiry", ar:"استفسار عام" },
    { id:"human", kind:"support", reason:"human", recipient:"teacher", en:"Ask for direct assistance", ar:"طلب مساعدة مباشرة" }
  ];
  var X = {
    en:{ pick:"How would you like to contact us?", write:"Please type your message below. Your recent chat messages will be attached to help the teacher understand.", tooShort:"Please write at least 3 characters.",
      sending:"Sending your message…", okTeacher:"Your message has been successfully sent to the teacher. You will be contacted using the details you provided.", okAdmin:"Your message has been successfully sent to the administrator. You will be contacted using the details you provided.",
      okSupport:"Your support request has been submitted. The team will contact you using the details you provided. This is not live chat, so a reply may take some time.", refLbl:"Reference number",
      fail:"Sorry, your message could not be saved, so it has NOT been sent. Please check your connection and try again.", retry:"Try again", menu:"Main menu", cancel:"Cancel", wait:"You have just sent a message. Please wait half a minute before sending another.",
      handoverQ:"Would you like our support team to contact you about this?", yes:"Yes, contact me", no:"No, thanks", delete:"To ask for your personal data to be deleted, choose \"General enquiry\" and write that request." },
    ar:{ pick:"كيف تريد التواصل معنا؟", write:"اكتب رسالتك في الأسفل. ستُرفق رسائلك الأخيرة في المحادثة لمساعدة المعلّم على فهم طلبك.", tooShort:"اكتب 3 أحرف على الأقل.",
      sending:"جارٍ إرسال رسالتك…", okTeacher:"تم إرسال رسالتك بنجاح إلى المعلّم. سيتم التواصل معك عبر البيانات التي قدّمتها.", okAdmin:"تم إرسال رسالتك بنجاح إلى المسؤول. سيتم التواصل معك عبر البيانات التي قدّمتها.",
      okSupport:"تم تقديم طلب الدعم. سيتواصل معك الفريق عبر البيانات التي قدّمتها. هذه ليست محادثة مباشرة لذلك قد يستغرق الرد بعض الوقت.", refLbl:"رقم المرجع",
      fail:"عذراً، تعذّر حفظ رسالتك، لذلك لم تُرسَل. تحقق من الاتصال وحاول مجدداً.", retry:"حاول مجدداً", menu:"القائمة الرئيسية", cancel:"إلغاء", wait:"أرسلت رسالة للتو. انتظر نصف دقيقة قبل إرسال أخرى.",
      handoverQ:"هل تريد أن يتواصل معك فريق الدعم بخصوص هذا؟", yes:"نعم، تواصلوا معي", no:"لا، شكراً", delete:"لطلب حذف بياناتك الشخصية اختر \"استفسار عام\" واكتب الطلب." }
  };
  function x(k){ return X[S.lang][k]; }
  var lastSend = 0; try { lastSend = +localStorage.getItem("pq_cb_msg_t") || 0; } catch(e){}
  function newRef(prefix){
    var d = new Date(), p = function(n){ return String(n).padStart(2, "0"); }, al = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", r = "", a = new Uint8Array(5);
    (window.crypto || window.msCrypto).getRandomValues(a); for(var i = 0; i < 5; i++) r += al[a[i] % al.length];
    return prefix + "-" + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + "-" + r;
  }
  function courseHint(){ var p = location.pathname.split("/").pop(); return p === "learn.html" ? "igcse" : p === "as.html" ? "as" : p === "alevel.html" ? "a2" : null; }
  function menuChip(){ return { label: x("menu"), say: false, run: CB.viewMenu }; }

  function send(opt, text, extraReason){
    if(Date.now() - lastSend < 30000){ CB.botSay(esc(x("wait"))).then(function(){ CB.chips([menuChip()]); }); return; }
    var v = S.visitor || {}, kind = opt.kind, rec = { ref: newRef(kind === "support" ? "SUP" : "MSG"), kind: kind, recipient: opt.recipient, name: v.name || "", email: v.email, phone: v.phone, iso: v.iso || "",
      message: text.slice(0, 2000), page: (location.pathname.split("/").pop() || "index.html").slice(0, 200), senderType: S.user ? "student" : "visitor", lang: S.lang, consent: true, transcript: CB.transcript() };
    var reason = extraReason || opt.reason; if(reason) rec.reason = reason;
    var c = courseHint(); if(c) rec.course = c;
    if(!rec.name) delete rec.name; if(!rec.iso) delete rec.iso;
    var pending = CB.addMsg("bot", esc(x("sending")), true);
    var go = (window.PQFirebase && window.PQFirebase.submitChatMessage) ? window.PQFirebase.submitChatMessage(rec) : Promise.resolve({ ok: false });
    go.then(function(r){
      pending.remove();
      if(!r.ok){ CB.botSay(esc(x("fail"))).then(function(){ CB.chips([{ label: x("retry"), say: false, run: function(){ send(opt, text, extraReason); } }, menuChip()]); }); return; }
      lastSend = Date.now(); try { localStorage.setItem("pq_cb_msg_t", String(lastSend)); } catch(e){}
      var ok = kind === "support" ? x("okSupport") : (opt.recipient === "teacher" ? x("okTeacher") : x("okAdmin"));
      CB.botSay(esc(ok) + '<br><br><b>' + esc(x("refLbl")) + ':</b> <span dir="ltr">' + esc(r.ref) + '</span>').then(function(){ CB.chips([menuChip()]); });
    });
  }
  function compose(opt){
    CB.botSay(esc(x("write"))).then(function(){
      CB.setTextHandler(function(v){
        if(v.trim().length < 3){ CB.botSay(esc(x("tooShort"))).then(function(){ compose(opt); }); return; }
        send(opt, v.trim());
      });
      CB.chips([{ label: x("cancel"), say: false, run: function(){ CB.setTextHandler(null); CB.viewMenu(); } }]);
    });
  }
  CB.handlers.m6 = function(){
    CB.setTextHandler(null); if(CB.setMode) CB.setMode(null);
    CB.botSay(esc(x("pick"))).then(function(){
      CB.chips(OPTS.map(function(o){ return { label: o[S.lang], run: function(){ compose(o); } }; }));
      CB.addMsg("bot", '<small>' + esc(x("delete")) + '</small>', true);
    });
  };
  // Handover from the assistant (e.g. a question it could not answer): asks first, then saves the question and the chat so far.
  CB.handover = function(question){
    if(CB.setMode) CB.setMode(null);
    CB.botSay(esc(x("handoverQ"))).then(function(){
      CB.chips([{ label: x("yes"), run: function(){ send({ kind: "support", reason: "unanswered", recipient: "teacher" }, "Question the assistant could not answer: " + question); } }, { label: x("no"), run: CB.viewMenu }]);
    });
  };
})();
