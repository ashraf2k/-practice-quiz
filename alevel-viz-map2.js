/* More A Level lesson visuals (parts 7 and 8): which interactive diagram appears in which lesson. at: 0 = after the explanation, 1 = after the worked example. */
(function(root){
  "use strict";
  var M = root.ILEARN_VIZ.MAP;
  function add(id, w, title, at, o, note){ (M[id] = M[id] || []).push({ w: w, title: title, at: at, o: o || {}, note: note || "" }); }
  /* 13 user-defined types */
  add("13.1a", "udt", "Enumerated, pointer, record and set types", 1, { tab: "enum" });
  add("13.1b", "udt", "Enumerated types: ordered names, not strings", 1, { tab: "enum" });
  add("13.1c", "udt", "Pointers: an address, then dereferencing", 1, { tab: "ptr" });
  add("13.1d", "udt", "Records: fields of different types", 1, { tab: "rec" });
  add("13.1e", "udt", "Sets: union, intersection and difference", 1, { tab: "set" });
  add("13.1g", "udt", "Choose the right user-defined type", 1, { tab: "rec" });
  /* 14 communication */
  add("14.1e", "http", "A browser asks a web server for a page", 1);
  add("14.1d", "match", "Match the protocol or term", 1, { set: "net" });
  add("14.2b", "routing", "Follow a packet through the routers", 1, null, "Each router reads the destination in the header and uses its own routing table. The hop count in the header goes down at every router.");
  add("14.2c", "routing", "Follow a packet through the routers", 1);
  /* 15 hardware */
  add("15.1a", "riscCisc", "RISC against CISC", 1);
  add("15.1c", "isr", "An interrupt arrives: save, run the ISR, restore", 1);
  add("15.1c", "order", "Put the interrupt steps in order", 1, { set: "cycle" });
  add("15.2f", "boolsimp", "Simplify step by step: name the law", 1);
  add("15.2h", "boolsimp", "Simplify step by step: name the law", 1);
  /* 16 system software */
  add("16.1e", "isr", "An interrupt arrives: save, run the ISR, restore", 1);
  add("16.1f", "memmgmt", "Translate a logical address into a physical address", 1);
  add("16.1g", "memmgmt", "Translate a logical address into a physical address", 1);
  add("16.1g", "match", "Match the operating system term", 1, { set: "os" });
  add("16.1c", "match", "Match the operating system term", 1, { set: "os" });
  /* 17 security */
  add("17.1f", "order", "Put the SSL/TLS handshake in order", 1, { set: "tls" });
  add("17.1h", "certs", "Can the browser trust this certificate?", 1);
  /* 18 AI */
  add("18.1d", "aiml", "AI, machine learning and deep learning", 1);
  add("18.1f", "mlkinds", "Supervised, unsupervised and reinforcement learning", 1);
  add("18.1g", "match", "Match the machine learning term", 1, { set: "ml" });
  /* 19 and 20 */
  add("19.1i", "dict", "A dictionary as a hash table and as a linked list", 1);
  add("20.2a", "fileops", "Open, write, append, read and close a text file", 1);
  add("20.2b", "fileops", "Open, write, append, read and close a text file", 1);
  add("20.2d", "except", "Run a program with and without exception handling", 1);
})(typeof window !== "undefined" ? window : this);
