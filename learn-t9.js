/* iLearn topic 9: Databases (Cambridge IGCSE Computer Science 0478) */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx, fill = root.ILQ.fill;
  var DB = "hy7FwqJyE6c", SQ = "Gs8tTXPTo3E";
  var PLAYERS =
    "<table class='ln-table'><tr><th>ID</th><th>Name</th><th>Team</th><th>Points</th><th>Active</th></tr>" +
    "<tr><td>P1</td><td>Asha</td><td>Reds</td><td>42</td><td>TRUE</td></tr>" +
    "<tr><td>P2</td><td>Ben</td><td>Blues</td><td>35</td><td>FALSE</td></tr>" +
    "<tr><td>P3</td><td>Chen</td><td>Reds</td><td>51</td><td>TRUE</td></tr>" +
    "<tr><td>P4</td><td>Dina</td><td>Greens</td><td>35</td><td>TRUE</td></tr>" +
    "<tr><td>P5</td><td>Eli</td><td>Blues</td><td>60</td><td>TRUE</td></tr></table>";
  function sql(s){ return "<pre class='ln-pre'>" + s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;") + "</pre>"; }
  var LESSONS = [

  { id:"9.1a", code:"9.1", title:"Tables, fields and records",
    video:{ id:DB, start:31, label:"Video: what a database is (flat file)" },
    concept:
      "<p>A <b>database</b> is an organised collection of data. In this course you only work with a <b>single-table</b> database, also called a flat file.</p>" +
      "<ul><li>A <b>table</b> holds data about one type of thing (players, books, orders).</li><li>A <b>field</b> is one column: one piece of data about each item, e.g. <i>Name</i> or <i>Points</i>.</li><li>A <b>record</b> is one row: all the data about a single item, e.g. everything about one player.</li></ul>" +
      "<p>The field names are the column headings. Each record has a value for every field.</p>",
    example: PLAYERS +
      "<p>This table has <b>5 fields</b> (ID, Name, Team, Points, Active) and <b>5 records</b> (one per player). The record for Chen is the whole row <code>P3, Chen, Reds, 51, TRUE</code>.</p>",
    checks:[
      mc("In a database table, what is a record?", "All the data about one item in a row", ["A single column of the whole table","The name given to each field","A rule that checks the data entered"], "A record is one row. A field is one column."),
      mc("A table has the column headings Name, Age and Town, and 30 rows of data. How many fields does it have?", "3", ["30","33","1"], "Each column heading is a field, so there are 3 fields. The 30 rows are the records.")
    ] },

  { id:"9.1b", code:"9.1", title:"Validation in a database",
    concept:
      "<p>When defining a table you also decide how each field is <b>validated</b>, so that only sensible data can be entered. Validation checks that data is <b>reasonable</b>; it cannot prove it is correct.</p>" +
      "<ul><li><b>Presence check</b>: the field must not be left empty.</li><li><b>Range check</b>: the value must be between limits, e.g. Points from 0 to 100.</li><li><b>Length check</b>: the right number of characters, e.g. a 6-digit code.</li><li><b>Type check</b>: the right data type, e.g. only digits.</li><li><b>Format check</b>: the right pattern, e.g. <code>P</code> then a number.</li></ul>",
    example:
      "<p>For the Players table a designer could choose:</p><table class='ln-table'><tr><th>Field</th><th>Validation</th></tr><tr><td>ID</td><td>Presence check and format check (starts with P)</td></tr><tr><td>Points</td><td>Range check (0 to 100) and type check (integer)</td></tr></table><p>An entry of 250 points would be rejected, but 99 would be accepted even if the real score was 98.</p>",
    checks:[
      mc("A field called Age only accepts values from 11 to 18. Which validation check is this?", "Range check", ["Presence check","Format check","Length check"], "The value must lie between a lowest and highest limit."),
      mc("Why is validation used when data is entered into a database?", "To check data is reasonable", ["To prove the data is always correct","To encrypt the data in the table","To make the table take up less space"], "Validation only checks data is sensible. It cannot guarantee it is true.")
    ] },

  { id:"9.2", code:"9.2", title:"Database data types",
    video:{ id:DB, start:119, label:"Video: field data types" },
    concept:
      "<p>Each field has a <b>data type</b> that decides what it can hold. The six types in the syllabus are:</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Type</th><th>Holds</th><th>Example</th></tr>" +
      "<tr><td><b>Text / alphanumeric</b></td><td>Letters, digits and symbols</td><td>\"Hello\", \"2JK8D\"</td></tr>" +
      "<tr><td><b>Character</b></td><td>One letter, digit or symbol</td><td>\"B\"</td></tr>" +
      "<tr><td><b>Boolean</b></td><td>Only two values (True/False or Yes/No)</td><td>True</td></tr>" +
      "<tr><td><b>Integer</b></td><td>A whole number</td><td>42</td></tr>" +
      "<tr><td><b>Real</b></td><td>A number with a decimal part</td><td>9.99</td></tr>" +
      "<tr><td><b>Date/time</b></td><td>A date and/or a time</td><td>14/10/2026</td></tr></table>" +
      "<p>Numbers that are never calculated with (phone numbers, ID codes) are stored as <b>text</b>, so a leading zero is kept.</p>",
    example:
      "<table class='ln-table'><tr><th>Field</th><th>Sensible type</th><th>Why</th></tr><tr><td>Surname</td><td>Text</td><td>Letters</td></tr><tr><td>Grade (A, B, C)</td><td>Character</td><td>One character</td></tr><tr><td>Has paid?</td><td>Boolean</td><td>Yes or No</td></tr><tr><td>Number of items</td><td>Integer</td><td>Whole number</td></tr><tr><td>Price</td><td>Real</td><td>Has pence</td></tr><tr><td>Date of birth</td><td>Date/time</td><td>A date</td></tr></table>",
    checks:[
      mc("Which data type is most suitable for a field that stores whether a library book is on loan (Yes or No)?", "Boolean", ["Integer","Character","Real"], "A field with only two possible values is Boolean."),
      mc("Which data type is most suitable for the field Price, with values such as 4.50?", "Real", ["Integer","Boolean","Date/time"], "Prices contain a decimal part, so a real number is needed.")
    ] },

  { id:"9.3", code:"9.3", title:"Primary keys",
    video:{ id:DB, start:148, label:"Video: primary key" },
    concept:
      "<p>A <b>primary key</b> is a field whose value is <b>unique</b> for every record, so it identifies exactly one record. It can never be repeated or left empty.</p>" +
      "<p>To choose a primary key, ask: <i>could two records ever have the same value in this field?</i> If yes, it is not suitable.</p>" +
      "<ul><li>Names, teams and scores can repeat, so they are poor keys.</li><li>An <b>ID number</b> given to each record is a good key.</li></ul>",
    example: PLAYERS +
      "<p><b>Name</b> could repeat (two players called Chen). <b>Team</b> repeats (two Reds). <b>Points</b> repeats (35 appears twice). <b>ID</b> is different for every player, so <b>ID</b> is the best primary key.</p>",
    checks:[
      mc("What is the purpose of a primary key?", "To identify each record uniquely", ["To sort the records alphabetically","To check data is in range","To hold the largest value in the table"], "No two records share the same primary key value."),
      mc("A table stores Name, Team and Points for players. Points repeat, names can repeat. Which field is the best primary key if a PlayerID field is added?", "PlayerID", ["Name","Team","Points"], "Only an ID created for each record is guaranteed to be unique.")
    ] },

  { id:"9.4a", code:"9.4", title:"SQL: SELECT and FROM",
    video:{ id:SQ, start:61, label:"Video: SELECT and FROM" },
    concept:
      "<p><b>SQL</b> (structured query language) is used to ask questions of a database. A <b>query</b> chooses which fields (columns) to show.</p>" +
      sql("SELECT field1, field2\nFROM table") +
      "<ul><li><code>SELECT</code> lists the fields to display, separated by commas.</li><li><code>FROM</code> names the table.</li><li><code>SELECT *</code> shows every field.</li></ul>" +
      "<p>Without a WHERE clause, <b>every record</b> is returned, but only the chosen fields, in the order you list them.</p>",
    example: PLAYERS + sql("SELECT Name, Points\nFROM Players") +
      "<p>Output (every record, two fields): <b>Asha 42, Ben 35, Chen 51, Dina 35, Eli 60</b>.</p>",
    checks:[
      mc("Which SQL keyword states the table that the data comes from?", "FROM", ["SELECT","WHERE","ORDER"], "FROM is followed by the table name."),
      fill("Complete the SQL to show the <b>Name</b> and <b>Points</b> of every player in the table <b>Players</b>.",
        "{1} Name, Points\n{2} Players",
       [["SELECT", ["GET", "SHOW", "FIND"]],
        ["FROM", ["IN", "TABLE", "WHERE"]]],
        "SELECT lists the fields to show; FROM names the table they come from."),
      mc("How many records does <code>SELECT Name FROM Players</code> output for the table above?", "5", ["1","2","0"], "With no WHERE clause, every record is returned. There are 5 players.")
    ] },

  { id:"9.4b", code:"9.4", title:"SQL: WHERE",
    video:{ id:SQ, start:77, label:"Video: WHERE" },
    concept:
      "<p><code>WHERE</code> filters the records, so only those that meet a condition are returned.</p>" +
      sql("SELECT fields\nFROM table\nWHERE condition") +
      "<p>Conditions use these operators: <code>=</code> equal, <code>&lt;&gt;</code> not equal, <code>&lt;</code> less than, <code>&lt;=</code> less than or equal, <code>&gt;</code> greater than, <code>&gt;=</code> greater than or equal.</p>" +
      "<p>Text values go in quotes, e.g. <code>Team = \"Reds\"</code>. Numbers do not.</p>",
    example: PLAYERS + sql("SELECT Name\nFROM Players\nWHERE Points > 40") +
      "<p>Which players have more than 40 points? Asha (42), Chen (51) and Eli (60). Output: <b>Asha, Chen, Eli</b>. Ben and Dina have 35, so they are left out.</p>",
    checks:[
      mc("Which clause chooses only the records that meet a condition?", "WHERE", ["SELECT","FROM","SUM"], "WHERE filters the records."),
      fill("Complete the SQL to show only the <b>names</b> of players with <b>more than</b> 40 points.",
        "SELECT {1}\nFROM Players\nWHERE Points {2} 40",
       [["Name", ["Players", "Points", "*"]],
        [">", ["<", ">=", "="]]],
        "SELECT the field you want to display (Name). WHERE filters the records: 'more than 40' is > 40 (>= would include exactly 40)."),
      mc("Using the Players table, what does this output? <code>SELECT Name FROM Players WHERE Team = \"Blues\"</code>", "Ben, Eli", ["Ben, Dina","Asha, Chen","Eli only"], "Ben and Eli are the two players in the Blues team.")
    ] },

  { id:"9.4c", code:"9.4", title:"SQL: ORDER BY",
    video:{ id:SQ, start:277, label:"Video: ORDER BY ascending / descending" },
    concept:
      "<p><code>ORDER BY</code> sorts the results. It goes at the end of the query.</p>" +
      sql("SELECT fields\nFROM table\nORDER BY field ASC") +
      "<ul><li><code>ASC</code> (ascending): smallest to largest, or A to Z.</li><li><code>DESC</code> (descending): largest to smallest, or Z to A.</li></ul>" +
      "<p>It can be combined with WHERE; the order is SELECT, FROM, WHERE, then ORDER BY.</p>",
    example: PLAYERS + sql("SELECT Name, Points\nFROM Players\nORDER BY Points DESC") +
      "<p>Highest points first: <b>Eli 60, Chen 51, Asha 42</b>, then Ben 35 and Dina 35 (a tie, so these two may appear in either order).</p>",
    checks:[
      mc("Which SQL clause puts the results in order of the highest value first?", "ORDER BY Points DESC", ["ORDER BY Points ASC","WHERE Points DESC","SORT Points HIGH"], "DESC sorts from largest to smallest."),
      fill("Complete the SQL to show <b>Name</b> and <b>Points</b>, with the <b>highest points first</b>.",
        "SELECT Name, Points\nFROM Players\n{1} Points {2}",
       [["ORDER BY", ["SORT BY", "GROUP BY", "ARRANGE"]],
        ["DESC", ["ASC", "DOWN", "HIGH"]]],
        "ORDER BY sorts the results. DESC is descending (highest first); ASC is ascending (lowest first)."),
      mc("Using the Players table, which player is output first by <code>SELECT Name FROM Players ORDER BY Points DESC</code>?", "Eli", ["Asha","Ben","Chen"], "Eli has the most points (60), so is first when sorted descending.")
    ] },

  { id:"9.4d", code:"9.4", title:"SQL: AND and OR",
    video:{ id:SQ, start:322, label:"Video: AND and OR" },
    concept:
      "<p>Use <code>AND</code> and <code>OR</code> to combine conditions in a WHERE clause.</p>" +
      "<ul><li><b>AND</b>: a record is returned only if <b>both</b> conditions are true.</li><li><b>OR</b>: a record is returned if <b>at least one</b> condition is true.</li></ul>" +
      "<p>AND gives fewer records; OR gives the same or more. Each condition must be written in full: <code>Team = \"Reds\" OR Team = \"Blues\"</code>.</p>",
    example: PLAYERS +
      sql("SELECT Name\nFROM Players\nWHERE Team = \"Blues\" AND Points > 40") +
      "<p>Ben is Blues but has 35, so he fails the second test. Only <b>Eli</b> passes both.</p>" +
      sql("SELECT Name\nFROM Players\nWHERE Team = \"Greens\" OR Points > 50") +
      "<p>Dina is Greens; Chen (51) and Eli (60) have over 50. Output: <b>Chen, Dina, Eli</b>.</p>",
    checks:[
      mc("Which keyword returns a record only when both conditions are true?", "AND", ["OR","FROM","ORDER"], "AND needs both conditions to be true."),
      fill("Complete the SQL to show the names of players who are in the <b>Blues</b> team <b>and</b> have more than 40 points.",
        "SELECT Name\nFROM Players\n{1} Team = \"Blues\" {2} Points > 40",
       [["WHERE", ["IF", "FROM", "HAVING"]],
        ["AND", ["OR", "NOT", "ALSO"]]],
        "WHERE holds the conditions. AND means BOTH conditions must be true; OR would accept players who meet only one."),
      mc("Using the Players table, how many records are returned by <code>WHERE Team = \"Reds\" OR Points = 35</code>?", "4", ["2","3","5"], "Reds: Asha and Chen. Points 35: Ben and Dina. That is 4 records.")
    ] },

  { id:"9.4e", code:"9.4", title:"SQL: SUM and COUNT",
    video:{ id:SQ, start:365, label:"Video: COUNT and SUM" },
    concept:
      "<p>Two functions calculate one answer from many records:</p>" +
      "<ul><li><code>SUM(field)</code> adds up all the values in a numeric field.</li><li><code>COUNT(field)</code> counts how many records are returned.</li></ul>" +
      sql("SELECT SUM(field)\nFROM table\nWHERE condition") +
      "<p>The WHERE clause is applied first, so SUM and COUNT only use the records that match.</p>",
    example: PLAYERS +
      sql("SELECT SUM(Points)\nFROM Players\nWHERE Team = \"Reds\"") +
      "<p>The Reds are Asha (42) and Chen (51): 42 + 51 = <b>93</b>.</p>" +
      sql("SELECT COUNT(ID)\nFROM Players\nWHERE Active = TRUE") +
      "<p>Asha, Chen, Dina and Eli are active, so the output is <b>4</b>.</p>",
    checks:[
      mc("What does <code>SELECT SUM(Points) FROM Players</code> output for the table above?", "223", ["5","60","42"], "42 + 35 + 51 + 35 + 60 = 223."),
      fill("Complete the SQL to find the <b>total</b> of the Points for the Reds team.",
        "SELECT {1}(Points)\nFROM Players\nWHERE Team = \"Reds\"",
       [["SUM", ["COUNT", "TOTAL", "ADD"]]],
        "SUM adds up the values in a field. COUNT would only tell you how many records there are."),
      fill("Complete the SQL to count <b>how many</b> players are in the Reds team.",
        "SELECT {1}(Name)\nFROM {2}\n{3} Team = \"Reds\"",
       [["COUNT", ["SUM", "TOTAL", "NUMBER"]],
        ["Players", ["Name", "Team", "Reds"]],
        ["WHERE", ["IF", "HAVING", "FOR"]]],
        "COUNT gives the number of records that match. FROM names the table (Players) and WHERE filters to the Reds team."),
      mc("Which function is used to find how many records match a query?", "COUNT", ["SUM","ORDER","SELECT *"], "COUNT gives the number of records returned.")
    ] }

  ];

  var TEST = {
    mcq:[
      mc("In a database table of students, what is a field?", "One column of data for each student", ["All the data about one single student","The whole table of student data","A unique code given to each student"], "A field is a column. A record is a row."),
      mc("Which data type should be used for the field IsMember, which holds Yes or No?", "Boolean", ["Integer","Text","Real"], "Only two possible values means Boolean."),
      mc("A table stores the fields Surname, Form and Mark. A StudentID field is added. Why is StudentID the best primary key?", "Its value is unique for every student", ["It is the shortest field","It is a number","It is always the first field"], "A primary key must never repeat. Surnames, forms and marks all can."),
      mc("What does <code>SELECT COUNT(ID) FROM Players WHERE Points &gt; 40</code> output for the Players table (points 42, 35, 51, 35, 60)?", "3", ["5","2","153"], "Players with more than 40 points are 42, 51 and 60, so the count is 3."),
      mc("Which query lists the names of the players in alphabetical order?", "SELECT Name FROM Players ORDER BY Name ASC", ["SELECT Name FROM Players WHERE Name ASC","ORDER BY Name FROM Players SELECT Name","SELECT Name ORDER Players BY ASC"], "SELECT, FROM and then ORDER BY with ASC for A to Z.")
    ],
    typed:[
      { q:"Explain what a primary key is and why it is used.", groups:[["unique","different","no two","never repeat","not repeated"],["field","column","value"],["identify","identifies","find","distinguish"],["record","row"]], need:3, model:"A primary key is a field whose value is unique for every record, so no two records share it. It is used to identify one specific record." },
      { q:"Write an SQL query to display the Name and Points of all players in the Reds team, with the highest points first.", groups:[["select name"],["points"],["from players"],["where"],["reds"],["order by"],["desc"]], need:6, model:"SELECT Name, Points FROM Players WHERE Team = \"Reds\" ORDER BY Points DESC" }
    ]
  };

  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat(LESSONS);
  (root.ILEARN_TESTS = root.ILEARN_TESTS || {})[9] = TEST;
})(typeof window !== "undefined" ? window : this);
