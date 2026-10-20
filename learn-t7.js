/* iLearn topic 7: Algorithm design and problem-solving (Cambridge IGCSE Computer Science 0478) */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx, fill = root.ILQ.fill;
  function pre(s){ return "<pre class='ln-pre'>" + s + "</pre>"; }
  var LESSONS = [

  { id:"7.1", code:"7.1", title:"The program development life cycle",
    concept:
      "<p>When a program is created, a structured plan called the <b>program development life cycle</b> is followed. It has four stages:</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Stage</th><th>What happens</th></tr>" +
      "<tr><td><b>1. Analysis</b></td><td>Find out <b>what the problem is</b> and what the program must do: the requirements, the inputs, processes and outputs. The problem is investigated and a requirements specification is written.</td></tr>" +
      "<tr><td><b>2. Design</b></td><td>Plan the solution <b>before</b> writing code, using <b>structure diagrams, flowcharts and pseudocode</b>.</td></tr>" +
      "<tr><td><b>3. Coding</b></td><td>Write the program in a programming language, following the design. Code is also tested as it is written.</td></tr>" +
      "<tr><td><b>4. Testing</b></td><td>Run the program with test data to check it <b>works, does not crash and meets the requirements</b>. Errors found are corrected.</td></tr></table>",
    example:
      "<p>A school wants a program to record house points.</p>" +
      "<ul><li><b>Analysis:</b> interview teachers; decide it must record points per student and show house totals.</li><li><b>Design:</b> draw a structure diagram and flowchart for adding points and showing totals.</li><li><b>Coding:</b> write the program from the design.</li><li><b>Testing:</b> enter normal and wrong data to see if it works. If an error appears, go back and fix it.</li></ul>",
    checks:[
      mc("In which stage of the program development life cycle is a flowchart drawn?", "Design", ["Analysis","Coding","Testing"], "Flowcharts, structure diagrams and pseudocode are produced in the design stage, before coding."),
      mc("What happens during the analysis stage?", "The problem is investigated and the needs are found", ["The program is written in a language","The program is run with test data","The solution is shown with a flowchart"], "Analysis finds out what the program must do. Coding writes it, testing runs it, design plans it.")
    ] },

  { id:"7.2a", code:"7.2", title:"Decomposition and structure diagrams",
    concept:
      "<p><b>Decomposition</b> means breaking a large problem down into smaller <b>sub-problems (sub-systems)</b>, and splitting those again, until each part is small enough to solve. Each part can then be solved on its own and made into a procedure or function.</p>" +
      "<p>A problem can be broken down into the parts of a system: <b>inputs</b>, <b>processes</b>, <b>outputs</b> and <b>storage</b>.</p>" +
      "<p>A <b>structure diagram</b> shows the decomposition as a tree: the program name is at the top and each level below breaks the box above into smaller tasks.</p>",
    example:
      "<p><b>Calculator program</b></p>" +
      pre("            Calculator\n      ___________|___________\n      |          |          |\n   Inputs     Process    Outputs\n   (2 numbers (add them) (show the\n   + symbol)             answer)") +
      "<p>Each of the boxes on the bottom row becomes its own small algorithm. Together they make the whole program.</p>",
    checks:[
      mc("What is decomposition?", "Breaking a problem down into smaller parts", ["Joining small programs into one","Testing a program with data","Translating a program to machine code"], "Decomposition splits a complex problem into smaller, easier sub-problems."),
      mc("What does a structure diagram show?", "How a problem is broken down into sub-systems", ["The order in which data is stored on a disk","The values of variables as a program runs","The errors in a program"], "A structure diagram is a hierarchy showing the problem split into sub-tasks.")
    ] },

  { id:"7.2b", code:"7.2", title:"Flowcharts",
    concept:
      "<p>A <b>flowchart</b> is a diagram of an algorithm. Each step is drawn in a <b>shape</b> and <b>arrows</b> show the order. Every shape has one job:</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Shape</th><th>Used for</th></tr>" +
      "<tr><td><b>Rounded rectangle (terminator)</b></td><td>START and END</td></tr>" +
      "<tr><td><b>Parallelogram</b></td><td>Input and output, e.g. INPUT Number, OUTPUT \"Valid\"</td></tr>" +
      "<tr><td><b>Rectangle</b></td><td>Process (calculation or assignment), e.g. Total ← Total + Number</td></tr>" +
      "<tr><td><b>Diamond</b></td><td>Decision: a question with two outcomes, YES and NO</td></tr>" +
      "<tr><td><b>Rectangle with double side lines</b></td><td>Subroutine: a call to a procedure or function drawn separately</td></tr></table>" +
      "<ul><li>START has <b>one arrow out</b>; END has <b>one arrow in</b>.</li><li>A decision has <b>one arrow in and two out</b>, labelled <b>YES</b> and <b>NO</b>.</li><li>Every flow line is an <b>arrow</b> that shows the direction.</li><li>Every path must lead to END: you must never get stuck.</li><li>A <b>loop</b> is an arrow that goes back up to an earlier step.</li></ul>",
    example:
      "<p>Look at the flowchart in the animation below. It inputs a number and says whether it is too small. START leads to an <b>INPUT</b> parallelogram, then a <b>decision</b> diamond asks <i>Number &lt; 10 ?</i>. The YES arrow goes to OUTPUT \"Too small\", the NO arrow goes to OUTPUT \"Valid\", and both arrows then lead to END.</p>" +
      "<p>Press <b>Step</b> to follow one number through the flowchart. Choose the other flowcharts to see a loop, a total, a maximum and a search drawn the same way.</p>",
    checks:[
      mc("Which flowchart symbol is used for a decision?", "Diamond", ["Parallelogram","Rectangle","Rounded rectangle"], "A diamond holds a question with a YES and a NO exit."),
      mc("Which flowchart symbol is used for input and output?", "Parallelogram", ["Diamond","Rectangle","Rounded rectangle"], "The parallelogram represents input and output."),
      mc("How many arrows leave a decision symbol, and how are they labelled?", "Two, labelled YES and NO", ["One, labelled NEXT","Two, with no labels","Three, labelled A, B and C"], "A decision is a question, so it has exactly two exits: YES and NO."),
      mc("In which symbol should Total ← Total + Number be drawn?", "Rectangle", ["Diamond","Parallelogram","Rounded rectangle"], "A calculation or assignment is a process, so it goes in a rectangle.")
    ] },

  { id:"7.2c", code:"7.2", title:"Pseudocode",
    concept:
      "<p><b>Pseudocode</b> is code-like writing that is not tied to any programming language and cannot be run. It is used to design algorithms, and later converted into a real language. The exam uses these conventions:</p>" +
      "<ul><li>Keywords in <b>UPPER CASE</b>: <code>INPUT</code>, <code>OUTPUT</code>, <code>IF</code>, <code>THEN</code>, <code>ELSE</code>, <code>ENDIF</code>, <code>FOR</code>, <code>NEXT</code>, <code>WHILE</code>, <code>ENDWHILE</code>.</li><li>Assignment uses the arrow <code>←</code>, e.g. <code>Total ← 0</code>.</li><li>Variable names use mixed case with no spaces: <code>NumberOfPlayers</code>.</li><li>Comments start with <code>//</code>.</li><li>Statements inside a structure are <b>indented</b>.</li></ul>" +
      "<p>What matters is that your <b>logic</b> is clear: each line must be one clear instruction.</p>",
    example:
      pre("INPUT Number1\nIF Number1 < 10\n   THEN\n      OUTPUT \"too small\"\n   ELSE\n      OUTPUT \"valid\"\nENDIF") +
      "<p>Invalid pseudocode (too vague to turn into code): <code>Input the value X and say if it is small</code>.</p>",
    checks:[
      mc("Which symbol is used for assignment in the exam pseudocode?", "←", ["==","=>","::"], "The assignment operator is ←, for example Counter ← Counter + 1."),
      mc("Which of these is a valid pseudocode statement?", "Total ← Total + Number", ["Add the number to the total","Total is increased by Number","Number goes into Total"], "A valid statement is a precise, code-like instruction. The others are vague descriptions.")
    ] },

  { id:"7.3", code:"7.3", title:"Explaining the purpose of an algorithm",
    concept:
      "<p>Sometimes you are given an algorithm and asked what it <b>does</b> (its purpose). Do not describe it line by line. Instead:</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>Find the <b>inputs</b> and <b>outputs</b>.</li><li>Look for familiar patterns: a variable that adds values (totalling), adds 1 (counting), is compared to find the largest/smallest, or <code>MOD</code> checks for even/odd.</li><li>Try the algorithm with <b>simple numbers</b> (a short trace table) to see what the output means.</li><li>Give the purpose in <b>one sentence</b> about the data, e.g. &ldquo;outputs the larger of two numbers&rdquo;.</li></ol>",
    example:
      pre("INPUT A\nINPUT B\nIF A > B\n   THEN\n      OUTPUT A\n   ELSE\n      OUTPUT B\nENDIF") +
      "<p>Try A = 3 and B = 8: 3 > 8 is false, so it outputs 8. Try A = 9, B = 2: it outputs 9. <b>Purpose: outputs the larger of two numbers.</b></p>" +
      pre("INPUT N\nIF MOD(N, 2) = 0\n   THEN OUTPUT \"Even\"\n   ELSE OUTPUT \"Odd\"\nENDIF") +
      "<p><b>Purpose:</b> says whether a whole number is even or odd (MOD gives the remainder after dividing by 2).</p>",
    checks:[
      mc("What is the purpose of this algorithm? <code>INPUT A, INPUT B, IF A > B THEN OUTPUT A ELSE OUTPUT B</code>", "It outputs the larger of two numbers", ["It adds the two numbers","It outputs the smaller number","It swaps the two numbers"], "If A is bigger, A is output; otherwise B is output, so the larger value always comes out."),
      mc("What does <code>MOD(N, 2) = 0</code> test?", "Whether N is an even number", ["Whether N is divisible by 10","Whether N is negative","Whether N is equal to 2"], "A remainder of 0 when dividing by 2 means N is even.")
    ] },

  { id:"7.4a", code:"7.4", title:"Totalling and counting",
    concept:
      "<p><b>Totalling</b> adds values together to give a total. <b>Counting</b> records how many times something happens or how many values there are.</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li><b>Initialise</b> the variable before the loop: <code>Total ← 0</code>, <code>Count ← 0</code>.</li><li>Inside the loop, <b>add the value</b> to the total: <code>Total ← Total + Number</code>.</li><li>Inside the loop, <b>add 1</b> to the count: <code>Count ← Count + 1</code>.</li></ol>" +
      "<p>The difference: totalling adds <b>the value</b>; counting adds <b>1</b>.</p>",
    example:
      pre("Total ← 0\nCount ← 0\nFOR Index ← 1 TO 3\n   INPUT Number\n   Total ← Total + Number\n   IF Number > 5\n      THEN\n         Count ← Count + 1\n   ENDIF\nNEXT Index\nOUTPUT Total, Count") +
      "<p>Inputs 4, 7, 2: Total becomes 4, then 11, then 13. Count goes up only for 7, so Count = 1. Output: <b>13 and 1</b>.</p>",
    checks:[
      mc("What is the difference between totalling and counting?", "Totalling adds the values; counting adds 1 each time", ["Totalling adds 1 each time; counting adds the values","Totalling needs a loop but counting does not","There is no difference"], "Total ← Total + Number adds the value. Count ← Count + 1 adds one."),
      fill("Complete the algorithm. It inputs 10 numbers, then outputs the <b>total</b> of all the numbers and <b>how many</b> of them are above 50.",
        "{1}\nCount ← 0\nFOR Index ← 1 TO 10\n   INPUT Number\n   {2}\n   IF Number > 50\n      THEN\n         {3}\n   ENDIF\nNEXT Index\nOUTPUT \"Total \", Total, \" Above 50 \", Count",
       [["Total ← 0", ["Total ← 1", "Number ← 0", "Total ← Number"]],
        ["Total ← Total + Number", ["Total ← Number", "Total ← Total + 1", "Count ← Count + Number"]],
        ["Count ← Count + 1", ["Count ← Count + Number", "Count ← 1", "Total ← Total + 1"]]],
        "The total starts at 0 and adds the value each time (Total + Number). The counter starts at 0 and adds 1 only when the number is above 50 (Count + 1)."),
      mc("What should be done to Total before a totalling loop starts?", "Set it to 0", ["Set it to 1","Leave it as it is","Set it to the first value input"], "A total must be initialised to 0, otherwise it may start with an unknown value.")
    ] },

  { id:"7.4b", code:"7.4", title:"Finding maximum, minimum and average",
    concept:
      "<p><b>Maximum (largest)</b></p>" +
      pre("Maximum ← -9999          // smaller than any value\nFOR Index ← 1 TO 10\n   INPUT Number\n   IF Number > Maximum\n      THEN\n         Maximum ← Number\n   ENDIF\nNEXT Index") +
      "<p><b>Minimum (smallest)</b> works the same way, but starts with a very <b>large</b> value and uses <code>Number &lt; Minimum</code>.</p>" +
      "<p><b>Average</b> (the mean) = total ÷ count. Use the totalling and counting you already know: <code>Average ← Total / Count</code>.</p>" +
      "<p><b>Initial values matter:</b> if numbers are between 20 and 200, start Smallest at 201 (or more) and Largest at 19 (or less).</p>",
    example:
      "<p>Numbers input: 12, 5, 19, 7. Maximum starts at -9999 &rarr; 12 &rarr; stays 12 (5 is not bigger) &rarr; 19 &rarr; stays 19. <b>Maximum = 19.</b></p>" +
      "<p>Average of 4, 7 and 1: Total = 12, Count = 3, so Average = 12 / 3 = <b>4</b>.</p>",
    checks:[
      mc("A program finds the smallest of a set of numbers, all between 20 and 200. Which starting value is suitable for Smallest?", "201", ["0","20","1"], "Smallest must start larger than any possible value so the first number input replaces it. If it started at 0, no number would ever be smaller."),
      fill("Complete the algorithm. It inputs 20 numbers, each between 20 and 200, and finds the <b>largest</b> and the <b>smallest</b>.",
        "Largest ← {1}\nSmallest ← {2}\nFOR Index ← 1 TO 20\n   INPUT Number\n   IF Number {3} Largest\n      THEN\n         Largest ← Number\n   ENDIF\n   IF Number {4} Smallest\n      THEN\n         Smallest ← Number\n   ENDIF\nNEXT Index",
       [["0", ["201", "300", "1000"]],
        ["500", ["0", "10", "19"]],
        [">", ["<", "=", "<>"]],
        ["<", [">", "=", ">="]]],
        "Largest must start BELOW every possible value (so the first number replaces it); Smallest must start ABOVE every possible value. A new number replaces Largest when it is greater than it, and replaces Smallest when it is less than it."),
      fill("Complete the algorithm. Numbers are input until -1 is entered (the -1 is not part of the data). It then outputs the <b>average</b>.",
        "Total ← 0\nCount ← 0\nREPEAT\n   INPUT Number\n   IF Number <> -1\n      THEN\n         Total ← {1}\n         Count ← {2}\n   ENDIF\nUNTIL Number = -1\nAverage ← {3}\nOUTPUT Average",
       [["Total + Number", ["Total + 1", "Number", "Total * Number"]],
        ["Count + 1", ["Count + Number", "1", "Count - 1"]],
        ["Total / Count", ["Count / Total", "Total * Count", "Total - Count"]]],
        "Average = total ÷ count. Totalling adds the VALUE (Total + Number); counting adds 1 (Count + 1). The -1 is skipped by the IF so it is not included."),
      mc("How is the average (mean) of a set of numbers calculated?", "Total divided by count", ["Maximum plus minimum","Count divided by total","Total multiplied by count"], "Average = Total / Count.")
    ] },

  { id:"7.4c", code:"7.4", title:"Linear search",
    concept:
      "<p>A <b>linear search</b> finds out whether a value is in a list. It checks each item <b>one at a time</b>, starting at the <b>first</b>, until it finds the value or reaches the <b>end</b> of the list. The data does <b>not</b> need to be sorted.</p>" +
      pre("Found ← FALSE\nIndex ← 1\nWHILE Found = FALSE AND Index <= 8 DO\n   IF DataArray[Index] = SearchValue\n      THEN\n         Found ← TRUE\n      ELSE\n         Index ← Index + 1\n   ENDIF\nENDWHILE") +
      "<p>Stopping as soon as the value is found makes the search <b>more efficient</b> than checking every item.</p>",
    example:
      "<p>Search <code>[5, 3, 9, 4, 8]</code> for 4:</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>5 &ne; 4</li><li>3 &ne; 4</li><li>9 &ne; 4</li><li>4 = 4: <b>found at position 4</b>. Stop.</li></ol>" +
      "<p>Search for 7: every item is checked, none match, and the end of the list is reached: <b>not found</b>.</p>",
    checks:[
      mc("How many comparisons does a linear search for 9 make in the list 5, 3, 9, 4, 8?", "3", ["1","2","5"], "It compares 5, then 3, then 9, which matches, so three comparisons."),
      fill("Complete the <b>linear search</b>. It searches an array <code>DataArray</code> with <b>8</b> items for <code>SearchValue</code>.",
        "Found ← FALSE\nIndex ← 1\nWHILE Found = FALSE AND Index <= {1} DO\n   IF DataArray[Index] = SearchValue\n      THEN\n         {2}\n      ELSE\n         {3}\n   ENDIF\nENDWHILE",
       [["8", ["7", "9", "1"]],
        ["Found ← TRUE", ["Found ← FALSE", "Index ← Index + 1", "Index ← 1"]],
        ["Index ← Index + 1", ["Index ← Index - 1", "Found ← TRUE", "Index ← 1"]]],
        "The loop stops when the value is found or Index passes the last item (8). If the item matches, set Found to TRUE; if not, move on to the next item with Index + 1."),
      fill("The search loop above has finished. Complete the code that <b>reports the result</b>.",
        "IF {1} = TRUE\n   THEN\n      OUTPUT \"Found at position \", {2}\n   ELSE\n      OUTPUT \"Not found\"\nENDIF",
       [["Found", ["Index", "SearchValue", "DataArray"]],
        ["Index", ["Found", "SearchValue", "DataArray[Index]"]]],
        "Found tells us whether the search succeeded. If it did, Index still holds the position where the value was found (the loop stopped before increasing it)."),
      mc("Which statement about a linear search is correct?", "The data does not need to be in order", ["The data must be sorted first","It starts in the middle of the list","It can only be used for numbers"], "A linear search checks items one by one so sorting is not needed.")
    ] },

  { id:"7.4d", code:"7.4", title:"Bubble sort",
    concept:
      "<p>A <b>bubble sort</b> puts a list into order by comparing <b>pairs of neighbouring items</b> and <b>swapping</b> them if they are in the wrong order. Repeated passes through the list move the largest values to the end like bubbles rising.</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>Compare items 1 and 2; swap if in the wrong order. Then items 2 and 3, and so on to the end. This is one <b>pass</b>.</li><li>Repeat passes. Stop when a whole pass has <b>no swaps</b>, or after (number of items &minus; 1) passes.</li></ol>" +
      "<p>For <b>ascending</b> order, swap when the left item is <b>greater</b> than the right. For <b>descending</b>, swap when the left is <b>smaller</b>.</p>",
    example:
      "<p>Sort <code>5 3 8 1</code> into ascending order:</p>" +
      "<table class='ln-table'><tr><th>Pass</th><th>List after the pass</th><th>Swaps</th></tr><tr><td>1</td><td>3 5 1 8</td><td>2</td></tr><tr><td>2</td><td>3 1 5 8</td><td>1</td></tr><tr><td>3</td><td>1 3 5 8</td><td>1</td></tr></table>" +
      "<p>Total swaps: 4. After pass 1 the largest value (8) is in the right place, after pass 2 the next largest (5), and so on.</p>",
    checks:[
      mc("Sort 6 2 5 1 into ascending order using a bubble sort. What is the list after the first pass?", "2 5 1 6", ["1 2 5 6","2 6 5 1","6 5 2 1"], "Pass 1: 6 swaps with 2, 5 and 1 in turn, so 6 ends up at the end: 2 5 1 6."),
      fill("Complete the <b>swap</b> inside an ascending <b>bubble sort</b>. <code>Numbers[Index]</code> and <code>Numbers[Index + 1]</code> are neighbours that are in the wrong order.",
        "IF Numbers[Index] > Numbers[Index + 1]\n   THEN\n      Temp ← {1}\n      Numbers[Index] ← {2}\n      Numbers[Index + 1] ← {3}\nENDIF",
       [["Numbers[Index]", ["Numbers[Index + 1]", "0", "Temp"]],
        ["Numbers[Index + 1]", ["Numbers[Index]", "Temp", "Numbers[Index - 1]"]],
        ["Temp", ["Numbers[Index]", "Numbers[Index + 1]", "0"]]],
        "A swap needs a temporary store: save the left value in Temp, copy the right value into the left place, then put the saved (old left) value into the right place."),
      fill("Complete the <b>bubble sort</b> for a list of 10 numbers. It repeats passes until a whole pass makes no swaps.",
        "REPEAT\n   Swapped ← {1}\n   FOR Index ← 1 TO {2}\n      IF Numbers[Index] > Numbers[Index + 1]\n         THEN\n            // swap the two items\n            Swapped ← {3}\n      ENDIF\n   NEXT Index\nUNTIL Swapped = {4}",
       [["FALSE", ["TRUE", "Index", "10"]],
        ["9", ["10", "11", "1"]],
        ["TRUE", ["FALSE", "Index", "0"]],
        ["FALSE", ["TRUE", "10", "0"]]],
        "Each pass starts with Swapped = FALSE and sets it to TRUE whenever a swap happens. With 10 items a pass compares 9 pairs (Index 1 to 9). When a pass ends with Swapped still FALSE, the list is sorted."),
      mc("When can a bubble sort stop?", "When a complete pass makes no swaps", ["When the first two items are in order","When it reaches the middle of the list","When the largest item is found"], "No swaps in a whole pass means the list is in order.")
    ] },

  { id:"7.5a", code:"7.5a", title:"Validation checks",
    concept:
      "<p><b>Validation</b> is an automatic check that data entered is <b>reasonable and sensible</b>. It does <b>not</b> prove that data is correct. There are six types:</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Check</th><th>What it checks</th><th>Example</th></tr>" +
      "<tr><td><b>Range check</b></td><td>Value is between a minimum and a maximum</td><td>Age between 0 and 100</td></tr>" +
      "<tr><td><b>Length check</b></td><td>Number of characters is acceptable</td><td>Password at least 8 characters</td></tr>" +
      "<tr><td><b>Type check</b></td><td>Data is the correct data type</td><td>Age is an integer, not text</td></tr>" +
      "<tr><td><b>Presence check</b></td><td>Something has been entered</td><td>Surname is not left empty</td></tr>" +
      "<tr><td><b>Format check</b></td><td>Data follows a set pattern</td><td>Date as NN/NN/NNNN</td></tr>" +
      "<tr><td><b>Check digit</b></td><td>A calculated digit matches</td><td>ISBN, barcode</td></tr></table>",
    example:
      pre("REPEAT\n   INPUT Age\nUNTIL Age >= 0 AND Age <= 100") +
      "<p>This is a <b>range check</b> in a loop: it keeps asking until the age is valid. Typing 25 as 52 would pass, because 52 is within the range: validation cannot tell which is correct.</p>",
    checks:[
      mc("A form must not be submitted with the surname box empty. Which validation check is this?", "Presence check", ["Range check","Type check","Format check"], "A presence check makes sure that data has been entered."),
      fill("Complete the <b>range check</b>. An age must be from 0 to 120; anything else is invalid and must be entered again.",
        "REPEAT\n   INPUT Age\n   IF Age {1} 0 {2} Age {3} 120\n      THEN\n         OUTPUT \"Invalid age, enter again\"\n   ENDIF\nUNTIL Age >= 0 AND Age <= 120",
       [["<", [">", "=", "<="]],
        ["OR", ["AND", "NOT", "XOR"]],
        [">", ["<", "=", ">="]]],
        "An age is invalid when it is below 0 OR above 120. Using <= or >= would wrongly reject the valid limits 0 and 120."),
      fill("Complete the <b>length check</b>. A password must have <b>at least 8 characters</b>.",
        "INPUT Password\nWHILE LENGTH(Password) {1} 8\n   OUTPUT \"Password must have at least 8 characters\"\n   INPUT Password\nENDWHILE",
       [["<", [">", "=", ">="]]],
        "The loop repeats while the password is too short: LENGTH(Password) < 8. A length of exactly 8 is acceptable."),
      fill("Complete the <b>presence check</b>. The name must not be left empty.",
        "INPUT Name\nWHILE Name {1} {2}\n   OUTPUT \"You must enter a name\"\n   INPUT Name\nENDWHILE",
       [["=", ["<>", ">", "<"]],
        ["\"\"", ["0", "NULL", "FALSE"]]],
        "A presence check makes sure something was entered. An empty string is \"\", so the loop repeats while Name = \"\"."),
      mc("Which validation check ensures that a postcode is in the pattern letter, letter, number?", "Format check", ["Length check","Range check","Presence check"], "A format check tests that data follows a set pattern.")
    ] },

  { id:"7.5b", code:"7.5b", title:"Verification, and how it differs from validation",
    concept:
      "<p><b>Verification</b> checks that data has been <b>copied or entered accurately</b> from the original source. Two methods:</p>" +
      "<ul><li><b>Visual check</b>: the user compares the data entered with the original, on screen or on paper.</li><li><b>Double entry</b>: the data is typed in <b>twice</b> (often by two people) and the computer compares the two copies. If they differ, an error is reported.</li></ul>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Validation</th><th>Verification</th></tr><tr><td>Checks data is <b>reasonable</b> (sensible, in range, right format)</td><td>Checks data was <b>entered accurately</b> (matches the original)</td></tr><tr><td>Done by the program automatically</td><td>Done by a person comparing, or by double entry</td></tr><tr><td>Data can pass but still be wrong</td><td>The original itself might still be wrong</td></tr></table>",
    example:
      "<p>When you create an account, you type your password twice. This is <b>double entry verification</b>: if the two entries differ, you made a typing error.</p>",
    checks:[
      mc("Which is a method of verification?", "Double entry", ["Range check","Check digit","Presence check"], "Visual check and double entry are the two verification methods. The others are validation."),
      mc("A user types 'twelve' where a number of items is needed. Which check would reject this?", "Type check", ["Double entry","Visual check","Presence check"], "A type check ensures the data is the correct data type, such as an integer.")
    ] },

  { id:"7.6", code:"7.6", title:"Test data: normal, abnormal, extreme and boundary",
    concept:
      "<p>Test data checks that a program works correctly. There are four types:</p>" +
      "<ul><li><b>Normal</b>: valid data that the program should accept.</li><li><b>Abnormal</b>: invalid data that the program should reject (wrong type, out of range).</li><li><b>Extreme</b>: the largest and smallest values that are <b>acceptable</b>.</li><li><b>Boundary</b>: values on either side of a limit: the <b>last accepted</b> value and the <b>first rejected</b> value.</li></ul>",
    example:
      "<p>A program accepts an age from 10 to 100 inclusive.</p>" +
      "<table class='ln-table'><tr><th>Type</th><th>Example data</th></tr><tr><td>Normal</td><td>35</td></tr><tr><td>Abnormal</td><td>-5, 150, &ldquo;twelve&rdquo;</td></tr><tr><td>Extreme</td><td>10 and 100</td></tr><tr><td>Boundary</td><td>9 and 10 (at the lower limit); 100 and 101 (at the upper limit)</td></tr></table>",
    checks:[
      mc("A program accepts whole numbers from 1 to 10 inclusive. Which value is extreme test data?", "10", ["11","5","-1"], "Extreme data is the largest or smallest value that is accepted, so 1 or 10."),
      mc("A program accepts whole numbers from 1 to 10 inclusive. Which value is abnormal test data?", "11", ["1","5","10"], "11 is outside the allowed range, so the program should reject it."),
      tx("A program accepts a whole number from 1 to 10 inclusive. Give one value for each type of test data: normal, abnormal, extreme and boundary.", [["5","2","3","4","6","7","8","9"],["0","11","-","twelve","abc","letter","word","text","decimal","1.5","12","100"],["1","10"],["0 and 1","1 and 0","10 and 11","11 and 10","0","11"]], 3, "Normal: any number from 1 to 10, e.g. 5. Abnormal: e.g. 15, -2 or the word 'ten'. Extreme: 1 or 10. Boundary: 0 and 1, or 10 and 11.")
    ] },

  { id:"7.7", code:"7.7", title:"Trace tables",
    concept:
      "<p>A <b>trace table</b> is used to follow an algorithm step by step (a <b>dry run</b>) to see what it does or to find errors.</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>Make a <b>column for every variable</b>, plus an <b>OUTPUT</b> column.</li><li>Follow the algorithm <b>one line at a time</b>. Do not guess ahead.</li><li>Each time a variable changes, write the <b>new value in a new row</b>.</li><li>Write what is output in the OUTPUT column.</li></ol>" +
      "<p>Only write down a value when it <b>changes</b> or is output.</p>",
    example:
      pre("Total ← 0\nCount ← 1\nWHILE Count <= 4 DO\n   Total ← Total + Count * 2\n   Count ← Count + 1\nENDWHILE\nOUTPUT Total") +
      "<table class='ln-table'><tr><th>Total</th><th>Count</th><th>Count &lt;= 4?</th><th>OUTPUT</th></tr><tr><td>0</td><td>1</td><td>yes</td><td></td></tr><tr><td>2</td><td>2</td><td>yes</td><td></td></tr><tr><td>6</td><td>3</td><td>yes</td><td></td></tr><tr><td>12</td><td>4</td><td>yes</td><td></td></tr><tr><td>20</td><td>5</td><td>no</td><td>20</td></tr></table>",
    checks:[
      mc("What is the value of Total after the loop? <code>Total ← 0, Count ← 1, WHILE Count &lt;= 4: Total ← Total + Count * 2, Count ← Count + 1</code>", "20", ["10","12","8"], "Total goes 2, 6, 12, 20 (adding 2, 4, 6 and 8)."),
      mc("What is the main purpose of a trace table?", "To follow an algorithm and record changing values", ["To draw a structure diagram of the system","To store data in a database table","To decide on the test data to use"], "A trace table is a dry run of an algorithm.")
    ] },

  { id:"7.8", code:"7.8", title:"Finding and correcting errors in algorithms",
    concept:
      "<p>To find errors, <b>trace</b> the algorithm with test data, compare the output with what it <b>should</b> be, and look at the line where the result first goes wrong. Common errors:</p>" +
      "<ul><li>A variable <b>not initialised</b> (or initialised to the wrong value, e.g. Largest ← 0 when numbers can be negative).</li><li><b>Off-by-one</b> loop errors (loop one time too many or too few).</li><li>The <b>wrong operator</b> (&lt; instead of &gt;, AND instead of OR).</li><li>Statements in the <b>wrong order</b> or inside/outside the wrong loop.</li><li>The wrong variable used.</li></ul>" +
      "<p>When you give a fix, write the <b>corrected line</b>.</p>",
    example:
      pre("Total ← 0\nFOR Index ← 1 TO 10\n   INPUT Number\n   Total ← Total + Number\nNEXT Index\nAverage ← Total / 9\nOUTPUT Average") +
      "<p><b>Error:</b> the total of 10 numbers is divided by 9. <b>Fix:</b> <code>Average ← Total / 10</code>.</p>" +
      pre("Largest ← 0\nFOR Index ← 1 TO 5\n   INPUT Number\n   IF Number > Largest\n      THEN Largest ← Number\n   ENDIF\nNEXT Index") +
      "<p><b>Error:</b> if all five numbers are negative, Largest stays 0. <b>Fix:</b> start with <code>Largest ← -9999</code>.</p>",
    checks:[
      mc("An algorithm to find the smallest of five numbers starts with <code>Smallest ← 0</code> and uses <code>IF Number &lt; Smallest</code>. What is the error?", "Smallest will stay 0 if every number is positive", ["The IF should use > instead of <","The loop runs one time too many","Smallest should be a string"], "A starting value of 0 is smaller than any positive number, so it is never replaced. Use a large starting value."),
      mc("An algorithm should add up 10 numbers but uses <code>FOR Index ← 1 TO 9</code>. What type of error is this?", "The loop runs one time too few", ["The wrong operator is used","A variable has not been initialised","The data type is wrong"], "The loop should be FOR Index ← 1 TO 10 to read 10 numbers.")
    ] },

  { id:"7.9", code:"7.9", title:"Writing an algorithm for a given problem",
    concept:
      "<p>To write an algorithm for a problem, follow these steps:</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>Identify the <b>inputs</b>, <b>processes</b> and <b>outputs</b>.</li><li>Choose the right <b>structures</b>: a <b>FOR</b> loop if you know how many times; <b>WHILE/REPEAT</b> if not; <b>IF</b> for decisions.</li><li>Decide which variables need <b>initialising</b> (totals, counts, maximum, minimum).</li><li>Write the pseudocode with proper <b>indentation</b> and the correct keywords.</li><li><b>Trace</b> it with a small test to check it works.</li></ol>",
    example:
      "<p><b>Problem:</b> input 10 marks, output the total and the average.</p>" +
      pre("Total ← 0\nFOR Index ← 1 TO 10\n   INPUT Mark\n   Total ← Total + Mark\nNEXT Index\nAverage ← Total / 10\nOUTPUT \"Total is \", Total\nOUTPUT \"Average is \", Average") +
      "<p>Inputs: 10 marks. Process: totalling and dividing. Output: total and average. A FOR loop is right because we know there are 10 marks.</p>",
    checks:[
      mc("An algorithm must read 30 test marks. Which loop is most suitable?", "A FOR loop", ["A WHILE loop with no condition","An IF statement","A CASE statement"], "A count-controlled FOR loop is used when the number of repeats is known."),
      fill("<b>Problem:</b> input 30 marks (0 to 100), then output the <b>average</b> and the <b>highest</b> mark. Complete the algorithm.",
        "Total ← 0\nHighest ← {1}\nFOR Index ← 1 TO {2}\n   INPUT Mark\n   Total ← Total + Mark\n   IF Mark {3} Highest\n      THEN\n         Highest ← Mark\n   ENDIF\nNEXT Index\nAverage ← {4}\nOUTPUT \"Average \", Average, \" Highest \", Highest",
       [["-1", ["101", "100", "30"]],
        ["30", ["29", "31", "100"]],
        [">", ["<", "=", "<>"]],
        ["Total / 30", ["Total * 30", "30 / Total", "Total + 30"]]],
        "Use a FOR loop because there are exactly 30 marks. Highest starts below every possible mark, is replaced when a mark is greater, and the average is the total divided by the number of marks."),
      tx("Write an algorithm in pseudocode that inputs 5 numbers and outputs their total.", [["total 0","total - 0","total0","sum 0","sum - 0"],["for","loop","repeat","while"],["input"],["total + ","total+","sum + ","sum+"],["output","print"]], 5, "Total ← 0, then FOR Index ← 1 TO 5, INPUT Number, Total ← Total + Number, NEXT Index, then OUTPUT Total.")
    ] }

  ];

  var TEST = {
    mcq:[
      mc("Which stage of the program development life cycle comes immediately before coding?", "Design", ["Analysis","Testing","Maintenance"], "The order is analysis, design, coding, testing."),
      mc("Which validation check makes sure a name box is not left empty?", "Presence check", ["Range check","Check digit","Type check"], "A presence check ensures that data has been entered."),
      mc("A program accepts exam marks from 0 to 100. Which value is abnormal test data?", "101", ["0","57","100"], "101 is outside the range and should be rejected."),
      mc("What is the first thing a bubble sort does in a pass?", "Compare the first two items", ["Find the smallest item","Divide the list in half","Compare the first and last items"], "A bubble sort compares neighbouring pairs, starting with the first two."),
      mc("Which of these correctly finds a running total?", "Total ← Total + Number", ["Total ← Number","Count ← Count + 1","Total ← 0"], "A running total adds each new value to the existing total.")
    ],
    typed:[
      { q:"Describe the difference between validation and verification.", groups:[["reasonable","sensible","acceptable","allowed","valid","in range","format"],["accurate","same as the original","copied","matches the original","entered correctly","double entry","visual check"],["does not mean correct","not correct","still be wrong","may still be incorrect","cannot check it is correct"],["automatic","program","computer"]], need:2, model:"Validation is an automatic check that data entered is reasonable (for example in range or the right format) but it does not prove the data is correct. Verification checks that data has been copied or entered accurately, for example by double entry or a visual check." },
      { q:"Explain how a linear search finds a value in a list.", groups:[["one at a time","each item","each value","in turn","one by one","every item"],["first","start","beginning"],["compare","check","match"],["found","stop","end of the list","last","not found"]], need:3, model:"A linear search starts at the first item and compares each item in turn with the search value. It stops when the value is found, or when the end of the list is reached without finding it." }
    ]
  };

  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat(LESSONS);
  (root.ILEARN_TESTS = root.ILEARN_TESTS || {})[7] = TEST;
})(typeof window !== "undefined" ? window : this);
