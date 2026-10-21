/* iLearn A Level topic 16: System software (Cambridge 9618, section 16)
   Textbook: Hodder "Cambridge International AS & A Level Computer Science", chapter 16 (pages 372-409).
   Worked scheduling and page-replacement numbers on this page were calculated by program and checked.
   Past-paper style: 9618/31, /32, /33 May/June 2026 (RPN, compilation, syntax). */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx, fill = root.ILQ.fill;
  function tbl(heads, rows){
    return "<table class='ln-table'><tr>" + heads.map(function(h){ return "<th>" + h + "</th>"; }).join("") + "</tr>" +
      rows.map(function(r){ return "<tr>" + r.map(function(c){ return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
  }
  function pre(s){ return "<pre class='ln-pre'>" + s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</pre>"; }
  // a stack drawn as a row of columns (bottom item first in each array)
  function stacks(steps){
    var h = "<table class='ln-table' style='text-align:center'><tr><th>Step</th><th>Item read</th><th>Stack (bottom to top)</th></tr>";
    steps.forEach(function(s, i){ h += "<tr><td>" + (i + 1) + "</td><td>" + s[0] + "</td><td>" + s[1] + "</td></tr>"; });
    return h + "</table>";
  }
  // simple bar chart for a scheduling timeline
  function gantt(parts){
    var tot = parts.reduce(function(a, p){ return a + p[1]; }, 0), h = "<div style='display:flex;border:1px solid currentColor;max-width:100%;overflow:auto'>", t = 0, marks = "<div style='display:flex;max-width:100%'>";
    parts.forEach(function(p){
      var w = Math.max(p[1] / tot * 100, 6);
      h += "<div style='flex:" + w + " 0 0;text-align:center;padding:4px 0;border-right:1px solid currentColor;background:rgba(80,140,220,.18);font-weight:700'>" + p[0] + "</div>";
      marks += "<div style='flex:" + w + " 0 0;font-size:12px'>" + t + "</div>"; t += p[1];
    });
    return h + "</div>" + marks + "<div style='font-size:12px;text-align:right'>" + t + "</div></div>";
  }

  var LESSONS = [

  /* ===================== 16.1 Purposes of an operating system ===================== */
  { id:"16.1a", code:"16.1.1", title:"How an OS maximises the use of resources",
    concept:
      "<p>When a computer is switched on, the <b>BIOS</b> (stored in ROM) starts a <b>bootstrap</b> program. The bootstrap loads part of the operating system into RAM and starts the computer up.</p>" +
      "<p>An operating system manages three groups of resources so that none of them sit idle:</p>" +
      "<ol><li><b>The CPU</b>: scheduling shares CPU time between processes (16.1c to 16.1e).</li><li><b>Memory</b>: the OS decides which programs are in RAM and where (16.1f to 16.1h).</li><li><b>Input/output (I/O)</b>: the OS handles every I/O request, using <b>device drivers</b> for each device.</li></ol>" +
      "<p>I/O devices are very <b>slow</b> compared with the CPU (a keyboard can send up to 50 bits per second, a CPU executes billions of instructions per second). A <b>direct memory access (DMA) controller</b> lets a device transfer data to and from <b>main memory without the CPU</b>:</p>" +
      "<ul><li>The CPU tells the DMA controller what to transfer, then carries on with <b>other tasks</b>.</li><li>The DMA controller transfers the data.</li><li>When the transfer is complete the DMA controller sends an <b>interrupt</b> to the CPU.</li></ul>",
    example:
      "<p>Without DMA, the CPU stays busy for the whole time a large file is copied from disk to RAM (programmed I/O). With DMA, the CPU can run another program during the copy, so CPU time is used more fully. This is one way an OS <b>maximises resource use</b>.</p>",
    checks:[
      mc("What is the purpose of a DMA controller?", "To transfer data between an I/O device and memory without using the CPU", ["To translate a program into machine code", "To increase the clock speed", "To schedule processes"], "The CPU is free to run other tasks during the transfer."),
      mc("How does the DMA controller tell the CPU that a transfer has finished?", "It sends an interrupt", ["It sets the program counter to zero", "It restarts the computer", "It deletes the data"], "An interrupt signal is sent when the transfer is complete."),
      mc("Which three resources are managed by an operating system to make best use of the computer?", "CPU, memory and input/output", ["Keyboard, mouse and printer", "ROM, BIOS and cache", "Compiler, interpreter and assembler"], "These are the three areas of resource management."),
      tx("Explain why a DMA controller makes better use of the CPU. [2]", [["without cpu","not use the cpu","independently","cpu free","frees","free the cpu","cpu is not"],["other tasks","other processes","other instructions","at the same time","meanwhile","whilst","while"],["interrupt","slow","i/o"]], 2, "The DMA controller moves data between an I/O device and memory without involving the CPU, so the CPU can carry out other tasks while the slow I/O operation takes place. It sends an interrupt when the transfer has finished.")
    ] },

  { id:"16.1b", code:"16.1.2", title:"The user interface and the kernel",
    concept:
      "<p>The operating system <b>hides the complexity of the hardware</b> from the user. It does this by:</p>" +
      "<ul><li>providing a <b>user interface</b>, usually a <b>GUI</b> (icons, windows, menus) instead of typing commands in a CLI;</li><li>using <b>device drivers</b> so the user and programs do not need to know how each device works;</li><li>simplifying <b>saving and retrieving data</b>: the user chooses a file name and folder, the OS finds free sectors and keeps track of them;</li><li>running <b>background utilities</b> (virus scanning, updates) without the user's attention.</li></ul>" +
      "<p>The <b>kernel</b> is the core of the OS. It communicates between the hardware, software and memory and is responsible for <b>process management, memory management, device management, interrupt handling and file/I/O communication</b>.</p>",
    example:
      "<p>To copy a file on an old system the user had to type a command such as <code>copy C:\\windows\\myfile.txt</code>. On a modern system the user drags the file icon into a folder; the OS works out the physical location of the file, issues the instructions to the drives and updates the file records. The user only moves the mouse.</p>",
    checks:[
      mc("Which is a way the OS hides hardware complexity from the user?", "Providing a graphical user interface", ["Giving the user direct access to memory addresses", "Making the user type machine code", "Switching off the device drivers"], "A GUI lets the user work with icons rather than hardware details."),
      mc("What is the kernel?", "The central part of the OS that manages processes, memory, devices and interrupts", ["The program that translates source code", "A type of utility software only for virus scans", "The part of RAM used for the stack"], "The kernel controls the core functions of the OS."),
      mc("Why are device drivers used?", "They allow the OS and programs to use a device without knowing how its hardware works", ["They store the user's files", "They encrypt data", "They translate high-level code"], "A driver converts general OS requests into the commands a specific device understands.")
    ] },

  { id:"16.1c", code:"16.1.3", title:"Multitasking and process states",
    concept:
      "<p>A <b>process</b> is a program that has started to be executed. <b>Multitasking</b> lets the computer hold several processes at once. The kernel overlaps them so that it looks as if they all run together. The OS <b>scheduler</b> decides which process uses the CPU next.</p>" +
      "<p>A <b>process control block (PCB)</b> stores everything needed to restart a process: process ID, current state, register values (PC, ACC...), priority, scheduling information and resources it may use.</p>" +
      "<p>Each process is always in one of three states:</p>" +
      tbl(["State", "Meaning"], [["<b>Running</b>", "The process is using the CPU"], ["<b>Ready</b>", "The process could run and is waiting in the ready queue for CPU time"], ["<b>Blocked</b>", "The process is waiting for an event or an I/O operation to finish; it cannot run even if the CPU is free"]]) +
      tbl(["Change", "Why it happens"], [
        ["ready → running", "The scheduler gives the process CPU time"],
        ["running → ready", "Its time slice ends (timer interrupt) or a higher-priority process is ready"],
        ["running → blocked", "It needs an I/O operation or an event"],
        ["blocked → ready", "The I/O operation or event it was waiting for has completed"]]) +
      "<p><b>Pre-emptive</b> scheduling can interrupt a running process (time slice ends or a more important process arrives). <b>Non-pre-emptive</b> scheduling lets a process keep the CPU until it finishes or blocks.</p>",
    example:
      "<p>A word processor waits for a file to load from the disk: it moves from <b>running</b> to <b>blocked</b>. When the disk has finished, an interrupt moves it from <b>blocked</b> to <b>ready</b> (not straight to running). The scheduler later moves it from ready to running.</p>" +
      "<p><b>Exam trap:</b> a blocked process never goes directly to running.</p>",
    checks:[
      mc("A process is waiting for a disk read to complete. Which state is it in?", "Blocked", ["Running", "Ready", "Terminated"], "It cannot continue until the I/O finishes."),
      mc("What happens to a process when its I/O operation completes?", "blocked → ready", ["blocked → running", "running → ready", "ready → blocked"], "It joins the ready queue and waits for the scheduler."),
      mc("Why does a running process move to the ready state?", "Its time slice has ended", ["It needs a disk read", "It has terminated", "It is waiting for a key press"], "A timer interrupt ends the time slice; the process is still able to run."),
      mc("What is stored in a process control block?", "The process state, register values, priority and ID", ["The source code of the program", "The user's passwords", "The contents of the hard disk"], "The PCB holds the data needed to restart the process."),
      tx("Describe what is meant by the ready, running and blocked process states. [3]", [["ready","waiting for cpu","waiting for the cpu","ready queue","could run","able to run"],["running","using the cpu","being executed","executing","has the cpu"],["blocked","waiting for i/o","waiting for an event","waiting for input","cannot run","waiting for a resource"]], 3, "Ready: the process can run and is waiting in the ready queue for CPU time. Running: the process is currently being executed by the CPU. Blocked: the process is waiting for an I/O operation or other event and cannot continue even if the CPU is free.")
    ] },

  { id:"16.1d", code:"16.1.3", title:"Scheduling algorithms: FCFS, SJF, SRTF and round robin",
    concept:
      "<p>The scheduler (low-level scheduling) picks which process in the ready queue runs next. Four routines:</p>" +
      "<ul><li><b>First come first served (FCFS)</b>: a queue (FIFO); processes run in the order they arrive, to completion. Non-pre-emptive.</li><li><b>Shortest job first (SJF)</b>: the process with the smallest burst time runs next, to completion. Non-pre-emptive. Needs the burst times in advance.</li><li><b>Shortest remaining time first (SRTF)</b>: pre-emptive version of SJF. When a new process arrives with a shorter time than the <b>remaining</b> time of the running process, the running process is pre-empted.</li><li><b>Round robin</b>: each process gets a fixed <b>time slice (quantum)</b>. At the end of the slice the process goes to the back of the ready queue and the context is saved in its PCB (a <b>context switch</b>). Pre-emptive and fair.</li></ul>" +
      "<p><b>Waiting time</b> = (time the process finishes) − (arrival time) − (burst time). The average waiting time is used to compare algorithms. SJF/SRTF give the lowest average, but a long process may be <b>starved</b>.</p>",
    example:
      "<p>Four processes arrive together with burst times P1 = 23 ms, P2 = 4 ms, P3 = 9 ms, P4 = 3 ms.</p>" +
      "<p><b>FCFS</b> (order P1, P2, P3, P4):</p>" + gantt([["P1", 23], ["P2", 4], ["P3", 9], ["P4", 3]]) +
      "<p>Waits: 0, 23, 27, 36. Average = 86 ÷ 4 = <b>21.5 ms</b>.</p>" +
      "<p><b>SJF</b> (order P4, P2, P3, P1):</p>" + gantt([["P4", 3], ["P2", 4], ["P3", 9], ["P1", 23]]) +
      "<p>Waits: 0, 3, 7, 16. Average = 26 ÷ 4 = <b>6.5 ms</b>.</p>" +
      "<p><b>Round robin</b>, quantum 5 ms (P2 and P4 finish inside one slice):</p>" + gantt([["P1", 5], ["P2", 4], ["P3", 5], ["P4", 3], ["P1", 5], ["P3", 4], ["P1", 13]]) +
      "<p>Finish times: P1 = 39, P2 = 9, P3 = 26, P4 = 17. Waiting times = finish − burst: 16, 5, 17, 14. Average = 52 ÷ 4 = <b>13 ms</b>.</p>" +
      "<p><b>SRTF with arrivals</b> (P1 at 0, P2 at 1, P3 at 2, P4 at 3 with the same burst times): P1 runs 0 to 1, P2 runs 1 to 5 (at time 3 P4 needs 3 ms but P2 has 2 ms left, so P2 carries on), P4 runs 5 to 8, P3 runs 8 to 17, P1 runs 17 to 39. Waits: P1 = 39 − 0 − 23 = 16, P2 = 5 − 1 − 4 = 0, P3 = 17 − 2 − 9 = 6, P4 = 8 − 3 − 3 = 2. Average = 24 ÷ 4 = <b>6 ms</b>.</p>",
    checks:[
      mc("Three processes A, B and C all arrive at time 0 with burst times 6, 3 and 8 ms. What is the average waiting time under FCFS (order A, B, C)?", "5 ms", ["4 ms", "9 ms", "6.67 ms"], "Waits are 0, 6 and 9; the total is 15, so the average is 15 ÷ 3 = 5 ms."),
      mc("Using the same three processes, what is the average waiting time under shortest job first?", "4 ms", ["5 ms", "6.67 ms", "3 ms"], "Order B, A, C gives waits 0, 3 and 9; total 12; average 4 ms."),
      mc("Using the same three processes, what is the average waiting time under round robin with a quantum of 4 ms?", "6.67 ms (to 2 decimal places)", ["4 ms", "5 ms", "9 ms"], "With a 4 ms slice the order is A (0-4), B (4-7, finishes), C (7-11), A (11-13, finishes), C (13-17, finishes). Waiting time = finish − burst: A = 13 − 6 = 7, B = 7 − 3 = 4, C = 17 − 8 = 9. Total 20, average 20 ÷ 3 = 6.67 ms."),
      mc("Which scheduling routine is pre-emptive and always picks the process with the least time still to run?", "Shortest remaining time first", ["First come first served", "Shortest job first", "Single contiguous allocation"], "SRTF re-checks whenever a new process arrives."),
      mc("What is a disadvantage of shortest job first scheduling?", "Long processes may be starved of CPU time", ["Short processes wait a long time", "It uses a time quantum", "It cannot be used on a single CPU"], "A steady stream of short jobs keeps the long job waiting."),
      tx("Describe how round robin scheduling works. [3]", [["time slice","quantum","fixed time","equal time"],["ready queue","back of the queue","end of the queue","queue"],["context","save","pcb","process control block","registers"],["interrupt","pre-empt","preempt","timer"]], 3, "Each process in the ready queue is given the CPU for a fixed time slice (quantum). When the slice ends a timer interrupt occurs, the process state is saved in its PCB (context switch) and the process goes to the back of the ready queue, and the next process in the queue is given the CPU.")
    ] },

  { id:"16.1e", code:"16.1.3", title:"Interrupts and the kernel",
    concept:
      "<p>An <b>interrupt</b> is a signal that makes the processor stop its current task. The kernel handles it. The processor looks for interrupts at the end of each fetch-execute cycle. Types of interrupt:</p>" +
      "<ul><li><b>Device (hardware) interrupt</b>: e.g. printer out of paper, key pressed, DMA transfer complete.</li><li><b>Exception</b>: an instruction fault, e.g. divide by zero, an undefined op-code, stack overflow.</li><li><b>Trap (software interrupt)</b>: a program asks the OS for a service, e.g. a disk read.</li></ul>" +
      "<p><b>Handling an interrupt:</b></p>" +
      "<ol><li>The source of the interrupt is identified and its priority checked: each interrupt has an <b>interrupt priority level (IPL)</b> from 0 to 31 (e.g. power failure 31, clock 24, I/O devices 20 to 23). The running task is suspended only if the new IPL is <b>higher</b> than the current task's level; a lower one waits.</li><li>The state of the current task (registers, PC) is <b>saved on the kernel stack</b>.</li><li>Other interrupts are disabled while the handler runs (or only higher ones allowed).</li><li>The kernel looks up the address of the <b>interrupt service routine (ISR)</b> in the <b>interrupt dispatch table (IDT)</b> and runs it.</li><li>The saved state is <b>restored</b> from the stack and the original task continues; interrupts are enabled again.</li></ol>",
    example:
      "<p>A process is running when a key is pressed (IPL 21). The kernel saves the process registers on the kernel stack, finds the keyboard ISR in the IDT, and runs it. When the ISR finishes, the registers are restored and the process carries on exactly where it stopped. If a power-fail interrupt (IPL 31) arrives during the ISR, it takes priority; the key-press handling is put on hold.</p>",
    checks:[
      mc("What does the kernel use the interrupt dispatch table for?", "To find the address of the routine that deals with a given interrupt", ["To store the user's files", "To schedule processes by priority", "To hold the page table"], "The IDT links each interrupt to its service routine."),
      mc("Why is the state of the current task saved when an interrupt occurs?", "So it can be restored and carry on correctly afterwards", ["So the interrupt can be ignored", "So the task can be deleted", "To make the ISR run faster"], "The registers and PC are saved on the kernel stack."),
      mc("When is the running task suspended by a new interrupt?", "When the new interrupt has a higher priority level than the current task", ["Always, whatever the priority", "Never", "Only when it has a lower priority level"], "A lower-priority interrupt has to wait."),
      mc("Division by zero in a program is an example of a ...", "exception", ["device interrupt", "trap", "page fault"], "An instruction fault is an exception."),
      tx("Describe the steps the kernel takes when an interrupt is received. [4]", [["identif","source","type","priority","ipl"],["save","stack","state","registers","context"],["service routine","isr","interrupt dispatch table","idt","handler","routine"],["restore","resume","continue","carry on","returns"]], 4, "The source and priority of the interrupt are identified. If its priority is higher than the current task, the state of the current task (registers) is saved on the kernel stack. The kernel uses the interrupt dispatch table to find and run the interrupt service routine. When it finishes, the saved state is restored from the stack and the original task continues.")
    ] },

  { id:"16.1f", code:"16.1.4", title:"Memory management: paging and segmentation",
    concept:
      "<p>The OS must decide <b>which processes are in main memory and where</b> (memory optimisation), allocate memory when a process starts, and release it when it ends.</p>" +
      "<p><b>Paging.</b> Logical memory (what the program sees) is divided into fixed-size blocks called <b>pages</b>; physical memory (RAM) is divided into blocks of the same size called <b>frames</b>. Pages are loaded into any free frames; they need not be next to each other. Each process has a <b>page table</b> that maps page numbers to frame numbers, and holds status flags: <b>presence (P)</b>, <b>accessed (A)</b>, <b>dirty/modified (D)</b>, read/write, and the time of entry.</p>" +
      "<p><b>Segmentation.</b> Logical memory is divided into <b>variable-size segments</b> that match the program's logical parts (a procedure, an array, a record). A <b>segment map table</b> holds, for each segment, its number, size and start address in physical memory.</p>" +
      tbl(["Paging", "Segmentation"], [
        ["Fixed-size blocks (pages)", "Variable-size blocks (segments)"],
        ["Can cause <b>internal</b> fragmentation (the last page is not full)", "Can cause <b>external</b> fragmentation (gaps between segments)"],
        ["Page size is set by the hardware; invisible to the programmer", "Segments are visible to the programmer, who gives a segment number and an offset"],
        ["Page table: page number → frame", "Segment map table: segment number, size, start address"],
        ["Procedure and its data may be split across pages", "Procedures and their data can be kept in separate segments"]]),
    example:
      "<p>A program has 4 pages, 0 to 3. Page table: page 0 → frame 1, page 1 → frame 4, page 2 → frame 3, page 3 → frame 7. The CPU asks for an address in page 2; the memory management unit looks it up and finds it is in frame 3 of RAM.</p>" +
      "<p>For segmentation: segment 2 has size 700 and starts at address 1400, so offset 150 within segment 2 is at physical address 1400 + 150 = 1550 (the offset must be smaller than the size).</p>",
    checks:[
      mc("What is the name of a fixed-size block of <b>physical</b> memory in a paging system?", "Frame", ["Page", "Segment", "Sector"], "Frames are in RAM; pages are in logical memory."),
      mc("What is stored in a page table?", "The frame in which each page is held, with flags such as presence and dirty", ["The source code for each page", "The user's file names", "The order of the ready queue"], "It maps pages to frames and records status flags."),
      mc("Which statement about segmentation is true?", "Segments can have different sizes", ["All segments are the same size", "Segments are invisible to the programmer", "It cannot cause fragmentation"], "Segments match logical parts of the program, so sizes vary."),
      mc("A segment starts at physical address 2100 and has size 200. Which physical address is offset 50 in the segment?", "2150", ["2050", "2200", "250"], "Start address + offset = 2100 + 50 = 2150 (the offset 50 is less than the size 200)."),
      tx("State two differences between paging and segmentation. [2]", [["fixed","same size","equal size","variable","different size","varying"],["page table","segment map","segment table","map table"],["internal fragmentation","external fragmentation","visible","invisible","programmer","logical","physical"]], 2, "Pages are fixed-size blocks whereas segments are variable-size blocks. Paging uses a page table and is invisible to the programmer, whereas segmentation uses a segment map table and the programmer sees the logical segments.")
    ] },

  { id:"16.1g", code:"16.1.4", title:"Virtual memory and disk thrashing",
    concept:
      "<p>When RAM is full, the OS can use part of the hard disk (or SSD), called <b>swap space</b>, as an extension of RAM. <b>Virtual memory = RAM + swap space.</b> It is usually implemented with <b>demand paging</b>: a page is loaded into RAM only when it is actually needed.</p>" +
      "<p><b>How a program accesses data</b>: the program uses a <b>virtual (logical) address</b>; the memory management unit uses the page table to translate it to a <b>physical address</b>. If the page is not in RAM (presence flag P = 0) a <b>page fault</b> occurs: the page is loaded from disk into a frame, the page table is updated, and the instruction is repeated.</p>" +
      "<p><b>Benefits:</b> programs can be larger than RAM; more programs can be in memory at once (multitasking); only needed parts are loaded; no need to buy extra RAM.</p>" +
      "<p><b>Disk thrashing.</b> If too many programs are running and RAM is small, pages are swapped between RAM and disk constantly. The computer spends more time moving pages than running instructions; performance falls sharply and, at the <b>thrash point</b>, processing almost stops. It also causes a high amount of disk head movement and wear.</p>" +
      "<p><b>To reduce thrashing:</b> install <b>more RAM</b>; run <b>fewer programs</b> at the same time; use a better page replacement algorithm; (a larger swap file does not solve it).</p>",
    example:
      "<p>A laptop with 4 GiB of RAM has 15 browser tabs, a video editor and a game open. The OS keeps swapping pages to disk and back. Every click takes seconds, the disk light stays on. This is thrashing. Closing programs or adding RAM fixes it.</p>" +
      "<p><b>Exam trap:</b> do not confuse <b>virtual memory</b> (uses disk to extend RAM) with a <b>virtual machine</b> (software emulation of a whole computer).</p>",
    checks:[
      mc("What is virtual memory?", "RAM plus swap space on the hard disk or SSD, giving the illusion of more memory", ["A copy of the BIOS", "A second operating system", "Memory inside the graphics card"], "Pages move between RAM and swap space as needed."),
      mc("What causes a page fault?", "A requested page is not in main memory", ["The disk is full", "A program has a syntax error", "Two processes request the same printer"], "The presence flag is 0, so the page must be loaded from disk."),
      mc("Which action would help to reduce disk thrashing?", "Install more RAM", ["Install a faster printer", "Open more programs", "Make the pages smaller on purpose"], "More RAM means fewer page faults."),
      mc("What is demand paging?", "A page is loaded into RAM only when it is needed", ["All pages of a program are loaded when it starts", "Pages are never moved to disk", "Pages are loaded in order of size"], "Pages come in on demand."),
      tx("Explain what is meant by disk thrashing. [3]", [["swap","moving pages","paging","page in","page out","pages in and out"],["ram","memory","virtual memory","too many programs","too many processes"],["more time","excessive","slow","performance","little processing","halt","head movement"]], 3, "When RAM is too full, pages are constantly swapped in and out of virtual memory on disk. The computer spends more time moving pages than executing instructions, so the performance falls and processing may almost stop.")
    ] },

  { id:"16.1h", code:"16.1.4", title:"Page replacement algorithms",
    concept:
      "<p>When a page fault occurs and <b>all frames are full</b>, the OS must choose a page to replace. If the page chosen has been <b>modified (dirty, D = 1)</b>, it must first be written back to disk; an unmodified page can simply be overwritten. The aim of every algorithm is to <b>minimise page faults</b>.</p>" +
      tbl(["Algorithm", "Which page is replaced?", "Notes"], [
        ["<b>FIFO</b> (first in first out)", "The page that has been in memory longest (a queue)", "Simple, but ignores how often a page is used; suffers <b>Belady's anomaly</b>: more frames can give more faults"],
        ["<b>LRU</b> (least recently used)", "The page that has not been used for the longest time", "Needs a record of use; usually good"],
        ["<b>Optimal</b>", "The page that will not be needed for the longest time in the future", "Fewest faults possible, but <b>cannot be implemented</b> (the future is unknown); used for comparison"],
        ["<b>Clock / second chance</b>", "A pointer moves round a circular queue; a page with R = 1 is given a second chance (R set to 0), the first page with R = 0 is replaced", "Approximates LRU cheaply"]]),
    example:
      "<p>Reference string 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2 with <b>3 frames</b>:</p>" +
      tbl(["Algorithm", "Page faults"], [["FIFO", "10"], ["LRU", "9"], ["Optimal", "7"]]) +
      "<p>Optimal is always the lowest. Belady's anomaly: with FIFO and the string 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5, using <b>3 frames</b> gives 9 faults but <b>4 frames</b> gives 10 faults.</p>",
    checks:[
      mc("Which page replacement algorithm can suffer from Belady's anomaly?", "FIFO", ["LRU", "Optimal", "All of them"], "With FIFO, adding frames can sometimes increase the faults."),
      mc("Which page replacement algorithm is impossible to implement in practice?", "Optimal", ["FIFO", "LRU", "Clock"], "It needs to know future page requests."),
      mc("A page selected for replacement has been modified (dirty). What must happen?", "It is written back to disk before being replaced", ["It is simply deleted", "The program is terminated", "All pages are cleared"], "Otherwise the changes would be lost."),
      mc("Which algorithm replaces the page not used for the longest time in the past?", "LRU", ["FIFO", "Optimal", "Round robin"], "Least recently used."),
      mc("With 3 frames, which algorithm gives the fewest page faults for the string 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2?", "Optimal (7 faults)", ["FIFO (10 faults)", "LRU (11 faults)", "They are all the same"], "Optimal 7, LRU 9, FIFO 10."),
      tx("Describe how the FIFO page replacement algorithm works. [2]", [["oldest","first in","longest in","longest time","longest in memory","arrived first","longest"],["queue","front","replaced","removed","replace"]], 2, "The pages in memory are kept in a queue. When a page fault occurs with no free frame, the page that has been in memory the longest (at the front of the queue) is replaced by the new page.")
    ] },

  /* ===================== 16.2 Translation software ===================== */
  { id:"16.2a", code:"16.2.1", title:"Interpreters and compilers",
    concept:
      "<p>A program written in a high-level language must be <b>translated</b> before the CPU can execute it.</p>" +
      tbl(["Compiler", "Interpreter"], [
        ["Translates the <b>whole</b> program into <b>object code</b> (machine code) before it runs", "Translates and executes the program <b>one statement at a time</b>; <b>no object code</b> is produced"],
        ["The object code can be run many times <b>without recompiling</b>; runs fast", "The interpreter must be present <b>every time</b> the program runs; runs slower"],
        ["All errors are reported after analysing the program", "Execution stops at the first error, so errors are found and fixed one by one while testing"],
        ["The source code can be kept secret (only object code is distributed)", "Good for developing and testing; also for running the same program on different machines"]]) +
      "<p>The interpreter checks a statement, executes it, then returns to the interpreter for the next one. Both compilers and interpreters build a <b>symbol table</b> (names of variables and constants, types, tokens); the interpreter also allocates memory for the variables.</p>",
    example:
      "<p>A teacher tests a short program while writing it: an <b>interpreter</b> runs each line immediately and shows the error on the line that failed. When the finished program is sold to customers, the developer uses a <b>compiler</b> and supplies only the object code.</p>",
    checks:[
      mc("What is produced when a program is compiled?", "Object code that can be run without the compiler", ["A line-by-line output only", "Nothing; the compiler executes the code", "The same source code in a new language"], "Object code can be executed repeatedly with no recompilation."),
      mc("What is a feature of an interpreter?", "It translates and executes one statement at a time", ["It produces object code", "It translates the whole program first", "It is not needed when the program runs"], "The interpreter is needed each time the program runs."),
      mc("Which is an advantage of a compiler over an interpreter?", "The program runs faster because it is already translated", ["Errors are found one line at a time while testing", "No translator is needed", "It uses less memory while developing"], "The translation is done once; the object code is executed directly."),
      tx("Describe how an interpreter can execute a program without producing a translated version. [3]", [["one statement at a time","line by line","each statement","one line at a time","statement by statement"],["execute","executes","runs","run"],["no object code","does not produce","not produce","no translated","not stored","no machine code"],["check","error","syntax"]], 3, "The interpreter takes the source code and checks one statement at a time for errors. Each statement is executed immediately, and no object code is produced or stored. Control returns to the interpreter for the next statement, so the interpreter is needed every time the program is run.")
    ] },

  { id:"16.2b", code:"16.2.2", title:"The four stages of compilation",
    concept:
      "<p>A compiler translates source code to object code in <b>four stages</b>:</p>" +
      "<ol><li><b>Lexical analysis</b>: removes white space and comments; <b>tokenises</b> the program, replacing each keyword and symbol with a token from the <b>keyword table</b>; adds identifiers (variables, constants) to the <b>symbol table</b>. Output: a list of tokens.</li><li><b>Syntax analysis (parsing)</b>: checks the token list against the grammar rules (BNF) of the language. Syntax errors are reported (with the statement); if there are errors, code generation is <b>not</b> attempted.</li><li><b>Code generation</b>: produces the <b>object code</b> (machine code, or intermediate code that is converted later). Library routines may be linked in.</li><li><b>Optimisation</b>: improves the object code so it uses less time, memory or CPU resources, e.g. removing repeated calculations.</li></ol>",
    example:
      "<p>Source: <code>z = x + y</code>. Keyword table: = → 01, + → 02. Symbol table: X → 81, Y → 82, Z → 83. After lexical analysis the line becomes <b>83 01 81 02 82</b>.</p>" +
      "<p>Syntax analysis of <code>z + x + y</code> gives 83 02 81 02 82 and finds an error: the = token (01) was expected in the second position.</p>" +
      "<p>Optimisation: <code>w = x + y</code> then <code>v = x + y + z</code> can be changed to <code>w = x + y</code> then <code>v = w + z</code>, so x + y is calculated only once.</p>",
    checks:[
      mc("Which stage of compilation removes comments and white space and creates tokens?", "Lexical analysis", ["Syntax analysis", "Code generation", "Optimisation"], "Lexical analysis tokenises the source code."),
      mc("Which stage checks that the program follows the grammar rules of the language?", "Syntax analysis", ["Lexical analysis", "Code generation", "Optimisation"], "The tokens are parsed using the language rules."),
      mc("What is the purpose of the symbol table?", "To store the identifiers (variables and constants) with their type and token", ["To store the keywords of the language", "To store the object code", "To store the error messages"], "The keyword table holds reserved words; the symbol table holds the program's own names."),
      mc("Using the keyword table = → 01, + → 02 and symbol table X → 81, Y → 82, Z → 83, what is the token list for z = x + y?", "83 01 81 02 82", ["83 02 81 01 82", "81 01 83 02 82", "01 83 02 81 82"], "Z, =, X, +, Y."),
      mc("Why is the optimisation stage used?", "To produce object code that uses fewer resources (time and memory)", ["To check the program for errors", "To remove comments", "To translate tokens into a symbol table"], "Optimisation makes the object code more efficient."),
      tx("List the four stages of compilation in order. [4]", [["lexical"],["syntax"],["code generation","generation","code gen"],["optimis"]], 4, "1 lexical analysis, 2 syntax analysis, 3 code generation, 4 optimisation.")
    ] },

  { id:"16.2c", code:"16.2.3", title:"Syntax diagrams and Backus-Naur form (BNF)",
    concept:
      "<p>Every programming language has a <b>grammar</b> (its <b>syntax</b>): the exact rules for what counts as a valid statement. The rules must be written down precisely so that programmers can obey them and so that the compiler can check them during syntax analysis. Two notations are on the syllabus: <b>syntax diagrams</b> (a picture) and <b>Backus-Naur form</b> (written rules). Both describe the same thing.</p>" +
      "<h4>1. Syntax diagrams</h4>" +
      "<p>A syntax diagram is read like a road map. Start at the dot on the left, follow the arrows, and finish at the exit arrow on the right. A string is <b>valid</b> if there is a path that spells it out.</p>" +
      tbl(["Part of the diagram", "Meaning"], [
        ["Oval or circle", "A <b>terminal</b>: a character or word that is typed exactly as shown. It has nothing more to define."],
        ["Rectangle", "A <b>non-terminal</b>: the name of another diagram. Go and follow that diagram, then come back."],
        ["Arrows in a line", "A <b>sequence</b>: the items must appear in that order."],
        ["Paths side by side (one above the other)", "<b>Alternatives</b>: choose exactly one path."],
        ["An arrow that loops back", "<b>Repetition</b>: the item can be used again, and again."],
        ["A path that skips an item", "The item is <b>optional</b>."]
      ]) +
      "<p>Use the first two animations below to see each of these, then follow strings through the diagrams yourself.</p>" +
      "<h4>2. Backus-Naur form (BNF)</h4>" +
      "<p>BNF is a list of <b>replacement rules</b>. Each rule says what an item can be replaced with.</p>" +
      tbl(["Symbol", "Meaning"], [["&lt; &gt;", "encloses the name of an item that is defined by a rule (a non-terminal)"], ["::=", "'is defined as'"], ["|", "or (a choice between alternatives)"], ["Characters with no &lt; &gt;", "typed exactly as written (terminals)"]]) +
      pre("<variable> ::= <letter><digit>\n<letter>   ::= A | B | C\n<digit>    ::= 1 | 2 | 3") +
      "<p>Two items side by side (no |) are a <b>sequence</b>, just like arrows in a line. Some books end each rule with a semicolon; the Cambridge papers normally do not.</p>" +
      "<h4>3. Repetition in BNF is recursion</h4>" +
      "<p>BNF has no loop symbol. To allow repetition, a rule is defined <b>using itself</b> (<b>recursion</b>). The loop-back arrow in a diagram becomes a recursive rule in BNF:</p>" +
      pre("<integer> ::= <digit> | <integer><digit>\n<digit>   ::= 0|1|2|3|4|5|6|7|8|9") +
      "<p>This says: an integer is a single digit, <b>or</b> an integer followed by one more digit. So 4 is an integer, then 47 (the integer 4 followed by 7), then 472, and so on.</p>" +
      "<h4>4. Converting between the two</h4>" +
      tbl(["Syntax diagram", "BNF"], [["Items in a line", "Items side by side: <code>&lt;a&gt;&lt;b&gt;</code>"], ["Alternative paths", "Separate with <code>|</code>"], ["Loop-back arrow", "A recursive rule: <code>&lt;x&gt; ::= &lt;y&gt; | &lt;x&gt;&lt;y&gt;</code>"], ["Path that skips an item", "Write the rule with and without the item, separated by <code>|</code>"]]),
    example:
      "<p><b>Worked example.</b> The diagrams give a variable as a letter (A, B or C) followed by a digit (1, 2 or 3). In BNF: <code>&lt;variable&gt; ::= &lt;letter&gt;&lt;digit&gt;</code>, <code>&lt;letter&gt; ::= A | B | C</code>, <code>&lt;digit&gt; ::= 1 | 2 | 3</code>.</p>" +
      "<ul><li><b>A1, B3, C2</b> are valid: a letter from the list, then a digit from the list.</li><li><b>CC</b> is invalid: the second character must be a digit.</li><li><b>1A</b> is invalid: the letter must come first.</li><li><b>Z2</b> is invalid: Z is not one of the letters.</li><li><b>A4</b> is invalid: 4 is not one of the digits.</li></ul>" +
      "<p><b>Recursive example.</b> <code>&lt;integer&gt; ::= &lt;digit&gt; | &lt;integer&gt;&lt;digit&gt;</code> accepts 7, 42 and 1999. To show 42 is valid: 42 is an &lt;integer&gt; (4) followed by a &lt;digit&gt; (2), and 4 is a &lt;digit&gt;, so it is an &lt;integer&gt;.</p>" +
      "<p><b>Optional part.</b> A code is a letter, then a digit that may be missing: <code>&lt;code&gt; ::= &lt;letter&gt; | &lt;letter&gt;&lt;digit&gt;</code>. In the diagram, the digit rectangle has a path that goes round it.</p>" +
      "<p><b>Exam link:</b> past papers ask you to complete or write BNF rules, to draw or complete a syntax diagram, and to say whether given strings are valid. Always check every character, in order, against the rules.</p>",
    checks:[
      mc("What does the symbol | mean in BNF?", "Or (a choice between items)", ["And then", "Is defined as", "Repeat"], "It separates alternatives."),
      mc("What does ::= mean in BNF?", "Is defined as", ["Is not equal to", "Or", "Repeat"], "It separates an item from its definition."),
      mc("In a syntax diagram, what is drawn inside a rectangle?", "The name of another diagram (a non-terminal)", ["A character typed exactly as shown", "A comment", "The end of the program"], "Ovals/circles hold terminals; rectangles refer to other diagrams."),
      mc("In a syntax diagram, what does an arrow that loops back mean?", "The item can be repeated", ["The item is optional", "The program must stop", "The item is a comment"], "A loop lets the path go round again, so the item can be used several times."),
      mc("<variable> ::= <letter><digit>, <letter> ::= A|B|C, <digit> ::= 1|2|3. Which is a valid variable?", "B3", ["3B", "CC", "A4"], "A valid variable is a letter from A, B, C followed by a digit from 1, 2, 3."),
      mc("Which BNF rule describes an integer made of one or more digits?", "<integer> ::= <digit> | <integer><digit>", ["<integer> ::= <digit> <digit>", "<integer> ::= <integer>", "<integer> ::= <digit> & <digit>"], "The recursive rule allows any number of digits."),
      mc("Why does BNF use a recursive rule to show repetition?", "BNF has no loop symbol", ["Recursive rules run faster", "Digits can only be used once", "It saves the programmer typing"], "A rule that is defined using itself is the BNF way to repeat an item."),
      fill("Complete the BNF for a code made of the letter X followed by a digit.", "<code> {1} X<digit>\n<digit> {2} 0 {3} 1 {4} 2", [["::=", ["=", "->", ":"]], ["::=", ["=", "->", ":"]], ["|", ["&", ",", "+"]], ["|", ["&", ",", "+"]]], "::= means 'is defined as' and | separates the alternatives."),
      tx("State the purpose of BNF. [1]", [["grammar","syntax","rules","define","language"]], 1, "BNF is a formal way of defining the syntax (grammatical rules) of a programming language.")
    ] },

  { id:"16.2d", code:"16.2.4", title:"Reverse Polish Notation: converting expressions",
    concept:
      "<p><b>Reverse Polish Notation (RPN)</b> is <b>postfix</b> notation: the operator comes <b>after</b> its operands, so no brackets are needed. A + B is written A B +. Compilers use RPN because the expression can be evaluated from left to right with a stack and no back-tracking.</p>" +
      "<p><b>Converting to RPN by hand:</b></p>" +
      "<ol><li>Find the operation done first (brackets, then × and ÷, then + and −; equal precedence goes left to right).</li><li>Write its two operands then the operator; treat that as one item.</li><li>Repeat until finished.</li></ol>",
    example:
      tbl(["Infix", "Working", "RPN"], [
        ["A − B × C", "B × C first → B C ×, then A (B C ×) −", "A B C × −"],
        ["(A + B) × (C − D)", "A B + and C D − first, then × them", "A B + C D − ×"],
        ["A + B + C × D", "C × D first, then (A + B), then add", "A B + C D × +"],
        ["(A + B + C) × D", "(A + B) + C inside the bracket, then × D", "A B + C + D ×"],
        ["(A + B) × D + (A − B) × C", "two products then added", "A B + D × A B − C × +"]]) +
      "<p>The operands stay in the same left-to-right order; only operators move.</p>",
    checks:[
      mc("Convert A + B × C to RPN.", "A B C × +", ["A B + C ×", "A + B C ×", "× + A B C"], "B × C is done first, then A is added."),
      mc("Convert (A + B) × C to RPN.", "A B + C ×", ["A B C × +", "A + B C ×", "A B C + ×"], "The bracket is done first."),
      mc("Convert (A − B) ÷ (C + D) to RPN.", "A B − C D + ÷", ["A B C D − + ÷", "A − B C + D ÷", "÷ − A B + C D"], "Both brackets first, then divide."),
      mc("Why do compilers use RPN?", "Expressions can be evaluated left to right using a stack, without brackets", ["It uses more memory", "It needs the operators in front", "It makes the program run slower"], "No brackets and no back-tracking are needed."),
      mc("Which is the RPN for the expression (A + B) × D + (A − B) × C?", "A B + D × A B − C × +", ["A B D + × A B C − × +", "A B + D A B − C × × +", "+ × A B D × − A B C"], "Convert each bracket first: A B + then × D; A B − then × C; finally add the two results.")
    ] },

  { id:"16.2e", code:"16.2.4", title:"Evaluating RPN with a stack",
    concept:
      "<p>To evaluate an RPN expression:</p>" +
      "<ol><li>Read the expression from <b>left to right</b>.</li><li>If the item is an <b>operand</b> (value), <b>push</b> it onto the stack.</li><li>If it is an <b>operator</b>, <b>pop</b> the top two values (the <b>first</b> pop is the <b>second operand</b>), apply the operator and <b>push</b> the result.</li><li>At the end, the single value on the stack is the answer.</li></ol>" +
      "<p><b>Careful with − and ÷:</b> for the RPN <code>X Y −</code>, the answer is X − Y, where Y was on the top of the stack.</p>",
    example:
      "<p>Evaluate <code>A B + C D − ×</code> with A = 2, B = 3, C = 4, D = 5:</p>" +
      stacks([["2", "2"], ["3", "2, 3"], ["+", "5"], ["4", "5, 4"], ["5", "5, 4, 5"], ["−", "5, −1 (4 − 5)"], ["×", "−5 (5 × −1)"]]) +
      "<p>Answer: <b>−5</b>.</p>" +
      "<p>Evaluate <code>A B + D × A B − C × +</code> with A = 7, B = 3, C = 5, D = 2: (7 + 3) × 2 = 20; (7 − 3) × 5 = 20; 20 + 20 = <b>40</b>.</p>",
    checks:[
      mc("Evaluate the RPN expression 6 2 3 + ×.", "30", ["11", "36", "20"], "2 + 3 = 5; 6 × 5 = 30."),
      mc("Evaluate the RPN expression 10 4 − 3 ×.", "18", ["6", "30", "−18"], "10 − 4 = 6; 6 × 3 = 18."),
      mc("Evaluate 2 3 4 × − (A = 2, B = 3, C = 4: A B C × −).", "−10", ["10", "−2", "20"], "3 × 4 = 12; 2 − 12 = −10."),
      mc("In a stack evaluation, an operator is read. What is done with the stack?", "The top two values are popped, the operation is performed, and the result is pushed", ["The operator is pushed", "The stack is emptied", "Only the top value is popped"], "The operator works on the top two items."),
      tx("Show the stack contents when evaluating 8 2 ÷ 3 + (the RPN of 8 ÷ 2 + 3). [3]", [["8"],["2"],["4"],["3"],["7"]], 4, "8 is pushed (8), 2 is pushed (8, 2), ÷ pops 2 and 8 and pushes 4 (4), 3 is pushed (4, 3), + pops 3 and 4 and pushes 7 (7). The result is 7.")
    ] }

  ];

  var TEST = {
    mcq:[
      mc("Which process state is a process in while it waits for a disk read to finish?", "Blocked", ["Running", "Ready", "Terminated"], "It cannot run until the I/O ends."),
      mc("Three processes arrive together with burst times 6, 3 and 8 ms. What is the average waiting time under shortest job first?", "4 ms", ["5 ms", "6.67 ms", "9 ms"], "Order 3, 6, 8: waits 0, 3, 9; total 12; average 4."),
      mc("What does a DMA controller allow?", "Data transfer between memory and a device without the CPU", ["Translation of programs", "Scheduling of processes", "Page replacement"], "The CPU is free for other tasks."),
      mc("A page is needed but is not in RAM. What is this called?", "A page fault", ["A segment fault", "A context switch", "A thrash point"], "The presence flag is 0."),
      mc("Which page replacement algorithm gives the fewest page faults but cannot be implemented?", "Optimal", ["FIFO", "LRU", "Clock"], "It needs future knowledge."),
      mc("Which compilation stage produces the token list?", "Lexical analysis", ["Syntax analysis", "Code generation", "Optimisation"], "Tokenisation happens in lexical analysis."),
      mc("Convert (A + B) × (C − D) to RPN.", "A B + C D − ×", ["A B C D + − ×", "A + B × C − D", "× + A B − C D"], "Brackets first."),
      mc("Evaluate the RPN expression 5 1 2 + 4 × + 3 −.", "14", ["12", "18", "9"], "1 + 2 = 3; 3 × 4 = 12; 5 + 12 = 17; 17 − 3 = 14.")
    ],
    typed:[
      { q:"Explain why a computer with limited RAM may become very slow when many programs are open. [3]", groups:[["virtual memory","swap","paging","pages"],["thrashing","disk","hard disk","moves pages","swapping"],["more time","slow","performance","little processing"]], need:3, model:"The OS uses virtual memory, so pages are constantly swapped between RAM and disk (disk thrashing). The computer spends more time swapping pages than processing, so performance falls." },
      { q:"State what happens in the syntax analysis stage of compilation. [2]", groups:[["token","tokens","tokenised","output from lexical analysis"],["grammar","rules","syntax","bnf","parse","parsing"],["error","errors","reported","code generation is not attempted"]], need:2, model:"The token list from lexical analysis is checked against the grammar rules (syntax) of the language, and any syntax errors are reported; code generation is not attempted if there are errors." },
      { q:"Describe the difference between a page and a frame. [2]", groups:[["page","logical","virtual"],["frame","physical","ram","main memory"],["fixed size","same size","equal size","fixed-size"]], need:2, model:"A page is a fixed-size block of logical (virtual) memory; a frame is a fixed-size block of physical memory (RAM) of the same size into which a page is loaded." }
    ]
  };

  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat(LESSONS);
  (root.ILEARN_TESTS = root.ILEARN_TESTS || {})[16] = TEST;
})(typeof window !== "undefined" ? window : this);
