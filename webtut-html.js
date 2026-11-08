/* Web Basics tutorial: HTML. Original lessons written for 10AM students.
   Lesson block types: string = paragraph (trusted HTML), {h}, {code}, {ex:{title,html,css,js}}, {tip}.
   MCQ: o[0] is the CORRECT option (the page shuffles them), why = explanation shown after answering. */
(function(){
  var L = window.WEBTUT = window.WEBTUT || { langs: [] };
  L.langs.push({ id: "html", title: "HTML", blurb: "The structure of a web page.", topics: [

  { id: "h1", title: "Page structure",
    lesson: [
      "<b>HTML</b> (HyperText Markup Language) describes the <b>structure</b> of a web page: what is a heading, what is a paragraph, where the pictures and links go. The browser reads the HTML file and draws the page. HTML is <i>markup</i>, not a programming language: it labels content, it does not make decisions.",
      { h: "The skeleton of every page" },
      { ex: { title: "A complete page", html: "<!DOCTYPE html>\n<html>\n<head>\n  <title>My first page</title>\n</head>\n<body>\n  <h1>Hello, world!</h1>\n  <p>This is my first web page.</p>\n</body>\n</html>" } },
      "<code>&lt;!DOCTYPE html&gt;</code> tells the browser this is a modern HTML5 page. <code>&lt;html&gt;</code> wraps everything. <code>&lt;head&gt;</code> holds information <i>about</i> the page (its title, styles) that is not drawn in the window. <code>&lt;body&gt;</code> holds everything you actually <b>see</b>.",
      { h: "Elements and attributes" },
      "An <b>element</b> is usually a <b>start tag</b>, some <b>content</b> and an <b>end tag</b>: <code>&lt;p&gt;Hello&lt;/p&gt;</code>. An <b>attribute</b> adds extra information inside the start tag as <code>name=\"value\"</code>, for example <code>&lt;p lang=\"en\"&gt;</code>.",
      { ex: { title: "Attributes in action", html: "<p style=\"color: green;\" title=\"Hover over me\">Hover over this text to see its title.</p>" } },
      { tip: "Indent child elements (two spaces) so you can see which tag is inside which. Browsers don't need it, but people reading your code do." }
    ],
    mcq: [
      { q: "What does HTML stand for?", o: ["HyperText Markup Language", "Hyper Tool Multi Language", "Home Tool Markup Language", "High Transfer Markup Language"], why: "HTML = HyperText Markup Language: 'markup' because it labels content with tags." },
      { q: "Which part of an HTML page holds the content you actually see in the browser window?", o: ["<body>", "<head>", "<!DOCTYPE html>", "<meta>"], why: "Everything visible goes inside <body>. <head> holds information about the page." },
      { q: "Which is the correct end tag for a paragraph?", o: ["</p>", "<p/>", "<end p>", "</paragraph>"], why: "An end tag is the tag name with a slash: </p>." },
      { q: "Where does the text inside the <title> element appear?", o: ["On the browser tab", "As a big heading on the page", "At the bottom of the page", "Nowhere, it is hidden"], why: "<title> sits in <head> and is shown on the browser tab and in bookmarks, not on the page itself." },
      { q: "What is the job of <!DOCTYPE html>?", o: ["It tells the browser the page is HTML5", "It adds a heading to the page", "It links the page to a CSS file", "It is a comment"], why: "The doctype is a declaration for the browser. It is not displayed." }
    ],
    written: { q: "In your own words, explain the difference between an HTML <b>element</b> and an HTML <b>attribute</b>, and give one example of each.",
      model: "An element is a building block of the page made of a start tag, content and an end tag, for example <p>Hello</p> (a paragraph). An attribute gives extra information about an element and is written inside the start tag as name=\"value\", for example href=\"page.html\" in <a href=\"page.html\">Link</a>.",
      check: ["Says an element has a start tag, content and an end tag", "Says an attribute goes inside the start tag as name=\"value\"", "Gives one correct example of each"] } },

  { id: "h2", title: "Headings, paragraphs and text",
    lesson: [
      "Text is the backbone of most pages. Use <b>headings</b> <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code> for titles (h1 is the most important and the biggest) and <code>&lt;p&gt;</code> for paragraphs.",
      { ex: { title: "Headings and paragraphs", html: "<h1>My school</h1>\n<h2>Computer Science</h2>\n<p>We learn how computers work and how to write programs.</p>\n<p>Next lesson: web pages!</p>" } },
      { h: "Formatting and spacing" },
      "<code>&lt;strong&gt;</code> marks important text (usually bold), <code>&lt;em&gt;</code> marks emphasis (usually italic), <code>&lt;br&gt;</code> makes a line break, and <code>&lt;hr&gt;</code> draws a horizontal line. <code>&lt;br&gt;</code> and <code>&lt;hr&gt;</code> have no content, so they have no end tag.",
      { ex: { title: "Formatting", html: "<p>This is <strong>very important</strong> and this is <em>emphasised</em>.</p>\n<p>Line one<br>Line two</p>\n<hr>\n<p>Below the line.</p>" } },
      "Browsers squash extra spaces and blank lines into <b>one space</b>, so pressing Enter in your code does not start a new line on the page. Use <code>&lt;p&gt;</code> or <code>&lt;br&gt;</code> instead.",
      { h: "Comments" },
      { ex: { title: "A comment is not shown", html: "<!-- This note is only for people reading the code -->\n<p>Only this paragraph is visible.</p>" } }
    ],
    mcq: [
      { q: "Which heading is the largest and most important?", o: ["<h1>", "<h6>", "<head>", "<heading>"], why: "<h1> is the top-level heading; <h6> is the smallest." },
      { q: "Which tag makes a line break?", o: ["<br>", "<lb>", "<break>", "<newline>"], why: "<br> breaks the line. It is an empty element, so it has no end tag." },
      { q: "Which tag marks text as important (usually shown bold)?", o: ["<strong>", "<important>", "<big>", "<hr>"], why: "<strong> means 'important'; <em> means 'emphasis'." },
      { q: "Which is the correct way to write an HTML comment?", o: ["<!-- remember to add a picture -->", "// remember to add a picture", "/* remember to add a picture */", "# remember to add a picture"], why: "HTML comments start with <!-- and end with -->. // and /* */ are for other languages." },
      { q: "In the code, you type three spaces between two words. How many spaces does the browser show?", o: ["One", "Three", "Zero", "It shows an error"], why: "Browsers collapse any run of spaces and new lines into a single space." }
    ],
    written: { q: "Write the HTML for a small section with the main heading <i>My Hobbies</i>, a one-sentence paragraph that introduces them, and a second sentence in which one word is emphasised.",
      model: "<h1>My Hobbies</h1>\n<p>I enjoy many things in my free time.</p>\n<p>My favourite is <em>football</em>.</p>",
      check: ["Uses <h1> for the main heading", "Uses <p> for the paragraph(s)", "Uses <em> (or <strong>) around exactly one word", "Every start tag has its end tag"] } },

  { id: "h3", title: "Links and images",
    lesson: [
      "The <b>anchor</b> element <code>&lt;a&gt;</code> makes a link. Its <code>href</code> attribute says where the link goes. The text between the tags is what the user clicks.",
      { ex: { title: "A link", html: "<p>Visit <a href=\"https://www.wikipedia.org\">Wikipedia</a> to learn more.</p>\n<p><a href=\"https://www.wikipedia.org\" target=\"_blank\">Open in a new tab</a></p>" } },
      "<code>target=\"_blank\"</code> opens the link in a new tab. (In this practice window links are blocked for safety, but they work on a real page.)",
      { h: "Images" },
      "<code>&lt;img&gt;</code> shows a picture. It is an empty element with these attributes: <code>src</code> (the file), <code>alt</code> (a text description used by screen readers and shown if the picture cannot load) and optionally <code>width</code>/<code>height</code>.",
      { ex: { title: "An image", html: "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='100'%3E%3Crect width='160' height='100' fill='%23146c6a'/%3E%3Ctext x='80' y='58' font-size='22' fill='white' text-anchor='middle'%3EPicture%3C/text%3E%3C/svg%3E\" alt=\"A green rectangle labelled Picture\" width=\"160\">" } },
      { h: "File paths" },
      "An <b>absolute</b> address is the whole web address, like <code>https://example.com/logo.png</code>. A <b>relative</b> path starts from the current page's folder, like <code>images/logo.png</code>. Use relative paths for your own files so the site still works when you move the whole folder.",
      { tip: "Never leave out <code>alt</code>. It helps blind users and tells everyone what the picture is when it fails to load." }
    ],
    mcq: [
      { q: "Which attribute holds the destination of a link?", o: ["href", "src", "link", "url"], why: "<a href=\"...\"> sets where the link goes. src is for images and scripts." },
      { q: "Which attribute opens a link in a new browser tab?", o: ["target=\"_blank\"", "new=\"tab\"", "open=\"new\"", "window=\"blank\""], why: "target=\"_blank\" asks the browser to open the link in a new tab." },
      { q: "What is the purpose of the alt attribute on an image?", o: ["A text description used if the image can't load or for screen readers", "It sets the image size", "It makes the image a link", "It adds a border"], why: "alt is alternative text, important for accessibility." },
      { q: "Which is the correct way to show a picture called cat.jpg?", o: ["<img src=\"cat.jpg\" alt=\"A cat\">", "<image href=\"cat.jpg\">", "<img>cat.jpg</img>", "<picture=\"cat.jpg\">"], why: "<img> is an empty element: src gives the file and alt the description." },
      { q: "Which of these is a RELATIVE path?", o: ["images/logo.png", "https://example.com/logo.png", "http://school.org/", "https://www.google.com"], why: "A relative path starts from the current page's folder; absolute addresses start with https://." }
    ],
    written: { q: "Write the HTML to show a picture <code>school.png</code> (300 pixels wide, with suitable alt text) that is <b>also a link</b> to <code>https://example.com</code>.",
      model: "<a href=\"https://example.com\"><img src=\"school.png\" alt=\"Our school building\" width=\"300\"></a>",
      check: ["The <img> is inside the <a> element", "href=\"https://example.com\" on the <a>", "src=\"school.png\" and width=\"300\"", "A meaningful alt text is included"] } },

  { id: "h4", title: "Lists and tables",
    lesson: [
      "Use a <b>list</b> for related items. <code>&lt;ul&gt;</code> is an <b>unordered</b> (bulleted) list, <code>&lt;ol&gt;</code> is an <b>ordered</b> (numbered) list. Each item is an <code>&lt;li&gt;</code>.",
      { ex: { title: "Lists", html: "<h3>Shopping</h3>\n<ul>\n  <li>Bread</li>\n  <li>Milk</li>\n</ul>\n<h3>Steps to log in</h3>\n<ol>\n  <li>Open the website</li>\n  <li>Type your email</li>\n  <li>Press Log in</li>\n</ol>" } },
      { h: "Tables" },
      "A <b>table</b> shows data in rows and columns. <code>&lt;table&gt;</code> wraps it, each row is a <code>&lt;tr&gt;</code>, a heading cell is <code>&lt;th&gt;</code> and a normal cell is <code>&lt;td&gt;</code>.",
      { ex: { title: "A table", html: "<table border=\"1\">\n  <tr>\n    <th>Subject</th>\n    <th>Mark</th>\n  </tr>\n  <tr>\n    <td>Computer Science</td>\n    <td>92</td>\n  </tr>\n  <tr>\n    <td>Maths</td>\n    <td>88</td>\n  </tr>\n</table>" } },
      { tip: "Tables are for data. Don't use them to arrange the whole page; CSS (next section) is for layout." }
    ],
    mcq: [
      { q: "Which tag creates a bulleted (unordered) list?", o: ["<ul>", "<ol>", "<li>", "<list>"], why: "<ul> = unordered list (bullets). <ol> = ordered list (numbers)." },
      { q: "Which tag creates a numbered list?", o: ["<ol>", "<ul>", "<nl>", "<num>"], why: "<ol> = ordered list." },
      { q: "Which tag marks ONE item inside a list?", o: ["<li>", "<item>", "<td>", "<ul>"], why: "Each list item is an <li>, inside <ul> or <ol>." },
      { q: "Which tag creates a table ROW?", o: ["<tr>", "<td>", "<th>", "<row>"], why: "<tr> = table row. Inside it, <td> and <th> create the cells." },
      { q: "Which tag creates a table HEADER cell (bold and centred by default)?", o: ["<th>", "<thead>", "<hd>", "<td>"], why: "<th> = table header cell. <td> is a normal data cell." }
    ],
    written: { q: "Write the HTML for a table with a header row (<i>Name</i>, <i>Score</i>) and two student rows of your choice.",
      model: "<table border=\"1\">\n  <tr><th>Name</th><th>Score</th></tr>\n  <tr><td>Sara</td><td>85</td></tr>\n  <tr><td>Omar</td><td>78</td></tr>\n</table>",
      check: ["<table> wraps everything", "Header row uses <th> for Name and Score", "Two more <tr> rows with <td> cells", "Every row has the same number of cells"] } },

  { id: "h5", title: "Forms and inputs",
    lesson: [
      "Forms let visitors type and choose things. A <code>&lt;form&gt;</code> contains <b>controls</b>: <code>&lt;input&gt;</code> (the <code>type</code> attribute decides what it is), <code>&lt;textarea&gt;</code>, <code>&lt;select&gt;</code> and <code>&lt;button&gt;</code>.",
      { ex: { title: "A small form", html: "<form>\n  <label for=\"nm\">Your name</label><br>\n  <input type=\"text\" id=\"nm\" name=\"nm\" placeholder=\"Type here\"><br><br>\n  <label for=\"em\">Email</label><br>\n  <input type=\"email\" id=\"em\" name=\"em\" required><br><br>\n  <button type=\"submit\">Send</button>\n</form>" } },
      "A <code>&lt;label&gt;</code> is linked to its input when <code>for</code> matches the input's <code>id</code>. Clicking the label then focuses the input, and screen readers read it out. <code>placeholder</code> shows a hint; <code>required</code> stops the form being sent while the box is empty.",
      { h: "Choices" },
      { ex: { title: "Radio buttons, checkbox and menu", html: "<p>Favourite colour:</p>\n<input type=\"radio\" id=\"r1\" name=\"colour\" value=\"red\"> <label for=\"r1\">Red</label>\n<input type=\"radio\" id=\"r2\" name=\"colour\" value=\"blue\"> <label for=\"r2\">Blue</label>\n<p><input type=\"checkbox\" id=\"c1\"> <label for=\"c1\">I agree</label></p>\n<select>\n  <option>Grade 9</option>\n  <option>Grade 10</option>\n</select>" } },
      "Radio buttons that share the same <code>name</code> belong to one group, so only one can be chosen. Checkboxes can each be ticked on their own.",
      { tip: "This practice window blocks form submission for safety, so the Send button won't go anywhere. On a real site, the form's <code>action</code> says where the data is sent." }
    ],
    mcq: [
      { q: "Which creates a single-line text box?", o: ["<input type=\"text\">", "<textbox>", "<text>", "<input type=\"line\">"], why: "<input> with type=\"text\" is a one-line text box. <textarea> is for several lines." },
      { q: "Which input type hides the characters being typed?", o: ["type=\"password\"", "type=\"hidden\"", "type=\"secret\"", "type=\"text\""], why: "type=\"password\" shows dots instead of the characters. (type=\"hidden\" is an invisible field, not for typing.)" },
      { q: "How is a <label> connected to an input?", o: ["The label's for matches the input's id", "They must be next to each other", "Both use the same class", "Labels are linked automatically"], why: "<label for=\"x\"> works with <input id=\"x\">." },
      { q: "How do you make radio buttons work as one group where only one can be chosen?", o: ["Give them the same name", "Give them the same id", "Put them in a table", "Use type=\"checkbox\""], why: "Radio buttons with the same name attribute form one group." },
      { q: "Which attribute stops a form being sent while a field is empty?", o: ["required", "mandatory", "notempty", "validate"], why: "required is the HTML5 attribute for compulsory fields." }
    ],
    written: { q: "Write the HTML for a simple login form with an email box, a password box and a <i>Log in</i> button. Then explain in one sentence why every box should have a label.",
      model: "<form>\n  <label for=\"email\">Email</label>\n  <input type=\"email\" id=\"email\" name=\"email\" required>\n  <label for=\"pw\">Password</label>\n  <input type=\"password\" id=\"pw\" name=\"pw\" required>\n  <button type=\"submit\">Log in</button>\n</form>\nLabels tell users (and screen readers) what each box is for, and clicking a label focuses its box.",
      check: ["Uses <form> with an email input and a password input (type=\"password\")", "Includes a button that submits", "Labels are connected using for and id", "Gives a reason for labels (accessibility / clearer / click to focus)"] } }

  ]});
})();
