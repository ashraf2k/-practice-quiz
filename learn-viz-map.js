/* Which interactive visual goes with which 10BR iLearn lesson. at: 0 = after the idea, 1 = after the worked example. */
(function(root){
  "use strict";
  var M = root.ILEARN_VIZ.MAP;
  function add(id, w, title, at, o, note){ (M[id] = M[id] || []).push({ w: w, title: title, at: at, o: o || {}, note: note || "" }); }
  // Topic 1: Data representation
  add("1.1.1", "switches", "Switches, lamps and binary", 0);
  add("1.1.2b", "divtwo", "Denary to binary by dividing by 2", 1);
  add("1.1.2d", "nibble", "Split a byte into nibbles and read it as hex", 1); add("1.1.3", "nibble", "Why hex is shorter: one digit per nibble", 1);
  add("1.3.1", "ladder", "Climb the ladder of storage units", 0);
  add("1.3.4", "lossy", "Compress a picture: lossless against lossy", 1);
  add("1.1.2a", "bits", "Switch bits on and off", 0);
  ["1.1.2b", "1.1.2c", "1.1.2d", "1.1.3"].forEach(function(id){ add(id, "bits", "Switch bits on and off: binary, denary and hex", 1); });
  add("1.1.4a", "binadd", "Add two binary numbers", 1); add("1.1.4b", "binadd", "Spot the overflow error", 1);
  add("1.1.5", "shift", "Shift the bits", 1); add("1.1.6", "twos", "Two's complement: build and negate", 1);
  add("1.2.1", "ascii", "Turn text into ASCII codes", 1); add("1.2.2", "sound", "Sample a sound wave", 1);
  add("1.2.3", "pixels", "Paint a bitmap image", 1);
  add("1.3.1", "units", "Convert between units of storage", 1); add("1.3.2", "fsize", "File size calculator with working", 1);
  add("1.3.3", "rle", "Compress with run length encoding", 1); add("1.3.4", "rle", "Lossless against lossy compression", 1);
  // Topic 2: Data transmission
  add("2.1.1a", "packet", "Split a message into packets", 1);
  add("2.1.2a", "serpar", "Serial against parallel transmission", 1); add("2.1.2b", "duplex", "Simplex, half-duplex and full-duplex", 1);
  add("2.1.2c", "serpar", "Serial against parallel transmission", 1); add("2.1.2c", "duplex", "Simplex, half-duplex and full-duplex", 1);
  add("2.2.2a", "parity", "Build a parity byte and damage it", 1); add("2.2.2b", "echo", "Follow an echo check", 1);
  add("2.2.3", "checkdigit", "Catch a typing mistake with a check digit", 1); add("2.2.4", "arq", "Acknowledgements and timeouts", 1);
  add("2.3.2a", "caesar", "Encrypt and decrypt with one shared key", 1); add("2.3.2b", "enc", "Public and private keys", 1, { kind: "private" });
  add("2.1.1b", "packetnet", "Packets finding their own routes", 0);
  add("2.1.3", "usb", "Plug in a USB cable", 0); add("2.2.1", "noise", "What interference does to data", 0); add("2.3.1", "encrypt", "Send a message past a hacker", 0);
  // Topic 3: Hardware
  add("3.1.2a", "fde", "Inside the CPU", 1); add("3.1.2b", "fde", "Watch the fetch stage", 1); add("3.1.2c", "fde", "Watch decode and execute", 1);
  add("3.3.4", "vmem", "Fill RAM and use virtual memory", 1);
  add("3.4.2", "netaddr", "Check a MAC address", 1, { k: "mac" }); add("3.4.3a", "netaddr", "Check an IP address", 1, { k: "ipv4" }); add("3.4.3b", "netaddr", "Check an IP address", 1, { k: "ipv4" });
  // Topic 4: Software
  add("4.1.4a", "interrupt", "Interrupts and the queue", 1); add("4.1.4b", "interrupt", "Interrupts and the queue", 1);
  add("4.2.3a", "interp", "Interpreter against compiler", 1); add("4.2.3b", "interp", "Interpreter against compiler", 1); add("4.2.4", "interp", "Interpreter against compiler", 1);
  // Topic 5: The internet and its uses
  add("5.1.2", "url", "Split a URL into its parts", 1); add("5.1.3", "webfetch", "HTTP against HTTPS", 1); add("5.1.5", "webfetch", "Follow a web page request", 1);
  add("5.1.6a", "cookies", "Cookies at the shop", 1); add("5.1.6b", "cookies", "Session against persistent cookies", 1);
  add("5.2.2", "blockchain", "Try to change a ledger", 1);
  add("5.3.1a", "brute", "How long would a brute-force attack take?", 1); add("5.3.1c", "ddos", "A DDoS attack and a proxy server", 1);
  add("5.3.1f", "phish", "Spot the phishing clues", 1); add("5.3.1g", "phish", "Spot the warning signs", 1);
  // Topic 6: Automated and emerging technologies
  add("6.1.1a", "autosys", "Sensor, ADC, microprocessor, actuator", 1); add("6.1.1b", "autosys", "Inputs, processes and outputs", 1);
  add("6.3.3a", "mlearn", "Supervised and unsupervised learning", 1); add("6.3.3b", "expert", "Ask an expert system", 1);
  // Topic 7: Algorithm design and problem solving
  add("7.1", "pdlc", "The four stages of the life cycle", 1);
  add("7.2b", "flowsym", "The flowchart symbols", 0); add("7.2b", "flowrun", "Run a flowchart step by step", 1); add("7.2b", "flowfix", "Find the mistake in the flowchart", 1);
  add("7.4a", "flowrun", "The flowchart for totalling and counting", 1, { charts: ["total"] }); add("7.4b", "flowrun", "The flowchart for finding the largest", 1, { charts: ["max"] }); add("7.4c", "flowrun", "The flowchart for linear search", 1, { charts: ["lsearch"] });
  add("7.4a", "trace", "Dry run: totalling and counting", 1, { p: "count" }); add("7.4c", "lsearch", "Linear search", 1); add("7.4d", "sort", "Bubble sort animation", 1, { kind: "bubble" });
  add("7.5a", "valid", "Try the validation checks", 1); add("7.6", "testdata", "Which kind of test data is it?", 1);
  add("7.7", "trace", "Fill in a trace table", 1, { p: "total" });
  // Topic 8: Programming
  add("8.1.2", "dtype", "Which data type?", 1); add("8.1.4c1", "trace", "Trace a FOR loop", 1, { p: "forl" }); add("8.1.4c2", "trace", "Trace a WHILE loop", 1, { p: "whilel" });
  add("8.1.4c3", "trace", "Trace a REPEAT UNTIL loop", 1, { p: "repeat" }); add("8.1.4d", "trace", "Dry run: totalling and counting", 1, { p: "count" });
  add("8.1.7", "libr", "Try DIV, MOD and ROUND", 1);
  add("8.2.1", "arrays", "Click through a 1D array", 1, { kind: "1d" }); add("8.2.2", "arrays", "Click through a 1D array", 1, { kind: "1d" }); add("8.2.3a", "arrays", "Click through a 1D array", 1, { kind: "1d" });
  add("8.2.3b", "arrays", "Nested loops filling a 2D array", 1, { kind: "2d" });
  // Topic 9: Databases
  ["9.4a", "9.4b", "9.4c", "9.4d", "9.4e"].forEach(function(id){ add(id, "sql", "Build an SQL query", 1); });
  // Topic 10: Boolean logic
  add("10.1", "gate", "Logic gates with switches", 1, { g: "AND" }); add("10.2a", "gate", "NOT, AND and OR", 1, { g: "AND" }); add("10.2b", "gate", "NAND, NOR and XOR", 1, { g: "NAND" });
  add("10.3a", "circ", "Build a circuit and flip the inputs", 1, { c: "c1" }); add("10.3b", "circ", "Complete a truth table", 1, { c: "c2" }); add("10.3c", "circ", "From circuit to expression", 1, { c: "c3" });
})(typeof window !== "undefined" ? window : this);
(function(root){
  "use strict";
  var M = root.ILEARN_VIZ.MAP;
  function add(id, w, title, at, o, note){ (M[id] = M[id] || []).push({ w: w, title: title, at: at, o: o || {}, note: note || "" }); }
  add("8.1.6a", "submachine", "A function is a machine: values in, one value out", 1, { kind: "func" });
  add("8.1.6b1", "submachine", "Follow a procedure call", 1, { kind: "proc" });
  add("8.1.6b2", "submachine", "Follow a function call and RETURN", 1, { kind: "func" });
})(typeof window !== "undefined" ? window : this);
