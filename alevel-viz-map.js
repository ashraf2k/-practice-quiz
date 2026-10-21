/* Which illustration or animation appears in which A Level lesson. at: 0 = after the explanation, 1 = after the worked example. */
(function(root){
  "use strict";
  var M = root.ILEARN_VIZ.MAP;
  function add(id, w, title, at, o, note){ (M[id] = M[id] || []).push({ w: w, title: title, at: at, o: o || {}, note: note || "" }); }

  /* 13 Data representation */
  var FILES = "Compare serial, sequential and random files";
  add("13.2a", "fileorg", FILES, 1, null, "Serial and sequential files are searched record by record (sequential access); a random file jumps straight to the address its hash function gives (direct access).");
  add("13.2b", "fileorg", FILES, 1);
  add("13.2c", "fileorg", FILES, 1);
  add("13.p3b", "fileorg", FILES, 1);
  add("13.2d", "hash", "Hash a key to an address", 1, null, "The hash function here is Key MOD 10, so the file has 10 locations numbered 0 to 9.");
  add("13.2e", "hash", "Collisions: open and closed hashing", 1, null, "Insert 13 and then 23: both hash to 3.");
  add("13.3a", "fp", "Build a floating-point number bit by bit", 0, { m: 12, e: 4 }, "Mantissa 12 bits and exponent 4 bits, both two's complement, as in Papers 32 and 33.");
  add("13.3b", "fp", "Convert floating point to denary", 1, { m: 12, e: 4 });
  add("13.3c", "fp", "Check your denary to floating-point answer", 1, { m: 12, e: 4 });
  add("13.3d", "fp", "Normalised or not?", 1, { m: 12, e: 4 }, "A positive mantissa is normalised when it starts 01, a negative one when it starts 10.");
  add("13.3e", "fprange", "Range against accuracy", 0);
  add("13.3f", "fprange", "How many exponent bits are needed?", 1);
  add("13.p3c", "fp", "Paper 32 and 33 format: 12-bit mantissa, 4-bit exponent", 1, { m: 12, e: 4 });
  add("13.p3c", "fp", "Paper 31 format: 10-bit mantissa, 6-bit exponent", 1, { m: 10, e: 6 });
  add("13.p3d", "fprange", "Range and overflow", 1);

  /* 14 Communication */
  var TCP = "A message travels down, across and up the TCP/IP stack";
  add("14.1b", "tcp", TCP, 1); add("14.1c", "tcp", TCP, 1); add("14.1d", "tcp", TCP, 1); add("14.p3a", "tcp", TCP, 1);
  var SW = "Circuit switching and packet switching";
  add("14.2a", "switching", SW, 1); add("14.2b", "switching", SW, 1, null, "Press the second button to compare. In packet switching each packet is routed separately and the receiver re-orders them."); add("14.2c", "switching", SW, 1);

  /* 15 Hardware and logic */
  add("15.1b", "pipeline", "Pipelining: five stages, one clock cycle each", 1, null, "Stages: instruction fetch (IF), instruction decode (ID), operand fetch (OF), instruction execute (IE), write back (WB).");
  add("15.1d", "arch", "SISD, SIMD, MISD and MIMD", 1); add("15.1e", "arch", "Parallel architectures", 1); add("15.p3b", "arch", "SISD, SIMD, MISD and MIMD", 1);
  add("15.1f", "vm", "The layers of a virtual machine", 1); add("15.p3a", "vm", "The layers of a virtual machine", 1);
  add("15.2b", "adder", "Half adder: switch the inputs", 1, { kind: "half" });
  add("15.2c", "adder", "Full adder: switch the inputs", 1, { kind: "full" });
  add("15.2d", "flipflop", "SR flip-flop", 1, { kind: "sr" });
  add("15.2e", "flipflop", "JK flip-flop", 1, { kind: "jk" });
  add("15.2i", "kmap", "Karnaugh map with 3 inputs", 1, { vars: 3 });
  add("15.2j", "kmap", "Karnaugh map with 4 inputs", 1, { vars: 4 });
  add("15.p3d", "kmap", "Try the maps from Papers 31, 32 and 33", 1, { vars: 4 });

  /* 16 System software */
  add("16.1c", "pstates", "Process states: move, watch and test the processes", 1);
  add("16.1d", "sched", "Scheduling algorithms: draw the Gantt chart", 1);
  add("16.1h", "paging", "Page replacement", 1);
  add("16.2b", "compile", "Follow a line of code through the compiler", 1);
  add("16.2d", "rpnconv", "Convert infix to Reverse Polish Notation", 1);
  add("16.2e", "rpneval", "Evaluate RPN with a stack", 1);
  add("16.p3a", "rpnconv", "Convert infix to RPN", 1); add("16.p3a", "rpneval", "Evaluate RPN with a stack (the stack tables of the papers)", 1);

  /* 17 Security */
  add("17.1c", "enc", "Send a private message with asymmetric encryption", 1, { kind: "private" });
  add("17.1d", "enc", "Send a verified message", 1, { kind: "verified" });
  add("17.p3a", "enc", "Private message to an organisation (Paper 31 Q8)", 1, { kind: "private" }); add("17.p3a", "enc", "Verified message (Paper 32 Q8)", 1, { kind: "verified" });
  add("17.1f", "tls", "The SSL/TLS handshake", 1);
  add("17.1g", "digsig", "Create and check a digital signature", 1);

  /* 18 AI */
  add("18.1b", "graph", "Dijkstra's algorithm step by step", 1, { algo: "dijkstra" });
  add("18.1c", "graph", "The A* algorithm step by step", 1, { algo: "astar" });
  add("18.p3b", "graph", "Dijkstra (Paper 31 graph)", 1, { algo: "dijkstra" }); add("18.p3b", "graph", "A* (Paper 33 graph)", 1, { algo: "astar" });
  add("18.1e", "nn", "A small neural network", 1); add("18.1g", "nn", "Back propagation: watch the error shrink", 1);

  /* 19 Computational thinking */
  add("19.1a", "search", "Linear search against binary search", 1); add("19.1b", "search", "Binary search step by step", 1); add("19.p3b", "search", "Linear search against binary search", 1);
  add("19.1c", "sort", "Bubble sort animation", 1, { kind: "bubble" }); add("19.1d", "sort", "Insertion sort animation", 1, { kind: "insertion" });
  add("19.p3a", "sort", "Insertion sort animation", 1, { kind: "insertion" }); add("19.p42q1", "sort", "Insertion sort animation", 1, { kind: "insertion" }); add("19.p43q1", "sort", "Bubble sort animation", 1, { kind: "bubble" });
  add("19.1e", "stack", "Push and pop", 1);
  add("19.1f", "queue", "Enqueue and dequeue", 1); add("19.p41q1", "queue", "Linear queue: enqueue and dequeue", 1);
  add("19.1g", "llist", "A linked list held in arrays", 1); add("19.p42q3", "llist", "A linked list held in arrays (add at the end)", 1);
  add("19.1h", "btree", "Build a binary tree and walk through it", 1); add("19.p43q3", "btree", "Build the binary tree of Paper 43 and walk through it", 1);
  add("19.1j", "bigo", "How fast do the algorithms grow?", 1);
  add("19.2a", "recur", "Watch the call stack of a recursive function", 1); add("19.2b", "recur", "Watch the call stack of a recursive function", 1); add("19.2c", "recur", "Watch the call stack of a recursive function", 1);

  /* 20 Further programming */
  add("20.1b", "addr", "Addressing modes", 1); add("20.1c", "asm", "Step through a program that uses the index register", 1, { preset: "sum" }); add("20.p3c", "asm", "Step through the Paper 33 assembly program", 1, { preset: "p33" });
  add("20.1e", "oop", "Classes and objects", 1, { tab: "Class and objects" }); add("20.1g", "oop", "Inheritance and polymorphism", 1, { tab: "Inheritance" }); add("20.1h", "oop", "Containment (aggregation)", 1, { tab: "Containment (aggregation)" });
  add("20.1i", "prolog", "Ask the Prolog knowledge base a question", 1, { kb: "countries" }); add("20.1j", "prolog", "Ask the Prolog knowledge base a question", 1, { kb: "countries" }); add("20.p3a", "prolog", "Try the knowledge base of Paper 31 Q11", 1, { kb: "shop" });
})(typeof window !== "undefined" ? window : this);
(function(root){
  var M = root.ILEARN_VIZ.MAP;
  function add(id, w, title, at, o, note){ (M[id] = M[id] || []).push({ w: w, title: title, at: at, o: o || {}, note: note || "" }); }
  add("15.2g", "demorgan", "Check De Morgan's laws with a truth table", 1);
  add("15.p3e", "demorgan", "Check De Morgan's laws with a truth table", 1);
  add("14.1f", "email", "Follow an email: SMTP, POP3 and IMAP", 1);
  add("14.1g", "p2p", "A swarm sharing the pieces of a file", 1);
  add("18.1g", "regress", "Regression: fit a line to the data", 1);
  add("18.p3a", "regress", "Regression: fit a line to the data", 1);
  add("16.2a", "interp", "Interpreter against compiler", 1);
  add("16.2c", "synkey", "How to read a syntax diagram", 0);
  add("16.2c", "syndiag", "Walk through a syntax diagram", 0);
  add("16.2c", "bnfderive", "Build a string step by step from BNF rules", 1);
  add("16.2c", "synquiz", "Syntax diagram and BNF quiz", 1);
})(typeof window !== "undefined" ? window : this);
