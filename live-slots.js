/* Live sessions: the weekly timetable (Saudi Arabia time, UTC+3). Shared by live-session.html, the banner and the admin tab.
   open:true  = a bookable slot (must also be listed in liveSlotKeys() in firestore.rules)
   open:false = shown to students as "Not available". */
window.PQ_LIVE = {
  session: "May/June 2027",
  course: "IGCSE Computer Science 0478/0984",
  capacity: 5,
  trial: "Your first session is a free trial",
  minutes: 90,
  tzName: "Saudi Arabia time",
  tzOffsetMin: 180,
  days: [["sat","Saturday",6],["sun","Sunday",0],["mon","Monday",1],["tue","Tuesday",2],["wed","Wednesday",3],["thu","Thursday",4]],
  slots: [
    { key:"sat_1300", open:true  }, { key:"sat_1500", open:false }, { key:"sat_1700", open:true  },
    { key:"sun_1530", open:false }, { key:"sun_1730", open:false },
    { key:"mon_1600", open:false }, { key:"mon_1800", open:true  },
    { key:"tue_1530", open:false }, { key:"tue_1730", open:true  },
    { key:"wed_1530", open:false }, { key:"wed_1730", open:true  }, { key:"wed_1930", open:false },
    { key:"thu_1630", open:true  }, { key:"thu_1830", open:true  }
  ]
};
(function(){
  var L = window.PQ_LIVE;
  // Icon for a live session: a video camera with a red "on air" dot (inline SVG, no external file).
  L.icon = function(size){
    size = size || 28;
    return '<svg class="pq-live-ic" width="' + size + '" height="' + size + '" viewBox="0 0 32 32" fill="none" aria-hidden="true">' +
      '<circle class="pq-live-ring" cx="8.5" cy="14" r="4" stroke="#16a34a" stroke-width="1.6"/>' +
      '<g class="pq-live-cam"><rect x="2.5" y="8" width="18" height="16" rx="4" fill="currentColor" fill-opacity=".18" stroke="currentColor" stroke-width="2.4"/>' +
      '<path d="M20.5 14l7-4.2a1 1 0 0 1 1.5.9v14.6a1 1 0 0 1-1.5.9l-7-4.2" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/></g>' +
      '<circle class="pq-live-dot" cx="8.5" cy="14" r="3" fill="#16a34a"/></svg>';
  };
  function mins(key){ var t = key.split("_")[1]; return Number(t.slice(0, 2)) * 60 + Number(t.slice(2)); }
  function f12(m){ var h = Math.floor(m / 60) % 24, mm = m % 60, ap = h >= 12 ? "PM" : "AM"; h = h % 12 || 12; return h + ":" + (mm < 10 ? "0" : "") + mm + " " + ap; }
  L.dayName = function(key){ var d = L.days.filter(function(x){ return x[0] === key.split("_")[0]; })[0]; return d ? d[1] : key; };
  L.range = function(key){ var a = mins(key), b = a + L.minutes, A = f12(a), B = f12(b); return (A.slice(-2) === B.slice(-2) ? A.slice(0, -3) : A) + "–" + B; };
  L.label = function(key){ return L.dayName(key) + " " + L.range(key); };
  // Next occurrence of a slot as a UTC millisecond timestamp (the timetable is in Saudi time).
  L.nextStart = function(key, from){
    var d = L.days.filter(function(x){ return x[0] === key.split("_")[0]; })[0]; if(!d) return null;
    var now = from || Date.now(), m = mins(key), off = L.tzOffsetMin * 60000, loc = new Date(now + off);
    for(var i = 0; i < 8; i++){
      var day = new Date(Date.UTC(loc.getUTCFullYear(), loc.getUTCMonth(), loc.getUTCDate() + i));
      if(day.getUTCDay() !== d[2]) continue;
      var ts = day.getTime() + m * 60000 - off;
      if(ts > now) return ts;
    }
    return null;
  };
  // "Your time: 12:00 PM" - only when the viewer's time zone differs from the timetable's.
  L.localRange = function(key){
    var ts = L.nextStart(key); if(ts == null) return "";
    var offNow = -new Date(ts).getTimezoneOffset(); if(offNow === L.tzOffsetMin) return "";
    var f = function(t){ try { return new Date(t).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }); } catch(e){ return ""; } };
    var wd = ""; try { wd = new Date(ts).toLocaleDateString([], { weekday: "short" }); } catch(e){}
    return wd + " " + f(ts) + "–" + f(ts + L.minutes * 60000);
  };
  L.icsFor = function(key, name){
    var ts = L.nextStart(key); if(ts == null) return "";
    var z = function(t){ return new Date(t).toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z"); };
    var wd = { 0:"SU", 1:"MO", 2:"TU", 3:"WE", 4:"TH", 5:"FR", 6:"SA" }[L.days.filter(function(x){ return x[0] === key.split("_")[0]; })[0][2]];
    return ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//iLearnCS//Live session//EN","BEGIN:VEVENT","UID:live-" + key + "-" + ts + "@ilearncs",
      "DTSTAMP:" + z(Date.now()), "DTSTART:" + z(ts), "DTEND:" + z(ts + L.minutes * 60000), "RRULE:FREQ=WEEKLY;BYDAY=" + wd + ";UNTIL=20270630T000000Z",
      "SUMMARY:iLearnCS live session (small group)", "DESCRIPTION:Weekly online live session with your teacher. Maximum 5 students per group.", "END:VEVENT","END:VCALENDAR"].join("\r\n");
  };
})();
