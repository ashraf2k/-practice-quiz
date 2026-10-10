/* ============================================================
   syllabus-data.js
   Cambridge IGCSE Computer Science 0478 (2026-2028) syllabus map, the
   mapping from each quiz / exam-paper topic tag to a syllabus
   sub-topic, a rule-based action-plan library, and the analysis engine
   behind the admin "Syllabus report" tab. No AI / network at run time.
   Plain ASCII on purpose: the text goes straight into jsPDF.
   ============================================================ */
(function(root){
  "use strict";

  var THRESH_SECURE = 70;
  var THRESH_DEVELOPING = 50;
  var MIN_QUESTIONS = 5;

  // ---------- Syllabus map ----------
  // assessed:false => no quiz / paper covers it yet ("Not yet assessed").
  var SUBTOPICS = [
    { id:"1.1", sec:1, secTitle:"Data representation", title:"Number systems",
      objective:"Convert between denary, binary and hexadecimal (up to 16 bits); add 8-bit binary integers and explain overflow; perform logical shifts; use two's complement for 8-bit integers.",
      revise:["1.1.2 Convert denary <-> binary <-> hexadecimal (integers only, max 16-bit)","1.1.3 Why hexadecimal is used (shorter and easier for humans than binary)","1.1.4 Add two 8-bit binary integers; overflow when the result is greater than 255","1.1.5 Logical shifts: bits fall off one end, zeros come in the other, x2 / /2 per place","1.1.6 Two's complement: represent positive and negative 8-bit integers"],
      tip:"Always write the column headings (128 64 32 16 8 4 2 1) above your working and check by converting back. For two's complement, invert then add 1, and remember the left-most bit has the value -128.",
      redo:["datarep","datarep_exam"] },
    { id:"1.2", sec:1, secTitle:"Data representation", title:"Text, sound and images",
      objective:"Explain how text (ASCII, Unicode), sound (sample rate, sample resolution) and images (resolution, colour depth) are represented in binary.",
      revise:["1.2.1 ASCII vs Unicode: Unicode has more characters, languages and emojis but needs more bits per character","1.2.2 Sound: sample rate (samples per second) and sample resolution (bits per sample) - higher means more accurate and a bigger file","1.2.3 Images: resolution (number of pixels) and colour depth (bits per colour) - higher means better quality and a bigger file"],
      tip:"For 'effect of' questions always say what changes AND the consequence for both quality and file size (both go up together).",
      redo:["datarep","datarep_exam"] },
    { id:"1.3", sec:1, secTitle:"Data representation", title:"Data storage and compression",
      objective:"Know the units of storage (bit to exbibyte, 1024 not 1000); calculate image and sound file sizes; explain why data is compressed; lossy and lossless (RLE) compression.",
      revise:["1.3.1 Units: 8 bits = 1 byte, 1024 B = 1 KiB, 1024 KiB = 1 MiB, ...","1.3.2 Image size = pixels x colour depth; sound size = sample rate x resolution x seconds; give the answer in the unit asked","1.3.3 Why compress: less storage, less bandwidth, faster transmission","1.3.4 Lossy (data permanently removed) vs lossless (no loss, e.g. RLE)"],
      tip:"Write the formula, substitute the numbers, then convert units last (divide by 8 for bytes, then by 1024 for each step up). Show every step - method marks are awarded.",
      redo:["datarep","datarep_exam"] },
    { id:"2.1", sec:2, secTitle:"Data transmission", title:"Types and methods of data transmission",
      objective:"Describe packets (header, payload, trailer) and packet switching; serial, parallel, simplex, half-duplex and full-duplex transmission and when each suits a scenario; the USB interface.",
      revise:["2.1.1 Packet structure: header (destination address, packet number, originator address), payload, trailer","2.1.1 Packet switching: packets take different routes, a router chooses the route, packets may arrive out of order and are reordered","2.1.2 Serial, parallel, simplex, half-duplex, full-duplex - advantages, disadvantages and suitable scenarios","2.1.3 USB: benefits and drawbacks and how it transmits data"],
      tip:"For 'suitability' questions use the scenario: name the method, give the reason from the scenario (distance, speed, direction), then contrast with the alternative.",
      redo:["datatrans","datatrans_exam"] },
    { id:"2.2", sec:2, secTitle:"Data transmission", title:"Methods of error detection",
      objective:"Explain why errors occur in transmission; describe parity checks (byte and block), checksums, echo check, check digits (ISBN, bar codes) and ARQ.",
      revise:["2.2.1 Why errors occur: interference causes data loss, gain or change","2.2.2 Parity check (odd/even, byte and block), checksum and echo check - how each works","2.2.3 Check digits: how they are calculated and used, e.g. ISBN and bar codes","2.2.4 ARQ: positive/negative acknowledgement and timeout"],
      tip:"Practise parity by counting the 1s first, then deciding the parity bit. For parity block questions find the row AND the column that disagree to locate the error.",
      redo:["datatrans","datatrans_exam"] },
    { id:"2.3", sec:2, secTitle:"Data transmission", title:"Encryption",
      objective:"Understand the need for encryption and how symmetric and asymmetric (public/private key) encryption work.",
      revise:["2.3.1 Purpose of encryption: data is meaningless if intercepted","2.3.2 Symmetric (one shared key) vs asymmetric (public key encrypts, private key decrypts)"],
      tip:"Never say encryption 'stops hacking'. Say it makes intercepted data unreadable without the key. Learn the one-line difference between symmetric and asymmetric.",
      redo:["datatrans","datatrans_exam"] },
    { id:"3.1", sec:3, secTitle:"Hardware", title:"Computer architecture",
      objective:"Role of the CPU and microprocessor; fetch-decode-execute cycle and registers; buses; cores, cache and clock speed; instruction sets; embedded systems.",
      revise:["3.1.1 Role of the CPU; microprocessor","3.1.2 Von Neumann: registers (PC, MAR, MDR, CIR, ACC), buses, ALU, CU, FDE cycle","3.1.3 Cores, cache size and clock speed and their effect on performance","3.1.4 Instruction set","3.1.5 Embedded systems: purpose and characteristics"],
      tip:"For CPU performance questions state the factor, what it does, and the effect on performance. Learn the register names and what each one holds in each FDE step.",
      redo:["hardware","hardware_exam"] },
    { id:"3.2", sec:3, secTitle:"Hardware", title:"Input and output devices",
      objective:"Input and output devices, sensors and actuators, and how they are used in control systems (including touchscreens).",
      revise:["3.2.1-3.2.2 Input and output devices and their uses","3.2.3 Sensors and the data they collect; actuators; how a control system uses them","3.2.1 How touchscreens work (capacitive, resistive, infrared)"],
      tip:"In control-system questions follow the loop: sensor -> ADC -> processor compares with stored value -> actuator acts -> sensor re-checks. Name the specific sensor and what it measures.",
      redo:["hardware","hardware_exam"] },
    { id:"3.3", sec:3, secTitle:"Hardware", title:"Data storage",
      objective:"Primary and secondary storage; magnetic, optical and solid-state storage; virtual memory; cloud storage and its advantages and disadvantages.",
      revise:["3.3.1-3.3.2 Primary (RAM, ROM) vs secondary storage","3.3.3 How magnetic, optical and solid-state storage work","3.3.4 Virtual memory: pages move between RAM and secondary storage when RAM is full","3.3.5-3.3.6 Cloud storage: how it works, advantages and disadvantages"],
      tip:"Compare storage types on the same criteria (capacity, speed, durability, cost, portability). For virtual memory describe the sequence: RAM full, pages swapped to disk, swapped back when needed.",
      redo:["hardware","hardware_exam"] },
    { id:"3.4", sec:3, secTitle:"Hardware", title:"Network hardware",
      objective:"Why a computer needs a NIC; MAC and IP addresses (and how they differ); the role of a router.",
      revise:["3.4.1-3.4.2 Network interface card and MAC address (set by the manufacturer, hexadecimal)","3.4.3 IP address: allocated by the network, can change; IPv4 / IPv6","3.4.4 Router: sends data to its destination between networks"],
      tip:"Make a two-column table: MAC (permanent, manufacturer, identifies the device) vs IP (temporary, allocated by the network, identifies the connection).",
      redo:["hardware","hardware_exam"] },
    { id:"4.1", sec:4, secTitle:"Software", title:"Types of software and interrupts",
      objective:"System vs application software; functions of an operating system and utility software; hardware, firmware and OS needed to run applications; interrupts and the ISR.",
      revise:["4.1.1 System software (OS, utilities) vs application software, with examples","4.1.2 Functions of an OS: files, interrupts, interface, peripherals/drivers, memory, multitasking, security, user accounts","4.1.3 Hardware -> firmware (bootloader) -> OS -> applications","4.1.4 Interrupts: how generated, handled by an interrupt service routine, hardware vs software examples"],
      tip:"Describe interrupts as a sequence: interrupt signal -> current task paused (registers saved) -> ISR runs -> priority checked -> original task resumes. Use the examples from the syllabus.",
      redo:["software","software_exam"] },
    { id:"4.2", sec:4, secTitle:"Software", title:"Programming languages, translators and IDEs",
      objective:"High-level vs low-level languages; assembly language and assemblers; compiler vs interpreter; the role and functions of an IDE.",
      revise:["4.2.1 High-level vs low-level: readability, debugging, machine independence, hardware control","4.2.2 Assembly language: mnemonics, translated by an assembler","4.2.3-4.2.4 Compiler (whole program, error report, executable) vs interpreter (line by line, stops at first error)","4.2.5 IDE: code editor, run-time environment, translators, debugging tools"],
      tip:"Learn compiler vs interpreter as a table with 4 rows (when it translates, output, errors, when it is used). Always link an advantage to its reason.",
      redo:["software","software_exam"] },
    { id:"7", sec:7, secTitle:"Algorithm design and problem-solving", title:"Algorithm design and problem-solving",
      objective:"Program development life cycle; decomposition and abstraction; structure diagrams, flowcharts and pseudocode; standard algorithms; validation and verification; test data; trace tables; finding and fixing errors.",
      revise:["7.1 PDLC: analysis, design, coding, testing","7.2 Decomposition (inputs, processes, outputs, storage); structure diagrams, flowcharts, pseudocode","7.4 Linear search, bubble sort, totalling, counting, max/min/average","7.5 Validation (range, length, type, presence, format, check digit) vs verification (visual check, double entry)","7.6 Test data: normal, abnormal, extreme, boundary","7.7-7.8 Trace tables and identifying errors in algorithms"],
      tip:"Trace tables: one column per variable and output, update one row per executed line, and never skip a loop iteration. For validation say what is checked (e.g. 'range check' checks the value is between limits), not just 'it checks the data'.",
      redo:["algo","algo_exam","validation","igcse"] },
    { id:"8.1", sec:8, secTitle:"Programming", title:"Programming concepts",
      objective:"Variables, constants and data types; input and output; sequence, selection (IF, CASE) and iteration; totalling and counting; string handling; arithmetic, relational and logical operators; procedures, functions, parameters and scope; library routines (DIV, MOD).",
      revise:["8.1.2 Data types: integer, real, char, string, Boolean","8.1.4 Selection (IF, CASE), iteration (count-controlled, pre- and post-condition loops)","8.1.4 String handling: length, substring, upper, lower","8.1.4 Operators: + - * / ^ MOD DIV; = < <= > >= <>; AND OR NOT","8.1.6 Procedures vs functions, parameters (by value / by reference), local vs global variables","8.1.7 Library routines: DIV, MOD, ROUND, RANDOM"],
      tip:"Write the pseudocode out by hand and trace it with a small example. Check boundaries (< vs <=) and brackets in AND/OR conditions. A function RETURNS a value; a procedure does not.",
      redo:["programming","programming_exam","igcse","algo"] },
    { id:"8.2", sec:8, secTitle:"Programming", title:"Arrays",
      objective:"Declare and use one- and two-dimensional arrays, including indexes and loops that stay within the array bounds.",
      revise:["8.2.1 One-dimensional and two-dimensional arrays","8.2.1 Index of the first element (0 or 1) and keeping loops within bounds","8.2.2 Nested loops to go through a 2D array (row by row)","Totalling, counting and finding the maximum in an array"],
      tip:"Draw the array as a grid with its index numbers, and check the first and last index of every loop. Start a maximum from the first array element, not from 0.",
      redo:["programming","programming_exam","algo"] },
    { id:"8.3", sec:8, secTitle:"Programming", title:"File handling",
      objective:"Store data in and retrieve data from a text file: open a file in READ, WRITE or APPEND mode, read and write lines, test for the end of the file, and close the file.",
      revise:["8.3.1 OPENFILE ... FOR READ / WRITE / APPEND (WRITE erases old content, APPEND keeps it)","8.3.2 READFILE, WRITEFILE and CLOSEFILE; always close the file after use","8.3.2 Reading until EOF with a loop, reading one line each repetition","Why files are used: data stays after the power is off and can be reused or shared"],
      tip:"Learn the file routine as a fixed order: OPEN, loop (READ or WRITE), CLOSE. Say which mode you use and why.",
      redo:["programming","programming_exam"] },
    { id:"5", sec:5, secTitle:"The internet and its uses", title:"The internet and its uses",
      objective:"Know the difference between the internet and the web, how URLs, HTTP/HTTPS, browsers, DNS and cookies work, what digital currency and blockchain are, and the main cyber security threats and solutions.",
      revise:["5.1 The internet is the infrastructure; the world wide web is the collection of web pages accessed using it","5.1 URL = protocol + domain name + web page/file name; HTTPS encrypts the data (SSL)","5.1 Locating a page: browser, DNS (domain name to IP address), web server, HTML rendered by the browser","5.1 Session cookies are deleted when the browser closes; persistent cookies stay until they expire","5.2 Digital currency exists only electronically; blockchain is a time-stamped ledger that cannot be altered","5.3 Threats: brute-force, data interception, DDoS, hacking, malware (virus, worm, Trojan horse, spyware, adware, ransomware), pharming, phishing, social engineering","5.3 Solutions: access levels, anti-malware, authentication, automatic updates, checking links and messages, firewalls, privacy settings, proxy servers, SSL"],
      tip:"Learn each threat with a one-line definition and the solution that stops it. For the page-retrieval question, write the steps in order: DNS, IP address, web server, HTML, display.",
      redo:["internet","internet_exam"] },
    { id:"6", sec:6, secTitle:"Automated and emerging technologies", title:"Automated and emerging technologies",
      objective:"Describe how sensors, microprocessors and actuators form automated systems, the characteristics, roles, advantages and disadvantages of robots, and the basics of AI (expert systems and machine learning).",
      revise:["6.1 Sensor measures, microprocessor processes and compares with a stored value, actuator carries out the action","6.1 Give an advantage AND a disadvantage for the scenario given (industry, transport, agriculture, weather, gaming, lighting, science)","6.2 A robot has a mechanical structure, electrical components (sensors, microprocessors, actuators) and is programmable","6.3 AI: data and rules, reasoning, and the ability to learn and adapt","6.3 Expert system: knowledge base, rule base, inference engine, interface","6.3 Machine learning: a program automatically adapts its own processes and/or data"],
      tip:"For a scenario question, name the sensor, what the microprocessor decides, and what the actuator does. Always apply the advantage or disadvantage to the scenario, not to robots in general.",
      redo:["automated","automated_exam"] },
    { id:"9", sec:9, secTitle:"Databases", title:"Databases",
      objective:"Define a single-table database (fields, records, validation), choose data types, identify a primary key, and read, write and correct SQL queries on one table.",
      revise:["9.1 Fields (columns) and records (rows); validation of the data entered","9.2 Data types: text/alphanumeric, character, Boolean, integer, real, date/time","9.3 A primary key is unique for every record (e.g. an ID code, not a name)","9.4 SQL: SELECT fields FROM table WHERE criteria ORDER BY field ASCENDING/DESCENDING","9.4 SUM adds the values in a field; COUNT counts the matching records; AND / OR combine conditions"],
      tip:"Read an SQL query in the order SELECT, FROM, WHERE: first find the matching records, then sort them, then show only the fields listed after SELECT. Telephone numbers and codes are text, not integers.",
      redo:["databases","databases_exam"] },
    { id:"10", sec:10, secTitle:"Boolean logic", title:"Boolean logic",
      objective:"Know the symbols and functions of the NOT, AND, OR, NAND, NOR and XOR gates, and create circuits, complete truth tables and write logic expressions (maximum three inputs and one output).",
      revise:["10.1 Gate symbols: a small circle at the output means the output is inverted (NAND, NOR, NOT)","10.2 NOT has one input; every other gate has two. AND: 1 only if both are 1. OR: 1 if either is 1. XOR: 1 only if the inputs differ","10.2 NAND, NOR are the opposites of AND, OR","10.3 A 3-input truth table has 8 rows (000 to 111). Work out the bracket values first, in working columns","10.3 Write expressions with NOT, AND, OR, NAND, NOR, XOR in capitals and use brackets"],
      tip:"Add a working column for every gate in the circuit and fill the table one column at a time. Write a condition such as L = 0 as NOT L.",
      redo:["boolean","boolean_exam"] }
  ];
  var SUB_BY_ID = {};
  SUBTOPICS.forEach(function(s){ SUB_BY_ID[s.id] = s; });

  // ---------- Topic tag -> sub-topic ----------
  function mapTopic(topic, examKey){
    var t = String(topic || "");
    if(examKey === "igcse"){
      return /IF Statement|Relational|Nested IF|CASE|Logical Operators/i.test(t) ? "8.1" : "7";
    }
    if(examKey === "validation") return "7";
    if(examKey === "databases" || examKey === "databases_exam") return "9";
    if(examKey === "boolean" || examKey === "boolean_exam") return "10";
    if(examKey === "algo_exam") return "7";
    if(examKey === "internet" || examKey === "internet_exam") return "5";
    if(examKey === "automated" || examKey === "automated_exam") return "6";
    if(examKey === "programming" || examKey === "programming_exam"){
      if(/File|EOF/i.test(t)) return "8.3";
      if(/Array/i.test(t)) return "8.2";
      return "8.1";
    }
    if(examKey === "algo"){
      if(/Array/i.test(t)) return "8.2";
      if(/Pseudocode Syntax|Data Types|Loop|String Handling|Modular Division/i.test(t)) return "8.1";
      return "7";
    }
    if(/Storage Unit|Storage Calc|File Size|Compress|RLE|Run-Length|IEC/i.test(t)) return "1.3";
    if(/ASCII|Unicode|Sound|Pixel|Colour|Bitmap/i.test(t)) return "1.2";
    if(/Base Conv|Binary|Two's|Shift|Hexadecimal|Denary|Overflow/i.test(t)) return "1.1";
    if(/Encrypt|SSL|TLS/i.test(t)) return "2.3";
    if(/Parity|Checksum|Echo|Check Digit|Error Detection|ARQ|Transmission Errors/i.test(t)) return "2.2";
    if(/Packet|Serial|Parallel|Transmission Mode|USB|Duplex/i.test(t)) return "2.1";
    if(/Sensor|Actuator|Touchscreen|Output Device|Control System/i.test(t)) return "3.2";
    if(/CPU|Register|Bus|FDE|Embedded|Instruction Set/i.test(t)) return "3.1";
    if(/Primary|Secondary|Optical|Solid-State|Virtual Memory|Cloud|\bRAM\b/i.test(t)) return "3.3";
    if(/MAC|IP Address|Network Hardware|Router|Network Interface/i.test(t)) return "3.4";
    if(/Types of Software|System vs|Operating System|Utility|Interrupt|User Interface|Functions of an Operating/i.test(t)) return "4.1";
    if(/Programming Language|Translator|Compiler|Assembly|\bIDEs?\b|Linker|High-Level|Low-Level/i.test(t)) return "4.2";
    return null;
  }

  // ---------- Helpers ----------
  function ratingFor(pct, questions){
    if(questions < MIN_QUESTIONS) return "limited";
    if(pct >= THRESH_SECURE) return "secure";
    if(pct >= THRESH_DEVELOPING) return "developing";
    return "needs";
  }
  var RATING_LABEL = { secure:"Secure", developing:"Developing", needs:"Needs work", limited:"Limited evidence", none:"Not yet assessed" };

  function qMarks(q){ return (q && q.difficulty === "hard") ? 2 : 1; }
  function normDiff(d){ d = String(d || "").toLowerCase(); return d === "intermediate" ? "moderate" : (d || "moderate"); }
  function pctOf(e, t){ return t ? Math.round(e / t * 100) : 0; }
  function addDays(d, n){ var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }
  function fmtD(d){ return d.getDate() + " " + ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()] + " " + d.getFullYear(); }

  function isBRQuiz(key, EXAMS){
    var e = EXAMS[key];
    return !!(e && (e.classes || []).some(function(c){ return /^10BR/i.test(c); }));
  }
  function isBRPaper(key, PAPERS){
    var p = PAPERS[key];
    return !!(p && (p.classes || []).some(function(c){ return /^10BR/i.test(c); }));
  }

  // ---------- Analysis ----------
  // attempts: normalised practice-quiz attempts (admin.html normalizeAttempt)
  // examAttempts: normalised exam-paper attempts
  // Returns [{key,name,className,...analysis}] for every 10BR student.
  function analyse(attempts, examAttempts, EXAMS, PAPERS, now){
    now = now || new Date();
    var students = {}, order = [];
    function stu(a){
      var key = a.uid || ((a.name || "") + "|" + (a.className || ""));
      if(!students[key]){ students[key] = { key:key, uid:a.uid, name:a.name || "(no name)", className:a.className || "", quizBest:{}, paperBest:{} }; order.push(key); }
      var s = students[key];
      if(a.className && !s.className) s.className = a.className;
      return s;
    }
    // Best attempt per quiz. A retake replaces the first attempt's answers in the
    // database, so the per-question detail always comes from the stored attempt;
    // the headline score is the higher of first attempt and retake.
    (attempts || []).forEach(function(a){
      if(!isBRQuiz(a.exam, EXAMS)) return;
      var s = stu(a);
      var cur = s.quizBest[a.exam];
      var firstPct = (a.firstAttempt && a.firstAttempt.total) ? pctOf(a.firstAttempt.score, a.firstAttempt.total) : null;
      var pct = a.total ? pctOf(a.score, a.total) : 0;
      var bestPct = firstPct != null ? Math.max(firstPct, pct) : pct;
      var cand = { a:a, pct:pct, bestPct:bestPct, firstPct:firstPct, abandoned:!!a.abandoned };
      if(!cur || (cur.abandoned && !cand.abandoned) || (cur.abandoned === cand.abandoned && cand.bestPct > cur.bestPct)) s.quizBest[a.exam] = cand;
    });
    (examAttempts || []).forEach(function(a){
      if(!isBRPaper(a.paperKey, PAPERS)) return;
      var s = stu(a);
      var cur = s.paperBest[a.paperKey];
      var pct = a.totalMarks ? pctOf(a.totalEarned, a.totalMarks) : (a.pct || 0);
      if(!cur || pct > cur.pct) s.paperBest[a.paperKey] = { a:a, pct:pct };
    });

    return order.map(function(k){ return buildStudent(students[k], EXAMS, PAPERS, now); })
      .sort(function(x, y){ return (x.className + x.name).localeCompare(y.className + y.name); });
  }

  function buildStudent(s, EXAMS, PAPERS, now){
    var subs = {};
    SUBTOPICS.forEach(function(st){
      subs[st.id] = { id:st.id, earned:0, total:0, questions:0, qE:0, qT:0, pE:0, pT:0, sources:{}, tags:{} };
    });
    var diff = { easy:{e:0,t:0}, moderate:{e:0,t:0}, hard:{e:0,t:0} };
    var unanswered = 0, partial = 0, answeredPaperQs = 0, hintsUsed = 0, hintsOnHard = 0, questionsSeen = 0;
    var overallE = 0, overallT = 0, bestE = 0, bestT = 0;
    var retakes = [], quizList = [], paperList = [];

    function add(subId, tag, e, t, kind, srcKey, srcLabel){
      var x = subs[subId]; if(!x) return;
      x.earned += e; x.total += t; x.questions += 1;
      if(kind === "quiz"){ x.qE += e; x.qT += t; } else { x.pE += e; x.pT += t; }
      var sc = x.sources[srcKey] || (x.sources[srcKey] = { key:srcKey, label:srcLabel, kind:kind, e:0, t:0 });
      sc.e += e; sc.t += t;
      var tg = x.tags[tag] || (x.tags[tag] = { tag:tag, e:0, t:0 });
      tg.e += e; tg.t += t;
    }

    Object.keys(s.quizBest).forEach(function(key){
      var best = s.quizBest[key], a = best.a, exam = EXAMS[key];
      var label = exam.title;
      bestE += best.bestPct / 100 * (a.total || 0); bestT += (a.total || 0);
      quizList.push({ key:key, label:label, pct:best.bestPct, attemptNumber:a.attemptNumber, partial:best.abandoned });
      if(best.firstPct != null && a.attemptNumber > 1) retakes.push({ label:label, first:best.firstPct, retake:best.pct });
      exam.questions.forEach(function(q, i){
        var m = qMarks(q);
        var sel = (a.answers || [])[i];
        var answered = !(sel === undefined || sel === null || sel < 0);
        var hint = !!((a.hints || [])[i]);
        var earned = (answered && sel === q.correct) ? Math.max(0, m - (hint ? 1 : 0)) : 0;
        if(!answered) unanswered++;
        if(hint){ hintsUsed++; if(q.difficulty === "hard") hintsOnHard++; }
        questionsSeen++;
        var d = diff[normDiff(q.difficulty)] || diff.moderate;
        d.e += earned; d.t += m;
        overallE += earned; overallT += m;
        var sid = mapTopic(q.topic, key);
        if(sid) add(sid, q.topic, earned, m, "quiz", key, label);
      });
    });

    Object.keys(s.paperBest).forEach(function(key){
      var best = s.paperBest[key], a = best.a, paper = PAPERS[key];
      var label = paper.title;
      bestE += Number(a.totalEarned) || 0; bestT += Number(a.totalMarks) || 0;
      paperList.push({ key:key, label:label, pct:best.pct, earned:a.totalEarned, total:a.totalMarks });
      (a.perQuestion || []).forEach(function(pq){
        var t = Number(pq.total) || 0, e = Number(pq.earned) || 0;
        if(!t) return;
        questionsSeen++;
        var d = diff[normDiff(pq.difficulty)] || diff.moderate;
        d.e += e; d.t += t;
        overallE += e; overallT += t;
        var txt = String(pq.answerText || "").replace(/\s+/g, "");
        if(txt) answeredPaperQs++;
        if(!txt && e === 0) unanswered++;
        else if(e > 0 && e < t) partial++;
        var sid = mapTopic(pq.topic, key);
        if(sid) add(sid, pq.topic, e, t, "paper", key, label);
      });
    });

    // Per sub-topic result
    var rows = SUBTOPICS.map(function(st){
      var x = subs[st.id];
      if(st.assessed === false || x.questions === 0){
        return { id:st.id, sec:st.sec, secTitle:st.secTitle, title:st.title, rating:"none", pct:null, questions:0, qPct:null, pPct:null };
      }
      var pct = pctOf(x.earned, x.total);
      return { id:st.id, sec:st.sec, secTitle:st.secTitle, title:st.title, earned:x.earned, total:x.total, questions:x.questions,
        pct:pct, qPct:x.qT ? pctOf(x.qE, x.qT) : null, pPct:x.pT ? pctOf(x.pE, x.pT) : null,
        rating:ratingFor(pct, x.questions), data:x };
    });

    var rated = rows.filter(function(r){ return r.rating === "secure" || r.rating === "developing" || r.rating === "needs"; });
    var weakest = rated.slice().sort(function(a, b){ return a.pct - b.pct; }).slice(0, 3).filter(function(r){ return r.rating !== "secure"; });
    var strongest = rated.slice().sort(function(a, b){ return b.pct - a.pct; }).slice(0, 3).filter(function(r){ return r.rating === "secure" || r.pct >= THRESH_DEVELOPING; });

    function weakTags(r){
      return Object.keys(r.data.tags).map(function(k){ return r.data.tags[k]; })
        .filter(function(t){ return t.t > 0 && t.e / t.t < 0.6; })
        .sort(function(a, b){ return a.e / a.t - b.e / b.t; }).slice(0, 4).map(function(t){ return t.tag; });
    }

    // ---- Exam technique ----
    var technique = [];
    function dPct(k){ return diff[k].t ? pctOf(diff[k].e, diff[k].t) : null; }
    var easyP = dPct("easy"), modP = dPct("moderate"), hardP = dPct("hard");
    if(easyP != null && diff.easy.t >= 5){
      if(easyP < THRESH_SECURE) technique.push({ level:"warn", text:"Easy questions: " + easyP + "% (" + (diff.easy.t - diff.easy.e) + " marks lost). Basic recall is the quickest place to gain marks - revise definitions and key terms first." });
      else technique.push({ level:"ok", text:"Easy questions: " + easyP + "% - the basics are secure." });
    }
    if(modP != null && diff.moderate.t >= 5) technique.push({ level: modP < THRESH_DEVELOPING ? "warn" : "ok", text:"Moderate questions: " + modP + "%." });
    if(hardP != null && diff.hard.t >= 4){
      technique.push({ level: hardP < THRESH_DEVELOPING ? "info" : "ok", text:"Hard questions: " + hardP + "%" + (hardP < THRESH_DEVELOPING ? " - normal while the basics are still being secured; aim to consolidate easy and moderate marks first." : ".") });
    }
    if(unanswered > 0) technique.push({ level:"warn", text: unanswered + " question" + (unanswered === 1 ? "" : "s") + " left unanswered or scored with no answer. Always attempt every question - there is no negative marking." });
    if(partial > 0) technique.push({ level:"warn", text: partial + " written answer" + (partial === 1 ? "" : "s") + " earned only part of the marks: the idea was there but key terms or points were missing. Learn the mark-scheme wording (see the 'Mark scheme' view after each paper)." });
    if(hintsUsed > 0) technique.push({ level:"info", text:"Used " + hintsUsed + " hint" + (hintsUsed === 1 ? "" : "s") + " in practice quizzes (" + hintsOnHard + " on hard questions). Hints cost marks - try the question before opening one." });
    retakes.forEach(function(r){
      var diffPts = r.retake - r.first;
      technique.push({ level: diffPts > 0 ? "ok" : "info", text:"Retake of " + r.label + ": " + r.first + "% -> " + r.retake + "% (" + (diffPts >= 0 ? "+" : "") + diffPts + " points)." });
    });
    if(!paperList.length) technique.push({ level:"info", text:"No exam-style (written) papers completed yet. These train the extended-answer skills that multiple-choice quizzes cannot." });

    // ---- Action plan ----
    var todo = rows.filter(function(r){ return r.rating === "needs" || r.rating === "developing"; })
      .sort(function(a, b){ return a.pct - b.pct; });
    var plan = todo.slice(0, 6).map(function(r, i){
      var st = SUB_BY_ID[r.id];
      var srcs = Object.keys(r.data.sources).map(function(k){ return r.data.sources[k]; })
        .filter(function(sc){ return sc.t && sc.e / sc.t < 0.7; })
        .sort(function(a, b){ return a.e / a.t - b.e / b.t; });
      var redo = srcs.map(function(sc){ return sc.label + " (" + (sc.kind === "paper" ? "exam paper" : "quiz") + ", now " + pctOf(sc.e, sc.t) + "% on this area)"; });
      var target = r.rating === "needs" ? THRESH_SECURE : 80;
      return {
        priority: i + 1,
        id: r.id, title: r.title, rating: r.rating, pct: r.pct, target: target,
        weakTags: weakTags(r),
        revise: st.revise, tip: st.tip,
        redo: redo.length ? redo : st.redo.map(function(k){ return (EXAMS[k] || PAPERS[k] || {}).title || k; }),
        recheck: fmtD(addDays(now, i < 2 ? 14 : 21))
      };
    });
    var extras = [];
    rows.filter(function(r){ return r.rating === "limited"; }).forEach(function(r){
      extras.push("Only " + r.questions + " question" + (r.questions === 1 ? "" : "s") + " so far on " + r.id + " " + r.title + " - complete the matching quiz or exam paper so this area can be rated.");
    });
    var missing = [];
    Object.keys(EXAMS).forEach(function(k){ if(isBRQuiz(k, EXAMS) && !s.quizBest[k]) missing.push(EXAMS[k].title + " (quiz)"); });
    Object.keys(PAPERS).forEach(function(k){ if(isBRPaper(k, PAPERS) && !s.paperBest[k]) missing.push(PAPERS[k].title + " (exam paper)"); });

    var assessedCount = rows.filter(function(r){ return r.rating !== "none"; }).length;
    return {
      key:s.key, uid:s.uid, name:s.name, className:s.className,
      generated:now, quizzes:quizList, papers:paperList,
      overallPct: pctOf(bestE, bestT),
      rows:rows, weakest:weakest, strongest:strongest, technique:technique, plan:plan, extras:extras, missing:missing,
      assessedCount:assessedCount
    };
  }

  function sectionRollup(rows){
    var secs = {}, order = [];
    rows.forEach(function(r){
      if(!secs[r.sec]){ secs[r.sec] = { sec:r.sec, title:r.secTitle, earned:0, total:0, questions:0, any:false }; order.push(r.sec); }
      var s = secs[r.sec];
      if(r.rating !== "none"){ s.earned += r.earned; s.total += r.total; s.questions += r.questions; s.any = true; }
    });
    return order.map(function(k){
      var s = secs[k];
      s.pct = s.any ? pctOf(s.earned, s.total) : null;
      s.rating = s.any ? ratingFor(s.pct, s.questions) : "none";
      return s;
    });
  }

  root.SyllabusData = {
    SUBTOPICS: SUBTOPICS, SUB_BY_ID: SUB_BY_ID, RATING_LABEL: RATING_LABEL,
    THRESH_SECURE: THRESH_SECURE, THRESH_DEVELOPING: THRESH_DEVELOPING, MIN_QUESTIONS: MIN_QUESTIONS,
    mapTopic: mapTopic, ratingFor: ratingFor, analyse: analyse, sectionRollup: sectionRollup
  };
})(typeof window !== "undefined" ? window : this);
