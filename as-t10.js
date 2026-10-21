/* iLearn AS Level (11BR) -- Topic 10 Data types and structures. Each ends with a REAL Cambridge 9618 Paper 2 question marked on the mark-scheme points. Pseudocode answers are checked for the mark-scheme features (heading, declarations, loop, test, return) -- not run. */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx, tbl = root.ASA.tbl, pre = root.ASA.pre, ASA = root.ASA;
  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat([

  { id:"10.1.1a", code:"10.1.1", title:"Choosing data types, evaluating expressions and using records",
    concept:
      tbl(["Type", "Holds", "Example"], [["INTEGER", "whole numbers", "Total * 2 (integer times integer)"], ["REAL", "numbers with a fractional part", "INT(ItemCost) / 3 (division gives a real)"], ["CHAR", "one character", "LEFT(MyName, 1)"], ["STRING", "text", "\"Odd OR Even\""], ["BOOLEAN", "TRUE or FALSE", "Sorted"], ["DATE", "a date", "SETDATE(17, 11, 2007)"]]) +
      "<h4>Useful operators and functions</h4>" +
      tbl(["Expression", "Result"], [["Tries MOD 4", "the remainder after division (9 MOD 4 = 1)"], ["Tries DIV 4", "whole-number part of the division (9 DIV 4 = 2)"], ["MID(ID, 3, 1)", "1 character from position 3 of the string"], ["TO_LOWER(x) / TO_UPPER(x)", "change case"], ["LENGTH(x)", "number of characters"], ["a &amp; b", "concatenation (joins strings)"]]) +
      "<h4>Records</h4>" +
      pre("TYPE Component\n   DECLARE Item_ID : STRING\n   DECLARE Reject : BOOLEAN\n   DECLARE Weight : REAL\nENDTYPE\nDECLARE Batch : ARRAY[1:1000] OF Component\n\nBatch[ThisIndex].Weight    // dot notation reads one field of one record") +
      "<p>Good practice: <b>meaningful identifier names</b> (not A, B, C, D) that show the purpose, so the program is easier to understand, debug and maintain; also comment, indent and declare variables.</p>",
    example:
      "<p>With Sorted = FALSE, Tries = 9, ID = \"ZGAC001\": <code>Tries &lt; 10 AND NOT Sorted</code> is TRUE AND TRUE = <b>TRUE</b>. <code>Tries MOD 4</code> = <b>1</b>. <code>MID(ID, 3, 1)</code> = \"A\" so <code>TO_LOWER(&hellip;)</code> = <b>\"a\"</b>. <code>LENGTH(ID &amp; \"xx\")</code> = 9 so <code>9 &gt;= 9</code> = <b>TRUE</b>.</p>",
    checks:[
      mc("Which data type is best for the result of INT(ItemCost) / 3?", "REAL", ["BOOLEAN", "CHAR", "DATE"], "Division can give a fractional result."),
      mc("What is 17 MOD 5?", "2", ["3", "3.4", "12"], "17 = 3 x 5 + 2."),
      mc("What does Batch[ThisIndex].Weight refer to?", "The Weight field of the record at position ThisIndex", ["The whole array", "The index only", "A function call"], "Dot notation reads a field of a record."),
      tx("State why the variable names A, B, C and D are not suitable. [1]", [["meaning","indicate","reflect","purpose","describe","understand"]], 1, "The names do not reflect / indicate the purpose of the variable."),
      ASA.pp("9618/21 May/June 2024 · Question 1(a) and (b)", "Decide the type of each result: LEFT gives a character/string; integer arithmetic gives INTEGER; dividing gives REAL; text in quotes is STRING.",
        [ ASA.fields("(a)", 4, "Give an appropriate data type to declare each of the variables A, B, C and D.<br>A &larr; LEFT(MyName, 1) &nbsp;&nbsp; B &larr; Total * 2 &nbsp;&nbsp; C &larr; INT(ItemCost) / 3 &nbsp;&nbsp; D &larr; \"Odd OR Even\"",
            [ ["A", ["char", "string"], "text", "CHAR / STRING", 1], ["B", ["integer", "real"], "text", "INTEGER / REAL", 1], ["C", ["real"], "text", "REAL", 1], ["D", ["string"], "text", "STRING", 1] ],
            { lead: "One mark per row:" }),
          ASA.fields("(b)", 4, "Other variables have the values: Sorted = False, Tries = 9, ID = \"ZGAC001\". Evaluate each expression (type TRUE/FALSE, a number or the text).<br>1. Tries &lt; 10 AND NOT Sorted &nbsp; 2. Tries MOD 4 &nbsp; 3. TO_LOWER(MID(ID, 3, 1)) &nbsp; 4. LENGTH(ID &amp; \"xx\") &gt;= Tries",
            [ ["Expression 1", ["true"], "text", "TRUE", 1], ["Expression 2", ["1"], "text", "1", 1], ["Expression 3", ["a", "\"a\"", "'a'"], "text", "\"a\"", 1], ["Expression 4", ["true"], "text", "TRUE", 1] ],
            { lead: "One mark per row:" }),
          ASA.text("(2024 J23 Q3(a)(i))", 3, "A record type Component has fields Item_ID, Reject and Weight; the global array Batch holds 1000 records. Min and Max hold the inclusive acceptable weights. Write a pseudocode clause to check whether the weight of the component at index ThisIndex is within the acceptable range.",
            [ ["Reference to Batch[ThisIndex].Weight", ["re:batch\\s*\\[\\s*thisindex\\s*\\]\\s*\\.\\s*weight"]], ["A valid check for one boundary", ["re:weight\\s*>=\\s*min", "re:weight\\s*<\\s*min", "re:min\\s*<=\\s*batch", "re:max\\s*>=\\s*batch", "re:weight\\s*<=\\s*max", "re:weight\\s*>\\s*max"]], ["A valid check for the other boundary with the correct logic operator", ["re:weight\\s*>=\\s*min[\\s\\S]*\\band\\b[\\s\\S]*weight\\s*<=\\s*max", "re:weight\\s*<=\\s*max[\\s\\S]*\\band\\b[\\s\\S]*weight\\s*>=\\s*min", "re:weight\\s*<\\s*min[\\s\\S]*\\bor\\b[\\s\\S]*weight\\s*>\\s*max", "re:weight\\s*>\\s*max[\\s\\S]*\\bor\\b[\\s\\S]*weight\\s*<\\s*min"]] ],
            { lead: "One mark each:", lines: 3, code: true, model: "IF Batch[ThisIndex].Weight >= Min AND Batch[ThisIndex].Weight <= Max THEN", scheme: "<p>Example solution using AND:</p><pre>IF Batch[ThisIndex].Weight >= Min AND\n   Batch[ThisIndex].Weight <= Max THEN</pre><p>Alternative using OR:</p><pre>IF Batch[ThisIndex].Weight < Min OR\n   Batch[ThisIndex].Weight > Max THEN</pre>" }) ])
    ] },

  { id:"10.2.1a", code:"10.2.1", title:"Arrays: looping through a 1D array to total and compare",
    concept:
      "<p>An <b>array</b> stores many values of the <b>same type</b> under one name, each accessed by an <b>index</b>. <code>DECLARE Data : ARRAY[1:100] OF INTEGER</code> makes 100 elements, <code>Data[1]</code> to <code>Data[100]</code>. A 2D array uses two indexes: <code>Sample[ThisUser, ThisSample]</code>.</p>" +
      "<p><b>Standard pattern for processing an array:</b></p>" +
      pre("DECLARE Total, Index : INTEGER\nTotal <- 0\nFOR Index <- 1 TO 100\n   Total <- Total + Data[Index]\nNEXT Index") +
      "<ul><li><b>Odd or even index:</b> <code>Index MOD 2 = 0</code> is true for even positions.</li><li><b>Linear search:</b> loop through the array comparing each element with the search value; stop (or count) when found.</li><li><b>Bubble sort:</b> repeat passes comparing neighbouring elements and swapping them if they are in the wrong order until a pass makes no swaps.</li></ul>",
    example:
      "<p>To compare the total of odd positions with the total of even positions: declare <code>Odd</code>, <code>Even</code> and <code>Index</code>; set both totals to 0; loop <code>Index</code> from 1 to 100; inside the loop test <code>Index MOD 2 = 0</code> to add <code>Data[Index]</code> to <code>Even</code>, otherwise to <code>Odd</code>; <b>after</b> the loop compare the totals and return 'Odd', 'Even' or 'Same'.</p>",
    checks:[
      mc("How many elements are in DECLARE Data : ARRAY[1:100] OF INTEGER?", "100", ["99", "101", "1"], "Index 1 to 100 inclusive."),
      mc("Which condition is true for even index values?", "Index MOD 2 = 0", ["Index DIV 2 = 0", "Index = 2", "Index MOD 2 = 1"], "Even numbers have remainder 0."),
      mc("Where must the totals be compared in the Check() function?", "After the loop has finished", ["Inside the loop on every pass", "Before the loop", "In a separate program"], "Both totals are only complete after the loop."),
      tx("Why must Odd and Even be set to 0 before the loop? [1]", [["add","total","accumulat","start","initial","garbage","unknown","undefined","contain"]], 1, "So the totals start from zero; otherwise they would contain unknown values before values are added."),
      ASA.pp("9618/21 May/June 2024 · Question 4", "Marks: heading + return type; declare Odd, Even, Index; initialise totals; loop for 100 iterations; sum into the right total inside the loop; compare after the loop and return the right string.",
        [ ASA.text("", 6, "A global 1D array Data contains 100 elements of type integer. A function Check() will: total the element values in odd index locations (1, 3, 5 ... 99); total the element values in even index locations (2, 4, 6 ... 100); return one of three strings 'Odd', 'Even' or 'Same' to indicate which total is the greater, or whether the totals are the same. Write pseudocode for the function Check().",
            [ ["1. Function heading, ending and return type", ["re:function\\s+check\\s*\\(\\s*\\)\\s*returns\\s+string[\\s\\S]*endfunction"]], ["2. Declare local variables Odd, Even and Index as integers", ["re:declare[^:]*\\bodd\\b[^:]*:\\s*integer", "re:declare\\s+odd\\s*:\\s*integer"], ["re:declare[^:]*\\beven\\b[^:]*:\\s*integer", "re:declare\\s+even\\s*:\\s*integer"], ["re:declare[^:]*\\bindex\\b[^:]*:\\s*integer", "re:declare\\s+index\\s*:\\s*integer"]], ["3. Initialise Odd and Even", ["re:\\bodd\\s*<?\\s*0\\b"], ["re:\\beven\\s*<?\\s*0\\b"]], ["4. Loop for 100 iterations // through the array", ["re:for\\s+\\w+\\s*<?\\s*1\\s+to\\s+100", "re:(while|repeat)[\\s\\S]*100"]], ["5. Sum Odd and Even element values in a loop", ["re:(odd|even)\\s*<?\\s*(odd|even)\\s*\\+\\s*data\\s*\\[\\s*\\w+\\s*\\]"], ["re:mod\\s*2"]], ["6. Compare Odd and Even after the loop and return the appropriate string", ["re:return\\s+odd"], ["re:return\\s+even"], ["re:return\\s+same"]] ],
            { lead: "One mark for each point:", lines: 16, code: true, model: "FUNCTION Check() RETURNS STRING\n DECLARE Odd, Even, Index : INTEGER\n Odd <- 0\n Even <- 0\n FOR Index <- 1 TO 100\n  IF Index MOD 2 = 0 THEN\n   Even <- Even + Data[Index]\n  ELSE\n   Odd <- Odd + Data[Index]\n  ENDIF\n NEXT Index\n IF Odd > Even THEN\n  RETURN \"Odd\"\n ELSE\n  IF Even > Odd THEN\n   RETURN \"Even\"\n  ELSE\n   RETURN \"Same\"\n  ENDIF\n ENDIF\nENDFUNCTION", scheme: "<p>Example answer (not the only correct one):</p><pre>FUNCTION Check() RETURNS STRING\n   DECLARE Odd, Even, Index : INTEGER\n   Odd <- 0\n   Even <- 0\n   FOR Index <- 1 TO 100\n      IF Index MOD 2 = 0 THEN\n         Even <- Even + Data[Index]\n      ELSE\n         Odd <- Odd + Data[Index]\n      ENDIF\n   NEXT Index\n   IF Odd > Even THEN RETURN \"Odd\" ENDIF\n   IF Even > Odd THEN RETURN \"Even\" ENDIF\n   RETURN \"Same\"\nENDFUNCTION</pre>", note: "Keyword marking checks these features in your text. It cannot run your logic, so compare your answer with the example solution above." }) ])
    ] },

  { id:"10.3.1a", code:"10.3.1", title:"Text files: why we need them and how to read them",
    concept:
      "<p>Variables and arrays lose their values when the program ends. <b>Files</b> store data <b>permanently</b> so it can be used again, shared, or backed up.</p>" +
      pre("OPENFILE \"Stock.txt\" FOR READ\nWHILE NOT EOF(\"Stock.txt\")\n   READFILE \"Stock.txt\", ThisLine\n   // process ThisLine\nENDWHILE\nCLOSEFILE \"Stock.txt\"") +
      "<ul><li>Modes: <b>READ</b>, <b>WRITE</b> (replaces the contents) and <b>APPEND</b> (adds to the end).</li><li><code>EOF(file)</code> returns TRUE when the end of the file is reached; loop until then.</li><li>Always <b>close</b> the file after use.</li></ul>",
    example:
      "<p>A procedure <code>FileToQueue()</code> must add each line of a file to a queue until all lines are added <b>or the queue is full</b>. In words: open the file in read mode; loop while not at the end of the file; read a line; pass it to <code>AddToQueue()</code>; stop looping when that function returns FALSE (queue full); close the file.</p>",
    checks:[
      mc("Why are files needed?", "To store data permanently when the program is not running", ["To make the CPU faster", "To compress arrays", "To avoid using variables"], "Memory is volatile."),
      mc("Which file mode adds data to the end of an existing file?", "APPEND", ["READ", "WRITE", "EOF"], "WRITE replaces the contents."),
      mc("What does EOF return when there is no more data to read?", "TRUE", ["FALSE", "0", "An empty line"], "EOF = end of file."),
      tx("State one reason why a program stores data in a text file. [1]", [["permanent","saved","keep","after the program","power","reuse","re-use","backup","share"]], 1, "Data is kept permanently so it is available after the program ends."),
      ASA.pp("9618/22 May/June 2023 · Question 3(b)", "Describe the algorithm in words (no pseudocode): open for read, loop to the end of the file, read a line in the loop, pass it to AddToQueue(), end the loop when it returns FALSE (queue full).",
        [ ASA.text("(b)", 5, "A procedure FileToQueue() will add each line from a text file to a queue using the function AddToQueue(), which takes a string as a parameter, adds it to the queue and returns TRUE if the string was added successfully. FileToQueue() will end when all lines have been added or when the queue is full. Describe the algorithm for procedure FileToQueue(). Do not use pseudocode in your answer.",
            [ ["1 Open the file in READ mode", ["open"], ["read mode", "for read", "reading", "read"]], ["2 Loop to EOF // read / process all the lines in the file", ["eof", "end of file", "end of the file", "all the lines", "every line", "each line", "until"]], ["3 The loop will end when the return value from AddToQueue() is FALSE // the queue is full", ["false", "queue is full", "queue full", "full"]], ["4 Read a line from the file in a loop", ["read a line", "reads a line", "read each line", "read the next line", "read one line", "next line", "line from the file"]], ["5 Pass the string to AddToQueue() // AddToQueue() is executed with the line as parameter", ["addtoqueue", "add to queue", "pass", "parameter", "call"]] ],
            { lead: "One mark per bullet:", lines: 7 }) ])
    ] },

  { id:"10.4.1a", code:"10.4.1", title:"Stacks and queues built from arrays",
    concept:
      "<p>An <b>abstract data type (ADT)</b> is a data structure defined by what it does, not how it is stored.</p>" +
      tbl(["ADT", "Rule", "Pointers"], [["<b>Stack</b>", "<b>last in, first out</b> (LIFO): push onto the top, pop from the top", "TopOfStack (last item added), BottomOfStack (first item)"], ["<b>Queue</b>", "<b>first in, first out</b> (FIFO): add at the end, remove from the front", "Front (next to remove), End (last added); a <b>circular</b> queue reuses locations"], ["<b>Linked list</b>", "items hold a data value and a pointer to the next item; easy to insert in the middle", "Start pointer, next pointers, free-list pointer"]]) +
      "<h4>Push() on an array stack of 8 elements</h4>" +
      "<ol><li>If TopOfStack = 8 (stack is full) then return FALSE.</li><li>Otherwise, <b>increment</b> TopOfStack.</li><li>Use TopOfStack as an index to the array.</li><li>Set the element at this index to the value being added.</li><li>Return TRUE.</li></ol>" +
      "<h4>Adding to a circular queue</h4>" +
      "<p>Check the queue is not full; move the End pointer on one place (wrapping from the last location back to 0); store the item at the location the End pointer references.</p>",
    example:
      "<p>A queue of 10 locations (0&ndash;9) has Front at 5 and End at 8. Adding Orange: End moves to 9 and Orange is stored in location 9. Adding Yellow: End wraps round to 0 and Yellow is stored in location 0. This wrap-around is what makes the queue <b>circular</b>.</p>",
    checks:[
      mc("Which ADT is last in, first out?", "Stack", ["Queue", "Linked list", "Array"], "A stack is LIFO."),
      mc("A circular queue has 10 locations 0&ndash;9 and End is at 9. After adding an item, End points to&hellip;", "0", ["10", "9", "1"], "It wraps round."),
      mc("What must Push() check before adding to an array-based stack?", "That the stack is not full", ["That the stack is empty", "That the array is sorted", "That the data is a string"], "Otherwise the data would overflow the array."),
      tx("Describe the steps of Push() on a stack stored in an 8-element array with the variable TopOfStack. [3]", [["full","= 8","equals 8","8"],["increment","add 1","+ 1","move"],["index","element","array"],["return"]], 3, "If the stack is full return FALSE; otherwise increment TopOfStack, store the value in the element at TopOfStack, return TRUE."),
      ASA.pp("9618/21 October/November 2023 · Question 3(b) and 9618/22 May/June 2023 · Question 3(a)(i)", "Push: full check → increment pointer → use as index → store → return TRUE. Circular queue: check not full, move End (wrap to 0), store the item.",
        [ ASA.text("(3(b))", 5, "A stack is implemented using the variable TopOfStack and a 1D array of 8 elements. A function Push() will add a value onto the stack. Before adding a value, the algorithm will check that space is available. If the value is added, the function returns TRUE, otherwise FALSE. Write the steps of the algorithm (in words).",
            [ ["MP1 If TopOfStack = 8 // the stack is full then return FALSE", ["full", "= 8", "equals 8", "is 8", "8"], ["false"]], ["MP2 Otherwise, increment TopOfStack", ["increment", "add 1", "+ 1", "plus 1", "increase"]], ["MP3 Use TopOfStack as an index to the array", ["index", "element at", "location", "position"]], ["MP4 Set the element at this index / location to the value / item being added", ["set", "store", "assign", "put", "add", "write", "place"], ["value", "item", "data"]], ["MP5 Return TRUE", ["return true", "returns true", "true"]] ],
            { lead: "One mark for each point:", lines: 6 }),
          ASA.text("(3(a)(i))", 4, "A circular queue of 10 locations (0 to 9) has the Front of Queue pointer at location 5 and the End of Queue pointer at location 8. Describe how the data items Orange and Yellow are added to the queue.",
            [ ["1 Check that the queue is not full", ["not full", "space", "full"]], ["2 The End of Queue pointer moves to location 9", ["9"], ["pointer", "end", "eoq"]], ["3 Orange is stored in the location referenced by the End of Queue pointer", ["orange"], ["stored", "store", "added", "location 9", "placed", "put"]], ["4 The End of Queue pointer moves to location 0", ["0", "zero", "start", "wrap", "beginning", "first location"], ["pointer", "end", "eoq"]], ["5 Yellow is stored in the location referenced by the End of Queue pointer", ["yellow"], ["stored", "store", "added", "location 0", "placed", "put"]] ],
            { lead: "One mark per point, maximum 4:", max: 4, lines: 6 }) ])
    ] }

  ]);
})(typeof window !== "undefined" ? window : this);
