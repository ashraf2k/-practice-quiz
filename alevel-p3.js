/* iLearn A Level: Paper 3 past-paper practice from the June 2026 papers 9618/31, 9618/32 and 9618/33.
   Every lesson is built from real questions in those papers. The question is summarised in the lesson's own words, the marking points are
   those of the published mark scheme, and every calculation, truth table, stack trace and path table is produced by the code below
   (floating-point conversion, truth tables, a stack evaluator, Dijkstra's algorithm, A* and a small Prolog engine) and checked against the
   answers in the mark scheme. Diagrams that cannot be copied are redrawn as lists or tables. */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx, fill = root.ILQ.fill;
  var LEFT = "←", MINUS = "−";
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function pre(s){ return "<pre class='ln-pre'>" + esc(s) + "</pre>"; }
  function ul(a){ return "<ul>" + a.map(function(x){ return "<li>" + x + "</li>"; }).join("") + "</ul>"; }
  function tbl(heads, rows){
    return "<table class='ln-table'><tr>" + heads.map(function(h){ return "<th>" + h + "</th>"; }).join("") + "</tr>" +
      rows.map(function(r){ return "<tr>" + r.map(function(c){ return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
  }
  function ov(s){ return "<span style='text-decoration:overline'>" + s + "</span>"; }
  function SRC(list){ return "<p class='ln-note'><b>Past-paper questions in this lesson:</b> " + list + " (9618 May/June 2026). The questions are summarised here; the marking points are those of the published mark schemes.</p>"; }

  /* ---------- floating point (two's complement mantissa and exponent) ---------- */
  function bitsVal(b){ var v = parseInt(b, 2); return b.charAt(0) === "1" ? v - Math.pow(2, b.length) : v; }
  function fpDecode(m, e){
    var mant = -parseInt(m.charAt(0), 10), i;
    for(i = 1; i < m.length; i++) mant += parseInt(m.charAt(i), 10) * Math.pow(2, -i);
    return mant * Math.pow(2, bitsVal(e));
  }
  function toTwos(int, len){ return (int < 0 ? int + Math.pow(2, len) : int).toString(2).padStart(len, "0"); }
  function fpEncode(x, mLen, eLen){
    var emin = -Math.pow(2, eLen - 1), emax = Math.pow(2, eLen - 1) - 1, e, mant, scaled;
    for(e = emin; e <= emax; e++){
      mant = x / Math.pow(2, e);
      if(x > 0 ? (mant >= 0.5 && mant < 1) : (mant >= -1 && mant < -0.5)){
        scaled = mant * Math.pow(2, mLen - 1);
        if(scaled === Math.round(scaled)) return { m: toTwos(Math.round(scaled), mLen), e: toTwos(e, eLen), exp: e };
      }
    }
    return null;
  }
  function spaced(b){ return b.split("").join(" "); }
  var FP_A = fpEncode(-10.8125, 10, 6), FP_B = fpDecode("1010000111", "000111"), FP_C = fpDecode("101101000110", "0110"), FP_D = fpEncode(-18.5625, 12, 4);
  var MAX12 = fpDecode("011111111111", "0111");

  /* ---------- stack evaluation of RPN ---------- */
  function rpn(tokens, vars){
    var st = [], rows = [];
    tokens.forEach(function(t){
      if(/^[-+*\/]$/.test(t)){ var b = st.pop(), a = st.pop(); st.push(t === "+" ? a + b : t === "-" ? a - b : t === "*" ? a * b : a / b); }
      else st.push(vars && vars[t] !== undefined ? vars[t] : Number(t));
      rows.push([t].concat([st.slice().join(", ")]));
    });
    return { rows: rows, result: st[0] };
  }
  function rpnTable(tokens, vars){
    var r = rpn(tokens, vars);
    return tbl(["Token read", "Stack after it (bottom → top)"], r.rows.map(function(x){ return ["<code>" + esc(x[0]) + "</code>", x[1]]; })) + "<p>Final value left on the stack: <b>" + r.result + "</b></p>";
  }
  var R31 = rpn("15 9 - 24 3 / * 18 6 + /".split(" ")), R32 = rpn("c a b - * b c + / d *".split(" "), { a: 8, b: 2, c: 10, d: 18 }), R33 = rpn("16 3 * 36 6 / 18 6 - * +".split(" "));

  /* ---------- Dijkstra and A* on the graphs of the papers ---------- */
  function dijkstra(edges, start){
    var adj = {}, dist = {}, done = {}, order = [], names = [];
    edges.forEach(function(e){ [e[0], e[1]].forEach(function(n){ if(!adj[n]){ adj[n] = []; names.push(n); dist[n] = Infinity; } }); adj[e[0]].push([e[1], e[2]]); adj[e[1]].push([e[0], e[2]]); });
    dist[start] = 0;
    while(true){
      var best = null; names.forEach(function(n){ if(!done[n] && dist[n] < Infinity && (best === null || dist[n] < dist[best])) best = n; });
      if(best === null) break;
      done[best] = true; order.push(best + " (" + dist[best] + ")");
      adj[best].forEach(function(p){ if(dist[best] + p[1] < dist[p[0]]) dist[p[0]] = dist[best] + p[1]; });
    }
    return { dist: dist, order: order };
  }
  function astar(edges, h, start, goal){
    var adj = {}, g = {}, path = {}, closed = {}, open = {}, rows = [];
    edges.forEach(function(e){ [e[0], e[1]].forEach(function(n){ if(!adj[n]) adj[n] = []; }); adj[e[0]].push([e[1], e[2]]); adj[e[1]].push([e[0], e[2]]); });
    g[start] = 0; path[start] = [start]; open[start] = true; rows.push([start, start, 0, h[start], h[start]]);
    while(true){
      var cur = null; Object.keys(open).forEach(function(n){ if(cur === null || g[n] + h[n] < g[cur] + h[cur]) cur = n; });
      if(cur === null) return null;
      if(cur === goal) return { rows: rows, path: path[cur], cost: g[cur] };
      delete open[cur]; closed[cur] = true;
      adj[cur].forEach(function(p){
        var n = p[0], ng = g[cur] + p[1];
        if(closed[n]) return;
        if(g[n] === undefined || ng < g[n]){ g[n] = ng; path[n] = path[cur].concat([n]); open[n] = true; rows.push([path[n].join("→"), n, ng, h[n], ng + h[n]]); }
      });
    }
  }
  var G31 = [["Begin","P",9],["Begin","R",6],["Begin","U",21],["P","Q",5],["P","R",2],["Q","S",5],["R","S",8],["S","U",6],["S","T",3],["T","U",4]];
  var D31 = dijkstra(G31, "Begin");
  var G32 = [["Home","A",6],["Home","F",16],["A","B",8],["A","C",3],["A","F",8],["B","C",4],["C","D",12],["D","F",6],["D","E",7],["E","F",3]];
  var D32 = dijkstra(G32, "Home");
  var G33 = [["W","N1",6],["W","N2",4],["W","N3",7],["N1","N6",12],["N1","N2",3],["N2","N3",2],["N2","N5",7],["N3","N4",4],["N5","N6",4],["N5","N4",2],["N5","E",11],["N6","E",3],["N4","E",12]];
  var H33 = { W: 18, N1: 15, N2: 14, N3: 13, N4: 9, N5: 7, N6: 3, E: 0 };
  var A33 = astar(G33, H33, "W", "E");
  function dTable(d, names){ return tbl(names, [names.map(function(n){ return d.dist[n]; })]); }

  /* ---------- logic ---------- */
  var CIRC = [];
  (function(){ for(var i = 0; i < 8; i++){ var A = (i >> 2) & 1, B = (i >> 1) & 1, C = i & 1, P = A ? 0 : 1, Q = B ? 0 : 1, R = (P && Q && C) ? 0 : 1, S = A ^ C, Z = (R && Q && S) ? 1 : 0; CIRC.push([A, B, C, P, Q, R, S, Z]); } })();
  function kmapHtml(rows){ // rows: 4 rows (CD = 00, 01, 11, 10) of 4 columns (AB = 00, 01, 11, 10)
    var cd = ["00", "01", "11", "10"];
    return "<table class='ln-table' style='text-align:center'><tr><th>CD \\ AB</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>" +
      rows.map(function(r, i){ return "<tr><th>" + cd[i] + "</th>" + r.map(function(v){ return "<td>" + v + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
  }
  var K31 = [[0,0,1,0],[0,1,1,0],[1,1,1,1],[0,0,1,0]], K32 = [[0,1,1,0],[1,1,1,1],[0,1,1,0],[0,1,1,0]], K33 = [[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,1,1,0]];
  // sum-of-products check from the K-maps (each cell is (AB column, CD row))
  function kv(K, A, B, C, D){ var col = [[0,0],[0,1],[1,1],[1,0]], r = [[0,0],[0,1],[1,1],[1,0]], ci = -1, ri = -1, i; for(i = 0; i < 4; i++){ if(col[i][0] === A && col[i][1] === B) ci = i; if(r[i][0] === C && r[i][1] === D) ri = i; } return K[ri][ci]; }
  function sameAs(K, fn){ for(var i = 0; i < 16; i++){ var A = (i >> 3) & 1, B = (i >> 2) & 1, C = (i >> 1) & 1, D = i & 1; if(kv(K, A, B, C, D) !== (fn(A, B, C, D) ? 1 : 0)) return false; } return true; }
  var OK31 = sameAs(K31, function(A, B, C, D){ return (A && B) || (B && D) || (C && D); });
  var OK32 = sameAs(K32, function(A, B, C, D){ return B || (!C && D); });
  var OK33 = sameAs(K33, function(A, B, C, D){ return (!A && B) || (B && !D); });
  if(!(OK31 && OK32 && OK33) && typeof console !== "undefined") console.error("alevel-p3: a K-map expression does not match its map");
  function eqExpr(f, g){ for(var i = 0; i < 16; i++){ var A = (i >> 3) & 1, B = (i >> 2) & 1, C = (i >> 1) & 1, D = i & 1; if(!!f(A, B, C, D) !== !!g(A, B, C, D)) return false; } return true; }
  var DM32 = eqExpr(function(A, B, C, D){ return !(!A && B && C && !D) || (A && D); }, function(A, B, C, D){ return A || !B || !C || D; });
  var DM33 = eqExpr(function(A, B, C){ return !(A || B || C) || !(B || C); }, function(A, B, C){ return !B && !C; });
  if(!(DM32 && DM33) && typeof console !== "undefined") console.error("alevel-p3: a De Morgan simplification does not match");

  /* ---------- Prolog and assembly helpers from the topic-20 file ---------- */
  var U = root.ILEARN_UTIL || {};
  var KB31_TEXT = ["device(projector).", "device(large_tv).", "device(medium_tv).", "device(bluray_player).", "device(amplifier).", "device(media_player).", "device(main_speakers).", "device(centre_speaker).", "device(surround_speakers).",
    "customer(petrov).", "customer(margaret).", "customer(steffan).", "customer(susan).", "customer(allan).", "customer(sammy).",
    "owns(projector,petrov).", "owns(media_player,petrov).", "owns(projector,susan).", "owns(projector,sammy).", "owns(media_player,allan).", "owns(bluray_player,steffan).",
    "wants(main_speakers,margaret).", "wants(surround_speakers,susan).", "wants(medium_tv,steffan).",
    "may_buy_device(D,A) :- device(D), customer(A), \\+ owns(D,A)."];
  if(root.ILEARN_UTIL) root.ILEARN_UTIL.KB31_TEXT = KB31_TEXT;
  var P31_PROJ = U.ask ? U.ask(U.parseKB(KB31_TEXT), "owns(projector,Owner)", "Owner") : ["petrov", "susan", "sammy"];
  var P31_MEDIA = U.ask ? U.ask(U.parseKB(KB31_TEXT), "owns(media_player,Owner)", "Owner") : ["petrov", "allan"];
  var P31_BUY = U.ask ? U.ask(U.parseKB(KB31_TEXT), "may_buy_device(D,susan)", "D") : [];
  var ASM33 = U.runAsm ? U.runAsm([[200, "LDM", "#325"], [201, "STO", "A"], [202, "LDD", 232], [203, "STO", "B"], [204, "SUB", "#50"], [205, "STO", 875], [206, "LDD", "A"], [207, "ADD", 580], [208, "SUB", 875], [209, "STO", "Final"], [210, "END", null]], { 232: 120, 580: 26 }, 0, true) : null;

  var LESSONS = [

  /* ============================ 13 ============================ */
  { id:"13.p3a", code:"13.1.2", title:"Paper 3 questions: user-defined data types",
    concept: SRC("31 Q1, 32 Q1, 33 Q1") +
      "<p><b>What was asked</b></p>" +
      ul(["<b>31 Q1 (5 marks):</b> name two composite user-defined types other than a record; state the purpose of a pointer type; write the pseudocode to declare a pointer type <code>Word</code> for STRING data.", "<b>32 Q1 (5 marks):</b> write the declaration of the non-composite type <code>Animals</code> holding Alpaca, Chicken, Donkey, Duck, Goat, Pony, Sheep; name the type of non-composite type this is; give two features of any list used in such a type.", "<b>33 Q1 (5 marks):</b> explain why user-defined types are needed; write the declaration of the non-composite type <code>Fibonacci</code> holding 0, 1, 2, 3, 5, 8, 13, 21."]) +
      "<p><b>Mark-scheme points.</b> Composite types: set, class/object (record is excluded because it is given). A pointer type references a memory location. Declarations: <code>TYPE Word = ^STRING</code>; <code>TYPE Animals = (Alpaca, Chicken, Donkey, Duck, Goat, Pony, Sheep)</code> (the order must be correct, no quotation marks, no extra punctuation); <code>TYPE Fibonacci = (0, 1, 2, 3, 5, 8, 13, 21)</code>. An enumerated type: the list is complete, fixed, ordered and the items are unique. User-defined types are needed when the language has no suitable built-in type, to group data under one identifier, to extend existing types and to make code easier to read.</p>",
    example:
      pre("TYPE Word = ^STRING\nTYPE Animals = (Alpaca, Chicken, Donkey, Duck, Goat, Pony, Sheep)\nTYPE Fibonacci = (0, 1, 2, 3, 5, 8, 13, 21)\nDECLARE Pet : Animals\nPet " + LEFT + " Goat") +
      "<p>In the enumerated type the items have an implied order (Alpaca &lt; Chicken &lt; ... &lt; Sheep), the list cannot change after it is declared, and every value in it is different.</p>",
    checks:[
      mc("Which is a composite user-defined data type (other than a record)?", "Set", ["Pointer", "Enumerated", "Integer"], "Set and class/object are composite; enumerated and pointer are non-composite."),
      mc("What is the purpose of a pointer data type?", "To reference a memory location", ["To store a list of values", "To define a group of fields", "To store a real number"], "A pointer holds the address of the data."),
      mc("Which statement correctly declares a pointer type Word for STRING data?", "TYPE Word = ^STRING", ["TYPE Word = (STRING)", "DECLARE Word : ^STRING", "TYPE Word = STRING^"], "The ^ comes before the data type."),
      fill("Complete the declaration of the Animals type.", "{1} Animals {2} (Alpaca, Chicken, Donkey, Duck, Goat, Pony, Sheep)", [["TYPE", ["DECLARE", "CLASS", "SET"]], ["=", [":", "←", "IS"]]], "TYPE name = (values). Mark scheme: only the equals sign is allowed, no quotation marks round the values."),
      mc("What is the user-defined non-composite type Animals called?", "Enumerated", ["Pointer", "Record", "Set"], "It is defined by listing all its possible values."),
      mc("Which is a feature of the list in an enumerated type?", "The values are unique and in a fixed order", ["The values can be changed at run time", "The values can be repeated", "The list is stored on the hard disk"], "The mark scheme: complete/fixed, ordered, unique."),
      tx("Explain why user-defined data types are needed. [3]", [["not exist","built-in","does not exist","no suitable","language","existing","needed type","requirement","exactly"],["group","single identifier","one identifier","set of data","custom","structure","composite","extend"],["easier","read","understand","readable","match","matches"]], 2, "The programmer may need a data type that does not exist in the language, to represent a particular set or group of data under a single identifier, to extend existing types (composite types), to make the code easier to read, and to match the program's requirements exactly.")
    ] },

  { id:"13.p3b", code:"13.2.1", title:"Paper 3 questions: serial, sequential and random files",
    concept: SRC("33 Q3 (serial), 32 Q4 (sequential), 31 Q2 (random)") +
      "<p>Each paper asks the same three things about one file organisation: <b>an example of where it is used</b> [1], <b>how the records are organised</b> [2], and <b>the process to find a record</b> [3].</p>" +
      tbl(["", "Serial (33 Q3)", "Sequential (32 Q4)", "Random (31 Q2)"], [
        ["Example use", "Batch processing, a transaction file for a batch, bills or payroll, backup", "Batch processing, log files, bills/payroll, backup", "Booking systems (airline), operating-system file management, video games, encryption or compression utilities"],
        ["Organisation", "Records one after the other, in <b>chronological order</b>; new records appended at the end", "Records one after the other in a given order, usually on a <b>key field</b> (unique identifier). Chronological order is wrong here", "Records in no particular order / any available position; the <b>record key is put through a hash function</b> to give the location; new records go in an empty location"],
        ["Finding a record", "Sequential access: check each record one after the other until the end of the file or the record is found", "Search from the physical start, one by one, using the record key until the record is found, or until the key being searched has been passed, or the end of the file", "Direct access: a hashing function on the key field gives the location; if the record is there, it is retrieved; if not, a collision-resolution strategy (e.g. linear probing / open or closed hashing)"]]),
    example:
      "<p>Searching a sequential file for key 250 in the order 101, 205, 340: read 101 (too small), read 205 (too small), read 340 (larger than 250: stop, not in the file). In a serial file the same search must read to the end of the file because the records are not in key order.</p>",
    checks:[
      mc("In which organisation are records stored in chronological order?", "Serial", ["Sequential", "Random", "Indexed"], "Serial: the order in which they were added. Sequential uses a key field."),
      mc("Which file organisation uses a hash function on the record key?", "Random", ["Serial", "Sequential", "None of these"], "The hash gives the address of the record."),
      mc("A sequential file search can stop before the end of the file because ...", "the record key being searched for has been passed", ["the file is empty", "all keys are equal", "the file was closed"], "The records are in key order, so a larger key means the record is not in the file."),
      mc("Which is an appropriate use of a serial file?", "A transaction file for batch processing", ["A flight booking system", "A video game map", "A hash table of passwords"], "Serial files are used where data is added chronologically and processed in batches."),
      tx("Describe how records are organised in a random file. [2]", [["no particular order","any available","any position","not in order","no order","empty location","empty position"],["key","hash","hashing","hash function","record key"]], 2, "Records are stored in no particular order, in any available position. A record key is used with a hash function to determine the location where each record is stored, and new records are added in an empty location.")
    ] },

  { id:"13.p3c", code:"13.3.2", title:"Paper 3 questions: floating-point calculations",
    concept: SRC("31 Q3 (a, b), 32 Q3a, 33 Q5a") +
      "<p>All three papers use a binary floating-point system with a <b>two's complement mantissa and a two's complement exponent</b>. The systems differ:</p>" +
      tbl(["Paper", "Mantissa bits", "Exponent bits", "Question"], [["31 Q3", "10", "6", "(a) normalised form of −10.8125 [3]; (b) denary value of 1010000111 | 000111 [3]"], ["32 Q3", "12", "4", "(a) denary value of 101101000110 | 0110 [3]"], ["33 Q5", "12", "4", "(a) normalised form of −18.5625 [4]"]]) +
      "<p><b>Method for denary → floating point:</b> write the positive binary value, take the two's complement for a negative number, move the binary point so that the mantissa starts <b>10</b> (negative) or <b>01</b> (positive), and count the places moved: that is the exponent. <b>Method for floating point → denary:</b> move the binary point by the exponent (right if positive), then evaluate the two's complement value.</p>",
    example:
      "<p><b>31 Q3(a):</b> positive 10.8125 = 01010.1101; two's complement (for −10.8125) 10101.0011. Moving the point 4 places left gives <b>1.010100110</b> as the 10-bit mantissa, with exponent 4 (000100):</p>" +
      tbl(["Mantissa (10 bits)", "Exponent (6 bits)"], [[spaced(FP_A.m), spaced(FP_A.e)]]) +
      "<p><b>31 Q3(b):</b> the exponent 000111 = 7, so the binary point moves 7 places right: 10100001.11 = −128 + 32 + 1 + 0.5 + 0.25 = <b>" + String(FP_B).replace("-", MINUS) + "</b>.</p>" +
      "<p><b>32 Q3(a):</b> the exponent 0110 = 6: 1011010.001100 = −64 + 16 + 8 + 2 + 0.125 + 0.0625 = <b>" + String(FP_C).replace("-", MINUS) + "</b>.</p>" +
      "<p><b>33 Q5(a):</b> −18.5625: positive 010010.1001, two's complement 101101.0111; point moved 5 places gives mantissa <b>" + spaced(FP_D.m) + "</b>, exponent <b>" + spaced(FP_D.e) + "</b> (" + FP_D.exp + ").</p>" +
      "<p>All four results were produced by a program that encodes and decodes the numbers, and they match the mark schemes.</p>",
    checks:[
      mc("31 Q3(a): what is the normalised floating-point form of −10.8125 (10-bit mantissa, 6-bit exponent)?", "Mantissa " + FP_A.m + ", exponent " + FP_A.e, ["Mantissa 0101011010, exponent 000100", "Mantissa " + FP_A.m + ", exponent 000101", "Mantissa 1010100110, exponent 111100"], "10.8125 = 1010.1101; the point moves 4 places so the exponent is 4."),
      mc("31 Q3(b): what is the denary value of mantissa 1010000111, exponent 000111?", String(FP_B).replace("-", MINUS), ["−94.75", "−3.40", "94.25"], "Exponent 7 moves the point 7 places: 10100001.11 = −128 + 32 + 1 + 0.75."),
      mc("32 Q3(a): what is the denary value of mantissa 101101000110, exponent 0110 (12-bit mantissa, 4-bit exponent)?", String(FP_C).replace("-", MINUS), ["−37.5", "37.8125", "−18.9"], "Exponent 6: 1011010.001100 = −64 + 16 + 8 + 2 + 0.125 + 0.0625."),
      mc("33 Q5(a): what is the mantissa of −18.5625 in the 12-bit mantissa, 4-bit exponent system?", FP_D.m, ["010010100100", "101101011110", "100101011100"], "Positive 010010.1001; two's complement 101101.0111; point moved 5 places."),
      mc("What does the exponent 0101 mean in 33 Q5(a)?", "Move the binary point 5 places", ["Multiply by 5", "The mantissa is negative", "Add 5 to the mantissa"], "The value is the mantissa multiplied by 2 to the power of the exponent."),
      mc("When is a positive mantissa normalised?", "When it starts 01", ["When it starts 00", "When it starts 11", "When it ends in 1"], "The first two bits must differ; a negative mantissa starts 10."),
      tx("Show how you would convert a normalised floating-point number to denary. [2]", [["exponent","move the binary point","binary point","move the point"],["twos complement","two's complement","negative","place values","evaluate","mantissa"]], 2, "Use the exponent to move the binary point (right if positive) and then evaluate the two's complement binary number using its place values.")
    ] },

  { id:"13.p3d", code:"13.3.4", title:"Paper 3 questions: underflow and overflow",
    concept: SRC("32 Q3b (underflow), 33 Q5b (overflow)") +
      "<p><b>32 Q3(b) [2]:</b> describe a situation that could cause underflow and its consequences. <b>Mark scheme:</b> a calculation is carried out on a (normalised) number so that the result is <b>smaller than the lowest value that can be stored</b> (the exponent is too negative for the number of exponent bits); the result becomes zero.</p>" +
      "<p><b>33 Q5(b) [3]:</b> the numbers 91.5 and 123.25 are stored in the 12-bit mantissa, 4-bit exponent system and added. Explain the problem. <b>Mark scheme:</b> the sum is 214.75; this exceeds the largest number that can be stored (with exponent 7 the largest is 127.9375); an exponent of 8 would be needed; <b>overflow</b> occurs.</p>",
    example:
      "<p>The largest positive number in the 12-bit mantissa, 4-bit exponent system has mantissa 011111111111 (just under 1) and exponent 0111 (7): " + MAX12 + ". Adding 91.5 + 123.25 = " + (91.5 + 123.25) + ", which is larger, so the result cannot be stored: <b>overflow</b>. A number needing an exponent of 8 would need a 5-bit exponent.</p>" +
      "<p><b>Increasing the number of exponent bits</b> increases the <b>range</b>; <b>increasing the mantissa bits</b> increases the <b>precision</b>.</p>",
    checks:[
      mc("What is the largest number in the 12-bit mantissa and 4-bit exponent system?", String(MAX12), ["255.875", "128", "2047"], "Mantissa 011111111111 is 1 − 2^−11 and 2^7 = 128: 127.9375."),
      mc("91.5 + 123.25 is stored in that system. What is the result?", "An overflow, because 214.75 is bigger than the largest value", ["An underflow", "A rounding error of 0.25", "The correct result 214.75"], "214.75 is more than 127.9375, so it cannot be represented."),
      mc("What causes an underflow?", "A result closer to zero than the smallest storable value", ["A result bigger than the largest value", "A mantissa that is negative", "An exponent of 0"], "The exponent is too negative for the bits available and the result becomes zero."),
      mc("Which change to the bit allocation would remove the overflow in the question?", "More bits for the exponent", ["More bits for the mantissa", "Fewer bits for the exponent", "A negative mantissa"], "A bigger exponent range allows larger numbers (an exponent of 8 is needed)."),
      tx("Explain the problem that occurs when 91.5 and 123.25 are added and the result stored in the 12-bit mantissa, 4-bit exponent system. [3]", [["214.75","sum","total","result"],["largest","maximum","too large","exceeds","greater than","127.9375","128","cannot be stored"],["overflow","exponent of 8","exponent 8"]], 3, "The sum is 214.75. This is larger than the largest number that can be stored (127.9375, with an exponent of 7); an exponent of 8 would be needed, so overflow occurs.")
    ] },

  /* ============================ 14 ============================ */
  { id:"14.p3a", code:"14.1.3", title:"Paper 3 questions: the TCP/IP protocol stack",
    concept: SRC("31 Q4, 32 Q2, 33 Q2") +
      "<p><b>31 Q4 [4] (matching):</b> connect each layer to its description.</p>" +
      tbl(["Layer", "Description (from the mark scheme)"], [["Application", "contains all the programs that exchange data and includes protocols such as HTTP, FTP and POP3"], ["Transport", "ensures packets arrive in sequence without errors"], ["Internet", "identifies the intended network and host"], ["Link", "interconnects nodes or hosts in a network, encapsulates IP packets into frames and ensures the correct protocols are followed"]]) +
      "<p>The distractor \"provides remote access to files on a host server\" describes a protocol (FTP), not a layer, and does not match any layer in the paper.</p>" +
      "<p><b>32 Q2 [4] (fill the gaps):</b> the suite has <b>four</b> layers in a stack; it sends <b>packets</b> of data across the internet; the lowest layer is the <b>link</b> layer, which <b>interconnects</b> nodes in the network.</p>" +
      "<p><b>33 Q2 [4] (fill the gaps):</b> the implementation of a <b>protocol</b> suite can be viewed as a stack; each <b>layer</b> has its own functionality and communicates only with <b>adjacent</b> layers; user interaction is at the highest level, the <b>Application</b> layer.</p>",
    example:
      "<p>The data flows down the stack at the sender (Application → Transport → Internet → Link) and back up at the receiver. A layer talks only to the layer directly above or below it (adjacent layers).</p>",
    checks:[
      mc("How many layers are in the TCP/IP suite?", "Four", ["Three", "Five", "Seven"], "Application, Transport, Internet, Link."),
      mc("Which layer ensures that packets arrive in sequence without errors?", "Transport", ["Application", "Internet", "Link"], "The transport layer (TCP)."),
      mc("Which layer identifies the intended network and host?", "Internet", ["Link", "Transport", "Application"], "The internet layer uses IP addresses."),
      mc("Which layer is at the bottom of the stack and interconnects nodes?", "Link", ["Application", "Transport", "Internet"], "It sends frames over the physical network."),
      mc("A layer communicates only with ...", "adjacent layers", ["all layers", "the transport layer", "the application layer"], "Each layer uses the services of the layer below it."),
      fill("Complete the paragraph (32 Q2).", "The TCP/IP protocol suite consists of {1} layers which can be thought of as a stack. It is designed to send {2} of data across the internet. The lowest layer of the stack is the {3} layer, which {4} nodes in the network.", [["four", ["seven", "many", "lists"]], ["packets", ["controls", "applications", "disconnects"]], ["link", ["transport", "internet", "application"]], ["interconnects", ["disconnects", "controls", "lists"]]], "Four layers; packets; the link layer; it interconnects the nodes.")
    ] },

  /* ============================ 15 ============================ */
  { id:"15.p3a", code:"15.1.5", title:"Paper 3 questions: virtual machines",
    concept: SRC("31 Q5 (benefits and limitations), 32 Q5 (meaning)") +
      "<p><b>31 Q5 [4]:</b> outline two benefits and two limitations of a virtual machine. <b>Benefits (any two):</b> a different instruction set or several operating-system environments on one computer, or running legacy software that is not compatible with the host; no need to buy extra hardware to test or use applications; the guest OS can crash, or suspicious software can be tried, without harming the host. <b>Limitations (any two):</b> degraded performance because the hardware is reached indirectly through the host (worse when several VMs share one host); dependence on the features and weaknesses of the host, and not all hardware or software can be emulated; managing and maintaining a VM is complex. <i>\"Cheaper\" alone gets no mark; it must say why.</i></p>" +
      "<p><b>32 Q5 [4]:</b> explain what is meant by a virtual machine. <b>Points:</b> a stand-alone environment running on a physical computer, not a physical machine; it can emulate the hardware or software of another system; it has all the components of a physical system; the host machine provides the physical resources (RAM, ROM) and is controlled via a host OS; the <b>hypervisor</b> runs between the host and guest operating systems and creates and runs the VMs, allocating host resources; a guest OS runs within the VM; several guest operating systems (VMs) can run on the same host; the guest OS accesses the virtual hardware.</p>",
    example:
      "<p>A model answer for 32 Q5: <i>A virtual machine is a software environment that emulates a physical computer. A hypervisor running on the host machine creates the VM and shares out the host's RAM and processor. A guest operating system runs inside it, using virtual hardware, and several VMs can run on one host.</i></p>",
    checks:[
      mc("Which is a benefit of a virtual machine?", "A guest operating system can crash without affecting the host", ["It is always faster than a real machine", "It needs no host operating system", "It uses no memory"], "Isolation is a key benefit."),
      mc("Which is a limitation of a virtual machine?", "Performance is reduced because it reaches hardware indirectly through the host", ["It can run only one operating system", "It cannot run old software", "It needs extra hardware to be bought"], "The VM has to request hardware access from the host."),
      mc("What does the hypervisor do?", "Creates and runs virtual machines and allocates resources from the host to the guest", ["Translates a program into machine code", "Encrypts the network traffic", "Stores the BIOS"], "It sits between the host and the guest operating systems."),
      mc("Why does 'costs can be cheaper' get no mark by itself in 31 Q5?", "The answer must say why, for example no extra hardware needs to be bought to test applications", ["Virtual machines are expensive", "Cost is never a benefit", "The mark scheme forbids the word cheaper in all cases"], "The mark scheme requires the answer to match the phrase: costs saved by not buying additional hardware."),
      tx("Outline two benefits and two limitations of using a virtual machine. [4]", [["multiple operating system","different operating","legacy","not compatible","different instruction set","several operating","other operating system"],["no additional hardware","not having to purchase","without buying","test","save","cost"],["crash","without affecting","host is not affected","suspicious","isolated","infect"],["slower","performance","degraded","indirect","complex","maintain","host machine","depends on the host","not all hardware"]], 4, "Benefits: several operating systems/legacy software on one computer; no additional hardware needed; a crash or suspicious software does not affect the host. Limitations: slower performance because hardware is accessed indirectly; depends on the host; complex to manage.")
    ] },

  { id:"15.p3b", code:"15.1.4", title:"Paper 3 questions: massively parallel computers and SIMD / MISD",
    concept: SRC("33 Q4") +
      "<p><b>33 Q4(a) [3]:</b> describe the characteristics of massively parallel computers. <b>Marking points:</b> many processors or computers (thousands, an extremely large number) linked together to form a more powerful 'single machine'; all the processors work <b>simultaneously on the same problem</b>; each processor is responsible for its <b>own part</b> of the problem; they communicate through interconnected data pathways or shared pools of memory.</p>" +
      "<p><b>33 Q4(b) [2]:</b> one difference and one similarity between SIMD and MISD. <b>Difference:</b> SIMD executes the <b>same instruction</b> on many data streams at once, MISD executes <b>different instructions</b> on the <b>same data</b>; (or MISD is more complex). <b>Similarity:</b> both are parallel systems using multiple processors, both may be pipelined, and neither suits sequential applications such as office software or compilers. <i>Both names must appear or be clearly inferred; expanding the acronym earns nothing.</i></p>",
    example:
      tbl(["Architecture", "Instruction streams", "Data streams", "Example"], [["SISD", "1", "1", "single-core processor"], ["SIMD", "1", "many", "graphics processor adding to every pixel"], ["MISD", "many", "1", "fault-tolerant systems (rare)"], ["MIMD", "many", "many", "multi-core PC, supercomputer"]]),
    checks:[
      mc("Which describes a massively parallel computer?", "Many processors working simultaneously on parts of the same problem and communicating over a network", ["One processor running many programs one at a time", "Two processors sharing one data stream", "A computer with a very large hard drive"], "Each processor deals with its own part of the problem."),
      mc("What is a difference between SIMD and MISD?", "SIMD runs the same instruction on many data items; MISD runs different instructions on the same data", ["SIMD has one processor; MISD has many", "SIMD is sequential; MISD is parallel", "SIMD uses no data"], "Instruction stream and data stream are reversed."),
      mc("What is a similarity between SIMD and MISD?", "Both are parallel systems with multiple processors", ["Both run a single instruction on a single data item", "Both are ideal for office software", "Both have one processor"], "Neither suits sequential applications."),
      tx("Describe the characteristics of massively parallel computers. [3]", [["many processors","thousands","large number","linked","linking","multiple processors","many computers"],["same problem","simultaneously","at the same time","work together"],["own part","each processor","its own","part of the problem","communicate","interconnect","shared memory","network"]], 3, "Many (thousands of) processors or computers are linked together to form a more powerful 'single machine'. They all work simultaneously on the same problem, each processor being responsible for its own part, and communicate through interconnected data pathways or shared memory.")
    ] },

  { id:"15.p3c", code:"15.2.1", title:"Paper 3 question: truth table for a logic circuit (31 Q6a)",
    concept: SRC("31 Q6(a), 3 marks") +
      "<p>The circuit in the question has three inputs A, B, C and the labelled points P, Q, R, S and the output Z (the diagram is redrawn here as a list of gates):</p>" +
      ul(["<b>P</b> = NOT A", "<b>Q</b> = NOT B", "<b>R</b> = NAND of P, Q and C (a NAND gate with three inputs)", "<b>S</b> = A XOR C", "<b>Z</b> = AND of R, Q and S (an AND gate with three inputs)"]) +
      "<p>Complete the truth table showing the working columns P, Q, R and S. Marks: one for P, Q and R, one for S and one for Z.</p>",
    example:
      tbl(["A", "B", "C", "P", "Q", "R", "S", "Z"], CIRC) +
      "<p>Method: work column by column. P and Q are the inputs inverted; R is 0 only when all three of its inputs are 1 (A = 0, B = 0, C = 1); S is 1 when A and C differ; Z is 1 only when R, Q and S are all 1, which happens in one row: A = 1, B = 0, C = 0. The table above is generated by the program from these rules and matches the mark scheme.</p>",
    checks:[
      mc("For A = 1, B = 0, C = 0, what is Z?", String(CIRC[4][7]), ["0", "undefined", "X"], "P = 0, Q = 1, R = 1, S = 1 so Z = 1."),
      mc("For A = 0, B = 0, C = 1, what is R?", String(CIRC[1][5]), ["1", "2", "X"], "P = 1, Q = 1 and C = 1 are all 1, so the NAND gives 0."),
      mc("For A = 1, B = 0, C = 1, what is S (A XOR C)?", String(CIRC[5][6]), ["1", "X", "2"], "A and C are the same, so XOR gives 0."),
      mc("How many rows of the truth table have Z = 1?", "1", ["0", "2", "4"], "Only A = 1, B = 0, C = 0."),
      tx("State the Boolean expression for S in the circuit. [1]", [["a xor c","a ⊕ c","xor","exclusive"]], 1, "S = A XOR C")
    ] },

  { id:"15.p3d", code:"15.2.4", title:"Paper 3 questions: Karnaugh maps",
    concept: SRC("31 Q6(b)(c), 32 Q7(a), 33 Q6(a)") +
      "<p>The columns are AB = 00, 01, 11, 10 and the rows are CD = 00, 01, 11, 10 (Gray code, so neighbouring cells differ by one bit). Loop groups of 1s (sizes 1, 2, 4, 8, 16, including wrapping round the edges) as large as possible; each loop gives one product term and the loops are combined with OR. <b>31 Q6(b):</b> a benefit of a K-map is that it avoids Boolean algebra and is <i>guaranteed to give an optimal solution</i>. (\"Makes it easier\" alone gets no mark.)</p>",
    example:
      "<p><b>31 Q6(c)</b> (3 marks for the loops, 2 for the expression):</p>" + kmapHtml(K31) +
      "<p>Loops: the whole column AB = 11 (A.B); the whole row CD = 11 (C.D); and the block of four with B = 1, D = 1 (AB = 01 and 11, CD = 01 and 11) (B.D). Expression: <b>A.B + B.D + C.D</b>.</p>" +
      "<p><b>32 Q7(a)</b> (truth table with Z = 1 for 0001, 0100 to 0111, 1001, 1100 to 1111):</p>" + kmapHtml(K32) +
      "<p>Loops: the two columns AB = 01 and 11 (B) and the row CD = 01 (" + ov("C") + ".D). Expression: <b>B + " + ov("C") + ".D</b>.</p>" +
      "<p><b>33 Q6(a)</b> (2 marks loops, 2 marks expression, 1 mark simplified):</p>" + kmapHtml(K33) +
      "<p>Loops: the whole column AB = 01 (" + ov("A") + ".B) and the block AB = 01 and 11, CD = 00 and 10 (B." + ov("D") + "). Expression: <b>" + ov("A") + ".B + B." + ov("D") + "</b>. Simplified with Boolean algebra: B.(" + ov("A") + " + " + ov("D") + ").</p>" +
      "<p>Every expression was checked by a program against all 16 cells of its map.</p>",
    checks:[
      mc("31 Q6(c): what is the simplified sum-of-products for the K-map?", "A.B + B.D + C.D", ["A.B + C.D", "B.D + C.D", "A.B.C.D"], "Column AB = 11, the block B.D and the row CD = 11."),
      mc("32 Q7(a): which expression matches the K-map?", "B + " + "C̅.D", ["B + C.D", "A + D", "B.D"], "B covers two columns of four 1s; the row CD = 01 has C = 0 and D = 1."),
      mc("33 Q6(a): which expression matches the K-map?", "A̅.B + B.D̅", ["A.B + B.D", "B", "A̅.B.D̅"], "Column AB = 01 gives A'.B; the block with B = 1 and D = 0 gives B.D'."),
      mc("33 Q6(a)(iii): what is B.A' + B.D' in its simplest form?", "B.(A̅ + D̅)", ["B", "A̅.D̅", "B + A̅ + D̅"], "Common factor B (the distributive law)."),
      mc("What is a benefit of using a K-map?", "It gives an optimal solution without Boolean algebra", ["It is always quicker than a truth table", "It removes inputs from the circuit", "It stores the logic circuit"], "Mark scheme: you do not need Boolean algebra / guaranteed optimal."),
      mc("Why are rows and columns in the order 00, 01, 11, 10?", "Gray code: only one bit changes between neighbours, so adjacent cells can be grouped", ["It is binary counting order", "To make the map smaller", "So the map is symmetrical"], "That is why edges also wrap round.")
    ] },

  { id:"15.p3e", code:"15.2.3", title:"Paper 3 questions: De Morgan's laws and Boolean algebra",
    concept: SRC("32 Q7(b), 33 Q6(b)") +
      "<p>Both questions give a long expression with bars over parts of it and ask for a simplification with all stages shown (3 marks: 1 for the answer and up to 2 for correct working). <b>Rules to use:</b> De Morgan: " + ov("A.B") + " = " + ov("A") + " + " + ov("B") + " and " + ov("A + B") + " = " + ov("A") + "." + ov("B") + "; double negation: " + ov(ov("A")) + " = A; absorption: A + A.B = A; distributive and annulment (A + 1 = 1) laws.</p>",
    example:
      "<p><b>32 Q7(b):</b> X = " + ov(ov("A") + ".B.C." + ov("D")) + " + " + ov(ov("A.D")) + "</p>" +
      ul(["De Morgan on the first term: " + ov(ov("A") + ".B.C." + ov("D")) + " = A + " + ov("B") + " + " + ov("C") + " + D", "Double negation on the second term: " + ov(ov("A.D")) + " = A.D", "X = A + " + ov("B") + " + " + ov("C") + " + D + A.D", "Absorption (A + A.D = A): <b>X = A + " + ov("B") + " + " + ov("C") + " + D</b>"]) +
      "<p><b>33 Q6(b):</b> X = " + ov("A + B + C") + " + " + ov("B + C") + "</p>" +
      ul(["De Morgan: " + ov("A") + "." + ov("B") + "." + ov("C") + " + " + ov("B") + "." + ov("C"), "Factorise (distributive law): " + ov("B") + "." + ov("C") + ".(" + ov("A") + " + 1)", "Annulment (" + ov("A") + " + 1 = 1): <b>X = " + ov("B") + "." + ov("C") + "</b> (which is also " + ov("B + C") + ")"]) +
      "<p>Both simplifications were verified by a program over every input combination.</p>",
    checks:[
      mc("By De Morgan's law, what is the NOT of (A.B)?", "A̅ + B̅", ["A̅.B̅", "A + B", "A.B"], "Break the bar, change the AND to OR."),
      mc("What is the double negation of A.D?", "A.D", ["A̅ + D̅", "A + D", "0"], "Two NOTs cancel."),
      mc("32 Q7(b): what is the simplified X?", "A + B̅ + C̅ + D", ["A.B.C.D", "A + D", "1"], "The term A.D is absorbed by A."),
      mc("Which law removes A.D from A + B' + C' + D + A.D?", "Absorption", ["De Morgan's", "Double negation", "Commutative"], "A + A.D = A."),
      mc("33 Q6(b): what is the simplified X?", "B̅.C̅", ["A̅.B̅.C̅", "B + C", "A"], "B'.C'.(A' + 1) = B'.C'."),
      mc("What is A + 1?", "1", ["A", "0", "A̅"], "Annulment law.")
    ] },

  /* ============================ 16 ============================ */
  { id:"16.p3a", code:"16.2.4", title:"Paper 3 questions: Reverse Polish Notation",
    concept: SRC("31 Q7, 32 Q6, 33 Q7") +
      "<p>Every paper has three parts: (a) infix → RPN [2], (b) RPN → infix [3 in 31 and 32; 33 asks (a) to outline the stack process [3] and (b) infix → RPN [2]], (c) show the stack while evaluating an RPN expression [4]. <b>Stack rule:</b> read left to right; a number is pushed; an operator pops two items (the top is the right operand), applies the operator and pushes the result. <b>Do not put operators or letters in the stack</b>; the interim and final totals earn marks.</p>" +
      tbl(["Paper", "Part", "Question", "Answer (mark scheme)"], [["31", "7(a)", "21 * (15 − 3 + 8) / 7", "21 15 3 − 8 + * 7 /"], ["31", "7(b)", "c d + a b − a c − * /", "(c + d) / ((a − b) * (a − c))"], ["32", "6(a)", "16 + ((9 − 7) / (18 + 6))", "16 9 7 − 18 6 + / +"], ["32", "6(b)", "6 15 + 20 3 − − 27 9 * /", "((6 + 15) − (20 − 3)) / (27 * 9)"], ["33", "7(b)", "((18 − 15 + 3) * 5) / 12", "18 15 − 3 + 5 * 12 /"]]),
    example:
      "<p><b>31 Q7(c): 15 9 − 24 3 / * 18 6 + /</b></p>" + rpnTable("15 9 - 24 3 / * 18 6 + /".split(" ")) +
      "<p><b>32 Q6(c): c a b − * b c + / d *</b> with a = 8, b = 2, c = 10, d = 18</p>" + rpnTable("c a b - * b c + / d *".split(" "), { a: 8, b: 2, c: 10, d: 18 }) +
      "<p><b>33 Q7(c): 16 3 * 36 6 / 18 6 − * +</b></p>" + rpnTable("16 3 * 36 6 / 18 6 - * +".split(" ")) +
      "<p><b>33 Q7(a)</b> (outline the process): the RPN expression is read from left to right; a number is pushed onto the stack; for an operator the last two items are popped, the operator is applied to them and the result is pushed; this repeats until the whole expression has been evaluated.</p>",
    checks:[
      mc("31 Q7(c): what is the final value of 15 9 − 24 3 / * 18 6 + /?", String(R31.result), ["6", "48", "24"], "(15 − 9) × (24 ÷ 3) = 48; 48 ÷ (18 + 6) = 2."),
      mc("32 Q6(c): what is the final value (a = 8, b = 2, c = 10, d = 18)?", String(R32.result), ["60", "5", "10"], "c × (a − b) = 60; 60 ÷ (b + c) = 5; 5 × d = 90."),
      mc("33 Q7(c): what is the final value of 16 3 * 36 6 / 18 6 − * +?", String(R33.result), ["48", "72", "6"], "16 × 3 = 48; (36 ÷ 6) × (18 − 6) = 72; 48 + 72 = 120."),
      mc("What is the RPN of 21 * (15 − 3 + 8) / 7?", "21 15 3 − 8 + * 7 /", ["21 15 3 8 − + * 7 /", "21 * 15 3 − 8 + 7 /", "21 15 3 − 8 * + 7 /"], "Brackets first: 15 3 − 8 +, then multiply by 21, then divide by 7."),
      mc("What is the infix form of c d + a b − a c − * / ?", "(c + d) / ((a − b) * (a − c))", ["(c + d) * (a − b) / (a − c)", "c + d / a − b * a − c", "(c + d) / (a − b) / (a − c)"], "The multiplication of the two differences is the denominator."),
      mc("In the stack trace for 33 Q7(c), what is on the stack after reading 36 and 6 and the '/'?", "48 and 6", ["48 and 36", "6 only", "36 and 6"], "36 and 6 are popped and replaced by 6; the 48 from 16 × 3 is below it."),
      tx("Outline the process of using a stack to evaluate an RPN expression. [3]", [["left to right","from left","read"],["number","operand","push","pushed"],["operator","pop","popped","last two","top two"],["result","apply","pushed","repeat","until"]], 3, "The expression is read from left to right. Numbers are pushed onto the stack. When an operator is read the last two items are popped, the operator is applied to them and the result is pushed back. This repeats until the whole expression has been evaluated.")
    ] },

  /* ============================ 17 ============================ */
  { id:"17.p3a", code:"17.1.1", title:"Paper 3 questions: encryption and quantum cryptography",
    concept: SRC("31 Q8, 32 Q8, 33 Q8") +
      "<p><b>31 Q8:</b> (a) define <b>cipher text</b> [1] and <b>public key</b> [1]; (b) outline how an individual can use asymmetric encryption to send a <b>private message</b> to an organisation [4]. <b>Cipher text</b> = text encrypted from plain text by an encryption algorithm. <b>Public key</b> = a key that can be obtained and used by anyone to send encrypted messages (one of a matched pair). <b>Private message (the order of the steps matters):</b> the organisation generates a matched pair of keys; makes its <b>public</b> key available to the individual; the individual <b>encrypts the message with the organisation's public key</b> and sends it; the organisation <b>decrypts it with its private key</b>.</p>" +
      "<p><b>32 Q8:</b> (a) differences between symmetric and asymmetric cryptography [3]: symmetric uses one key, asymmetric uses two mathematically linked keys (public and private); asymmetric encrypts with one and decrypts with the other, symmetric uses the same key for both; symmetric suffers from the key-distribution problem, which the key pair resolves; asymmetric keys must be much longer for the same security; asymmetric allows the sender to be verified. (b) send a <b>verified</b> message to a group [4]: the organisation generates a key pair; makes the public key available (for example on its website); <b>encrypts the message with its private key</b> and sends it; anyone can <b>decrypt with the public key</b>, which verifies the sender (non-repudiation).</p>" +
      "<p><b>33 Q8:</b> (a) the purpose of <b>quantum cryptography</b> [2]: a more secure, virtually unbreakable method, able to detect eavesdropping, using the laws of quantum physics rather than mathematics to generate keys, guaranteed for longer. (b) two benefits and two drawbacks [4]. Benefits: better security for internet communication; eavesdropping can be detected so another key can be requested; virtually unhackable because quantum states change rapidly; keys cannot be copied (no-cloning theorem). Drawbacks: only over relatively short distances; very expensive (dedicated line, specialist hardware); the technology is not readily available; the polarisation of light may be altered in fibre; criminals can use it to hide their activity.</p>",
    example:
      tbl(["Goal", "Encrypt with", "Decrypt with", "What it gives"], [["<b>Private message</b> to an organisation (31 Q8b)", "the organisation's <b>public</b> key", "the organisation's <b>private</b> key", "only the organisation can read it"], ["<b>Verified message</b> from a business (32 Q8b)", "the business's <b>private</b> key", "the business's <b>public</b> key", "everyone can check who sent it"]]),
    checks:[
      mc("What is cipher text?", "Text encrypted from plain text using an encryption algorithm", ["Text that has been decrypted", "A public key", "A digital certificate"], "Plain text goes in, cipher text comes out."),
      mc("To send a private message to an organisation the individual uses ...", "the organisation's public key to encrypt it", ["the individual's private key", "the organisation's private key to encrypt it", "a digital certificate to encrypt it"], "Only the organisation's private key can decrypt it."),
      mc("To send a verified message to a group the business encrypts with ...", "its private key", ["its public key", "the group's public key", "a symmetric key only"], "Anyone can decrypt with the business's public key, which proves who sent it."),
      mc("Which is a drawback of quantum cryptography?", "It currently works only over relatively short distances", ["Eavesdropping cannot be detected", "Keys can be cloned", "It uses no special hardware"], "It needs dedicated lines and specialist hardware."),
      mc("Which is a benefit of quantum cryptography?", "Eavesdropping can be detected", ["It is cheap to install", "It works over any distance", "It needs no key"], "A measured quantum state changes, so interception is noticed."),
      mc("Which is a difference between symmetric and asymmetric encryption?", "Symmetric uses one key; asymmetric uses a matched pair of keys", ["Symmetric uses two keys; asymmetric uses one", "Asymmetric keys are shorter", "Symmetric allows the sender to be verified"], "Symmetric: the same key to encrypt and decrypt."),
      tx("Outline how an individual can send a private message to an organisation using asymmetric encryption. [4]", [["matched pair","pair of keys","generates","key pair","public and private"],["public key","makes its public key","publishes","available"],["encrypt","encrypts","individual uses"],["decrypt","decrypts","private key"]], 4, "The organisation generates a matched pair of keys and makes its public key available to the individual. The individual encrypts the message with the organisation's public key and sends it. The organisation decrypts the message with its private key.")
    ] },

  /* ============================ 18 ============================ */
  { id:"18.p3a", code:"18.1.3", title:"Paper 3 questions: machine learning",
    concept: SRC("31 Q9(a), 32 Q9(a) and 9(b)(i), 33 Q9(a)") +
      "<p><b>31 Q9(a) [4]:</b> explain how supervised and unsupervised learning are trained. <b>Supervised</b> learning uses <b>labelled</b> training data to predict future events from past outcomes; <b>unsupervised</b> learning uses <b>unlabelled</b> data, without the expected outcomes, to search for hidden patterns, relationships, structures, similarities or outliers; both get closer to the desired outcome as training progresses.</p>" +
      "<p><b>32 Q9(a) [1]:</b> the subset of AI that uses an artificial neural network is <b>deep learning</b> (not 'machine learning': not all machine learning uses neural networks).</p>" +
      "<p><b>32 Q9(b)(i) [3]:</b> how A* differs from Dijkstra's algorithm. A* uses a <b>heuristic</b> (intelligent guesses) to find the shortest path, so it need not pass through all the nodes; Dijkstra's algorithm finds the shortest path to <b>all</b> nodes and always finds the shortest path; A* may not find the shortest path if the heuristic is inaccurate.</p>" +
      "<p><b>33 Q9(a) [3]:</b> explain <b>regression</b> methods in machine learning: a supervised technique; finds a mathematical function (best-fit line or curve, using the error gradient) that maps how independent variables (causes) influence a dependent variable (effect); used to forecast trends and predict outcomes; the goal is to minimise the difference between predicted and actual values.</p>",
    example:
      tbl(["", "Supervised", "Unsupervised"], [["Training data", "Labelled (correct outputs known)", "Unlabelled"], ["Goal", "Predict outcomes from past examples", "Find hidden patterns, groups or outliers"], ["Example", "Regression, classification", "Clustering"]]),
    checks:[
      mc("Which subset of AI uses an artificial neural network?", "Deep learning", ["Machine learning in general", "Expert systems", "Heuristics"], "Deep learning uses neural networks with several hidden layers."),
      mc("Supervised learning is trained using ...", "labelled data", ["unlabelled data", "no data", "random numbers"], "The correct outcomes are supplied."),
      mc("Unsupervised learning is used to ...", "find hidden patterns or structures in unlabelled data", ["predict a labelled outcome", "give rewards", "sort data in order"], "There are no expected outcomes."),
      mc("Which statement about A* compared with Dijkstra's algorithm is correct?", "A* uses a heuristic and need not visit every node", ["A* always visits every node", "A* never uses estimates", "Dijkstra's algorithm uses a heuristic"], "The heuristic guides the search."),
      mc("What is the goal of regression in machine learning?", "To minimise the difference between predicted and actual values", ["To label the data", "To maximise the number of layers", "To encrypt the data"], "It fits a best-fit function to the data."),
      tx("Explain how supervised and unsupervised learning are trained. [4]", [["labelled","with labels"],["predict","past outcomes","future"],["unlabelled","without labels","no labels","not labelled"],["hidden pattern","patterns","relationships","structures","similarities","outliers","groups"]], 4, "Supervised learning uses labelled training data to predict future events based on past outcomes. Unsupervised learning uses unlabelled data (no expected outcomes) to look for hidden patterns, relationships or structures in the data. In both, the system gets closer to the desired outcome as training progresses.")
    ] },

  { id:"18.p3b", code:"18.1.1", title:"Paper 3 questions: Dijkstra's algorithm and A* on the graphs of the papers",
    concept: SRC("31 Q9(b), 32 Q9(b)(ii), 33 Q9(b)") +
      "<p>The diagrams cannot be copied, so each graph is redrawn as a list of edges (distance after the pair of nodes).</p>" +
      ul(["<b>31 Q9(b) (Begin):</b> Begin–P 9, Begin–R 6, Begin–U 21, P–Q 5, P–R 2, Q–S 5, R–S 8, S–U 6, S–T 3, T–U 4.", "<b>32 Q9(b)(ii) (Home):</b> Home–A 6, Home–F 16, A–B 8, A–C 3, A–F 8, B–C 4, C–D 12, D–F 6, D–E 7, E–F 3.", "<b>33 Q9(b) (W to E, A*):</b> W–N1 6, W–N2 4, W–N3 7, N1–N6 12, N1–N2 3, N2–N3 2, N2–N5 7, N3–N4 4, N5–N6 4, N5–N4 2, N5–E 11, N6–E 3, N4–E 12; heuristics h: W 18, N1 15, N2 14, N3 13, N4 9, N5 7, N6 3, E 0."]) +
      "<p><b>Marks for Dijkstra (5):</b> set the start node to 0 and every other node to ∞; show values being updated; show visited nodes; show at least one route calculated; show more than one route calculated for at least one node; then 2 marks for the correct answers (1 mark for four or five correct).</p>",
    example:
      "<p><b>31 Q9(b):</b> nodes made final in order: " + D31.order.join(", ") + ".</p>" + dTable(D31, ["P", "Q", "R", "S", "T", "U"]) +
      "<p>(P = 8 via R, not 9 direct; U = 20 via S and not 21 direct or 21 via T.)</p>" +
      "<p><b>32 Q9(b)(ii):</b> nodes made final in order: " + D32.order.join(", ") + ".</p>" + dTable(D32, ["A", "B", "C", "D", "E", "F"]) +
      "<p>(B = 13 via C, not 14 via A; F = 14 via A, not 16 direct; D = 20 via F, not 21 via C.)</p>" +
      "<p><b>33 Q9(b) (A*):</b> the table of path costs g, heuristics h and totals f = g + h, expanding the node with the lowest f each time:</p>" +
      tbl(["Current path", "Destination node", "Cost of path g", "Heuristic h", "Total f"], A33.rows) +
      "<p>Final path: <b>" + A33.path.join(" → ") + "</b>, cost " + A33.cost + ". (E is first reached with f = 22 through N5 directly, but the route through N6 gives f = 18, which is better.) All three results were computed by running the algorithms and match the mark schemes.</p>",
    checks:[
      mc("31 Q9(b): what is the shortest distance from Begin to S?", String(D31.dist.S), ["8", "17", "22"], "Begin → R (6) → S (8) = 14."),
      mc("31 Q9(b): what is the shortest distance from Begin to U?", String(D31.dist.U), ["21", "17", "23"], "Begin → R → S → U = 6 + 8 + 6 = 20 (T gives 17 + 4 = 21; the direct edge is 21)."),
      mc("31 Q9(b): which values are P, Q, R, S, T, U?", "8, 13, 6, 14, 17, 20", ["9, 14, 6, 14, 18, 21", "8, 13, 6, 14, 17, 21", "9, 13, 6, 14, 17, 20"], "These are the mark-scheme values."),
      mc("32 Q9(b)(ii): what is the shortest distance from Home to D?", String(D32.dist.D), ["21", "12", "22"], "Home → A → F (14) → D (6) = 20; via C it is 9 + 12 = 21."),
      mc("32 Q9(b)(ii): which values are A, B, C, D, E, F?", "6, 13, 9, 20, 17, 14", ["6, 14, 9, 21, 17, 14", "6, 13, 9, 20, 17, 16", "6, 13, 10, 20, 17, 14"], "B = 13 via C (6 + 3 + 4)."),
      mc("33 Q9(b): what is the final path found by A*?", A33.path.join(" → "), ["W → N1 → N6 → E", "W → N3 → N4 → E", "W → N2 → N5 → E"], "N5 → N6 → E costs 4 + 3 less than N5 → E directly (11)."),
      mc("33 Q9(b): what is the total cost g of the final path?", String(A33.cost), ["22", "21", "16"], "4 + 7 + 4 + 3 = 18."),
      tx("Outline how Dijkstra's algorithm starts. [2]", [["0","zero","start node","begin","home"],["infinity","∞","all other nodes","other nodes","very large","unvisited"]], 2, "Set the distance of the start node to 0 and the distance of every other node to infinity, then repeatedly make final the unvisited node with the smallest distance and update its neighbours.")
    ] },

  /* ============================ 19 ============================ */
  { id:"19.p3a", code:"19.1.2", title:"Paper 3 question: insertion sort on two arrays and its efficiency (31 Q10)",
    concept: SRC("31 Q10 (5 + 3 + 1 marks)") +
      "<p><b>(a) [5]</b> Club-member IDs are in <code>MemberID[0:499]</code> (INTEGER) and the names in <code>Names[0:499]</code> (STRING). Write an <b>insertion sort</b> to put the IDs in ascending order, moving the names so that each name stays with the right ID. Use the identifiers <b>Count</b> (main loop counter), <b>Temp1</b> (holds the current ID), <b>Temp2</b> (holds the current name) and <b>Insert</b> (insertion position). <b>Marks:</b> the outer loop from the second element; Temp1 and Temp2 both set to the current values; Insert initialised; inner loop with the correct condition; elements of <b>both</b> arrays moved; Insert decremented; the temporary values put in the correct place in both arrays. (A bubble sort earns no marks.)</p>" +
      "<p><b>(b) [3]</b> factors, other than changing the algorithm, that affect the time efficiency: the <b>number of elements</b> in the array (fewer is faster) and the <b>initial order</b> (a partly sorted array is sorted faster). <b>(c) [1]</b> worst-case Big O: <b>O(n²)</b> (must be exactly correct, including the brackets).</p>",
    example:
      pre("FOR Count " + LEFT + " 1 TO 499\n    Temp1 " + LEFT + " MemberID[Count]\n    Temp2 " + LEFT + " Names[Count]\n    Insert " + LEFT + " Count - 1\n    WHILE Insert >= 0 AND MemberID[Insert] > Temp1\n        MemberID[Insert + 1] " + LEFT + " MemberID[Insert]\n        Names[Insert + 1] " + LEFT + " Names[Insert]\n        Insert " + LEFT + " Insert - 1\n    ENDWHILE\n    MemberID[Insert + 1] " + LEFT + " Temp1\n    Names[Insert + 1] " + LEFT + " Temp2\nNEXT Count") +
      "<p>Because the array is indexed from 0 to 499 the outer loop runs from 1 to 499 (the second element to the last).</p>",
    checks:[
      fill("Complete the insertion sort.", "FOR Count " + LEFT + " {1} TO 499\n    Temp1 " + LEFT + " MemberID[Count]\n    Temp2 " + LEFT + " Names[Count]\n    Insert " + LEFT + " Count - 1\n    WHILE Insert >= 0 AND MemberID[Insert] {2} Temp1\n        MemberID[Insert + 1] " + LEFT + " MemberID[Insert]\n        {3}[Insert + 1] " + LEFT + " Names[Insert]\n        Insert " + LEFT + " Insert - 1\n    ENDWHILE", [["1", ["0", "2", "499"]], [">", ["<", "=", "<="]], ["Names", ["MemberID", "Temp2", "Count"]]], "Start at the second element (index 1); move larger IDs along; move the matching name in the same way."),
      mc("What must be done to the Names array when two IDs swap places?", "The matching names must be moved in exactly the same way", ["Nothing, names do not need to move", "The names are sorted separately", "The names are deleted"], "Data at the same index must still belong to the same person."),
      mc("What is the worst-case time complexity of the insertion sort?", "O(n²)", ["O(n)", "O(log n)", "O(1)"], "The worst case compares each item with all those before it."),
      mc("Which is a factor, other than the algorithm, that affects the time efficiency of an insertion sort?", "The initial order of the data", ["The colour of the monitor", "The programming language comments", "The name of the array"], "A partly sorted array needs fewer moves."),
      tx("Describe two factors, other than changing the algorithm, that affect the time efficiency of the insertion sort. [3]", [["size","number of elements","number of items","elements in the array","array size"],["fewer","smaller","larger","more","longer","worse","better","improve"],["order","initial order","partially sorted","partly sorted","already sorted","reversed"]], 3, "The number of elements in the array (the fewer to sort, the faster it is) and the initial order of the data (if the array is already partly sorted the insertion sort works better; if it is reversed it is slower).")
    ] },

  { id:"19.p3b", code:"19.1.1", title:"Paper 3 questions: searching, Big O and writing a binary search",
    concept: SRC("32 Q10(a), 33 Q10") +
      "<p><b>32 Q10(a) [3]:</b> describe how increasing the number of data items affects the time efficiency of a linear and a binary search, referring to Big O. <b>Linear:</b> the time increases <b>linearly</b> as the number of items increases; the worst case is <b>O(n)</b>. <b>Binary:</b> the time increases <b>logarithmically</b> as the number of items increases (or: linearly as the number of items grows exponentially); the worst case is <b>O(log n)</b>. The notation must be completely correct, including the brackets.</p>" +
      "<p><b>33 Q10:</b> the array <code>PartName[1:1000000]</code> of STRING is sorted in ascending order. <b>(a)(i) [2]</b> complete the variable table for <code>PartSearch</code>: <b>Left</b> INTEGER, the lowest index in the search area; <b>Right</b> INTEGER, the highest index in the search area; <b>Mid</b> INTEGER, the middle (centre) index; <b>Target</b> STRING, the item to be found. <b>(ii) [5]</b> write the function; it returns the position, or −1 if it is not found. <b>(b) [2]</b> how the time efficiency of a binary search changes as the list grows: it increases logarithmically; worst case O(log n).</p>",
    example:
      pre("FUNCTION PartSearch(Target : STRING) RETURNS INTEGER\n    DECLARE Left, Right, Mid : INTEGER\n    Left " + LEFT + " 1\n    Right " + LEFT + " 1000000\n    WHILE Left <= Right\n        Mid " + LEFT + " (Left + Right) DIV 2\n        IF PartName[Mid] = Target THEN\n            RETURN Mid\n        ELSE\n            IF PartName[Mid] < Target THEN\n                Left " + LEFT + " Mid + 1\n            ELSE\n                Right " + LEFT + " Mid - 1\n            ENDIF\n        ENDIF\n    ENDWHILE\n    RETURN -1\nENDFUNCTION") +
      "<p>With one million items a binary search needs at most about 20 comparisons (2<sup>20</sup> = 1 048 576), whereas a linear search could need 1 000 000.</p>",
    checks:[
      fill("Complete PartSearch.", "Left " + LEFT + " {1}\nRight " + LEFT + " 1000000\nWHILE Left {2} Right\n    Mid " + LEFT + " (Left + Right) {3} 2\n    IF PartName[Mid] = Target THEN\n        RETURN Mid", [["1", ["0", "Mid", "-1"]], ["<=", ["<", ">", "="]], ["DIV", ["MOD", "/", "*"]]], "The array starts at index 1; the loop continues while the search area is not empty; DIV gives the integer middle position."),
      mc("What does the function return if the item is not found?", "−1", ["0", "1000001", "Target"], "The question says to return −1."),
      mc("In the variable table, what is the description of Mid?", "The middle (centre) index of the search area", ["The middle value in the array", "The lowest index", "The item to be found"], "Mid is an index, not a value. (The mark scheme does not accept 'mid' as its own description.)"),
      mc("What is the Big O notation for the worst case of a linear search?", "O(n)", ["O(log n)", "O(n²)", "O(1)"], "The time grows linearly with the number of items."),
      mc("What is the Big O notation for the worst case of a binary search?", "O(log n)", ["O(n)", "O(n²)", "O(2n)"], "The search area is halved each time."),
      mc("A list is made 1000 times longer. Which statement is correct for a binary search?", "The time increases only logarithmically", ["The time increases 1000 times", "The time is unchanged", "The time increases 1000 squared times"], "log n grows very slowly."),
      tx("Describe how the time efficiency of a linear search and a binary search change as the number of items increases. Refer to Big O. [3]", [["linear","increases linearly","in proportion","directly proportional"],["o(n)","o n","n "],["logarithmic","logarithmically","log n","log2","o log"]], 3, "The time for a linear search increases linearly with the number of items, worst case O(n). The time for a binary search increases only logarithmically, worst case O(log n).")
    ] },

  /* ============================ 20 ============================ */
  { id:"20.p3a", code:"20.1.5", title:"Paper 3 question: Prolog facts, goals and rules (31 Q11)",
    concept: SRC("31 Q11 (3 + 1 + 4 marks)") +
      "<p>A declarative program records which home-cinema devices customers have and want. The knowledge base (the numbers are the clause numbers in the paper):</p>" +
      pre(KB31_TEXT.slice(0, 24).map(function(c, i){ return String(i + 1).padStart(2, "0") + " " + c; }).join("\n")) +
      ul(["<b>(a) [3]</b> Betty is a customer who owns a large TV and wants a Blu-ray player. Write the additional facts (clauses 25 to 27).", "<b>(b) [1]</b> Given the goal <code>owns(media_player, Owner)</code> returns Owner = petrov, allan, write the result of <code>owns(projector, Owner)</code>.", "<b>(c) [4]</b> D may be available for A to buy if D is a device, A is a customer and A does not own that device. Write the rule <code>may_buy_device(D, A)</code>."]) +
      "<p>The mark scheme gives: (25) <code>customer(betty).</code> (26) <code>owns(large_tv, betty).</code> (27) <code>wants(bluray_player, betty).</code> (device names must match clauses 02 and 04); (b) <b>petrov, susan, sammy</b> (any order); (c) <code>may_buy_device(D, A) IF device(D) AND customer(A) AND NOT owns(D, A).</code> (a comma may replace AND and <code>\\+</code> may replace NOT).</p>",
    example:
      "<p>Running the goals on a small Prolog engine against these facts:</p>" +
      ul(["<code>owns(media_player, Owner)</code> → <b>" + P31_MEDIA.join(", ") + "</b> (as printed in the question)", "<code>owns(projector, Owner)</code> → <b>" + P31_PROJ.join(", ") + "</b>", "<code>may_buy_device(D, susan)</code> (devices Susan does not own) → <b>" + P31_BUY.join(", ") + "</b>"]) +
      "<p>Susan owns only the projector, so she may buy every other device.</p>",
    checks:[
      mc("Which fact says that Betty wants a Blu-ray player?", "wants(bluray_player, betty).", ["wants(betty, bluray_player).", "owns(bluray_player, betty).", "customer(bluray_player)."], "The pattern in the paper is wants(device, customer)."),
      mc("Which fact says that Betty is a customer?", "customer(betty).", ["customer(betty)", "Customer(betty).", "betty(customer)."], "Lower case, ending with a full stop."),
      mc("What does the goal owns(projector, Owner) return?", P31_PROJ.join(", "), ["petrov only", "petrov, allan", "false"], "Clauses 16, 18 and 19."),
      mc("Which rule is correct for may_buy_device(D, A)?", "may_buy_device(D, A) IF device(D) AND customer(A) AND NOT owns(D, A).", ["may_buy_device(D, A) IF device(D) OR customer(A) OR owns(D, A).", "may_buy_device(D, A) IF owns(D, A).", "may_buy_device(D, A) IF device(A) AND customer(D)."], "All three conditions must hold, and the person must NOT own the device."),
      tx("Write the rule may_buy_device(D, A) for the paper's knowledge base. [4]", [["device"],["customer"],["owns"],["may buy device","may_buy_device","maybuydevice"]], 4, "may_buy_device(D, A) IF device(D) AND customer(A) AND NOT owns(D, A).")
    ] },

  { id:"20.p3b", code:"20.1.4", title:"Paper 3 questions: the Node class and OOP terms (32 Q11)",
    concept: SRC("32 Q11, 32 Q10(b)") +
      "<p><b>32 Q11(a) [5]:</b> design a class <code>Node</code> with the STRING attribute <code>Content</code> and the INTEGER attribute <code>Pointer</code> (with getters and setters, not required here) and a constructor with two parameters. <b>Marking points:</b> CLASS Node ... ENDCLASS; the attribute declarations before the constructor, using Content and Pointer with the types STRING and INTEGER; the constructor as PUBLIC PROCEDURE NEW ... ENDPROCEDURE; two parameters with appropriate names and types (any names except Content and Pointer); the parameters assigned to the attributes.</p>" +
      "<p><b>32 Q11(b) [4]:</b> complete the table of OOP terms.</p>" +
      tbl(["OOP term", "Description (mark scheme)"], [["<b>setter</b>", "a method used to change values in private attributes in a class"], ["<b>instance</b> (or object)", "an occurrence of a class during the execution of a program"], ["<b>aggregation</b>", "one class/object contains another; hierarchy of nested classes; a \"has a\" relationship"], ["<b>inheritance</b>", "deriving new classes on existing classes; a derived class gets the methods and data of a base class; an \"is a\" relationship"]]),
    example:
      pre("CLASS Node\n    PRIVATE Content : STRING\n    PRIVATE Pointer : INTEGER\n    PUBLIC PROCEDURE NEW(NewContent : STRING, NewPointer : INTEGER)\n        Content " + LEFT + " NewContent\n        Pointer " + LEFT + " NewPointer\n    ENDPROCEDURE\nENDCLASS") +
      "<p><b>32 Q10(b) [6]</b> (the random-file function TempCheck) is in the lesson on random files: OPENFILE ... FOR RANDOM, SEEK to the position, GETRECORD, an IF with the two messages, CLOSEFILE <b>before</b> RETURN, then RETURN Response.</p>",
    checks:[
      fill("Complete the Node class.", "CLASS Node\n    PRIVATE Content : {1}\n    PRIVATE Pointer : {2}\n    PUBLIC PROCEDURE {3}(NewContent : STRING, NewPointer : INTEGER)\n        Content " + LEFT + " NewContent\n        Pointer " + LEFT + " NewPointer\n    ENDPROCEDURE\nENDCLASS", [["STRING", ["INTEGER", "REAL", "BOOLEAN"]], ["INTEGER", ["STRING", "REAL", "CHAR"]], ["NEW", ["CREATE", "INIT", "NODE"]]], "The attribute types are given in the question; the constructor is PUBLIC PROCEDURE NEW."),
      mc("Which OOP term means 'a method used to change values in private attributes'?", "Setter", ["Getter", "Instance", "Inheritance"], "A setter (mutator)."),
      mc("Which OOP term means 'an occurrence of a class during the execution of a program'?", "Instance (object)", ["Aggregation", "Setter", "Constructor"], "An object is an instance of its class."),
      mc("Which relationship does aggregation represent?", "'Has a'", ["'Is a'", "'Uses a'", "'Is not a'"], "One class contains another class."),
      mc("Which relationship does inheritance represent?", "'Is a'", ["'Has a'", "'Uses a'", "'Is not a'"], "A derived class is a kind of its base class."),
      tx("Give the OOP term for: 'Deriving new classes from existing classes'. [1]", [["inheritance","inherit"]], 1, "Inheritance.")
    ] },

  { id:"20.p3c", code:"20.1.2", title:"Paper 3 question: writing assembly language (33 Q11)",
    concept: SRC("33 Q11 (5 + 3 marks)") +
      "<p>The processor has one register, the accumulator ACC. The instruction set in the question is: <code>LDM #n</code> (load the number n), <code>LDD &lt;address&gt;</code> (load from an address), <code>LDI &lt;address&gt;</code> (indirect), <code>ADD &lt;address&gt;</code> and <code>ADD #n</code>, <code>SUB &lt;address&gt;</code> and <code>SUB #n</code>, <code>STO &lt;address&gt;</code>, and <code>&lt;label&gt;: &lt;data&gt;</code> for a symbolic address. Memory holds 232 → 120 and 580 → 26.</p>" +
      "<p><b>(a) [5]</b> using only these instructions: store 325 in the labelled variable A; store the value from location 232 in the labelled variable B; subtract 50 from the value stored in B; store the current value of the accumulator in location 875; add the value stored in location 580 to the value stored in A; subtract the value stored in location 875 from the accumulator; store the result in the variable Final. <b>(b) [3]</b> the contents of A, B and Final after the code has run.</p>" +
      "<p><b>Marking points:</b> LDM #325 and STO A; LDD 232 and STO B; SUB #50 and STO 875; LDD A and ADD 580 (or LDD 580 and ADD A); SUB 875; STO Final.</p>",
    example:
      pre("LDM #325\nSTO A\nLDD 232\nSTO B\nSUB #50\nSTO 875\nLDD A\nADD 580\nSUB 875\nSTO Final") +
      (ASM33 ? "<p>Simulated line by line (the ACC after each instruction):</p>" + tbl(["Instruction", "ACC after it", "Note"], ASM33.rows.map(function(r){ return ["<code>" + esc(r[1]) + "</code>", r[2], r[4]]; })) +
        "<p>After the program: <b>A = " + ASM33.mem.A + "</b>, <b>B = " + ASM33.mem.B + "</b>, <b>Final = " + ASM33.mem.Final + "</b>. (B holds 120: the subtraction of 50 changes the accumulator, not B; location 875 holds 70; Final = 325 + 26 − 70.)</p>" : ""),
    checks:[
      mc("What is stored in variable A?", "325", ["120", "281", "375"], "LDM #325 then STO A."),
      mc("What is stored in variable B?", "120", ["70", "325", "281"], "B is stored before 50 is subtracted."),
      mc("What is stored in location 875?", "70", ["120", "50", "281"], "120 − 50 = 70, stored from the accumulator."),
      mc("What is stored in Final?", "281", ["395", "325", "70"], "A + 26 = 351; 351 − 70 = 281."),
      mc("Why is LDD A needed before ADD 580?", "The accumulator held 70 and A must be loaded to add 580 to it", ["To store A in memory", "To clear location 580", "To end the program"], "There is only one register, so the previous value in it must be replaced."),
      mc("Which instruction loads the number 325 into ACC?", "LDM #325", ["LDD 325", "LDI 325", "STO 325"], "LDM is immediate addressing."),
      tx("Write the assembly instructions to store the value from location 232 in the variable B and then subtract 50 from it. [3]", [["ldd 232","ldd 232 "],["sto b"],["sub #50","sub 50"]], 3, "LDD 232, STO B, SUB #50")
    ] }

  ];

  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat(LESSONS);
})(typeof window !== "undefined" ? window : this);
