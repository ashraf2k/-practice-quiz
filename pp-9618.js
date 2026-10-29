/* 12BR past-paper questions at the end of each A Level sub-topic (13.1 to 20.2): Cambridge International AS & A Level Computer Science 9618 Paper 3 (Advanced Theory),
   May/June 2025 (9618/32) and May/June 2026 (9618/31, 9618/33). Wording and mark-scheme text follow the published papers; questions that depend on a diagram,
   a truth table or a drawing are not used. Marks are suggested by keyword matching and the student ticks his own marks against the published scheme shown after
   the answer (self-marked). Uses the helpers in pp-0478.js and the paper layout in pp-ui.js. */
(function(){
  var P = window.PPD, Q = P.Q, kw = P.kw, val = P.val;
  var S25 = P.ctx("Cambridge International AS & A Level Computer Science 9618/32 · Paper 3 Advanced Theory · May/June 2025", "Cambridge International AS & A Level Computer Science 9618/32 Mark Scheme, May/June 2025 (Cambridge University Press & Assessment)");
  var J31 = P.ctx("Cambridge International AS & A Level Computer Science 9618/31 · Paper 3 Advanced Theory · May/June 2026", "Cambridge International AS & A Level Computer Science 9618/31 Mark Scheme, May/June 2026 (Cambridge University Press & Assessment)");
  var J33 = P.ctx("Cambridge International AS & A Level Computer Science 9618/33 · Paper 3 Advanced Theory · May/June 2026", "Cambridge International AS & A Level Computer Science 9618/33 Mark Scheme, May/June 2026 (Cambridge University Press & Assessment)");
  var AR = "\u2190";
  function ov(s){ return s.split("").map(function(c){ return c === " " ? c : c + "\u0305"; }).join(""); }   // overbar (NOT) over a Boolean term
  function re(s){ return "re:" + s; }

  // one set per sub-topic (e.g. "13.1"): key pp12_13_1, shown at the end of that sub-topic in the 12BR iLearn journey
  function paper(code, name, qs){
    var key = "pp12_" + code.replace(".", "_"), total = qs.reduce(function(a, q){ return a + q.marks; }, 0);
    EXAM_PAPERS[key] = { key: key, code: code, title: code + " " + name + " \u2014 Past-paper question", subtitle: "Cambridge 9618 Paper 3 past paper \u00B7 " + total + " marks \u00B7 mark your own answer with the published mark scheme",
      classes: ["12BR"], totalMarks: total, questions: qs };
    var e = EXAM_PAPER_CHOICES_BY_CLASS.filter(function(x){ return x.test.test("12BR"); })[0];
    var c = { key: key, label: code + " " + name + " \u2014 past-paper question" };
    if(e){ if(!e.choices.some(function(x){ return x.key === key; })) e.choices.push(c); }
    else EXAM_PAPER_CHOICES_BY_CLASS.push({ test: /^12br/i, choices: [c] });
  }

  /* ---------- 13.1 User-defined data types: 9618/32 May/June 2025 Q1 ---------- */
  var q131 = Q("A-S25-1", "1", "User-defined data types",
    "Data types can be defined using pseudocode.\nThe composite record data type, Departure, is used to represent flights from Cambridge Airport and is defined in pseudocode as:\n\nTYPE Departure\n   DECLARE FlightNumber : STRING\n   DECLARE Destination : STRING\n   DECLARE FlightDate : DATE\n   DECLARE Gate : STRING\n   DECLARE Airline : STRING\nENDTYPE\n\nA variable, Flight1, is declared in pseudocode as:\nDECLARE Flight1 : Departure",
    [ { id: "a", label: "(a)", text: "Write pseudocode to store the following details to Flight1:\n\nField            Data\nFlightNumber     SB2789\nDestination      Dublin\nFlightDate       30/07/2025\nGate             N03\nAirline          Cambridge Airways", marks: 3, lines: 6 },
      { id: "b1", label: "(b)(i)", text: "The data type for Gate is changed to an enumerated data type, GateID.\nWrite a pseudocode statement to declare GateID to hold the identity codes for the airport gates:\nN01, N02, N03, W01, W02, W03, W04", marks: 2, lines: 2 },
      { id: "b2", label: "(b)(ii)", text: "Write the new pseudocode statement required to replace the declaration of Gate in Departure.", marks: 1, lines: 1 } ],
    [ kw("(a) MP1 Use of correct Flight1 variable with the given field names (Flight1.FlightNumber, .Destination, .FlightDate, .Gate, .Airline)", 1, "a",
        [[re("flight1\\.flightnumber"), re("flight1\\.destination"), re("flight1\\.flightdate"), re("flight1\\.gate"), re("flight1\\.airline")]]),
      kw("(a) MP2 Correct assignment of the four string values: \"SB2789\", \"Dublin\", \"N03\", \"Cambridge Airways\" (in quotes)", 1, "a",
        [[re("[\"']SB2789[\"']")], [re("[\"']Dublin[\"']")], [re("[\"']N03[\"']")], [re("[\"']Cambridge Airways[\"']")]]),
      kw("(a) MP3 Correct assignment of the date value 30/07/2025", 1, "a", [[re("flight1\\.flightdate\\s*(" + AR + "|<-|<\\u2212|=)\\s*30/07/2025")]]),
      kw("(b)(i) MP1 TYPE GateID =", 1, "b1", [[re("type\\s+gateid\\s*=")]]),
      kw("(b)(i) MP2 (N01, N02, N03, W01, W02, W03, W04)", 1, "b1", [[re("\\(\\s*N01\\s*,\\s*N02\\s*,\\s*N03\\s*,\\s*W01\\s*,\\s*W02\\s*,\\s*W03\\s*,\\s*W04\\s*\\)")]]),
      kw("(b)(ii) DECLARE Gate : GateID", 1, "b2", [[re("declare\\s+gate\\s*:\\s*gateid")]]) ],
    [ { q: "1(a)", lead: "One mark for each mark point", ans: ["MP1  Use of correct Flight1 variable with given field names", "MP2  Correct assignments of four string data values", "MP3  Correct assignment of date data value", "Example answer:", "Flight1.FlightNumber " + AR + " \"SB2789\"", "Flight1.Destination " + AR + " \"Dublin\"", "Flight1.FlightDate " + AR + " 30/07/2025", "Flight1.Gate " + AR + " \"N03\"", "Flight1.Airline " + AR + " \"Cambridge Airways\""], marks: "3", guide: [] },
      { q: "1(b)(i)", lead: "One mark per mark point", ans: ["MP1  TYPE GateID =", "MP2  (N01, N02, N03, W01, W02, W03, W04)", "Example answer:", "TYPE GateID = (N01, N02, N03, W01, W02, W03, W04)"], marks: "2", guide: [] },
      { q: "1(b)(ii)", ans: ["DECLARE Gate : GateID"], marks: "1", guide: [] } ],
    "(a) Each field of a record is reached with the record variable, a dot and the field name; strings go in quotes. (b) An enumerated type lists its allowed values: TYPE GateID = (N01, …). The field in the record is then declared with that type: DECLARE Gate : GateID.", S25);

  /* ---------- 13.2 File organisation and access: 9618/33 May/June 2026 Q3 ---------- */
  var q132 = Q("A-J33-3", "3", "File organisation and access",
    "Serial file organisation is one method of storing records in a file.",
    [ { id: "a", label: "(a)", text: "State one example of where serial file organisation could be used.", marks: 1, lines: 2 },
      { id: "b", label: "(b)", text: "Describe how records are organised in serial files.", marks: 2, lines: 4 },
      { id: "c", label: "(c)", text: "Outline the process that is used to find a record in a serial file.", marks: 3, lines: 5 } ],
    [ kw("(a) An appropriate use: batch processing tasks / creating a transaction file for a batch / storing bills or payroll / backup / data added chronologically", 1, "a", [["batch", "transaction file", "bill", "payroll", "backup", "back up", "chronolog", "log", "history"]]),
      kw("(b) Two from: records stored one after the other; … in chronological order; new records appended / added at the end of the file", 2, "b",
        [["one after the other", "one after another", "in sequence", "sequential", "stored in a file one"], ["chronolog", "order they were added", "order they were entered", "time order", "date order"], ["end of the file", "added at the end", "appended", "end of file", "added to the end"]], true),
      kw("(c) MP1 sequential access; MP2 each record checked one after the other; MP3 until the end of the file is reached; MP4 until the record is found", 3, "c",
        [["sequential", "serial"], ["one after the other", "one by one", "each record", "in turn", "every record", "starting from the first", "from the beginning", "from the start"], ["end of the file", "end of file", "eof", "reached the end", "last record"], ["until the record is found", "record is found", "found", "match", "matches"]], true) ],
    [ { q: "3(a)", lead: "One mark for an appropriate use of serial file organisation (Max 1)", ans: ["Batch processing tasks", "Creating a transaction file for a batch", "Storing bills/payroll", "Backup", "Appropriate example where data is added chronologically"], marks: "1", guide: [] },
      { q: "3(b)", lead: "One mark per mark point (Max 2)", ans: ["MP1  Records are stored in a file one after the other", "MP2  … in chronological order", "MP3  New records are appended/added at the end of the file"], marks: "2", guide: [] },
      { q: "3(c)", lead: "One mark per mark point (Max 3)", ans: ["MP1  Sequential file access is used", "MP2  Each record in the file is searched / checked, one after the other,", "MP3  … until the end of the file is reached", "MP4  … until the record is found."], marks: "3", guide: [] } ],
    "A serial file keeps records in the order they were added, with new records appended at the end. To find one you start at the first record and check each in turn until you find it or reach the end of the file.", J33);

  /* ---------- 13.3 Floating-point numbers: 9618/32 May/June 2025 Q2 ---------- */
  var q133 = Q("A-S25-2", "2", "Floating-point representation",
    "Numbers are stored in a computer using binary floating-point representation with:\n\u2022 12 bits for the mantissa\n\u2022 4 bits for the exponent\n\u2022 two\u2019s complement form for both the mantissa and the exponent.",
    [ { id: "a", label: "(a)", text: "Calculate the normalised binary floating-point representation of +124.4375 in this system.\nShow your working.\n\n            Mantissa                Exponent\n   (write the 12 mantissa bits, a space, then the 4 exponent bits)", marks: 3, lines: 1, work: 5 },
      { id: "b", label: "(b)", text: "Calculate the denary value of the following normalised binary floating-point number.\nShow your working.\n\n            Mantissa                Exponent\n   1 0 1 0 0 0 1 0 1 0 1 1   0 1 1 0\n\nDenary value", marks: 3, lines: 1, work: 5 } ],
    [ kw("(a) Working 1: number converted to binary (0)1111100.0111", 1, "a+", [[re("1111100\\s*\\.\\s*0111")]]),
      kw("(a) Working 2: use of exponent = 7 / binary point moved the correct number (7) of places", 1, "a+", [["7", "0111", "seven"]]),
      kw("(a) Answer: mantissa 011111000111, exponent 0111", 1, "a", [[re("0\\s*1\\s*1\\s*1\\s*1\\s*1\\s*0\\s*0\\s*0\\s*1\\s*1\\s*1\\D{0,3}0\\s*1\\s*1\\s*1")]]),
      kw("(b) Working 1: correct use of exponent seen (6, 0110 so move the binary point 6 places right)", 1, "b+", [["6", "0110", "six"]]),
      kw("(b) Working 2: correct conversion from binary to denary (1010001.01011 \u2192 \u221264 + 16 + 1 + 0.25 + 0.0625 + 0.03125)", 1, "b+", [["1010001.01011", "-64", "\u221264", "1493", "2048", "two's complement", "twos complement"]]),
      kw("(b) Answer: \u221246.65625", 1, "b", [[re("46\\s*\\.\\s*65625"), re("1493\\s*/\\s*32"), re("46\\s*21\\s*/\\s*32")]]) ],
    [ { q: "2(a)", lead: "Two marks for working", ans: ["number converted to binary (0)1111100.0111", "use of exponent = 7 // Moving binary point the correct number (7) of places"], marks: "3", guide: ["One mark for correct answer:", "Mantissa  0 1 1 1 1 1 0 0 0 1 1 1     Exponent  0 1 1 1"] },
      { q: "2(b)", lead: "Two marks for working", ans: ["correct use of exponent seen", "correct conversion method from binary to denary", "Working: 1010001.01011 // moving bp 6 places to right", "Evaluation of two\u2019s complement \u221264 + 16 + 1 + 0.25 + 0.0625 + 0.03125 // \u221264 + 16 + 1 + 1/4 + 1/16 + 1/32 // Converting two\u2019s complement back and evaluating positive binary number 32 + 8 + 4 + 2 + 0.5 + 0.125 + 0.03125", "Fractions methods \u2013 award both working marks for either (\u22122048 + 512 + 32 + 8 + 2 + 1) / 2048 \u00D7 2\u2076 = \u22121493 / 32", "One mark for correct answer: \u221246.65625"], marks: "3", guide: [] } ],
    "(a) 124.4375 = 1111100.0111. The mantissa is 0.1111100 0111 (binary point after the sign bit) so the point moved 7 places: exponent 0111. (b) The exponent 0110 = 6, so 1.010001010110 becomes 1010001.01011 with the point moved 6 places; as two\u2019s complement that is \u221264 + 16 + 1 + 0.25 + 0.0625 + 0.03125 = \u221246.65625.", S25);

  /* ---------- 14.1 Protocols: 9618/32 May/June 2025 Q3 ---------- */
  var q141 = Q("A-S25-3", "3", "Protocols and the TCP/IP suite",
    "",
    [ { id: "a", label: "(a)", text: "Identify two different layers of the TCP/IP protocol suite.", marks: 1, lines: 2 },
      { id: "b", label: "(b)", text: "Describe how the TCP/IP protocol suite is applied when a message is sent through the internet from one host to another. Do not describe the function of individual layers of the TCP/IP protocol suite.", marks: 4, lines: 7 } ],
    [ { text: "(a) Two different layers from: Application, Transport, Internet, Link", marks: 1, part: "a", match: { type: "keywords", groups: [["application"], ["transport"], ["internet"], ["link"]], needCount: 2 } },
      kw("(b) MP1 layers within a stack; MP2 each layer only accepts input from the adjacent layer (next higher / lower); MP3 the user / sender interfaces with the top (application) layer; MP4 message passes from the top layer down to the bottom (link) layer when sent; MP5 passes from the bottom layer up to the top layer when received; MP6 the link layer interfaces directly with the network", 4, "b",
        [["stack", "layers", "layered"], ["adjacent", "next layer", "next higher", "next lower", "layer above", "layer below", "only accept input"], ["top layer", "application layer to", "interfaces with the application", "user interacts"], ["top layer to the bottom", "application layer to the link", "down the layers", "down through the layers", "from the top to the bottom", "top to bottom"], ["bottom layer to the top", "link layer to the application", "up the layers", "up through the layers", "bottom to top", "bottom to the top"], ["link layer", "directly with the network", "interfaces directly"]], true) ],
    [ { q: "3(a)", lead: "Two from", ans: ["Application Layer", "Transport Layer", "Internet Layer", "Link Layer"], marks: "1", guide: [] },
      { q: "3(b)", lead: "One mark per mark point (Max 4)", ans: ["MP1  The TCP/IP suite can be viewed as layers within a stack", "MP2  Each layer can only accept input from the next higher or the next lower layer/adjacent layer", "MP3  The user/sender/computer interfaces with the top layer/application layer to send/receive a message", "MP4  The message when sent passes from the top layer/application layer to the bottom layer/link layer", "MP5  The message when received passes from bottom layer/link layer to the top layer/application layer", "MP6  The link layer interfaces directly with the network and sends/receives the message."], marks: "4", guide: [] } ],
    "The four layers are Application, Transport, Internet and Link. A message is passed down the stack from the application layer to the link layer on the sending host, travels over the network, and is passed up the stack on the receiving host. Each layer only talks to the layer next to it.", S25);

  /* ---------- 14.2 Circuit switching and packet switching: 9618/32 May/June 2025 Q4 ---------- */
  var q142 = Q("A-S25-4", "4", "Circuit switching",
    "Circuit switching may be used as a method of data transmission.",
    [ { id: "a", label: "", text: "State two benefits and two drawbacks of circuit switching.\n\nBenefit 1", marks: 1, lines: 2 },
      { id: "b", label: "", text: "Benefit 2", marks: 1, lines: 2 },
      { id: "c", label: "", text: "Drawback 1", marks: 1, lines: 2 },
      { id: "d", label: "", text: "Drawback 2", marks: 1, lines: 2 } ],
    [ kw("Benefit (Max 2 benefits): continuous transmission once connected / no time lost resending or rearranging packets / steady, high rate (whole bandwidth available) / data loss unlikely (same path)", 1, "a", [["continuous", "available until the end", "no time lost", "resend", "rearrang", "steady", "high rate", "whole of the bandwidth", "full bandwidth", "whole bandwidth", "loss unlikely", "same path", "no loss", "in order", "dedicated"]]),
      kw("Benefit 2: a different benefit from the list above", 1, "b", [["continuous", "available until the end", "no time lost", "resend", "rearrang", "steady", "high rate", "whole of the bandwidth", "full bandwidth", "whole bandwidth", "loss unlikely", "same path", "no loss", "in order", "dedicated"]]),
      kw("Drawback 1: delay setting up the connection / link cannot carry other data / wasted bandwidth when idle / no alternative route on a fault / reduced security (single path) / hard to scale", 1, "c", [["set up", "established", "before transmission", "cannot be used", "other data", "underutilised", "wasted", "wasteful", "not flexible", "no alternative", "fault", "failure", "single path", "security", "scal", "idle", "inefficient"]]),
      kw("Drawback 2: a different drawback from the list above", 1, "d", [["set up", "established", "before transmission", "cannot be used", "other data", "underutilised", "wasted", "wasteful", "not flexible", "no alternative", "fault", "failure", "single path", "security", "scal", "idle", "inefficient"]]) ],
    [ { q: "4", lead: "One mark for each benefit (Max 2)", ans: ["MP1  Suitable for long continuous transmission once the connection is made, it is available until the end of the transmission", "MP2  No time lost in resending/rearranging packets as no loss of packets or out of order packets", "MP3  Steady/high rate of transmission because the whole of the bandwidth is available", "MP4  Data loss unlikely as all data follows the same path"], marks: "2", guide: [] },
      { q: "", lead: "One mark for each drawback (Max 2)", ans: ["MP5  Delays due to dedicated connection required to be set up/established before transmission can begin", "MP6  The dedicated connection cannot be used to transmit any other data", "MP7  System resources may be underutilised/inefficient/not very flexible because the bandwidth can\u2019t be shared/high bandwidth is required // Bandwidth may be wasted // May send empty frames // the circuit is always there whether or not used", "MP8  There are no alternative routes if there is a failure or fault on the line", "MP9  Reduced security due to use of single path", "MP10  Scalability is difficult"], marks: "2", guide: [] } ],
    "Circuit switching sets up one dedicated path for the whole call. Benefits: steady, ordered, unbroken transmission. Drawbacks: set-up delay, bandwidth wasted when idle, and no alternative route if the line fails.", S25);

  /* ---------- 15.1 Processor architectures: 9618/33 May/June 2026 Q4 ---------- */
  var q151 = Q("A-J33-4", "4", "Parallel processing and SIMD / MISD",
    "",
    [ { id: "a", label: "(a)", text: "Describe the characteristics of massively parallel computers.", marks: 3, lines: 5 },
      { id: "b1", label: "(b)", text: "State one difference and one similarity between the SIMD and MISD computer architectures.\n\ndifference", marks: 1, lines: 3 },
      { id: "b2", label: "", text: "similarity", marks: 1, lines: 3 } ],
    [ kw("(a) Any three of: many processors / computers linked together; to form a more powerful 'single machine'; all processors work simultaneously on the same problem; each processor is responsible for its own part of the problem; communication via interconnected data pathways / networks or shared memory", 3, "a",
        [["many processors", "multiple processors", "thousands", "linking together", "linked together", "many computers", "large number", "lots of processors"], ["single machine", "more powerful", "one machine", "supercomputer"], ["simultaneous", "at the same time", "same problem", "in parallel"], ["own part", "each processor", "its own", "part of the problem", "divided", "split"], ["interconnect", "pathways", "network", "shared memory", "shared pool", "communicat"]], true),
      kw("(b) Difference: SIMD all execute the same instruction, MISD perform different instructions // SIMD works on many data streams, MISD all work on the same data // MISD more complex than SISD", 1, "b1", [["same instruction", "different instruction", "many data", "multiple data", "same data", "single data", "more complex", "different instructions"]]),
      kw("(b) Similarity: both parallel systems / both use multiple processors / both may be pipelined / neither suits sequential applications", 1, "b2", [["parallel", "multiple processors", "more than one processor", "many processors", "pipelin", "sequential", "both use"]]) ],
    [ { q: "4(a)", lead: "One mark per mark point (Max 3)", ans: ["MP1  Massively parallel computers involve the linking together of many processors / computers", "MP2  … to form a more powerful \u2018single machine\u2019", "MP3  All the processors work simultaneously on the same problem", "MP4  … with each processor being responsible for its own part of the problem", "MP5  … and communication being via interconnected data pathways/networks // … and communicate via shared pools of memory."], marks: "3", guide: ["Accept many/multiple/thousands/extremely large number for \u2018many\u2019.", "But not some/several."] },
      { q: "4(b)", lead: "One mark for a difference (Max 1)", ans: ["MP1  SIMD systems all execute the same instruction and MISD systems perform different instructions", "MP2  SIMD systems work on many data streams/elements simultaneously; MISD systems all work on the same data source/element", "MP3  MISD systems are more complex than SISD systems // allow the reverse", "One mark for a similarity (Max 1)", "MP4  SIMD and MISD are both parallel systems", "MP5  SIMD and MISD using multiple processors", "MP6  SIMD and MISD both may be pipelined", "MP7  Neither SIMD nor MISD are well suited for sequential applications such as office productivity software or compilers"], marks: "2", guide: ["Both SIMD and MISD must appear or be clearly inferred in each response for the mark.", "Simply expanding the acronym is NE."] } ],
    "Massively parallel machines link thousands of processors so each works on its own part of one problem at the same time. SIMD: one instruction on many data items; MISD: different instructions on the same data. Both are parallel and use several processors.", J33);

  /* ---------- 15.2 Boolean algebra and logic circuits: 9618/32 May/June 2025 Q7(c) ---------- */
  var q152 = Q("A-S25-7", "7", "Boolean algebra: De Morgan\u2019s laws",
    "",
    [ { id: "c", label: "(c)", text: "Use Boolean algebra including De Morgan\u2019s laws to simplify the following expression.\nShow all working.\n\n          " + ov("(A + B)") + " . (" + ov("A . B") + " + " + ov("B . C") + ")\n\n(In your answer write NOT before a term or use the \u00AC sign, for example \u00ACA . \u00ACB.)", marks: 4, lines: 2, work: 8 } ],
    [ kw("MP1 Correct application of De Morgan\u2019s laws (e.g. NOT(A + B) = NOT A . NOT B; NOT(A.B) = NOT A + NOT B)", 1, "c+", [["de morgan", "demorgan", "\u00AC", "not a", "not b", "!a", "!b", "~a", "~b", "a'", "b'"]]),
      kw("MP2 Correct application of Idempotent, Distributive or Absorption laws", 1, "c+", [["idempotent", "distributive", "absorption", "a.a", "b.b", "a + a", "a+a", "b+b"]]),
      kw("MP3 Further correct application of Idempotent, Distributive or Absorption laws", 1, "c+", [["absorption", "idempotent", "distributive", "(a + a", "(a+a", "(b + b", "(b+b"]]),
      kw("MP4 Final answer: NOT A . NOT B (equivalent to NOT (A + B))", 1, "c", [[re("(\u00AC|not\\s*|!|~)\\s*a\\s*[.\u00B7*&]?\\s*(and\\s*)?(\u00AC|not\\s*|!|~)\\s*b"), re("(not|\u00AC|!|~)\\s*\\(\\s*a\\s*(\\+|or)\\s*b\\s*\\)"), re("a'\\s*[.\u00B7*]?\\s*b'"), "\u0304"]]) ],
    [ { q: "7(c)", lead: "One mark for each mark point", ans: ["Correct application of De Morgan\u2019s laws", "Correct application of Idempotent, Distributive or Absorption laws", "Correct application of Idempotent, Distributive or Absorption laws", "Correct final answer", "", "(" + ov("A + B") + ") . (" + ov("A . B") + " + " + ov("B . C") + ")", "(" + ov("A") + " . " + ov("B") + ") . (" + ov("A") + " + " + ov("B") + " + " + ov("B") + " + " + ov("C") + ")     De Morgan\u2019s laws", "(" + ov("A") + " . " + ov("B") + ") . (" + ov("A") + " + " + ov("B") + " + " + ov("C") + ")     Idempotent laws", "(" + ov("A") + "." + ov("A") + " + " + ov("A") + "." + ov("B") + " + " + ov("A") + "." + ov("C") + ") . (" + ov("B") + "." + ov("A") + " + " + ov("B") + "." + ov("B") + " + " + ov("B") + "." + ov("C") + ")     Distributive laws", "(" + ov("A") + " + " + ov("A") + "." + ov("B") + " + " + ov("A") + "." + ov("C") + ") . (" + ov("A") + "." + ov("B") + " + " + ov("B") + " + " + ov("B") + "." + ov("C") + ")     Idempotent laws", "(" + ov("A") + " + " + ov("A") + "." + ov("C") + ") . (" + ov("B") + " + " + ov("B") + "." + ov("C") + ")     Absorption laws", ov("A") + " . " + ov("B") + "  //  " + ov("A + B") + "     Absorption laws / Final answer"], marks: "4", guide: [] } ],
    "Apply De Morgan to each bar first: NOT(A+B) = NOT A . NOT B, and NOT(A.B) + NOT(B.C) = NOT A + NOT B + NOT C. Then multiply out and use the idempotent and absorption laws until only NOT A . NOT B is left.", S25);

  /* ---------- 16.1 Operating systems: 9618/32 May/June 2025 Q5 ---------- */
  var q161 = Q("A-S25-5", "5", "Process states and scheduling",
    "The management and scheduling of processes are tasks carried out by an operating system.",
    [ { id: "a", label: "(a)", text: "Identify three process states.\n1\n2\n3", marks: 3, lines: 3 },
      { id: "b1", label: "(b)", text: "Describe the function of the shortest job first scheduling routine and give a benefit of this routine.\n\nFunction", marks: 3, lines: 5 },
      { id: "b2", label: "", text: "Benefit", marks: 1, lines: 3 } ],
    [ kw("(a) Running state; Ready state; Blocked state (1 mark each)", 3, "a", [[re("\\brunning\\b")], [re("\\bready\\b")], [re("\\bblocked\\b"), re("\\bwaiting\\b")]], true),
      kw("(b) Function, Max 3: processes queued as they arrive; process with the shortest time to complete / burst time is selected first; runs until complete or put in a waiting state (non-pre-emptive); the scheduler keeps choosing shorter processes, which can cause starvation of longer jobs", 3, "b1",
        [["queued", "queue", "as they arrive"], ["shortest", "burst time", "least time", "smallest"], ["until complete", "non-pre-emptive", "non pre-emptive", "nonpreemptive", "non-preemptive", "not pre-empted", "waiting state", "until it finishes"], ["starvation", "longer jobs", "longer processes", "starve"]], true),
      kw("(b) Benefit (1): shorter jobs don\u2019t wait for longer ones / reduces average waiting time / avoids starvation of short jobs / higher throughput", 1, "b2", [["don't have to wait", "do not have to wait", "average waiting", "average overall waiting", "reduces the waiting", "less waiting", "throughput", "short jobs", "shorter jobs", "starvation"]]) ],
    [ { q: "5(a)", lead: "One mark per point", ans: ["Running state", "Ready state", "Blocked state"], marks: "3", guide: [] },
      { q: "5(b)", lead: "One mark per mark point (Max 3)", ans: ["MP1  The processes are queued as they arrive", "MP2  The process with the shortest time to complete/burst time is selected first and executed", "MP3  The process will continue until complete or put in a waiting state once execution has begun // it is non-pre-emptive", "MP4  The scheduler will continue to choose shorter processes over longer processes if they continue to be added to the queue can cause starvation for longer jobs", "One mark for a benefit (Max 1)", "MP5  Shorter jobs don\u2019t have to wait for longer jobs to complete before processing // Significantly reduces the average overall waiting time for processes // Ensures starvation doesn\u2019t occur for process with shorter burst times", "MP6  Higher throughput of processes"], marks: "4", guide: [] } ],
    "A process is running, ready (waiting for the CPU) or blocked (waiting for I/O). Shortest job first picks the queued process with the least time to complete and runs it to the end; short jobs get through quickly, which lowers the average wait, but long jobs can starve.", S25);

  /* ---------- 16.2 Translation software: 9618/32 May/June 2025 Q8 ---------- */
  var q162 = Q("A-S25-8", "8", "Lexical analysis",
    "",
    [ { id: "a", label: "", text: "Explain what is meant by lexical analysis during program compilation.", marks: 4, lines: 8 } ],
    [ kw("Any four of: first stage of compilation; white space and comments removed; source code broken into a series of tokens; each token categorised / assigned a type; identifiers stored in a symbol table; invalid tokens generate an error; acceptable output passes to the syntax analyser", 4, "a",
        [["first stage", "first part", "first step"], ["white space", "whitespace", "comments", "remove"], ["token", "broken into", "broken down"], ["categoris", "categoriz", "assigned types", "assigned a type", "token types", "classif"], ["symbol table"], ["invalid", "error"], ["syntax analys", "syntax analyz", "passed to the syntax", "passes to the syntax"]], true) ],
    [ { q: "8", lead: "One mark per mark point (Max 4)", ans: ["MP1  It is the first stage of compilation", "MP2  White space and comments are removed", "MP3  It takes modified source code and breaks it into a series of tokens", "MP4  Each token is categorised and assigned types", "MP5  Identifiers are stored in a symbol table", "MP6  If the lexical analyser finds invalid tokens, it generates an error", "MP7  Acceptable data from the lexical analyser passes to the syntax analyser"], marks: "4", guide: [] } ],
    "Lexical analysis is the first stage: comments and white space are removed, the source code is split into tokens, each token is given a type, identifiers go into the symbol table, invalid tokens produce an error and the tokens are passed on to the syntax analyser.", S25);

  /* ---------- 17.1 Encryption, digital signatures and security: 9618/32 May/June 2025 Q10 ---------- */
  var q171 = Q("A-S25-10", "10", "Transport Layer Security (TLS)",
    "Identify the two main protocols that form Transport Layer Security (TLS) and state the purpose of each.",
    [ { id: "a1", label: "", text: "Protocol 1", marks: 1, lines: 1 },
      { id: "a2", label: "", text: "Purpose", marks: 1, lines: 3 },
      { id: "b1", label: "", text: "Protocol 2", marks: 1, lines: 1 },
      { id: "b2", label: "", text: "Purpose", marks: 1, lines: 3 } ],
    [ kw("MP1 Handshake protocol (identified)", 1, "a1|b1", [[re("hand\\s*shake")]]),
      kw("MP2 Purpose of the handshake: to establish a secure and reliable connection between two devices / permits the web server and client to authenticate each other and agree to use encryption algorithms", 1, "a2|b2", [["establish", "secure connection", "authenticate", "agree", "encryption algorithm", "set up", "negotiat", "reliable connection"]]),
      kw("MP3 Record protocol (identified)", 1, "a1|b1", [[re("\\brecord\\b")]]),
      kw("MP4 Purpose of the record protocol: secure and reliable way to send and receive data / secures application data, ensuring integrity and authenticity during transmission / encrypts and authenticates data / deals with the format for data transmission", 1, "a2|b2", [["send and receive data", "securing", "integrity", "authentic", "encrypts", "format for data", "exchange records", "exchanges records", "secure data", "data transmission"]]) ],
    [ { q: "10", lead: "One mark for identifying a protocol and one mark for stating its purpose", ans: ["MP1  Handshake protocol", "MP2  To establish a secure and reliable connection between two devices, systems or networks // Permits the web server and client to authenticate each other to make use of encryption algorithms", "MP3  Record protocol", "MP4  Provides a secure and reliable way to send and receive data over a network // To exchange records between the client and server // Responsible for securing application data and ensuring its integrity and authenticity during transmission // Encrypts and authenticates data exchanged between a client and a server // Deals with the format for data transmission."], marks: "4", guide: [] } ],
    "TLS has two layers: the Handshake protocol sets up the secure connection (authentication and agreeing the encryption), and the Record protocol then secures the data that is sent.", S25);

  /* ---------- 18.1 Artificial Intelligence: 9618/32 May/June 2025 Q6 ---------- */
  var q181 = Q("A-S25-6", "6", "Graphs and machine learning",
    "",
    [ { id: "a", label: "(a)", text: "Describe the structure of a graph as used in an Artificial Intelligence (AI) system.", marks: 2, lines: 3 },
      { id: "b", label: "(b)", text: "Explain how supervised learning and unsupervised learning differ from each other.", marks: 4, lines: 6 } ],
    [ kw("(a) Max 2: vertices / nodes represent entities (destinations, people); edges connect nodes and can represent paths; nodes / edges can be labelled or weighted; a cycle returns to the same node", 2, "a",
        [["vertices", "nodes", "vertex", "node"], ["edges", "connect", "paths", "arcs"], ["weight", "label", "cost"], ["cycle"]], true),
      kw("(b) Max 4: supervised uses labelled data, unsupervised unlabelled; known outcomes applied to inputs; supervised needs initial human input / training, unsupervised does not; with unlabelled data the outcomes are not known; the AI searches for hidden patterns / structures / clusters; within the data to predict outcomes", 4, "b",
        [["labelled", "labeled", "unlabelled", "unlabeled"], ["known outcome", "known output", "known result", "correct answer", "correct output"], ["human input", "human training", "training by", "trained by", "supervis", "teacher", "does not require human", "no human"], ["outcomes are not known", "not known", "unknown"], ["hidden pattern", "patterns", "structures", "clusters", "groups"], ["predict"]], true) ],
    [ { q: "6(a)", lead: "One mark per point (Max 2)", ans: ["MP1  A graph uses vertices/nodes to identify/represent entities such as destinations, people, etc", "MP2  Edges are used to connect nodes and can represent possible paths between them // a path is the list of nodes connected by edges between two given nodes", "MP3  Nodes/edges can be labelled/weighted, and this is a weighting that can be applied and used in the context of the application", "MP4  A cycle is a list of nodes that return to the same node."], marks: "2", guide: [] },
      { q: "6(b)", lead: "One mark per mark point (Max 4)", ans: ["MP1  Supervised learning uses labelled data // Unsupervised learning makes use of unlabelled data.", "MP2  Labelled data means that known outcomes are applied to specific inputs to help the AI predict outcomes.", "MP3  Supervised learning requires initial human input/training // Unsupervised learning does not require human input/training.", "MP4  With unlabelled data in unsupervised learning, outcomes are not known", "MP5  … the AI has to search for hidden patterns/structures/clusters", "MP6  … within the data in order to predict outcomes."], marks: "4", guide: [] } ],
    "A graph is made of nodes joined by (possibly weighted) edges. Supervised learning learns from labelled examples with known outcomes; unsupervised learning is given unlabelled data and must find hidden patterns or clusters itself.", S25);

  /* ---------- 19.1 Algorithms: 9618/31 May/June 2026 Q10 ---------- */
  var q191 = Q("A-J31-10", "10", "Insertion sort and Big O",
    "An insertion sort algorithm is used to sort the unique ID numbers of club members into ascending order. These unique ID numbers are kept in a 1D array MemberID. The corresponding names of the members are stored in a 1D array Names.\nThe arrays are declared as:\n   DECLARE MemberID : ARRAY[0:499] OF INTEGER\n   DECLARE Names : ARRAY[0:499] OF STRING\n\nThe following table defines the variables to be used in this algorithm.\n\nidentifier   data type   description\nCount        integer     main loop counter to iterate through the whole array\nTemp1        integer     temporary holding location for current member ID\nTemp2        string      temporary holding location for current member name\nInsert       integer     counter to show current insertion position",
    [ { id: "a", label: "(a)", text: "Write the pseudocode for an insertion sort to arrange the unique ID numbers into ascending order. Make sure that the data in both arrays is swapped as required so that data with the same index continues to apply to the same person.\nUse the given identifiers. Assume all variables have been declared.", marks: 5, lines: 16 },
      { id: "b", label: "(b)", text: "Describe the factors, other than changing the algorithm, that affect the time efficiency of the insertion sort algorithm.", marks: 3, lines: 6 },
      { id: "c", label: "(c)", text: "State the Big O notation for the worst-case time complexity of the insertion sort.", marks: 1, lines: 1 } ],
    [ kw("(a) Any 5 of 7: outer loop from the second element (FOR Count \u2190 1 TO 499); Temp1 and Temp2 take the current values (Temp1 \u2190 MemberID[Count], Temp2 \u2190 Names[Count]); Insert \u2190 Count - 1; inner loop test (WHILE Insert >= 0 AND MemberID[Insert] > Temp1); both arrays shifted one place (\u2026[Insert + 1] \u2190 \u2026[Insert]); Insert \u2190 Insert - 1; Temp1 and Temp2 placed at [Insert + 1]", 5, "a",
      [ [re("for\\s+count\\s*(" + AR + "|<-|=)\\s*1\\s+to\\s+499")],
        [re("temp1\\s*(" + AR + "|<-)\\s*memberid\\s*\\[\\s*count\\s*\\]"), re("temp2\\s*(" + AR + "|<-)\\s*names\\s*\\[\\s*count\\s*\\]")],
        [re("insert\\s*(" + AR + "|<-)\\s*count\\s*[-\u2212\u2013]\\s*1")],
        [re("while\\s+insert\\s*(>=|\u2265)\\s*0"), re("memberid\\s*\\[\\s*insert\\s*\\]\\s*>\\s*temp1")],
        [re("memberid\\s*\\[\\s*insert\\s*\\+\\s*1\\s*\\]\\s*(" + AR + "|<-)\\s*memberid\\s*\\[\\s*insert\\s*\\]"), re("names\\s*\\[\\s*insert\\s*\\+\\s*1\\s*\\]\\s*(" + AR + "|<-)\\s*names\\s*\\[\\s*insert\\s*\\]")],
        [re("insert\\s*(" + AR + "|<-)\\s*insert\\s*[-\u2212\u2013]\\s*1")],
        [re("memberid\\s*\\[\\s*insert\\s*\\+\\s*1\\s*\\]\\s*(" + AR + "|<-)\\s*temp1"), re("names\\s*\\[\\s*insert\\s*\\+\\s*1\\s*\\]\\s*(" + AR + "|<-)\\s*temp2")] ], true),
      kw("(b) Array size / number of elements to be sorted (fewer is faster); initial order (a partially sorted array sorts faster)", 3, "b", [["size of the array", "array size", "number of elements", "number of items", "number of data", "more elements", "fewer elements", "fewer items", "more items"], ["initial order", "partially sorted", "already sorted", "nearly sorted", "mostly sorted", "order of the data", "reversed", "sorted order"], ["better", "faster", "worse", "slower", "quicker", "improve", "increase", "decrease"]], true),
      kw("(c) O(n\u00B2)", 1, "c", [[re("o\\s*\\(\\s*n\\s*(\\^\\s*2|\u00B2|2)\\s*\\)")]]) ],
    [ { q: "10(a)", lead: "One mark per mark point (Max 5)", ans: ["MP1  Correct outer loop iterating through entire array starting at second element", "MP2  Temporary variables both initialised to current value of arrays  (MP2 must be Temp1 and Temp2)", "MP3  Insertion variable initialised  (MP3 must be Insert)", "MP4  Correct inner loop criteria", "MP5  Elements of both arrays inserted as appropriate", "MP6  Insertion variable decremented", "MP7  Temporary values replaced in correct place in arrays", "", "Sample algorithm", "FOR Count " + AR + " 1 to 499", "   Temp1 " + AR + " MemberID[Count]", "   Temp2 " + AR + " Names[Count]", "   Insert " + AR + " Count \u2013 1", "   WHILE Insert >= 0 AND MemberID[Insert] > Temp1", "      MemberID[Insert + 1] " + AR + " MemberID[Insert]", "      Names[Insert + 1] " + AR + " Names[Insert]", "      Insert " + AR + " Insert \u2013 1", "   ENDWHILE", "   MemberID[Insert + 1] " + AR + " Temp1", "   Names[Insert + 1] " + AR + " Temp2", "NEXT Count"], marks: "5", guide: ["Do not accept bubble sort answers."] },
      { q: "10(b)", lead: "One mark per mark point (Max 3)", ans: ["MP1  Array size // Number of elements in the array", "MP2  … time efficiency will improve if the number of elements to be sorted are fewer", "MP3  Initial order", "MP4  … if the array is partially sorted the insertion sort works better"], marks: "3", guide: ["Allow the opposite for MP2 (worse/more).", "Allow the opposite for MP4 (reversed/slower)."] },
      { q: "10(c)", ans: ["O(n\u00B2) // O(N\u00B2)"], marks: "1", guide: ["Must be completely correct (including brackets)."] } ],
    "The outer loop takes each element in turn, keeps it in Temp1/Temp2, shifts larger IDs (and their names) one place right, then drops the held values into the gap. Time depends on the array size and how sorted it already is. Worst case (reverse order) is O(n\u00B2).", J31);

  /* ---------- 19.2 Recursion: 9618/32 May/June 2025 Q11(b) ---------- */
  var q192 = Q("A-S25-11", "11", "Recursion",
    "A binary tree can be used to implement recursion.",
    [ { id: "b1", label: "(b)", text: "Identify one feature of an algorithm that makes it beneficial to use recursion.\n\nFeature", marks: 1, lines: 2 },
      { id: "b2", label: "", text: "Give one example of an application that could use a recursive algorithm.\n\nExample", marks: 1, lines: 2 } ],
    [ kw("Feature: a problem that naturally breaks down into smaller versions of itself", 1, "b1", [["smaller", "breaks down", "break down", "sub-problem", "subproblem", "itself", "repeated", "same problem", "smaller version"]]),
      kw("Example: factorial / mathematical series / Fibonacci / compound interest / tree traversal / evaluation of RPN expressions", 1, "b2", [["factorial", "series", "fibonacci", "compound interest", "tree traversal", "traversal", "rpn", "reverse polish", "tower", "binary search", "merge sort", "quick sort", "quicksort"]]) ],
    [ { q: "11(b)", lead: "One mark for feature and one mark for example (Max 2)", ans: ["Recursion is beneficial for algorithms when a problem naturally breaks down into smaller versions of itself.", "\u2026 such as calculating a factorial / mathematical series / Fibonacci / compound interest / tree traversal / evaluation of RPN expressions."], marks: "2", guide: [] } ],
    "Recursion suits problems that naturally break into smaller copies of themselves, e.g. factorial, Fibonacci or tree traversal.", S25);

  /* ---------- 20.1 Programming paradigms: 9618/32 May/June 2025 Q12 ---------- */
  var q201 = Q("A-S25-12", "12", "Object-oriented programming",
    "A medical clinic uses objects of the class Patient to assign a priority and a doctor to a patient. Some of the attributes required in the class are listed in the table.\n\nAttribute    Data type   Description\nPatientID    STRING      Unique identifier of the patient\nName         STRING      Patient\u2019s full name, surname first\nDoctorID     STRING      ID of doctor administering treatment\n\nTreatment is prioritised with a numeric scale of 1 to 5.",
    [ { id: "a", label: "(a)", text: "Complete the class diagram for Patient, to include:\n\u2022 attribute and data type for the date of birth\n\u2022 attribute and data type for the priority\n\u2022 methods to assign the patient ID, priority and doctor ID\n\u2022 methods to return the patient ID, patient date of birth and the priority.\n\nPatient\n   PatientID : STRING\n   Name : STRING\n   ........................ : ........................\n   ........................ : ........................\n   DoctorID : STRING\n   SetName(FullName : STRING)\n   SetDateOfBirth(DOB : DATE)\n   GetName()\n   GetDoctorID()\n\n(write the lines you add to the diagram)", marks: 5, lines: 10 },
      { id: "b1", label: "(b)(i)", text: "Identify the object-oriented programming (OOP) term described as \u2018an occurrence of an object\u2019.", marks: 1, lines: 1 },
      { id: "b2", label: "(b)(ii)", text: "Describe what is meant by the OOP term polymorphism.", marks: 2, lines: 3 } ],
    [ kw("(a) MP1 Two correct attributes: DateOfBirth : DATE and a sensibly named priority attribute with an INTEGER data type", 1, "a", [[re("\\bdate\\w*\\s*:\\s*date\\b")], [re("priority\\s*:\\s*integer")]]),
      kw("(a) MP2 SetPatientID(\u2026) and SetDoctorID(\u2026) seen", 1, "a", [[re("setpatientid\\s*\\(")], [re("setdoctorid\\s*\\(")]]),
      kw("(a) MP3 \u2026 with appropriate parameters, with STRING data types", 1, "a", [[re("setpatientid\\s*\\(\\s*\\w+\\s*:\\s*string\\s*\\)")], [re("setdoctorid\\s*\\(\\s*\\w+\\s*:\\s*string\\s*\\)")]]),
      kw("(a) MP4 GetPatientID() and GetDateOfBirth() seen", 1, "a", [[re("getpatientid\\s*\\(\\s*\\)")], [re("getdateofbirth\\s*\\(\\s*\\)")]]),
      kw("(a) MP5 Priority setter and getter fully correct (SetPriority(Urgency : INTEGER), GetPriority()) with names matching the attribute", 1, "a", [[re("setpriority\\s*\\(\\s*\\w+\\s*:\\s*integer\\s*\\)")], [re("getpriority\\s*\\(\\s*\\)")]]),
      kw("(b)(i) Instance // instantiation", 1, "b1", [["instance", "instantiation"]]),
      kw("(b)(ii) MP1 methods with the same name are redefined / behave differently; MP2 in derived / inherited classes / subclasses", 2, "b2", [["same name", "redefin", "override", "overridden", "behave differently", "different behaviour", "different behavior", "different way"], ["derived", "inherit", "subclass", "child class", "sub class"]], true) ],
    [ { q: "12(a)", lead: "One mark per mark point", ans: ["MP1  Two correct attributes (DateOfBirth : Date) and priority with a sensible name and integer data type", "MP2  SetPatientID(\u2026) and SetDoctorID(\u2026) seen", "MP3  \u2026 and appropriate parameters, with string data types", "MP4  GetPatientID() and GetDateOfBirth() seen", "MP5  Priority setter and getter fully correct with name matching Priority attribute, with appropriate parameter and correct data type.", "", "Patient", "PatientID : STRING", "Name : STRING", "DateOfBirth : DATE", "Priority : INTEGER", "DoctorID : STRING", "SetPatientID(PatientNumber : STRING)", "SetName(FullName : STRING)", "SetDateOfBirth(DOB : DATE)", "SetPriority(Urgency : INTEGER)", "SetDoctorID(DocID : STRING)", "GetPatientID()", "GetName()", "GetDateOfBirth()", "GetPriority()", "GetDoctorID()"], marks: "5", guide: [] },
      { q: "12(b)(i)", ans: ["Instance // instantiation"], marks: "1", guide: [] },
      { q: "12(b)(ii)", lead: "One mark for each mark point", ans: ["MP1  Polymorphism is when methods with the same name are redefined / behave differently \u2026", "MP2  \u2026 in derived / inherited classes / subclasses"], marks: "2", guide: [] } ],
    "A class diagram lists attributes (name : type) then methods. An object is an instance of a class. Polymorphism: a method with the same name behaves differently in derived classes.", S25);

  /* ---------- 20.2 File processing and exception handling: 9618/32 May/June 2025 Q13 ---------- */
  var q202 = Q("A-S25-13", "13", "Random file handling in pseudocode",
    "The pseudocode algorithm below uses random file access to copy 50 records from a live file CurrentResults.dat to a stored file StoredResults.dat one record at a time. It uses the user-defined type StudentResult.\n\nTYPE StudentResult\n   DECLARE LastName : STRING\n   DECLARE FirstName : STRING\n   DECLARE ExamGrade : STRING\nENDTYPE\n\nIf any grades are missing in CurrentResults.dat, the text \"Missing grade\" is added to the ExamGrade field in StoredResults.dat\n\nComplete this file handling pseudocode algorithm.\n\nDECLARE Grade : StudentResult\nDECLARE Position : INTEGER\n\nOPENFILE \"StoredResults.dat\" FOR RANDOM\n  ............................................................\n  ............................................................\n   SEEK \"CurrentResults.dat\", Position\n   GETRECORD \"CurrentResults.dat\", Grade\n   IF Grade.ExamGrade = \"\" THEN\n      ............................................................\n   ENDIF\n  ............................................................\n  ............................................................\nNEXT Position\nCLOSEFILE \"CurrentResults.dat\"\nCLOSEFILE \"StoredResults.dat\"",
    [ { id: "a", label: "", text: "Write the missing code for the five blank lines, in the order they appear.", marks: 5, lines: 6 } ],
    [ kw("Blank line 1: OPENFILE \"CurrentResults.dat\" FOR RANDOM", 1, "a", [[re("openfile\\s+[\"']currentresults\\.dat[\"']\\s+for\\s+random")]]),
      kw("Blank line 2: FOR Position \u2190 1 TO 50", 1, "a", [[re("for\\s+position\\s*(" + AR + "|<-|=)\\s*1\\s+to\\s+50")]]),
      kw("Blank line 3: Grade.ExamGrade \u2190 \"Missing grade\"", 1, "a", [[re("grade\\.examgrade\\s*(" + AR + "|<-)\\s*[\"']missing grade[\"']")]]),
      kw("Blank line 4: SEEK \"StoredResults.dat\", Position", 1, "a", [[re("seek\\s+[\"']storedresults\\.dat[\"']\\s*,\\s*position")]]),
      kw("Blank line 5: PUTRECORD \"StoredResults.dat\", Grade", 1, "a", [[re("putrecord\\s+[\"']storedresults\\.dat[\"']\\s*,\\s*grade")]]) ],
    [ { q: "13", lead: "One mark for each correctly completed line", ans: ["DECLARE Grade : StudentResult", "DECLARE Position : INTEGER", "OPENFILE \"CurrentResults.dat\" FOR RANDOM", "OPENFILE \"StoredResults.dat\" FOR RANDOM", "FOR Position " + AR + " 1 TO 50", "   SEEK \"CurrentResults.dat\", Position", "   GETRECORD \"CurrentResults.dat\", Grade", "   IF Grade.ExamGrade = \"\" THEN", "      Grade.ExamGrade " + AR + " \"Missing grade\"", "   ENDIF", "   SEEK \"StoredResults.dat\", Position", "   PUTRECORD \"StoredResults.dat\", Grade", "NEXT Position", "CLOSEFILE \"CurrentResults.dat\"", "CLOSEFILE \"StoredResults.dat\""], marks: "5", guide: ["The two OPENFILE lines may be in either order."] } ],
    "Open both files for random access, loop over the 50 positions, fix a missing grade in the record, then SEEK to the same position in the stored file and PUTRECORD the record.", S25);

  paper("13.1", "User-defined data types", [q131]);
  paper("13.2", "File organisation and access", [q132]);
  paper("13.3", "Floating-point numbers, representation and manipulation", [q133]);
  paper("14.1", "Protocols", [q141]);
  paper("14.2", "Circuit switching and packet switching", [q142]);
  paper("15.1", "Processors and parallel processing", [q151]);
  paper("15.2", "Boolean algebra and logic circuits", [q152]);
  paper("16.1", "Purposes of an operating system (OS)", [q161]);
  paper("16.2", "Translation software", [q162]);
  paper("17.1", "Encryption, encryption protocols and digital certificates", [q171]);
  paper("18.1", "Artificial Intelligence (AI)", [q181]);
  paper("19.1", "Algorithms", [q191]);
  paper("19.2", "Recursion", [q192]);
  paper("20.1", "Programming paradigms", [q201]);
  paper("20.2", "File processing and exception handling", [q202]);
})();
