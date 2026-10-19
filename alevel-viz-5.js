/* A Level iLearn visuals, part 5: multitasking and process states (16.1.3).
   One interactive state diagram with three modes: Explore (move processes yourself), Auto simulation (watch the scheduler work,
   pre-emptive or not) and Challenge (answer questions by clicking the states and arrows). Original artwork drawn in code. */
(function(root){
  "use strict";
  var V = root.ILEARN_VIZ, el = V.el, btn = V.btn, row = V.row, esc = V.esc;

  V.reg("pstates", function(box){
    var NAMES = ["Browser", "Music player", "Word processor", "Game"], mode = "explore", sel = 1, preempt = true, rnd, ticks, busy, slice0 = 3;
    var procs, ready, run, blocked, locked = false;
    var log = el("div", "vlog"), tabs = row(), ctl = row(), pcbBox = el("div", "vres"), qBox = el("div", "vres");
    qBox.style.display = "none";
    var stop = null, qi = 0, score = 0, answered = false, Q;

    /* ---------- the diagram ---------- */
    var BOX = { ready: [20, 90, 250, 200], run: [490, 20, 250, 140], blocked: [490, 230, 250, 140] };
    var ARR = {
      r2run: { p: [270, 125, 490, 62], l: "Dispatch", lx: 372, ly: 82, a: "middle" },
      run2r: { p: [490, 122, 270, 184], l: "Time slice ends", lx: 372, ly: 196, a: "middle" },
      run2b: { p: [540, 160, 540, 230], l: "I/O request", lx: 532, ly: 200, a: "end" },
      b2r: { p: [490, 300, 270, 250], l: "I/O complete", lx: 372, ly: 298, a: "middle" },
      b2run: { p: [690, 230, 690, 160], l: "Not allowed", lx: 682, ly: 200, a: "end", bad: 1 }
    };
    function head(x1, y1, x2, y2){
      var a = Math.atan2(y2 - y1, x2 - x1), s = 11, p1 = [x2 - s * Math.cos(a - .45), y2 - s * Math.sin(a - .45)], p2 = [x2 - s * Math.cos(a + .45), y2 - s * Math.sin(a + .45)];
      return x2 + "," + y2 + " " + p1[0].toFixed(1) + "," + p1[1].toFixed(1) + " " + p2[0].toFixed(1) + "," + p2[1].toFixed(1);
    }
    var inner = "";
    [["ready", "READY queue", "wa"], ["run", "RUNNING on the CPU", "ok"], ["blocked", "BLOCKED (waiting)", "no"]].forEach(function(b){
      var r = BOX[b[0]];
      inner += '<g class="stbox" data-s="' + b[0] + '" tabindex="-1" role="button"><rect class="' + b[2] + '" x="' + r[0] + '" y="' + r[1] + '" width="' + r[2] + '" height="' + r[3] + '" rx="14"/><text class="b" x="' + (r[0] + 14) + '" y="' + (r[1] + 24) + '">' + b[1] + "</text></g>";
    });
    Object.keys(ARR).forEach(function(k){
      var a = ARR[k], p = a.p;
      inner += '<g class="arrg' + (a.bad ? " bad" : "") + '" data-a="' + k + '" tabindex="0" role="button" aria-label="' + a.l + '"><line class="arr" x1="' + p[0] + '" y1="' + p[1] + '" x2="' + p[2] + '" y2="' + p[3] + '"/><polygon class="arh" points="' + head(p[0], p[1], p[2], p[3]) + '"/>' +
        '<line class="hit" x1="' + p[0] + '" y1="' + p[1] + '" x2="' + p[2] + '" y2="' + p[3] + '"/><text class="al' + (a.bad ? " bd" : "") + '" x="' + a.lx + '" y="' + a.ly + '" text-anchor="' + a.a + '">' + (a.bad ? "✗ " : "") + a.l + "</text></g>";
    });
    inner += '<text id="regs" class="b mono" x="600" y="86"></text><text id="regs2" class="b mono" x="600" y="106"></text><g id="dots"></g>';
    for(var i = 0; i < 4; i++) inner += '<g class="tk t' + i + '" data-p="' + (i + 1) + '" tabindex="0" role="button" aria-label="P' + (i + 1) + ' ' + NAMES[i] + '"><circle r="21"/><text class="b mid" y="5">P' + (i + 1) + "</text></g>";
    var svg = V.svg(760, 390, inner);
    svg.setAttribute("aria-label", "State diagram with the three process states ready, running and blocked and the four allowed changes between them");
    var tk = [null]; for(i = 1; i <= 4; i++) tk.push(svg.querySelector('.tk[data-p="' + i + '"]'));

    /* ---------- the model ---------- */
    function seed(){ var s = 20261019; rnd = function(){ s = (s + 0x6D2B79F5) | 0; var t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
    function reset(){
      seed(); ticks = 0; busy = 0; run = null; blocked = []; ready = [1, 2, 3, 4];
      procs = {}; for(var k = 1; k <= 4; k++) procs[k] = { id: k, name: NAMES[k - 1], pc: k * 100, acc: k * 7, prio: k === 2 ? 2 : 1, wait: 0, slice: 0, state: "ready" };
      log.innerHTML = mode === "auto" ? "Press <b>▶ Play</b> and watch the scheduler share one CPU between four processes." : mode === "challenge" ? "Click the right <b>state</b> or <b>arrow</b> for each question." : "Four processes are <b>ready</b>. Click an arrow (or a button) to move a process, or click a process to see its PCB.";
      draw();
    }
    function say(h){ log.innerHTML = h; }
    function slot(state, idx){
      if(state === "ready") return [70 + (idx % 3) * 75, 160 + Math.floor(idx / 3) * 60];
      if(state === "run") return [545, 95];
      return [545 + (idx % 3) * 75, 290 + Math.floor(idx / 3) * 48];
    }
    function draw(){
      var m = {}; ready.forEach(function(p, j){ m[p] = slot("ready", j); }); if(run) m[run] = slot("run"); blocked.forEach(function(p, j){ m[p] = slot("blocked", j); });
      for(var k = 1; k <= 4; k++){ var q = m[k]; tk[k].style.transform = "translate(" + q[0] + "px," + q[1] + "px)"; tk[k].setAttribute("class", "tk t" + (k - 1) + (sel === k ? " sel" : "")); procs[k].state = ready.indexOf(k) >= 0 ? "ready" : run === k ? "run" : "blocked"; }
      svg.querySelector("#regs").textContent = run ? "PC " + procs[run].pc : ""; svg.querySelector("#regs2").textContent = run ? "ACC " + procs[run].acc : "";
      var d = ""; if(run && mode === "auto" && preempt){ for(var j = 0; j < slice0; j++) d += '<circle cx="' + (572 + j * 18) + '" cy="140" r="5" class="' + (j < procs[run].slice ? "dn" : "df") + '"/>'; d += '<text class="sm mu" x="' + (572 + slice0 * 18 + 4) + '" y="144">time slice left</text>'; }
      svg.querySelector("#dots").innerHTML = d;
      pcb(); buttons();
    }
    function stName(s){ return s === "ready" ? "Ready" : s === "run" ? "Running" : "Blocked"; }
    function pcb(){
      var p = procs[sel];
      pcbBox.innerHTML = "<b>Process control block (PCB) of P" + p.id + " — " + esc(p.name) + '</b><div class="vscroll"><table class="vt"><tr><th>Process ID</th><th>State</th><th>Program counter</th><th>ACC</th><th>Priority</th></tr><tr><td>' + p.id + "</td><td><b>" + stName(p.state) + "</b></td><td>" + p.pc + "</td><td>" + p.acc + "</td><td>" + p.prio + "</td></tr></table></div>" +
        '<div class="vnote">' + (p.state === "run" ? "P" + p.id + " is using the CPU, so its live register values are in the CPU." : "P" + p.id + " is not on the CPU. The kernel saved its register values here, so it can carry on exactly where it stopped.") + "</div>";
    }

    /* ---------- the four allowed changes ---------- */
    function dispatch(){ if(run){ say("Only one process can use a single CPU core at a time. <b>P" + run + "</b> is running, so the scheduler must wait."); return false; } if(!ready.length){ say("The ready queue is empty: nothing to dispatch."); return false; } run = ready.shift(); procs[run].slice = slice0; say("The scheduler gives <b>P" + run + "</b> (" + esc(procs[run].name) + ") the CPU: <b>ready → running</b>. The kernel loads its saved registers from the PCB."); return true; }
    function timeout(why){ if(!run){ say("Nothing is running, so no time slice can end."); return false; } var p = run; run = null; ready.push(p); say((why || "A timer interrupt ends the time slice.") + " The kernel saves <b>P" + p + "</b>'s registers in its PCB: <b>running → ready</b>. It joins the back of the queue because it could still run."); return true; }
    function ioReq(){ if(!run){ say("Nothing is running, so nothing can ask for I/O."); return false; } var p = run; run = null; blocked.push(p); procs[p].wait = 2 + Math.floor(rnd() * 3); say("<b>P" + p + "</b> (" + esc(procs[p].name) + ") asks for a disk read or key press and cannot continue: <b>running → blocked</b>. The CPU is free for another process."); return true; }
    function ioDone(p){ if(p == null) p = blocked[0]; if(p == null){ say("No process is blocked."); return false; } blocked.splice(blocked.indexOf(p), 1); ready.push(p); say("An interrupt says the I/O for <b>P" + p + "</b> has finished: <b>blocked → ready</b>. It must wait in the ready queue; it <b>never goes straight to running</b>."); return true; }
    function forbidden(){ say('<span class="vbad">✗ Not allowed.</span> A blocked process cannot go straight to running. When its I/O finishes it moves to <b>ready</b> and waits for the scheduler to dispatch it.'); svg.querySelector('[data-a="b2run"]').classList.add("shake"); setTimeout(function(){ var n = svg.querySelector('[data-a="b2run"]'); if(n) n.classList.remove("shake"); }, 600); }

    /* ---------- Auto simulation ---------- */
    function tick(){
      ticks++; var notes = [];
      blocked.slice().forEach(function(p){ procs[p].wait--; if(procs[p].wait <= 0){ blocked.splice(blocked.indexOf(p), 1); ready.push(p); notes.push("<b>P" + p + "</b> blocked → ready (I/O done)"); } });
      if(run){
        var p = run; busy++; procs[p].pc++; procs[p].acc = (procs[p].acc + p * 3) % 100; procs[p].slice--;
        if(rnd() < .28){ run = null; blocked.push(p); procs[p].wait = 2 + Math.floor(rnd() * 3); notes.push("<b>P" + p + "</b> running → blocked (needs I/O)"); }
        else if(preempt && procs[p].slice <= 0){ run = null; ready.push(p); notes.push("<b>P" + p + "</b> running → ready (time slice over)"); }
        else notes.push("<b>P" + p + "</b> keeps running" + (preempt ? "" : " (non-pre-emptive: nobody can interrupt it)"));
      }
      if(!run && ready.length){ run = ready.shift(); procs[run].slice = slice0; notes.push("scheduler dispatches <b>P" + run + "</b>"); }
      if(!run && !ready.length) notes.push("CPU idle: every process is blocked");
      say("Tick " + ticks + " — " + notes.join("; ") + '. <span class="mu">CPU busy ' + Math.round(100 * busy / ticks) + "% of the time.</span>");
      draw();
    }
    function halt(){ if(stop){ stop(); stop = null; } buttons(); }

    /* ---------- Challenge ---------- */
    Q = [
      { q: "P3 (Word processor) is waiting for the user to press a key. Which state is it in?", k: "s", a: "blocked", w: "It cannot run until the key press arrives, even if the CPU is free: that is <b>blocked</b>." },
      { q: "The scheduler gives P1 some CPU time. Which change is this?", k: "a", a: "r2run", w: "<b>ready → running</b> is called dispatching." },
      { q: "P2 could run, but is waiting in the queue for the CPU. Which state is it in?", k: "s", a: "ready", w: "A process that is able to run but has no CPU yet is <b>ready</b>." },
      { q: "P4's time slice ends. Which change happens?", k: "a", a: "run2r", w: "A timer interrupt moves it <b>running → ready</b>; it is still able to run." },
      { q: "P1 asks the disk for a file. Which change happens?", k: "a", a: "run2b", w: "It must wait for the disk, so <b>running → blocked</b>." },
      { q: "The disk has finished the read that P1 was waiting for. Which change happens?", k: "a", a: "b2r", w: "<b>blocked → ready</b>. P1 then waits for the scheduler." },
      { q: "Which state is the only one that uses the CPU?", k: "s", a: "run", w: "Only the <b>running</b> process is using the CPU." },
      { q: "A blocked process's I/O has finished. Can it go straight to running? Click the arrow it takes.", k: "a", a: "b2r", w: "No. It goes <b>blocked → ready</b> first. Blocked → running never happens." }
    ];
    function showQ(){
      answered = false; qBox.style.display = "";
      if(qi >= Q.length){ qBox.innerHTML = "<b>Finished: " + score + " out of " + Q.length + ".</b> " + (score === Q.length ? "Perfect! You know the process states." : "Click Restart and try again.") + "<div class='vrow'></div>"; qBox.lastChild.appendChild(btn("Restart", function(){ qi = 0; score = 0; showQ(); })); return; }
      qBox.innerHTML = "<b>Question " + (qi + 1) + " of " + Q.length + "</b> (score " + score + ")<div class='qt'>" + esc(Q[qi].q) + "</div><div class='vnote'>Click a " + (Q[qi].k === "s" ? "<b>state box</b>" : "<b>arrow</b>") + " in the diagram.</div><div class='qf'></div>";
    }
    function answer(kind, v){
      if(mode !== "challenge" || answered || qi >= Q.length || Q[qi].k !== kind) { if(mode === "challenge" && !answered && qi < Q.length) say("This question needs you to click a <b>" + (Q[qi].k === "s" ? "state box" : "arrow") + "</b>."); return; }
      answered = true; var ok = v === Q[qi].a; if(ok) score++;
      qBox.querySelector(".qf").innerHTML = (ok ? '<span class="vok">✓ Correct.</span> ' : '<span class="vbad">✗ Not quite.</span> ') + Q[qi].w;
      var nx = btn(qi + 1 >= Q.length ? "See my score" : "Next question ›", function(){ qi++; showQ(); }, "p"); qBox.querySelector(".qf").appendChild(el("div", "vrow")).appendChild(nx); nx.focus();
    }

    /* ---------- controls ---------- */
    var bD, bT, bI, bF, bPlay, bStep, bPre, bReset;
    function buttons(){
      var ex = mode === "explore"; ctl.style.display = mode === "challenge" ? "none" : "";
      bD.style.display = bT.style.display = bI.style.display = bF.style.display = ex ? "" : "none";
      bPlay.style.display = bStep.style.display = bPre.style.display = ex ? "none" : "";
      if(ex){ bD.disabled = !!run || !ready.length; bT.disabled = !run; bI.disabled = !run; bF.disabled = !blocked.length; }
      bPlay.textContent = stop ? "⏸ Pause" : "▶ Play"; bStep.disabled = !!stop;
      bPre.textContent = preempt ? "Scheduler: pre-emptive (click to change)" : "Scheduler: non-pre-emptive (click to change)";
      Array.prototype.forEach.call(tabs.children, function(b){ b.className = "vb" + (b.dataset.m === mode ? " on" : ""); b.setAttribute("aria-pressed", b.dataset.m === mode); });
    }
    bD = btn("Dispatch: ready → running", function(){ dispatch(); draw(); }, "p");
    bT = btn("Time slice ends: running → ready", function(){ if(run) procs[run].pc += 3; timeout(); draw(); });
    bI = btn("I/O request: running → blocked", function(){ if(run) procs[run].pc += 3; ioReq(); draw(); });
    bF = btn("I/O complete: blocked → ready", function(){ ioDone(); draw(); });
    bPlay = btn("▶ Play", function(){ if(stop){ halt(); return; } stop = V.timer(box, function(){ tick(); }, 950); buttons(); }, "p");
    bStep = btn("Step ›", function(){ tick(); });
    bPre = btn("", function(){ preempt = !preempt; reset2(); });
    bReset = btn("↺ Reset", function(){ halt(); qi = 0; score = 0; reset(); if(mode === "challenge") showQ(); });
    function reset2(){ halt(); reset(); }
    [["explore", "Explore"], ["auto", "Auto simulation"], ["challenge", "Challenge"]].forEach(function(m){ var b = btn(m[1], function(){ halt(); mode = m[0]; qi = 0; score = 0; qBox.style.display = mode === "challenge" ? "" : "none"; reset(); if(mode === "challenge") showQ(); }); b.dataset.m = m[0]; tabs.appendChild(b); });
    [bD, bT, bI, bF, bPlay, bStep, bPre].forEach(function(b){ ctl.appendChild(b); }); ctl.appendChild(bReset);

    function arrow(k){
      if(mode === "challenge"){ answer("a", k); return; }
      if(mode !== "explore"){ say("Switch to <b>Explore</b> to move processes yourself."); return; }
      if(k === "r2run") dispatch(); else if(k === "run2r"){ if(run) procs[run].pc += 3; timeout(); } else if(k === "run2b"){ if(run) procs[run].pc += 3; ioReq(); } else if(k === "b2r") ioDone(); else forbidden();
      draw();
    }
    svg.addEventListener("click", function(e){
      var a = e.target.closest ? e.target.closest(".arrg") : null, s = e.target.closest ? e.target.closest(".stbox") : null, t = e.target.closest ? e.target.closest(".tk") : null;
      if(t){ sel = +t.getAttribute("data-p"); if(mode === "explore" && blocked.indexOf(sel) >= 0){ ioDone(sel); } draw(); return; }
      if(a){ arrow(a.getAttribute("data-a")); return; }
      if(s){ answer("s", s.getAttribute("data-s")); }
    });
    svg.addEventListener("keydown", function(e){ if(e.key !== "Enter" && e.key !== " ") return; var a = e.target.closest ? e.target.closest(".arrg, .tk") : null; if(a){ e.preventDefault(); a.dispatchEvent(new MouseEvent("click", { bubbles: true })); } });

    var leg = el("div", "vlegend"); leg.innerHTML = NAMES.map(function(n, j){ return '<span><i class="lg t' + j + '"></i>P' + (j + 1) + " " + esc(n) + "</span>"; }).join("");
    box.appendChild(el("div", "vnote", "A computer has one CPU but many processes. The kernel moves each process between three states so the CPU is never wasted. Colour is not needed to read the diagram: every process has its own label.")); box.appendChild(tabs); box.appendChild(ctl); box.appendChild(svg); box.appendChild(leg); box.appendChild(log); box.appendChild(qBox); box.appendChild(pcbBox);
    reset();
  });
})(typeof window !== "undefined" ? window : this);
