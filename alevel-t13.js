/* iLearn A Level topic 13: Data representation (Cambridge International AS & A Level Computer Science 9618, section 13)
   Textbook: Hodder "Cambridge International AS & A Level Computer Science", chapter 13 (pages 304-327).
   Past-paper style: 9618/31, 9618/32 and 9618/33 May/June 2026 mark schemes (user-defined types, file organisation,
   hashing, floating-point numbers). */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx, fill = root.ILQ.fill;
  function tbl(heads, rows){
    return "<table class='ln-table'><tr>" + heads.map(function(h){ return "<th>" + h + "</th>"; }).join("") + "</tr>" +
      rows.map(function(r){ return "<tr>" + r.map(function(c){ return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
  }
  function pre(s){ return "<pre class='ln-pre'>" + s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</pre>"; }
  // a floating-point number drawn as two rows of bits: mantissa | exponent
  function fp(m, e){
    var cells = "";
    m.split("").forEach(function(b, i){ cells += "<td" + (i === 0 ? " style='border-left:2px solid #888'" : "") + ">" + b + "</td>"; });
    var ecells = e.split("").map(function(b, i){ return "<td" + (i === 0 ? " style='border-left:3px solid #c00'" : "") + ">" + b + "</td>"; }).join("");
    return "<table class='ln-table' style='text-align:center'><tr><th colspan='" + m.length + "'>Mantissa</th><th colspan='" + e.length + "'>Exponent</th></tr><tr>" + cells + ecells + "</tr></table>";
  }

  var LESSONS = [

  /* ===================== 13.1 User-defined data types ===================== */
  { id:"13.1a", code:"13.1.1", title:"Why user-defined data types are needed",
    concept:
      "<p>Every programming language has <b>built-in (primitive) data types</b> such as INTEGER, REAL, CHAR, STRING and BOOLEAN. Sometimes these are not a good match for the data a program has to store. A <b>user-defined data type</b> is a data type that the programmer designs, based on an existing data type or on other data types the programmer has already defined.</p>" +
      "<p>Programmers define their own types because:</p>" +
      "<ul><li>the language may <b>not provide</b> a type that matches the problem (for example, the days of the week, or the data about one student);</li>" +
      "<li>several items of data can be grouped <b>under a single identifier</b>;</li>" +
      "<li>the code is <b>easier to read and understand</b>;</li>" +
      "<li>the type can match the program's requirements <b>exactly</b>, so invalid values are impossible.</li></ul>" +
      "<p>User-defined types are split into two groups:</p>" +
      tbl(["Group", "Meaning", "Examples in the syllabus"], [
        ["<b>Non-composite</b>", "Defined <b>without referring to another data type</b>", "Enumerated, pointer"],
        ["<b>Composite</b>", "Defined by <b>referring to one or more other data types</b>", "Record, set, class / object"]]),
    example:
      "<p>A weather program stores a day of the week. With a plain STRING, a typing mistake such as <code>\"Mondya\"</code> is accepted. With a user-defined type the only values allowed are the seven that were listed, so the program is safer.</p>" +
      "<p>A school program stores a student's name, form and mark together. A <b>record</b> holds the three items under one identifier, which makes the code clearer than three unrelated variables.</p>",
    checks:[
      mc("Which statement describes a <b>composite</b> data type?", "A type defined by referring to other data types", ["A type that is built into every programming language", "A type that can only store whole numbers", "A type that has no name"], "A composite type contains or refers to other types, for example a record made from STRING and INTEGER fields."),
      mc("Which of these is a <b>non-composite</b> user-defined data type?", "Enumerated", ["Record", "Set", "Class"], "An enumerated type is defined by a list of values without referring to another data type. Records, sets and classes refer to other types."),
      tx("Explain why a programmer might need to define their own data type. [3]",
        [["not available","does not exist","doesn't exist","no suitable","built-in","existing type","may not provide"],["single identifier","one identifier","group","together","one name"],["easier to read","easier to understand","readable","clearer","understand"],["exactly match","match the requirements","match the program","requirements","only valid values","invalid"]],
        3, "The language may not have a data type that matches the problem. A user-defined type can group related data under a single identifier, makes the code easier to read and understand, and can match the program's requirements exactly.")
    ] },

  { id:"13.1b", code:"13.1.2", title:"Enumerated data types",
    concept:
      "<p>An <b>enumerated data type</b> is defined by a <b>list of all the possible values</b>. The values have an <b>implied order</b> (the order in which they are listed) and each appears only once. In Cambridge pseudocode:</p>" +
      pre("TYPE <identifier> = (value1, value2, value3, ...)") +
      "<ul><li>The values are <b>not strings</b>, so they are written <b>without quotation marks</b>.</li><li>The list is <b>complete</b> and <b>fixed</b>: no other value can be stored.</li><li>Because the values are ordered, they can be compared and a value can be moved to the next one.</li></ul>",
    example:
      pre("TYPE TSeason = (Spring, Summer, Autumn, Winter)\nDECLARE ThisSeason : TSeason\nDECLARE NextSeason : TSeason\n\nThisSeason ← Summer\nNextSeason ← ThisSeason + 1     // Autumn") +
      "<p>The type name often begins with <b>T</b>. <code>Summer &lt; Winter</code> is TRUE because Summer comes earlier in the list. Storing <code>Spring</code> is allowed; storing <code>Monday</code> is an error.</p>" +
      "<p><b>Exam link:</b> a past paper asked students to write the declaration for an enumerated type of farm animals. The marks were for <code>TYPE Animals =</code> and then the brackets with the values in the stated order, with no quotation marks.</p>",
    checks:[
      fill("Complete the declaration of an enumerated type for traffic lights.", "{1} TLight {2} (Red, Amber, Green)", [["TYPE", ["DECLARE", "ARRAY", "SET"]], ["=", ["←", ":", "OF"]]], "A type is defined with TYPE <name> = (list of values). The values have no quotation marks."),
      mc("Which is a correct feature of an enumerated data type?", "The list of values is complete and the values are in order", ["It can store any value of any type", "Its values must be written as strings in quotes", "It stores a memory address"], "The possible values are listed once, in order, and no other value can be stored."),
      mc("<code>TYPE TDay = (Mon, Tue, Wed, Thu, Fri)</code>. The variable Today is set to Tue. What is the value of <code>Today + 2</code>?", "Thu", ["Wed", "Fri", "Mon"], "Moving two places along the ordered list from Tue gives Wed then Thu."),
      tx("Give two properties of an enumerated data type. [2]", [["list of all","all possible values","complete","fixed length","cannot change","fixed"],["ordered","order","ordinal","alphabetical","implied order"],["unique","not repeated","no duplicates","each value once"]], 2, "The list of values is complete and fixed (it cannot change after it is declared); the values are ordered; each value appears only once.")
    ] },

  { id:"13.1c", code:"13.1.2", title:"Pointer data types",
    concept:
      "<p>A <b>pointer</b> is a non-composite data type that stores the <b>memory address</b> of where data is held. The pointer type must say what kind of data lives at that address.</p>" +
      pre("TYPE <pointer> = ^<Typename>") +
      "<ul><li><code>^</code> in a type definition means <i>pointer to</i>.</li><li><code>^Variable</code> gives the <b>address</b> of a variable.</li><li><code>Pointer^</code> is the <b>dereferenced</b> value: the data stored at the address.</li></ul>",
    example:
      pre("TYPE TIntPointer = ^INTEGER\nDECLARE Number : INTEGER\nDECLARE MyPointer : TIntPointer\n\nNumber ← 42\nMyPointer ← ^Number         // MyPointer holds the address of Number\nOUTPUT MyPointer^           // 42 (the value at that address)") +
      "<p>If <code>MyPointer^ ← 50</code> is executed, the value of <b>Number</b> becomes 50, because the pointer refers to the same memory location.</p>" +
      "<p><b>Exam link:</b> a mark scheme defines a pointer type as <i>a user-defined data type that is used to reference a memory location</i>, and accepts <code>TYPE Word = ^STRING</code> as a declaration of a pointer to a string.</p>",
    checks:[
      mc("What is stored in a variable of a pointer data type?", "The memory address of some data", ["The largest value of an INTEGER", "A list of ordered values", "A copy of a whole record"], "A pointer holds an address. Dereferencing it gives the data at that address."),
      fill("Complete the pseudocode to declare a pointer type for REAL values.", "TYPE TRealPointer {1} {2}REAL", [["=", ["←", ":", "OF"]], ["^", ["*", "#", "&"]]], "^ before the type name means 'pointer to'."),
      mc("<code>Total ← 10</code> and <code>P ← ^Total</code> (P is a pointer to Total). What does <code>OUTPUT P^</code> display?", "10", ["^Total", "The address of Total", "P"], "P^ dereferences the pointer, giving the value held at the address, which is 10."),
      tx("State the purpose of a pointer data type. [1]", [["memory location","memory address","address","reference"]], 1, "To reference (store the address of) a memory location where data is held.")
    ] },

  { id:"13.1d", code:"13.1.3", title:"Record data types",
    concept:
      "<p>A <b>record</b> is a composite type that groups several <b>fields</b>, each with its own data type, under one name. The fields can be of different types. In Cambridge pseudocode:</p>" +
      pre("TYPE <identifier>\n    DECLARE <field1> : <type>\n    DECLARE <field2> : <type>\nENDTYPE") +
      "<p>A variable of the record type is declared in the usual way, and each field is reached with a <b>dot</b>. Records can be stored in an <b>array</b> to hold many items.</p>",
    example:
      pre("TYPE TBook\n    DECLARE Title    : STRING\n    DECLARE Author   : STRING\n    DECLARE Pages    : INTEGER\n    DECLARE Fiction  : BOOLEAN\nENDTYPE\n\nDECLARE Journal : TBook\nJournal.Title ← \"Spring Flowers\"\nJournal.Author ← \"H Williams\"\nJournal.Pages ← 40\nJournal.Fiction ← FALSE\n\nDECLARE Library : ARRAY[1:100] OF TBook\nLibrary[1].Title ← \"Atlas\"") +
      "<p>The record is a <b>composite</b> type because its definition refers to other types (STRING, INTEGER, BOOLEAN).</p>",
    checks:[
      fill("Complete the record definition for a student.", "{1} TStudent\n    DECLARE Name : STRING\n    DECLARE Mark : {2}\n{3}", [["TYPE", ["RECORD", "CLASS", "SET"]], ["INTEGER", ["^INTEGER", "TStudent", "ARRAY"]], ["ENDTYPE", ["END", "ENDRECORD", "NEXT"]]], "TYPE ... ENDTYPE wraps the field declarations. Each field has its own data type."),
      mc("<code>Journal</code> is a record variable with a field <code>Pages</code>. Which statement stores 40 in that field?", "Journal.Pages ← 40", ["Journal[Pages] ← 40", "Pages.Journal ← 40", "Journal ← Pages 40"], "A field of a record is accessed with the variable name, a dot and the field name."),
      mc("Why is a record a <b>composite</b> data type?", "Its definition refers to other data types", ["It can only store a single value", "It has a fixed list of values", "It stores memory addresses"], "A record is built from fields that each have a data type, so it refers to other types.")
    ] },

  { id:"13.1e", code:"13.1.3", title:"Set data types",
    concept:
      "<p>A <b>set</b> is a composite type: a collection of <b>unordered</b> elements of the <b>same base type</b>, with <b>no duplicates</b>. Sets support set-theory operations:</p>" +
      tbl(["Operation", "Meaning", "Example with A = {1,2,3} and B = {3,4}"], [
        ["<b>Union</b>", "All elements that are in either set", "{1, 2, 3, 4}"],
        ["<b>Intersection</b>", "Elements that are in both sets", "{3}"],
        ["<b>Difference</b> (A − B)", "Elements in A that are not in B", "{1, 2}"],
        ["<b>Membership</b>", "Is a value an element of the set?", "2 is in A: TRUE"]]) +
      "<p>In pseudocode the type states the base type, and a variable is defined with its elements:</p>" +
      pre("TYPE TLetters = SET OF CHAR\nDEFINE Vowel ('a', 'e', 'i', 'o', 'u') : TLetters"),
    example:
      "<p>A program needs to know whether a character typed by the user is a vowel. Storing the five vowels in a set and testing for <b>membership</b> is clearer than writing five separate comparisons.</p>" +
      "<p>Because a set is <b>unordered</b>, there is no 'first' or 'third' element. This is the main difference from an array or an enumerated type.</p>",
    checks:[
      mc("Which operation gives the elements that two sets have in common?", "Intersection", ["Union", "Difference", "Enumeration"], "Intersection keeps only the elements in both sets."),
      mc("Which statement about a set is correct?", "Its elements are unordered and each appears once", ["Its elements are stored in a fixed order", "Its elements can have different data types", "It stores memory addresses"], "A set is an unordered collection of elements of one base type with no repeats."),
      mc("A = {2, 4, 6} and B = {4, 6, 8}. What is the union of A and B?", "{2, 4, 6, 8}", ["{4, 6}", "{2}", "{8}"], "The union contains every element in either set, listing 4 and 6 only once.")
    ] },

  { id:"13.1f", code:"13.1.3", title:"Class and object data types",
    concept:
      "<p>A <b>class</b> is a composite data type that contains <b>attributes</b> (data of given data types) and <b>methods</b> (routines that work on that data). An <b>object</b> (instance) is a variable created from a class. Several objects can be created from the same class, each with its own attribute values.</p>" +
      "<p>A class is more powerful than a record because it also holds the code (methods) that operates on the data. Object-oriented programming is covered in depth in Topic 20.</p>",
    example:
      pre("CLASS Pet\n    PRIVATE Name : STRING\n    PRIVATE Age  : INTEGER\n    PUBLIC PROCEDURE NEW(NewName : STRING, NewAge : INTEGER)\n        Name ← NewName\n        Age ← NewAge\n    ENDPROCEDURE\nENDCLASS\n\nMyPet ← NEW Pet(\"Rex\", 3)") +
      "<p><code>Pet</code> is the class (the data type); <code>MyPet</code> is an object, an instance of the class.</p>",
    checks:[
      mc("What is an <b>object</b>?", "An instance of a class", ["A list of possible values", "A memory address", "A routine that checks data"], "An object is created from a class and has its own attribute values."),
      mc("Which statement about a class is correct?", "It contains attributes and methods", ["It contains only methods", "It contains only a list of constants", "It is a primitive data type"], "A class is a composite type made of attributes (data) and methods (code).")
    ] },

  { id:"13.1g", code:"13.1.4", title:"Choosing and designing a user-defined type",
    concept:
      "<p>For a given problem, decide which type fits the data best by asking what the data looks like:</p>" +
      tbl(["The data is ...", "Choose", "Reason"], [
        ["A fixed list of named choices with an order (colours, seasons, days)", "<b>Enumerated</b>", "Only listed values allowed; readable; comparable"],
        ["The address of data held in memory", "<b>Pointer</b>", "Stores a memory address"],
        ["Several items of different types about <b>one</b> thing (a house, a student)", "<b>Record</b>", "Fields grouped under one identifier"],
        ["An unordered collection of different values where membership matters", "<b>Set</b>", "Union, intersection, membership"],
        ["Data <b>and</b> the routines that work on it", "<b>Class / object</b>", "Attributes and methods together"]]),
    example:
      "<p><b>Problem:</b> an estate agent stores, for each house, the address, number of bedrooms, price and whether it has been sold.</p>" +
      pre("TYPE THouse\n    DECLARE Address  : STRING\n    DECLARE Bedrooms : INTEGER\n    DECLARE Price    : REAL\n    DECLARE Sold     : BOOLEAN\nENDTYPE") +
      "<p>A <b>record</b> is the best choice: one item (a house) with fields of <b>different</b> data types.</p>",
    checks:[
      mc("A program needs a type for a fixed number of colours to choose from: Red, Green, Blue. Which user-defined type is most suitable?", "Enumerated", ["Pointer", "Record", "Set"], "A fixed, ordered list of named values is what an enumerated type is for."),
      mc("Which type is most suitable for the data about a single employee: name (STRING), age (INTEGER) and full-time (BOOLEAN)?", "Record", ["Enumerated", "Pointer", "Set"], "A record groups fields of different data types under a single identifier."),
      mc("Which type is most suitable for the addresses of integer values held in main memory?", "Pointer", ["Record", "Enumerated", "Set"], "A pointer stores memory addresses.")
    ] },

  /* ===================== 13.2 File organisation and access ===================== */
  { id:"13.2a", code:"13.2.1", title:"Serial and sequential file organisation",
    concept:
      "<p>Data is stored in files as <b>records</b>. <b>File organisation</b> is how the records are physically arranged in the file.</p>" +
      tbl(["", "Serial", "Sequential"], [
        ["Order of records", "One after another in the order they were <b>added</b> (chronological)", "One after another in a <b>given order</b>, usually by a <b>key field</b>"],
        ["Adding a record", "<b>Appended</b> at the end", "<b>Inserted in the correct place</b> to keep the order"],
        ["Typical use", "Temporary files, transaction logs, batch processing, backups", "Master files such as payroll, billing, customer accounts"]]) +
      "<p>A <b>key field</b> is a field whose value is unique for every record and identifies it, for example a customer number.</p>",
    example:
      "<p>A gas company stores customer meter readings in the order they arrive. This is a <b>serial</b> file (chronological). At the end of the month a program sorts them by customer number and uses them to update the customer master file, which is <b>sequential</b> (ordered by customer number).</p>" +
      "<p>If Customer 5 is added to a sequential file that holds customers 1, 2, 3, 4, 7 and 8, the record has to go between 4 and 7.</p>" +
      "<p><b>Exam link:</b> mark schemes award marks for <i>records stored one after another in chronological order</i> (serial) and <i>in a given order based on a key field</i> (sequential). Chronological order is not correct for sequential.</p>",
    checks:[
      mc("In a <b>serial</b> file, how are records stored?", "One after another in the order they were added", ["In order of the key field", "At a position calculated from the key field", "In a random order chosen by the user"], "Serial: chronological order of arrival, with new records appended at the end."),
      mc("In a <b>sequential</b> file the records are stored one after another ...", "in a given order, usually based on a key field", ["in the order they arrived", "at positions found by hashing", "in no particular order"], "Sequential: ordered by a key field, so new records are inserted in the right place."),
      tx("Describe serial file organisation. [2]", [["one after another","next to each other","linear","sequence","stored in order"],["order","chronological","order added","order they were added","order of arrival"],["end of the file","appended","added at the end"]], 2, "Records are stored in a file one after another in chronological order (the order in which they were added), and new records are appended at the end of the file."),
      mc("Which is the most suitable use of a sequential file?", "A payroll file processed in employee number order every month", ["Storing each customer meter reading as it arrives", "Finding one booking instantly in an airline system", "Storing a game's save data in any free space"], "Sequential files suit processing whole files in key order. Arrival-order logging is serial; instant lookup suits a random file.")
    ] },

  { id:"13.2b", code:"13.2.1", title:"Random file organisation",
    concept:
      "<p>In <b>random file organisation</b> records are stored in <b>any available position</b> in the file. The position of a record is calculated by applying a <b>hashing algorithm</b> to its <b>key field</b>, so a record can be found directly without reading the others.</p>" +
      "<ul><li>New records go into an empty location (the one the hash function calculates).</li><li>Records are <b>not</b> in key order and not in the order they arrived.</li></ul>" +
      "<p><b>Typical uses:</b> booking systems (e.g. airline), operating system file management, video games, encryption and compression utilities: anything that needs fast access to <b>individual</b> records.</p>",
    example:
      "<p>An airline stores a seat booking under the booking reference. To find booking 3024 the system does not search the whole file: it applies the hash function to 3024 and goes to the calculated position.</p>" +
      "<p>This is why random organisation is chosen for <b>login files</b> and <b>booking systems</b>: lookups are quick and only one record is needed each time.</p>",
    checks:[
      mc("In a random file, where is a record stored?", "At a position calculated by applying a hashing algorithm to its key field", ["After the last record that was added", "In key order with the lowest key first", "At a position chosen by the user"], "The hash function turns the record key into an address."),
      mc("Which file organisation is most suitable for a booking system where individual records must be found quickly?", "Random", ["Serial", "Sequential", "Chronological"], "Random organisation allows direct access to a single record."),
      tx("Describe how a record is stored in a random file. [3]", [["any available","any position","no particular order","empty position","empty location","any free"],["record key","key field","key"],["hash","hashing","hash function","hashing algorithm"],["calculate","calculated","determine","address","location"]], 3, "Records are stored in any available (empty) position. A hashing function is applied to the record key (key field) to calculate the location where the record is stored.")
    ] },

  { id:"13.2c", code:"13.2.2", title:"File access: sequential and direct",
    concept:
      "<p><b>File access</b> is the method used to physically <b>find</b> a record in a file.</p>" +
      tbl(["", "Sequential access", "Direct access"], [
        ["How", "Records are searched <b>one after another from the start of the file</b> until the record is found", "A record is found <b>without reading the others</b>"],
        ["Used with", "<b>Serial</b> and <b>sequential</b> files", "<b>Sequential</b> files (using an <b>index</b> of key fields) and <b>random</b> files (using a <b>hash function</b>)"],
        ["Search ends when", "The record is found, the end of the file is reached, or (sequential file) the current key is <b>greater</b> than the key being searched", "The calculated address is read and the key checked"],
        ["Best for", "Processing <b>every</b> record (high hit rate), e.g. monthly bills or payroll", "Finding or updating <b>one</b> record (low hit rate), e.g. changing a customer's phone number"]]),
    example:
      "<p>A sequential file holds customers 1, 2, 3, 4, 5, 7 and 8. A program searches for Customer 6 using <b>sequential access</b>. It reads 1, 2, 3, 4, 5, then reaches 7, which is greater than 6, so it stops: Customer 6 is not in the file. The records 7 and 8 never needed reading.</p>" +
      "<p>In a serial file the whole file would have to be read, because the records are in no key order.</p>" +
      "<p><b>Exam link:</b> in a past paper, the mark points for searching a sequential file were: each record is searched one after another / from the physical start of the file / using the record key / until the record is found, or the key being searched has been exceeded, or the end of the file is reached.</p>",
    checks:[
      mc("Which pairing of file organisation and access is correct?", "Random file and direct access", ["Serial file and direct access", "Random file and sequential access only", "Serial file and index lookup"], "Random files use direct access (hashing). Serial files can only be read sequentially. Sequential files can use sequential access or direct access using an index."),
      mc("A sequential file is searched for the key 40. The records read are 10, 20, 30, 50. What does the program conclude?", "Record 40 is not in the file", ["Record 40 is the last record", "Record 40 is the next record", "The file is corrupt"], "The key 50 is greater than 40, so 40 would have been found earlier: it does not exist."),
      mc("Which task suits sequential access best?", "Printing every customer's bill at the end of the month", ["Updating the address of one customer", "Finding one flight booking", "Checking one password"], "Processing every record (high hit rate) is efficient with sequential access."),
      tx("Describe how a record is found in a serial file using sequential access. [3]", [["each record","one after another","one at a time","linearly","in turn"],["start","beginning","first record","physical start"],["record key","key field","key","compare","check"],["until","found","end of the file"]], 3, "Sequential access starts at the physical start of the file and checks each record, one after another, comparing the record key, until the record is found or the end of the file is reached.")
    ] },

  { id:"13.2d", code:"13.2.3", title:"Hashing algorithms",
    concept:
      "<p>A <b>hashing algorithm</b> is a formula applied to a record's <b>key field</b> that gives the <b>address</b> where the record is stored. A simple one uses <b>MOD</b>:</p>" +
      pre("Address = StartAddress + (Key MOD NumberOfRecords) * RecordSize") +
      "<ul><li>Key MOD NumberOfRecords always gives a value from 0 to NumberOfRecords − 1, so the address stays inside the file.</li><li>RecordSize is the number of locations each record uses.</li></ul>" +
      "<p>To <b>read</b> a record, use the same formula, go to the address, then <b>check that the key stored there matches</b> the key being searched.</p>",
    example:
      "<p>A file starts at address 500 and has space for 1000 records, each using 5 locations. Key fields are from 1 to 9999.</p>" +
      pre("Address = 500 + (Key MOD 1000) * 5") +
      "<p>Key 9354: 9354 MOD 1000 = 354, so address = 500 + 354 × 5 = <b>2270</b>.</p>" +
      "<p>Another simple file has space for 2000 records, starts at address 0 and each record takes one location. Key 3024: 3024 MOD 2000 = 1024, so the record goes to address <b>1024</b>.</p>",
    checks:[
      mc("A random file starts at address 0. It has space for 200 records of one location each. The hash function is <code>Key MOD 200</code>. Where is the record with key 1337 stored?", "137", ["1337", "200", "7"], "1337 MOD 200 = 137 (1337 = 6 × 200 + 137), so the address is 0 + 137 = 137."),
      mc("A file starts at address 100. It has space for 500 records. Each record uses 4 locations. The hash function is <code>100 + (Key MOD 500) * 4</code>. What is the address for key 1234?", "1036", ["1234", "934", "936"], "1234 MOD 500 = 234. 234 × 4 = 936. 100 + 936 = 1036."),
      mc("Why must the key stored at the calculated address be checked when a record is read?", "Different keys can give the same address", ["The hash function changes each time it is used", "The file is sorted by key", "The address might be negative"], "Two different keys can hash to the same address (a collision), so the stored key must match the key being searched.")
    ] },

  { id:"13.2e", code:"13.2.3", title:"Collisions: open and closed hashing",
    concept:
      "<p>A <b>collision</b> happens when two different keys give the <b>same address</b>. For example, with <code>Key MOD 2000</code>, keys 3024 and 5024 both give 1024. A collision-handling method is needed.</p>" +
      tbl(["Method", "How it works"], [
        ["<b>Open hashing</b> (open addressing, linear probing)", "The record is stored in the <b>next free location</b> after the calculated address"],
        ["<b>Closed hashing</b> (overflow area)", "An <b>overflow area</b> is set up, and the record is stored in the next free space <b>in the overflow area</b>"]]) +
      "<p><b>Finding</b> a record: calculate the address and read the record there. If its key does not match, <b>search on</b>: the following locations (open hash) or the overflow area (closed hash) until the key is found.</p>",
    example:
      "<p>Using <code>Key MOD 2000</code> with open hashing: key 3024 is stored at 1024. Later, key 5024 also gives 1024, which is taken, so the record is stored at the next free location, <b>1025</b>.</p>" +
      "<p>To read key 5024 the program goes to 1024, sees key 3024 (no match), moves to 1025 and finds 5024.</p>" +
      "<p><b>Exam link:</b> past-paper mark points for finding a record in a random file: direct access is used; a hash function is applied to the key; if the record at that location matches it is retrieved; otherwise a collision strategy is used, e.g. the following records are searched linearly (linear probing).</p>",
    checks:[
      mc("What is a collision in hashing?", "Two different keys produce the same address", ["The file is full", "A key is not found", "The hash function produces a negative number"], "A collision is when two keys hash to the same location."),
      mc("In <b>open</b> hashing, where is a record placed if its calculated address is already used?", "In the next free location after that address", ["In a separate overflow area", "At the start of the file", "It is discarded"], "Open hashing uses the next free space; closed hashing uses an overflow area."),
      tx("Describe how a record is retrieved from a random file that uses a hashing algorithm. [4]", [["hash","hashing","hash function"],["key field","record key","key"],["address","location","position","calculate"],["match","compare","check","found"],["collision","not found","does not match","next","overflow","linear","probing"]], 4, "A hashing function is applied to the record key to calculate the address. The record at that location is read and its key is compared. If it matches it is retrieved. If not found (a collision) the following locations are searched linearly (open hash) or the overflow area is searched (closed hash).")
    ] },

  /* ===================== 13.3 Floating-point numbers ===================== */
  { id:"13.3a", code:"13.3.1", title:"The floating-point format",
    concept:
      "<p>Fixed-point binary has a limited range and cannot store fractions well. <b>Floating-point</b> stores a number as <b>M × 2<sup>E</sup></b>, like standard form in denary:</p>" +
      "<ul><li>The <b>mantissa (M)</b> holds the digits (the fractional part), so it sets the <b>accuracy (precision)</b>.</li><li>The <b>exponent (E)</b> is the power of 2, so it sets the <b>range</b>.</li></ul>" +
      "<p>Both parts are stored in <b>two's complement</b>. The mantissa is a fraction with the <b>binary point immediately after the first (sign) bit</b>:</p>" +
      tbl(["Mantissa bit position", "1st (sign)", "2nd", "3rd", "4th", "5th", "..."], [["Place value", "−1", "1/2", "1/4", "1/8", "1/16", "..."]]) +
      "<p>The exponent is a normal two's complement integer, whose place values for 8 bits are −128, 64, 32, 16, 8, 4, 2, 1.</p>" +
      "<p>In these lessons the convention is: <b>mantissa bits first, then exponent bits</b> (for example 8-bit mantissa then 8-bit exponent; the exam may use other sizes such as 10 + 6).</p>",
    example:
      fp("01011010", "00000100") +
      "<p>Mantissa 0.1011010 = ½ + ⅛ + 1/16 + 1/64 = 45/64 = 0.703125. Exponent 00000100 = 4. So the value is 45/64 × 2<sup>4</sup> = <b>11.25</b>.</p>",
    checks:[
      mc("In a floating-point number, the <b>mantissa</b> determines the ...", "accuracy (precision)", ["range", "sign of the exponent", "word length"], "More mantissa bits means more significant digits, so greater accuracy. More exponent bits means greater range."),
      mc("In this format, where is the binary point assumed to be in the mantissa?", "Immediately after the first (left-most) bit", ["At the far right", "In the middle of the mantissa", "Immediately after the exponent"], "The first bit has the place value −1, then the binary point, then 1/2, 1/4, 1/8 ..."),
      mc("What does the exponent do to the mantissa?", "Moves the binary point (multiplies by a power of 2)", ["Adds 2 to the mantissa", "Changes the sign of the mantissa", "Rounds the mantissa"], "A positive exponent moves the binary point to the right; a negative exponent moves it to the left.")
    ] },

  { id:"13.3b", code:"13.3.2", title:"Binary floating-point to denary",
    concept:
      "<p>To convert a floating-point number to denary:</p>" +
      "<ol><li>Find the <b>exponent</b> value (two's complement, so the left-most bit is negative).</li><li>Write the mantissa with the binary point after the first bit.</li><li><b>Move the binary point</b> E places: <b>right</b> if E is positive, <b>left</b> if E is negative.</li><li>Read the result using place values (the left-most whole-number bit is negative in two's complement).</li></ol>" +
      "<p><b>Alternatively</b> add up the mantissa place values to get M, then calculate M × 2<sup>E</sup>.</p>",
    example:
      fp("01101000", "00000010") +
      "<p>Exponent = 2. Mantissa = 0.1101000. Move the point 2 places right: 011.01000 = 3 + ¼ = <b>3.25</b>.</p>" +
      fp("10110000", "00000011") +
      "<p>Exponent = 3. Mantissa = 1.0110000 = −1 + ¼ + ⅛ = −0.625. Move the point 3 places right: 1011.0000 = −8 + 2 + 1 = −5. Check: −0.625 × 2<sup>3</sup> = <b>−5</b>.</p>" +
      fp("01100000", "11111110") +
      "<p>Exponent = −2 (11111110 = −128 + 126). Mantissa 0.11 = 0.75. Move the point 2 places left: 0.0011 = 0.1875. Check: 0.75 × 2<sup>−2</sup> = <b>0.1875</b>.</p>",
    checks:[
      mc("Convert to denary. Mantissa 01101000, exponent 00000011 (8-bit mantissa, 8-bit exponent).", "6.5", ["13", "3.25", "0.8125"], "M = 0.1101000 = 0.8125. E = 3. 0.8125 × 8 = 6.5. (Moving the point three places right gives 0110.1000 = 6.5.)"),
      mc("Convert to denary. Mantissa 10110000, exponent 00000010.", "−2.5", ["−5", "2.5", "−0.625"], "M = −1 + 1/4 + 1/8 = −0.625. E = 2. −0.625 × 4 = −2.5."),
      mc("Convert to denary. Mantissa 0110000000, exponent 111110 (10-bit mantissa, 6-bit exponent).", "0.1875", ["−2", "6", "0.75"], "Exponent 111110 is −2 in two's complement. M = 0.75. 0.75 × 2^−2 = 0.1875."),
      mc("Convert to denary. Mantissa 1011000000, exponent 000010 (10-bit mantissa, 6-bit exponent).", "−2.5", ["2.5", "−5", "−0.625"], "M = −1 + 0.25 + 0.125 = −0.625. E = 2. −0.625 × 4 = −2.5.")
    ] },

  { id:"13.3c", code:"13.3.2", title:"Denary to binary floating-point",
    concept:
      "<p>To convert a denary number to normalised binary floating-point (8-bit mantissa, 8-bit exponent):</p>" +
      "<ol><li>Convert the <b>whole part</b> and the <b>fraction part</b> to binary. Put a leading 0 for a positive number.</li><li>For a <b>negative</b> number, find the two's complement of the whole binary value.</li><li><b>Move the binary point</b> until the mantissa is <b>0.1...</b> (positive) or <b>1.0...</b> (negative). Count the places moved: this is the exponent (positive if moved left, negative if moved right).</li><li>Write the exponent in two's complement. Fill the rest of the mantissa with 0s.</li></ol>",
    example:
      "<p><b>+6.75:</b> 6.75 = 110.11 → 0110.11. Move the point 3 places left to get 0.11011 (×2<sup>3</sup>).</p>" +
      fp("01101100", "00000011") +
      "<p><b>−6.75:</b> 0110.11 → two's complement: invert 1001.00 and add 0.01 = 1001.01. Move the point 3 places left to get 1.00101 (×2<sup>3</sup>).</p>" +
      fp("10010100", "00000011") +
      "<p><b>+0.1875:</b> 0.0011. Move the point 2 places <b>right</b> to get 0.11, so the exponent is −2 = 11111110.</p>" +
      fp("01100000", "11111110"),
    checks:[
      mc("Which is the correct 8-bit mantissa for +6.75 (normalised)?", "01101100", ["00110110", "11011000", "01100110"], "6.75 = 0110.11. Moving the point 3 places left gives 0.1101100. Normalised positive mantissas start 0.1."),
      mc("Which exponent (8 bits) goes with the normalised form of +6.75?", "00000011", ["00000010", "00000100", "11111101"], "The binary point moved 3 places left, so the exponent is +3."),
      mc("A normalised <b>negative</b> mantissa starts with ...", "1.0", ["0.1", "1.1", "0.0"], "A normalised negative number starts 1.0 (a 1 then a 0). A normalised positive number starts 0.1."),
      mc("Which is the correct normalised 8-bit mantissa for −6.75?", "10010100", ["01101100", "10011100", "11011100"], "−6.75 = 1001.01 in two's complement. Moving the point 3 places left gives 1.0010100.")
    ] },

  { id:"13.3d", code:"13.3.3", title:"Normalisation",
    concept:
      "<p>The same value can be stored in many ways: moving bits in the mantissa and changing the exponent to match gives the same number but wastes bits. <b>Normalisation</b> removes this.</p>" +
      "<ul><li>A <b>positive</b> normalised mantissa starts <b>0.1</b>.</li><li>A <b>negative</b> normalised mantissa starts <b>1.0</b>.</li><li>To normalise: shift the mantissa bits <b>left</b> until it starts 0.1 or 1.0. <b>Reduce the exponent by 1</b> for each shift.</li></ul>" +
      "<p><b>Why normalise?</b> (1) It gives the <b>maximum precision</b>, since no mantissa bits are wasted on leading 0s (or 1s). (2) Each number has <b>only one representation</b>, which makes comparing and calculating easier. (3) The range is used as fully as possible.</p>",
    example:
      "<p>Normalise 0.0011010 with exponent 00000110 (= 6, value 13).</p>" +
      "<p>Shift left 2 places to get 0.1101000. Reduce the exponent by 2 to 4 = 00000100. The value is still 0.8125 × 16 = <b>13</b>.</p>" +
      fp("00011010", "00000110") + "<p>↓ normalised ↓</p>" + fp("01101000", "00000100") +
      "<p>A negative example: 1.1101100 with exponent 10. Shift left 2 places to get 1.0110000 and exponent 8. The value stays −160.</p>",
    checks:[
      mc("Which mantissa is normalised?", "0.1010000", ["0.0101000", "1.1010000", "0.0010100"], "A positive normalised mantissa starts 0.1. A negative one starts 1.0. 1.1010000 is a negative number that is not normalised."),
      mc("A mantissa 0.0010110 has an exponent of 00000101. After normalising, the exponent is ...", "00000011", ["00000111", "00000100", "00000101"], "Shifting the mantissa 2 places left to get 0.1011000 reduces the exponent by 2: 5 − 2 = 3."),
      mc("Which mantissa is a normalised <b>negative</b> number?", "1.0110000", ["1.1110000", "0.1110000", "1.1011000"], "A normalised negative mantissa starts 1.0. 1.1xxxxxx can be shifted left to become 1.0xxxxxx."),
      tx("Explain why floating-point numbers are normalised. [2]", [["precision","accuracy","accurate","no wasted bits","maximum precision","significant"],["one representation","only one","unique","same number","different ways","compare","range"]], 2, "Normalisation gives the maximum precision, because no mantissa bits are wasted on leading zeros, and it means that each number has only one representation (instead of many equivalent ones).")
    ] },

  { id:"13.3e", code:"13.3.1", title:"Accuracy and range: the mantissa/exponent trade-off",
    concept:
      "<p>A floating-point number has a fixed number of bits. Giving more bits to one part means fewer for the other:</p>" +
      tbl(["", "More bits for the <b>mantissa</b>", "More bits for the <b>exponent</b>"], [
        ["Effect", "Greater <b>accuracy (precision)</b>", "Greater <b>range</b> (larger and smaller numbers)"],
        ["Cost", "Smaller range", "Less accuracy"]]) +
      "<p>For 8-bit mantissa and 8-bit exponent (two's complement):</p>" +
      "<ul><li>Largest positive number = 127/128 × 2<sup>127</sup> (mantissa 01111111, exponent 01111111).</li><li>Smallest positive normalised number = ½ × 2<sup>−128</sup> (mantissa 01000000, exponent 10000000).</li></ul>",
    example:
      "<p>Compare three layouts of a 16-bit word:</p>" +
      tbl(["Mantissa", "Exponent", "Result"], [["12 bits", "4 bits", "High accuracy, small range (largest exponent only 7)"], ["8 bits", "8 bits", "Reduced accuracy, larger range"], ["4 bits", "12 bits", "Poor accuracy, huge range"]]) +
      "<p><b>Exam link:</b> a past paper asked students to explain how a stored result could <b>exceed the maximum value</b> for the exponent size (an overflow), and what extra exponent bit would be needed to extend the range.</p>",
    checks:[
      mc("A computer needs to store very large and very small numbers but accuracy is less important. How should the bits be allocated?", "More bits for the exponent", ["More bits for the mantissa", "All bits for the mantissa", "No bits for the exponent"], "A bigger exponent gives a bigger range of numbers."),
      mc("What is the effect of increasing the number of bits in the mantissa (the total word length staying the same)?", "Accuracy increases but range decreases", ["Range increases and accuracy decreases", "Both accuracy and range increase", "Neither changes"], "The bits must come from the exponent, so the range falls."),
      tx("A computer stores floating-point numbers using a 10-bit mantissa and a 6-bit exponent. It is changed to an 8-bit mantissa and an 8-bit exponent. State the effect on accuracy and range. [2]", [["accuracy","precision"],["decrease","less","lower","reduce","worse"],["range","larger","greater","increase","bigger"]], 3, "The accuracy (precision) decreases because the mantissa has fewer bits, but the range of numbers increases because the exponent has more bits.")
    ] },

  { id:"13.3f", code:"13.3.4", title:"Overflow, underflow and rounding errors",
    concept:
      "<p>Many numbers cannot be stored exactly in binary. A mantissa has a limited number of bits, so a number such as 5.88 or 0.1 is stored as the <b>closest value that fits</b>. This is an <b>approximation</b>, giving a <b>rounding error</b>. More mantissa bits make the error smaller; <b>double precision</b> uses more bits to reduce it.</p>" +
      "<ul><li><b>Overflow</b>: a calculation gives a number <b>too large</b> for the exponent to store (larger than the maximum value).</li><li><b>Underflow</b>: a calculation gives a number <b>too small</b> (closer to zero than the smallest storable value), so it may be stored as zero or give an error.</li><li>Normalised numbers cannot store <b>exactly zero</b> (the mantissa must start 0.1 or 1.0), so a special pattern is needed.</li></ul>",
    example:
      "<p>5.88 with an 8-bit mantissa: .88 × 2 repeatedly gives 0.11100001... but only 7 fractional bits fit, so the stored mantissa is 0.1011100 × 2<sup>3</sup> = <b>5.75</b>. The difference of 0.13 is the rounding error.</p>" +
      "<p>Adding 0.1 repeatedly in a program gives outputs like 0.39999999 instead of 0.4, because 0.1 has no exact binary representation. In the same way, comparing two calculated reals with = can fail, so programmers compare with a small tolerance instead.</p>" +
      "<p><b>Exam link:</b> a past paper awarded marks for: <i>the result is less than the lowest possible value that can be stored, so an underflow occurs</i> (the exponent is too negative, so the result becomes zero).</p>",
    checks:[
      mc("Why can the denary number 0.1 not be stored exactly in binary floating-point?", "It cannot be written as a finite sum of powers of 2", ["It is smaller than 1", "The exponent is always negative", "Computers can only store integers"], "0.1 needs an infinite binary fraction, so the stored value is a rounded approximation."),
      mc("A calculation produces a result closer to zero than the smallest number that can be stored. What is this called?", "Underflow", ["Overflow", "Truncation of the key", "A collision"], "Underflow: too small to store (exponent too negative)."),
      mc("A calculation produces a result larger than the largest number that can be stored. What is this called?", "Overflow", ["Underflow", "Normalisation", "Hashing"], "Overflow: the number is too large for the exponent size."),
      tx("Explain why the result of a floating-point calculation may not be exactly correct. [2]", [["approximation","approximate","rounded","rounding","not exact","cannot be stored exactly","limited"],["mantissa","bits","number of bits","finite","limited precision","fixed number"]], 2, "Some real numbers cannot be represented exactly in binary, so they are stored as an approximation. The mantissa has a fixed number of bits, so the value is rounded and a rounding error occurs.")
    ] },

  { id:"13.3g", code:"13.3.5", title:"Rounding errors in programs",
    concept:
      "<p>A binary floating-point value is usually only an <b>approximation</b> of the real number it represents. Fractions such as 0.1, 0.2 or 0.3 need an infinite number of binary digits, so the stored value is <b>rounded</b> to the number of bits available. Small errors can <b>build up</b> when many calculations are done.</p>" +
      "<ul><li>Never compare two calculated real numbers for equality (<code>IF a = b</code>); compare the <b>difference</b> with a small tolerance, for example <code>ABS(a - b) &lt; 0.000001</code>.</li><li>Use <b>integers</b> for money (store pence or cents, not pounds with decimals).</li><li>A bigger mantissa (more bits, or double precision) gives a <b>smaller</b> rounding error.</li></ul>",
    example:
      "<p>In Python, <code>0.1 + 0.2</code> gives <code>0.30000000000000004</code> and <code>0.1 + 0.2 == 0.3</code> is <b>False</b>.</p>" +
      pre("a = 0.1 + 0.2\nb = 0.3\nprint(a == b)               # False: rounding error\nprint(abs(a - b) < 0.000001) # True: compare with a tolerance"),
    checks:[
      mc("Why does 0.1 + 0.2 = 0.3 sometimes give FALSE in a program?", "0.1 and 0.2 cannot be stored exactly in binary, so rounding errors occur", ["The computer cannot add decimals", "The exponent is always negative", "0.3 is too large for the mantissa"], "The stored values are approximations, so the sum differs very slightly from the stored 0.3."),
      mc("How should two calculated real numbers be compared?", "Check that their difference is smaller than a small tolerance", ["Use the = operator", "Convert both to strings", "Use the DIV operator"], "A tolerance allows for tiny rounding errors."),
      mc("How can the rounding error in a floating-point number be reduced?", "Use more bits for the mantissa", ["Use fewer bits for the mantissa", "Use more bits for the exponent only", "Store the number as text"], "More mantissa bits means more precision."),
      tx("Explain why a binary representation of a real number may be only an approximation. [2]", [["cannot be stored exactly","not exact","approximat","infinite","recurring","cannot be represented exactly","no exact"],["limited","finite","number of bits","mantissa","rounded","rounding"]], 2, "Many real numbers need an infinite (recurring) number of binary digits, but the mantissa has a limited number of bits, so the value has to be rounded and the stored number is only an approximation.")
    ] }

  ];

  var TEST = {
    mcq:[
      mc("Which user-defined type is defined by a list of all possible values with an implied order?", "Enumerated", ["Pointer", "Record", "Set"], "An enumerated type lists every possible value, in order."),
      mc("<code>TYPE Word = ^STRING</code> defines a ...", "pointer type", ["enumerated type", "record type", "set type"], "^ means 'pointer to', so Word is a pointer to a STRING."),
      mc("A file holds records in the order they were created, with new records added at the end. This is ...", "serial organisation", ["sequential organisation", "random organisation", "direct access"], "Chronological order with appending is serial organisation."),
      mc("A hash function is <code>Key MOD 100</code> and the file starts at address 0 with one location per record. Which address is used for key 4375?", "75", ["43", "4375", "100"], "4375 MOD 100 = 75."),
      mc("Which gives <b>direct access</b> to a record in a random file?", "Applying a hashing algorithm to the record key", ["Reading every record from the start", "Searching until the key is larger", "Sorting the file by key"], "The hash function calculates the address, so no other records need reading."),
      mc("A mantissa 0.0101000 with exponent 3 is normalised. The new mantissa and exponent are ...", "0.1010000 and 2", ["0.1010000 and 4", "0.0101000 and 3", "1.0101000 and 3"], "Shift left 1 place to get 0.1010000 and reduce the exponent by 1."),
      mc("Mantissa 01100000 and exponent 00000011 (8 and 8 bits). What is the denary value?", "6", ["3", "12", "0.75"], "0.75 × 2^3 = 6."),
      mc("What happens to the accuracy and range if bits are moved from the mantissa to the exponent?", "Accuracy falls and range rises", ["Accuracy rises and range falls", "Both rise", "Both fall"], "Fewer mantissa bits means less accuracy; more exponent bits means a larger range.")
    ],
    typed:[
      { q:"Write the pseudocode to declare an enumerated type called Animals with the values Alpaca, Chicken, Donkey, Duck, Goat, Pony and Sheep in this order. [2]", groups:[["type animals"],["alpaca chicken donkey duck goat pony sheep"]], need:2, model:"TYPE Animals = (Alpaca, Chicken, Donkey, Duck, Goat, Pony, Sheep)" },
      { q:"Describe the difference between serial and sequential file organisation. [3]", groups:[["serial"],["chronological","order added","order they were added","order of arrival","arrival"],["sequential"],["key field","key","given order","sorted","ordered"]], need:3, model:"In a serial file the records are stored in chronological order, the order in which they were added, and new records are appended at the end. In a sequential file the records are stored in a given order, usually of a key field, so a new record has to be inserted in the correct place." },
      { q:"A file uses a hashing algorithm. Explain what a collision is and describe one way of dealing with it. [3]", groups:[["same address","same location","same position","two keys","two records","same hash"],["open","next free","next available","following","linear","probing"],["closed","overflow"]], need:2, model:"A collision is when two different record keys produce the same address from the hash function. In open hashing the record is stored in the next free location after that address; in closed hashing it is stored in an overflow area." },
      { q:"Convert +3.5 to a normalised floating-point number with an 8-bit mantissa and an 8-bit exponent. Show your mantissa and exponent. [3]", groups:[["01110000"],["00000010"]], need:2, model:"3.5 = 011.1 = 0.111 × 2^2, so the mantissa is 01110000 and the exponent is 00000010." }
    ]
  };

  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat(LESSONS);
  (root.ILEARN_TESTS = root.ILEARN_TESTS || {})[13] = TEST;
})(typeof window !== "undefined" ? window : this);
