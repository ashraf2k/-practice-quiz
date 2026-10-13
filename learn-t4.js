/* iLearn topic 4: Software (Cambridge IGCSE Computer Science 0478) */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx;
  var LESSONS = [

  // ---------- 4.1 Types of software and interrupts ----------
  { id:"4.1.1", code:"4.1.1", title:"System software and application software",
    concept:
      "<p><b>Software</b> is a set of instructions that tells a computer what to do. There are two main types.</p>" +
      "<ul><li><b>System software</b> manages and runs the <b>hardware and other software</b>, and allows them to communicate. It keeps the computer working efficiently. It includes the <b>operating system (OS)</b> and <b>utility programs</b>.</li>" +
      "<li><b>Application software</b> lets the <b>user perform a task</b>, such as writing a letter or browsing the web.</li></ul>" +
      "<table class='ln-table' style='text-align:left'><tr><th>System software</th><th>Application software</th></tr>" +
      "<tr><td>Operating system (Windows, Linux, macOS, Android, iOS)</td><td><b>Word processor</b>: create written documents</td></tr>" +
      "<tr><td>Utility: system clean-up (removes unused programs and data)</td><td><b>Spreadsheet</b>: calculations on data</td></tr>" +
      "<tr><td>Utility: defragmentation (stores a file's parts together and the free space together)</td><td><b>Database</b>: store and search data</td></tr>" +
      "<tr><td></td><td><b>Web browser</b>: view and move around web pages</td></tr></table>",
    example:
      "<p>When you type an essay, you use a <b>word processor</b> (application software). When your computer starts and runs the screen, keyboard and files in the background, that is the <b>operating system</b> (system software). Both are needed: the application cannot run without the system software.</p>",
    checks:[
      mc("Which of these is an example of system software?", "An operating system", ["A spreadsheet","A web browser","A word processor"], "The operating system manages the hardware. The others are application software."),
      mc("What is the purpose of application software?", "To allow the user to complete a task, such as writing a document", ["To manage the hardware and all of the other software","To start the computer when it is first switched on","To translate programs written by users into machine code"], "Application software provides services to the user. Managing hardware is the role of system software."),
      tx("Give two examples of application software and state what each is used for.", [["word processor","spreadsheet","database","web browser","browser","presentation","email","game","photo editor","drawing","video editing"],["document","calculation","store","search","view","website","web pages","write","text"]], 2, "For example: a word processor, used to create written documents; a spreadsheet, used to do calculations on data; a database, used to store and search data; a web browser, used to view web pages.")
    ] },

  { id:"4.1.2a", code:"4.1.2", title:"The operating system: user interfaces",
    concept:
      "<p>An <b>operating system (OS)</b> manages the computer and lets the <b>user interact with the hardware</b>. One of its roles is to provide a <b>user interface</b>, which lets the user enter data and receive output.</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Interface</th><th>How it works</th><th>Suits</th></tr>" +
      "<tr><td><b>Graphical user interface (GUI)</b></td><td>Windows, icons, menus and pointers (WIMP). The user clicks or taps.</td><td>Beginners: it is intuitive. e.g. Windows, phone screens</td></tr>" +
      "<tr><td><b>Command line interface (CLI)</b></td><td>The user types exact text commands.</td><td>Expert users. e.g. Linux terminal</td></tr>" +
      "<tr><td><b>Natural language interface</b></td><td>The user types or speaks ordinary language and the OS works out what is meant.</td><td>Hands-free use, e.g. voice assistants</td></tr></table>",
    example:
      "<p>To delete a file in a GUI you drag its icon to the recycle bin. In a command line interface you type an exact command such as <code>del report.txt</code>; a spelling mistake means the command fails. With a natural language interface you could say &ldquo;delete my report&rdquo;.</p>",
    checks:[
      mc("Which type of interface uses windows, icons, menus and pointers?", "Graphical user interface (GUI)", ["Command line interface","Natural language interface","Hardware interface"], "WIMP is the feature set of a GUI."),
      mc("A user types exact text commands to control the computer. Which interface is this?", "Command line interface", ["Graphical user interface","Natural language interface","Touch interface"], "Typing exact commands is a command line interface, usually used by expert users.")
    ] },

  { id:"4.1.2b", code:"4.1.2", title:"Other jobs of the operating system",
    concept:
      "<p>As well as the interface, the OS has these functions:</p>" +
      "<ul><li><b>Managing files</b>: create folders (directories), and move, copy, delete, name and rename files.</li>" +
      "<li><b>Managing peripherals and drivers</b>: peripherals are input and output devices. A <b>driver</b> is software that translates data between the computer and the device. The OS installs drivers and sends data to and from them.</li>" +
      "<li><b>Managing memory</b>: moves data in and out of RAM, makes sure each process has enough memory and that two processes do not use the same memory location.</li>" +
      "<li><b>Managing multitasking</b>: a processor runs one instruction at a time, but the OS switches quickly between tasks so several seem to run together.</li>" +
      "<li><b>Managing interrupts</b>: decides which interrupt to deal with.</li>" +
      "<li><b>Providing a platform for applications to run</b>.</li>" +
      "<li><b>Managing user accounts</b>: usernames and passwords, keeping each user's data separate and restricting access.</li></ul>",
    example:
      "<p>You are listening to music, typing an essay and printing. The OS shares the processor between the three tasks, gives each enough RAM, uses the printer driver to send data to the printer, and keeps your files in your own account, protected by your password.</p>",
    checks:[
      mc("What is the role of a device driver?", "To translate data between the computer and a peripheral", ["To store the files that a peripheral device creates","To increase the clock speed of the main CPU","To provide a graphical user interface to the user"], "Peripherals use their own format, so a driver translates between them and the OS."),
      mc("Which task is a file management function of an operating system?", "Renaming and moving files", ["Translating a program into machine code","Detecting errors in data transmission","Encrypting data in cloud storage"], "File management includes naming, renaming, moving, copying and deleting files.")
    ] },

  { id:"4.1.3", code:"4.1.3", title:"Hardware, firmware, OS and applications",
    concept:
      "<p>To run an application, several layers must work together:</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>When the computer is switched on, the <b>bootstrap</b> program, stored in ROM, runs first. It checks the hardware and loads the firmware.</li><li><b>Firmware</b> is the set of instructions stored in ROM that tells the hardware how to start and work. It loads the operating system.</li><li>The <b>operating system</b> manages the computer and lets applications run.</li><li><b>Application software</b> runs on top of the OS.</li></ol>" +
      "<p>An application cannot run without an OS; the OS cannot run without the firmware; the firmware needs the bootstrap to start it.</p>",
    example:
      "<table class='ln-table'><tr><th>Layer (top to bottom)</th></tr><tr><td>Application software (e.g. a word processor)</td></tr><tr><td>Operating system</td></tr><tr><td>Firmware</td></tr><tr><td>Bootstrap (loaded when the computer is switched on)</td></tr><tr><td>Hardware</td></tr></table>",
    checks:[
      mc("What loads the firmware when a computer is first switched on?", "The bootstrap program", ["The application software","The user's password","The data bus"], "The bootstrap program runs at start-up, checks the hardware and loads the firmware."),
      mc("Which statement about application software is correct?", "It needs an operating system to run", ["It runs directly on the bootstrap","It is stored permanently in RAM","It does not need hardware"], "Application software runs on the operating system.")
    ] },

  { id:"4.1.4a", code:"4.1.4", title:"Interrupts: what and why",
    concept:
      "<p>An <b>interrupt</b> is a <b>signal sent to the processor</b> telling it that something needs its attention. It can come from software or hardware.</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Software interrupts</th><th>Hardware interrupts</th></tr>" +
      "<tr><td>Division by zero</td><td>A key pressed or a mouse click</td></tr><tr><td>Two processes trying to use the same memory location</td><td>Printer out of paper</td></tr><tr><td>A program asking for input or output</td><td>Hardware failure</td></tr><tr><td>Data required from memory</td><td>A new device connected</td></tr></table>" +
      "<p>Every interrupt has a <b>priority</b>. A hardware failure is <b>high priority</b> and needs quick attention. Data input from a keyboard is <b>low priority</b>.</p>",
    example:
      "<p>You are typing a letter (word processor running) when the printer runs out of paper. The printer sends a <b>hardware interrupt</b> to the processor. The processor pauses the current work, deals with the interrupt (by showing a &ldquo;load paper&rdquo; message) and then goes back to your letter.</p>",
    checks:[
      mc("What is an interrupt?", "A signal that tells the processor something needs attention", ["A stored copy of a file kept for later use","A type of cache found in the processor chip","A fault in the hard disk that stops it spinning"], "Interrupts alert the processor to events such as key presses or errors."),
      mc("Which of these is a hardware interrupt?", "A printer running out of paper", ["Division by zero in a program","Two processes using the same memory location","A program asking to output a value"], "A printer error comes from hardware. The other three come from software.")
    ] },

  { id:"4.1.4b", code:"4.1.4", title:"How the processor handles an interrupt",
    concept:
      "<p>The <b>interrupt handler</b> puts each interrupt into a <b>queue in priority order</b>. The processor handles the queue like this:</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>At the end of each <b>fetch-decode-execute cycle</b>, the processor <b>checks the interrupt queue</b>.</li><li>It checks whether an interrupt has a <b>higher priority</b> than the task it is running.</li><li><b>If not</b>, it runs the next fetch-decode-execute cycle.</li><li><b>If so</b>, it <b>stores the current task</b> (so it can resume), finds the <b>source</b> of the interrupt, and calls the <b>interrupt service routine (ISR)</b>, a set of instructions that deals with it.</li><li>When the ISR has finished, the stored task is <b>restored</b>, or another higher priority interrupt is handled.</li></ol>",
    example:
      "<p>While a video is playing, a mouse click (low priority) arrives. The video is more important at that moment, so the click waits. But if a hardware failure interrupt (high priority) arrives, the processor stores the video task, runs the ISR for the failure, then goes back to the video.</p>",
    checks:[
      mc("What does the processor do before it starts an interrupt service routine?", "It stores the current task so it can be resumed later", ["It deletes the current task completely from RAM","It switches off the RAM until the end of the interrupt","It sends the interrupt on to the printer to be handled"], "The processor saves the current task so it can carry on after the interrupt is handled."),
      tx("Describe what happens when an interrupt is sent to the processor.", [["queue","priority","higher priority"],["after","end of","finishes","fetch-decode-execute","fde","cycle","checks"],["store","save","saved"],["interrupt service routine","isr","service routine","source","handler"],["restore","resume","return","carries on","continue"]], 4, "The interrupt is put in a queue by priority. At the end of each fetch-decode-execute cycle the processor checks the queue. If there is an interrupt with a higher priority than the current task, the current task is stored, the source of the interrupt is checked and the interrupt service routine runs. Afterwards the stored task is restored (or another interrupt is handled).")
    ] },

  // ---------- 4.2 Programming languages, translators and IDEs ----------
  { id:"4.2.1", code:"4.2.1", title:"High-level and low-level languages",
    concept:
      "<p>A <b>high-level language</b> uses human-style words (Python, Java, VB.NET: <code>print</code>, <code>if</code>, <code>while</code>). A <b>low-level language</b> is closer to the machine: <b>machine code</b> (binary) or <b>assembly language</b>.</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>High-level</th><th>Low-level</th></tr>" +
      "<tr><td>Easier to read, write, amend and debug</td><td>Harder to read, write and debug</td></tr>" +
      "<tr><td><b>Portable</b>: can run on different types of computer</td><td><b>Not portable</b>: machine dependent</td></tr>" +
      "<tr><td>Must be translated before it runs</td><td>Machine code needs no translation (assembly needs an assembler)</td></tr>" +
      "<tr><td>One statement = many machine instructions</td><td>Several instructions for each high-level statement</td></tr>" +
      "<tr><td>Cannot directly manipulate the hardware</td><td>Can directly control hardware and memory, so can be faster and use less memory</td></tr></table>",
    example:
      "<p>A game for phones is written in a high-level language so the same program can be converted for different devices. The control code inside a small microwave oven chip might be written in a low-level language, because the program must be very small and quick and must control the hardware directly.</p>",
    checks:[
      mc("Which feature is true of a high-level language?", "It is portable between different types of computer", ["It is written in binary","It directly controls the hardware registers","It does not need to be translated"], "High-level languages are machine independent (portable) but must be translated."),
      mc("Why might a programmer choose a low-level language?", "To control the hardware directly and use less memory", ["To make the code much easier for people to read","To make the program portable between computers","To avoid having to use any kind of translator"], "Low-level code can manipulate hardware directly, which can make programs faster and smaller.")
    ] },

  { id:"4.2.2", code:"4.2.2", title:"Assembly language and the assembler",
    concept:
      "<p><b>Assembly language</b> is a low-level language that uses <b>mnemonics</b> (short codes that stand for instructions) instead of binary, for example <code>LDD</code> (load), <code>ADD</code>, <code>STO</code> (store).</p>" +
      "<ul><li>It is written for one type of processor, so it is <b>not portable</b>.</li><li>The computer can only run <b>machine code</b>, so assembly must be converted first. The translator is called an <b>assembler</b>.</li><li>One high-level statement usually needs <b>several</b> assembly instructions.</li><li>Assembly gives direct control over the hardware and memory locations.</li></ul>",
    example:
      "<p>The high-level statement <code>count = count + 1</code> becomes three assembly instructions:</p>" +
      "<pre class='ln-pre'>LDD count   ; load the value of count\nADD 1       ; add 1\nSTO count   ; store the result back in count</pre>" +
      "<p>The assembler then converts each mnemonic into binary machine code, such as <code>01100110</code>.</p>",
    checks:[
      mc("What translator converts assembly language into machine code?", "An assembler", ["A compiler","An interpreter","A browser"], "An assembler translates assembly language mnemonics into machine code."),
      mc("Which line is written in assembly language?", "STO total", ["total = total + 1","11010010","print(total)"], "STO is a mnemonic. The other options are high-level code and binary machine code.")
    ] },

  { id:"4.2.3a", code:"4.2.3", title:"The interpreter",
    concept:
      "<p>A program written in a high-level language must be translated into machine code. There are two translators: the <b>interpreter</b> and the <b>compiler</b>.</p>" +
      "<p>An <b>interpreter</b>:</p>" +
      "<ul><li>reads <b>one line</b> of source code at a time,</li><li>checks that line for errors; if there is a <b>syntax error</b> it <b>stops and reports</b> the error to the user,</li><li>if the line is correct, it <b>translates and runs</b> it, then moves to the next line.</li></ul>" +
      "<p>It <b>does not create an executable file</b>, so it must translate the code <b>every time</b> the program is run, and the user needs the interpreter and the source code.</p>",
    example:
      "<p>A student has typed 50 lines of a program, and line 12 has a spelling mistake in a command. The interpreter runs lines 1 to 11, stops at line 12 and reports the error. The student fixes it and continues from the same place. This makes interpreters good for writing and testing code as it is written.</p>",
    checks:[
      mc("How does an interpreter report a syntax error?", "It stops at the line with the error and reports it", ["It reports all of the errors together only at the end","It ignores the error and carries on to the next line","It deletes the line and then rewrites it for you"], "An interpreter works line by line and stops as soon as an error is found."),
      mc("Does an interpreter create an executable file?", "No, it translates the code each time the program is run", ["Yes, so the program never needs translating again","Yes, but it hides the source code","No, because it only translates assembly"], "An interpreter produces no executable file, so the translation happens every time.")
    ] },

  { id:"4.2.3b", code:"4.2.3", title:"The compiler",
    concept:
      "<p>A <b>compiler</b> translates the <b>whole program</b> at once.</p>" +
      "<ul><li>It checks all the code. If there are syntax errors, it <b>reports them all together</b> and <b>does not run</b> the program.</li><li>If there are no errors, it creates an <b>executable file</b> (machine/object code).</li><li>The executable file can be <b>run again and again without re-translating</b>, and the user does <b>not need the source code or the compiler</b>.</li><li>The source code stays hidden, so it is protected.</li></ul>",
    example:
      "<p>A company finishes a game and compiles it. The compiler lists any errors; once there are none, it creates <code>game.exe</code>. The company sells <code>game.exe</code>. Players can run it quickly, but cannot see or copy the original source code.</p>",
    checks:[
      mc("What does a compiler produce when the code has no errors?", "An executable file", ["A list of mnemonics","A new source code file","A syntax error report"], "A compiler creates an executable file that can be run without translating again."),
      mc("A compiler finds errors in three different lines. What does it do?", "It reports all the errors and does not run the program", ["It runs lines up to the first error","It fixes the errors automatically","It runs the program and ignores the errors"], "A compiler checks the whole program and reports all syntax errors; the program is not run until they are fixed.")
    ] },

  { id:"4.2.4", code:"4.2.4", title:"Compiler or interpreter? Choosing and justifying",
    concept:
      "<table class='ln-table' style='text-align:left'><tr><th>Interpreter</th><th>Compiler</th></tr>" +
      "<tr><td>Translates and runs one line at a time</td><td>Translates the whole program before running</td></tr>" +
      "<tr><td>Stops at the first error and reports it</td><td>Reports all errors together</td></tr>" +
      "<tr><td><b>Best while writing</b> and testing a program: you can test part of an unfinished program and fix errors as they appear</td><td><b>Best when finished</b>: runs quickly and repeatedly</td></tr>" +
      "<tr><td>No executable file; code is re-translated each run; needs source code and interpreter</td><td>Creates an executable file; no need to re-translate; source code stays hidden</td></tr></table>" +
      "<p><b>Exam tip:</b> relate every reason to the scenario given (developing the program, or distributing the finished program).</p>",
    example:
      "<p><b>Saria is still writing her game.</b> She should use an <b>interpreter</b>: it stops at each error so she can correct it and continue, and she can test finished parts of the program.</p>" +
      "<p><b>Saria has finished and wants to sell the game.</b> She should use a <b>compiler</b>: it produces an executable file that users can run without the source code, so she protects her code and it does not need translating each time.</p>",
    checks:[
      mc("Why is an interpreter useful while a program is being written?", "It stops at each error so it can be corrected and carried on", ["It produces an executable file","It shows all the errors at the same time at the end","It hides the source code from users"], "Interpreters report an error as soon as it is found, which helps during development."),
      tx("A programmer has finished a program and wants to sell it. State which translator should be used and give two reasons.", [["compiler"],["executable","exe"],["source code","hidden","protect","cannot see","not be able to see","copy"],["re-translat","translat","not need to be","faster","quickly","each time"]], 3, "A compiler. It creates an executable file that customers can run without needing the source code, so the code is protected and cannot be copied or changed. The program does not need to be translated again each time it is run, so it runs faster.")
    ] },

  { id:"4.2.5", code:"4.2.5", title:"Integrated development environments (IDEs)",
    concept:
      "<p>An <b>IDE</b> is software that helps you write, run, test and correct a program. It has:</p>" +
      "<ul><li>a <b>code editor</b> with features such as <b>auto-completion</b> (suggests commands as you type), <b>auto-correction</b>, <b>prettyprint</b> (colours keywords and identifiers), and <b>block minimising</b> (collapses sections like procedures to make code easier to read);</li><li>a built-in <b>translator</b> (compiler or interpreter);</li><li>a <b>run-time environment</b> where the program runs and its output is shown;</li><li><b>debugging tools</b>: <b>breakpoints</b> (stop the program on a chosen line), a <b>variable watch window</b> (shows the values of variables as the program runs), and <b>stepping</b> (run one line at a time).</li></ul>",
    example:
      "<p>A program prints the wrong total. The student sets a <b>breakpoint</b> on the line inside the loop, then <b>steps</b> through one line at a time while watching <code>total</code> in the <b>variable watch window</b>. They see that <code>total</code> is set to 0 inside the loop instead of before it, and find the error.</p>",
    checks:[
      mc("Which IDE feature lets a programmer run the program one line at a time?", "Stepping", ["Prettyprint","Block minimising","Auto-completion"], "Stepping runs one line at a time so the program can be checked line by line."),
      mc("What does the prettyprint feature of an IDE do?", "It colours keywords and identifiers to make them easier to spot", ["It stops the program at a line chosen by the user","It shows the values of the variables as it runs","It suggests the rest of a command as you type it"], "Prettyprint changes the colour of keywords and identifiers so errors are easier to see.")
    ] }

  ];

  var TEST = {
    mcq:[
      mc("Which statement describes system software?", "It manages the hardware and other software", ["It lets the user write letters","It is only stored in RAM","It is written in machine code only"], "System software, such as the operating system and utilities, manages hardware and software."),
      mc("A GUI is most suitable for which type of user?", "A novice user", ["An expert programmer only","A user with no screen","A user who can only speak"], "A GUI is intuitive, so it suits novices."),
      mc("What is the name of the program that runs first when a computer is switched on?", "Bootstrap", ["Compiler","Interrupt service routine","Driver"], "The bootstrap in ROM starts the computer and loads the firmware."),
      mc("Which translator turns assembly language into machine code?", "Assembler", ["Compiler","Interpreter","Driver"], "An assembler converts assembly language into machine code."),
      mc("Which IDE feature stops a program at a chosen line so values can be checked?", "Breakpoint", ["Prettyprint","Auto-correction","Block minimising"], "A breakpoint pauses the program on a chosen line.")
    ],
    typed:[
      { q:"Explain two functions of an operating system.", groups:[["file","folder","directory"],["memory","ram"],["driver","peripheral","device"],["interface","gui","command line"],["multitask","interrupt"],["account","password","user"]], need:2, model:"For example: it manages files (create, move, copy, delete and name files and folders); it manages memory (allocates RAM to processes); it manages peripherals using drivers; it provides a user interface; it handles multitasking and interrupts; it manages user accounts and passwords." },
      { q:"Describe two differences between a compiler and an interpreter.", groups:[["whole","all the code","all lines","entire"],["one line","line by line","each line"],["executable","exe"],["all errors","errors together","stops","first error","as soon as"],["each time","every time","again","re-translat"]], need:3, model:"A compiler translates the whole program at once, but an interpreter translates and runs it one line at a time. A compiler creates an executable file, but an interpreter does not so the code is re-translated each time. A compiler reports all errors together, while an interpreter stops at the first error." }
    ]
  };

  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat(LESSONS);
  (root.ILEARN_TESTS = root.ILEARN_TESTS || {})[4] = TEST;
})(typeof window !== "undefined" ? window : this);
