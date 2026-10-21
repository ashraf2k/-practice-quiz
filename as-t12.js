/* iLearn AS Level (11BR) -- Topics 11 and 12 sample lessons built on real 9618 Paper 2 (May/June 2025, 9618/21) questions. */
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
  var INSERT = "<details class='ln-ref' style='margin:10px 0'><summary>Insert (extract): the pseudocode functions you may use</summary><div class='ln-ref-body'>" +
    "<p><code>INT(x : REAL) RETURNS INTEGER</code><br>returns the integer part of x<br>Example: <code>INT(27.5415)</code> returns 27</p>" +
    "<p><code>RAND(x : INTEGER) RETURNS REAL</code><br>returns a real number in the range 0 to x (not inclusive of x).<br>Example: <code>RAND(87)</code> could return 35.430729</p></div></details>";
  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat([

  { id:"11.2.1a", code:"11.2.1", title:"Writing a REPEAT loop from structured English",
    concept:
      "<p>A common Paper 2 task is: <b>write pseudocode from a structured English description</b>. Work through it in four steps:</p>" +
      "<ol><li><b>Variables:</b> decide what you need to store and write a <code>DECLARE</code> line for each (name, data type).</li><li><b>Setup:</b> things done once before the loop, such as generating a random number.</li><li><b>Loop:</b> choose the loop. If you do not know how many times it repeats, use a <b>conditional loop</b>: <code>REPEAT ... UNTIL</code> (test after) or <code>WHILE ... ENDWHILE</code> (test before).</li><li><b>Inside the loop:</b> prompt, input, then selection (IF) for each case.</li></ol>" +
      "<h4>Useful building blocks</h4>" +
      tbl(["Need", "Pseudocode"], [
        ["Declare a variable", "<code>DECLARE Guess : INTEGER</code>"],
        ["Assign a value", "<code>Total " + ARR + " 0</code>"],
        ["Prompt, then input", "<code>OUTPUT \"Enter a number: \"</code><br><code>INPUT Guess</code>"],
        ["Random whole number from 1 to 100", "<code>Value " + ARR + " INT(RAND(100)) + 1</code>"],
        ["Selection", "<code>IF Guess &gt; Value THEN ... ENDIF</code>"],
        ["Loop until a condition", "<code>REPEAT ... UNTIL Guess = Value</code>"]]) +
      "<p><b>Why <code>INT(RAND(100)) + 1</code>?</b> <code>RAND(100)</code> gives a real number from 0 up to (but not including) 100. <code>INT</code> keeps the whole part (0 to 99). Adding 1 gives 1 to 100.</p>",
    example:
      "<p><b>Example:</b> a program picks a random number from 1 to 6 (a dice) and repeats until the user guesses it.</p>" +
      pre("DECLARE Dice : INTEGER\nDECLARE Guess : INTEGER\nDice " + ARR + " INT(RAND(6)) + 1\nREPEAT\n   OUTPUT \"Guess the dice: \"\n   INPUT Guess\n   IF Guess <> Dice THEN\n      OUTPUT \"Wrong, try again\"\n   ENDIF\nUNTIL Guess = Dice\nOUTPUT \"Correct\"") +
      "<p>Each ingredient earns a mark in the real mark scheme: declarations, <code>RAND</code>, <code>INT</code>, the correct range, a conditional loop, prompt and input inside the loop, the checks, and the messages.</p>" +
      "<p><b>Examiner report (June 2025):</b> a mark for the input was often lost because the <b>prompt text</b> was omitted. The commonest errors were a conditional loop that was incorrectly formed (not clear where it ends), not declaring all the variables, and leaving out <code>ENDIF</code>. Candidates often failed to get the third mark for the expression (<code>RAND</code>, then <code>INT</code>, then + 1).</p>",
    checks:[
      mc("Which loop is best when you do not know how many times it will repeat?", "A conditional loop (REPEAT ... UNTIL or WHILE)", ["A FOR loop", "A CASE statement", "An IF statement"], "A count-controlled FOR loop needs a known number of repeats; a conditional loop runs until a condition is met."),
      mc("Which expression gives a random integer from 1 to 10?", "INT(RAND(10)) + 1", ["RAND(10)", "INT(RAND(10))", "RAND(10) + 1"], "RAND(10) is a real from 0 to under 10; INT removes the decimal part; + 1 shifts the range to 1 to 10."),
      mc("Which keyword ends an IF statement in the pseudocode?", "ENDIF", ["END IF THEN", "NEXT", "ENDCASE"], "Every IF needs ENDIF."),
      mc("In <code>REPEAT ... UNTIL Guess = Value</code>, when is the condition tested?", "After the loop body has run", ["Before the loop starts", "Only the first time", "Never"], "REPEAT ... UNTIL is a post-condition loop so the body runs at least once."),
      tx("State two common mistakes that cost marks in pseudocode answers. [2]", [["declare","declaration","not declared","variables"],["endif","end if","prompt","loop","until","unclear","syntax"]], 2, "Not declaring all the variables, missing ENDIF, omitting the prompt text before INPUT, or forming the conditional loop incorrectly."),
      { type:"pp", src:"9618/21 May/June 2025 · Question 3", explain:"Declare variables; INT(RAND(100)) + 1; a conditional loop; prompt and INPUT inside it; IF for too high and too low; messages including a final correct message.",
        intro:"<p>A student has been asked to create a simple guessing game program. This program will generate a random integer value between 1 and 100. It will then repeatedly prompt the user to input an integer value until they input the randomly generated value.</p><p>The student has written a structured English description:</p><p>step 1 &ndash; randomly generate an integer value between 1 and 100 inclusive<br>step 2 &ndash; prompt the user to input an integer value<br>step 3 &ndash; output an appropriate message if the value input was too high; then repeat from step 2<br>step 4 &ndash; output an appropriate message if the value input was too low; then repeat from step 2<br>step 5 &ndash; output an appropriate message if the value input was the same value that was randomly generated; then end the program.</p>" + INSERT,
        parts:[{ label:"", marks:8, kind:"text", code:true, lines:16, q:"<p>Write a pseudocode algorithm from this structured English description.</p><p>Assume no input validation is needed.</p><p style='color:var(--muted);font-size:13px'>Type your pseudocode. Use <code>&lt;-</code> or the arrow for assignment.</p>",
          points:[
            { t:"MP1 Declare all variables used", k:["re:declare .*declare "] },
            { t:"MP2 Uses RAND() function", k:["rand("] },
            { t:"MP3 Uses INT() function", k:["int("] },
            { t:"MP4 Correct syntax for random number between 1 and 100", k:["re:int\\( *rand\\( *100 *\\) *\\) *\\+ *1","re:int\\( *rand\\( *100 *\\) *\\+ *1 *\\)","re:1 *\\+ *int\\( *rand\\( *100 *\\) *\\)"] },
            { t:"MP5 Conditional loop until correct number guessed", k:["repeat","until","while"] },
            { t:"MP6 Prompt and input a guess in a loop", k:["re:output.*input"] },
            { t:"MP7 Check if guess is too high in a loop", k:["re:\\bif\\b[^<>]*>[^<>]*\\bthen","re:\\bif\\b[^<>]*>=[^<>]*\\bthen"] },
            { t:"MP8 Check if guess is too low in a loop", k:["re:\\bif\\b[^<>]*<(?![-=>])[^<>]*\\bthen"] },
            { t:"MP9 Output appropriate message (x2) when the number is not guessed correctly (in the loop) and output correct guess message", k:["re:output.*output.*output.*output"] }
          ], max:8,
          scheme:"<p>Example solution:</p><pre>DECLARE GeneratedValue : INTEGER\nDECLARE Guess : INTEGER\nGeneratedValue " + ARR + " INT(RAND(100)) + 1\nREPEAT\n   OUTPUT \"Enter a guess between 1 and 100: \"\n   INPUT Guess\n   IF Guess > GeneratedValue THEN\n      OUTPUT \"Guess was too high\"\n   ENDIF\n   IF Guess < GeneratedValue THEN\n      OUTPUT \"Guess was too low\"\n   ENDIF\nUNTIL Guess = GeneratedValue\nOUTPUT \"Number guessed correctly\"</pre><ul><li><b>MP1</b> Declare all variables used</li><li><b>MP2</b> Uses RAND() function</li><li><b>MP3</b> Uses INT() function</li><li><b>MP4</b> Correct syntax for random number between 1 and 100</li><li><b>MP5</b> Conditional loop until correct number guessed</li><li><b>MP6</b> Prompt and input a guess in a loop</li><li><b>MP7</b> Check if guess is too high in a loop</li><li><b>MP8</b> Check if guess is too low in a loop</li><li><b>MP9</b> Output appropriate message (x2) when the number is not guessed correctly (in the loop) and output correct guess message</li></ul><p>Max 8</p>",
          note:"The first pseudocode question on the paper and a very varied level of response. A mark was awarded for the input of the user's guess, and this was often lost due to omission of some prompt text. There were three marks available for the correct expression to calculate each random number; use of the RAND() function followed by use of the INT() function and then the addition of 1 to generate the number in the correct range. Candidates often failed to secure the third mark. There were frequent common errors: an incorrectly formed conditional loop; omitting to declare all the variables used; an IF statement with the ENDIF omitted.<br><b>Note for this practice marker:</b> keyword marking cannot judge the logic of your whole program, so compare your answer carefully with the example solution above." }] }
    ] },

  { id:"12.3.1a", code:"12.3.1", title:"Types of error: syntax, logic and run-time",
    concept:
      "<p>A program can contain three kinds of error. You must be able to <b>identify</b>, <b>describe</b> and <b>correct</b> each one.</p>" +
      tbl(["Type", "Meaning", "Example"], [
        ["<b>Syntax error</b>", "A rule of the programming language (its grammar) has not been followed, so the program cannot be translated or run", "<code>OUTPUT \"Hello</code> (missing closing quote), a missing <code>ENDIF</code> or <code>NEXT</code>"],
        ["<b>Logic error</b>", "The program runs without crashing but does <b>not do what was intended</b>: the results are wrong", "using <code>+</code> instead of <code>*</code>, or <code>&gt;</code> instead of <code>&gt;=</code>"],
        ["<b>Run-time error</b>", "An <b>illegal operation</b> is attempted while the program is running, usually making the program crash", "dividing by zero, an array index that does not exist, opening a file that is missing"]]) +
      "<h4>Reducing the risk of errors</h4>" +
      "<ul><li>Use <b>constants</b> for fixed values: the value cannot be changed accidentally, and a change needs to be made in one place only.</li><li>Use <b>library routines</b>: the code is already <b>tried and tested</b> (error free) and gives functions that may be difficult to code yourself.</li><li>Use meaningful identifier names, comments and testing.</li></ul>",
    example:
      "<p><b>Name the error and explain it:</b></p>" +
      "<ul><li><code>Average " + ARR + " Total / Count</code> when <code>Count</code> is 0 &rarr; <b>run-time error</b>: dividing by zero is an illegal operation and the program crashes.</li><li><code>IF Mark &gt; 50</code> when 50 should pass &rarr; <b>logic error</b>: the program runs but gives a wrong answer for 50.</li><li><code>FOR Count " + ARR + " 1 TO 10</code> with no <code>NEXT</code> &rarr; <b>syntax error</b>: the grammar is not followed.</li></ul>" +
      "<p><b>Two marks for each type in the exam:</b> one for the <b>name</b> and one for the <b>description</b>. Saying only 'divide by zero' does not earn the second mark: say that it causes an <b>illegal operation</b> and the program <b>crashes</b>.</p>" +
      "<p><b>Examiner report (June 2025):</b> a syntax error was usually well explained, but run-time errors were less well understood. 'The consequence of the error was often missing in the explanation.' In the question, the logic errors had already been corrected, so the 'other' types were syntax and run-time.</p>",
    checks:[
      mc("A program runs but shows the wrong total. What type of error is this?", "Logic error", ["Syntax error", "Run-time error", "Compile-time error"], "The program runs, but not as intended: a logic error."),
      mc("The program stops because it tries to divide by zero. What type of error is this?", "Run-time error", ["Syntax error", "Logic error", "Typing error"], "An illegal operation during execution is a run-time error."),
      mc("A program will not translate because ENDIF is missing. What type of error is this?", "Syntax error", ["Logic error", "Run-time error", "Overflow error"], "The grammar of the language was not followed."),
      mc("Which helps reduce the risk of errors when the same fixed value is used many times?", "Using a constant", ["Using a longer variable name", "Writing fewer comments", "Using a global array"], "A constant can be changed in one place only and cannot be altered by accident."),
      { type:"pp", src:"9618/21 May/June 2025 · Question 2(b)(iii) and (c)", explain:"Syntax error: the rules of the language are not followed. Run-time error: an illegal operation happens while the program runs. Library routines are tried and tested.",
        intro:"<p>A program is being developed to calculate the pay of employees working for a company. A function <code>CalculateBonus()</code> calculates bonus pay based on the value of sales.</p>",
        parts:[
          { label:"(b)(iii)", marks:1, kind:"text", lines:3, q:"<p>There are different ways to reduce the risk of errors when developing the new program, such as the use of constants. One other way that can reduce the risk of errors when writing the program is the use of library routines.</p><p>Explain how library routines can reduce the risk of programming errors.</p>",
            points:[
              { t:"MP1 (The code is) tried and tested so error free", k:["tried and tested","tested","error free","no errors","free of errors","without errors","already been tested","debugged","bug free","reliable"] },
              { t:"MP2 Provides functionality / code that the programmer may find difficult to code themselves", k:["difficult to code","hard to code","difficult to write","hard to write","complex","cannot code","find difficult","functionality"] }
            ], max:1,
            scheme:"<ul><li><b>MP1</b> (The code is) tried and tested so error free</li><li><b>MP2</b> Provides functionality / code that the programmer may find difficult to code themselves</li></ul><p>Max 1</p>",
            note:"Most candidates were able to secure the mark stating that the code would be 'tried and tested'. Few answers suggested that the library routines would provide code which the programmer might themselves find difficult to code." },
          { label:"(c)", marks:4, kind:"text", lines:8, q:"<p>All the logic errors have been corrected, and the program has been coded.</p><p>Identify and describe <b>two other</b> types of error that the program could contain.</p><p style='color:var(--muted);font-size:13px'>Write: Type of error, then its description, for each of the two types.</p>",
            points:[
              { t:"MP1 Syntax (error)", k:["syntax"] },
              { t:"MP2 Rules of programming language // the language grammar was not followed", k:["rules","grammar","not followed","does not follow","do not follow","not follow","incorrectly written","broken"] },
              { t:"MP3 Run-time (error)", k:["run time","runtime"] },
              { t:"MP4 The program performs an illegal operation", k:["illegal","crash","cannot be executed","can not be executed","cannot be performed","impossible"] }
            ], max:4,
            scheme:"<ul><li><b>MP1</b> Syntax (error)</li><li><b>MP2</b> Rules of programming language // the language grammar was not followed</li><li><b>MP3</b> Run-time (error)</li><li><b>MP4</b> The program performs an illegal operation</li></ul><p>Mark as follows:<br>One mark for naming each type of error and one mark for the description</p>",
            note:"Answers expected were syntax and run-time errors. A syntax error was usually well explained: that the written syntax of a statement does not follow the grammar and language rules. Run-time errors were less well understood. A popular answer on its own was to state 'divide by zero' which was considered insufficient. This answer needed to be followed by the explanation that this would cause an illegal operation to be performed or would cause the program to crash. It was the consequence of the error which was often missing in the explanation given." }
        ] }
    ] }

  ]);
})(typeof window !== "undefined" ? window : this);
