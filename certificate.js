/* iLearn certificate of completion (A4 landscape PDF, drawn with jsPDF).
   Cert.build({ name, dateText, pct, grade, lessons, lessonsTotal, mastered, testsPassed, testsTaken, course, topics })
   -> jsPDF document.  Cert.download(opts) saves it.
   The student's name is drawn on a canvas and placed as an image so any
   script (for example Arabic) displays correctly. */
(function(root){
  "use strict";
  var NAVY = [20, 48, 95], GOLD = [184, 146, 58], INK = [38, 44, 58], CREAM = [251, 248, 241], PEN = [27, 47, 107];
  function id6(s){ var h = 2166136261; for(var i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return ("000000" + (h >>> 0).toString(16).toUpperCase()).slice(-6); }
  function nameImage(name){
    var c = document.createElement("canvas"), W = 1600, H = 190; c.width = W; c.height = H;
    var x = c.getContext("2d"); x.clearRect(0, 0, W, H);
    var size = 120, fam = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,'Times New Roman',serif";
    x.fillStyle = "rgb(" + NAVY.join(",") + ")"; x.textAlign = "center"; x.textBaseline = "middle";
    do { x.font = "italic " + size + "px " + fam; size -= 4; } while(x.measureText(name).width > W - 60 && size > 36);
    x.fillText(name, W / 2, H / 2);
    return c.toDataURL("image/png");
  }
  function spaced(doc, t, x, y, cs){ doc.text(t, x, y, { align: "center", charSpace: cs }); }
  function corner(doc, x, y, sx, sy){
    doc.setDrawColor.apply(doc, GOLD); doc.setLineWidth(1);
    doc.lines([[sx * 26, 0], [0, sy * 26]], x, y, [1, 1], "S");
    doc.setLineWidth(0.6);
    doc.circle(x + sx * 34, y + sy * 34, 2.2, "S");
    doc.lines([[sx * 14, 0], [0, sy * 14]], x + sx * 8, y + sy * 8, [1, 1], "S");
  }
  function signature(doc, x, y){
    // a flowing, hand-written style signature (vector strokes)
    doc.setDrawColor.apply(doc, PEN); doc.setLineCap("round"); doc.setLineJoin("round");
    doc.setLineWidth(1.6);
    doc.lines([[6, -22, 14, -34, 18, -30], [4, 5, -2, 22, -4, 30], [-3, 9, 7, 2, 12, -12], [6, -16, 10, -26, 16, -24]], x, y, [1, 1], "S");           // A
    doc.setLineWidth(1.3);
    doc.lines([[10, -6, 20, -14, 28, -8], [6, 5, -2, 12, 6, 10], [8, -3, 16, -20, 26, -14], [8, 5, 0, 14, 8, 12], [10, -4, 18, -18, 30, -10]], x + 22, y - 4, [1, 1], "S");
    doc.lines([[10, -2, 20, -22, 34, -26], [10, -4, 12, 14, 24, 8], [10, -6, 20, -14, 34, -8], [16, 6, 30, -10, 48, -4]], x + 50, y - 3, [1, 1], "S");
    doc.lines([[6, -14, 16, -18, 22, -6], [4, 8, 12, 14, 20, 6], [10, -10, 14, -22, 24, -14]], x + 98, y, [1, 1], "S");
    doc.setLineWidth(1.1);
    doc.lines([[30, 4, 64, -6, 100, 2]], x + 18, y + 12, [1, 1], "S");                                                                        // underline flourish
    doc.lines([[10, -3, 22, -3, 30, 2]], x + 90, y + 17, [1, 1], "S");
  }
  function seal(doc, cx, cy){
    doc.setFillColor.apply(doc, GOLD); doc.circle(cx, cy, 36, "F");
    doc.setDrawColor(255, 244, 214); doc.setLineWidth(1.2); doc.circle(cx, cy, 31, "S"); doc.setLineWidth(0.5); doc.circle(cx, cy, 27, "S");
    doc.setTextColor(255, 255, 255); doc.setFont("times", "bold"); doc.setFontSize(9);
    spaced(doc, "ILEARN", cx, cy - 4, 1.4); doc.setFontSize(7); spaced(doc, "COMPLETED", cx, cy + 6, 0.9);
    // star
    doc.setFillColor(255, 255, 255);
    var pts = [], k; for(k = 0; k < 10; k++){ var a = -Math.PI / 2 + k * Math.PI / 5, r = (k % 2 ? 2.6 : 6); pts.push([cx + r * Math.cos(a), cy - 15 + r * Math.sin(a)]); }
    var segs = []; for(k = 1; k < 10; k++) segs.push([pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]]);
    doc.lines(segs, pts[0][0], pts[0][1], [1, 1], "F", true);
  }
  function build(o){
    var jsPDF = root.jspdf && root.jspdf.jsPDF; if(!jsPDF) throw new Error("jsPDF not loaded");
    var doc = new jsPDF({ unit: "pt", format: "a4", orientation: "landscape" });
    var W = 841.89, H = 595.28, cx = W / 2;
    doc.setFillColor.apply(doc, CREAM); doc.rect(0, 0, W, H, "F");
    doc.setDrawColor.apply(doc, NAVY); doc.setLineWidth(5); doc.rect(20, 20, W - 40, H - 40, "S");
    doc.setDrawColor.apply(doc, GOLD); doc.setLineWidth(1.2); doc.rect(30, 30, W - 60, H - 60, "S");
    corner(doc, 38, 38, 1, 1); corner(doc, W - 38, 38, -1, 1); corner(doc, 38, H - 38, 1, -1); corner(doc, W - 38, H - 38, -1, -1);

    doc.setTextColor.apply(doc, GOLD); doc.setFont("times", "bold"); doc.setFontSize(12); spaced(doc, "iLEARN  ·  iSOLVE", cx, 66, 3);
    doc.setTextColor.apply(doc, NAVY); doc.setFont("times", "bold"); doc.setFontSize(38); spaced(doc, "CERTIFICATE", cx, 108, 7);
    doc.setFontSize(15); doc.setTextColor.apply(doc, GOLD); spaced(doc, "OF  COMPLETION", cx, 132, 6);
    doc.setDrawColor.apply(doc, GOLD); doc.setLineWidth(0.8); doc.line(cx - 90, 144, cx - 8, 144); doc.line(cx + 8, 144, cx + 90, 144);
    doc.setFillColor.apply(doc, GOLD); doc.circle(cx, 144, 2.4, "F");

    doc.setFont("times", "italic"); doc.setFontSize(14); doc.setTextColor.apply(doc, INK); doc.text("This is to certify that", cx, 172, { align: "center" });
    doc.addImage(nameImage(o.name), "PNG", cx - 260, 176, 520, 62);
    doc.setDrawColor.apply(doc, GOLD); doc.setLineWidth(0.9); doc.line(cx - 230, 244, cx + 230, 244);

    doc.setFont("times", "normal"); doc.setFontSize(13.5); doc.setTextColor.apply(doc, INK);
    var l1 = "has successfully completed the full iLearn learning journey for", l2 = o.course, l3 = o.topics;
    doc.text(l1, cx, 268, { align: "center" });
    doc.setFont("times", "bold"); doc.setFontSize(17); doc.setTextColor.apply(doc, NAVY); doc.text(l2, cx, 291, { align: "center" });
    doc.setFont("times", "normal"); doc.setFontSize(12.5); doc.setTextColor.apply(doc, INK); doc.text(l3, cx, 312, { align: "center" });

    // performance panel
    var px = cx - 270, py = 330, pw = 540, ph = 74;
    doc.setFillColor(255, 255, 255); doc.setDrawColor.apply(doc, GOLD); doc.setLineWidth(0.9); doc.roundedRect(px, py, pw, ph, 6, 6, "FD");
    var cols = [
      [o.pct + "%", "OVERALL PERFORMANCE"],
      [o.lessons + " / " + o.lessonsTotal, "LESSONS COMPLETED"],
      [o.testsPassed + " / " + o.testsTaken, "TOPIC TESTS PASSED"],
      [o.grade, "ACHIEVEMENT"]
    ];
    var cw = pw / 4;
    cols.forEach(function(c, i){
      var mx = px + cw * i + cw / 2;
      doc.setFont("times", "bold"); doc.setFontSize(i === 3 ? 19 : 23); doc.setTextColor.apply(doc, i === 3 ? GOLD : NAVY); doc.text(String(c[0]), mx, py + 33, { align: "center" });
      doc.setFont("helvetica", "bold"); doc.setFontSize(6.6); doc.setTextColor(110, 116, 130); spaced(doc, c[1], mx, py + 52, 0.6);
      if(i) { doc.setDrawColor(226, 214, 184); doc.setLineWidth(0.6); doc.line(px + cw * i, py + 14, px + cw * i, py + ph - 14); }
    });

    // footer: date, seal, signature
    var fy = 478;
    doc.setFont("times", "bold"); doc.setFontSize(13); doc.setTextColor.apply(doc, INK); doc.text(o.dateText, 150, fy - 6, { align: "center" });
    doc.setDrawColor.apply(doc, INK); doc.setLineWidth(0.7); doc.line(70, fy, 230, fy);
    doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor(110, 116, 130); doc.text("DATE", 150, fy + 13, { align: "center" });
    seal(doc, cx, fy - 12);
    if(root.CERT_SIG){ try{ doc.addImage(root.CERT_SIG, "PNG", W - 152 - 45, fy - 44, 90, 90 * 361 / 700); }catch(e){ signature(doc, W - 255, fy - 24); } }
    else signature(doc, W - 255, fy - 24);
    doc.setDrawColor.apply(doc, INK); doc.setLineWidth(0.7); doc.line(W - 235, fy, W - 70, fy);
    doc.setFont("times", "bold"); doc.setFontSize(12.5); doc.setTextColor.apply(doc, INK); doc.text("Mr. Ashraf Elbialy", W - 152, fy + 14, { align: "center" });
    doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor(110, 116, 130); doc.text("Computer Science Teacher", W - 152, fy + 26, { align: "center" });

    doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.setTextColor(150, 154, 165);
    doc.text("Certificate no. IL-" + id6(o.name + "|" + o.dateText + "|" + o.pct), cx, H - 40, { align: "center" });
    doc.setProperties({ title: "iLearn Certificate of Completion - " + o.name, author: "iLearn" });
    return doc;
  }
  function download(o){ var d = build(o); d.save("iLearn-certificate-" + String(o.name).replace(/[^A-Za-z0-9؀-ۿ]+/g, "-").replace(/^-|-$/g, "") + ".pdf"); }
  root.Cert = { build: build, download: download };
})(window);
