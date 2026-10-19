// Cambridge International AS & A Level Computer Science 9618 (2026) -- A Level content,
// sections 13 to 20 (Paper 3 Advanced Theory; sections 19 and 20 are also assessed in Paper 4).
// Wording follows the "Candidates should be able to" column of the syllabus document.
// This file defines the same global as syllabus-objectives.js (SYLLABUS_OBJECTIVES), so the iLearn
// engine can run the A Level journey unchanged. It is loaded by alevel.html only.
(function(){
  "use strict";
  var TOPICS = {
    13: "Data representation",
    14: "Communication and internet technologies",
    15: "Hardware and virtual machines",
    16: "System software",
    17: "Security",
    18: "Artificial intelligence (AI)",
    19: "Computational thinking and problem-solving",
    20: "Further programming"
  };
  var O = {
    // ---- 13 Data representation
    "13.1.1": ["13.1 User-defined data types", "Show understanding of why user-defined types are necessary"],
    "13.1.2": ["13.1 User-defined data types", "Define and use non-composite types, including enumerated and pointer"],
    "13.1.3": ["13.1 User-defined data types", "Define and use composite data types, including set, record and class/object"],
    "13.1.4": ["13.1 User-defined data types", "Choose and design an appropriate user-defined data type for a given problem"],
    "13.2.1": ["13.2 File organisation and access", "Show understanding of the methods of file organisation (serial, sequential using a key field, random using a record key) and select an appropriate method for a given problem"],
    "13.2.2": ["13.2 File organisation and access", "Show understanding of methods of file access: sequential access for serial and sequential files, direct access for sequential and random files"],
    "13.2.3": ["13.2 File organisation and access", "Show understanding of hashing algorithms: describe and use different hashing algorithms to read from and write data to a random / sequential file"],
    "13.3.1": ["13.3 Floating-point numbers, representation and manipulation", "Describe the format of binary floating-point real numbers (two's complement form) and understand the effects of changing the allocation of bits to mantissa and exponent"],
    "13.3.2": ["13.3 Floating-point numbers, representation and manipulation", "Convert binary floating-point real numbers into denary and vice versa"],
    "13.3.3": ["13.3 Floating-point numbers, representation and manipulation", "Normalise floating-point numbers and understand the reasons for normalisation"],
    "13.3.4": ["13.3 Floating-point numbers, representation and manipulation", "Show understanding of the consequences of a binary representation only being an approximation to the real number it represents; understand how underflow and overflow can occur"],
    "13.3.5": ["13.3 Floating-point numbers, representation and manipulation", "Show understanding that binary representations can give rise to rounding errors"],

    // ---- 14 Communication and internet technologies
    "14.1.1": ["14.1 Protocols", "Show understanding of why a protocol is essential for communication between computers"],
    "14.1.2": ["14.1 Protocols", "Show understanding of how protocol implementation can be viewed as a stack, where each layer has its own functionality"],
    "14.1.3": ["14.1 Protocols", "Show understanding of the TCP/IP protocol suite: four layers (Application, Transport, Internet, Link), the purpose and function of each layer, and how a message is sent from one host to another on the internet"],
    "14.1.4": ["14.1 Protocols", "Show understanding of protocols (HTTP, FTP, POP3, IMAP, SMTP, BitTorrent) and their purposes"],
    "14.2.1": ["14.2 Circuit switching, packet switching", "Show understanding of circuit switching: benefits, drawbacks and where it is applicable"],
    "14.2.2": ["14.2 Circuit switching, packet switching", "Show understanding of packet switching: benefits, drawbacks, the function of a router, and how packet switching is used to pass messages across a network, including the internet"],

    // ---- 15 Hardware and virtual machines
    "15.1.1": ["15.1 Processors, parallel processing and virtual machines", "Show understanding of Reduced Instruction Set Computers (RISC) and Complex Instruction Set Computers (CISC) processors, including the differences and interrupt handling"],
    "15.1.2": ["15.1 Processors, parallel processing and virtual machines", "Show understanding of the importance / use of pipelining and registers in RISC processors"],
    "15.1.3": ["15.1 Processors, parallel processing and virtual machines", "Show understanding of the four basic computer architectures: SISD, SIMD, MISD, MIMD"],
    "15.1.4": ["15.1 Processors, parallel processing and virtual machines", "Show understanding of the characteristics of massively parallel computers"],
    "15.1.5": ["15.1 Processors, parallel processing and virtual machines", "Show understanding of the concept of a virtual machine, with examples of its role, benefits and limitations"],
    "15.2.1": ["15.2 Boolean algebra and logic circuits", "Produce truth tables for logic circuits including half adders and full adders (may include gates with more than two inputs)"],
    "15.2.2": ["15.2 Boolean algebra and logic circuits", "Show understanding of a flip-flop (SR, JK): draw a logic circuit and derive a truth table; understand the role of flip-flops as data storage elements"],
    "15.2.3": ["15.2 Boolean algebra and logic circuits", "Show understanding of Boolean algebra: De Morgan's laws, and simplify a logic circuit/expression using Boolean algebra"],
    "15.2.4": ["15.2 Boolean algebra and logic circuits", "Show understanding of Karnaugh maps (K-map): the benefits of using them and solving logic problems with them"],

    // ---- 16 System software
    "16.1.1": ["16.1 Purposes of an operating system (OS)", "Show understanding of how an OS can maximise the use of resources"],
    "16.1.2": ["16.1 Purposes of an operating system (OS)", "Describe the ways in which the user interface hides the complexities of the hardware from the user"],
    "16.1.3": ["16.1 Purposes of an operating system (OS)", "Show understanding of process management: multi-tasking, process states (running, ready, blocked), scheduling routines (round robin, shortest job first, first come first served, shortest remaining time), and the kernel as interrupt handler"],
    "16.1.4": ["16.1 Purposes of an operating system (OS)", "Show understanding of virtual memory, paging and segmentation for memory management, including page replacement and disk thrashing"],
    "16.2.1": ["16.2 Translation software", "Show understanding of how an interpreter can execute programs without producing a translated version"],
    "16.2.2": ["16.2 Translation software", "Show understanding of the various stages in the compilation of a program: lexical analysis, syntax analysis, code generation and optimisation"],
    "16.2.3": ["16.2 Translation software", "Show understanding of how the grammar of a language can be expressed using syntax diagrams or Backus-Naur Form (BNF) notation"],
    "16.2.4": ["16.2 Translation software", "Show understanding of how Reverse Polish Notation (RPN) can be used to carry out the evaluation of expressions"],

    // ---- 17 Security
    "17.1.1": ["17.1 Encryption, encryption protocols and digital certificates", "Show understanding of how encryption works: public key, private key, plain text, cipher text, symmetric and asymmetric cryptography, sending a private message and a verified message, and quantum cryptography"],
    "17.1.2": ["17.1 Encryption, encryption protocols and digital certificates", "Show awareness of the Secure Socket Layer (SSL) / Transport Layer Security (TLS): purpose, use in client-server communication and appropriate situations"],
    "17.1.3": ["17.1 Encryption, encryption protocols and digital certificates", "Show understanding of digital certification: how a digital certificate is acquired and how it is used to produce digital signatures"],

    // ---- 18 Artificial intelligence
    "18.1.1": ["18.1 Artificial intelligence (AI)", "Show understanding of how graphs can be used to aid AI: purpose and structure of a graph; use A* and Dijkstra's algorithms to perform searches on a graph"],
    "18.1.2": ["18.1 Artificial intelligence (AI)", "Show understanding of how artificial neural networks have helped with machine learning"],
    "18.1.3": ["18.1 Artificial intelligence (AI)", "Show understanding of deep learning, machine learning (supervised and unsupervised) and reinforcement learning, and the reasons for using these methods"],
    "18.1.4": ["18.1 Artificial intelligence (AI)", "Show understanding of back propagation of errors and regression methods in machine learning"],

    // ---- 19 Computational thinking and problem-solving
    "19.1.1": ["19.1 Algorithms", "Show understanding of linear and binary searching methods and write algorithms to implement them"],
    "19.1.2": ["19.1 Algorithms", "Show understanding of insertion sort and bubble sort methods and write algorithms to implement them"],
    "19.1.3": ["19.1 Algorithms", "Show understanding of and use abstract data types (ADT): write algorithms to find, insert and delete items in a stack, queue, linked list and binary tree; understand that a graph is an ADT"],
    "19.1.4": ["19.1 Algorithms", "Show how it is possible for ADTs to be implemented from another ADT or built-in types: stack, queue, linked list, dictionary, binary tree"],
    "19.1.5": ["19.1 Algorithms", "Show understanding that different algorithms which perform the same task can be compared using criteria such as time taken and memory used, including Big O notation"],
    "19.2.1": ["19.2 Recursion", "Show understanding of recursion: essential features, how it is expressed in a programming language, write and trace recursive algorithms, and when it is beneficial"],
    "19.2.2": ["19.2 Recursion", "Show awareness of what a compiler has to do to translate recursive programming code: use of stacks and unwinding"],

    // ---- 20 Further programming
    "20.1.1": ["20.1 Programming paradigms", "Understand what is meant by a programming paradigm"],
    "20.1.2": ["20.1 Programming paradigms", "Low-level programming: understand and write low-level code that uses various addressing modes (immediate, direct, indirect, indexed and relative)"],
    "20.1.3": ["20.1 Programming paradigms", "Imperative (procedural) programming: write code that uses variables, constructs, procedures and functions"],
    "20.1.4": ["20.1 Programming paradigms", "Object-oriented programming (OOP): terminology, designing appropriate classes, and writing code that uses OOP"],
    "20.1.5": ["20.1 Programming paradigms", "Declarative programming: solve a problem by writing facts and rules, and write code that satisfies a goal using facts and rules"],
    "20.2.1": ["20.2 File processing and exception handling", "Write code to perform file-processing operations: open (read, write, append) and close a file, read and write a record, on serial, sequential and random files"],
    "20.2.2": ["20.2 File processing and exception handling", "Show understanding of an exception and the importance of exception handling; know when to use it and write code that uses it"]
  };
  window.SYLLABUS_OBJECTIVES = { TOPICS: TOPICS, OBJECTIVES: O };
})();
