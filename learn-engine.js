/* ============================================================
   learn-engine.js -- shared logic for iLearn (learn.html and the admin dashboard)
   Pure functions only: lesson ordering, spaced review, streaks, badges,
   progress merging and the keyword marker for typed answers.
   ============================================================ */
(function(root){
  "use strict";
  var S = root.SYLLABUS_OBJECTIVES || { OBJECTIVES:{}, TOPICS:{} };
  var O = S.OBJECTIVES;
  var DAY = 86400000;

  function esc(x){ return String(x == null ? "" : x).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function shuffle(a){ a = a.slice(); for(var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function today(d){ d = d || new Date(); var m = d.getMonth() + 1, dd = d.getDate(); return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (dd < 10 ? "0" : "") + dd; }

  var CODES = Object.keys(O);
  var CODE_INDEX = {}; CODES.forEach(function(c, i){ CODE_INDEX[c] = i; });
  var LESSONS = (root.ILEARN_LESSONS || []).map(function(l, i){ return { l: l, i: i }; })
    .sort(function(a, b){ var d = (CODE_INDEX[a.l.code] || 0) - (CODE_INDEX[b.l.code] || 0); return d || (a.i - b.i); })
    .map(function(x){ return x.l; });
  // Journey placement overrides (lesson id -> where it is taught).
  // Linear search (7.4c) and bubble sort (7.4d) work on arrays, so they are taught
  // in Topic 8 straight after 8.2 Arrays. They keep their syllabus code (7.4).
  var PLACE_NOTE = "Linear search and bubble sort work on arrays, so you learn them here, now that you know arrays (syllabus 7.4).";
  var PLACEMENTS = {
    "7.4c": { track: 8, after: "8.2.3b", note: PLACE_NOTE, away: "Linear search and bubble sort are taught in Topic 8, right after Arrays" },
    "7.4d": { track: 8, after: "8.2.3b", note: PLACE_NOTE, away: "Linear search and bubble sort are taught in Topic 8, right after Arrays" }
  };
  (function(){
    var moved = LESSONS.filter(function(l){ return PLACEMENTS[l.id]; });
    LESSONS = LESSONS.filter(function(l){ return !PLACEMENTS[l.id]; });
    var inserted = {};
    moved.forEach(function(l){
      var pl = PLACEMENTS[l.id]; l.track = pl.track; l.note = pl.note; l.away = pl.away;
      var anchor = pl.after || pl.before; l.after = pl.after || null; l.before = pl.before || null;
      var at = -1; LESSONS.forEach(function(x, i){ if(x.id === anchor) at = i; });
      if(at < 0){ LESSONS.push(l); return; }
      if(pl.after){ var n = (inserted[anchor] || 0); inserted[anchor] = n + 1; LESSONS.splice(at + 1 + n, 0, l); }
      else LESSONS.splice(at, 0, l);
    });
  })();
  var LESSON_BY_ID = {}; LESSONS.forEach(function(l){ LESSON_BY_ID[l.id] = l; });
  function lessonsOf(code){ return LESSONS.filter(function(l){ return l.code === code; }); }
  function topicOf(l){ return l.track || parseInt(O[l.code][0], 10); }
  function movedBefore(id){ return LESSONS.filter(function(l){ return l.before === id; }); }
  function movedAfter(id){ return LESSONS.filter(function(l){ return l.after === id; }); }

  function topicTree(){
    var topics = {};
    CODES.forEach(function(code){
      var name = O[code][0], tn = parseInt(name, 10);
      var t = topics[tn] || (topics[tn] = { num: tn, title: S.TOPICS[tn], secs: [], secBy: {} });
      var sec = t.secBy[name];
      if(!sec){ sec = t.secBy[name] = { name: name, units: [] }; t.secs.push(sec); }
      sec.units.push({ code: code, text: O[code][1] });
    });
    return topics;
  }

  // ---------- typed answers (keyword marking) ----------
  // q.groups = [[synonyms...], ...]; each group is one mark point; q.need = points needed (default all groups)
  function norm(s){ return " " + String(s || "").toLowerCase().replace(/[^a-z0-9\s+\-\/.']/g, " ").replace(/\s+/g, " ") + " "; }
  function gradeText(q, text){
    var t = norm(text), matched = 0;
    (q.groups || []).forEach(function(g){
      if(g.some(function(k){ return t.indexOf(String(k).toLowerCase()) !== -1; })) matched++;
    });
    var need = q.need || (q.groups || []).length;
    return { matched: matched, need: need, ok: matched >= need };
  }

  // ---------- progress record ----------
  // st = { learn:{lessonId:{d,f,a,t,rv,rc,pre}}, days:{"YYYY-MM-DD":n}, tests:{topic:{s,t,at}} }
  // resets: { topicNumber: timestamp } is written by the teacher when a
  // topic is reset. A copy of the progress (e.g. one still sitting in a
  // student's browser) that has not seen the latest reset for a topic is
  // stale for that topic, so its lessons, test and puzzle data for it are
  // ignored instead of bringing the old progress back.
  function emptyState(){ return { learn:{}, days:{}, tests:{}, games:{}, spent:{}, resets:{} }; }
  function pick(rec){ return rec && (rec.learn || rec.days || rec.tests || rec.games || rec.spent || rec.resets) ? rec : null; }
  function mergeState(a, b){
    var out = emptyState();
    var srcs = [pick(a), pick(b)];
    srcs.forEach(function(src){
      if(!src) return;
      Object.keys(src.resets || {}).forEach(function(k){ out.resets[k] = Math.max(out.resets[k] || 0, Number(src.resets[k]) || 0); });
    });
    function stale(src, tn){ var r = out.resets[tn]; return !!r && (Number((src.resets || {})[tn]) || 0) < r; }
    srcs.forEach(function(src){
      if(!src) return;
      var L = src.learn || {};
      Object.keys(L).forEach(function(k){
        var x = out.learn[k], y = L[k];
        if(!y) return;
        var les = LESSON_BY_ID[k]; if(les && stale(src, topicOf(les))) return;
        if(!x || (y.d && !x.d)) { out.learn[k] = y; return; }
        if(y.d && x.d){
          var tx = x.rv || x.t || 0, ty = y.rv || y.t || 0;
          if(ty > tx || (ty === tx && (y.f || 0) > (x.f || 0))) out.learn[k] = y;
        }
        // keep the time taken (seconds) whichever copy wins
        var keep = out.learn[k], other = keep === y ? x : y;
        if(keep && other && keep.d && other.d && !keep.s && other.s){ keep = out.learn[k] = Object.assign({}, keep, { s: other.s }); }
      });
      var D = src.days || {};
      Object.keys(D).forEach(function(k){ out.days[k] = Math.max(out.days[k] || 0, D[k] || 0); });
      var SP = src.spent || {};
      Object.keys(SP).forEach(function(k){
        var les = LESSON_BY_ID[k]; if(les && stale(src, topicOf(les))) return;
        out.spent[k] = Math.max(out.spent[k] || 0, Number(SP[k]) || 0);
      });
      var GM = src.games || {};
      Object.keys(GM).forEach(function(k){
        var les = LESSON_BY_ID[k]; if(les && stale(src, topicOf(les))) return;
        out.games[k] = Math.max(out.games[k] || 0, GM[k] || 0);
      });
      var T = src.tests || {};
      Object.keys(T).forEach(function(k){
        if(stale(src, Number(k))) return;
        var x = out.tests[k], y = T[k];
        if(y && (!x || y.s / y.t > x.s / x.t)) out.tests[k] = y;
      });
    });
    return out;
  }
  function snapshot(st){
    var done = LESSONS.filter(function(l){ return st.learn[l.id] && st.learn[l.id].d; }).length;
    return { learn: st.learn, days: st.days, tests: st.tests, games: st.games || {}, spent: st.spent || {}, xp: xp(st), learnDone: done, learnTotal: LESSONS.length, lastActive: Date.now(), resets: st.resets || {} };
  }

  // ---------- spaced review ----------
  function dueLessons(learn, now){
    now = now || Date.now();
    return LESSONS.filter(function(l){
      var r = learn[l.id]; if(!r || !r.d) return false;
      var base = r.rv || r.t || 0;
      if(!base) return !r.f;                    // old records without a date: weak ones are due now
      var days = (r.pre ? 3 : (r.f ? 7 : 1)) * Math.pow(2, Math.min(r.rc || 0, 4));
      return now - base >= days * DAY;
    }).sort(function(a, b){ var ra = learn[a.id], rb = learn[b.id]; return ((ra.rv || ra.t || 0) - (rb.rv || rb.t || 0)); });
  }

  // ---------- streak ----------
  function streak(days, now){
    var d = now ? new Date(now) : new Date(), n = 0;
    if(!days[today(d)]) d = new Date(d.getTime() - DAY);     // today not done yet: the streak is still alive until midnight
    while(days[today(d)]){ n++; d = new Date(d.getTime() - DAY); }
    return n;
  }

  // ---------- XP, levels and puzzles ----------
  var GAMES = root.ILEARN_GAMES || (root.ILEARN_GAMES = {});
  function gameCount(st){ return Object.keys(st.games || {}).filter(function(k){ return st.games[k] > 0; }).length; }
  function gameStars(st){ return Object.keys(st.games || {}).reduce(function(n, k){ return n + (st.games[k] || 0); }, 0); }
  function xp(st){
    var done = 0, mast = 0;
    LESSONS.forEach(function(l){ var r = st.learn[l.id]; if(r && r.d){ done++; if(r.f) mast++; } });
    var passed = Object.keys(st.tests || {}).filter(function(k){ var r = st.tests[k]; return r && r.s / r.t >= 0.8; }).length;
    return done * 10 + mast * 5 + gameStars(st) * 5 + passed * 50;
  }
  var LEVELS = [[0, "Rookie"], [100, "Apprentice"], [300, "Coder"], [600, "Hacker"], [1000, "Wizard"], [1500, "Legend"]];
  function level(x){
    var cur = LEVELS[0], next = null;
    LEVELS.forEach(function(l, i){ if(x >= l[0]){ cur = l; next = LEVELS[i + 1] || null; } });
    return { name: cur[1], from: cur[0], next: next ? next[0] : null, nextName: next ? next[1] : null };
  }

  // ---------- badges ----------
  function badges(st, tree){
    var done = LESSONS.filter(function(l){ return st.learn[l.id] && st.learn[l.id].d; });
    var mast = done.filter(function(l){ return st.learn[l.id].f; }).length;
    var sk = streak(st.days), list = [
      { icon:"🌱", name:"First lesson", how:"Complete your first lesson", on: done.length >= 1 },
      { icon:"📚", name:"10 lessons", how:"Complete 10 lessons", on: done.length >= 10 },
      { icon:"🌟", name:"10 mastered", how:"Master 10 lessons at the first attempt", on: mast >= 10 },
      { icon:"🔥", name:"3-day streak", how:"Learn on 3 days in a row", on: sk >= 3 || maxStreak(st.days) >= 3 },
      { icon:"⚡", name:"7-day streak", how:"Learn on 7 days in a row", on: maxStreak(st.days) >= 7 },
      { icon:"🎮", name:"Puzzle fan", how:"Finish 5 puzzles", on: gameCount(st) >= 5 },
      { icon:"🧩", name:"Puzzle master", how:"Get 3 stars on 10 puzzles", on: Object.keys(st.games || {}).filter(function(k){ return st.games[k] >= 3; }).length >= 10 }
    ];
    Object.keys(TESTS).forEach(function(tn){
      var r = st.tests[tn];
      list.push({ icon:"🏅", name:"Topic " + tn, how:"Score 80% or more in the Topic " + tn + " test", on: !!(r && r.s / r.t >= 0.8 && !r.skip) });
    });
    return list;
  }
  function maxStreak(days){
    var keys = Object.keys(days).sort(), best = 0, run = 0, prev = null;
    keys.forEach(function(k){
      var d = new Date(k + "T12:00:00");
      run = (prev && Math.round((d - prev) / DAY) === 1) ? run + 1 : 1;
      if(run > best) best = run; prev = d;
    });
    return best;
  }

  function keyIdea(l){ var q = l.checks[l.checks.length - 1]; return esc(q.type === "text" ? (q.model || q.explain || "") : (q.explain || "")); }

  var TESTS = root.ILEARN_TESTS || (root.ILEARN_TESTS = {});

  root.ILearnEngine = {
    esc: esc, shuffle: shuffle, today: today, CODES: CODES, LESSONS: LESSONS, LESSON_BY_ID: LESSON_BY_ID, TESTS: TESTS,
    lessonsOf: lessonsOf, topicOf: topicOf, movedBefore: movedBefore, movedAfter: movedAfter, topicTree: topicTree, gradeText: gradeText, emptyState: emptyState,
    mergeState: mergeState, snapshot: snapshot, dueLessons: dueLessons, streak: streak, maxStreak: maxStreak, badges: badges, keyIdea: keyIdea, GAMES: GAMES, xp: xp, level: level, gameCount: gameCount, gameStars: gameStars
  };
})(typeof window !== "undefined" ? window : this);
