// Cambridge International AS & A Level Computer Science 9618 (2026) -- AS Level content, sections 1 to 12.
// Paper 1 Theory Fundamentals covers sections 1-8; Paper 2 Fundamental Problem-solving and Programming covers sections 9-12.
// Wording follows the "Candidates should be able to" column of the syllabus document. This file defines the same global as
// syllabus-objectives.js (SYLLABUS_OBJECTIVES), so the iLearn engine can run the AS journey unchanged. It is loaded by as.html only.
(function(){
  "use strict";
  var TOPICS = {
    1: "Information representation", 2: "Communication", 3: "Hardware", 4: "Processor fundamentals", 5: "System software",
    6: "Security, privacy and data integrity", 7: "Ethics and ownership", 8: "Databases",
    9: "Algorithm design and problem-solving", 10: "Data types and structures", 11: "Programming", 12: "Software development"
  };
  var O = {
    // ---- 1 Information representation
    "1.1.1": ["1.1 Data representation", "Show understanding of binary magnitudes and the difference between binary prefixes and decimal prefixes"],
    "1.1.2": ["1.1 Data representation", "Show understanding of different number systems: binary, denary, hexadecimal, BCD, one's and two's complement; convert between them"],
    "1.1.3": ["1.1 Data representation", "Perform binary addition and subtraction; show understanding of how overflow can occur"],
    "1.1.4": ["1.1 Data representation", "Describe practical applications where Binary Coded Decimal (BCD) and hexadecimal are used"],
    "1.1.5": ["1.1 Data representation", "Represent character data in its internal binary form: ASCII, extended ASCII and Unicode"],
    "1.2.1": ["1.2 Multimedia", "Show understanding of how data for a bitmapped image are encoded and estimate bitmap file size"],
    "1.2.2": ["1.2 Multimedia", "Show understanding of the effects of changing elements of a bitmap image on image quality and file size"],
    "1.2.3": ["1.2 Multimedia", "Show understanding of how data for a vector graphic are encoded and justify bitmap or vector for a task"],
    "1.2.4": ["1.2 Multimedia", "Show understanding of how sound is represented and encoded, and the impact of changing sampling rate and resolution"],
    "1.3.1": ["1.3 Compression", "Show understanding of the need for compression; lossy and lossless compression and how text, bitmap, vector and sound files are compressed (including RLE)"],
    // ---- 2 Communication
    "2.1.1": ["2.1 Networks including the internet", "Purpose and benefits of networking devices; characteristics of a LAN and a WAN"],
    "2.1.2": ["2.1 Networks including the internet", "Explain client-server and peer-to-peer models; thin-client and thick-client"],
    "2.1.3": ["2.1 Networks including the internet", "Bus, star, mesh and hybrid topologies, and how packets are transmitted for a given topology"],
    "2.1.4": ["2.1 Networks including the internet", "Cloud computing: public and private clouds, benefits and drawbacks"],
    "2.1.5": ["2.1 Networks including the internet", "Wireless and wired networks, and the hardware that supports a LAN"],
    "2.1.6": ["2.1 Networks including the internet", "The role and function of a router; Ethernet and CSMA/CD"],
    "2.1.7": ["2.1 Networks including the internet", "Bit streaming; the difference between the WWW and the internet; hardware that supports the internet"],
    "2.1.8": ["2.1 Networks including the internet", "IP addresses: IPv4 and IPv6, subnetting, public and private, static and dynamic"],
    "2.1.9": ["2.1 Networks including the internet", "How a URL is used to locate a resource and the role of the Domain Name Service (DNS)"],
    // ---- 3 Hardware
    "3.1.1": ["3.1 Computers and their components", "Need for input, output, primary memory and secondary (including removable) storage; embedded systems"],
    "3.1.2": ["3.1 Computers and their components", "Principal operations of hardware devices; the use of buffers"],
    "3.1.3": ["3.1 Computers and their components", "RAM and ROM; SRAM and DRAM; PROM, EPROM and EEPROM"],
    "3.1.4": ["3.1 Computers and their components", "Monitoring and control systems: sensors, actuators and feedback"],
    "3.2.1": ["3.2 Logic gates and logic circuits", "Use logic gate symbols and define the functions of NOT, AND, OR, NAND, NOR and XOR; construct truth tables"],
    "3.2.2": ["3.2 Logic gates and logic circuits", "Construct logic circuits, truth tables and logic expressions from a problem statement, circuit, expression or table"],
    // ---- 4 Processor fundamentals
    "4.1.1": ["4.1 CPU architecture", "Von Neumann model and the stored program concept; the purpose and role of registers"],
    "4.1.2": ["4.1 CPU architecture", "Roles of the ALU, CU, system clock and IAS; the address, data and control buses"],
    "4.1.3": ["4.1 CPU architecture", "Factors that contribute to computer performance; ports and the peripherals they connect"],
    "4.1.4": ["4.1 CPU architecture", "The stages of the fetch-execute cycle and register transfer notation"],
    "4.1.5": ["4.1 CPU architecture", "The purpose of interrupts: causes, applications, ISR, when detected and how handled"],
    "4.2.1": ["4.2 Assembly language", "Relationship between assembly language and machine code; the two-pass assembler"],
    "4.2.2": ["4.2 Assembly language", "Trace assembly programs; instruction groups and modes of addressing"],
    "4.3.1": ["4.3 Bit manipulation", "Binary shifts (logical, arithmetic, cyclic) and bit manipulation to monitor/control a device (masking)"],
    // ---- 5 System software
    "5.1.1": ["5.1 Operating systems", "Why a computer system requires an OS and the key management tasks it carries out"],
    "5.1.2": ["5.1 Operating systems", "Utility software and program libraries (including DLL files)"],
    "5.2.1": ["5.2 Language translators", "Need for assemblers, compilers and interpreters; benefits and drawbacks of each"],
    "5.2.2": ["5.2 Language translators", "Features found in a typical IDE"],
    // ---- 6 Security, privacy and data integrity
    "6.1.1": ["6.1 Data security", "Security, privacy and integrity of data; the need for security of data and of the computer system"],
    "6.1.2": ["6.1 Data security", "Threats from networks and the internet, and security measures to protect systems and data"],
    "6.2.1": ["6.2 Data integrity", "How data validation and data verification protect integrity; methods of each"],
    // ---- 7 Ethics and ownership
    "7.1.1": ["7.1 Ethics and ownership", "The need for and purpose of ethics as a computing professional; professional bodies (BCS, IEEE)"],
    "7.1.2": ["7.1 Ethics and ownership", "Copyright legislation and types of software licence"],
    "7.1.3": ["7.1 Ethics and ownership", "Artificial Intelligence (AI): applications and social, economic and environmental impact"],
    // ---- 8 Databases
    "8.1.1": ["8.1 Database concepts", "Limitations of a file-based approach and the features of a relational database that address them"],
    "8.1.2": ["8.1 Database concepts", "Relational database terminology; entity-relationship diagrams"],
    "8.1.3": ["8.1 Database concepts", "Normalisation: 1NF, 2NF and 3NF"],
    "8.2.1": ["8.2 DBMS", "Features of a DBMS and the software tools within it (developer interface, query processor)"],
    "8.3.1": ["8.3 DDL and DML", "DDL: CREATE DATABASE, CREATE TABLE, ALTER TABLE, primary and foreign keys"],
    "8.3.2": ["8.3 DDL and DML", "DML: SELECT, FROM, WHERE, ORDER BY, GROUP BY, INNER JOIN, SUM, COUNT, AVG; INSERT, DELETE, UPDATE"],
    // ---- 9 Algorithm design and problem-solving
    "9.1.1": ["9.1 Computational thinking skills", "Abstraction: its need, benefits and purpose; produce an abstract model"],
    "9.1.2": ["9.1 Computational thinking skills", "Decomposition: break problems into sub-problems leading to modules (procedures and functions)"],
    "9.2.1": ["9.2 Algorithms", "An algorithm as a sequence of defined steps; identifier tables; input, process and output"],
    "9.2.2": ["9.2 Algorithms", "Pseudocode using sequence, selection and iteration; structured English, flowcharts and pseudocode"],
    "9.2.3": ["9.2 Algorithms", "Stepwise refinement and logic statements to define parts of an algorithm"],
    // ---- 10 Data types and structures
    "10.1.1": ["10.1 Data types and records", "Select and use appropriate data types; define and use record structures"],
    "10.2.1": ["10.2 Arrays", "Array terminology; 1D and 2D arrays; bubble sort and linear search"],
    "10.3.1": ["10.3 Files", "Why files are needed; pseudocode to handle text files"],
    "10.4.1": ["10.4 Abstract data types", "ADTs: stack, queue and linked list; implementing them using arrays"],
    // ---- 11 Programming
    "11.1.1": ["11.1 Programming basics", "Implement pseudocode from a design; constants, variables, assignment, expressions, input and output; built-in functions"],
    "11.2.1": ["11.2 Constructs", "IF and CASE statements; count-controlled, post-condition and pre-condition loops; choosing a loop"],
    "11.3.1": ["11.3 Structured programming", "Define and use procedures and functions; parameters (by value and by reference); efficient pseudocode"],
    // ---- 12 Software development
    "12.1.1": ["12.1 Program development life cycle", "Purpose of a development life cycle; waterfall, iterative and RAD; the stages of the life cycle"],
    "12.2.1": ["12.2 Program design", "Structure charts and state-transition diagrams"],
    "12.3.1": ["12.3 Program testing and maintenance", "Types of error; testing methods, test strategy and test plans, test data; types of maintenance"]
  };
  window.SYLLABUS_OBJECTIVES = { OBJECTIVES: O, TOPICS: TOPICS };
})();
