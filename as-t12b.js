/* iLearn AS Level (11BR) -- Topic 12 Software development (additional lessons). Each ends with a REAL Cambridge 9618 Paper 2 question marked on the mark-scheme points. */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx, tbl = root.ASA.tbl, ASA = root.ASA;
  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat([

  { id:"12.1.1a", code:"12.1.1", title:"The program development life cycle: stages and models",
    concept:
      "<p>A <b>program development life cycle</b> divides the development of a program into stages so that the work is organised, checked and maintainable.</p>" +
      tbl(["Stage", "Typical activities"], [["<b>Analysis</b>", "interview the client about problems with the current system; define requirements; feasibility study"], ["<b>Design</b>", "structure charts, flowcharts, pseudocode; define <b>records and file structures</b>"], ["<b>Coding</b>", "implement the algorithm in a programming language; iterative testing of modules"], ["<b>Testing</b>", "test plans, test data; <b>walkthrough</b>; alpha, beta and acceptance testing"], ["<b>Maintenance</b>", "corrective, adaptive (e.g. <b>run on new hardware</b>), perfective (e.g. faster response)"]]) +
      tbl(["Model", "Features", "Suits"], [["<b>Waterfall</b>", "stages in strict order, each finished before the next; needs high stakeholder involvement at the start; <b>no working software until late</b>; hard to cope with changing requirements", "stable, well-understood requirements"], ["<b>Iterative</b>", "build, test and review repeatedly; early versions / prototypes", "requirements likely to change"], ["<b>RAD</b> (rapid application development)", "quickly built prototypes, continuous user feedback, reusable components", "need to get to market fast"]]) +
      "<p><b>Beta testing</b> is the final stage before release: a small group of potential users tries the software in the real world, reports problems and suggests improvements, which are addressed before the program is sold.</p>",
    example:
      "<p>A company must launch a website first, but the console's features are still changing. Waterfall is a poor fit: <b>no working software until late</b> (slower to market than competitors) and <b>changes to requirements are slow to apply</b>. An <b>iterative</b> or <b>RAD</b> model lets early versions be demonstrated and updated.</p>",
    checks:[
      mc("In which stage is the client interviewed about problems with the current system?", "Analysis", ["Coding", "Testing", "Maintenance"], "Analysis gathers the requirements."),
      mc("Modifying a program to run on new hardware is which type of maintenance?", "Adaptive", ["Corrective", "Perfective", "Preventive"], "Adaptive maintenance changes the program for a new environment."),
      mc("Which development model is best when requirements are likely to change?", "Iterative / RAD", ["Waterfall", "None", "Linear only"], "Iterative models produce early versions that can be updated."),
      tx("Give one reason why the waterfall model may not be suitable when the requirements keep changing. [1]", [["no working","late","slow","changes","change","prototype","cannot go back","can't go back","inflexible"]], 1, "No working software until late; slower to cope with requirement changes; does not allow early prototypes."),
      ASA.pp("9618/21 May/June 2023 · Question 5 and 9618/21 October/November 2024 · Question 5(a)", "Waterfall problems: no early prototype, slow to change requirements. Better model: iterative / RAD. Final testing stage before release: beta.",
        [ ASA.text("(a)(i)", 2, "A company wants to be first to market a website for a new games console. The requirements for the website are likely to change as more information about the console is made available. The company has decided to use a program development life cycle based on the waterfall model. Give two reasons why this may not be the most appropriate model.",
            [ ["No working software until late in the life cycle, so slower to market // does not allow early versions / prototypes", ["no working", "late", "slower to market", "prototype", "early version", "until the end"]], ["More difficult / slower to cope with changes to the requirements", ["change", "requirement", "flexib"]], ["Needs high involvement / feedback of the stakeholders / client", ["stakeholder", "client", "customer", "feedback", "involvement"]] ],
            { lead: "One mark per point, maximum 2:", lines: 3 }),
          ASA.fields("(a)(ii)", 1, "Identify a more appropriate program development life cycle model for this scenario.",
            [ ["Model", ["iterative", "rad", "rapid application development", "agile"], "text", "Iterative / RAD", 1] ],
            { lead: "1 mark for:" }),
          ASA.text("(b)", 3, "The website has been running in test mode for several weeks. Identify and describe a final stage of testing that should take place before the website is made available to all customers.",
            [ ["Stage: beta testing", ["beta"]], ["Testing is carried out by a small group of (potential) users", ["small group", "potential users", "users", "customers", "real users", "selected"]], ["Users check that the software works as required / identify errors, and give feedback or suggestions", ["feedback", "suggest", "report", "errors", "works as required", "problems", "real world"]], ["Problems / suggestions identified are addressed before the program is sold", ["addressed", "fixed", "before the program is sold", "before release", "before it is released", "improv"]] ],
            { lead: "1 mark for the stage and max 2 for the description:", max: 3, lines: 4 }),
          ASA.fields("(2024 N21 Q5(a))", 5, "Name the life cycle stage for each activity.<br>1. The walkthrough method is used.<br>2. An algorithm is implemented in a programming language.<br>3. The client is interviewed about problems with the current system.<br>4. The program is modified to run on new hardware.<br>5. Records and file structures are defined.",
            [ ["1", ["testing"], "text", "Testing", 1], ["2", ["coding", "programming"], "text", "Coding", 1], ["3", ["analysis"], "text", "Analysis", 1], ["4", ["maintenance"], "text", "Maintenance", 1], ["5", ["design"], "text", "Design", 1] ],
            { lead: "One mark per row:" }) ])
    ] },

  { id:"12.2.1a", code:"12.2.1", title:"Structure charts and state-transition diagrams",
    concept:
      "<h4>Structure chart</h4>" +
      "<p>A <b>structure chart</b> shows how a program is broken into <b>modules</b> and how they are linked:</p>" +
      "<ul><li>Each <b>box</b> is a module (procedure or function); lines join a module to the modules it <b>calls</b>.</li><li>Labelled <b>arrows</b> show data passed in (parameters) and returned.</li><li>A <b>diamond</b> means <b>selection</b>: the module calls <b>either one of</b> the modules below it, decided at run time.</li><li>A <b>curved arrow</b> means <b>iteration</b>: the lower modules are called repeatedly.</li></ul>" +
      "<h4>State-transition diagram</h4>" +
      "<p>A <b>state-transition diagram</b> shows the <b>states</b> of a system (circles), the <b>inputs</b> that cause a move, the <b>outputs</b> produced, and the next state. Each arrow is labelled <code>input | output</code> (for example <code>A1 | X1</code>). A table of 'current state, input, output, next state' converts directly into the diagram, one arrow per row, starting from the START arrow.</p>",
    example:
      "<p>Module <code>Update</code> has a diamond above Sub-A, Sub-B and Sub-C. It means that Update calls <b>either</b> Sub-A <b>or</b> Sub-B <b>or</b> Sub-C, depending on a condition. Compare this with a loop symbol, where it would call them repeatedly.</p>" +
      "<p>State table row <code>S1, A1, X1, S2</code>: draw an arrow from S1 to S2 labelled <code>A1 | X1</code>.</p>",
    checks:[
      mc("What does a diamond on a structure chart mean?", "Selection: one of the lower modules is called", ["Iteration", "Sequence of all modules", "Input"], "Selection: either module X, Y or Z."),
      mc("In a state-transition diagram, what does an arrow labelled A1 | X1 mean?", "Input A1 causes output X1 and a change of state", ["Output A1, then input X1", "A1 and X1 are states", "The program ends"], "Input | output."),
      mc("What does a structure chart show?", "How modules are linked and what data passes between them", ["The order of statements in a loop", "The values in a table", "The hardware layout"], "It shows the module hierarchy and parameters."),
      tx("Explain the meaning of the diamond symbol in a structure chart. [2]", [["selection","decision","if","either","one of"],["call","module","procedure","function","depending","run time","condition"]], 2, "The module calls either one of the modules below it; which one is decided at run time (selection)."),
      ASA.pp("9618/21 May/June 2024 · Question 7(b)(i) and 9618/22 Oct/Nov 2023 · Question 7(b)", "Two points: reference to selection / a decision, and naming all the lower modules (Sub-A, Sub-B, Sub-C).",
        [ ASA.text("(b)(i)", 2, "A structure chart shows the module Update with a diamond symbol beneath it, joined to the three modules Sub-A, Sub-B and Sub-C. Explain the meaning of the diamond symbol in the chart.",
            [ ["Reference to selection / a decision / an IF", ["selection", "decision", "if ", "either", "one of", "choose", "choice", "condition"]], ["Naming all three modules correctly: Update calls either Sub-A, Sub-B or Sub-C", ["sub-a", "sub a", "suba"], ["sub-b", "sub b", "subb"], ["sub-c", "sub c", "subc"]] ],
            { lead: "One mark for reference to selection and one mark for naming the modules:", lines: 3, scheme: "<p>Means that Update calls (one of) either Sub-A, Sub-B or Sub-C.</p><p>One mark for each point: reference to selection / decision / if; naming all of the modules correctly.</p>" }) ])
    ] },

  { id:"12.3.1b", code:"12.3.1", title:"Test data, test plans, walkthroughs and maintenance",
    concept:
      "<p>A <b>test plan</b> lists each test: the <b>type of test data</b>, the <b>value</b> and the <b>expected result</b>. For a check like 'is the value from 24 to 37 inclusive':</p>" +
      tbl(["Type of test data", "Examples", "Expected"], [["Normal", "30", "TRUE"], ["Boundary / extreme (on the edge)", "24 and 37 (just inside) / 23 and 38 (just outside)", "TRUE / FALSE"], ["Abnormal", "12, 99, -5, \"hello\"", "FALSE (rejected)"]]) +
      tbl(["Testing method", "Meaning"], [["<b>Walkthrough</b>", "a person traces through the program by hand using test data; needs the <b>code or specification</b> and the <b>test plan</b> (so all paths can be tested)"], ["<b>White-box / black-box</b>", "testing with / without knowledge of the code"], ["<b>Stub / module testing</b>", "test one module on its own"], ["<b>Integration testing</b>", "modules proven to work separately are combined and tested together"], ["<b>Alpha / beta / acceptance</b>", "developers / selected users / the client"]]) +
      tbl(["Maintenance", "Reason"], [["Corrective", "fix faults found after release"], ["Adaptive", "change to suit a new environment (hardware, OS, law)"], ["<b>Perfective</b>", "improve performance or usability (e.g. a <b>faster response</b>)"]]),
    example:
      "<p>For the range check 24&ndash;37, a good plan includes <b>23 (FALSE)</b>, <b>24 (TRUE)</b>, <b>37 (TRUE)</b> and <b>38 (FALSE)</b> &mdash; the boundaries &mdash; plus a normal value like 30 and an abnormal value like 99. Once the function works alone, joining it with the other modules and testing again is <b>integration testing</b>.</p>",
    checks:[
      mc("The value 38 is tested for a function that accepts 24 to 37 inclusive. This is&hellip;", "Boundary (just outside the range)", ["Normal data", "Integration testing", "Corrective maintenance"], "38 is the first invalid value."),
      mc("Testing modules together after each has been tested alone is called&hellip;", "Integration testing", ["Walkthrough", "Alpha testing", "Black-box testing"], "Integration testing joins tested modules."),
      mc("Improving the speed of a released program is which type of maintenance?", "Perfective", ["Corrective", "Adaptive", "Preventive"], "Perfective maintenance improves performance."),
      tx("State two items needed before a walkthrough can be carried out. [2]", [["code","source","specification","design","algorithm","program"],["test plan","test data","inputs","expected"]], 2, "The program code (or specification) and the test plan (test data with expected results)."),
      ASA.pp("9618/21 October/November 2024 · Question 5(b) and 9618/23 May/June 2023 · Question 5", "Write four test lines in the form 'value → expected result' for the 24 to 37 check. Boundary values give the marks (24, 37 TRUE; 23, 38 FALSE).",
        [ ASA.text("(b)(i)", 4, "The program contains a validation function that takes an integer value, returns TRUE if the value is within the range 24 to 37 inclusive, and otherwise returns FALSE. Define a test plan to thoroughly test the function. The first row is: Normal, 30, TRUE. Write four more rows as: type of data, value, expected result (e.g. 'boundary 24 TRUE').",
            [ ["23 (just below the range) with expected result FALSE", ["re:\\b23\\b[^0-9a-z]{0,10}\\s*(abnormal|boundary|extreme|invalid|false)?[^0-9]{0,25}false"]], ["24 (lower boundary) with expected result TRUE", ["re:\\b24\\b[^0-9]{0,30}true"]], ["37 (upper boundary) with expected result TRUE", ["re:\\b37\\b[^0-9]{0,30}true"]], ["38 (just above the range) with expected result FALSE", ["re:\\b38\\b[^0-9]{0,30}false"]], ["25 or 36 (just inside) with expected result TRUE", ["re:\\b(25|36)\\b[^0-9]{0,30}true"]], ["An abnormal value outside the range with expected result FALSE", ["re:(abnormal)[^0-9]{0,15}\\b(\\d{1,3}|-\\d+)\\b[^0-9]{0,15}false"]] ],
            { lead: "One mark per row (full table below), maximum 4:", max: 4, lines: 6, scheme: "<table class='ln-table'><tr><th>Type of test data</th><th>Test data value</th><th>Expected result</th></tr><tr><td>Abnormal</td><td>12 (&lt; 23)</td><td>FALSE</td></tr><tr><td>Abnormal / Boundary / Extreme</td><td>23</td><td>FALSE</td></tr><tr><td>Boundary / Extreme</td><td>24</td><td>TRUE</td></tr><tr><td>Boundary</td><td>25</td><td>TRUE</td></tr><tr><td>Boundary</td><td>36</td><td>TRUE</td></tr><tr><td>Boundary / Extreme</td><td>37</td><td>TRUE</td></tr><tr><td>Abnormal / Boundary / Extreme</td><td>38</td><td>FALSE</td></tr><tr><td>Abnormal</td><td>99 (&gt; 38)</td><td>FALSE</td></tr></table><p>Max 4 marks.</p>", model: "boundary 23 FALSE boundary 24 TRUE boundary 37 TRUE boundary 38 FALSE" }),
          ASA.fields("(b)(ii)", 1, "The function is tested on its own. When it is shown to work correctly it will be combined with other modules and testing will continue. Identify the type of testing that this represents.",
            [ ["Type of testing", ["integration", "integration testing"], "text", "Integration (testing)", 1] ],
            { lead: "1 mark for:" }),
          ASA.fields("(2023 J23 Q5(b))", 1, "Changes are made to a released program to improve the speed of response. State the type of maintenance that has been applied.",
            [ ["Maintenance type", ["perfective"], "text", "Perfective", 1] ],
            { lead: "1 mark for:" }) ])
    ] }

  ]);
})(typeof window !== "undefined" ? window : this);
