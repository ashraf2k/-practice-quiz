/* Web Basics tutorial: JavaScript. Original lessons for 10AM students. See webtut-html.js for the data format. */
(function(){
  var L = window.WEBTUT = window.WEBTUT || { langs: [] };
  L.langs.push({ id: "js", title: "JavaScript", blurb: "The behaviour of a web page.", topics: [

  { id: "j1", title: "Introduction: scripts and the console",
    lesson: [
      "<b>JavaScript</b> is a programming language that makes web pages <b>interactive</b>: it can react to clicks, change what is on the page, check forms and more. (It is not the same as Java.) HTML gives the structure, CSS the style, and JavaScript the behaviour.",
      "JavaScript goes inside a <code>&lt;script&gt;</code> element (or in a separate <code>.js</code> file linked with <code>&lt;script src=\"app.js\"&gt;&lt;/script&gt;</code>). The simplest way to see output is <code>console.log()</code>, which prints to the <b>console</b>. In the practice window below, the console is the black panel.",
      { ex: { title: "Hello, console", js: "console.log(\"Hello, world!\");\nconsole.log(2 + 3);\n// Anything after two slashes is a comment and is ignored\nconsole.log(\"My first program\");" } },
      "Each instruction is a <b>statement</b>, normally ended with a semicolon. Statements run <b>one after another, from top to bottom</b>. JavaScript is <b>case-sensitive</b>: <code>console.log</code> works, but <code>Console.log</code> does not.",
      { h: "Changing the page" },
      { ex: { title: "JavaScript changes the page", html: "<h1 id=\"title\">Hello</h1>", js: "document.getElementById(\"title\").textContent = \"Hello from JavaScript!\";" } },
      { tip: "If nothing happens, look at the console panel: it shows red error messages with a line number that point to the mistake." }
    ],
    mcq: [
      { q: "JavaScript is used to…", o: ["make web pages interactive", "describe the structure of a page only", "style the colours of a page only", "store a website's files"], why: "JavaScript adds behaviour: reacting to the user and changing the page." },
      { q: "Which HTML element contains JavaScript code?", o: ["<script>", "<js>", "<javascript>", "<code>"], why: "JavaScript goes inside <script> ... </script>." },
      { q: "Which statement prints a message to the console?", o: ["console.log(\"Hi\");", "print(\"Hi\");", "echo \"Hi\";", "write.console(\"Hi\");"], why: "console.log() prints to the browser console." },
      { q: "Which line is a single-line comment in JavaScript?", o: ["// this is a comment", "<!-- this is a comment -->", "# this is a comment", "** this is a comment **"], why: "// starts a one-line comment. <!-- --> is for HTML." },
      { q: "What happens if you write Console.log(\"Hi\"); with a capital C?", o: ["An error: JavaScript is case-sensitive", "It works exactly the same", "It prints HI in capitals", "It prints nothing but gives no error"], why: "Names must match exactly, so Console is not the same as console." }
    ],
    written: { q: "Explain in <b>one sentence each</b> what HTML, CSS and JavaScript do in a web page.",
      model: "HTML defines the structure and content of the page (headings, paragraphs, images). CSS controls how it looks (colours, fonts, layout). JavaScript adds behaviour and interactivity (reacting to clicks, changing the page).",
      check: ["HTML = structure/content", "CSS = style/appearance", "JavaScript = behaviour/interactivity", "Each is explained in about one sentence"] } },

  { id: "j2", title: "Variables and data types",
    lesson: [
      "A <b>variable</b> is a named box that stores a value. Create one with <code>let</code> (the value can change later) or <code>const</code> (the value cannot be reassigned). Use <code>let</code>/<code>const</code> in new code, not the old <code>var</code>.",
      { ex: { title: "Variables", js: "let score = 10;\nscore = score + 5;      // allowed: let can change\nconst name = \"Sara\";   // const cannot be reassigned\nconsole.log(name, score);" } },
      { h: "Data types" },
      "A <b>string</b> is text in quotes (<code>\"Sara\"</code>). A <b>number</b> is a numeric value (<code>42</code>, <code>3.14</code>). A <b>boolean</b> is <code>true</code> or <code>false</code>. <code>undefined</code> means a variable has no value yet. <code>typeof</code> tells you the type.",
      { ex: { title: "Types", js: "console.log(typeof \"hello\");  // string\nconsole.log(typeof 42);       // number\nconsole.log(typeof true);     // boolean\nlet x;\nconsole.log(typeof x);        // undefined" } },
      { h: "Joining text" },
      "The <code>+</code> operator <b>adds numbers</b> but <b>joins strings</b>. If one side is a string, the result is a string: <code>\"5\" + 3</code> gives <code>\"53\"</code>. A <b>template literal</b> uses back-ticks and <code>${ }</code> to put values inside text.",
      { ex: { title: "Template literal", js: "const name = \"Omar\";\nlet age = 15;\nconsole.log(\"My name is \" + name);\nconsole.log(`I am ${age} years old`);\nconsole.log(\"5\" + 3);   // \"53\"\nconsole.log(5 + 3);     // 8" } }
    ],
    mcq: [
      { q: "Which keyword declares a variable whose value can change later?", o: ["let", "const", "fixed", "string"], why: "let creates a variable that can be reassigned. const cannot." },
      { q: "What happens if you try to reassign a const variable?", o: ["It causes an error", "The value changes silently", "The old value is kept without an error", "The variable becomes a string"], why: "const means constant: reassigning it throws a TypeError." },
      { q: "What does typeof \"hello\" return?", o: ["\"string\"", "\"text\"", "\"word\"", "\"char\""], why: "Text in quotes is a string." },
      { q: "Which of these is a boolean value?", o: ["true", "\"true\"", "1", "yes"], why: "true (no quotes) is a boolean. \"true\" in quotes is a string." },
      { q: "What is the result of  \"5\" + 3  ?", o: ["\"53\"", "8", "\"8\"", "An error"], why: "When one side is a string, + joins them: \"5\" and \"3\" become \"53\"." }
    ],
    written: { q: "Write JavaScript that declares a <b>constant</b> for your name and a <b>variable</b> for your age, then logs: <i>My name is … and I am … years old</i> using both variables.",
      model: "const name = \"Sara\";\nlet age = 15;\nconsole.log(`My name is ${name} and I am ${age} years old`);\n// or: console.log(\"My name is \" + name + \" and I am \" + age + \" years old\");",
      check: ["Uses const for the name and let for the age", "Strings are in quotes and the number is not", "Uses console.log to show the sentence", "Joins the values correctly (template literal or +)"] } },

  { id: "j3", title: "Operators and conditions",
    lesson: [
      "<b>Arithmetic operators</b>: <code>+ - * /</code> and <code>%</code> (the <b>remainder</b>: <code>10 % 3</code> is <code>1</code>). <b>Comparison operators</b> give true or false: <code>&gt; &lt; &gt;= &lt;=</code>, <code>===</code> (equal value <b>and</b> type) and <code>!==</code> (not equal). Prefer <code>===</code> over <code>==</code>.",
      { ex: { title: "Comparisons", js: "console.log(10 % 3);        // 1\nconsole.log(5 === 5);       // true\nconsole.log(5 === \"5\");     // false (number vs string)\nconsole.log(7 > 3);         // true" } },
      { h: "Logical operators" },
      "<code>&amp;&amp;</code> means AND (both must be true), <code>||</code> means OR (at least one true), and <code>!</code> means NOT.",
      { h: "if / else" },
      "A <b>condition</b> lets the program choose what to do. The code in <code>if</code> runs when the condition is true; <code>else if</code> adds more tests; <code>else</code> runs when none were true.",
      { ex: { title: "A grade checker", js: "let score = 72;\n\nif (score >= 80) {\n  console.log(\"Distinction\");\n} else if (score >= 50) {\n  console.log(\"Pass\");\n} else {\n  console.log(\"Fail\");\n}" } },
      "Change <code>score</code> to 90 and to 30 and press Run. Order matters: the tests are checked from top to bottom, and the first true one wins.",
      { ex: { title: "AND / OR", js: "let age = 15;\nlet hasTicket = true;\nif (age >= 12 && hasTicket) {\n  console.log(\"You can enter\");\n} else {\n  console.log(\"Sorry\");\n}" } }
    ],
    mcq: [
      { q: "What is the value of 10 % 3 ?", o: ["1", "3", "0", "3.33"], why: "% gives the remainder after dividing: 10 = 3 × 3 + 1." },
      { q: "Which operator checks that two values are equal AND of the same type?", o: ["===", "=", "==", "=>"], why: "=== is strict equality. A single = assigns a value." },
      { q: "What does 5 === \"5\" evaluate to?", o: ["false", "true", "undefined", "An error"], why: "One is a number and the other is a string, so strict equality is false." },
      { q: "What does true && false evaluate to?", o: ["false", "true", "undefined", "null"], why: "&& (AND) is true only when both sides are true." },
      { q: "When does the else block of an if / else run?", o: ["When the if condition is false", "Always", "When the if condition is true", "Never"], why: "else is the alternative that runs when the condition is false." }
    ],
    written: { q: "Write an <code>if / else if / else</code> that checks a variable <code>mark</code> and logs <i>Distinction</i> for 80 or more, <i>Pass</i> for 50 to 79, and <i>Fail</i> otherwise.",
      model: "let mark = 65;\nif (mark >= 80) {\n  console.log(\"Distinction\");\n} else if (mark >= 50) {\n  console.log(\"Pass\");\n} else {\n  console.log(\"Fail\");\n}",
      check: ["First test is mark >= 80", "else if (mark >= 50) for the middle range", "else for everything below 50", "Uses console.log with the correct words in quotes", "Curly braces and brackets are in the right places"] } },

  { id: "j4", title: "Loops and arrays",
    lesson: [
      "An <b>array</b> stores a list of values in one variable, written in square brackets. Positions are called <b>indexes</b> and they start at <b>0</b>. <code>array.length</code> is the number of items; <code>array.push(x)</code> adds an item to the end.",
      { ex: { title: "Arrays", js: "const fruits = [\"apple\", \"banana\", \"cherry\"];\nconsole.log(fruits[0]);       // apple (first item)\nconsole.log(fruits.length);   // 3\nfruits.push(\"mango\");\nconsole.log(fruits);" } },
      { h: "Loops" },
      "A <b>loop</b> repeats code. A <code>for</code> loop has three parts: <b>start</b> (<code>let i = 0</code>), <b>condition</b> (<code>i &lt; 3</code>) and <b>step</b> (<code>i++</code>, add one).",
      { ex: { title: "A for loop", js: "for (let i = 0; i < 3; i++) {\n  console.log(\"Round \" + i);\n}\n// runs 3 times: i = 0, 1, 2" } },
      "Looping through an array: use the index from 0 up to <code>length - 1</code>.",
      { ex: { title: "Looping through an array", js: "const colours = [\"red\", \"green\", \"blue\"];\nfor (let i = 0; i < colours.length; i++) {\n  console.log(colours[i]);\n}" } },
      "A <code>while</code> loop repeats <b>while a condition is true</b>. Be careful: if the condition never becomes false, you get an <b>infinite loop</b>, which freezes the page. (If that happens in the practice window, press <b>Stop</b>.)",
      { ex: { title: "A while loop", js: "let count = 3;\nwhile (count > 0) {\n  console.log(count);\n  count--;   // without this line the loop never ends!\n}\nconsole.log(\"Go!\");" } }
    ],
    mcq: [
      { q: "What is the index of the FIRST item in an array?", o: ["0", "1", "-1", "first"], why: "Array indexes start at 0." },
      { q: "What does fruits.length give for [\"apple\", \"banana\", \"cherry\"]?", o: ["3", "2", "0", "\"cherry\""], why: "length is the number of items." },
      { q: "Which method adds an item to the END of an array?", o: ["push()", "add()", "append()", "insert()"], why: "array.push(item) adds to the end." },
      { q: "How many times does  for (let i = 0; i < 3; i++)  run its code?", o: ["3 times", "2 times", "4 times", "Forever"], why: "i takes the values 0, 1 and 2, then i < 3 is false." },
      { q: "What usually causes an infinite while loop?", o: ["The condition never becomes false", "Using too many variables", "Writing the loop in lowercase", "Using let instead of const"], why: "If nothing changes the condition (for example you forget count--), it stays true forever." }
    ],
    written: { q: "Write code that creates an array of <b>five fruits</b> and uses a <b>loop</b> to log each one.",
      model: "const fruits = [\"apple\", \"banana\", \"cherry\", \"mango\", \"grape\"];\nfor (let i = 0; i < fruits.length; i++) {\n  console.log(fruits[i]);\n}",
      check: ["An array with five items in square brackets, strings in quotes", "A for loop that starts at 0 and stops before fruits.length", "Uses fruits[i] inside the loop", "Uses console.log to show each item"] } },

  { id: "j5", title: "Functions and the DOM",
    lesson: [
      "A <b>function</b> is a named block of code you can run (<b>call</b>) whenever you want. It can take <b>parameters</b> (inputs) and send a value back with <code>return</code>.",
      { ex: { title: "A function", js: "function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 3));    // 5\nconsole.log(add(10, 20));  // 30\n\nfunction greet(name) {\n  console.log(\"Hello, \" + name + \"!\");\n}\ngreet(\"Sara\");" } },
      { h: "The DOM" },
      "The browser turns your HTML into a tree of objects called the <b>DOM</b> (Document Object Model). JavaScript can find an element with <code>document.getElementById(\"id\")</code> and change it: <code>element.textContent = \"...\"</code> changes its text and <code>element.style.color = \"red\"</code> changes its style.",
      { h: "Events" },
      "An <b>event</b> is something that happens, like a click. <code>element.addEventListener(\"click\", function)</code> runs your function when it happens.",
      { ex: { title: "A button that changes the page", html: "<p id=\"msg\">Press the button.</p>\n<button id=\"btn\">Click me</button>", js: "const msg = document.getElementById(\"msg\");\nconst btn = document.getElementById(\"btn\");\n\nbtn.addEventListener(\"click\", function () {\n  msg.textContent = \"Button clicked!\";\n  msg.style.color = \"green\";\n});" } },
      { ex: { title: "A tiny counter", html: "<h2 id=\"num\">0</h2>\n<button id=\"plus\">+1</button>", js: "let count = 0;\ndocument.getElementById(\"plus\").addEventListener(\"click\", function () {\n  count++;\n  document.getElementById(\"num\").textContent = count;\n});" } },
      { tip: "The elements must exist before the script runs, so put your <code>&lt;script&gt;</code> at the <b>end</b> of the body (in the practice window this is done for you)." }
    ],
    mcq: [
      { q: "Which is the correct way to define a function called greet?", o: ["function greet() { }", "def greet():", "greet function() { }", "new function greet { }"], why: "JavaScript uses the function keyword, a name, brackets and curly braces." },
      { q: "Which keyword sends a value back out of a function?", o: ["return", "send", "output", "back"], why: "return gives the result back to the code that called the function." },
      { q: "How do you find the HTML element with id=\"msg\"?", o: ["document.getElementById(\"msg\")", "document.find(\"#msg\")", "getElement(\"msg\")", "document.id(\"msg\")"], why: "document.getElementById(\"id\") returns the element with that id." },
      { q: "Which statement changes the text of a paragraph stored in the variable p?", o: ["p.textContent = \"Hello\";", "p.text(\"Hello\");", "p = \"Hello\";", "text(p, \"Hello\");"], why: "Assigning to textContent changes the displayed text." },
      { q: "Which runs code when a button is clicked?", o: ["button.addEventListener(\"click\", myFunction);", "button.run(myFunction);", "if (button) myFunction();", "button.click = myFunction;"], why: "addEventListener connects a function to an event such as click." }
    ],
    written: { q: "Write the HTML and JavaScript for a button that, when clicked, changes a paragraph's text to <i>Button clicked!</i>",
      model: "<p id=\"msg\">Waiting...</p>\n<button id=\"btn\">Click me</button>\n\n<script>\n  const msg = document.getElementById(\"msg\");\n  document.getElementById(\"btn\").addEventListener(\"click\", function () {\n    msg.textContent = \"Button clicked!\";\n  });\n</script>",
      check: ["A <p> and a <button> each with an id", "Finds the elements with document.getElementById", "Uses addEventListener(\"click\", ...) on the button", "Sets textContent to \"Button clicked!\" inside the function"] } }

  ]});
})();
