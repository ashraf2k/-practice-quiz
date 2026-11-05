/* Student home card: shows days to the first exam once the student has built a timetable. */
(function(){
  "use strict";
  var D = window.PQ_TIMETABLE, TZ = 3 * 3600000;
  function plan(user){
    return new Promise(function(res){
      var local = null; try { local = JSON.parse(localStorage.getItem("pq_exam_plan_v1") || "null"); } catch(e){}
      if(window.PQFirebase && PQFirebase.getExamPlan && user && user.uid) PQFirebase.getExamPlan(user.uid).then(function(p){ res(p && p.items && p.items.length ? p : local); }, function(){ res(local); });
      else res(local);
    });
  }
  window.PQ_hubTT = function(user){
    var el = document.getElementById("hub-tt-meta"); if(!el || !D) return;
    plan(user).then(function(p){
      if(!p || !p.items || !p.items.length) return;
      var first = null, n = 0, tier = "E", qual = "91";
      p.items.forEach(function(it, i){ var x = String(it).split("|"); if(i === 0){ qual = x[0]; tier = x[1]; } });
      p.items.forEach(function(it){
        var x = String(it).split("|"), s = D.subjects.filter(function(o){ return o.qual === x[0] && o.name === x[2]; })[0]; if(!s) return;
        s.papers.forEach(function(pp){
          if(pp[2] !== "A" && pp[2] !== x[1]) return;
          if((pp[1] === "Practical" || pp[1] === "Alternative to Practical") && pp[0].charAt(0) !== (x[3] || "5")) return;
          n++; var d = D.year + "-" + pp[3]; if(!first || d < first) first = d;
        });
      });
      if(!first) return;
      var t = new Date(Date.now() + TZ), today = Math.floor(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()) / 86400000);
      var days = Math.round(Date.parse(first + "T00:00:00Z") / 86400000) - today;
      el.textContent = (days > 0 ? days + (days === 1 ? " day" : " days") + " to your first exam" : "Exams in progress") + " \u00b7 " + n + " papers \u00b7 tap to open your timetable";
    });
  };
})();
