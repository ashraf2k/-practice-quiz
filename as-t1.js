/* iLearn AS Level (11BR) -- Topic 1 Information representation: sample lessons.
   Each lesson: learn, worked example, quick checks, then a REAL past-paper question (9618 Paper 1, May/June 2025) marked on the mark-scheme keywords,
   followed by the published mark scheme. */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx;
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function pre(s){ return "<pre class='ln-pre'>" + esc(s) + "</pre>"; }
  function tbl(heads, rows){
    return "<table class='ln-table'><tr>" + heads.map(function(h){ return "<th>" + h + "</th>"; }).join("") + "</tr>" +
      rows.map(function(r){ return "<tr>" + r.map(function(c){ return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
  }
  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat([

  { id:"1.1.2a", code:"1.1.2", title:"Number systems: binary, denary, hexadecimal and two's complement",
    concept:
      "<p>Computers store everything as <b>binary</b> (base 2). People also use <b>denary</b> (base 10) and <b>hexadecimal</b> (base 16, digits 0-9 and A-F) because hexadecimal is a short way to write binary: <b>one hex digit = one group of 4 bits</b> (a nibble).</p>" +
      "<h4>Binary to denary</h4><p>Add the place values of the bits that are 1.</p>" +
      tbl(["128", "64", "32", "16", "8", "4", "2", "1"], [["0", "1", "1", "0", "1", "0", "1", "1"]]) +
      "<p>64 + 32 + 8 + 2 + 1 = <b>107</b>.</p>" +
      "<h4>Denary to binary and hexadecimal</h4><p>Find which place values fit, or divide by 2 repeatedly. <b>If the question gives a number of bits, write all of them, including leading zeros.</b> Then split the binary into groups of 4 from the right and convert each group to a hex digit (A = 10, B = 11, C = 12, D = 13, E = 14, F = 15).</p>" +
      pre("558 in 12 bits:  0010 0010 1110\n                 2    2    E     -> 22E") +
      "<h4>Two's complement (negative numbers)</h4>" +
      "<p>In 8-bit two's complement the left-hand bit has the value <b>&minus;128</b>; the other bits keep their normal values. So <code>11100010</code> = &minus;128 + 64 + 32 + 2 = <b>&minus;30</b>. To negate a number: <b>invert every bit, then add 1</b>.</p>" +
      tbl(["8-bit two's complement", "Binary", "Denary"], [["Smallest", "1000 0000", "&minus;128"], ["Largest", "0111 1111", "127"]]) +
      "<p>The range for <i>n</i> bits is &minus;2<sup><i>n</i>&minus;1</sup> to 2<sup><i>n</i>&minus;1</sup> &minus; 1. Examiners ask for the <b>binary</b> pattern when they say 'two's complement binary integer'; do not write denary.</p>",
    example:
      "<p><b>Convert 1011 0110 (two's complement) to denary.</b></p>" +
      tbl(["&minus;128", "64", "32", "16", "8", "4", "2", "1"], [["1", "0", "1", "1", "0", "1", "1", "0"]]) +
      "<p>&minus;128 + 32 + 16 + 4 + 2 = <b>&minus;74</b>. The left-hand bit is 1, so the answer is negative.</p>" +
      "<p><b>Check by negating:</b> invert 1011 0110 to 0100 1001, add 1 to get 0100 1010 = 74, so the original is &minus;74. &check;</p>" +
      "<p><b>Convert denary 200 to 12-bit binary and hexadecimal.</b> 200 = 128 + 64 + 8 → <code>0000 1100 1000</code> → hex <code>0C8</code> (C = 12, 8 = 8; the leading 0 keeps all 12 bits).</p>" +
      "<p><b>Examiner report (June 2025):</b> the commonest mistakes were leaving out the leading zeros, forgetting the minus sign after converting a two's complement number, and writing <i>denary</i> values when the question asked for two's complement <i>binary</i> integers.</p>",
    checks:[
      mc("Convert the binary number 0010 1101 to denary.", "45", ["35", "53", "43"], "32 + 8 + 4 + 1 = 45."),
      mc("Which hexadecimal number is the same as the binary 1111 0001?", "F1", ["1F", "E1", "F2"], "1111 = F and 0001 = 1."),
      mc("The two's complement binary integer 1111 1100 is what denary number?", "-4", ["252", "4", "-124"], "-128 + 64 + 32 + 16 + 8 + 4 = -4."),
      mc("A question asks for 12-bit binary. Which answer has the correct form for the number 5?", "0000 0000 0101", ["101", "0101", "0000 0101"], "All 12 bits must be written: leading zeros are required."),
      mc("What is the largest 8-bit two's complement integer, in binary?", "0111 1111", ["1111 1111", "1000 0000", "0111 1110"], "The left-hand bit must be 0 for a positive number, and the rest are all 1s (127)."),
      tx("Explain why hexadecimal is often used instead of binary. [2]", [["shorter","fewer digits","compact","easier to read","less error","fewer characters"],["4 bits","four bits","nibble","one digit","each hex digit","group of 4","groups of 4"]], 2, "Hexadecimal is shorter and easier for people to read and less likely to be mistyped, because each hexadecimal digit represents four bits (a nibble)."),
      { type:"pp", src:"9618/12 May/June 2025 · Question 2(a) and (b)", explain:"Write every bit asked for (leading zeros), give denary answers for denary questions and binary patterns for 'binary integer' questions; two's complement 8-bit range is -128 to 127.",
        parts:[
          { label:"(a)", marks:2, kind:"fields", q:"<p>Convert the denary integer <b>558</b> into 12-bit binary and hexadecimal.</p>",
            fields:[{ label:"Binary", ans:["001000101110"], cmp:"bin", marks:1, show:"0010 0010 1110" }, { label:"Hexadecimal", ans:["22E"], cmp:"hex", marks:1, show:"22E" }],
            scheme:"<p>1 mark for:<br><b>0010 0010 1110</b></p><p>1 mark for:<br><b>22E</b></p>", note:"Many candidates answered this very well. The most common mistake was omitting the leading zeros. If the question asks for 12 bits, the leading zeros are required." },
          { label:"(b)(i)", marks:1, kind:"fields", q:"<p>Convert the two's complement binary integer <b>11100010</b> into denary.</p>",
            fields:[{ label:"Denary", ans:["-30","−30"], cmp:"text", marks:1, show:"-30" }],
            scheme:"<p>1 mark for:<br><b>-30</b></p>", note:"Some candidates who found the two's complement of the given binary integer and then converted that to denary forgot the minus sign." },
          { label:"(ii)", marks:2, kind:"fields", q:"<p>Write the smallest and the largest two's complement binary integers that can be represented in 8 bits.</p>",
            fields:[{ label:"Smallest", ans:["10000000"], cmp:"bin", marks:1, show:"1000 0000" }, { label:"Largest", ans:["01111111"], cmp:"bin", marks:1, show:"0111 1111" }],
            scheme:"<p>1 mark for smallest, 1 mark for largest</p><p>Smallest: <b>1000 0000</b><br>Largest: <b>0111 1111</b></p>", note:"Overall, this question was not answered well. Many of the responses gave denary values, despite the question asking for the two's complement binary integers." }
        ] }
    ] },

  { id:"1.1.4a", code:"1.1.4", title:"Binary Coded Decimal (BCD) and where it is used",
    concept:
      "<p><b>Binary Coded Decimal (BCD)</b> stores a denary number <b>one digit at a time</b>: each digit 0-9 is written as its own 4-bit group. The groups 1010 to 1111 are never used.</p>" +
      pre("denary 259 in BCD:\n  2     5     9\n0010  0101  1001") +
      "<p>Compare this with ordinary binary, where 259 = 1 0000 0011 in one block. BCD is less compact (it uses more bits) and harder for the processor to calculate with, but it has real advantages.</p>" +
      "<h4>Why and where BCD is used</h4>" +
      tbl(["Application", "Why BCD helps"], [
        ["Financial / banking calculations", "Money uses exactly two decimal places and must be accurate: BCD avoids the rounding and accumulating errors of binary fractions"],
        ["Electronic displays (calculator, 7-segment display, digital clock)", "A display shows individual digits, so each digit can be sent straight to the display"],
        ["Date and time in a PC's BIOS", "Conversion between denary and BCD is straightforward"],
        ["Barcode systems", "Conversion between denary and BCD can be completed accurately"]]) +
      "<p><b>Hexadecimal</b> is used for: memory addresses, colour codes in web pages (e.g. #FF8800), MAC addresses and error codes, because it is shorter and easier for people to read than binary.</p>",
    example:
      "<p><b>BCD for 4073:</b> 4 → 0100, 0 → 0000, 7 → 0111, 3 → 0011. Answer: <code>0100 0000 0111 0011</code> (16 bits).</p>" +
      "<p><b>Denary for 1001 0110:</b> 1001 = 9 and 0110 = 6, so the number is <b>96</b>.</p>" +
      "<p><b>How to answer 'give an application and justify':</b> the application earns one mark, and the justification earns a second only if it <b>fits that application</b>. Do not just say 'it is easier'. Say <i>why</i>: 'a calculator display shows one digit at a time, so each digit can be sent straight to the display'.</p>" +
      "<p><b>Examiner report (June 2025):</b> many candidates gave a correct application but found it harder to justify the use of BCD.</p>",
    checks:[
      mc("What is the BCD for the denary number 83?", "1000 0011", ["0101 0011", "1010 0011", "0000 1000 0011"], "8 = 1000 and 3 = 0011."),
      mc("The BCD 0111 0001 represents which denary number?", "71", ["113", "17", "49"], "0111 = 7 and 0001 = 1."),
      mc("Why is BCD used in banking software?", "Decimal amounts can be stored exactly without rounding errors", ["It uses fewer bits than binary", "It makes the processor faster", "It encrypts the data"], "Binary cannot represent many decimal fractions exactly; BCD keeps each decimal digit exact."),
      mc("Which of these is NOT a valid group of 4 bits in BCD?", "1100", ["0110", "1001", "0000"], "Only 0000 to 1001 (0 to 9) are used."),
      { type:"pp", src:"9618/12 May/June 2025 · Question 2(c)", explain:"Name a real application of BCD and give a justification that matches it, for example money calculations need exact decimal places.",
        parts:[{ label:"(c)", marks:2, kind:"text", lines:4, q:"<p>Give <b>one</b> application where Binary Coded Decimal (BCD) is used and justify its use.</p><p>Application and justification:</p>",
          points:[
            { t:"1 mark for application (e.g. financial / banking calculations, electronic displays, date and time in the BIOS, barcode systems)", k:["financ","banking","bank","display","7 segment","seven segment","calculator","clock","bios","date and time","barcode","bar code","till","money","currency"] },
            { t:"1 mark for the corresponding justification (e.g. financial transactions use two decimal places and must be accurate: no accumulating / rounding errors; a display only shows individual digits; conversion between denary and BCD is straightforward)", k:[["decimal","accura"],["rounding"],["accumulat"],["exact"],["individual digit"],["each digit"],["digit by digit"],["one digit"],["conversion","straightforward"],["conversion","easy"],["convert","easy"],["convert","straightforward"],["denary","bcd","easier"],["difficult","binary"]] }
          ], max:2,
          scheme:"<p>1 mark for application and 1 mark for corresponding justification</p><p>e.g.</p><ul><li>an application that performs financial / banking calculations</li><li>because financial transactions use only two decimal places and must be accurate, no accumulating / rounding errors and it is difficult to represent decimal values exactly in normal binary.</li></ul><p>Or</p><ul><li>electronic displays</li><li>because visual displays only need to show individual digits</li><li>because conversion between denary and BCD is straightforward</li></ul><p>Or</p><ul><li>The storage of the date and time in the BIOS of a PC</li><li>because conversion between denary and BCD is more straightforward</li></ul><p>Or</p><ul><li>Barcode systems</li><li>because conversion between denary and BCD can be accurately completed</li></ul>",
          note:"Many candidates were able to give an application for the use of Binary Coded Decimal (BCD). Justifying the use of the BCD proved to be more challenging for candidates." }] }
    ] },

  /* ===================================== more Topic 1 lessons ===================================== */
  { id:"1.1.1a", code:"1.1.1", title:"Binary and decimal prefixes: kibi, mebi, kilo, mega",
    concept:
      "<p>A <b>bit</b> is one binary digit (0 or 1). A <b>byte</b> is 8 bits. Big amounts of data are written with a <b>prefix</b>, but there are <b>two families</b> of prefixes and they are <b>not the same size</b>:</p>" +
      tbl(["Binary prefixes (powers of 2)", "Value", "Decimal prefixes (powers of 10)", "Value"], [
        ["kibibyte (KiB)", "2<sup>10</sup> = 1024 bytes", "kilobyte (kB)", "10<sup>3</sup> = 1000 bytes"],
        ["mebibyte (MiB)", "2<sup>20</sup> = 1024 KiB", "megabyte (MB)", "10<sup>6</sup> = 1000 kB"],
        ["gibibyte (GiB)", "2<sup>30</sup> = 1024 MiB", "gigabyte (GB)", "10<sup>9</sup> = 1000 MB"],
        ["tebibyte (TiB)", "2<sup>40</sup> = 1024 GiB", "terabyte (TB)", "10<sup>12</sup> = 1000 GB"]]) +
      "<p><b>Tip:</b> the binary prefixes all sound a little silly (<i>kibi, mebi, gibi, tebi</i>) and contain a <b>bi</b> for <b>bi</b>nary. The decimal ones are the ordinary kilo, mega, giga, tera.</p>" +
      "<p>Why two families? Computers work in powers of 2, so 1024 is the natural 'thousand' for memory. Storage makers prefer the neat decimal numbers, because they make the disk look bigger.</p>",
    example:
      "<ul><li><b>3 kibibytes in bytes:</b> 3 &times; 1024 = <b>3072 bytes</b>.</li>" +
      "<li><b>2 terabytes in gigabytes:</b> a terabyte is a <i>decimal</i> prefix, so 2 &times; 1000 = <b>2000 GB</b> (not 2048).</li>" +
      "<li><b>Why a '1 TB' drive shows about 931 GiB:</b> the maker means 1 000 000 000 000 bytes. Your computer divides by 2<sup>30</sup> (1 073 741 824) and reports about 931 GiB. Nothing is missing: the two sides use <i>different prefixes</i>.</li></ul>" +
      "<p><b>Exam habit:</b> the question tells you the prefix. Read it first, then decide: <i>kibi/mebi/gibi/tebi</i> means &times;1024; <i>kilo/mega/giga/tera</i> means &times;1000.</p>",
    checks:[
      mc("How many bytes are there in one kibibyte?", "1024", ["1000", "1048", "8192"], "kibi is a binary prefix: 2^10 = 1024."),
      mc("Which of these is a decimal (denary) prefix?", "mega", ["mebi", "gibi", "kibi"], "kilo, mega, giga and tera are decimal prefixes. The ones with 'bi' are binary."),
      mc("How many megabytes are there in 3 gigabytes?", "3000", ["3072", "3", "300"], "Giga and mega are both decimal prefixes, so 3 x 1000 = 3000."),
      mc("A file is 2 mebibytes. How many kibibytes is this?", "2048", ["2000", "1024", "2024"], "1 MiB = 1024 KiB, so 2 x 1024 = 2048."),
      tx("State one difference between a kibibyte and a megabyte. [1]", [["1024","2^10","binary prefix","power of 2","210"],["1000","1 000","decimal prefix","denary prefix","power of 10","kilobytes","106","10^6","1 000 000"]], 1, "A kibibyte is 1024 bytes (a binary prefix) whereas a megabyte is 1000 kilobytes / 1 000 000 bytes (a decimal prefix)."),
      ASA.pp("9618/13 May/June 2024 · Question 1(a)", "Binary prefixes (kibi, mebi, gibi, tebi) use powers of 2 and multiply by 1024. Decimal prefixes (kilo, mega, giga, tera) use powers of 10 and multiply by 1000.",
        [ ASA.fields("(a)", 4, "Complete the following description.<br>A kibibyte has a <b>(1)</b> prefix. Three kibibytes is the same as <b>(2)</b> bytes.<br>A megabyte has a <b>(3)</b> prefix. Two terabytes is the same as <b>(4)</b> gigabytes.",
            [["(1) prefix", ["binary"], "text", "binary"], ["(2) bytes", ["3072"], "text", "3072"], ["(3) prefix", ["denary", "decimal"], "text", "denary / decimal"], ["(4) gigabytes", ["2000"], "text", "2000"]],
            { lead: "1 mark for each correct answer:", note: "" }) ])
    ] },

  { id:"1.1.2b", code:"1.1.2", title:"Converting between binary, denary, hexadecimal and BCD",
    concept:
      "<p>Exam questions often give you <b>one number in one system</b> and ask for it in the others. Keep one method for each move:</p>" +
      tbl(["From", "To", "Method"], [
        ["Binary", "Denary", "Add the place values (128, 64, 32, 16, 8, 4, 2, 1 and so on) of every bit that is 1."],
        ["Denary", "Binary", "Subtract the biggest place value that fits, write 1, carry on down (or divide by 2 and read the remainders upwards)."],
        ["Binary", "Hexadecimal", "Group the bits in fours <b>from the right</b>; each group is one hex digit (0&ndash;9, A&ndash;F)."],
        ["Hexadecimal", "Binary", "Turn every hex digit into its own 4-bit group."],
        ["Denary", "BCD", "Convert <b>each digit separately</b> into 4 bits."],
        ["BCD", "Denary", "Split into groups of 4 bits and read each group as one digit."]]) +
      "<p><b>Hex digits:</b> A = 10, B = 11, C = 12, D = 13, E = 14, F = 15. <b>Remember:</b> BCD is not the same as binary! 35 in BCD is <code>0011 0101</code>, but 35 in binary is <code>0010 0011</code>.</p>",
    example:
      "<p><b>Convert denary 2486 to hexadecimal.</b> 2486 &divide; 16 = 155 remainder 6; 155 &divide; 16 = 9 remainder 11 (B); 9 &divide; 16 = 0 remainder 9. Read upwards: <code>9B6</code>.</p>" +
      "<p><b>Hex to binary:</b> 9 = 1001, B = 1011, 6 = 0110, so <code>9B6</code> = <code>1001 1011 0110</code>.</p>" +
      "<p><b>Binary to BCD (via denary):</b> 100100001 = 256 + 32 + 1 = 289. Hex: <code>0001 0010 0001</code> = 121.</p>" +
      "<p><b>Check yourself:</b> convert the answer back. If you get the number you started with, it is right.</p>",
    checks:[
      mc("Which is the BCD for the denary number 160?", "0001 0110 0000", ["1010 0000", "0001 1000 0000", "0010 0110"], "1 = 0001, 6 = 0110, 0 = 0000."),
      mc("What is the hexadecimal for 1011 1110?", "BE", ["EB", "B14", "3E"], "1011 = B, 1110 = E."),
      mc("What is the denary value of hexadecimal 3A?", "58", ["38", "310", "41"], "3 x 16 = 48, A = 10, so 48 + 10 = 58."),
      mc("How many bits does the BCD for the number 905 use?", "12", ["10", "8", "9"], "Three digits and 4 bits for each digit makes 12 bits."),
      tx("Explain why 2486 in BCD is 0010 0100 1000 0110 but its hexadecimal is 9B6. [2]", [["bcd","each digit","digit by digit","separately","one digit"],["hex","hexadecimal","base 16","16","4 bits","binary"]], 2, "BCD converts each denary digit (2, 4, 8, 6) separately into 4 bits. Hexadecimal converts the whole number to base 16 (2486 = 9B6)."),
      ASA.pp("9618/12 May/June 2026 · Question 5(a)", "Know the four conversions and show your working in the working space: the BCD of a number is built digit by digit, but hexadecimal is a base-16 conversion of the whole number.",
        [ ASA.table("(a)", 4, "Complete the table by calculating the missing values. Type each answer (spaces between groups of bits do not matter).",
            ["denary", "unsigned binary", "hexadecimal", "Binary Coded Decimal (BCD)"],
            [ [ {t:"160"}, {t:"10100000"}, {t:"A0"}, {in:["000101100000"], w:200} ],
              [ {in:["289"], w:80}, {t:"100100001"}, {t:"121"}, {t:"001010001001"} ],
              [ {t:"2486"}, {in:["100110110110"], w:160}, {t:"9B6"}, {t:"0010010010000110"} ],
              [ {t:"35123"}, {t:"1000100100110011"}, {in:["8933"], w:80}, {t:"00110101000100100011"} ] ], "cell",
            { scheme: "<p>1 mark for each correctly completed value</p>" + tbl(["denary", "unsigned binary", "hexadecimal", "BCD"], [["160", "10100000", "A0", "<b>0001 0110 0000</b>"], ["<b>289</b>", "100100001", "121", "001010001001"], ["2486", "<b>1001 1011 0110</b>", "9B6", "0010010010000110"], ["35123", "1000100100110011", "<b>8933</b>", "00110101000100100011"]]) }) ])
    ] },

  { id:"1.1.3a", code:"1.1.3", title:"Binary addition, subtraction and overflow",
    concept:
      "<p><b>Binary addition</b> follows four rules, working from the right (the least significant bit):</p>" +
      tbl(["Sum", "Result", "Carry"], [["0 + 0", "0", "0"], ["0 + 1  or  1 + 0", "1", "0"], ["1 + 1", "0", "1"], ["1 + 1 + 1 (with a carry in)", "1", "1"]]) +
      "<p><b>Binary subtraction</b> can be done by direct subtraction with borrowing, or by <b>adding the two's complement</b> of the number being subtracted (invert every bit, add 1, then add and ignore the extra carry).</p>" +
      "<p><b>Overflow</b> happens when the result of a calculation is <b>too big to fit into the number of bits available</b>. In an 8-bit register the answer needs 9 bits, so the extra left-hand bit is lost or flagged. The computer then gives a wrong result or an error.</p>",
    example:
      "<pre class='ln-pre'>  0110 0100   (100)\n- 0001 1110   (30)\n= 0100 0110   (70)</pre>" +
      "<p><b>By two's complement:</b> 0001 1110 &rarr; invert 1110 0001 &rarr; add 1: <code>1110 0010</code>. Now add: 0110 0100 + 1110 0010 = <code>1 0100 0110</code>. The ninth bit is dropped, leaving <code>0100 0110</code> = 70. &check;</p>" +
      "<p><b>Overflow in action (8 bits):</b> 1111 0101 + 1011 0001 = <code>1 1010 0110</code>. The answer needs 9 bits, so it overflows an 8-bit register.</p>" +
      "<p><b>Show your working:</b> write the carries above the sum. The mark scheme gives one mark for showing the method and one for the answer.</p>",
    checks:[
      mc("What is 0110 + 0011 in binary?", "1001", ["1010", "0101", "1000"], "6 + 3 = 9 = 1001."),
      mc("What is 1 + 1 in binary?", "10", ["2", "11", "0"], "1 + 1 = 0 with a carry of 1, written 10."),
      mc("An 8-bit register adds 1100 1000 and 0111 1000. What happens?", "Overflow: the answer needs 9 bits", ["The answer is 0100 0000 with no problem", "The answer is negative", "Nothing; computers never overflow"], "200 + 120 = 320, which is more than 255 (the largest 8-bit number)."),
      tx("State what is meant by an overflow in binary addition. [1]", [["too long","too big","too large","too many bits","more bits","exceeds","does not fit","cannot be stored","not enough bits","bigger than","larger than"]], 1, "The answer is too long to be represented in the same number of bits as the binary numbers being added."),
      ASA.pp("9618/13 May/June 2025 · Question 7(b) and (c)", "Write the carries, include the overflow bit if the question says so, and for subtraction either borrow carefully or add the two's complement.",
        [ ASA.fields("(b)", 1, "Complete the following binary addition. Show your working. Include any overflow bit(s).<pre class='ln-pre'>  1 1 1 1 0 1 0 1\n+ 1 0 1 1 0 0 0 1</pre>Type the answer including the overflow bit as one binary number.",
            [["Answer", ["110100110", "(1)10100110", "1(10100110)"], "bin", "(1) 1010 0110"]], { lead: "1 mark for:", scheme: "<p>1 mark for:</p><pre class='ln-pre'>  1 1 1 1 0 1 0 1\n+ 1 0 1 1 0 0 0 1\n(1) 1 0 1 0 0 1 1 0</pre><p>Answer: (1) 1010 0110</p>" }),
          ASA.text("(c)", 2, "Subtract the binary number 00011110 from the binary number 01100100 using binary subtraction. Show your working, then write the answer.",
            [ ["1 mark for showing binary subtraction (any method): direct subtraction with borrowing, or adding the two's complement 11100010 to 01100100", ["re:1\\s*1\\s*1\\s*0\\s*0\\s*0\\s*1\\s*0", "re:0\\s*1\\s*1\\s*0\\s*0\\s*1\\s*0\\s*0\\s*0\\s*0\\s*0\\s*1\\s*1\\s*1\\s*1\\s*0", "borrow"]], ["1 mark for the answer 0100 0110", ["re:(^|[^01])0?\\s*1\\s*0\\s*0\\s*0\\s*1\\s*1\\s*0([^01]|$)"]] ],
            { lead: "1 mark for showing binary subtraction (any method), 1 mark for answer:", lines: 6, scheme: "<p>1 mark for showing binary subtraction (any method)</p><pre class='ln-pre'>Direct subtraction:\n  0 1 1 10 10 11 10 0\n- 0 0 0 1 1 1 1 0\n  0 1 0 0 0 1 1 0\n\nAdding the two's complement:\n  0 1 1 0 0 1 0 0\n+ 1 1 1 0 0 0 1 0\n(1) 0 1 0 0 0 1 1 0</pre><p>1 mark for answer <b>0100 0110</b></p>" }) ])
    ] },

  { id:"1.1.5a", code:"1.1.5", title:"Character sets: ASCII, extended ASCII and Unicode",
    concept:
      "<p>A computer can only store numbers, so every character (letter, digit, symbol) is given its own <b>unique binary code</b>. The list of characters and their codes is a <b>character set</b>. A word is stored as the codes of its characters, <b>one after another in sequence</b>.</p>" +
      tbl(["Character set", "Bits per character", "Number of characters", "Notes"], [
        ["ASCII", "7", "128", "English letters, digits, punctuation and control codes"],
        ["Extended ASCII", "8", "256", "Adds accented letters and extra symbols"],
        ["Unicode", "16 or 32 (can use up to 32)", "over 65 000, over a million possible", "Every language, emoji and special symbols"]]) +
      "<p><b>Why Unicode?</b> ASCII cannot hold Arabic, Chinese or emoji. Unicode can, but each character needs more bits, so text files are <b>larger</b>.</p>" +
      "<p>The ASCII codes of capital letters are in order: A = 65, B = 66 &hellip; so the code for any capital can be found from A. Lower case a = 97.</p>",
    example:
      "<p><b>'Clock' in ASCII:</b> C = 67, l = 108, o = 111, c = 99, k = 107. The computer stores <code>1000011 1101100 1101111 1100011 1101011</code>: five codes, one after another.</p>" +
      "<p>If the question says <i>explain how the word is represented</i>, say two things: <b>each character has a unique binary code</b>, and the codes are <b>stored in sequence</b>.</p>",
    checks:[
      mc("How many different characters can 7-bit ASCII represent?", "128", ["127", "256", "7"], "2^7 = 128."),
      mc("Which character set can represent characters from many different languages?", "Unicode", ["ASCII", "Extended ASCII", "BCD"], "Unicode uses more bits per character and covers all languages."),
      mc("The ASCII code for 'A' is 65. What is the ASCII code for 'D'?", "68", ["69", "65", "64"], "A=65, B=66, C=67, D=68."),
      tx("Give two differences between the ASCII and Unicode character sets. [2]", [["7","8 bits","fewer bits","128","256"],["more bits","16","32","wider range","more characters","different languages","all languages","emoji"]], 2, "ASCII uses 7 (or 8) bits whereas Unicode can use up to 32 bits; Unicode can represent a wider range of characters including different languages."),
      ASA.pp("9618/13 May/June 2024 · Question 1(d)", "ASCII = 7 bits, extended ASCII = 8 bits, Unicode = 16 or 32 bits. A word is stored as one unique code per character, in sequence.",
        [ ASA.fields("(d)(i)", 1, "Computers use character sets when representing characters in binary. Identify the number of bits each character set allocates to each character. Give three numbers, separated by commas, in this order: ASCII, extended ASCII, Unicode.",
            [["ASCII, extended ASCII, Unicode", ["7,8,16", "7,8,32", "7,8,16/32", "7,8,16or32", "7,8,16or32bits"], "text", "7, 8, 16/32"]], { lead: "1 mark for all 3 answers correct:", scheme: "<p>1 mark for all 3 answers correct:</p>" + tbl(["Character set", "Number of bits"], [["ASCII", "7"], ["extended ASCII", "8"], ["Unicode", "16/32"]]) }),
          ASA.text("(d)(ii)", 2, "Explain how the word 'Clock' is represented by a character set.",
            [ ["Each character has a unique binary code", ["unique"], ["each character", "code for each", "own code", "own binary", "binary code", "binary number"]], ["The binary code for each character is stored in sequence", ["sequence", "in order", "one after another", "one after the other", "consecutively", "successively"]] ],
            { lead: "1 mark each:", lines: 4 }) ])
    ] },

  { id:"1.2.1a", code:"1.2.1", title:"How a bitmap image is stored and its file size",
    concept:
      "<p>A <b>bitmap image</b> is a grid of tiny squares called <b>pixels</b>. Each pixel has <b>one colour</b>. Every colour has a <b>unique binary code</b>, and the code for each pixel is <b>stored in sequence</b> (row by row). The file also has a <b>file header</b> that holds data about the image (metadata) such as its width, height and colour depth.</p>" +
      tbl(["Term", "Meaning"], [["Pixel", "the smallest element of an image that can be one colour"], ["Image resolution", "the number of pixels wide &times; pixels high"], ["Colour (bit) depth", "the number of bits used for the colour of each pixel; with <i>n</i> bits you can show 2<sup><i>n</i></sup> colours"], ["File header", "stores data about the image file (metadata)"]]) +
      "<h4>File size</h4>" +
      "<p><b>File size in bits</b> = width &times; height &times; colour depth (bits). Divide by 8 for bytes, then by 1000 or 1024 for kilo/mega or kibi/mebi (use the unit the question asks for). The file header makes the file a little bigger, so the question says <i>estimate</i>.</p>",
    example:
      "<p><b>A video frame 2048 &times; 1536 pixels, 2 bytes per pixel, 8 frames a second, in mebibytes.</b></p>" +
      "<p>2048 &times; 1536 &times; 2 &times; 8 = 50 331 648 bytes; &divide; 1024 &divide; 1024 = <b>48 MiB</b>.</p>" +
      "<p><b>Colours:</b> 8 bits gives 2<sup>8</sup> = 256 different colours; 24 bits gives about 16.7 million.</p>" +
      "<p><b>Exam habit:</b> write the working as one line of multiplications first, then divide. The mark scheme gives one mark for the working and one for the answer.</p>",
    checks:[
      mc("How many different colours can 8 bits represent?", "256", ["8", "64", "128"], "2^8 = 256."),
      mc("An image is 100 pixels wide and 50 pixels high with a colour depth of 8 bits. How many bytes is the image (ignore the header)?", "5000", ["40 000", "625", "50"], "100 x 50 x 8 = 40 000 bits = 5000 bytes."),
      mc("Which term means 'the number of bits used to store the colour of each pixel'?", "Colour depth", ["Resolution", "File header", "Sampling rate"], "Colour (bit) depth."),
      tx("What does the file header of a bitmap image store? [1]", [["data about the image","metadata","width","height","resolution","colour depth","file type","file size","dimensions","information about the image","details about the image"]], 1, "Data about the image file (metadata), such as its dimensions, colour depth or file type."),
      ASA.pp("9618/13 May/June 2026 · Question 3(b)", "Describe a bitmap in this order: pixels; one colour per pixel; each colour has a binary code; codes stored in sequence. File size: width x height x bit depth, then convert units.",
        [ ASA.text("(b)(i)", 3, "Explain how the data for the bitmapped images are encoded.",
            [ ["Image is a series of pixels", ["pixel"]], ["... where each pixel has one colour", ["one colour", "single colour", "a colour", "each colour", "colour of each"]], ["Each colour has a unique binary number", ["unique", "binary number", "binary code", "binary value", "binary pattern", "bit pattern"]], ["The binary number / code of the colour of each pixel is stored in sequence", ["sequence", "in order", "one after another", "one after the other", "row by row", "consecutive"]] ],
            { lead: "1 mark each, to a maximum of 3:", lines: 5 }),
          ASA.text("(b)(ii)", 2, "The bitmap images have a bit depth of 2 bytes. Each image is 2048 pixels wide by 1536 pixels high. One second of video contains eight individual bitmap images. There is no sound. Calculate an estimate for the file size of one second of the video in mebibytes (MiB). Show all of your working.",
            [ ["1 mark for working: 2048 * 1536 * 2 * 8 / 1024 / 1024", ["re:2048\\D{0,4}1536"]], ["1 mark for answer: 48 MiB", ["re:(^|[^0-9.])48([^0-9]|$)"]] ],
            { lead: "1 mark for working, 1 mark for answer:", lines: 4 }) ])
    ] },

  { id:"1.2.2a", code:"1.2.2", title:"Changing resolution and colour depth: quality against file size",
    concept:
      "<p>You can change two things about a bitmap image, and each one pulls <b>quality</b> and <b>file size</b> in the same direction:</p>" +
      tbl(["Change", "Image quality", "File size"], [
        ["Increase the <b>resolution</b> (more pixels)", "sharper, more detail, less pixelated", "bigger (more pixels, more data)"],
        ["Decrease the resolution", "details are lost, looks blocky", "smaller (fewer pixels)"],
        ["Increase the <b>colour (bit) depth</b>", "more colours, smoother shades", "bigger (more bits per pixel)"],
        ["Decrease the colour depth", "fewer colours, bands of colour", "smaller"]]) +
      "<p><b>Screen resolution</b> is different: it is the number of pixels a screen can show. An image bigger than the screen has to be shrunk, so the screen can limit what you see.</p>" +
      "<p>There is always a trade-off: higher quality means a larger file to store and send.</p>",
    example:
      "<p><b>Worked file size (kibibytes):</b> 2048 &times; 1024 pixels at 16 bits. 2048 &times; 1024 &times; 16 = 33 554 432 bits. &divide; 8 = 4 194 304 bytes. &divide; 1024 = <b>4096 KiB</b>.</p>" +
      "<p>Halve the width and the height and the file becomes a <b>quarter</b> of the size (half &times; half), but the picture has only a quarter of the detail.</p>" +
      "<p><b>Describe the impact:</b> examiners want two ideas: <i>more pixels can be stored</i> and <i>the image is sharper</i>.</p>",
    checks:[
      mc("What happens to the file size of a bitmap if only the colour depth is increased?", "It increases", ["It decreases", "It stays the same", "It is compressed"], "More bits per pixel means more data."),
      mc("An image is made half as wide and half as high. What happens to the number of pixels?", "It becomes one quarter", ["It becomes half", "It stays the same", "It is doubled"], "0.5 x 0.5 = 0.25."),
      mc("Which change makes a bitmap image look more detailed and sharper?", "Increase the resolution", ["Decrease the colour depth", "Decrease the file size", "Remove the header"], "More pixels means more detail."),
      tx("Describe the impact of increasing the image resolution on the quality of a bitmap graphic. [2]", [["more pixels","greater number of pixels","more detail","more data","pixels can be stored","number of pixels increases"],["sharper","clearer","less pixelated","better quality","higher quality","more detailed","smoother"]], 2, "More pixels can be stored / are available, so the image is sharper / less pixelated."),
      ASA.pp("9618/13 October/November 2023 · Question 2", "Increasing resolution: more pixels, sharper image, bigger file. For the file size, multiply width x height x bit depth, divide by 8 for bytes, then by 1024 for kibibytes.",
        [ ASA.text("(a)", 2, "Describe the impact of increasing the image resolution on the quality of a bitmap graphic.",
            [ ["more pixels can be stored / are available", ["more pixels", "greater number of pixels", "higher number of pixels", "pixels can be stored", "number of pixels increase", "more data"]], ["the image is sharper / less pixelated", ["sharper", "clearer", "less pixelated", "more detailed", "more detail", "better quality", "higher quality", "smoother", "less blocky"]] ],
            { lead: "1 mark for each bullet point:", lines: 3 }),
          ASA.text("(b)", 2, "Calculate the file size of a bitmap image using the following information: image resolution of 2048 pixels wide and 1024 pixels high; bit depth of 16 bits. Give your answer in kibibytes. Show your working.",
            [ ["1 mark for working: (2048 * 1024 * 16) / (8 * 1024)", ["re:2048\\D{0,4}1024"]], ["1 mark for answer: 4096 kibibytes", ["re:(^|[^0-9.])4096([^0-9]|$)"]] ],
            { lead: "1 mark for answer, 1 mark for working:", lines: 4 }) ])
    ] },

  { id:"1.2.2b", code:"1.2.2", title:"Bitmap vocabulary: image resolution, screen resolution and bit depth",
    concept:
      "<p>The words that describe a bitmap have exact meanings, and exam answers are marked on them:</p>" +
      tbl(["Term", "Exact meaning"], [
        ["Pixel", "the smallest element of an image that can be one colour"],
        ["Image resolution", "the number of pixels wide &times; pixels high that make up the <b>image</b>"],
        ["Screen resolution", "the number of pixels wide &times; pixels high that a <b>screen can display</b> (a physical limit)"],
        ["Colour / bit depth", "the number of bits used to represent the colour of one pixel"],
        ["File header", "metadata stored with the image: dimensions (width, height), file type, file size, compression type and so on"]]) +
      "<p>If the screen resolution is lower than the image resolution, the image has to be shown with less detail, so the quality on screen gets worse.</p>" +
      "<p><b>Smallest bit depth:</b> count the different colours in the image (<i>n</i>) and find the smallest power of 2 that is at least <i>n</i>. Two colours need 1 bit, three or four colours need 2 bits, five to eight colours need 3 bits.</p>",
    example:
      "<p>An image uses only red, white and blue: <b>three colours</b>. 1 bit gives only 2 colours, 2 bits give 4 colours, so the smallest bit depth is <b>2</b>.</p>" +
      "<p><b>Do not repeat the question:</b> if it says 'one item in the header <i>other than</i> resolution and colour depth' then 'resolution' or 'colour depth' gets no mark. Give a different item such as <i>file size, file type or dimensions</i>.</p>",
    checks:[
      mc("Which is the correct definition of a pixel in a bitmap image?", "The smallest element of an image that can be one colour", ["A row of identical colours", "The binary code for a colour", "A colour in an image"], "A pixel is the smallest element that can be one colour."),
      mc("An image uses 5 different colours. What is the smallest bit depth that can be used?", "3", ["2", "4", "5"], "2 bits give 4 colours, 3 bits give 8 colours."),
      mc("Which of these is the physical limit on how many pixels can be displayed?", "Screen resolution", ["Image resolution", "Colour depth", "File header"], "Screen resolution is fixed by the screen."),
      tx("Identify one item that is stored in the file header of a bitmap image (other than resolution or colour depth). [1]", [["file size","file type","dimensions","image size","compression","data offset","width","height"]], 1, "For example file size, file type, dimensions of the image, compression type or data offset."),
      ASA.pp("9618/12 May/June 2026 · Question 1(b) to (d)", "Use the exact vocabulary: image resolution is the pixels in the image, screen resolution is the pixels the screen can display. RLE stores a colour and the number of consecutive pixels with that colour, and you must refer to the image given.",
        [ ASA.text("(b)", 2, "Describe the difference between the terms image resolution and screen resolution.",
            [ ["Image resolution is the number of pixels wide by pixels high that form the image, and screen resolution is the number of pixels wide by pixels high that can be displayed on a screen", ["image"], ["pixels wide", "pixels high", "number of pixels", "width and height", "wide by", "pixels"], ["screen", "display", "monitor"]], ["If screen resolution is not as high as image resolution, the quality of the image is worsened // image resolution can be changed but screen resolution has a physical limit", ["worse", "lower quality", "worsen", "physical limit", "fixed", "cannot be changed", "limit", "reduced quality", "lose detail", "less detail"]] ],
            { lead: "1 mark for each correct answer:", lines: 4, guide: "Just 'number of pixels' for either or both is not enough. Do not accept bits or characters for pixels." }),
          ASA.fields("(d)(i)", 1, "Each letter in the following bitmap represents a colour: R is red, W is white, B is blue.<pre class='ln-pre'>R R W W W W\nB B R R W W\nW W W R R R\nW W W W R R\nW W R R R R\nR R R R R B\nB B B B B B</pre>Identify the smallest bit depth that can be used for the image shown.",
            [["Bit depth (bits)", ["2", "two"], "text", "2"]], { lead: "1 mark for: 2 (correct answer only)" }),
          ASA.text("(d)(ii)", 3, "Explain how the image shown can be compressed using lossless compression.",
            [ ["Run Length Encoding (RLE) can be used", ["rle", "run length"]], ["A series of consecutive pixels of the same colour is stored as a single copy of the colour and the number of consecutive occurrences", ["consecutive", "same colour", "repeated", "in a row", "run of"], ["number", "count", "how many", "times", "occurrences"]], ["A suitable reference to the given image, e.g. R2, W4 / 2R4W / R2W4", ["re:\\b[rwb]\\s*[0-9]\\b", "re:\\b[0-9]\\s*[rwb]\\b", "re:\\b[rwb]\\s*(x|\\*)\\s*[0-9]"]] ],
            { lead: "1 mark for each correct point to a maximum of 2, plus 1 mark for a suitable reference to the given image:", lines: 5, caps: [{ unless: ["re:\\b[rwb]\\s*[0-9]\\b", "re:\\b[0-9]\\s*[rwb]\\b", "re:\\b[rwb]\\s*(x|\\*)\\s*[0-9]"], max: 2, why: "Maximum 2 marks if there is no reference to the image given (such as R2 or W4)." }] }) ])
    ] },

  { id:"1.2.3a", code:"1.2.3", title:"Vector graphics: drawing lists, properties and when to use them",
    concept:
      "<p>A <b>vector graphic</b> does not store pixels. It stores a <b>drawing list</b>: the list of all the <b>drawing objects</b> (lines, circles, rectangles, curves) in the image, together with the <b>commands or mathematical equations</b> needed to draw each one. Each object has <b>properties</b>: attributes such as position, fill colour, line colour and line weight.</p>" +
      "<pre class='ln-pre'>Drawing list\n1  circle     centre (40, 40)  radius 20  fill red\n2  rectangle  corner (10, 70)  width 60  height 30  line blue</pre>" +
      tbl(["", "Bitmap", "Vector"], [
        ["Stored as", "grid of pixels", "drawing list of objects and properties"],
        ["Enlarged", "becomes blocky (pixelated)", "stays sharp: the shapes are redrawn"],
        ["File size", "grows with resolution and colour depth", "small for simple drawings"],
        ["Best for", "photographs", "logos, diagrams, plans, cartoons, fonts"]]) +
      "<p><b>Property</b> = an attribute of a drawing object (defines one aspect of its appearance). <b>Drawing list</b> = all the objects in the image with the commands/equations needed to draw each.</p>",
    example:
      "<p>A shop wants its logo on a business card <i>and</i> on a giant billboard. A <b>vector graphic</b> is ideal: the shapes are redrawn at any size, so the logo stays sharp. A bitmap would have to be stored at billboard resolution, or it would look blocky when enlarged.</p>" +
      "<p>A holiday <b>photograph</b> has millions of tiny colour changes. It cannot be described by a few shapes, so a bitmap is used.</p>",
    checks:[
      mc("Which type of image is stored as a drawing list?", "Vector graphic", ["Bitmap image", "Sound file", "Compressed text"], "Vector graphics are defined by lists of objects."),
      mc("What happens when a vector graphic is enlarged?", "It stays sharp because the shapes are redrawn", ["It becomes pixelated", "Its file size grows enormously", "Its colours change"], "The objects are recalculated from equations."),
      mc("Which image is best stored as a vector graphic?", "A company logo", ["A photograph of a beach", "A scanned painting", "A frame of a film"], "Simple shapes that need to be resized suit vector graphics."),
      tx("Define the vector graphic term 'property'. [1]", [["attribute","aspect","appearance","data about a shape","data about an object","colour","line weight","fill","characteristic","detail about the shape","describes"]], 1, "An attribute of a drawing object (for example fill colour or line weight), defining one aspect of its appearance."),
      ASA.pp("9618/12 October/November 2024 · Question 7", "Colour depth = number of bits per colour; file header = metadata; resolution changes quality and file size in the same direction; a property is an attribute of an object; a drawing list stores all the objects and the commands to draw them.",
        [ ASA.text("(a)(i)", 2, "A photograph is saved as a bitmapped image. Define the following bitmap terms: colour depth, file header.",
            [ ["Colour depth: the number of bits used to represent a colour // the number of colours that can be represented", ["number of bits", "bits used", "bits per", "bits to represent", "bits for each", "bits that represent", "bits to store", "number of colours", "different colours", "colours that can"]], ["File header: stores data about the image file / metadata", ["metadata", "data about the image", "data about the file", "information about the image", "information about the file", "details about the image", "details about the file", "stores data about", "stores information about", "stores details about"]] ],
            { lead: "1 mark for each correct definition:", lines: 4 }),
          ASA.text("(a)(ii)", 2, "Explain why changing the image resolution will affect the image quality and file size.",
            [ ["Image quality: decreasing the resolution means details are lost because there are fewer pixels // increasing it means the image is more detailed because there are more pixels", ["detail", "sharper", "blocky", "pixelated", "clearer", "quality", "blurry"]], ["File size: decreasing the resolution decreases the file size because there are fewer pixels, so less data // increasing it increases the file size", ["file", "size", "storage"], ["smaller", "less data", "fewer pixels", "bigger", "larger", "more data", "more pixels", "increase", "decrease", "reduce"]] ],
            { lead: "1 mark for each correct explanation:", lines: 4 }),
          ASA.text("(a)(iii)", 1, "Identify one lossless method of compressing an image.",
            [ ["Run-Length Encoding (RLE)", ["rle", "run length"]] ], { lead: "1 mark for a correct method, for example Run-Length Encoding:" }),
          ASA.text("(b)", 2, "The student draws a picture on paper that is scanned into the computer and saved as a vector graphic. Define the vector graphic terms property and drawing list.",
            [ ["Property: an attribute of a drawing object // data about a shape // defines one aspect of the appearance of a drawing object", ["re:propert[a-z]*[^.]{0,150}(attribute|aspect|appearance|characteristic|data about|fill|colour|line weight|line colour)", "re:(an |a )?attribute of (a |an |the )?(drawing )?(object|shape)", "data about a shape", "data about an object", "aspect of the appearance", "defines one aspect"]], ["Drawing list: all the drawing objects / shapes in an image // stores the commands / descriptions / mathematical equations required to draw each object", ["re:drawing list[^.]{0,150}(objects|shapes|commands|equations|instructions|descriptions)", "re:(list|store|stores|contains|holds)[^.]{0,30}(all|every)[^.]{0,20}(drawing )?(objects|shapes)", "commands required", "equations required", "commands to draw", "instructions to draw", "equation to draw"]] ],
            { lead: "1 mark for each correct definition:", lines: 4 }) ])
    ] },

  { id:"1.2.4a", code:"1.2.4", title:"Sound: sampling rate, sampling resolution and file size",
    concept:
      "<p>Sound is an <b>analogue</b> signal: a wave whose value changes continuously. To store it, a computer <b>samples</b> it: the <b>size (amplitude) of the wave is measured at regular intervals</b>, and each measurement is stored as a <b>binary number</b>, in sequence.</p>" +
      tbl(["Term", "Meaning"], [["Sampling rate", "the number of samples taken <b>each second</b>, in hertz (Hz). 44.1 kHz means 44 100 samples every second"], ["Sampling resolution", "the number of <b>bits used to store each sample</b> (2 bytes = 16 bits, so 65 536 possible values)"]]) +
      tbl(["If you &hellip;", "Accuracy of the sound", "File size"], [["increase the sampling rate", "better: more of the wave is captured", "bigger"], ["increase the sampling resolution", "better: each value is more exact, smaller quantisation errors", "bigger"], ["increase the duration", "no change", "bigger"], ["decrease the sampling rate or resolution", "worse", "smaller"]]) +
      "<p><b>File size (bits)</b> = sampling rate &times; sampling resolution &times; time in seconds.</p>",
    example:
      "<p><b>10 seconds at 44 100 Hz with 16-bit samples:</b> 44 100 &times; 16 &times; 10 = 7 056 000 bits = 882 000 bytes, about 0.88 MB.</p>" +
      "<p>An 8-bit recording of the same sound would be <b>half</b> the size, but with only 256 possible levels it is less accurate, so the sound is rougher.</p>" +
      "<p><b>'Must be clear which resolution is being described'</b>: when comparing 2 bytes with 8 bits, say which recording each point is about.</p>",
    checks:[
      mc("What does a sampling rate of 8000 Hz mean?", "8000 samples are taken every second", ["Each sample uses 8000 bits", "The sound lasts 8000 seconds", "The sound is 8000 times louder"], "Sampling rate is samples per second."),
      mc("What is sampling resolution?", "The number of bits used to store each sample", ["The number of samples per second", "The length of the recording", "The number of speakers"], "The more bits, the more exact each measurement."),
      mc("Which change makes a sound recording smaller in file size?", "Decrease the sampling resolution", ["Increase the sampling rate", "Increase the recording time", "Increase the number of bits per sample"], "Fewer bits per sample means less data."),
      mc("A sound is recorded with 16-bit samples. How many different amplitude values can each sample have?", "65 536", ["16", "256", "1024"], "2^16 = 65 536."),
      tx("Describe what is meant by a sampling rate of 44.1 kHz. [1]", [["44100","44 100","44.1 thousand","44,100"],["times each second","per second","every second","a second"]], 2, "The sound wave is measured 44 100 times each second (44 100 samples are taken every second)."),
      ASA.pp("9618/12 May/June 2026 · Question 4", "Sampling rate = samples per second. Sampling resolution = bits per sample: more bits means a bigger file and a more accurate sound. When you compare two recordings, say which one each statement is about.",
        [ ASA.text("(a)", 1, "A sound file has a sampling rate of 44.1 kHz. Describe what is meant by a sampling rate of 44.1 kHz.",
            [ ["The sound wave is measured 44 100 times each second // 44 100 samples are taken every second", ["re:44\\.?\\s?1\\s?(k|thousand)|44\\s?100|44,100"], ["each second", "per second", "every second", "a second", "in one second", "one second", "hz"]] ],
            { lead: "1 mark for:", guide: "Accept appropriate alternative words for measured, including 'sampled'. Accept 44.1 thousand instead of 44100.", lines: 3 }),
          ASA.text("(b)", 3, "A student creates a recording of a sound with a sampling resolution of 2 bytes. The student creates a second recording of the same sound but with a sampling resolution of 8 bits. Explain how the two sound recordings and the two sound files will be affected by the different sampling resolutions.",
            [ ["The resolution of 2 bytes (16 bits) will have more bits per sample", ["more bits", "16 bits", "greater number of bits", "higher number of bits", "2 bytes"]], ["... which will result in a larger file size", ["larger", "bigger", "more storage", "greater file size", "bigger file", "more data", "increase"]], ["... but the digital sound will be more accurate to the original", ["more accurate", "better quality", "more exact", "closer to the original", "higher quality", "more detail", "clearer"]], ["... because a greater range / more exact amplitudes can be recorded per sample, with smaller quantisation errors", ["range", "quantisation", "quantization", "more exact", "more values", "more levels", "more possible", "amplitude"]] ],
            { lead: "1 mark each to a maximum of 3:", lines: 6, guide: "Must be clear which resolution is being described. Allow reverse arguments: the resolution of 8 bits will have fewer bits per sample, which results in a smaller file size." }) ])
    ] },

  { id:"1.3.1a", code:"1.3.1", title:"Why compress files? Lossy and lossless compression",
    concept:
      "<p><b>Compression</b> makes a file smaller. A smaller file <b>takes less storage space</b>, is <b>faster to upload and download</b>, uses <b>less bandwidth</b> and less of a user's data allowance.</p>" +
      tbl(["", "Lossless compression", "Lossy compression"], [
        ["What happens", "data is stored in a shorter way; <b>nothing is lost</b>", "some data is <b>permanently removed</b>"],
        ["Original recovered?", "Yes, exactly (rebuilt perfectly)", "No: the original cannot be re-created"],
        ["File size", "smaller", "much smaller (a larger decrease than lossless)"],
        ["Used for", "text, program files, spreadsheets, some images (e.g. RLE)", "photographs, music and video, where small changes are not noticed"]]) +
      "<p><b>Run-length encoding (RLE)</b> is a lossless method: a run of consecutive identical items is stored as <b>the item and the number of times it repeats</b>. <code>WWWWWBB</code> becomes <code>W5 B2</code>.</p>" +
      "<p>Ways to reduce a bitmap file: lower the <b>colour (bit) depth</b> or the <b>image resolution</b>, or compress it.</p>",
    example:
      "<p><b>Why lossy suits a photograph:</b> the data removed (small differences in shade and detail) is usually not noticed by the human eye, and the file gets much smaller.</p>" +
      "<p><b>Why lossless suits a program file:</b> losing even one bit would make the program fail, so every bit must be recovered.</p>" +
      "<p><b>Estimate of a photograph 4000 &times; 3000 pixels at 4 bytes per pixel:</b> 4000 &times; 3000 &times; 4 = 48 000 000 bytes = <b>48 MB</b> (decimal prefix, as asked in megabytes).</p>",
    checks:[
      mc("Which type of compression permanently removes some data?", "Lossy", ["Lossless", "RLE", "Binary"], "Lossy compression loses data that cannot be recovered."),
      mc("A program file is compressed. Which method must be used?", "Lossless", ["Lossy", "Either, it does not matter", "Neither"], "Every bit of a program is needed."),
      mc("What is the run-length encoding of AAAABBBCC?", "A4 B3 C2", ["A3 B3 C3", "4A 3B", "ABC"], "Four As, three Bs, two Cs."),
      tx("Give one benefit of compressing a photograph before uploading it to a web server. [1]", [["less storage","smaller file","less space","faster to upload","faster to download","less bandwidth","less data","quicker","takes up less"]], 1, "The file takes less storage space, uploads and downloads faster, uses less bandwidth or less of the data allowance."),
      ASA.pp("9618/13 May/June 2024 · Question 2", "Estimate file size as width x height x bytes per pixel. Lossy gives smaller files that upload faster and use less bandwidth; RLE stores each colour and how many times it repeats in a row; two things to change are bit depth and resolution.",
        [ ASA.text("(a)", 2, "A photograph has a resolution of 4000 pixels wide by 3000 pixels high. The bit depth is 4 bytes. Calculate an estimate for the file size of the photograph in megabytes. Show your working.",
            [ ["1 mark for working: 4000 * 3000 * 4", ["re:4000\\D{0,4}3000"]], ["1 mark for the correct answer: 48 MB", ["re:(^|[^0-9.])48([^0-9]|$)"]] ], { lead: "1 mark for working, 1 mark for answer:", lines: 4 }),
          ASA.text("(b)(i)", 3, "The photograph is compressed before being uploaded to a web server. Give three benefits of this photograph being compressed using lossy compression instead of lossless compression.",
            [ ["The file takes less storage space on the web server than if lossless compression was used", ["less storage", "less space", "smaller", "takes up less", "storage space"]], ["The file is faster to upload / download to / from the server", ["faster", "quicker", "less time", "speed"]], ["The file uses less bandwidth to transmit", ["bandwidth"]], ["The file consumes less data allowance", ["data allowance", "data usage", "allowance", "less data", "data cap"]] ],
            { lead: "1 mark each to a maximum of 3:", lines: 5 }),
          ASA.text("(b)(ii)", 2, "Explain how run-length encoding (RLE) will compress the photograph.",
            [ ["Identifies consecutive repeating pixels of the same colour", ["consecutive", "repeat", "same colour", "in a row", "run of", "identical", "adjacent"]], ["Stores the colour / pattern and the number of times it repeats", ["number of times", "count", "how many", "number of pixels", "how often", "occurrences", "frequency", "repeats"]] ],
            { lead: "1 mark each:", lines: 4 }),
          ASA.text("(c)", 2, "Identify two elements of a bitmap image that can be changed to reduce its file size.",
            [ ["Colour / bit depth", ["colour depth", "bit depth", "number of colours", "bits per pixel", "colour"]], ["Image resolution", ["resolution", "number of pixels", "dimensions", "size of the image", "width", "height"]] ],
            { lead: "1 mark each to a maximum of 2:", lines: 3 }) ])
    ] },

  { id:"1.3.1b", code:"1.3.1", title:"Compressing images, sound and text",
    concept:
      "<p>Different files are compressed in different ways, and the exam asks you to <b>describe</b> how.</p>" +
      tbl(["File", "Lossless method", "Lossy method"], [
        ["Bitmap image", "<b>RLE</b>: store each colour and the number of times it appears in a row", "reduce the colour depth or the resolution; remove detail the eye does not notice"],
        ["Sound", "RLE (for repeated values); or record only the <b>changes</b> in amplitude, each needing fewer bits than a whole value; or reduce the range of values to those actually used", "<b>reduce the sampling rate</b> (fewer samples per second); <b>reduce the sampling resolution</b> (fewer bits per sample); remove sounds outside the range of human hearing"],
        ["Text / vector", "RLE or storing common patterns once in a table", "not suitable: removing letters would change the meaning"]]) +
      "<p>Lossy compression gives a bigger saving but <b>cannot be undone</b>: reducing the sampling rate means there are fewer samples per second, so the original sound cannot be re-created.</p>",
    example:
      "<p>The first row of a bitmap is <code>R R W W W W</code>. RLE stores <code>R2 W4</code>: 2 values instead of 6.</p>" +
      "<p><b>Sound:</b> instead of storing the values 120, 121, 123, 124 in full (each needing 8 bits), store 120 followed by the changes +1, +2, +1 (each needing only a couple of bits). Lossless: the original values can be rebuilt exactly.</p>" +
      "<p><b>Mark scheme tip:</b> 'max 2 for image and max 2 for sound': answer <b>both</b> parts, and do not use the same method for both unless the question allows it.</p>",
    checks:[
      mc("Which lossless method stores a colour and the number of consecutive times it appears?", "Run-length encoding", ["Reducing the colour depth", "Reducing the sampling rate", "Deleting the file header"], "That is the definition of RLE."),
      mc("Reducing the sampling rate of a sound file is:", "Lossy compression", ["Lossless compression", "Encryption", "Run-length encoding"], "Data is permanently lost, so the original cannot be re-created."),
      mc("A sound is stored as the first value followed by the change from each value to the next. This is:", "Lossless compression", ["Lossy compression", "Not compression", "Encryption"], "Every original value can be rebuilt exactly."),
      tx("Explain how lossless compression can be used for a bitmap image. [2]", [["rle","run length"],["consecutive","same colour","repeated","in a row"],["number of times","count","how many","occurrences"]], 2, "Use run-length encoding: store each colour and the number of times it appears consecutively."),
      ASA.pp("9618/13 May/June 2026 · Question 3(c)(i)", "Image: RLE (colour and how many times in a row). Sound: store the changes instead of every value, or reduce the sampling resolution to the range actually used. Answer both parts.",
        [ ASA.text("(c)(i)", 4, "An animation's sound and images are compressed independently before being transmitted. Explain the different ways that lossless compression can be used to compress the images and the sound file.",
            [ ["Image: run-length encoding / RLE", ["rle", "run length"]], ["Image: store each colour and the number of times it appears consecutively", ["consecutive", "in a row", "same colour", "repeated"], ["number of times", "count", "how many", "occurrences", "number"]], ["Sound: reduce amplitude values (dynamic range) to only those sounds used in the actual recording ... reducing the sampling resolution without impacting the sound", ["range", "only those", "used in the", "sampling resolution", "fewer bits per sample"]], ["Sound: record changes in amplitudes instead of each individual amplitude ... each change requires fewer bits than a new amplitude", ["changes", "difference", "change in amplitude", "instead of each"]] ],
            { lead: "1 mark each: maximum 2 for the image and maximum 2 for the sound:", lines: 7, guide: "Accept RLE for sound but do not allow it for both parts.", caps: [{ unless: ["sound", "audio"], max: 2, why: "Maximum 2 marks for the image; the sound file also needs to be answered." }] }) ])
    ] },

  ]);
})(typeof window !== "undefined" ? window : this);
