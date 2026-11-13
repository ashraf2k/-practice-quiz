/* as-author.js -- small authoring helpers for the AS iLearn lesson files (as-t*.js). Loaded before them.
   ASA.text(label, marks, q, points, opts)   typed answer marked on keywords. points = [ [ "mark point as printed in the scheme", [keywords...] ], ... ]
        opts: max (default marks), lines, code, caps, lead (line printed above the scheme list), note (examiner comment), guide (extra scheme notes)
   ASA.fields(label, marks, q, fields, opts) short answers. fields = [ [ "label", [accepted...], "text"|"bin"|"hex", "answer shown", marks ] ]
   ASA.table(label, marks, q, head, rows, per, opts)   see as-pp.js
   ASA.pp(src, explain, parts, intro)        a whole past-paper question
   ASA.tbl(heads, rows), ASA.pre(text), ASA.mc, ASA.tx   as in learn-helpers.js */
(function(root){
  "use strict";
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function tbl(heads, rows){
    return "<table class='ln-table'>" + (heads ? "<tr>" + heads.map(function(h){ return "<th>" + h + "</th>"; }).join("") + "</tr>" : "") +
      rows.map(function(r){ return "<tr>" + r.map(function(c){ return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
  }
  function pre(s){ return "<pre class='ln-pre'>" + esc(s) + "</pre>"; }
  function list(items){ return "<ul>" + items.map(function(i){ return "<li>" + i + "</li>"; }).join("") + "</ul>"; }
  // A mark point is [ "text", anyOf ]  or  [ "text", groupA, groupB, ... ] (one word from EVERY group is needed).
  function kw(p){
    if(p.length <= 2) return p[1];
    var out = [[]];
    p.slice(1).forEach(function(g){ var n = []; out.forEach(function(o){ g.forEach(function(w){ n.push(o.concat([w])); }); }); out = n; });
    return out;
  }
  var ASA = root.ASA = {
    esc: esc, tbl: tbl, pre: pre, list: list, mc: root.ILQ.mc, tx: root.ILQ.tx, fill: root.ILQ.fill,
    text: function(label, marks, q, points, o){
      o = o || {};
      var max = o.max || marks;
      var sch = o.scheme || ("<p>" + (o.lead || (points.length > max ? "1 mark for each point, maximum " + max + " marks" : "1 mark for each point")) + "</p>" + list(points.map(function(p){ return p[0]; })) + (o.guide ? "<p><i>" + o.guide + "</i></p>" : ""));
      return { label: label, marks: marks, kind: "text", lines: o.lines, code: !!o.code, q: "<p>" + q + "</p>", points: points.map(function(p){ return { t: p[0], k: kw(p) }; }), max: max, caps: o.caps, scheme: sch, note: o.note, model: o.model };
    },
    fields: function(label, marks, q, flds, o){
      o = o || {};
      var sch = o.scheme || ("<p>" + (o.lead || "1 mark for each correct answer") + "</p>" + list(flds.map(function(f){ return esc(f[0]) + ": <b>" + esc(f[3] || f[1][0]) + "</b>"; })));
      return { label: label, marks: marks, kind: "fields", q: "<p>" + q + "</p>", fields: flds.map(function(f){ return { label: f[0], ans: f[1], cmp: f[2] || "text", show: f[3], marks: f[4] || 1 }; }), scheme: sch, note: o.note };
    },
    table: function(label, marks, q, head, rows, per, o){
      o = o || {};
      return { label: label, marks: marks, kind: "table", q: "<p>" + q + "</p>", head: head, rows: rows, per: per || "row", scheme: o.scheme || "", note: o.note };
    },
    pp: function(src, explain, parts, intro){ return { type: "pp", src: src, explain: explain, intro: intro, parts: parts }; },

    // ---- small animated diagrams for Chapter 2 (networks), CSS-only, no JS needed at render time ----
    // nodes = [{icon,label}, ...]; links = array of "wire"|"wifi" with length nodes.length-1 (default "wire")
    linkDiagram: function(nodes, links, caption){
      links = links || [];
      var icons = "", labels = "";
      nodes.forEach(function(n, i){
        icons += "<div class='an-ic'>" + n.icon + "</div>";
        labels += "<span>" + esc(n.label) + "</span>";
        if(i < nodes.length - 1){
          var wifi = links[i] === "wifi";
          icons += "<div class='an-line" + (wifi ? " wifi" : "") + "'><i class='an-dot' style='animation-delay:" + (i * .5) + "s'></i></div>";
          labels += "<span class='an-line-sp'></span>";
        }
      });
      return "<div class='an-wrap'><div class='an-icons'>" + icons + "</div><div class='an-labels'>" + labels + "</div>" + (caption ? "<p class='an-cap'>" + caption + "</p>" : "") + "</div>";
    },
    // a.b = {icon,label}; labelOut/labelBack = short bubble text travelling right then left, looping
    flowDiagram: function(a, b, labelOut, labelBack, caption){
      return "<div class='an-wrap'><div class='an-flow'>" +
        "<div class='an-box'><div class='an-ic'>" + a.icon + "</div><span>" + esc(a.label) + "</span></div>" +
        "<div class='an-flowtrack'><div class='an-bub out'>" + esc(labelOut) + "</div><div class='an-bub back'>" + esc(labelBack) + "</div></div>" +
        "<div class='an-box'><div class='an-ic'>" + b.icon + "</div><span>" + esc(b.label) + "</span></div>" +
        "</div>" + (caption ? "<p class='an-cap'>" + caption + "</p>" : "") + "</div>";
    },
    // like linkDiagram but with several dots in a row on one link, to show a continuous stream rather than one packet
    streamDiagram: function(a, b, caption){
      var dots = [0, .4, .8, 1.2].map(function(d){ return "<i class='an-dot' style='animation-delay:" + d + "s'></i>"; }).join("");
      return "<div class='an-wrap'><div class='an-icons'><div class='an-ic'>" + a.icon + "</div><div class='an-line stream'>" + dots + "</div><div class='an-ic'>" + b.icon + "</div></div>" +
        "<div class='an-labels'><span>" + esc(a.label) + "</span><span class='an-line-sp'></span><span>" + esc(b.label) + "</span></div>" +
        (caption ? "<p class='an-cap'>" + caption + "</p>" : "") + "</div>";
    },
    // expanding radar rings from an antenna / tower icon
    pulseDiagram: function(icon, label, caption){
      return "<div class='an-wrap'><div class='an-pulsebox'><div class='an-pulse r1'></div><div class='an-pulse r2'></div><div class='an-pulse r3'></div><div class='an-ic big' style='position:relative;z-index:1'>" + icon + "</div></div>" +
        "<p class='an-cap'><b>" + esc(label) + "</b></p>" + (caption ? "<p class='an-cap'>" + caption + "</p>" : "") + "</div>";
    },
    // left/right = {icon,label,note,active:"hi"|"lo"} -- "hi" side gets a gentle pulsing glow to show where the work/activity is
    compareDiagram: function(left, right, caption){
      function side(s){ return "<div class='an-side'><div class='an-ic big" + (s.active === "hi" ? " an-glow" : "") + "'>" + s.icon + "</div><b>" + esc(s.label) + "</b><small>" + s.note + "</small></div>"; }
      return "<div class='an-wrap'><div class='an-compare'>" + side(left) + "<div class='an-vs'>vs</div>" + side(right) + "</div>" + (caption ? "<p class='an-cap'>" + caption + "</p>" : "") + "</div>";
    },
    // star topology: hub in the middle, 4 devices around it, a packet travels hub <-> one device only
    starDiagram: function(caption){
      return "<div class='an-wrap'><div class='an-star'>" +
        "<div class='an-star-spoke s0'></div><div class='an-star-spoke s1'></div><div class='an-star-spoke s2'></div><div class='an-star-spoke s3'></div>" +
        "<div class='an-star-hub'>🔀</div>" +
        "<div class='an-star-node n0'>💻</div><div class='an-star-node n1'>🖨️</div><div class='an-star-node n2'>💻</div><div class='an-star-node n3'>🖥️</div>" +
        "<div class='an-star-dot'></div></div>" + (caption ? "<p class='an-cap'>" + caption + "</p>" : "") + "</div>";
    },
    // bus topology: one shared line, several devices tapped onto it, one packet travels the whole length
    busDiagram: function(caption){
      return "<div class='an-wrap'><div class='an-bus'><div class='an-bus-line'></div>" +
        "<div class='an-bus-node' style='left:8%'>💻</div><div class='an-bus-node' style='left:36%'>💻</div><div class='an-bus-node' style='left:64%'>🖨️</div><div class='an-bus-node' style='left:92%'>🖥️</div>" +
        "<div class='an-bus-dot'></div></div>" + (caption ? "<p class='an-cap'>" + caption + "</p>" : "") + "</div>";
    },
    // CSMA/CD: two devices on a shared line send toward each other, collide in the middle, flash, then both back off
    collisionDiagram: function(caption){
      return "<div class='an-wrap'><div class='an-bus'><div class='an-bus-line'></div>" +
        "<div class='an-bus-node' style='left:8%'>💻 A</div><div class='an-bus-node' style='left:92%'>💻 B</div>" +
        "<div class='an-csma-dot a'></div><div class='an-csma-dot b'></div><div class='an-csma-boom'>💥</div></div>" +
        (caption ? "<p class='an-cap'>" + caption + "</p>" : "") + "</div>";
    },
    // mesh topology: 4 devices all directly linked, a packet hops around the mesh via SVG motion (no CSS keyframes needed)
    meshDiagram: function(caption){
      return "<div class='an-wrap'><div class='an-mesh'>" +
        "<svg viewBox='0 0 168 150' class='an-mesh-svg'>" +
          "<line x1='84' y1='15' x2='20' y2='80'/><line x1='84' y1='15' x2='148' y2='80'/><line x1='84' y1='15' x2='84' y2='135'/>" +
          "<line x1='20' y1='80' x2='148' y2='80'/><line x1='20' y1='80' x2='84' y2='135'/><line x1='148' y1='80' x2='84' y2='135'/>" +
          "<circle class='an-mesh-dot' r='5' cx='84' cy='15'><animateMotion dur='4s' repeatCount='indefinite' path='M84,15 L20,80 L148,80 L84,135 L84,15'/></circle>" +
        "</svg>" +
        "<div class='an-mesh-node' style='left:84px;top:15px'>💻</div><div class='an-mesh-node' style='left:20px;top:80px'>💻</div>" +
        "<div class='an-mesh-node' style='left:148px;top:80px'>💻</div><div class='an-mesh-node' style='left:84px;top:135px'>💻</div>" +
        "</div>" + (caption ? "<p class='an-cap'>" + caption + "</p>" : "") + "</div>";
    }
  };
})(typeof window !== "undefined" ? window : this);
