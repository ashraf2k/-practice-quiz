/* iLearn AS Level (11BR) -- Topic 4 Processor fundamentals (additional lessons). Each ends with a REAL Cambridge 9618 past-paper question. */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx, tbl = root.ASA.tbl, ASA = root.ASA;
  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat([

  { id:"4.1.2a", code:"4.1.2", title:"Inside the CPU: ALU, control unit, clock, IAS and the three buses",
    concept:
      "<p>In the Von Neumann model the processor and memory are connected by buses:</p>" +
      tbl(["Component", "Role"], [["<b>ALU</b> (arithmetic and logic unit)", "does the calculations (+, &minus;) and logic operations (AND, OR, XOR, comparisons)"], ["<b>CU</b> (control unit)", "fetches, decodes and controls the execution of instructions; sends control signals to the other parts"], ["<b>System clock</b>", "sends regular pulses that keep every part in step; clock speed = cycles per second"], ["<b>IAS</b> (immediate access store)", "main memory (RAM) holding the program and data"]]) +
      tbl(["Bus", "Carries", "Direction"], [["Address bus", "the <b>address</b> of the memory location to read or write", "one way (CPU to memory)"], ["Data bus", "the <b>data</b> or instruction being moved", "both ways"], ["Control bus", "<b>control signals</b>: read, write, interrupt, timing / clock", "both ways"]]) +
      "<h4>Special- vs general-purpose registers</h4>" +
      "<p><b>Special-purpose</b> registers (PC, MAR, MDR, CIR, ACC, status register) have a <b>specific job</b> and hold the status of the program. <b>General-purpose</b> registers can be used for <b>any purpose</b> and hold temporary data during operations.</p>",
    example:
      "<p>To read an instruction: the CU puts the address on the <b>address bus</b>; a <b>read</b> signal goes on the <b>control bus</b>; the instruction comes back on the <b>data bus</b>. A <b>write</b> works the same way, with the data going out on the data bus.</p>",
    checks:[
      mc("Which bus carries the memory address?", "Address bus", ["Data bus", "Control bus", "Power bus"], "The address bus carries the location to be accessed."),
      mc("Which component performs arithmetic and logic operations?", "ALU", ["CU", "System clock", "IAS"], "The ALU does the calculations and logic."),
      mc("Which is a signal carried by the control bus?", "Read", ["A memory address", "An instruction", "A file name"], "The control bus carries signals like read, write, interrupt and timing."),
      tx("Identify two types of signal that a control bus can transfer. [2]", [["interrupt"],["timing","clock"],["read"],["write"]], 2, "Any two of: interrupt, timing, read, write."),
      ASA.pp("9618/13 October/November 2023 · Question 9(a)", "Three components other than registers and buses: CU, ALU, IAS (or the clock). Special-purpose registers hold program status and a specific job; general-purpose registers are for any use.",
        [ ASA.text("(a)(i)", 3, "A computer system is designed using the basic Von Neumann model. Registers and buses are components in the model. Identify three other components in the Von Neumann model. Do not include registers or buses in your answers.",
            [ ["Control unit (CU)", ["control unit", "cu"]], ["Arithmetic and Logic Unit (ALU)", ["alu", "arithmetic"]], ["Immediate Access Store (IAS)", ["immediate access", "ias", "memory", "ram", "primary"]], ["System clock", ["clock"]] ],
            { lead: "1 mark for each bullet point, maximum 3:", lines: 3 }),
          ASA.text("(a)(ii)", 2, "Identify two differences between special purpose registers and general purpose registers.",
            [ ["Special purpose registers hold the status of a program whereas general purpose registers hold temporary data while performing operations", ["status", "temporary data", "temporary"]], ["Special purpose registers are specialised for a specific use, whereas general purpose registers are used for any purpose", ["specific", "specialis", "particular", "any purpose", "any use", "general"]], ["General purpose registers can be used by most instructions, whereas special purpose registers can only be used by certain instructions", ["most instructions", "certain instructions", "particular instructions", "only be used", "all instructions", "any instruction"]] ],
            { lead: "1 mark for each bullet point, maximum 2:", lines: 3 }) ])
    ] },

  { id:"4.1.3a", code:"4.1.3", title:"What makes a computer faster, and USB / HDMI ports",
    concept:
      "<p>Computer performance depends on several factors. To <b>describe an upgrade and explain how it helps</b>, you need two statements each time:</p>" +
      tbl(["Upgrade", "Why performance improves"], [["More <b>processor cores</b>", "each core can carry out a process independently <b>at the same time</b>, so more instructions run in parallel"], ["More <b>RAM</b>", "more applications and data stay in memory at once, saving slow disk accesses"], ["Bigger <b>cache</b>", "more data and instructions in fast memory, so less time is spent fetching from RAM"], ["Higher <b>clock speed</b>", "more fetch-decode-execute cycles per second"], ["Faster storage (SSD) / bigger word length / faster bus", "data reaches the CPU more quickly"]]) +
      "<h4>Ports</h4>" +
      "<ul><li><b>USB</b> (universal serial bus): data is sent <b>one bit at a time</b> (serial); USB 3 is full duplex, earlier versions half duplex.</li><li><b>HDMI / DisplayPort</b>: connect a monitor and carry video (and audio).</li></ul>",
    example:
      "<p>A student's laptop runs slowly when many programs are open. Upgrading the RAM from 4 GB to 16 GB is a good answer: <i>'Increase the RAM capacity (description) &mdash; this allows more applications to be held in memory at the same time, saving disk access time (explanation)'</i>. Writing only 'get more RAM' scores one mark at most.</p>",
    checks:[
      mc("Increasing the clock speed improves performance because&hellip;", "More fetch-decode-execute cycles can run each second", ["More data can be stored in the cache", "The programs are shorter", "The OS uses less memory"], "Clock speed = cycles per second."),
      mc("How does adding processor cores help?", "Each core can process instructions at the same time", ["It makes the RAM non-volatile", "It removes the need for an OS", "It increases the screen size"], "More cores means more parallel processing."),
      mc("How does USB transfer data?", "One bit at a time", ["Eight bits at once on parallel wires", "As analogue sound", "Only in one direction"], "USB is a serial interface."),
      tx("Identify one other port (not USB) that can connect a monitor. [1]", [["hdmi","displayport","display port","vga","dvi"]], 1, "HDMI or DisplayPort."),
      ASA.pp("9618/12 May/June 2023 · Question 5(b) and (c)", "Each upgrade = one mark for the description AND one for the explanation of how it improves performance. USB sends 1 bit at a time.",
        [ ASA.text("(b)", 4, "Describe two ways the hardware of a laptop can be upgraded to improve the performance and explain how each upgrade improves the performance.",
            [ ["Increase the number of cores", ["core"]], ["... each core can carry out a process independently at the same time // more instructions are performed in parallel", ["parallel", "at the same time", "simultaneous", "independent", "more instructions", "multiple instructions", "more processes"], ["core"]], ["Increase the RAM capacity", ["ram", "memory capacity", "more memory"]], ["... allowing more applications to be in memory at the same time, saving disk access times", ["more applications", "more programs", "more data", "disk access", "virtual memory", "less swapping", "less paging", "fewer"], ["ram", "memory"]], ["Increase the cache memory", ["cache"]], ["... more data can be stored in fast access memory so less time is spent accessing RAM", ["less time", "faster", "fast access", "quicker", "more data", "fewer"], ["cache"]], ["Increase the clock speed", ["clock"]], ["... more Fetch-Decode-Execute cycles can run each second", ["more fetch", "more cycle", "cycles per second", "per second", "more instructions", "each second", "per unit time", "faster"], ["clock"]] ],
            { lead: "1 mark for each description and 1 mark for each corresponding explanation (two upgrades):", max: 4, lines: 6 }),
          ASA.text("(c)(i)", 1, "A printer is connected to a USB port. Describe how data is transmitted through a USB port.",
            [ ["1 bit is transferred at a time // serial // synchronous or asynchronous // USB 3 full duplex, earlier half duplex", ["one bit", "1 bit", "serial", "bit at a time", "bit by bit", "single bit", "synchronous", "asynchronous", "duplex"]] ],
            { lead: "1 mark for a correct answer:", lines: 2 }),
          ASA.fields("(c)(ii)", 1, "A monitor is connected to the laptop using a different type of port. Identify one other type of port that can be used to connect the monitor.",
            [ ["Port", ["hdmi", "displayport", "display port", "vga", "dvi", "thunderbolt"], "text", "HDMI or DisplayPort", 1] ],
            { lead: "1 mark for a suitable port:" }) ])
    ] },

  { id:"4.1.4a", code:"4.1.4", title:"The fetch-execute cycle in register transfer notation",
    concept:
      "<p>Register transfer notation (RTN) shows exactly what moves between registers. Square brackets mean <b>'the contents of'</b>.</p>" +
      tbl(["RTN", "Meaning"], [["MAR &larr; [PC]", "the contents of the PC are copied to the MAR"], ["PC &larr; [PC] + 1", "the address in the PC is incremented"], ["MDR &larr; [[MAR]]", "the data in the location <b>pointed to by the MAR</b> is copied to the MDR (double brackets: contents of the location whose address is in MAR)"], ["CIR &larr; [MDR]", "the contents of the MDR are copied into the CIR"]]) +
      "<p>The <b>fetch</b> stage is these four steps in order: <code>MAR &larr; [PC]</code>, <code>PC &larr; [PC] + 1</code>, <code>MDR &larr; [[MAR]]</code>, <code>CIR &larr; [MDR]</code>. Then the CU <b>decodes</b> the instruction in the CIR and the instruction is <b>executed</b>.</p>",
    example:
      "<p>PC holds 200. Step 1: MAR becomes 200. Step 2: PC becomes 201 (ready for the next instruction). Step 3: the contents of address 200 (say LDD 50) are copied into MDR. Step 4: CIR now holds LDD 50. The CU decodes it and the data at address 50 is loaded to the ACC.</p>" +
      "<p><b>Remember:</b> the PC is incremented <i>during</i> the fetch stage, before the instruction is executed.</p>",
    checks:[
      mc("What does MAR &larr; [PC] mean?", "The contents of the PC are copied to the MAR", ["The MAR is copied to the PC", "PC is incremented", "The data at address PC is loaded"], "Square brackets mean 'the contents of'."),
      mc("What is the first step of the fetch stage?", "MAR &larr; [PC]", ["CIR &larr; [MDR]", "PC &larr; [PC] + 1", "MDR &larr; [[MAR]]"], "The address of the next instruction is copied to the MAR first."),
      mc("Which register holds the instruction currently being decoded?", "CIR", ["PC", "MAR", "ACC"], "Current instruction register."),
      tx("Write, in register transfer notation, the step that increments the program counter. [1]", [["pc"],["+ 1","+1","[pc]"]], 2, "PC <- [PC] + 1"),
      ASA.pp("9618/13 October/November 2023 · Question 9(b)", "The four fetch steps in order: MAR<-[PC], PC<-[PC]+1, MDR<-[[MAR]], CIR<-[MDR]. Type RTN with <- for the arrow.",
        [ ASA.fields("(b)", 4, "Complete the table of steps of the Fetch-Execute cycle (use <b>&lt;-</b> for the arrow, e.g. X &lt;- [Y]).<br><table class='ln-table'><tr><th>Step</th><th>Description</th></tr><tr><td>(1) ?</td><td>The address in PC is incremented.</td></tr><tr><td>MDR &lt;- [[MAR]]</td><td>(2) ?</td></tr><tr><td>MAR &lt;- [PC]</td><td>(3) ?</td></tr><tr><td>(4) ?</td><td>The contents of MDR are copied into CIR.</td></tr></table>",
            [ ["(1) step", ["pc<-[pc]+1", "pc<-[pc]+1", "pc←[pc]+1", "pc <- [pc] + 1"], "text", "PC <- [PC] + 1", 1], ["(2) description", ["data", "location", "pointed", "mar", "address"], "text", "The data in the location pointed to by the MAR is copied to the MDR", 1], ["(3) description", ["contents of pc", "pc", "program counter"], "text", "The contents of PC are copied to the MAR", 1], ["(4) step", ["cir<-[mdr]", "cir←[mdr]", "cir <- [mdr]"], "text", "CIR <- [MDR]", 1] ],
            { lead: "1 mark for each correct answer:" }) ])
    ] },

  { id:"4.2.1a", code:"4.2.1", title:"Assembly language, machine code and the two-pass assembler",
    concept:
      "<p><b>Machine code</b> is binary. <b>Assembly language</b> uses mnemonics (LDD, ADD, STO) and labels instead, and each assembly instruction translates to <b>one machine code instruction</b>. An <b>assembler</b> converts source code to machine code (object code).</p>" +
      "<h4>Two-pass assembler</h4>" +
      tbl(["Pass", "What happens"], [["<b>First pass</b>", "reads the source code <b>one line at a time</b>; <b>removes white space and comments</b>; <b>adds labels to the symbol table</b> (with their addresses)"], ["<b>Second pass</b>", "reads the source one line at a time again; replaces labels using the symbol table; <b>generates the object code</b>"]]) +
      "<p>Why two passes? A label may be used <i>before</i> it is defined (a forward jump), so the assembler must first find every label's address.</p>" +
      "<h4>Addressing modes</h4>" +
      tbl(["Mode", "The operand&hellip;", "Example"], [["Immediate", "<b>is</b> the data", "LDM #5 loads 5"], ["Direct", "holds the <b>address of</b> the data", "LDD 30"], ["Indirect", "holds an address <b>that stores the address</b> of the data", "LDI 30"], ["Indexed", "address + the contents of the index register", "LDX 30"]]),
    example:
      "<p>Memory: address 30 holds 50, address 50 holds 7. <code>LDD 30</code> loads <b>50</b>. <code>LDI 30</code> uses 50 as the address and loads <b>7</b>. <code>LDM #30</code> loads <b>30</b> itself.</p>",
    checks:[
      mc("In which pass does the assembler add labels to the symbol table?", "First pass", ["Second pass", "Both passes", "Neither pass"], "The symbol table is built in pass one."),
      mc("In which pass is the object code generated?", "Second pass", ["First pass", "Both passes", "Neither pass"], "Only the second pass generates object code."),
      mc("Which addressing mode has the operand as the data itself?", "Immediate", ["Direct", "Indirect", "Indexed"], "The operand is the value."),
      tx("Give the name of the addressing mode where the operand holds a memory address that stores the address of the data. [1]", [["indirect"]], 1, "Indirect addressing."),
      ASA.pp("9618/12 May/June 2023 · Question 3(b)", "Direct = operand is the address of the data. Indirect = address that stores the address. Immediate = operand is the data.",
        [ ASA.fields("(b)", 3, "Complete the description of addressing modes by writing the missing term.<br><b>(1)</b> addressing is when the operand holds the memory address of the data.<br><b>(2)</b> addressing is when the operand holds a memory address that stores the memory address of the data.<br><b>(3)</b> addressing is when the operand is the data.",
            [ ["(1)", ["direct"], "text", "Direct", 1], ["(2)", ["indirect"], "text", "Indirect", 1], ["(3)", ["immediate"], "text", "Immediate", 1] ],
            { lead: "1 mark for each correct term:" }),
          ASA.fields("(a) two-pass assembler", 3, "Which pass does each action take place in? Type <b>first</b>, <b>second</b> or <b>both</b>.<br>(1) generates object code &nbsp; (2) reads the source code one line at a time &nbsp; (3) adds labels to the symbol table",
            [ ["(1) generates object code", ["second"], "text", "second", 1], ["(2) reads one line at a time", ["both"], "text", "both", 1], ["(3) adds labels to the symbol table", ["first"], "text", "first", 1] ],
            { lead: "1 mark for each (9618/12 Q3(a) - removes white space is also first pass):" }) ])
    ] },

  { id:"4.2.2a", code:"4.2.2", title:"Tracing assembly language programs",
    concept:
      "<p>To trace a program, follow the instructions in order and keep a note of the ACC (and IX) after each line. Use the memory table carefully &mdash; most mistakes come from mixing up an <b>address</b> and its <b>contents</b>.</p>" +
      tbl(["Instruction", "Meaning"], [["LDM #n", "load the number n to ACC"], ["LDD addr", "load the <b>contents</b> of addr to ACC"], ["LDI addr", "the address to use is <b>stored at</b> addr; load the contents of that second address"], ["LDX addr", "form the address <i>addr + IX</i>; load the contents of that address"], ["LDR #n", "load n to the index register IX"], ["ADD / SUB", "ADD #n adds the number; ADD addr adds the <b>contents</b> of addr"], ["INC reg", "add 1 to ACC or IX"]]),
    example:
      "<p>Memory: 10&rarr;1, 11&rarr;3, 12&rarr;5, 13&rarr;11, 14&rarr;10, 15&rarr;16, 16&rarr;12. <b>LDX trace:</b> <code>LDR #2</code> (IX = 2), <code>LDX 14</code> (address 14 + 2 = 16, which holds 12, so ACC = 12), <code>ADD #2</code> (ACC = 14).</p>",
    checks:[
      mc("Memory: address 20 holds 5, address 5 holds 9. After LDI 20 the ACC contains&hellip;", "9", ["5", "20", "14"], "Indirect: the address stored at 20 is 5, so load the contents of 5, which is 9."),
      mc("After LDM #7, ADD #3, the ACC contains&hellip;", "10", ["7", "3", "73"], "7 + 3 = 10."),
      mc("IX = 2. Which address does LDX 40 read?", "42", ["40", "2", "38"], "40 + 2 = 42."),
      tx("In the trace LDD 14 / ADD 11 with address 14 = 10 and address 11 = 3, what is in the ACC at the end? Show the working. [2]", [["13"],["10","3","add","+"]], 2, "ACC = 10, then ADD the contents of address 11 (3) gives 13."),
      ASA.pp("9618/12 May/June 2024 · Question 5(a)", "Memory: 10→1, 11→3, 12→5, 13→11, 14→10, 15→16, 16→12. ACC starts at 10 and IX at 0 for each program. Work through the four programs one instruction at a time.",
        [ ASA.fields("(a)", 4, "Write the content of the ACC after each program has run.<br><b>Program 1:</b> LDI 15; SUB #1<br><b>Program 2:</b> LDD 14; ADD 11<br><b>Program 3:</b> LDM #11; ADD #3; SUB 16<br><b>Program 4:</b> LDR #2; LDX 14; ADD #2",
            [ ["Program 1 ACC", ["11"], "text", "11", 1], ["Program 2 ACC", ["13"], "text", "13", 1], ["Program 3 ACC", ["2"], "text", "2", 1], ["Program 4 ACC", ["14"], "text", "14", 1] ],
            { lead: "1 mark for each correct answer:" }) ])
    ] },

  { id:"4.3.1a", code:"4.3.1", title:"Bit manipulation: shifts and masks",
    concept:
      "<h4>Shifts</h4>" +
      tbl(["Shift", "What happens"], [["Logical left / right", "bits move; <b>zeros</b> are inserted at the vacated end"], ["Arithmetic right", "bits move right and the <b>sign bit is copied</b> into the vacated most significant bits (keeps the sign of a two's complement number)"], ["Cyclic (rotate)", "bits that fall off one end are put back at the other end"]]) +
      "<p>A left shift of n places multiplies by 2<sup>n</sup>; a right shift divides by 2<sup>n</sup> (if no bits are lost).</p>" +
      "<h4>Masking (bitwise AND, OR, XOR)</h4>" +
      tbl(["Operation", "Use"], [["AND with a mask", "<b>clears</b> bits (mask 0) and keeps (mask 1) &mdash; test whether a bit is set"], ["OR with a mask", "<b>sets</b> chosen bits to 1"], ["XOR with a mask", "<b>flips</b> chosen bits; also shows which bits differ"]]),
    example:
      "<p>ACC = 0100 0110. <b>XOR 0000 1111</b> flips the last four bits &rarr; 0100 1001. <b>OR 1111 1111</b> sets every bit &rarr; 1111 1111. <b>AND 0001 1101</b> keeps only bits 4, 3, 2 and 0 &rarr; 0000 0100.</p>" +
      "<p>In a control system, one byte can hold the on/off state of eight devices. To switch on device 3 without disturbing the others, OR with 0000 1000. To turn it off, AND with 1111 0111.</p>",
    checks:[
      mc("A logical left shift of 2 places on 11001010 gives&hellip;", "00101000", ["11110010", "00110010", "11001010"], "Shift left two places; fill the right with zeros."),
      mc("What does an arithmetic right shift copy into the vacated bits?", "The sign bit", ["Zeros", "Ones always", "The carry"], "That preserves the sign."),
      mc("Which operation can set chosen bits to 1 without changing the others?", "OR with a mask", ["AND with a mask", "NOT", "A logical right shift"], "OR with 1 sets the bit; OR with 0 leaves it."),
      tx("Describe the difference between a right logical shift and a right arithmetic shift. [2]", [["logical"],["zero","0"],["arithmetic"],["sign bit","msb","most significant","copied","copies"]], 3, "A logical shift inserts zeros in the leftmost bits; an arithmetic shift copies the sign bit into the most significant bit(s)."),
      ASA.pp("9618/13 October/November 2024 · Question 8(c) and 9618/12 May/June 2024 · Question 5(b)", "Logical shifts insert zeros; arithmetic right shifts copy the sign bit. For the masks work bit by bit, in groups of four.",
        [ ASA.text("(c)", 2, "Describe the difference between a right logical binary shift and a right arithmetic binary shift.",
            [ ["A logical shift moves all bits to the right and inserts zeros in the appropriate leftmost bits", ["logical"], ["zero", "zeros", "0"]], ["An arithmetic shift moves all bits to the right but copies the sign bit into the Most Significant Bit (MSB)", ["arithmetic"], ["sign", "msb", "most significant", "leftmost bit is copied", "preserve"]] ],
            { lead: "1 mark each:", lines: 3 }),
          ASA.fields("(b)", 3, "The binary number 01000110 is reloaded into the ACC before each program. Write the ACC content after each program (8 bits, spaces optional).<br>Program 1: XOR 29 (address 29 holds 00001111)<br>Program 2: AND #29 (denary 29)<br>Program 3: OR B11111111",
            [ ["Program 1 ACC", ["01001001"], "bin", "0100 1001", 1], ["Program 2 ACC", ["00000100"], "bin", "0000 0100", 1], ["Program 3 ACC", ["11111111"], "bin", "1111 1111", 1] ],
            { lead: "1 mark for each correct answer:" }) ])
    ] }

  ]);
})(typeof window !== "undefined" ? window : this);
