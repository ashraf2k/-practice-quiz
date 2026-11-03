/* chatbot-enquiry.js - Phase 4: guided course enquiry (menu option 5). Saves to Firestore through PQFirebase.submitCourseEnquiry. */
(function(){
  "use strict";
  var CB = window.PQChatbot; if(!CB) return;
  var S = CB.state, esc = CB.esc;
  var Q = {
    course:{ en:"Which course are you interested in?", ar:"أي دورة تهمّك؟", skip:false, opts:[["igcse",{en:"Cambridge IGCSE Computer Science (0478/0984)",ar:"كامبريدج IGCSE علوم الحاسوب (0478/0984)"}],["as",{en:"Cambridge International AS Level Computer Science (9618)",ar:"كامبريدج AS Level علوم الحاسوب (9618)"}],["a2",{en:"Cambridge International A Level Computer Science (9618)",ar:"كامبريدج A Level علوم الحاسوب (9618)"}],["other",{en:"Other / Not sure",ar:"أخرى / لست متأكداً"}]] },
    session:{ en:"What is your examination session?", ar:"ما هي دورة الامتحان؟", opts:[["mayjune",{en:"May/June",ar:"مايو/يونيو"}],["octnov",{en:"October/November",ar:"أكتوبر/نوفمبر"}],["undecided",{en:"Not decided yet",ar:"لم أقرر بعد"}]] },
    lessonType:{ en:"What type of lessons do you prefer?", ar:"ما نوع الدروس التي تفضّلها؟", opts:[["individual",{en:"Individual online lessons",ar:"دروس فردية عبر الإنترنت"}],["group",{en:"Small-group online lessons",ar:"دروس جماعية صغيرة عبر الإنترنت"}],["advice",{en:"Need advice",ar:"أحتاج إلى نصيحة"}]] },
    schedule:{ en:"What is your preferred schedule?", ar:"ما الجدول المفضّل لديك؟", opts:[["weekdays",{en:"Weekdays",ar:"أيام الأسبوع"}],["weekends",{en:"Weekends",ar:"عطلة نهاية الأسبوع"}],["flexible",{en:"Flexible",ar:"مرن"}]] },
    level:{ en:"What is your current level?", ar:"ما مستواك الحالي؟", opts:[["beginner",{en:"Beginner",ar:"مبتدئ"}],["intermediate",{en:"Intermediate",ar:"متوسط"}],["advanced",{en:"Advanced",ar:"متقدم"}],["studying",{en:"Already studying the syllabus",ar:"أدرس المنهج بالفعل"}]] },
    comments:{ en:"Is there anything specific you would like the teacher to know? (type it below, or skip)", ar:"هل هناك ما تودّ أن يعرفه المعلّم؟ (اكتبه في الأسفل أو تخطَّ)", text:true }
  };
  var ORDER = ["course", "session", "lessonType", "schedule", "level", "comments"];
  var LBL = { course:{en:"Course",ar:"الدورة"}, session:{en:"Exam session",ar:"دورة الامتحان"}, lessonType:{en:"Lesson type",ar:"نوع الدروس"}, schedule:{en:"Schedule",ar:"الجدول"}, level:{en:"Level",ar:"المستوى"}, comments:{en:"Notes for the teacher",ar:"ملاحظات للمعلّم"} };
  var X = {
    en:{ skip:"Skip", notSure:"Not sure which course? IGCSE is the first Cambridge Computer Science qualification, AS Level is the first part of the A Level, and A Level continues from AS.", summary:"Please check your enquiry:", contact:"Contact", confirm:"Confirm and send", edit:"Change", cancel:"Cancel", saving:"Saving your enquiry…",
      thanks:"Thank you! Your course enquiry has been successfully submitted. Our team will review your requirements and contact you using the details you provided.", refLbl:"Your reference number", noBook:"Please note: submitting an enquiry does not mean that a course has been booked.",
      fail:"Sorry, your enquiry could not be saved, so it has NOT been sent. Please check your connection and try again.", retry:"Try again", wait:"You have just sent an enquiry. Please wait a minute before sending another.", menu:"Main menu", none:"Not provided", changeWhich:"What would you like to change?" },
    ar:{ skip:"تخطّي", notSure:"لست متأكداً؟ IGCSE هي أول مؤهل في علوم الحاسوب من كامبريدج، وAS Level هو الجزء الأول من A Level، وA Level يكمل بعد AS.", summary:"يرجى مراجعة استفسارك:", contact:"بيانات التواصل", confirm:"تأكيد وإرسال", edit:"تعديل", cancel:"إلغاء", saving:"جارٍ حفظ استفسارك…",
      thanks:"شكراً لك! تم إرسال استفسارك عن الدورة بنجاح. سيراجع فريقنا متطلباتك ويتواصل معك عبر البيانات التي قدّمتها.", refLbl:"رقم المرجع الخاص بك", noBook:"ملاحظة: إرسال الاستفسار لا يعني أن الدورة قد تم حجزها.",
      fail:"عذراً، تعذّر حفظ استفسارك، لذلك لم يُرسَل. تحقق من الاتصال وحاول مجدداً.", retry:"حاول مجدداً", wait:"أرسلت استفساراً للتو. انتظر دقيقة قبل إرسال آخر.", menu:"القائمة الرئيسية", none:"غير محدد", changeWhich:"ما الذي تريد تعديله؟" }
  };
  function x(k){ return X[S.lang][k]; }
  function optLabel(key, val){ var o = Q[key].opts.filter(function(a){ return a[0] === val; })[0]; return o ? o[1][S.lang] : ""; }
  var ans = {}, awaitingText = false, lastSend = 0;
  try { lastSend = +localStorage.getItem("pq_cb_enq_t") || 0; } catch(e){}

  function ask(i, fromSummary){
    var key = ORDER[i]; if(!key){ summary(); return; }
    var q = Q[key];
    function next(){ if(fromSummary) summary(); else ask(i + 1); }
    var pre = key === "course" && S.lang ? null : null;
    CB.botSay(esc(q[S.lang])).then(function(){
      if(q.text){
        awaitingText = true; CB.setTextHandler(function(v){ awaitingText = false; ans.comments = v.slice(0, 1000); next(); });
        CB.chips([{ label: x("skip"), say: false, run: function(){ awaitingText = false; CB.setTextHandler(null); delete ans.comments; next(); } }]);
        return;
      }
      var chips = q.opts.map(function(o){ return { label: o[1][S.lang], run: function(){ ans[key] = o[0]; if(key === "course" && o[0] === "other") CB.botSay(esc(x("notSure"))).then(next); else next(); } }; });
      if(q.skip !== false) chips.push({ label: x("skip"), say: false, run: function(){ delete ans[key]; next(); } });
      CB.chips(chips);
    });
  }
  function summary(){
    var v = S.visitor || {}, lines = ORDER.filter(function(k){ return ans[k]; }).map(function(k){ return "<b>" + esc(LBL[k][S.lang]) + ":</b> " + esc(Q[k].text ? ans[k] : optLabel(k, ans[k])); });
    var html = esc(x("summary")) + '<br><br>' + lines.join("<br>") + '<br><br><b>' + esc(x("contact")) + ':</b> ' + esc(v.name || "") + ' ' + esc(v.email || "") + ' <span dir="ltr">' + esc(v.phone || "") + '</span>';
    CB.botSay(html).then(function(){ CB.chips([{ label: x("confirm"), say: false, run: submit }, { label: x("edit"), say: false, run: chooseEdit }, { label: x("cancel"), say: false, run: function(){ ans = {}; CB.viewMenu(); } }]); });
  }
  function chooseEdit(){
    CB.botSay(esc(x("changeWhich"))).then(function(){ CB.chips(ORDER.map(function(k, i){ return { label: LBL[k][S.lang], say: false, run: function(){ ask(i, true); } }; })); });
  }
  function newRef(){
    var d = new Date(), p = function(n){ return String(n).padStart(2, "0"); }, al = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", r = "", a = new Uint8Array(5);
    (window.crypto || window.msCrypto).getRandomValues(a); for(var i = 0; i < 5; i++) r += al[a[i] % al.length];
    return "ENQ-" + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + "-" + r;
  }
  function submit(){
    if(Date.now() - lastSend < 60000){ CB.botSay(esc(x("wait"))).then(function(){ CB.chips([{ label: x("menu"), say: false, run: CB.viewMenu }]); }); return; }
    var v = S.visitor || {}, rec = { ref: newRef(), name: v.name || "", email: v.email, phone: v.phone, iso: v.iso || "", course: ans.course || "other", consent: true, lang: S.lang, page: (location.pathname.split("/").pop() || "index.html").slice(0, 200), senderType: S.user ? "student" : "visitor" };
    ["session", "lessonType", "schedule", "level", "comments"].forEach(function(k){ if(ans[k]) rec[k] = ans[k]; });
    if(!rec.name) delete rec.name; if(!rec.iso) delete rec.iso;
    var pending = CB.addMsg("bot", esc(x("saving")), true);
    var go = (window.PQFirebase && window.PQFirebase.submitCourseEnquiry) ? window.PQFirebase.submitCourseEnquiry(rec) : Promise.resolve({ ok: false });
    go.then(function(r){
      pending.remove();
      if(!r.ok){ CB.botSay(esc(x("fail"))).then(function(){ CB.chips([{ label: x("retry"), say: false, run: submit }, { label: x("menu"), say: false, run: CB.viewMenu }]); }); return; }
      lastSend = Date.now(); try { localStorage.setItem("pq_cb_enq_t", String(lastSend)); } catch(e){}
      ans = {};
      CB.botSay(esc(x("thanks")) + '<br><br><b>' + esc(x("refLbl")) + ':</b> <span dir="ltr">' + esc(r.ref) + '</span><br><small>' + esc(x("noBook")) + '</small>').then(function(){ CB.chips([{ label: x("menu"), say: false, run: CB.viewMenu }]); });
    });
  }
  CB.handlers.m5 = function(){ ans = {}; CB.setTextHandler(null); if(CB.setMode) CB.setMode(null); ask(0); };
})();
