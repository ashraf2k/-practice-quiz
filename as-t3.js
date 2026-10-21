/* iLearn AS Level (11BR) -- Topic 3 Hardware. Every lesson ends with a REAL Cambridge 9618 past-paper question marked on the mark-scheme keywords. */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx, tbl = root.ASA.tbl, ASA = root.ASA;
  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat([

  { id:"3.1.1a", code:"3.1.1", title:"Input, output, storage and embedded systems",
    concept:
      "<p>Every computer system needs four kinds of component:</p>" +
      tbl(["Component", "Job", "Examples"], [["Input device", "gets data into the computer", "keyboard, touchscreen, microphone, sensor"], ["Output device", "presents results to the user", "monitor, printer, speaker"], ["Primary memory", "directly accessed by the CPU; holds the program and data being used now", "RAM, ROM"], ["Secondary storage", "keeps data permanently when the power is off (including <b>removable</b> storage)", "SSD, hard disk, optical disc, USB flash drive"]]) +
      "<p>An <b>embedded system</b> is a computer built into a device to do <b>one dedicated job</b> (a washing machine, a car's braking system, a health monitor).</p>" +
      "<h4>Drawbacks of embedded systems</h4>" +
      "<ul><li>The user finds it <b>difficult to change or update the firmware</b>.</li><li>Faults are hard to fix: <b>repair is a specialist, expensive task</b>.</li><li>Functionality <b>cannot be easily extended</b> or adapted to another task.</li><li>Faulty or outdated devices are thrown away, causing <b>e-waste</b>.</li></ul>",
    example:
      "<p>A microwave oven contains an embedded system: its keypad (input) and display (output) are connected to a small processor whose program is in ROM. You cannot install a game on it &mdash; that is the point and the limitation.</p>" +
      "<p><b>A touchscreen is both</b> an input and an output device. There are two main types: a <b>resistive</b> screen has two layers that touch and complete a circuit; a <b>capacitive</b> screen has several layers and the touch causes a change in the electric current. In both, a microprocessor identifies the <b>coordinates</b> of the touch.</p>",
    checks:[
      mc("Which is a feature of an embedded system?", "It does one dedicated task", ["It runs any program the user installs", "It has no processor", "It needs a keyboard and monitor"], "Embedded systems are built for a specific job."),
      mc("Which is secondary (permanent) storage?", "Solid state drive", ["RAM", "CPU register", "Cache"], "Secondary storage keeps data when the power is off."),
      mc("Which touchscreen detects a change in electric current when the top layer is touched?", "Capacitive", ["Resistive", "Infra-red only", "Optical"], "Capacitive screens detect a change in current; resistive screens complete a circuit."),
      tx("Describe one drawback of an embedded system. [1]", [["firmware","update","change","fix","repair","specialist","extend","adapt","thrown","e-waste","waste"]], 1, "For example, the firmware is difficult to update; faults are difficult to repair; the functionality cannot easily be extended; faulty devices are thrown away."),
      ASA.pp("9618/12 October/November 2024 · Question 2(a)", "Three different drawbacks: firmware cannot be updated by the user, repair is a specialist task, functionality cannot be extended, devices thrown away (e-waste).",
        [ ASA.text("(a)", 3, "Embedded systems are used in many electronic devices. Describe the drawbacks of embedded systems.",
            [ ["It is difficult to change / update the firmware by the user", ["firmware", "update", "upgrade", "change the program", "reprogram"]], ["Errors cannot be fixed easily // troubleshooting / repairing is a specialist and expensive task", ["fix", "repair", "troubleshoot", "fault", "specialist", "expensive", "error"]], ["Functionality cannot be changed / extended easily // cannot be easily adapted for another task", ["functionality", "extend", "adapt", "another task", "different task", "one task", "single task", "only do one"]], ["Faulty / outdated devices are often thrown away rather than repaired ...", ["thrown away", "throw away", "discard", "dispose", "replace"]], ["... leading to e-waste", ["e-waste", "e waste", "electronic waste", "waste", "environment", "landfill"]] ],
            { lead: "1 mark for each bullet point, maximum 3:", lines: 5 }) ])
    ] },

  { id:"3.1.2a", code:"3.1.2", title:"Buffers, ports and how a printer works",
    concept:
      "<p>The CPU works millions of times faster than a printer. A <b>buffer</b> is a temporary store in memory that sits between the two so the fast device does not have to wait.</p>" +
      "<ol><li>The computer sends the print data to the <b>buffer</b> at <b>computer speed</b>.</li><li>The buffer passes the data to the printer at <b>printer speed</b>.</li><li>The user and the processor can <b>carry on with other work</b> instead of waiting for the slower printer.</li><li>When the buffer is <b>empty</b>, an <b>interrupt</b> is sent to the computer asking for more data.</li></ol>" +
      "<h4>Ports</h4>" +
      tbl(["Port", "Used for", "Key feature"], [["USB", "keyboards, mice, flash drives, VR headsets", "universal standard; fast data transfer"], ["HDMI", "monitors, TVs, projectors", "carries <b>video and audio on one cable</b>"], ["VGA", "older monitors / projectors", "analogue video only"]]),
    example:
      "<p>Sending a 100-page document to a laser printer: the data goes to the print buffer in a fraction of a second. You carry on typing while the printer works through the buffer. When the buffer empties, the printer sends an interrupt and the computer sends the next chunk.</p>" +
      "<p>For a justified port question you need <b>two parts</b>: the correct name <i>and</i> a matching reason &mdash; USB: fast transfer speeds; HDMI: video and audio on the same cable.</p>",
    checks:[
      mc("What is a buffer used for when printing?", "To store data temporarily so the CPU does not wait for the printer", ["To make the printer faster", "To store the operating system", "To encrypt the document"], "A buffer bridges the speed difference."),
      mc("What does a printer send to the computer when its buffer is empty?", "An interrupt", ["A virus warning", "A password", "A URL"], "The interrupt requests more data."),
      mc("Which port carries video and audio on the same cable?", "HDMI", ["VGA", "Serial", "PS/2"], "HDMI carries both."),
      tx("Identify one port for connecting a monitor and justify your choice. [3]", [["hdmi","usb","vga","displayport"],["video","audio","fast","speed","universal","one cable","standard","resolution"]], 2, "HDMI because it transfers video and audio on the same cable (no need for two cables)."),
      ASA.pp("9618/13 October/November 2023 · Question 7(c) and (d)", "Buffer: data goes in at computer speed and out at printer speed, so the computer is free; an empty buffer sends an interrupt. For the port, give a name and a matching reason.",
        [ ASA.text("(c)", 4, "A laser printer is connected to a laptop. Describe how the laser printer makes use of a buffer.",
            [ ["The print instructions and data are sent by the laptop to a buffer (at laptop speed)", ["sent", "send", "stored", "store", "held", "holds", "placed"], ["buffer"]], ["The data is transferred from the buffer to the printer (at printer speed)", ["from the buffer", "buffer to the printer", "printer speed", "buffer sends"]], ["... allowing the user to continue using the laptop // allowing the processor to continue processing", ["continue", "carry on", "free", "other task", "other work", "does not have to wait", "doesn't have to wait", "without waiting"]], ["... instead of waiting for the relatively slower printer", ["slower", "slow", "wait"]], ["When the buffer is empty an interrupt is sent to the laptop", ["empty"], ["interrupt"]], ["... requesting more data", ["more data", "next", "request"]] ],
            { lead: "1 mark for each bullet point, maximum 4:", lines: 6 }),
          ASA.fields("(d)", 1, "Identify one port that could be used to connect a virtual reality headset to the laptop (then justify it below).",
            [ ["Port", ["usb", "hdmi", "displayport", "display port"], "text", "USB (or HDMI)", 1] ],
            { lead: "1 mark for the port name:" }),
          ASA.text("(d) justification", 2, "Justify your choice of port (type the reason).",
            [ ["USB: fast data transfer speeds for data to the headset // HDMI: video and audio on the same cable", ["fast", "speed", "quick", "video and audio", "audio and video", "same cable", "one cable", "high bandwidth", "high resolution", "bandwidth"]], ["USB: universal / popular standard cable // HDMI: no need for two cables", ["universal", "popular", "standard", "common", "widely", "no need for two", "one cable", "single cable", "convenien"]] ],
            { lead: "2 marks for a matching justification:", lines: 2 }) ])
    ] },

  { id:"3.1.3a", code:"3.1.3", title:"RAM and ROM: SRAM, DRAM, EPROM and EEPROM",
    concept:
      tbl(["", "RAM (random access memory)", "ROM (read only memory)"], [["Volatile?", "<b>volatile</b>: contents lost when power is off", "<b>non-volatile</b>: contents kept"], ["Holds", "programs and data in use now (read and write)", "the boot-up instructions (firmware); read only in normal use"]]) +
      tbl(["Type", "Key facts"], [["SRAM (static)", "faster access time, does <b>not need to be refreshed</b>, more expensive, lower bit density; used for <b>cache</b> in the CPU"], ["DRAM (dynamic)", "needs to be <b>refreshed</b> constantly, slower, <b>cheaper</b> and <b>higher bit density</b> (more data per chip); used for main memory"], ["PROM", "programmed <b>once</b> after manufacture"], ["EPROM", "erased by <b>ultraviolet light</b>; must be <b>removed from the circuit board</b>; erases <b>all</b> the data"], ["EEPROM", "erased by an <b>electrical signal</b>; stays in the circuit; can erase <b>parts</b> of the data; used for firmware that is updated"]]),
    example:
      "<p>A laptop uses <b>SRAM</b> for its cache because the CPU needs the fastest possible access (no refresh delay), but uses <b>DRAM</b> for its main memory because it is cheaper and stores more per chip.</p>" +
      "<p>A VR headset keeps its firmware in <b>EEPROM</b>, so the manufacturer can send an update that changes the firmware without removing the chip or erasing it completely first.</p>",
    checks:[
      mc("Why is SRAM used for cache memory?", "It has a faster access time because it does not need refreshing", ["It is cheaper than DRAM", "It stores more data per chip", "It is non-volatile"], "SRAM is faster but more expensive."),
      mc("Which memory is erased with ultraviolet light?", "EPROM", ["EEPROM", "SRAM", "DRAM"], "EEPROM uses an electrical signal."),
      mc("Which is a benefit of DRAM over SRAM?", "It is cheaper to manufacture and has a higher bit density", ["It is faster", "It never needs refreshing", "It is non-volatile"], "DRAM is cheaper and denser."),
      tx("Give two differences between EPROM and EEPROM. [2]", [["ultraviolet","uv"],["electrical","electric signal","electronic"],["removed","remain","in the circuit","all the data","parts"]], 2, "EPROM uses UV light to erase and EEPROM an electrical signal; EPROM must be removed from the circuit board; EPROM erases all the data, EEPROM can erase parts."),
      ASA.pp("9618/12 October/November 2024 · Question 2(b) and (c)", "DRAM benefit: cheaper / more bits per chip. EPROM vs EEPROM: UV light vs electrical signal; removed from the board vs stays; all data vs parts.",
        [ ASA.text("(b)", 1, "An embedded system has Dynamic RAM (DRAM). Identify one benefit of using DRAM instead of Static RAM (SRAM) in an embedded system.",
            [ ["DRAM is less expensive to manufacture / purchase than SRAM // DRAM has a higher bit density per chip (more data per chip)", ["less expensive", "cheaper", "cheap", "lower cost", "cost less", "higher bit density", "more data per chip", "more data can be stored", "store more", "higher density", "smaller"]] ],
            { lead: "1 mark from:", lines: 2 }),
          ASA.text("(c)", 2, "Give two differences between Erasable Programmable ROM (EPROM) and Electrically Erasable Programmable ROM (EEPROM).",
            [ ["EPROM uses ultraviolet light to erase data whilst EEPROM uses an electrical signal", ["ultraviolet", "uv", "electrical signal", "electric", "electronic"]], ["EPROM has to be removed from the circuit board when changing the data whilst EEPROM remains in the circuit", ["removed", "remove", "taken out", "remains in", "stays in", "in the circuit", "in circuit", "on the circuit board"]], ["EPROM erases all the data, EEPROM can erase parts of the data", ["all the data", "all of the data", "entire", "whole", "parts of", "part of", "specific", "individual", "selective"]] ],
            { lead: "1 mark for each bullet point, maximum 2:", lines: 3 }) ])
    ] },

  { id:"3.1.4a", code:"3.1.4", title:"Sensors, monitoring and control systems",
    concept:
      "<p>A <b>sensor</b> measures a physical quantity (temperature, pressure, light, infra-red, sound, moisture, motion). Its analogue signal is converted to digital for the processor. An <b>actuator</b> is an output device that makes something move or change (a motor, a valve, a heater, a brake).</p>" +
      tbl(["", "Monitoring system", "Control system"], [["Purpose", "checks and reports values; may warn the user", "uses the readings to <b>change</b> the physical process automatically"], ["Actuators", "none (an alarm or sign is only an indicator)", "<b>yes</b>: they change the environment"], ["Feedback", "<b>no feedback</b>: the output does not affect the input", "<b>feedback</b>: the output changes the next input (a closed loop)"], ["Example", "hospital heart monitor; bridge warning sign", "central heating thermostat; automatic braking"]]),
    example:
      "<p><b>Central heating:</b> the temperature sensor reads 17&deg;C (input). The processor compares it with the target of 20&deg;C and switches the heater actuator on. The room warms, so the next sensor reading is higher (the output changed the input = <b>feedback</b>). At 20&deg;C the heater switches off.</p>" +
      "<p>A bridge warning sign that just lights up has <b>no actuator and no feedback</b>: switching the sign on does not change the height or weight readings, so it is a <b>monitoring</b> system. <b>Careful:</b> the mark scheme gives <i>no mark for naming the system</i>, only for the justification.</p>",
    checks:[
      mc("What is the job of an actuator?", "To make a physical change, such as moving a motor", ["To measure temperature", "To store data", "To encrypt signals"], "Actuators are output devices that act on the environment."),
      mc("Which feature shows a system is a control system?", "Feedback", ["A display screen", "A keyboard", "A printer"], "Output from a control system changes the next input."),
      mc("Which sensor would best measure the weight of a lorry on a bridge?", "Pressure sensor", ["Light sensor", "Sound sensor", "Humidity sensor"], "Pressure (weight) sensors measure force."),
      tx("Explain why an automatic braking system in a car is a control system. [3]", [["feedback"],["brak","actuator","acts independently","automatic"],["distance","input","sensor","new distance"]], 3, "It uses feedback: the sensor input causes the car to brake, the braking changes the distance to the object, and the new distance is used to decide whether or how hard to brake. It acts independently."),
      ASA.pp("9618/12 October/November 2024 · Question 9", "Name two different sensors AND what each measures. To decide monitoring vs control, look for feedback and actuators - no mark for just naming the system.",
        [ ASA.text("(a)", 2, "A road bridge has a weight limit (10 000 kg) and a height limit (3 m). A sign warns drivers of vehicles that exceed the limits. Identify two different sensors that could be used by the system and describe how each sensor is used by the system.",
            [ ["Infra-red sensor: measure / check the height of the vehicle", ["infra", "ir sensor", "infrared", "ultrasonic", "light sensor", "laser", "proximity"], ["height", "tall"]], ["Pressure sensor: measure / check the weight of the vehicle", ["pressure", "weight sensor", "load sensor", "strain", "force"], ["weigh", "weight", "mass"]] ],
            { lead: "1 mark for each sensor and its use in this system:", lines: 3 }),
          ASA.text("(b)", 2, "Explain whether the bridge warning system is an example of a monitoring system or of a control system.",
            [ ["There is no use of feedback // the warning sign is only an indicator", ["no feedback", "not use feedback", "doesn't use feedback", "does not use feedback", "without feedback", "indicator", "only warns", "only displays"]], ["The turning on of the sign does not affect the input of data from the sensors", ["does not affect", "doesn't affect", "not affect", "no effect", "does not change", "doesn't change", "not change the input", "not change the sensor"]], ["The system does not have any actuators", ["no actuator", "not have any actuator", "doesn't have any actuator", "does not have any actuator", "without actuator", "not use actuator"]] ],
            { lead: "1 mark for each bullet point, maximum 2 (no marks for just naming the system):", lines: 3 }) ])
    ] },

  { id:"3.2.1a", code:"3.2.1", title:"Logic gates and truth tables",
    concept:
      tbl(["Gate", "Output is 1 when&hellip;", "Memory hook"], [["NOT", "the input is 0 (it flips the input)", "opposite"], ["AND", "<b>both</b> inputs are 1", "all must be 1"], ["OR", "<b>at least one</b> input is 1", "any one"], ["NAND", "NOT AND: 0 only when both inputs are 1", "AND, then flip"], ["NOR", "NOT OR: 1 only when both inputs are 0", "OR, then flip"], ["XOR", "the inputs are <b>different</b>", "one or the other, not both"]]) +
      "<p><b>Truth table method:</b> a table with n inputs has 2<sup>n</sup> rows (3 inputs = 8 rows, in binary counting order 000 to 111). Work out each <b>bracket in its own working column</b>, then combine them.</p>",
    example:
      "<p>For <code>X = (A XOR B) NAND (A AND (B XOR C))</code> take row A=1, B=0, C=1:</p>" +
      "<ul><li>A XOR B = 1 XOR 0 = <b>1</b></li><li>B XOR C = 0 XOR 1 = 1, and A AND 1 = <b>1</b></li><li>1 NAND 1 = <b>0</b></li></ul>" +
      "<p>So X is 0 on that row. Now do all eight rows with the working-space columns; the mark scheme gives one mark for each half of the table.</p>",
    checks:[
      mc("What is the output of an XOR gate when both inputs are 1?", "0", ["1", "Depends on the clock", "Undefined"], "XOR is 1 only when the inputs are different."),
      mc("Which gate gives 0 only when both inputs are 1?", "NAND", ["NOR", "OR", "XOR"], "NAND is the opposite of AND."),
      mc("How many rows does a truth table with 4 inputs have?", "16", ["8", "4", "12"], "2 to the power 4 = 16."),
      tx("State the output of a NOR gate when A = 0 and B = 0, and explain why. [1]", [["1","one"],["neither","both inputs are 0","or gives 0","not or","opposite of or","inverts"]], 2, "The output is 1: OR of 0 and 0 is 0, and NOR inverts it to 1."),
      ASA.pp("9618/12 October/November 2024 · Question 1(a)", "Work out the two XOR columns and the AND column in your head or on paper first. Type the X column for the first four rows (000 to 011), then the last four rows (100 to 111).",
        [ ASA.fields("(a)", 2, "Complete the truth table for the logic expression: X = (A XOR B) NAND (A AND (B XOR C)).<br><table class='ln-table'><tr><th>A</th><th>B</th><th>C</th><th>X</th></tr><tr><td>0</td><td>0</td><td>0</td><td>?</td></tr><tr><td>0</td><td>0</td><td>1</td><td>?</td></tr><tr><td>0</td><td>1</td><td>0</td><td>?</td></tr><tr><td>0</td><td>1</td><td>1</td><td>?</td></tr><tr><td>1</td><td>0</td><td>0</td><td>?</td></tr><tr><td>1</td><td>0</td><td>1</td><td>?</td></tr><tr><td>1</td><td>1</td><td>0</td><td>?</td></tr><tr><td>1</td><td>1</td><td>1</td><td>?</td></tr></table>Type the four X values for each half as four digits with no spaces.",
            [ ["X for rows 000, 001, 010, 011", ["1111"], "bin", "1111", 1], ["X for rows 100, 101, 110, 111", ["1011"], "bin", "1011", 1] ],
            { lead: "1 mark for each correct half of the table:", scheme: tbl(["A", "B", "C", "X"], [["0","0","0","1"],["0","0","1","1"],["0","1","0","1"],["0","1","1","1"],["1","0","0","1"],["1","0","1","<b>0</b>"],["1","1","0","1"],["1","1","1","1"]]) }) ])
    ] },

  { id:"3.2.2a", code:"3.2.2", title:"From a problem, expression or table to a logic circuit",
    concept:
      "<p>You may be asked to go from <b>any one</b> of these to another: a <b>problem statement</b>, a <b>logic expression</b>, a <b>logic circuit</b> or a <b>truth table</b>.</p>" +
      "<ul><li><b>Expression &rarr; circuit:</b> work from the innermost brackets outwards. Each operator in the expression is one gate, so count the gates (<code>NOT ((A AND B) OR (C AND D))</code> needs AND, AND, OR, NOT).</li><li><b>Circuit &rarr; expression:</b> label the output of each gate and write the expression gate by gate from the inputs to the output. <b>Do not simplify</b> unless the question asks.</li><li><b>Table &rarr; expression:</b> look for a pattern in the output column. If X is 1 exactly when B is 0, then X = NOT B.</li><li><b>Problem &rarr; expression:</b> words become gates: 'and' &rarr; AND, 'or' &rarr; OR, 'not' &rarr; NOT, 'but not both' &rarr; XOR.</li></ul>",
    example:
      "<p>Truth table: X = 1 when (A,B,C) = 000, 001, 100, 101. Both rows with B = 0 give 1, and all rows with B = 1 give 0. So X is simply <b>NOT B</b>; A and C make no difference.</p>" +
      "<p><b>Problem statement:</b> 'An alarm sounds if the door is open AND the system is armed, OR if the panic button is pressed.' &rarr; <code>X = (D AND S) OR P</code>.</p>",
    checks:[
      mc("A truth table has output 1 only when A and B are both 0 (for any C). Which expression matches?", "A NOR B", ["A NAND B", "A OR B", "A XOR B"], "NOR is 1 only when both inputs are 0."),
      mc("How many gates are needed to draw NOT ((A AND B) OR (C AND D))?", "4", ["2", "3", "5"], "AND, AND, OR, NOT."),
      mc("What does 'do not simplify' mean in a question about writing an expression from a circuit?", "Write the expression gate by gate, exactly as the circuit is drawn", ["Use fewer gates", "Convert it to binary", "Leave out the NOT gates"], "Write the expression that matches the circuit."),
      tx("Write a logic expression for: an alarm sounds if the door is open (D) and the system is armed (S), or if the panic button (P) is pressed. [2]", [["d and s","(d and s)","s and d"],["or p","p or","or (p)"]], 2, "X = (D AND S) OR P"),
      ASA.pp("9618/13 May/June 2023 · Question 1(a)", "Look at which input controls the output: when B is 0 the output is 1, and when B is 1 the output is 0. Write the expression using the gate that matches.",
        [ ASA.fields("(a)", 1, "Write the logic expression for this truth table:<br><table class='ln-table'><tr><th>A</th><th>B</th><th>C</th><th>X</th></tr><tr><td>0</td><td>0</td><td>0</td><td>1</td></tr><tr><td>0</td><td>0</td><td>1</td><td>1</td></tr><tr><td>0</td><td>1</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td><td>0</td></tr><tr><td>1</td><td>0</td><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>1</td><td>0</td></tr></table>",
            [ ["X =", ["not b", "b not", "!b", "¬b", "b'", "not(b)", "not (b)"], "text", "NOT B", 1] ],
            { lead: "1 mark for:" }),
          ASA.fields("(b) from Nov 2025 · Question 3(a)", 2, "Complete the truth table for X = (A NOR B) NAND (C XOR B). Type the four X values for each half of the table (rows 000 to 111) as four digits with no spaces.",
            [ ["X for rows 000, 001, 010, 011", ["1011"], "bin", "1011", 1], ["X for rows 100, 101, 110, 111", ["1111"], "bin", "1111", 1] ],
            { lead: "1 mark for each correct shaded area, maximum 2 (9618/13 Oct/Nov 2025):" }) ])
    ] }

  ]);
})(typeof window !== "undefined" ? window : this);
