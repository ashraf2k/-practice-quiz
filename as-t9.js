/* iLearn AS Level (11BR) -- Topic 9 Algorithm design and problem-solving: sample lessons built on real 9618 Paper 2 (May/June 2025, 9618/21) questions. */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx;
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function pre(s){ return "<pre class='ln-pre'>" + esc(s) + "</pre>"; }
  function tbl(heads, rows){
    return "<table class='ln-table'><tr>" + heads.map(function(h){ return "<th>" + h + "</th>"; }).join("") + "</tr>" +
      rows.map(function(r){ return "<tr>" + r.map(function(c){ return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
  }
  var ARR = "←";
  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat([

  { id:"9.1.2a", code:"9.1.2", title:"Decomposition: breaking a problem into modules",
    concept:
      "<p><b>Decomposition</b> means breaking a large <b>problem</b> (or system) into smaller <b>sub-problems</b>, and breaking those down again until each piece is small enough to solve and program on its own.</p>" +
      "<p>The pieces become <b>modules</b>: procedures and functions in the finished program.</p>" +
      "<h4>Why decompose?</h4>" +
      "<ul><li>It makes the problem <b>easier to understand</b>, because you work on one small part at a time.</li><li>Each module can be <b>written, tested and debugged separately</b>.</li><li>Different programmers can work on <b>different modules</b> at the same time.</li><li>A module can be <b>reused</b> in other programs.</li></ul>" +
      "<p><b>Decomposition</b> is not the same as <b>abstraction</b>: abstraction hides unnecessary detail; decomposition splits the problem into parts.</p>",
    example:
      "<p><b>Stock control system for a shop</b> (the scenario in the real question). The whole problem is split into sub-problems:</p>" +
      pre("Stock control\n ├─ Record new stock\n ├─ Record sales\n ├─ Monitor stock levels\n │    ├─ Check each item's level\n │    ├─ Compare with reorder level\n │    └─ Raise a reorder alert\n └─ Produce reports") +
      "<p>Each box becomes a procedure or function, such as <code>RecordSale()</code> or <code>CheckStockLevel()</code>.</p>" +
      "<p><b>Marking tip:</b> the examiner report says only a few answers referred to the <b>stock control scenario</b>, and the mark scheme caps an answer at <b>2 marks if there is no mention of stock control</b>. Always apply a definition to the scenario in the question: name modules such as 'monitor stock level', 'record new stock arrival' and 'record stock sales'.</p>",
    checks:[
      mc("What is decomposition?", "Breaking a problem down into smaller sub-problems", ["Hiding unnecessary details of a problem", "Repeating a set of instructions", "Finding errors in a program"], "Decomposition splits a problem into smaller parts; hiding detail is abstraction."),
      mc("What does each sub-problem usually become in the finished program?", "A module (procedure or function)", ["A variable", "A constant", "A comment"], "Sub-problems lead to the idea of a program made of modules."),
      mc("Which is a benefit of decomposition?", "Each module can be tested separately", ["The program has no errors", "The program needs less memory", "The program does not need an algorithm"], "Smaller modules are easier to test and debug."),
      mc("A game is decomposed into 'draw the screen', 'move the player' and 'keep the score'. Which term describes these parts?", "Modules", ["Variables", "Loops", "Arrays"], "Each part is a module."),
      tx("State two benefits of using decomposition when writing a large program. [2]", [["easier to understand","easier to manage","understand","simpler","manageable"],["test","debug","separately","teams","different programmers","reuse","reused","same time"]], 2, "The problem is easier to understand and manage, and each module can be tested and debugged separately, written by different programmers or reused."),
      { type:"pp", src:"9618/21 May/June 2025 · Question 1(c)", explain:"Decomposition breaks the problem (here stock control) into sub-problems, which become modules that are easier to test.",
        intro:"<p>A program is being developed to help the manager of a shop control the stock.</p>",
        parts:[{ label:"(c)", marks:3, kind:"text", lines:6, q:"<p>Decomposition has been used to design the program to help the shop manager control the stock.</p><p>Describe decomposition.</p>",
          points:[
            { t:"MP1 Breaking down a problem into sub problems", k:["break","breaking down","sub problem","sub task","subtask","smaller problem","smaller part","smaller task","smaller section","split","divide","divided","smaller pieces","smaller sub"] },
            { t:"MP2 In order to explain / understand the process / task of how a (stock control) can be managed in more detail", k:["in more detail","more detail",["understand","stock"],["explain","stock"],["easier to understand"],["easier to manage"],["manage","stock"],["stock","process"]] },
            { t:"MP3 Leading to the concept of the program designed as a series of modules / procedures / functions // or by example of different stock control modules", k:["module","procedure","function","subroutine","sub routine","record new stock","record sales","monitor stock","stock level","reorder","stock arrival","record stock"] },
            { t:"MP4 Makes the program easier to test / debug", k:["easier to test","easier to debug","test each","debug each","tested separately","tested individually","tested on their own","test them separately","testing","debug"] }
          ], max:3, caps:[{ unless:["stock"], max:2, why:"Maximum 2 marks if there is no mention of stock control." }],
          scheme:"<p>Decomposition involves:</p><ul><li><b>MP1</b> Breaking down a problem into sub problems</li><li><b>MP2</b> In order to explain / understand the process/task of how a (stock control) can be managed in more detail</li><li><b>MP3</b> Leading to the concept of the program designed as a series of modules / procedures / functions // or by example of different stock control modules</li><li><b>MP4</b> Makes the program easier to test / debug</li></ul><p>Max 3<br>Max 2 if no mention of stock control</p>",
          note:"The question gave the stock control scenario as a starting point but only a few answers referred to it. Candidates often had a vague idea that the term 'decomposition' involved breaking 'something' down into smaller parts but rarely conveyed the understanding that it was the problem or the required system which needed to be considered. Answers which described the need for modules to monitor stock level, record new stock arrival, record stock sales (or similar) were rarely seen." }] }
    ] },

  { id:"9.2.1a", code:"9.2.1", title:"Identifier tables: choosing names and data types",
    concept:
      "<p>An <b>identifier</b> is the name of a variable, constant or array. During design, programmers list them in an <b>identifier table</b>: the name, the data type and what it is used for.</p>" +
      "<h4>Good identifier names</h4>" +
      "<ul><li>The name tells you <b>what the value means</b>: <code>DateSold</code>, not <code>D</code> or <code>Date1</code>.</li><li>No spaces; start with a letter; usually written in CamelCase.</li><li>Not too long: a balance between meaningful and short.</li></ul>" +
      "<h4>Pseudocode data types</h4>" +
      tbl(["Data type", "Holds", "Example"], [["INTEGER", "whole numbers", "42"], ["REAL", "numbers with a decimal part", "12.67"], ["STRING", "text (zero or more characters)", "\"Fruit\""], ["CHAR", "a single character", "'A'"], ["BOOLEAN", "TRUE or FALSE", "TRUE"], ["DATE", "a date", "20/02/2025"]]) +
      "<p>Choose the type from the <b>example value</b>: a value in speech marks is STRING, a value that can only be TRUE or FALSE is BOOLEAN, a value written like a date is DATE, a decimal point means REAL.</p>",
    example:
      "<p><b>Worked example (identifier table for a school library):</b></p>" +
      tbl(["Example value", "Explanation", "Variable name", "Data type"], [["\"Dune\"", "title of a book", "BookTitle", "STRING"], ["14", "days a book is on loan", "LoanDays", "INTEGER"], ["0.75", "fine per day in dollars", "FinePerDay", "REAL"], ["FALSE", "is the book on loan", "IsOnLoan", "BOOLEAN"], ["05/10/2026", "date a book is due back", "DateDue", "DATE"]]) +
      "<p><b>Examiner report (June 2025):</b> most candidates chose the right data types, but some variable names were not appropriate. The identifier for the date an item was sold must say it is the date of the sale: <code>DateSold</code>. Weaker answers 'filled the column with more similar data items, or repeated a data type'.</p>",
    checks:[
      mc("Which data type should be used for the value 3.14?", "REAL", ["INTEGER", "STRING", "CHAR"], "A decimal point means REAL."),
      mc("Which data type should be used for the value \"Hello\"?", "STRING", ["CHAR", "BOOLEAN", "INTEGER"], "Text in double quotes is a STRING."),
      mc("Which is the best identifier name for a student's date of birth?", "DateOfBirth", ["D", "Date1", "Student Birth"], "A good name is meaningful, has no spaces and tells you what the value is."),
      mc("Which data type is best for a value that is only ever TRUE or FALSE?", "BOOLEAN", ["STRING", "INTEGER", "CHAR"], "BOOLEAN holds TRUE or FALSE."),
      { type:"pp", src:"9618/21 May/June 2025 · Question 1(a)", explain:"Choose a meaningful identifier name and the data type that matches the example value (STRING, DATE, REAL, BOOLEAN).",
        intro:"<p>A program is being developed to help the manager of a shop control the stock.</p>",
        parts:[{ label:"(a)", marks:4, kind:"table", per:"row", q:"<p>An identifier table has been used during the design stage.</p><p>Complete the identifier table:</p>",
          head:["Example value", "Explanation", "Variable name", "Data type"],
          rows:[
            [{ t:"\"Fruit\"" }, { t:"a category of stock that is sold in the shop" }, { in:["Category","StockCategory","ItemCategory","ProductCategory","CategoryName","StockType","ItemType","CategoryOfStock"], w:150 }, { in:["STRING"], w:100 }],
            [{ t:"20/02/2025" }, { t:"when an item was sold" }, { in:["DateSold","SaleDate","SoldDate","DateOfSale","ItemSoldDate","DateItemSold","SalesDate","DateSale"], w:150 }, { in:["DATE"], w:100 }],
            [{ t:"12.67" }, { t:"the cost of an item" }, { in:["ItemCost","Cost","Price","ItemPrice","CostOfItem","CostPrice","ItemCostPrice","PriceOfItem"], w:150 }, { in:["REAL"], w:100 }],
            [{ t:"TRUE" }, { t:"to indicate if an item is in stock" }, { in:["ItemInStock","InStock","IsInStock","InStockFlag","StockAvailable","ItemInStockFlag","Available","ItemAvailable"], w:150 }, { in:["BOOLEAN"], w:100 }]
          ],
          scheme:"<table><tr><th>Example value</th><th>Explanation</th><th>Variable name</th><th>Data type</th></tr><tr><td>\"Fruit\"</td><td>a category of stock that is sold in the shop</td><td>Category</td><td>STRING</td></tr><tr><td>20/02/2025</td><td>when an item was sold</td><td>DateSold</td><td>DATE</td></tr><tr><td>12.67</td><td>the cost of an item</td><td>(Item)Cost / Price</td><td>REAL</td></tr><tr><td>TRUE</td><td>to indicate if an item is in stock</td><td>(Item)InStock</td><td>BOOLEAN</td></tr></table><p>Mark as follows:<br>1 mark per row for each variable name and data type</p>",
          note:"Row 1 - Category although others were acceptable. Row 2 - The identifier must convey that this is the date on which the item was sold; so DateSold. Row 3 - the cost of the item: ItemCost. A very popular answer was Price which was considered an acceptable answer. Row 4 - ItemInStock or just InStock conveying the idea of only two possible values." }] }
    ] },

  { id:"9.2.2a", code:"9.2.2", title:"The three constructs: assignment, selection and iteration",
    concept:
      "<p>Every algorithm is built from three constructs:</p>" +
      tbl(["Construct", "What it does", "Pseudocode keywords"], [
        ["<b>Sequence / assignment</b>", "Statements run one after another; a value is stored in a variable", "<code>X " + ARR + " 5</code>, <code>INPUT Name</code>, <code>OUTPUT</code>"],
        ["<b>Selection</b>", "Chooses which statements to run, depending on a condition", "<code>IF ... THEN ... ELSE ... ENDIF</code>, <code>CASE OF ... ENDCASE</code>"],
        ["<b>Iteration</b> (repetition)", "Repeats statements", "<code>FOR ... NEXT</code>, <code>WHILE ... ENDWHILE</code>, <code>REPEAT ... UNTIL</code>"]]) +
      "<h4>Hidden constructs</h4>" +
      "<ul><li><code>INPUT Value</code> <b>assigns</b> a value to a variable, so it counts as assignment.</li><li>A loop or an IF often contains assignment statements inside it.</li><li>A <code>REPEAT ... UNTIL</code> loop, <code>WHILE</code> and <code>FOR</code> are all iteration; a <code>CASE</code> is selection.</li></ul>",
    example:
      "<p><b>Classify this extract:</b></p>" +
      pre("FOR Count " + ARR + " 1 TO 5\n   INPUT Mark\n   IF Mark >= 50 THEN\n      Passes " + ARR + " Passes + 1\n   ENDIF\nNEXT Count") +
      "<ul><li><code>FOR</code> ... <code>NEXT</code> is <b>iteration</b>.</li><li><code>INPUT Mark</code> and <code>Passes " + ARR + " Passes + 1</code> are <b>assignment</b>.</li><li><code>IF</code> ... <code>ENDIF</code> is <b>selection</b>.</li></ul>" +
      "<p>So this extract contains all three. In the past paper, an extract may need <b>more than one tick</b> in a row; each row earns its mark only if every tick in the row is right.</p>",
    checks:[
      mc("Which construct is <code>IF Age >= 18 THEN</code>?", "Selection", ["Iteration", "Assignment", "Sequence only"], "IF chooses what to do depending on a condition."),
      mc("Which keyword starts a post-condition loop?", "REPEAT", ["WHILE", "IF", "CASE"], "REPEAT ... UNTIL tests the condition after the loop body."),
      mc("<code>Total " + ARR + " Total + Price</code> is an example of...", "Assignment", ["Selection", "Iteration", "A constant"], "A value is stored in a variable."),
      mc("Which statement is an example of assignment as well as input?", "INPUT Name", ["OUTPUT Name", "ENDIF", "NEXT Count"], "INPUT stores the value typed in a variable."),
      { type:"pp", src:"9618/21 May/June 2025 · Question 1(b)", explain:"Assignment stores a value (including INPUT), selection is IF / CASE, iteration is WHILE / REPEAT / FOR; one row can need several ticks.",
        intro:"<p>A module <code>Sales()</code> is part of the stock control program.</p>",
        parts:[{ label:"(b)", marks:5, kind:"table", per:"row", q:"<p>The table contains pseudocode extracts from the module <code>Sales()</code>.</p><p>Each extract may include all or part of: assignment, selection, iteration (repetition).</p><p>Complete the table by placing one or more ticks (&#10003;) in each row.</p>",
          head:["Pseudocode extract", "Assignment", "Selection", "Iteration"],
          rows:[
            [{ t:"<code>Result " + ARR + " CalculateTotal()</code>" }, { tick:1 }, { tick:0 }, { tick:0 }],
            [{ t:"<code>WHILE IsClosed</code>" }, { tick:0 }, { tick:0 }, { tick:1 }],
            [{ t:"<code>REPEAT<br>&nbsp;&nbsp;INPUT Value<br>UNTIL Sales[4] &gt; Value</code>" }, { tick:1 }, { tick:0 }, { tick:1 }],
            [{ t:"<code>IF Sales[Current] &lt;= 150 THEN<br>&nbsp;&nbsp;Discount " + ARR + " TRUE<br>ENDIF</code>" }, { tick:1 }, { tick:1 }, { tick:0 }],
            [{ t:"<code>CASE OF Option</code>" }, { tick:0 }, { tick:1 }, { tick:0 }]
          ],
          scheme:"<table><tr><th>Pseudocode extract</th><th>Assignment</th><th>Selection</th><th>Iteration</th></tr><tr><td>Result " + ARR + " CalculateTotal()</td><td>&#10003;</td><td></td><td></td></tr><tr><td>WHILE IsClosed</td><td></td><td></td><td>&#10003;</td></tr><tr><td>REPEAT<br>&nbsp;&nbsp;INPUT Value<br>UNTIL Sales[4] &gt; Value</td><td>&#10003;</td><td></td><td>&#10003;</td></tr><tr><td>IF Sales[Current] &lt;= 150 THEN<br>&nbsp;&nbsp;Discount " + ARR + " TRUE<br>ENDIF</td><td>&#10003;</td><td>&#10003;</td><td></td></tr><tr><td>CASE OF Option</td><td></td><td>&#10003;</td><td></td></tr></table><p>Mark as follows:<br>One mark for each correct row</p>",
          note:"All candidates were able to score here, and the question proved a good discriminator. Scoring the full available five marks however was rarely seen. There was no apparent pattern which suggested a specific lack of understanding." }] }
    ] }

  ]);
})(typeof window !== "undefined" ? window : this);
