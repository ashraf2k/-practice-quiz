/* 11BR past-paper questions for iLearn topic 5 (System software), objectives 5.1.1 to 5.2.2. Wording and mark-scheme text as published (9618 Paper 1). */
(function(){
  var A = window.PPAS, Q = A.Q, kw = A.kw, val = A.v, re = A.re;

  /* 5.1.1 Operating systems: 9618/12 May/June 2023 Q5(d) */
  var q511 = Q("AS-J23-12-5d", "5", "Operating system and utility software", "A laptop has systems software.",
    [ { id: "d1", label: "(d)(i)", text: "Describe how the Operating System (OS) manages processes in the computer.", marks: 5, lines: 8 },
      { id: "d2", label: "(d)(ii)", text: "Describe the purpose of utility software in a computer.", marks: 2, lines: 4 } ],
    [ kw("(d)(i) Max 5: manages the scheduling of processes / decides the order to run them; manages which resources processes require (such as allocating memory); enables processes to share data; prevents interference between processes / resolves conflicts; handles the process queue; allows multi-tasking / multi-processing; by ensuring fair access, handling priorities and handling interrupts", 5, "d1",
        [["schedul", "order to run", "which order", "order in which"], ["resources", "allocat", "memory"], ["share data", "sharing data", "share information"], ["interfere", "conflict", "do not affect each other", "separate"], ["queue"], ["multi-task", "multitask", "multi task", "multi-process", "multiprocess", "multi process", "at the same time", "several programs"], ["fair", "priorit", "interrupt"]], true),
      kw("(d)(ii) Max 2: helps users to set up / configure / analyse / optimise / maintain the computer; by for example making memory allocation more efficient / checking the system for faults", 2, "d2",
        [["set up", "set-up", "configure", "analyse", "analyze", "optimise", "optimize", "maintain", "manage the computer", "maintenance"], ["efficient", "memory allocation", "faults", "errors", "defragment", "check", "scan", "virus", "backup", "compress", "disk"]], true) ],
    [ { q: "5(d)(i)", lead: "1 mark each to max 5", ans: ["Manages the scheduling of processes // decides which order to run processes", "Manages which resources the processes require", "… such as allocating memory", "Enables processes to share data", "Prevents interference between processes // resolution of conflicts", "Handles the process queue", "It allows multi-tasking / multi-processing", "… by ensuring fair access, handling priorities and handling interrupts"], marks: "5", guide: [] },
      { q: "5(d)(ii)", lead: "1 mark each to max 2", ans: ["To help users to set-up / configure / analyse / optimise / maintain the computer …", "… by for example, making memory allocation more efficient", "… by for example, checking the system for faults"], marks: "2", guide: [] } ],
    "The OS schedules processes, allocates memory and other resources, keeps processes from interfering with each other and lets them share data. Utility software helps the user to set up, analyse, optimise and maintain the computer, for example by checking for faults or defragmenting a disk.", A.ctx("j2023", 12));

  /* 5.1.2 Utility software and program libraries: 9618/13 May/June 2024 Q7(e) */
  var q512 = Q("AS-J24-13-7e", "7", "Program libraries and DLL files", "Program libraries were used when writing a robot’s software.",
    [ { id: "e1", label: "(e)(i)", text: "State what is meant by a program library.", marks: 1, lines: 2 },
      { id: "e2", label: "(e)(ii)", text: "Some program libraries include Dynamic Link Library (DLL) files.\nDescribe the benefits of a programmer using a library with DLL files instead of using a library that does not include DLL files.", marks: 4, lines: 8 } ],
    [ kw("(e)(i) Pre-written code / functions / routines that can be imported / called in another program", 1, "e1", [["pre-written", "prewritten", "pre written", "already written", "written code", "ready-made", "ready made", "existing code", "functions", "routines", "subroutines", "procedures", "collection of code"]]),
      kw("(e)(ii) Max 4: maintenance does not need to be done by the programmer because the DLL is separate from the program; the calling program does not need recompiling when a DLL file changes because the DLL can be updated independently; updates apply to all programs that use the DLL file", 4, "e2",
        [["maintenance", "maintain", "does not need to be done by the programmer", "programmer does not have to"], ["separate from", "independent", "own file", "stand-alone", "separate file"], ["recompil", "re-compil", "does not need to be compiled", "not need to be rebuilt", "no need to compile"], ["updated", "update", "changes"], ["all programs", "every program", "any program", "programs that use"]], true) ],
    [ { q: "7(e)(i)", lead: "1 mark for:", ans: ["Pre-written code/functions/routines that can be imported/called in another program"], marks: "1", guide: [] },
      { q: "7(e)(ii)", lead: "1 mark each to max 4:", ans: ["Maintenance not needed to be done by the programmer", "… because the DLL is separate from program", "The calling program does not need recompilation by the programmer when a DLL file changes", "… because the DLL file can be updated independently of the calling program", "… updates will apply to all programs that use the DLL file"], marks: "4", guide: [] } ],
    "A program library is a collection of pre-written, tested routines a program can call. A DLL is a separate file loaded when needed: it can be updated on its own, the calling program does not need to be recompiled, and every program that uses it gets the update.", A.ctx("j2024", 13));

  /* 5.2.1 Language translators: 9618/13 May/June 2025 Q3(a) */
  var q521 = Q("AS-J25-13-3a", "3", "Compilers and interpreters", "A programmer is writing a program in a high-level language.",
    [ { id: "a1", label: "(a)", text: "Complete the description of compilers and interpreters by writing the missing words.\n\nA compiler checks all the code before attempting to translate the program. If any errors are found, they are all reported at the same time and the program does not translate or run. If there are no errors found, the compiler produces ........................ (1) which can run without access to the ........................ (2).\n\nAn interpreter translates one line of code and then runs it, before moving to the next line of code. If the line of code has an error, the interpreter ........................ (3) and displays the error. The programmer can correct the error ........................ (4) and then the interpreter continues translating from that point.\n\nMissing word (1)", marks: 1, lines: 1 },
      { id: "a2", label: "", text: "Missing word (2)", marks: 1, lines: 1 },
      { id: "a3", label: "", text: "Missing word (3)", marks: 1, lines: 1 },
      { id: "a4", label: "", text: "Missing word (4)", marks: 1, lines: 1 } ],
    [ kw("(1) an executable file / .exe (object code)", 1, "a1", [["executable", ".exe", "exe file", "object code", "machine code"]]),
      kw("(2) source / program code", 1, "a2", [["source", "program code", "original code", "high-level code", "high level code"]]),
      kw("(3) stops", 1, "a3", [["stop", "halt", "pause"]]),
      kw("(4) immediately / in real-time", 1, "a4", [["immediate", "real-time", "real time", "straight away", "at once", "there and then"]]) ],
    [ { q: "3(a)", lead: "1 mark for each correctly completed term", ans: ["an executable file/.exe", "source/program code", "stops", "immediately/in real-time", "A compiler checks all of the code before attempting to translate the program. If any errors are found, they are all reported at the same time and the program does not translate or run. If there are no errors found, the compiler produces an executable file/.exe which can run without access to the source/program code.", "An interpreter translates one line of code and then runs it, before moving to the next line of code. If the line of code has an error, the interpreter stops and displays the error. The programmer can correct the error immediately/in real-time and then the interpreter continues translating from that point."], marks: "4", guide: [] } ],
    "A compiler translates the whole program and produces an executable file that runs without the source code. An interpreter translates and runs one line at a time and stops at an error, so the programmer can fix it straight away.", A.ctx("j2025", 13));

  /* 5.2.2 IDE features: 9618/13 Oct/Nov 2023 Q5(a) */
  var q522 = Q("AS-N23-13-5a", "5", "IDE features", "A programmer uses an Integrated Development Environment (IDE) to develop a program that monitors air quality.",
    [ { id: "a1", label: "(a)", text: "Describe the following features of a typical IDE.\n\nContext-sensitive prompts", marks: 2, lines: 3 },
      { id: "a2", label: "", text: "Single stepping", marks: 2, lines: 3 } ],
    [ kw("Context-sensitive prompts: shown as the code is being written; the options to complete the statement are shown", 2, "a1", [["as the code is being written", "while typing", "as you type", "as the programmer types", "as the code is typed", "while the code is being", "as code is written", "typing"], ["options", "suggest", "complete the statement", "auto-complete", "autocomplete", "complete the", "list of"]], true),
      kw("Single stepping: allows the program to be executed one line at a time; so that the effects of each statement can be seen", 2, "a2", [["one line at a time", "one statement at a time", "line by line", "one instruction at a time", "step through", "each line"], ["effects", "see the result", "see what", "watch", "variable", "value", "debug", "find error", "locate error"]], true) ],
    [ { q: "5(a)", lead: "1 mark for each bullet point (max 2 for each feature).", ans: ["Context-sensitive prompts:", "• As the code is being written", "• … the options to complete the statement are shown", "Single stepping:", "• allows the programmer to execute the program one line at a time", "• … so that the effects of each statement can be seen"], marks: "4", guide: [] } ],
    "Context-sensitive prompts offer the possible ways to complete a statement as you type. Single stepping runs the program one line at a time so you can see the effect of each statement, which helps find errors.", A.ctx("n2023", 13));

  A.paper("5.1.1", "Operating system and utility software", [q511]);
  A.paper("5.1.2", "Program libraries and DLL files", [q512]);
  A.paper("5.2.1", "Compilers and interpreters", [q521]);
  A.paper("5.2.2", "IDE features", [q522]);
})();
