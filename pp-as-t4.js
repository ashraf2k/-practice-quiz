/* 11BR past-paper questions for iLearn topic 4 (Processor fundamentals), objectives 4.1.1 to 4.3.1. Wording and mark-scheme text as published (9618 Paper 1). */
(function(){
  var A = window.PPAS, Q = A.Q, kw = A.kw, val = A.v, re = A.re, AR = "←";
  var ISET = "Instruction set (part):\nOpcode  Operand      Explanation\nLDM     #n           Immediate addressing. Load the number n to ACC\nLDD     <address>    Direct addressing. Load the contents of the location at the given address to ACC\nLDI     <address>    Indirect addressing. The address to be used is at the given address. Load the contents of this second address to ACC\nLDX     <address>    Indexed addressing. Form the address from <address> + the contents of the index register. Copy the contents of this calculated address to ACC\nLDR     #n           Immediate addressing. Load the number n to IX\nADD     #n/Bn/&n     Add the number n to the ACC\nADD     <address>    Add the contents of the given address to the ACC\nSUB     #n/Bn/&n     Subtract the number n from the ACC\nSUB     <address>    Subtract the contents of the given address from the ACC\nINC     <register>   Add 1 to the contents of the register (ACC or IX)\n<address> can be an absolute or a symbolic address.  # denotes a denary number, e.g. #123.  B denotes a binary number.  & denotes a hexadecimal number.";

  /* 4.1.1 Von Neumann model and registers: 9618/12 Oct/Nov 2024 Q3(a) */
  var q411 = Q("AS-N24-12-3a", "3", "Purpose of registers", "A student has a computer. The computer is designed using the Von Neumann model for a computer system.",
    [ { id: "a1", label: "(a)", text: "Complete the table by describing the purpose of each of the given registers.\n\nRegister                          Purpose\nProgram Counter (PC)", marks: 1, lines: 2 },
      { id: "a2", label: "", text: "Memory Address Register (MAR)", marks: 1, lines: 2 },
      { id: "a3", label: "", text: "Memory Data Register (MDR)", marks: 1, lines: 2 },
      { id: "a4", label: "", text: "Index Register (IX)", marks: 1, lines: 2 } ],
    [ kw("PC: stores the address of the next instruction to be fetched/executed", 1, "a1", [["address of the next", "next instruction", "address of the instruction"]]),
      kw("MAR: stores the address of the memory location where data will be read from/written to", 1, "a2", [["address"], ["read", "written", "write", "fetched", "memory location", "location", "accessed", "being used"]]),
      kw("MDR: stores the data read from the address in the MAR // the data to be written to the address in the MAR", 1, "a3", [["data"], ["read", "written", "write", "fetched", "from memory", "to memory", "transferred", "copied"]]),
      kw("IX: stores a number that will be added to the operand to form the address of the data", 1, "a4", [["added to", "add to", "added", "plus", "offset", "modif"], ["operand", "address"]]) ],
    [ { q: "3(a)", lead: "1 mark for each correct purpose", ans: ["Program Counter (PC): Stores the address of the next instruction to be fetched/executed", "Memory Address Register (MAR): Stores the address of the memory location where data will be read from/written to", "Memory Data Register (MDR): Stores the data read from the address in the MAR // stores the data to be written to the address in the MAR", "Index Register (IX): Stores a number that will be added to the operand, to form the address of the data"], marks: "4", guide: [] } ],
    "PC → address of the next instruction; MAR → address being accessed; MDR → the data being read or written; IX → a value added to an address for indexed addressing.", A.ctx("n2024", 12));

  /* 4.1.2 Roles of CU, system clock and buses: 9618/13 May/June 2023 Q7(b) */
  var q412 = Q("AS-J23-13-7b", "7", "Control unit, system clock and control bus", "A computer stores data in binary form. The computer has a Control Unit (CU), system clock and control bus.",
    [ { id: "b", label: "(b)", text: "Explain how the CU, system clock and control bus operate to transfer data between the components of the computer system.", marks: 4, lines: 8 } ],
    [ kw("(b) Max 4: system clock gives out timing signals; sent on the control bus; to synchronise the other system components; the CU initiates data transfer; by generating signals sent on the control bus to other components", 4, "b",
        [["timing signal", "clock signal", "clock pulses", "clock sends", "clock generates", "clock gives", "clock produces", "timing pulse"], ["control bus"], ["synchronis", "synchroniz", "in step", "coordinate", "co-ordinate", "timed"], ["control unit initiates", "cu initiates", "initiates", "cu starts", "cu begins", "cu controls", "cu sends"], ["generat", "signals", "signal"]], true) ],
    [ { q: "7(b)", lead: "1 mark each to max 4", ans: ["The system clock gives out timing signals", "… which are sent on the control bus", "… to synchronise the other system components", "The Control Unit initiates data transfer", "… by generating signals that are sent on the control bus to other components"], marks: "4", guide: [] } ],
    "The system clock produces regular timing pulses. These travel on the control bus so all components work in step. The CU starts each data transfer by sending control signals on the control bus.", A.ctx("j2023", 13));

  /* 4.1.3 Performance and ports: 9618/12 May/June 2023 Q5(b),(c) */
  var q413 = Q("AS-J23-12-5bc", "5", "Computer performance and ports", "A student has purchased a new laptop.",
    [ { id: "b1", label: "(b)", text: "Describe two ways the hardware of a laptop can be upgraded to improve the performance and explain how each upgrade improves the performance.\n1", marks: 2, lines: 4 },
      { id: "b2", label: "", text: "2", marks: 2, lines: 4 },
      { id: "c1", label: "(c)(i)", text: "Peripherals are connected to the laptop using ports.\nA printer is connected to a Universal Serial Bus (USB) port.\nDescribe how data is transmitted through a USB port.", marks: 1, lines: 3 },
      { id: "c2", label: "(c)(ii)", text: "A monitor is connected to the laptop using a different type of port.\nIdentify one other type of port that can be used to connect the monitor.", marks: 1, lines: 1 } ],
    [ kw("(b) Upgrade 1 and how it improves performance (e.g. more cores: each core carries out a process at the same time; more RAM: more applications in memory, less disk access; more cache; faster clock speed: more F-E cycles per second)", 2, "b1|b2",
        [["cores", "core", "re:\\bram\\b", "memory", "cache", "clock speed", "processor speed", "ssd", "solid state", "graphics"], ["same time", "parallel", "more applications", "less disk", "fewer disk", "faster access", "more cycles", "per second", "less time", "quicker", "speed", "faster"]], true),
      kw("(b) Second upgrade with its explanation (different from the first)", 2, "b1|b2",
        [["cores", "core", "re:\\bram\\b", "memory", "cache", "clock speed", "processor speed", "ssd", "solid state", "graphics"], ["same time", "parallel", "more applications", "less disk", "fewer disk", "faster access", "more cycles", "per second", "less time", "quicker", "speed", "faster"]], true),
      kw("(c)(i) One from: 1 bit transferred at a time (serial); can be synchronous or asynchronous; USB 3 is full duplex, earlier versions half duplex", 1, "c1", [["1 bit", "one bit", "serial", "one at a time", "bit at a time", "synchronous", "asynchronous", "duplex"]]),
      kw("(c)(ii) HDMI / DisplayPort (VGA, DVI also acceptable)", 1, "c2", [["hdmi", "displayport", "display port", "vga", "dvi", "thunderbolt", "usb-c", "usb c"]]) ],
    [ { q: "5(b)", lead: "1 mark for description; 1 mark for corresponding explanation (Examples)", ans: ["Increase number of cores – each core can independently carry out a process at the same time // so that more instructions are performed in parallel", "Increase RAM capacity … allowing more applications to reside in memory at the same time, saving disk access times", "Increase cache memory – more data can be stored in fast access so less time is spent accessing from RAM", "Increase clock speed – more Fetch-Decode-Execute (FDE) cycles can run each second / per unit time"], marks: "4", guide: [] },
      { q: "5(c)(i)", lead: "1 mark for a correct answer", ans: ["1 bit is transferred at a time", "Can be synchronous or asynchronous", "USB-3 is full duplex and earlier versions are half-duplex"], marks: "1", guide: [] },
      { q: "5(c)(ii)", lead: "1 mark for identification of a suitable port", ans: ["HDMI", "DisplayPort"], marks: "1", guide: [] } ],
    "Performance improves with more cores (parallel work), more RAM and cache (less waiting for slow storage) and a faster clock (more F-E cycles per second). USB sends data serially, one bit at a time.", A.ctx("j2023", 12));

  /* 4.1.4 Fetch-execute cycle and register transfer notation: 9618/13 Oct/Nov 2023 Q9(b) */
  var q414 = Q("AS-N23-13-9b", "9", "Fetch-execute cycle in register transfer notation", "A computer system is designed using the basic Von Neumann model.",
    [ { id: "b1", label: "(b)", text: "The following incomplete table contains steps of the Fetch-Execute (F-E) cycle and their descriptions.\nComplete the table by writing the missing steps using register transfer notation and the missing descriptions.\n\nStep                       Description\n........                   The address in PC is incremented.\nMDR " + AR + " [[MAR]]            ........\nMAR " + AR + " [PC]              ........\n........                   The contents of MDR are copied into CIR.\n\nRow 1: write the missing step.", marks: 1, lines: 1 },
      { id: "b2", label: "", text: "Row 2: write the missing description for MDR " + AR + " [[MAR]].", marks: 1, lines: 2 },
      { id: "b3", label: "", text: "Row 3: write the missing description for MAR " + AR + " [PC].", marks: 1, lines: 2 },
      { id: "b4", label: "", text: "Row 4: write the missing step.", marks: 1, lines: 1 } ],
    [ kw("Row 1: PC ← [PC] + 1", 1, "b1", [[re("pc\\s*(" + AR + "|<-|<–|=)\\s*\\[\\s*pc\\s*\\]\\s*\\+\\s*1")]]),
      kw("Row 2: the data in the location pointed to by the MAR is copied to the MDR", 1, "b2", [["mdr"], ["mar", "location", "address"], ["copied", "copy", "transfer", "loaded", "stored in", "placed"]]),
      kw("Row 3: the contents of PC are copied to the MAR", 1, "b3", [["pc"], ["mar"], ["copied", "copy", "transfer", "loaded", "stored in", "placed"]]),
      kw("Row 4: CIR ← [MDR]", 1, "b4", [[re("cir\\s*(" + AR + "|<-|<–|=)\\s*\\[\\s*mdr\\s*\\]")]]) ],
    [ { q: "9(b)", lead: "1 mark for each correct answer (shaded cells)", ans: ["Step: PC " + AR + " [PC] + 1   Description: The address in PC is incremented.", "Step: MDR " + AR + " [[MAR]]   Description: The data in the location pointed to by the MAR is copied to the MDR.", "Step: MAR " + AR + " [PC]   Description: The contents of PC are copied to the MAR.", "Step: CIR " + AR + " [MDR]   Description: The contents of MDR are copied into CIR."], marks: "4", guide: [] } ],
    "Fetch: MAR ← [PC]; PC ← [PC] + 1; MDR ← [[MAR]]; CIR ← [MDR]. Square brackets mean “the contents of”; double brackets mean “the contents of the location whose address is held in”.", A.ctx("n2023", 13));

  /* 4.1.5 Interrupts: 9618/12 May/June 2025 Q1(c) */
  var q415 = Q("AS-J25-12-1c", "1", "Interrupts and the F-E cycle", "",
    [ { id: "c", label: "(c)", text: "Explain how an interrupt from an input device will be detected and handled in the F-E cycle.", marks: 4, lines: 8 } ],
    [ kw("(c) Max 4: at the start/end of the F-E cycle the interrupt register is checked; the priority of any waiting interrupts is checked; if higher than the current process the register contents are stored on the stack; the relevant ISR is called; when the ISR has finished a further check is made; if no higher priority interrupts the registers are restored and the next F-E cycle continues", 4, "c",
        [["interrupt register", "interrupt flag", "checked", "check for", "checks for"], ["priority"], ["stack", "contents of the registers", "registers are saved", "saves the", "stored"], ["isr", "interrupt service", "interrupt handler", "handler"], ["further check", "another check", "check again", "higher priority interrupts"], ["restored", "restore", "next f-e", "next fetch", "continues", "resume"]], true) ],
    [ { q: "1(c)", lead: "1 mark each to max 4", ans: ["At the start / end of FE cycle the interrupt register is checked", "The priority of any interrupts waiting is checked", "if the priority of the interrupt is higher than the current process", "the contents of the registers are stored on the stack", "The relevant Interrupt Service Routine (ISR) / interrupt handler is called to process the interrupt", "When the ISR has finished, a further check is made for higher priority interrupts", "if no more interrupts of higher priority, the register contents are restored and the next FE cycle continues"], marks: "4", guide: [] } ],
    "At the end of each F-E cycle the processor checks for interrupts. If one has a higher priority it saves the registers on a stack, runs the ISR, then restores the registers and carries on.", A.ctx("j2025", 12));

  /* 4.2.1 Assembly language and the two-pass assembler: 9618/12 May/June 2023 Q3(a) */
  var q421 = Q("AS-J23-12-3a", "3", "Two-pass assembler", "A program is written in assembly language. The program is converted into machine code by a two-pass assembler.",
    [ { id: "a1", label: "(a)", text: "Draw one or more lines to identify the pass or passes in which each action takes place.\n(Here, write the pass – first, second or both – next to each action.)\n\nAction                                                    Pass\ngenerates object code", marks: 1, lines: 1 },
      { id: "a2", label: "", text: "reads the source code one line at a time", marks: 1, lines: 1 },
      { id: "a3", label: "", text: "removes white space  AND  adds labels to the symbol table", marks: 1, lines: 1 } ],
    [ kw("generates object code → second pass", 1, "a1", [[re("^\\s*(the\\s*)?(2nd|second)\\s*(pass)?\\s*$"), re("\\bsecond\\b"), re("\\b2nd\\b"), re("^\\s*2\\s*$")]]),
      kw("reads the source code one line at a time → both passes", 1, "a2", [[re("\\bboth\\b"), re("(first|1st).{0,20}(second|2nd|and|&)"), re("(second|2nd).{0,20}(first|1st|and|&)")]]),
      kw("removes white space and adds labels to the symbol table → first pass", 1, "a3", [[re("\\bfirst\\b"), re("\\b1st\\b"), re("^\\s*1\\s*$")]]) ],
    [ { q: "3(a)", lead: "1 mark for generates object code to second pass; 1 mark for reads source code one line at a time to both boxes; 1 mark for removes white space and adds labels to first pass", ans: ["generates object code → second pass", "reads the source code one line at a time → first pass and second pass", "removes white space → first pass", "adds labels to the symbol table → first pass"], marks: "3", guide: [] } ],
    "First pass: read each line, remove white space and comments, build the symbol table of labels. Second pass: use the symbol table to generate the object code.", A.ctx("j2023", 12));

  /* 4.2.2 Tracing assembly programs: 9618/12 May/June 2024 Q5(a) */
  var q422 = Q("AS-J24-12-5a", "5", "Tracing assembly language programs",
    "The following table shows part of the instruction set for a processor. The processor has two registers: the Accumulator (ACC) and an Index Register (IX).\n\n" + ISET,
    [ { id: "a0", label: "(a)", text: "The current contents of memory are shown:\n\nAddress  Data\n10       1\n11       3\n12       5\n13       11\n14       10\n15       16\n16       12\n\nThe current contents of the ACC and IX are shown:  ACC 10   IX 0\n\nComplete the table by writing the content of the ACC after each program has run.\n\nProgram 1:  LDI 15 ; SUB #1\nACC content", marks: 1, lines: 1, work: 3 },
      { id: "a1", label: "", text: "Program 2:  LDD 14 ; ADD 11\nACC content", marks: 1, lines: 1, work: 2 },
      { id: "a2", label: "", text: "Program 3:  LDM #11 ; ADD #3 ; SUB 16\nACC content", marks: 1, lines: 1, work: 2 },
      { id: "a3", label: "", text: "Program 4:  LDR #2 ; LDX 14 ; ADD #2\nACC content", marks: 1, lines: 1, work: 2 } ],
    [ val("Program 1: ACC = 11", "a0", ["11"]), val("Program 2: ACC = 13", "a1", ["13"]), val("Program 3: ACC = 2", "a2", ["2"]), val("Program 4: ACC = 14", "a3", ["14"]) ],
    [ { q: "5(a)", lead: "1 mark for each correct answer:", ans: ["Program 1:  LDI 15, SUB #1  →  11", "Program 2:  LDD 14, ADD 11  →  13", "Program 3:  LDM #11, ADD #3, SUB 16  →  2", "Program 4:  LDR #2, LDX 14, ADD #2  →  14"], marks: "4", guide: [] } ],
    "Program 1: LDI 15 → address 15 holds 16, so load from address 16 (12); minus 1 = 11. Program 2: LDD 14 = 10, plus mem[11] (3) = 13. Program 3: 11 + 3 = 14, minus mem[16] (12) = 2. Program 4: IX = 2, LDX 14 loads mem[16] = 12, plus 2 = 14.", A.ctx("j2024", 12));

  /* 4.3.1 Bit manipulation and shifts: 9618/13 May/June 2026 Q7(b),(c) */
  var q431 = Q("AS-J26-13-7bc", "7", "Bit manipulation and shifts", "A program is written in assembly language.",
    [ { id: "b", label: "(b)", text: "Explain how bit manipulation can be used to monitor or control a device.", marks: 3, lines: 6 },
      { id: "c1", label: "(c)", text: "Identify one similarity and one difference between a right logical shift and a right arithmetic shift.\n\nsimilarity", marks: 1, lines: 2 },
      { id: "c2", label: "", text: "difference", marks: 1, lines: 3 } ],
    [ kw("(b) Max 3: bit manipulation changes/evaluates the state of a bit (masking); monitoring: establish the state of a device by testing a single bit; controlling: change the state of a device by setting/clearing/toggling a single bit", 3, "b",
        [["masking", "mask", "change the state", "evaluate the state", "state of a bit", "individual bit", "single bit"], ["monitor", "read input", "test", "check the state", "state of a device", "observ"], ["control", "set", "clear", "toggle", "change the state of a device", "output"]], true),
      kw("(c) Similarity: both lose the least significant bit(s) // lose bits from the right of the number", 1, "c1", [["least significant", "lsb", "lose", "lost", "shifted out", "right", "move to the right", "bits are shifted"]]),
      kw("(c) Difference: arithmetic keeps the sign/MSB while logical does not; MSBs filled with 0 for logical and copies of the sign bit for arithmetic", 1, "c2", [["sign"], ["arithmetic"], ["logical"], ["0", "zero", "copies", "copy"]]) ],
    [ { q: "7(b)", lead: "1 mark each to max 3", ans: ["Bit manipulation allows a change/evaluation of the state/value of a bit // masking", "Monitoring: When monitoring, bit manipulation can be used to establish the state of a device (read inputs) … by testing/observing the state of an individual bit", "Controlling: When controlling bit manipulation can be used to change the state of a device (control output) … by setting/clearing/toggling a single bit … or by clearing a byte"], marks: "3", guide: [] },
      { q: "7(c)", lead: "1 mark for similarity: 1 mark for difference", ans: ["Both lose the Least Significant Bit(s) (LSB) // both lose bit(s) from the right of the number", "Arithmetic retains sign/MSB while logical does not retain sign/MSB", "MSBs are filled with 0 for logical and copies of the sign bit for arithmetic."], marks: "2", guide: ["For difference, must have both sides."] } ],
    "Masking with AND, OR and XOR tests, sets, clears or toggles single bits that represent device states. A logical right shift fills with 0s; an arithmetic right shift copies the sign bit.", A.ctx("j2026", 13));

  A.paper("4.1.1", "Von Neumann model and registers", [q411]);
  A.paper("4.1.2", "ALU, CU, system clock and buses", [q412]);
  A.paper("4.1.3", "Computer performance and ports", [q413]);
  A.paper("4.1.4", "Fetch-execute cycle and register transfer notation", [q414]);
  A.paper("4.1.5", "Interrupts", [q415]);
  A.paper("4.2.1", "Assembly language and the assembler", [q421]);
  A.paper("4.2.2", "Tracing assembly programs and addressing modes", [q422]);
  A.paper("4.3.1", "Bit manipulation and shifts", [q431]);
})();
