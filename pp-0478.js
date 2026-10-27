/* 10BR past-paper questions at the end of iLearn topics 1 to 3: Cambridge IGCSE Computer Science 0478/11, Paper 1, May/June 2026.
   Question wording and the mark-scheme text follow the published paper. Marks are suggested by keyword matching and the student checks
   them against the published scheme shown after the answer (self-marked: tick boxes). Laid out by pp-ui.js. */
(function(){
  var SRC = "Cambridge IGCSE Computer Science 0478/11 · Paper 1 · May/June 2026";
  var MSRC = "Cambridge IGCSE Computer Science 0478/11 Mark Scheme, May/June 2026 (Cambridge University Press & Assessment)";
  function kw(text, marks, part, groups, per){ var m = { type: "keywords", groups: groups, needCount: per ? marks : groups.length }; if(per) m.marksPerGroup = 1; return { text: text, marks: marks, part: part, match: m }; }
  function val(text, part, values){ return { text: text, marks: 1, part: part, match: { type: "value", values: values } }; }
  function Q(id, no, topic, stem, parts, points, ms, expl){
    var marks = points.reduce(function(a, p){ return a + p.marks; }, 0);
    return { id: id, no: no, topic: topic, difficulty: "intermediate", marks: marks, calc: true, paperLabel: SRC, msSource: MSRC, stem: stem, parts: parts,
      prompt: stem, markPoints: points, ms: ms, explanation: expl };
  }
  function paper(key, topicNo, title, qs){
    var total = qs.reduce(function(a, q){ return a + q.marks; }, 0);
    EXAM_PAPERS[key] = { key: key, title: "Topic " + topicNo + ": " + title + " — Past-paper question", subtitle: "Cambridge 0478/11 May/June 2026 · " + total + " marks · mark your own answer with the published mark scheme",
      classes: ["10BR1","10BR2","10BR3"], totalMarks: total, questions: qs };
    var e = EXAM_PAPER_CHOICES_BY_CLASS.filter(function(x){ return x.test.test("10BR1"); })[0];
    if(e && !e.choices.some(function(c){ return c.key === key; })) e.choices.push({ key: key, label: "Topic " + topicNo + ": " + title + " — past-paper question" });
  }

  /* ---------- Topic 1 ---------- */
  var q1 = Q("PP1", "1", "Data storage and binary",
    "Data storage can be measured in different units.",
    [ { id: "a", label: "(a)", text: "Tick (✓) one box to show which is the largest unit of measurement for data storage.", marks: 1, options: [["A", "exbibyte (EiB)"], ["B", "gibibyte (GiB)"], ["C", "mebibyte (MiB)"], ["D", "tebibyte (TiB)"]] },
      { id: "b", label: "(b)", text: "Calculate how many kibibytes (KiB) are equal to 3072 bytes.", marks: 1, lines: 1, work: 3 },
      { id: "c", label: "(c)", text: "Data is converted to binary to be stored by a computer.\nTick (✓) one box to show the correct statement about why data is converted to binary for storing in a computer.", marks: 1,
        options: [["A", "Binary uses numbers and characters to store all the data."], ["B", "Binary is one type of data that a computer can store."], ["C", "Data is processed by logic gates that can only be set as binary numbers."], ["D", "Only binary numbers can be input into a computer."]] } ],
    [ val("(a) A (exbibyte, EiB)", "a", ["a"]), val("(b) 3 (3072 ÷ 1024)", "b", ["3"]), val("(c) C", "c", ["c"]) ],
    [ { q: "1(a)", ans: ["A"], marks: "1", guide: ["If more than one box is ticked, no mark can be given."] },
      { q: "1(b)", ans: ["3"], marks: "1", guide: ["Mark the first answer given.", "Ignore any reference to unit.", "If no answer is written in the answer space an obvious correct answer can be awarded in the working space."] },
      { q: "1(c)", ans: ["C"], marks: "1", guide: ["If more than one box is ticked, no mark can be given."] } ],
    "(a) EiB is the largest: exbi > tebi > gibi > mebi. (b) 3072 ÷ 1024 = 3 KiB. (c) Logic gates can only be set on or off, so data must be in binary.");
  var q2 = Q("PP2", "3", "Number systems and binary addition",
    "Hexadecimal and binary are two examples of a number system.",
    [ { id: "a", label: "(a)", text: "Give one other example of a number system.", marks: 1, lines: 1 },
      { id: "b", label: "(b)", text: "Convert the hexadecimal number 2A to an 8-bit binary number.", marks: 1, lines: 1, work: 3 },
      { id: "c", label: "(c)", text: "Convert the hexadecimal number 101 to a 12-bit binary number.", marks: 1, lines: 1, work: 3 },
      { id: "d", label: "(d)", text: "Convert the binary number 01110001 to a hexadecimal number.", marks: 1, lines: 1, work: 3 },
      { id: "e", label: "(e)", text: "Convert the binary number 001011011000 to a hexadecimal number.", marks: 1, lines: 1, work: 3 },
      { id: "f", label: "(f)", text: "Add the binary numbers 10011101 and 11110000 using binary addition.\nGive your answer in binary. Show all your working.\n\n        10011101\n   +    11110000", marks: 4, lines: 5 } ],
    [ kw("(a) Denary // decimal // two’s complement (accept octal, BCD)", 1, "a", [["denary", "decimal", "two's complement", "twos complement", "two’s complement", "octal", "bcd", "base 10", "base-10", "binary coded decimal"]]),
      val("(b) 0010 1010", "b", ["0010 1010", "00101010"]), val("(c) 0001 0000 0001", "c", ["0001 0000 0001", "000100000001"]), val("(d) 71", "d", ["71"]), val("(e) 2D8", "e", ["2d8"]),
      { text: "(f) one mark for each correct nibble (max 2): 1000 1101", marks: 2, part: "f", match: { type: "keywords", groups: [["re:1000\\s*1101(?![01])"], ["re:1000\\s*1101(?![01])"]], needCount: 2 } },
      { text: "(f) one mark for the three correct carries as working", marks: 1, part: "f", match: { type: "keywords", groups: [["re:1000\\s*1101(?![01])"], ["re:[\\s\\S]{25,}"]], needCount: 2 } },
      { text: "(f) one mark for one overflow bit: 1 1000 1101 (9 bits)", marks: 1, part: "f", match: { type: "keywords", groups: [["re:(^|[^01])1\\s*1000\\s*1101(?![01])"]], needCount: 1 } } ],
    [ { q: "3(a)", lead: "One from:", ans: ["Denary // decimal", "Two’s complement"], marks: "1", guide: ["Mark the first answer given.", "Accept other system outside syllabus e.g. octal, BCD", "BOD Base-10"] },
      { q: "3(b)", ans: ["0010 1010"], marks: "1", guide: ["Mark the first answer given.", "Correct number of leading zeros must be present", "If no answer is written in the answer space an obvious correct answer can be awarded in the working space."] },
      { q: "3(c)", ans: ["0001 0000 0001"], marks: "1", guide: ["Mark the first answer given.", "Correct number of leading zeros must be present", "If no answer is written in the answer space an obvious correct answer can be awarded in the working space."] },
      { q: "3(d)", ans: ["71"], marks: "1", guide: ["Mark the first answer given.", "If no answer is written in the answer space an obvious correct answer can be awarded in the working space."] },
      { q: "3(e)", ans: ["2D8"], marks: "1", guide: ["Mark the first answer given.", "If no answer is written in the answer space an obvious correct answer can be awarded in the working space."] },
      { q: "3(f)", lead: "One mark for each correct nibble (MAX 2)\nOne mark for the three correct carries as working\nOne mark for one overflow bit", ans: ["For example:", "        1 11", "        1 0 0 1 1 1 0 1", "   +    1 1 1 1 0 0 0 0", "   1    1 0 0 0 1 1 0 1"], marks: "4", guide: ["Carries can be shown above/below. Award where seen as long as for the correct columns.", "BOD 4 carries shown if the overflow is shown as a carry first, then as overflow.", "Ignore the crossing out of carries. Award the number of carries seen."] } ],
    "(b) 2 = 0010, A = 1010. (c) 1 = 0001, 0 = 0000, 1 = 0001. (d) 0111 = 7, 0001 = 1. (e) 0010 = 2, 1101 = D, 1000 = 8. (f) Add column by column from the right, carrying 1 when two 1s meet; the answer has an overflow ninth bit. Note: the points for the carries and the overflow bit are suggestions only; check them against the published scheme.");
  var q3 = Q("PP3", "8", "Representing text, images and sound; compression",
    "A student opens a document on their computer and inputs text.",
    [ { id: "a", label: "(a)", text: "Explain how the computer represents the text.", marks: 3, lines: 6 },
      { id: "b1", label: "(b)(i)", text: "The student stores a video on their computer. The video contains sound and images.\nComplete the table with the missing terms and descriptions about sound and images.\n\nRow 1: term = ?  description: the smallest unit of an image that is made up of one colour", marks: 1, lines: 1 },
      { id: "b2", label: "", text: "Row 2: term = sound sample  description = ?", marks: 1, lines: 2 },
      { id: "b3", label: "", text: "Row 3: term = ?  description: the dimensions of an image", marks: 1, lines: 1 },
      { id: "b4", label: "", text: "Row 4: term = colour depth  description = ?", marks: 1, lines: 2 },
      { id: "b5", label: "", text: "Row 5: term = ?  description: the number of samples that are recorded each second", marks: 1, lines: 1 },
      { id: "b6", label: "(b)(ii)", text: "The student wants to compress the video.\nGive two methods of compression that the student could use to compress the video.\n1 ...\n2 ...", marks: 2, lines: 3 } ],
    [ kw("(a) Any three: a character set is used; that contains all the characters; it can use ASCII/Unicode; each character has a (binary) value", 3, "a",
        [["character set", "characterset"], ["all the characters", "all characters", "every character", "all of the characters"], ["ascii", "unicode"], ["binary value", "unique value", "unique code", "each character", "its own code", "given a number", "given a value", "has a value", "has a code", "binary code", "converted to binary", "binary number"]], true),
      kw("(b)(i) pixel", 1, "b1", [["pixel"]]),
      kw("(b)(i) a (single) measure/representation of the amplitude/height of a sound wave", 1, "b2", [["amplitude", "height"], ["sound wave", "wave", "sound"]], false),
      kw("(b)(i) (image) resolution", 1, "b3", [["resolution"]]),
      kw("(b)(i) the number of bits used for each colour/pixel // the (maximum) number of colours that can be represented", 1, "b4", [["number of bits", "bits used", "bits per", "bits for each", "number of colours", "maximum number of colours", "colours that can be"]]),
      kw("(b)(i) sample / sampling rate / frequency", 1, "b5", [["sample rate", "sampling rate", "sample frequency", "sampling frequency", "sample/sampling", "frequency"]]),
      kw("(b)(ii) lossy (e.g. motion estimation) and lossless (e.g. RLE). Do not accept file formats e.g. MP4, ZIP", 2, "b6", [["lossy", "motion estimation", "inter-frame", "interframe", "temporal"], ["lossless", "rle", "run length", "run-length"]], true) ],
    [ { q: "8(a)", lead: "Any three from:", ans: ["A character set is used …", "… that contains all the characters (that can be represented)", "It can use ASCII/Unicode", "Each/a character is given/has a (binary) value"], marks: "3", guide: ["MP4 – BOD if code used in place of value"] },
      { q: "8(b)(i)", lead: "One mark for each correct term or definition.", ans: ["pixel — the smallest unit of an image that is made up of one colour", "sound sample — a (single) measure/representation of the amplitude/height of a sound wave", "(image) resolution — the dimensions of an image", "colour depth — the number of bits that are used for each/a colour/pixel (in an image) // the (maximum) number of colours that can be represented (in an image)", "Sample/sampling rate/frequency — the number of samples that are recorded each second"], marks: "5", guide: ["Colour depth – ‘the number of colours in the image’ is not accurate"] },
      { q: "8(b)(ii)", ans: ["Lossy // by example e.g. motion estimation", "Lossless // by example e.g. RLE"], marks: "2", guide: ["Mark the first answer given.", "Do not accept file formats e.g. MP4, ZIP", "BOD lossyless for lossless"] } ],
    "Text is stored using a character set such as ASCII or Unicode, where each character has its own binary value. A pixel is the smallest unit of an image; a sound sample measures the amplitude of the wave at one moment; resolution is the dimensions; colour depth is the number of bits per pixel; sample rate is samples per second. Video can be compressed with lossy (e.g. motion estimation) or lossless (e.g. RLE) methods.");
  paper("pp_t1", 1, "Data representation", [q1, q2, q3]);

  /* ---------- Topic 2 ---------- */
  var q4 = Q("PP4", "4", "USB and data transmission",
    "An optical mouse is connected to a computer using a universal serial bus (USB) cable.",
    [ { id: "a", label: "(a)", text: "State the purpose of the optical mouse.", marks: 1, lines: 2 },
      { id: "b", label: "(b)", text: "The USB cable transmits data using the serial half-duplex data transmission method.\nDescribe how the serial half-duplex data transmission method transmits the data.", marks: 4, lines: 7 },
      { id: "c", label: "(c)", text: "One benefit of using the USB cable to connect the optical mouse to the computer is that bits of data are less likely to arrive out of order.\nGive two other benefits of using the USB cable to connect the optical mouse to the computer.\n1 ...\n2 ...", marks: 2, lines: 4 } ],
    [ kw("(a) To control/move the cursor, point, click/select/drag or scroll (‘it is an input device’ is not enough)", 1, "a", [["cursor", "pointer", "pointing", "click", "select", "choose", "drag", "scroll", "navigate", "interact", "move"]]),
      kw("(b) Any four: (serial) one bit at a time; down a single wire/channel/line; (half-duplex) both directions/ways; but only one direction at a time", 4, "b",
        [["one bit at a time", "bit by bit", "1 bit at a time", "single bit at a time", "one bit"], ["single wire", "one wire", "single channel", "one channel", "single line", "one line", "single cable", "single path", "one path"], ["both directions", "both ways", "two directions", "two ways", "each direction", "either direction", "in both"], ["one direction at a time", "one way at a time", "only one direction", "only one way", "not at the same time", "not simultaneous", "one at a time", "not both at once", "not both at the same time", "one direction only at a time"]], true),
      kw("(c) Any two: cannot plug in the wrong way round; different speeds supported; high/adequate speed; universal standard; backwards compatible; powers/charges the mouse; plug and play / automatically detected; unlikely to have interference/crosstalk", 2, "c",
        [["wrong way", "wrong way round", "only fit one way", "only one way round", "cannot be plugged in"], ["different speeds", "different data transmission speeds", "speeds are supported", "range of speeds"], ["high speed", "fast transmission", "faster transmission", "adequate speed", "high-speed", "fast data transfer", "fast data"], ["universal", "standard", "common connection", "same connection"], ["backwards compatible", "backward compatible", "older versions", "older devices"], ["power the mouse", "powers the mouse", "charge the mouse", "charges the mouse", "supplies power", "provides power", "power supply"], ["plug and play", "automatically detected", "automatically recognised", "automatically recognized", "drivers will be", "drivers are automatically", "drivers automatically", "detected automatically"], ["interference", "crosstalk", "cross talk"]], true) ],
    [ { q: "4(a)", lead: "One from:", ans: ["To input data // interact with/navigate the computer/interface", "To control/move the cursor on the screen", "To act as a pointing device/pointer", "To allow the user to click/select/choose/drag (items on the screen) // by example", "To scroll through different pages/a page"], marks: "1", guide: ["MP1 – ‘it is an input device’ is NAQ", "MP4 – BOD ‘open’ in place of click etc"] },
      { q: "4(b)", lead: "Four from:", ans: ["(Serial) transmits the data one bit at a time", "… down a single wire/channel/line", "(Half-duplex) transmits the data (between the computer and the mouse) in both directions/ways …", "… but only one direction/way at a time"], marks: "4", guide: ["MP1 – BOD bit by bit", "MP2 – cable/path is TV"] },
      { q: "4(c)", lead: "Two from:", ans: ["Cannot plug the cable in the wrong way round", "Different data transmission speeds are supported", "High/adequate speed of data transmission", "Universal connection/standard", "Connection is backwards compatible", "It will power the mouse // It will charge the mouse (if it has wireless capabilities)", "The mouse will be automatically detected // Mouse drivers will be automatically downloaded // plug and play", "Unlikely to have interference/crosstalk"], marks: "2", guide: ["Mark whole answer.", "Do not accept ‘can be used over long distance’; this is not relevant to the context.", "Do not accept reference to skewing/errors as this is given in the question.", "MP3 – BOD fast/faster transmission. Fast/faster alone is NE.", "MP8 – Mouse is automatically connected is TV"] } ],
    "Serial means the bits are sent one after another along one wire. Half-duplex means data can travel in both directions, but only one direction at a time. USB is a universal standard, can supply power, supports different speeds and is plug and play.");
  paper("pp_t2", 2, "Data transmission", [q4]);

  /* ---------- Topic 3 ---------- */
  var q5 = Q("PP5", "2", "CPU, FDE cycle and input/output devices",
    "A smartphone has a quad-core 2.4 GHz processor.",
    [ { id: "a1", label: "(a)(i)", text: "The processor performs the fetch-decode-execute (FDE) cycle.\nThe first register used in the FDE cycle stores the location in random access memory (RAM) of the next instruction.\nIdentify the name of this register.", marks: 1, lines: 1 },
      { id: "a2", label: "(a)(ii)", text: "Describe the actions that take place in the decode stage of the FDE cycle.", marks: 3, lines: 6 },
      { id: "a3", label: "(a)(iii)", text: "Give the name of one component that is used in the execute stage of the FDE cycle.", marks: 1, lines: 1 },
      { id: "b", label: "(b)", text: "Explain the advantages of the smartphone having a quad-core processor instead of a dual-core processor.", marks: 2, lines: 4 },
      { id: "c1", label: "(c)(i)", text: "The smartphone has built-in input and output devices.\nIdentify two input devices that could be built into the smartphone.\n1 ...\n2 ...", marks: 2, lines: 3 },
      { id: "c2", label: "(c)(ii)", text: "Identify two output devices that could be built into the smartphone.\n1 ...\n2 ...", marks: 2, lines: 3 } ],
    [ kw("(a)(i) Program counter // PC // Memory address register // MAR", 1, "a1", [["program counter", "pc", "memory address register", "mar"]]),
      kw("(a)(ii) Any three: instruction sent/copied to the CIR/control unit; from the MDR; the control unit decodes the instruction; an instruction set is used; instruction decoded into opcode and operand", 3, "a2",
        [["current instruction register", "cir", "instruction register", "control unit receives", "cu receives", "sent to the control unit", "copied to the control unit"], ["memory data register", "mdr"], ["re:(control unit|\\bcu\\b)[^.]{0,40}decod", "decoded by the control unit", "decoded by the cu"], ["instruction set"], ["opcode", "operand", "op code"]], true),
      kw("(a)(iii) ALU, accumulator, control unit, bus, MDR, MAR, PC or RAM", 1, "a3", [["arithmetic logic unit", "alu", "accumulator", "acc", "control unit", "bus", "memory data register", "mdr", "memory address register", "mar", "program counter", "random access memory", "ram", "index register", "status register"]]),
      kw("(b) Any two: can execute more instructions/FDE cycles simultaneously (four rather than two); more instructions per second; as it has twice as many cores / more cores", 2, "b",
        [["simultaneous", "same time", "at once", "in parallel", "more instructions", "more fde", "more cycles", "four instructions", "4 instructions"], ["per second", "faster", "quicker", "more cores", "twice as many", "double the number", "4 cores", "four cores", "instead of 2", "instead of two"]], true),
      kw("(c)(i) Any two: touchscreen, microphone, keyboard/keypad, button, sensor, (digital) camera", 2, "c1",
        [["touchscreen", "touch screen"], ["microphone", "mic"], ["keyboard", "keypad"], ["button"], ["sensor", "accelerometer", "gyroscope", "fingerprint", "proximity", "gps", "light sensor"], ["camera"]], true),
      kw("(c)(ii) Any two: screen/touchscreen, speaker, LED/light, actuator", 2, "c2",
        [["screen", "touchscreen", "touch screen"], ["speaker"], ["led", "light", "flash"], ["actuator", "vibrat", "motor"]], true) ],
    [ { q: "2(a)(i)", lead: "One from:", ans: ["Program counter // PC", "Memory Address register // MAR"], marks: "1", guide: ["Mark the first answer given."] },
      { q: "2(a)(ii)", lead: "Three from:", ans: ["The instruction is sent/copied to the current instruction register/CIR/control unit/CU // The CIR/CU receives the instruction // The CIR stores/holds the instruction …", "… from the memory data register/MDR", "The control unit/CU decodes the instruction", "An instruction set is used (to decode the instruction)", "The instruction is decoded/converted into the Opcode and Operand"], marks: "3", guide: ["BOD data in place of instruction", "MP1 – BOD instruction register/IR in place of CIR", "MP1 – this is given for the instruction being sent to the CIR/control unit. Allow if it is coming from an incorrect or inaccurate place e.g. MAR/PC", "MP3 – It must clearly state the CU is decoding the instruction"] },
      { q: "2(a)(iii)", lead: "One from:", ans: ["Arithmetic logic unit // ALU", "Accumulator // ACC", "Control unit // CU", "(Data/address/control) bus", "Memory data register // MDR", "Memory address register // MAR", "Program counter // PC", "Random access memory // RAM"], marks: "1", guide: ["Mark the first answer given.", "Register alone is NE", "Do not award CIR", "Award appropriate registers that are outside the specification e.g. Index register (IX) and status register (SR)"] },
      { q: "2(b)", lead: "Two from:", ans: ["It can execute more instructions/FDE/FE/clock cycles simultaneously // four instructions/FDE/FE/clock cycles can be executed simultaneously rather than two", "It can execute more instructions/FDE/FE/clock cycles per second", "… as it has double the number of cores // It has twice as many cores // It has more cores // It has 4 cores instead of 2 cores"], marks: "2", guide: ["Tasks/processes/code/information/commands/actions/data is TV for instructions", "MP1 and 2 – BOD clock ticks/pulses in place of cycles"] },
      { q: "2(c)(i)", lead: "Two from, for example:", ans: ["Touchscreen", "Microphone", "Keyboard/keypad", "Button", "Sensor", "(Digital) camera"], marks: "2", guide: ["Mark the first answer given.", "Award any appropriate example of a sensor. Sensor can only be awarded once.", "Do not allow onscreen keyboard as this is software.", "Do not allow touchpad as it is not relevant to context."] },
      { q: "2(c)(ii)", lead: "Two from, for example:", ans: ["Screen // touchscreen", "Speaker", "LED // light", "Actuator"], marks: "2", guide: ["Mark the first answer given.", "Display alone is NE for screen."] } ],
    "(a)(i) The program counter holds the address of the next instruction. (ii) The instruction goes from the MDR to the CIR, the control unit decodes it into opcode and operand using the instruction set. (iii) For example the ALU. (b) Four cores can run four instructions at the same time. (c) Inputs: touchscreen, microphone, camera. Outputs: screen, speaker.");
  paper("pp_t3", 3, "Hardware", [q5]);
})();
