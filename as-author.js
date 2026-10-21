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
    pp: function(src, explain, parts, intro){ return { type: "pp", src: src, explain: explain, intro: intro, parts: parts }; }
  };
})(typeof window !== "undefined" ? window : this);
