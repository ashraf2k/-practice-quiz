/* Paper 2, second mock paper (0478 Algorithms, Programming and Logic): 75 marks = nine structured questions (60)
   plus the 15-mark scenario question. Different contexts and question styles from paper A, same layout and
   the same coverage of syllabus topics 7-10. Adds itself to window.PAPER2 (see paper2-data.js for part types). */
(function(root){
  "use strict";
  var F = root.P2Fig;
  function kw(text, marks, groups, need, opts){
    var m = { type: "keywords", groups: groups, needCount: need || 1 };
    if(opts && opts.tight) m.tight = true;
    return { text: text, marks: marks, match: m, topic: opts && opts.topic };
  }
  function manual(text, marks, opts){ return { text: text, marks: marks, match: null, topic: opts && opts.topic }; }
  function lines(code){ return code.replace(/^\n/, "").replace(/\n$/, ""); }
  var T7 = "7", T8 = "8", T9 = "9", T10 = "10";

  // ---- figures ----
  var flowModelB = F.svg(560, 370,
    F.term(280, 24, 90, 34, "Start") +
    F.line([[280, 41], [280, 62]], true) +
    F.io(280, 82, 170, 36, "INPUT Mark") +
    F.line([[280, 100], [280, 124]], true) +
    F.dec(280, 165, 190, 80, "Mark >= 50 ?") +
    F.line([[375, 165], [450, 165], [450, 212]], true) + F.text(412, 156, "Yes") +
    F.line([[185, 165], [110, 165], [110, 212]], true) + F.text(148, 156, "No") +
    F.io(450, 232, 170, 36, 'OUTPUT "Pass"') +
    F.io(110, 232, 170, 36, 'OUTPUT "Fail"') +
    F.line([[450, 250], [450, 310], [325, 310]], true) +
    F.line([[110, 250], [110, 310], [235, 310]], true) +
    F.term(280, 310, 90, 34, "Stop"),
    "Model flowchart");

  var circuitQB = (function(){
    var s = "";
    s += F.text(14, 60, "A", "middle") + F.text(14, 80, "B", "middle") + F.text(14, 130, "C", "middle");
    s += F.line([[26, 55], [130, 55]]) + F.line([[26, 75], [130, 75]]) + F.line([[28, 125], [250, 125], [250, 105], [280, 105]]);
    s += F.gate("XOR", 130, 40) + F.gate("NAND", 280, 70);
    s += F.line([[208, 65], [240, 65], [240, 85], [280, 85]]);
    s += F.line([[358, 95], [420, 95]]) + F.text(434, 100, "Z", "start", 16, true);
    return F.svg(470, 165, s, "Logic circuit with inputs A, B and C and output Z");
  })();

  var circuitModelB = (function(){
    var s = "";
    s += F.text(14, 60, "A", "middle") + F.text(14, 90, "B", "middle") + F.text(14, 110, "C", "middle");
    s += F.line([[26, 55], [280, 55]]) + F.line([[26, 85], [130, 85]]) + F.line([[26, 105], [130, 105]]);
    s += F.gate("OR", 130, 70) + F.gate("AND", 280, 40);
    s += F.line([[208, 95], [245, 95], [245, 75], [280, 75]]);
    s += F.line([[358, 65], [420, 65]]) + F.text(434, 70, "S", "start", 16, true);
    return F.svg(470, 150, s, "Model logic circuit for S = A AND (B OR C)");
  })();

  function tbl(head, rows){
    return '<table class="p2-data"><tr>' + head.map(function(h){ return "<th>" + h + "</th>"; }).join("") + "</tr>" +
      rows.map(function(r){ return "<tr>" + r.map(function(c){ return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
  }
  var gridTable = tbl(["Grid", "Column 1", "Column 2", "Column 3", "Column 4"], [["Row 1", "4", "8", "2", "6"], ["Row 2", "7", "1", "9", "3"], ["Row 3", "5", "0", "6", "2"]]);
  var productTable = tbl(["ProductID", "Name", "Category", "Price", "Stock"], [
    ["P01", "Apple Juice", "Drinks", "1.50", "40"], ["P02", "Banana", "Fruit", "0.30", "120"], ["P03", "Orange Juice", "Drinks", "1.80", "25"],
    ["P04", "Mango", "Fruit", "1.20", "15"], ["P05", "Bread", "Bakery", "2.10", "30"], ["P06", "Grapes", "Fruit", "2.50", "18"],
    ["P07", "Cola", "Drinks", "1.00", "60"], ["P08", "Cookies", "Bakery", "1.75", "0"]]);

  var B = {
    id: "B",
    title: "Practice paper 2 · different contexts",
    blurb: "A second full paper with new contexts: drawing a flowchart, choosing validation checks and a check digit, tracing a loop with MOD, CASE and loops, string handling, local and global variables, 2D arrays and functions, writing to a file, a shop database with SUM, XOR and NAND gates, and a 15-mark scenario with validation, maximum, minimum and a search.",
    questions: [
      /* ---------------- Q1 ---------------- */
      { n: 1, title: "Program development and flowcharts", intro: "A teacher is developing a program that tells students whether they passed a test.", parts: [
        { key: "1(a)", label: "(a)", type: "choice", marks: 2, topic: T7, syl: ["7.1"], ao: 1,
          prompt: "Choose the stage of the program development life cycle in which each task is done.",
          items: [
            { label: "The teacher is interviewed to find out what the program must do", options: ["Analysis", "Design", "Coding", "Testing"], answer: "Analysis" },
            { label: "The algorithm is written in a programming language", options: ["Analysis", "Design", "Coding", "Testing"], answer: "Coding" }
          ],
          note: "Analysis finds out the requirements. The design stage plans the solution. Coding turns the design into program code." },
        { key: "1(b)", label: "(b)", type: "draw", kind: "flow", marks: 4, topic: T7, syl: ["7.7"], ao: 2,
          prompt: "The program inputs a test mark. If the mark is 50 or more it outputs Pass, otherwise it outputs Fail.\n\nDraw a flowchart for this algorithm. Use the correct flowchart symbols.",
          model: flowModelB,
          markPoints: [
            manual("Start and Stop terminator symbols, with flow lines in the correct direction", 1),
            manual("An input symbol for the mark (INPUT Mark)", 1),
            manual("A decision diamond testing Mark >= 50 (or Mark > 49) with the two exits labelled Yes and No", 1),
            manual("The two output symbols, Pass on the Yes path and Fail on the No path, both leading to Stop", 1)
          ],
          note: "Terminator = rounded box, input/output = parallelogram, process = rectangle, decision = diamond. A decision has two labelled exits." }
      ] },

      /* ---------------- Q2 ---------------- */
      { n: 2, title: "Validation and check digits", intro: "An online shop uses a form to collect customer details.", parts: [
        { key: "2(a)", label: "(a)", type: "choice", marks: 3, topic: T7, syl: ["7.5"], ao: 2,
          prompt: "Choose the most suitable validation check for each input.",
          items: [
            { label: "The quantity ordered must be from 1 to 20", options: ["Range check", "Length check", "Type check", "Presence check", "Format check"], answer: "Range check" },
            { label: "The password must contain at least 8 characters", options: ["Range check", "Length check", "Type check", "Presence check", "Format check"], answer: "Length check" },
            { label: "The surname must not be left empty", options: ["Range check", "Length check", "Type check", "Presence check", "Format check"], answer: "Presence check" }
          ],
          note: "A range check tests numbers between limits, a length check tests the number of characters, and a presence check makes sure data has been entered." },
        { key: "2(b)", label: "(b)", type: "text", marks: 2, topic: T7, syl: ["7.5"], ao: 1,
          prompt: "Describe how a check digit is used to check that a number has been entered correctly.",
          markPoints: [
            kw("The check digit is calculated from the other digits (using a formula) and is added to the end of the number", 1, [["calculated", "formula", "algorithm", "worked out", "added to the end", "last digit", "extra digit"]]),
            kw("When the number is entered the calculation is done again and the result is compared with the check digit; if they do not match the number is rejected / there is an error", 1, [["again", "recalculated", "repeated", "compare", "match", "same", "different", "reject", "error"]])
          ],
          note: "A check digit detects errors such as mistyped or swapped digits, for example in a barcode or ISBN." },
        { key: "2(c)", label: "(c)", type: "text", marks: 1, topic: T7, syl: ["7.5"], ao: 2,
          prompt: "A customer enters their quantity as 15 when they meant 5. Explain why the range check does not find this error.",
          markPoints: [ kw("15 is inside the allowed range (1 to 20) so it is accepted // validation only checks data is reasonable, not that it is correct", 1, [["within", "inside", "in the range", "between 1 and 20", "valid", "reasonable", "accepted", "allowed", "not correct", "sensible", "still"]]) ],
          note: "Validation checks that data is reasonable. It cannot tell whether the data is the one the user intended." }
      ] },

      /* ---------------- Q3 ---------------- */
      { n: 3, title: "Trace tables", intro: "This algorithm reads in five whole numbers.",
        code: lines(`
01 Total ← 0
02 FOR Index ← 1 TO 5
03     INPUT Number
04     IF Number MOD 2 = 0 THEN
05         Total ← Total + Number
06     ELSE
07         Total ← Total - 1
08     ENDIF
09 NEXT Index
10 OUTPUT Total`),
        parts: [
        { key: "3(a)", label: "(a)", type: "table", marks: 4, topic: T7, syl: ["7.7"], ao: 2,
          prompt: "The numbers 4, 7, 10, 3 and 6 are input in this order.\nComplete the trace table.",
          headers: ["Index", "Number", "Total", "OUTPUT"],
          rows: [
            [{ a: "" }, { a: "" }, { a: "0" }, { a: "" }],
            [{ a: "1" }, { a: "4" }, { a: "4" }, { a: "" }],
            [{ a: "2" }, { a: "7" }, { a: "3" }, { a: "" }],
            [{ a: "3" }, { a: "10" }, { a: "13" }, { a: "" }],
            [{ a: "4" }, { a: "3" }, { a: "12" }, { a: "" }],
            [{ a: "5" }, { a: "6" }, { a: "18" }, { a: "18", alt: [""] }]
          ],
          groups: [
            { text: "Index column: 1, 2, 3, 4, 5", marks: 1, cells: [[1,0],[2,0],[3,0],[4,0],[5,0]] },
            { text: "Number column: 4, 7, 10, 3, 6", marks: 1, cells: [[1,1],[2,1],[3,1],[4,1],[5,1]] },
            { text: "Total column: 0, 4, 3, 13, 12, 18", marks: 1, cells: [[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]] },
            { text: "OUTPUT: 18 (in the last row)", marks: 1, cells: [[5,3]] }
          ],
          note: "An even number is added to Total. For an odd number, 1 is subtracted from Total. The output is written once, after the loop ends." },
        { key: "3(b)", label: "(b)", type: "text", marks: 2, topic: T7, syl: ["7.3"], ao: 2,
          prompt: "Describe what the algorithm does with each number that is input.",
          markPoints: [
            kw("If the number is even (divisible by 2) it is added to the total", 1, [["even"], ["add", "total", "plus", "sum"]], 2),
            kw("If the number is odd 1 is subtracted from the total (otherwise)", 1, [["odd", "else", "otherwise", "not even"], ["subtract", "minus", "take away", "decrease", "reduce", "-1", "- 1", "less 1", "takes 1", "take 1", "removes 1", "remove 1"]], 2)
          ],
          note: "Number MOD 2 = 0 tests whether the number is even, because even numbers leave no remainder when divided by 2." },
        { key: "3(c)", label: "(c)", type: "fields", marks: 1, topic: T7, syl: ["7.7"], ao: 2,
          prompt: "The numbers 2, 2, 2, 2 and 2 are input.\nState the value that is output.",
          items: [ { label: "Value output", answer: "10", check: function(v){ return /^\s*10\s*$/.test(v); } } ],
          note: "All five numbers are even, so 2 is added five times: 2 × 5 = 10." }
      ] },

      /* ---------------- Q4 ---------------- */
      { n: 4, title: "Selection and iteration", intro: "Programs use selection and iteration statements.", parts: [
        { key: "4(a)", label: "(a)", type: "choice", marks: 3, topic: T8, syl: ["8.1.3"], ao: 1,
          prompt: "Choose the most suitable statement for each task.",
          items: [
            { label: "Repeat a set of statements exactly 10 times", options: ["FOR ... NEXT", "WHILE ... ENDWHILE", "REPEAT ... UNTIL", "CASE OF"], answer: "FOR ... NEXT" },
            { label: "Keep asking for a password until the correct one is entered. The user must be asked at least once", options: ["FOR ... NEXT", "WHILE ... ENDWHILE", "REPEAT ... UNTIL", "CASE OF"], answer: "REPEAT ... UNTIL" },
            { label: "Choose between several different actions depending on a menu number", options: ["FOR ... NEXT", "WHILE ... ENDWHILE", "REPEAT ... UNTIL", "CASE OF"], answer: "CASE OF" }
          ],
          note: "A count-controlled loop is FOR. A post-condition loop (REPEAT UNTIL) always runs at least once. CASE chooses between many values of one variable." },
        { key: "4(b)", label: "(b)", type: "fill", marks: 3, topic: T8, syl: ["8.1.3"], ao: 2,
          prompt: "The program asks the user to choose 1 (Play) or 2 (Options). Complete the pseudocode by choosing the correct item for each gap.",
          code: lines(`
01 INPUT Choice
02 {1} Choice
03     1 : OUTPUT "Play"
04     2 : OUTPUT "Options"
05     {2} : OUTPUT "Invalid choice"
06 {3}`),
          gaps: [
            { options: ["CASE OF", "IF", "WHILE", "FOR"], answer: "CASE OF" },
            { options: ["OTHERWISE", "ELSE", "DEFAULT", "THEN"], answer: "OTHERWISE" },
            { options: ["ENDIF", "NEXT", "ENDCASE", "ENDWHILE"], answer: "ENDCASE" }
          ],
          note: "A CASE statement starts with CASE OF, the last branch uses OTHERWISE, and it is closed with ENDCASE." }
      ] },

      /* ---------------- Q5 ---------------- */
      { n: 5, title: "Strings, variables and maintainable code", intro: "A program stores the word Computer in the variable Word. The first character of a string is in position 1.", parts: [
        { key: "5(a)", label: "(a)", type: "fields", marks: 3, topic: T8, syl: ["8.1.2"], ao: 2, code: lines(`
01 Word ← "Computer"
02 OUTPUT LENGTH(Word)
03 OUTPUT SUBSTRING(Word, 1, 3)
04 OUTPUT UCASE(SUBSTRING(Word, 4, 3))`),
          prompt: "State the value that is output by each of these statements.",
          items: [
            { label: "Line 02 outputs", answer: "8", check: function(v){ return /^\s*8\s*$/.test(v); } },
            { label: "Line 03 outputs", answer: "Com", check: function(v){ return /^\s*["']?Com["']?\s*$/.test(v); } },
            { label: "Line 04 outputs", answer: "PUT", check: function(v){ return /^\s*["']?PUT["']?\s*$/.test(v); } }
          ],
          note: "LENGTH counts the characters (8). SUBSTRING(Word, 1, 3) takes 3 characters starting at position 1 (Com). SUBSTRING(Word, 4, 3) is put, and UCASE changes it to PUT." },
        { key: "5(b)", label: "(b)", type: "text", marks: 2, topic: T8, syl: ["8.1.6"], ao: 1,
          prompt: "Describe the difference between a local variable and a global variable.",
          markPoints: [
            kw("A local variable can only be used / seen inside the procedure or function where it is declared", 1, [["local"], ["only", "inside", "within", "in the procedure", "in the function", "that sub", "one"]], 2),
            kw("A global variable can be used / accessed anywhere in the program (all procedures and functions)", 1, [["global"], ["anywhere", "whole program", "all", "every", "throughout", "any part", "entire"]], 2)
          ],
          note: "Local variables exist only inside the sub-program that declares them. Global variables are available throughout the program." },
        { key: "5(c)", label: "(c)", type: "text", marks: 2, topic: T8, syl: ["8.1.8"], ao: 1,
          prompt: "State two ways a programmer can make a program easier to maintain.",
          markPoints: [
            kw("Use meaningful / descriptive identifier names", 1, [["meaningful", "descriptive", "sensible names", "appropriate names", "suitable names", "identifier", "variable names", "clear names"]]),
            kw("Add comments // use procedures and functions // use indentation // use constants // use white space", 1, [["comment", "procedure", "function", "indent", "constant", "white space", "whitespace", "sub-program", "subprogram", "modular", "layout"]])
          ],
          note: "Maintainable code uses meaningful names, comments, indentation, constants and sub-programs so other programmers can understand and change it." }
      ] },

      /* ---------------- Q6 ---------------- */
      { n: 6, title: "Two-dimensional arrays and functions", intro: "A 2D array called Grid has 3 rows and 4 columns. It stores whole numbers.", figure: gridTable, parts: [
        { key: "6(a)", label: "(a)", type: "fill", marks: 3, topic: T8, syl: ["8.2.2"], ao: 2,
          prompt: "Complete the pseudocode that adds together all the values in Grid. Choose the correct item for each gap.",
          code: lines(`
01 Total ← 0
02 FOR Row ← 1 TO {1}
03     FOR Column ← 1 TO {2}
04         Total ← Total + Grid[{3}]
05     NEXT Column
06 NEXT Row
07 OUTPUT Total`),
          gaps: [
            { options: ["3", "4", "12", "Grid"], answer: "3" },
            { options: ["3", "4", "12", "Row"], answer: "4" },
            { options: ["Column, Row", "Row, Column", "Row", "Total"], answer: "Row, Column" }
          ],
          note: "There are 3 rows (outer loop) and 4 columns (inner loop). The row index is written first: Grid[Row, Column]." },
        { key: "6(b)", label: "(b)", type: "fields", marks: 1, topic: T8, syl: ["8.2.2"], ao: 2,
          prompt: "State the value that is output when the pseudocode in part (a) is run on the data in the table.",
          items: [ { label: "Value output", answer: "53", check: function(v){ return /^\s*53\s*$/.test(v); } } ],
          note: "Row 1 = 20, row 2 = 20, row 3 = 13, so the total is 53." },
        { key: "6(c)", label: "(c)", type: "code", marks: 3, topic: T8, syl: ["8.1.6"], ao: 2,
          prompt: "Write a function called IsEven that takes a whole number as a parameter. The function returns TRUE if the number is even and FALSE if it is odd.",
          markPoints: [
            kw("Correct function header: FUNCTION IsEven(Number : INTEGER) RETURNS BOOLEAN", 1, [["functioniseven("], ["integer"], ["returnsboolean"]], 3, { tight: true }),
            kw("A correct test using MOD 2 (MOD 2 = 0 or MOD 2 = 1 / <> 0)", 1, [["mod2"]], 1, { tight: true }),
            kw("Returns TRUE and FALSE correctly (RETURN TRUE / RETURN FALSE or RETURN of the comparison) and ends with ENDFUNCTION", 1, [["return"], ["endfunction"]], 2)
          ],
          note: "FUNCTION IsEven(Number : INTEGER) RETURNS BOOLEAN\n    RETURN Number MOD 2 = 0\nENDFUNCTION" }
      ] },

      /* ---------------- Q7 ---------------- */
      { n: 7, title: "Writing to a file", intro: "A program stores five names, held in the 1D array Name, in the text file Names.txt.", parts: [
        { key: "7", label: "", type: "fill", marks: 4, topic: T8, syl: ["8.3"], ao: 2,
          prompt: "Complete the pseudocode by choosing the correct item for each gap.",
          code: lines(`
01 {1} "Names.txt" FOR WRITE
02 FOR Index ← 1 TO {2}
03     {3} "Names.txt", Name[Index]
04 NEXT Index
05 {4} "Names.txt"
06 OUTPUT "Saved"`),
          gaps: [
            { options: ["OPENFILE", "READFILE", "WRITEFILE", "CLOSEFILE"], answer: "OPENFILE" },
            { options: ["4", "5", "6", "Name"], answer: "5" },
            { options: ["INPUT", "OUTPUT", "READFILE", "WRITEFILE"], answer: "WRITEFILE" },
            { options: ["ENDFILE", "STOPFILE", "CLOSEFILE", "SAVEFILE"], answer: "CLOSEFILE" }
          ],
          note: "The file is opened for writing, each name is written with WRITEFILE and the file is closed at the end." }
      ] },

      /* ---------------- Q8 ---------------- */
      { n: 8, title: "Databases and SQL", intro: "A shop stores details of its products in a database table called Product.", figure: productTable, parts: [
        { key: "8(a)", label: "(a)", type: "choice", marks: 1, topic: T9, syl: ["9.2"], ao: 1,
          prompt: "Choose the most suitable data type for the Price field.",
          items: [ { label: "Price", options: ["Boolean", "Character", "Date/time", "Integer", "Real", "Text / alphanumeric"], answer: "Real" } ],
          note: "Prices such as 1.50 have a fractional part, so the data type is real." },
        { key: "8(b)", label: "(b)", type: "fields", marks: 1, topic: T9, syl: ["9.3"], ao: 1,
          prompt: "Identify the field that should be used as the primary key.",
          items: [ { label: "Primary key field", answer: "ProductID", check: function(v){ return /^\s*product\s*id\s*$/i.test(v); } } ],
          note: "ProductID is different for every product. Names, categories, prices and stock levels can repeat." },
        { key: "8(c)", label: "(c)", type: "table", marks: 2, topic: T9, syl: ["9.4"], ao: 2,
          prompt: "This SQL statement is run on the Product table.\nWrite the output in the table below.",
          code: 'SELECT Name, Price\nFROM Product\nWHERE Category = "Fruit" AND Price > 1.00\nORDER BY Price ASC;',
          headers: ["Name", "Price"],
          rows: [ [{ a: "Mango", re: "^\\s*mango\\s*$" }, { a: "1.20" }], [{ a: "Grapes", re: "^\\s*grapes\\s*$" }, { a: "2.50" }], [{ a: "" }, { a: "" }] ],
          groups: [
            { text: "First row: Mango, 1.20 (lowest price first)", marks: 1, cells: [[0,0],[0,1]] },
            { text: "Second row: Grapes, 2.50 and no further rows", marks: 1, cells: [[1,0],[1,1],[2,0],[2,1]] }
          ],
          note: "The fruit are Banana (0.30), Mango (1.20) and Grapes (2.50). Only those over 1.00 remain, in ascending order of price." },
        { key: "8(d)", label: "(d)", type: "code", marks: 2, topic: T9, syl: ["9.4"], ao: 2,
          prompt: "Write an SQL statement to display the Name and Stock of every product in the Drinks category.",
          markPoints: [
            kw("SELECT Name, Stock", 1, [["selectname,stock"]], 1, { tight: true }),
            kw("FROM Product WHERE Category = \"Drinks\"", 1, [["fromproductwherecategory=\"drinks\"", "fromproductwherecategory='drinks'"]], 1, { tight: true })
          ],
          note: 'SELECT Name, Stock FROM Product WHERE Category = "Drinks";' },
        { key: "8(e)", label: "(e)", type: "code", marks: 2, topic: T9, syl: ["9.4"], ao: 2,
          prompt: "Write an SQL statement to find the total number of items in stock for the Fruit category.",
          markPoints: [
            kw("SELECT SUM(Stock)", 1, [["selectsum(stock)"]], 1, { tight: true }),
            kw("FROM Product WHERE Category = \"Fruit\"", 1, [["fromproductwherecategory=\"fruit\"", "fromproductwherecategory='fruit'"]], 1, { tight: true })
          ],
          note: 'SELECT SUM(Stock) FROM Product WHERE Category = "Fruit"; outputs 153.' }
      ] },

      /* ---------------- Q9 ---------------- */
      { n: 9, title: "Logic gates and truth tables", intro: "Logic circuits are built from logic gates.", parts: [
        { key: "9(a)", label: "(a)", type: "table", marks: 4, topic: T10, syl: ["10.1", "10.2"], ao: 2, figure: circuitQB,
          prompt: "Complete the truth table for this logic circuit.",
          headers: ["A", "B", "C", "Z"],
          rows: [
            ["0", "0", "0", { a: "1" }], ["0", "0", "1", { a: "1" }], ["0", "1", "0", { a: "1" }], ["0", "1", "1", { a: "0" }],
            ["1", "0", "0", { a: "1" }], ["1", "0", "1", { a: "0" }], ["1", "1", "0", { a: "1" }], ["1", "1", "1", { a: "1" }]
          ],
          groups: [
            { text: "Rows 1 and 2 correct: 1, 1", marks: 1, cells: [[0,3],[1,3]] },
            { text: "Rows 3 and 4 correct: 1, 0", marks: 1, cells: [[2,3],[3,3]] },
            { text: "Rows 5 and 6 correct: 1, 0", marks: 1, cells: [[4,3],[5,3]] },
            { text: "Rows 7 and 8 correct: 1, 1", marks: 1, cells: [[6,3],[7,3]] }
          ],
          note: "First work out A XOR B (1 when A and B are different). Then NAND it with C: the output is 0 only when both inputs are 1." },
        { key: "9(b)", label: "(b)", type: "draw", kind: "logic", marks: 3, topic: T10, syl: ["10.3"], ao: 2,
          prompt: "An alarm S sounds when the system is switched on (A = 1) and either the door sensor (B = 1) or the window sensor (C = 1) is triggered.\n\nDraw a logic circuit for S = A AND (B OR C). Use the standard symbols for logic gates and label the inputs A, B and C and the output S.",
          model: circuitModelB,
          markPoints: [
            manual("An OR gate with inputs B and C", 1),
            manual("An AND gate that takes input A and the output of the OR gate", 1),
            manual("Inputs A, B, C and output S are correctly labelled and the wires join correctly", 1)
          ],
          note: "Draw the OR gate first, because B OR C is in brackets. Its output becomes the second input of the AND gate." },
        { key: "9(c)", label: "(c)", type: "fields", marks: 2, topic: T10, syl: ["10.2"], ao: 1,
          prompt: "State the output of each gate for the inputs shown.",
          items: [
            { label: "A NOR gate with inputs 0 and 0", answer: "1", check: function(v){ return /^\s*1\s*$/.test(v); } },
            { label: "An XOR gate with inputs 1 and 1", answer: "0", check: function(v){ return /^\s*0\s*$/.test(v); } }
          ],
          note: "NOR gives 1 only when both inputs are 0. XOR gives 1 only when the inputs are different." }
      ] },

      /* ---------------- Q10 scenario ---------------- */
      { n: 10, title: "Scenario question", scenario: true, intro: "A teacher stores the results of a class test for 20 students in two one-dimensional (1D) arrays:\n\n• StudentName[1:20] stores the names (STRING)\n• Score[1:20] stores the scores out of 50 (INTEGER)", parts: [
        { key: "10", label: "", type: "code", marks: 15, topic: T8, syl: ["7.4", "7.5", "8.1", "8.2"], ao: 2, tall: true,
          prompt: "Write an algorithm that:\n• allows the name and the score of each of the 20 students to be input and stored in the arrays\n• checks that each score is a whole number from 0 to 50 inclusive. If it is not, an error message is displayed and the score is input again\n• outputs the name of every student who scored less than 20\n• finds and outputs the highest score and the lowest score\n• allows the name of a student to be input, then searches the array and outputs that student's score, or the message \"Not found\" if the name is not in the array. The search must ignore whether the name was typed in upper or lower case.\n\nYou may write your answer in pseudocode or in program code (Python, Visual Basic or Java). You should spend about 30 minutes on this question.",
          markPoints: [
            kw("A count-controlled loop that repeats 20 times (index 1 to 20)", 1, [["for", "while", "repeat", "loop", "range"], ["20", "21"]], 2, { topic: T8 }),
            kw("Input of the student's name (with a prompt) and stored in StudentName[index]", 1, [["input", "readline", "scanner", "input(", "readln", "nextline"], ["studentname"]], 2),
            kw("Input of the score and stored in Score[index]", 1, [["input", "readline", "scanner", "input(", "readln", "nextint", "int("], ["score["]], 2, { tight: true }),
            kw("A loop (WHILE / REPEAT UNTIL) that repeats the input of the score until a valid score is entered", 1, [["while", "repeat", "until", "do"]], 1, { topic: T7 }),
            kw("A correct range check on 0 and 50 (e.g. < 0 OR > 50, or >= 0 AND <= 50)", 1, [["<0", "<=-1", ">=0", ">-1", "≥0"], [">50", "<=50", "≥", "≤", "<51", ">=51"]], 2, { topic: T7, tight: true }),
            kw("An error message is displayed when the score is not valid", 1, [["error", "invalid", "not valid", "not allowed", "try again", "must be", "wrong", "output", "print", "display", "message"]], 1, { topic: T7 }),
            kw("A selection that tests for a score of less than 20", 1, [["<20", "<=19", "lessthan20"]], 1, { tight: true }),
            kw("The name of that student is output (StudentName[index])", 1, [["studentname["]], 1, { tight: true }),
            kw("Highest and lowest are initialised (to the first score, or to 0 / 50 or an extreme value)", 1, [["highest", "max", "high", "top", "largest", "biggest", "best"], ["lowest", "min", "low", "bottom", "smallest", "worst"]], 2),
            kw("Each score is compared with the highest so far and the highest is updated if it is bigger", 1, [["if"], [">highest", ">max", ">high", ">top", ">largest", ">biggest", ">best"]], 2, { tight: true }),
            kw("Each score is compared with the lowest so far and the lowest is updated if it is smaller", 1, [["if"], ["<lowest", "<min", "<low", "<bottom", "<smallest", "<worst"]], 2, { tight: true }),
            kw("The highest and the lowest score are output after the loop", 1, [["output", "print", "display", "write", "console", "system.out", "msgbox"], ["highest", "max", "high", "top", "largest", "biggest", "best"], ["lowest", "min", "low", "bottom", "smallest", "worst"]], 3),
            kw("The name to search for is input and the case is made the same (UCASE / LCASE / .upper() / .lower())", 1, [["ucase", "lcase", "upper", "lower", "touppercase", "tolowercase"]], 1, { topic: T7 }),
            kw("A loop through the array comparing the (case-changed) name with each stored name", 1, [["for", "while", "repeat", "loop"], ["studentname["]], 2, { topic: T7 }),
            kw("When found the score is output, and when not found the message \"Not found\" is output (found flag or stop the loop)", 1, [["not found", "notfound", "no match", "not in"], ["found", "flag", "break", "exit", "score["]], 2, { topic: T7 })
          ],
          model: lines(`
01 DECLARE StudentName : ARRAY[1:20] OF STRING
02 DECLARE Score : ARRAY[1:20] OF INTEGER
03 FOR Index ← 1 TO 20
04     OUTPUT "Enter the name of the student"
05     INPUT StudentName[Index]
06     REPEAT
07         OUTPUT "Enter the score out of 50"
08         INPUT Score[Index]
09         IF Score[Index] < 0 OR Score[Index] > 50 THEN
10             OUTPUT "Error. Enter a score from 0 to 50"
11         ENDIF
12     UNTIL Score[Index] >= 0 AND Score[Index] <= 50
13 NEXT Index
14 Highest ← Score[1]
15 Lowest ← Score[1]
16 FOR Index ← 1 TO 20
17     IF Score[Index] < 20 THEN
18         OUTPUT StudentName[Index]
19     ENDIF
20     IF Score[Index] > Highest THEN
21         Highest ← Score[Index]
22     ENDIF
23     IF Score[Index] < Lowest THEN
24         Lowest ← Score[Index]
25     ENDIF
26 NEXT Index
27 OUTPUT "Highest score: ", Highest
28 OUTPUT "Lowest score: ", Lowest
29 OUTPUT "Enter the name to search for"
30 INPUT SearchName
31 SearchName ← UCASE(SearchName)
32 Found ← FALSE
33 FOR Index ← 1 TO 20
34     IF UCASE(StudentName[Index]) = SearchName THEN
35         OUTPUT Score[Index]
36         Found ← TRUE
37     ENDIF
38 NEXT Index
39 IF Found = FALSE THEN
40     OUTPUT "Not found"
41 ENDIF`),
          note: "Any correct algorithm earns full marks, whether it is written in pseudocode, Python, Visual Basic or Java. Marks are for the method, not for exact syntax. The case of the name must be made the same on both sides of the comparison." }
      ] }
    ]
  };

  root.PAPER2 = root.PAPER2 || {};
  root.PAPER2.B = B;
})(window);
