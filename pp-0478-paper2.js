/* 10BR past-paper questions for iLearn topics 7 to 10 (Paper 2): Cambridge IGCSE Computer Science 0478/21,
   Paper 2 Algorithms, Programming and Logic, May/June 2026, and 0478/22, Paper 2, October/November 2025.
   Question wording and the mark-scheme text follow the published papers. Marks are suggested by keyword
   matching and the student checks them against the published scheme shown after the answer (self-marked:
   tick boxes). Laid out by pp-ui.js. Uses the helpers of pp-0478.js. */
(function(){
  var P = window.PPD, Q = P.Q, kw = P.kw, val = P.val;
  var C21 = P.ctx("Cambridge IGCSE Computer Science 0478/21 · Paper 2 · May/June 2026", "Cambridge IGCSE Computer Science 0478/21 Mark Scheme, May/June 2026 (Cambridge University Press & Assessment)");
  var C22 = P.ctx("Cambridge IGCSE Computer Science 0478/22 · Paper 2 · October/November 2025", "Cambridge IGCSE Computer Science 0478/22 Mark Scheme, October/November 2025 (Cambridge University Press & Assessment)");

  /* ---------- Topic 7: Algorithm design and problem-solving ---------- */
  var q7 = Q("PP2-7", "7", "Finding and correcting errors in an averaging algorithm",
    "An algorithm has been written in pseudocode for a user to repeatedly input positive whole numbers and store them in an array called Values[], until −1 is input or until the array is full. The algorithm should output the average of the numbers to 2 decimal places.\n\n" +
    "01  DECLARE Counter : INTEGER\n02  DECLARE Total : INTEGER\n03  DECLARE Average : INTEGER\n04  DECLARE Values : ARRAY[1:100] OF INTEGER\n" +
    "05  Counter ← 1\n06  Total ← 0\n07  OUTPUT \"Please enter a positive whole number or -1 \"\n08  INPUT Number\n" +
    "09  WHILE Number = -1 AND Counter <= 100 DO\n10      Values[Counter] ← Number\n11      Total ← Total + 1\n12      Counter ← Counter + 1\n" +
    "13      INPUT Number\n14  ENDWHILE\n15  Counter ← Counter - 1\n16  Average ← Counter / Total\n17  OUTPUT \"The average is \", ROUND(Average, 2)",
    [ { id: "a", label: "", text: "Identify the line numbers of four errors in the pseudocode and suggest a correction for each error.", marks: 4, lines: 10 } ],
    [ kw("One mark for each of: line 3 should declare Average as REAL; line 9 should continue WHILE Number is NOT -1; line 11 should total the Number input, not add 1; line 16 should divide Total by Counter", 4, "a",
        [["re:line\\s*3", "re:average\\s*:?\\s*real", "declare average"], ["re:line\\s*9", "re:<>\\s*-?1", "not\\s*-1", "not equal to -1", "number <> -1"], ["re:line\\s*11", "re:total\\s*(←|<-|=)?\\s*total\\s*\\+\\s*number", "total + number", "total + values"], ["re:line\\s*16", "re:average\\s*(←|<-|=)?\\s*total\\s*/\\s*counter", "total / counter", "total/counter"]], true) ],
    [ { q: "7", lead: "One mark for each line identified and correction given.", ans: ["Line 3 — should be DECLARE Average : REAL", "Line 9 — should be WHILE Number <> -1 AND Counter <= 100 DO", "Line 11 — should be Total ← Total + Number", "Line 16 — should be Average ← Total / Counter"], marks: "4",
        guide: ["Line 11 may also be corrected as Total ← Total + Values[Counter].", "Mark each correction independently of the others; a candidate does not need to find them in this order."] } ],
    "Average must be REAL because it can hold a decimal result (an INTEGER would be rounded). The loop must keep going WHILE the number entered is NOT -1 (the condition as written would never run, since it only loops while Number equals -1). The total must add the Number that was just input, not 1 each time (adding 1 each time would just count the numbers). Finally the average is the total divided by how many numbers were entered, i.e. Total / Counter — the line as written divides the wrong way round.",
    C21);
  P.paper("7", "Algorithm design and problem-solving", [q7], 2);

  /* ---------- Topic 8.1: Programming concepts (functions and parameters) ---------- */
  var q81 = Q("PP2-8.1", "11", "Defining and calling a function",
    "The function Power(FirstNumber, SecondNumber) returns the value of FirstNumber raised to the power of SecondNumber. FirstNumber and SecondNumber are both integers.",
    [ { id: "def", label: "", text: "Write the pseudocode to define the function Power.", marks: 4, lines: 6 },
      { id: "call", label: "", text: "Write the pseudocode statement to call the function with the variables A and B, storing the returned value in the variable Value.", marks: 1, lines: 2 } ],
    [ kw("One mark for each of: FUNCTION Power(...) with matching ENDFUNCTION and RETURNS a type; the parameters defined correctly; a correct calculation of the power; the calculated value is returned", 4, "def",
        [["function", "endfunction"], ["returns"], ["re:\\^", "re:for\\s+\\w+\\s*(←|<-|=)?\\s*1\\s+to", "multiply", "repeatedly multiply"], ["return"]], true),
      kw("One mark for a correct call: Value assigned the result of Power(A, B)", 1, "call", [["re:value\\s*(←|<-|=)\\s*power\\s*\\(\\s*a\\s*,\\s*b\\s*\\)", "power(a, b)", "power(a,b)"]]) ],
    [ { q: "11 (function definition)", lead: "One mark for each mark point", ans: ["Defining FUNCTION Power with ENDFUNCTION and RETURNS INTEGER/REAL", "Defining the parameters correctly", "Correct calculation (e.g. FirstNumber ^ SecondNumber, or a loop multiplying FirstNumber by itself SecondNumber times)", "Returning the calculated value"], marks: "4",
        guide: ["Example:", "FUNCTION Power(FirstNumber : INTEGER, SecondNumber : INTEGER) RETURNS INTEGER", "    RETURN FirstNumber ^ SecondNumber", "ENDFUNCTION"] },
      { q: "11 (function call)", ans: ["Value ← Power(A, B)"], marks: "1", guide: ["Mark the first answer given."] } ],
    "A function definition needs the FUNCTION keyword with the parameters in brackets, a matching ENDFUNCTION, a RETURNS clause stating the data type returned, and a RETURN statement that sends back the calculated value — here FirstNumber ^ SecondNumber (or a loop that multiplies FirstNumber by itself SecondNumber times). Calling it just assigns the result to a variable: Value ← Power(A, B).",
    C21);
  P.paper("8.1", "Programming concepts", [q81], 2);

  /* ---------- Topic 8.2: Arrays ---------- */
  var q82 = Q("PP2-8.2", "2", "Searching a 2D array of contacts",
    "This pseudocode algorithm is intended to input a first name from a user and search for it in a two-dimensional (2D) array. If the name is found, the algorithm outputs all the remaining details for that name. The algorithm then continues to let other names be searched for, until the user chooses to stop.\n\n" +
    "01  DECLARE Contacts : ARRAY[1:500, 1:4] OF REAL\n02  DECLARE Row : INTEGER\n03  DECLARE Column : INTEGER\n04  DECLARE Continue : BOOLEAN\n05  DECLARE Stop : BOOLEAN\n06  DECLARE FirstName : STRING\n" +
    "07  Continue ← TRUE\n08  Stop ← FALSE\n09  WHILE Continue\n10      Row ← 1\n11      OUTPUT \"Enter a first name \"\n12      OUTPUT FirstName\n13      REPEAT\n" +
    "14          IF Contacts[Row, 1] = FirstName\n15            THEN\n16               FOR Column ← 1 TO 4\n17                    OUTPUT Contacts[Row, 1]\n18               NEXT Column\n19               Stop ← TRUE\n20            ELSE\n21               Row ← Row + 1\n22          ENDIF\n" +
    "23      NEXT Stop OR Row > 500\n24      OUTPUT \"Search for another name? (Y or N)\"\n25      INPUT Answer\n26      IF Answer = 'N' OR Answer = 'n'\n27        THEN\n28           Continue ← TRUE\n29        ENDIF\n30  ENDWHILE",
    [ { id: "a", label: "(a)", text: "Identify the line numbers of five errors in the pseudocode and suggest a correction for each error.", marks: 5, lines: 12 },
      { id: "b1", label: "(b)(i)", text: "A procedure NewData allows data for new contacts to be entered and stored in the 2D array Contacts[]. A parameter, Number, passes in the number of new contacts to add. For each new contact, four pieces of data are entered and stored at the start of the array.\nComplete the pseudocode for PROCEDURE NewData.", marks: 4, lines: 7 },
      { id: "b2", label: "(b)(ii)", text: "Write the pseudocode to input the number of new contacts and call procedure NewData. A variable declaration is not required.", marks: 2, lines: 4 } ],
    [ kw("One mark per correction (max five) for: line 1 should declare Contacts as STRING, not REAL; line 12 should INPUT FirstName, not OUTPUT; line 17 should output Contacts[Row, Column], not Contacts[Row, 1]; line 23 should be UNTIL, not NEXT; Answer needs declaring as CHAR before line 25; line 28 should set Continue to FALSE, not TRUE",
        5, "a",
        [["re:line\\s*0?1\\b", "declare contacts", "string, not real", "should be string"], ["re:line\\s*12", "input firstname"], ["re:line\\s*17", "contacts[row, column]", "contacts[row,column]"], ["re:line\\s*23", "until"], ["re:line\\s*25", "re:line\\s*26", "declare answer", "answer : char"], ["re:line\\s*28", "continue ← false", "continue <- false"]], true),
      kw("One mark per mark point (max four): appropriate parameter in the PROCEDURE line; correct outer loop termination value using Number; correct array reference in the INPUT statement; correct termination of both loops", 4, "b1",
        [["re:newdata\\s*\\(\\s*number"], ["re:1\\s+to\\s+number", "to number"], ["re:input\\s+contacts\\s*\\[\\s*row\\s*,\\s*column"], ["next column", "next row"]], true),
      kw("One mark per mark point (max two): a correct input statement; a correct call to NewData", 2, "b2", [["re:input\\s+\\w+"], ["re:call\\s+newdata\\s*\\("]], true) ],
    [ { q: "2(a)", lead: "One mark per mark point, max five.", ans: ["Line 01 — DECLARE Contacts : ARRAY[1:500, 1:4] OF REAL should be DECLARE Contacts : ARRAY[1:500, 1:4] OF STRING", "Line 12 — OUTPUT FirstName should be INPUT FirstName", "Line 17 — OUTPUT Contacts[Row, 1] should be OUTPUT Contacts[Row, Column]", "Line 23 — NEXT Stop OR Row > 500 should be UNTIL Stop OR Row > 500", "Line 25/26 — the variable Answer is not declared; add DECLARE Answer : CHAR before line 25", "Line 28 — Continue ← TRUE should be Continue ← FALSE"], marks: "5" },
      { q: "2(b)(i)", lead: "One mark per mark point, max four.", ans: ["PROCEDURE NewData(Number : INTEGER)", "    FOR Row ← 1 TO Number", "        FOR Column ← 1 TO 4", "            INPUT Contacts[Row, Column]", "        NEXT Column", "    NEXT Row", "ENDPROCEDURE"], marks: "4" },
      { q: "2(b)(ii)", lead: "One mark per mark point, max two.", ans: ["INPUT MyNumber", "CALL NewData(MyNumber)"], marks: "2" } ],
    "(a) Names are text, so Contacts must be a STRING array; line 12 must INPUT the name the user types (OUTPUT would just print the empty variable back); the inner loop must output every column of the found row, Contacts[Row, Column], not always column 1; a REPEAT loop ends with UNTIL, not NEXT; Answer is used but never declared; and Continue must become FALSE to stop the outer WHILE loop, not stay TRUE. (b) The procedure takes the number of new contacts as a parameter, then uses nested FOR loops — the outer one from 1 to Number (one pass per new contact), the inner one from 1 to 4 (one pass per field) — to INPUT each value into Contacts[Row, Column]. Calling it just needs the number of new contacts input first, then CALL NewData(MyNumber).",
    C22);
  P.paper("8.2", "Arrays", [q82], 2);

  /* ---------- Topic 8.3: File handling ---------- */
  var q83 = Q("PP2-8.3", "5(c)", "Writing a value to a text file",
    "A computer system generates a new username for a user and stores it in the variable NewUsername.",
    [ { id: "c", label: "", text: "Write the pseudocode to store the value of NewUsername in a text file called “Username.txt”", marks: 3, lines: 5 } ],
    [ kw("One mark per mark point: correctly opening the file for writing; correctly writing NewUsername to the file; correctly closing the file", 3, "c",
        [["re:openfile.*username\\.txt", "openfile"], ["re:writefile.*username\\.txt", "writefile"], ["re:closefile.*username\\.txt", "closefile"]], true) ],
    [ { q: "5(c)", lead: "One mark for each mark point. If quotation marks or “Username.txt” are missing from the file name, penalise once and follow through.", ans: ["OPENFILE \"Username.txt\" FOR WRITE", "WRITEFILE \"Username.txt\", NewUsername", "CLOSEFILE \"Username.txt\""], marks: "3" } ],
    "A file must be opened before it can be written to — OPENFILE names the file and the mode (FOR WRITE) — then WRITEFILE sends the data to it, and CLOSEFILE releases the file once writing is finished.",
    C21);
  P.paper("8.3", "File handling", [q83], 2);

  /* ---------- Topic 9: Databases ---------- */
  var q9 = Q("PP2-9", "7", "Designing and querying the WATERFOWL database table",
    "A database table WATERFOWL stores some details of a range of birds found in the UK that live on or near water. The length and wingspan dimensions are in centimetres and the typical lifespan is in years.\n\n" +
    "Species              Family  Length  Wingspan  CoastalHabitat  Lifespan\n" +
    "Barnacle goose        Goose    63.5    130.0     FALSE           14\n" +
    "Bewick's swan         Swan    120.2    190.5     TRUE             8\n" +
    "Brent goose           Goose    58.0     94.3     TRUE            11\n" +
    "Canada goose          Goose    78.5    160.0     FALSE            6\n" +
    "Eider                 Duck     58.0     94.5     TRUE             8\n" +
    "Goldeneye             Duck     44.5     72.1     TRUE             6\n" +
    "Goosander             Duck     63.3     90.0     TRUE             7\n" +
    "Long-tailed duck      Duck     44.0     76.6     TRUE             5\n" +
    "Mallard               Duck     59.7     90.8     FALSE            3\n" +
    "Mute swan             Swan    150.0    220.2     FALSE           10\n" +
    "Pink-footed goose     Goose    69.6    150.0     TRUE             8\n" +
    "Pintail               Duck     60.0     88.6     TRUE             3\n" +
    "Smew                  Duck     41.5     62.1     FALSE            7\n" +
    "White-fronted goose   Goose    71.5    140.0     FALSE            6\n" +
    "Whooper swan          Swan    150.0    230.0     TRUE             9",
    [ { id: "a", label: "(a)", text: "State the purpose of a primary key in a database table.", marks: 1, lines: 2 },
      { id: "b", label: "(b)", text: "Complete the table below, giving one field from WATERFOWL that is most likely to use each data type. Each field must be different.\n\nBoolean: .....\nInteger: .....\nReal: .....\nText: .....", marks: 2, lines: 5 },
      { id: "c", label: "(c)", text: "Give the output produced by this SQL statement:\n\nSELECT Species, Length, Wingspan\nFROM WATERFOWL\nWHERE Family = \"Swan\"\nORDER BY Lifespan;", marks: 3, lines: 5 },
      { id: "d", label: "(d)", text: "Complete the SQL statement to list the species, family and lifespan of all waterfowl whose typical lifespan is at least 10 years, sorted in order of species.\n\nSELECT ...\nFROM ...\nWHERE ...", marks: 4, lines: 4 } ],
    [ kw("Used to uniquely identify (each record in) the table", 1, "a", [["uniquely identify", "unique identifier", "identify each record", "identify records"]]),
      kw("Two marks for all four fields correctly identified, one mark for two or three correct: Boolean → CoastalHabitat, Integer → Lifespan, Real → Length or Wingspan, Text → Species or Family", 2, "b",
        [["coastalhabitat"], ["lifespan"], ["length", "wingspan"], ["species", "family"]], true),
      kw("One mark per mark point (max three): correct data, correctly spelt; correct layout with three columns and no extra punctuation; correct order, both vertically (by Lifespan) and horizontally", 3, "c", [["bewick"], ["whooper"], ["mute"]], true),
      kw("One mark per correct line (max four): SELECT Species, Family, Lifespan; FROM WATERFOWL; WHERE Lifespan >= 10; ORDER BY Species", 4, "d", [["select"], ["from waterfowl"], ["re:lifespan\\s*>=\\s*10"], ["re:order\\s*by\\s*species"]], true) ],
    [ { q: "7(a)", ans: ["It is used to uniquely identify records"], marks: "1" },
      { q: "7(b)", lead: "Two marks for all four fields correctly identified, one mark for two or three correct.", ans: ["Boolean — CoastalHabitat", "Integer — Lifespan", "Real — Length // Wingspan", "Text — Species // Family"], marks: "2" },
      { q: "7(c)", lead: "One mark per mark point, max three.", ans: ["Correct data, spelt correctly", "Correct layout — three columns, no extra punctuation", "Correct order (vertical and horizontal)", "Correct output: Bewick's swan 120.2 190.5 / Whooper swan 150.0 230.0 / Mute swan 150.0 220.2"], marks: "3" },
      { q: "7(d)", lead: "One mark per correct line, max four.", ans: ["SELECT Species, Family, Lifespan", "FROM WATERFOWL", "WHERE Lifespan >= 10 ORDER BY Species;"], marks: "4" } ],
    "(a) A primary key guarantees every record can be told apart. (b) CoastalHabitat is TRUE/FALSE so Boolean; Lifespan is a whole number so Integer; Length/Wingspan have decimals so Real; Species/Family are words so Text. (c) The WHERE clause keeps only the three swans, and ORDER BY Lifespan sorts them 8, 9, 10: Bewick's swan, Whooper swan, Mute swan. (d) SELECT the three named columns, FROM the table, WHERE Lifespan is 10 or more, ORDER BY Species.",
    C22);
  P.paper("9", "Databases", [q9], 2);

  /* ---------- Topic 10: Boolean logic ---------- */
  var q10 = Q("PP2-10", "6", "A three-input logic expression",
    "Consider the logic expression:\n\nX = (J XOR NOT K) NAND NOT L",
    [ { id: "a", label: "(a)", text: "List, in the order a signal would pass through them, the logic gates needed to build a circuit for this expression (each gate has a maximum of two inputs). State the inputs to each gate.", marks: 4, lines: 6 },
      { id: "b", label: "(b)", text: "Complete the truth table for the expression. Give the eight values of X, in order, for JKL = 000, 001, 010, 011, 100, 101, 110, 111.", marks: 4, lines: 2 } ],
    [ kw("One mark for each correct gate with its correct input(s): a NOT gate on K; an XOR gate on J and (NOT K); a NOT gate on L; a NAND gate on (J XOR NOT K) and (NOT L)", 4, "a",
        [["not k", "not(k)"], ["xor"], ["not l", "not(l)"], ["nand"]], true),
      { text: "Four marks for all eight correct outputs (three for 6-7 correct, two for 4-5 correct, one for 2-3 correct): JKL = 000→0, 001→1, 010→1, 011→1, 100→1, 101→1, 110→0, 111→1",
        marks: 4, part: "b", match: { type: "value", values: ["0,1,1,1,1,1,0,1", "0 1 1 1 1 1 0 1", "01111101"] } } ],
    [ { q: "6(a)", lead: "One mark for each correct gate, with the correct input(s), in this order.", ans: ["A NOT gate with input K", "An XOR gate with inputs J and the output of the NOT gate (NOT K)", "A NOT gate with input L", "A NAND gate with inputs (J XOR NOT K) and (NOT L), giving X"], marks: "4" },
      { q: "6(b)", lead: "Four marks for all eight correct outputs; three for six or seven correct; two for four or five correct; one for two or three correct.", ans: ["J K L  X", "0 0 0  0", "0 0 1  1", "0 1 0  1", "0 1 1  1", "1 0 0  1", "1 0 1  1", "1 1 0  0", "1 1 1  1"], marks: "4" } ],
    "Build the expression from the inside out: NOT K and NOT L first, then J XOR (NOT K), and finally NAND that result with (NOT L). A NAND is only FALSE when both its inputs are TRUE, which only happens at JKL = 110 — so X is 0 only there, and 1 everywhere else.",
    C22);
  P.paper("10", "Boolean logic", [q10], 2);
})();
