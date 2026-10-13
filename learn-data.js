/* ============================================================
   learn-data.js  --  iLearn lessons (Cambridge IGCSE Computer Science 0478, 2026-2028)
   Each lesson teaches ONE idea from ONE syllabus objective:
     concept -> worked example -> 1-2 mastery questions.
   code  : syllabus objective (see syllabus-objectives.js), e.g. "1.1.2"
   id    : unique lesson id (a code with several ideas has several lessons)
   Lessons are listed in syllabus order. Objectives with no lesson yet are
   shown in the journey as "Coming soon", in the right place.
   ============================================================ */
(function(root){
  "use strict";
  var LESSONS = [

  // ===================== 1.1 Number systems =====================
  { id:"1.1.1", code:"1.1.1", title:"Why computers use binary",
    video:{ id:"pol5ado7YCc", label:"Video: number systems" },
    concept:
      "<p>A computer is built from billions of tiny electronic switches. A switch has only two states, <b>on</b> or <b>off</b>, so a computer can only work with two values. We write these two values as <b>1</b> (on) and <b>0</b> (off). This is <b>binary</b>.</p>" +
      "<p>Because of this, <b>any form of data</b> (numbers, text, sound, images and even the program instructions) has to be <b>converted to binary</b> before the computer can process it. Inside the computer the binary data is processed using <b>logic gates</b> and is stored in <b>registers</b>.</p>",
    example:
      "<p>The letter <b>A</b> cannot be stored as a letter. It is stored as a binary pattern, for example <code>01000001</code>.</p>" +
      "<ul><li>A photo is stored as a long list of binary numbers, one for the colour of each pixel.</li><li>A song is stored as a long list of binary numbers measuring the sound wave.</li><li>The instruction to add two numbers is also stored as binary.</li></ul>",
    checks:[
      { q:"Why do computers use binary to represent data?", options:["Its electronic parts have only two states, on and off","Binary numbers take less memory than denary numbers, so more data fits","Humans find binary easier to read and write than denary numbers","Binary is the only number system that a CPU is able to add together"], correct:0, explain:"Electronic switches have two states (on/off), which are written as 1 and 0. Everything the computer handles must be turned into these two values." },
      { q:"A student saves a photograph and a song on a computer. What must happen to this data before the computer can process it?", options:["It is encrypted","It is converted to binary","It is converted to hexadecimal","It is compressed into text"], correct:1, explain:"Any form of data, including images and sound, must be converted to binary before it can be processed." }
    ] },

  { id:"1.1.2a", code:"1.1.2", title:"Denary, binary and hexadecimal",
    video:{ id:"pol5ado7YCc", label:"Video: number systems" },
    concept:
      "<p>A <b>number system</b> has a <b>base</b>: the number of different digits it uses. Each column is worth the base times more than the column to its right.</p>" +
      "<table class='ln-table'><tr><th>System</th><th>Base</th><th>Digits used</th><th>Column values (right to left)</th></tr>" +
      "<tr><td><b>Denary</b></td><td>10</td><td>0 to 9</td><td>1, 10, 100, 1000 ...</td></tr>" +
      "<tr><td><b>Binary</b></td><td>2</td><td>0 and 1</td><td>1, 2, 4, 8, 16 ...</td></tr>" +
      "<tr><td><b>Hexadecimal</b></td><td>16</td><td>0 to 9, then A to F</td><td>1, 16, 256 ...</td></tr></table>" +
      "<p>Hexadecimal needs 16 digits but we only have the ten symbols 0 to 9, so the letters <b>A to F</b> stand for the values 10 to 15.</p>",
    example:
      "<table class='ln-table'><tr><th>Denary</th><td>0</td><td>1</td><td>2</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td></tr>" +
      "<tr><th>Binary</th><td>0</td><td>1</td><td>10</td><td>1001</td><td>1010</td><td>1011</td><td>1100</td><td>1101</td><td>1110</td><td>1111</td></tr>" +
      "<tr><th>Hex</th><td>0</td><td>1</td><td>2</td><td>9</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td></tr></table>" +
      "<p>Notice that the largest single hexadecimal digit, <b>F</b>, is 15, and 15 in binary is <code>1111</code> (four bits).</p>",
    checks:[
      { q:"How many different digits does the hexadecimal number system use?", options:["8","10","16","15"], correct:2, explain:"Hexadecimal is base 16, so it uses 16 different digits: 0 to 9 and A to F." },
      { q:"What is the denary value of the hexadecimal digit D?", options:["14","12","15","13"], correct:3, explain:"A = 10, B = 11, C = 12, D = 13, E = 14, F = 15. So D is 13." }
    ] },

  { id:"1.1.2b", code:"1.1.2", title:"Converting between binary and denary",
    video:{ id:"4ZfqXkptPus", label:"Video: binary numbers" },
    concept:
      "<p>Write the column headings for an 8-bit binary number, from right to left, doubling each time:</p>" +
      "<table class='ln-table'><tr><td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr></table>" +
      "<p><b>Binary to denary:</b> add up the column headings that have a 1 under them.</p>" +
      "<p><b>Denary to binary:</b> work from the left. If the heading fits into what is left, write 1 and subtract it. If not, write 0.</p>" +
      "<p>In the exam, numbers can be up to 16 bits long. The headings simply carry on doubling to the left (256, 512 ... up to 32768).</p>",
    example:
      "<p><b>Binary to denary:</b> <code>10101100</code></p>" +
      "<table class='ln-table'><tr><td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td></tr></table>" +
      "<p>128 + 32 + 8 + 4 = <b>172</b></p>" +
      "<p><b>Denary to binary:</b> 189</p>" +
      "<p>189 &minus; 128 = 61 (write 1). 64 does not fit (0). 61 &minus; 32 = 29 (1). 29 &minus; 16 = 13 (1). 13 &minus; 8 = 5 (1). 5 &minus; 4 = 1 (1). 2 does not fit (0). 1 &minus; 1 = 0 (1).</p>" +
      "<p>Answer: <code>10111101</code></p>",
    checks:[
      { q:"What is the 8-bit binary number 01101001 in denary?", options:["105","89","121","97"], correct:0, explain:"64 + 32 + 8 + 1 = 105." },
      { q:"What is the denary number 200 written as an 8-bit binary number?", options:["11001001","10101000","11001000","11000100"], correct:2, explain:"200 = 128 + 64 + 8, so the 1s are under 128, 64 and 8: 11001000." }
    ] },

  { id:"1.1.2c", code:"1.1.2", title:"Converting between hexadecimal and denary",
    concept:
      "<p>A two-digit hexadecimal number has two columns: the <b>16s</b> column on the left and the <b>1s</b> column on the right.</p>" +
      "<p><b>Hex to denary:</b> multiply the left digit by 16, then add the right digit. (Remember A = 10 ... F = 15.)</p>" +
      "<p><b>Denary to hex:</b> divide by 16. The whole-number answer is the left digit, the remainder is the right digit. Change any value from 10 to 15 into a letter.</p>",
    example:
      "<p><b>Hex to denary:</b> <code>3E</code></p>" +
      "<p>3 &times; 16 = 48, and E = 14, so 48 + 14 = <b>62</b>.</p>" +
      "<p><b>Denary to hex:</b> 173</p>" +
      "<p>173 &divide; 16 = 10 remainder 13. 10 is A and 13 is D, so the answer is <code>AD</code>.</p>" +
      "<p>Check: 10 &times; 16 = 160, and 160 + 13 = 173. &#10003;</p>",
    checks:[
      { q:"What is the hexadecimal number 2F in denary?", options:["35","47","32","49"], correct:1, explain:"2 x 16 = 32, and F = 15, so 32 + 15 = 47." },
      { q:"What is the denary number 100 written in hexadecimal?", options:["46","10","64","A4"], correct:2, explain:"100 divided by 16 is 6 remainder 4, so the left digit is 6 and the right digit is 4: 64." }
    ] },

  { id:"1.1.2d", code:"1.1.2", title:"Converting between hexadecimal and binary",
    concept:
      "<p>One hexadecimal digit is exactly <b>4 binary bits</b> (a nibble), because 4 bits can hold the values 0 to 15. That makes this conversion very quick:</p>" +
      "<p><b>Binary to hex:</b> split the binary number into groups of 4 bits, starting from the right. Convert each group to one hex digit.</p>" +
      "<p><b>Hex to binary:</b> write each hex digit as a 4-bit group, then join the groups together.</p>",
    example:
      "<p><b>Binary to hex:</b> <code>10111110</code></p>" +
      "<p>Split: <code>1011</code> <code>1110</code>. 1011 = 11 = B and 1110 = 14 = E. Answer: <code>BE</code>.</p>" +
      "<p><b>Hex to binary:</b> <code>3E</code></p>" +
      "<p>3 = <code>0011</code> and E = <code>1110</code>, so the answer is <code>00111110</code>.</p>",
    checks:[
      { q:"What is the hexadecimal number 5C written as an 8-bit binary number?", options:["01011100","01010011","11000101","01001100"], correct:0, explain:"5 = 0101 and C (12) = 1100, so 5C = 01011100." },
      { q:"What is the binary number 11010001 written in hexadecimal?", options:["1D","D1","C1","D8"], correct:1, explain:"Split into 1101 and 0001. 1101 = 13 = D and 0001 = 1, so the answer is D1." }
    ] },

  { id:"1.1.3", code:"1.1.3", title:"Why hexadecimal is used",
    concept:
      "<p>Computers work in binary, but long binary numbers are hard for people to read, copy and remember. <b>Hexadecimal</b> is a shorter way to write the same binary value, because <b>one hex digit stands for 4 bits</b>. So an 8-bit byte needs only <b>2 hex digits</b>.</p>" +
      "<p>Hexadecimal is <b>easier for humans to understand</b> than binary and it is <b>less likely that mistakes</b> are made when typing or reading it. The computer still stores everything in binary.</p>" +
      "<p>Places where hexadecimal is used include: <b>colour codes</b> in web pages (HTML), <b>MAC addresses</b>, <b>IPv6 addresses</b>, memory addresses and error codes.</p>",
    example:
      "<table class='ln-table'><tr><th>Binary (8 bits)</th><th>Hexadecimal</th></tr><tr><td><code>11111111</code></td><td><code>FF</code></td></tr><tr><td><code>10111110</code></td><td><code>BE</code></td></tr></table>" +
      "<p>A web colour such as <code>#FF0000</code> means: red = FF (255), green = 00, blue = 00, which is pure red. Writing it as 24 binary bits would be much harder to read.</p>" +
      "<p>A MAC address such as <code>3A-7F-C2-19-0B-E4</code> is also written in hexadecimal.</p>",
    checks:[
      { q:"Which statement gives a benefit of using hexadecimal instead of binary?", options:["Computers can process hexadecimal faster than they can process binary","Hexadecimal needs more digits than binary, so it is more accurate","It is a shorter way to write binary, so it is easier to read","Hexadecimal uses fewer logic gates to store the data in memory"], correct:2, explain:"One hex digit represents 4 bits, so hexadecimal is a shorter representation of binary that humans find easier to read. Computers still store binary." },
      { q:"Which of these is an area where hexadecimal is used?", options:["Colour codes in web pages","Measuring the size of a file","Counting the number of pixels in an image","Setting the sample rate of a sound"], correct:0, explain:"HTML colour codes such as #FF0000 are written in hexadecimal. Other examples are MAC addresses and IPv6 addresses." }
    ] },

  { id:"1.1.4a", code:"1.1.4", title:"Adding binary numbers",
    concept:
      "<p>Add two binary numbers column by column, from <b>right to left</b>, just like denary addition. There are only four things that can happen in a column:</p>" +
      "<table class='ln-table'><tr><th>Column sum</th><th>Write</th><th>Carry</th></tr><tr><td>0 + 0</td><td>0</td><td>0</td></tr><tr><td>0 + 1</td><td>1</td><td>0</td></tr><tr><td>1 + 1</td><td>0</td><td>1</td></tr><tr><td>1 + 1 + 1 (with a carry)</td><td>1</td><td>1</td></tr></table>" +
      "<p>Remember: 1 + 1 = 10 in binary (write 0, carry 1).</p>",
    example:
      "<p>Add <code>00110101</code> (53) and <code>01001110</code> (78).</p>" +
      "<pre class='ln-pre'>  0 0 1 1 0 1 0 1\n+ 0 1 0 0 1 1 1 0\n-----------------\n  1 0 0 0 0 0 1 1</pre>" +
      "<p>Right to left: 1+0 = 1; 0+1 = 1; 1+1 = 0 carry 1; 0+1+1 = 0 carry 1; 1+1+1 = 1 carry 1; 1+0+1 = 0 carry 1; 0+0+1 = 1; 0+1 = 1.</p>" +
      "<p>The answer is <code>10000011</code> = 131, and 53 + 78 = 131. &#10003;</p>",
    checks:[
      { q:"What is 00001111 + 00000001 in binary?", options:["00010000","00001110","00011111","00001000"], correct:0, explain:"1+1 = 0 carry 1, and the carry travels through all four 1s: 00001111 + 1 = 00010000 (15 + 1 = 16)." },
      { q:"What is the result of 1 + 1 in a single binary column?", options:["Write 2","Write 1, carry 1","Write 0, carry 1","Write 11, carry 0"], correct:2, explain:"1 + 1 = 10 in binary, so write 0 in that column and carry 1 into the next column." }
    ] },

  { id:"1.1.4b", code:"1.1.4", title:"Overflow errors",
    concept:
      "<p>A register or device can only store a <b>fixed number of bits</b>, for example 8 bits. The largest value that fits in 8 bits is <b>255</b> (<code>11111111</code>).</p>" +
      "<p>An <b>overflow error</b> happens when the result of a calculation is <b>too big to fit</b> in the available bits. The answer needs a 9th bit, but there is nowhere to store it, so the value that should be returned is outside the limit the computer can represent.</p>" +
      "<p>The same idea applies to other limits, for example a 16-bit register holds values up to 65 535.</p>",
    example:
      "<p>Add <code>11001000</code> (200) and <code>01100100</code> (100) in an 8-bit register.</p>" +
      "<pre class='ln-pre'>  1 1 0 0 1 0 0 0\n+ 0 1 1 0 0 1 0 0\n-------------------\n1 0 0 1 0 1 1 0 0</pre>" +
      "<p>The correct answer is 300, which needs <b>9 bits</b>. An 8-bit register cannot hold the extra left-most bit, so an <b>overflow error</b> occurs.</p>",
    checks:[
      { q:"Two 8-bit binary integers are added. For which result does an overflow error occur?", options:["A result of 255","A result of 256","A result of 128","A result of 0"], correct:1, explain:"The largest 8-bit value is 255. A result of 256 or more needs a 9th bit, which causes an overflow error." },
      { q:"Why does an overflow error occur in binary addition?", options:["The two numbers that are added are both positive numbers","The computer does not have enough logic gates to add them","The numbers were entered in hexadecimal and not in binary","The result needs more bits than are available"], correct:3, explain:"An overflow error occurs when the value that should be returned is outside the limit that the register can store." }
    ] },

  { id:"1.1.5", code:"1.1.5", title:"Logical binary shifts",
    concept:
      "<p>A <b>logical shift</b> moves every bit in a register to the left or to the right.</p>" +
      "<ul><li>Bits that are shifted off the end of the register are <b>lost</b>.</li><li><b>Zeros</b> are shifted in at the opposite end.</li><li>You can shift more than one place (a multiple shift).</li></ul>" +
      "<p>The effect on the value of a positive binary integer:</p>" +
      "<ul><li><b>Left shift</b> by 1 place: the number is <b>multiplied by 2</b> (by 4 for 2 places, by 8 for 3 places ...).</li><li><b>Right shift</b> by 1 place: the number is <b>divided by 2</b> (by 4 for 2 places ...).</li></ul>" +
      "<p>If a 1 is shifted off the left end (the most significant bit), the answer is wrong, because that data is lost.</p>",
    example:
      "<p><code>00001101</code> (13) shifted <b>left 2 places</b>:</p>" +
      "<p>Move every bit 2 places left and add two 0s on the right: <code>00110100</code> = 52, and 13 &times; 4 = 52. &#10003;</p>" +
      "<p><code>00110100</code> (52) shifted <b>right 2 places</b>: <code>00001101</code> = 13, and 52 &divide; 4 = 13. &#10003;</p>" +
      "<p><b>Data lost:</b> <code>10110000</code> shifted left 1 place becomes <code>01100000</code>. The left-most 1 fell off, so the value is not doubled.</p>",
    checks:[
      { q:"The 8-bit binary number 00010110 is shifted 1 place to the left. What is the result?", options:["00001011","00101100","00010110","01011000"], correct:1, explain:"Move each bit one place left and add a 0 on the right: 00101100. This is 22 x 2 = 44." },
      { q:"The 8-bit binary number 00101000 (denary 40) is shifted 3 places to the right. What is the result in binary and denary?", options:["00000101 and 5","00001010 and 10","00000101 and 8","00101000 and 40"], correct:0, explain:"Shifting right 3 places divides by 8 (40 / 8 = 5). The bits become 00000101." }
    ] },

  { id:"1.1.6", code:"1.1.6", title:"Two's complement",
    concept:
      "<p><b>Two's complement</b> lets us store <b>negative</b> numbers in binary. In an 8-bit two's complement number the left-most bit is a <b>negative</b> column worth <b>&minus;128</b>:</p>" +
      "<table class='ln-table'><tr><td>&minus;128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr></table>" +
      "<p>This gives a range of <b>&minus;128 to +127</b>. Positive numbers look the same as normal binary (they start with 0).</p>" +
      "<p><b>To write a negative number:</b> 1) write the positive number in binary, 2) invert every bit (0 becomes 1, 1 becomes 0), 3) add 1.</p>" +
      "<p><b>To read a two's complement number:</b> add up the column values, using &minus;128 for the left-most column.</p>",
    example:
      "<p><b>Write &minus;42:</b></p>" +
      "<p>42 = <code>00101010</code>. Invert: <code>11010101</code>. Add 1: <code>11010110</code>.</p>" +
      "<p><b>Read <code>11100101</code>:</b> &minus;128 + 64 + 32 + 4 + 1 = <b>&minus;27</b>.</p>",
    checks:[
      { q:"What is the denary number -5 as an 8-bit two's complement binary integer?", options:["10000101","11111010","11111011","00000101"], correct:2, explain:"5 = 00000101. Invert to 11111010, then add 1: 11111011." },
      { q:"What is the denary value of the 8-bit two's complement number 10000001?", options:["-127","-1","129","-129"], correct:0, explain:"The left-most bit is worth -128, and the right-most 1 is worth +1, so the value is -128 + 1 = -127." }
    ] },

  // ===================== 1.2 Text, sound and images =====================
  { id:"1.2.1", code:"1.2.1", title:"Representing text: ASCII and Unicode",
    concept:
      "<p>A computer stores text by giving every character (letter, digit, symbol) its own <b>binary code</b>. The list of characters and their codes is called a <b>character set</b>.</p>" +
      "<ul><li><b>ASCII</b> (American Standard Code for Information Interchange) uses 7 bits per character, so it has 128 different characters: English letters, digits and common symbols.</li>" +
      "<li><b>Unicode</b> uses more bits per character (for example 16 or 32), so it can store a <b>far greater range of characters</b>: many different languages, symbols and <b>emojis</b>.</li></ul>" +
      "<p>The trade-off: Unicode needs <b>more bits per character</b>, so text takes more storage.</p>",
    example:
      "<p>In ASCII the letter <b>A</b> has the code 65, <b>B</b> is 66, <b>C</b> is 67 and so on. The lower-case <b>a</b> is 97.</p>" +
      "<p>65 in 7-bit binary is <code>1000001</code>.</p>" +
      "<p>An emoji or a Chinese character cannot be stored in ASCII, because there are only 128 codes. Unicode has enough codes for them.</p>",
    checks:[
      { q:"In ASCII the letter A has the code 65. What is the ASCII code of the letter D?", options:["66","67","69","68"], correct:3, explain:"A = 65, B = 66, C = 67, D = 68." },
      { q:"Which statement correctly compares Unicode with ASCII?", options:["Unicode uses fewer bits per character than ASCII does","ASCII can store emojis and other languages but Unicode cannot","Unicode has more characters but needs more bits for each","Unicode and ASCII use exactly the same number of bits per character"], correct:2, explain:"Unicode has a far greater range of characters (languages, symbols and emojis) but uses more bits for each one." }
    ] },

  { id:"1.2.2", code:"1.2.2", title:"Representing sound",
    concept:
      "<p>Sound is a continuous wave. To store it, the computer <b>samples</b> the wave: it measures the height of the wave at regular intervals and stores each measurement as a binary number.</p>" +
      "<ul><li><b>Sample rate</b> = the number of samples taken in <b>one second</b> (measured in hertz, Hz).</li><li><b>Sample resolution</b> = the number of <b>bits per sample</b>.</li></ul>" +
      "<p>If the sample rate and the sample resolution <b>increase</b>, the recording is a more <b>accurate</b> copy of the original sound, but the <b>file size also increases</b>.</p>",
    example:
      "<p>A CD recording uses a sample rate of 44 100 Hz (44 100 samples every second) and a sample resolution of 16 bits.</p>" +
      "<p>A phone call uses a much lower sample rate. The sound is less accurate, but the file is much smaller.</p>" +
      "<p>Doubling the sample rate means twice as many samples every second, so the file is twice as large.</p>",
    checks:[
      { q:"What is meant by the sample rate of a sound recording?", options:["The number of bits that are used for each sample","The number of samples taken in one second","The length of the whole recording in seconds","The loudness of every sample that is taken"], correct:1, explain:"The sample rate is the number of samples taken per second. The number of bits per sample is the sample resolution." },
      { q:"A sound is re-recorded with a higher sample resolution. What is the effect?", options:["The recording is more accurate and the file size increases","The recording is less accurate and the file size decreases","The recording is more accurate and the file size decreases","The recording is less accurate and the file size increases"], correct:0, explain:"More bits per sample gives a more accurate recording, and it also makes the file larger." }
    ] },

  { id:"1.2.3", code:"1.2.3", title:"Representing images",
    concept:
      "<p>An image is a grid of tiny squares called <b>pixels</b>. Each pixel's colour is stored as a binary number.</p>" +
      "<ul><li><b>Resolution</b> = the number of pixels in the image (for example 800 &times; 600).</li><li><b>Colour depth</b> = the number of <b>bits used for each pixel</b>. With a colour depth of <i>n</i> bits an image can use 2<sup><i>n</i></sup> different colours.</li></ul>" +
      "<p>If the resolution and the colour depth <b>increase</b>, the <b>quality</b> of the image gets better but the <b>file size</b> also increases.</p>",
    example:
      "<table class='ln-table'><tr><th>Colour depth</th><th>Number of colours</th></tr><tr><td>1 bit</td><td>2 (for example black and white)</td></tr><tr><td>2 bits</td><td>4</td></tr><tr><td>8 bits</td><td>256</td></tr><tr><td>24 bits</td><td>16 777 216</td></tr></table>" +
      "<p>A picture with more pixels shows finer detail. A picture with a higher colour depth shows smoother shades of colour. Both need more bits to store.</p>",
    checks:[
      { q:"An image has a colour depth of 4 bits. How many different colours can each pixel show?", options:["4","8","16","32"], correct:2, explain:"With 4 bits there are 2 x 2 x 2 x 2 = 16 different patterns, so 16 colours." },
      { q:"A photograph's resolution and colour depth are both increased. What happens to its quality and its file size?", options:["Quality increases and file size decreases","Quality decreases and file size decreases","Quality decreases and file size increases","Quality increases and file size increases"], correct:3, explain:"A higher resolution and colour depth give a better quality image, but more bits are needed so the file is larger." }
    ] },

  // ===================== 1.3 Data storage and compression =====================
  { id:"1.3.1", code:"1.3.1", title:"Measuring data storage",
    concept:
      "<p>The smallest unit of data is the <b>bit</b> (a single 0 or 1). Bigger units are built from it. In computing each unit is <b>1024</b> times the one before it (not 1000).</p>" +
      "<table class='ln-table'><tr><th>Unit</th><th>How much</th></tr>" +
      "<tr><td>bit</td><td>a single 0 or 1</td></tr><tr><td>nibble</td><td>4 bits</td></tr><tr><td>byte</td><td>8 bits</td></tr>" +
      "<tr><td>kibibyte (KiB)</td><td>1024 bytes</td></tr><tr><td>mebibyte (MiB)</td><td>1024 KiB</td></tr><tr><td>gibibyte (GiB)</td><td>1024 MiB</td></tr>" +
      "<tr><td>tebibyte (TiB)</td><td>1024 GiB</td></tr><tr><td>pebibyte (PiB)</td><td>1024 TiB</td></tr><tr><td>exbibyte (EiB)</td><td>1024 PiB</td></tr></table>",
    example:
      "<p>How many KiB are in 3 MiB? 3 &times; 1024 = <b>3072 KiB</b>.</p>" +
      "<p>How many bytes are in 2 KiB? 2 &times; 1024 = <b>2048 bytes</b>.</p>" +
      "<p>How many bits are in 5 bytes? 5 &times; 8 = <b>40 bits</b>.</p>" +
      "<p>To go <b>up</b> a unit, divide by 1024 (or by 8 from bits to bytes). To go <b>down</b>, multiply.</p>",
    checks:[
      { q:"How many bits are in a nibble?", options:["2","4","8","16"], correct:1, explain:"A nibble is 4 bits. A byte is 8 bits (two nibbles)." },
      { q:"How many mebibytes (MiB) are in one gibibyte (GiB)?", options:["1000","1024","8","512"], correct:1, explain:"Each unit is 1024 times the one before, so 1 GiB = 1024 MiB." }
    ] },

  { id:"1.3.2", code:"1.3.2", title:"Calculating file sizes",
    concept:
      "<p>Use these formulas, then convert to the unit the question asks for:</p>" +
      "<ul><li><b>Image</b> file size (bits) = number of pixels &times; colour depth <br>(pixels = width &times; height)</li><li><b>Sound</b> file size (bits) = sample rate &times; sample resolution &times; length in seconds</li></ul>" +
      "<p>Then convert: <b>bits &divide; 8 = bytes</b>, <b>bytes &divide; 1024 = KiB</b>, KiB &divide; 1024 = MiB. Always use 1024, not 1000, and give the answer in the unit asked for. Show every step: method marks are awarded.</p>",
    example:
      "<p><b>Image:</b> 64 &times; 64 pixels, colour depth 8 bits.</p>" +
      "<p>64 &times; 64 = 4096 pixels. 4096 &times; 8 = 32 768 bits. &divide; 8 = 4096 bytes. &divide; 1024 = <b>4 KiB</b>.</p>" +
      "<p><b>Sound:</b> sample rate 8000 Hz, resolution 16 bits, length 4 seconds.</p>" +
      "<p>8000 &times; 16 &times; 4 = 512 000 bits. &divide; 8 = 64 000 bytes. &divide; 1024 = <b>62.5 KiB</b>.</p>",
    checks:[
      { q:"An image is 32 pixels wide and 32 pixels high, with a colour depth of 16 bits. What is its file size in KiB?", options:["1 KiB","4 KiB","16 KiB","2 KiB"], correct:3, explain:"32 x 32 = 1024 pixels. 1024 x 16 = 16 384 bits. / 8 = 2048 bytes. / 1024 = 2 KiB." },
      { q:"A sound file has a sample rate of 4096 Hz, a sample resolution of 8 bits and is 2 seconds long. What is its file size in KiB?", options:["16 KiB","8 KiB","64 KiB","1 KiB"], correct:1, explain:"4096 x 8 x 2 = 65 536 bits. / 8 = 8192 bytes. / 1024 = 8 KiB." }
    ] },

  { id:"1.3.3", code:"1.3.3", title:"Why data is compressed",
    concept:
      "<p><b>Data compression</b> reduces the size of a file. Files are compressed because smaller files:</p>" +
      "<ul><li>need <b>less storage space</b> on the device or server,</li><li>need <b>less bandwidth</b> to send,</li><li>take a <b>shorter time to transmit</b> (upload, download or stream).</li></ul>",
    example:
      "<p>A 12 MiB photo is compressed to 3 MiB before it is emailed. The email uses less bandwidth, arrives sooner and the recipient's mailbox uses less storage.</p>" +
      "<p>Streaming services compress video so that it can be sent quickly enough to play without long pauses.</p>",
    checks:[
      { q:"A school compresses a large video before it uploads it to its website. Which is a benefit of compressing the video?", options:["The video becomes a higher quality recording","The video takes less time to transmit","The video needs more storage space on the server","The video is converted into binary data"], correct:1, explain:"A compressed file is smaller, so it needs less bandwidth and less storage and takes less time to transmit." },
      { q:"What is the purpose of data compression?", options:["To increase the size of a file","To make a file unreadable to others","To reduce the size of a file","To convert a file into hexadecimal"], correct:2, explain:"Compression exists to reduce the size of a file." }
    ] },

  { id:"1.3.4", code:"1.3.4", title:"Lossy and lossless compression",
    concept:
      "<p>There are two ways to compress a file:</p>" +
      "<ul><li><b>Lossy</b> compression reduces the file size by <b>permanently removing data</b>, for example by reducing the resolution or colour depth of an image, or the sample rate or sample resolution of a sound. The removed data cannot be restored.</li>" +
      "<li><b>Lossless</b> compression reduces the file size <b>without permanent loss of data</b>. The original can be rebuilt exactly. An example is <b>run length encoding (RLE)</b>.</li></ul>" +
      "<p><b>RLE</b> replaces a run of identical items with a <b>count and the item</b>.</p>",
    example:
      "<p>RLE of the text <code>AAAABBBCC</code>:</p>" +
      "<p>4 As, 3 Bs, 2 Cs &rarr; <code>4A3B2C</code>. The 9 characters become 6, and the original can be rebuilt exactly.</p>" +
      "<p>RLE works well for an image with large blocks of the same colour. It does not help much when neighbouring items are all different.</p>",
    checks:[
      { q:"What is the run length encoding (RLE) of WWWWBB?", options:["W4B2","4W2B","6WB","WWWWBB"], correct:1, explain:"There are 4 Ws followed by 2 Bs, so it is written as a count then the letter: 4W2B." },
      { q:"A compression method permanently removes some of the data in a file. What type of compression is this?", options:["Lossless","Run length encoding","Lossy","Binary"], correct:2, explain:"Lossy compression permanently removes data to reduce the size. Lossless methods, such as RLE, lose nothing." }
    ] }

  ];

  root.ILEARN_LESSONS = LESSONS;
})(typeof window !== "undefined" ? window : this);
