/* Web Basics tutorial: CSS. Original lessons for 10AM students. See webtut-html.js for the data format. */
(function(){
  var L = window.WEBTUT = window.WEBTUT || { langs: [] };
  L.langs.push({ id: "css", title: "CSS", blurb: "The style of a web page.", topics: [

  { id: "c1", title: "Adding CSS and selectors",
    lesson: [
      "<b>CSS</b> (Cascading Style Sheets) controls how HTML looks: colours, fonts, spacing and layout. HTML says <i>what</i> things are; CSS says <i>how they look</i>.",
      { h: "A CSS rule" },
      { code: "selector {\n  property: value;\n}" },
      "The <b>selector</b> chooses which elements to style. Inside the curly braces, each <b>declaration</b> is a <b>property</b>, a colon, a <b>value</b> and a semicolon.",
      { ex: { title: "Your first rule", html: "<h1>Hello</h1>\n<p>Style me!</p>", css: "h1 {\n  color: darkgreen;\n}\np {\n  font-size: 20px;\n}" } },
      { h: "Three ways to add CSS" },
      "<b>1. Inline</b>: <code>&lt;p style=\"color: red;\"&gt;</code> (one element only). <b>2. Internal</b>: a <code>&lt;style&gt;</code> element inside <code>&lt;head&gt;</code>. <b>3. External</b> (best for real sites): a separate <code>style.css</code> file linked with <code>&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</code> in the head, so one file can style many pages.",
      { h: "Selectors" },
      "An <b>element selector</b> uses the tag name (<code>p</code>). A <b>class selector</b> starts with a dot (<code>.note</code>) and matches every element with <code>class=\"note\"</code>. An <b>id selector</b> starts with a hash (<code>#menu</code>) and matches the one element with <code>id=\"menu\"</code>. You can style several selectors at once with a comma: <code>h1, h2 { ... }</code>.",
      { ex: { title: "Class and id", html: "<p class=\"note\">A note</p>\n<p>A normal paragraph</p>\n<p class=\"note\">Another note</p>\n<p id=\"special\">Only one of me</p>", css: ".note {\n  background-color: lightyellow;\n}\n#special {\n  color: crimson;\n  font-weight: bold;\n}" } }
    ],
    mcq: [
      { q: "What does CSS stand for?", o: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colourful Style Scripts"], why: "CSS = Cascading Style Sheets." },
      { q: "Which selector chooses every element with class=\"note\"?", o: [".note", "#note", "note", "*note"], why: "A class selector starts with a dot." },
      { q: "Which selector chooses the single element with id=\"menu\"?", o: ["#menu", ".menu", "menu", "&menu"], why: "An id selector starts with a hash (#)." },
      { q: "How do you link an external stylesheet called style.css?", o: ["<link rel=\"stylesheet\" href=\"style.css\"> in <head>", "<style src=\"style.css\"> in <body>", "<css href=\"style.css\">", "<script href=\"style.css\">"], why: "The <link> element in <head> connects an external CSS file." },
      { q: "Which is a correctly written CSS rule?", o: ["p { color: red; }", "p ( color = red )", "<p> color: red </p>", "p: color { red }"], why: "Selector, curly braces, property: value; pairs." }
    ],
    written: { q: "Explain the difference between a <b>class</b> selector and an <b>id</b> selector, and say when you would use each.",
      model: "A class selector (.name) can be used on many elements, so I use it for a style I want to repeat, such as every warning message. An id selector (#name) matches only one element, because an id must be unique on a page, so I use it for one special element, such as the main menu.",
      check: ["Class selector starts with a dot and can be reused on many elements", "Id selector starts with # and should be used for one unique element", "Gives a sensible example of when to use each"] } },

  { id: "c2", title: "Colours, backgrounds and text",
    lesson: [
      "<code>color</code> sets the <b>text</b> colour and <code>background-color</code> sets the background. Colours can be a name (<code>tomato</code>), a hex code (<code>#ff0000</code>) or <code>rgb(255, 0, 0)</code>. Hex and rgb both describe the amounts of red, green and blue.",
      { ex: { title: "Colours", html: "<h1>Colour demo</h1>\n<p>Text colour and a background colour.</p>", css: "h1 {\n  color: #146c6a;\n}\np {\n  color: white;\n  background-color: rgb(20, 108, 106);\n  padding: 10px;\n}" } },
      { h: "Text properties" },
      "<code>font-family</code> picks the font (give a backup list, for example <code>Arial, sans-serif</code>). <code>font-size</code> sets the size, <code>font-weight</code> makes text bold, <code>text-align</code> aligns it (<code>left</code>, <code>center</code>, <code>right</code>) and <code>line-height</code> sets the space between lines.",
      { ex: { title: "Text styling", html: "<h2>Centred heading</h2>\n<p>A paragraph with a bigger font and more space between the lines of text, which makes it easier to read.</p>", css: "h2 {\n  text-align: center;\n  font-family: Georgia, serif;\n}\np {\n  font-size: 18px;\n  line-height: 1.6;\n}" } },
      { tip: "Always give a good contrast between text and background colours, so people with weaker eyesight can read your page." }
    ],
    mcq: [
      { q: "Which property changes the colour of the TEXT?", o: ["color", "text-color", "font-color", "foreground"], why: "color sets the text colour. (background-color sets the background.)" },
      { q: "Which property sets the background colour?", o: ["background-color", "bgcolor", "color-background", "back"], why: "background-color is the CSS property." },
      { q: "Which declaration centres text?", o: ["text-align: center;", "align: middle;", "text-center: true;", "font-align: center;"], why: "text-align: center; centres the text inside its box." },
      { q: "Which hex code is pure red?", o: ["#ff0000", "#00ff00", "#0000ff", "#000000"], why: "#rrggbb: ff red, 00 green, 00 blue is pure red." },
      { q: "Why does font-family usually list more than one font, like Arial, sans-serif?", o: ["The later fonts are backups if the first isn't available", "All the fonts are mixed together", "The browser picks one randomly", "It makes the text bold"], why: "The browser uses the first font it has; the others are fallbacks." }
    ],
    written: { q: "Write CSS that makes every <code>h1</code> dark blue, centred, and in the Verdana font, and makes every paragraph 18px with a light grey background.",
      model: "h1 {\n  color: darkblue;\n  text-align: center;\n  font-family: Verdana, sans-serif;\n}\np {\n  font-size: 18px;\n  background-color: lightgrey;\n}",
      check: ["h1 rule with color: darkblue (or a dark blue value)", "text-align: center and font-family: Verdana", "p rule with font-size: 18px", "background-color with a light grey value", "Semicolons and curly braces are correct"] } },

  { id: "c3", title: "The box model",
    lesson: [
      "Every HTML element is a rectangular <b>box</b>. From the inside out the box has: <b>content</b> (the text or picture), <b>padding</b> (space inside the border, around the content), <b>border</b> (a line around the padding) and <b>margin</b> (space outside the border, pushing other boxes away).",
      { ex: { title: "See the box", html: "<div class=\"box\">I am a box with padding, a border and a margin.</div>\n<div class=\"box\">Another box.</div>", css: ".box {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid teal;\n  margin: 15px;\n  background-color: lightcyan;\n}" } },
      "Shorthand: <code>margin: 10px;</code> sets all four sides. <code>margin: 10px 20px;</code> means <b>10px top and bottom, 20px left and right</b>. With four values, <code>margin: 1px 2px 3px 4px;</code> goes <b>clockwise</b>: top, right, bottom, left.",
      { h: "How big is the box?" },
      "By default (<code>box-sizing: content-box</code>), <code>width</code> sets only the <b>content</b>, so the real width on screen is <code>width + padding + border</code>. In the example above: 200 + 20 + 20 + 5 + 5 = 250px. With <code>box-sizing: border-box</code>, <code>width</code> includes the padding and border, so the box stays exactly 200px wide.",
      { ex: { title: "border-box", html: "<div class=\"a\">content-box (250px wide)</div>\n<div class=\"b\">border-box (200px wide)</div>", css: "div {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid teal;\n  margin-bottom: 10px;\n  background-color: lightcyan;\n}\n.b {\n  box-sizing: border-box;\n}" } },
      { tip: "Many developers add <code>* { box-sizing: border-box; }</code> at the top of every stylesheet so sizes are easier to predict." }
    ],
    mcq: [
      { q: "From the inside to the outside, what is the order of the box model?", o: ["Content, padding, border, margin", "Content, margin, border, padding", "Padding, content, margin, border", "Border, content, padding, margin"], why: "Content is in the middle, then padding, then the border, then the margin outside." },
      { q: "Which part is the space INSIDE the border, around the content?", o: ["Padding", "Margin", "Border", "Outline"], why: "Padding is inside the border; margin is outside." },
      { q: "Which part pushes OTHER elements away from the box (space outside the border)?", o: ["Margin", "Padding", "Content", "Width"], why: "Margin is the space outside the border." },
      { q: "What does margin: 10px 20px; mean?", o: ["10px top and bottom, 20px left and right", "10px left and right, 20px top and bottom", "10px top, 20px bottom", "10px on all sides"], why: "With two values the first is top/bottom and the second is left/right." },
      { q: "With the default box-sizing, a box has width: 200px; padding: 20px; border: 5px solid. What is its total width on screen?", o: ["250px", "200px", "225px", "245px"], why: "200 (content) + 20 + 20 (padding) + 5 + 5 (border) = 250px." }
    ],
    written: { q: "Explain what <code>box-sizing: border-box</code> changes and why many developers use it.",
      model: "By default, width only sets the content area, and padding and border are added on top, so the box ends up wider than the width I wrote. With box-sizing: border-box the width includes the padding and border, so the box is exactly the size I set. This makes calculating layouts much easier.",
      check: ["Says that by default padding and border are added to the width", "Says border-box includes padding and border inside the width", "Gives the benefit: easier, more predictable sizes"] } },

  { id: "c4", title: "Layout with display and flexbox",
    lesson: [
      "The <code>display</code> property controls how a box behaves. <b>Block</b> elements (like <code>div</code>, <code>p</code>, <code>h1</code>) start on a new line and take the full width. <b>Inline</b> elements (like <code>span</code>, <code>a</code>) sit within the line of text. <code>display: none;</code> hides an element completely and it takes up no space.",
      { h: "Flexbox" },
      "<b>Flexbox</b> arranges items in a row or column. Put <code>display: flex;</code> on the <b>container</b>, and its children become flex items laid out in a row. <code>justify-content</code> spreads items along the main axis (<code>flex-start</code>, <code>center</code>, <code>space-between</code>, <code>space-around</code>), <code>align-items</code> aligns them across (<code>center</code>), and <code>gap</code> adds space between them.",
      { ex: { title: "A row of boxes", html: "<div class=\"row\">\n  <div class=\"item\">1</div>\n  <div class=\"item\">2</div>\n  <div class=\"item\">3</div>\n</div>", css: ".row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  background: #eee;\n  padding: 10px;\n}\n.item {\n  background: teal;\n  color: white;\n  padding: 20px;\n}" } },
      "Change <code>justify-content</code> to <code>center</code> or <code>space-around</code> and press Run to see what happens. <code>flex-direction: column;</code> stacks the items vertically instead.",
      { ex: { title: "A navigation bar", html: "<nav>\n  <a href=\"#\">Home</a>\n  <a href=\"#\">Lessons</a>\n  <a href=\"#\">Contact</a>\n</nav>", css: "nav {\n  display: flex;\n  gap: 20px;\n  background: #146c6a;\n  padding: 12px;\n}\nnav a {\n  color: white;\n  text-decoration: none;\n}" } }
    ],
    mcq: [
      { q: "Which declaration turns an element into a flex container?", o: ["display: flex;", "flex: container;", "layout: flex;", "position: flex;"], why: "display: flex; on the parent makes its children flex items." },
      { q: "Which property spreads flex items along the main axis (for example space-between)?", o: ["justify-content", "align-content", "flex-gap", "spread"], why: "justify-content controls spacing along the main axis (the row, by default)." },
      { q: "In a row flex container, which declaration centres the items vertically?", o: ["align-items: center;", "vertical-align: all;", "justify-content: top;", "text-align: center;"], why: "align-items works across the main axis, so in a row it controls vertical alignment." },
      { q: "What is the default display value of a <div>?", o: ["block", "inline", "flex", "none"], why: "div is a block element: it starts on a new line and fills the width." },
      { q: "What does display: none; do?", o: ["Hides the element and it takes up no space", "Makes the element invisible but keeps its space", "Deletes the element from the HTML", "Makes the element smaller"], why: "display: none removes the element from the layout. (visibility: hidden hides it but keeps its space.)" }
    ],
    written: { q: "Write the CSS for a navigation bar: a <code>nav</code> container that places its links in a row, spaced evenly, with a 10px gap between them.",
      model: "nav {\n  display: flex;\n  justify-content: space-evenly;\n  gap: 10px;\n}",
      check: ["display: flex on the nav container", "justify-content with an even-spacing value (space-between / space-around / space-evenly)", "gap: 10px"] } },

  { id: "c5", title: "Hover, units and responsive design",
    lesson: [
      "A <b>pseudo-class</b> styles an element in a special state. <code>:hover</code> applies while the mouse is over the element, which is great for buttons and links.",
      { ex: { title: "Hover effect", html: "<button class=\"btn\">Hover over me</button>", css: ".btn {\n  background: teal;\n  color: white;\n  border: none;\n  padding: 12px 20px;\n  font-size: 16px;\n  cursor: pointer;\n}\n.btn:hover {\n  background: darkorange;\n}" } },
      { h: "Units" },
      "<code>px</code> is a fixed pixel size. <code>%</code> is relative to the <b>parent</b> element (<code>width: 50%</code> is half the parent's width). <code>em</code> is relative to the element's font size and <code>rem</code> to the page's root font size. <code>vw</code> is a percentage of the screen width.",
      { h: "Responsive design" },
      "<b>Responsive design</b> means one page that works on phones, tablets and computers. In HTML add <code>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"&gt;</code> so phones don't zoom out. In CSS use flexible units and <b>media queries</b>, which apply rules only when a condition is true:",
      { ex: { title: "A media query", html: "<div class=\"box\">Resize the window: I turn orange on small screens.</div>", css: ".box {\n  background: teal;\n  color: white;\n  padding: 20px;\n  width: 80%;\n}\n@media (max-width: 500px) {\n  .box {\n    background: darkorange;\n  }\n}" } },
      "<code>@media (max-width: 600px)</code> means \"when the screen is 600px wide <b>or narrower</b>\".",
      { tip: "Design for the smallest screen first, then add media queries for bigger screens. Most visitors use phones." }
    ],
    mcq: [
      { q: "Which pseudo-class styles an element while the mouse is over it?", o: [":hover", ":mouse", ":over", ":point"], why: ":hover applies while the pointer is over the element." },
      { q: "Which unit is relative to the root (page) font size?", o: ["rem", "px", "em", "pt"], why: "rem = root em. em is relative to the element's own font size." },
      { q: "When does @media (max-width: 600px) { ... } apply?", o: ["When the screen is 600px wide or narrower", "When the screen is exactly 600px wide", "When the screen is wider than 600px", "Only on printers"], why: "max-width: 600px means up to and including 600px." },
      { q: "What does width: 50%; mean on a child element?", o: ["Half the width of its parent", "Half the width of the screen", "Half of its own content", "50 pixels"], why: "Percentages are relative to the parent element." },
      { q: "What is the purpose of the viewport meta tag?", o: ["Makes the page scale correctly on phones", "Adds a title to the page", "Links a CSS file", "Hides the page from search engines"], why: "Without it, phones show a zoomed-out desktop layout." }
    ],
    written: { q: "Explain what <b>responsive design</b> means, and name one CSS feature that helps to achieve it.",
      model: "Responsive design means a web page adjusts its layout to fit any screen size, such as a phone, tablet or computer, so it is easy to read and use everywhere. Media queries help: for example @media (max-width: 600px) can change the layout for small screens. (Flexbox and percentage widths also help.)",
      check: ["Explains the page adapts to different screen sizes/devices", "Names a CSS feature (media queries, flexbox, % or rem units)", "Gives a short example or reason it helps"] } }

  ]});
})();
