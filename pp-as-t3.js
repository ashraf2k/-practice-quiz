/* 11BR past-paper questions for iLearn topic 3 (Hardware), objectives 3.1.1 to 3.2.2. Wording and mark-scheme text as published (9618 Paper 1). */
(function(){
  var A = window.PPAS, Q = A.Q, kw = A.kw, val = A.v, re = A.re;

  /* 3.1.1 Embedded systems, input/output and storage: 9618/12 Oct/Nov 2023 Q1(c) */
  var q311 = Q("AS-N23-12-1c", "1", "Embedded systems", "A factory makes chocolate bars. The factory has many different machines with embedded systems.",
    [ { id: "c1", label: "(c)(i)", text: "Identify two features of embedded systems.\n1\n2", marks: 2, lines: 4 },
      { id: "c2", label: "(c)(ii)", text: "Identify one drawback of embedded systems.", marks: 1, lines: 2 } ],
    [ kw("(c)(i) Max 2: dedicated to a single task / limited number of functions; built into a larger system; contains a processor, memory and an I/O capability / dedicated hardware", 2, "c1",
        [["single task", "one task", "dedicated", "limited number of functions", "specific task", "specific function", "limited function"], ["built into", "integrated into", "part of a larger", "part of a bigger", "inside a larger", "within a larger"], ["processor", "memory", "i/o", "input and output", "dedicated hardware"]], true),
      kw("(c)(ii) One from: difficult to change/update the firmware or upgrade; cannot easily be adapted for another task; troubleshooting/upgrading is a specialist task; devices are thrown away rather than repaired", 1, "c2",
        [["difficult to", "hard to", "cannot be", "can't be", "not easy", "specialist", "thrown away", "update", "upgrade", "firmware", "repair", "adapt", "fixed"]]) ],
    [ { q: "1(c)(i)", lead: "1 mark for each feature (max 2)", ans: ["Dedicated to a single task // limited number of functions", "Built into a larger system // integrated into a larger system", "An embedded system must contain a processor, memory and an I/O capability // Dedicated hardware"], marks: "2", guide: [] },
      { q: "1(c)(ii)", lead: "1 mark for each bullet point (max 1)", ans: ["Difficult to change / update the firmware by the user // Difficult to upgrade devices to take advantage of new technology", "Cannot be easily adapted for another task", "Troubleshooting faults/upgrading is a specialist task", "Devices are often thrown away rather than repaired as difficult to upgrade or repair"], marks: "1", guide: [] } ],
    "An embedded system is a computer built into a larger device to do one dedicated job (e.g. a washing machine controller). Its firmware is hard to change, so it is hard to upgrade or repair.", A.ctx("n2023", 12));

  /* 3.1.2 Hardware devices and buffers: 9618/13 May/June 2026 Q8(b),(c) */
  var q312 = Q("AS-J26-13-8bc", "8", "Microphone and buffer", "A computer is used to record sound.",
    [ { id: "b", label: "(b)", text: "The sound is recorded using a microphone.\nDescribe the principal operation of a microphone.", marks: 3, lines: 5 },
      { id: "c", label: "(c)", text: "The computer outputs the sound through external speakers. The computer transfers the data to a buffer before the speakers output the sound.\nDescribe the purpose of the buffer.", marks: 3, lines: 5 } ],
    [ kw("(b) Max 3: microphone has a diaphragm; incoming sound waves cause it to vibrate; causing a coil to move past a magnet (or capacitance change / crystal deformed); an electrical signal is produced", 3, "b",
        [["diaphragm", "ribbon", "cone"], ["vibrat", "sound waves"], ["coil", "magnet", "capacit", "crystal"], ["electrical signal", "electric signal", "electrical current", "analogue signal", "voltage"]], true),
      kw("(c) Max 3: temporary storage of data; until the device is ready to receive it; data may be sent faster than it can be received / different speeds of transmission; allows the processor to carry out other tasks", 3, "c",
        [["temporar", "holds data", "stores data", "store the data"], ["until the", "ready to receive", "ready to accept", "can process", "takes the data"], ["faster than", "different speed", "slower", "speed"], ["other tasks", "processor is free", "free the processor", "do other", "carry out other"]], true) ],
    [ { q: "8(b)", lead: "1 mark each.", ans: ["The microphone has a diaphragm / ribbon", "The incoming sound waves cause vibrations of the diaphragm", "… causing a coil to move past a magnet // causing a magnet to move past a coil (dynamic microphone). // … changing the capacitance (condenser microphone) // deforms the crystal (crystal microphone)", "An electrical signal is produced"], marks: "3", guide: ["For MP1 accept diaphragm equivalent e.g. cone."] },
      { q: "8(c)", lead: "1 mark each", ans: ["Temporary storage of data", "… until the device is ready to receive it // until a sound player takes the data", "Data may be sent faster than it can be received // Allows for different speed of transmission between devices", "Allows processor to carry out other tasks"], marks: "3", guide: [] } ],
    "A microphone turns sound-wave vibrations of a diaphragm into an electrical signal. A buffer is temporary storage that evens out the difference in speed between the computer and the output device.", A.ctx("j2026", 13));

  /* 3.1.3 RAM and ROM: 9618/12 Oct/Nov 2024 Q2(b),(c) */
  var q313 = Q("AS-N24-12-2bc", "2", "DRAM, SRAM, EPROM and EEPROM", "Embedded systems are used in many electronic devices.",
    [ { id: "b", label: "(b)", text: "An embedded system has Dynamic RAM (DRAM).\nIdentify one benefit of using DRAM instead of Static RAM (SRAM) in an embedded system.", marks: 1, lines: 2 },
      { id: "c", label: "(c)", text: "Give two differences between Erasable Programmable ROM (EPROM) and Electrically Erasable Programmable ROM (EEPROM).\nDifference 1\nDifference 2", marks: 2, lines: 5 } ],
    [ kw("(b) DRAM is less expensive to manufacture/purchase than SRAM // DRAM has a higher bit density per chip (more data stored per chip)", 1, "b", [["less expensive", "cheaper", "cheap", "lower cost", "less costly", "higher bit density", "more data", "higher density", "more storage", "smaller"]]),
      kw("(c) Max 2: EPROM uses ultraviolet light to erase data, EEPROM uses an electrical signal; EPROM must be removed from the circuit board to change data, EEPROM stays in the circuit; EPROM erases all the data, EEPROM can erase parts", 2, "c",
        [["ultraviolet", "uv", "electrical signal", "electric signal", "electrical", "voltage"], ["removed", "remain in the circuit", "stays in the circuit", "stay in the circuit", "in situ", "in the circuit", "taken out"], ["erases all", "all the data", "parts of the data", "part of the data", "individual", "selected"]], true) ],
    [ { q: "2(b)", lead: "1 mark from:", ans: ["DRAM is less expensive to manufacture/purchase than SRAM in the embedded system", "DRAM has a higher bit density per chip // more data can be stored per chip"], marks: "1", guide: [] },
      { q: "2(c)", lead: "1 mark for each bullet point (max 2)", ans: ["EPROM uses ultraviolet light to erase data whilst EEPROM uses an electrical signal to do this", "EPROM has to be removed from the circuit board when changing the data whilst EEPROM remains in the circuit when the data is changed", "EPROM erases all the data, EEPROM can erase parts of the data"], marks: "2", guide: [] } ],
    "DRAM is cheaper and denser than SRAM (but slower and needs refreshing). EPROM is erased with UV light and must be removed; EEPROM is erased electrically in the circuit.", A.ctx("n2024", 12));

  /* 3.1.4 Monitoring and control systems: 9618/12 Oct/Nov 2024 Q9 */
  var q314 = Q("AS-N24-12-9", "9", "Sensors, monitoring and control",
    "A road bridge has a weight limit and a height limit for vehicles. For example, a vehicle must weigh less than 10 000 kg and must have a height of less than 3 m.\nThe bridge has a warning system. If a vehicle is approaching the bridge and it exceeds one or both limits, a sign displays a warning telling the driver of the vehicle to stop.",
    [ { id: "a", label: "(a)", text: "The bridge warning system uses sensors to detect if a vehicle exceeds the limits.\nComplete the table by identifying two different sensors that could be used by the system and describe how each sensor is used by the system.\n\nSensor   |   Use in bridge warning system\n1\n2", marks: 2, lines: 6 },
      { id: "b", label: "(b)", text: "Explain whether the bridge warning system is an example of a monitoring system or of a control system.", marks: 2, lines: 4 } ],
    [ kw("(a) A suitable sensor with its use, two pairs: e.g. infra-red sensor to check the height of the vehicle; pressure sensor to check the weight of the vehicle", 2, "a",
        [[re("(infra.?red|ultrasonic|light|laser|proximity|distance|camera|motion)")], [re("(pressure|weight|load|force|strain)")]], true),
      kw("(b) Monitoring system, because: no feedback (the warning sign is only an indicator); the output (sign) does not affect the input from the sensors; no actuators (max 2)", 2, "b",
        [["no feedback", "not use feedback", "doesn't use feedback", "does not use feedback", "without feedback", "only an indicator", "indicator", "only displays", "only shows"], ["does not affect", "doesn't affect", "no effect on", "not change the input", "not affect the input", "not affect the sensor", "no change to"], ["no actuator", "does not have any actuator", "doesn't have an actuator", "does not have an actuator", "without actuator", "not have actuators"]], true) ],
    [ { q: "9(a)", lead: "1 mark for sensor and its use in this system", ans: ["Infra-red sensor – measure / check the height of the vehicle", "Pressure sensor – measure / check the weight of the vehicle"], marks: "2", guide: [] },
      { q: "9(b)", lead: "1 mark for each bullet point (max 2) for a correct justification", ans: ["Monitoring system", "Because there is no use of feedback // the warning sign is only an indicator", "… the output of the turning on of the sign does not affect the input of data from the sensors", "The system does not have any actuators"], marks: "2", guide: ["No marks for the identification of the system"] } ],
    "A monitoring system only reads sensors and reports (here it displays a warning). A control system uses the sensor data to change something through an actuator and feedback.", A.ctx("n2024", 12));

  /* 3.2.1 Logic gates: 9618/12 May/June 2024 Q1(a) */
  var q321 = Q("AS-J24-12-1a", "1", "Operation of logic gates", "",
    [ { id: "a1", label: "(a)", text: "Describe the operation of each of the following logic gates:\nNAND", marks: 1, lines: 2 },
      { id: "a2", label: "", text: "NOR", marks: 1, lines: 2 }, { id: "a3", label: "", text: "XOR", marks: 1, lines: 2 }, { id: "a4", label: "", text: "OR", marks: 1, lines: 2 } ],
    [ kw("NAND: the output is 0 when both inputs are 1, otherwise the output is 1", 1, "a1", [[re("(0|false|low|off)[^.]{0,40}both[^.]{0,20}(1|true|high|on)"), re("(not|only).{0,25}both inputs.{0,30}(1|true)"), re("both inputs (are|is) (1|true|high|on).{0,40}(0|false|low|off)")]]),
      kw("NOR: the output is 1 when both inputs are 0, otherwise the output is 0", 1, "a2", [[re("(1|true|high|on)[^.]{0,40}both[^.]{0,20}(0|false|low|off)"), re("both inputs (are|is) (0|false|low|off).{0,40}(1|true|high|on)"), re("neither.{0,30}(1|true|on)")]]),
      kw("XOR: the output is 1 when one of the inputs is 1 and the other input is 0, otherwise the output is 0", 1, "a3", [[re("(only )?one (of the )?inputs? (is|are)? ?(1|true|high|on)"), re("inputs? (are|is) different"), re("(1|true|high|on).{0,30}(only )?(one|either).{0,30}(but not both|not both)")]]),
      kw("OR: the output is 0 when both inputs are 0, otherwise the output is 1", 1, "a4", [[re("(0|false|low|off)[^.]{0,40}both[^.]{0,20}(0|false|low|off)"), re("(1|true|high|on)[^.]{0,30}(either|any|at least one|one or both|one or more)")]]) ],
    [ { q: "1(a)", lead: "1 mark for each correct answer:", ans: ["NAND: The output is 0 when both inputs are 1, otherwise the output is 1", "NOR: The output is 1 when both inputs are 0, otherwise the output is 0", "XOR: The output is 1 when one of the inputs is 1 and the other input is 0, otherwise the output is 0", "OR: The output is 0 when both inputs are 0, otherwise the output is 1"], marks: "4", guide: [] } ],
    "NAND = NOT(AND); NOR = NOT(OR); XOR is 1 only when the inputs are different; OR is 1 when at least one input is 1.", A.ctx("j2024", 12));

  /* 3.2.2 Truth tables and logic expressions: 9618/13 Oct/Nov 2023 Q4(a) */
  var q322 = Q("AS-N23-13-4a", "4", "Completing a truth table", "",
    [ { id: "a", label: "(a)", text: "Complete the truth table for the logic expression:\nY = ((P AND Q) XOR ((NOT Q) OR R)) AND NOT P\n\nWorking space is provided. Write the eight values of Y, from the top row (P Q R = 0 0 0) down to the bottom row (1 1 1), separated by spaces.\n\nP  Q  R  Y\n0  0  0\n0  0  1\n0  1  0\n0  1  1\n1  0  0\n1  0  1\n1  1  0\n1  1  1", marks: 2, lines: 1, work: 8 } ],
    [ kw("1 mark for the first four rows correct: Y = 1 1 0 1", 1, "a", [[re("^\\D*1\\D*1\\D*0\\D*1(\\D|$)")]]),
      kw("1 mark for the second four rows correct: Y = 0 0 0 0", 1, "a", [[re("(^|\\D)0\\D*0\\D*0\\D*0\\D*$")]]) ],
    [ { q: "4(a)", lead: "1 mark for each set of highlighted rows", ans: ["P Q R  Y", "0 0 0  1", "0 0 1  1", "0 1 0  0", "0 1 1  1", "1 0 0  0", "1 0 1  0", "1 1 0  0", "1 1 1  0"], marks: "2", guide: ["First four rows (P = 0) and second four rows (P = 1) are each worth one mark."] } ],
    "When P = 1 the final AND with NOT P makes Y = 0. When P = 0, Y = 0 XOR (NOT Q OR R) = NOT Q OR R, which is 1 for QR = 00, 01 and 11 and 0 for QR = 10.", A.ctx("n2023", 13));

  A.paper("3.1.1", "Embedded systems, input, output and storage", [q311]);
  A.paper("3.1.2", "Hardware devices and buffers", [q312]);
  A.paper("3.1.3", "RAM, ROM and their types", [q313]);
  A.paper("3.1.4", "Monitoring and control systems", [q314]);
  A.paper("3.2.1", "Logic gates", [q321]);
  A.paper("3.2.2", "Logic circuits and truth tables", [q322]);
})();
