/* "← Insert arrow" helper for pseudocode answers (iLearn 10BR/11BR/12BR and iSolve).
   Adds a small button under typed-answer boxes of pseudocode / programming questions that inserts the
   assignment arrow at the cursor. Typing "<-" also turns into the arrow. */
(function(){
  "use strict";
  var ARROW = "←";
  var SEL = "textarea.ln-text, textarea.pp-ans, textarea.exam-textarea";
  var CODEY = /pseudocode|algorithm|assign|declare|\bwhile\b|\brepeat\b|\bendif\b|\bnext\b|\bfor\b.*\bto\b|\binput\b|\boutput\b|\bprogram|\bcode\b|\bloop\b|\bvariable|\bprocedure\b|\bfunction\b|\barray\b|\bpointer\b|\bsubroutine\b|\bidentifier\b/i;

  function isCodey(ta){
    if(ta.classList.contains("pp-code")) return true;
    var c = ta.closest(".pp-paper, .pp-q, #screen-question, .ln-card, .card, section") || ta.parentNode;
    var txt = ""; try { txt = (c.textContent || "").slice(0, 4000); } catch(e){}
    return CODEY.test(txt);
  }
  function insertAt(ta){
    if(ta.disabled || ta.readOnly) return;
    var s = ta.selectionStart, e = ta.selectionEnd, v = ta.value;
    if(typeof s !== "number"){ s = e = v.length; }
    ta.value = v.slice(0, s) + ARROW + v.slice(e);
    ta.selectionStart = ta.selectionEnd = s + 1;
    ta.focus();
    ta.dispatchEvent(new Event("input", { bubbles: true }));
  }
  function enhance(ta){
    if(ta.getAttribute("data-arrow")) return;
    ta.setAttribute("data-arrow", "1");
    var bar = document.createElement("div"); bar.className = "arrow-bar"; bar.style.cssText = "margin:4px 0 6px;display:none";
    var b = document.createElement("button"); b.type = "button"; b.className = "btn btn-secondary arrow-btn";
    b.style.cssText = "padding:4px 12px;font-size:14px;font-weight:700";
    b.textContent = ARROW + " Insert assignment arrow";
    b.title = "Inserts the pseudocode assignment arrow (you can also type <- and it becomes " + ARROW + ")";
    b.addEventListener("mousedown", function(ev){ ev.preventDefault(); });
    b.addEventListener("click", function(){ insertAt(ta); });
    bar.appendChild(b); ta.insertAdjacentElement("afterend", bar);
    function refresh(){ bar.style.display = isCodey(ta) ? "" : "none"; b.disabled = !!ta.disabled; }
    refresh();
    ta.addEventListener("focus", refresh);
    ta.addEventListener("input", function(){
      var p = ta.selectionStart, v = ta.value;
      if(typeof p === "number" && p >= 2 && v.slice(p - 2, p) === "<-"){
        ta.value = v.slice(0, p - 2) + ARROW + v.slice(p); ta.selectionStart = ta.selectionEnd = p - 1;
      }
    });
  }
  function scan(root){ Array.prototype.forEach.call((root || document).querySelectorAll(SEL), enhance); }
  function start(){
    scan(document);
    new MutationObserver(function(muts){
      muts.forEach(function(m){ Array.prototype.forEach.call(m.addedNodes, function(n){
        if(n.nodeType !== 1) return; if(n.matches && n.matches(SEL)) enhance(n); if(n.querySelectorAll) scan(n);
      }); });
    }).observe(document.body, { childList: true, subtree: true });
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
