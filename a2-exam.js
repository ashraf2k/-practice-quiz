// iSolve for 12BR (Cambridge A Level Computer Science 9618, topics 13-20): exam-style practice sets built from the A2 course-notes practice
// questions and past-paper style questions. Mark points are keyword checks written for this site (the notes give questions, not schemes),
// so the full model answer is always shown after the answer. Loaded AFTER exam-data.js and added to the 12BR choices.
//   A2EX.paper(key, topicNo, title, subtitle, [question, ...]);  A2EX.q(id, difficulty, src, topic, prompt, [point...], explanation, model, viz)
//   A2EX.k(text, marks, [[synonyms]...], need)   A2EX.any(text, max, [[theme words]...])   A2EX.n(text, marks, [accepted values])   A2EX.near(...)
var A2EX = (function(){
  var choices = [];
  function k(text, marks, groups, need){ return { text: text, marks: marks, match: { type: "keywords", groups: groups, needCount: need || groups.length } }; }
  function any(text, max, themes){ return { text: text, marks: max, match: { type: "keywords", groups: themes, needCount: max, marksPerGroup: 1 } }; }
  function near(text, marks, anchor, stop, groups, need){ return { text: text, marks: marks, match: { type: "near", span: 400, anchor: anchor, stop: stop, groups: groups, needCount: need || groups.length } }; }
  function n(text, marks, values){ return { text: text, marks: marks, match: { type: "value", values: values } }; }
  function q(id, difficulty, src, topic, prompt, points, explanation, model, viz){
    var marks = points.reduce(function(a, p){ return a + p.marks; }, 0);
    return { id: id, marks: marks, difficulty: difficulty, topic: topic, prompt: prompt + "\n\n[" + src + "]", markPoints: points, explanation: explanation, calc: false, model: model, viz: viz || null };
  }
  function paper(key, topicNo, title, subtitle, questions){
    var total = questions.reduce(function(a, x){ return a + x.marks; }, 0);
    EXAM_PAPERS[key] = { key: key, title: title, subtitle: subtitle + " · " + total + " marks", classes: ["12BR"], totalMarks: total, strictMarks: true, questions: questions };
    choices.push({ key: key, label: "Topic " + topicNo + ": " + title.replace(/^Topic \d+: /, "") + " (A Level)" });
  }
  function register(){
    choices.sort(function(a, b){ return parseInt(a.label.slice(6), 10) - parseInt(b.label.slice(6), 10); });
    var entry = EXAM_PAPER_CHOICES_BY_CLASS.filter(function(e){ return e.test.test("12BR"); })[0];
    if(entry){ choices.forEach(function(c){ if(!entry.choices.some(function(x){ return x.key === c.key; })) entry.choices.push(c); }); }
    else EXAM_PAPER_CHOICES_BY_CLASS.push({ test: /^12br/i, choices: choices });
  }
  return { k: k, any: any, near: near, n: n, q: q, paper: paper, register: register };
})();
(function(){ var k = A2EX.k, any = A2EX.any, near = A2EX.near, n = A2EX.n, q = A2EX.q;
var SRC = "A2 course notes, practice question ";
var AS = "(←|<-+|:=)";

/* ===================== Topic 13 ===================== */
A2EX.paper("a2_t13_exam", 13, "Topic 13: Data representation", "User-defined types, file organisation and floating-point numbers", [
  q("Q1", "easy", SRC + "13A", "Enumerated types",
    "Using pseudocode: (a) declare an enumerated data type for the days of the week; (b) declare two variables, Today and Yesterday, of that type; (c) assign the value Wednesday to Today; (d) write a suitable assignment statement for Tomorrow. [4]",
    [ k("(a) TYPE ... = (Sunday, ..., Saturday): the names are in order, in brackets and not in quotation marks", 1, [["re:type\\s+\\w+\\s*=\\s*\\("], ["re:(sun|mon)\\w*\\s*,[^)]*(sat|sun)\\w*\\s*\\)"]]),
      k("(b) DECLARE Today, Yesterday : <the type name>", 1, [["re:declare\\s+(today|yesterday)\\s*,\\s*(today|yesterday)\\s*:", "re:declare\\s+today\\s*:[\\s\\S]*declare\\s+yesterday\\s*:", "re:declare\\s+yesterday\\s*:[\\s\\S]*declare\\s+today\\s*:"]]),
      k("(c) Today ← Wednesday", 1, [["re:today\\s*" + AS + "\\s*wed"]]),
      k("(d) Tomorrow ← Thursday, or Tomorrow ← Today + 1 (the next value in the ordered list)", 1, [["re:tomorrow\\s*" + AS + "\\s*(thu|today\\s*\\+\\s*1|succ)"]]) ],
    "TYPE Days = (Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday)\nDECLARE Today, Yesterday : Days\nToday ← Wednesday\nTomorrow ← Thursday   (or Today + 1, taking care at Saturday)\nThe values are names, not strings, so they have no quotation marks, and they are ordered (ordinal).",
    "TYPE Days = (Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday)\nDECLARE Today, Yesterday : Days\nToday <- Wednesday\nTomorrow <- Thursday", { w: "udt", o: { tab: "enum" }, t: "Try an enumerated type" }),
  q("Q2", "intermediate", SRC + "13B", "Pointer types",
    "Using the enumerated type for the days of the week, declare a suitable pointer type and a pointer variable, and set the pointer to point at Today. [3]",
    [ k("A pointer type is defined with ^ and the base type: TYPE TDayPointer = ^Days", 1, [["re:type\\s+\\w+\\s*=\\s*\\^\\s*\\w+"]]),
      k("A pointer variable of that type is declared", 1, [["re:declare\\s+\\w+\\s*:\\s*\\w*(ptr|pointer)\\w*"]]),
      k("The pointer is set to the address of Today: DayPointer ← ^Today", 1, [["re:\\w+\\s*" + AS + "\\s*\\^\\s*today"]]) ],
    "TYPE TDayPointer = ^Days\nDECLARE DayPointer : TDayPointer\nDayPointer ← ^Today\nA pointer holds the memory address of the data; DayPointer^ follows the address to the value (dereferencing).",
    "TYPE TDayPointer = ^Days\nDECLARE DayPointer : TDayPointer\nDayPointer <- ^Today", { w: "udt", o: { tab: "ptr" }, t: "Try pointers" }),
  q("Q3", "intermediate", SRC + "13C", "Composite and non-composite types",
    "Explain, using examples, the difference between composite and non-composite data types, and explain why programmers need to define their own data types. [4]",
    [ any("Any four: non-composite types do not refer to other data types; examples of non-composite types are enumerated and pointer; composite types are made up of / refer to other data types; examples of composite types are record, set, class; primitive types can be insufficient or inefficient; the programmer can make a type that fits the data exactly", 4,
        [["does not refer", "not refer", "doesn't refer", "not reference", "does not reference", "not built from", "not made up", "no other data type", "not based on other", "does not contain other", "not composed", "does not use other"], ["enumerated", "pointer"], ["refers to other", "refer to other", "references other", "reference other", "made up of", "built from", "contains other", "combines", "several data types", "different data types", "multiple data types", "other data types", "collection of"], ["record", "set", "class"], ["primitive", "built-in", "built in", "insufficient", "not suitable", "inefficient", "own data type", "user-defined", "user defined", "programmer-defined", "programmer defines", "programmer defined"]]) ],
    "Non-composite: does not refer to other data types when defined (enumerated, pointer). Composite: made up of or refers to other data types (record, set, class). Programmers need user-defined types because primitive types such as integer or string can be insufficient or inefficient; a user-defined type matches the real data, e.g. a record holds a book's title, author and number of pages together.",
    "A non-composite data type does not refer to other data types, for example an enumerated type or a pointer. A composite data type is made up of other data types, for example a record or a set. Programmers need their own data types because primitive types are insufficient for some data."),
  q("Q4", "intermediate", SRC + "13D", "Hashing and open hash",
    "A file of records is stored from address 500. Each record takes five locations and there is space for 1000 records. The key field can be 1 to 9999. The address of a record is: start address + (key MOD 1000) × record size.\n(a) Calculate the address at which the record with key 9354 is stored. [2]\n(b) That location is already in use and an open hash is used. What is the address of the next location to be checked? [1]",
    [ n("(a) 9354 MOD 1000 = 354", 1, ["354"]), n("(a) address = 500 + 354 × 5 = 2270", 1, ["2270"]), n("(b) the next record location is 2275 (open hash: next free space, 5 locations later)", 1, ["2275"]) ],
    "9354 MOD 1000 = 354; address = 500 + 354 × 5 = 2270. With an open hash the next free space is used, so the next location checked is 2270 + 5 = 2275.",
    "9354 MOD 1000 = 354, address 500 + 354 x 5 = 2270. Next location is 2275.", { w: "hash", o: {}, t: "Hash a key to an address" }),
  q("Q5", "intermediate", SRC + "13E", "Serial, sequential and random files",
    "(a) Describe two differences between a serial file and a sequential file. [3]\n(b) Choose the most suitable file organisation (serial, sequential or random) for each situation: (i) borrowing books from a library; (ii) producing an annual tax statement for every employee; (iii) recording daily rainfall readings at a remote weather station, collected monthly. [3]",
    [ any("(a) Any three: serial records are stored in the order they were added; sequential records are stored in key-field order; serial is not in any order of the key; sequential allows searching to stop once the key is passed; serial is used for temporary / transaction files, sequential for master files", 3,
        [["order they were added", "order added", "chronological", "appended", "end of the file", "in the order they", "order of entry", "no particular order", "unordered", "not in order", "not sorted", "added to the end"], ["key field", "sorted", "ascending", "order of the key", "in key order", "ordered by", "in order of the key"], ["temporary", "transaction", "master", "billing", "bank", "customer number"], ["stop searching", "stop when", "greater than", "once the key", "can stop"]]),
      near("(b)(i) Library: random (direct access by key, fast)", 1, ["library", "borrow", "(i)", "1)"], ["tax", "annual", "statement", "rain", "rainfall", "weather"], [["random", "direct", "hash"]], 1),
      near("(b)(ii) Tax statement: sequential (every record processed in order)", 1, ["tax", "annual", "statement"], ["rain", "rainfall", "weather", "library", "borrow"], [["sequential"]], 1),
      near("(b)(iii) Rainfall readings: serial (records are just added as they arrive)", 1, ["rain", "rainfall", "weather"], ["library", "borrow", "tax", "annual", "statement"], [["serial"]], 1) ],
    "(a) Serial: records stored one after another in the order they were added (not sorted), used for temporary or transaction files. Sequential: records stored in order of the key field, used for master files, and a search can stop once the key is passed.\n(b)(i) Random: a record can be found directly by hashing its key. (ii) Sequential: every employee's record is processed in key order. (iii) Serial: readings are simply added at the end as they arrive.",
    "(a) A serial file stores records in the order they were added, in no order of the key. A sequential file stores records sorted in key field order so searching can stop once the key is passed. (b) (i) Library: random (ii) tax statement: sequential (iii) rainfall: serial", { w: "fileorg", o: {}, t: "Compare serial, sequential and random files" }),
  q("Q6", "hard", SRC + "13F", "Floating point to denary",
    "In each case the mantissa has 8 bits and the exponent 8 bits, both in two's complement. Convert to denary:\n(a) mantissa 01010000, exponent 00000011\n(b) mantissa 01101000, exponent 00000010\n(c) mantissa 10110000, exponent 00000011 [3]",
    [ n("(a) 0.101 × 2³ = 5", 1, ["5"]), n("(b) 0.1101 × 2² = 3.25", 1, ["3.25"]), n("(c) −0.625 × 8 = −5", 1, ["-5", "−5"]) ],
    "(a) 0.1010000 = 0.625; × 2³ = 5.\n(b) 0.1101000 = 0.8125; × 2² = 3.25.\n(c) 1.0110000 in two's complement = −1 + 0.375 = −0.625; × 2³ = −5.",
    "(a) 5 (b) 3.25 (c) -5", { w: "fp", o: { m: 8, e: 8 }, t: "Check floating-point conversions (8-bit mantissa and exponent)" }),
  q("Q7", "hard", SRC + "13G", "Denary to floating point",
    "Convert to normalised binary floating point with an 8-bit mantissa and an 8-bit exponent: (a) +3.5  (b) 0.3125  (c) 15.375. Write the mantissa and the exponent for each. [6]",
    [ n("(a) mantissa 01110000", 1, ["01110000"]), n("(a) exponent 00000010", 1, ["00000010"]), n("(b) mantissa 01010000", 1, ["01010000"]), n("(b) exponent 11111111 (−1)", 1, ["11111111"]), n("(c) mantissa 01111011", 1, ["01111011"]), n("(c) exponent 00000100", 1, ["00000100"]) ],
    "(a) 3.5 = 11.1 = 0.111 × 2²: mantissa 01110000, exponent 00000010.\n(b) 0.3125 = 0.0101 = 0.101 × 2⁻¹: mantissa 01010000, exponent 11111111.\n(c) 15.375 = 1111.011 = 0.1111011 × 2⁴: mantissa 01111011, exponent 00000100.",
    "(a) 01110000 00000010 (b) 01010000 11111111 (c) 01111011 00000100", { w: "fp", o: { m: 8, e: 8 }, t: "Build the floating-point number bit by bit" }),
  q("Q8", "hard", SRC + "13H", "Normalisation",
    "Normalise these floating-point numbers (8-bit mantissa, 8-bit exponent). Give the new mantissa and exponent.\n(a) mantissa 0.0001101, exponent 00000110\n(b) mantissa 0.0011000, exponent 00001001\n(c) mantissa 1.1111000, exponent 00001000 [6]",
    [ n("(a) mantissa 0.1101000", 1, ["0.1101000", "01101000"]), n("(a) exponent 00000011", 1, ["00000011"]), n("(b) mantissa 0.1100000", 1, ["0.1100000", "01100000"]), n("(b) exponent 00000111", 1, ["00000111"]), n("(c) mantissa 1.0000000", 1, ["1.0000000", "10000000"]), n("(c) exponent 00000100", 1, ["00000100"]) ],
    "A positive mantissa is normalised when it starts 0.1, a negative one when it starts 1.0. Each shift left lowers the exponent by 1.\n(a) shift 3 left: 0.1101000, exponent 6 − 3 = 3 (00000011).\n(b) shift 2 left: 0.1100000, exponent 9 − 2 = 7 (00000111).\n(c) shift 4 left: 1.0000000, exponent 8 − 4 = 4 (00000100). The value is unchanged.",
    "(a) 0.1101000 00000011 (b) 0.1100000 00000111 (c) 1.0000000 00000100", { w: "fp", o: { m: 8, e: 8 }, t: "Normalised or not?" })
]);

/* ===================== Topic 14 ===================== */
A2EX.paper("a2_t14_exam", 14, "Topic 14: Communication and internet technologies", "TCP/IP, email, BitTorrent, routing", [
  q("Q1", "easy", SRC + "14A-1", "TCP/IP layers and email protocols",
    "(a) Name the four layers of the TCP/IP protocol suite. [2]\n(b) Name one protocol that works at each layer. [2]\n(c) State the difference between SMTP and MIME when sending email. [2]",
    [ any("(a) Application, transport, internet (network / IP) and link (network access): 1 mark for two correct, 2 marks for all four", 2, [["application", "transport"], ["internet", "network layer", "ip layer"], ["link", "network access", "physical", "data link"]]),
      any("(b) e.g. HTTP/FTP/SMTP/POP3/IMAP (application); TCP (transport); IP (internet); Ethernet (link): 1 mark for two correct, 2 for all four", 2, [["http", "ftp", "smtp", "pop", "imap"], ["tcp", "udp"], ["ip", "icmp", "arp"], ["ethernet", "wi-fi", "wifi", "ppp"]]),
      k("(c) SMTP sends / transfers the email text between servers", 1, [["smtp"], ["send", "sends", "transfer", "transmit", "push"]], 2),
      k("(c) MIME allows attachments / non-text data (images, audio) to be sent by encoding it", 1, [["mime"], ["attachment", "non-text", "binary", "image", "audio", "video", "encode", "ascii"]], 2) ],
    "(a) Application, transport, internet (IP) and link.\n(b) Application: HTTP, FTP, SMTP, POP3 or IMAP; transport: TCP; internet: IP; link: Ethernet.\n(c) SMTP is the protocol that sends email (push) from a client to a mail server and between servers. MIME extends it so that attachments and other non-text data (images, sound) can be sent by encoding them as text.",
    "(a) application, transport, internet, link (b) HTTP, TCP, IP, Ethernet (c) SMTP sends the email text between servers. MIME allows attachments such as images to be sent by encoding them.", { w: "tcp", o: {}, t: "A message travels down, across and up the TCP/IP stack" }),
  q("Q2", "intermediate", SRC + "14A-3", "BitTorrent",
    "Explain the following terms used in peer-to-peer BitTorrent file sharing: peer, leech, swarm, seed, tracker. [5]",
    [ near("peer: a computer taking part that downloads and uploads pieces", 1, ["peer"], ["leech", "swarm", "seed", "tracker"], [["download", "upload", "share", "computer", "user", "client"]], 1),
      near("leech: a peer that downloads but uploads little or nothing", 1, ["leech"], ["swarm", "seed", "tracker"], [["download"], ["not upload", "does not upload", "doesn't upload", "no upload", "little", "without upload", "never upload", "without sharing", "not share"]], 2),
      near("swarm: all the peers sharing / downloading the same file", 1, ["swarm"], ["leech", "seed", "tracker"], [["all", "group", "set of", "collection", "peers", "users"]], 1),
      near("seed: a peer that already has the complete file and uploads it", 1, ["seed"], ["leech", "swarm", "tracker"], [["complete", "whole", "entire", "full", "all the pieces", "all pieces"]], 1),
      near("tracker: a server that tells peers where other peers / pieces are", 1, ["tracker"], ["leech", "swarm", "seed"], [["server"], ["find", "locat", "address", "which peers", "list", "informs", "tells", "keeps track"]], 2) ],
    "Peer: a computer in the swarm that both downloads and uploads pieces of the file. Leech: a peer that downloads but uploads little or nothing. Swarm: all the peers that are sharing the same file. Seed: a peer that has the whole file and only uploads. Tracker: a server that helps peers find each other (keeps a list of which peers have the file).",
    "A peer is a computer that downloads and uploads pieces of the file. A leech is a peer that downloads the file but does not upload. A swarm is all the peers sharing the file. A seed is a peer that has the complete file. A tracker is a server that tells peers where to find the other peers.", { w: "p2p", o: {}, t: "A swarm sharing the pieces of a file" }),
  q("Q3", "intermediate", SRC + "14A-4(a), (b)", "Packet header and routing table",
    "(a) Describe the difference between a packet header and a routing table. [2]\n(b) Describe how the packet header and the routing table are used to route a packet. [2]",
    [ k("(a) The header is part of the packet: it holds the destination address (and source, packet number, hop count)", 1, [["header"], ["destination", "address", "packet number", "hop", "source", "sequence"]], 2),
      k("(a) The routing table is held by the router: it lists networks / destinations and the next hop (outgoing link) for each", 1, [["table"], ["router"], ["next hop", "next router", "destination", "outgoing", "network", "route"]], 2),
      k("(b) The router reads the destination address from the header", 1, [["read", "reads", "checks", "looks at", "examines", "uses"], ["header", "destination"]], 2),
      k("(b) and looks it up in the routing table to find the next hop, then forwards the packet (reducing the hop count)", 1, [["look", "match", "compare", "search", "find"], ["table"], ["next", "forward", "send", "hop"]], 3) ],
    "(a) The packet header is part of each packet and contains the destination (and source) address, the packet number and the hop count. A routing table is stored in a router and lists, for each destination network, the next hop to use.\n(b) The router reads the destination address in the header, looks it up in its routing table to find the next hop, forwards the packet there and decreases the hop count.",
    "The header is part of the packet and contains the destination address and packet number. The routing table is in the router and lists the next hop for each destination. The router reads the destination in the header, looks it up in the routing table and forwards the packet to the next hop.", { w: "routing", o: {}, t: "Follow a packet through the routers" }),
  q("Q4", "hard", SRC + "14A-4(c)", "Packet switching for a video call",
    "A person makes a video call using VoIP software. Explain how packet switching could be used and describe any problems that might occur. [4]",
    [ any("Any four: the call data is split into packets; each packet has a header with address and packet number; packets may take different routes; packets are re-ordered / reassembled at the receiver; packets can arrive late or out of order (delay, jitter); packets can be lost giving gaps / poor quality; needs enough bandwidth", 4,
        [["split", "broken", "divided", "packets"], ["header", "address", "packet number", "sequence number"], ["different route", "different path", "different routes", "own route"], ["re-order", "reorder", "reassembl", "put back", "correct order", "rebuilt", "re-assembl"], ["delay", "late", "lag", "latency", "jitter", "out of order", "out-of-order"], ["lost", "loss", "missing", "gaps", "drop", "poor quality", "freeze", "buffer"]]) ],
    "The audio and video are split into packets, each with a header (destination address, packet number). Each packet is routed separately, possibly by different routes, and the receiving computer re-orders them using the packet numbers. Problems: packets arrive late or out of order (delay and jitter), lost packets cause gaps, freezing or poor quality, and the call needs enough bandwidth.",
    "The video call is split into packets with a header holding the address and packet number. Each packet may take a different route and the receiver puts them back in order. Problems are delay, packets arriving out of order and lost packets causing gaps.", { w: "switching", o: {}, t: "Circuit switching and packet switching" })
]);

/* ===================== Topic 15 ===================== */
A2EX.paper("a2_t15_exam", 15, "Topic 15: Hardware and virtual machines", "RISC and CISC, pipelining, parallel processing, Boolean algebra", [
  q("Q1", "intermediate", SRC + "15A-1", "RISC and CISC",
    "(a) Describe why the development of RISC processors was important. [2]\n(b) Describe the main differences between RISC and CISC. [3]",
    [ any("(a) Any two: simple instructions each taking one clock cycle; allows efficient pipelining; faster / higher throughput; simpler / cheaper control unit; uses registers so fewer memory accesses", 2, [["one clock cycle", "single clock cycle", "one cycle", "simple instruction", "simpler instruction", "reduced instruction"], ["pipelin"], ["faster", "speed", "throughput", "performance", "efficient"], ["simpler", "cheaper", "less complex", "smaller"], ["register", "fewer memory", "less memory"]]),
      any("(b) Any three differences: RISC has fewer instructions; CISC has many specialised instructions; RISC instructions are simple, one cycle; CISC may take several cycles; RISC uses registers, CISC operates on memory; RISC makes pipelining easier; RISC programs are longer / CISC programs shorter", 3,
        [["fewer", "reduced", "small number"], ["many instruction", "more instruction", "specialised", "specialized", "complex instruction"], ["one clock cycle", "single clock cycle", "one cycle", "several cycles", "multiple cycles", "varying"], ["register", "memory"], ["pipelin"], ["longer", "shorter", "more lines", "fewer lines", "program size", "code size"]]) ],
    "(a) RISC uses a small set of simple instructions that each take one clock cycle, which makes pipelining efficient and the control unit simpler, so programs run faster using registers rather than memory.\n(b) RISC has fewer, simple instructions (one cycle each) that work on registers and suit pipelining, but programs are longer. CISC has many specialised instructions (several cycles) that can work on memory, so programs are shorter but pipelining is harder.",
    "(a) RISC has simple instructions that each take one clock cycle which allows efficient pipelining and makes it faster. (b) RISC has fewer instructions than CISC. RISC instructions use registers whereas CISC works on memory. RISC makes pipelining easier. RISC programs are longer.", { w: "riscCisc", o: {}, t: "RISC against CISC" }),
  q("Q2", "intermediate", SRC + "15A-2", "Von Neumann bottleneck",
    "(a) What is meant by the Von Neumann bottleneck? [2]\n(b) How does it affect processor performance? [1]",
    [ k("(a) Instructions and data share one bus / one path between the CPU and memory", 1, [["one bus", "single bus", "same bus", "shared bus", "one path", "shared", "single path", "same path"], ["data"], ["instruction"]], 3),
      k("(a) so only one can be transferred at a time (the bus limits the speed)", 1, [["one at a time", "only one", "cannot be", "can't be", "limit", "bottleneck", "slow", "wait"]]),
      k("(b) the processor has to wait / is slowed down, so it cannot use its full speed", 1, [["wait", "idle", "slow", "delay", "reduce", "limits", "limited", "bottleneck"]]) ],
    "(a) In the Von Neumann architecture the instructions and the data are held in the same memory and travel over the same bus, so only one can be transferred at a time. (b) The processor often has to wait for the bus, so its speed is limited by the transfer rate rather than by how fast it can process.",
    "(a) The instructions and data use the same bus so only one can be transferred at a time. (b) The processor has to wait which slows down its performance.", { w: "pipeline", o: {}, t: "Pipelining: five stages, one clock cycle each" }),
  q("Q3", "hard", SRC + "15A-2 (Q4)", "Pipelining",
    "A processor uses a five-stage pipeline (fetch, decode, operand fetch, execute, write back), one clock cycle per stage. Six instructions are to be run. How many clock cycles are needed (a) with pipelining, and (b) without pipelining (each instruction completing before the next begins)? (c) State why pipelining is faster. [3]",
    [ n("(a) 5 + (6 − 1) = 10 cycles", 1, ["10"]), n("(b) 6 × 5 = 30 cycles", 1, ["30"]), k("(c) stages of different instructions overlap / are carried out at the same time", 1, [["overlap", "same time", "simultaneous", "parallel", "different stage", "at once", "concurrent", "next instruction"]]) ],
    "(a) The first instruction takes 5 cycles; each other instruction finishes one cycle later: 5 + 5 = 10 cycles.\n(b) 6 × 5 = 30 cycles.\n(c) While one instruction is being executed the next is being decoded and the one after is being fetched, so different stages of different instructions overlap.",
    "(a) 10 (b) 30 (c) different instructions are in different stages at the same time", { w: "pipeline", o: {}, t: "Pipelining: five stages, one clock cycle each" }),
  q("Q4", "intermediate", SRC + "15A-2 (Q3)", "Parallel processing",
    "(a) State two differences between cluster computers and massively parallel computers. [2]\n(b) Describe one application that uses massively parallel computers and justify your choice. [2]",
    [ any("(a) Any two: a cluster is separate computers joined by a network, a massively parallel computer has many processors in one machine with their own memory; a cluster is cheaper / uses standard machines; MPP processors are linked by a very fast internal connection; MPP is faster", 2, [["separate computers", "individual computers", "complete computers", "network of computers", "standard computer", "ordinary computers", "off the shelf", "off-the-shelf"], ["one machine", "single machine", "one system", "single computer", "same machine", "inside", "own memory"], ["cheaper", "cost", "expensive"], ["fast", "high-speed", "high speed", "interconnect", "bus"]]),
      k("(b) A named suitable application (e.g. weather forecasting, climate or scientific modelling, AI training, simulations, genome analysis)", 1, [["weather", "climate", "model", "simulation", "scientific", "genome", "dna", "ai", "machine learning", "training", "cryptograph", "protein", "nuclear", "astronomy", "forecast"]]),
      k("(b) Justification: the problem can be split into many independent parts processed at the same time / huge amounts of data", 1, [["split", "parts", "divided", "many calculations", "same time", "simultaneous", "huge", "large amount", "parallel", "faster"]]) ],
    "(a) A cluster is a group of separate, standard computers joined by a network that work together; a massively parallel computer has a very large number of processors (each with its own memory) inside one system joined by a very fast interconnect, and it is more expensive and faster.\n(b) Weather forecasting: the atmosphere is divided into many small areas and each processor calculates its part at the same time, which would take far too long on one processor.",
    "(a) A cluster is separate computers joined by a network. A massively parallel computer has many processors in one machine with a very fast interconnect. (b) Weather forecasting because the calculations can be split into many parts processed at the same time.", { w: "arch", o: {}, t: "SISD, SIMD, MISD and MIMD" }),
  q("Q5", "hard", SRC + "15B", "Boolean algebra",
    "Simplify the expression A.B + A.B̅.C (B̅ means NOT B), showing the laws used. State the simplified expression. [3]",
    [ k("Factorise A: A.(B + B̅.C)", 1, [["re:a\\s*\\.?\\s*\\(\\s*b\\s*\\+\\s*(b̅|~b|not b|b'|!b|\\bnot\\s*b)\\s*\\.?\\s*c\\s*\\)", "factor", "distributive", "common factor", "take out a"]]),
      k("Use absorption: B + B̅.C = B + C", 1, [["absorption", "b + c", "b+c", "b or c"]]),
      k("Simplified: A.(B + C) or A.B + A.C", 1, [["re:a\\s*\\.?\\s*\\(\\s*b\\s*\\+\\s*c\\s*\\)", "re:a\\s*\\.?\\s*b\\s*\\+\\s*a\\s*\\.?\\s*c", "a and (b or c)", "(b + c)"]]) ],
    "A.B + A.B̅.C = A.(B + B̅.C)   factorise A (distributive law)\n= A.(B + C)   absorption: B + B̅.C = B + C\n= A.B + A.C",
    "A.(B + notB.C) factorise, absorption B + notB.C = B + C, A.(B + C) = A.B + A.C", { w: "boolsimp", o: {}, t: "Simplify step by step: name the law" }),
  q("Q6", "hard", SRC + "15E (Q3)", "Karnaugh maps",
    "Four binary signals A, B, C, D give X = 1 when: A = 0; or B = C = 0. (a) Write a simplified expression for X. [2] (b) State which input is not needed and why. [1]",
    [ k("(a) the term for A = 0: NOT A", 1, [["re:(not\\s*a\\b|~a\\b|\\ba'|ā|a̅|!a\\b|a bar|a-bar|\\ba̅)"]]),
      k("(a) the term for B = C = 0: NOT B AND NOT C, so X = NOT A OR (NOT B AND NOT C)", 1, [["re:(not\\s*b|~b|b'|b̅|!b|b bar)"], ["re:(not\\s*c|~c|c'|c̅|!c|c bar)"]]),
      k("(b) D is not needed: it does not affect the output in any row", 1, [["re:\\bd\\b"], ["not needed", "no effect", "doesn't affect", "does not affect", "not required", "irrelevant", "not used", "does not appear", "doesn't appear", "not involved", "unnecessary", "can be ignored"]]) ],
    "X = 1 when A = 0 (8 rows) or when B = 0 and C = 0 (4 rows, two already counted). Grouping the 1s on a K-map gives X = Ā + B̅.C̅ (NOT A OR (NOT B AND NOT C)). D does not appear in the expression, so its value never changes the output: it is not needed.",
    "X = NOT A OR (NOT B AND NOT C). D is not needed because it does not affect the output.", { w: "kmap", o: { vars: 4 }, t: "Karnaugh map with 4 inputs" })
]);

/* ===================== Topic 16 ===================== */
A2EX.paper("a2_t16_exam", 16, "Topic 16: System software", "Scheduling, memory management, translation, RPN", [
  q("Q1", "easy", SRC + "16 Q3 (terms)", "Operating system terms",
    "State the term described in each case. (a) A fixed time slice allotted to a process. (b) The system that gives the illusion that there is unlimited memory. (c) The algorithm that decides which ready process gets the CPU next. (d) Restoring a process's saved state when it takes control of the CPU again. (e) Physical and logical memory split into fixed-size blocks. (f) Logical memory split into variable-size blocks. (g) A process continually being denied the resources it needs. [7]",
    [ k("(a) quantum / time slice", 1, [["quantum", "time slice", "timeslice", "time-slice"]]), k("(b) virtual memory", 1, [["virtual memory", "virtual"]]), k("(c) scheduler / scheduling algorithm", 1, [["schedul"]]), k("(d) context switch", 1, [["context"]]),
      k("(e) paging", 1, [["paging", "pages"]]), k("(f) segmentation", 1, [["segment"]]), k("(g) starvation", 1, [["starv"]]) ],
    "(a) time slice (quantum); (b) virtual memory; (c) the scheduler (scheduling algorithm); (d) context switch; (e) paging; (f) segmentation; (g) starvation.",
    "(a) quantum (b) virtual memory (c) scheduler (d) context switch (e) paging (f) segmentation (g) starvation", { w: "match", o: { set: "os" }, t: "Match the operating system term" }),
  q("Q2", "intermediate", SRC + "16F (Q1)", "Stages of compilation",
    "Name, in order, the four stages of compilation and describe what happens at each stage. [8]",
    [ k("Lexical analysis", 1, [["lexical", "lexer", "tokenis", "tokeniz"]]), k("Lexical analysis: comments and white space removed; keywords, identifiers and symbols turned into tokens; symbol table built", 1, [["token", "symbol table", "remove", "comment", "white space", "whitespace", "keyword"]]),
      k("Syntax analysis", 1, [["syntax analysis", "parsing", "parser", "syntax check"]]), k("Syntax analysis: the tokens are checked against the grammar (rules) of the language; syntax errors reported; a parse tree is built", 1, [["grammar", "rules", "syntax error", "parse tree", "correct order", "structure", "valid"]]),
      k("Code generation", 1, [["code generation", "generat"]]), k("Code generation: object code / machine code produced", 1, [["object code", "machine code", "executable", "object program", "binary"]]),
      k("Optimisation", 1, [["optimis", "optimiz"]]), k("Optimisation: the object code is made smaller / faster / more efficient (e.g. unnecessary code removed)", 1, [["faster", "efficient", "smaller", "remove", "redundant", "unnecessary", "less memory", "improve", "shorter"]]) ],
    "1 Lexical analysis: removes comments and white space, turns keywords, identifiers and symbols into tokens and builds the symbol table. 2 Syntax analysis: checks the tokens against the grammar rules of the language, reports syntax errors and builds a parse tree. 3 Code generation: produces the object (machine) code. 4 Optimisation: makes the object code more efficient, smaller or faster.",
    "Lexical analysis removes comments and white space and turns the code into tokens and builds a symbol table. Syntax analysis checks the tokens against the grammar rules and reports syntax errors. Code generation produces the object code. Optimisation makes the code faster and smaller.", { w: "compile", o: {}, t: "Follow a line of code through the compiler" }),
  q("Q3", "hard", SRC + "16F (Q3)", "Reverse Polish Notation",
    "(a) Convert to Reverse Polish Notation: (i) A + B + C * D (ii) (A + B + C) * D (iii) (A + B) * D + (A - B) * C [3]\n(b) Evaluate each RPN expression using a stack with A = 7, B = 3, C = 5 and D = 2. Give the three results. [3]",
    [ k("(a)(i) A B + C D * +", 1, [["re:a\\s*b\\s*\\+\\s*c\\s*d\\s*\\*\\s*\\+"]]), k("(a)(ii) A B + C + D *", 1, [["re:a\\s*b\\s*\\+\\s*c\\s*\\+\\s*d\\s*\\*"]]), k("(a)(iii) A B + D * A B - C * +", 1, [["re:a\\s*b\\s*\\+\\s*d\\s*\\*\\s*a\\s*b\\s*[-−–]\\s*c\\s*\\*\\s*\\+"]]),
      n("(b)(i) 7 + 3 + 5 × 2 = 20", 1, ["20"]), n("(b)(ii) (7 + 3 + 5) × 2 = 30", 1, ["30"]), n("(b)(iii) (7 + 3) × 2 + (7 − 3) × 5 = 40", 1, ["40"]) ],
    "(a)(i) A B + C D * +   (ii) A B + C + D *   (iii) A B + D * A B - C * +\n(b) (i) 7 + 3 = 10; 5 × 2 = 10; 10 + 10 = 20.  (ii) 7 + 3 = 10; 10 + 5 = 15; 15 × 2 = 30.  (iii) 10 × 2 = 20; 7 − 3 = 4; 4 × 5 = 20; 20 + 20 = 40.",
    "(a) A B + C D * + ; A B + C + D * ; A B + D * A B - C * + (b) 20, 30, 40", { w: "rpneval", o: {}, t: "Evaluate RPN with a stack" }),
  q("Q4", "hard", SRC + "16E", "Backus-Naur form",
    "Write a BNF definition of an integer that can consist of any number of digits (0 to 9). [3]",
    [ k("<digit> ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9", 1, [["re:0\\s*\\|\\s*1\\s*\\|\\s*2\\s*\\|\\s*3\\s*\\|\\s*4\\s*\\|\\s*5\\s*\\|\\s*6\\s*\\|\\s*7\\s*\\|\\s*8\\s*\\|\\s*9"]]),
      k("<integer> ::= <digit> (a single digit is an integer)", 1, [["re:<\\s*integer\\s*>\\s*::=\\s*(<\\s*digit\\s*>\\s*\\||<\\s*digit\\s*>\\s*$|<\\s*integer\\s*>\\s*<\\s*digit\\s*>\\s*\\|\\s*<\\s*digit\\s*>)", "re:::=\\s*<\\s*digit\\s*>"]]),
      k("recursion: <integer> ::= <integer><digit> (or <digit><integer>)", 1, [["re:<\\s*integer\\s*>\\s*<\\s*digit\\s*>", "re:<\\s*digit\\s*>\\s*<\\s*integer\\s*>"]]) ],
    "<digit> ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9\n<integer> ::= <digit> | <integer><digit>\nThe rule refers to itself (recursion), so an integer can have any number of digits.",
    "<digit> ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9\n<integer> ::= <digit> | <integer><digit>", { w: "bnfderive", o: {}, t: "Build a string from the rules, watch the parse tree" }),
  q("Q5", "intermediate", SRC + "16A", "Virtual memory and page replacement",
    "(a) Which page replacement algorithm can suffer from Belady's anomaly? [1] (b) When does a page fault occur? [1] (c) Which page does the optimal algorithm replace? [1] (d) State one cause of disk thrashing. [1] (e) What is swap space on a hard disk used for? [1]",
    [ k("(a) FIFO", 1, [["fifo", "first in first out", "first-in first-out"]]), k("(b) when a requested page is not in main memory", 1, [["not in", "not yet in", "isn't in", "not present", "missing from", "not loaded", "not currently in"], ["memory", "ram", "frame"]]),
      k("(c) the page that will not be used for the longest time in the future", 1, [["future", "longest time"], ["not", "will"]]), k("(d) too many processes / programs running; too little RAM; excessive paging", 1, [["too many", "excessive", "lots of", "many process", "not enough ram", "too little ram", "small ram", "constantly swapping", "frequent"]]),
      k("(e) storing pages / process data moved out of RAM (virtual memory)", 1, [["page", "process", "data", "virtual", "ram", "memory"]]) ],
    "(a) FIFO. (b) When a page that is needed is not currently in main memory. (c) The page that will not be used for the longest time in the future. (d) Too many processes running at once for the amount of RAM, so pages are swapped in and out all the time. (e) It holds pages or process data that have been moved out of RAM (the virtual memory).",
    "(a) FIFO (b) when the requested page is not in memory (c) the page that will not be used for the longest time in the future (d) too many processes running (e) it stores pages moved out of RAM", { w: "paging", o: {}, t: "Page replacement" })
]);

/* ===================== Topic 17 ===================== */
A2EX.paper("a2_t17_exam", 17, "Topic 17: Security", "Encryption, SSL/TLS, digital signatures and certificates", [
  q("Q1", "intermediate", SRC + "17 Q3(a)", "SSL handshake",
    "A user types a URL into their browser. Describe how an SSL digital certificate is used to set up a secure connection between the browser and the website. [6]",
    [ any("Any six of: the browser requests a secure (https) page; the server sends its digital certificate containing its public key; the certificate is signed by a certificate authority (CA); the browser checks the certificate / digital signature using the CA's public key; once trusted, the browser uses the public key to agree / encrypt a session key; the server decrypts the session key with its private key and acknowledges; all further data is encrypted with the session key", 6,
        [["request", "https", "secure page", "connect"], ["send", "sends", "sent"], ["authority", "ca "], ["check", "verify", "validate", "authenticat"], ["session key", "temporary key", "symmetric key"], ["private key"], ["encrypted", "encrypt all", "encrypts all", "all data", "all traffic", "secure connection"]]) ],
    "1 The browser requests a secure page (https). 2 The web server sends its SSL digital certificate containing its public key and the CA's digital signature. 3 The browser checks the certificate and signature using the trusted CA's public key. 4 Once trusted, the browser uses the public key to encrypt a temporary session key. 5 The server decrypts the session key with its private key and sends an acknowledgement. 6 Browser and server then encrypt all traffic with the session key.",
    "The browser requests a secure https page. The server sends the SSL digital certificate containing its public key. The browser checks the digital signature of the certificate authority. The browser uses the public key to encrypt a session key which the server decrypts with its private key and acknowledges. All data is then encrypted using the session key.", { w: "order", o: { set: "tls" }, t: "Put the SSL/TLS handshake in order" }),
  q("Q2", "intermediate", SRC + "17 Q3(b)", "Digital signature",
    "Explain how a digital signature is formed and then checked. [3]",
    [ k("The message is put through a hash function to produce a digest", 1, [["hash", "digest"]]), k("The digest is encrypted with the sender's private key to give the digital signature", 1, [["private key"], ["encrypt"]]),
      k("The receiver decrypts the signature with the sender's public key and compares the digest with one they calculate; if they match the message is genuine and unaltered", 1, [["public key"], ["compare", "match", "same", "equal", "identical"]]) ],
    "A hash function turns the message into a digest. The digest is encrypted with the sender's private key to form the digital signature. The receiver decrypts it with the sender's public key and also hashes the received message; if the two digests match, the sender is authenticated and the message has not been changed.",
    "The message is hashed to make a digest. The digest is encrypted with the sender's private key to make the signature. The receiver decrypts it with the public key and compares the digest with one they work out themselves. If they match the message is genuine.", { w: "digsig", o: {}, t: "Create and check a digital signature" }),
  q("Q3", "intermediate", SRC + "17 notes", "Symmetric and asymmetric encryption",
    "Describe two differences between symmetric and asymmetric encryption. [4]",
    [ any("Any four marking points: symmetric uses the same key to encrypt and decrypt; asymmetric uses a public key and a different private key; the symmetric key must be kept secret and shared securely (key distribution problem); the public key can be shared openly, only the private key is secret; symmetric is faster; asymmetric is slower / used to exchange the session key", 4,
        [["same key", "one key", "single key", "shared key", "identical key"], ["different key", "two key", "pair", "public key", "private key"], ["secret", "key distribution", "sharing the key", "share the key", "intercept"], ["public key can be", "known to everyone", "freely", "openly", "published", "anyone"], ["faster", "quicker", "less processing"], ["slower", "more processing", "computationally"]]) ],
    "Symmetric: one shared secret key encrypts and decrypts, so the key must be exchanged securely (key distribution problem), but it is fast. Asymmetric: a public key (known to everyone) encrypts and a different private key (kept secret) decrypts, so no secret key has to be shared, but it is slower.",
    "Symmetric encryption uses the same key to encrypt and decrypt, so the key has to be kept secret and shared securely. Asymmetric uses a public key to encrypt and a different private key to decrypt. Symmetric is faster than asymmetric.", { w: "enc", o: { kind: "private" }, t: "Send a private message with asymmetric encryption" }),
  q("Q4", "hard", SRC + "17 notes", "Digital certificates",
    "State what a digital certificate contains and explain why a browser can trust it. [3]",
    [ any("Contents (max 2): the owner's / website's name or identity; the owner's public key; the issuer (CA) name; expiry date; the CA's digital signature", 2, [["owner", "name", "identity", "website", "domain"], ["public key"], ["issuer", "issued by", "authority"], ["expir", "valid until", "date"], ["signature", "signed"]]),
      k("Trust: it is signed by a certificate authority the browser already trusts, and the browser can check the signature with the CA's public key", 1, [["authority", "ca"], ["trust", "checks", "verif", "signature", "signed"]]) ],
    "A digital certificate holds the owner's identity, the owner's public key, the name of the issuing certificate authority, an expiry date and the CA's digital signature. The browser already holds the public keys of the CAs it trusts, so it can check the signature; if it is valid, the name matches and the certificate is in date, the public key can be trusted.",
    "A digital certificate contains the owner's name and public key, the issuer and the expiry date and the CA's digital signature. The browser trusts it because it is signed by a certificate authority it trusts and it can check the signature.", { w: "certs", o: {}, t: "Can the browser trust this certificate?" })
]);

/* ===================== Topic 18 ===================== */
A2EX.paper("a2_t18_exam", 18, "Topic 18: Artificial intelligence", "Search algorithms, machine learning and neural networks", [
  q("Q1", "intermediate", SRC + "18 Q2(a)", "Types of machine learning",
    "Describe three features you would associate with (a) reinforcement learning and (b) supervised learning. [6]",
    [ any("(a) Any three: learns by trial and error; receives rewards for good actions and punishments for bad ones; no labelled data needed; aims to maximise the total reward; improves with experience, e.g. game-playing or robots", 3, [["trial and error", "trial-and-error", "by experience", "experience"], ["reward", "punish", "penalt"], ["no label", "not need label", "does not need label", "unlabelled", "not labelled", "without label", "no training data", "no data"], ["maximis", "maximiz", "best outcome", "goal"], ["game", "robot", "self-driving", "navigat"]]),
      any("(b) Any three: uses labelled training data; the correct output is known for each input; the model learns the relationship between input and output; the output is compared with the expected output and errors corrected; used for classification or prediction", 3, [["labelled", "labeled", "label"], ["correct output", "known output", "expected output", "known answer", "right answer"], ["relationship", "mapping", "learns to predict", "predict", "pattern"], ["compare", "error", "adjust", "weights", "correct"], ["classif", "regression", "predict"]]) ],
    "(a) Reinforcement learning: the system learns by trial and error; good actions are rewarded and bad ones punished; no labelled data; it tries to maximise its total reward (e.g. a game-playing program).\n(b) Supervised learning: trained with labelled data in which the correct output is known; the output is compared with the expected output and the errors are used to adjust the model; used for classification and prediction.",
    "(a) Reinforcement learning is trial and error. It uses rewards and punishments and does not need labelled data. (b) Supervised learning uses labelled training data where the correct output is known. The output is compared with the expected output and errors are corrected. It is used for classification.", { w: "mlkinds", o: {}, t: "Supervised, unsupervised and reinforcement learning" }),
  q("Q2", "intermediate", SRC + "18 Q2(b)", "Why these are AI",
    "Explain why each of these applications is regarded as artificial intelligence: (a) chat bots; (b) search engines; (c) photographic enhancement applications. [6]",
    [ any("(a) Chat bots, 2 marks: understand / interpret natural language typed or spoken; learn from conversations; produce suitable replies as a human would", 2, [["natural language", "understand", "interpret", "language"], ["learn", "improve", "trained"], ["reply", "respond", "answer", "conversation", "human"]]),
      any("(b) Search engines, 2 marks: rank results by relevance using learned patterns; learn from users' clicks / past searches; understand the meaning of the search", 2, [["rank", "relevan", "best result", "order"], ["learn", "past search", "clicks", "personalis", "history", "improve"], ["meaning", "understand", "intent", "context"]]),
      any("(c) Photo enhancement, 2 marks: recognises objects / faces / scenes; decides which changes to make; trained on many images (neural network)", 2, [["recogni", "identif", "detect", "faces", "scene", "object"], ["decide", "automatic", "adjust", "improve", "correct"], ["trained", "learn", "neural", "many images", "examples"]]) ],
    "(a) Chat bots interpret natural language and learn from conversations to give suitable replies, as a human would. (b) Search engines rank results by relevance and learn from what users search for and click. (c) Photo enhancement apps recognise what is in the image (faces, objects) and decide automatically how to improve it, having been trained on many images.",
    "(a) A chat bot understands natural language and learns to give suitable replies. (b) A search engine ranks results by relevance and learns from past searches. (c) Photo enhancement recognises faces and objects and decides automatically what to adjust after being trained on many images.", { w: "aiml", o: {}, t: "AI, machine learning and deep learning" }),
  q("Q3", "hard", SRC + "18 Q4(a)", "A* and Dijkstra",
    "Explain the difference between the A* algorithm and Dijkstra's algorithm. [2]",
    [ k("Dijkstra uses only the cost (distance) from the start node", 1, [["dijkstra"], ["cost", "distance", "from the start", "g "]], 2),
      k("A* adds a heuristic (an estimate of the distance to the goal) so it explores fewer nodes / reaches the goal faster", 1, [["heuristic", "estimate", "h value", "h-value", "guess", "informed"], ["fewer", "faster", "goal", "target", "direction", "quicker", "efficient"]], 2) ],
    "Dijkstra's algorithm always expands the unvisited node with the lowest cost so far from the start, so it searches in all directions. A* uses cost so far plus a heuristic estimate of the remaining distance to the goal (f = g + h), so it is guided towards the goal and usually explores fewer nodes.",
    "Dijkstra's algorithm uses only the cost from the start node. A* also uses a heuristic estimate of the distance to the goal so it explores fewer nodes and finds the goal faster.", { w: "graph", o: { algo: "astar" }, t: "The A* algorithm step by step" }),
  q("Q4", "hard", SRC + "18C", "Back propagation and reward",
    "(a) Describe how back propagation of errors is used to train a neural network. [3]\n(b) Explain what is meant by reward and punishment in machine learning and give an example. [2]",
    [ any("(a) Any three: the output is compared with the expected output; the error is calculated; the error is passed back through the network from the output layer; the weights are adjusted to reduce the error; repeated until the error is minimised / small enough", 3, [["compare", "expected output", "actual output"], ["error", "difference"], ["back", "backwards", "output layer", "reverse"], ["weight", "adjust", "update"], ["repeat", "until", "minimis", "minimiz", "small", "reduce"]]),
      k("(b) Reward: positive feedback for a good action; punishment: negative feedback (penalty) for a bad action; so the system learns which actions to repeat", 1, [["reward"], ["punish", "penalt", "negative"]]),
      k("(b) A suitable example, e.g. a robot / game program / self-driving car receiving points for reaching the goal and losing points for a collision", 1, [["robot", "game", "car", "chess", "agent", "navigat", "points", "score", "maze", "vehicle"]]) ],
    "(a) The network's actual output is compared with the expected output and the error is calculated. The error is passed backwards from the output layer, and the weights are adjusted to reduce it. This is repeated until the errors are minimised.\n(b) A reward is positive feedback for a good action and a punishment is a penalty for a bad one, so the agent learns which actions to repeat; e.g. a robot in a maze gains a point for reaching the exit and loses points for hitting a wall.",
    "(a) The output is compared with the expected output to find the error. The error is passed back through the network and the weights are adjusted. This is repeated until the error is small. (b) A reward is given for a good action and a punishment for a bad action. For example a robot in a maze gets a point for reaching the exit and loses points for hitting a wall.", { w: "nn", o: {}, t: "Back propagation: watch the error shrink" })
]);

/* ===================== Topic 19 ===================== */
A2EX.paper("a2_t19_exam", 19, "Topic 19: Computational thinking and problem solving", "Searching, stacks, queues, trees, recursion and Big O", [
  q("Q1", "intermediate", SRC + "19Q (Q3)", "Comparing linear and binary search",
    "Compare the performance of a linear search and a binary search using Big O notation. [3]",
    [ k("Linear search is O(n)", 1, [["re:o\\s*\\(\\s*n\\s*\\)", "linear time"]]), k("Binary search is O(log n)", 1, [["re:o\\s*\\(\\s*log\\s*n\\s*\\)", "re:o\\s*\\(\\s*log\\s*2\\s*n\\s*\\)", "logarithmic"]]),
      k("Binary search is faster for large amounts of data, but the data must be sorted first", 1, [["faster", "quicker", "fewer", "efficient", "better"], ["sorted", "order", "ordered"]]) ],
    "Linear search is O(n): in the worst case every item is checked, so the time grows in proportion to the number of items. Binary search is O(log n): the list is halved at each step, so it is much faster for large lists, but the data must already be sorted.",
    "Linear search is O(n) and binary search is O(log n). Binary search is faster for large lists but the data must be sorted.", { w: "bigo", o: {}, t: "How fast do the algorithms grow?" }),
  q("Q2", "intermediate", SRC + "19T", "Recursion",
    "(a) Explain what is meant by recursion and give one benefit of using it. [2]\n(b) Explain why a compiler needs to produce object code that uses the stack for a recursive procedure. [3]",
    [ k("(a) A subroutine that calls itself", 1, [["calls itself", "call itself", "calling itself", "defined in terms of itself", "refers to itself"]]),
      k("(a) Benefit: shorter / simpler code, or suits problems that repeat on smaller versions (trees, factorial)", 1, [["shorter", "simpler", "less code", "fewer lines", "easier", "elegant", "clear", "tree", "smaller version", "divide"]]),
      any("(b) Any three: each call needs its own return address and local variables / parameters; these are stored in a stack frame pushed on the stack; frames are popped when the call finishes so execution returns to the correct place; the calls complete in reverse order (last in first out)", 3, [["return address"], ["local variable", "parameter", "values"], ["stack frame", "frame", "pushed", "push"], ["pop", "popped", "removed", "returns", "return to"], ["last in first out", "lifo", "reverse order", "last called"]]) ],
    "(a) A recursive subroutine calls itself, with a base case to stop. It gives shorter, clearer code for problems that break down into smaller copies of themselves.\n(b) Every call needs its own return address, parameters and local variables. They are stored in a stack frame that is pushed onto the stack when the subroutine is called and popped when it finishes, so the calls are completed in reverse order (last in first out) and execution returns to the right place.",
    "(a) Recursion is when a subroutine calls itself. It makes the code shorter. (b) Each call needs its return address and local variables which are stored in a stack frame pushed on the stack. When the call finishes the frame is popped so it returns to the correct place in last in first out order.", { w: "recur", o: {}, t: "Watch the call stack of a recursive function" }),
  q("Q3", "intermediate", SRC + "19E", "Stacks",
    "A stack has space for 10 integers. (a) State what happens when 7 and then 32 are pushed and then two items are popped. [2] (b) State what happens if a third item is popped from the now empty stack. [1] (c) State what happens when an 11th item is pushed onto a full stack. [1]",
    [ k("(a) Items come off in the reverse order: 32 first, then 7 (last in first out)", 1, [["32"], ["7"], ["reverse", "last in", "lifo", "32 first", "32 then 7"]], 3),
      k("(a) The stack is empty again / the stack pointer is back at the start", 1, [["empty", "nothing left", "back to the start", "pointer"]]),
      k("(b) Stack underflow: an error, nothing to pop", 1, [["underflow", "empty", "error", "nothing", "cannot"]]), k("(c) Stack overflow: the item cannot be added; error", 1, [["overflow", "full", "error", "cannot", "not added"]]) ],
    "(a) 32 is popped first and then 7 (LIFO); the stack is empty afterwards. (b) Popping an empty stack is stack underflow: an error message should be given. (c) Pushing onto a full stack is stack overflow: the item cannot be added.",
    "(a) 32 is popped first then 7, last in first out. The stack is empty again. (b) stack underflow, error. (c) stack overflow, it cannot be added.", { w: "stack", o: {}, t: "Push and pop" }),
  q("Q4", "hard", SRC + "19J", "Binary tree for an expression",
    "Describe the binary tree for the expression (x − y) / (x * y + z): which operator is at the root, and what are its left and right sub-trees? [3]",
    [ k("The root is the division operator /", 1, [["root"], ["/", "divide", "division", "÷"]]), k("The left subtree is the subtraction x − y (− with children x and y)", 1, [["left"], ["-", "−", "minus", "subtract"]]),
      k("The right subtree is + with left child * (x and y) and right child z", 1, [["right"], ["+", "plus", "add"], ["*", "×", "multiply", "times"], ["z"]]) ],
    "Root: /. Left subtree: − with children x and y. Right subtree: + whose left child is * (children x and y) and whose right child is z. An in-order walk gives the expression back; a post-order walk gives the Reverse Polish form x y − x y * z + /.",
    "The root is /. The left subtree is - with x and y as children. The right subtree is + with left child * (x and y) and right child z.", { w: "btree", o: {}, t: "Build a binary tree and walk through it" }),
  q("Q5", "hard", SRC + "19H", "Adding to a linked list",
    "Describe how a new item is inserted between two existing nodes of a linked list. [3]",
    [ k("The new item is stored in a free node / the next free position", 1, [["free", "new node", "empty", "next available", "free list", "unused"]]), k("The new node's pointer is set to point to the node that follows it", 1, [["new", "its"], ["pointer"], ["next", "following", "after", "points to"]], 3),
      k("The pointer of the previous node is changed to point to the new node", 1, [["previous", "preceding", "before", "earlier"], ["pointer"], ["new node", "new item", "new"]], 3) ],
    "Store the new item in the next free node. Set the new node's pointer to the node that should come after it. Change the pointer of the node before it so that it points to the new node. No other items need to be moved.",
    "Store the item in a free node. Set the new node's pointer to point to the next node. Change the previous node's pointer to point to the new node.", { w: "llist", o: {}, t: "A linked list held in arrays" })
]);

/* ===================== Topic 20 ===================== */
A2EX.paper("a2_t20_exam", 20, "Topic 20: Further programming", "OOP, declarative programming, file handling and exceptions", [
  q("Q1", "intermediate", SRC + "20C-20G", "Object-oriented programming",
    "Describe each term: (a) class; (b) object; (c) encapsulation; (d) inheritance; (e) polymorphism. [5]",
    [ k("(a) A class is a blueprint / template that defines the attributes and methods", 1, [["blueprint", "template", "definition", "defines"], ["attribute", "propert", "method", "data"]], 1),
      k("(b) An object is an instance of a class", 1, [["instance"], ["class"]]), k("(c) Encapsulation: attributes and methods are put together in one class, with attributes private and methods public", 1, [["private", "hidden", "hide"], ["public", "method", "together", "bundle", "one unit", "single unit"]]),
      k("(d) Inheritance: a subclass takes on the attributes and methods of a base class (superclass)", 1, [["subclass", "derived", "child"], ["base class", "superclass", "parent", "inherit"]]), k("(e) Polymorphism: a method with the same name behaves differently in a subclass (redefined)", 1, [["same name"], ["different", "redefin", "override", "behave", "overrid"]]) ],
    "(a) A class is a blueprint that defines the attributes and methods of its objects. (b) An object is an instance of a class. (c) Encapsulation puts the attributes (private) and the methods that use them (public) together in a class. (d) Inheritance: a subclass has all the attributes and methods of its base class and may add more. (e) Polymorphism: a method with the same name is redefined in a subclass so it behaves differently.",
    "(a) A class is a blueprint that defines attributes and methods. (b) An object is an instance of a class. (c) Encapsulation puts private attributes and public methods together in one class. (d) Inheritance is when a subclass inherits the attributes and methods of the base class. (e) Polymorphism is when a method with the same name behaves differently in a subclass.", { w: "oop", o: { tab: "Inheritance" }, t: "Inheritance and polymorphism" }),
  q("Q2", "hard", SRC + "20I", "Declarative programming (Prolog)",
    "A knowledge base contains: speaks(england, english). speaks(japan, japanese). speaks(brazil, portuguese).\n(a) Write a query to find the language spoken in England. [1]\n(b) Write a query to find which country speaks Japanese. [1]\n(c) State what the answer to the query speaks(japan, X). is. [1]",
    [ k("(a) speaks(england, X).", 1, [["re:speaks\\s*\\(\\s*england\\s*,\\s*[A-Z]\\w*\\s*\\)"]]), k("(b) speaks(X, japanese).", 1, [["re:speaks\\s*\\(\\s*[A-Z]\\w*\\s*,\\s*japanese\\s*\\)"]]), k("(c) X = japanese", 1, [["re:x\\s*=\\s*japanese"]]) ],
    "(a) speaks(england, X).   (b) speaks(X, japanese).   (c) X = japanese. Variables start with a capital letter; constants (facts) start with a lower-case letter.",
    "(a) speaks(england, X). (b) speaks(X, japanese). (c) X = japanese", { w: "prolog", o: { kb: "countries" }, t: "Ask the Prolog knowledge base a question" }),
  q("Q3", "intermediate", SRC + "20K", "Imperative and object-oriented programming",
    "Compare imperative (procedural) programming with object-oriented programming. [4]",
    [ any("Any four: imperative programs are a sequence of explicit steps / procedures that act on data; in OOP the data and methods are combined in objects; OOP hides data (encapsulation); OOP reuses code with inheritance; OOP models real-world things; imperative code can be harder to reuse / change as the program grows; imperative suits small, simple programs", 4,
        [["sequence", "step by step", "steps", "procedure", "subroutine", "function"], ["objects", "combined", "together", "data and methods", "data and the methods"], ["encapsulation", "private", "hidden", "hide"], ["inherit", "reuse", "re-use"], ["real world", "real-world", "real life", "model"], ["harder", "difficult", "maintain", "larger program", "grows", "change"], ["small", "simple"]]) ],
    "Imperative: the program is a sequence of explicit steps grouped into procedures and functions that work on data held in variables; suits small or simple programs and is harder to maintain as it grows. OOP: data and the methods that use it are combined in objects, data can be hidden (encapsulation), code is reused through inheritance, and real-world things can be modelled.",
    "In imperative programming the program is a sequence of steps in procedures and functions that act on data. In OOP the data and methods are combined in objects. OOP uses encapsulation to hide data and inheritance to reuse code.", { w: "oop", o: { tab: "Class and objects" }, t: "Classes and objects" }),
  q("Q4", "intermediate", SRC + "20L-20O", "File handling and exceptions",
    "(a) State the difference between opening a text file for WRITE and for APPEND. [2]\n(b) State why EOF should be tested when reading a file. [1]\n(c) Explain the purpose of exception handling. [2]",
    [ k("(a) WRITE replaces / overwrites the existing contents of the file", 1, [["write"], ["overwrit", "replace", "delete", "erase", "new file", "lost", "removed", "cleared"]], 2),
      k("(a) APPEND adds new data to the end of the existing contents", 1, [["append"], ["end", "after", "add", "existing"]], 2),
      k("(b) To avoid reading past the end of the file (an error)", 1, [["past", "beyond", "after the end", "error", "crash", "no more", "nothing left", "end of the file", "end of file"]]),
      k("(c) Exception handling stops the program crashing when a run-time error occurs (e.g. file not found, invalid input)", 1, [["crash", "stop", "terminat", "prevent", "avoid"], ["error", "exception", "run-time", "runtime", "unexpected", "file not found", "invalid"]], 2),
      k("(c) The error is caught and the program responds sensibly / carries on", 1, [["catch", "caught", "handle", "deal", "message", "carry on", "continue", "sensible", "recover", "alternative", "except"]]) ],
    "(a) Opening for WRITE deletes (overwrites) any existing contents; opening for APPEND keeps the contents and adds new lines to the end.\n(b) Reading past the last line causes an error, so the end-of-file condition is tested before each read.\n(c) Exception handling catches run-time errors, such as a missing file or invalid input, so the program does not crash and can display a message or carry on in a controlled way.",
    "(a) WRITE overwrites the existing contents of the file but APPEND adds the new data to the end. (b) To avoid reading past the end of the file which causes an error. (c) Exception handling stops the program crashing when a run-time error happens. The error is caught and the program can carry on or display a message.", { w: "fileops", o: {}, t: "Open, write, append, read and close a text file" })
]);
A2EX.register();
})();
