/* Paper 2 mock papers (0478 Algorithms, Programming and Logic): 75 marks = nine structured questions (60)
   plus the 15-mark scenario question, all hand-written to follow the layout and style of recent papers
   and to cover syllabus topics 7-10.

   Part types:
     text   - written answer, marked against the mark points below (key terms are suggested, the student confirms)
     code   - written pseudocode, same marking as text
     choice - drop-down answers, one mark each, marked automatically
     fields - short typed answers, one mark each, marked automatically
     fill   - pseudocode with gaps to complete from a list, one mark per gap, marked automatically
     table  - a table to complete (trace table, truth table, query output), marked by groups of cells
     draw   - a diagram drawn on the drawing pad; marked by the student against the mark scheme and model diagram  */
(function(root){
  "use strict";
  var F = root.P2Fig;

  function kw(text, marks, groups, need, opts){
    var m = { type: "keywords", groups: groups, needCount: need || 1 };
    if(opts && opts.tight) m.tight = true;
    return { text: text, marks: marks, match: m, topic: opts && opts.topic };
  }
  function nums(text, marks, values){ return { text: text, marks: marks, match: { type: "nums", values: values } }; }
  function manual(text, marks, opts){ return { text: text, marks: marks, match: null, topic: opts && opts.topic }; }
  function lines(code){            // number the lines of a pseudocode listing like the exam does
    return code.replace(/^\n/, "").replace(/\n$/, "");
  }

  var T7 = "7", T8 = "8", T9 = "9", T10 = "10";

  /* ===================== PAPER A : predicted Oct/Nov 2026 style ===================== */
  // ---- figures ----
  var flowA = F.svg(560, 475,
    F.term(260, 28, 90, 36, "Start") +
    F.line([[260, 46], [260, 66]], true) +
    F.proc(260, 92, 150, 52, ["Total ← 0", "Count ← 0"]) +
    F.line([[260, 118], [260, 143]], true) +
    F.io(260, 162, 170, 38, "INPUT Number") +
    F.line([[260, 181], [260, 212]], true) +
    F.dec(260, 252, 190, 80, "Number = 0 ?") +
    F.line([[260, 292], [260, 325]], true) + F.text(276, 314, "No", "start") +
    F.proc(260, 345, 190, 40, "Total ← Total + Number") +
    F.line([[260, 365], [260, 390]], true) +
    F.proc(260, 410, 150, 40, "Count ← Count + 1") +
    F.line([[260, 430], [260, 455], [60, 455], [60, 162], [175, 162]], true) +
    F.line([[355, 252], [450, 252], [450, 301]], true) + F.text(398, 243, "Yes") +
    F.io(450, 320, 200, 38, "OUTPUT Total, Count") +
    F.line([[450, 339], [450, 382]], true) +
    F.term(450, 400, 90, 36, "Stop"),
    "Flowchart for question 3");

  var structModelA = F.svg(520, 190,
    F.proc(260, 30, 150, 40, "Gala program") +
    F.line([[260, 50], [260, 80]]) + F.line([[90, 80], [430, 80]]) +
    F.line([[90, 80], [90, 110]], true) + F.line([[260, 80], [260, 110]], true) + F.line([[430, 80], [430, 110]], true) +
    F.proc(90, 135, 150, 50, ["Record swimmers'", "details"]) +
    F.proc(260, 135, 150, 50, ["Record race", "times"]) +
    F.proc(430, 135, 150, 50, ["Display", "results"]),
    "Model structure diagram");

  var circuitModelA = (function(){
    var s = "";
    s += F.text(14, 60, "A", "middle") + F.text(14, 80, "B", "middle") + F.text(14, 170, "C", "middle");
    s += F.line([[26, 55], [140, 55]]) + F.line([[26, 75], [140, 75]]) + F.line([[26, 165], [140, 165]]);
    s += F.gate("AND", 140, 40) + F.gate("NOT", 140, 140);
    s += F.line([[218, 65], [270, 65], [270, 105], [320, 105]]);
    s += F.line([[218, 165], [270, 165], [270, 125], [320, 125]]);
    s += F.gate("OR", 320, 90);
    s += F.line([[398, 115], [450, 115]]) + F.text(464, 120, "X", "start", 16, true);
    return F.svg(500, 215, s, "Model logic circuit for X = (A AND B) OR (NOT C)");
  })();

  var circuitQA = (function(){
    var s = "";
    s += F.text(14, 60, "P", "middle") + F.text(14, 80, "Q", "middle") + F.text(14, 130, "R", "middle");
    s += F.line([[26, 55], [130, 55]]) + F.line([[26, 75], [130, 75]]) + F.line([[28, 125], [250, 125], [250, 105], [280, 105]]);
    s += F.gate("NOR", 130, 40) + F.gate("AND", 280, 70);
    s += F.line([[208, 65], [240, 65], [240, 85], [280, 85]]);
    s += F.line([[358, 95], [420, 95]]) + F.text(434, 100, "S", "start", 16, true);
    return F.svg(470, 165, s, "Logic circuit with inputs P, Q and R and output S");
  })();

  var filmTable = '<table class="p2-data"><tr><th>FilmID</th><th>Title</th><th>Genre</th><th>Length</th><th>Rating</th><th>Seen</th></tr>' +
    [["101", "Space Race", "Action", "118", "7.4", "TRUE"], ["102", "Laugh Out Loud", "Comedy", "96", "6.8", "TRUE"], ["103", "The Last Train", "Drama", "134", "8.1", "FALSE"],
     ["104", "Cartoon Capers", "Comedy", "88", "7.2", "TRUE"], ["105", "Deep Blue", "Documentary", "102", "7.9", "FALSE"], ["106", "Midnight Chase", "Action", "125", "6.5", "FALSE"],
     ["107", "Family Fun Day", "Comedy", "91", "7.6", "FALSE"], ["108", "Mountain Echo", "Drama", "140", "7.7", "TRUE"]]
    .map(function(r){ return "<tr>" + r.map(function(c){ return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";

  var A = {
    id: "A",
    title: "Predicted paper · October/November 2026 style",
    blurb: "Built from the patterns of recent 0478 Paper 2 papers: a structure diagram, validation and test data, a flowchart trace table, finding errors, programming concepts, arrays with searching and sorting, file handling, a database table with SQL, logic circuits and truth tables, and a 15-mark scenario question to finish.",
    questions: [
      /* ---------------- Q1 ---------------- */
      { n: 1, title: "Program development and decomposition", intro: "A school is writing a program to organise its swimming gala.", parts: [
        { key: "1(a)", label: "(a)", type: "choice", marks: 2, topic: T7, syl: ["7.1"], ao: 1,
          prompt: "The program development life cycle has four stages: analysis, design, coding and testing.\nState the stage in which each of these tasks is done.",
          items: [
            { label: "Structure diagrams and flowcharts are produced", options: ["Analysis", "Design", "Coding", "Testing"], answer: "Design" },
            { label: "The finished program is run using test data", options: ["Analysis", "Design", "Coding", "Testing"], answer: "Testing" }
          ],
          note: "Structure diagrams, flowcharts and pseudocode are made in the design stage. Test data is used in the testing stage." },
        { key: "1(b)", label: "(b)", type: "draw", kind: "structure", marks: 3, topic: T7, syl: ["7.2"], ao: 2,
          prompt: "The gala program must:\n• record the swimmers' details\n• record the race times\n• display the results.\n\nDraw a structure diagram that breaks the program down into these three parts. Label the top box Gala program.",
          model: structModelA,
          markPoints: [
            manual("Top box labelled Gala program (a single box at the top)", 1),
            manual("Three boxes underneath, correctly labelled: record swimmers' details, record race times, display results", 1),
            manual("The top box joined to each of the three boxes by lines (a tree structure)", 1)
          ],
          note: "A structure diagram shows decomposition: a problem broken into smaller sub-problems, top to bottom, with lines joining each level." }
      ] },

      /* ---------------- Q2 ---------------- */
      { n: 2, title: "Validation, verification and test data", intro: "Students type their age into a registration form. The age must be a whole number from 11 to 16 inclusive.", parts: [
        { key: "2(a)", label: "(a)", type: "text", marks: 2, topic: T7, syl: ["7.5"], ao: 2,
          prompt: "Name one validation check that can be used on the age and describe how it would check the data.",
          markPoints: [
            kw("A suitable check is named: range check / type check / presence check", 1, [["range check", "type check", "presence check"]]),
            kw("A description that matches the check named, for example: checks the age is between 11 and 16 // checks the age is an integer // checks that something has been entered", 1,
              [["between 11 and 16", "11 and 16", "more than 10", "less than 17", "not less than 11", "not more than 16", "within", "range", "whole number", "integer", "not a letter", "not text", "left blank", "something has been entered", "not empty", "entered"]])
          ],
          note: "Validation checks that data is reasonable, it does not prove the data is correct. A range check suits 11 to 16; a type check checks for a whole number." },
        { key: "2(b)", label: "(b)", type: "fields", marks: 3, topic: T7, syl: ["7.6"], ao: 2,
          prompt: "Give one example of each type of test data for the age.",
          items: [
            { label: "Normal data", answer: "12, 13, 14 or 15", check: function(v){ return /^\s*(12|13|14|15)\s*$/.test(v); } },
            { label: "Extreme data", answer: "11 or 16", check: function(v){ return /^\s*(11|16)\s*$/.test(v); } },
            { label: "Abnormal data", answer: "Any value that should be rejected, such as 10, 17, −5, 3.5 or abc", check: function(v){ v = v.trim(); if(!v) return false; if(!/^-?\d+$/.test(v)) return true; var n = parseInt(v, 10); return n < 11 || n > 16; } }
          ],
          note: "Normal data is accepted and is inside the range. Extreme data is the largest and smallest acceptable value. Abnormal data should be rejected." },
        { key: "2(c)", label: "(c)", type: "text", marks: 1, topic: T7, syl: ["7.5"], ao: 1,
          prompt: "State one method of verification that could be used when the age is typed in.",
          markPoints: [ kw("Visual check (the user reads what was typed and compares it with the source) OR double entry (the age is typed twice and the two entries are compared)", 1, [["visual", "read", "compare", "look", "double", "twice", "two times", "again", "re-enter", "reenter", "second time", "typed in again"]]) ],
          note: "Verification checks that data has been copied correctly. Visual checks and double entry are the two methods in the syllabus." }
      ] },

      /* ---------------- Q3 ---------------- */
      { n: 3, title: "Flowcharts and trace tables", intro: "The flowchart shows an algorithm.", figure: flowA, parts: [
        { key: "3(a)", label: "(a)", type: "table", marks: 4, topic: T7, syl: ["7.7"], ao: 2,
          prompt: "The numbers 6, 9, 3 and 0 are input in this order.\nComplete the trace table for the algorithm.",
          headers: ["Number", "Total", "Count", "OUTPUT"],
          rows: [
            [{ a: "" }, { a: "0" }, { a: "0" }, { a: "" }],
            [{ a: "6" }, { a: "6" }, { a: "1" }, { a: "" }],
            [{ a: "9" }, { a: "15" }, { a: "2" }, { a: "" }],
            [{ a: "3" }, { a: "18" }, { a: "3" }, { a: "" }],
            [{ a: "0" }, { a: "", alt: ["18"] }, { a: "", alt: ["3"] }, { a: "18, 3", re: "^\\s*18\\D+3\\s*$" }]
          ],
          groups: [
            { text: "Number column: 6, 9, 3, 0 (first row blank)", marks: 1, cells: [[0,0],[1,0],[2,0],[3,0],[4,0]] },
            { text: "Total column: 0, 6, 15, 18", marks: 1, cells: [[0,1],[1,1],[2,1],[3,1],[4,1]] },
            { text: "Count column: 0, 1, 2, 3", marks: 1, cells: [[0,2],[1,2],[2,2],[3,2],[4,2]] },
            { text: "OUTPUT: 18 and 3 (in the last row)", marks: 1, cells: [[0,3],[1,3],[2,3],[3,3],[4,3]] }
          ],
          note: "Unchanged values may be repeated or left blank. The loop ends when 0 is input, so 0 is not added to Total and Count does not increase." },
        { key: "3(b)", label: "(b)", type: "text", marks: 2, topic: T7, syl: ["7.3"], ao: 2,
          prompt: "State the purpose of the algorithm.",
          markPoints: [
            kw("Adds up / totals the numbers that are input", 1, [["total", "sum", "add up", "adds", "adding", "addition"]]),
            kw("Counts how many numbers were input (until 0 is entered)", 1, [["count", "how many", "number of numbers", "amount of numbers", "quantity"]])
          ],
          note: "A purpose statement says what the algorithm achieves, not what each line does. 0 is a rogue value that stops the loop." },
        { key: "3(c)", label: "(c)", type: "fields", marks: 1, topic: T7, syl: ["7.7"], ao: 2,
          prompt: "The first number input is 0.\nState the two values that are output.",
          items: [ { label: "Values output", answer: "0 and 0", check: function(v){ return /^\s*(total\s*=?\s*)?0\D+(count\s*=?\s*)?0\s*$/i.test(v) || /^\s*both\s*0\s*$/i.test(v) || /^\s*(zero|0)\s+and\s+(zero|0)\s*$/i.test(v); } } ],
          note: "Total and Count both stay at their starting value, 0, because the loop never runs." }
      ] },

      /* ---------------- Q4 ---------------- */
      { n: 4, title: "Finding errors in an algorithm", intro: "This algorithm should read in the marks of 10 students, count how many students scored 40 or more, and output the percentage of students who scored 40 or more.\nThe algorithm contains three errors.",
        code: lines(`
01 PassCount ← 0
02 FOR Student ← 1 TO 9
03     INPUT Mark
04     IF Mark > 40 THEN
05         PassCount ← PassCount + Mark
06     ENDIF
07 NEXT Student
08 Percentage ← PassCount / 10 * 100
09 OUTPUT Percentage`),
        parts: [
        { key: "4(a)", label: "(a)", type: "text", marks: 3, topic: T7, syl: ["7.8"], ao: 3,
          prompt: "Write down the line numbers of the three lines that contain an error.",
          markPoints: [ nums("Line 02", 1, [2]), nums("Line 04", 1, [4]), nums("Line 05", 1, [5]) ],
          note: "Line 08 is correct: PassCount / 10 * 100 gives the percentage of 10 students." },
        { key: "4(b)", label: "(b)", type: "code", marks: 3, topic: T7, syl: ["7.8"], ao: 3,
          prompt: "Write the corrected version of each of the three lines.",
          markPoints: [
            kw("FOR Student ← 1 TO 10 (the loop must run for 10 students)", 1, [["to10"]], 1, { tight: true }),
            kw("IF Mark >= 40 THEN (40 or more passes; accept ≥ 40 or Mark > 39)", 1, [[">=40", "≥40", ">39", "=>40"]], 1, { tight: true }),
            kw("PassCount ← PassCount + 1 (count the student, do not add the mark)", 1, [["passcount+1", "passcount←passcount+1", "passcount=passcount+1"]], 1, { tight: true })
          ],
          note: "Errors: the loop stops at 9 so only 9 students are read; > 40 leaves out students who scored exactly 40; adding Mark totals the marks instead of counting students." }
      ] },

      /* ---------------- Q5 ---------------- */
      { n: 5, title: "Programming concepts", intro: "A pet shop uses a program to store data about its stock.", parts: [
        { key: "5(a)", label: "(a)", type: "choice", marks: 3, topic: T8, syl: ["8.1.2"], ao: 1,
          prompt: "Choose the most suitable data type for each item of data.",
          items: [
            { label: "Number of fish in stock, for example 25", options: ["INTEGER", "REAL", "CHAR", "STRING", "BOOLEAN"], answer: "INTEGER" },
            { label: "Price of a fish tank, for example 49.99", options: ["INTEGER", "REAL", "CHAR", "STRING", "BOOLEAN"], answer: "REAL" },
            { label: "Whether an item is on sale: TRUE or FALSE", options: ["INTEGER", "REAL", "CHAR", "STRING", "BOOLEAN"], answer: "BOOLEAN" }
          ],
          note: "A whole number is INTEGER, a number with a fractional part is REAL, and TRUE / FALSE is BOOLEAN." },
        { key: "5(b)", label: "(b)", type: "fields", marks: 2, topic: T8, syl: ["8.1.4f", "8.1.7"], ao: 2, code: lines(`
01 Price ← 47
02 Packs ← Price DIV 10
03 Left ← Price MOD 10
04 OUTPUT Packs
05 OUTPUT Left`),
          prompt: "State the value that is output by each of these statements.",
          items: [
            { label: "Line 04 outputs", answer: "4", check: function(v){ return /^\s*4\s*$/.test(v); } },
            { label: "Line 05 outputs", answer: "7", check: function(v){ return /^\s*7\s*$/.test(v); } }
          ],
          note: "DIV gives the whole-number part of the division: 47 DIV 10 = 4. MOD gives the remainder: 47 MOD 10 = 7." },
        { key: "5(c)", label: "(c)", type: "text", marks: 2, topic: T8, syl: ["8.1.6"], ao: 1,
          prompt: "Describe the difference between a procedure and a function.",
          markPoints: [
            kw("A function returns a value (to the part of the program that called it)", 1, [["return", "returns", "gives back", "sends back", "value back", "passes back"]]),
            kw("A procedure does not return a value (it just carries out its statements) // a function is used within an expression / a procedure is called with CALL", 1, [["procedure does not", "procedure doesn't", "procedure only", "does not return", "doesn't return", "no value", "not return", "without returning", "call"]])
          ],
          note: "Both are named sub-programs that may take parameters. Only a function returns a value." }
      ] },

      /* ---------------- Q6 ---------------- */
      { n: 6, title: "Arrays, searching and sorting", intro: "A teacher stores the marks of six students in a one-dimensional (1D) array called Marks.", parts: [
        { key: "6(a)(i)", label: "(a)(i)", type: "code", marks: 1, topic: T8, syl: ["8.2.1"], ao: 1,
          prompt: "Write a pseudocode statement to declare the 1D array Marks to store six integers.",
          markPoints: [ kw("DECLARE Marks : ARRAY[1:6] OF INTEGER (accept 0:5)", 1, [["declaremarks:array"], ["[1:6]", "[0:5]"], ["ofinteger"]], 3, { tight: true }) ],
          note: "DECLARE <name> : ARRAY[<first>:<last>] OF <type>. The first index can be 0 or 1." },
        { key: "6(a)(ii)", label: "(ii)", type: "code", marks: 1, topic: T8, syl: ["8.2.1"], ao: 1,
          prompt: "Write a pseudocode statement to declare a two-dimensional (2D) array called Seats with 5 rows and 8 columns that stores BOOLEAN values.",
          markPoints: [ kw("DECLARE Seats : ARRAY[1:5, 1:8] OF BOOLEAN (accept 0-based or rows/columns the other way if consistent)", 1, [["declareseats:array"], ["[1:5,1:8]", "[0:4,0:7]", "[1:8,1:5]", "[0:7,0:4]"], ["ofboolean"]], 3, { tight: true }) ],
          note: "A 2D array has two index ranges: the first for rows, the second for columns." },
        { key: "6(b)", label: "(b)", type: "fill", marks: 3, topic: T8, syl: ["8.2.3", "7.4"], ao: 2,
          prompt: "Complete this algorithm, which totals the six marks and outputs the average mark.\nChoose the correct item for each gap.",
          code: lines(`
01 Total ← 0
02 FOR Index ← 1 TO {1}
03     Total ← Total + Marks[{2}]
04 NEXT Index
05 Average ← {3}
06 OUTPUT Average`),
          gaps: [
            { options: ["5", "6", "Marks", "Total"], answer: "6" },
            { options: ["Total", "Index", "6", "Marks"], answer: "Index" },
            { options: ["Total * 6", "Total / Marks", "Total / 6", "Total DIV Index"], answer: "Total / 6" }
          ],
          note: "The loop must run six times, the index variable selects each element in turn, and the average is the total divided by the number of marks." },
        { key: "6(c)", label: "(c)", type: "table", marks: 2, topic: T7, syl: ["7.4"], ao: 2,
          prompt: "The array Marks currently stores these values:\n7   2   9   4   1\nA bubble sort is used to sort the values into ascending order.\nWrite the contents of the array after the first pass of the bubble sort only.",
          headers: ["Marks[1]", "Marks[2]", "Marks[3]", "Marks[4]", "Marks[5]"],
          rows: [ [{ a: "2" }, { a: "7" }, { a: "4" }, { a: "1" }, { a: "9" }] ],
          groups: [
            { text: "9 is in the last position after the first pass", marks: 1, cells: [[0,4]] },
            { text: "The other four values are 2, 7, 4, 1 in that order", marks: 1, cells: [[0,0],[0,1],[0,2],[0,3]] }
          ],
          note: "Pass 1: 7,2 swap → 2 7 9 4 1; 7,9 stay; 9,4 swap → 2 7 4 9 1; 9,1 swap → 2 7 4 1 9. The largest value reaches the end after one pass." },
        { key: "6(d)", label: "(d)", type: "fields", marks: 1, topic: T7, syl: ["7.4"], ao: 2,
          prompt: "A linear search looks for the value 4 in the original (unsorted) array 7, 2, 9, 4, 1.\nState how many values are compared before the search finds 4.",
          items: [ { label: "Number of comparisons", answer: "4", check: function(v){ return /^\s*4\s*$/.test(v); } } ],
          note: "A linear search checks each value in order: 7, 2, 9, then 4. The fourth value is a match." }
      ] },

      /* ---------------- Q7 ---------------- */
      { n: 7, title: "File handling", intro: "A program reads whole numbers from the text file Scores.txt and outputs their total.", parts: [
        { key: "7", label: "", type: "fill", marks: 4, topic: T8, syl: ["8.3"], ao: 2,
          prompt: "Complete the pseudocode by choosing the correct item for each gap.",
          code: lines(`
01 {1} "Scores.txt" FOR READ
02 Total ← 0
03 WHILE NOT {2}("Scores.txt")
04     {3} "Scores.txt", Score
05     Total ← Total + Score
06 ENDWHILE
07 {4} "Scores.txt"
08 OUTPUT Total`),
          gaps: [
            { options: ["OPENFILE", "READFILE", "WRITEFILE", "CLOSEFILE"], answer: "OPENFILE" },
            { options: ["END", "EOF", "LENGTH", "EMPTY"], answer: "EOF" },
            { options: ["INPUT", "OPENFILE", "READFILE", "WRITEFILE"], answer: "READFILE" },
            { options: ["STOPFILE", "ENDFILE", "CLOSEFILE", "EOF"], answer: "CLOSEFILE" }
          ],
          note: "A file is opened for reading, read line by line until the end of the file (EOF), and then closed." }
      ] },

      /* ---------------- Q8 ---------------- */
      { n: 8, title: "Databases", intro: "A film club stores details of films in a database table called Film.", figure: filmTable, parts: [
        { key: "8(a)", label: "(a)", type: "fields", marks: 2, topic: T9, syl: ["9.1"], ao: 1,
          prompt: "State the number of fields and the number of records in the table.",
          items: [
            { label: "Number of fields", answer: "6", check: function(v){ return /^\s*6\s*$/.test(v); } },
            { label: "Number of records", answer: "8", check: function(v){ return /^\s*8\s*$/.test(v); } }
          ],
          note: "Fields are the columns (FilmID, Title, Genre, Length, Rating, Seen). Records are the rows of data; the heading row is not a record." },
        { key: "8(b)", label: "(b)", type: "fields", marks: 1, topic: T9, syl: ["9.3"], ao: 1,
          prompt: "Identify the field that is the most suitable primary key.",
          items: [ { label: "Primary key field", answer: "FilmID", check: function(v){ return /^\s*film\s*id\s*$/i.test(v); } } ],
          note: "A primary key must be unique for every record. Titles, genres and ratings can repeat; FilmID cannot." },
        { key: "8(c)", label: "(c)", type: "choice", marks: 1, topic: T9, syl: ["9.2"], ao: 1,
          prompt: "Choose the most suitable data type for the Seen field.",
          items: [ { label: "Seen", options: ["Boolean", "Character", "Date/time", "Integer", "Real", "Text / alphanumeric"], answer: "Boolean" } ],
          note: "Seen only ever holds TRUE or FALSE, so it is Boolean." },
        { key: "8(d)", label: "(d)", type: "table", marks: 2, topic: T9, syl: ["9.4"], ao: 2,
          prompt: "This SQL statement is run on the Film table.\nWrite the output in the table below.",
          code: 'SELECT Title, Rating\nFROM Film\nWHERE Genre = "Comedy" AND Rating > 7.0\nORDER BY Rating DESC;',
          headers: ["Title", "Rating"],
          rows: [ [{ a: "Family Fun Day", re: "^\\s*family\\s+fun\\s+day\\s*$" }, { a: "7.6" }], [{ a: "Cartoon Capers", re: "^\\s*cartoon\\s+capers\\s*$" }, { a: "7.2" }], [{ a: "" }, { a: "" }] ],
          groups: [
            { text: "First row: Family Fun Day, 7.6 (highest rating first)", marks: 1, cells: [[0,0],[0,1]] },
            { text: "Second row: Cartoon Capers, 7.2 and no further rows", marks: 1, cells: [[1,0],[1,1],[2,0],[2,1]] }
          ],
          note: "The comedies are Laugh Out Loud (6.8), Cartoon Capers (7.2) and Family Fun Day (7.6). Only those with a rating above 7.0 stay, sorted from highest to lowest." },
        { key: "8(e)", label: "(e)", type: "code", marks: 2, topic: T9, syl: ["9.4"], ao: 2,
          prompt: "Write an SQL statement to count the number of films that are longer than 100 minutes.",
          markPoints: [
            kw("SELECT COUNT(...) (COUNT(*) or COUNT(FilmID) or COUNT(Length))", 1, [["selectcount("]], 1, { tight: true }),
            kw("FROM Film WHERE Length > 100", 1, [["fromfilmwherelength>100", "fromfilmwherelength>=101"]], 1, { tight: true })
          ],
          note: "SELECT COUNT(*) FROM Film WHERE Length > 100; outputs 5." }
      ] },

      /* ---------------- Q9 ---------------- */
      { n: 9, title: "Logic circuits and truth tables", intro: "A logic circuit is described by the expression\nX = (A AND B) OR (NOT C)", parts: [
        { key: "9(a)", label: "(a)", type: "draw", kind: "logic", marks: 3, topic: T10, syl: ["10.3"], ao: 2,
          prompt: "Draw the logic circuit for this expression. Do not simplify the expression. Use the standard symbols for logic gates and label the inputs A, B and C and the output X.",
          model: circuitModelA,
          markPoints: [
            manual("An AND gate with inputs A and B", 1),
            manual("A NOT gate with input C", 1),
            manual("An OR gate that takes the outputs of the AND gate and the NOT gate, with output labelled X", 1)
          ],
          note: "Draw one gate for each operator in the expression, using the standard symbols. Each wire joins an output to an input." },
        { key: "9(b)", label: "(b)", type: "table", marks: 3, topic: T10, syl: ["10.3"], ao: 2,
          prompt: "Complete the truth table for X = (A AND B) OR (NOT C).",
          headers: ["A", "B", "C", "X"],
          rows: [
            ["0", "0", "0", { a: "1" }], ["0", "0", "1", { a: "0" }], ["0", "1", "0", { a: "1" }], ["0", "1", "1", { a: "0" }],
            ["1", "0", "0", { a: "1" }], ["1", "0", "1", { a: "0" }], ["1", "1", "0", { a: "1" }], ["1", "1", "1", { a: "1" }]
          ],
          groups: [
            { text: "Rows 1 to 3 correct: 1, 0, 1", marks: 1, cells: [[0,3],[1,3],[2,3]] },
            { text: "Rows 4 to 6 correct: 0, 1, 0", marks: 1, cells: [[3,3],[4,3],[5,3]] },
            { text: "Rows 7 and 8 correct: 1, 1", marks: 1, cells: [[6,3],[7,3]] }
          ],
          note: "Work out (A AND B) and NOT C for each row, then OR them. X is 1 when A and B are both 1, or when C is 0." },
        { key: "9(c)", label: "(c)", type: "text", marks: 3, topic: T10, syl: ["10.3"], ao: 2, figure: circuitQA,
          prompt: "Write the logic expression for this logic circuit.\nS = ",
          markPoints: [
            kw("The NOR part: P NOR Q // NOT (P OR Q)", 1, [["pnorq", "not(porq)", "not(p or q)", "(porq)'", "¬(p∨q)"], ["(pnorq)", "nor"]], 1, { tight: true }),
            kw("Combined with R using AND", 1, [["andr", "and r", "∧r", "&r", "r and", "randnot"]], 1),
            kw("Complete correct expression, e.g. S = (P NOR Q) AND R // S = NOT (P OR Q) AND R", 1, [["(pnorq)andr", "not(porq)andr", "rand(pnorq)", "randnot(porq)", "(not(porq))andr"]], 1, { tight: true })
          ],
          note: "The first gate is NOR (P, Q). Its output goes into an AND gate with R." }
      ] },

      /* ---------------- Q10 scenario ---------------- */
      { n: 10, title: "Scenario question", scenario: true, intro: "A theme park has 12 rides. After each day the park stores the name of each ride and the number of visitors it had in two one-dimensional (1D) arrays:\n\n• RideName[1:12] stores the names (STRING)\n• Visitors[1:12] stores the numbers of visitors (INTEGER)", parts: [
        { key: "10", label: "", type: "code", marks: 15, topic: T8, syl: ["7.4", "7.5", "7.9", "8.1", "8.2"], ao: 2, tall: true,
          prompt: "Write an algorithm that:\n• allows the name of each ride and the number of visitors it had to be input and stored in the arrays\n• checks that each number of visitors is a whole number from 0 to 2000 inclusive. If it is not, an error message is displayed and the number is input again\n• counts and outputs how many rides had more than 800 visitors\n• finds and outputs the name of the ride with the most visitors (you can assume that no two rides had the same number of visitors)\n• calculates and outputs the average number of visitors per ride, rounded to one decimal place.\n\nYou may write your answer in pseudocode or in program code (Python, Visual Basic or Java). You should spend about 30 minutes on this question.",
          markPoints: [
            kw("A count-controlled loop that repeats 12 times (index 1 to 12)", 1, [["for", "while", "repeat", "loop", "range"], ["12", "13"]], 2, { topic: T8 }),
            kw("Input of the ride name (with a prompt) and stored in RideName[index]", 1, [["input", "readline", "scanner", "input(", "readln", "nextline"], ["ridename"]], 2),
            kw("Input of the number of visitors (with a prompt)", 1, [["input", "readline", "scanner", "input(", "readln", "nextint", "int("], ["visitors"]], 2),
            kw("A second loop (WHILE / REPEAT UNTIL) that repeats the input until a valid number is entered", 1, [["while", "repeat", "until", "do"]], 1, { topic: T7 }),
            kw("A correct range check on 0 and 2000 with the correct logic (e.g. < 0 OR > 2000, or >= 0 AND <= 2000)", 1, [["<0", "<=-1", ">=0", ">-1", "≥0"], [">2000", "<=2000", "≥", "≤", "<2001", ">=2001"]], 2, { topic: T7, tight: true }),
            kw("An error message is displayed when the number is not valid", 1, [["error", "invalid", "not valid", "not allowed", "try again", "must be", "wrong", "output", "print", "display", "message"]], 1, { topic: T7 }),
            kw("The valid number is stored in Visitors[index]", 1, [["visitors["]], 1, { tight: true }),
            kw("Total (and the counter for rides over 800) set to 0 before the loop", 1, [["total=0", "total←0", "total:=0", "total=0;"], ["count=0", "count←0", "popular=0", "popular←0", "over=0", "over←0", "busy=0", "busy←0", "rides=0", "rides←0", "n=0", "counter=0", "counter←0"]], 2, { tight: true }),
            kw("The visitors are added to the total inside the loop", 1, [["total+visitors", "total=total+", "total←total+", "total+=", "total:=total+"]], 1, { tight: true }),
            kw("A selection that tests for more than 800 visitors and adds 1 to the counter", 1, [[">800"], ["+1", "+=1", "++"]], 2, { tight: true }),
            kw("The count is output after the loop (outside the loop)", 1, [["output", "print", "display", "write", "console", "system.out", "msgbox"]], 1),
            kw("A variable to hold the highest number of visitors (or its index) is initialised", 1, [["max", "highest", "most", "busiest", "best", "top", "largest", "biggest"]], 1),
            kw("A selection that compares each number of visitors with the highest so far and updates the highest value / index", 1, [["if"], [">max", ">highest", ">most", ">busiest", ">best", ">top", ">largest", ">biggest", ">visitors[", ">v"]], 2, { tight: true }),
            kw("The name of the ride with the most visitors is output (using the stored index or name)", 1, [["ridename["]], 1, { tight: true }),
            kw("The average is calculated (Total / 12), rounded to 1 decimal place, and output", 1, [["round", "format", "%.1f", "1f", "decimal"], ["/12", "/ 12", "÷12", "/len", "/numberofrides"]], 2, { tight: true })
          ],
          model: lines(`
01 DECLARE RideName : ARRAY[1:12] OF STRING
02 DECLARE Visitors : ARRAY[1:12] OF INTEGER
03 Total ← 0
04 Popular ← 0
05 Busiest ← 1
06 FOR Index ← 1 TO 12
07     OUTPUT "Enter the name of the ride"
08     INPUT RideName[Index]
09     REPEAT
10         OUTPUT "Enter the number of visitors"
11         INPUT Visitors[Index]
12         IF Visitors[Index] < 0 OR Visitors[Index] > 2000 THEN
13             OUTPUT "Error. Enter a number from 0 to 2000"
14         ENDIF
15     UNTIL Visitors[Index] >= 0 AND Visitors[Index] <= 2000
16     Total ← Total + Visitors[Index]
17     IF Visitors[Index] > 800 THEN
18         Popular ← Popular + 1
19     ENDIF
20     IF Visitors[Index] > Visitors[Busiest] THEN
21         Busiest ← Index
22     ENDIF
23 NEXT Index
24 OUTPUT "Rides with more than 800 visitors: ", Popular
25 OUTPUT "Busiest ride: ", RideName[Busiest]
26 OUTPUT "Average visitors: ", ROUND(Total / 12, 1)`),
          note: "Any correct algorithm earns full marks, whether it is written in pseudocode, Python, Visual Basic or Java. Marks are for the method, not for exact syntax. A whole-number (type) check would be an extra, but the question only asks for 0 to 2000." }
      ] }
    ]
  };

  root.PAPER2 = { A: A };
})(window);
