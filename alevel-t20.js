/* iLearn A Level topic 20: Further programming (Cambridge 9618, section 20)
   Textbook: Hodder "Cambridge International AS & A Level Computer Science", chapter 20 (pages 498-540).
   Past-paper style: 9618/31 Q11 (Prolog), 9618/32 Q10 to Q11 (random file with SEEK/GETRECORD, class Node, OOP terms),
   9618/33 Q11 (assembly with LDM, LDD, STO), and the Paper 4 practical papers 41, 42 and 43 (queue, class with file and exception handling,
   linked list and binary tree held in arrays).
   The Python programs on this page were run and their output copied here. The assembly traces and Prolog answers are produced by code
   (a small assembly simulator and a small Prolog engine are included below). */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx, fill = root.ILQ.fill;
  var PY = {
 "files": {
  "code": "import struct\n\n# serial text file: write, append, read\nf = open(\"scores.txt\", \"w\")\nf.write(\"Aisha,82\\n\")\nf.write(\"Omar,64\\n\")\nf.close()\nf = open(\"scores.txt\", \"a\")\nf.write(\"Lina,91\\n\")\nf.close()\nf = open(\"scores.txt\", \"r\")\nfor line in f:\n    name, mark = line.strip().split(\",\")\n    print(name, int(mark))\nf.close()\n\n# sequential file ordered on a key field: insert by writing a new file\ndef InsertSorted(old, new, key, record):\n    done = False\n    src = open(old, \"r\")\n    dst = open(new, \"w\")\n    for line in src:\n        if not done and key < int(line.split(\",\")[0]):\n            dst.write(record + \"\\n\")\n            done = True\n        dst.write(line)\n    if not done:\n        dst.write(record + \"\\n\")\n    src.close()\n    dst.close()\n\ng = open(\"seq.txt\", \"w\")\ng.write(\"101,Ali\\n205,Bea\\n340,Cy\\n\")\ng.close()\nInsertSorted(\"seq.txt\", \"seq2.txt\", 250, \"250,Dee\")\nprint(open(\"seq2.txt\").read().split())\n\n# random file: fixed-size records at an address calculated by a hash function\nRECORD = struct.Struct(\"i10s\")      # key (int) + name (10 bytes)\ndef Hash(key):\n    return key % 10\n\nrf = open(\"rand.dat\", \"w+b\")\nrf.write(b\"\\x00\" * RECORD.size * 10)   # 10 empty record slots\nfor key, name in [(205, \"Bea\"), (340, \"Cy\"), (101, \"Ali\")]:\n    rf.seek(Hash(key) * RECORD.size)\n    rf.write(RECORD.pack(key, name.encode()))\nrf.seek(Hash(340) * RECORD.size)\nkey, name = RECORD.unpack(rf.read(RECORD.size))\nprint(key, name.rstrip(b\"\\x00\").decode())\nrf.close()\nprint(Hash(205), Hash(340), Hash(101))",
  "out": "Aisha 82\nOmar 64\nLina 91\n['101,Ali', '205,Bea', '250,Dee', '340,Cy']\n340 Cy\n5 0 1"
 },
 "exc": {
  "code": "def SafeDivide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        print(\"Cannot divide by zero\")\n        return None\n\ndef ReadMark(text):\n    try:\n        mark = int(text)\n        if mark < 0 or mark > 100:\n            raise ValueError(\"out of range\")\n        return mark\n    except ValueError:\n        print(\"Invalid mark:\", text)\n        return -1\n\nprint(SafeDivide(10, 4))\nprint(SafeDivide(1, 0))\nprint(ReadMark(\"72\"), ReadMark(\"abc\"), ReadMark(\"150\"))\ntry:\n    f = open(\"nothing.txt\", \"r\")\nexcept FileNotFoundError:\n    print(\"File not found\")\nfinally:\n    print(\"Finished\")",
  "out": "2.5\nCannot divide by zero\nNone\nInvalid mark: abc\nInvalid mark: 150\n72 -1 -1\nFile not found\nFinished"
 },
 "oop": {
  "code": "class Shape:\n    def __init__(self, name):\n        self._name = name\n    def Area(self):\n        return 0\n    def Describe(self):\n        return self._name + \" with area \" + str(round(self.Area(), 2))\n\nclass Rectangle(Shape):\n    def __init__(self, length, breadth):\n        super().__init__(\"Rectangle\")\n        self.__length = length\n        self.__breadth = breadth\n    def Area(self):\n        return self.__length * self.__breadth\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        super().__init__(\"Circle\")\n        self.__radius = radius\n    def Area(self):\n        return 3.142 * self.__radius ** 2\n\nfor s in [Rectangle(10, 17), Circle(20)]:\n    print(s.Describe())\n\nclass Greeting:\n    def Hello(self, name=None):\n        if name is None:\n            return \"Hello\"\n        return \"Hello \" + name\ng = Greeting()\nprint(g.Hello(), \"|\", g.Hello(\"Christopher\"))",
  "out": "Rectangle with area 170\nCircle with area 1256.8\nHello | Hello Christopher"
 }
};
  var LEFT = "\u2190";
  function tbl(heads, rows){
    return "<table class='ln-table'><tr>" + heads.map(function(h){ return "<th>" + h + "</th>"; }).join("") + "</tr>" +
      rows.map(function(r){ return "<tr>" + r.map(function(c){ return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
  }
  function pre(s){ return "<pre class='ln-pre'>" + String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</pre>"; }
  function steps(list){ return "<ol>" + list.map(function(s){ return "<li>" + s + "</li>"; }).join("") + "</ol>"; }
  function py(name){ return pre(PY[name].code); }
  function pyout(name){ return "<p><b>Output:</b></p>" + pre(PY[name].out); }

  /* ================= assembly simulator (instruction set from the syllabus) ================= */
  function runAsm(prog, mem, ix0){
    var byAddr = {}; prog.forEach(function(p){ byAddr[p[0]] = p; });
    var m = {}; Object.keys(mem).forEach(function(k){ m[k] = mem[k]; });
    function rd(a){ return m[a] === undefined ? 0 : m[a]; }
    var acc = 0, ix = 0, flag = false, pc = prog[0][0], rows = [], guard = 0;
    function num(o){ return typeof o === "string" && o.charAt(0) === "#" ? parseInt(o.slice(1), 10) : null; }
    while(byAddr[pc] && guard++ < 500){
      var p = byAddr[pc], op = p[1], o = p[2], next = pc + 1, imm = num(o), note = "";
      if(op === "LDM") acc = imm;
      else if(op === "LDD") acc = rd(o);
      else if(op === "LDI") acc = rd(rd(o));
      else if(op === "LDX") acc = rd(o + ix);
      else if(op === "LDR") ix = imm;
      else if(op === "MOV") ix = acc;
      else if(op === "STO"){ m[o] = acc; note = "[" + o + "] = " + acc; }
      else if(op === "ADD") acc = acc + (imm !== null ? imm : rd(o));
      else if(op === "SUB") acc = acc - (imm !== null ? imm : rd(o));
      else if(op === "INC"){ if(o === "IX") ix++; else acc++; }
      else if(op === "DEC"){ if(o === "IX") ix--; else acc--; }
      else if(op === "CMP"){ flag = acc === (imm !== null ? imm : rd(o)); note = flag ? "equal" : "not equal"; }
      else if(op === "CMI"){ flag = acc === rd(rd(o)); note = flag ? "equal" : "not equal"; }
      else if(op === "JMP"){ next = o; }
      else if(op === "JPE"){ if(flag) next = o; }
      else if(op === "JPN"){ if(!flag) next = o; }
      else if(op === "END"){ rows.push([pc, "END", acc, ix, ""]); break; }
      rows.push([pc, op + (o !== null && o !== undefined ? " " + o : ""), acc, ix, note]);
      if(op === "JMP" && next === pc) break;
      pc = next;
    }
    return { rows: rows, acc: acc, ix: ix, mem: m };
  }
  var MEM_A = { 230: 231, 231: 5, 232: 7, 233: 9, 234: 11, 235: 0 };
  var PROG_A = [[500, "LDM", "#230"], [501, "LDD", 230], [502, "LDI", 230], [503, "LDR", "#1"], [504, "LDX", 230], [505, "CMP", "#0"], [506, "JPE", 509], [507, "INC", "IX"], [508, "JMP", 504], [509, "JMP", 509]];
  var RUN_A = runAsm(PROG_A, MEM_A);
  var PROG_B = [[500, "LDM", "#0"], [501, "STO", 700], [502, "LDR", "#0"], [503, "LDX", 600], [504, "CMP", "#0"], [505, "JPE", 510], [506, "ADD", 700], [507, "STO", 700], [508, "INC", "IX"], [509, "JMP", 503], [510, "END", null]];
  var MEM_B = { 600: 4, 601: 9, 602: 2, 603: 0, 700: 0 };
  var RUN_B = runAsm(PROG_B, MEM_B);
  var PROG_C = [[200, "LDM", "#325"], [201, "STO", 900], [202, "LDD", 232], [203, "STO", 901], [204, "SUB", "#50"], [205, "STO", 902], [206, "LDD", 900], [207, "ADD", 580], [208, "SUB", 902], [209, "STO", 903], [210, "END", null]];
  var MEM_C = { 232: 120, 580: 26 };
  var RUN_C = runAsm(PROG_C, MEM_C);
  function asmTable(rows, limit){
    var r = limit ? rows.slice(0, limit) : rows;
    return tbl(["Address", "Instruction", "ACC", "IX", "Note"], r.map(function(x){ return [x[0], "<code>" + String(x[1]) + "</code>", x[2], x[3], x[4]]; }));
  }

  /* ================= a small Prolog engine, used to produce the query results ================= */
  var counter = 0;
  function splitTop(s, sep){ var out = [], d = 0, cur = ""; for(var i = 0; i < s.length; i++){ var c = s.charAt(i); if(c === "(") d++; if(c === ")") d--; if(c === sep && d === 0){ out.push(cur); cur = ""; } else cur += c; } if(cur.trim() !== "") out.push(cur); return out; }
  function pTerm(s){
    s = s.trim(); var m = /^([a-z][A-Za-z0-9_]*)\((.*)\)$/.exec(s);
    if(m) return { f: m[1], a: splitTop(m[2], ",").map(pTerm) };
    if(/^[A-Z_]/.test(s)) return { v: s };
    if(/^-?\d+(\.\d+)?$/.test(s)) return { n: parseFloat(s) };
    return { at: s };
  }
  function pGoal(s){
    s = s.trim();
    if(s.indexOf("\\+") === 0) return { not: pGoal(s.slice(2)) };
    if(/^[a-z][A-Za-z0-9_]*\(/.test(s)) return pTerm(s);
    var m = /^(.+?)\s*(>=|<=|>|<)\s*(.+)$/.exec(s);
    return { cmp: m[2], l: pTerm(m[1]), r: pTerm(m[3]) };
  }
  function parseKB(lines){
    return lines.join(" ").split(/\.\s+|\.$/).map(function(x){ return x.trim(); }).filter(Boolean).map(function(c){
      var parts = c.split(":-");
      return { head: pTerm(parts[0]), body: parts.length > 1 ? splitTop(parts[1], ",").map(pGoal) : [] };
    });
  }
  function walk(t, env){ while(t.v && env[t.v] !== undefined) t = env[t.v]; return t; }
  function unify(a, b, env){
    a = walk(a, env); b = walk(b, env);
    if(a.v){ if(b.v && a.v === b.v) return env; var e = {}; Object.keys(env).forEach(function(k){ e[k] = env[k]; }); e[a.v] = b; return e; }
    if(b.v) return unify(b, a, env);
    if(a.f || b.f){ if(!a.f || !b.f || a.f !== b.f || a.a.length !== b.a.length) return null; var e2 = env; for(var i = 0; i < a.a.length; i++){ e2 = unify(a.a[i], b.a[i], e2); if(!e2) return null; } return e2; }
    if(a.n !== undefined && b.n !== undefined) return a.n === b.n ? env : null;
    if(a.at !== undefined && b.at !== undefined) return a.at === b.at ? env : null;
    return null;
  }
  function rn(t, k){ if(t.v) return { v: t.v + "_" + k + (t.v === "_" ? "_" + (++counter) : "") }; if(t.f) return { f: t.f, a: t.a.map(function(x){ return rn(x, k); }) }; return t; }
  function rnGoal(g, k){ if(g.not) return { not: rnGoal(g.not, k) }; if(g.cmp) return { cmp: g.cmp, l: rn(g.l, k), r: rn(g.r, k) }; return rn(g, k); }
  function solve(goals, env, kb){
    if(!goals.length) return [env];
    var g = goals[0], rest = goals.slice(1), res = [];
    if(g.not){ return solve([g.not], env, kb).length ? [] : solve(rest, env, kb); }
    if(g.cmp){
      var l = walk(g.l, env), r = walk(g.r, env); if(l.n === undefined || r.n === undefined) return [];
      var ok = g.cmp === ">=" ? l.n >= r.n : g.cmp === "<=" ? l.n <= r.n : g.cmp === ">" ? l.n > r.n : l.n < r.n;
      return ok ? solve(rest, env, kb) : [];
    }
    kb.forEach(function(c){
      var k = ++counter, e = unify(g, rn(c.head, k), env);
      if(e) res = res.concat(solve(c.body.map(function(b){ return rnGoal(b, k); }).concat(rest), e, kb));
    });
    return res;
  }
  function show(t, env){ t = walk(t, env); if(t.v) return t.v.replace(/_\d+.*$/, ""); if(t.n !== undefined) return String(t.n); if(t.at !== undefined) return t.at; return t.f + "(" + t.a.map(function(x){ return show(x, env); }).join(",") + ")"; }
  // ask(kb, "language(Country,english)", "Country") -> list of values for that variable (unique, in order)
  function ask(kb, q, varName){
    var goals = splitTop(q, ",").map(pGoal), sols = solve(goals, {}, kb), out = [];
    sols.forEach(function(env){ var val = varName ? show({ v: varName }, env) : "true"; if(out.indexOf(val) < 0) out.push(val); });
    return out;
  }
  var KB1_TEXT = ["country(france).", "country(germany).", "country(japan).", "country(newZealand).", "country(england).", "country(switzerland).",
    "language(france,french).", "language(germany,german).", "language(japan,japanese).", "language(newZealand,english).", "language(england,english).", "language(switzerland,french).", "language(switzerland,german).", "language(switzerland,italian)."];
  var KB1 = parseKB(KB1_TEXT);
  var KB2_TEXT = ["bankAccount(laila,current,500).", "bankAccount(stefan,savings,50).", "bankAccount(paul,current,45).", "bankAccount(tasha,savings,5000).",
    "interest(twoPercent,current,500).", "interest(onePercent,current,0).", "interest(tenPercent,savings,5000).", "interest(fivePercent,savings,0).",
    "savingsRate(Name,Rate) :- bankAccount(Name,Type,Amount), interest(Rate,Type,Base), Amount >= Base."];
  var KB2 = parseKB(KB2_TEXT);
  var KB3_TEXT = ["customer(betty).", "customer(sammy).", "customer(petrov).", "device(large_tv).", "device(bluray_player).", "device(speaker).",
    "owns(large_tv,betty).", "owns(speaker,sammy).", "owns(large_tv,petrov).", "owns(bluray_player,petrov).",
    "mayBuy(D,A) :- device(D), customer(A), \\+ owns(D,A)."];
  var KB3 = parseKB(KB3_TEXT);

  var R_ENG = ask(KB1, "language(Country,english)", "Country"), R_SWISS = ask(KB1, "language(switzerland,Language)", "Language"),
      R_RATE_STEFAN = ask(KB2, "savingsRate(stefan,X)", "X"), R_RATE_TASHA = ask(KB2, "savingsRate(tasha,X)", "X"), R_RATE_LAILA = ask(KB2, "savingsRate(laila,X)", "X"),
      R_BUY_BETTY = ask(KB3, "mayBuy(D,betty)", "D"), R_BUY_PETROV = ask(KB3, "mayBuy(D,petrov)", "D"), R_OWNERS_TV = ask(KB3, "owns(large_tv,Owner)", "Owner");
  var KB1_TEXT_BLOCK = pre(KB1_TEXT.join("\n")), KB2_TEXT_BLOCK = pre(KB2_TEXT.join("\n").replace("savingsRate(Name,Rate) :-", "savingsRate(Name,Rate) :-\n    ").replace(/, /g, ",\n    ")), KB3_TEXT_BLOCK = pre(KB3_TEXT.join("\n").replace("mayBuy(D,A) :-", "mayBuy(D,A) :-\n    ").replace(/, /g, ",\n    "));

  var LESSONS = [

  /* ===================== 20.1 Programming paradigms ===================== */
  { id:"20.1a", code:"20.1.1", title:"What is a programming paradigm?",
    concept:
      "<p>A <b>programming paradigm</b> is a set of programming concepts, a style of writing programs. The paradigm decides how the program is organised and how problems are solved. Many languages support more than one paradigm (Python and Java support imperative and object-oriented programming).</p>" +
      tbl(["Paradigm", "Idea", "Typical use"], [
        ["<b>Low-level</b>", "Programs use the computer's own instruction set (assembly or machine code); the programmer controls specific registers and memory addresses", "Device drivers, embedded systems, programs needing fast and exact hardware control"],
        ["<b>Imperative (procedural)</b>", "A list of statements in the order they are carried out; structured with sequence, selection, iteration, procedures and functions", "Small to medium programs; the first style most students learn"],
        ["<b>Object-oriented (OOP)</b>", "A program is a set of <b>objects</b> that contain data and methods and send messages to each other; uses classes, encapsulation, inheritance and polymorphism", "Large, complex programs with many real-world things (games, business systems)"],
        ["<b>Declarative</b>", "The programmer states <b>facts and rules</b> and asks a <b>query</b> (goal); the system works out how to answer it", "Knowledge bases, expert systems, AI (Prolog); SQL queries work in a similar way"]]),
    example:
      "<p>The same task, 'find the area of a rectangle', in each paradigm:</p>" +
      "<ul><li><b>Low-level:</b> LDD Length, then multiply with repeated addition in a loop, then STO Area.</li><li><b>Imperative:</b> <code>area = length * breadth</code>, or a function <code>CalculateArea(l, b)</code>.</li><li><b>OOP:</b> a Rectangle object with the method <code>Area()</code>.</li><li><b>Declarative:</b> <code>area(rectangle(L,B), A) :- A is L * B.</code> and the query <code>area(rectangle(10,17), A).</code></li></ul>",
    checks:[
      mc("Which paradigm uses facts and rules and a query to find answers?", "Declarative", ["Imperative", "Low-level", "Object-oriented"], "The system solves the goal from the knowledge base."),
      mc("Which paradigm is used to write a device driver that must control specific registers and memory locations?", "Low-level", ["Declarative", "Object-oriented", "Imperative only"], "Low-level code gives direct control of hardware."),
      mc("Which paradigm organises a program into objects that contain data and methods?", "Object-oriented", ["Imperative", "Declarative", "Low-level"], "Objects combine data and methods."),
      tx("Explain what is meant by a programming paradigm. [2]", [["style","approach","way","method","set of","concepts","programming concepts"],["program","programming","solve","writing","organis","structure"]], 2, "A programming paradigm is a set of programming concepts, a style or approach to writing programs, such as low-level, imperative, object-oriented or declarative programming.")
    ] },

  { id:"20.1b", code:"20.1.2", title:"Low-level programming: addressing modes",
    concept:
      "<p>Assembly language has one instruction for each machine-code instruction. The accumulator (ACC) holds the result of calculations; the index register (IX) is used for indexed addressing. The <b>addressing mode</b> says how the operand is used to find the data.</p>" +
      tbl(["Mode", "Instruction", "How the operand is used", "Example (with memory 230 = 231, 231 = 5)"], [
        ["<b>Immediate</b>", "LDM #n", "The operand <b>is</b> the value", "LDM #230 → ACC = 230"],
        ["<b>Direct</b>", "LDD address", "The operand is the <b>address</b> of the value", "LDD 230 → ACC = 231 (the contents of address 230)"],
        ["<b>Indirect</b>", "LDI address", "The contents of the address is itself <b>another address</b>; the value is at that second address", "LDI 230 → address 230 holds 231; address 231 holds 5; ACC = 5"],
        ["<b>Indexed</b>", "LDX address", "The address used is the operand <b>plus the contents of IX</b>", "IX = 1: LDX 230 → address 231 → ACC = 5"],
        ["<b>Relative</b>", "(jump by an offset)", "The address used is the <b>current address plus the operand</b>, so the code can be moved in memory", "At address 520, a relative jump of +5 goes to 525"]]) +
      "<p>Other instructions in the syllabus set: <code>LDR #n</code> (load IX), <code>MOV IX</code> (ACC to IX), <code>STO</code>, <code>ADD</code>, <code>SUB</code>, <code>INC</code>, <code>DEC</code> (ACC or IX), <code>JMP</code>, <code>CMP</code> and <code>CMI</code> (compare), <code>JPE</code> and <code>JPN</code> (jump if the compare was true or false), <code>IN</code>, <code>OUT</code>, <code>END</code>. A <b>symbolic address</b> uses a label instead of a number, so inserting an instruction does not mean changing every address.</p>",
    example:
      "<p>Running the first part of the textbook's program (memory 230 = 231, 231 = 5, 232 = 7, 233 = 9, 234 = 11, 235 = 0), simulated line by line:</p>" +
      asmTable(RUN_A.rows, 7) +
      "<p>LDM is immediate, LDD direct, LDI indirect, LDR immediate (into IX) and LDX indexed. <b>Exam link (June 2026 Paper 3):</b> an assembly program using LDM #325 and STO, then LDD, SUB #50, ADD and SUB, followed by the final contents of the three labelled locations.</p>",
    checks:[
      mc("Which addressing mode is used by LDM #200?", "Immediate", ["Direct", "Indirect", "Indexed"], "The operand 200 is the value that is loaded."),
      mc("Memory: address 230 holds 231 and address 231 holds 5. What is in ACC after LDD 230?", String(MEM_A[230]), ["5", "230", "0"], "Direct addressing loads the contents of address 230."),
      mc("Using the same memory, what is in ACC after LDI 230?", String(MEM_A[MEM_A[230]]), ["231", "230", "0"], "Indirect: address 230 holds 231, so the value is the contents of 231."),
      mc("IX = 2 and memory address 232 holds 7. What does LDX 230 load into ACC?", "7", ["2", "230", "9"], "The address is 230 + IX = 232."),
      mc("Which mode uses the current address plus the operand?", "Relative", ["Immediate", "Indirect", "Direct"], "A relative jump is measured from the current instruction."),
      tx("Describe the difference between direct and indirect addressing. [2]", [["direct","operand is the address","address of the value","address of the data"],["indirect","second address","address of the address","contents of the address is an address","another address","pointer","address holds the address"]], 2, "In direct addressing the operand is the address of the data. In indirect addressing the contents of the address given in the operand is another address, and it is that second address which holds the data.")
    ] },

  { id:"20.1c", code:"20.1.2", title:"Low-level programs: loops and arrays with the index register",
    concept:
      "<p>To process a list in assembly, store the items in consecutive addresses and use <b>indexed addressing</b>: change IX each time round the loop. There is only one general-purpose register (ACC), so intermediate results are stored in memory with STO. IX can only be changed with <code>LDR #n</code>, <code>INC IX</code>, <code>DEC IX</code> and <code>MOV IX</code>, so a loop usually ends when a special value (such as 0) is found in the data.</p>" +
      pre("      LDM #0\n      STO Total        // Total = 0\n      LDR #0           // IX = 0\nLoop: LDX Data         // ACC = Data[IX]\n      CMP #0           // end marker?\n      JPE Finish       // yes: leave the loop\n      ADD Total\n      STO Total        // Total = Total + item\n      INC IX\n      JMP Loop\nFinish: END"),
    example:
      "<p>The same program with real addresses. Data at 600 is 4, 9, 2, then 0 (the end marker). Total is address 700:</p>" +
      asmTable(RUN_B.rows.slice(0, 12)) + "<p>...(the loop repeats for the next items)...</p>" +
      "<p>When the program ends, address 700 holds <b>" + RUN_B.mem[700] + "</b> (4 + 9 + 2) and IX = " + RUN_B.ix + ".</p>" +
      "<p>The textbook program in the previous lesson is a different loop: it stops when it finds 0 and leaves IX = " + RUN_A.ix + ", the number of items before the 0 at address 235 (counting from 231).</p>",
    checks:[
      mc("In the program above, what value is held at address 700 when the program ends?", String(RUN_B.mem[700]), ["13", "4", "0"], "The loop adds 4, 9 and 2."),
      mc("What is the final value of IX at the end of the sum program above (END reached)?", String(RUN_B.ix), ["0", "4", "2"], "IX is increased once for each non-zero item; it points at the 0 marker."),
      mc("What is the purpose of INC IX in the loop?", "It moves on to the next item in the list", ["It adds 1 to the total", "It ends the program", "It clears the accumulator"], "Indexed addressing then reads the next address."),
      mc("In the textbook program (previous lesson), what are ACC and IX when the program stops at 509?", "ACC = " + RUN_A.acc + ", IX = " + RUN_A.ix, ["ACC = 5, IX = 1", "ACC = 0, IX = 0", "ACC = 11, IX = 4"], "The loop stops when LDX finds 0 at address 235, which is when IX = 5."),
      mc("Which instruction jumps only if the last comparison was true?", "JPE", ["JPN", "JMP", "INC"], "JPE = jump if equal (compare true); JPN = jump if not equal."),
      tx("State the purpose of the compare and jump instructions in a loop. [2]", [["compare","cmp","check","test","end marker","value"],["jump","exit","leave the loop","repeat","branch","loop back"]], 2, "The compare instruction tests the value in the accumulator (for example for the end marker); the conditional jump then either leaves the loop or lets it repeat.")
    ] },

  { id:"20.1d", code:"20.1.3", title:"Imperative (procedural) programming",
    concept:
      "<p>In <b>imperative</b> programming the programmer writes the steps in the order they must be carried out. <b>Structured (procedural) programming</b> organises these steps with:</p>" +
      "<ul><li>the three constructs: <b>sequence</b>, <b>selection</b> (IF, CASE) and <b>iteration</b> (FOR, WHILE, REPEAT);</li><li><b>procedures</b> (subroutines that do not return a value) and <b>functions</b> (return one value);</li><li><b>parameters</b> passed <b>by value</b> (a copy; the original is unchanged) or <b>by reference</b> (the subroutine can change the original);</li><li><b>local</b> variables (exist only inside the subroutine) and <b>global</b> variables (available everywhere; harder to maintain).</li></ul>" +
      "<p>Imperative programs are usually short, quick to run and easy to follow, but large programs are harder to manage than OOP programs. Using procedures and functions makes code easier to test, reuse and maintain.</p>",
    example:
      pre("PROCEDURE ShowArea(Length : REAL, Breadth : REAL)\n    OUTPUT \"Area is \", RectangleArea(Length, Breadth)\nENDPROCEDURE\n\nFUNCTION RectangleArea(Length : REAL, Breadth : REAL) RETURNS REAL\n    RETURN Length * Breadth\nENDFUNCTION\n\nCALL ShowArea(10, 17)") +
      "<p>In Python:</p>" + pre("def rectangle_area(length, breadth):\n    return length * breadth\n\ndef show_area(length, breadth):\n    print(\"Area is\", rectangle_area(length, breadth))\n\nshow_area(10, 17)      # Area is 170"),
    checks:[
      mc("What is the difference between a procedure and a function?", "A function returns a value; a procedure does not", ["A procedure returns a value; a function does not", "A function cannot have parameters", "There is no difference"], "A function is used in an expression because it returns a value."),
      mc("A parameter is passed by value. What happens to the original variable if the subroutine changes the parameter?", "The original is unchanged", ["The original is changed", "The program stops", "The original is deleted"], "The subroutine works on a copy."),
      mc("What is a local variable?", "A variable that exists only inside the subroutine in which it is declared", ["A variable available to the whole program", "A variable stored on the hard disk", "A constant"], "Its scope is the subroutine."),
      mc("Which is a reason for using procedures and functions?", "Code can be reused and tested separately", ["The program runs without any memory", "Variables become global", "Loops are not needed"], "Modular programs are easier to maintain."),
      tx("Describe the imperative programming paradigm. [2]", [["steps","statements","instructions","sequence","order","list"],["order","carried out","executed","procedure","function","procedural","structured"]], 2, "In imperative programming the steps needed to solve the problem are written as statements in the order in which they are carried out; structured/procedural programming adds procedures and functions with local and global variables.")
    ] },

  { id:"20.1e", code:"20.1.4", title:"Object-oriented programming: classes and objects",
    concept:
      "<p><b>Object-oriented programming (OOP)</b> models a problem as objects. The terminology you must know:</p>" +
      tbl(["Term", "Meaning"], [
        ["<b>Class</b>", "A template (blueprint) that defines the attributes and methods of a type of object"],
        ["<b>Object / instance</b>", "A particular occurrence of a class created while the program runs"],
        ["<b>Attribute (property)</b>", "A data item stored in the class (e.g. Name, Age)"],
        ["<b>Method</b>", "A procedure or function that is part of the class"],
        ["<b>Constructor</b>", "A method (called NEW in the pseudocode, <code>__init__</code> in Python) that creates and initialises a new object"],
        ["<b>Encapsulation</b>", "Putting the data and methods together in one unit (the class); attributes are <b>private</b> and methods <b>public</b>, so the data can be reached only through the methods"],
        ["<b>Data hiding</b>", "Restricting access to the data inside an object to protect its integrity"]]),
    example:
      "<p>Class definition in the Cambridge pseudocode (as used in the June 2026 Paper 3 for class Node):</p>" +
      pre("CLASS Pet\n    PRIVATE Name : STRING\n    PRIVATE Age : INTEGER\n    PUBLIC PROCEDURE NEW(NewName : STRING, NewAge : INTEGER)\n        Name " + LEFT + " NewName\n        Age " + LEFT + " NewAge\n    ENDPROCEDURE\n    PUBLIC FUNCTION GetName() RETURNS STRING\n        RETURN Name\n    ENDFUNCTION\nENDCLASS\n\nMyPet " + LEFT + " NEW Pet(\"Rex\", 4)") +
      "<p><b>Mark scheme points for such a question:</b> CLASS ... ENDCLASS; the attributes declared (PRIVATE) before the constructor with the right data types; the constructor written as PUBLIC PROCEDURE NEW ... ENDPROCEDURE with parameters; each parameter assigned to its attribute.</p>" +
      "<p>The beginning of the Python version is on the next pages (see the Pet class in the Paper 4 practice lesson).</p>",
    checks:[
      mc("What is a class?", "A template that defines the attributes and methods for objects of one type", ["A single object created at run time", "A procedure that returns a value", "A file that stores objects"], "Objects are created from a class."),
      mc("What is an instance of a class?", "An object created from the class while the program runs", ["A method that sets a value", "A private attribute", "A superclass"], "MyPet is an instance of Pet."),
      mc("Why are attributes usually declared PRIVATE?", "So they can be accessed or changed only through the class's methods", ["So they take less memory", "So they can be inherited more quickly", "So the class cannot be used"], "This is encapsulation / data hiding."),
      fill("Complete the constructor of the class Node.", "CLASS Node\n    PRIVATE Content : STRING\n    PRIVATE Pointer : INTEGER\n    PUBLIC PROCEDURE {1}(NewContent : STRING, NewPointer : INTEGER)\n        Content " + LEFT + " NewContent\n        Pointer " + LEFT + " NewPointer\n    {2}\n{3}", [["NEW", ["CREATE", "INIT", "CONSTRUCT"]], ["ENDPROCEDURE", ["ENDFUNCTION", "ENDIF", "END"]], ["ENDCLASS", ["ENDTYPE", "ENDPROCEDURE", "END CLASS"]]], "The constructor is a PUBLIC PROCEDURE NEW; the class ends with ENDCLASS."),
      tx("Explain what is meant by encapsulation. [2]", [["data and methods","attributes and methods","properties and methods","data and procedures"],["together","single unit","one unit","class","combined","inside"],["private","hidden","access","only through","protected","hiding"]], 2, "Encapsulation is putting the data (attributes) and the methods that use it together in a single unit, the class, with the attributes private so that they can only be accessed through the class's public methods.")
    ] },

  { id:"20.1f", code:"20.1.4", title:"Getters, setters, constructors and destructors",
    concept:
      "<p>The basic methods in the life of an object:</p>" +
      "<ul><li><b>Constructor</b>: runs when the object is created; allocates memory and gives the attributes their first values.</li><li><b>Getter</b> (accessor): a method that <b>returns</b> the value of a private attribute.</li><li><b>Setter</b> (mutator): a method used to <b>change</b> the value of a private attribute. It can <b>validate</b> the new value, so the object stays valid.</li><li><b>Destructor</b>: a method run when an object is destroyed so its memory can be released (<code>__del__</code> in Python; Java and VB use garbage collection).</li></ul>",
    example:
      pre("CLASS Pet\n    PRIVATE Age : INTEGER\n    PUBLIC FUNCTION GetAge() RETURNS INTEGER      // getter\n        RETURN Age\n    ENDFUNCTION\n    PUBLIC PROCEDURE SetAge(NewAge : INTEGER)     // setter with validation\n        IF NewAge >= 0 THEN\n            Age " + LEFT + " NewAge\n        ENDIF\n    ENDPROCEDURE\nENDCLASS") +
      "<p>In Python, the double underscore makes an attribute private:</p>" +
      pre("class Pet:\n    def __init__(self, name, age):\n        self.__name = name\n        self.__age = age\n    def get_age(self):\n        return self.__age\n    def set_age(self, new_age):\n        if new_age >= 0:\n            self.__age = new_age") +
      "<p><b>Exam link (June 2026 Paper 3):</b> match the OOP terms to their descriptions: <i>setter</i> - a method used to change values in private attributes; <i>instance</i> - an occurrence of a class during execution; <i>aggregation</i> - one class contains another; <i>inheritance</i> - deriving new classes from existing classes.</p>",
    checks:[
      mc("What is the purpose of a setter?", "To change the value of a private attribute, with checks if needed", ["To create the object", "To read an attribute", "To destroy the object"], "Setters control how the attribute is changed."),
      mc("What is the purpose of a getter?", "To return the value of a private attribute", ["To change it", "To delete it", "To inherit it"], "Getters give read access."),
      mc("What is the purpose of a constructor?", "To create and initialise a new object", ["To destroy an object", "To print the object", "To return a value"], "The constructor runs when an object is created."),
      mc("Why might a setter be better than allowing direct access to the attribute?", "It can check the new value before it is stored", ["It is faster", "It makes the attribute public", "It removes the need for a class"], "Validation keeps the data correct."),
      tx("Give the OOP term for each description: (a) a method used to change values in private attributes; (b) an occurrence of a class during the execution of a program. [2]", [["setter","mutator"],["instance","object"]], 2, "(a) setter; (b) instance (object).")
    ] },

  { id:"20.1g", code:"20.1.4", title:"Inheritance, polymorphism and overloading",
    concept:
      "<p><b>Inheritance</b>: a <b>derived (child) class</b> gets the attributes and methods of a <b>base (parent, super) class</b> and can add its own. It represents an <b>'is a'</b> relationship (a circle <i>is a</i> shape). It avoids repeating code. In pseudocode: <code>CLASS Circle INHERITS Shape</code>; the child constructor calls the parent's with <code>SUPER.NEW(...)</code>.</p>" +
      "<p><b>Polymorphism</b>: a method is <b>redefined (overridden)</b> in a derived class, so the same method name does different things in different classes. The same call, <code>shape.Area()</code>, uses the correct version for the object.</p>" +
      "<p><b>Overloading</b>: the same method name is defined more than once in a class with different parameters (e.g. <code>Hello()</code> and <code>Hello(name)</code>). Python does this with default parameter values.</p>",
    example:
      pre("CLASS Shape\n    PROTECTED Name : STRING\n    PUBLIC FUNCTION Area() RETURNS REAL\n        RETURN 0\n    ENDFUNCTION\nENDCLASS\n\nCLASS Rectangle INHERITS Shape\n    PRIVATE Length, Breadth : REAL\n    PUBLIC PROCEDURE NEW(L : REAL, B : REAL)\n        SUPER.NEW(\"Rectangle\")\n        Length " + LEFT + " L\n        Breadth " + LEFT + " B\n    ENDPROCEDURE\n    PUBLIC FUNCTION Area() RETURNS REAL        // redefined: polymorphism\n        RETURN Length * Breadth\n    ENDFUNCTION\nENDCLASS") +
      "<p>The same idea in Python, run on the computer:</p>" + py("oop") + pyout("oop") +
      "<p>The base class provides Describe(); each derived class redefines Area(), and the correct Area() is used for each object.</p>",
    checks:[
      mc("Which OOP feature allows a derived class to use the attributes and methods of a base class?", "Inheritance", ["Polymorphism", "Encapsulation", "Overloading"], "A derived class inherits from its base class."),
      mc("A method Area() is redefined in the classes Rectangle and Circle. This is ...", "polymorphism", ["inheritance", "containment", "a destructor"], "The same method name behaves differently in the derived classes."),
      mc("Hello() and Hello(Name) are two versions of the same method in one class. This is ...", "overloading", ["polymorphism by inheritance", "encapsulation", "a constructor"], "The same method name with different parameters."),
      mc("A Circle class is derived from a Shape class. Which relationship is this?", "'Is a'", ["'Has a'", "'Uses a'", "'Is not a'"], "A circle is a shape: inheritance."),
      mc("In the Python program above, what is printed for the Circle with radius 20?", "Circle with area 1256.8", ["Circle with area 0", "Circle with area 1257", "Shape with area 1256.8"], "3.142 × 20² = 1256.8, rounded to 2 places."),
      tx("Describe how inheritance and polymorphism are used when a class Circle is derived from a class Shape. [3]", [["inherit","derived","child","base class","superclass","parent"],["methods","attributes","properties","data"],["redefine","redefined","override","overridden","own version","different version","polymorphism"]], 3, "Circle is a derived class of Shape, so it inherits Shape's attributes and methods. Circle can redefine (override) a method such as Area() so that it calculates the area of a circle; this is polymorphism, because the same method name behaves differently for different classes.")
    ] },

  { id:"20.1h", code:"20.1.4", title:"Containment (aggregation) and designing classes",
    concept:
      "<p><b>Containment (aggregation)</b>: one class contains objects of other classes (a <b>'has a'</b> relationship). An aeroplane <i>has</i> wings, seats and a cockpit; a flight has an array of passengers and an array of crew. Use <b>inheritance</b> for 'is a' and <b>containment</b> for 'has a'.</p>" +
      "<p><b>Designing classes for a problem:</b></p>" +
      steps(["Identify the <b>nouns</b> in the description: they are candidate classes and attributes.", "Identify the <b>verbs</b>: they become methods.", "Decide which attributes are private and write getters and setters.", "Decide whether classes are related by inheritance ('is a') or containment ('has a').", "Draw a <b>class diagram</b>: the class name, its attributes with data types, and its methods."]),
    example:
      pre("CLASS Passenger\n    PRIVATE FirstName : STRING\n    PRIVATE SeatNumber : STRING\n    PUBLIC PROCEDURE NEW(F : STRING, S : STRING) ... ENDPROCEDURE\nENDCLASS\n\nCLASS Flight\n    PRIVATE FlightID : STRING\n    PRIVATE Passengers : ARRAY[1:350] OF Passenger    // containment\n    PRIVATE NumberOfPassengers : INTEGER\n    PUBLIC PROCEDURE AddPassenger(P : Passenger) ... ENDPROCEDURE\nENDCLASS") +
      "<p>A Flight <i>has</i> Passengers, so it contains them. A part-time employee <i>is an</i> employee, so PartTime inherits from Employee.</p>" +
      "<p><b>Exam link:</b> the June 2026 Paper 3 question describing 'aggregation' as 'one class contains another class' or a 'has a' relationship.</p>",
    checks:[
      mc("A class Library contains an array of Book objects. Which OOP concept is this?", "Containment (aggregation)", ["Inheritance", "Polymorphism", "Overloading"], "A library has books: a 'has a' relationship."),
      mc("Which relationship should be modelled with inheritance?", "A Square is a Shape", ["A Car has an Engine", "A School has Students", "A Flight has Passengers"], "'Is a' means inheritance."),
      mc("When designing classes from a description, the verbs usually become ...", "methods", ["attributes", "objects", "classes"], "Actions are methods; nouns are classes and attributes."),
      tx("Explain the difference between inheritance and aggregation. [2]", [["inheritance","is a","derived","child","base class","superclass"],["aggregation","containment","has a","contains","one class contains","object of another"]], 2, "Inheritance creates a derived class from a base class (an 'is a' relationship). Aggregation (containment) is when one class contains objects of another class (a 'has a' relationship).")
    ] },

  { id:"20.1i", code:"20.1.5", title:"Declarative programming: facts and queries in Prolog",
    concept:
      "<p>In <b>declarative programming</b> you do not write the steps. You write <b>facts</b> (things that are known) and <b>rules</b> (relationships between facts) to form a <b>knowledge base</b>, then ask a <b>query</b> (a <b>goal</b>) and the system finds the answers. Facts and rules can be in any order. <b>Prolog</b> uses predicate logic:</p>" +
      "<ul><li>A <b>fact</b> is written in lower case and ends with a full stop: <code>country(france).</code> and <code>language(france,french).</code></li><li>A <b>variable</b> starts with an <b>upper-case</b> letter: <code>Country</code>.</li><li>A <b>query</b> looks for values that make the goal true. Results are given in the order the facts are stored; <code>false</code> means no answer.</li></ul>",
    example:
      "<p>Knowledge base:</p>" + KB1_TEXT_BLOCK +
      "<p><b>Query:</b> <code>language(Country,english).</code> → <b>" + R_ENG.join("; ") + "</b></p>" +
      "<p><b>Query:</b> <code>language(switzerland,Language).</code> → <b>" + R_SWISS.join("; ") + "</b></p>" +
      "<p><b>Query:</b> <code>language(japan,french).</code> → <b>" + (ask(KB1, "language(japan,french)").length ? "true" : "false") + "</b></p>" +
      "<p>(These results were produced by running the queries against the facts above.)</p>",
    checks:[
      mc("What is a fact in Prolog?", "A statement of something that is known, e.g. country(france).", ["A calculation to be repeated", "A loop", "A rule with a condition"], "Facts are written in lower case and end with a full stop."),
      mc("Which of these is a Prolog variable?", "Country", ["country", "france", "'french'"], "Variables begin with an upper-case letter."),
      mc("Using the knowledge base above, what does the query language(Country,english). return?", R_ENG.join(" and "), [R_SWISS.join(" and "), "france", "false"], "The countries that have a language fact with english."),
      mc("Using the knowledge base above, which languages does the query language(switzerland,Language). return?", R_SWISS.join(", "), ["french only", "english, german", "false"], "Three facts match."),
      mc("Using the knowledge base above, what does the query language(japan,french). return?", "false", ["true", "japanese", "french"], "There is no such fact."),
      tx("Write a query to find which country speaks Japanese. [1]", [["language"],["japanese"]], 2, "language(Country,japanese).")
    ] },

  { id:"20.1j", code:"20.1.5", title:"Declarative programming: writing rules",
    concept:
      "<p>A <b>rule</b> defines a new relationship using other facts. In Prolog: <code>head :- condition1, condition2.</code> The head is true if all the conditions are true. <code>:-</code> means <b>IF</b>, a comma means <b>AND</b>, <code>\\+</code> means <b>NOT</b>. Comparisons such as <code>Amount &gt;= Base</code> can be used.</p>" +
      "<p>In some exam papers the same rule is printed as <code>mayBuy(D, A) IF device(D) AND customer(A) AND NOT owns(D, A).</code> Both forms are accepted.</p>" +
      "<p>To <b>satisfy a goal</b>, Prolog tries each fact and rule in order, binding the variables, and <b>backtracks</b> to find every answer.</p>",
    example:
      "<p>Facts and a rule about a shop:</p>" + KB3_TEXT_BLOCK +
      "<p>Query <code>owns(large_tv,Owner).</code> → <b>" + R_OWNERS_TV.join("; ") + "</b>.</p>" +
      "<p>Query <code>mayBuy(D,betty).</code> (devices Betty could buy: devices she does not own) → <b>" + R_BUY_BETTY.join("; ") + "</b>.</p>" +
      "<p>Query <code>mayBuy(D,petrov).</code> → <b>" + R_BUY_PETROV.join("; ") + "</b>.</p>" +
      "<p><b>Bank account rules</b> (from the textbook):</p>" + KB2_TEXT_BLOCK +
      "<p><code>savingsRate(stefan,X).</code> → <b>" + R_RATE_STEFAN.join("; ") + "</b>. <code>savingsRate(tasha,X).</code> → <b>" + R_RATE_TASHA.join("; ") + "</b>, and <code>savingsRate(laila,X).</code> → <b>" + R_RATE_LAILA.join("; ") + "</b> (both the 2% and 1% rates are true for her, because she meets both minimum balances).</p>",
    checks:[
      mc("What does the symbol :- mean in a Prolog rule?", "IF", ["AND", "NOT", "OR"], "The head is true IF the conditions are true."),
      mc("In a Prolog rule body, what does a comma mean?", "AND", ["OR", "NOT", "IF"], "All the conditions must be true."),
      mc("Using the shop knowledge base, which device(s) can Betty buy (does not own)?", R_BUY_BETTY.join(" and "), ["large_tv and speaker", "large_tv only", "none"], "mayBuy(D,betty) is true for devices she does not own."),
      mc("Using the shop knowledge base, which device(s) can Petrov buy?", R_BUY_PETROV.join(" and "), ["large_tv", "bluray_player", "false"], "Petrov owns the large TV and the Blu-ray player, so only the speaker remains."),
      mc("Using the bank-account rule, what interest rate does Stefan (savings, 50) get?", R_RATE_STEFAN[0], ["tenPercent", "onePercent", "twoPercent"], "The savings rate for a balance of 50 is the fivePercent fact (minimum 0); he does not reach 5000 for tenPercent."),
      tx("Write a Prolog rule mayBuy(D, A) that is true when D is a device, A is a customer and A does not own D. [4]", [["device"],["customer"],["owns"],["maybuy","may buy"]], 4, "mayBuy(D,A) :- device(D), customer(A), \\+ owns(D,A).   (or: mayBuy(D,A) IF device(D) AND customer(A) AND NOT owns(D,A).)")
    ] },

  /* ===================== 20.2 File processing and exception handling ===================== */
  { id:"20.2a", code:"20.2.1", title:"Serial text files: open, write, append, read, close",
    concept:
      "<p>A <b>serial file</b> stores records one after another in the order they were added (no order on a key). A <b>text file</b> stores lines of text. Every file operation follows the pattern <b>open → process → close</b>.</p>" +
      tbl(["Operation", "Pseudocode", "Python"], [
        ["Open for writing (creates or overwrites)", "OPENFILE \"Scores.txt\" FOR WRITE", "f = open(\"scores.txt\", \"w\")"],
        ["Open to add to the end", "OPENFILE \"Scores.txt\" FOR APPEND", "f = open(\"scores.txt\", \"a\")"],
        ["Open for reading", "OPENFILE \"Scores.txt\" FOR READ", "f = open(\"scores.txt\", \"r\")"],
        ["Write a line", "WRITEFILE \"Scores.txt\", Line", "f.write(line + \"\\n\")"],
        ["Read a line", "READFILE \"Scores.txt\", Line", "line = f.readline() or: for line in f:"],
        ["Test for the end of the file", "EOF(\"Scores.txt\")", "the for loop ends; readline() returns \"\""],
        ["Close", "CLOSEFILE \"Scores.txt\"", "f.close()"]]) +
      "<p>Opening a file for <b>write</b> destroys any existing content, so use <b>append</b> to add records. Always <b>close</b> the file so that data is saved and the file is released.</p>",
    example:
      pre("OPENFILE \"Scores.txt\" FOR READ\nWHILE NOT EOF(\"Scores.txt\")\n    READFILE \"Scores.txt\", Line\n    OUTPUT Line\nENDWHILE\nCLOSEFILE \"Scores.txt\"") +
      "<p>A Python program that writes, appends to and reads a serial file (this is the first part of the program on the next lesson; its output is shown there too):</p>" +
      pre(PY.files.code.split("# sequential file")[0].trim()) +
      "<p><b>Output of this part:</b></p>" + pre(PY.files.out.split("\n").slice(0, 3).join("\n")),
    checks:[
      mc("Which file mode adds new records to the end of an existing file?", "Append", ["Write", "Read", "Random"], "Write would overwrite the file."),
      mc("What happens if an existing file is opened for writing?", "Its existing contents are replaced", ["New data is added to the end", "The file is read", "Nothing happens"], "Use append to keep the data."),
      mc("Why should a file be closed when the program has finished with it?", "So that all data is saved and the file is released", ["To make the file larger", "To sort the file", "To delete the file"], "An unclosed file can lose data and may stay locked."),
      mc("In a serial file, in what order are records stored?", "The order they were added", ["Sorted on a key field", "At an address worked out by hashing", "Random order chosen by the OS"], "Serial = chronological order."),
      tx("Describe the steps to add a record to the end of a serial file. [3]", [["open","opens","opened"],["append","end of the file","end"],["write","writes","record","add"],["close","closes","closed"]], 3, "Open the file in append mode, write the new record (it is added to the end of the file), then close the file.")
    ] },

  { id:"20.2b", code:"20.2.1", title:"Sequential files",
    concept:
      "<p>A <b>sequential file</b> keeps its records in order of a <b>key field</b> (for example, the register number). To find a record it is read from the start (sequential access) until the key is found or a larger key is reached (then it is not in the file). Records cannot be inserted in the middle of a file, so to <b>insert</b> a record in the right place:</p>" +
      steps(["Open the old file for reading and a new file for writing.", "Copy records to the new file while their key is smaller than the key of the new record.", "Write the new record.", "Copy all the remaining records.", "Close both files, delete the old file and rename the new file to the old name."]),
    example:
      "<p>Python version, run on the computer (the sequential file holds keys 101, 205 and 340; the new record has key 250):</p>" +
      pre(PY.files.code.split("# sequential file ordered on a key field: insert by writing a new file\n")[1].split("# random file")[0].trim()) +
      "<p>Output of the program (3 lines for the serial file, then the sequential file after the insertion):</p>" + pre(PY.files.out.split("\n").slice(0, 4).join("\n")) +
      "<p>The new record <code>250,Dee</code> is written between 205 and 340.</p>",
    checks:[
      mc("What does a sequential file use to decide the order of its records?", "A key field", ["The time of day", "A hash function", "The size of the record"], "Records are in key order."),
      mc("A sequential file has keys 101, 205 and 340. A record with key 250 is added. Which position will it be in?", "Between 205 and 340", ["First", "Last", "Between 101 and 205"], "It has to stay in key order."),
      mc("Why is a new file created when a record is inserted into a sequential file?", "A record cannot be inserted into the middle of a file, so all records are copied in order to a new file", ["Because the old file is full", "Because text files cannot be read", "To make the file random"], "The old file is then deleted and the new one renamed."),
      tx("Describe how a record is found in a sequential file using its key. [3]", [["start","beginning","first"],["read","reads","reading","check","compare"],["key","key field"],["end of file","larger","greater","not found","until found","found"]], 3, "Open the file and read the records one at a time from the start, comparing each record's key with the key being searched for. Stop when the key is found, or when a larger key or the end of the file is reached (not found), then close the file.")
    ] },

  { id:"20.2c", code:"20.2.1", title:"Random files: hashing, SEEK, GETRECORD and PUTRECORD",
    concept:
      "<p>In a <b>random file</b> each record is stored at an <b>address calculated from its key</b> by a <b>hashing algorithm</b> (for example <code>Key MOD 10</code>). The record can be read or written directly (<b>direct access</b>), without reading the others. Records are all the same size. Pseudocode:</p>" +
      pre("OPENFILE \"Students.dat\" FOR RANDOM        // read and write\nSEEK \"Students.dat\", Address                 // go to the record position\nPUTRECORD \"Students.dat\", Student            // write the record there\nGETRECORD \"Students.dat\", Student            // read the record at that position\nCLOSEFILE \"Students.dat\"") +
      "<p>Two keys may hash to the same address (a <b>collision</b>); the program must then use the next free address (open hashing) or an overflow area (closed hashing).</p>" +
      "<p><b>Exam link (June 2026 Paper 3):</b> complete a function using OPENFILE ... FOR RANDOM, SEEK, GETRECORD, a selection statement and CLOSEFILE, <b>before</b> the RETURN statement:</p>" +
      pre("FUNCTION TempCheck(Position : INTEGER) RETURNS STRING\n    DECLARE Temperature : REAL\n    DECLARE Response : STRING\n    OPENFILE \"Temperatures.dat\" FOR RANDOM\n    SEEK \"Temperatures.dat\", Position\n    GETRECORD \"Temperatures.dat\", Temperature\n    IF Temperature > 0 THEN\n        Response " + LEFT + " \"Not freezing\"\n    ELSE\n        Response " + LEFT + " \"Freezing\"\n    ENDIF\n    CLOSEFILE \"Temperatures.dat\"\n    RETURN Response\nENDFUNCTION"),
    example:
      "<p>Python, with fixed-size records (an integer key and a name) and the hash <code>key MOD 10</code>:</p>" +
      pre(PY.files.code.split("# random file")[1].replace(/^[^\n]*\n/, "").trim()) +
      "<p>The last lines of the program's output are:</p>" + pre(PY.files.out.split("\n").slice(4).join("\n")) +
      "<p>The hash values: 205 → 5, 340 → 0, 101 → 1. The record for key 340 was read directly: <code>seek</code> moves to position 0, then the 14-byte record is read.</p>",
    checks:[
      mc("How is the address of a record in a random file found?", "By applying a hashing algorithm to the record key", ["By reading all the records in order", "By sorting the file", "By using the date"], "The hash function gives the address directly."),
      mc("Using the hash Key MOD 10, what address is used for key 205?", "5", ["20", "0", "205"], "205 MOD 10 = 5."),
      mc("Which pseudocode statement moves to a record position in a random file before reading or writing it?", "SEEK", ["OPENFILE", "CLOSEFILE", "RETURN"], "SEEK sets the position, then GETRECORD or PUTRECORD."),
      mc("Which statement reads a record from a random file?", "GETRECORD", ["PUTRECORD", "SEEK", "READFILE only"], "GETRECORD returns the record at the current position."),
      mc("What is a collision in a hashed file?", "Two keys produce the same address", ["The file is full", "A key is missing", "A record is deleted"], "The program must find another place for one of the records."),
      fill("Complete the statements to read the record at Position from the random file.", "OPENFILE \"Temperatures.dat\" FOR {1}\n{2} \"Temperatures.dat\", Position\n{3} \"Temperatures.dat\", Temperature", [["RANDOM", ["READ", "WRITE", "APPEND"]], ["SEEK", ["GETRECORD", "OPENFILE", "RETURN"]], ["GETRECORD", ["PUTRECORD", "SEEK", "CLOSEFILE"]]], "Open for RANDOM access, SEEK to the position, then GETRECORD."),
      tx("Describe how a record is read from a random file. [3]", [["hash","hashing","key","address","calculate"],["seek","go to","position","move to"],["getrecord","read","reads the record","reads"]], 3, "The record key is put through a hashing algorithm to calculate the address of the record. The program moves to that position in the file (SEEK) and reads the record there (GETRECORD), without reading the other records.")
    ] },

  { id:"20.2d", code:"20.2.2", title:"Exceptions and exception handling",
    concept:
      "<p>An <b>exception</b> is an unexpected event during the running of a program that would make it stop (crash). <b>Exception handling</b> is code that traps the exception, so the program can show a helpful message and either recover or close down in an orderly way. This makes the program <b>robust</b>.</p>" +
      "<p><b>Typical exceptions:</b> dividing by zero; a file that does not exist; reaching the end of a file while reading; invalid data (text where a number is expected); lost connection to a device.</p>" +
      "<p>In Python: <code>try:</code> the code that might fail, <code>except</code> the type of error, then the recovery, and optionally <code>finally:</code> code that always runs (such as closing a file). Use exception handling when the error can be caused by something outside the program's control (files, user input, networks). Do not use it for errors that can be avoided with a simple check.</p>",
    example:
      py("exc") + pyout("exc") +
      "<p><b>Paper 4 note:</b> the practical papers award a mark for appropriate exception handling when a text file is opened and read, with a message output if the file cannot be found.</p>",
    checks:[
      mc("What is an exception?", "An unexpected event that would stop the program", ["A planned end to a loop", "A syntax error found by the compiler", "A comment in the code"], "It happens when the program is running."),
      mc("What is the purpose of exception handling?", "To stop the program crashing and respond to the problem", ["To make the program run faster", "To remove the need for validation of every input", "To translate the program"], "The error is trapped and a message is output."),
      mc("Which situation would need exception handling?", "Opening a file that may not exist", ["Adding two integers", "Declaring a variable", "Using a FOR loop"], "The program cannot be sure the file exists."),
      mc("In the Python program above, why is the file-not-found message followed by 'Finished'?", "The finally section always runs", ["Because of a syntax error", "Because the file was found", "Because except is a loop"], "finally runs whether or not an exception occurred."),
      tx("Explain why exception handling is used when a program reads from a text file. [2]", [["file","not exist","missing","not found","cannot be opened","does not exist","end of file","corrupt"],["crash","stop","message","error message","robust","handle","trap","recover"]], 2, "The file might not exist or might contain invalid data, which would make the program crash. Exception handling traps the error and outputs a message so the program can recover or close down in an orderly way.")
    ] }

  ];

  var TEST = {
    mcq:[
      mc("Which paradigm is a program that states facts and rules, and then asks a query, written in?", "Declarative", ["Imperative", "Low-level", "Object-oriented"], "Prolog is declarative."),
      mc("Memory address 230 holds 231 and address 231 holds 5. After LDI 230, ACC holds ...", "5", ["231", "230", "0"], "Indirect addressing."),
      mc("After the sum program in the lessons ends, what is stored at address 700?", String(RUN_B.mem[700]), ["13", "4", "0"], "4 + 9 + 2."),
      mc("A class Bus is derived from a class Vehicle. This is ...", "inheritance", ["aggregation", "overloading", "encapsulation"], "A bus is a vehicle."),
      mc("A class Flight contains an array of Passenger objects. This is ...", "aggregation (containment)", ["inheritance", "polymorphism", "a destructor"], "A flight has passengers."),
      mc("Which statement in the pseudocode reads a record from a random file at a position?", "GETRECORD after SEEK", ["READFILE only", "PUTRECORD", "OPENFILE FOR READ only"], "SEEK first, then GETRECORD."),
      mc("What is the purpose of a try ... except block?", "To trap an exception so the program does not crash", ["To speed up loops", "To declare variables", "To define a class"], "It handles the error."),
      mc("Using the shop knowledge base, which devices can Betty buy?", R_BUY_BETTY.join(" and "), ["large_tv", "all three", "none"], "She does not own bluray_player or speaker.")
    ],
    typed:[
      { q:"Explain the difference between a class and an object. [2]", groups:[["template","blueprint","definition","describes","defines","attributes and methods"],["instance","created from","occurrence","run time","real","example of"]], need:2, model:"A class is a template that defines the attributes and methods; an object is an instance of the class created while the program is running." },
      { q:"Write a Prolog query to find all the people who own the large TV in the shop knowledge base. [1]", groups:[["owns"],["large tv","large_tv","largetv"]], need:2, model:"owns(large_tv,Owner)." },
      { q:"Describe how a sequential file is searched for a record with a given key. [3]", groups:[["start","beginning","first"],["read","compare","check"],["end of file","larger","greater","found","not found"]], need:3, model:"Start at the beginning of the file and read each record in turn, comparing its key with the key required, until the key is found or a larger key (or the end of the file) shows that it is not in the file." }
    ]
  };

  root.ILEARN_UTIL = { runAsm: runAsm, parseKB: parseKB, ask: ask, KB1_TEXT: KB1_TEXT, KB2_TEXT: KB2_TEXT };
  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat(LESSONS);
  (root.ILEARN_TESTS = root.ILEARN_TESTS || {})[20] = TEST;
})(typeof window !== "undefined" ? window : this);
