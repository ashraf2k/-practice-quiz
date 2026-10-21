/* iLearn AS Level (11BR) -- Topic 9 Algorithm design and problem-solving (additional lessons). Each ends with a REAL Cambridge 9618 Paper 2 question marked on the mark-scheme points. */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx, tbl = root.ASA.tbl, ASA = root.ASA;
  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat([

  { id:"9.1.1a", code:"9.1.1", title:"Abstraction: keep what matters, hide the rest",
    concept:
      "<p><b>Abstraction</b> means <b>filtering out unnecessary detail</b> so you keep only the information that the problem needs. A London Underground map is the classic example: it shows stations and connections, but not the real distances or street layout.</p>" +
      "<ul><li><b>Purpose / benefit:</b> it makes the problem <b>easier to design, implement and solve</b>.</li><li>To abstract a problem, ask for each piece of information: <b>'Is it needed by this module? What for?'</b></li><li>Abstraction also decides which <b>operations</b> the model needs (for example add a member to a list, remove a member).</li></ul>",
    example:
      "<p>A fitness club stores name, address, email, mobile number, date of birth and interests for every member. A new module only sends personalised text messages about a class. It needs: <b>mobile number</b> (to send the text), <b>name</b> (to personalise it), and <b>exercise interest</b> (to know who to text). It does <b>not</b> need the address, email or date of birth &mdash; abstraction leaves them out.</p>" +
      "<p><b>Always justify:</b> in the exam each item needs its reason, linked to the scenario.</p>",
    checks:[
      mc("What is abstraction?", "Removing unnecessary detail to keep only what is needed", ["Breaking a problem into modules", "Testing a program", "Converting code to machine code"], "Abstraction filters out unnecessary information."),
      mc("Which is an advantage of abstraction?", "It makes the problem easier to solve", ["It makes programs run on any computer", "It removes the need for testing", "It encrypts the data"], "Less detail means a simpler problem."),
      mc("A map of a bus network shows stops and routes but not building heights. This is an example of&hellip;", "Abstraction", ["Decomposition", "Iteration", "Validation"], "Unneeded detail is left out."),
      tx("State one advantage of applying abstraction to a problem. [1]", [["easier","simpler","simplif","less complex","reduce"]], 1, "It makes the problem easier to design, implement or solve."),
      ASA.pp("9618/21 May/June 2024 · Question 7(a)", "Pick the three items the text-message module truly needs, and justify each with the scenario (send the message, personalise it, decide who is interested).",
        [ ASA.text("(a)(i)", 1, "A fitness club stores for each member: name, home address, email address, mobile phone number, date of birth and the exercise(s) they are interested in. A new module will send personalised text messages to each member interested in a planned class. The process of abstraction is used to filter out unnecessary information. State one advantage of applying abstraction to this problem.",
            [ ["To make the solution easier to design / implement / solve", ["easier", "simpler", "simplif", "less complex", "reduce"]] ],
            { lead: "1 mark for:", lines: 2 }),
          ASA.text("(a)(ii)", 3, "Identify three items of information that will be required by the new module. Justify your choices with reference to the given scenario.",
            [ ["Mobile phone number: to send the text message", ["mobile", "phone number", "telephone number", "cell number"], ["send", "text", "message", "contact", "sms"]], ["Name: to personalise the text message", ["name"], ["personal", "address the", "greet", "message"]], ["Exercise interest: to determine whether this member would be interested", ["interest", "exercise", "class"], ["determine", "interested", "which members", "who to", "select", "relevant", "decide", "filter"]] ],
            { lead: "1 mark for each item with its justification:", lines: 4 }),
          ASA.text("(a)(iii)", 2, "Identify two operations that would be required to process data when the new module receives a text message back from a member.",
            [ ["Add the member to a list of those interested in the new class", ["add", "list", "interested", "join", "sign up", "register", "enrol", "record"]], ["Remove the member from future SMS messages (when the reply is STOP)", ["remove", "stop", "opt out", "delete", "unsubscribe", "future"]] ],
            { lead: "Examples (1 mark each):", lines: 3 }) ])
    ] },

  { id:"9.2.3a", code:"9.2.3", title:"Stepwise refinement: from one idea to pseudocode-ready steps",
    concept:
      "<p><b>Stepwise refinement</b> means starting with a general description of the algorithm and breaking it into smaller, more detailed steps until each step can be written as one pseudocode statement. The steps use <b>words, not code</b> (structured English).</p>" +
      "<ol><li>Write the whole task in one line.</li><li>Split into: <b>initialise</b>, <b>input/process</b> (inside a loop if repeated), <b>output</b>.</li><li>Make every step <b>precise</b>: say what is compared, what is added, how many repetitions.</li><li>Check you can see the three constructs: <b>sequence</b>, <b>selection</b> (a check) and <b>iteration</b> (a repeat).</li></ol>" +
      "<p>A logic statement (a condition) such as <i>'greater than 29 and less than 71'</i> is a correct way to define 30&ndash;70 inclusive.</p>",
    example:
      "<p>Task: 'Total the numbers between 30 and 70 inclusive out of 100 numbers.' Refinement: (1) set the total to zero; (2) input a number; (3) check whether the number is greater than 29 and less than 71; (4) if so, add it to the total; (5) repeat from step 2 for 100 numbers; (6) output the total.</p>" +
      "<p>The constructs needed: <b>iteration</b> (count-controlled loop) and <b>selection</b> (IF statement).</p>",
    checks:[
      mc("In stepwise refinement, the steps should be written&hellip;", "In words that describe each action, not in pseudocode statements", ["As machine code", "As flowcharts only", "In the shortest possible form"], "The question says do not use pseudocode."),
      mc("Which two constructs, besides sequence, are needed to total only values between 30 and 70 from 100 inputs?", "Iteration and selection", ["Recursion and arrays", "Selection only", "Files and records"], "A loop for 100 inputs and an IF for the range."),
      mc("Which condition tests that N is between 30 and 70 inclusive?", "N &gt; 29 AND N &lt; 71", ["N &gt; 30 AND N &lt; 70", "N &lt; 29 OR N &gt; 71", "N = 30 OR N = 70"], "Inclusive integers: greater than 29 and less than 71."),
      tx("Write the first two steps of a refined algorithm to total 100 numbers (do not use pseudocode). [2]", [["total","sum"],["zero","0","initial","set"],["input","enter","read"]], 3, "Step 1: set the total to zero. Step 2: input a number."),
      ASA.pp("9618/21 October/November 2023 · Question 2", "Think in order: initialise the total, input, check the range, add if true, repeat for 100 numbers, output the total after the loop. No code!",
        [ ASA.text("(a)", 5, "An algorithm is expressed as follows: input 100 numbers, one at a time; keep a total of all numbers input that have a value between 30 and 70 inclusive and output this total after the last number has been input. Outline, using stepwise refinement, the five steps for this algorithm which could be used to produce pseudocode. Do not use pseudocode statements in your answer.",
            [ ["MP1 Set total to zero", ["total", "sum"], ["zero", "0", "initial", "reset"]], ["MP2 Input a number", ["input", "enter", "read", "get"]], ["MP3 Check if the number is greater than 29 and less than 71", ["29", "71", "30", "70", "between"], ["greater", "less", "more", "check", "test", "between", "inclusive", "range"]], ["MP4 If the check is true, add the number to the total", ["add"], ["total", "sum"]], ["MP5 Repeat from step 2 for 100 numbers // 99 more times", ["repeat", "loop", "100 times", "99", "100 iterations", "until 100", "for 100"]], ["MP6 Output the total (after the last number)", ["output", "display", "print"], ["total", "sum"]] ],
            { lead: "One mark for each step, maximum 5:", max: 5, lines: 6 }),
          ASA.text("(b)", 2, "Sequence is one programming construct. Identify two other programming constructs that will be required when the algorithm is converted into pseudocode.",
            [ ["An iterative construct // a (count-controlled) loop", ["iterat", "loop", "repetition", "repeat", "for", "while"]], ["A selection construct // an IF statement", ["selection", "if", "case", "condition", "decision"]] ],
            { lead: "1 mark each:", lines: 3 }) ])
    ] }

  ]);
})(typeof window !== "undefined" ? window : this);
