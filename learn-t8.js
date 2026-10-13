/* iLearn topic 8: Programming (Cambridge IGCSE Computer Science 0478)
   All code uses the exam pseudocode conventions from the syllabus. */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx;
  function pre(s){ return "<pre class='ln-pre'>" + s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;") + "</pre>"; }
  var LESSONS = [

  // ---------- 8.1 Programming concepts ----------
  { id:"8.1.1", code:"8.1.1", title:"Variables and constants",
    concept:
      "<p>A program stores data in the computer's memory. A <b>variable</b> is a named memory location whose value <b>can change</b> while the program runs. A <b>constant</b> is a named memory location whose value is set once and <b>cannot change</b> while the program runs.</p>" +
      "<p>The name is called an <b>identifier</b>. Identifiers use letters and digits only, start with a capital letter, and use mixed case, e.g. <code>TotalToPay</code>.</p>" +
      "<ul><li><b>Declare</b> a variable: <code>DECLARE Score : INTEGER</code></li><li><b>Declare</b> a constant: <code>CONSTANT HourlyRate ← 6.50</code> (only a literal value can be used)</li><li><b>Assign</b> a value with the arrow: <code>Score ← 10</code></li></ul>" +
      "<p>Use a <b>constant</b> for a value that never changes (e.g. a tax rate): the program is easier to read and you only update the value in one place.</p>",
    example:
      pre("DECLARE Score : INTEGER\nCONSTANT Bonus ← 5\nScore ← 10\nScore ← Score * 2 + Bonus\nOUTPUT Score") +
      "<p>Step by step: Score is 10; then <code>10 * 2 + 5 = 25</code>; so <b>25</b> is output. The right-hand side is worked out first, then stored in the variable on the left.</p>",
    checks:[
      mc("What is the main difference between a variable and a constant?", "A constant's value cannot change while the program runs", ["A variable can only store numbers","A constant has no identifier","A variable cannot be used in calculations"], "A variable's value can change; a constant keeps the value it was given."),
      mc("What is the value of Count after these statements? <code>Count ← 4</code> then <code>Count ← Count + 3</code>", "7", ["3","4","43"], "The right side is calculated first: 4 + 3 = 7, which is then stored in Count.")
    ] },

  { id:"8.1.2", code:"8.1.2", title:"Basic data types",
    concept:
      "<p>Every item of data has a <b>data type</b>. The five basic types in the exam are:</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Type</th><th>Stores</th><th>Examples</th></tr>" +
      "<tr><td><b>INTEGER</b></td><td>A whole number</td><td>5, -3, 0</td></tr>" +
      "<tr><td><b>REAL</b></td><td>A number with a fractional part</td><td>4.7, -4.0, 0.3</td></tr>" +
      "<tr><td><b>CHAR</b></td><td>A single character (in single quotes)</td><td>'x', '@', '7'</td></tr>" +
      "<tr><td><b>STRING</b></td><td>Zero or more characters (in double quotes)</td><td>\"Hello\", \"\", \"123\"</td></tr>" +
      "<tr><td><b>BOOLEAN</b></td><td>Only TRUE or FALSE</td><td>TRUE, FALSE</td></tr></table>" +
      "<p>Reals always have at least one digit each side of the decimal point (<code>0.5</code>, not <code>.5</code>). Data you will <b>not calculate with</b> (a phone number, a postcode) should be a <b>STRING</b>.</p>",
    example:
      "<table class='ln-table'><tr><th>Data</th><th>Best type</th><th>Why</th></tr><tr><td>Number of students (28)</td><td>INTEGER</td><td>Whole number</td></tr><tr><td>Price (4.99)</td><td>REAL</td><td>Has a fractional part</td></tr><tr><td>Grade ('B')</td><td>CHAR</td><td>One character</td></tr><tr><td>Phone number (07123456789)</td><td>STRING</td><td>Leading zero; never calculated with</td></tr><tr><td>Is the user logged in?</td><td>BOOLEAN</td><td>Only two values</td></tr></table>",
    checks:[
      mc("Which data type is best for storing a telephone number such as 07123456789?", "STRING", ["INTEGER","REAL","BOOLEAN"], "A phone number has a leading zero and is never used in calculations, so it is stored as a string."),
      mc("Which data type should be used for the price 12.50?", "REAL", ["INTEGER","CHAR","STRING"], "Prices have a fractional part, so REAL is used.")
    ] },

  { id:"8.1.3", code:"8.1.3", title:"Input and output",
    concept:
      "<p><b>Input</b> gets data from the user into a variable. <b>Output</b> shows data to the user.</p>" +
      "<ul><li><code>INPUT Answer</code> stores what the user types in the variable <code>Answer</code>.</li><li><code>OUTPUT Score</code> shows the value of <code>Score</code>.</li><li>Several items can be output together, separated by commas: <code>OUTPUT \"You have \", Lives, \" lives left\"</code>.</li></ul>" +
      "<p>Text in double quotes is shown exactly as written. A variable name without quotes shows the <b>value stored</b>. It is good practice to <b>OUTPUT a prompt</b> before an INPUT so the user knows what to type.</p>",
    example:
      pre("OUTPUT \"Enter your name\"\nINPUT Name\nOUTPUT \"Hello \", Name") +
      "<p>If the user types <code>Sam</code>, the screen shows:<br><code>Enter your name</code><br><code>Hello Sam</code></p>",
    checks:[
      mc("What is displayed? <code>Lives ← 3</code> then <code>OUTPUT \"You have \", Lives, \" lives\"</code>", "You have 3 lives", ["You have Lives lives","You have 3","\"You have \", Lives"], "Text in quotes is shown as written and the variable is replaced by its value."),
      mc("What does <code>INPUT Age</code> do?", "Stores the typed value in Age", ["Displays the value of Age on screen","Declares Age as a constant value","Compares Age with the number zero"], "INPUT reads a value from the user into the variable.")
    ] },

  { id:"8.1.4a", code:"8.1.4a", title:"Sequence",
    concept:
      "<p><b>Sequence</b> means that statements are carried out <b>one after another in the order they are written</b>. The order matters: changing it can change the result.</p>" +
      "<p>A classic example is <b>swapping two values</b>. You need a temporary variable so no value is lost:</p>",
    example:
      pre("A ← 5\nB ← 9\nTemp ← A      // Temp is 5\nA ← B         // A is 9\nB ← Temp      // B is 5") +
      "<p>Now A = 9 and B = 5. If the order were wrong, e.g. <code>A ← B</code> then <code>B ← A</code>, both would end up as 9 because the original value of A was overwritten before it was saved.</p>",
    checks:[
      mc("What does sequence mean in programming?", "Statements are run one after another in the order written", ["Statements are repeated until a condition is true","One of several statements is chosen","A block of code is given a name"], "Sequence is the default flow from the first statement to the last."),
      mc("After <code>A ← 2</code>, <code>B ← 7</code>, <code>A ← B</code>, <code>B ← A</code>, what are the values of A and B?", "A is 7 and B is 7", ["A is 7 and B is 2","A is 2 and B is 7","A is 2 and B is 2"], "After A ← B, A holds 7. Then B ← A copies 7 again, so both are 7.")
    ] },

  { id:"8.1.4b1", code:"8.1.4b", title:"Selection: IF statements",
    concept:
      "<p><b>Selection</b> lets a program choose which statements to run, depending on a <b>condition</b>.</p>" +
      pre("IF <condition>\n   THEN\n      <statements>\n   ELSE\n      <statements>\nENDIF") +
      "<ul><li>The <b>condition</b> is true or false (e.g. <code>Mark >= 50</code>).</li><li>If true, the THEN statements run; if false, the ELSE statements run.</li><li>The ELSE part is optional.</li></ul>",
    example:
      pre("INPUT Mark\nIF Mark >= 50\n   THEN\n      OUTPUT \"Pass\"\n   ELSE\n      OUTPUT \"Fail\"\nENDIF") +
      "<p>Mark = 50: <code>50 >= 50</code> is true, so <b>Pass</b>. Mark = 49: false, so <b>Fail</b>. The <code>&gt;=</code> includes 50.</p>",
    checks:[
      mc("What is output when Mark is 50? <code>IF Mark > 50 THEN OUTPUT \"Pass\" ELSE OUTPUT \"Fail\" ENDIF</code>", "Fail", ["Pass","Nothing is output","Both words"], "50 > 50 is false, so the ELSE branch runs."),
      mc("What happens when the condition of an IF statement with no ELSE is false?", "The statements inside the IF are skipped", ["The program stops with an error","The statements inside run anyway","The condition is changed to true"], "Nothing in the THEN section runs, and the program continues after ENDIF.")
    ] },

  { id:"8.1.4b2", code:"8.1.4b", title:"Selection: CASE statements",
    concept:
      "<p>A <b>CASE</b> statement chooses one of several branches by comparing <b>one variable</b> with several possible values. It is neater than many IF statements.</p>" +
      pre("CASE OF <identifier>\n   <value 1> : <statement>\n   <value 2> : <statement>\n   OTHERWISE <statement>\nENDCASE") +
      "<ul><li>Cases are tested in order. When one matches, its statement runs and the CASE ends.</li><li><b>OTHERWISE</b> (optional, always last) runs if none of the cases matched.</li></ul>",
    example:
      pre("INPUT Move\nCASE OF Move\n   'W' : Position ← Position - 10\n   'E' : Position ← Position + 10\n   'A' : Position ← Position - 1\n   'D' : Position ← Position + 1\n   OTHERWISE OUTPUT \"Beep\"\nENDCASE") +
      "<p>Position is 15 and Move is 'A': Position becomes 14. If Move is 'X' nothing matches, so <b>Beep</b> is output.</p>",
    checks:[
      mc("Position is 15 and the user enters 'E'. What is Position after the CASE statement in the example?", "25", ["5","16","14"], "'E' adds 10: 15 + 10 = 25."),
      mc("What is the OTHERWISE clause in a CASE statement for?", "It runs if none of the listed values match", ["It runs before the first case","It runs every time","It marks the end of the CASE"], "OTHERWISE is the default branch, and must be last.")
    ] },

  { id:"8.1.4c1", code:"8.1.4c", title:"Iteration: FOR loops (count-controlled)",
    concept:
      "<p><b>Iteration</b> means repeating statements. A <b>FOR loop</b> repeats a set number of times (<b>count-controlled</b>), counting with a variable.</p>" +
      pre("FOR <identifier> ← <value1> TO <value2>\n   <statements>\nNEXT <identifier>") +
      "<ul><li>The counter takes every value from value1 to value2 <b>inclusive</b>.</li><li>Add <code>STEP</code> to change the increment: <code>FOR Count ← 1 TO 9 STEP 2</code> gives 1, 3, 5, 7, 9. STEP can be negative.</li><li>If value1 is greater than value2 (with a positive step) the loop does not run at all.</li></ul>",
    example:
      pre("FOR Count ← 2 TO 10 STEP 4\n   OUTPUT Count\nNEXT Count") +
      "<p>Output: <b>2, 6, 10</b>: three times. Next would be 14, which is past 10, so the loop stops.</p>" +
      pre("FOR Count ← 10 TO 1 STEP -3\n   OUTPUT Count\nNEXT Count") +
      "<p>Output: <b>10, 7, 4, 1</b>.</p>",
    checks:[
      mc("How many times does this loop run? <code>FOR Index ← 1 TO 6</code>", "6", ["5","7","1"], "The values 1, 2, 3, 4, 5 and 6 are all used."),
      mc("What is output? <code>FOR Count ← 1 TO 9 STEP 4</code> with <code>OUTPUT Count</code> inside", "1, 5, 9", ["1, 4, 9","1, 5","5, 9"], "The counter goes up by 4: 1, 5, 9. The next value, 13, is past 9.")
    ] },

  { id:"8.1.4c2", code:"8.1.4c", title:"Iteration: WHILE loops (pre-condition)",
    concept:
      "<p>A <b>WHILE</b> loop repeats <b>while a condition is true</b>. The condition is tested <b>before</b> each repeat (a <b>pre-condition</b> loop), so the statements may run <b>zero times</b>.</p>" +
      pre("WHILE <condition> DO\n   <statements>\nENDWHILE") +
      "<p>Use WHILE when you do not know in advance how many repeats are needed. Something inside the loop must change so that the condition eventually becomes false; otherwise the loop never ends.</p>",
    example:
      pre("Number ← 30\nWHILE Number > 9 DO\n   Number ← Number - 9\nENDWHILE\nOUTPUT Number") +
      "<table class='ln-table'><tr><th>Number</th><th>Number &gt; 9?</th></tr><tr><td>30</td><td>yes</td></tr><tr><td>21</td><td>yes</td></tr><tr><td>12</td><td>yes</td></tr><tr><td>3</td><td>no, stop</td></tr></table><p>Output <b>3</b>. The loop body ran 3 times. If Number started at 5, the body would run <b>0 times</b>.</p>",
    checks:[
      mc("What is output? <code>Number ← 30</code>, <code>WHILE Number > 9 DO Number ← Number - 9 ENDWHILE</code>, <code>OUTPUT Number</code>", "3", ["12","9","0"], "30, 21, 12, then 3. At 3 the condition is false, so the loop ends and 3 is output."),
      mc("When is the condition of a WHILE loop tested?", "Before each repeat, so the loop may not run at all", ["After each repeat, so it runs at least once","Only once, at the end","Only when the loop is first declared"], "WHILE is a pre-condition loop.")
    ] },

  { id:"8.1.4c3", code:"8.1.4c", title:"Iteration: REPEAT UNTIL loops (post-condition)",
    concept:
      "<p>A <b>REPEAT ... UNTIL</b> loop runs the statements and then tests the condition <b>afterwards</b> (a <b>post-condition</b> loop).</p>" +
      pre("REPEAT\n   <statements>\nUNTIL <condition>") +
      "<ul><li>The statements run <b>at least once</b>.</li><li>The loop stops when the condition becomes <b>TRUE</b> (so it repeats while the condition is FALSE).</li></ul>" +
      "<table class='ln-table' style='text-align:left'><tr><th>WHILE</th><th>REPEAT UNTIL</th></tr><tr><td>Tests before the statements</td><td>Tests after the statements</td></tr><tr><td>May run zero times</td><td>Always runs at least once</td></tr><tr><td>Repeats while the condition is TRUE</td><td>Repeats until the condition is TRUE</td></tr></table>",
    example:
      pre("REPEAT\n   OUTPUT \"Please enter the password\"\n   INPUT Password\nUNTIL Password = \"Secret\"") +
      "<p>The prompt is always shown at least once. It repeats until the user types <code>Secret</code>. This is ideal for input validation.</p>",
    checks:[
      mc("How many times does this loop run? <code>Count ← 0</code>, <code>REPEAT Count ← Count + 1 UNTIL Count = 3</code>", "3", ["2","4","0"], "Count becomes 1, 2 and 3; after the third pass the condition is true so the loop stops."),
      mc("Which loop always runs its statements at least once?", "REPEAT UNTIL", ["WHILE","FOR with value1 greater than value2","CASE"], "A post-condition loop tests after running the statements.")
    ] },

  { id:"8.1.4d", code:"8.1.4d", title:"Totalling and counting in a program",
    concept:
      "<p>In a program, <b>totalling</b> and <b>counting</b> use an accumulator variable inside a loop.</p>" +
      "<ul><li><b>Initialise</b> before the loop: <code>Total ← 0</code>, <code>Count ← 0</code>.</li><li>Inside the loop: <code>Total ← Total + Number</code> (adds the value) and <code>Count ← Count + 1</code> (adds one).</li><li>Counting can be <b>conditional</b>: put <code>Count ← Count + 1</code> inside an IF.</li></ul>",
    example:
      pre("Total ← 0\nCount ← 0\nFOR Index ← 1 TO 5\n   INPUT Mark\n   Total ← Total + Mark\n   IF Mark >= 50\n      THEN\n         Count ← Count + 1\n   ENDIF\nNEXT Index\nOUTPUT \"Total \", Total, \" Passes \", Count") +
      "<p>Marks entered: 40, 65, 50, 72, 30. Total = 40 + 65 + 50 + 72 + 30 = <b>257</b>. Marks of 50 or more: 65, 50, 72, so Passes = <b>3</b>.</p>",
    checks:[
      mc("Marks 40, 65, 50, 72, 30 are entered into the program above. What is the value of Total at the end?", "257", ["3","5","227"], "40 + 65 + 50 + 72 + 30 = 257. Count (3) is the number of marks of 50 or more."),
      mc("Why must Total be set to 0 before the loop?", "So it starts from a known value", ["So the loop runs a lot faster","So the variable becomes a constant","So the loop always stops after one pass"], "Without initialising, the variable may hold an old or undefined value that is added in.")
    ] },

  { id:"8.1.4e", code:"8.1.4e", title:"String handling",
    concept:
      "<p>The exam gives four string operations (positions count from <b>1</b>):</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Operation</th><th>Returns</th><th>Example</th></tr>" +
      "<tr><td><code>LENGTH(s)</code></td><td>Number of characters (spaces count)</td><td><code>LENGTH(\"Happy Days\")</code> is 10</td></tr>" +
      "<tr><td><code>SUBSTRING(s, start, length)</code></td><td>Part of the string</td><td><code>SUBSTRING(\"Happy Days\", 1, 5)</code> is \"Happy\"</td></tr>" +
      "<tr><td><code>UCASE(s)</code></td><td>All upper case</td><td><code>UCASE(\"Happy\")</code> is \"HAPPY\"</td></tr>" +
      "<tr><td><code>LCASE(s)</code></td><td>All lower case</td><td><code>LCASE('W')</code> is 'w'</td></tr></table>" +
      "<p>To join strings (concatenation) you can output them together or use <code>&amp;</code>.</p>",
    example:
      "<p>The word <code>Computer</code> has characters: C1 o2 m3 p4 u5 t6 e7 r8.</p>" +
      pre("Word ← \"Computer\"\nOUTPUT LENGTH(Word)              // 8\nOUTPUT SUBSTRING(Word, 1, 3)     // Com\nOUTPUT SUBSTRING(Word, 4, 3)     // put\nOUTPUT UCASE(Word)               // COMPUTER"),
    checks:[
      mc("What does <code>SUBSTRING(\"Computer\", 4, 3)</code> return?", "put", ["Com","mpu","ter"], "Start at character 4 (p) and take 3 characters: p, u, t."),
      mc("What does <code>LENGTH(\"Hi there\")</code> return?", "8", ["7","2","6"], "H, i, space, t, h, e, r, e = 8 characters. The space counts.")
    ] },

  { id:"8.1.4f1", code:"8.1.4f", title:"Arithmetic operators",
    concept:
      "<table class='ln-table' style='text-align:left'><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr>" +
      "<tr><td><code>+</code></td><td>add</td><td>7 + 3 = 10</td></tr><tr><td><code>-</code></td><td>subtract</td><td>7 - 3 = 4</td></tr><tr><td><code>*</code></td><td>multiply</td><td>7 * 3 = 21</td></tr><tr><td><code>/</code></td><td>divide</td><td>20 / 8 = 2.5</td></tr><tr><td><code>^</code></td><td>power</td><td>2 ^ 3 = 8</td></tr><tr><td><code>DIV(a, b)</code></td><td>whole-number quotient</td><td>DIV(17, 5) = 3</td></tr><tr><td><code>MOD(a, b)</code></td><td>remainder</td><td>MOD(17, 5) = 2</td></tr></table>" +
      "<p><b>Order of operations:</b> brackets first, then powers, then multiplication/division, then addition/subtraction. Use brackets to make the order clear.</p>",
    example:
      "<p><code>7 + 3 * 2</code> = 7 + 6 = <b>13</b> (multiply first).</p><p><code>(7 + 3) * 2</code> = 10 * 2 = <b>20</b>.</p><p>17 split between 5 people: <code>DIV(17, 5)</code> = <b>3</b> each, and <code>MOD(17, 5)</code> = <b>2</b> left over.</p>",
    checks:[
      mc("What is the value of <code>MOD(17, 5)</code>?", "2", ["3","12","3.4"], "17 divided by 5 is 3 remainder 2. MOD gives the remainder."),
      mc("What is the value of <code>2 + 4 * 3</code>?", "14", ["18","24","9"], "Multiplication is done first: 4 * 3 = 12, then 2 + 12 = 14.")
    ] },

  { id:"8.1.4f2", code:"8.1.4f", title:"Relational and logical operators",
    concept:
      "<p><b>Relational</b> operators compare two values and give a <b>BOOLEAN</b> result:</p>" +
      "<table class='ln-table'><tr><th><code>=</code></th><th><code>&lt;</code></th><th><code>&lt;=</code></th><th><code>&gt;</code></th><th><code>&gt;=</code></th><th><code>&lt;&gt;</code></th></tr><tr><td>equal to</td><td>less than</td><td>less than or equal</td><td>greater than</td><td>greater than or equal</td><td>not equal to</td></tr></table>" +
      "<p><b>Logical</b> operators combine conditions:</p>" +
      "<ul><li><b>AND</b>: TRUE only if <b>both</b> conditions are true.</li><li><b>OR</b>: TRUE if <b>at least one</b> is true.</li><li><b>NOT</b>: reverses TRUE and FALSE.</li></ul>",
    example:
      pre("IF Age >= 13 AND Age <= 19\n   THEN\n      OUTPUT \"Teenager\"\nENDIF") +
      "<p>Age 19: TRUE AND TRUE = TRUE, so Teenager. Age 20: TRUE AND FALSE = FALSE, nothing is output.</p>" +
      "<p><code>(5 &gt; 3) AND (2 &gt; 4)</code> is FALSE. <code>(5 &gt; 3) OR (2 &gt; 4)</code> is TRUE.</p>",
    checks:[
      mc("What is the result of <code>(5 > 3) AND (2 > 4)</code>?", "FALSE", ["TRUE","5","2"], "The second condition is false, so AND gives FALSE."),
      mc("Which operator means 'not equal to'?", "<>", ["!","==","=>"], "In the exam pseudocode, not equal to is written <>.")
    ] },

  { id:"8.1.5", code:"8.1.5", title:"Nested statements",
    concept:
      "<p>Statements can be <b>nested</b>: placed inside other statements, for example an IF inside a loop, or an IF inside an IF. The syllabus allows up to <b>three levels</b> of nesting.</p>" +
      "<ul><li><b>Nested selection</b>: an IF inside an IF.</li><li><b>Nested iteration</b>: a loop inside a loop. The inner loop runs fully for every pass of the outer loop.</li><li>Use <b>indentation</b> to show which statements belong where.</li></ul>",
    example:
      pre("IF Mark >= 50\n   THEN\n      IF Mark >= 80\n         THEN\n            OUTPUT \"Distinction\"\n         ELSE\n            OUTPUT \"Pass\"\n      ENDIF\n   ELSE\n      OUTPUT \"Fail\"\nENDIF") +
      "<p>Mark 65: the first IF is true, the inner IF (65 >= 80) is false, so <b>Pass</b>.</p>" +
      pre("Evens ← 0\nFOR Number ← 1 TO 10\n   IF MOD(Number, 2) = 0\n      THEN\n         Evens ← Evens + 1\n   ENDIF\nNEXT Number") +
      "<p>An IF inside a FOR loop. The even numbers 2, 4, 6, 8, 10 are counted, so Evens = <b>5</b>.</p>",
    checks:[
      mc("Mark is 85 in the nested IF example. What is output?", "Distinction", ["Pass","Fail","Nothing is output"], "85 >= 50 is true and 85 >= 80 is true, so Distinction."),
      mc("How many times does the inner loop body run? <code>FOR Row ← 1 TO 3</code> containing <code>FOR Col ← 1 TO 4</code>", "12", ["7","3","4"], "The inner loop runs 4 times for each of the 3 outer passes: 3 × 4 = 12.")
    ] },

  { id:"8.1.6a", code:"8.1.6a", title:"Procedures, functions and parameters",
    concept:
      "<p>A <b>subroutine</b> is a named block of code that does one job and can be used many times. There are two kinds:</p>" +
      "<ul><li>A <b>procedure</b> runs a set of statements. It does <b>not</b> return a value.</li><li>A <b>function</b> runs statements and <b>returns one value</b> to where it was called.</li></ul>" +
      "<p>A <b>parameter</b> is a value passed into a subroutine, so that it can work with different data each time (the exam allows up to three parameters).</p>" +
      "<p>Why use subroutines? The code is <b>reused</b> instead of repeated, the program is <b>shorter and easier to read and test</b>, and different people can write different parts.</p>",
    example:
      "<table class='ln-table' style='text-align:left'><tr><th></th><th>Procedure</th><th>Function</th></tr><tr><th>Returns a value?</th><td>No</td><td>Yes, one value</td></tr><tr><th>Called with</th><td><code>CALL Name</code> (a complete statement)</td><td>Used within an expression, e.g. <code>OUTPUT Area(3, 4)</code></td></tr><tr><th>Example job</th><td>Print a line of dashes</td><td>Calculate and return an area</td></tr></table>",
    checks:[
      mc("What is the key difference between a procedure and a function?", "A function returns a value, a procedure does not", ["A procedure can have parameters but a function cannot","A function is run with CALL but a procedure is not","A procedure must contain a loop"], "Functions return a single value to the point where they were called."),
      mc("What is a parameter?", "A value passed into a subroutine", ["The name of a subroutine","A value returned by a procedure","A comment inside a program"], "Parameters let a subroutine work with different data each time it is called.")
    ] },

  { id:"8.1.6b1", code:"8.1.6b", title:"Defining and calling procedures",
    concept:
      "<p>Define a procedure at the start of the code and use <code>CALL</code> to run it.</p>" +
      pre("PROCEDURE <identifier>\n   <statements>\nENDPROCEDURE\n\nPROCEDURE <identifier>(<param> : <datatype>, ...)\n   <statements>\nENDPROCEDURE\n\nCALL <identifier>\nCALL <identifier>(Value1, Value2)") +
      "<p>When called, control passes to the procedure; when it finishes, control returns to the line after the CALL. The values given in the CALL must match the parameters in <b>number and type</b>.</p>",
    example:
      pre("PROCEDURE Line(Size : INTEGER)\n   DECLARE Length : INTEGER\n   FOR Length ← 1 TO Size\n      OUTPUT \"-\"\n   NEXT Length\nENDPROCEDURE\n\nCALL Line(3)\nCALL Line(5)") +
      "<p><code>CALL Line(3)</code> outputs 3 dashes, then <code>CALL Line(5)</code> outputs 5 dashes. One procedure, used twice, with different parameter values.</p>",
    checks:[
      mc("Which statement runs the procedure <code>Line</code> with the value 7?", "CALL Line(7)", ["Line ← 7","RUN Line","OUTPUT Line(7)"], "Procedures are called with CALL and their parameters in brackets."),
      mc("Where does the program continue when a procedure has finished?", "At the line after the CALL", ["At the start of the program","At the end of the program","At the next procedure"], "Control returns to the statement that follows the call.")
    ] },

  { id:"8.1.6b2", code:"8.1.6b", title:"Defining and using functions",
    concept:
      "<p>A function is defined with the data type it <b>RETURNS</b>, and uses <code>RETURN</code> to send back the value.</p>" +
      pre("FUNCTION <identifier>(<param> : <datatype>, ...) RETURNS <datatype>\n   <statements>\n   RETURN <value>\nENDFUNCTION") +
      "<ul><li>A function is called <b>inside an expression</b>. Do <b>not</b> use CALL for a function.</li><li>The returned value replaces the function call.</li></ul>",
    example:
      pre("FUNCTION SumSquare(Number1 : INTEGER, Number2 : INTEGER) RETURNS INTEGER\n   RETURN Number1 * Number1 + Number2 * Number2\nENDFUNCTION\n\nOUTPUT \"Sum of squares = \", SumSquare(10, 20)") +
      "<p>10 × 10 + 20 × 20 = 100 + 400 = <b>500</b>. The output is <code>Sum of squares = 500</code>.</p>",
    checks:[
      mc("<code>FUNCTION Double(N : INTEGER) RETURNS INTEGER</code> with <code>RETURN N * 2</code>. What is output by <code>OUTPUT Double(7)</code>?", "14", ["7","2","9"], "Double(7) returns 7 * 2 = 14."),
      mc("Which is the correct way to use a function that returns a value?", "Total ← Double(5)", ["CALL Double(5)","Double(5) ← Total","RETURN Double"], "A function call is part of an expression, so its returned value can be stored.")
    ] },

  { id:"8.1.6c", code:"8.1.6c", title:"Local and global variables",
    concept:
      "<ul><li>A <b>global variable</b> is declared in the <b>main program</b>. It can be used <b>anywhere</b>, including inside every subroutine.</li><li>A <b>local variable</b> is declared <b>inside a subroutine</b>. It exists only while that subroutine runs and cannot be used outside it.</li></ul>" +
      "<p>Local variables are safer: they cannot be changed by mistake by other parts of the program, and their names can be reused in different subroutines. Parameters also behave as local variables.</p>",
    example:
      pre("DECLARE Total : INTEGER       // global\nTotal ← 10\n\nPROCEDURE AddFive\n   DECLARE Extra : INTEGER   // local\n   Extra ← 5\n   Total ← Total + Extra\nENDPROCEDURE\n\nCALL AddFive\nOUTPUT Total") +
      "<p>Total is global, so the procedure can change it: the output is <b>15</b>. Extra is local: after the procedure ends it no longer exists, so using it in the main program would be an error.</p>",
    checks:[
      mc("Where is a local variable available?", "Only inside the subroutine where it is declared", ["Everywhere in the program","Only in the main program","In every subroutine except the one that declared it"], "Local variables exist only while their subroutine runs."),
      mc("Why are local variables preferred to global variables?", "Other parts cannot change them by mistake", ["They use less memory than constants do","They are quicker to type in the editor","They can store a larger amount of data"], "Keeping variables local reduces the risk of accidental changes and clashes.")
    ] },

  { id:"8.1.7", code:"8.1.7", title:"Library routines: MOD, DIV, ROUND and RANDOM",
    concept:
      "<p>A <b>library routine</b> is a ready-made subroutine that you can use without writing it. You must know four:</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Routine</th><th>Returns</th><th>Example</th></tr>" +
      "<tr><td><code>DIV(a, b)</code></td><td>Whole-number part of a ÷ b</td><td>DIV(10, 3) = 3</td></tr>" +
      "<tr><td><code>MOD(a, b)</code></td><td>Remainder of a ÷ b</td><td>MOD(10, 3) = 1</td></tr>" +
      "<tr><td><code>ROUND(x, places)</code></td><td>x rounded to the given number of decimal places</td><td>ROUND(3.14159, 2) = 3.14</td></tr>" +
      "<tr><td><code>RANDOM()</code></td><td>A random number from 0 to 1</td><td>0.37, 0.92 ...</td></tr></table>" +
      "<p>Useful tricks: <code>MOD(N, 2) = 0</code> tests for an <b>even</b> number. <code>DIV(N, 10)</code> removes the last digit and <code>MOD(N, 10)</code> gives the last digit. <code>ROUND(RANDOM() * 6, 0)</code> gives a random whole number from 0 to 6.</p>",
    example:
      pre("N ← 472\nHundreds ← DIV(N, 100)     // 4\nLastDigit ← MOD(N, 10)     // 2\nOUTPUT Hundreds, LastDigit") +
      "<p>472 ÷ 100 = 4 remainder 72, so DIV gives 4. 472 ÷ 10 = 47 remainder 2, so MOD gives 2. Output: <b>4 2</b>.</p>",
    checks:[
      mc("What does <code>ROUND(7.846, 1)</code> return?", "7.8", ["7.9","8","7.85"], "Rounded to 1 decimal place, 7.846 is 7.8."),
      mc("Which expression tests whether the whole number N is even?", "MOD(N, 2) = 0", ["DIV(N, 2) = 0","N / 2 = 0","ROUND(N, 2) = 0"], "An even number leaves a remainder of 0 when divided by 2.")
    ] },

  { id:"8.1.8", code:"8.1.8", title:"Creating maintainable programs",
    concept:
      "<p>A <b>maintainable</b> program is easy for other people (or you, later) to understand, fix and change. Use:</p>" +
      "<ul><li><b>Meaningful identifiers</b>: <code>NumberOfPlayers</code>, not <code>n</code>.</li><li><b>Comments</b> with <code>//</code> to explain what code does.</li><li><b>Procedures and functions</b> to split the program into small, named parts.</li><li><b>Constants</b> for fixed values, so they are changed in one place.</li><li><b>Indentation</b> to show the structure, and white space to separate sections.</li></ul>",
    example:
      "<p>Hard to maintain:</p>" +
      pre("x ← y * 0.2") +
      "<p>Easier to maintain:</p>" +
      pre("CONSTANT SalesTaxRate ← 0.2\n// calculate the tax due on a sale\nTaxDue ← SaleAmount * SalesTaxRate") +
      "<p>Anyone reading the second version knows what each part means, and the tax rate can be changed in one place.</p>",
    checks:[
      mc("Which identifier is the most meaningful for a variable that stores the number of lives left?", "LivesRemaining", ["x","N1","Data"], "A meaningful name tells the reader what the variable stores."),
      tx("Describe two ways a programmer can make a program easier for others to maintain.", [["meaningful","descriptive","sensible name","identifier","variable name"],["comment","//","explain"],["procedure","function","subroutine","modular","sections"],["constant"],["indent","white space","layout"]], 2, "Use meaningful identifiers so each name describes its data; add comments to explain the code; split the program into procedures and functions; use constants for fixed values; indent the code.")
    ] },

  // ---------- 8.2 Arrays ----------
  { id:"8.2.1", code:"8.2.1", title:"Declaring 1D and 2D arrays",
    concept:
      "<p>An <b>array</b> stores a <b>fixed number of items of the same data type</b> under one name. Each item (<b>element</b>) is reached by its <b>index</b>.</p>" +
      pre("DECLARE <identifier> : ARRAY[<lower>:<upper>] OF <datatype>           // 1D\nDECLARE <identifier> : ARRAY[<l1>:<u1>, <l2>:<u2>] OF <datatype>   // 2D") +
      "<ul><li>A <b>1D array</b> is a list. <code>DECLARE StudentNames : ARRAY[1:30] OF STRING</code> holds 30 names.</li><li>A <b>2D array</b> is a table with rows and columns. <code>DECLARE Board : ARRAY[1:3, 1:3] OF CHAR</code> holds 3 × 3 = 9 characters.</li><li>Number of elements in a 1D array = upper − lower + 1.</li></ul>",
    example:
      pre("DECLARE StudentNames : ARRAY[1:30] OF STRING\nDECLARE Board : ARRAY[1:3, 1:3] OF CHAR\nStudentNames[1] ← \"Ali\"\nBoard[2,3] ← 'X'") +
      "<p><code>StudentNames[1]</code> is the first name. <code>Board[2,3]</code> is the item in row 2, column 3.</p>",
    checks:[
      mc("How many elements are in <code>DECLARE Marks : ARRAY[1:25] OF INTEGER</code>?", "25", ["24","26","1"], "Indexes 1 to 25 give 25 elements."),
      mc("How many elements are in <code>DECLARE Grid : ARRAY[1:3, 1:4] OF INTEGER</code>?", "12", ["7","3","4"], "3 rows × 4 columns = 12 elements.")
    ] },

  { id:"8.2.2", code:"8.2.2", title:"Using arrays and index variables",
    concept:
      "<p>Use the index in square brackets to read or change an element: <code>Scores[3] ← 15</code>. The index can be a <b>number</b> or a <b>variable</b>: <code>Scores[Index]</code>. A variable index lets a loop work on every element without writing a line for each one.</p>" +
      "<p>You can do calculations with elements: <code>Total ← Total + Scores[Index]</code>, or copy one to another: <code>Names[Index + 1] ← Names[Index]</code>.</p>" +
      "<p>Why use an array instead of many variables? One name stores many related values, and loops can process them all.</p>",
    example:
      pre("Scores[1] ← 4\nScores[2] ← 8\nScores[3] ← 15\nScores[4] ← 16\nScores[5] ← 23\nIndex ← 3\nOUTPUT Scores[Index]          // 15\nOUTPUT Scores[Index + 1]      // 16") +
      "<p>The element is chosen by the value of Index. Changing Index to 5 would show 23.</p>",
    checks:[
      mc("Scores holds 4, 8, 15, 16, 23 in positions 1 to 5. What is <code>Scores[Index + 1]</code> when Index is 2?", "15", ["8","16","3"], "Index + 1 = 3, and Scores[3] is 15."),
      mc("Why use an array instead of 30 separate variables to store 30 names?", "A loop can process all the names using an index", ["Arrays store different data types","Arrays are faster at doing arithmetic","Arrays do not need to be declared"], "A single array can be processed with a loop and one variable index.")
    ] },

  { id:"8.2.3a", code:"8.2.3", title:"Reading and writing a 1D array with a loop",
    concept:
      "<p>Use a <b>FOR loop</b> with the loop counter as the <b>index</b> to write values into, and read values from, an array.</p>" +
      pre("// write: store 5 inputs\nFOR Index ← 1 TO 5\n   INPUT Scores[Index]\nNEXT Index\n\n// read: output all values and total them\nTotal ← 0\nFOR Index ← 1 TO 5\n   OUTPUT Scores[Index]\n   Total ← Total + Scores[Index]\nNEXT Index") +
      "<p>The same ideas as before work on arrays: totalling, counting, and finding the largest or smallest value.</p>",
    example:
      "<p>Scores are 4, 8, 15, 16, 23. Total is <b>66</b>. To count the scores above 10:</p>" +
      pre("Count ← 0\nFOR Index ← 1 TO 5\n   IF Scores[Index] > 10\n      THEN\n         Count ← Count + 1\n   ENDIF\nNEXT Index") +
      "<p>15, 16 and 23 are above 10, so Count = <b>3</b>.</p>",
    checks:[
      mc("An array holds 4, 8, 15, 16, 23. What is the total after the totalling loop?", "66", ["23","15","60"], "4 + 8 + 15 + 16 + 23 = 66."),
      mc("Which loop header is suitable for processing every element of <code>ARRAY[1:20]</code>?", "FOR Index ← 1 TO 20", ["FOR Index ← 0 TO 20","FOR Index ← 1 TO 19","WHILE Index = 20"], "The loop must run from the lower bound 1 to the upper bound 20.")
    ] },

  { id:"8.2.3b", code:"8.2.3", title:"2D arrays and nested loops",
    concept:
      "<p>A 2D array needs <b>two indexes</b> (row, column) and is processed with <b>nested loops</b>: the <b>outer</b> loop steps through the rows, the <b>inner</b> loop steps through the columns of each row.</p>" +
      pre("DECLARE Table : ARRAY[1:3, 1:3] OF INTEGER\nFOR Row ← 1 TO 3\n   FOR Column ← 1 TO 3\n      Table[Row, Column] ← Row * Column\n   NEXT Column\nNEXT Row"),
    example:
      "<p>This fills the table with the multiplication facts:</p>" +
      "<table class='ln-table'><tr><th></th><th>Col 1</th><th>Col 2</th><th>Col 3</th></tr><tr><th>Row 1</th><td>1</td><td>2</td><td>3</td></tr><tr><th>Row 2</th><td>2</td><td>4</td><td>6</td></tr><tr><th>Row 3</th><td>3</td><td>6</td><td>9</td></tr></table>" +
      "<p><code>Table[2,3]</code> is <b>6</b>. All nine values add up to 1+2+3+2+4+6+3+6+9 = <b>36</b>.</p>",
    checks:[
      mc("In the table above, what is the value of <code>Table[3,2]</code>?", "6", ["5","9","3"], "Row 3 × Column 2 = 6."),
      mc("How many times does the inner statement run for a 3 × 3 array processed with nested FOR loops?", "9", ["3","6","27"], "The inner loop runs 3 times for each of the 3 rows: 3 × 3 = 9.")
    ] },

  // ---------- 8.3 File handling ----------
  { id:"8.3.1", code:"8.3.1", title:"Why store data in a file?",
    concept:
      "<p>Variables and arrays are held in <b>RAM</b>, which is <b>volatile</b>: the data is lost when the program ends or the power is turned off. A <b>file</b> is stored on <b>secondary storage</b>, so the data is kept permanently.</p>" +
      "<p>Programs use files to:</p>" +
      "<ul><li>store data <b>between runs</b> (high scores, settings, customer records),</li><li>hold <b>large amounts of data</b> that would be tiresome to type in each time,</li><li><b>share</b> data between different programs or users.</li></ul>",
    example:
      "<p>A game saves the top 5 scores to <code>HighScores.txt</code> when it ends, and reads the file when it starts next time. Without the file, the scores would disappear every time the game closed.</p>",
    checks:[
      mc("Why does a program write its high scores to a file?", "So the data is kept after the program ends", ["So the scores are stored in RAM only","So the scores can be changed by the CPU","So the program always uses less memory"], "Files are on secondary storage, so the data is kept when the program ends."),
      mc("Why is data in variables lost when a program ends?", "It is stored in RAM, which is volatile", ["It is stored in ROM","It is encrypted","It is stored on the hard drive"], "Variables use RAM, which does not keep data without power or after the program finishes.")
    ] },

  { id:"8.3.2", code:"8.3.2", title:"Opening, reading, writing and closing a file",
    concept:
      "<p>Always follow these steps:</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li><b>Open</b> the file, stating the mode: <code>OPENFILE \"Scores.txt\" FOR WRITE</code> (a new file is created and any old data is lost) or <code>FOR READ</code>.</li><li><b>Write</b> data: <code>WRITEFILE \"Scores.txt\", Score</code>, or <b>read</b> data: <code>READFILE \"Scores.txt\", Score</code> into a variable.</li><li><b>Close</b> the file: <code>CLOSEFILE \"Scores.txt\"</code>.</li></ol>" +
      "<p>A file should be open in only <b>one mode at a time</b>. Closing makes sure all data is saved properly.</p>",
    example:
      pre("// save three scores\nOPENFILE \"Scores.txt\" FOR WRITE\nFOR Index ← 1 TO 3\n   INPUT Score\n   WRITEFILE \"Scores.txt\", Score\nNEXT Index\nCLOSEFILE \"Scores.txt\"\n\n// read the first score back\nOPENFILE \"Scores.txt\" FOR READ\nREADFILE \"Scores.txt\", FirstScore\nCLOSEFILE \"Scores.txt\"\nOUTPUT FirstScore") +
      "<p>If the first score typed was 12, the program outputs <b>12</b>.</p>",
    checks:[
      mc("Which statement opens a file so that data can be saved to it?", "OPENFILE \"Data.txt\" FOR WRITE", ["OPENFILE \"Data.txt\" FOR READ","CLOSEFILE \"Data.txt\"","READFILE \"Data.txt\", Item"], "WRITE mode is used to put data into a file."),
      mc("What is the purpose of CLOSEFILE?", "To finish using the file safely", ["To delete the file from the disk","To read the next item in the file","To open the file in write mode"], "A file should be closed when it is no longer needed.")
    ] }

  ];

  var TEST = {
    mcq:[
      mc("Which data type should be used to store the value TRUE or FALSE?", "BOOLEAN", ["CHAR","STRING","INTEGER"], "A BOOLEAN stores only TRUE or FALSE."),
      mc("What is the value of Count after <code>Count ← 0</code> and <code>FOR Index ← 1 TO 4</code> with <code>Count ← Count + 2</code> inside?", "8", ["4","6","2"], "Count increases by 2 four times: 2, 4, 6, 8."),
      mc("What does <code>DIV(23, 5)</code> return?", "4", ["3","5","18"], "23 ÷ 5 is 4 remainder 3, so DIV gives 4."),
      mc("A function that returns the area of a rectangle is called. Which statement is correct?", "It returns one value to where it was called", ["It is run with CALL","It cannot use parameters","It always outputs the result"], "A function returns one value that replaces the function call."),
      mc("What is the index of the last element of <code>ARRAY[1:12] OF STRING</code>?", "12", ["11","13","1"], "The array runs from index 1 to index 12.")
    ],
    typed:[
      { q:"Explain the difference between a WHILE loop and a REPEAT ... UNTIL loop.", groups:[["before","start","beginning","pre-condition","precondition"],["after","end","post-condition","postcondition"],["zero times","may not run","not run at all","never run","0 times","might not"],["at least once","once","always run","always runs","one time"]], need:3, model:"A WHILE loop tests its condition before the statements run, so it may run zero times. A REPEAT ... UNTIL loop tests the condition after the statements, so it always runs at least once. WHILE repeats while the condition is true; REPEAT repeats until it is true." },
      { q:"Write pseudocode that inputs 10 numbers into an array called Numbers and outputs the largest.", groups:[["array","numbers[","numbers ["],["for","repeat","while"],["input"],["largest","maximum","highest","biggest"],["if"],[">","greater","more"],["output","print"]], need:5, model:"FOR Index ← 1 TO 10, INPUT Numbers[Index], NEXT Index. Then Largest ← Numbers[1], FOR Index ← 2 TO 10, IF Numbers[Index] > Largest THEN Largest ← Numbers[Index], ENDIF, NEXT Index, then OUTPUT Largest." }
    ]
  };

  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat(LESSONS);
  (root.ILEARN_TESTS = root.ILEARN_TESTS || {})[8] = TEST;
})(typeof window !== "undefined" ? window : this);
