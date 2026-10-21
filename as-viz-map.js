/* Which interactive visual goes with which AS (11BR) iLearn lesson. at: 0 = after the idea, 1 = after the worked example. */
(function(root){
  "use strict";
  var M = root.ILEARN_VIZ.MAP;
  function add(id, w, title, at, o, note){ (M[id] = M[id] || []).push({ w: w, title: title, at: at, o: o || {}, note: note || "" }); }
  add("1.1.2a", "bits", "Switch bits on and off: binary, denary and hex", 0);
  add("1.1.2a", "twos", "Two's complement: build and negate", 1);
  add("1.1.4a", "bcd", "BCD: one 4-bit group for every digit", 0);
  add("4.1.1a", "fde", "Inside the CPU", 1);
  add("4.1.5a", "interrupt", "Interrupts and the queue", 1);
  add("9.1.2a", "decomp", "Split a problem into modules", 0);
  add("9.2.1a", "dtype", "Which data type?", 1);
  add("9.2.2a", "trace", "Trace a REPEAT UNTIL loop", 1, { p: "repeat" });
  add("11.2.1a", "trace", "Trace a REPEAT UNTIL loop", 1, { p: "repeat" });
  add("12.3.1a", "errtypes", "Sort the errors: syntax, logic or run-time?", 0);

  /* ---- topics 1 to 12: illustrations and animations (reused from the 10BR and A Level widget sets) ---- */
  add("1.1.1a", "units", "Convert between units of storage", 1);
  add("1.1.2b", "divtwo", "Denary to binary by dividing by 2", 1);
  add("1.1.2b", "nibble", "Split a byte into nibbles and read it as hex", 1);
  add("1.1.3a", "binadd", "Add two binary numbers", 1);
  add("1.1.5a", "ascii", "Turn text into ASCII codes", 1);
  add("1.2.1a", "pixels", "Paint a bitmap image", 1);
  add("1.2.2a", "pixels", "Paint a bitmap image", 1);
  add("1.2.4a", "sound", "Sample a sound wave", 1);
  add("1.3.1a", "lossy", "Compress a picture: lossless against lossy", 1);
  add("1.3.1b", "lossy", "Compress a picture: lossless against lossy", 1);
  add("2.1.3a", "packetnet", "Packets finding their own routes", 1);
  add("2.1.3b", "packetnet", "Packets finding their own routes", 1);
  add("2.1.7b", "packetnet", "Packets finding their own routes", 1);
  add("2.1.8a", "netaddr", "Check an IP address", 1, { k: "ipv4" });
  add("2.1.9a", "url", "Split a URL into its parts", 1);
  add("2.1.9a", "webfetch", "Follow a web page request", 1);
  add("2.1.5a", "noise", "What interference does to data", 1);
  add("3.1.2a", "usb", "Plug in a USB cable", 1);
  add("3.2.1a", "gate", "NOT, AND and OR", 0, { g: "AND" });
  add("3.2.1a", "gate", "NAND, NOR and XOR", 1, { g: "XOR" });
  add("3.2.2a", "circ", "Build a circuit and flip the inputs", 1, { c: "c1" });
  add("4.1.4a", "fde", "Inside the CPU", 1);
  add("4.2.2a", "asm", "Step through a program that uses the index register", 1, { preset: "sum" });
  add("4.3.1a", "shift", "Shift the bits", 1);
  add("5.2.1a", "interp", "Interpreter against compiler", 1);
  add("6.1.2a", "encrypt", "Send a message past a hacker", 1);
  add("6.1.2a", "phish", "Spot the phishing clues", 1);
  add("6.2.1a", "valid", "Try the validation checks", 1);
  add("6.2.1a", "parity", "Build a parity byte and damage it", 1);
  add("6.2.1a", "checkdigit", "Catch a typing mistake with a check digit", 1);
  add("9.2.3a", "trace", "Dry run: totalling and counting", 1, { p: "count" });
  add("10.2.1a", "arrays", "Click through a 1D array", 1, { kind: "1d" });
  add("10.2.1a", "lsearch", "Linear search", 1);
  add("10.2.1a", "sort", "Bubble sort animation", 1, { kind: "bubble" });
  add("10.4.1a", "stack", "Push and pop", 1);
  add("10.4.1a", "queue", "Enqueue and dequeue", 1);
  add("10.4.1a", "llist", "A linked list held in arrays", 1);
  add("12.1.1a", "pdlc", "The stages of the life cycle", 1);
  add("12.3.1b", "testdata", "Which kind of test data is it?", 1);
})(typeof window !== "undefined" ? window : this);
