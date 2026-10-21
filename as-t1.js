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
    ] }

  ]);
})(typeof window !== "undefined" ? window : this);
