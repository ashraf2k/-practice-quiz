/* Branded footer for every generated PDF: iLearnCS logo, round stamp and a QR code that opens the site.
   BrandFooter.band(doc, { x0, x1, y0, band, center })  draws one band at the given place on the current page.
   BrandFooter.apply(doc, { numbers:true })               draws the band at the bottom of every page. */
(function(root){
  "use strict";
  var B = root.BRAND;
  function band(doc, o){
    if(!B) return;
    var x0 = o.x0, x1 = o.x1, y0 = o.y0, h = o.band || 40;
    doc.setDrawColor(180, 182, 192); doc.setLineWidth(0.5); doc.line(x0, y0, x1, y0);
    var lh = Math.min(24, h - 12), lw = lh * B.aspect;
    try { doc.addImage(B.logo, "PNG", x0, y0 + 6, lw, lh); } catch(e){}
    doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.setTextColor(50, 64, 115);
    doc.text("iLearnCS  ·  Learn  ·  Practice  ·  Master", x0 + lw + 8, y0 + 14);
        var q = h - 4, qx = x1 - q;
    try { doc.addImage(B.qr, "PNG", qx, y0 + 3, q, q); } catch(e){}
    var s = h - 2, sx = qx - s - 6;
    try { doc.addImage(B.stamp, "PNG", sx, y0 + 2, s, s); } catch(e){}
    doc.setFont("helvetica", "normal"); doc.setFontSize(6.5); doc.setTextColor(90, 95, 115);
    doc.text("Scan to open", sx - 6, y0 + 15, { align: "right" }); doc.text("the iLearnCS site", sx - 6, y0 + 24, { align: "right" });
    if(o.center){ doc.setFontSize(8); doc.setTextColor(80, 80, 80); doc.text(o.center, (x0 + x1) / 2, y0 + 22, { align: "center" }); }
  }
  // light stamp in the middle of the page (drawn at about 11% strength, so the page stays easy to read)
  function watermark(doc){
    if(!B || !B.stampLight) return;
    var W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight(), s = Math.min(W, H) * 0.42;
    try { doc.addImage(B.stampLight, "PNG", (W - s) / 2, (H - s) / 2, s, s); } catch(e){}
  }
  function apply(doc, o){
    o = o || {}; var n = doc.internal.getNumberOfPages(), W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight(), m = o.margin || 36;
    for(var p = 1; p <= n; p++){
      doc.setPage(p);
      watermark(doc);
      band(doc, { x0: m, x1: W - m, y0: H - 42, band: 40, center: o.numbers ? "Page " + p + " of " + n : "" });
    }
  }
  root.BrandFooter = { band: band, apply: apply, watermark: watermark };
})(typeof window !== "undefined" ? window : this);
