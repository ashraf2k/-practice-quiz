/* iLearn puzzles: one optional mini-game per lesson, keyed by lesson id.
   Types are defined in learn-games.js (sort, order, match, bits, gate, scramble, bug, rows, tf). */
(function(root){
  "use strict";
  var PLAYERS_COLS = ["ID","Name","Team","Points","Active"];
  var PLAYERS = [["P1","Asha","Reds","42","TRUE"],["P2","Ben","Blues","35","FALSE"],["P3","Chen","Reds","51","TRUE"],["P4","Dina","Greens","35","TRUE"],["P5","Eli","Blues","60","TRUE"]];

  var G = {

  /* ---------- Topic 1 ---------- */
  "1.1.1": { type:"tf", title:"Fact or myth: binary", items:[
    ["Computers use binary because their parts have two states: on and off.", true, "Transistors are switches that are either on (1) or off (0)."],
    ["Binary uses the digits 0 to 9.", false, "Binary only uses 0 and 1."],
    ["A bit is a single binary digit.", true, "Bit stands for binary digit."],
    ["A byte is 4 bits.", false, "A byte is 8 bits. Four bits is a nibble."],
    ["A nibble is half a byte.", true, "4 bits is half of 8 bits."],
    ["Inside the CPU, data is stored in hexadecimal.", false, "The computer always stores data in binary. Hexadecimal is only for humans."] ] },
  "1.1.2b": { type:"bits", title:"Bit flipper", prompt:"Tap the bits to turn them on (1) or off (0) and make each number.", bits:8, targets:[5,13,37,100,200] },
  "1.1.2c": { type:"match", title:"Hex digit match", prompt:"Match each hexadecimal letter with its denary value.", pairs:[["A","10"],["B","11"],["C","12"],["D","13"],["E","14"],["F","15"]] },
  "1.1.2d": { type:"match", title:"Hex to nibble", prompt:"Match each hexadecimal digit with its 4-bit binary pattern.", pairs:[["A","1010"],["F","1111"],["7","0111"],["C","1100"],["3","0011"]] },
  "1.1.4a": { type:"match", title:"Binary addition rules", prompt:"Match each sum with the answer you write down.", pairs:[["0 + 0","0"],["0 + 1","1"],["1 + 1","0, carry 1"],["1 + 1 + 1","1, carry 1"]] },
  "1.1.4b": { type:"tf", title:"Fact or myth: overflow", items:[
    ["Overflow happens when a result is too big for the bits available.", true, "There is no room for the extra bit."],
    ["An 8-bit register can store any whole number up to 255.", true, "11111111 in binary is 255."],
    ["Adding 11111111 and 00000001 in 8 bits causes an overflow.", true, "The answer needs 9 bits."],
    ["Overflow only happens when subtracting.", false, "It happens when adding results that are too large."],
    ["The extra carry bit is kept safely when an overflow happens.", false, "It is lost, so the answer is wrong."],
    ["A bigger register can reduce the chance of overflow.", true, "More bits means larger numbers fit."] ] },
  "1.1.5": { type:"tf", title:"Fact or myth: shifts", items:[
    ["Shifting left by 1 place doubles the number, if no 1 is lost.", true, "Every bit moves up to the next place value."],
    ["Shifting right by 1 place halves the number.", true, "Every bit moves down one place value."],
    ["Shifting left by 2 places multiplies by 4.", true, "Doubling twice gives multiply by 4."],
    ["In a logical shift, the gaps are filled with 1s.", false, "The gaps are filled with 0s."],
    ["Bits shifted off the end are kept.", false, "They are lost."],
    ["A left shift can lose a leading 1 and give a wrong answer.", true, "A leading 1 shifted out means the result is no longer double."] ] },
  "1.2.1": { type:"sort", title:"ASCII or Unicode?", prompt:"Which character set does each statement describe?", cats:["ASCII","Unicode"], items:[
    ["The original version has 128 characters",0],["Can store emojis",1],["Supports characters from many world languages",1],["Fine for basic English text",0],["Needs more bits per character",1],["Uses 7 bits in its original form",0] ] },
  "1.2.2": { type:"scramble", title:"Sound words", words:[["SAMPLE","One measurement of the sound wave"],["ANALOGUE","A sound wave that is continuous"],["DIGITAL","Stored as binary numbers"],["BIT DEPTH","Number of bits for each sample"]] },
  "1.2.3": { type:"match", title:"Image vocabulary", pairs:[["Pixel","The smallest single-colour unit of an image"],["Resolution","The width and height of an image in pixels"],["Colour depth","The number of bits used for each pixel's colour"],["Metadata","Extra data stored with the image, such as its dimensions"]] },
  "1.3.1": { type:"order", title:"Storage ladder", prompt:"Tap the units in order, from the smallest to the largest.", steps:["bit","nibble","byte","kibibyte (KiB)","mebibyte (MiB)","gibibyte (GiB)","tebibyte (TiB)"] },
  "1.3.4": { type:"sort", title:"Lossy or lossless?", cats:["Lossy","Lossless"], items:[
    ["JPEG photo",0],["MP3 music",0],["ZIP archive",1],["Run-length encoding",1],["Permanently removes some data",0],["Original can be rebuilt exactly",1],["Best when every character must be kept",1],["Smaller files for streaming video",0] ] },

  /* ---------- Topic 2 ---------- */
  "2.1.1a": { type:"match", title:"Parts of a packet", pairs:[["Header","Destination address, packet number and sender's address"],["Payload","The actual data being sent"],["Trailer","Marks the end of the packet"]] },
  "2.1.1b": { type:"order", title:"Packet switching", prompt:"Put the journey of a message in order.", steps:["The data is split into packets","Each packet gets a header with its packet number","Packets travel by different routes","Routers pass each packet towards the destination","Packets may arrive out of order","The packets are put back in order"] },
  "2.1.2b": { type:"sort", title:"Which duplex?", cats:["Simplex","Half-duplex","Full-duplex"], items:[
    ["Data travels one way only",0],["Both ways, but not at the same time",1],["Both ways at the same time",2],["Walkie-talkie",1],["Telephone call",2],["Sending a document to a printer",0] ] },
  "2.1.3": { type:"tf", title:"Fact or myth: USB", items:[
    ["USB sends data one bit after another.", true, "USB is a serial interface."],
    ["USB sends many bits at once on separate wires.", false, "That is parallel transmission."],
    ["A USB standard means devices from different makers can connect.", true, "It is a widely used standard."],
    ["Data sent over USB is less likely to arrive out of order.", true, "Bits travel on one wire in sequence."],
    ["USB can only connect a mouse.", false, "Many types of device use USB."],
    ["USB cables are used to transmit data between a device and a computer.", true, "That is the purpose of the interface."] ] },
  "2.2.2a": { type:"tf", title:"Fact or myth: parity", items:[
    ["Even parity means the total number of 1s is even.", true, "The parity bit is set to make the total even."],
    ["Odd parity means the total number of 1s must be odd.", true, "The parity bit is set to make the total odd."],
    ["A parity check tells you which bit is wrong.", false, "It only shows an error in the byte."],
    ["A parity check can correct the error automatically.", false, "The data has to be sent again."],
    ["A parity check can miss an error if two bits change.", true, "The number of 1s could still look right."],
    ["The parity bit is added to every byte.", true, "Each byte gets its own parity bit."] ] },
  "2.2.4": { type:"order", title:"ARQ", prompt:"Put the automatic repeat request steps in order.", steps:["The packet is sent","The receiver checks it for errors","An acknowledgement is sent back if there are no errors","The sender waits for a time-out","If no acknowledgement arrived, the packet is sent again"] },
  "2.3.2b": { type:"match", title:"Encryption words", pairs:[["Plaintext","Data before it is encrypted"],["Ciphertext","Data after it is encrypted"],["Encryption algorithm","Scrambles the data using a key"],["Public key","Used to encrypt, and can be shared with anyone"],["Private key","Used to decrypt and kept secret"]] },

  /* ---------- Topic 3 ---------- */
  "3.1.2a": { type:"match", title:"Register match", pairs:[["PC","Holds the address of the next instruction"],["MAR","Holds the address being read from or written to"],["MDR","Holds the data just fetched or about to be stored"],["CIR","Holds the instruction being decoded"],["ACC","Holds the results of ALU calculations"]] },
  "3.1.2c": { type:"order", title:"Fetch-decode-execute", prompt:"Put the cycle in order.", steps:["The address in the PC is copied to the MAR","The instruction is fetched into the MDR","The instruction is copied to the CIR","The PC is incremented","The control unit decodes the instruction","The instruction is executed"] },
  "3.2.1": { type:"sort", title:"Input or output?", cats:["Input device","Output device"], items:[
    ["Keyboard",0],["Speaker",1],["Microphone",0],["Monitor",1],["Scanner",0],["Printer",1],["Webcam",0],["Projector",1] ] },
  "3.2.3b": { type:"match", title:"Pick the sensor", prompt:"Which sensor suits each job?", pairs:[["Switching on a street light at dusk","Light sensor"],["Keeping a greenhouse warm","Temperature sensor"],["Checking water in a tank","Level sensor"],["Detecting a person in a burglar alarm","Infrared sensor"],["Testing the air for dangerous fumes","Gas sensor"]] },
  "3.3.1b": { type:"sort", title:"RAM or ROM?", cats:["RAM","ROM"], items:[
    ["Holds the start-up instructions",1],["Loses its contents when the power is off",0],["Stores programs that are running now",0],["Contents are not normally changed",1],["Volatile memory",0],["Non-volatile memory",1] ] },
  "3.3.3c": { type:"sort", title:"Which storage type?", cats:["Magnetic","Optical","Solid-state"], items:[
    ["Hard disk drive",0],["DVD",1],["USB flash drive",2],["Blu-ray disc",1],["SD card",2],["Magnetic tape",0],["CD-ROM",1],["SSD",2] ] },
  "3.3.4": { type:"order", title:"Virtual memory", prompt:"Put the steps in order.", steps:["RAM becomes full","Data not needed right now is moved to secondary storage","Space in RAM is freed","The data that is needed is loaded into RAM","If this happens too much, the computer slows down"] },
  "3.3.6": { type:"sort", title:"Cloud or local?", cats:["Cloud storage","Local storage"], items:[
    ["Reachable from any device with internet",0],["Works without an internet connection",1],["Copies are held off-site",0],["You must buy extra drives to get more space",1],["Fees usually rise as you store more",0],["Not affected by the provider's outages",1] ] },
  "3.4.3b": { type:"tf", title:"Fact or myth: addresses", items:[
    ["A MAC address is set by the manufacturer.", true, "It is assigned when the NIC is made."],
    ["A MAC address changes each time a device joins a network.", false, "It stays the same."],
    ["An IPv4 address is four numbers from 0 to 255 separated by dots.", true, "For example 192.168.0.1."],
    ["IPv6 gives many more addresses than IPv4.", true, "It uses more bits."],
    ["A dynamic IP address can change.", true, "The network can give a different one next time."],
    ["A static IP address changes every day.", false, "A static address stays the same."] ] },

  /* ---------- Topic 4 ---------- */
  "4.1.1": { type:"sort", title:"System or application?", cats:["System software","Application software"], items:[
    ["Operating system",0],["Word processor",1],["Device driver",0],["Spreadsheet",1],["Web browser",1],["Utility program",0] ] },
  "4.1.4b": { type:"order", title:"Handling an interrupt", prompt:"Put the steps in order.", steps:["An interrupt signal is sent to the processor","At the end of the cycle the processor checks for interrupts","If the interrupt is more important, the current task is saved","The interrupt service routine runs","The saved task is restored and carries on"] },
  "4.2.1": { type:"sort", title:"High-level or low-level?", cats:["High-level language","Low-level language"], items:[
    ["Closer to human language",0],["Machine code",1],["Python",0],["Assembly language",1],["Works on many types of computer",0],["Linked to one type of processor",1],["Written in binary",1] ] },
  "4.2.4": { type:"sort", title:"Compiler or interpreter?", cats:["Compiler","Interpreter"], items:[
    ["Translates the whole program at once",0],["Translates one line at a time",1],["Creates an executable file",0],["Stops at the first error it finds",1],["Reports errors after translating the whole program",0],["Good for testing as you write",1],["Program runs faster once translated",0],["Needs the source code every time it runs",1] ] },
  "4.2.5": { type:"match", title:"IDE tools", pairs:[["Code editor","Where the program is typed and changed"],["Error diagnostics","Points out mistakes in the code"],["Prettyprint","Colours and lays out code so it is easy to read"],["Auto-completion","Suggests the rest of a word being typed"],["Run-time environment","Lets the program be run inside the IDE"]] },

  /* ---------- Topic 5 ---------- */
  "5.1.2": { type:"match", title:"Parts of a URL", prompt:"Match each part of https://www.example.com/shop/index.html with its name.", pairs:[["https","Protocol"],["www.example.com","Domain name"],["/shop/index.html","Path and file name"]] },
  "5.1.5": { type:"order", title:"Finding a web page", prompt:"Put the steps in order.", steps:["The user types the URL into the browser","The browser sends the domain name to the DNS server","The DNS server returns the IP address","The browser sends a request to the web server","The web server sends the page data back","The browser renders the HTML to show the page"] },
  "5.1.6b": { type:"sort", title:"Which cookie?", cats:["Session cookie","Persistent cookie"], items:[
    ["Deleted when the browser closes",0],["Stays until its expiry date",1],["Keeps items in a basket during one visit",0],["Remembers a login for next time",1],["Held in temporary memory",0],["Remembers a language setting",1] ] },
  "5.2.2": { type:"tf", title:"Fact or myth: blockchain", items:[
    ["A blockchain is a list of linked blocks of data.", true, "Each block is chained to the one before."],
    ["Each block stores a hash of the previous block.", true, "Changing a block would break the chain."],
    ["A digital currency can exist only electronically.", true, "There are no physical coins."],
    ["A blockchain is stored in one place only.", false, "Copies are shared across many computers."],
    ["It is easy to secretly change an old block.", false, "The hashes would no longer match."] ] },
  "5.3.1g": { type:"match", title:"Name the threat", pairs:[["Phishing","Fake emails that trick people into giving details"],["Pharming","Malicious code sends users to a fake website"],["DDoS","Floods a server with requests so it cannot respond"],["Brute-force","Tries many password combinations"],["Malware","Software made to damage or spy on a computer"]] },
  "5.3.2c": { type:"match", title:"Solution match", prompt:"Match each threat with a suitable solution.", pairs:[["Data interception","Encryption"],["Malware","Anti-malware software"],["Hacking","Firewall"],["Brute-force attack","Strong passwords and limited login attempts"],["Weak log-in security","Two-factor authentication"]] },

  /* ---------- Topic 6 ---------- */
  "6.1.1a": { type:"order", title:"The automated loop", prompt:"Put the steps of a heating system in order.", steps:["The sensor measures the temperature","The data is sent to the microprocessor","The microprocessor compares it with the stored value","The microprocessor sends a signal to the actuator","The actuator turns the heater on or off","The sensor measures again"] },
  "6.2.2": { type:"tf", title:"Fact or myth: robots", items:[
    ["A robot has a mechanical structure.", true, "It has parts that move."],
    ["Robots always look like people.", false, "Many look nothing like a person."],
    ["A robot is programmable.", true, "It follows a program."],
    ["A robot has no electrical parts.", false, "It has sensors, a microprocessor and actuators."],
    ["Sensors let a robot respond to its surroundings.", true, "They gather data."] ] },
  "6.2.3b": { type:"sort", title:"Advantage or disadvantage?", cats:["Advantage","Disadvantage"], items:[
    ["Can work 24 hours without a break",0],["Can cause job losses",1],["Expensive to buy and maintain",1],["Does a task the same way each time",0],["Can work in dangerous places",0],["Cannot cope with unexpected situations",1] ] },
  "6.3.3b": { type:"match", title:"AI vocabulary", pairs:[["Machine learning","A system improves by learning from data"],["Expert system","Gives advice using stored knowledge and rules"],["Knowledge base","The facts stored for an expert system"],["Rule base","The IF-THEN rules of an expert system"],["Inference engine","Applies the rules to reach a conclusion"]] },

  /* ---------- Topic 7 ---------- */
  "7.1": { type:"order", title:"Life cycle", prompt:"Put the program development life cycle in order.", steps:["Analysis","Design","Coding","Testing"] },
  "7.5a": { type:"match", title:"Validation checks", pairs:[["Range check","The value must lie between limits"],["Length check","The right number of characters"],["Type check","The correct type of data, such as digits only"],["Presence check","The field must not be left empty"],["Format check","Matches a set pattern such as AA99"]] },
  "7.6": { type:"sort", title:"Test data", prompt:"A score must be a whole number from 1 to 100. Classify each test value.", cats:["Normal","Abnormal","Extreme"], items:[
    ["50",0],["73",0],["-5",1],["150",1],["hello",1],["1",2],["100",2] ] },
  "7.8": { type:"bug", title:"Bug hunt", prompt:"Tap the line that has the error.", rounds:[
    { goal:"Add up 5 numbers.", lines:["Total ← 0","FOR Count ← 1 TO 5","   INPUT Number","   Total ← Number","NEXT Count","OUTPUT Total"], bug:3, why:"Total ← Number replaces the total each time. It should be Total ← Total + Number." },
    { goal:"Output the numbers 10 down to 1.", lines:["FOR Count ← 10 TO 1","   OUTPUT Count","NEXT Count"], bug:0, why:"The loop counts upwards by default, so it needs STEP -1." },
    { goal:"Output Adult if Age is 18 or over.", lines:["INPUT Age","IF Age > 18 THEN","   OUTPUT \"Adult\"","ENDIF"], bug:1, why:"An age of exactly 18 fails the test. It should be Age >= 18." } ] },

  /* ---------- Topic 8 ---------- */
  "8.1.1": { type:"tf", title:"Fact or myth: variables", items:[
    ["The value of a variable can change while the program runs.", true, "That is why it is called a variable."],
    ["The value of a constant can change while the program runs.", false, "A constant keeps the value it was given."],
    ["Score ← Score + 1 adds one to Score.", true, "The right side is worked out, then stored in Score."],
    ["An identifier should be a meaningful name, such as TotalToPay.", true, "Meaningful names make programs easier to read."],
    ["You must use a variable for a tax rate that never changes.", false, "A constant is better for a fixed value."] ] },
  "8.1.2": { type:"sort", title:"Pick the data type", cats:["INTEGER","REAL","STRING","BOOLEAN"], items:[
    ["42",0],["-7",0],["3.14",1],["0.5",1],["\"Hello\"",2],["\"2JK8D\"",2],["TRUE",3],["FALSE",3] ] },
  "8.1.4a": { type:"order", title:"Sequence", prompt:"Put this program to find the area of a circle in order.", steps:["INPUT Radius","Area ← 3.14 * Radius * Radius","OUTPUT Area"] },
  "8.1.4c3": { type:"bug", title:"Loop bug hunt", prompt:"Tap the line that has the error.", rounds:[
    { goal:"Keep asking until the password is open.", lines:["REPEAT","   INPUT Password","UNTIL Password <> \"open\""], bug:2, why:"This stops on a wrong password. The condition should be Password = \"open\"." },
    { goal:"Output the numbers 1 to 5.", lines:["FOR Index ← 1 TO 5","   OUTPUT Index + 1","NEXT Index"], bug:1, why:"Index + 1 outputs 2 to 6. It should output Index." },
    { goal:"Output the numbers 0 to 4.", lines:["Count ← 0","WHILE Count > 5 DO","   OUTPUT Count","   Count ← Count + 1","ENDWHILE"], bug:1, why:"Count starts at 0, so Count > 5 is false and the loop never runs. It should be Count < 5." } ] },
  "8.1.4d": { type:"bug", title:"Totals and counts", prompt:"Tap the line that has the error.", rounds:[
    { goal:"Count how many of 10 marks are 50 or more.", lines:["Count ← 0","FOR Index ← 1 TO 10","   INPUT Mark","   IF Mark >= 50 THEN","      Count ← 1","   ENDIF","NEXT Index","OUTPUT Count"], bug:4, why:"Count ← 1 sets it to 1 every time. It should be Count ← Count + 1." },
    { goal:"Find the average of 5 numbers.", lines:["Total ← 0","FOR Index ← 1 TO 5","   INPUT Number","   Total ← Total + Number","NEXT Index","Average ← Total / Index"], bug:5, why:"The total must be divided by 5, the number of values." },
    { goal:"Add up 3 numbers.", lines:["FOR Index ← 1 TO 3","   INPUT Number","   Total ← Total + Number","NEXT Index","OUTPUT Total"], bug:0, why:"Total is used before it is set. It needs Total ← 0 before the loop." } ] },
  "8.1.4f2": { type:"match", title:"Operator match", pairs:[["MOD","The remainder after a division"],["DIV","The whole number part of a division"],["<>","Not equal to"],["AND","Both conditions must be true"],["OR","At least one condition must be true"]] },
  "8.1.7": { type:"tf", title:"Fact or myth: library routines", items:[
    ["7 MOD 2 gives 1.", true, "7 divided by 2 leaves a remainder of 1."],
    ["DIV(17, 5) gives 3.", true, "17 divided by 5 is 3 remainder 2."],
    ["DIV(9, 2) gives 4.5.", false, "DIV gives the whole number part, which is 4."],
    ["10 MOD 5 gives 2.", false, "10 divides by 5 exactly, so the remainder is 0."],
    ["ROUND(3.67, 1) gives 3.7.", true, "It is rounded to 1 decimal place."],
    ["MOD can be used to test whether a number is even.", true, "A number MOD 2 equals 0 when it is even."] ] },
  "8.2.2": { type:"tf", title:"Fact or myth: arrays", items:[
    ["In the exam pseudocode, arrays start at index 1.", true, "The first element is at index 1."],
    ["An array holds items of different data types.", false, "All items must have the same type."],
    ["ARRAY[1:5] OF INTEGER holds 5 items.", true, "Indexes 1, 2, 3, 4 and 5."],
    ["A 2D array needs two indexes to find an item.", true, "One for the row and one for the column."],
    ["The index is the position of an item in the array.", true, "It tells you where the item is."],
    ["An array index can be any piece of text.", false, "It is a whole number."] ] },
  "8.3.2": { type:"order", title:"Writing to a file", prompt:"Put the file handling in order.", steps:["OPENFILE \"Scores.txt\" FOR WRITE","WRITEFILE \"Scores.txt\", Score","CLOSEFILE \"Scores.txt\""] },

  /* ---------- Topic 9 ---------- */
  "9.1a": { type:"sort", title:"Field or record?", prompt:"Use the Players table (ID, Name, Team, Points, Active).", cats:["Field","Record"], items:[
    ["Name",0],["All the details about one player",1],["Points",0],["Row 3 of the table",1],["Team",0],["P2, Ben, Blues, 35, FALSE",1] ] },
  "9.2": { type:"sort", title:"Choose the data type", cats:["Text","Integer","Real","Boolean"], items:[
    ["Surname",0],["Number of brothers and sisters",1],["Price 4.99",2],["Is a member? (Yes/No)",3],["Phone number 07123456789",0],["Height 1.72",2],["Items in stock: 120",1],["Has paid?",3] ] },
  "9.3": { type:"sort", title:"Primary key or not?", cats:["Good primary key","Poor primary key"], items:[
    ["Student ID number",0],["Surname",1],["Date of birth",1],["Passport number",0],["First name",1],["Unique order number",0] ] },
  "9.4a": { type:"scramble", title:"SQL words", words:[["SELECT","The keyword that lists the fields to show"],["FROM","The keyword that names the table"],["WHERE","The keyword that filters the records"],["FIELD","One column of a table"]] },
  "9.4b": { type:"rows", title:"Which rows come back?", columns:PLAYERS_COLS, rows:PLAYERS, rounds:[
    { query:"SELECT * FROM Players\nWHERE Team = \"Reds\"", answer:[0,2] },
    { query:"SELECT * FROM Players\nWHERE Points > 40", answer:[0,2,4] },
    { query:"SELECT * FROM Players\nWHERE Active = FALSE", answer:[1] },
    { query:"SELECT * FROM Players\nWHERE Points <> 35", answer:[0,2,4] } ] },
  "9.4c": { type:"tf", title:"Fact or myth: ORDER BY", items:[
    ["ORDER BY Points DESC puts the highest points first.", true, "DESC means descending, largest to smallest."],
    ["ASC sorts from largest to smallest.", false, "ASC is ascending: smallest to largest or A to Z."],
    ["ORDER BY is written at the end of the query.", true, "SELECT, FROM, WHERE, then ORDER BY."],
    ["ORDER BY Name ASC sorts names from A to Z.", true, "Ascending order for text is alphabetical."],
    ["ORDER BY goes before FROM.", false, "It comes after FROM and WHERE."] ] },
  "9.4d": { type:"rows", title:"AND or OR?", columns:PLAYERS_COLS, rows:PLAYERS, rounds:[
    { query:"SELECT * FROM Players\nWHERE Team = \"Blues\" AND Points > 40", answer:[4] },
    { query:"SELECT * FROM Players\nWHERE Team = \"Greens\" OR Points > 50", answer:[2,3,4] },
    { query:"SELECT * FROM Players\nWHERE Team = \"Reds\" AND Active = TRUE", answer:[0,2] },
    { query:"SELECT * FROM Players\nWHERE Team = \"Blues\" OR Team = \"Reds\"", answer:[0,1,2,4] } ] },
  "9.4e": { type:"match", title:"SQL keywords", pairs:[["SUM(Points)","Adds up the values in a number field"],["COUNT(ID)","Counts how many records are returned"],["WHERE","Filters the records"],["ORDER BY","Sorts the results"],["FROM","Names the table"]] },

  /* ---------- Topic 10 ---------- */
  "10.1": { type:"match", title:"Gate symbols", pairs:[["NOT","Triangle with a small circle"],["AND","Flat back and a rounded front"],["OR","Curved back and a pointed front"],["NAND","An AND shape with a small circle"],["NOR","An OR shape with a small circle"],["XOR","An OR shape with an extra curved line"]] },
  "10.2a": { type:"gate", title:"Flip the switches", prompt:"Set the inputs so the output X matches the goal.", rounds:[
    { expr:"A AND B", out:1, inputs:["A","B"] },{ expr:"A OR B", out:1, inputs:["A","B"] },{ expr:"NOT A", out:0, inputs:["A"] } ] },
  "10.2b": { type:"gate", title:"Tricky gates", prompt:"Set the inputs so the output X matches the goal.", rounds:[
    { expr:"A NAND B", out:0, inputs:["A","B"] },{ expr:"A NOR B", out:0, inputs:["A","B"] },{ expr:"A XOR B", out:1, inputs:["A","B"] } ] },
  "10.3a": { type:"gate", title:"Circuit challenge", prompt:"Set the inputs so the output X matches the goal.", rounds:[
    { expr:"A AND (NOT B)", out:1, inputs:["A","B"] },{ expr:"(A AND B) OR C", out:1, inputs:["A","B","C"] },{ expr:"NOT (A OR B)", out:0, inputs:["A","B"] } ] },
  "10.3b": { type:"gate", title:"Truth table hunt", prompt:"Find an input row that gives the goal output.", rounds:[
    { expr:"(A AND B) OR (NOT C)", out:0, inputs:["A","B","C"] },{ expr:"(A XOR B) AND C", out:1, inputs:["A","B","C"] },{ expr:"(A OR B) AND (NOT C)", out:1, inputs:["A","B","C"] } ] }
  };

  root.ILEARN_GAMES = G;
})(typeof window !== "undefined" ? window : this);
