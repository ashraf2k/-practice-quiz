/* 11BR past-paper questions for iLearn topic 1 (Information representation), objectives 1.1.1 to 1.3.1.
   Wording and mark-scheme text as published (9618 Paper 1, 2023 to 2026). */
(function(){
  var A = window.PPAS, Q = A.Q, kw = A.kw, val = A.v, re = A.re;

  /* 1.1.1 Binary magnitudes and prefixes: 9618/13 May/June 2024 Q1(a) */
  var q111 = Q("AS-J24-13-1a", "1", "Binary and decimal prefixes",
    "Complete the following description.",
    [ { id: "a1", label: "(a)", text: "A kibibyte has a ........................ prefix.", marks: 1, lines: 1 },
      { id: "a2", label: "", text: "Three kibibytes is the same as ........................ bytes.", marks: 1, lines: 1 },
      { id: "a3", label: "", text: "A megabyte has a ........................ prefix.", marks: 1, lines: 1 },
      { id: "a4", label: "", text: "Two terabytes is the same as ........................ gigabytes.", marks: 1, lines: 1 } ],
    [ val("(a) binary", "a1", ["binary"]), val("(a) 3072", "a2", ["3072"]), val("(a) denary / decimal", "a3", ["denary", "decimal"]), val("(a) 2000", "a4", ["2000"]) ],
    [ { q: "1(a)", lead: "1 mark for each correct answer:", ans: ["binary", "3072", "denary/decimal", "2000", "A kibibyte has a binary prefix. Three kibibytes is the same as 3072 bytes.", "A megabyte has a decimal/denary prefix. Two terabytes is the same as 2000 gigabytes."], marks: "4", guide: [] } ],
    "Kibi, mebi, gibi are binary prefixes (powers of 2: 1 KiB = 1024 bytes). Kilo, mega, giga, tera are decimal prefixes (powers of 10). 3 × 1024 = 3072; 2 TB = 2 × 1000 GB.", A.ctx("j2024", 13));

  /* 1.1.2 Number systems: 9618/12 May/June 2023 Q4(a)-(c) */
  var q112 = Q("AS-J23-12-4", "4", "Number systems and conversion",
    "Data in a computer is stored in binary form.",
    [ { id: "a", label: "(a)", text: "State the number of unique binary values that can be represented in 16 bits.", marks: 1, lines: 1 },
      { id: "b", label: "(b)", text: "Give the 8-bit one’s complement representation of the denary number −120.\nShow your working.\n\nWorking\n\nAnswer", marks: 2, lines: 1, work: 3 },
      { id: "c", label: "(c)", text: "Convert the hexadecimal number A04 into denary.\nShow your working.\n\nWorking\n\nAnswer", marks: 2, lines: 1, work: 3 } ],
    [ val("(a) 2¹⁶ = 65536", "a", ["65536", "2^16", "2**16", "2¹⁶"]),
      kw("(b) Working: +120 = 0111 1000", 1, "b+", [[re("0111\\s*1000")]]),
      val("(b) Answer: 1000 0111", "b", ["1000 0111"]),
      kw("(c) Working: A04 = (10 × 256) + 4 // 1010 0000 0100", 1, "c+", [[re("10\\s*[*x×]\\s*(256|16\\s*(\\^|\\*\\*|2|²))"), re("1010\\s*0000\\s*0100")]]),
      val("(c) Answer: 2564", "c", ["2564"]) ],
    [ { q: "4(a)", ans: ["2¹⁶ // 65536"], marks: "1", guide: [] },
      { q: "4(b)", lead: "1 mark for working; 1 mark for answer", ans: ["Working: +120 = 0111 1000", "Answer: 1000 0111"], marks: "2", guide: [] },
      { q: "4(c)", lead: "1 mark for working; 1 mark for answer", ans: ["Working: A04 = (10 × 16²) + 4 // A04 = (10 × 256) + 4 // A04 = 1010 0000 0100", "Answer: 2564"], marks: "2", guide: [] } ],
    "(a) 16 bits give 2¹⁶ = 65536 values. (b) One’s complement: write +120 in binary, then invert every bit. (c) A = 10, 0 and 4: 10 × 256 + 0 × 16 + 4 = 2564.", A.ctx("j2023", 12));

  /* 1.1.3 Binary addition, subtraction and overflow: 9618/13 May/June 2025 Q7(b),(c) */
  var q113 = Q("AS-J25-13-7", "7", "Binary addition and subtraction",
    "",
    [ { id: "b", label: "(b)", text: "Complete the following binary addition. Show your working. Include any overflow bit(s).\n\n     1 1 1 1 0 1 0 1\n   + 1 0 1 1 0 0 0 1\n\nAnswer", marks: 1, lines: 1, work: 4 },
      { id: "c", label: "(c)", text: "Subtract the binary number 00011110 from the binary number 01100100 using binary subtraction. Show your working.\n\nWorking\n\nAnswer", marks: 2, lines: 1, work: 5 } ],
    [ kw("(b) Answer (1) 1010 0110 including the overflow bit", 1, "b", [[re("1\\)?\\s*1010\\s*0110")]]),
      kw("(c) Working shown for a binary subtraction (any method, e.g. borrowing or adding the two’s complement 11100010)", 1, "c+", [["borrow", "two's complement", "twos complement", "11100010", "1110 0010", "invert", "carry", "010 0010", "0 1 1 10"]]),
      val("(c) Answer 0100 0110", "c", ["0100 0110"]) ],
    [ { q: "7(b)", lead: "1 mark for", ans: ["  1 1 1 1 0 1 0 1", "+ 1 0 1 1 0 0 0 1", "(1) 1 0 1 0 0 1 1 0", "Answer: (1) 1010 0110"], marks: "1", guide: [] },
      { q: "7(c)", lead: "1 mark for showing binary subtraction (any method)", ans: ["Direct subtraction: 0 1 1 0 0 1 0 0 − 0 0 0 1 1 1 1 0 = 0 1 0 0 0 1 1 0", "Adding the two’s complement: 0 1 1 0 0 1 0 0 + 1 1 1 0 0 0 1 0 = (1) 0 1 0 0 0 1 1 0", "1 mark for answer 0100 0110"], marks: "2", guide: [] } ],
    "(b) The sum needs a ninth bit: 1 1010 0110. The extra bit is the overflow bit – the result is too large for 8 bits. (c) 01100100 − 00011110 = 100 − 30 = 70 = 0100 0110.", A.ctx("j2025", 13));

  /* 1.1.4 Applications of BCD and hexadecimal: 9618/12 Oct/Nov 2023 Q3(b)(ii),(c) */
  var q114 = Q("AS-N23-12-3", "3", "Binary Coded Decimal",
    "",
    [ { id: "b", label: "(b)(ii)", text: "Convert the Binary Coded Decimal (BCD) into denary.\n\n100001100101\n\nAnswer", marks: 1, lines: 1 },
      { id: "c1", label: "(c)", text: "Identify one practical application of BCD and justify why BCD is used in this application.\n\nApplication", marks: 1, lines: 2 },
      { id: "c2", label: "", text: "Justification", marks: 1, lines: 3 } ],
    [ val("(b)(ii) 865", "b", ["865"]),
      kw("(c) An application: financial / banking calculations; electronic displays e.g. calculators, digital clocks; date and time stored in the BIOS of a PC", 1, "c1", [["financ", "bank", "money", "currency", "calculator", "digital clock", "display", "bios", "date and time", "seven segment", "7 segment", "7-segment", "till", "price"]]),
      kw("(c) A matching justification: exact decimal values with no accumulating errors; displays only need to show individual digits; conversion to/from denary is easier", 1, "c2", [["exact", "accurate", "accumulat", "two decimal", "individual digit", "each digit", "conversion", "easier to convert", "easy to convert", "difficult to represent decimal", "rounding"]]) ],
    [ { q: "3(b)(ii)", ans: ["865"], marks: "1", guide: [] },
      { q: "3(c)", lead: "1 mark for a correct application; 1 mark for a corresponding justification", ans: ["An application that performs financial / banking calculations", "… because it is difficult to represent decimal values exactly in normal binary and financial transactions use only two decimal places and must be accurate, no accumulating errors", "Or", "Electronic displays, e.g. calculators, digital clocks", "… because visual displays only need to show individual digits", "… because conversion between denary and BCD is easier", "Or", "The storage of the date and time in the BIOS of a PC", "… because conversion with denary is easier"], marks: "2", guide: [] } ],
    "BCD stores each denary digit in its own 4 bits: 1000 0110 0101 = 8, 6, 5 = 865. It is used where exact decimal digits matter, such as money, or where each digit is shown on a display.", A.ctx("n2023", 12));

  /* 1.1.5 Character sets: 9618/13 May/June 2025 Q1(c) */
  var q115 = Q("AS-J25-13-1c", "1", "Unicode and extended ASCII",
    "The student types a report on a computer in a history lesson.",
    [ { id: "c1", label: "(c)(i)", text: "The computer uses the Unicode character set.\nGive two characteristics of the Unicode character set.\n1\n2", marks: 2, lines: 4 },
      { id: "c2", label: "(c)(ii)", text: "Some of the school’s computers use the extended ASCII character set.\nThe table gives some characters from the extended ASCII character set, their denary, 8-bit binary and hexadecimal numbers.\n\nComplete the table by filling in the missing numbers.\n\nCharacter   Denary   8-bit Binary   Hexadecimal\n!           33       ..........     21\nL           ......   01001100       4C\nü           252      11111100       ......\n\nWrite the three missing values in order: the 8-bit binary for !, the denary for L, the hexadecimal for ü.", marks: 3, lines: 3 } ],
    [ kw("(c)(i) Max 2: 8 / 16 / 32 bits per character; represents 2⁸ / 2¹⁶ etc. characters; represents every language and other characters such as emojis", 2, "c1",
        [["8 bit", "16 bit", "32 bit", "8-bit", "16-bit", "32-bit", "bits per character", "bits for each character", "bits to represent", "bits"], [re("2\\s*(\\^|²|\\*\\*)?\\s*(8|16|32)"), "256", "65536", "65 536", "many characters", "more characters", "large number of characters", "unique"], ["every language", "all languages", "all the languages", "different languages", "many languages", "emoji", "international", "worldwide", "symbols"]], true),
      kw("(c)(ii) 0010 0001 for !", 1, "c2", [[re("0010\\s*0001")]]),
      kw("(c)(ii) 76 for L", 1, "c2", [[re("(^|[^0-9])76($|[^0-9])")]]),
      kw("(c)(ii) FC for ü", 1, "c2", [[re("(^|[^0-9a-z])fc($|[^0-9a-z])")]]) ],
    [ { q: "1(c)(i)", lead: "1 mark each to max 2", ans: ["8 / 16 / 32 / bits per character", "Represents 2⁸ / 2¹⁶ / etc. characters", "Represents every language and other characters such as emojis"], marks: "2", guide: [] },
      { q: "1(c)(ii)", lead: "1 mark for each correctly completed space", ans: ["Character   Denary   8-bit Binary   Hexadecimal", "!   33   0010 0001   21", "L   76   0100 1100   4C", "ü   252   1111 1100   FC"], marks: "3", guide: [] } ],
    "Unicode uses more bits per character (16 or 32) so it can represent every language and emojis; extended ASCII uses 8 bits (256 characters). 252 = 1111 1100 = FC.", A.ctx("j2025", 13));

  /* 1.2.1 Bitmap images: 9618/13 May/June 2026 Q3(b) */
  var q121 = Q("AS-J26-13-3b", "3", "Bitmap encoding and file size",
    "An animation is a sequence of bitmap images with a sound recording played at the same time.",
    [ { id: "b1", label: "(b)(i)", text: "Explain how the data for the bitmapped images are encoded.", marks: 3, lines: 5 },
      { id: "b2", label: "(b)(ii)", text: "The bitmap images have a bit depth of 2 bytes. Each image is 2048 pixels wide by 1536 pixels high. One second of video contains eight individual bitmap images.\nThere is no sound recording in this part of the video.\nCalculate an estimate for the file size of one second of the video in mebibytes (MiB).\nShow all of your working.\n\nworking:\n\nanswer ........ MiB", marks: 2, lines: 1, work: 4 } ],
    [ kw("(b)(i) Max 3: image is a series of pixels; each pixel has one colour; each colour has a unique binary number; the binary number / code of the colour of each pixel is stored in sequence", 3, "b1",
        [["series of pixels", "grid of pixels", "made up of pixels", "made of pixels", "pixels"], ["one colour", "single colour", "each pixel has a colour", "colour of each pixel", "each pixel is a colour"], ["unique binary", "binary number", "binary code", "binary value"], ["in sequence", "in order", "one after another", "stored in sequence", "row by row", "stored one after"]], true),
      kw("(b)(ii) Working: 2048 × 1536 × 2 × 8 / 1024 / 1024", 1, "b2+", [[re("2048\\s*[*x×]\\s*1536"), re("1536\\s*[*x×]\\s*2048")]]),
      val("(b)(ii) Answer 48 MiB", "b2", ["48"]) ],
    [ { q: "3(b)(i)", lead: "1 mark each to max 3", ans: ["Image is a series of pixels", "… where each pixel has one colour", "Each colour has a unique binary number", "The binary number/code of the colour of each pixel is stored in sequence"], marks: "3", guide: [] },
      { q: "3(b)(ii)", lead: "1 mark for working 1 mark for answer", ans: ["2048 * 1536 * 2 * 8 / 1024 / 1024", "48 MiB"], marks: "2", guide: [] } ],
    "File size = width × height × bytes per pixel × images. 2048 × 1536 × 2 × 8 = 50 331 648 bytes ÷ 1024 ÷ 1024 = 48 MiB.", A.ctx("j2026", 13));

  /* 1.2.2 Effects of changing bitmap elements: 9618/13 May/June 2025 Q1(a) */
  var q122 = Q("AS-J25-13-1a", "1", "Bit depth, image quality and file size",
    "A student paints a picture in an art class.",
    [ { id: "a1", label: "(a)(i)", text: "The student takes a photograph of the picture using a digital camera. The digital camera creates an image with a resolution of 2 million pixels and uses a bit depth of 16 bits.\nCalculate the file size of the image created by the digital camera in megabytes (MB).\nShow your working.\n\nWorking space\n\nAnswer ........ MB", marks: 2, lines: 1, work: 4 },
      { id: "a2", label: "(a)(ii)", text: "The student takes a second photograph with a lower bit depth.\nExplain the effect of decreasing the bit depth on the image and on the image file.\n\nEffect on image\n\nEffect on image file", marks: 4, lines: 6 } ],
    [ kw("(a)(i) Working: 2 000 000 × 16 / (8 × 1000 × 1000)", 1, "a1+", [[re("2\\s*000\\s*000\\s*[*x×]\\s*16"), re("16\\s*[*x×]\\s*2\\s*000\\s*000"), re("2\\s*[*x×]\\s*16\\s*/\\s*8"), re("2\\s*000\\s*000\\s*[*x×]\\s*2")]]),
      val("(a)(i) Answer 4 MB", "a1", ["4"]),
      kw("(a)(ii) Effect on image: fewer shades of colour available; so the image does not match the original as detail is lost. Effect on file: fewer bits are used to store each pixel; so less data is stored, therefore the file size is reduced", 4, "a2",
        [["fewer colour", "fewer shades", "less colour", "fewer colours", "smaller range of colour", "less shades"], ["detail is lost", "less detail", "does not match", "lower quality", "quality", "not as accurate", "less accurate"], ["fewer bits", "less bits", "less data", "fewer bits per pixel", "bits to store each pixel"], ["file size", "smaller file", "file is smaller", "reduced", "decrease"]], true) ],
    [ { q: "1(a)(i)", lead: "1 mark for correct working:", ans: ["e.g. 2000000 * 16 / (8 * 1000 * 1000)", "1 mark for answer: 4MB"], marks: "2", guide: [] },
      { q: "1(a)(ii)", lead: "1 mark each", ans: ["Image:", "There will be fewer shades of colour available", "so the image does not match the original as detail is lost", "Image file:", "Fewer bits are used to store each pixel", "so less data is stored, therefore the file size is reduced"], marks: "4", guide: [] } ],
    "2 000 000 pixels × 16 bits = 32 000 000 bits = 4 000 000 bytes = 4 MB. A lower bit depth gives fewer colours (less detail) and fewer bits per pixel, so a smaller file.", A.ctx("j2025", 13));

  /* 1.2.3 Vector graphics: 9618/12 Oct/Nov 2024 Q7(b) */
  var q123 = Q("AS-N24-12-7b", "7", "Vector graphics: property and drawing list",
    "A student draws a picture on paper that is scanned into the computer and saved as a vector graphic.",
    [ { id: "b1", label: "(b)", text: "Define the vector graphic terms property and drawing list.\n\nProperty", marks: 1, lines: 3 },
      { id: "b2", label: "", text: "Drawing list", marks: 1, lines: 3 } ],
    [ kw("(b) Property: an attribute of a drawing object // data about a shape // defines one aspect of the appearance of a drawing object", 1, "b1", [["attribute", "data about a shape", "aspect of the appearance", "colour", "size", "line thickness", "fill", "defines", "characteristic", "describes"]]),
      kw("(b) Drawing list: all the drawing objects/shapes in an image // stores the commands / descriptions / mathematical equations required to draw each object", 1, "b2", [["all the", "list of", "objects", "shapes", "commands", "descriptions", "equations", "mathematical", "instructions"]]) ],
    [ { q: "7(b)", lead: "1 mark for each correct definition", ans: ["Property:", "an attribute of a drawing object // data about a shape // defines one aspect of the appearance of a drawing object", "Drawing list:", "all the drawing objects/shapes in an image // stores the commands/descriptions / mathematical equations required to draw each object"], marks: "2", guide: [] } ],
    "A vector graphic is stored as a drawing list of objects (circle, line …). Each object has properties such as position, size, line colour and fill colour.", A.ctx("n2024", 12));

  /* 1.2.4 Sound: 9618/12 May/June 2026 Q4 */
  var q124 = Q("AS-J26-12-4", "4", "Sampling rate and sampling resolution",
    "A sound file has a sampling rate of 44.1 kHz.",
    [ { id: "a", label: "(a)", text: "Describe what is meant by a sampling rate of 44.1 kHz.", marks: 1, lines: 2 },
      { id: "b", label: "(b)", text: "A student creates a recording of a sound with a sampling resolution of 2 bytes.\nThe student creates a second recording of the same sound but with a sampling resolution of 8 bits.\nExplain how the two sound recordings and the two sound files will be affected by the different sampling resolutions.", marks: 3, lines: 6 } ],
    [ kw("(a) The sound wave is measured 44 100 times each second // 44 100 samples are taken every second", 1, "a", [[re("44\\s*[,.]?\\s*(100|1\\s*thousand)"), "44.1 thousand", "44100"], ["second", "per second", "each second", "every second"]]),
      kw("(b) Max 3: 2 bytes (16 bits) means more bits per sample; … larger file size; … more accurate to the original; because a greater range / more exact amplitudes can be recorded; with smaller quantisation errors (reverse arguments allowed for 8 bits)", 3, "b",
        [["more bits per sample", "16 bits", "2 bytes", "fewer bits per sample", "8 bits"], ["larger file", "bigger file", "file size", "smaller file", "more storage", "less storage"], ["more accurate", "closer to the original", "accurate", "less accurate", "lower quality", "better quality"], ["range", "exact amplitude", "more amplitude", "more values", "fewer values", "quantisation", "quantization", "detail"]], true) ],
    [ { q: "4(a)", lead: "1 mark for:", ans: ["The sound wave is measured 44100 times each second // 44100 samples are taken every second"], marks: "1", guide: ["Accept appropriate alternative words for measured including ‘sampled’", "Accept 44.1 thousand instead of 44100"] },
      { q: "4(b)", lead: "1 mark each to max 3", ans: ["The resolution of 2 bytes (16 bits) will have more bits per sample", "… which will result in a larger file size", "… but the digital sound will be more accurate to original", "… because a greater range/more exact amplitudes can be recorded", "… with smaller quantisation errors"], marks: "3", guide: ["Must be clear which resolution is being described", "Allow reverse arguments e.g. The resolution of 8 bits will have fewer bits per sample … which will result in a smaller file size etc."] } ],
    "Sampling rate = samples per second. Sampling resolution = bits per sample. More bits per sample means a more accurate sound but a larger file.", A.ctx("j2026", 12));

  /* 1.3.1 Compression: 9618/13 May/June 2024 Q2(b),(c) */
  var q131 = Q("AS-J24-13-2", "2", "Lossy and lossless compression",
    "A photograph is stored as a bitmap image. The photograph is compressed before being uploaded to a web server.",
    [ { id: "b1", label: "(b)(i)", text: "Give three benefits of this photograph being compressed using lossy compression instead of lossless compression.\n1\n2\n3", marks: 3, lines: 6 },
      { id: "b2", label: "(b)(ii)", text: "Explain how run-length encoding (RLE) will compress the photograph.", marks: 2, lines: 4 },
      { id: "c", label: "(c)", text: "Identify two elements of a bitmap image that can be changed to reduce its file size.\n1\n2", marks: 2, lines: 3 } ],
    [ kw("(b)(i) Max 3: takes less storage space on the server; faster to upload / download; uses less bandwidth to transmit; consumes less data allowance", 3, "b1",
        [["less storage", "less space", "less memory", "smaller file", "storage space", "take up less"], ["faster", "quicker", "less time", "speed"], ["bandwidth"], ["data allowance", "data usage", "less data", "data cap", "cheaper"]], true),
      kw("(b)(ii) Identifies consecutive repeating pixels of the same colour; stores the colour/pattern and the number of times it repeats", 2, "b2", [["consecutive", "repeating", "same colour", "adjacent", "next to each other", "runs of", "repeated"], ["number of times", "how many times", "count", "frequency", "stores the colour", "colour and"]], true),
      kw("(c) Colour / bit depth; image resolution", 2, "c", [["colour depth", "bit depth", "colour", "bits per pixel"], ["resolution", "number of pixels", "dimensions", "size of the image"]], true) ],
    [ { q: "2(b)(i)", lead: "1 mark each to max 3:", ans: ["The file takes less storage space on the web server than if lossless compression was used", "The file is faster to upload/download to/from the server than if lossless compression was used", "The file uses less bandwidth to transmit than if lossless compression was used", "The file consumes less data allowance than if lossless compression was used"], marks: "3", guide: [] },
      { q: "2(b)(ii)", lead: "1 mark each:", ans: ["Identifies consecutive repeating pixels of the same colour", "Stores the colour/pattern and the number of times it repeats"], marks: "2", guide: [] },
      { q: "2(c)", lead: "1 mark each to max 2:", ans: ["Colour/bit depth", "Image resolution"], marks: "2", guide: [] } ],
    "Lossy compression permanently removes data so files are smaller (less storage, faster transfer, less bandwidth). RLE is lossless: runs of identical pixels are stored once with a count.", A.ctx("j2024", 13));

  A.paper("1.1.1", "Binary magnitudes", [q111]);
  A.paper("1.1.2", "Number systems", [q112]);
  A.paper("1.1.3", "Binary arithmetic and overflow", [q113]);
  A.paper("1.1.4", "Applications of BCD and hexadecimal", [q114]);
  A.paper("1.1.5", "Character sets", [q115]);
  A.paper("1.2.1", "Bitmap images", [q121]);
  A.paper("1.2.2", "Changing bitmap elements", [q122]);
  A.paper("1.2.3", "Vector graphics", [q123]);
  A.paper("1.2.4", "Sound", [q124]);
  A.paper("1.3.1", "Compression", [q131]);
})();
