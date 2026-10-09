// Cambridge IGCSE Computer Science 0478 (2026-2028) -- learning objectives
// for the topics the 10BR practice covers (1-4, 7, 8). Wording is taken from
// the "Candidates should be able to" column of the syllabus document. Each
// question in quiz-data.js / exam-data.js carries a `syl` array of codes
// from this table, and the quiz screens show the code, topic and objective
// beside the question.
(function(){
  "use strict";
  var TOPICS = {
    1: "Data representation", 2: "Data transmission", 3: "Hardware", 4: "Software",
    7: "Algorithm design and problem-solving", 8: "Programming"
  };
  var O = {
    // ---- 1 Data representation
    "1.1.1": ["1.1 Number systems", "Understand how and why computers use binary to represent all forms of data"],
    "1.1.2": ["1.1 Number systems", "Understand the denary, binary and hexadecimal number systems, and convert between positive denary, binary and hexadecimal"],
    "1.1.3": ["1.1 Number systems", "Understand how and why hexadecimal is used as a beneficial method of data representation"],
    "1.1.4": ["1.1 Number systems", "Add two positive 8-bit binary integers, and understand the concept of overflow and why it occurs in binary addition"],
    "1.1.5": ["1.1 Number systems", "Perform a logical binary shift on a positive 8-bit binary integer and understand the effect this has"],
    "1.1.6": ["1.1 Number systems", "Use the two’s complement number system to represent positive and negative 8-bit binary integers"],
    "1.2.1": ["1.2 Text, sound and images", "Understand how and why a computer represents text and the use of character sets, including ASCII and Unicode"],
    "1.2.2": ["1.2 Text, sound and images", "Understand how and why a computer represents sound, including the effects of the sample rate and sample resolution"],
    "1.2.3": ["1.2 Text, sound and images", "Understand how and why a computer represents an image, including the effects of the resolution and colour depth"],
    "1.3.1": ["1.3 Data storage and compression", "Understand how data storage is measured"],
    "1.3.2": ["1.3 Data storage and compression", "Calculate the file size of an image file and a sound file, using information given"],
    "1.3.3": ["1.3 Data storage and compression", "Understand the purpose of and need for data compression"],
    "1.3.4": ["1.3 Data storage and compression", "Understand how files are compressed using lossy and lossless compression methods"],
    // ---- 2 Data transmission
    "2.1.1": ["2.1 Types and methods of data transmission", "Understand that data is broken down into packets, describe the structure of a packet and the process of packet switching"],
    "2.1.2": ["2.1 Types and methods of data transmission", "Describe how data is transmitted using serial, parallel, simplex, half-duplex and full-duplex methods, and explain their suitability for a given scenario"],
    "2.1.3": ["2.1 Types and methods of data transmission", "Understand the universal serial bus (USB) interface and explain how it is used to transmit data"],
    "2.2.1": ["2.2 Methods of error detection", "Understand the need to check for errors after data transmission and how these errors can occur"],
    "2.2.2": ["2.2 Methods of error detection", "Describe the processes involved in parity check (odd and even), checksum and echo check"],
    "2.2.3": ["2.2 Methods of error detection", "Describe how a check digit is used to detect errors in data entry and identify examples of its use, including ISBN and bar codes"],
    "2.2.4": ["2.2 Methods of error detection", "Describe how an automatic repeat query (ARQ) can be used to establish that data is received without error"],
    "2.3.1": ["2.3 Encryption", "Understand the need for and purpose of encryption when transmitting data"],
    "2.3.2": ["2.3 Encryption", "Understand how data is encrypted using symmetric and asymmetric encryption"],
    // ---- 3 Hardware
    "3.1.1": ["3.1 Computer architecture", "Understand the role of the CPU in a computer and what is meant by a microprocessor"],
    "3.1.2": ["3.1 Computer architecture", "Understand the purpose of the components in a CPU (Von Neumann architecture) and describe the fetch–decode–execute cycle"],
    "3.1.3": ["3.1 Computer architecture", "Understand what is meant by a core, cache and clock in a CPU and how they affect CPU performance"],
    "3.1.4": ["3.1 Computer architecture", "Understand the purpose and use of an instruction set for a CPU"],
    "3.1.5": ["3.1 Computer architecture", "Describe the purpose and characteristics of an embedded system and identify devices in which they are commonly used"],
    "3.2.1": ["3.2 Input and output devices", "Understand what is meant by an input device and why it is required"],
    "3.2.2": ["3.2 Input and output devices", "Understand what is meant by an output device and why it is required"],
    "3.2.3": ["3.2 Input and output devices", "Understand what is meant by a sensor, the data each captures and when each would be used"],
    "3.3.1": ["3.3 Data storage", "Understand what is meant by primary storage (RAM and ROM)"],
    "3.3.2": ["3.3 Data storage", "Understand what is meant by secondary storage"],
    "3.3.3": ["3.3 Data storage", "Describe the operation of magnetic, optical and solid-state (flash memory) storage and give examples of each"],
    "3.3.4": ["3.3 Data storage", "Describe what is meant by virtual memory, how it is created and used and why it is necessary"],
    "3.3.5": ["3.3 Data storage", "Understand what is meant by cloud storage"],
    "3.3.6": ["3.3 Data storage", "Explain the advantages and disadvantages of storing data on the cloud compared with storing it locally"],
    "3.4.1": ["3.4 Network hardware", "Understand that a computer needs a network interface card (NIC) to access a network"],
    "3.4.2": ["3.4 Network hardware", "Understand what is meant by, and the purpose of, a MAC address, including its structure"],
    "3.4.3": ["3.4 Network hardware", "Understand what is meant by, and the purpose of, an IP address, and that there are different types of IP address"],
    "3.4.4": ["3.4 Network hardware", "Describe the role of a router in a network"],
    // ---- 4 Software
    "4.1.1": ["4.1 Types of software and interrupts", "Describe the difference between system software and application software and provide examples of each"],
    "4.1.2": ["4.1 Types of software and interrupts", "Describe the role and basic functions of an operating system"],
    "4.1.3": ["4.1 Types of software and interrupts", "Understand how hardware, firmware and an operating system are required to run applications software"],
    "4.1.4": ["4.1 Types of software and interrupts", "Describe the role and operation of interrupts"],
    "4.2.1": ["4.2 Programming languages, translators and IDEs", "Explain what is meant by a high-level language and a low-level language, including the advantages and disadvantages of each"],
    "4.2.2": ["4.2 Programming languages, translators and IDEs", "Understand that assembly language is a form of low-level language that uses mnemonics, and that an assembler is needed to translate it"],
    "4.2.3": ["4.2 Programming languages, translators and IDEs", "Describe the operation of a compiler and an interpreter, including how errors are reported"],
    "4.2.4": ["4.2 Programming languages, translators and IDEs", "Explain the advantages and disadvantages of a compiler and an interpreter"],
    "4.2.5": ["4.2 Programming languages, translators and IDEs", "Explain the role of an IDE in writing program code and the common functions IDEs provide"],
    // ---- 7 Algorithm design and problem-solving
    "7.1": ["7 Algorithm design and problem-solving", "Understand the program development life cycle, limited to: analysis, design, coding and testing"],
    "7.2": ["7 Algorithm design and problem-solving", "Understand sub-systems and decomposition (inputs, processes, outputs, storage), and use structure diagrams, flowcharts and pseudocode to design a solution"],
    "7.3": ["7 Algorithm design and problem-solving", "Explain the purpose of a given algorithm"],
    "7.4": ["7 Algorithm design and problem-solving", "Understand standard methods of solution: linear search, bubble sort, totalling, counting, finding maximum, minimum and average values"],
    "7.5a": ["7 Algorithm design and problem-solving", "Understand the need for validation checks on input data and the different types of validation check"],
    "7.5b": ["7 Algorithm design and problem-solving", "Understand the need for verification checks on input data and the different types of verification check"],
    "7.6": ["7 Algorithm design and problem-solving", "Suggest and apply suitable test data (normal, abnormal, extreme, boundary)"],
    "7.7": ["7 Algorithm design and problem-solving", "Complete a trace table to document a dry-run of an algorithm"],
    "7.8": ["7 Algorithm design and problem-solving", "Identify errors in given algorithms and suggest ways of correcting these errors"],
    "7.9": ["7 Algorithm design and problem-solving", "Write and amend algorithms for given problems or scenarios using pseudocode, program code and flowcharts"],
    // ---- 8 Programming
    "8.1.1": ["8.1 Programming concepts", "Declare and use variables and constants"],
    "8.1.2": ["8.1 Programming concepts", "Understand and use basic data types (integer, real, char, string, Boolean)"],
    "8.1.3": ["8.1 Programming concepts", "Understand and use input and output"],
    "8.1.4a": ["8.1 Programming concepts", "Understand and use the concept of sequence"],
    "8.1.4b": ["8.1 Programming concepts", "Understand and use the concept of selection (IF and CASE statements)"],
    "8.1.4c": ["8.1 Programming concepts", "Understand and use the concept of iteration (count-controlled, pre-condition and post-condition loops)"],
    "8.1.4d": ["8.1 Programming concepts", "Understand and use the concepts of totalling and counting"],
    "8.1.4e": ["8.1 Programming concepts", "Understand and use the concept of string handling (length, substring, upper, lower)"],
    "8.1.4f": ["8.1 Programming concepts", "Understand and use arithmetic, relational and logical operators"],
    "8.1.5": ["8.1 Programming concepts", "Understand and use nested statements (nested selection and iteration)"],
    "8.1.6a": ["8.1 Programming concepts", "Understand what is meant by procedures, functions and parameters"],
    "8.1.6b": ["8.1 Programming concepts", "Define and use procedures and functions, with or without parameters"],
    "8.1.6c": ["8.1 Programming concepts", "Understand and use local and global variables"],
    "8.1.7": ["8.1 Programming concepts", "Understand and use library routines (MOD, DIV, ROUND, RANDOM)"],
    "8.1.8": ["8.1 Programming concepts", "Understand how to create a maintainable program (meaningful identifiers, comments, procedures and functions)"],
    "8.2.1": ["8.2 Arrays", "Declare and use one-dimensional (1D) and two-dimensional (2D) arrays"],
    "8.2.2": ["8.2 Arrays", "Understand the use of arrays, including the use of variables as indexes"],
    "8.2.3": ["8.2 Arrays", "Write values into, and read values from, an array using iteration (including nested iteration)"],
    "8.3.1": ["8.3 File handling", "Understand the purpose of storing data in a file to be used by a program"],
    "8.3.2": ["8.3 File handling", "Open, close and use a file for reading and writing"]
  };
  function parse(code){ return String(code).match(/^(\d+)/)[1]; }
  // Display form "8.1.4(c)" for codes that end in a letter.
  function pretty(code){ return code.replace(/([a-z])$/, "($1)"); }

  var CSS =
    ".syl-ref-area{ margin: 2px 0 12px; }" +
    ".syl-ref{ display: flex; gap: 8px; align-items: baseline; margin: 4px 0; padding: 6px 10px;" +
      " border-left: 3px solid var(--accent, #146C6A); background: var(--accent-tint, #E4F1F0);" +
      " border-radius: 0 6px 6px 0; font-size: 12.5px; line-height: 1.4; color: var(--muted, #5b6472); }" +
    ".syl-ref .syl-tag{ flex: 0 0 auto; font-weight: 700; color: var(--accent, #146C6A); white-space: nowrap; }" +
    ".syl-ref .syl-text{ min-width: 0; }" +
    ".syl-ref.syl-review{ margin: 6px 0 2px; }" +
    "@media (max-width:520px){ .syl-ref{ flex-wrap: wrap; gap: 2px 8px; } .syl-ref .syl-text{ flex: 1 1 100%; } }" +
    "@media print{ .syl-ref{ background: none; } }";
  function injectCss(){
    if(document.getElementById("syl-css")) return;
    var st = document.createElement("style"); st.id = "syl-css"; st.textContent = CSS;
    document.head.appendChild(st);
  }
  window.SYLLABUS_OBJECTIVES = {
    TOPICS: TOPICS, OBJECTIVES: O,
    // -> { code, label, topicNum, topicTitle, section, text } or null
    lookup: function(code){
      var o = O[code]; if(!o) return null;
      var t = parse(code);
      return { code: code, label: pretty(code), topicNum: t, topicTitle: TOPICS[t], section: o[0], text: o[1] };
    },
    // Short HTML-free summary lines for a question's `syl` array.
    // DOM element showing "Topic N - code" and the objective text for each
    // code (one row each), or null if the codes are missing / unknown.
    render: function(codes, extraClass){
      var items = this.describe(codes);
      if(!items.length) return null;
      injectCss();
      var wrap = document.createElement("div");
      items.forEach(function(it){
        var row = document.createElement("div");
        row.className = "syl-ref" + (extraClass ? " " + extraClass : "");
        var tag = document.createElement("span"); tag.className = "syl-tag";
        tag.textContent = "Syllabus " + it.label + " \u00b7 Topic " + it.topicNum;
        var txt = document.createElement("span"); txt.className = "syl-text";
        txt.textContent = it.topicTitle + ": " + it.text;
        row.appendChild(tag); row.appendChild(txt); wrap.appendChild(row);
      });
      return wrap;
    },
    // Short plain-text form for the PDF report, e.g. "Syllabus 3.1.2 (Topic 3: Hardware)".
    plain: function(codes){
      return this.describe(codes).map(function(it){
        return "Syllabus " + it.label + " (Topic " + it.topicNum + ": " + it.topicTitle + ")";
      }).join("; ");
    },
    describe: function(codes){
      var self = this;
      return (codes || []).map(function(c){ return self.lookup(c); }).filter(Boolean);
    }
  };
})();
