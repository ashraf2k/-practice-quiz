/* iLearn AS Level (11BR) -- Topic 4 Processor fundamentals: sample lessons built on real 9618 Paper 1 (May/June 2025) questions. */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx;
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function pre(s){ return "<pre class='ln-pre'>" + esc(s) + "</pre>"; }
  function tbl(heads, rows){
    return "<table class='ln-table'><tr>" + heads.map(function(h){ return "<th>" + h + "</th>"; }).join("") + "</tr>" +
      rows.map(function(r){ return "<tr>" + r.map(function(c){ return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
  }
  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat([

  { id:"4.1.1a", code:"4.1.1", title:"The Von Neumann model and the CPU registers",
    concept:
      "<p>In the <b>Von Neumann model</b> both the <b>program instructions and the data</b> are stored in the same main memory (the <b>stored program concept</b>). The processor fetches each instruction from memory, decodes it and executes it, one after another.</p>" +
      "<h4>The registers</h4><p>A <b>register</b> is a very small, very fast storage location inside the CPU. Registers <b>hold</b> (store) values; they do not <i>transfer</i> them. The buses carry data.</p>" +
      tbl(["Register", "What it holds"], [
        ["Program Counter (PC)", "The <b>address</b> of the next instruction to be fetched"],
        ["Memory Address Register (MAR)", "The address in memory that is about to be read from or written to"],
        ["Memory Data Register (MDR)", "The data that has just been read from memory, or is about to be written to the address in the MAR"],
        ["Current Instruction Register (CIR)", "The instruction that is being decoded and executed"],
        ["Accumulator (ACC)", "The results of calculations done by the ALU"],
        ["Index Register (IX)", "A value used to modify an address (indexed addressing)"],
        ["Status Register (SR)", "Bits that can be tested individually to show a state or event (such as a carry or overflow)"],
        ["Interrupt register", "Details of any interrupts that have occurred"]]) +
      "<h4>The buses</h4><p>The <b>address bus</b> carries addresses (one way, from the CPU), the <b>data bus</b> carries data and instructions (both ways) and the <b>control bus</b> carries control signals such as read and write (the Control Unit sends signals to other components on the <b>control bus</b>).</p>",
    example:
      "<p><b>Worked example: spot the wrong statement.</b></p>" +
      "<ul><li>'The PC counts the instructions that have been executed.' &#10007; The PC stores the <b>address of the next instruction</b> to be fetched.</li>" +
      "<li>'The MDR transfers data to the memory.' &#10007; Registers do not transfer: the MDR <b>holds</b> data read from memory or data to be written to the address in the MAR.</li>" +
      "<li>'The CU sends signals along the data bus.' &#10007; Control signals travel on the <b>control bus</b>.</li></ul>" +
      "<p><b>Examiner report (June 2025):</b> 'Candidates should understand that registers hold or store data, they do not transfer it.' Several candidates also copied one of the registers named in the question when asked to <i>identify one other register</i>.</p>",
    checks:[
      mc("Which register stores the address of the next instruction to be fetched?", "Program Counter (PC)", ["Memory Data Register (MDR)", "Accumulator (ACC)", "Current Instruction Register (CIR)"], "The PC holds the address of the next instruction."),
      mc("On which bus does the Control Unit send its control signals?", "Control bus", ["Data bus", "Address bus", "Memory bus"], "The control bus carries control signals."),
      mc("What does the Accumulator (ACC) store?", "The results of calculations", ["The next instruction address", "The instruction being decoded", "The address to read from memory"], "The ALU's results are held in the ACC."),
      mc("Which statement about registers is correct?", "A register holds data inside the CPU", ["A register transfers data between components", "A register is a type of bus", "A register is slower than main memory"], "Registers hold values; the buses transfer them."),
      tx("State the stored program concept. [1]", [["instructions and data","program and data","data and instructions","same memory","main memory"]], 1, "Program instructions and data are both stored in main memory, and instructions are fetched and executed one after another."),
      { type:"pp", src:"9618/12 May/June 2025 · Question 1(a) and (b)", explain:"Registers hold data and do not transfer it; the PC holds the address of the next instruction; the CU uses the control bus.",
        intro:"<p>The table has six statements about the Von Neumann model for a computer system. Three of the statements are incorrect.</p><table class='ln-table' style='text-align:left'><tr><th>Statement number</th><th>Statement</th></tr><tr><td>1</td><td style='text-align:left'>The Program Counter (PC) stores the next instruction to be fetched from memory.</td></tr><tr><td>2</td><td style='text-align:left'>The Arithmetic and Logic Unit (ALU) performs mathematical and logical operations.</td></tr><tr><td>3</td><td style='text-align:left'>The Control Unit (CU) sends signals to other components on the data bus.</td></tr><tr><td>4</td><td style='text-align:left'>The Memory Data Register (MDR) transfers data to the memory address stored in the Memory Address Register (MAR).</td></tr><tr><td>5</td><td style='text-align:left'>The MAR stores an address from memory.</td></tr><tr><td>6</td><td style='text-align:left'>The Accumulator (ACC) stores the result of calculations.</td></tr></table>",
        parts:[
          { label:"(a)", marks:3, kind:"text", lines:7, q:"<p>Complete the table by writing the <b>three</b> incorrect statement numbers and the corrected statements.</p><p style='color:var(--muted);font-size:13px'>Write each as: number, then the corrected statement.</p>",
            points:[
              { t:"Statement 1 corrected: the PC stores the <b>address</b> of the next instruction to be fetched from memory", k:[["program counter","address"],["pc","address"]] },
              { t:"Statement 3 corrected: the CU sends signals to other components on the <b>control bus</b>", k:["control bus"] },
              { t:"Statement 4 corrected: the MDR <b>holds / stores</b> data to be stored in the address in the MAR (or data read from memory)", k:[["mdr","holds"],["mdr","hold"],["mdr","contains"],["mdr","stores data"],["mdr","store data"],["memory data register","holds"],["memory data register","hold"],["memory data register","contains"],["memory data register","stores data"],["memory data register","store data"]] }
            ], max:3,
            scheme:"<p>1 mark for each correct row</p><table><tr><th>Incorrect statement number</th><th>Corrected statement</th></tr><tr><td>1</td><td>The Program Counter (PC) stores the address of the next instruction to be fetched from memory.</td></tr><tr><td>3</td><td>The Control Unit (CU) sends signals to other components on the control bus.</td></tr><tr><td>4</td><td>The Memory Data Register (MDR) holds data to be stored in the memory address in the MAR. // The Memory Data Register (MDR) holds data read from the memory address in the MAR</td></tr></table>",
            note:"Many candidates identified that statement number 1 and statement number 3 were incorrect, although some of these candidates were then unable to correct them. A popular incorrect change for statement 1 was that the Program Counter counted the number of statements that had been executed. Statement 5 was a popular wrong choice. Candidates should understand that registers hold or store data, they do not transfer it." },
          { label:"(b)", marks:2, kind:"text", lines:4, q:"<p>Registers that are used in the Fetch-Execute (F-E) cycle include the PC, MAR, MDR and the ACC.</p><p>Identify <b>one other</b> register and describe its role in the Fetch-Execute (F-E) cycle.</p><p>Register, then role:</p>",
            points:[
              { t:"1 mark for the name of a register: Current Instruction Register / CIR, Status register / SR, or Interrupt register", k:["current instruction register","cir","status register","interrupt register"] },
              { t:"1 mark for the corresponding role (CIR: to store the instruction to be decoded / executed next; SR: contains bits that can be referenced individually to indicate a state or event; Interrupt register: to store details of any interrupts that have occurred)", k:["instruction to be decoded","instruction to be executed","instruction being decoded","instruction being executed","instruction that is being","instruction that will be","next instruction to be decoded","bits that can be","indicate a state","indicates a state","indicate an event","details of any interrupt","details of interrupts","interrupts that have occurred","interrupt that has occurred","stores the current instruction","holds the current instruction","stores the instruction","holds the instruction","store the instruction","hold the instruction"] }
            ], max:2,
            scheme:"<p>1 mark for name, 1 mark for corresponding role</p><p>e.g.</p><ul><li>Current Instruction Register // CIR</li><li>To store the instruction to be decoded / executed next</li><li>Status register // SR</li><li>To contain bits that can be referenced individually to indicate a state or event</li><li>Interrupt register</li><li>To store details of any interrupts that have occurred</li></ul>",
            note:"There were many correct answers to this question; the Current Instruction Register (CIR) was a popular correct choice. Some candidates need to read the question carefully as one of the registers given in the question was written as the answer." }
        ] }
    ] },

  { id:"4.1.5a", code:"4.1.5", title:"Interrupts: detecting and handling them in the fetch-execute cycle",
    concept:
      "<p>An <b>interrupt</b> is a signal that tells the processor that something needs attention <b>now</b>. The CPU stops what it is doing, deals with the event and then carries on.</p>" +
      "<p><b>Causes:</b> a key pressed or a mouse clicked (input device), a printer out of paper or finished (hardware), a timer going off, a software error such as division by zero, a program request for the OS.</p>" +
      "<h4>When and how an interrupt is handled</h4>" +
      "<ol><li>The CPU finishes the current fetch-execute cycle, then <b>checks the interrupt register</b> at the <b>end of the cycle</b>.</li>" +
      "<li>If an interrupt is waiting, its <b>priority</b> is compared with the priority of the process that is running.</li>" +
      "<li>If the interrupt has <b>higher priority</b>, the contents of the registers (including the PC) are <b>saved on the stack</b>.</li>" +
      "<li>The <b>Interrupt Service Routine (ISR)</b> / interrupt handler for that interrupt is called and runs.</li>" +
      "<li>When the ISR has finished, a <b>further check</b> is made for higher priority interrupts.</li>" +
      "<li>If there are none, the <b>register contents are restored</b> from the stack and the next fetch-execute cycle continues from where it stopped.</li></ol>" +
      "<p>If the interrupt has a <b>lower</b> priority than the running process, it waits and is handled later.</p>",
    example:
      "<p><b>Example: a key is pressed while a game is running.</b></p>" +
      "<ul><li>The keyboard sends an interrupt, which is recorded in the <b>interrupt register</b>.</li><li>At the end of the current F-E cycle the CPU checks the interrupt register and compares the <b>priority</b> of the key press with the priority of the game.</li><li>The registers are stored on the stack, then the <b>ISR</b> for the keyboard runs and reads the key.</li><li>After the ISR the CPU checks for more interrupts, restores the registers from the stack and the game carries on.</li></ul>" +
      "<p><b>Marking tip:</b> the question gives 4 marks, so make <b>four different points</b> in order (detect, check priority, save to stack, run ISR, check again, restore). The examiner report says some answers only compared the priorities of interrupts and never mentioned the priority of the process being interrupted.</p>",
    checks:[
      mc("When is an interrupt normally detected in the fetch-execute cycle?", "At the end of the cycle, by checking the interrupt register", ["Before the PC is set up", "Only when the program ends", "In the middle of the execute stage"], "The CPU checks the interrupt register after each F-E cycle."),
      mc("What happens to the registers before the ISR runs?", "Their contents are saved on the stack", ["They are cleared to zero", "They are copied to the hard disk", "They are ignored"], "The state of the interrupted process must be saved so it can resume."),
      mc("What is the name of the code that deals with an interrupt?", "Interrupt Service Routine (ISR)", ["Interrupt Stack Register", "Instruction Set Reader", "Input Signal Route"], "ISR = Interrupt Service Routine."),
      mc("An interrupt has a LOWER priority than the process that is running. What happens?", "It waits until it can be handled later", ["It stops the running process at once", "It is deleted", "The processor shuts down"], "Only an interrupt with a higher priority than the current process is handled straight away."),
      tx("Give two causes of an interrupt. [2]", [["key","keyboard","mouse","input","button"],["printer","timer","error","overflow","division","hardware","power","disk","software","fault"]], 2, "For example a key is pressed (input device), a printer is out of paper, a timer ends, or a software error such as division by zero occurs."),
      { type:"pp", src:"9618/12 May/June 2025 · Question 1(c)", explain:"Interrupt register checked at the end of the cycle, priority compared with the running process, registers saved on the stack, ISR called, check again, registers restored.",
        parts:[{ label:"(c)", marks:4, kind:"text", lines:8, q:"<p>Explain how an interrupt from an input device will be detected and handled in the F-E cycle.</p>",
          points:[
            { t:"At the start / end of the F-E cycle the interrupt register is checked", k:["interrupt register",["end","cycle","check"],["start","cycle","check"],["end of the fetch"],["end of each fetch"],["end of every"],["after each"],["after every"]] },
            { t:"The priority of any interrupts waiting is checked", k:[["priority","check"],["check","priority"],["priority","compare"],["compare","priority"],["priority","looked at"]] },
            { t:"If the priority of the interrupt is higher than the current process", k:["higher priority","higher than","greater priority","higher priority than",["priority","higher"]] },
            { t:"The contents of the registers are stored on the stack", k:["stack",["save","register"],["saved","register"],["store","register"],["stored","register"],["registers","saved"],["registers","stored"]] },
            { t:"The relevant Interrupt Service Routine (ISR) / interrupt handler is called to process the interrupt", k:["isr","interrupt service routine","interrupt handler","service routine","handler"] },
            { t:"When the ISR has finished, a further check is made for higher priority interrupts", k:["further check",["check","again"],["check","more interrupts"],["check","other interrupts"],["check","any more"],["another","interrupt","higher"],["isr","finish","check"],["after","isr","check"]] },
            { t:"If no more interrupts of higher priority, the register contents are restored and the next F-E cycle continues", k:["restor",["registers","back"],["continue","next","cycle"],["resume"],["next","cycle","continue"],["carries on"]] }
          ], max:4,
          scheme:"<p>1 mark each to max 4</p><ul><li>At the start / end of FE cycle the interrupt register is checked</li><li>The priority of any interrupts waiting is checked</li><li>if the priority of the interrupt is higher than the current process</li><li>the contents of the registers are stored on the stack</li><li>The relevant Interrupt Service Routine (ISR) / interrupt handler is called to process the interrupt</li><li>When the ISR has finished, a further check is made for higher priority interrupts</li><li>if no more interrupts of higher priority, the register contents are restored and the next FE cycle continues</li></ul>",
          note:"There were some excellent responses to this question. Some candidates should ensure that they look at the number of marks available for the question and that they make an equivalent number of distinct points in their answers. Statements about priority checking were often included, but there seemed to be some misunderstanding with only the relative priorities of the interrupts being checked without any reference to the priority of the process being interrupted." }] }
    ] }

  ]);
})(typeof window !== "undefined" ? window : this);
