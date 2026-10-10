  // ============================================================
  // "Topical Real Exam Questions" data -- separate from EXAMS in
  // quiz-data.js (those are multiple-choice "practice questions").
  // These are free-response, exam-style questions with official mark
  // schemes, answered in exam-practice.html: the student types an
  // answer, an "AI, check my answer!" button runs a keyword-assisted
  // grader against each marking point, then the full official mark
  // scheme and explanation are always shown too, so the student can
  // correct the automated check if it got something wrong -- see
  // exam-practice.html's gradeMarkPoint()/checkAnswer() for how
  // `match` specs here are actually used.
  //
  // Source: the teacher-supplied "Unit 1: Data Representation — Practice
  // Examination" (20 questions, 3 difficulty tiers). Every question's
  // marks below are the VERIFIED total of its own mark scheme's bullet
  // points (Question 2's official total is 2 marks -- "base 16" + "4
  // bits/1 nibble" -- even though its header line says "[1 Mark]", a
  // typo in the source). Summing every question this way gives 48 marks
  // total, not the source's claimed "50" -- that headline figure appears
  // to be a few marks off in the original material.
  var EXAM_PAPERS = {
    datarep_exam: {
      key: "datarep_exam",
      title: "Topic 1: Data Representation — Exam Practice",
      subtitle: "20 exam-style questions · Number Systems, Text/Sound/Images, Storage & Compression · 48 marks total",
      classes: ["10BR1","10BR2","10BR3"],
      totalMarks: 48,
      questions: [

        // ============== EASY TIER (5 questions, 6 marks) ==============
        {
          id: "Q1", syl: ["1.1.2"], calc: true, marks: 1, difficulty: "easy",
          topic: "Binary ↔ Denary Conversion",
          prompt: "Convert the positive denary integer 156 into an 8-bit binary integer.",
          markPoints: [
            {
              text: "10011100 (Working: 128 + 16 + 8 + 4 = 156)",
              marks: 1,
              match: { type: "numeric", values: ["10011100"] }
            }
          ],
          explanation: "Place values for an 8-bit byte are 128 64 32 16 8 4 2 1. 156 − 128 = 28 → 28 − 16 = 12 → 12 − 8 = 4 → 4 − 4 = 0. Placing 1s under 128, 16, 8, 4 and 0s elsewhere gives 10011100."
        },
        {
          id: "Q2", syl: ["1.1.2","1.1.3"], marks: 2, difficulty: "easy",
          topic: "Hexadecimal Basics",
          prompt: "State the base of the hexadecimal number system, and identify how many binary bits are represented by a single hexadecimal digit.",
          markPoints: [
            { text: "Base 16", marks: 1, match: { type: "keywords", groups: [["16","sixteen"]], needCount: 1 } },
            { text: "4 bits (1 nibble)", marks: 1, match: { type: "keywords", groups: [["4 bit","4-bit","four bit","nibble"]], needCount: 1 } }
          ],
          explanation: "Hexadecimal is a base-16 number system using digits 0–9 and letters A–F (A=10 to F=15). Because 2^4 = 16, exactly 4 binary bits (one nibble) correspond to one hexadecimal digit."
        },
        {
          id: "Q3", syl: ["1.2.3"], marks: 1, difficulty: "easy",
          topic: "Pixels & Bitmap Images",
          prompt: "Define the term pixel.",
          markPoints: [
            {
              text: "The smallest single component / picture element that makes up a digital bitmap image (of one single colour).",
              marks: 1,
              match: { type: "keywords", groups: [["smallest","single"], ["picture element","component","unit","building block","dot"]], needCount: 2 }
            }
          ],
          explanation: "The word “pixel” stands for picture element. It is the fundamental building block of a grid-based bitmap image."
        },
        {
          id: "Q4", syl: ["1.3.1"], calc: true, marks: 1, difficulty: "easy",
          topic: "Storage Units (bits/Bytes)",
          prompt: "Convert 32 bits into Bytes.",
          markPoints: [
            { text: "4 Bytes (Working: 32 / 8 = 4)", marks: 1, match: { type: "numeric", values: ["4"] } }
          ],
          explanation: "There are 8 bits in 1 Byte. Dividing 32 bits by 8 yields 4 Bytes."
        },
        {
          id: "Q5", syl: ["1.3.3"], marks: 1, difficulty: "easy",
          topic: "Why Compress Data",
          prompt: "State one reason why a video file is compressed before being transmitted over the Internet.",
          markPoints: [
            {
              text: "Any one of: reduces file size; reduces bandwidth required; decreases transmission/download/upload time; prevents buffering during streaming.",
              marks: 1,
              match: {
                type: "keywords",
                groups: [["reduce","smaller","decrease","less storage","less space"], ["bandwidth","transmission time","download","upload","buffering","streaming","faster","speed up","quicker"]],
                needCount: 1
              }
            }
          ],
          explanation: "Smaller files require less data transfer per second, reducing bandwidth demands and speeding up transmission across networks."
        },

        // ============== INTERMEDIATE TIER (10 questions, 23 marks) ==============
        {
          id: "Q6", syl: ["1.1.2"], calc: true, marks: 2, difficulty: "intermediate",
          topic: "Hexadecimal Conversion",
          prompt: "A network router displays an error code in hexadecimal as 3E.\n(a) Convert 3E into an 8-bit binary number.\n(b) Convert 3E into a denary integer.",
          markPoints: [
            { text: "(a) 00111110", marks: 1, match: { type: "numeric", values: ["00111110"] } },
            { text: "(b) 62", marks: 1, match: { type: "numeric", values: ["62"] } }
          ],
          explanation: "Binary: 3 = 0011 and E (14) = 1110. Joining nibbles gives 00111110. Denary: (3 × 16) + (14 × 1) = 48 + 14 = 62."
        },
        {
          id: "Q7", syl: ["1.1.4"], calc: true, marks: 3, difficulty: "intermediate",
          topic: "Binary Addition",
          prompt: "Add the following two 8-bit binary integers. Show all your working (carries).\n  0110 0101\n+ 0011 1100",
          markPoints: [
            { text: "Correct carries shown (at least 3 correct carries)", marks: 1, match: { type: "keywords", groups: [["carry","carries"]], needCount: 1 } },
            { text: "Correct right nibble (0001)", marks: 1, match: { type: "numeric", values: ["0001"] } },
            { text: "Final answer: 10100001 (correct left nibble 1010)", marks: 1, match: { type: "numeric", values: ["10100001"] } }
          ],
          explanation: "Denary check: 01100101 = 101, 00111100 = 60. 101 + 60 = 161. Converting 161 to binary: 128 + 32 + 1 = 10100001."
        },
        {
          id: "Q8", syl: ["1.1.5"], calc: true, marks: 2, difficulty: "intermediate",
          topic: "Logical Shifts",
          prompt: "A register contains the 8-bit binary integer 00110100 (denary 52).\n(a) Perform a logical shift 2 places to the left. Give the resulting binary number.\n(b) Perform a logical shift 1 place to the right on the ORIGINAL binary number. State the denary result.",
          markPoints: [
            { text: "(a) 11010000", marks: 1, match: { type: "numeric", values: ["11010000"] } },
            { text: "(b) 26 (00011010)", marks: 1, match: { type: "numeric", values: ["26","00011010"] } }
          ],
          explanation: "Left shift by 2: move all bits left 2 places, fill with 0s on the right → 11010000 (52 × 2² = 208). Right shift by 1: move all bits right 1 place → 00011010 (52 / 2 = 26)."
        },
        {
          id: "Q9", syl: ["1.1.6"], calc: true, marks: 2, difficulty: "intermediate",
          topic: "Two's Complement",
          prompt: "Convert the negative denary integer −35 into an 8-bit two's complement binary integer. Show your working.",
          markPoints: [
            { text: "Positive binary (00100011) or inverted bits (11011100) shown", marks: 1, match: { type: "numeric", values: ["00100011","11011100"] } },
            { text: "Final answer: 11011101", marks: 1, match: { type: "numeric", values: ["11011101"] } }
          ],
          explanation: "1. Positive +35 in 8-bit binary: 00100011. 2. Invert all bits: 11011100. 3. Add 1: 11011101. Check: −128+64+16+8+4+1 = −35."
        },
        {
          id: "Q10", syl: ["1.2.1"], marks: 2, difficulty: "intermediate",
          topic: "ASCII vs Unicode",
          prompt: "Describe two reasons why the Unicode character set was developed to replace standard ASCII.",
          markPoints: [
            {
              text: "Any two of: ASCII is limited to 7/8 bits (128/256 characters); Unicode uses 16/32 bits (100,000+ characters); ASCII can't represent non-English scripts; Unicode supports global languages and emoji.",
              marks: 2,
              match: {
                type: "keywords",
                groups: [
                  ["7 bit","8 bit","128","256","limited"],
                  ["16 bit","32 bit","100,000","100000","more character","larger set","bigger set"],
                  ["english","western","latin"],
                  ["global","mandarin","arabic","cyrillic","chinese","japanese","emoji","language"]
                ],
                needCount: 2,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "ASCII's 8-bit limit (256 codes) cannot accommodate non-Latin alphabets and symbols. Unicode expands bit depth per character to encode global scripts."
        },
        {
          id: "Q11", syl: ["1.2.2"], marks: 3, difficulty: "intermediate",
          topic: "Sound Sampling",
          prompt: "A microphone records audio that is converted from analogue to digital form.\n(a) Define sample rate.\n(b) Define sample resolution.\n(c) State the effect of increasing the sample resolution on the quality and file size of the audio.",
          markPoints: [
            { text: "(a) The number of samples taken per second (Hz)", marks: 1, match: { type: "keywords", groups: [["samples per second","number of samples","sampling rate","times per second"]], needCount: 1 } },
            { text: "(b) The number of bits used to store/represent each sample", marks: 1, match: { type: "keywords", groups: [["bits per sample","number of bits","bit depth","bits to store","bits used"]], needCount: 1 } },
            { text: "(c) Improves quality/accuracy AND increases file size", marks: 1, match: { type: "keywords", groups: [["quality","accuracy","accurate","precise"], ["file size","larger","bigger","increase","storage","more space"]], needCount: 2 } }
          ],
          explanation: "Sampling measures wave height at fixed time intervals. More bits per sample (resolution) allow finer distinctions in amplitude, yielding a digital wave closer to the analogue original at the cost of higher storage requirements."
        },
        {
          id: "Q12", syl: ["1.2.3"], calc: true, marks: 2, difficulty: "intermediate",
          topic: "Colour Depth",
          prompt: "A digital graphic uses a colour depth of 6 bits per pixel.\n(a) Calculate the maximum number of unique colours that can be represented.\n(b) Explain why increasing the colour depth increases the overall file size of the image.",
          markPoints: [
            { text: "(a) 64 colours (2^6)", marks: 1, match: { type: "numeric", values: ["64"] } },
            { text: "(b) More bits are required to store the colour code for each pixel", marks: 1, match: { type: "keywords", groups: [["more bits","extra bits","bits per pixel","bits to store"], ["file size","larger","bigger","increase"]], needCount: 2 } }
          ],
          explanation: "Colour capacity is 2^(colour depth). With 6 bits, 2^6 = 64 unique colours. Because every pixel holds 6 bits instead of fewer, the file footprint grows proportionally."
        },
        {
          id: "Q13", syl: ["1.3.1"], calc: true, marks: 2, difficulty: "intermediate",
          topic: "IEC Storage Units",
          prompt: "(a) Calculate how many Mebibytes (MiB) are contained in 3 Gibibytes (GiB).\n(b) State the correct IEC unit abbreviation for 2^40 bytes.",
          markPoints: [
            { text: "(a) 3072 MiB (3 × 1024)", marks: 1, match: { type: "numeric", values: ["3072"] } },
            { text: "(b) Tebibyte / TiB", marks: 1, match: { type: "keywords", groups: [["tib","tebibyte"]], needCount: 1 } }
          ],
          explanation: "The 0478 syllabus uses IEC binary prefixes (1024 = 2^10 multiplier). 1 GiB = 1024 MiB, so 3 GiB = 3072 MiB. 2^10=KiB, 2^20=MiB, 2^30=GiB, 2^40=TiB."
        },
        {
          id: "Q14", syl: ["1.3.4"], marks: 3, difficulty: "intermediate",
          topic: "Lossy vs Lossless Compression",
          prompt: "A website designer compresses image and text files before publishing them online. Explain why lossy compression is suitable for high-resolution photograph files, but completely unsuitable for program source code files.",
          markPoints: [
            { text: "Photos: the human eye cannot easily detect minor colour/detail changes removed by lossy compression", marks: 1, match: { type: "keywords", groups: [["eye","perceive","notice","detect","unnoticeable","imperceptible"]], needCount: 1 } },
            { text: "Source code: lossy compression permanently removes data, corrupting the code / making it non-functional", marks: 1, match: { type: "keywords", groups: [["corrupt","break","non-functional","error","syntax","won't run","doesn't work","unusable","stop working"]], needCount: 1 } },
            { text: "Contrast: source code needs LOSSLESS compression so the original data can be reconstructed exactly", marks: 1, match: { type: "keywords", groups: [["lossless"], ["exact","reconstruct","original","precision","unchanged","identical"]], needCount: 1 } }
          ],
          explanation: "Lossy compression discards imperceptible data permanently (e.g. subtle colour variations in photos). Software code requires exact, byte-for-byte precision; deleting characters introduces syntax errors."
        },
        {
          id: "Q15", syl: ["1.3.4"], calc: true, marks: 2, difficulty: "intermediate",
          topic: "Run-Length Encoding (RLE)",
          prompt: "The following sequence of colour character codes represents a row of pixels: B B B B B W W R R R R\n(a) Encode this pixel sequence using Run-Length Encoding (RLE).\n(b) Assuming each character code and count each take 1 Byte, calculate the storage saved compared to the uncompressed sequence.",
          markPoints: [
            { text: "(a) 5B 2W 4R", marks: 1, match: { type: "rle", tokens: ["5b","2w","4r"] } },
            { text: "(b) 5 Bytes saved (11 uncompressed − 6 compressed)", marks: 1, match: { type: "numeric", values: ["5"] } }
          ],
          explanation: "RLE replaces repeating runs of identical data with count-value pairs. 11 original characters = 11 Bytes. 3 pairs (5B 2W 4R) = 6 Bytes, saving 11 − 6 = 5 Bytes."
        },

        // ============== HARD TIER (5 questions, 19 marks) ==============
        {
          id: "Q16", syl: ["1.1.4"], calc: true, marks: 4, difficulty: "hard",
          topic: "Binary Addition & Overflow",
          prompt: "A system uses 8-bit registers. An algorithm adds two positive denary integers: 156 and 118.\n(a) Perform binary addition on 10011100 (156) and 01110110 (118). Show your working.\n(b) Explain why an overflow error occurs and describe its effect on the stored result.",
          markPoints: [
            { text: "Working/carries shown", marks: 1, match: { type: "keywords", groups: [["carry","carries"]], needCount: 1 } },
            { text: "Result: 100010010 (9 bits)", marks: 1, match: { type: "numeric", values: ["100010010"] } },
            { text: "The sum (274) exceeds the maximum 8-bit value (255)", marks: 1, match: { type: "keywords", groups: [["255","274"], ["exceed","overflow","too big","too large","greater than","larger than"]], needCount: 2 } },
            { text: "The 9th carry bit is lost/truncated, leaving 00010010 (18) — an incorrect result", marks: 1, match: { type: "keywords", groups: [["lost","truncated","discarded","dropped","overflow bit","cut off"], ["18"]], needCount: 1 } }
          ],
          explanation: "An 8-bit register stores 0 to 255 (2^8 − 1). 156 + 118 = 274 needs 9 bits. The MSB carry overflows out of the register, leaving an incorrect truncated value (18)."
        },
        {
          id: "Q17", syl: ["1.1.6"], calc: true, marks: 3, difficulty: "hard",
          topic: "Two's Complement Range & Conversion",
          prompt: "(a) State the smallest (most negative) and largest (most positive) denary integers that can be stored in an 8-bit two's complement register.\n(b) Convert the two's complement binary integer 10101100 into a denary integer. Show your working.",
          markPoints: [
            { text: "(a) Smallest −128, largest +127", marks: 1, match: { type: "keywords", groups: [["-128","128"], ["127"]], needCount: 2 } },
            { text: "(b) −84, with place-value weights shown (−128 + 32 + 8 + 4)", marks: 2, match: { type: "numeric", values: ["-84"] } }
          ],
          explanation: "(a) An 8-bit two's complement system ranges from −2^7 (10000000 = −128) to +2^7−1 (01111111 = +127). (b) (−128×1)+(32×1)+(8×1)+(4×1) = −128+32+8+4 = −84."
        },
        {
          id: "Q18", syl: ["1.3.2"], calc: true, marks: 4, difficulty: "hard",
          topic: "Image File Size Calculation",
          prompt: "A digital camera captures an uncompressed bitmap image: Resolution 1024 × 768 pixels, Colour Depth 16 bits per pixel. Calculate the file size of the uncompressed image in Mebibytes (MiB). Show all steps.",
          markPoints: [
            { text: "Total pixels = 1024 × 768 = 786,432", marks: 1, match: { type: "numeric", values: ["786432","786,432"] } },
            { text: "Bits = 786,432 × 16 = 12,582,912; Bytes = 1,572,864", marks: 1, match: { type: "numeric", values: ["1572864","1,572,864","12582912","12,582,912"] } },
            { text: "KiB = 1,572,864 / 1024 = 1536 KiB", marks: 1, match: { type: "numeric", values: ["1536"] } },
            { text: "MiB = 1536 / 1024 = 1.5 MiB", marks: 1, match: { type: "numeric", values: ["1.5"] } }
          ],
          explanation: "File size (MiB) = (Width × Height × Colour Depth bits) / (8 × 1024 × 1024) = (1024×768×16) / 8,388,608 = 12,582,912 / 8,388,608 = 1.5 MiB."
        },
        {
          id: "Q19", syl: ["1.3.2"], calc: true, marks: 4, difficulty: "hard",
          topic: "Audio File Size Calculation",
          prompt: "A mono voice recording: Sample Rate 44,100 Hz, Sample Resolution 16 bits, Duration 80 seconds. Calculate the estimated file size of the uncompressed recording in MiB. Show your working and round to 2 decimal places.",
          markPoints: [
            { text: "Bits = 44,100 × 16 × 80 = 56,448,000 bits", marks: 1, match: { type: "numeric", values: ["56448000","56,448,000"] } },
            { text: "Bytes = 56,448,000 / 8 = 7,056,000 Bytes", marks: 1, match: { type: "numeric", values: ["7056000","7,056,000"] } },
            { text: "MiB = 7,056,000 / 1,048,576 ≈ 6.7291 MiB", marks: 1, match: { type: "numeric", values: ["6.7291","6.729","6.73"] } },
            { text: "Final rounded answer: 6.73 MiB", marks: 1, match: { type: "numeric", values: ["6.73"] } }
          ],
          explanation: "Size (Bytes) = (Sample Rate × Resolution × Length) / 8 = (44,100×16×80)/8 = 7,056,000 Bytes. Dividing by 1,048,576 gives 6.7291... MiB, which rounds to 6.73 MiB."
        },
        {
          id: "Q20", syl: ["1.3.4"], calc: true, marks: 4, difficulty: "hard",
          topic: "RLE Efficiency Analysis",
          prompt: "A bitmap image grid is 8 pixels wide by 8 pixels high (64 pixels total), monochrome (1 bit per pixel).\n(a) Calculate the uncompressed image file size in Bytes (excluding metadata).\n(b) The first row is alternating pixels: W B W B W B W B. Explain why applying RLE to this specific row INCREASES the data size compared to the uncompressed data.",
          markPoints: [
            { text: "(a) 8 Bytes (64 bits / 8)", marks: 1, match: { type: "numeric", values: ["8"] } },
            { text: "Uncompressed, each pixel needs 1 bit (8 bits total = 1 Byte)", marks: 1, match: { type: "keywords", groups: [["1 bit","one bit"], ["8 bit","1 byte","one byte"]], needCount: 1 } },
            { text: "RLE needs 8 separate runs of length 1 for this alternating row", marks: 1, match: { type: "keywords", groups: [["8 run","eight run","run of 1","run of one","length 1","alternat"]], needCount: 1 } },
            { text: "Storing 8 count-colour pairs needs far more space than 8 bits — the data expands", marks: 1, match: { type: "keywords", groups: [["more space","more bits","more storage","bigger","larger","expand","increase"]], needCount: 1 } }
          ],
          explanation: "RLE relies on consecutive repeats of identical data. When data alternates every pixel, every item forms a run of length 1 — storing a count AND a colour value for each of the 8 runs needs far more than the original 8 bits, so the “compressed” data is actually bigger (negative compression)."
        }
      ]
    },

    // Source: the teacher-supplied "Cambridge IGCSE Computer Science (0478)
    // -- Topic 2: Data Transmission" examination, Section 3 (the ten
    // Paper 1 exam-style questions). Each source question has been split
    // into its lettered parts so the adaptive engine (see exam-practice.html)
    // has a pool of small, individually graded questions across all three
    // tiers, exactly like datarep_exam above. Every question's marks are
    // the verified total of its own markPoints. Deliberate departures from
    // the source text, where the source was wrong or not gradeable:
    //   - the source's parity-block grid (its Q5) did not have a single bad
    //     row AND column, so no bit could be located from it; the grid below
    //     is rebuilt (odd parity, one flipped bit at Byte 3 / Bit 4, which is
    //     the source's own stated location) and its correct value is 1.
    //   - the "draw lines to match" question can't be drawn in a text box,
    //     so it is asked as "describe each term".
    //   - the four-byte parity table is asked as "which byte has an error
    //     and why", as a list of Yes/No can't be keyword-graded reliably.
    datatrans_exam: {
      key: "datatrans_exam",
      title: "Topic 2: Data Transmission — IGCSE exam style",
      subtitle: "23 exam-style questions · Packets, serial/parallel & USB, error detection, encryption · 60 marks total",
      classes: ["10BR1","10BR2","10BR3"],
      totalMarks: 60,
      questions: [

        // ============== EASY TIER ==============
        {
          id: "Q1", syl: ["2.1.1"], marks: 3, difficulty: "easy",
          topic: "Data Packet Structure",
          prompt: "Data is transmitted across the Internet using packet switching. A data packet is divided into three distinct sections. State the name of each of the three sections.",
          markPoints: [
            { text: "Packet header", marks: 1, match: { type: "keywords", groups: [["header"]], needCount: 1 } },
            { text: "Payload", marks: 1, match: { type: "keywords", groups: [["payload","body"]], needCount: 1 } },
            { text: "Packet trailer", marks: 1, match: { type: "keywords", groups: [["trailer","footer"]], needCount: 1 } }
          ],
          explanation: "Every packet has a header at the front, the payload (the actual data being sent) in the middle, and a trailer at the end."
        },
        {
          id: "Q2", syl: ["2.1.1"], marks: 3, difficulty: "easy",
          topic: "Data Packet Structure",
          prompt: "Data is sent across a network in packets. Each packet contains a packet header, a payload and a trailer.\nState three items of data that are stored in the packet header. [3 marks]",
          markPoints: [
            { text: "Any three of: the destination address; the packet number; the originator's (sender's) address", marks: 3, match: {"type":"keywords","groups":[["destination"],["packet number","sequence","number of the packet","packet no"],["originator","sender","source"]],"needCount":3,"marksPerGroup":1} }
          ],
          explanation: "The packet header includes the destination address, the packet number and the originator's address. The payload is the data being sent."
        },
        {
          id: "Q3", syl: ["2.1.2"], marks: 4, difficulty: "easy",
          topic: "Serial, Parallel & Duplex Transmission",
          prompt: "Describe each of the following data transmission terms.\n(a) Serial transmission\n(b) Parallel transmission\n(c) Simplex transmission\n(d) Full-duplex transmission",
          markPoints: [
            { text: "(a) Serial: data transmitted one bit at a time down a single wire / channel", marks: 1, match: { type: "keywords", groups: [["one bit at a time","1 bit at a time","single wire","one wire","single channel","one channel","bit by bit","one bit"]], needCount: 1 } },
            { text: "(b) Parallel: several bits transmitted at once down multiple wires", marks: 1, match: { type: "keywords", groups: [["multiple wires","several wires","many wires","multiple bits","several bits","many bits","more than one bit","multiple channels","several channels","8 bits at"]], needCount: 1 } },
            { text: "(c) Simplex: data transmitted in one direction only", marks: 1, match: { type: "keywords", groups: [["one direction","one way","one-way","single direction","only one direction"]], needCount: 1 } },
            { text: "(d) Full-duplex: data transmitted in both directions simultaneously", marks: 1, match: { type: "keywords", groups: [["both directions","two directions","both ways","two-way","two way","at the same time","simultaneous"]], needCount: 1 } }
          ],
          explanation: "Serial sends one bit at a time down a single wire/channel. Parallel sends several bits at once down multiple wires. Simplex is one direction only (e.g. computer to printer). Full-duplex is both directions at the same time (e.g. a telephone call or fibre broadband)."
        },
        {
          id: "Q4", syl: ["2.1.3"], marks: 3, difficulty: "easy",
          topic: "USB Interface",
          prompt: "A computer keyboard and mouse are connected to a desktop computer using USB cables. State three benefits of using a USB interface to connect peripheral devices to a computer.",
          markPoints: [
            {
              text: "Any three of: device automatically detected / drivers installed (plug and play); standardised / universal connection; connector cannot be inserted the wrong way / backwards compatible; supplies power to the device; supports multiple high-speed data transfer rates; automatic re-transmission if an error is detected",
              marks: 3,
              match: {
                type: "keywords",
                groups: [
                  ["automatically detected","automatically recognised","automatically recognized","plug and play","plug-and-play","drivers installed","driver installed","auto detect"],
                  ["standard","universal","same connector","same port","common connection","widely used"],
                  ["wrong way","either way","any way up","backwards compatible","backward compatible","reversible","cannot be inserted incorrectly"],
                  ["power","charge","charging"],
                  ["high-speed","high speed","data transfer rate","transfer rates","speeds"],
                  ["re-transmi","retransmi","resend","re-send","error detect"]
                ],
                needCount: 3,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "Any three of: the device is automatically detected and its drivers installed (plug and play); USB is a standard/universal connection; the connector cannot easily be inserted incorrectly and newer ports are backwards compatible; USB can supply power to the device; it supports several high-speed data transfer rates; the USB protocol automatically requests re-transmission if an error is detected. (Writing just “it is fast” earns no marks.)"
        },
        {
          id: "Q5", syl: ["2.1.3"], marks: 1, difficulty: "easy",
          topic: "USB Interface",
          prompt: "State one drawback of using a USB connection.",
          markPoints: [
            { text: "Any one of: maximum cable length is limited (e.g. about 5 m) without hubs; slower than internal connections / fibre optics; very early USB standards may not be supported by modern systems", marks: 1, match: { type: "keywords", groups: [["length","distance","5 m","5m","metres","meters","short"],["slower","slow","internal","fibre","fiber","pcie"],["early","old","older","usb 1","not supported","compatib"]], needCount: 1 } }
          ],
          explanation: "Drawbacks include: the maximum cable length is restricted (about 5 metres) without hubs; the data transfer speed is slower than internal bus connections or fibre optics; and very early USB standards may not be supported by modern systems."
        },
        {
          id: "Q6", syl: ["2.2.4"], marks: 2, difficulty: "easy",
          topic: "Error Detection in Data Transmission",
          prompt: "An Automatic Repeat Request (ARQ) system is used to control errors during data transmission. Identify two operational features used by an ARQ system.",
          markPoints: [
            {
              text: "Any two of: positive acknowledgement (ACK); negative acknowledgement (NACK); timeout",
              marks: 2,
              match: {
                type: "keywords",
                groups: [["positive acknowledg","ack","acknowledg"],["negative acknowledg","nack","error signal"],["timeout","time out","timer","time-out","clock"]],
                needCount: 2,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "ARQ uses a positive acknowledgement (ACK) to say a packet arrived correctly, a negative acknowledgement (NACK) to say it arrived with an error, and a timeout so the sender re-sends if no acknowledgement arrives in time."
        },
        {
          id: "Q7", syl: ["2.2.3"], marks: 2, difficulty: "easy",
          topic: "Check Digits",
          prompt: "A product barcode includes a check digit.\nState the purpose of a check digit, and give one example of where a check digit is used. [2 marks]",
          markPoints: [
            { text: "A check digit is used to detect errors made when data is entered", marks: 1, match: {"type":"keywords","groups":[["detect","check","find","identif","spot","error","mistake","incorrect","wrong"]],"needCount":1} },
            { text: "Example: an ISBN (book number) or a barcode", marks: 1, match: {"type":"keywords","groups":[["isbn","barcode","bar code","book number"]],"needCount":1} }
          ],
          explanation: "A check digit is used to detect errors in data entry. It is used with ISBNs on books and with barcodes on products."
        },
        {
          id: "Q8", syl: ["2.3.1"], marks: 2, difficulty: "easy",
          topic: "Encryption Concepts",
          prompt: "Data sent across public networks can be encrypted to keep it confidential.\nDescribe what happens to the data when it is encrypted. [2 marks]",
          markPoints: [
            { text: "The data is scrambled so that it cannot be understood / read by anyone who intercepts it", marks: 1, match: {"type":"keywords","groups":[["scrambl","unreadable","cannot be read","can't be read","not readable","meaningless","jumbled","cannot understand","can't understand","coded","cipher","cannot be understood"]],"needCount":1} },
            { text: "Only someone with the correct key can turn it back into the original data", marks: 1, match: {"type":"keywords","groups":[["key","decrypt","original","unscramble"]],"needCount":1} }
          ],
          explanation: "Encryption scrambles the data so that it cannot be understood if it is intercepted. Only a person who has the correct key can decrypt it and turn it back into the original data."
        },
        {
          id: "Q9", syl: ["2.3.2"], marks: 1, difficulty: "easy",
          topic: "Encryption Concepts",
          prompt: "State the major security weakness of symmetric encryption when data is sent across an insecure network.",
          markPoints: [
            { text: "The single secret key has to be shared with the recipient (key distribution problem), so it could be intercepted", marks: 1, match: { type: "keywords", groups: [["key distribution","share the key","shared","send the key","sent the key","transmit the key","transmitted","intercept","same key","one key","secret key"]], needCount: 1 } }
          ],
          explanation: "Symmetric encryption uses one secret key for both encrypting and decrypting, so that key must be passed to the recipient. If it is sent over an insecure channel it can be intercepted, and then anyone can decrypt the data (the key distribution problem)."
        },

        // ============== INTERMEDIATE TIER ==============
        {
          id: "Q10", syl: ["2.1.1"], marks: 4, difficulty: "hard",
          topic: "Packet Switching",
          prompt: "Describe the process of packet switching, from the moment data is prepared for transmission on the sending device until it is put back together on the receiving device.",
          markPoints: [
            {
              text: "Any four of: data is broken into small packets; each packet is given a header with the destination IP address and packet number; packets are sent independently; routers inspect the destination IP address of each packet; routers choose the most efficient route for each packet; packets may take different routes and arrive out of order; the receiver uses the packet numbers to reorder them; missing/corrupted packets are re-requested (ARQ)",
              marks: 4,
              match: {
                type: "keywords",
                groups: [
                  ["broken","split","divided","divide","chopped","small packets","into packets"],
                  ["header","destination","ip address","packet number","sequence number"],
                  ["independent","separately","individually","each packet is sent","sent on their own"],
                  ["router","node","inspect","reads the","looks at the"],
                  ["best route","most efficient","fastest route","shortest route","optimal","efficient route","quickest"],
                  ["different route","different path","different ways","out of order","out of sequence","arrive in a different"],
                  ["reorder","re-order","reassembl","re-assembl","put back together","correct order","reconstruct","rebuilt","sequence number","packet number"],
                  ["re-transmi","retransmi","resend","re-send","request","arq","missing","lost"]
                ],
                needCount: 4,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "The data is split into packets. Each packet gets a header (destination IP address, packet number). The packets are sent independently; routers read each packet's destination address and pick the most efficient route, so packets may take different routes and arrive out of order. The receiving device uses the packet numbers to reorder them into the original data, and asks for any missing or corrupted packet to be re-sent."
        },
        {
          id: "Q11", syl: ["2.1.2"], marks: 3, difficulty: "intermediate",
          topic: "Serial, Parallel & Duplex Transmission",
          prompt: "A smart security camera sends HD video to a central server 50 metres away.\nState whether serial or parallel transmission is more suitable, and justify your choice with two reasons.",
          markPoints: [
            { text: "Serial transmission chosen", marks: 1, match: { type: "keywords", groups: [["serial"]], needCount: 1 } },
            {
              text: "Any two of: less signal attenuation / interference over a long distance; less risk of bit skew (bits arriving out of alignment); less risk of crosstalk between wires; cheaper cable / fewer wires",
              marks: 2,
              match: {
                type: "keywords",
                groups: [["attenuation","interference","long distance","distance","signal loss"],["skew","out of alignment","out of sync","arrive at different","not arrive at the same"],["crosstalk","cross talk","cross-talk"],["cheaper","fewer wires","less wires","one wire","single wire","less expensive","cost"]],
                needCount: 2,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "Serial. Over 50 m, serial suffers less signal attenuation/interference, there is no risk of bit skew (bits arriving out of alignment) and little crosstalk because there is only one data wire, and the cable is cheaper because it needs fewer wires."
        },
        {
          id: "Q12", syl: ["2.1.3"], marks: 2, difficulty: "intermediate",
          topic: "USB Interface",
          prompt: "State two benefits of using the universal serial bus (USB) interface to connect a device to a computer. [2 marks]",
          markPoints: [
            { text: "Any two of: a standard connection that can be used for many different devices; it can supply power to the device; data is transferred quickly; the device is recognised easily when it is plugged in", marks: 2, match: {"type":"keywords","groups":[["standard","same connector","one type","universal","many devices","variety of devices","different devices","lots of devices","any device"],["power","charge","charging"],["fast","speed","quick","high data"],["plug and play","automatically","detects","recognis","easy to connect","simple to connect","easy to use"]],"needCount":2,"marksPerGroup":1} }
          ],
          explanation: "Any two of: USB is a standard connection that can be used for many different devices; it can supply power to the device; data can be transferred quickly; and devices are recognised easily when they are plugged in."
        },
        {
          id: "Q13", syl: ["2.2.2"], calc: true, marks: 3, difficulty: "intermediate",
          topic: "Parity Checks",
          prompt: "An even parity check is used during data transmission. A device receives these four bytes:\n  1 0 1 1 0 1 0 0\n  0 1 1 1 1 1 0 1\n  1 1 1 0 0 0 0 0\n  0 0 0 0 0 0 0 0\n(a) Identify the byte in which an error has been detected. [1 mark]\n(b) Explain how you know. [2 marks]",
          markPoints: [
            { text: "(a) The third byte, 1 1 1 0 0 0 0 0", marks: 1, match: { type: "keywords", groups: [["11100000","1 1 1 0 0 0 0 0","third","3rd","byte 3","number 3","c)"]], needCount: 1 } },
            { text: "(b) It contains three 1s — an odd number of 1s", marks: 1, match: { type: "keywords", groups: [["three 1","3 1","three ones","3 ones","odd number","odd amount","odd count","3 ones","three"]], needCount: 1 } },
            { text: "(b) Even parity requires an even number of 1s in every byte (the other three bytes have 4, 6 and 0 ones)", marks: 1, match: { type: "keywords", groups: [["even number","even amount","even count","should be even","must be even","needs to be even","has to be even","other bytes","others","4, 6"]], needCount: 1 } }
          ],
          explanation: "With even parity every byte must contain an even number of 1s. Byte 1 has four 1s, byte 2 has six, byte 4 has none — all even, so no error. Byte 3 (1 1 1 0 0 0 0 0) has three 1s, which is odd, so an error has been detected."
        },
        {
          id: "Q14", syl: ["2.2.2"], marks: 2, difficulty: "intermediate",
          topic: "Parity Checks",
          prompt: "Explain why a standard parity check on a transmitted byte may fail to detect an error.",
          markPoints: [
            {
              text: "Any two of: an even number of bits were changed (e.g. 2 bits flipped); a transposition occurred (bits swapped position); the number of 1s still matches the expected parity, so the byte looks valid despite being corrupted",
              marks: 2,
              match: {
                type: "keywords",
                groups: [["even number","two bits","2 bits","2 bit","two bit","multiple bits","more than one bit","several bits","flipped"],["transpos","swapped","swap","changed places","switched position","moved"],["still","same number","remains","same parity","looks valid","appears correct","matches","still even","still odd","same total"]],
                needCount: 2,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "Parity only counts the 1s. If an even number of bits flip (e.g. two), or bits swap places, the total number of 1s still has the expected parity, so the corrupted byte passes the check."
        },
        {
          id: "Q15", syl: ["2.2.2"], marks: 2, difficulty: "intermediate",
          topic: "Parity Checks",
          prompt: "A parity block check is used. Describe how the receiving system locates a corrupted bit.",
          markPoints: [
            { text: "Parity is checked for every row (byte) and for every column (bit position)", marks: 1, match: { type: "keywords", groups: [["row","byte"],["column","bit position","vertical"]], needCount: 2 } },
            { text: "The corrupted bit is at the intersection of the row and the column that have the wrong parity", marks: 1, match: { type: "keywords", groups: [["intersection","where they meet","where the row and column","cross","meet","both"]], needCount: 1 } }
          ],
          explanation: "The receiver recalculates the parity of each row (byte) and each column (bit position). The one row and the one column that fail the check cross at the corrupted bit — its intersection."
        },
        {
          id: "Q16", syl: ["2.2.2"], marks: 3, difficulty: "intermediate",
          topic: "Checksums",
          prompt: "Describe how a checksum is used to detect errors during data transmission.",
          markPoints: [
            {
              text: "Any three of: the sender calculates a checksum from the data using an agreed algorithm; the checksum is sent with the data; the receiver recalculates it from the received data using the same algorithm; the two checksums are compared; if they match there is no error, if they differ an error has been detected",
              marks: 3,
              match: {
                type: "keywords",
                groups: [
                  ["sender calculates","calculated by the sender","calculated from the data","calculate a checksum","calculated using","algorithm","calculation"],
                  ["sent with","sent along","transmitted with","transmitted along","trailer","together with","attached","included with"],
                  ["receiver","receiving device","recalculat","re-calculat","calculated again","calculates it again","calculates again"],
                  ["compare","comparison","match","same"],
                  ["different","do not match","don't match","doesn't match","does not match","not the same","error is detected","error detected"]
                ],
                needCount: 3,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "The sender calculates a checksum from the block of data using an agreed algorithm and sends it with the data (in the trailer). The receiver recalculates the checksum from the data it received and compares it with the one received. If they match, no error is assumed; if they differ, an error has been detected."
        },
        {
          id: "Q17", syl: ["2.2.2"], marks: 2, difficulty: "intermediate",
          topic: "Echo Check",
          prompt: "Explain why an echo check is not a completely reliable method of error detection.",
          markPoints: [
            {
              text: "Any two of: if the copies differ it is impossible to tell whether the error happened on the way there or on the way back; if the error was only on the return trip the data was received correctly, so re-sending is unnecessary; every block is transmitted twice (double the bandwidth)",
              marks: 2,
              match: {
                type: "keywords",
                groups: [["way back","return","on the way there","original transmission","impossible to know","cannot tell","can't tell","not know where","don't know where","which"],["unnecessary","already correct","received correctly","received correct","correct data","needlessly","not needed"],["twice","double","bandwidth","two times","2 times","more data"]],
                needCount: 2,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "In an echo check the receiver sends the data back and the sender compares it with the original. If they differ, the sender cannot tell whether the error occurred on the way there or on the way back. If it only happened on the return trip, the original data was fine and re-sending is wasted effort. Every block also has to be transmitted twice, using double the bandwidth."
        },
        {
          id: "Q18", syl: ["2.2.2","2.2.3"], marks: 2, difficulty: "intermediate",
          topic: "Check Digits",
          prompt: "Explain the difference between error detection during data transmission and a check digit check.",
          markPoints: [
            { text: "Transmission error detection (parity, checksum, etc.) finds bits corrupted by noise / interference while data travels across a network", marks: 1, match: { type: "keywords", groups: [["transmi","network","interference","noise","corrupt","bits","travel"]], needCount: 1 } },
            { text: "A check digit is a validation check that finds human errors when data is entered manually / scanned", marks: 1, match: { type: "keywords", groups: [["validation","validate","human","manual","typed","typing","entered","entry","scan"]], needCount: 1 } }
          ],
          explanation: "Transmission error detection (parity, checksum, echo check, ARQ) checks whether bits were corrupted by interference while data travelled over a network. A check digit is a validation method that detects human mistakes made when data is entered manually or scanned — it is not used to check network transmission."
        },
        {
          id: "Q19", syl: ["2.3.2"], marks: 3, difficulty: "intermediate",
          topic: "Encryption Concepts",
          prompt: "Describe how symmetric encryption operates. [3 marks]",
          markPoints: [
            { text: "Any three of: the data is scrambled using an encryption algorithm; one secret key is used to do this; the scrambled data is transmitted; the receiver uses the same secret key to decrypt it back into the original data", marks: 3, match: {"type":"keywords","groups":[["algorithm","cipher","scrambl","coded","jumbled"],["one key","single key","secret key","same key","a key","one secret"],["transmitted","sent","send","travels","across the network","encrypted data"],["decrypt","same key","same secret key","original","turn it back","unscramble"]],"needCount":3,"marksPerGroup":1} }
          ],
          explanation: "The data is scrambled by an encryption algorithm using one secret key. The encrypted data is sent across the network, and the receiver uses the same secret key to decrypt it back into the original data."
        },
        {
          id: "Q20", syl: ["2.3.2"], marks: 2, difficulty: "intermediate",
          topic: "Asymmetric Encryption",
          prompt: "An e-commerce website uses asymmetric encryption to protect customers' payment details. State two reasons why asymmetric encryption is more secure than symmetric encryption for online shopping.",
          markPoints: [
            {
              text: "Any two of: no secret key has to be sent across the network (no key distribution risk); the private key is never shared and stays on the server; an intercepted public key cannot be used to decrypt messages",
              marks: 2,
              match: {
                type: "keywords",
                groups: [["no secret key","not sent","not transmitted","no key needs","doesn't need to be sent","does not need to be sent","key distribution","not shared across","no need to share","never sent"],["private key is never","never shared","kept secret","stays on the server","only the server","only the website","not shared","secret on the server"],["public key cannot","public key can't","intercepted public","public key is useless","cannot be used to decrypt","can't be used to decrypt","public key can only encrypt","only encrypt"]],
                needCount: 2,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "With asymmetric encryption no secret key has to travel across the network, so there is no key-distribution risk; the private key is never shared and stays on the server; and an intercepted public key cannot be used to decrypt anything — it can only encrypt."
        },

        // ============== HARD TIER ==============
        {
          id: "Q21", syl: ["2.2.2"], calc: true, marks: 3, difficulty: "hard",
          topic: "Parity Block Check",
          prompt: "A block of data was transmitted using odd parity, with a parity block check. Rows 1–4 are the data bytes (Parity Bit first); the last row is the parity byte used for the columns. One bit was corrupted during transmission.\n\n                  Parity   Bit2  Bit3  Bit4  Bit5  Bit6  Bit7  Bit8\nByte 1:            0         1       1       0       1       0       0       0\nByte 2:            1         0       1       1       0       1       1       0\nByte 3:            1         1       0       0       0       1       1       0\nByte 4:            1         1       0       1       0       0       1       1\nParity Byte:     0         0       1       0       0       1       0       0\n\n(a) Identify the Byte number and the Bit number of the corrupted bit. [2 marks]\n(b) State the correct value that the corrupted bit should be changed to. [1 mark]",
          markPoints: [
            { text: "(a) Byte 3", marks: 1, match: { type: "keywords", groups: [["byte 3","byte3","third byte","3rd byte","byte three"]], needCount: 1 } },
            { text: "(a) Bit 4", marks: 1, match: { type: "keywords", groups: [["bit 4","bit4","fourth bit","4th bit","bit four"]], needCount: 1 } },
            { text: "(b) 1", marks: 1, match: { type: "numeric", values: ["1"] } }
          ],
          explanation: "Check every row and column for ODD parity. Byte 3 (1 1 0 0 0 1 1 0) has four 1s — even, so wrong. Column Bit 4 (0, 1, 0, 1 and parity byte 0) has two 1s — even, so wrong. All other rows and columns are odd. The faulty bit is where Byte 3 and Bit 4 meet. It reads 0 but must be 1 to make both that row and that column odd again."
        },
        {
          id: "Q22", syl: ["2.2.4"], marks: 4, difficulty: "hard",
          topic: "ARQ (Automatic Repeat Request)",
          prompt: "A mobile phone downloads a firmware update across a wireless network, using ARQ for error control. Describe, step by step, how ARQ operates when a data packet is corrupted in transit.",
          markPoints: [
            {
              text: "Any four of: sender transmits the packet and starts a timer (timeout); receiver performs an error check (e.g. checksum / CRC); an error is detected; receiver sends a negative acknowledgement (or sends no positive acknowledgement); sender receives the NACK or the timeout expires before an ACK arrives; sender automatically re-transmits the packet; repeated until the packet arrives error-free or a retry limit is reached",
              marks: 4,
              match: {
                type: "keywords",
                groups: [
                  ["timer","timeout","time out","time-out","clock"],
                  ["error check","checksum","crc","checks the packet","checks the data","error detect","check for errors"],
                  ["error is detected","error detected","detects an error","finds an error","corrupt","error found"],
                  ["negative acknowledg","nack","does not send","doesn't send","no acknowledg","no positive","not send an ack","error signal"],
                  ["expires","runs out","no ack","not received","does not receive","doesn't receive","before an ack","timeout"],
                  ["re-send","resend","re-transmi","retransmi","sends the packet again","send again","sent again","re-sent","resent"],
                  ["until","repeat","again and again","correctly","error-free","error free","limit","maximum"]
                ],
                needCount: 4,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "The sender transmits a packet and starts a timeout timer. The receiver runs an error check (checksum/CRC) on what it received and detects the error. It sends a negative acknowledgement (or simply does not send a positive one). When the sender gets the NACK, or the timer runs out before an ACK arrives, it automatically re-transmits the same packet. This repeats until the packet arrives error-free or a retry limit is reached."
        },
        {
          id: "Q23", syl: ["2.3.2"], marks: 4, difficulty: "hard",
          topic: "Asymmetric Encryption",
          prompt: "An e-commerce website uses asymmetric encryption to secure customer payment transactions. Explain how a public key and a private key work together to send a secure message from a customer to the website's server.",
          markPoints: [
            {
              text: "Any four of: a matching pair of public and private keys is generated; the server makes its public key available / sends it to the customer's browser; the customer's browser encrypts the payment data using the server's public key; the ciphertext is sent to the server; only the server's matching private key (kept secret) can decrypt it",
              marks: 4,
              match: {
                type: "keywords",
                groups: [
                  ["pair","matching","two keys","linked","generated","mathematically"],
                  ["public key is","makes its public key","sends its public key","sends the public key","shares its public key","public key to the","available","given to","gives the public key"],
                  ["encrypts","encrypt","encrypted using the public","using the server's public","using the website's public","with the public key","with the server's public","with the website's public"],
                  ["ciphertext","encrypted data","sent to the server","transmitted to the server","sends it to","sent to the website"],
                  ["private key","only the server","only the website","only the matching","only the private"],
                  ["decrypt"]
                ],
                needCount: 4,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "A matching public/private key pair is created for the server. The server gives its public key to the customer's browser. The browser encrypts the payment data with the server's public key and sends the ciphertext. Only the server's matching private key, which it keeps secret, can decrypt the data. (To send securely to a server you use the server's public key — never your own private key.)"
        }
      ]
    },

    // Source: the teacher-supplied "Cambridge IGCSE Computer Science (0478)
    // -- Topic 3: Hardware" examination, Section 3 (the ten Paper 1
    // exam-style questions). As with datatrans_exam above, each source
    // question is split into its lettered parts so the adaptive engine has
    // a pool of small, individually graded questions across all three
    // tiers. Every question's marks are the verified total of its own
    // markPoints. Departures from the source, where it can't be answered
    // in a text box:
    //   - the touchscreen True/False table (its Q4, six cells) is asked as
    //     three short questions (multi-touch / gloves / why), 6 marks total.
    //   - the inkjet-vs-laser four-row table (its Q6a) is asked as one
    //     "which suits high volume / which suits photos, and why" question.
    //   - the CPU/RAM diagram of its Q1 is described in words.
    hardware_exam: {
      key: "hardware_exam",
      title: "Topic 3: Hardware — IGCSE exam style",
      subtitle: "25 exam-style questions · CPU & FDE cycle, embedded systems, input/output & sensors, storage, network hardware · 69 marks total",
      classes: ["10BR1","10BR2","10BR3"],
      totalMarks: 69,
      questions: [

        // ============== EASY TIER ==============
        {
          id: "Q1", syl: ["3.1.2"], marks: 3, difficulty: "easy",
          topic: "CPU Registers",
          prompt: "The CPU in a Von Neumann computer contains several registers. Name the register described in each case.\n(a) It holds the address in memory that is currently being read from or written to. [1 mark]\n(b) It stores the result of calculations performed by the ALU. [1 mark]\n(c) It holds the actual data or instruction that has been fetched from memory, or is waiting to be written to memory. [1 mark]",
          markPoints: [
            { text: "(a) Memory Address Register (MAR)", marks: 1, match: { type: "keywords", groups: [["memory address register","mar"]], needCount: 1 } },
            { text: "(b) Accumulator (ACC)", marks: 1, match: { type: "keywords", groups: [["accumulator","acc"]], needCount: 1 } },
            { text: "(c) Memory Data Register (MDR)", marks: 1, match: { type: "keywords", groups: [["memory data register","mdr","memory buffer register"]], needCount: 1 } }
          ],
          explanation: "(a) The Memory Address Register (MAR) holds the address being accessed in memory. (b) The Accumulator (ACC) stores the results of ALU calculations. (c) The Memory Data Register (MDR) holds the data or instruction fetched from, or about to be written to, memory."
        },
        {
          id: "Q2", syl: ["3.1.3"], marks: 2, difficulty: "easy",
          topic: "CPU Performance Factors",
          prompt: "Explain how the clock speed of a CPU affects its performance.",
          markPoints: [
            { text: "Clock speed is the number of clock cycles (FDE cycles) the CPU carries out per second", marks: 1, match: { type: "keywords", groups: [["per second","each second","every second","hertz","ghz","cycles"]], needCount: 1 } },
            { text: "A higher clock speed means more instructions are processed per second, so the CPU is faster", marks: 1, match: { type: "keywords", groups: [["more instructions","faster","more cycles","quicker","higher performance","processes more","executes more"]], needCount: 1 } }
          ],
          explanation: "Clock speed is the number of clock cycles (and so FDE cycles) the CPU can carry out each second. A higher clock speed means more instructions can be processed per second, so the CPU performs faster."
        },
        {
          id: "Q3", syl: ["3.1.3"], marks: 2, difficulty: "easy",
          topic: "CPU Performance Factors",
          prompt: "Explain how the cache size of a CPU affects its performance.",
          markPoints: [
            { text: "Cache is very fast memory in or near the CPU that stores frequently used data and instructions", marks: 1, match: { type: "keywords", groups: [["frequently used","most used","often used","commonly used","fast memory","high-speed","high speed","faster than ram","store"]], needCount: 1 } },
            { text: "A larger cache means less need to fetch from the slower RAM, so processing is faster", marks: 1, match: { type: "keywords", groups: [["slower ram","from ram","less time","fewer","reduces the need","quicker access","faster access","faster","speed"]], needCount: 1 } }
          ],
          explanation: "Cache is high-speed memory inside or near the CPU that stores frequently used data and instructions. A larger cache holds more of them, so the CPU has to fetch from the slower RAM less often, which increases processing speed."
        },
        {
          id: "Q4", syl: ["3.1.3"], marks: 2, difficulty: "easy",
          topic: "CPU Performance Factors",
          prompt: "Explain how the number of cores in a CPU affects its performance.",
          markPoints: [
            { text: "A core is an independent processing unit (with its own ALU, CU and registers)", marks: 1, match: { type: "keywords", groups: [["independent","own alu","processing unit","separate","its own","each core","a core is","individual"]], needCount: 1 } },
            { text: "More cores allow several instructions / FDE cycles to be processed at the same time (parallel processing)", marks: 1, match: { type: "keywords", groups: [["same time","simultaneous","at once","parallel","multiple instructions","several instructions","more instructions","multitask"]], needCount: 1 } }
          ],
          explanation: "A core is an independent processing unit containing its own ALU, control unit and registers. With more cores, several instructions (FDE cycles) can be processed at the same time, which speeds up work that can be run in parallel."
        },
        {
          id: "Q5", syl: ["3.1.5"], marks: 2, difficulty: "easy",
          topic: "Embedded Systems",
          prompt: "Define the term embedded system.",
          markPoints: [
            { text: "A combination of hardware and software designed to perform a dedicated / specific function", marks: 1, match: { type: "keywords", groups: [["dedicated","specific function","one function","single function","particular function","specific task","one task","single task","specific purpose"]], needCount: 1 } },
            { text: "Built into a larger mechanical or electrical device / system", marks: 1, match: { type: "keywords", groups: [["built into","built in","part of a larger","inside a","within a","larger system","larger device","embedded in","inside another","part of another"]], needCount: 1 } }
          ],
          explanation: "An embedded system is a combination of hardware and software designed to carry out a dedicated, specific function, and which is built into a larger mechanical or electrical device (for example a washing machine or a car)."
        },
        {
          id: "Q6", syl: ["3.1.5"], marks: 2, difficulty: "easy",
          topic: "Embedded Systems",
          prompt: "Identify two domestic appliances (devices found in a home) that contain an embedded system.",
          markPoints: [
            {
              text: "Any two of: washing machine; microwave oven; dishwasher; smart TV; central heating thermostat; robot vacuum cleaner; fridge; digital camera; alarm clock",
              marks: 2,
              match: {
                type: "keywords",
                groups: [["washing machine","washer"],["microwave"],["dishwasher"],["smart tv","television","tv"],["thermostat","central heating","heating"],["vacuum","hoover","robot"],["fridge","refrigerator","freezer"],["oven","cooker","kettle","toaster","air fryer","coffee machine"]],
                needCount: 2,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "Any two domestic appliances with a dedicated microprocessor, for example a washing machine, microwave oven, dishwasher, smart TV, central heating thermostat or robot vacuum cleaner."
        },
        {
          id: "Q7", syl: ["3.2.3"], marks: 3, difficulty: "easy",
          topic: "Sensors & Control Systems",
          prompt: "A smart aquarium system monitors the water conditions for tropical fish. Identify three different sensors that could be used to monitor the aquarium.",
          markPoints: [
            {
              text: "Any three of: temperature sensor; pH sensor; level sensor; light sensor; flow sensor; moisture / water-clarity sensor (a generic 'water sensor' is not accepted)",
              marks: 3,
              match: {
                type: "keywords",
                groups: [["temperature","thermometer","thermistor"],["ph"],["level"],["light"],["flow"],["moisture","clarity","turbidity"]],
                needCount: 3,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "Suitable sensors include a temperature sensor, a pH sensor, a level sensor, a light sensor, a flow sensor and a moisture / water-clarity sensor. A vague 'water sensor' is not specific enough."
        },
        {
          id: "Q8", syl: ["3.3.4"], marks: 1, difficulty: "easy",
          topic: "Virtual Memory",
          prompt: "State what is meant by virtual memory.",
          markPoints: [
            { text: "Part of secondary storage (e.g. the hard drive or SSD) used as an extension of RAM, with pages of data transferred between RAM and virtual memory when needed", marks: 1, match: {"type":"keywords","groups":[["secondary","hard drive","hard disk","hdd","ssd","storage"],["ram","pages","swap","extension","extra memory","transfer","when ram is full"]],"needCount":2} }
          ],
          explanation: "Virtual memory is part of secondary storage that is used as an extension of RAM. Pages of data are transferred between RAM and virtual memory when they are needed, for example when RAM is full."
        },
        {
          id: "Q9", syl: ["3.3.3"], marks: 3, difficulty: "easy",
          topic: "Secondary Storage",
          prompt: "Secondary storage devices are classified as magnetic, optical or solid-state. State the category of each of the following.\n(a) Hard disk drive (HDD) [1 mark]\n(b) Blu-ray disc [1 mark]\n(c) SD card [1 mark]",
          markPoints: [
            { text: "(a) Magnetic", marks: 1, match: { type: "keywords", groups: [["magnetic"]], needCount: 1 } },
            { text: "(b) Optical", marks: 1, match: { type: "keywords", groups: [["optical"]], needCount: 1 } },
            { text: "(c) Solid-state (flash memory)", marks: 1, match: { type: "keywords", groups: [["solid-state","solid state","flash","ssd"]], needCount: 1 } }
          ],
          explanation: "(a) A hard disk drive is magnetic storage. (b) A Blu-ray disc is optical storage. (c) An SD card is solid-state (flash memory) storage."
        },
        {
          id: "Q10", syl: ["3.3.5"], marks: 2, difficulty: "easy",
          topic: "Cloud Storage",
          prompt: "Define the term cloud storage.",
          markPoints: [
            { text: "Data is stored remotely on physical servers owned and managed by a third-party hosting company", marks: 1, match: { type: "keywords", groups: [["remote","off-site","offsite","servers","third party","third-party","hosting company","provider","data centre","data center"]], needCount: 1 } },
            { text: "It is accessed over the Internet / a network connection", marks: 1, match: { type: "keywords", groups: [["internet","online","network","web","connection"]], needCount: 1 } }
          ],
          explanation: "Cloud storage keeps data remotely on physical servers that are owned and managed by a third-party hosting company, and the data is accessed through the Internet."
        },
        {
          id: "Q11", syl: ["3.4.2"], marks: 3, difficulty: "easy",
          topic: "MAC & IP Addresses",
          prompt: "State three characteristics of a MAC address.",
          markPoints: [
            {
              text: "Any three of: assigned to the NIC by the manufacturer; static / permanent (cannot be changed); six pairs of hexadecimal digits (48 bits); first half is the manufacturer code and second half the device serial number; identifies a specific device on a LAN",
              marks: 3,
              match: {
                type: "keywords",
                groups: [["manufactur","factory","nic","network interface card","network card","built in","burned"],["static","permanent","cannot be changed","does not change","doesn't change","fixed","unique"],["hexadecimal","hex","48 bit","48-bit","six pairs","6 pairs","six groups","6 groups"],["serial number","manufacturer code","oui","first three","first half","first 3","last three","last 3","second half"],["identif","physical device","local network","lan","specific device"]],
                needCount: 3,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "A MAC address is assigned to the network interface card (NIC) at manufacture; it is static (permanent); it is written as six pairs of hexadecimal digits (48 bits); the first three bytes are the manufacturer code and the last three are the device serial number; and it identifies a specific physical device on a local network."
        },

        // ============== INTERMEDIATE TIER ==============
        {
          id: "Q12", syl: ["3.1.3"], marks: 2, difficulty: "intermediate",
          topic: "CPU Performance Factors",
          prompt: "A student compares two computers for video editing.\nComputer A: quad-core 2.8 GHz CPU with 8 MiB of cache.\nComputer B: dual-core 3.6 GHz CPU with 2 MiB of cache.\nState which computer is likely to give the better performance for video editing, and justify your answer. [2 marks]",
          markPoints: [
            { text: "Computer A", marks: 1, match: {"type":"keywords","groups":[["computer a","a)","quad","answer a","computer a."]],"needCount":1} },
            { text: "It has four cores (quad-core) compared with two, so more instructions can be processed at the same time / it has a larger cache", marks: 1, match: {"type":"keywords","groups":[["4 core","four core","quad","more cores","4 cores","four cores","larger cache","bigger cache","more cache","8 mib"],["same time","simultaneous","parallel","at once","more tasks","more instructions","faster access","quicker access","more data"]],"needCount":2} }
          ],
          explanation: "Computer A. It has four cores compared with two, so more instructions can be processed at the same time, and its larger cache lets the CPU reach frequently used data more quickly. Computer B has a faster clock, but the extra cores and cache are likely to matter more for video editing."
        },
        {
          id: "Q13", syl: ["3.1.5"], marks: 3, difficulty: "intermediate",
          topic: "Embedded Systems",
          prompt: "An automated espresso machine contains an embedded system that controls the water heating, the pump and the bean grinding.\n(a) State what is meant by an embedded system. [2 marks]\n(b) State one other device that contains an embedded system. [1 mark]",
          markPoints: [
            { text: "(a) It performs a dedicated (single / specific) function", marks: 1, match: {"type":"keywords","groups":[["dedicated","single purpose","one purpose","single function","one function","specific function","specific task","one task","particular function","particular task"]],"needCount":1} },
            { text: "(a) It is built into a device, unlike a general purpose computer that performs many different functions", marks: 1, match: {"type":"keywords","groups":[["built into","part of","inside","within","controls the","not a general","general purpose","many different functions","only one","just one"]],"needCount":1} },
            { text: "(b) e.g. a domestic appliance, car, security system, lighting system or vending machine", marks: 1, match: {"type":"keywords","groups":[["washing machine","domestic appliance","appliance","car","security system","lighting system","vending machine","microwave","fridge","dishwasher","central heating","alarm","traffic light","air conditioner","thermostat","television","tv"]],"needCount":1} }
          ],
          explanation: "(a) An embedded system is used to perform a dedicated function inside a device, which makes it different from a general purpose computer such as a PC or laptop that performs many different functions. (b) Examples: domestic appliances, cars, security systems, lighting systems and vending machines."
        },
        {
          id: "Q14", syl: ["3.2.1"], marks: 2, difficulty: "easy",
          topic: "Touchscreens",
          prompt: "A touch screen is an input device.\nName two types of touch screen. [2 marks]",
          markPoints: [
            { text: "Any two of: resistive; capacitive; infra-red", marks: 2, match: {"type":"keywords","groups":[["resistive"],["capacitive"],["infra-red","infrared","infra red"]],"needCount":2,"marksPerGroup":1} }
          ],
          explanation: "The three types of touch screen are resistive, capacitive and infra-red. Any two are correct."
        },
        {
          id: "Q15", syl: ["3.2.1","3.2.2"], marks: 4, difficulty: "intermediate",
          topic: "Input & Output Devices",
          prompt: "A self-service ticket machine has a touch screen, a barcode scanner and a speaker.\n(a) State which TWO of these three devices are input devices. [2 marks]\n(b) State what is meant by an input device. [2 marks]",
          markPoints: [
            { text: "(a) Touch screen", marks: 1, match: {"type":"keywords","groups":[["touch screen","touchscreen","touch-screen"]],"needCount":1} },
            { text: "(a) Barcode scanner", marks: 1, match: {"type":"keywords","groups":[["barcode","bar code","scanner"]],"needCount":1} },
            { text: "(b) A device that is used to enter data / instructions into a computer", marks: 1, match: {"type":"keywords","groups":[["enter","send","put","feed","give","provide","supply"],["data","instruction","information","commands","signals"]],"needCount":2} },
            { text: "(b) so that the computer can process (or store) the data", marks: 1, match: {"type":"keywords","groups":[["process","processed","processing","use","used","store","act on","respond"]],"needCount":1} }
          ],
          explanation: "(a) The touch screen and the barcode scanner are input devices; the speaker is an output device. (b) An input device is used to enter data or instructions into a computer so that the computer can process them."
        },
        {
          id: "Q16", syl: ["3.2.3"], marks: 4, difficulty: "intermediate",
          topic: "Sensors",
          prompt: "State the most suitable sensor for each of these uses. Give your answers as (i), (ii), (iii) and (iv). [4 marks]\n(i) Switching on a light when a person walks into a room\n(ii) Monitoring how full a water tank is\n(iii) Checking the acidity of the water in a fish tank\n(iv) Detecting a leak of cooking gas in a kitchen",
          markPoints: [
            { text: "(i) Infra-red (or proximity) sensor", marks: 1, match: {"type":"keywords","groups":[["infra-red","infrared","infra red","proximity","motion"]],"needCount":1} },
            { text: "(ii) Level sensor", marks: 1, match: {"type":"keywords","groups":[["level"]],"needCount":1} },
            { text: "(iii) pH sensor", marks: 1, match: {"type":"keywords","groups":[["ph sensor","(iii) ph","(iii)ph","iii) ph","iii. ph","iii ph","iii: ph","iii- ph","acidity sensor","ph probe"]],"needCount":1} },
            { text: "(iv) Gas sensor", marks: 1, match: {"type":"keywords","groups":[["gas"]],"needCount":1} }
          ],
          explanation: "(i) An infra-red (or proximity) sensor detects a person. (ii) A level sensor measures how full a tank is. (iii) A pH sensor measures acidity. (iv) A gas sensor detects a gas leak."
        },
        {
          id: "Q17", syl: ["3.2.2"], marks: 3, difficulty: "intermediate",
          topic: "Output Devices",
          prompt: "(a) State what is meant by an output device. [1 mark]\n(b) A 3D printer is an output device. State two other output devices. [2 marks]",
          markPoints: [
            { text: "(a) A device that receives data from a computer and presents the result to the user", marks: 1, match: {"type":"keywords","groups":[["from the computer","from a computer","computer sends","receives data","receives","presents","displays","shows","produces","results","information to the user","to the user","gives out"]],"needCount":1} },
            { text: "(b) Any two of: actuator; DLP projector; inkjet printer; laser printer; LED screen; LCD projector; LCD screen; speaker", marks: 2, match: {"type":"keywords","groups":[["actuator"],["dlp","projector"],["inkjet","ink jet"],["laser printer","laser"],["led"],["lcd"],["speaker"]],"needCount":2,"marksPerGroup":1} }
          ],
          explanation: "(a) An output device receives data from a computer and presents the result to the user, for example as a picture, a printout or a sound. (b) Any two of: actuator, DLP projector, inkjet printer, laser printer, LED screen, LCD projector, LCD screen, speaker."
        },
        {
          id: "Q18", syl: ["3.3.1"], marks: 3, difficulty: "intermediate",
          topic: "Primary Storage",
          prompt: "State three differences between RAM and ROM. [3 marks]",
          markPoints: [
            { text: "Any three of: RAM loses its contents when the power is off, ROM keeps its contents; RAM can be read from and written to, ROM is read-only; RAM holds the programs and data currently in use, ROM holds the start-up instructions (bootloader)", marks: 3, match: {"type":"keywords","groups":[["volatile","lost when","loses","power off","power is off","switched off","keeps","retains","permanent","even when"],["read only","read-only","read/write","read and write","can be written","cannot be written","can't be written","can be changed","cannot be changed"],["in use","currently","running","being used","start-up","startup","boot","firmware"]],"needCount":3,"marksPerGroup":1} }
          ],
          explanation: "RAM loses its contents when the power is off whereas ROM keeps its contents; RAM can be read and written to whereas ROM is read-only; and RAM holds the programs and data currently in use whereas ROM holds the start-up instructions (the bootloader)."
        },
        {
          id: "Q19", syl: ["3.3.4"], marks: 3, difficulty: "intermediate",
          topic: "Virtual Memory",
          prompt: "Explain why a computer needs virtual memory when it is running several large software applications.",
          markPoints: [
            {
              text: "Any three of: virtual memory is created on secondary storage (HDD / SSD) when RAM is full; it prevents out-of-memory errors / crashes; inactive pages are moved from RAM to virtual memory (swap space); pages are moved back to RAM when the CPU needs them",
              marks: 3,
              match: {
                type: "keywords",
                groups: [["secondary storage","hard disk","hard drive","hdd","ssd","disk","swap space"],["full","runs out","run out","not enough","exhausted","insufficient"],["crash","out of memory","out-of-memory","error","freeze"],["inactive","not in use","idle","not needed","moved","swapped","paged","pages"],["back to ram","returned","transferred back","moved back","brought back","when needed"]],
                needCount: 3,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "When RAM is full, the operating system uses part of secondary storage (HDD/SSD) as virtual memory. Inactive pages are moved out of RAM into this swap space, which stops the system running out of memory and crashing, and they are moved back into RAM when the CPU needs them."
        },
        {
          id: "Q20", syl: ["3.3.6"], marks: 4, difficulty: "hard",
          topic: "Cloud Storage",
          prompt: "A graphic design agency is considering moving its project files from local server hard drives to cloud storage. Give two advantages and two disadvantages of cloud storage compared with local storage.",
          markPoints: [
            {
              text: "Any two advantages: access from any device / location with Internet; off-site backup / disaster recovery; capacity easily scaled up; real-time collaboration",
              marks: 2,
              match: {
                type: "keywords",
                groups: [["any device","anywhere","any location","from home","remotely","remote access","accessed from","access from","accessible"],["backup","disaster","off-site","offsite","recover"],["scale","scalable","capacity","expand","more storage","buy extra","upgrade"],["collaborat","share","together","real-time","real time"]],
                needCount: 2,
                marksPerGroup: 1
              }
            },
            {
              text: "Any two disadvantages: needs a stable, fast Internet connection; slow transfer of large files over weak connections; security / privacy depends on the provider; ongoing subscription costs",
              marks: 2,
              match: {
                type: "keywords",
                groups: [["internet","connection","wifi","wi-fi","online","offline","broadband"],["slow","large file","big file","upload","download","speed","bandwidth"],["security","privacy","hack","breach","cyber","third party","third-party","provider","trust"],["subscription","cost","expensive","fee","pay","price","monthly"]],
                needCount: 2,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "Advantages: files can be reached from any device or location with an Internet connection; automatic off-site backup and disaster recovery; capacity can be scaled up without buying hardware; designers can collaborate in real time. Disadvantages: a stable, fast Internet connection is needed; large files transfer slowly on weak connections; security and privacy depend on the provider's safeguards; subscription costs continue over time."
        },
        {
          id: "Q21", syl: ["3.4.3"], marks: 2, difficulty: "intermediate",
          topic: "MAC & IP Addresses",
          prompt: "Differentiate between a static IP address and a dynamic IP address.",
          markPoints: [
            { text: "Static: permanently assigned to a device and does not change when it reconnects", marks: 1, match: { type: "keywords", groups: [["permanent","does not change","doesn't change","never changes","fixed","stays the same","same every time","manually"]], needCount: 1 } },
            { text: "Dynamic: temporarily assigned (by a DHCP server) and can change each time the device connects", marks: 1, match: { type: "keywords", groups: [["dhcp","temporar","changes","different each time","each time","every time","reconnect","lease"]], needCount: 1 } }
          ],
          explanation: "A static IP address is permanently assigned to a device and stays the same every time it connects. A dynamic IP address is assigned temporarily by a DHCP server and can be different each time the device connects to the network."
        },
        {
          id: "Q22", syl: ["3.4.4"], marks: 2, difficulty: "intermediate",
          topic: "Network Hardware",
          prompt: "Describe two functions performed by a router on a network.",
          markPoints: [
            {
              text: "Any two of: inspects the destination IP address in packet headers; routes packets between different networks (e.g. LAN to WAN / Internet); selects the most efficient route using routing tables; assigns dynamic IP addresses to devices on the local network (DHCP)",
              marks: 2,
              match: {
                type: "keywords",
                groups: [["destination","ip address in","header","reads the ip","inspects","looks at the ip"],["between networks","different networks","lan to","wan","internet","connects"],["efficient","best route","best path","shortest","fastest","routing table","optimal","route"],["assign","allocate","gives out","dhcp","dynamic ip"]],
                needCount: 2,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "A router reads the destination IP address in each packet's header, forwards packets between different networks (for example from a LAN to the Internet), chooses the most efficient route using routing tables, and can assign dynamic IP addresses to devices on the local network using DHCP."
        },

        // ============== HARD TIER ==============
        {
          id: "Q23", syl: ["3.1.2"], marks: 4, difficulty: "hard",
          topic: "FDE Cycle",
          prompt: "Describe the step-by-step process of the FETCH stage of the Fetch-Decode-Execute cycle, referring to the registers and buses involved. [4 marks]",
          markPoints: [
            { text: "Any four of: the address of the next instruction is copied from the PC to the MAR; the address is sent from the MAR along the address bus to RAM; the instruction at that address is fetched along the data bus; the instruction is stored in the MDR; the instruction is copied from the MDR to the CIR", marks: 4, match: {"type":"keywords","groups":[["pc to the mar","pc to mar","program counter to the mar","program counter to mar","copied from the pc","copied from the program counter","pc is copied","address in the pc","from the pc"],["address bus"],["data bus"],["mdr","memory data register"],["cir","current instruction register"]],"needCount":4,"marksPerGroup":1} }
          ],
          explanation: "The address in the Program Counter (PC) is copied to the Memory Address Register (MAR). The address is sent from the MAR along the address bus to RAM, and the instruction at that address is fetched along the data bus into the Memory Data Register (MDR). The instruction is then copied from the MDR to the Current Instruction Register (CIR)."
        },
        {
          id: "Q24", syl: ["3.2.3"], marks: 4, difficulty: "hard",
          topic: "Sensors & Control Systems",
          prompt: "A smart aquarium keeps the water at a constant 25 °C. Describe how the microprocessor uses data from a temperature sensor to maintain this temperature. [4 marks]",
          markPoints: [
            { text: "Any four of: the sensor continuously reads the temperature; it sends the data to the microprocessor; the microprocessor compares the value with the stored (preset) value of 25 °C; if it is below 25 °C it signals the actuator to switch the heater on; if it is at or above 25 °C it signals the heater to switch off; this repeats continuously", marks: 4, match: {"type":"keywords","groups":[["reads","measures","detects","senses","continuously"],["sends","passes","transmits","signal","data to the microprocessor"],["compare","compares","comparison","checks it against","checked against"],["stored","preset","pre-set","target","threshold","25"],["below","lower than","less than","too cold","too low","heater on","switch on","switches on","turns on","turn on"],["above","higher than","too hot","too high","heater off","switch off","switches off","turns off","turn off"],["repeat","continuous","loop","constantly","again"]],"needCount":4,"marksPerGroup":1} }
          ],
          explanation: "The temperature sensor continuously reads the water temperature and sends the data to the microprocessor. The microprocessor compares it with the stored value (25 °C). If it is below 25 °C it signals the actuator to switch the heater on; if it is at or above 25 °C it switches the heater off. This repeats continuously. (The sensor only reads data; it never decides or controls anything.)"
        },
        {
          id: "Q25", syl: ["3.3.3"], marks: 4, difficulty: "hard",
          topic: "Solid-State Storage",
          prompt: "Describe solid-state (flash memory) storage. Include the technology it uses and give two examples of solid-state storage. [4 marks]",
          markPoints: [
            { text: "It uses NAND or NOR technology", marks: 1, match: {"type":"keywords","groups":[["nand","nor"]],"needCount":1} },
            { text: "Transistors are used as control gates and floating gates", marks: 1, match: {"type":"keywords","groups":[["transistor","control gate","floating gate","gates"]],"needCount":1} },
            { text: "Any two examples: SSD (solid-state drive), SD card, USB drive (memory stick / flash drive)", marks: 2, match: {"type":"keywords","groups":[["ssd","solid-state drive","solid state drive"],["sd card"],["usb","memory stick","flash drive","pen drive"]],"needCount":2,"marksPerGroup":1} }
          ],
          explanation: "Solid-state (flash memory) storage uses NAND or NOR technology, where transistors are used as control gates and floating gates. Examples are a solid-state drive (SSD), an SD card and a USB drive."
        }
      ]
    },

    // Source: the teacher-supplied "Cambridge IGCSE Computer Science (0478)
    // -- Topic 4: Software" examination, Section 3 (the ten Paper 1
    // exam-style questions). As with datatrans_exam / hardware_exam above,
    // each source question is split into its lettered parts so the adaptive
    // engine has a pool of small, individually graded questions across all
    // three tiers. Every question's marks are the verified total of its own
    // markPoints. Departures from the source, where it can't be answered in
    // a text box: the six-row Compiler/Interpreter table (its Q6) is asked
    // as three short comparison questions (2 marks each, 6 total), and the
    // two-row utility-software table is asked as one question.
    software_exam: {
      key: "software_exam",
      title: "Topic 4: Software — IGCSE exam style",
      subtitle: "24 exam-style questions · System & application software, operating systems, interrupts, languages, translators, IDEs · 53 marks total",
      classes: ["10BR1","10BR2","10BR3"],
      totalMarks: 53,
      questions: [

        // ============== EASY TIER ==============
        {
          id: "Q1", syl: ["4.1.1"], marks: 2, difficulty: "easy",
          topic: "System vs Application Software",
          prompt: "Define the term system software, and give one example of it.",
          markPoints: [
            { text: "Programs that manage / control / maintain the computer's hardware, and provide a platform for application software to run", marks: 1, match: { type: "keywords", groups: [["manage","control","maintain","platform","run application","hardware","operate the computer","runs the computer"]], needCount: 1 } },
            { text: "Example: operating system // device driver // compiler // utility software (antivirus, disk defragmenter)", marks: 1, match: { type: "keywords", groups: [["operating system","windows","linux","macos","android","ios","driver","compiler","antivirus","defrag","utility","linker","interpreter","assembler"]], needCount: 1 } }
          ],
          explanation: "System software is the set of programs that manage and control the computer's hardware and provide a platform for application software to run. Examples: an operating system (Windows, Linux, macOS), device drivers, compilers, and utility software such as antivirus or a disk defragmenter."
        },
        {
          id: "Q2", syl: ["4.1.1"], marks: 2, difficulty: "easy",
          topic: "System vs Application Software",
          prompt: "Define the term application software, and give one example of it.",
          markPoints: [
            { text: "Programs that let the user perform specific (user-oriented) tasks", marks: 1, match: { type: "keywords", groups: [["specific task","specific tasks","user task","tasks for the user","perform tasks","allows the user","allow the user","users to do","end user","end-user","user-oriented","particular task","do a task","carry out"]], needCount: 1 } },
            { text: "Example: word processor // spreadsheet // web browser // database management system // graphics editor", marks: 1, match: { type: "keywords", groups: [["word processor","word","spreadsheet","excel","browser","chrome","database","dbms","graphics","photoshop","cad","audio editor","presentation","powerpoint","email","game","paint"]], needCount: 1 } }
          ],
          explanation: "Application software is a program that lets the user carry out a specific, user-oriented task. Examples: a word processor, spreadsheet, web browser, database management system or graphics editor."
        },
        {
          id: "Q3", syl: ["4.1.2"], marks: 2, difficulty: "easy",
          topic: "Operating Systems",
          prompt: "State two functions of an operating system.",
          markPoints: [
            { text: "Any two of: managing files; handling interrupts; providing an interface; managing peripherals and drivers; managing memory; managing multitasking; providing a platform for running applications; providing system security; managing user accounts", marks: 2, match: {"type":"keywords","groups":[["file","files"],["interrupt"],["interface","gui","command line"],["peripheral","driver"],["memory","ram"],["multitask","multi-task","several programs","more than one program"],["platform","run application","running application","run programs","runs programs"],["security","password","virus","malware","firewall"],["user account","accounts","log in","login","log-in"]],"needCount":2,"marksPerGroup":1} }
          ],
          explanation: "Any two of: managing files, handling interrupts, providing an interface, managing peripherals and drivers, managing memory, managing multitasking, providing a platform for running applications, providing system security, managing user accounts."
        },
        {
          id: "Q4", syl: ["4.1.4"], marks: 2, difficulty: "easy",
          topic: "Interrupts",
          prompt: "Define the term hardware interrupt, and give one example.",
          markPoints: [
            { text: "A signal generated by a physical hardware component to request the CPU's attention", marks: 1, match: { type: "keywords", groups: [["signal","hardware","device","component","request","attention","asks the cpu"]], needCount: 2 } },
            { text: "Example: printer out of paper // mouse movement // keyboard key press // hard drive error", marks: 1, match: { type: "keywords", groups: [["printer","paper","mouse","keyboard","key press","keypress","key being pressed","hard drive","disk error","button"]], needCount: 1 } }
          ],
          explanation: "A hardware interrupt is a signal produced by a physical hardware device (for example a keyboard, mouse or printer) to request the CPU's attention. Examples: a printer running out of paper, a key being pressed, a mouse movement or a hard drive error."
        },
        {
          id: "Q5", syl: ["4.1.4"], marks: 2, difficulty: "easy",
          topic: "Interrupts",
          prompt: "Define the term software interrupt, and give one example.",
          markPoints: [
            { text: "A signal generated by a running program / operating-system routine to request the CPU's attention", marks: 1, match: { type: "keywords", groups: [["software","program","code","routine","operating system","signal","request","attention"]], needCount: 2 } },
            { text: "Example: division by zero // array index out of bounds // stack overflow // system call request", marks: 1, match: { type: "keywords", groups: [["division by zero","divide by zero","divided by zero","out of bounds","stack overflow","system call","overflow","invalid instruction","illegal"]], needCount: 1 } }
          ],
          explanation: "A software interrupt is generated by a running program or operating-system routine, for example when a program attempts a division by zero, an array index goes out of bounds, the stack overflows, or the program makes a system call."
        },
        {
          id: "Q6", syl: ["4.2.2"], marks: 1, difficulty: "easy",
          topic: "Assembly Language",
          prompt: "Name the translator used to convert assembly language code into binary machine code.",
          markPoints: [
            { text: "Assembler", marks: 1, match: { type: "keywords", groups: [["assembler"]], needCount: 1 } }
          ],
          explanation: "An assembler converts assembly language mnemonics into machine code."
        },
        {
          id: "Q7", syl: ["4.2.2"], marks: 2, difficulty: "easy",
          topic: "Assembly Language",
          prompt: "Look at this line of assembly language:\n02  ADD  Num2\n(a) State what is meant by a mnemonic. [1 mark]\n(b) State one reason why assembly language uses mnemonics instead of binary machine code. [1 mark]",
          markPoints: [
            { text: "(a) A short word or abbreviation (code) that represents an instruction, e.g. ADD", marks: 1, match: {"type":"keywords","groups":[["short","abbreviat","word","code","symbol","name","represent","stands for","instruction"]],"needCount":1} },
            { text: "(b) Mnemonics are easier for humans to read, understand and remember than binary", marks: 1, match: {"type":"keywords","groups":[["easier","easy","readab","remember","understand","human","simpler","simple","memorable"]],"needCount":1} }
          ],
          explanation: "(a) A mnemonic is a short word or abbreviation that represents an instruction, such as ADD. (b) Mnemonics are easier for people to read, understand and remember than strings of 0s and 1s. An assembler is then needed to translate them into machine code."
        },
        {
          id: "Q8", syl: ["4.2.5"], marks: 2, difficulty: "easy",
          topic: "IDEs",
          prompt: "State two functions of an integrated development environment (IDE) that help a programmer to write program code. [2 marks]",
          markPoints: [
            { text: "Any two of: code editor; run-time environment; translators; error diagnostics; auto-completion; auto-correction; prettyprint", marks: 2, match: {"type":"keywords","groups":[["code editor","editor"],["run-time","run time","runtime"],["translator","compiler","interpreter"],["error diagnostic","diagnostic","error"],["auto-complet","autocomplet","auto complet","suggest","predict"],["auto-correct","autocorrect","auto correct","correction"],["prettyprint","pretty print","pretty-print","colour","color","indent","layout","format"]],"needCount":2,"marksPerGroup":1} }
          ],
          explanation: "Any two of: code editor, run-time environment, translators, error diagnostics, auto-completion, auto-correction and prettyprint."
        },
        {
          id: "Q9", syl: ["4.2.4"], marks: 1, difficulty: "easy",
          topic: "Translators",
          prompt: "A software company is testing and debugging an internal prototype written in Python every day. State which translator, compiler or interpreter, is the most suitable.",
          markPoints: [
            { text: "Interpreter", marks: 1, match: { type: "keywords", groups: [["interpreter","interpreted"]], needCount: 1 } }
          ],
          explanation: "An interpreter — it runs the code line by line and halts at the first error, which makes daily prototype debugging faster."
        },

        // ============== INTERMEDIATE TIER ==============
        {
          id: "Q10", syl: ["4.2.1"], marks: 2, difficulty: "intermediate",
          topic: "High-Level vs Low-Level Languages",
          prompt: "State two advantages of writing a program in a high-level language compared with a low-level language.",
          markPoints: [
            {
              text: "Any two of: easier for humans to read, write and understand; easier to debug and maintain; portable / machine-independent; built-in functions and data structures; fewer lines of code",
              marks: 2,
              match: {
                type: "keywords",
                groups: [["easier to read","easy to read","easier to write","easy to write","easier to understand","easy to understand","english","readable","human"],["debug","maintain","fix","easier to test"],["portable","machine-independent","machine independent","different cpu","different processor","different computer","any computer","different hardware","run on different"],["built-in","built in","library","libraries","data structures","functions"],["fewer lines","less code","shorter","less lines","fewer statements"]],
                needCount: 2,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "High-level languages are easier for humans to read, write and understand; they are easier to debug and maintain; they are portable (machine-independent) and can run on different processors; they offer built-in functions and data structures; and they need fewer lines of code for complex tasks."
        },
        {
          id: "Q11", syl: ["4.2.1"], marks: 2, difficulty: "intermediate",
          topic: "High-Level vs Low-Level Languages",
          prompt: "State one advantage and one disadvantage of writing a program in a low-level language compared with a high-level language. [2 marks]",
          markPoints: [
            { text: "Advantage: direct manipulation of the hardware", marks: 1, match: {"type":"keywords","groups":[["hardware","directly","direct","control the"]],"needCount":1} },
            { text: "Disadvantage: harder to read, write or debug / machine dependent", marks: 1, match: {"type":"keywords","groups":[["hard to read","difficult to read","hard to write","difficult to write","hard to debug","difficult to debug","machine dependent","machine-dependent","not portable","only runs on","one type of processor","harder to","difficult","hard to understand"]],"needCount":1} }
          ],
          explanation: "Advantage: a low-level language allows direct manipulation of the hardware. Disadvantage: it is harder to read, write and debug, and it is machine dependent, so a program usually runs on one type of processor only."
        },
        {
          id: "Q12", syl: ["4.2.2"], marks: 1, difficulty: "intermediate",
          topic: "Assembly Language",
          prompt: "Explain why an assembler is needed to run a program that has been written in assembly language. [1 mark]",
          markPoints: [
            { text: "The assembler translates (converts) the assembly language program into machine code, which the CPU can run", marks: 1, match: {"type":"keywords","groups":[["translat","convert","change"],["machine code","binary","machine language"]],"needCount":2} }
          ],
          explanation: "Assembly language is written using mnemonics, which the CPU cannot run directly. An assembler translates the assembly language program into machine code."
        },
        {
          id: "Q13", syl: ["4.2.1"], marks: 1, difficulty: "intermediate",
          topic: "Assembly Language",
          prompt: "State one reason why a software engineer might write a device driver in assembly language instead of Python.",
          markPoints: [
            { text: "Any one of: direct control of hardware registers and memory locations; maximum speed / no execution overhead; occupies minimal memory", marks: 1, match: { type: "keywords", groups: [["direct","register","hardware","memory location"],["fast","speed","overhead","efficient","quick"],["minimal memory","less memory","small","little memory","less ram","memory space"]], needCount: 1 } }
          ],
          explanation: "Assembly language gives direct control over hardware registers and memory locations, runs with maximum speed and almost no overhead, and takes up minimal memory — all useful for device drivers."
        },
        {
          id: "Q14", syl: ["4.2.3"], marks: 2, difficulty: "intermediate",
          topic: "Compilers & Interpreters",
          prompt: "Describe how each of the following translators translates high-level source code:\n(a) a compiler [1 mark]\n(b) an interpreter [1 mark]",
          markPoints: [
            { text: "(a) Compiler: translates the whole source code file at once, into machine code", marks: 1, match: { type: "keywords", groups: [["whole","entire","all of the","all at once","at once","complete program","whole program","entire program"]], needCount: 1 } },
            { text: "(b) Interpreter: translates and executes the source code one line at a time", marks: 1, match: { type: "keywords", groups: [["line by line","line-by-line","one line at a time","each line","one line","line at a time","statement by statement"]], needCount: 1 } }
          ],
          explanation: "(a) A compiler translates the entire source code file in one go into machine code. (b) An interpreter translates and executes the source code line by line, every time the program is run."
        },
        {
          id: "Q15", syl: ["4.2.3"], marks: 2, difficulty: "intermediate",
          topic: "Compilers & Interpreters",
          prompt: "Describe how each of the following reports syntax errors:\n(a) a compiler [1 mark]\n(b) an interpreter [1 mark]",
          markPoints: [
            { text: "(a) Compiler: produces an error report listing all the syntax errors found after the translation attempt", marks: 1, match: { type: "keywords", groups: [["report","list","all the errors","all errors","all of the errors","every error","errors at the end","after"]], needCount: 1 } },
            { text: "(b) Interpreter: halts at the first error it meets", marks: 1, match: { type: "keywords", groups: [["first error","stops at","halts","halt","immediately","as soon as","stops when","stops execution","stop"]], needCount: 1 } }
          ],
          explanation: "(a) A compiler translates the whole program and then gives a report listing all the syntax errors. (b) An interpreter halts immediately at the first error it meets."
        },
        {
          id: "Q16", syl: ["4.2.4"], marks: 2, difficulty: "intermediate",
          topic: "Compilers & Interpreters",
          prompt: "(a) State which translator generates an independent executable (.exe) file that runs without the translator. [1 mark]\n(b) State which translator is preferred during the iterative development and debugging stage of a project. [1 mark]",
          markPoints: [
            { text: "(a) Compiler", marks: 1, match: { type: "keywords", groups: [["compiler"]], needCount: 1 } },
            { text: "(b) Interpreter", marks: 1, match: { type: "keywords", groups: [["interpreter"]], needCount: 1 } }
          ],
          explanation: "(a) A compiler produces the standalone executable. (b) An interpreter is preferred during development and debugging, because it stops line by line at errors."
        },
        {
          id: "Q17", syl: ["4.2.4"], marks: 3, difficulty: "intermediate",
          topic: "Compilers & Interpreters",
          prompt: "A company is developing a commercial web browser that will be distributed to millions of end users. State which translator, compiler or interpreter, is the most suitable, and justify your choice with two reasons.",
          markPoints: [
            { text: "Compiler", marks: 1, match: { type: "keywords", groups: [["compiler","compiled"]], needCount: 1 } },
            {
              text: "Any two of: produces an independent executable so users do not need a translator; protects the intellectual property / source code is not distributed; executable code runs faster",
              marks: 2,
              match: {
                type: "keywords",
                groups: [["executable","exe","independent","standalone","stand-alone","without a translator","do not need","doesn't need","does not need","don't need"],["intellectual property","source code","protect","copy","private","hidden","secret","not distributed","not shared","not seen"],["faster","speed","quick","performance","efficient"]],
                needCount: 2,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "A compiler. It produces an independent executable file, so end users do not need a translator installed; it protects the company's intellectual property because the source code is not distributed; and the executable code runs faster."
        },
        {
          id: "Q18", syl: ["4.1.3"], marks: 2, difficulty: "intermediate",
          topic: "Operating Systems",
          prompt: "Describe how the hardware, the firmware, the operating system and an application are related when an application is run on a computer. [2 marks]",
          markPoints: [
            { text: "The bootloader (firmware) is run on the hardware", marks: 1, match: {"type":"keywords","groups":[["bootloader","boot loader","firmware"],["hardware"]],"needCount":2} },
            { text: "The operating system is run on the firmware, and the application is run on the operating system", marks: 1, match: {"type":"keywords","groups":[["operating system","os"],["application","app","program"]],"needCount":2} }
          ],
          explanation: "The bootloader (firmware) is run on the hardware. The operating system is run on the firmware, and applications are run on the operating system."
        },
        {
          id: "Q19", syl: ["4.1.3"], marks: 2, difficulty: "intermediate",
          topic: "Operating Systems",
          prompt: "Explain why an operating system is needed for application software to run on a computer.",
          markPoints: [
            { text: "The operating system provides a platform on which application software runs", marks: 1, match: {"type":"keywords","groups":[["platform","runs the application","run application","run the application","runs applications","allows applications","allows application","allows programs","run programs","runs programs"]],"needCount":1} },
            { text: "It manages the hardware (e.g. memory, peripherals) so the application can use it", marks: 1, match: {"type":"keywords","groups":[["manage","manages","controls","control","hardware","memory","peripheral","resources","between"]],"needCount":1} }
          ],
          explanation: "The operating system provides the platform on which application software runs. It also manages the hardware, such as memory and peripherals, so that the application can use the computer's resources."
        },
        {
          id: "Q20", syl: ["4.2.5"], marks: 2, difficulty: "intermediate",
          topic: "IDEs",
          prompt: "A programmer is using an IDE. Describe the purpose of each of the following IDE functions.\n(a) Translators [1 mark]\n(b) Run-time environment [1 mark]",
          markPoints: [
            { text: "(a) Translators convert the program code into machine code (by compiling or interpreting it)", marks: 1, match: {"type":"keywords","groups":[["translat","convert","machine code","compile","interpret","binary"]],"needCount":1} },
            { text: "(b) The run-time environment lets the program be run / executed and tested inside the IDE", marks: 1, match: {"type":"keywords","groups":[["run","execute","test","output","inside","within","try"]],"needCount":1} }
          ],
          explanation: "(a) The translator (compiler or interpreter) converts the program code into machine code that the computer can run. (b) The run-time environment allows the programmer to run and test the program inside the IDE."
        },

        // ============== HARD TIER ==============
        {
          id: "Q21", syl: ["4.1.2"], marks: 6, difficulty: "hard",
          topic: "Functions of an Operating System",
          prompt: "An operating system manages the computer's resources. Identify three core management functions performed by an operating system, and describe each one. [6 marks]",
          markPoints: [
            {
              text: "Three function names (any three of): file management; memory management; multitasking / process management; peripheral / device management; user interface; security / user account management; interrupt handling",
              marks: 3,
              match: {
                type: "keywords",
                groups: [["file management","file manager","files"],["memory management","memory manager","ram allocation","virtual memory"],["multitasking","multi-tasking","process management","scheduling","time slic","time-slic"],["peripheral","device management","driver","input/output","i/o"],["user interface","gui","cli"],["security","user account","accounts","log-in","login","password"],["interrupt"]],
                needCount: 3,
                marksPerGroup: 1
              }
            },
            {
              text: "Three accurate descriptions: e.g. creates / deletes / renames / organises files and folders and permissions; allocates RAM to applications and stops processes overwriting each other; allocates CPU time slices to running applications; uses drivers to communicate with devices / manages buffers and print queues; provides a GUI or CLI; manages passwords and access levels; detects, prioritises and services interrupts",
              marks: 3,
              match: {
                type: "keywords",
                groups: [["create","delete","rename","folder","directory","permission","organis","organiz","copy","move"],["allocate","allocates","ram","overwrit","space in memory","virtual memory","paging"],["time slice","time-slice","cpu time","share the cpu","scheduling","several programs","simultaneous","multiple programs","same time","run at the same time"],["driver","buffer","print queue","communicat","input and output","input/output","devices"],["gui","cli","interact","interface","windows","icons"],["password","log-in","login","access level","user account","encrypt","authenticat","permission"],["prioriti","service","detect","signal","isr","handle"]],
                needCount: 3,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "Any three functions, each named and described. File management: creates, deletes, renames, copies and moves files, manages folders and access permissions. Memory management: allocates RAM to active applications, stops processes overwriting each other's memory, manages virtual memory. Multitasking / process management: shares CPU time slices between running applications. Peripheral / device management: communicates with hardware using device drivers and manages buffers and print queues. User interface: provides a GUI or CLI. Security / user accounts: manages log-ins, passwords and access levels. Interrupt handling: detects, prioritises and services interrupt signals."
        },
        {
          id: "Q22", syl: ["4.1.4"], marks: 4, difficulty: "hard",
          topic: "Interrupts",
          prompt: "Describe how an interrupt is generated and how it is handled using an interrupt service routine. [4 marks]",
          markPoints: [
            { text: "Any four of: an interrupt signal is generated by hardware (e.g. a key press) or by software (e.g. division by zero); the signal is sent to the CPU; the CPU pauses the task it is running; the interrupt service routine (ISR) is run to handle the interrupt; the CPU resumes the original task", marks: 4, match: {"type":"keywords","groups":[["signal","generated","hardware","software","key","mouse","division by zero"],["sent to the cpu","sent to the processor","cpu receives","cpu is told","tells the cpu","notifies the cpu","received by the cpu"],["pause","stops","stop","suspend","halt"],["isr","interrupt service routine","service routine"],["resume","continues","continue","carries on","carry on","returns to","go back","goes back"]],"needCount":4,"marksPerGroup":1} }
          ],
          explanation: "An interrupt signal is generated by hardware (for example a key press or moving the mouse) or by software (for example division by zero) and is sent to the CPU. The CPU pauses the task it is running and runs the interrupt service routine (ISR) to handle the interrupt. When this has finished, the CPU resumes the original task."
        },
        {
          id: "Q23", syl: ["4.2.5"], marks: 3, difficulty: "hard",
          topic: "IDE Functions",
          prompt: "An IDE provides functions to help a programmer. Describe the purpose of each of the following.\n(a) Error diagnostics [1 mark]\n(b) Auto-completion [1 mark]\n(c) Prettyprint [1 mark]",
          markPoints: [
            { text: "(a) Error diagnostics: find and report errors in the code so that they can be corrected", marks: 1, match: {"type":"keywords","groups":[["error","errors","mistake","bug","fault"],["find","finds","identif","report","highlight","show","locate","detect","point","tell"]],"needCount":2} },
            { text: "(b) Auto-completion: suggests or completes keywords / variable names as the programmer types", marks: 1, match: {"type":"keywords","groups":[["suggest","complet","finish","predict","fill","offer","automatic"]],"needCount":1} },
            { text: "(c) Prettyprint: displays the code with colours / indentation / formatting so that it is easier to read", marks: 1, match: {"type":"keywords","groups":[["colour","color","indent","format","layout","readab","easier to read","easy to read","highlight","lay","different fonts"]],"needCount":1} }
          ],
          explanation: "(a) Error diagnostics find and report errors in the code so the programmer can correct them. (b) Auto-completion suggests or completes keywords and names as they are typed. (c) Prettyprint displays the code with colours, indentation and layout so it is easier to read."
        },
        {
          id: "Q24", syl: ["4.1.2"], marks: 3, difficulty: "hard",
          topic: "Operating Systems",
          prompt: "A school computer is shared by many students. Each student logs in with their own password, opens several programs at the same time and saves their work in files.\nState the three operating system functions that are being used. [3 marks]",
          markPoints: [
            { text: "Managing user accounts (and system security)", marks: 1, match: {"type":"keywords","groups":[["user account","accounts","log in","login","log-in","password","security"]],"needCount":1} },
            { text: "Managing multitasking", marks: 1, match: {"type":"keywords","groups":[["multitask","several programs","more than one","at the same time","multiple programs","multi-task"]],"needCount":1} },
            { text: "Managing files", marks: 1, match: {"type":"keywords","groups":[["file management","managing files","manages files","files","file"]],"needCount":1} }
          ],
          explanation: "The operating system manages user accounts and system security (the login and password), manages multitasking (several programs at the same time) and manages files (saving each student's work)."
        }
      ]
    },

    // Source: the "Cambridge CAIE CS 9618 Class Test — Topic 14:
    // Communication & Internet Technologies (14.1 Protocols & 14.2
    // Circuit & Packet Switching)" document's Section C (Q26-Q30 in that
    // source's own numbering, renumbered Q1-Q5 here to match this paper's
    // own local id convention, same as datarep_exam above). Every
    // question's marks are the verified total of its own markPoints,
    // which sum to 16 -- matching the source's own "16 Marks Total" for
    // this section. This is a one-shot CLASS TEST, not ongoing topic
    // practice -- singleAttempt:true (see exam-practice.html) means no
    // retake is offered once a student submits, enforced both in the UI
    // and, like quiz-data.js's comm9618's maxAttempts:1, server-side in
    // firestore.rules.
    programming_exam: {
      key: "programming_exam",
      title: "Topic 8: Programming — IGCSE exam style",
      subtitle: "13 exam-style questions · Identifiers & data types, string handling, arrays, totalling & counting, functions & procedures, scope, file handling · 35 marks total",
      classes: ["10BR1","10BR2","10BR3"],
      totalMarks: 35,
      questions: [
        {
          id: "Q1", syl: ["8.1.2"], marks: 2, difficulty: "easy",
          topic: "Identifiers & Data Types",
          prompt: "A library computer system stores book details and calculates late return fees.\nFor each item below, state a suitable meaningful identifier name and the most appropriate basic data type:\n(a) The title of a book, for example \"Computer Science Principles\" [1 mark]\n(b) The number of pages in the book, for example 342 [1 mark]",
          markPoints: [
            { text: "(a) A meaningful identifier such as BookTitle / Title, with data type STRING", marks: 1, match: { type: "keywords", groups: [["string"],["title","name"]], needCount: 2 } },
            { text: "(b) A meaningful identifier such as PageCount / NumberOfPages, with data type INTEGER", marks: 1, match: { type: "keywords", groups: [["integer"],["page"]], needCount: 2 } }
          ],
          explanation: "(a) BookTitle : STRING, because a title is text. (b) PageCount : INTEGER, because a number of pages is always a whole number. A good identifier describes what the variable holds, so any sensible name such as Title or NumberOfPages is accepted."
        },
        {
          id: "Q2", syl: ["8.1.2"], marks: 2, difficulty: "easy",
          topic: "Identifiers & Data Types",
          prompt: "The same library system also stores the following items. For each item, state a suitable meaningful identifier name and the most appropriate basic data type:\n(a) The daily overdue fine rate in dollars, for example $0.50 [1 mark]\n(b) Whether the book is currently checked out (TRUE or FALSE) [1 mark]",
          markPoints: [
            { text: "(a) A meaningful identifier such as DailyFineRate / FineRate, with data type REAL", marks: 1, match: { type: "keywords", groups: [["real"],["fine","rate","overdue","charge","fee"]], needCount: 2 } },
            { text: "(b) A meaningful identifier such as IsCheckedOut / CheckedOut, with data type BOOLEAN", marks: 1, match: { type: "keywords", groups: [["boolean"],["check","out","loan","borrow","issued"]], needCount: 2 } }
          ],
          explanation: "(a) DailyFineRate : REAL, because money such as $0.50 has a decimal part. (b) IsCheckedOut : BOOLEAN, because the item can only be TRUE or FALSE."
        },
        {
          id: "Q3", syl: ["8.1.8"], marks: 1, difficulty: "easy",
          topic: "Maintainability: Identifiers & Comments",
          prompt: "Explain why choosing meaningful identifier names is important when creating a maintainable program.",
          markPoints: [
            { text: "Meaningful names make the code self-documenting / easier for other programmers to understand, debug and update", marks: 1, match: { type: "keywords", groups: [["understand","readable","read","clear","self-document","meaning","purpose","debug","maintain","update","modify","other programmer","another programmer"]], needCount: 1 } }
          ],
          explanation: "Meaningful identifiers make the code self-documenting. Other programmers (or the same programmer months later) can understand, debug and update it without relying heavily on extra documentation."
        },
        {
          id: "Q4", syl: ["7.7"], calc: true, marks: 4, difficulty: "intermediate",
          topic: "Trace Tables & String Handling",
          prompt: "An algorithm processes usernames to generate standardised security codes.\n\n01 INPUT RawUsername\n02 CleanName ← UCASE(RawUsername)\n03 Code1 ← SUBSTRING(CleanName, 1, 3)\n04 Num ← LENGTH(CleanName)\n05 Code2 ← MOD(Num, 7) + 1\n06 OUTPUT Code1\n07 OUTPUT Code2\n\nThe user enters \"algorithm\".\nComplete the trace by stating:\n(i) the value of Num after line 04\n(ii) the value of MOD(Num, 7)\n(iii) the value of Code2 after line 05\n(iv) the value of Code1 output by line 06\nGive your answers as (i), (ii), (iii) and (iv).\n[4 marks]",
          markPoints: [
            { text: "Num = 9", marks: 1, match: {"type":"keywords","groups":[["(i) 9","(i)9","(i) = 9","(i)=9","num = 9","num=9","num ← 9","num <- 9"]],"needCount":1} },
            { text: "MOD(9, 7) = 2", marks: 1, match: {"type":"keywords","groups":[["(ii) 2","(ii)2","(ii) = 2","(ii)=2","remainder 2","remainder is 2"]],"needCount":1} },
            { text: "Code2 = 3 (2 + 1)", marks: 1, match: {"type":"keywords","groups":[["(iii) 3","(iii)3","(iii) = 3","(iii)=3","code2 = 3","code2=3","code2 ← 3","code2 <- 3"]],"needCount":1} },
            { text: "Code1 = \"ALG\"", marks: 1, match: {"type":"keywords","groups":[["(iv) alg","(iv)alg","(iv) \"alg\"","(iv)\"alg\"","(iv) = alg","(iv)=alg","code1 = alg","code1 = \"alg\"","code1 ← alg","code1 ← \"alg\"","code1 <- \"alg\""]],"needCount":1} }
          ],
          explanation: "LENGTH(\"ALGORITHM\") = 9, so Num = 9. MOD(9, 7) = 2 because 9 = 1 × 7 + 2. Code2 = 2 + 1 = 3. SUBSTRING(\"ALGORITHM\", 1, 3) = \"ALG\", so line 06 outputs ALG and line 07 outputs 3."
        },
        {
          id: "Q5", syl: ["8.1.7"], marks: 1, difficulty: "easy",
          topic: "Library Routines: DIV & MOD",
          prompt: "State the function of the arithmetic operator MOD.",
          markPoints: [
            { text: "Returns the remainder of an integer division (for example 9 MOD 7 = 2)", marks: 1, match: { type: "keywords", groups: [["remainder","left over","leftover","left-over"]], needCount: 1 } }
          ],
          explanation: "MOD returns the integer remainder after a division. For example 9 MOD 7 = 2, because 9 = 1 × 7 + 2."
        },
        {
          id: "Q6", syl: ["8.1.4e"], marks: 1, difficulty: "easy",
          topic: "String Handling",
          prompt: "State the function of the string handling routine UCASE.",
          markPoints: [
            { text: "Converts all the letters in a string to upper case / capital letters", marks: 1, match: { type: "keywords", groups: [["upper","capital"]], needCount: 1 } }
          ],
          explanation: "UCASE converts every alphabetic character in a string to upper case, so UCASE(\"algorithm\") gives \"ALGORITHM\"."
        },
        {
          id: "Q7", syl: ["7.4","8.2.3"], marks: 7, difficulty: "hard",
          topic: "1D Arrays: Totalling, Counting & Maximum",
          prompt: "A temperature monitoring system records the temperature on each day of a 30-day month in a 1D array:\nDECLARE TempData : ARRAY[1:30] OF REAL\n\nWrite an algorithm in pseudocode to:\n• set up a totalling variable and a counter for freezing days (a freezing day is 0.0 degrees C or below)\n• use a FOR loop to go through the array\n• add up all the temperatures\n• count how many days were 0.0 degrees C or below\n• find the highest temperature in the array\n• output the average monthly temperature, the number of freezing days and the highest temperature\n[7 marks]",
          markPoints: [
            { text: "Total and freezing counter both initialised to 0 before the loop", marks: 1, match: { type: "keywords", groups: [["total","sum"],["← 0","<- 0","= 0","←0","<-0","=0"]], needCount: 2 } },
            { text: "Correct FOR loop: FOR i ← 1 TO 30 ... NEXT i", marks: 1, match: { type: "keywords", groups: [["for"],["to 30"],["next"]], needCount: 3 } },
            { text: "Running total: Total ← Total + TempData[i]", marks: 1, match: { type: "keywords", groups: [["+ tempdata[","+tempdata[","+ temp[","+temp[","+ temps[","+ data["]], needCount: 1 } },
            { text: "Counts freezing days: IF TempData[i] <= 0 THEN Count ← Count + 1", marks: 1, match: { type: "keywords", groups: [["<= 0","<=0","≤ 0","≤0"],["+ 1","+1"]], needCount: 2 } },
            { text: "Finds the maximum: starts from TempData[1] and updates when TempData[i] > Max", marks: 1, match: { type: "keywords", groups: [["> max","> highest","> largest","> maximum","> high",">max",">highest",">largest",">maximum"]], needCount: 1 } },
            { text: "Average calculated after the loop (Total / 30)", marks: 1, match: { type: "keywords", groups: [["/ 30","/30","÷ 30","÷30"]], needCount: 1 } },
            { text: "OUTPUT statements for the average, freezing day count and maximum, with descriptive text", marks: 1, match: { type: "keywords", groups: [["output","print","display"],["average","mean"],["freez"],["max","highest"]], needCount: 3 } }
          ],
          explanation: "Model answer:\nDECLARE TotalTemp, AverageTemp, MaxTemp : REAL\nDECLARE FreezingCount, i : INTEGER\nTotalTemp ← 0.0\nFreezingCount ← 0\nMaxTemp ← TempData[1]\nFOR i ← 1 TO 30\n    TotalTemp ← TotalTemp + TempData[i]\n    IF TempData[i] <= 0.0 THEN\n        FreezingCount ← FreezingCount + 1\n    ENDIF\n    IF TempData[i] > MaxTemp THEN\n        MaxTemp ← TempData[i]\n    ENDIF\nNEXT i\nAverageTemp ← TotalTemp / 30\nOUTPUT \"Average Temperature: \", AverageTemp\nOUTPUT \"Freezing Days: \", FreezingCount\nOUTPUT \"Maximum Temperature: \", MaxTemp\n\nNote: the maximum must start from a real value in the array (TempData[1]), not from the whole array name. Totalling and counting variables must be set to 0 before the loop."
        },
        {
          id: "Q8", syl: ["8.1.6b"], marks: 3, difficulty: "hard",
          topic: "Functions",
          prompt: "A software application calculates sales tax and discounts for an online checkout.\nWrite a function named CalculateTax that takes one REAL parameter, Amount, and returns a REAL value equal to 15% of the amount (Amount * 0.15). Write the complete function in pseudocode.\n[3 marks]",
          markPoints: [
            { text: "Correct header: FUNCTION CalculateTax(Amount : REAL) RETURNS REAL", marks: 1, match: { type: "keywords", groups: [["function calculatetax"],["returns real"]], needCount: 2 } },
            { text: "Returns Amount * 0.15", marks: 1, match: { type: "keywords", groups: [["return"],["* 0.15","*0.15","0.15 *","0.15*"]], needCount: 2 } },
            { text: "Ends with ENDFUNCTION", marks: 1, match: { type: "keywords", groups: [["endfunction"]], needCount: 1 } }
          ],
          explanation: "FUNCTION CalculateTax(Amount : REAL) RETURNS REAL\n    RETURN Amount * 0.15\nENDFUNCTION\n\nA function must state the data type it returns and must contain a RETURN statement."
        },
        {
          id: "Q9", syl: ["8.1.6b"], marks: 3, difficulty: "hard",
          topic: "Procedures & Parameters",
          prompt: "Write a procedure named ApplyDiscount that has two parameters:\n• Price (REAL)\n• DiscountRate (REAL)\n\nThe procedure calculates NewPrice as Price * (1.0 - DiscountRate), then outputs the message \"New Discounted Price: $\" followed by NewPrice. Write the complete procedure in pseudocode.\n[3 marks]",
          markPoints: [
            { text: "Correct header: PROCEDURE ApplyDiscount with Price and DiscountRate as parameters", marks: 1, match: {"type":"keywords","groups":[["procedure applydiscount"],["price"],["discountrate"]],"needCount":3} },
            { text: "Calculates the new price: NewPrice ← Price * (1.0 - DiscountRate)", marks: 1, match: {"type":"keywords","groups":[["price *","price*"],["1.0 -","1 -","1.0-","1-"]],"needCount":2} },
            { text: "OUTPUT of the message and the new price, ending with ENDPROCEDURE", marks: 1, match: {"type":"keywords","groups":[["output","print","display"],["endprocedure"]],"needCount":2} }
          ],
          explanation: "PROCEDURE ApplyDiscount(Price : REAL, DiscountRate : REAL)\n    DECLARE NewPrice : REAL\n    NewPrice ← Price * (1.0 - DiscountRate)\n    OUTPUT \"New Discounted Price: $\", NewPrice\nENDPROCEDURE\n\nThe values of Price and DiscountRate are passed to the procedure as parameters. A procedure does not return a value."
        },
        {
          id: "Q10", syl: ["8.1.6c"], marks: 2, difficulty: "intermediate",
          topic: "Scope: Local vs Global",
          prompt: "State where a local variable and where a global variable can be used in a program. [2 marks]",
          markPoints: [
            { text: "Local: declared inside a procedure / function, so it can only be used inside that procedure / function", marks: 1, match: {"type":"keywords","groups":[["local"],["only within","only inside","only accessible","within the","inside the","only in","destroyed","freed","deleted","lost","that procedure","that function","the procedure","the function"]],"needCount":2} },
            { text: "Global: declared in the main program, so it can be used anywhere in the program", marks: 1, match: {"type":"keywords","groups":[["global"],["whole program","entire program","any part","anywhere","throughout","all parts","everywhere","every part","whole of the program"]],"needCount":2} }
          ],
          explanation: "A local variable is declared inside a procedure or function and can only be used inside it. A global variable is declared in the main program and can be used anywhere in the program."
        },
        {
          id: "Q11", syl: ["8.2.3"], marks: 3, difficulty: "intermediate",
          topic: "2D Arrays",
          prompt: "A school sports day records the points scored by 4 houses in 5 events. The scores are stored in a 2D array declared as:\nDECLARE Scores : ARRAY[1:4, 1:5] OF INTEGER\n\nWrite pseudocode using nested FOR loops to set every element of the array Scores to 0.\n[3 marks]",
          markPoints: [
            { text: "Nested FOR loop headers with the correct limits (1 TO 4 and 1 TO 5)", marks: 1, match: { type: "keywords", groups: [["to 4"],["to 5"]], needCount: 2 } },
            { text: "Assigns 0 to Scores[row, column]", marks: 1, match: { type: "keywords", groups: [["scores["],["← 0","<- 0","= 0","←0","<-0","=0"]], needCount: 2 } },
            { text: "Matching NEXT statements in the correct order", marks: 1, match: { type: "keywords", groups: [["next"]], needCount: 1 } }
          ],
          explanation: "DECLARE HouseIndex, EventIndex : INTEGER\nFOR HouseIndex ← 1 TO 4\n    FOR EventIndex ← 1 TO 5\n        Scores[HouseIndex, EventIndex] ← 0\n    NEXT EventIndex\nNEXT HouseIndex\n\nThe outer loop steps through the 4 houses and the inner loop through the 5 events. The inner NEXT must come before the outer NEXT."
        },
        {
          id: "Q12", syl: ["8.3.2"], marks: 4, difficulty: "hard",
          topic: "File Handling",
          prompt: "At the end of the sports day the final scores in the 2D array Scores[1:4, 1:5] must be saved to a text file named \"FinalScores.txt\".\nWrite a pseudocode algorithm to:\n• open \"FinalScores.txt\" for writing\n• use nested loops to write each score to the file, one per line\n• close the file\n[4 marks]",
          markPoints: [
            { text: "OPENFILE \"FinalScores.txt\" FOR WRITE", marks: 1, match: { type: "keywords", groups: [["openfile"],["for write"]], needCount: 2 } },
            { text: "Nested loops covering 4 houses and 5 events", marks: 1, match: { type: "keywords", groups: [["to 4"],["to 5"]], needCount: 2 } },
            { text: "WRITEFILE of Scores[row, column] inside the inner loop", marks: 1, match: { type: "keywords", groups: [["writefile"],["scores["]], needCount: 2 } },
            { text: "CLOSEFILE after the loops have finished", marks: 1, match: { type: "keywords", groups: [["closefile"]], needCount: 1 } }
          ],
          explanation: "OPENFILE \"FinalScores.txt\" FOR WRITE\nFOR HouseIndex ← 1 TO 4\n    FOR EventIndex ← 1 TO 5\n        WRITEFILE \"FinalScores.txt\", Scores[HouseIndex, EventIndex]\n    NEXT EventIndex\nNEXT HouseIndex\nCLOSEFILE \"FinalScores.txt\"\n\nThe file is opened once before the loops and closed once after them, not inside the loop."
        },
        {
          id: "Q13", syl: ["8.3.1"], marks: 2, difficulty: "easy",
          topic: "File Handling",
          prompt: "State two reasons why data is stored in external text files by computer programs.\n[2 marks]",
          markPoints: [
            { text: "Data is kept permanently (non-volatile): RAM is emptied when the power is off, but a file on secondary storage is kept", marks: 1, match: { type: "keywords", groups: [["permanent","persist","non-volatile","nonvolatile","lost when","power","switched off","turned off","retain","keep","remain","after the program"]], needCount: 1 } },
            { text: "Data can be reused later or shared / loaded by other programs", marks: 1, match: { type: "keywords", groups: [["share","transfer","reuse","re-use","later","another program","different program","other program","different software","load","next time","back up","backup","used again"]], needCount: 1 } }
          ],
          explanation: "1) Persistence: data held in RAM is lost when the power is switched off, whereas a file on secondary storage keeps the data permanently. 2) Reuse and sharing: data saved by one run of a program can be loaded again later, or opened by other programs and users."
        }
      ]
    },
    databases_exam: {
      key: "databases_exam",
      title: "Topic 9: Databases — IGCSE exam style",
      subtitle: "10 exam-style questions · Primary keys & data types, validation, SQL output tracing, writing and correcting SQL · 25 marks total",
      classes: ["10BR1","10BR2","10BR3"],
      totalMarks: 25,
      questions: [
        {
          id: "Q1", syl: ["9.3"], marks: 2, difficulty: "easy",
          topic: "Primary Keys",
          prompt: "A plant nursery uses a single-table database called PlantSale. The table contains these fields for each plant:\n• PlantID: a unique code, for example PL101\n• PlantName: the common name, for example \"Hydrangea\"\n• Price: the cost in dollars, for example 14.99\n• InStock: whether the plant is available for collection (TRUE or FALSE)\n• DateReceived: the date the plant was delivered, for example 12/04/2026\n• Quantity: the number of plants in stock, for example 25\n\nIdentify the field that should be used as the primary key, and explain why this field is suitable. [2 marks]",
          markPoints: [
            { text: "PlantID", marks: 1, match: {"type":"keywords","groups":[["plantid","plant id"]],"needCount":1} },
            { text: "Each plant has a different / unique code, so no two records share the same value", marks: 1, match: {"type":"keywords","groups":[["unique","uniquely","different","no two","no duplicate","not repeated","identif","only one"]],"needCount":1} }
          ],
          explanation: "PlantID is the primary key. It is a unique code for every plant, so no two records can have the same value and each record can be identified."
        },
        {
          id: "Q2", syl: ["9.2"], marks: 3, difficulty: "easy",
          topic: "Data Types",
          prompt: "A plant nursery uses a single-table database called PlantSale. The table contains these fields for each plant:\n• PlantID: a unique code, for example PL101\n• PlantName: the common name, for example \"Hydrangea\"\n• Price: the cost in dollars, for example 14.99\n• InStock: whether the plant is available for collection (TRUE or FALSE)\n• DateReceived: the date the plant was delivered, for example 12/04/2026\n• Quantity: the number of plants in stock, for example 25\n\nState the most appropriate data type for each field below. Give your answers as (i), (ii) and (iii). [3 marks]\n(i) Price\n(ii) InStock\n(iii) DateReceived",
          markPoints: [
            { text: "(i) Price: Real (or Decimal / Currency)", marks: 1, match: {"type":"keywords","groups":[["real","decimal","currency","float","double"]],"needCount":1} },
            { text: "(ii) InStock: Boolean", marks: 1, match: {"type":"keywords","groups":[["boolean","bool"]],"needCount":1} },
            { text: "(iii) DateReceived: Date/Time (or Date)", marks: 1, match: {"type":"keywords","groups":[["date"]],"needCount":1} }
          ],
          explanation: "(i) Real, because the price has a decimal part. (ii) Boolean, because there are only two values, TRUE and FALSE. (iii) Date/Time, because it holds a date."
        },
        {
          id: "Q3", syl: ["9.4"], calc: true, marks: 3, difficulty: "intermediate",
          topic: "SQL Output Tracing",
          prompt: "A bookstore uses a database table called BookInventory:\n\nBookID | Title                | Genre       | Price | StockQuantity\nB01    | Nebula Dreams        | Sci-Fi      | 12.50 | 8\nB02    | History of Computing | Non-Fiction | 22.00 | 3\nB03    | Cyber City           | Sci-Fi      | 9.99  | 15\nB04    | Deep Ocean           | Documentary | 14.50 | 0\nB05    | Galactic Quest       | Sci-Fi      | 18.00 | 4\nB06    | Coding Logic         | Education   | 8.50  | 12\n\nWrite down the output that is produced by this SQL query. [3 marks]\n\nSELECT Title, Price\nFROM BookInventory\nWHERE Genre = 'Sci-Fi' AND StockQuantity > 0\nORDER BY Price DESCENDING;",
          markPoints: [
            { text: "The two fields Title and Price are shown", marks: 1, match: {"type":"keywords","groups":[["title","galactic quest"],["price","18.00"]],"needCount":2} },
            { text: "The correct three records: Galactic Quest, Nebula Dreams and Cyber City (B01, B03 and B05)", marks: 1, match: {"type":"keywords","groups":[["galactic quest"],["nebula dreams"],["cyber city"]],"needCount":3} },
            { text: "In descending order of price: 18.00, 12.50, 9.99", marks: 1, match: {"type":"numeric","values":["galacticquest18.00nebuladreams12.50cybercity9.99","galacticquest|18.00|nebuladreams|12.50|cybercity|9.99","galacticquest|18.00nebuladreams|12.50cybercity|9.99","|galacticquest|18.00||nebuladreams|12.50||cybercity|9.99|","galacticquest18nebuladreams12.5cybercity9.99","galacticquest-18.00nebuladreams-12.50cybercity-9.99","galacticquest:18.00nebuladreams:12.50cybercity:9.99"]} }
          ],
          explanation: "Title | Price\nGalactic Quest | 18.00\nNebula Dreams | 12.50\nCyber City | 9.99\n\nOnly the Sci-Fi books that are in stock are selected (B01, B03 and B05). Deep Ocean is not Sci-Fi and has no stock. They are sorted from the highest price to the lowest."
        },
        {
          id: "Q4", syl: ["9.4"], calc: true, marks: 2, difficulty: "intermediate",
          topic: "SQL COUNT",
          prompt: "A bookstore uses a database table called BookInventory:\n\nBookID | Title                | Genre       | Price | StockQuantity\nB01    | Nebula Dreams        | Sci-Fi      | 12.50 | 8\nB02    | History of Computing | Non-Fiction | 22.00 | 3\nB03    | Cyber City           | Sci-Fi      | 9.99  | 15\nB04    | Deep Ocean           | Documentary | 14.50 | 0\nB05    | Galactic Quest       | Sci-Fi      | 18.00 | 4\nB06    | Coding Logic         | Education   | 8.50  | 12\n\nWrite down the single value that is returned by this SQL statement. [2 marks]\n\nSELECT COUNT(BookID)\nFROM BookInventory\nWHERE Price < 15.00;",
          markPoints: [
            { text: "4", marks: 2, match: {"type":"numeric","values":["4"]} }
          ],
          explanation: "The books that cost less than 15.00 are B01 (12.50), B03 (9.99), B04 (14.50) and B06 (8.50). COUNT returns 4."
        },
        {
          id: "Q5", syl: ["9.4"], marks: 3, difficulty: "hard",
          topic: "Writing SQL",
          prompt: "A health club uses a database table called MemberData. The fields are:\n• MemberID (Text)\n• LastName (Text)\n• Age (Integer)\n• MembershipType (Text: \"Junior\", \"Standard\" or \"Senior\")\n• FeePaid (Boolean: TRUE or FALSE)\n\nWrite an SQL script to display the LastName and Age of all the members whose MembershipType is \"Junior\" and whose FeePaid is FALSE. The output must be sorted by Age in ascending order. [3 marks]",
          markPoints: [
            { text: "SELECT LastName, Age FROM MemberData", marks: 1, match: {"type":"keywords","groups":[["lastname, age","lastname,age"],["memberdata"],["select"]],"needCount":3} },
            { text: "WHERE MembershipType = \"Junior\" AND FeePaid = FALSE", marks: 1, match: {"type":"keywords","groups":[["membershiptype = 'junior'","membershiptype='junior'","membershiptype = \"junior\"","membershiptype=\"junior\""],["feepaid = false","feepaid=false"],["and"]],"needCount":3} },
            { text: "ORDER BY Age ASCENDING", marks: 1, match: {"type":"keywords","groups":[["order by age ascending","order by age\nascending","order by age  ascending"]],"needCount":1} }
          ],
          explanation: "SELECT LastName, Age\nFROM MemberData\nWHERE MembershipType = 'Junior' AND FeePaid = FALSE\nORDER BY Age ASCENDING;"
        },
        {
          id: "Q6", syl: ["9.4"], marks: 2, difficulty: "intermediate",
          topic: "Writing SQL",
          prompt: "A health club uses a database table called MemberData. The fields are:\n• MemberID (Text)\n• LastName (Text)\n• Age (Integer)\n• MembershipType (Text: \"Junior\", \"Standard\" or \"Senior\")\n• FeePaid (Boolean: TRUE or FALSE)\n\nWrite an SQL script, using COUNT, to display the total number of members who have FeePaid = TRUE. [2 marks]",
          markPoints: [
            { text: "SELECT COUNT(MemberID) FROM MemberData", marks: 1, match: {"type":"keywords","groups":[["count("],["memberdata"]],"needCount":2} },
            { text: "WHERE FeePaid = TRUE", marks: 1, match: {"type":"keywords","groups":[["feepaid = true","feepaid=true"]],"needCount":1} }
          ],
          explanation: "SELECT COUNT(MemberID)\nFROM MemberData\nWHERE FeePaid = TRUE;"
        },
        {
          id: "Q7", syl: ["9.2"], marks: 2, difficulty: "intermediate",
          topic: "Data Types",
          prompt: "A hospital database table called PatientRecord contains the fields PatientID, FullName, DateAdmitted, ContactNumber and EmergencyContact.\n\nExplain why storing ContactNumber as an Integer data type is not appropriate. Give two different reasons. [2 marks]",
          markPoints: [
            { text: "Any two of: an Integer removes a leading zero; an Integer cannot store spaces, brackets or a + sign; a telephone number is never used in calculations", marks: 2, match: {"type":"keywords","groups":[["leading zero","leading 0","zeros","zero is","zero will","the zero","the 0","0 is removed","0 is lost","0 would be"],["space","hyphen","bracket","dash","plus","+","symbol","character","letter"],["calculation","calculate","arithmetic","add them","added","maths","mathematical"]],"needCount":2,"marksPerGroup":1} }
          ],
          explanation: "Any two of: an Integer would remove a leading zero (01223 would become 1223); an Integer cannot store spaces, brackets or a + sign; a telephone number is never used in a calculation, so it is better stored as Text/Alphanumeric."
        },
        {
          id: "Q8", syl: ["9.1"], marks: 2, difficulty: "intermediate",
          topic: "Validation",
          prompt: "A hospital database table called PatientRecord contains the fields PatientID, FullName, DateAdmitted, ContactNumber and EmergencyContact.\n\nPatientID must be the letter P followed by 5 digits, for example P10452.\nDescribe a suitable validation check for PatientID. [2 marks]",
          markPoints: [
            { text: "A format check (or a length check)", marks: 1, match: {"type":"keywords","groups":[["format","length","pattern","picture"]],"needCount":1} },
            { text: "It checks that the entry is exactly 6 characters: the letter P followed by 5 digits", marks: 1, match: {"type":"keywords","groups":[["6 characters","six characters","exactly 6","length of 6","5 digits","five digits","5 numbers","five numbers","5 numeric"],["letter p","'p'","\"p\"","starts with p","begins with p","first character is p","first character must be p","capital p","uppercase p","p followed","p and"]],"needCount":1} }
          ],
          explanation: "A format check (or length check). It checks that the entry is exactly 6 characters long: the letter P followed by 5 digits. Any entry that does not follow this pattern is rejected."
        },
        {
          id: "Q9", syl: ["9.1"], marks: 1, difficulty: "easy",
          topic: "Fields & Records",
          prompt: "A hospital database table called PatientRecord contains the fields PatientID, FullName, DateAdmitted, ContactNumber and EmergencyContact.\n\nDefine what is meant by a record in a database. [1 mark]",
          markPoints: [
            { text: "A collection of related fields / data about one item, person or event (one row of the table)", marks: 1, match: {"type":"keywords","groups":[["row","fields","collection of","set of","group of","related data","related information","all the data","all the information","data about one","information about one"]],"needCount":1} }
          ],
          explanation: "A record is a collection of related fields about one item, person or event. It is shown as one row of the table."
        },
        {
          id: "Q10", syl: ["9.4"], marks: 5, difficulty: "hard",
          topic: "SQL Debugging",
          prompt: "A student writes an SQL script to display the ItemName and StockQty of all the electronic items in the table StoreStock that cost more than $50.00, from the highest price to the lowest price. The table has the fields ItemName, Category, StockQty and Price.\n\nThe student's script contains four errors:\n01 SELECT ItemName AND StockQty\n02 FROM StoreStock\n03 WHERE Category = 'Electronic' AND Price => 50.00\n04 SORT BY Price DOWN;\n\nIdentify the four errors and write the corrected SQL script. [5 marks]",
          markPoints: [
            { text: "Line 01: AND should be a comma between the field names", marks: 1, match: {"type":"keywords","groups":[["comma","itemname, stockqty","itemname,stockqty"]],"needCount":1} },
            { text: "Line 03: => is not a valid operator; it should be > (more than)", marks: 1, match: {"type":"keywords","groups":[["price > 50","price>50","should be >","should be a >","instead of =>","not =>","greater than"]],"needCount":1} },
            { text: "Line 04: SORT BY should be ORDER BY", marks: 1, match: {"type":"keywords","groups":[["order by"]],"needCount":1} },
            { text: "Line 04: DOWN should be DESCENDING", marks: 1, match: {"type":"keywords","groups":[["descending","desc"]],"needCount":1} },
            { text: "Fully correct script", marks: 1, match: {"type":"keywords","groups":[["itemname, stockqty","itemname,stockqty"],["price > 50","price>50"],["order by price descending"]],"needCount":3} }
          ],
          explanation: "Errors: (1) AND instead of a comma in line 01; (2) the operator => in line 03 should be >; (3) SORT BY in line 04 should be ORDER BY; (4) DOWN in line 04 should be DESCENDING.\n\nCorrected script:\nSELECT ItemName, StockQty\nFROM StoreStock\nWHERE Category = 'Electronic' AND Price > 50.00\nORDER BY Price DESCENDING;"
        }
      ]
    },
    boolean_exam: {
      key: "boolean_exam",
      title: "Topic 10: Boolean Logic — IGCSE exam style",
      subtitle: "10 exam-style questions · Logic gates and symbols, truth tables, logic expressions and logic circuits · 25 marks total",
      classes: ["10BR1","10BR2","10BR3"],
      totalMarks: 25,
      questions: [
        {
          id: "Q1", syl: ["10.2","10.3b"], marks: 2, difficulty: "easy",
          topic: "Truth Tables",
          prompt: "Complete the truth tables for these two logic gates. The input rows are 00, 01, 10 and 11, in that order (A first, then B). Write each output column from the top row to the bottom row. Give your answers as (i) and (ii). [2 marks]\n(i) A 2-input NAND gate: write the output X column.\n(ii) A 2-input XOR gate: write the output Y column.",
          markPoints: [
            { text: "(i) NAND: 1, 1, 1, 0", marks: 1, match: {"type":"numeric","values":["1110"]} },
            { text: "(ii) XOR: 0, 1, 1, 0", marks: 1, match: {"type":"numeric","values":["0110"]} }
          ],
          explanation: "(i) NAND is NOT(A AND B), so the output is 0 only for inputs 1 and 1: 1, 1, 1, 0.\n(ii) XOR outputs 1 only when the inputs are different: 0, 1, 1, 0.\n\nA B | NAND XOR\n0 0 |  1    0\n0 1 |  1    1\n1 0 |  1    1\n1 1 |  0    0"
        },
        {
          id: "Q2", syl: ["10.2"], marks: 1, difficulty: "easy",
          topic: "Logic Gate Functions",
          prompt: "State the name of the single logic gate that outputs 1 ONLY when both of its inputs are 0. [1 mark]",
          markPoints: [
            { text: "NOR", marks: 1, match: {"type":"keywords","groups":[["nor","not or"]],"needCount":1} }
          ],
          explanation: "A NOR gate is NOT(A OR B). OR outputs 0 only when both inputs are 0, so NOR outputs 1 only when both inputs are 0."
        },
        {
          id: "Q3", syl: ["10.2","10.3a"], marks: 2, difficulty: "easy",
          topic: "Logic Gate Functions",
          prompt: "(i) State the number of inputs that a NOT gate has.\n(ii) State the maximum number of inputs that a logic circuit in the examination can have.\nGive your answers as (i) and (ii). [2 marks]",
          markPoints: [
            { text: "(i) 1 (a NOT gate is a single-input gate)", marks: 1, match: {"type":"keywords","groups":[["(i) 1","(i)1","(i) one","(i)one","(i) a single","(i) single"]],"needCount":1} },
            { text: "(ii) 3", marks: 1, match: {"type":"keywords","groups":[["(ii) 3","(ii)3","(ii) three","(ii)three"]],"needCount":1} }
          ],
          explanation: "(i) A NOT gate has one input. (ii) Logic circuits have a maximum of three inputs (and one output)."
        },
        {
          id: "Q4", syl: ["10.3a"], marks: 1, difficulty: "easy",
          topic: "Problem Statement to Gate",
          prompt: "An automatic door has a light-beam sensor. The sensor signal L = 1 when the beam is clear and L = 0 when the beam is broken. An alarm signal A must be 1 whenever the beam is broken.\nName the single logic gate that is needed to produce A from L. [1 mark]",
          markPoints: [
            { text: "NOT gate", marks: 1, match: {"type":"keywords","groups":[["not","inverter"]],"needCount":1} }
          ],
          explanation: "The alarm must be 1 when L = 0, and 0 when L = 1. The output is the opposite of the input, so A = NOT L, which needs a NOT gate."
        },
        {
          id: "Q5", syl: ["10.1"], marks: 2, difficulty: "easy",
          topic: "Logic Gate Symbols",
          prompt: "Name the logic gate that each description shows. Give your answers as (i) and (ii). [2 marks]\n(i) The symbol of an AND gate with a small circle added at its output.\n(ii) The symbol of an OR gate with a small circle added at its output.",
          markPoints: [
            { text: "(i) NAND", marks: 1, match: {"type":"keywords","groups":[["(i) nand","(i)nand","(i) a nand","(i) nand gate"]],"needCount":1} },
            { text: "(ii) NOR", marks: 1, match: {"type":"keywords","groups":[["(ii) nor","(ii)nor","(ii) a nor","(ii) nor gate"]],"needCount":1} }
          ],
          explanation: "The small circle at the output means the output is inverted. AND with the circle is a NAND gate. OR with the circle is a NOR gate."
        },
        {
          id: "Q6", syl: ["10.3b"], calc: true, marks: 3, difficulty: "intermediate",
          topic: "Truth Tables",
          prompt: "A logic circuit is described by the expression:\nX = (A OR B) AND (NOT B)\nIt is built from working values P = A OR B and Q = NOT B, so that X = P AND Q.\n\nComplete the truth table for the input rows 00, 01, 10 and 11 (A first, then B). Write each output column from the top row to the bottom row. Label each column, for example P, Q and X. [3 marks]\n\nA | B | P | Q | X\n0 | 0 |   |   |\n0 | 1 |   |   |\n1 | 0 |   |   |\n1 | 1 |   |   |",
          markPoints: [
            { text: "Column P = A OR B: 0, 1, 1, 1", marks: 1, match: {"type":"numeric","values":["0111"]} },
            { text: "Column Q = NOT B: 1, 0, 1, 0", marks: 1, match: {"type":"numeric","values":["1010"]} },
            { text: "Column X = P AND Q: 0, 0, 1, 0", marks: 1, match: {"type":"numeric","values":["0010"]} }
          ],
          explanation: "P = A OR B: 0, 1, 1, 1.\nQ = NOT B: 1, 0, 1, 0.\nX = P AND Q: 0, 0, 1, 0.\n\nA B | P Q | X\n0 0 | 0 1 | 0\n0 1 | 1 0 | 0\n1 0 | 1 1 | 1\n1 1 | 1 0 | 0"
        },
        {
          id: "Q7", syl: ["10.3b"], calc: true, marks: 5, difficulty: "hard",
          topic: "Truth Tables",
          prompt: "A logic circuit has the inputs A, B and C and the output X. It is described by the expression:\nX = (A AND B) OR (NOT (B OR C))\nThe circuit is made from these gates:\n• an AND gate with inputs A and B, with output P\n• an OR gate with inputs B and C, with output Q\n• a NOT gate with input Q, with output R\n• an OR gate with inputs P and R, with output X\n\nComplete the truth table for the 8 input rows in the order 000, 001, 010, 011, 100, 101, 110, 111. Write each output column from the top row to the bottom row. Label each column P, Q, R and X. [5 marks]\n\nA | B | C | P | Q | R | X\n0 | 0 | 0 |   |   |   |\n0 | 0 | 1 |   |   |   |\n0 | 1 | 0 |   |   |   |\n0 | 1 | 1 |   |   |   |\n1 | 0 | 0 |   |   |   |\n1 | 0 | 1 |   |   |   |\n1 | 1 | 0 |   |   |   |\n1 | 1 | 1 |   |   |   |",
          markPoints: [
            { text: "Column P = A AND B: 0, 0, 0, 0, 0, 0, 1, 1", marks: 1, match: {"type":"numeric","values":["00000011"]} },
            { text: "Column Q = B OR C: 0, 1, 1, 1, 0, 1, 1, 1", marks: 1, match: {"type":"numeric","values":["01110111"]} },
            { text: "Column R = NOT Q: 1, 0, 0, 0, 1, 0, 0, 0", marks: 1, match: {"type":"numeric","values":["10001000"]} },
            { text: "Column X = P OR R: 1, 0, 0, 0, 1, 0, 1, 1", marks: 2, match: {"type":"numeric","values":["10001011"]} }
          ],
          explanation: "P = A AND B: 0,0,0,0,0,0,1,1.\nQ = B OR C: 0,1,1,1,0,1,1,1.\nR = NOT Q: 1,0,0,0,1,0,0,0.\nX = P OR R: 1,0,0,0,1,0,1,1.\n\nA B C | P Q R | X\n0 0 0 | 0 0 1 | 1\n0 0 1 | 0 1 0 | 0\n0 1 0 | 0 1 0 | 0\n0 1 1 | 0 1 0 | 0\n1 0 0 | 0 0 1 | 1\n1 0 1 | 0 1 0 | 0\n1 1 0 | 1 1 0 | 1\n1 1 1 | 1 1 0 | 1"
        },
        {
          id: "Q8", syl: ["10.3c"], marks: 2, difficulty: "intermediate",
          topic: "Problem Statement to Expression",
          prompt: "A chemical storage tank has a warning buzzer X. The buzzer sounds (X = 1) if EITHER of these is true:\n• the temperature is high (T = 1) AND the pressure is high (P = 1)\n• the temperature is high (T = 1) AND the chemical level is low (L = 0)\n\nWrite a logic expression for X. Use the inputs T, P and L. [2 marks]",
          markPoints: [
            { text: "Both conditions written using AND: T AND P, and T AND (NOT L)", marks: 1, match: {"type":"keywords","groups":[["t and p","p and t","t and (p or","(p or not l) and t","(not l or p) and t"],["t and not l","t and (not l)","not l and t","(not l) and t","t and (not(l))","or not l)","not l or p)"]],"needCount":2} },
            { text: "The two conditions joined with OR", marks: 1, match: {"type":"keywords","groups":[[" or ",")or(",")or "," or("]],"needCount":1} }
          ],
          explanation: "X = (T AND P) OR (T AND (NOT L)). A low chemical level means L = 0, so NOT L is used. The two conditions are alternatives, so they are joined with OR. Any other correct expression for the statement is also accepted."
        },
        {
          id: "Q9", syl: ["10.3a"], marks: 3, difficulty: "intermediate",
          topic: "Expression to Logic Circuit",
          prompt: "A logic circuit is described by the expression:\nX = (T AND P) OR (T AND (NOT L))\n\nCreate the logic circuit by listing each gate you would use. For every gate, state its type (NOT, AND or OR) and what goes into it. [3 marks]",
          markPoints: [
            { text: "A NOT gate with input L (output NOT L)", marks: 1, match: {"type":"keywords","groups":[["not gate","not l","(not l)","inverter"]],"needCount":1} },
            { text: "Two AND gates: one with inputs T and P, one with inputs T and NOT L", marks: 1, match: {"type":"keywords","groups":[["t and p","p and t","t and p","inputs t and p","t, p","t, and p"],["t and not l","t and (not l)","not l and t","t and the not","t and the output of the not","t and output of the not","t, not l","t and its","not l and the t"]],"needCount":2} },
            { text: "An OR gate whose inputs are the outputs of the two AND gates, giving X", marks: 1, match: {"type":"keywords","groups":[["or gate","into an or","to an or","into the or","to the or","joined with or","combined with or","joined by an or","combined by an or"]],"needCount":1} }
          ],
          explanation: "The NOT gate takes L and gives NOT L. AND gate 1 has inputs T and P. AND gate 2 has inputs T and the output of the NOT gate. The outputs of the two AND gates are the inputs of an OR gate, and its output is X."
        },
        {
          id: "Q10", syl: ["10.3b","10.3c"], marks: 4, difficulty: "hard",
          topic: "Problem Statement to Expression",
          prompt: "An elevator door D must open (D = 1) if EITHER of these is true:\n• the elevator has stopped at a floor (S = 1) AND an obstacle is detected (O = 1)\n• the elevator has stopped at a floor (S = 1) AND the open-door button is pressed (B = 1)\n\nA student writes this expression: D = (S OR O) AND (S OR B)\n\n(a) Work out the value of D when the elevator is moving (S = 0), an obstacle is detected (O = 1) and the button is pressed (B = 1). [1 mark]\n(b) Explain why the student's expression is wrong. [1 mark]\n(c) Write down the correct logic expression for D. [2 marks]",
          markPoints: [
            { text: "(a) D = 1", marks: 1, match: {"type":"keywords","groups":[["1","one"]],"needCount":1} },
            { text: "(b) The door would open while the elevator is moving (S = 0), which is wrong / unsafe", marks: 1, match: {"type":"keywords","groups":[["open"],["moving","not stopped","s = 0","s=0","has not stopped","hasn't stopped"]],"needCount":2} },
            { text: "(c) D = (S AND O) OR (S AND B)", marks: 2, match: {"type":"keywords","groups":[["s and o","o and s","s and (o or b)","s and (b or o)","(o or b) and s","(b or o) and s"],["s and b","b and s","s and (o or b)","s and (b or o)","(o or b) and s","(b or o) and s"]],"needCount":2,"marksPerGroup":1} }
          ],
          explanation: "(a) S OR O = 0 OR 1 = 1 and S OR B = 0 OR 1 = 1, so D = 1 AND 1 = 1.\n(b) The door would open while the elevator is moving, because an obstacle or the button alone is enough. The statement says the elevator must have stopped (S = 1) as well.\n(c) D = (S AND O) OR (S AND B). Any other correct expression for the statement is also accepted."
        }
      ]
    },
    internet_exam: {
      key: "internet_exam",
      title: "Topic 5: The Internet and its Uses — IGCSE exam style",
      subtitle: "10 exam-style questions · The internet and the web, URLs, HTTPS, browsers, cookies, digital currency and cyber security · 25 marks total",
      classes: ["10BR1","10BR2","10BR3"],
      totalMarks: 25,
      questions: [
        {
          id: "Q1", syl: ["5.1.1"], marks: 2, difficulty: "easy",
          topic: "Internet vs World Wide Web",
          prompt: "Explain the difference between the internet and the world wide web. [2 marks]",
          markPoints: [
            { text: "The internet is the infrastructure (the connected networks)", marks: 1, match: {"type":"keywords","groups":[["infrastructure","network of networks","global network","worldwide network","connected networks","interconnected","networks of computers"]],"needCount":1} },
            { text: "The world wide web is the collection of websites / web pages that are accessed using the internet", marks: 1, match: {"type":"keywords","groups":[["collection of","websites","web pages","webpages","pages"]],"needCount":1} }
          ],
          explanation: "The internet is the infrastructure: the connected networks and devices. The world wide web is the collection of websites and web pages that are accessed using the internet."
        },
        {
          id: "Q2", syl: ["5.1.2"], marks: 2, difficulty: "easy",
          topic: "URLs",
          prompt: "Look at this URL: https://www.cityschool.org/maths/index.html\nGive the part of the URL that is (i) the protocol and (ii) the domain name. Give your answers as (i) and (ii). [2 marks]",
          markPoints: [
            { text: "(i) https", marks: 1, match: {"type":"keywords","groups":[["(i) https","(i)https","(i) http","(i)http"]],"needCount":1} },
            { text: "(ii) www.cityschool.org", marks: 1, match: {"type":"keywords","groups":[["(ii) www.cityschool.org","(ii)www.cityschool.org","(ii) cityschool.org","(ii)cityschool.org"]],"needCount":1} }
          ],
          explanation: "(i) The protocol is https. (ii) The domain name is www.cityschool.org. The web page / file name is /maths/index.html."
        },
        {
          id: "Q3", syl: ["5.1.3"], marks: 2, difficulty: "easy",
          topic: "HTTP and HTTPS",
          prompt: "Describe the purpose of HTTPS. [2 marks]",
          markPoints: [
            { text: "It is used to send / transfer web pages or data between a browser and a web server", marks: 1, match: {"type":"keywords","groups":[["web page","browser","web server","website","transfer","send","transmit","request","secure version of http","protocol","secure version of the http"]],"needCount":1} },
            { text: "The data is encrypted, so it cannot be understood if it is intercepted", marks: 1, match: {"type":"keywords","groups":[["encrypt","scrambl","cannot be read","cannot be understood","unreadable","ssl","secure"]],"needCount":1} }
          ],
          explanation: "HTTPS is the secure version of HTTP. It is used to send web pages and data between a browser and a web server, and the data is encrypted so that it cannot be understood if it is intercepted."
        },
        {
          id: "Q4", syl: ["5.1.4"], marks: 3, difficulty: "intermediate",
          topic: "Web Browsers",
          prompt: "Describe three functions of a web browser. [3 marks]",
          markPoints: [
            { text: "Three different functions, for example: storing bookmarks / favourites; recording user history; allowing multiple tabs; storing cookies; providing navigation tools; providing an address bar; rendering HTML", marks: 3, match: {"type":"keywords","groups":[["bookmark","favourite","favorite"],["history"],["tabs","tab "],["cookie"],["navigation","back button","forward button","home button","refresh"],["address bar","url bar","type in","enter a url","enter the url"],["render","html","display web pages","displays web pages","display the web page","displays the web page"]],"needCount":3,"marksPerGroup":1} }
          ],
          explanation: "Functions include storing bookmarks and favourites, recording user history, allowing the use of multiple tabs, storing cookies, providing navigation tools, providing an address bar, and rendering HTML to display web pages."
        },
        {
          id: "Q5", syl: ["5.1.5"], marks: 4, difficulty: "hard",
          topic: "Locating Web Pages",
          prompt: "A user types a URL into a web browser. Describe how the web page is located, retrieved and displayed. [4 marks]",
          markPoints: [
            { text: "The browser sends the domain name to the domain name server (DNS)", marks: 1, match: {"type":"keywords","groups":[["dns","domain name server","domain name system","domain name"]],"needCount":1} },
            { text: "The DNS finds / returns the matching IP address", marks: 1, match: {"type":"keywords","groups":[["ip address"]],"needCount":1} },
            { text: "The browser sends a request to the web server at that IP address", marks: 1, match: {"type":"keywords","groups":[["web server","server"]],"needCount":1} },
            { text: "The web server sends the HTML back and the browser renders / displays the page", marks: 1, match: {"type":"keywords","groups":[["html","render"]],"needCount":1} }
          ],
          explanation: "The browser sends the domain name to the DNS. The DNS finds the matching IP address and returns it. The browser uses the IP address to send a request to the web server. The web server sends the HTML back and the browser renders it and displays the web page."
        },
        {
          id: "Q6", syl: ["5.1.6"], marks: 3, difficulty: "intermediate",
          topic: "Cookies",
          prompt: "Explain what a cookie is and give TWO uses of cookies. [3 marks]",
          markPoints: [
            { text: "A small file / text file that a website stores on the user's device", marks: 1, match: {"type":"keywords","groups":[["small file","text file","file","stored on","stores","saved on","device","computer"]],"needCount":1} },
            { text: "Two uses, for example: saving personal details; tracking user preferences; holding items in an online shopping cart; storing login details", marks: 2, match: {"type":"keywords","groups":[["personal details","personal information","name and address","details"],["preference","tracking","track","favourite","favorite","settings"],["shopping cart","basket","items in","cart"],["login","log in","log-in","username","password","sign in"]],"needCount":2,"marksPerGroup":1} }
          ],
          explanation: "A cookie is a small file that a website stores on the user's device. Uses include saving personal details, tracking user preferences, holding items in an online shopping cart and storing login details."
        },
        {
          id: "Q7", syl: ["5.2.1","5.2.2"], marks: 2, difficulty: "easy",
          topic: "Digital Currency",
          prompt: "(a) State what is meant by a digital currency. [1 mark]\n(b) State what a blockchain is. [1 mark]",
          markPoints: [
            { text: "(a) A currency that only exists electronically", marks: 1, match: {"type":"keywords","groups":[["electronic","electronically","online","digital form","not physical","no physical","no coins","virtual"]],"needCount":1} },
            { text: "(b) A digital ledger: a time-stamped series of records that cannot be altered", marks: 1, match: {"type":"keywords","groups":[["ledger","time-stamped","time stamped","timestamp","cannot be altered","cannot be changed","can't be changed","series of records","chain of records","chain of blocks"]],"needCount":1} }
          ],
          explanation: "(a) A digital currency is a currency that only exists electronically. (b) A blockchain, in its basic form, is a digital ledger: a time-stamped series of records that cannot be altered."
        },
        {
          id: "Q8", syl: ["5.3.1"], marks: 3, difficulty: "intermediate",
          topic: "Cyber Security Threats",
          prompt: "Describe how a distributed denial of service (DDoS) attack is carried out and its aim. [3 marks]",
          markPoints: [
            { text: "Many computers / devices are used in the attack", marks: 1, match: {"type":"keywords","groups":[["many computers","multiple computers","lots of computers","thousands","botnet","several computers","many devices","multiple devices","number of computers","lots of devices","many different computers","a network of computers"]],"needCount":1} },
            { text: "They send a huge number of requests to a web server at the same time", marks: 1, match: {"type":"keywords","groups":[["request","traffic","flood","data to the server","data to a server"]],"needCount":1} },
            { text: "The server is overloaded, so it cannot respond to genuine users / the website becomes unavailable", marks: 1, match: {"type":"keywords","groups":[["overload","unable to respond","cannot respond","can't respond","crash","unavailable","slow","stops working","denied","cannot access","can't access","not able to","go down","goes down","down"]],"needCount":1} }
          ],
          explanation: "The attacker uses many computers. They all send a huge number of requests to a web server at the same time. The server is overloaded and cannot respond, so genuine users cannot access the website."
        },
        {
          id: "Q9", syl: ["5.3.2"], marks: 2, difficulty: "intermediate",
          topic: "Keeping Data Safe",
          prompt: "Describe how a firewall helps to keep data safe. [2 marks]",
          markPoints: [
            { text: "It monitors / checks the traffic coming into and going out of a network", marks: 1, match: {"type":"keywords","groups":[["monitor","examine","check","traffic","incoming","outgoing","scan","inspect","look at"]],"needCount":1} },
            { text: "It blocks traffic that does not meet the rules / is unauthorised", marks: 1, match: {"type":"keywords","groups":[["block","stop","prevent","reject","rules","criteria","unauthorised","unauthorized","filter"]],"needCount":1} }
          ],
          explanation: "A firewall monitors the traffic that is coming into and going out of a network. It blocks any traffic that does not meet the rules that it has been given."
        },
        {
          id: "Q10", syl: ["5.3.2"], marks: 2, difficulty: "hard",
          topic: "Keeping Data Safe",
          prompt: "Describe how two-step verification is used to log in to an online account. [2 marks]",
          markPoints: [
            { text: "The user first enters their username and password", marks: 1, match: {"type":"keywords","groups":[["password","username","user name","login details","details"]],"needCount":1} },
            { text: "A second step is needed, for example a code that is sent to the user's phone and that must be entered", marks: 1, match: {"type":"keywords","groups":[["code","phone","mobile","email","text message","sms","second","another","one-time","otp","app"]],"needCount":1} }
          ],
          explanation: "The user enters their username and password. A second item is then needed, for example a one-time code that is sent to the user's phone, and this must also be entered before the user is logged in."
        }
      ]
    },
    automated_exam: {
      key: "automated_exam",
      title: "Topic 6: Automated and Emerging Technologies — IGCSE exam style",
      subtitle: "10 exam-style questions · Automated systems, robotics, artificial intelligence, expert systems and machine learning · 25 marks total",
      classes: ["10BR1","10BR2","10BR3"],
      totalMarks: 25,
      questions: [
        {
          id: "Q1", syl: ["6.1.1"], marks: 2, difficulty: "easy",
          topic: "Automated Systems",
          prompt: "In an automated system, state the role of (i) a sensor and (ii) an actuator. Give your answers as (i) and (ii). [2 marks]",
          markPoints: [
            { text: "(i) A sensor measures / detects a physical property and sends the data to the microprocessor", marks: 1, match: {"type":"keywords","groups":[["(i) it measures","(i)it measures","(i) it it measures","(i)it it measures","(i) to it measures","(i)to it measures","(i) it is used to it measures","(i)it is used to it measures","(i) it will it measures","(i)it will it measures","(i) this it measures","(i)this it measures","(i) it can it measures","(i)it can it measures","(i) used to it measures","(i)used to it measures","(i) measures","(i)measures","(i) it measures","(i)it measures","(i) to measures","(i)to measures","(i) it is used to measures","(i)it is used to measures","(i) it will measures","(i)it will measures","(i) this measures","(i)this measures","(i) it can measures","(i)it can measures","(i) used to measures","(i)used to measures","(i) detects","(i)detects","(i) it detects","(i)it detects","(i) to detects","(i)to detects","(i) it is used to detects","(i)it is used to detects","(i) it will detects","(i)it will detects","(i) this detects","(i)this detects","(i) it can detects","(i)it can detects","(i) used to detects","(i)used to detects","(i) it detects","(i)it detects","(i) it it detects","(i)it it detects","(i) to it detects","(i)to it detects","(i) it is used to it detects","(i)it is used to it detects","(i) it will it detects","(i)it will it detects","(i) this it detects","(i)this it detects","(i) it can it detects","(i)it can it detects","(i) used to it detects","(i)used to it detects","(i) collects","(i)collects","(i) it collects","(i)it collects","(i) to collects","(i)to collects","(i) it is used to collects","(i)it is used to collects","(i) it will collects","(i)it will collects","(i) this collects","(i)this collects","(i) it can collects","(i)it can collects","(i) used to collects","(i)used to collects","(i) it collects","(i)it collects","(i) it it collects","(i)it it collects","(i) to it collects","(i)to it collects","(i) it is used to it collects","(i)it is used to it collects","(i) it will it collects","(i)it will it collects","(i) this it collects","(i)this it collects","(i) it can it collects","(i)it can it collects","(i) used to it collects","(i)used to it collects","(i) senses","(i)senses","(i) it senses","(i)it senses","(i) to senses","(i)to senses","(i) it is used to senses","(i)it is used to senses","(i) it will senses","(i)it will senses","(i) this senses","(i)this senses","(i) it can senses","(i)it can senses","(i) used to senses","(i)used to senses","(i) gathers","(i)gathers","(i) it gathers","(i)it gathers","(i) to gathers","(i)to gathers","(i) it is used to gathers","(i)it is used to gathers","(i) it will gathers","(i)it will gathers","(i) this gathers","(i)this gathers","(i) it can gathers","(i)it can gathers","(i) used to gathers","(i)used to gathers","(i) takes","(i)takes","(i) it takes","(i)it takes","(i) to takes","(i)to takes","(i) it is used to takes","(i)it is used to takes","(i) it will takes","(i)it will takes","(i) this takes","(i)this takes","(i) it can takes","(i)it can takes","(i) used to takes","(i)used to takes","(i) reads","(i)reads","(i) it reads","(i)it reads","(i) to reads","(i)to reads","(i) it is used to reads","(i)it is used to reads","(i) it will reads","(i)it will reads","(i) this reads","(i)this reads","(i) it can reads","(i)it can reads","(i) used to reads","(i)used to reads","(i) monitors","(i)monitors","(i) it monitors","(i)it monitors","(i) to monitors","(i)to monitors","(i) it is used to monitors","(i)it is used to monitors","(i) it will monitors","(i)it will monitors","(i) this monitors","(i)this monitors","(i) it can monitors","(i)it can monitors","(i) used to monitors","(i)used to monitors","(i) a sensor measures","(i)a sensor measures","(i) it a sensor measures","(i)it a sensor measures","(i) to a sensor measures","(i)to a sensor measures","(i) it is used to a sensor measures","(i)it is used to a sensor measures","(i) it will a sensor measures","(i)it will a sensor measures","(i) this a sensor measures","(i)this a sensor measures","(i) it can a sensor measures","(i)it can a sensor measures","(i) used to a sensor measures","(i)used to a sensor measures","(i) a sensor detects","(i)a sensor detects","(i) it a sensor detects","(i)it a sensor detects","(i) to a sensor detects","(i)to a sensor detects","(i) it is used to a sensor detects","(i)it is used to a sensor detects","(i) it will a sensor detects","(i)it will a sensor detects","(i) this a sensor detects","(i)this a sensor detects","(i) it can a sensor detects","(i)it can a sensor detects","(i) used to a sensor detects","(i)used to a sensor detects","(i) records","(i)records","(i) it records","(i)it records","(i) to records","(i)to records","(i) it is used to records","(i)it is used to records","(i) it will records","(i)it will records","(i) this records","(i)this records","(i) it can records","(i)it can records","(i) used to records","(i)used to records","i) it measures","i)it measures","i) it it measures","i)it it measures","i) to it measures","i)to it measures","i) it is used to it measures","i)it is used to it measures","i) it will it measures","i)it will it measures","i) this it measures","i)this it measures","i) it can it measures","i)it can it measures","i) used to it measures","i)used to it measures","i) measures","i)measures","i) it measures","i)it measures","i) to measures","i)to measures","i) it is used to measures","i)it is used to measures","i) it will measures","i)it will measures","i) this measures","i)this measures","i) it can measures","i)it can measures","i) used to measures","i)used to measures","i) detects","i)detects","i) it detects","i)it detects","i) to detects","i)to detects","i) it is used to detects","i)it is used to detects","i) it will detects","i)it will detects","i) this detects","i)this detects","i) it can detects","i)it can detects","i) used to detects","i)used to detects","i) it detects","i)it detects","i) it it detects","i)it it detects","i) to it detects","i)to it detects","i) it is used to it detects","i)it is used to it detects","i) it will it detects","i)it will it detects","i) this it detects","i)this it detects","i) it can it detects","i)it can it detects","i) used to it detects","i)used to it detects","i) collects","i)collects","i) it collects","i)it collects","i) to collects","i)to collects","i) it is used to collects","i)it is used to collects","i) it will collects","i)it will collects","i) this collects","i)this collects","i) it can collects","i)it can collects","i) used to collects","i)used to collects","i) it collects","i)it collects","i) it it collects","i)it it collects","i) to it collects","i)to it collects","i) it is used to it collects","i)it is used to it collects","i) it will it collects","i)it will it collects","i) this it collects","i)this it collects","i) it can it collects","i)it can it collects","i) used to it collects","i)used to it collects","i) senses","i)senses","i) it senses","i)it senses","i) to senses","i)to senses","i) it is used to senses","i)it is used to senses","i) it will senses","i)it will senses","i) this senses","i)this senses","i) it can senses","i)it can senses","i) used to senses","i)used to senses","i) gathers","i)gathers","i) it gathers","i)it gathers","i) to gathers","i)to gathers","i) it is used to gathers","i)it is used to gathers","i) it will gathers","i)it will gathers","i) this gathers","i)this gathers","i) it can gathers","i)it can gathers","i) used to gathers","i)used to gathers","i) takes","i)takes","i) it takes","i)it takes","i) to takes","i)to takes","i) it is used to takes","i)it is used to takes","i) it will takes","i)it will takes","i) this takes","i)this takes","i) it can takes","i)it can takes","i) used to takes","i)used to takes","i) reads","i)reads","i) it reads","i)it reads","i) to reads","i)to reads","i) it is used to reads","i)it is used to reads","i) it will reads","i)it will reads","i) this reads","i)this reads","i) it can reads","i)it can reads","i) used to reads","i)used to reads","i) monitors","i)monitors","i) it monitors","i)it monitors","i) to monitors","i)to monitors","i) it is used to monitors","i)it is used to monitors","i) it will monitors","i)it will monitors","i) this monitors","i)this monitors","i) it can monitors","i)it can monitors","i) used to monitors","i)used to monitors","i) a sensor measures","i)a sensor measures","i) it a sensor measures","i)it a sensor measures","i) to a sensor measures","i)to a sensor measures","i) it is used to a sensor measures","i)it is used to a sensor measures","i) it will a sensor measures","i)it will a sensor measures","i) this a sensor measures","i)this a sensor measures","i) it can a sensor measures","i)it can a sensor measures","i) used to a sensor measures","i)used to a sensor measures","i) a sensor detects","i)a sensor detects","i) it a sensor detects","i)it a sensor detects","i) to a sensor detects","i)to a sensor detects","i) it is used to a sensor detects","i)it is used to a sensor detects","i) it will a sensor detects","i)it will a sensor detects","i) this a sensor detects","i)this a sensor detects","i) it can a sensor detects","i)it can a sensor detects","i) used to a sensor detects","i)used to a sensor detects","i) records","i)records","i) it records","i)it records","i) to records","i)to records","i) it is used to records","i)it is used to records","i) it will records","i)it will records","i) this records","i)this records","i) it can records","i)it can records","i) used to records","i)used to records","i. it measures","i.it measures","i. it it measures","i.it it measures","i. to it measures","i.to it measures","i. it is used to it measures","i.it is used to it measures","i. it will it measures","i.it will it measures","i. this it measures","i.this it measures","i. it can it measures","i.it can it measures","i. used to it measures","i.used to it measures","i. measures","i.measures","i. it measures","i.it measures","i. to measures","i.to measures","i. it is used to measures","i.it is used to measures","i. it will measures","i.it will measures","i. this measures","i.this measures","i. it can measures","i.it can measures","i. used to measures","i.used to measures","i. detects","i.detects","i. it detects","i.it detects","i. to detects","i.to detects","i. it is used to detects","i.it is used to detects","i. it will detects","i.it will detects","i. this detects","i.this detects","i. it can detects","i.it can detects","i. used to detects","i.used to detects","i. it detects","i.it detects","i. it it detects","i.it it detects","i. to it detects","i.to it detects","i. it is used to it detects","i.it is used to it detects","i. it will it detects","i.it will it detects","i. this it detects","i.this it detects","i. it can it detects","i.it can it detects","i. used to it detects","i.used to it detects","i. collects","i.collects","i. it collects","i.it collects","i. to collects","i.to collects","i. it is used to collects","i.it is used to collects","i. it will collects","i.it will collects","i. this collects","i.this collects","i. it can collects","i.it can collects","i. used to collects","i.used to collects","i. it collects","i.it collects","i. it it collects","i.it it collects","i. to it collects","i.to it collects","i. it is used to it collects","i.it is used to it collects","i. it will it collects","i.it will it collects","i. this it collects","i.this it collects","i. it can it collects","i.it can it collects","i. used to it collects","i.used to it collects","i. senses","i.senses","i. it senses","i.it senses","i. to senses","i.to senses","i. it is used to senses","i.it is used to senses","i. it will senses","i.it will senses","i. this senses","i.this senses","i. it can senses","i.it can senses","i. used to senses","i.used to senses","i. gathers","i.gathers","i. it gathers","i.it gathers","i. to gathers","i.to gathers","i. it is used to gathers","i.it is used to gathers","i. it will gathers","i.it will gathers","i. this gathers","i.this gathers","i. it can gathers","i.it can gathers","i. used to gathers","i.used to gathers","i. takes","i.takes","i. it takes","i.it takes","i. to takes","i.to takes","i. it is used to takes","i.it is used to takes","i. it will takes","i.it will takes","i. this takes","i.this takes","i. it can takes","i.it can takes","i. used to takes","i.used to takes","i. reads","i.reads","i. it reads","i.it reads","i. to reads","i.to reads","i. it is used to reads","i.it is used to reads","i. it will reads","i.it will reads","i. this reads","i.this reads","i. it can reads","i.it can reads","i. used to reads","i.used to reads","i. monitors","i.monitors","i. it monitors","i.it monitors","i. to monitors","i.to monitors","i. it is used to monitors","i.it is used to monitors","i. it will monitors","i.it will monitors","i. this monitors","i.this monitors","i. it can monitors","i.it can monitors","i. used to monitors","i.used to monitors","i. a sensor measures","i.a sensor measures","i. it a sensor measures","i.it a sensor measures","i. to a sensor measures","i.to a sensor measures","i. it is used to a sensor measures","i.it is used to a sensor measures","i. it will a sensor measures","i.it will a sensor measures","i. this a sensor measures","i.this a sensor measures","i. it can a sensor measures","i.it can a sensor measures","i. used to a sensor measures","i.used to a sensor measures","i. a sensor detects","i.a sensor detects","i. it a sensor detects","i.it a sensor detects","i. to a sensor detects","i.to a sensor detects","i. it is used to a sensor detects","i.it is used to a sensor detects","i. it will a sensor detects","i.it will a sensor detects","i. this a sensor detects","i.this a sensor detects","i. it can a sensor detects","i.it can a sensor detects","i. used to a sensor detects","i.used to a sensor detects","i. records","i.records","i. it records","i.it records","i. to records","i.to records","i. it is used to records","i.it is used to records","i. it will records","i.it will records","i. this records","i.this records","i. it can records","i.it can records","i. used to records","i.used to records"]],"needCount":1} },
            { text: "(ii) An actuator carries out a physical action / movement when it receives a signal from the microprocessor", marks: 1, match: {"type":"keywords","groups":[["(ii) it moves","(ii)it moves","(ii) it it moves","(ii)it it moves","(ii) to it moves","(ii)to it moves","(ii) it is used to it moves","(ii)it is used to it moves","(ii) it will it moves","(ii)it will it moves","(ii) this it moves","(ii)this it moves","(ii) it can it moves","(ii)it can it moves","(ii) used to it moves","(ii)used to it moves","(ii) moves","(ii)moves","(ii) it moves","(ii)it moves","(ii) to moves","(ii)to moves","(ii) it is used to moves","(ii)it is used to moves","(ii) it will moves","(ii)it will moves","(ii) this moves","(ii)this moves","(ii) it can moves","(ii)it can moves","(ii) used to moves","(ii)used to moves","(ii) carries out","(ii)carries out","(ii) it carries out","(ii)it carries out","(ii) to carries out","(ii)to carries out","(ii) it is used to carries out","(ii)it is used to carries out","(ii) it will carries out","(ii)it will carries out","(ii) this carries out","(ii)this carries out","(ii) it can carries out","(ii)it can carries out","(ii) used to carries out","(ii)used to carries out","(ii) it carries out","(ii)it carries out","(ii) it it carries out","(ii)it it carries out","(ii) to it carries out","(ii)to it carries out","(ii) it is used to it carries out","(ii)it is used to it carries out","(ii) it will it carries out","(ii)it will it carries out","(ii) this it carries out","(ii)this it carries out","(ii) it can it carries out","(ii)it can it carries out","(ii) used to it carries out","(ii)used to it carries out","(ii) action","(ii)action","(ii) it action","(ii)it action","(ii) to action","(ii)to action","(ii) it is used to action","(ii)it is used to action","(ii) it will action","(ii)it will action","(ii) this action","(ii)this action","(ii) it can action","(ii)it can action","(ii) used to action","(ii)used to action","(ii) an action","(ii)an action","(ii) it an action","(ii)it an action","(ii) to an action","(ii)to an action","(ii) it is used to an action","(ii)it is used to an action","(ii) it will an action","(ii)it will an action","(ii) this an action","(ii)this an action","(ii) it can an action","(ii)it can an action","(ii) used to an action","(ii)used to an action","(ii) a physical","(ii)a physical","(ii) it a physical","(ii)it a physical","(ii) to a physical","(ii)to a physical","(ii) it is used to a physical","(ii)it is used to a physical","(ii) it will a physical","(ii)it will a physical","(ii) this a physical","(ii)this a physical","(ii) it can a physical","(ii)it can a physical","(ii) used to a physical","(ii)used to a physical","(ii) physical","(ii)physical","(ii) it physical","(ii)it physical","(ii) to physical","(ii)to physical","(ii) it is used to physical","(ii)it is used to physical","(ii) it will physical","(ii)it will physical","(ii) this physical","(ii)this physical","(ii) it can physical","(ii)it can physical","(ii) used to physical","(ii)used to physical","(ii) switches","(ii)switches","(ii) it switches","(ii)it switches","(ii) to switches","(ii)to switches","(ii) it is used to switches","(ii)it is used to switches","(ii) it will switches","(ii)it will switches","(ii) this switches","(ii)this switches","(ii) it can switches","(ii)it can switches","(ii) used to switches","(ii)used to switches","(ii) it switches","(ii)it switches","(ii) it it switches","(ii)it it switches","(ii) to it switches","(ii)to it switches","(ii) it is used to it switches","(ii)it is used to it switches","(ii) it will it switches","(ii)it will it switches","(ii) this it switches","(ii)this it switches","(ii) it can it switches","(ii)it can it switches","(ii) used to it switches","(ii)used to it switches","(ii) turns","(ii)turns","(ii) it turns","(ii)it turns","(ii) to turns","(ii)to turns","(ii) it is used to turns","(ii)it is used to turns","(ii) it will turns","(ii)it will turns","(ii) this turns","(ii)this turns","(ii) it can turns","(ii)it can turns","(ii) used to turns","(ii)used to turns","(ii) it turns","(ii)it turns","(ii) it it turns","(ii)it it turns","(ii) to it turns","(ii)to it turns","(ii) it is used to it turns","(ii)it is used to it turns","(ii) it will it turns","(ii)it will it turns","(ii) this it turns","(ii)this it turns","(ii) it can it turns","(ii)it can it turns","(ii) used to it turns","(ii)used to it turns","(ii) opens","(ii)opens","(ii) it opens","(ii)it opens","(ii) to opens","(ii)to opens","(ii) it is used to opens","(ii)it is used to opens","(ii) it will opens","(ii)it will opens","(ii) this opens","(ii)this opens","(ii) it can opens","(ii)it can opens","(ii) used to opens","(ii)used to opens","(ii) it opens","(ii)it opens","(ii) it it opens","(ii)it it opens","(ii) to it opens","(ii)to it opens","(ii) it is used to it opens","(ii)it is used to it opens","(ii) it will it opens","(ii)it will it opens","(ii) this it opens","(ii)this it opens","(ii) it can it opens","(ii)it can it opens","(ii) used to it opens","(ii)used to it opens","(ii) movement","(ii)movement","(ii) it movement","(ii)it movement","(ii) to movement","(ii)to movement","(ii) it is used to movement","(ii)it is used to movement","(ii) it will movement","(ii)it will movement","(ii) this movement","(ii)this movement","(ii) it can movement","(ii)it can movement","(ii) used to movement","(ii)used to movement","(ii) causes","(ii)causes","(ii) it causes","(ii)it causes","(ii) to causes","(ii)to causes","(ii) it is used to causes","(ii)it is used to causes","(ii) it will causes","(ii)it will causes","(ii) this causes","(ii)this causes","(ii) it can causes","(ii)it can causes","(ii) used to causes","(ii)used to causes","(ii) it causes","(ii)it causes","(ii) it it causes","(ii)it it causes","(ii) to it causes","(ii)to it causes","(ii) it is used to it causes","(ii)it is used to it causes","(ii) it will it causes","(ii)it will it causes","(ii) this it causes","(ii)this it causes","(ii) it can it causes","(ii)it can it causes","(ii) used to it causes","(ii)used to it causes","(ii) performs","(ii)performs","(ii) it performs","(ii)it performs","(ii) to performs","(ii)to performs","(ii) it is used to performs","(ii)it is used to performs","(ii) it will performs","(ii)it will performs","(ii) this performs","(ii)this performs","(ii) it can performs","(ii)it can performs","(ii) used to performs","(ii)used to performs","(ii) it performs","(ii)it performs","(ii) it it performs","(ii)it it performs","(ii) to it performs","(ii)to it performs","(ii) it is used to it performs","(ii)it is used to it performs","(ii) it will it performs","(ii)it will it performs","(ii) this it performs","(ii)this it performs","(ii) it can it performs","(ii)it can it performs","(ii) used to it performs","(ii)used to it performs","(ii) output","(ii)output","(ii) it output","(ii)it output","(ii) to output","(ii)to output","(ii) it is used to output","(ii)it is used to output","(ii) it will output","(ii)it will output","(ii) this output","(ii)this output","(ii) it can output","(ii)it can output","(ii) used to output","(ii)used to output","(ii) receives","(ii)receives","(ii) it receives","(ii)it receives","(ii) to receives","(ii)to receives","(ii) it is used to receives","(ii)it is used to receives","(ii) it will receives","(ii)it will receives","(ii) this receives","(ii)this receives","(ii) it can receives","(ii)it can receives","(ii) used to receives","(ii)used to receives","(ii) it receives","(ii)it receives","(ii) it it receives","(ii)it it receives","(ii) to it receives","(ii)to it receives","(ii) it is used to it receives","(ii)it is used to it receives","(ii) it will it receives","(ii)it will it receives","(ii) this it receives","(ii)this it receives","(ii) it can it receives","(ii)it can it receives","(ii) used to it receives","(ii)used to it receives","(ii) converts","(ii)converts","(ii) it converts","(ii)it converts","(ii) to converts","(ii)to converts","(ii) it is used to converts","(ii)it is used to converts","(ii) it will converts","(ii)it will converts","(ii) this converts","(ii)this converts","(ii) it can converts","(ii)it can converts","(ii) used to converts","(ii)used to converts","(ii) it converts","(ii)it converts","(ii) it it converts","(ii)it it converts","(ii) to it converts","(ii)to it converts","(ii) it is used to it converts","(ii)it is used to it converts","(ii) it will it converts","(ii)it will it converts","(ii) this it converts","(ii)this it converts","(ii) it can it converts","(ii)it can it converts","(ii) used to it converts","(ii)used to it converts","(ii) an actuator","(ii)an actuator","(ii) it an actuator","(ii)it an actuator","(ii) to an actuator","(ii)to an actuator","(ii) it is used to an actuator","(ii)it is used to an actuator","(ii) it will an actuator","(ii)it will an actuator","(ii) this an actuator","(ii)this an actuator","(ii) it can an actuator","(ii)it can an actuator","(ii) used to an actuator","(ii)used to an actuator","ii) it moves","ii)it moves","ii) it it moves","ii)it it moves","ii) to it moves","ii)to it moves","ii) it is used to it moves","ii)it is used to it moves","ii) it will it moves","ii)it will it moves","ii) this it moves","ii)this it moves","ii) it can it moves","ii)it can it moves","ii) used to it moves","ii)used to it moves","ii) moves","ii)moves","ii) it moves","ii)it moves","ii) to moves","ii)to moves","ii) it is used to moves","ii)it is used to moves","ii) it will moves","ii)it will moves","ii) this moves","ii)this moves","ii) it can moves","ii)it can moves","ii) used to moves","ii)used to moves","ii) carries out","ii)carries out","ii) it carries out","ii)it carries out","ii) to carries out","ii)to carries out","ii) it is used to carries out","ii)it is used to carries out","ii) it will carries out","ii)it will carries out","ii) this carries out","ii)this carries out","ii) it can carries out","ii)it can carries out","ii) used to carries out","ii)used to carries out","ii) it carries out","ii)it carries out","ii) it it carries out","ii)it it carries out","ii) to it carries out","ii)to it carries out","ii) it is used to it carries out","ii)it is used to it carries out","ii) it will it carries out","ii)it will it carries out","ii) this it carries out","ii)this it carries out","ii) it can it carries out","ii)it can it carries out","ii) used to it carries out","ii)used to it carries out","ii) action","ii)action","ii) it action","ii)it action","ii) to action","ii)to action","ii) it is used to action","ii)it is used to action","ii) it will action","ii)it will action","ii) this action","ii)this action","ii) it can action","ii)it can action","ii) used to action","ii)used to action","ii) an action","ii)an action","ii) it an action","ii)it an action","ii) to an action","ii)to an action","ii) it is used to an action","ii)it is used to an action","ii) it will an action","ii)it will an action","ii) this an action","ii)this an action","ii) it can an action","ii)it can an action","ii) used to an action","ii)used to an action","ii) a physical","ii)a physical","ii) it a physical","ii)it a physical","ii) to a physical","ii)to a physical","ii) it is used to a physical","ii)it is used to a physical","ii) it will a physical","ii)it will a physical","ii) this a physical","ii)this a physical","ii) it can a physical","ii)it can a physical","ii) used to a physical","ii)used to a physical","ii) physical","ii)physical","ii) it physical","ii)it physical","ii) to physical","ii)to physical","ii) it is used to physical","ii)it is used to physical","ii) it will physical","ii)it will physical","ii) this physical","ii)this physical","ii) it can physical","ii)it can physical","ii) used to physical","ii)used to physical","ii) switches","ii)switches","ii) it switches","ii)it switches","ii) to switches","ii)to switches","ii) it is used to switches","ii)it is used to switches","ii) it will switches","ii)it will switches","ii) this switches","ii)this switches","ii) it can switches","ii)it can switches","ii) used to switches","ii)used to switches","ii) it switches","ii)it switches","ii) it it switches","ii)it it switches","ii) to it switches","ii)to it switches","ii) it is used to it switches","ii)it is used to it switches","ii) it will it switches","ii)it will it switches","ii) this it switches","ii)this it switches","ii) it can it switches","ii)it can it switches","ii) used to it switches","ii)used to it switches","ii) turns","ii)turns","ii) it turns","ii)it turns","ii) to turns","ii)to turns","ii) it is used to turns","ii)it is used to turns","ii) it will turns","ii)it will turns","ii) this turns","ii)this turns","ii) it can turns","ii)it can turns","ii) used to turns","ii)used to turns","ii) it turns","ii)it turns","ii) it it turns","ii)it it turns","ii) to it turns","ii)to it turns","ii) it is used to it turns","ii)it is used to it turns","ii) it will it turns","ii)it will it turns","ii) this it turns","ii)this it turns","ii) it can it turns","ii)it can it turns","ii) used to it turns","ii)used to it turns","ii) opens","ii)opens","ii) it opens","ii)it opens","ii) to opens","ii)to opens","ii) it is used to opens","ii)it is used to opens","ii) it will opens","ii)it will opens","ii) this opens","ii)this opens","ii) it can opens","ii)it can opens","ii) used to opens","ii)used to opens","ii) it opens","ii)it opens","ii) it it opens","ii)it it opens","ii) to it opens","ii)to it opens","ii) it is used to it opens","ii)it is used to it opens","ii) it will it opens","ii)it will it opens","ii) this it opens","ii)this it opens","ii) it can it opens","ii)it can it opens","ii) used to it opens","ii)used to it opens","ii) movement","ii)movement","ii) it movement","ii)it movement","ii) to movement","ii)to movement","ii) it is used to movement","ii)it is used to movement","ii) it will movement","ii)it will movement","ii) this movement","ii)this movement","ii) it can movement","ii)it can movement","ii) used to movement","ii)used to movement","ii) causes","ii)causes","ii) it causes","ii)it causes","ii) to causes","ii)to causes","ii) it is used to causes","ii)it is used to causes","ii) it will causes","ii)it will causes","ii) this causes","ii)this causes","ii) it can causes","ii)it can causes","ii) used to causes","ii)used to causes","ii) it causes","ii)it causes","ii) it it causes","ii)it it causes","ii) to it causes","ii)to it causes","ii) it is used to it causes","ii)it is used to it causes","ii) it will it causes","ii)it will it causes","ii) this it causes","ii)this it causes","ii) it can it causes","ii)it can it causes","ii) used to it causes","ii)used to it causes","ii) performs","ii)performs","ii) it performs","ii)it performs","ii) to performs","ii)to performs","ii) it is used to performs","ii)it is used to performs","ii) it will performs","ii)it will performs","ii) this performs","ii)this performs","ii) it can performs","ii)it can performs","ii) used to performs","ii)used to performs","ii) it performs","ii)it performs","ii) it it performs","ii)it it performs","ii) to it performs","ii)to it performs","ii) it is used to it performs","ii)it is used to it performs","ii) it will it performs","ii)it will it performs","ii) this it performs","ii)this it performs","ii) it can it performs","ii)it can it performs","ii) used to it performs","ii)used to it performs","ii) output","ii)output","ii) it output","ii)it output","ii) to output","ii)to output","ii) it is used to output","ii)it is used to output","ii) it will output","ii)it will output","ii) this output","ii)this output","ii) it can output","ii)it can output","ii) used to output","ii)used to output","ii) receives","ii)receives","ii) it receives","ii)it receives","ii) to receives","ii)to receives","ii) it is used to receives","ii)it is used to receives","ii) it will receives","ii)it will receives","ii) this receives","ii)this receives","ii) it can receives","ii)it can receives","ii) used to receives","ii)used to receives","ii) it receives","ii)it receives","ii) it it receives","ii)it it receives","ii) to it receives","ii)to it receives","ii) it is used to it receives","ii)it is used to it receives","ii) it will it receives","ii)it will it receives","ii) this it receives","ii)this it receives","ii) it can it receives","ii)it can it receives","ii) used to it receives","ii)used to it receives","ii) converts","ii)converts","ii) it converts","ii)it converts","ii) to converts","ii)to converts","ii) it is used to converts","ii)it is used to converts","ii) it will converts","ii)it will converts","ii) this converts","ii)this converts","ii) it can converts","ii)it can converts","ii) used to converts","ii)used to converts","ii) it converts","ii)it converts","ii) it it converts","ii)it it converts","ii) to it converts","ii)to it converts","ii) it is used to it converts","ii)it is used to it converts","ii) it will it converts","ii)it will it converts","ii) this it converts","ii)this it converts","ii) it can it converts","ii)it can it converts","ii) used to it converts","ii)used to it converts","ii) an actuator","ii)an actuator","ii) it an actuator","ii)it an actuator","ii) to an actuator","ii)to an actuator","ii) it is used to an actuator","ii)it is used to an actuator","ii) it will an actuator","ii)it will an actuator","ii) this an actuator","ii)this an actuator","ii) it can an actuator","ii)it can an actuator","ii) used to an actuator","ii)used to an actuator","ii. it moves","ii.it moves","ii. it it moves","ii.it it moves","ii. to it moves","ii.to it moves","ii. it is used to it moves","ii.it is used to it moves","ii. it will it moves","ii.it will it moves","ii. this it moves","ii.this it moves","ii. it can it moves","ii.it can it moves","ii. used to it moves","ii.used to it moves","ii. moves","ii.moves","ii. it moves","ii.it moves","ii. to moves","ii.to moves","ii. it is used to moves","ii.it is used to moves","ii. it will moves","ii.it will moves","ii. this moves","ii.this moves","ii. it can moves","ii.it can moves","ii. used to moves","ii.used to moves","ii. carries out","ii.carries out","ii. it carries out","ii.it carries out","ii. to carries out","ii.to carries out","ii. it is used to carries out","ii.it is used to carries out","ii. it will carries out","ii.it will carries out","ii. this carries out","ii.this carries out","ii. it can carries out","ii.it can carries out","ii. used to carries out","ii.used to carries out","ii. it carries out","ii.it carries out","ii. it it carries out","ii.it it carries out","ii. to it carries out","ii.to it carries out","ii. it is used to it carries out","ii.it is used to it carries out","ii. it will it carries out","ii.it will it carries out","ii. this it carries out","ii.this it carries out","ii. it can it carries out","ii.it can it carries out","ii. used to it carries out","ii.used to it carries out","ii. action","ii.action","ii. it action","ii.it action","ii. to action","ii.to action","ii. it is used to action","ii.it is used to action","ii. it will action","ii.it will action","ii. this action","ii.this action","ii. it can action","ii.it can action","ii. used to action","ii.used to action","ii. an action","ii.an action","ii. it an action","ii.it an action","ii. to an action","ii.to an action","ii. it is used to an action","ii.it is used to an action","ii. it will an action","ii.it will an action","ii. this an action","ii.this an action","ii. it can an action","ii.it can an action","ii. used to an action","ii.used to an action","ii. a physical","ii.a physical","ii. it a physical","ii.it a physical","ii. to a physical","ii.to a physical","ii. it is used to a physical","ii.it is used to a physical","ii. it will a physical","ii.it will a physical","ii. this a physical","ii.this a physical","ii. it can a physical","ii.it can a physical","ii. used to a physical","ii.used to a physical","ii. physical","ii.physical","ii. it physical","ii.it physical","ii. to physical","ii.to physical","ii. it is used to physical","ii.it is used to physical","ii. it will physical","ii.it will physical","ii. this physical","ii.this physical","ii. it can physical","ii.it can physical","ii. used to physical","ii.used to physical","ii. switches","ii.switches","ii. it switches","ii.it switches","ii. to switches","ii.to switches","ii. it is used to switches","ii.it is used to switches","ii. it will switches","ii.it will switches","ii. this switches","ii.this switches","ii. it can switches","ii.it can switches","ii. used to switches","ii.used to switches","ii. it switches","ii.it switches","ii. it it switches","ii.it it switches","ii. to it switches","ii.to it switches","ii. it is used to it switches","ii.it is used to it switches","ii. it will it switches","ii.it will it switches","ii. this it switches","ii.this it switches","ii. it can it switches","ii.it can it switches","ii. used to it switches","ii.used to it switches","ii. turns","ii.turns","ii. it turns","ii.it turns","ii. to turns","ii.to turns","ii. it is used to turns","ii.it is used to turns","ii. it will turns","ii.it will turns","ii. this turns","ii.this turns","ii. it can turns","ii.it can turns","ii. used to turns","ii.used to turns","ii. it turns","ii.it turns","ii. it it turns","ii.it it turns","ii. to it turns","ii.to it turns","ii. it is used to it turns","ii.it is used to it turns","ii. it will it turns","ii.it will it turns","ii. this it turns","ii.this it turns","ii. it can it turns","ii.it can it turns","ii. used to it turns","ii.used to it turns","ii. opens","ii.opens","ii. it opens","ii.it opens","ii. to opens","ii.to opens","ii. it is used to opens","ii.it is used to opens","ii. it will opens","ii.it will opens","ii. this opens","ii.this opens","ii. it can opens","ii.it can opens","ii. used to opens","ii.used to opens","ii. it opens","ii.it opens","ii. it it opens","ii.it it opens","ii. to it opens","ii.to it opens","ii. it is used to it opens","ii.it is used to it opens","ii. it will it opens","ii.it will it opens","ii. this it opens","ii.this it opens","ii. it can it opens","ii.it can it opens","ii. used to it opens","ii.used to it opens","ii. movement","ii.movement","ii. it movement","ii.it movement","ii. to movement","ii.to movement","ii. it is used to movement","ii.it is used to movement","ii. it will movement","ii.it will movement","ii. this movement","ii.this movement","ii. it can movement","ii.it can movement","ii. used to movement","ii.used to movement","ii. causes","ii.causes","ii. it causes","ii.it causes","ii. to causes","ii.to causes","ii. it is used to causes","ii.it is used to causes","ii. it will causes","ii.it will causes","ii. this causes","ii.this causes","ii. it can causes","ii.it can causes","ii. used to causes","ii.used to causes","ii. it causes","ii.it causes","ii. it it causes","ii.it it causes","ii. to it causes","ii.to it causes","ii. it is used to it causes","ii.it is used to it causes","ii. it will it causes","ii.it will it causes","ii. this it causes","ii.this it causes","ii. it can it causes","ii.it can it causes","ii. used to it causes","ii.used to it causes","ii. performs","ii.performs","ii. it performs","ii.it performs","ii. to performs","ii.to performs","ii. it is used to performs","ii.it is used to performs","ii. it will performs","ii.it will performs","ii. this performs","ii.this performs","ii. it can performs","ii.it can performs","ii. used to performs","ii.used to performs","ii. it performs","ii.it performs","ii. it it performs","ii.it it performs","ii. to it performs","ii.to it performs","ii. it is used to it performs","ii.it is used to it performs","ii. it will it performs","ii.it will it performs","ii. this it performs","ii.this it performs","ii. it can it performs","ii.it can it performs","ii. used to it performs","ii.used to it performs","ii. output","ii.output","ii. it output","ii.it output","ii. to output","ii.to output","ii. it is used to output","ii.it is used to output","ii. it will output","ii.it will output","ii. this output","ii.this output","ii. it can output","ii.it can output","ii. used to output","ii.used to output","ii. receives","ii.receives","ii. it receives","ii.it receives","ii. to receives","ii.to receives","ii. it is used to receives","ii.it is used to receives","ii. it will receives","ii.it will receives","ii. this receives","ii.this receives","ii. it can receives","ii.it can receives","ii. used to receives","ii.used to receives","ii. it receives","ii.it receives","ii. it it receives","ii.it it receives","ii. to it receives","ii.to it receives","ii. it is used to it receives","ii.it is used to it receives","ii. it will it receives","ii.it will it receives","ii. this it receives","ii.this it receives","ii. it can it receives","ii.it can it receives","ii. used to it receives","ii.used to it receives","ii. converts","ii.converts","ii. it converts","ii.it converts","ii. to converts","ii.to converts","ii. it is used to converts","ii.it is used to converts","ii. it will converts","ii.it will converts","ii. this converts","ii.this converts","ii. it can converts","ii.it can converts","ii. used to converts","ii.used to converts","ii. it converts","ii.it converts","ii. it it converts","ii.it it converts","ii. to it converts","ii.to it converts","ii. it is used to it converts","ii.it is used to it converts","ii. it will it converts","ii.it will it converts","ii. this it converts","ii.this it converts","ii. it can it converts","ii.it can it converts","ii. used to it converts","ii.used to it converts","ii. an actuator","ii.an actuator","ii. it an actuator","ii.it an actuator","ii. to an actuator","ii.to an actuator","ii. it is used to an actuator","ii.it is used to an actuator","ii. it will an actuator","ii.it will an actuator","ii. this an actuator","ii.this an actuator","ii. it can an actuator","ii.it can an actuator","ii. used to an actuator","ii.used to an actuator"]],"needCount":1} }
          ],
          explanation: "(i) A sensor measures a physical property, such as temperature, and sends the data to the microprocessor. (ii) An actuator receives a signal from the microprocessor and carries out a physical action, such as switching on a heater or opening a valve."
        },
        {
          id: "Q2", syl: ["6.1.1"], marks: 3, difficulty: "intermediate",
          topic: "Automated Systems",
          prompt: "An automated greenhouse keeps its temperature at 22 °C. Describe how a sensor, a microprocessor and an actuator work together to do this. [3 marks]",
          markPoints: [
            { text: "The sensor measures the temperature and sends the data to the microprocessor", marks: 1, match: {"type":"keywords","groups":[["sensor"],["microprocessor"]],"needCount":2} },
            { text: "The microprocessor compares the temperature with the stored value (22 °C)", marks: 1, match: {"type":"keywords","groups":[["compare","compares","stored","22","checks","pre-set","preset","set value","threshold","target"]],"needCount":1} },
            { text: "The microprocessor sends a signal to an actuator, which switches the heater on / off or opens / closes a window", marks: 1, match: {"type":"keywords","groups":[["actuator"],["heater","window","fan","vent","switch","turn","open","motor","close"]],"needCount":2} }
          ],
          explanation: "The sensor measures the temperature and sends it to the microprocessor. The microprocessor compares it with the stored value of 22 °C. It then sends a signal to an actuator, which switches the heater on or off, or opens or closes a window. This is repeated continuously."
        },
        {
          id: "Q3", syl: ["6.1.2"], marks: 2, difficulty: "intermediate",
          topic: "Automated Systems",
          prompt: "A farm uses an automated irrigation (watering) system. Give ONE advantage and ONE disadvantage of using this system. [2 marks]",
          markPoints: [
            { text: "One advantage, for example: it works all day and night without a person; it saves time or labour; it uses the right amount of water", marks: 1, match: {"type":"keywords","groups":[["without a","24","all day","no need","any time","anytime","save time","saves time","save water","saves water","accurate","consistent","fewer workers","less labour","efficient","automatic","precise","do not need","don't need","not need to","less water","right amount","night"]],"needCount":1} },
            { text: "One disadvantage, for example: it is expensive to buy and install; a fault could cause crops to be over-watered or not watered; it may replace jobs", marks: 1, match: {"type":"keywords","groups":[["cost","expensive","fault","fail","break","malfunction","power","jobs","job","unemployment","maintenance","repair","electricity","hacked","wrong","sensor"]],"needCount":1} }
          ],
          explanation: "Advantage: it can water the crops at any time without a person being present, saving time and labour. Disadvantage: it is expensive to buy and install, and a fault could cause the crops to be over-watered or not watered."
        },
        {
          id: "Q4", syl: ["6.2.1"], marks: 2, difficulty: "easy",
          topic: "Robotics",
          prompt: "(a) State what is meant by robotics. [1 mark]\n(b) Give one example of a robot. [1 mark]",
          markPoints: [
            { text: "(a) A branch of computer science that includes the design, construction and operation of robots", marks: 1, match: {"type":"keywords","groups":[["design","construction","operation","branch of computer science","building","building robots","making robots","develop"]],"needCount":1} },
            { text: "(b) For example: factory equipment, a domestic robot, a drone", marks: 1, match: {"type":"keywords","groups":[["drone","factory","vacuum","domestic","robot arm","robotic arm","assembly","welding","spray","surgery","toy","hoover","lawn","arm","car production","manufactur"]],"needCount":1} }
          ],
          explanation: "(a) Robotics is a branch of computer science that incorporates the design, construction and operation of robots. (b) Examples include factory equipment, domestic robots and drones."
        },
        {
          id: "Q5", syl: ["6.2.2"], marks: 3, difficulty: "easy",
          topic: "Robotics",
          prompt: "Describe three characteristics of a robot. [3 marks]",
          markPoints: [
            { text: "Three characteristics: it has a mechanical structure / framework; it has electrical components such as sensors, microprocessors and actuators; it is programmable", marks: 3, match: {"type":"keywords","groups":[["mechanical","framework","structure","frame","body"],["electrical","sensor","microprocessor","actuator","circuit","electronic"],["programmable","program","instructions","programmed"]],"needCount":3,"marksPerGroup":1} }
          ],
          explanation: "A robot has a mechanical structure or framework, it has electrical components such as sensors, microprocessors and actuators, and it is programmable."
        },
        {
          id: "Q6", syl: ["6.2.3"], marks: 3, difficulty: "intermediate",
          topic: "Robotics",
          prompt: "A car factory uses robots to build cars. Give TWO advantages and ONE disadvantage of using robots in the factory. [3 marks]",
          markPoints: [
            { text: "Two advantages, for example: they can work for long periods without breaks; they are accurate / consistent; they can do dangerous tasks; they are faster", marks: 2, match: {"type":"keywords","groups":[["without break","without a break","24","all day","non-stop","nonstop","continuous","long periods","no breaks","do not get tired","never get tired"],["accurate","consistent","precise","same quality","same standard","exactly","repeat","mistakes","errors"],["danger","safer","safe","heavy","hazard","risk"],["faster","quicker","speed","fast","quick"],["no wages","cheaper","save money","saves money","cost less","long run"]],"needCount":2,"marksPerGroup":1} },
            { text: "One disadvantage, for example: expensive to buy / maintain; workers may lose their jobs; a fault can stop production", marks: 1, match: {"type":"keywords","groups":[["expensive","cost","jobs","unemployment","fault","break","breaks down","repair","maintenance","cannot","can't","only do","programmed","power","electricity","lose","redundan"]],"needCount":1} }
          ],
          explanation: "Advantages: robots can work for long periods without breaks, are accurate and consistent, can do dangerous or heavy tasks and are fast. Disadvantages: they are expensive to buy and maintain, workers may lose their jobs, and a fault can stop production."
        },
        {
          id: "Q7", syl: ["6.3.1","6.3.2"], marks: 2, difficulty: "easy",
          topic: "Artificial Intelligence",
          prompt: "(a) State what is meant by artificial intelligence (AI). [1 mark]\n(b) State one characteristic of AI. [1 mark]",
          markPoints: [
            { text: "(a) A branch of computer science that simulates intelligent behaviour in computers", marks: 1, match: {"type":"keywords","groups":[["simulat","intelligent","intelligence","human","think","mimic","imitate","branch of computer science","machines"]],"needCount":1} },
            { text: "(b) For example: collection of data and rules for using it; the ability to reason; the ability to learn and adapt", marks: 1, match: {"type":"keywords","groups":[["learn","adapt","reason","data","rules","collect"]],"needCount":1} }
          ],
          explanation: "(a) AI is a branch of computer science dealing with the simulation of intelligent behaviours by computers. (b) AI is the collection of data and the rules for using that data, the ability to reason, and it can include the ability to learn and adapt."
        },
        {
          id: "Q8", syl: ["6.3.3"], marks: 4, difficulty: "hard",
          topic: "Expert Systems",
          prompt: "An expert system has four components. State the purpose of each component. Give your answers as (i) to (iv). [4 marks]\n(i) the knowledge base\n(ii) the rule base\n(iii) the inference engine\n(iv) the interface",
          markPoints: [
            { text: "(i) Knowledge base: stores the facts / data about the subject", marks: 1, match: {"type":"keywords","groups":[["(i) facts","(i)facts","(i) it facts","(i)it facts","(i) to facts","(i)to facts","(i) it is used to facts","(i)it is used to facts","(i) it will facts","(i)it will facts","(i) this facts","(i)this facts","(i) it can facts","(i)it can facts","(i) used to facts","(i)used to facts","(i) data","(i)data","(i) it data","(i)it data","(i) to data","(i)to data","(i) it is used to data","(i)it is used to data","(i) it will data","(i)it will data","(i) this data","(i)this data","(i) it can data","(i)it can data","(i) used to data","(i)used to data","(i) information","(i)information","(i) it information","(i)it information","(i) to information","(i)to information","(i) it is used to information","(i)it is used to information","(i) it will information","(i)it will information","(i) this information","(i)this information","(i) it can information","(i)it can information","(i) used to information","(i)used to information","(i) database","(i)database","(i) it database","(i)it database","(i) to database","(i)to database","(i) it is used to database","(i)it is used to database","(i) it will database","(i)it will database","(i) this database","(i)this database","(i) it can database","(i)it can database","(i) used to database","(i)used to database","(i) stores","(i)stores","(i) it stores","(i)it stores","(i) to stores","(i)to stores","(i) it is used to stores","(i)it is used to stores","(i) it will stores","(i)it will stores","(i) this stores","(i)this stores","(i) it can stores","(i)it can stores","(i) used to stores","(i)used to stores","(i) holds","(i)holds","(i) it holds","(i)it holds","(i) to holds","(i)to holds","(i) it is used to holds","(i)it is used to holds","(i) it will holds","(i)it will holds","(i) this holds","(i)this holds","(i) it can holds","(i)it can holds","(i) used to holds","(i)used to holds","(i) contains","(i)contains","(i) it contains","(i)it contains","(i) to contains","(i)to contains","(i) it is used to contains","(i)it is used to contains","(i) it will contains","(i)it will contains","(i) this contains","(i)this contains","(i) it can contains","(i)it can contains","(i) used to contains","(i)used to contains","(i) collection","(i)collection","(i) it collection","(i)it collection","(i) to collection","(i)to collection","(i) it is used to collection","(i)it is used to collection","(i) it will collection","(i)it will collection","(i) this collection","(i)this collection","(i) it can collection","(i)it can collection","(i) used to collection","(i)used to collection","(i) the facts","(i)the facts","(i) it the facts","(i)it the facts","(i) to the facts","(i)to the facts","(i) it is used to the facts","(i)it is used to the facts","(i) it will the facts","(i)it will the facts","(i) this the facts","(i)this the facts","(i) it can the facts","(i)it can the facts","(i) used to the facts","(i)used to the facts","(i) a database","(i)a database","(i) it a database","(i)it a database","(i) to a database","(i)to a database","(i) it is used to a database","(i)it is used to a database","(i) it will a database","(i)it will a database","(i) this a database","(i)this a database","(i) it can a database","(i)it can a database","(i) used to a database","(i)used to a database","(i) a collection","(i)a collection","(i) it a collection","(i)it a collection","(i) to a collection","(i)to a collection","(i) it is used to a collection","(i)it is used to a collection","(i) it will a collection","(i)it will a collection","(i) this a collection","(i)this a collection","(i) it can a collection","(i)it can a collection","(i) used to a collection","(i)used to a collection","i) facts","i)facts","i) it facts","i)it facts","i) to facts","i)to facts","i) it is used to facts","i)it is used to facts","i) it will facts","i)it will facts","i) this facts","i)this facts","i) it can facts","i)it can facts","i) used to facts","i)used to facts","i) data","i)data","i) it data","i)it data","i) to data","i)to data","i) it is used to data","i)it is used to data","i) it will data","i)it will data","i) this data","i)this data","i) it can data","i)it can data","i) used to data","i)used to data","i) information","i)information","i) it information","i)it information","i) to information","i)to information","i) it is used to information","i)it is used to information","i) it will information","i)it will information","i) this information","i)this information","i) it can information","i)it can information","i) used to information","i)used to information","i) database","i)database","i) it database","i)it database","i) to database","i)to database","i) it is used to database","i)it is used to database","i) it will database","i)it will database","i) this database","i)this database","i) it can database","i)it can database","i) used to database","i)used to database","i) stores","i)stores","i) it stores","i)it stores","i) to stores","i)to stores","i) it is used to stores","i)it is used to stores","i) it will stores","i)it will stores","i) this stores","i)this stores","i) it can stores","i)it can stores","i) used to stores","i)used to stores","i) holds","i)holds","i) it holds","i)it holds","i) to holds","i)to holds","i) it is used to holds","i)it is used to holds","i) it will holds","i)it will holds","i) this holds","i)this holds","i) it can holds","i)it can holds","i) used to holds","i)used to holds","i) contains","i)contains","i) it contains","i)it contains","i) to contains","i)to contains","i) it is used to contains","i)it is used to contains","i) it will contains","i)it will contains","i) this contains","i)this contains","i) it can contains","i)it can contains","i) used to contains","i)used to contains","i) collection","i)collection","i) it collection","i)it collection","i) to collection","i)to collection","i) it is used to collection","i)it is used to collection","i) it will collection","i)it will collection","i) this collection","i)this collection","i) it can collection","i)it can collection","i) used to collection","i)used to collection","i) the facts","i)the facts","i) it the facts","i)it the facts","i) to the facts","i)to the facts","i) it is used to the facts","i)it is used to the facts","i) it will the facts","i)it will the facts","i) this the facts","i)this the facts","i) it can the facts","i)it can the facts","i) used to the facts","i)used to the facts","i) a database","i)a database","i) it a database","i)it a database","i) to a database","i)to a database","i) it is used to a database","i)it is used to a database","i) it will a database","i)it will a database","i) this a database","i)this a database","i) it can a database","i)it can a database","i) used to a database","i)used to a database","i) a collection","i)a collection","i) it a collection","i)it a collection","i) to a collection","i)to a collection","i) it is used to a collection","i)it is used to a collection","i) it will a collection","i)it will a collection","i) this a collection","i)this a collection","i) it can a collection","i)it can a collection","i) used to a collection","i)used to a collection","i. facts","i.facts","i. it facts","i.it facts","i. to facts","i.to facts","i. it is used to facts","i.it is used to facts","i. it will facts","i.it will facts","i. this facts","i.this facts","i. it can facts","i.it can facts","i. used to facts","i.used to facts","i. data","i.data","i. it data","i.it data","i. to data","i.to data","i. it is used to data","i.it is used to data","i. it will data","i.it will data","i. this data","i.this data","i. it can data","i.it can data","i. used to data","i.used to data","i. information","i.information","i. it information","i.it information","i. to information","i.to information","i. it is used to information","i.it is used to information","i. it will information","i.it will information","i. this information","i.this information","i. it can information","i.it can information","i. used to information","i.used to information","i. database","i.database","i. it database","i.it database","i. to database","i.to database","i. it is used to database","i.it is used to database","i. it will database","i.it will database","i. this database","i.this database","i. it can database","i.it can database","i. used to database","i.used to database","i. stores","i.stores","i. it stores","i.it stores","i. to stores","i.to stores","i. it is used to stores","i.it is used to stores","i. it will stores","i.it will stores","i. this stores","i.this stores","i. it can stores","i.it can stores","i. used to stores","i.used to stores","i. holds","i.holds","i. it holds","i.it holds","i. to holds","i.to holds","i. it is used to holds","i.it is used to holds","i. it will holds","i.it will holds","i. this holds","i.this holds","i. it can holds","i.it can holds","i. used to holds","i.used to holds","i. contains","i.contains","i. it contains","i.it contains","i. to contains","i.to contains","i. it is used to contains","i.it is used to contains","i. it will contains","i.it will contains","i. this contains","i.this contains","i. it can contains","i.it can contains","i. used to contains","i.used to contains","i. collection","i.collection","i. it collection","i.it collection","i. to collection","i.to collection","i. it is used to collection","i.it is used to collection","i. it will collection","i.it will collection","i. this collection","i.this collection","i. it can collection","i.it can collection","i. used to collection","i.used to collection","i. the facts","i.the facts","i. it the facts","i.it the facts","i. to the facts","i.to the facts","i. it is used to the facts","i.it is used to the facts","i. it will the facts","i.it will the facts","i. this the facts","i.this the facts","i. it can the facts","i.it can the facts","i. used to the facts","i.used to the facts","i. a database","i.a database","i. it a database","i.it a database","i. to a database","i.to a database","i. it is used to a database","i.it is used to a database","i. it will a database","i.it will a database","i. this a database","i.this a database","i. it can a database","i.it can a database","i. used to a database","i.used to a database","i. a collection","i.a collection","i. it a collection","i.it a collection","i. to a collection","i.to a collection","i. it is used to a collection","i.it is used to a collection","i. it will a collection","i.it will a collection","i. this a collection","i.this a collection","i. it can a collection","i.it can a collection","i. used to a collection","i.used to a collection"]],"needCount":1} },
            { text: "(ii) Rule base: stores the rules used to reach a conclusion", marks: 1, match: {"type":"keywords","groups":[["(ii) rules","(ii)rules","(ii) it rules","(ii)it rules","(ii) to rules","(ii)to rules","(ii) it is used to rules","(ii)it is used to rules","(ii) it will rules","(ii)it will rules","(ii) this rules","(ii)this rules","(ii) it can rules","(ii)it can rules","(ii) used to rules","(ii)used to rules","(ii) the rules","(ii)the rules","(ii) it the rules","(ii)it the rules","(ii) to the rules","(ii)to the rules","(ii) it is used to the rules","(ii)it is used to the rules","(ii) it will the rules","(ii)it will the rules","(ii) this the rules","(ii)this the rules","(ii) it can the rules","(ii)it can the rules","(ii) used to the rules","(ii)used to the rules","(ii) if","(ii)if","(ii) it if","(ii)it if","(ii) to if","(ii)to if","(ii) it is used to if","(ii)it is used to if","(ii) it will if","(ii)it will if","(ii) this if","(ii)this if","(ii) it can if","(ii)it can if","(ii) used to if","(ii)used to if","(ii) conditions","(ii)conditions","(ii) it conditions","(ii)it conditions","(ii) to conditions","(ii)to conditions","(ii) it is used to conditions","(ii)it is used to conditions","(ii) it will conditions","(ii)it will conditions","(ii) this conditions","(ii)this conditions","(ii) it can conditions","(ii)it can conditions","(ii) used to conditions","(ii)used to conditions","(ii) set of rules","(ii)set of rules","(ii) it set of rules","(ii)it set of rules","(ii) to set of rules","(ii)to set of rules","(ii) it is used to set of rules","(ii)it is used to set of rules","(ii) it will set of rules","(ii)it will set of rules","(ii) this set of rules","(ii)this set of rules","(ii) it can set of rules","(ii)it can set of rules","(ii) used to set of rules","(ii)used to set of rules","(ii) list of rules","(ii)list of rules","(ii) it list of rules","(ii)it list of rules","(ii) to list of rules","(ii)to list of rules","(ii) it is used to list of rules","(ii)it is used to list of rules","(ii) it will list of rules","(ii)it will list of rules","(ii) this list of rules","(ii)this list of rules","(ii) it can list of rules","(ii)it can list of rules","(ii) used to list of rules","(ii)used to list of rules","(ii) a set","(ii)a set","(ii) it a set","(ii)it a set","(ii) to a set","(ii)to a set","(ii) it is used to a set","(ii)it is used to a set","(ii) it will a set","(ii)it will a set","(ii) this a set","(ii)this a set","(ii) it can a set","(ii)it can a set","(ii) used to a set","(ii)used to a set","(ii) stores","(ii)stores","(ii) it stores","(ii)it stores","(ii) to stores","(ii)to stores","(ii) it is used to stores","(ii)it is used to stores","(ii) it will stores","(ii)it will stores","(ii) this stores","(ii)this stores","(ii) it can stores","(ii)it can stores","(ii) used to stores","(ii)used to stores","(ii) holds","(ii)holds","(ii) it holds","(ii)it holds","(ii) to holds","(ii)to holds","(ii) it is used to holds","(ii)it is used to holds","(ii) it will holds","(ii)it will holds","(ii) this holds","(ii)this holds","(ii) it can holds","(ii)it can holds","(ii) used to holds","(ii)used to holds","(ii) contains","(ii)contains","(ii) it contains","(ii)it contains","(ii) to contains","(ii)to contains","(ii) it is used to contains","(ii)it is used to contains","(ii) it will contains","(ii)it will contains","(ii) this contains","(ii)this contains","(ii) it can contains","(ii)it can contains","(ii) used to contains","(ii)used to contains","ii) rules","ii)rules","ii) it rules","ii)it rules","ii) to rules","ii)to rules","ii) it is used to rules","ii)it is used to rules","ii) it will rules","ii)it will rules","ii) this rules","ii)this rules","ii) it can rules","ii)it can rules","ii) used to rules","ii)used to rules","ii) the rules","ii)the rules","ii) it the rules","ii)it the rules","ii) to the rules","ii)to the rules","ii) it is used to the rules","ii)it is used to the rules","ii) it will the rules","ii)it will the rules","ii) this the rules","ii)this the rules","ii) it can the rules","ii)it can the rules","ii) used to the rules","ii)used to the rules","ii) if","ii)if","ii) it if","ii)it if","ii) to if","ii)to if","ii) it is used to if","ii)it is used to if","ii) it will if","ii)it will if","ii) this if","ii)this if","ii) it can if","ii)it can if","ii) used to if","ii)used to if","ii) conditions","ii)conditions","ii) it conditions","ii)it conditions","ii) to conditions","ii)to conditions","ii) it is used to conditions","ii)it is used to conditions","ii) it will conditions","ii)it will conditions","ii) this conditions","ii)this conditions","ii) it can conditions","ii)it can conditions","ii) used to conditions","ii)used to conditions","ii) set of rules","ii)set of rules","ii) it set of rules","ii)it set of rules","ii) to set of rules","ii)to set of rules","ii) it is used to set of rules","ii)it is used to set of rules","ii) it will set of rules","ii)it will set of rules","ii) this set of rules","ii)this set of rules","ii) it can set of rules","ii)it can set of rules","ii) used to set of rules","ii)used to set of rules","ii) list of rules","ii)list of rules","ii) it list of rules","ii)it list of rules","ii) to list of rules","ii)to list of rules","ii) it is used to list of rules","ii)it is used to list of rules","ii) it will list of rules","ii)it will list of rules","ii) this list of rules","ii)this list of rules","ii) it can list of rules","ii)it can list of rules","ii) used to list of rules","ii)used to list of rules","ii) a set","ii)a set","ii) it a set","ii)it a set","ii) to a set","ii)to a set","ii) it is used to a set","ii)it is used to a set","ii) it will a set","ii)it will a set","ii) this a set","ii)this a set","ii) it can a set","ii)it can a set","ii) used to a set","ii)used to a set","ii) stores","ii)stores","ii) it stores","ii)it stores","ii) to stores","ii)to stores","ii) it is used to stores","ii)it is used to stores","ii) it will stores","ii)it will stores","ii) this stores","ii)this stores","ii) it can stores","ii)it can stores","ii) used to stores","ii)used to stores","ii) holds","ii)holds","ii) it holds","ii)it holds","ii) to holds","ii)to holds","ii) it is used to holds","ii)it is used to holds","ii) it will holds","ii)it will holds","ii) this holds","ii)this holds","ii) it can holds","ii)it can holds","ii) used to holds","ii)used to holds","ii) contains","ii)contains","ii) it contains","ii)it contains","ii) to contains","ii)to contains","ii) it is used to contains","ii)it is used to contains","ii) it will contains","ii)it will contains","ii) this contains","ii)this contains","ii) it can contains","ii)it can contains","ii) used to contains","ii)used to contains","ii. rules","ii.rules","ii. it rules","ii.it rules","ii. to rules","ii.to rules","ii. it is used to rules","ii.it is used to rules","ii. it will rules","ii.it will rules","ii. this rules","ii.this rules","ii. it can rules","ii.it can rules","ii. used to rules","ii.used to rules","ii. the rules","ii.the rules","ii. it the rules","ii.it the rules","ii. to the rules","ii.to the rules","ii. it is used to the rules","ii.it is used to the rules","ii. it will the rules","ii.it will the rules","ii. this the rules","ii.this the rules","ii. it can the rules","ii.it can the rules","ii. used to the rules","ii.used to the rules","ii. if","ii.if","ii. it if","ii.it if","ii. to if","ii.to if","ii. it is used to if","ii.it is used to if","ii. it will if","ii.it will if","ii. this if","ii.this if","ii. it can if","ii.it can if","ii. used to if","ii.used to if","ii. conditions","ii.conditions","ii. it conditions","ii.it conditions","ii. to conditions","ii.to conditions","ii. it is used to conditions","ii.it is used to conditions","ii. it will conditions","ii.it will conditions","ii. this conditions","ii.this conditions","ii. it can conditions","ii.it can conditions","ii. used to conditions","ii.used to conditions","ii. set of rules","ii.set of rules","ii. it set of rules","ii.it set of rules","ii. to set of rules","ii.to set of rules","ii. it is used to set of rules","ii.it is used to set of rules","ii. it will set of rules","ii.it will set of rules","ii. this set of rules","ii.this set of rules","ii. it can set of rules","ii.it can set of rules","ii. used to set of rules","ii.used to set of rules","ii. list of rules","ii.list of rules","ii. it list of rules","ii.it list of rules","ii. to list of rules","ii.to list of rules","ii. it is used to list of rules","ii.it is used to list of rules","ii. it will list of rules","ii.it will list of rules","ii. this list of rules","ii.this list of rules","ii. it can list of rules","ii.it can list of rules","ii. used to list of rules","ii.used to list of rules","ii. a set","ii.a set","ii. it a set","ii.it a set","ii. to a set","ii.to a set","ii. it is used to a set","ii.it is used to a set","ii. it will a set","ii.it will a set","ii. this a set","ii.this a set","ii. it can a set","ii.it can a set","ii. used to a set","ii.used to a set","ii. stores","ii.stores","ii. it stores","ii.it stores","ii. to stores","ii.to stores","ii. it is used to stores","ii.it is used to stores","ii. it will stores","ii.it will stores","ii. this stores","ii.this stores","ii. it can stores","ii.it can stores","ii. used to stores","ii.used to stores","ii. holds","ii.holds","ii. it holds","ii.it holds","ii. to holds","ii.to holds","ii. it is used to holds","ii.it is used to holds","ii. it will holds","ii.it will holds","ii. this holds","ii.this holds","ii. it can holds","ii.it can holds","ii. used to holds","ii.used to holds","ii. contains","ii.contains","ii. it contains","ii.it contains","ii. to contains","ii.to contains","ii. it is used to contains","ii.it is used to contains","ii. it will contains","ii.it will contains","ii. this contains","ii.this contains","ii. it can contains","ii.it can contains","ii. used to contains","ii.used to contains"]],"needCount":1} },
            { text: "(iii) Inference engine: applies the rules to the facts to reach a conclusion", marks: 1, match: {"type":"keywords","groups":[["(iii) reason","(iii)reason","(iii) it reason","(iii)it reason","(iii) to reason","(iii)to reason","(iii) it is used to reason","(iii)it is used to reason","(iii) it will reason","(iii)it will reason","(iii) this reason","(iii)this reason","(iii) it can reason","(iii)it can reason","(iii) used to reason","(iii)used to reason","(iii) applies","(iii)applies","(iii) it applies","(iii)it applies","(iii) to applies","(iii)to applies","(iii) it is used to applies","(iii)it is used to applies","(iii) it will applies","(iii)it will applies","(iii) this applies","(iii)this applies","(iii) it can applies","(iii)it can applies","(iii) used to applies","(iii)used to applies","(iii) apply","(iii)apply","(iii) it apply","(iii)it apply","(iii) to apply","(iii)to apply","(iii) it is used to apply","(iii)it is used to apply","(iii) it will apply","(iii)it will apply","(iii) this apply","(iii)this apply","(iii) it can apply","(iii)it can apply","(iii) used to apply","(iii)used to apply","(iii) uses the rules","(iii)uses the rules","(iii) it uses the rules","(iii)it uses the rules","(iii) to uses the rules","(iii)to uses the rules","(iii) it is used to uses the rules","(iii)it is used to uses the rules","(iii) it will uses the rules","(iii)it will uses the rules","(iii) this uses the rules","(iii)this uses the rules","(iii) it can uses the rules","(iii)it can uses the rules","(iii) used to uses the rules","(iii)used to uses the rules","(iii) uses","(iii)uses","(iii) it uses","(iii)it uses","(iii) to uses","(iii)to uses","(iii) it is used to uses","(iii)it is used to uses","(iii) it will uses","(iii)it will uses","(iii) this uses","(iii)this uses","(iii) it can uses","(iii)it can uses","(iii) used to uses","(iii)used to uses","(iii) searches","(iii)searches","(iii) it searches","(iii)it searches","(iii) to searches","(iii)to searches","(iii) it is used to searches","(iii)it is used to searches","(iii) it will searches","(iii)it will searches","(iii) this searches","(iii)this searches","(iii) it can searches","(iii)it can searches","(iii) used to searches","(iii)used to searches","(iii) conclusion","(iii)conclusion","(iii) it conclusion","(iii)it conclusion","(iii) to conclusion","(iii)to conclusion","(iii) it is used to conclusion","(iii)it is used to conclusion","(iii) it will conclusion","(iii)it will conclusion","(iii) this conclusion","(iii)this conclusion","(iii) it can conclusion","(iii)it can conclusion","(iii) used to conclusion","(iii)used to conclusion","(iii) decision","(iii)decision","(iii) it decision","(iii)it decision","(iii) to decision","(iii)to decision","(iii) it is used to decision","(iii)it is used to decision","(iii) it will decision","(iii)it will decision","(iii) this decision","(iii)this decision","(iii) it can decision","(iii)it can decision","(iii) used to decision","(iii)used to decision","(iii) infer","(iii)infer","(iii) it infer","(iii)it infer","(iii) to infer","(iii)to infer","(iii) it is used to infer","(iii)it is used to infer","(iii) it will infer","(iii)it will infer","(iii) this infer","(iii)this infer","(iii) it can infer","(iii)it can infer","(iii) used to infer","(iii)used to infer","(iii) match","(iii)match","(iii) it match","(iii)it match","(iii) to match","(iii)to match","(iii) it is used to match","(iii)it is used to match","(iii) it will match","(iii)it will match","(iii) this match","(iii)this match","(iii) it can match","(iii)it can match","(iii) used to match","(iii)used to match","(iii) compare","(iii)compare","(iii) it compare","(iii)it compare","(iii) to compare","(iii)to compare","(iii) it is used to compare","(iii)it is used to compare","(iii) it will compare","(iii)it will compare","(iii) this compare","(iii)this compare","(iii) it can compare","(iii)it can compare","(iii) used to compare","(iii)used to compare","(iii) processes","(iii)processes","(iii) it processes","(iii)it processes","(iii) to processes","(iii)to processes","(iii) it is used to processes","(iii)it is used to processes","(iii) it will processes","(iii)it will processes","(iii) this processes","(iii)this processes","(iii) it can processes","(iii)it can processes","(iii) used to processes","(iii)used to processes","(iii) the part that","(iii)the part that","(iii) it the part that","(iii)it the part that","(iii) to the part that","(iii)to the part that","(iii) it is used to the part that","(iii)it is used to the part that","(iii) it will the part that","(iii)it will the part that","(iii) this the part that","(iii)this the part that","(iii) it can the part that","(iii)it can the part that","(iii) used to the part that","(iii)used to the part that","(iii) it uses","(iii)it uses","(iii) it it uses","(iii)it it uses","(iii) to it uses","(iii)to it uses","(iii) it is used to it uses","(iii)it is used to it uses","(iii) it will it uses","(iii)it will it uses","(iii) this it uses","(iii)this it uses","(iii) it can it uses","(iii)it can it uses","(iii) used to it uses","(iii)used to it uses","(iii) it applies","(iii)it applies","(iii) it it applies","(iii)it it applies","(iii) to it applies","(iii)to it applies","(iii) it is used to it applies","(iii)it is used to it applies","(iii) it will it applies","(iii)it will it applies","(iii) this it applies","(iii)this it applies","(iii) it can it applies","(iii)it can it applies","(iii) used to it applies","(iii)used to it applies","(iii) it searches","(iii)it searches","(iii) it it searches","(iii)it it searches","(iii) to it searches","(iii)to it searches","(iii) it is used to it searches","(iii)it is used to it searches","(iii) it will it searches","(iii)it will it searches","(iii) this it searches","(iii)this it searches","(iii) it can it searches","(iii)it can it searches","(iii) used to it searches","(iii)used to it searches","iii) reason","iii)reason","iii) it reason","iii)it reason","iii) to reason","iii)to reason","iii) it is used to reason","iii)it is used to reason","iii) it will reason","iii)it will reason","iii) this reason","iii)this reason","iii) it can reason","iii)it can reason","iii) used to reason","iii)used to reason","iii) applies","iii)applies","iii) it applies","iii)it applies","iii) to applies","iii)to applies","iii) it is used to applies","iii)it is used to applies","iii) it will applies","iii)it will applies","iii) this applies","iii)this applies","iii) it can applies","iii)it can applies","iii) used to applies","iii)used to applies","iii) apply","iii)apply","iii) it apply","iii)it apply","iii) to apply","iii)to apply","iii) it is used to apply","iii)it is used to apply","iii) it will apply","iii)it will apply","iii) this apply","iii)this apply","iii) it can apply","iii)it can apply","iii) used to apply","iii)used to apply","iii) uses the rules","iii)uses the rules","iii) it uses the rules","iii)it uses the rules","iii) to uses the rules","iii)to uses the rules","iii) it is used to uses the rules","iii)it is used to uses the rules","iii) it will uses the rules","iii)it will uses the rules","iii) this uses the rules","iii)this uses the rules","iii) it can uses the rules","iii)it can uses the rules","iii) used to uses the rules","iii)used to uses the rules","iii) uses","iii)uses","iii) it uses","iii)it uses","iii) to uses","iii)to uses","iii) it is used to uses","iii)it is used to uses","iii) it will uses","iii)it will uses","iii) this uses","iii)this uses","iii) it can uses","iii)it can uses","iii) used to uses","iii)used to uses","iii) searches","iii)searches","iii) it searches","iii)it searches","iii) to searches","iii)to searches","iii) it is used to searches","iii)it is used to searches","iii) it will searches","iii)it will searches","iii) this searches","iii)this searches","iii) it can searches","iii)it can searches","iii) used to searches","iii)used to searches","iii) conclusion","iii)conclusion","iii) it conclusion","iii)it conclusion","iii) to conclusion","iii)to conclusion","iii) it is used to conclusion","iii)it is used to conclusion","iii) it will conclusion","iii)it will conclusion","iii) this conclusion","iii)this conclusion","iii) it can conclusion","iii)it can conclusion","iii) used to conclusion","iii)used to conclusion","iii) decision","iii)decision","iii) it decision","iii)it decision","iii) to decision","iii)to decision","iii) it is used to decision","iii)it is used to decision","iii) it will decision","iii)it will decision","iii) this decision","iii)this decision","iii) it can decision","iii)it can decision","iii) used to decision","iii)used to decision","iii) infer","iii)infer","iii) it infer","iii)it infer","iii) to infer","iii)to infer","iii) it is used to infer","iii)it is used to infer","iii) it will infer","iii)it will infer","iii) this infer","iii)this infer","iii) it can infer","iii)it can infer","iii) used to infer","iii)used to infer","iii) match","iii)match","iii) it match","iii)it match","iii) to match","iii)to match","iii) it is used to match","iii)it is used to match","iii) it will match","iii)it will match","iii) this match","iii)this match","iii) it can match","iii)it can match","iii) used to match","iii)used to match","iii) compare","iii)compare","iii) it compare","iii)it compare","iii) to compare","iii)to compare","iii) it is used to compare","iii)it is used to compare","iii) it will compare","iii)it will compare","iii) this compare","iii)this compare","iii) it can compare","iii)it can compare","iii) used to compare","iii)used to compare","iii) processes","iii)processes","iii) it processes","iii)it processes","iii) to processes","iii)to processes","iii) it is used to processes","iii)it is used to processes","iii) it will processes","iii)it will processes","iii) this processes","iii)this processes","iii) it can processes","iii)it can processes","iii) used to processes","iii)used to processes","iii) the part that","iii)the part that","iii) it the part that","iii)it the part that","iii) to the part that","iii)to the part that","iii) it is used to the part that","iii)it is used to the part that","iii) it will the part that","iii)it will the part that","iii) this the part that","iii)this the part that","iii) it can the part that","iii)it can the part that","iii) used to the part that","iii)used to the part that","iii) it uses","iii)it uses","iii) it it uses","iii)it it uses","iii) to it uses","iii)to it uses","iii) it is used to it uses","iii)it is used to it uses","iii) it will it uses","iii)it will it uses","iii) this it uses","iii)this it uses","iii) it can it uses","iii)it can it uses","iii) used to it uses","iii)used to it uses","iii) it applies","iii)it applies","iii) it it applies","iii)it it applies","iii) to it applies","iii)to it applies","iii) it is used to it applies","iii)it is used to it applies","iii) it will it applies","iii)it will it applies","iii) this it applies","iii)this it applies","iii) it can it applies","iii)it can it applies","iii) used to it applies","iii)used to it applies","iii) it searches","iii)it searches","iii) it it searches","iii)it it searches","iii) to it searches","iii)to it searches","iii) it is used to it searches","iii)it is used to it searches","iii) it will it searches","iii)it will it searches","iii) this it searches","iii)this it searches","iii) it can it searches","iii)it can it searches","iii) used to it searches","iii)used to it searches","iii. reason","iii.reason","iii. it reason","iii.it reason","iii. to reason","iii.to reason","iii. it is used to reason","iii.it is used to reason","iii. it will reason","iii.it will reason","iii. this reason","iii.this reason","iii. it can reason","iii.it can reason","iii. used to reason","iii.used to reason","iii. applies","iii.applies","iii. it applies","iii.it applies","iii. to applies","iii.to applies","iii. it is used to applies","iii.it is used to applies","iii. it will applies","iii.it will applies","iii. this applies","iii.this applies","iii. it can applies","iii.it can applies","iii. used to applies","iii.used to applies","iii. apply","iii.apply","iii. it apply","iii.it apply","iii. to apply","iii.to apply","iii. it is used to apply","iii.it is used to apply","iii. it will apply","iii.it will apply","iii. this apply","iii.this apply","iii. it can apply","iii.it can apply","iii. used to apply","iii.used to apply","iii. uses the rules","iii.uses the rules","iii. it uses the rules","iii.it uses the rules","iii. to uses the rules","iii.to uses the rules","iii. it is used to uses the rules","iii.it is used to uses the rules","iii. it will uses the rules","iii.it will uses the rules","iii. this uses the rules","iii.this uses the rules","iii. it can uses the rules","iii.it can uses the rules","iii. used to uses the rules","iii.used to uses the rules","iii. uses","iii.uses","iii. it uses","iii.it uses","iii. to uses","iii.to uses","iii. it is used to uses","iii.it is used to uses","iii. it will uses","iii.it will uses","iii. this uses","iii.this uses","iii. it can uses","iii.it can uses","iii. used to uses","iii.used to uses","iii. searches","iii.searches","iii. it searches","iii.it searches","iii. to searches","iii.to searches","iii. it is used to searches","iii.it is used to searches","iii. it will searches","iii.it will searches","iii. this searches","iii.this searches","iii. it can searches","iii.it can searches","iii. used to searches","iii.used to searches","iii. conclusion","iii.conclusion","iii. it conclusion","iii.it conclusion","iii. to conclusion","iii.to conclusion","iii. it is used to conclusion","iii.it is used to conclusion","iii. it will conclusion","iii.it will conclusion","iii. this conclusion","iii.this conclusion","iii. it can conclusion","iii.it can conclusion","iii. used to conclusion","iii.used to conclusion","iii. decision","iii.decision","iii. it decision","iii.it decision","iii. to decision","iii.to decision","iii. it is used to decision","iii.it is used to decision","iii. it will decision","iii.it will decision","iii. this decision","iii.this decision","iii. it can decision","iii.it can decision","iii. used to decision","iii.used to decision","iii. infer","iii.infer","iii. it infer","iii.it infer","iii. to infer","iii.to infer","iii. it is used to infer","iii.it is used to infer","iii. it will infer","iii.it will infer","iii. this infer","iii.this infer","iii. it can infer","iii.it can infer","iii. used to infer","iii.used to infer","iii. match","iii.match","iii. it match","iii.it match","iii. to match","iii.to match","iii. it is used to match","iii.it is used to match","iii. it will match","iii.it will match","iii. this match","iii.this match","iii. it can match","iii.it can match","iii. used to match","iii.used to match","iii. compare","iii.compare","iii. it compare","iii.it compare","iii. to compare","iii.to compare","iii. it is used to compare","iii.it is used to compare","iii. it will compare","iii.it will compare","iii. this compare","iii.this compare","iii. it can compare","iii.it can compare","iii. used to compare","iii.used to compare","iii. processes","iii.processes","iii. it processes","iii.it processes","iii. to processes","iii.to processes","iii. it is used to processes","iii.it is used to processes","iii. it will processes","iii.it will processes","iii. this processes","iii.this processes","iii. it can processes","iii.it can processes","iii. used to processes","iii.used to processes","iii. the part that","iii.the part that","iii. it the part that","iii.it the part that","iii. to the part that","iii.to the part that","iii. it is used to the part that","iii.it is used to the part that","iii. it will the part that","iii.it will the part that","iii. this the part that","iii.this the part that","iii. it can the part that","iii.it can the part that","iii. used to the part that","iii.used to the part that","iii. it uses","iii.it uses","iii. it it uses","iii.it it uses","iii. to it uses","iii.to it uses","iii. it is used to it uses","iii.it is used to it uses","iii. it will it uses","iii.it will it uses","iii. this it uses","iii.this it uses","iii. it can it uses","iii.it can it uses","iii. used to it uses","iii.used to it uses","iii. it applies","iii.it applies","iii. it it applies","iii.it it applies","iii. to it applies","iii.to it applies","iii. it is used to it applies","iii.it is used to it applies","iii. it will it applies","iii.it will it applies","iii. this it applies","iii.this it applies","iii. it can it applies","iii.it can it applies","iii. used to it applies","iii.used to it applies","iii. it searches","iii.it searches","iii. it it searches","iii.it it searches","iii. to it searches","iii.to it searches","iii. it is used to it searches","iii.it is used to it searches","iii. it will it searches","iii.it will it searches","iii. this it searches","iii.this it searches","iii. it can it searches","iii.it can it searches","iii. used to it searches","iii.used to it searches"]],"needCount":1} },
            { text: "(iv) Interface: lets the user enter data / questions and see the results", marks: 1, match: {"type":"keywords","groups":[["(iv) user","(iv)user","(iv) it user","(iv)it user","(iv) to user","(iv)to user","(iv) it is used to user","(iv)it is used to user","(iv) it will user","(iv)it will user","(iv) this user","(iv)this user","(iv) it can user","(iv)it can user","(iv) used to user","(iv)used to user","(iv) input","(iv)input","(iv) it input","(iv)it input","(iv) to input","(iv)to input","(iv) it is used to input","(iv)it is used to input","(iv) it will input","(iv)it will input","(iv) this input","(iv)this input","(iv) it can input","(iv)it can input","(iv) used to input","(iv)used to input","(iv) enter","(iv)enter","(iv) it enter","(iv)it enter","(iv) to enter","(iv)to enter","(iv) it is used to enter","(iv)it is used to enter","(iv) it will enter","(iv)it will enter","(iv) this enter","(iv)this enter","(iv) it can enter","(iv)it can enter","(iv) used to enter","(iv)used to enter","(iv) questions","(iv)questions","(iv) it questions","(iv)it questions","(iv) to questions","(iv)to questions","(iv) it is used to questions","(iv)it is used to questions","(iv) it will questions","(iv)it will questions","(iv) this questions","(iv)this questions","(iv) it can questions","(iv)it can questions","(iv) used to questions","(iv)used to questions","(iv) communicate","(iv)communicate","(iv) it communicate","(iv)it communicate","(iv) to communicate","(iv)to communicate","(iv) it is used to communicate","(iv)it is used to communicate","(iv) it will communicate","(iv)it will communicate","(iv) this communicate","(iv)this communicate","(iv) it can communicate","(iv)it can communicate","(iv) used to communicate","(iv)used to communicate","(iv) results","(iv)results","(iv) it results","(iv)it results","(iv) to results","(iv)to results","(iv) it is used to results","(iv)it is used to results","(iv) it will results","(iv)it will results","(iv) this results","(iv)this results","(iv) it can results","(iv)it can results","(iv) used to results","(iv)used to results","(iv) screen","(iv)screen","(iv) it screen","(iv)it screen","(iv) to screen","(iv)to screen","(iv) it is used to screen","(iv)it is used to screen","(iv) it will screen","(iv)it will screen","(iv) this screen","(iv)this screen","(iv) it can screen","(iv)it can screen","(iv) used to screen","(iv)used to screen","(iv) talk","(iv)talk","(iv) it talk","(iv)it talk","(iv) to talk","(iv)to talk","(iv) it is used to talk","(iv)it is used to talk","(iv) it will talk","(iv)it will talk","(iv) this talk","(iv)this talk","(iv) it can talk","(iv)it can talk","(iv) used to talk","(iv)used to talk","(iv) interact","(iv)interact","(iv) it interact","(iv)it interact","(iv) to interact","(iv)to interact","(iv) it is used to interact","(iv)it is used to interact","(iv) it will interact","(iv)it will interact","(iv) this interact","(iv)this interact","(iv) it can interact","(iv)it can interact","(iv) used to interact","(iv)used to interact","(iv) allows","(iv)allows","(iv) it allows","(iv)it allows","(iv) to allows","(iv)to allows","(iv) it is used to allows","(iv)it is used to allows","(iv) it will allows","(iv)it will allows","(iv) this allows","(iv)this allows","(iv) it can allows","(iv)it can allows","(iv) used to allows","(iv)used to allows","(iv) lets","(iv)lets","(iv) it lets","(iv)it lets","(iv) to lets","(iv)to lets","(iv) it is used to lets","(iv)it is used to lets","(iv) it will lets","(iv)it will lets","(iv) this lets","(iv)this lets","(iv) it can lets","(iv)it can lets","(iv) used to lets","(iv)used to lets","(iv) the user","(iv)the user","(iv) it the user","(iv)it the user","(iv) to the user","(iv)to the user","(iv) it is used to the user","(iv)it is used to the user","(iv) it will the user","(iv)it will the user","(iv) this the user","(iv)this the user","(iv) it can the user","(iv)it can the user","(iv) used to the user","(iv)used to the user","(iv) it allows","(iv)it allows","(iv) it it allows","(iv)it it allows","(iv) to it allows","(iv)to it allows","(iv) it is used to it allows","(iv)it is used to it allows","(iv) it will it allows","(iv)it will it allows","(iv) this it allows","(iv)this it allows","(iv) it can it allows","(iv)it can it allows","(iv) used to it allows","(iv)used to it allows","(iv) it lets","(iv)it lets","(iv) it it lets","(iv)it it lets","(iv) to it lets","(iv)to it lets","(iv) it is used to it lets","(iv)it is used to it lets","(iv) it will it lets","(iv)it will it lets","(iv) this it lets","(iv)this it lets","(iv) it can it lets","(iv)it can it lets","(iv) used to it lets","(iv)used to it lets","iv) user","iv)user","iv) it user","iv)it user","iv) to user","iv)to user","iv) it is used to user","iv)it is used to user","iv) it will user","iv)it will user","iv) this user","iv)this user","iv) it can user","iv)it can user","iv) used to user","iv)used to user","iv) input","iv)input","iv) it input","iv)it input","iv) to input","iv)to input","iv) it is used to input","iv)it is used to input","iv) it will input","iv)it will input","iv) this input","iv)this input","iv) it can input","iv)it can input","iv) used to input","iv)used to input","iv) enter","iv)enter","iv) it enter","iv)it enter","iv) to enter","iv)to enter","iv) it is used to enter","iv)it is used to enter","iv) it will enter","iv)it will enter","iv) this enter","iv)this enter","iv) it can enter","iv)it can enter","iv) used to enter","iv)used to enter","iv) questions","iv)questions","iv) it questions","iv)it questions","iv) to questions","iv)to questions","iv) it is used to questions","iv)it is used to questions","iv) it will questions","iv)it will questions","iv) this questions","iv)this questions","iv) it can questions","iv)it can questions","iv) used to questions","iv)used to questions","iv) communicate","iv)communicate","iv) it communicate","iv)it communicate","iv) to communicate","iv)to communicate","iv) it is used to communicate","iv)it is used to communicate","iv) it will communicate","iv)it will communicate","iv) this communicate","iv)this communicate","iv) it can communicate","iv)it can communicate","iv) used to communicate","iv)used to communicate","iv) results","iv)results","iv) it results","iv)it results","iv) to results","iv)to results","iv) it is used to results","iv)it is used to results","iv) it will results","iv)it will results","iv) this results","iv)this results","iv) it can results","iv)it can results","iv) used to results","iv)used to results","iv) screen","iv)screen","iv) it screen","iv)it screen","iv) to screen","iv)to screen","iv) it is used to screen","iv)it is used to screen","iv) it will screen","iv)it will screen","iv) this screen","iv)this screen","iv) it can screen","iv)it can screen","iv) used to screen","iv)used to screen","iv) talk","iv)talk","iv) it talk","iv)it talk","iv) to talk","iv)to talk","iv) it is used to talk","iv)it is used to talk","iv) it will talk","iv)it will talk","iv) this talk","iv)this talk","iv) it can talk","iv)it can talk","iv) used to talk","iv)used to talk","iv) interact","iv)interact","iv) it interact","iv)it interact","iv) to interact","iv)to interact","iv) it is used to interact","iv)it is used to interact","iv) it will interact","iv)it will interact","iv) this interact","iv)this interact","iv) it can interact","iv)it can interact","iv) used to interact","iv)used to interact","iv) allows","iv)allows","iv) it allows","iv)it allows","iv) to allows","iv)to allows","iv) it is used to allows","iv)it is used to allows","iv) it will allows","iv)it will allows","iv) this allows","iv)this allows","iv) it can allows","iv)it can allows","iv) used to allows","iv)used to allows","iv) lets","iv)lets","iv) it lets","iv)it lets","iv) to lets","iv)to lets","iv) it is used to lets","iv)it is used to lets","iv) it will lets","iv)it will lets","iv) this lets","iv)this lets","iv) it can lets","iv)it can lets","iv) used to lets","iv)used to lets","iv) the user","iv)the user","iv) it the user","iv)it the user","iv) to the user","iv)to the user","iv) it is used to the user","iv)it is used to the user","iv) it will the user","iv)it will the user","iv) this the user","iv)this the user","iv) it can the user","iv)it can the user","iv) used to the user","iv)used to the user","iv) it allows","iv)it allows","iv) it it allows","iv)it it allows","iv) to it allows","iv)to it allows","iv) it is used to it allows","iv)it is used to it allows","iv) it will it allows","iv)it will it allows","iv) this it allows","iv)this it allows","iv) it can it allows","iv)it can it allows","iv) used to it allows","iv)used to it allows","iv) it lets","iv)it lets","iv) it it lets","iv)it it lets","iv) to it lets","iv)to it lets","iv) it is used to it lets","iv)it is used to it lets","iv) it will it lets","iv)it will it lets","iv) this it lets","iv)this it lets","iv) it can it lets","iv)it can it lets","iv) used to it lets","iv)used to it lets","iv. user","iv.user","iv. it user","iv.it user","iv. to user","iv.to user","iv. it is used to user","iv.it is used to user","iv. it will user","iv.it will user","iv. this user","iv.this user","iv. it can user","iv.it can user","iv. used to user","iv.used to user","iv. input","iv.input","iv. it input","iv.it input","iv. to input","iv.to input","iv. it is used to input","iv.it is used to input","iv. it will input","iv.it will input","iv. this input","iv.this input","iv. it can input","iv.it can input","iv. used to input","iv.used to input","iv. enter","iv.enter","iv. it enter","iv.it enter","iv. to enter","iv.to enter","iv. it is used to enter","iv.it is used to enter","iv. it will enter","iv.it will enter","iv. this enter","iv.this enter","iv. it can enter","iv.it can enter","iv. used to enter","iv.used to enter","iv. questions","iv.questions","iv. it questions","iv.it questions","iv. to questions","iv.to questions","iv. it is used to questions","iv.it is used to questions","iv. it will questions","iv.it will questions","iv. this questions","iv.this questions","iv. it can questions","iv.it can questions","iv. used to questions","iv.used to questions","iv. communicate","iv.communicate","iv. it communicate","iv.it communicate","iv. to communicate","iv.to communicate","iv. it is used to communicate","iv.it is used to communicate","iv. it will communicate","iv.it will communicate","iv. this communicate","iv.this communicate","iv. it can communicate","iv.it can communicate","iv. used to communicate","iv.used to communicate","iv. results","iv.results","iv. it results","iv.it results","iv. to results","iv.to results","iv. it is used to results","iv.it is used to results","iv. it will results","iv.it will results","iv. this results","iv.this results","iv. it can results","iv.it can results","iv. used to results","iv.used to results","iv. screen","iv.screen","iv. it screen","iv.it screen","iv. to screen","iv.to screen","iv. it is used to screen","iv.it is used to screen","iv. it will screen","iv.it will screen","iv. this screen","iv.this screen","iv. it can screen","iv.it can screen","iv. used to screen","iv.used to screen","iv. talk","iv.talk","iv. it talk","iv.it talk","iv. to talk","iv.to talk","iv. it is used to talk","iv.it is used to talk","iv. it will talk","iv.it will talk","iv. this talk","iv.this talk","iv. it can talk","iv.it can talk","iv. used to talk","iv.used to talk","iv. interact","iv.interact","iv. it interact","iv.it interact","iv. to interact","iv.to interact","iv. it is used to interact","iv.it is used to interact","iv. it will interact","iv.it will interact","iv. this interact","iv.this interact","iv. it can interact","iv.it can interact","iv. used to interact","iv.used to interact","iv. allows","iv.allows","iv. it allows","iv.it allows","iv. to allows","iv.to allows","iv. it is used to allows","iv.it is used to allows","iv. it will allows","iv.it will allows","iv. this allows","iv.this allows","iv. it can allows","iv.it can allows","iv. used to allows","iv.used to allows","iv. lets","iv.lets","iv. it lets","iv.it lets","iv. to lets","iv.to lets","iv. it is used to lets","iv.it is used to lets","iv. it will lets","iv.it will lets","iv. this lets","iv.this lets","iv. it can lets","iv.it can lets","iv. used to lets","iv.used to lets","iv. the user","iv.the user","iv. it the user","iv.it the user","iv. to the user","iv.to the user","iv. it is used to the user","iv.it is used to the user","iv. it will the user","iv.it will the user","iv. this the user","iv.this the user","iv. it can the user","iv.it can the user","iv. used to the user","iv.used to the user","iv. it allows","iv.it allows","iv. it it allows","iv.it it allows","iv. to it allows","iv.to it allows","iv. it is used to it allows","iv.it is used to it allows","iv. it will it allows","iv.it will it allows","iv. this it allows","iv.this it allows","iv. it can it allows","iv.it can it allows","iv. used to it allows","iv.used to it allows","iv. it lets","iv.it lets","iv. it it lets","iv.it it lets","iv. to it lets","iv.to it lets","iv. it is used to it lets","iv.it is used to it lets","iv. it will it lets","iv.it will it lets","iv. this it lets","iv.this it lets","iv. it can it lets","iv.it can it lets","iv. used to it lets","iv.used to it lets"]],"needCount":1} }
          ],
          explanation: "(i) The knowledge base stores the facts about the subject. (ii) The rule base stores the rules used to reach a conclusion. (iii) The inference engine applies the rules to the facts to reach a conclusion. (iv) The interface lets the user enter data and see the results."
        },
        {
          id: "Q9", syl: ["6.3.3"], marks: 2, difficulty: "intermediate",
          topic: "Machine Learning",
          prompt: "Describe what is meant by machine learning. [2 marks]",
          markPoints: [
            { text: "A program has the ability to adapt its own processes and/or data", marks: 1, match: {"type":"keywords","groups":[["adapt","change","improve","learn","update","modify","its own","experience","from data"]],"needCount":1} },
            { text: "It does this automatically, without being changed by a person", marks: 1, match: {"type":"keywords","groups":[["automatic","itself","by itself","without being","without human","without a person","without someone","without any one","without anyone"]],"needCount":1} }
          ],
          explanation: "Machine learning is when a program has the ability to automatically adapt its own processes and/or data, without a person having to change it."
        },
        {
          id: "Q10", syl: ["6.2.3"], marks: 2, difficulty: "hard",
          topic: "Robotics",
          prompt: "A farmer uses a drone to check the crops in a very large field. State TWO advantages of using the drone. [2 marks]",
          markPoints: [
            { text: "Two advantages, for example: it covers a large area quickly; it can send images / data to the farmer; it can reach difficult areas; it needs fewer workers", marks: 2, match: {"type":"keywords","groups":[["large","quickly","fast","area","faster","less time","save time","saves time"],["image","photo","camera","data","monitor","video","check"],["spray","water","pesticide","fertiliser","fertilizer"],["reach","difficult","hard to","dangerous","remote"],["fewer","less labour","less workers","cheaper","workers","farmers do not"]],"needCount":2,"marksPerGroup":1} }
          ],
          explanation: "A drone can cover a large field quickly, can send images or data to the farmer, can reach areas that are difficult to get to, and means fewer workers are needed."
        }
      ]
    },
    algo_exam: {
      key: "algo_exam",
      title: "Topic 7: Algorithm Design and Problem-Solving — IGCSE exam style",
      subtitle: "10 exam-style questions · Life cycle, decomposition, test data, trace tables, bubble sort, linear search, validation, finding errors and writing algorithms · 33 marks total",
      classes: ["10BR1","10BR2","10BR3"],
      totalMarks: 33,
      questions: [
        {
          id: "Q1", syl: ["7.1"], marks: 2, difficulty: "easy",
          topic: "Program Development Life Cycle",
          prompt: "The program development life cycle has four stages. Name the four stages in the order in which they are carried out. [2 marks]",
          markPoints: [
            { text: "Analysis and design (the first two stages)", marks: 1, match: {"type":"keywords","groups":[["analysis"],["design"]],"needCount":2} },
            { text: "Coding and testing (the last two stages)", marks: 1, match: {"type":"keywords","groups":[["coding","code","program","write"],["testing","test"]],"needCount":2} }
          ],
          explanation: "The four stages are analysis, design, coding and testing, in that order."
        },
        {
          id: "Q2", syl: ["7.2"], marks: 3, difficulty: "easy",
          topic: "Decomposition",
          prompt: "(a) State what is meant by decomposition. [1 mark]\n(b) A program calculates the average of three test marks that a teacher types in. Give one input and one output of this program. Give your answers as (i) input and (ii) output. [2 marks]",
          markPoints: [
            { text: "(a) Breaking a problem down into smaller parts / sub-problems", marks: 1, match: {"type":"keywords","groups":[["smaller","sub-problem","subproblem","sub problem","parts","sub-system","subsystem","sections","manageable","break"]],"needCount":1} },
            { text: "(b)(i) Input: a test mark (the marks typed in)", marks: 1, match: {"type":"keywords","groups":[["(i) mark","(i)mark","(i) a mark","(i)a mark","(i) the mark","(i)the mark","(i) a test mark","(i)a test mark","(i) test mark","(i)test mark","(i) one mark","(i)one mark","(i) three mark","(i)three mark","(i) test","(i)test","(i) a test","(i)a test","(i) the test","(i)the test","(i) a test test","(i)a test test","(i) test test","(i)test test","(i) one test","(i)one test","(i) three test","(i)three test","(i) marks","(i)marks","(i) a marks","(i)a marks","(i) the marks","(i)the marks","(i) a test marks","(i)a test marks","(i) test marks","(i)test marks","(i) one marks","(i)one marks","(i) three marks","(i)three marks","(i) score","(i)score","(i) a score","(i)a score","(i) the score","(i)the score","(i) a test score","(i)a test score","(i) test score","(i)test score","(i) one score","(i)one score","(i) three score","(i)three score","(i) three","(i)three","(i) a three","(i)a three","(i) the three","(i)the three","(i) a test three","(i)a test three","(i) test three","(i)test three","(i) one three","(i)one three","(i) three three","(i)three three","(i) 3","(i)3","(i) a 3","(i)a 3","(i) the 3","(i)the 3","(i) a test 3","(i)a test 3","(i) test 3","(i)test 3","(i) one 3","(i)one 3","(i) three 3","(i)three 3"]],"needCount":1} },
            { text: "(b)(ii) Output: the average", marks: 1, match: {"type":"keywords","groups":[["(ii) average","(ii)average","(ii) a average","(ii)a average","(ii) the average","(ii)the average","(ii) an average","(ii)an average","(ii) an average average","(ii)an average average","(ii) mean","(ii)mean","(ii) a mean","(ii)a mean","(ii) the mean","(ii)the mean","(ii) an mean","(ii)an mean","(ii) an average mean","(ii)an average mean","(ii) result","(ii)result","(ii) a result","(ii)a result","(ii) the result","(ii)the result","(ii) an result","(ii)an result","(ii) an average result","(ii)an average result"]],"needCount":1} }
          ],
          explanation: "(a) Decomposition is breaking a problem down into smaller, more manageable parts. (b) Input: a test mark. Output: the average mark."
        },
        {
          id: "Q3", syl: ["7.6"], marks: 3, difficulty: "intermediate",
          topic: "Test Data",
          prompt: "A program accepts a whole-number age from 11 to 16 inclusive. Give one example of each type of test data. Give your answers as (i), (ii) and (iii). [3 marks]\n(i) normal data\n(ii) abnormal data\n(iii) extreme data",
          markPoints: [
            { text: "(i) Normal: any whole number from 11 to 16", marks: 1, match: {"type":"keywords","groups":[["(i) 11","(i)11","(i) 12","(i)12","(i) 13","(i)13","(i) 14","(i)14","(i) 15","(i)15","(i) 16","(i)16"]],"needCount":1} },
            { text: "(ii) Abnormal: a value that is not accepted, e.g. 10, 17 or a letter", marks: 1, match: {"type":"keywords","groups":[["(ii) 0","(ii)0","(ii) 1","(ii)1","(ii) 2","(ii)2","(ii) 3","(ii)3","(ii) 4","(ii)4","(ii) 5","(ii)5","(ii) 6","(ii)6","(ii) 7","(ii)7","(ii) 8","(ii)8","(ii) 9","(ii)9","(ii) 10","(ii)10","(ii) 17","(ii)17","(ii) 18","(ii)18","(ii) 19","(ii)19","(ii) 20","(ii)20","(ii) 21","(ii)21","(ii) 22","(ii)22","(ii) 23","(ii)23","(ii) 24","(ii)24","(ii) 25","(ii)25","(ii) 26","(ii)26","(ii) 27","(ii)27","(ii) 28","(ii)28","(ii) 29","(ii)29","(ii) 30","(ii)30","(ii) 31","(ii)31","(ii) 32","(ii)32","(ii) 33","(ii)33","(ii) 34","(ii)34","(ii) 35","(ii)35","(ii) 36","(ii)36","(ii) 37","(ii)37","(ii) 38","(ii)38","(ii) 39","(ii)39","(ii) 40","(ii)40","(ii) 41","(ii)41","(ii) 42","(ii)42","(ii) 43","(ii)43","(ii) 44","(ii)44","(ii) 45","(ii)45","(ii) 46","(ii)46","(ii) 47","(ii)47","(ii) 48","(ii)48","(ii) 49","(ii)49","(ii) 50","(ii)50","(ii) 51","(ii)51","(ii) 52","(ii)52","(ii) 53","(ii)53","(ii) 54","(ii)54","(ii) 55","(ii)55","(ii) 56","(ii)56","(ii) 57","(ii)57","(ii) 58","(ii)58","(ii) 59","(ii)59","(ii) 60","(ii)60","(ii) 61","(ii)61","(ii) 62","(ii)62","(ii) 63","(ii)63","(ii) 64","(ii)64","(ii) 65","(ii)65","(ii) 66","(ii)66","(ii) 67","(ii)67","(ii) 68","(ii)68","(ii) 69","(ii)69","(ii) 70","(ii)70","(ii) 71","(ii)71","(ii) 72","(ii)72","(ii) 73","(ii)73","(ii) 74","(ii)74","(ii) 75","(ii)75","(ii) 76","(ii)76","(ii) 77","(ii)77","(ii) 78","(ii)78","(ii) 79","(ii)79","(ii) 80","(ii)80","(ii) 81","(ii)81","(ii) 82","(ii)82","(ii) 83","(ii)83","(ii) 84","(ii)84","(ii) 85","(ii)85","(ii) 86","(ii)86","(ii) 87","(ii)87","(ii) 88","(ii)88","(ii) 89","(ii)89","(ii) 90","(ii)90","(ii) 91","(ii)91","(ii) 92","(ii)92","(ii) 93","(ii)93","(ii) 94","(ii)94","(ii) 95","(ii)95","(ii) 96","(ii)96","(ii) 97","(ii)97","(ii) 98","(ii)98","(ii) 99","(ii)99","(ii) 100","(ii)100","(ii) 101","(ii)101","(ii) 102","(ii)102","(ii) 103","(ii)103","(ii) 104","(ii)104","(ii) 105","(ii)105","(ii) 106","(ii)106","(ii) 107","(ii)107","(ii) 108","(ii)108","(ii) 109","(ii)109","(ii) 110","(ii)110","(ii) 111","(ii)111","(ii) 112","(ii)112","(ii) 113","(ii)113","(ii) 114","(ii)114","(ii) 115","(ii)115","(ii) 116","(ii)116","(ii) 117","(ii)117","(ii) 118","(ii)118","(ii) 119","(ii)119","(ii) 120","(ii)120","(ii) -1","(ii)-1","(ii) -5","(ii)-5","(ii) -10","(ii)-10","(ii) abc","(ii)abc","(ii) ten","(ii)ten","(ii) twenty","(ii)twenty","(ii) a","(ii)a","(ii) x","(ii)x","(ii) hello","(ii)hello","(ii) text","(ii)text","(ii) letters","(ii)letters","(ii) seventeen","(ii)seventeen","(ii) eighteen","(ii)eighteen","(ii) fifty","(ii)fifty","(ii) n/a","(ii)n/a"]],"needCount":1} },
            { text: "(iii) Extreme: 11 or 16", marks: 1, match: {"type":"keywords","groups":[["(iii) 11","(iii)11","(iii) 16","(iii)16"]],"needCount":1} }
          ],
          explanation: "(i) Normal data is accepted, for example 14. (ii) Abnormal data is rejected, for example 17, 5 or the word \"ten\". (iii) Extreme data is the largest or smallest value that is accepted: 11 or 16."
        },
        {
          id: "Q4", syl: ["7.7"], calc: true, marks: 3, difficulty: "intermediate",
          topic: "Trace Tables",
          prompt: "This algorithm is run. The four values that are input are 5, 8, 3 and 6.\n01 Total ← 0\n02 FOR Count ← 1 TO 4\n03     INPUT Num\n04     IF Num MOD 2 = 0\n05       THEN\n06         Total ← Total + Num\n07     ENDIF\n08 NEXT Count\n09 OUTPUT Total\n\n(a) Write down the value of Total after each of the four values has been processed, in the order of input. [2 marks]\n(b) Write down the value that is output. [1 mark]\nGive your answers as (a) and (b).",
          markPoints: [
            { text: "(a) Total after each input: 0, 8, 8, 14", marks: 2, match: {"type":"numeric","values":["08814"]} },
            { text: "(b) Output: 14", marks: 1, match: {"type":"keywords","groups":[["(b) 14","(b)14","(b) total is 14","(b) total = 14","(b) output is 14","(b) the output is 14"]],"needCount":1} }
          ],
          explanation: "MOD 2 = 0 is true for even numbers only. 5 is odd, so Total stays 0. 8 is even, so Total = 8. 3 is odd, so Total stays 8. 6 is even, so Total = 14. The output is 14.\n\nNum | Total\n5   | 0\n8   | 8\n3   | 8\n6   | 14"
        },
        {
          id: "Q5", syl: ["7.7"], calc: true, marks: 4, difficulty: "hard",
          topic: "Trace Tables",
          prompt: "An array holds these five values: Scores[1] = 12, Scores[2] = 7, Scores[3] = 19, Scores[4] = 4 and Scores[5] = 15.\n01 Highest ← Scores[1]\n02 Position ← 1\n03 FOR Index ← 2 TO 5\n04     IF Scores[Index] > Highest\n05       THEN\n06         Highest ← Scores[Index]\n07         Position ← Index\n08     ENDIF\n09 NEXT Index\n10 OUTPUT Highest, Position\n\n(a) Write down the value of Highest at the end of each repetition of the loop (Index = 2, 3, 4 and 5). [2 marks]\n(b) Write down the two values that are output. [2 marks]\nGive your answers as (a) and (b).",
          markPoints: [
            { text: "(a) Highest after each repetition: 12, 19, 19, 19", marks: 2, match: {"type":"numeric","values":["12191919"]} },
            { text: "(b) Output: 19 and 3", marks: 2, match: {"type":"numeric","values":["193"]} }
          ],
          explanation: "Highest starts at 12 and Position at 1.\nIndex 2: 7 is not > 12, so Highest stays 12.\nIndex 3: 19 > 12, so Highest = 19 and Position = 3.\nIndex 4: 4 is not > 19.\nIndex 5: 15 is not > 19.\nOutput: 19 and 3."
        },
        {
          id: "Q6", syl: ["7.4"], calc: true, marks: 3, difficulty: "intermediate",
          topic: "Bubble Sort",
          prompt: "A bubble sort is used to sort this list into ascending order: 6, 3, 8, 2\nWrite down the list (a) after the first pass, (b) after the second pass and (c) after the third pass. Give your answers as (a), (b) and (c). [3 marks]",
          markPoints: [
            { text: "(a) After pass 1: 3, 6, 2, 8", marks: 1, match: {"type":"numeric","values":["3628"]} },
            { text: "(b) After pass 2: 3, 2, 6, 8", marks: 1, match: {"type":"numeric","values":["3268"]} },
            { text: "(c) After pass 3: 2, 3, 6, 8", marks: 1, match: {"type":"numeric","values":["2368"]} }
          ],
          explanation: "Pass 1: 6 and 3 swap (3,6,8,2); 6 and 8 stay; 8 and 2 swap (3,6,2,8).\nPass 2: 3 and 6 stay; 6 and 2 swap (3,2,6,8); 6 and 8 stay.\nPass 3: 3 and 2 swap (2,3,6,8). The list is now sorted."
        },
        {
          id: "Q7", syl: ["7.4"], marks: 3, difficulty: "easy",
          topic: "Linear Search",
          prompt: "A list contains 20 numbers that are not in order. Describe how a linear search finds out whether the number 19 is in the list. [3 marks]",
          markPoints: [
            { text: "It starts at the first item in the list", marks: 1, match: {"type":"keywords","groups":[["first","start","beginning"]],"needCount":1} },
            { text: "It compares / checks each item in turn with 19", marks: 1, match: {"type":"keywords","groups":[["compare","check","each","one by one","in turn","every","next"]],"needCount":1} },
            { text: "It stops when 19 is found or the end of the list is reached", marks: 1, match: {"type":"keywords","groups":[["stop","found","end of the list","until","last","finish"]],"needCount":1} }
          ],
          explanation: "A linear search starts at the first item. It compares each item in turn with the search value, 19. It stops when 19 is found, or when it reaches the end of the list without finding it."
        },
        {
          id: "Q8", syl: ["7.5a","7.5b"], marks: 3, difficulty: "intermediate",
          topic: "Validation and Verification",
          prompt: "(a) State the difference between validation and verification. [2 marks]\n(b) Give the name of one validation check. [1 mark]",
          markPoints: [
            { text: "(a) Validation checks that the data is reasonable / sensible / follows the rules", marks: 1, match: {"type":"keywords","groups":[["reasonable","sensible","rules","allowed","acceptable","valid","suitable","follows","meets","criteria","possible"]],"needCount":1} },
            { text: "(a) Verification checks that the data entered matches the original / was entered correctly", marks: 1, match: {"type":"keywords","groups":[["match","same as","original","copy","entered correctly","correctly entered","typed correctly","double","again","twice","accurate","source"]],"needCount":1} },
            { text: "(b) For example: range, length, type, presence, format, check digit", marks: 1, match: {"type":"keywords","groups":[["range","length","type","presence","format","check digit","lookup","look up"]],"needCount":1} }
          ],
          explanation: "(a) Validation checks that the data entered is reasonable and follows the rules. Verification checks that the data entered matches the original data and has been entered correctly. (b) For example: range check, length check, type check, presence check, format check or check digit."
        },
        {
          id: "Q9", syl: ["7.8"], marks: 4, difficulty: "hard",
          topic: "Identifying Errors",
          prompt: "This algorithm should input 10 marks, work out the average and output it.\n01 Total ← 0\n02 FOR Count ← 1 TO 10\n03     INPUT Mark\n04     Total ← Mark\n05 NEXT Count\n06 Average ← Total / 9\n07 OUTPUT Average\n\nThere are two errors in the algorithm. For each error, give the line number and write the corrected line. Give your answers as (i) and (ii). [4 marks]",
          markPoints: [
            { text: "Error 1: line 04 is wrong", marks: 1, match: {"type":"keywords","groups":[["04","line 4","line4","(i) 4","(ii) 4","4"]],"needCount":1} },
            { text: "Corrected line 04: Total ← Total + Mark", marks: 1, match: {"type":"keywords","groups":[["total + mark","total+mark","mark + total","mark+total"]],"needCount":1} },
            { text: "Error 2: line 06 is wrong", marks: 1, match: {"type":"keywords","groups":[["06","line 6","line6","(i) 6","(ii) 6","6"]],"needCount":1} },
            { text: "Corrected line 06: Average ← Total / 10", marks: 1, match: {"type":"keywords","groups":[["total / 10","total/10","divide by 10","divided by 10","/ 10","/10"]],"needCount":1} }
          ],
          explanation: "Error 1: line 04 replaces Total with each mark. It should add the mark to the running total: Total ← Total + Mark.\nError 2: line 06 divides by 9. There are 10 marks, so it should be Average ← Total / 10."
        },
        {
          id: "Q10", syl: ["7.9"], marks: 5, difficulty: "hard",
          topic: "Writing Algorithms",
          prompt: "A teacher has 20 students. Write an algorithm, using pseudocode, that:\n• inputs the test mark of each of the 20 students\n• counts how many students scored 50 or more\n• outputs the count after all marks have been entered. [5 marks]",
          markPoints: [
            { text: "The counter is set to 0 before the loop", marks: 1, match: {"type":"keywords","groups":[["count ← 0","count = 0","count<-0","count <- 0","count:=0","count := 0","counter ← 0","counter = 0","counter <- 0","= 0","←0","← 0","<- 0"]],"needCount":1} },
            { text: "A loop that repeats 20 times, with the mark input inside the loop", marks: 1, match: {"type":"keywords","groups":[["for","while","repeat","loop"],["input","read","enter"]],"needCount":2} },
            { text: "A selection (IF) that tests for a mark of 50 or more (accept > 49)", marks: 1, match: {"type":"keywords","groups":[[">= 50",">=50","> 49",">49","50 or more","≥ 50"]],"needCount":1} },
            { text: "The counter is increased by 1 inside the selection", marks: 1, match: {"type":"keywords","groups":[["+ 1","+1","++"]],"needCount":1} },
            { text: "The count is output after the loop", marks: 1, match: {"type":"keywords","groups":[["output","print","display","write"]],"needCount":1} }
          ],
          explanation: "Example:\nCount ← 0\nFOR Student ← 1 TO 20\n    INPUT Mark\n    IF Mark >= 50\n      THEN\n        Count ← Count + 1\n    ENDIF\nNEXT Student\nOUTPUT Count"
        }
      ]
    },
    comm9618_exam: {
      key: "comm9618_exam",
      title: "Topic 14: Communication & Internet Technologies — Exam Practice",
      subtitle: "5 exam-style questions · Protocols, email, BitTorrent, circuit & packet switching · 16 marks total",
      classes: ["12BR"],
      totalMarks: 16,
      singleAttempt: true,
      questions: [
        {
          id: "Q1", marks: 3, difficulty: "intermediate",
          topic: "TCP/IP Layers & Transport Layer",
          prompt: "(a) State the four layers of the TCP/IP protocol suite in correct order from top to bottom. [2 marks]\n(b) Describe one function of the Transport layer. [1 mark]",
          markPoints: [
            { text: "(a) Application and Transport named as the top two layers", marks: 1, match: { type: "keywords", groups: [["application"], ["transport"]], needCount: 2 } },
            { text: "(a) Internet (or Network) and Link (or Data Link) named as the bottom two layers", marks: 1, match: { type: "keywords", groups: [["internet","network"], ["link","data link"]], needCount: 2 } },
            { text: "(b) Any one of: end-to-end delivery between hosts; breaks data into packets with sequence numbers; ensures error-free/reliable arrival, retransmitting lost packets", marks: 1, match: { type: "keywords", groups: [["end-to-end","end to end","host to host","sender to receiver","host-to-host"], ["sequence number","breaks the data","breaks data into packets","splits data into packets"], ["retransmit","error-free","error free","reliable delivery","ensures delivery","guarantees delivery","reliable transmission"]], needCount: 1 } }
          ],
          explanation: "The TCP/IP stack, top to bottom, is Application, Transport, Internet, and Link. The Transport layer manages end-to-end delivery between hosts — for example, breaking data into packets with sequence numbers and working to ensure it arrives correctly, retransmitting anything lost along the way."
        },
        {
          id: "Q2", marks: 3, difficulty: "intermediate",
          topic: "Email Protocols",
          prompt: "(a) Name the protocol used to send emails between mail servers. [1 mark]\n(b) Explain one operational difference between POP3 and IMAP when retrieving emails. [2 marks]",
          markPoints: [
            { text: "(a) SMTP (Simple Mail Transfer Protocol)", marks: 1, match: { type: "keywords", groups: [["smtp"]], needCount: 1 } },
            { text: "(b) POP3 downloads email messages onto the client computer (removing them from the server)", marks: 1, match: { type: "keywords", groups: [["pop3"], ["download","downloads","remove","removes","removed","deletes","local","locally","client computer","client device"]], needCount: 2 } },
            { text: "(b) IMAP stores emails on the server and synchronizes them across multiple client devices", marks: 1, match: { type: "keywords", groups: [["imap"], ["server","synchron","sync","multiple device","every device","any device","across devices"]], needCount: 2 } }
          ],
          explanation: "SMTP (Simple Mail Transfer Protocol) sends email between a client and a mail server, and between mail servers. POP3 downloads messages onto the client device and typically removes them from the server, while IMAP keeps messages stored on the server and synchronises them across every device the student checks mail from."
        },
        {
          id: "Q3", marks: 3, difficulty: "intermediate",
          topic: "BitTorrent / Peer-to-Peer Sharing",
          prompt: "Explain what is meant by the phrase: \"BitTorrent protocol provides peer-to-peer file sharing.\" [3 marks]",
          markPoints: [
            { text: "Allows sharing of files between thousands of users connected over the internet", marks: 1, match: { type: "keywords", groups: [["thousands","many users","multiple users","large number","numerous"]], needCount: 1 } },
            { text: "Users share files directly with each other / users' computers act as peers", marks: 1, match: { type: "keywords", groups: [["directly","peer","peers","each other","between users","user to user","computer to computer"]], needCount: 1 } },
            { text: "No central web server/device is used; all users are of equal status", marks: 1, match: { type: "keywords", groups: [["no central","without a central","decentralis","decentraliz","no single server","not stored on one server","equal status","no main server"]], needCount: 1 } }
          ],
          explanation: "BitTorrent lets a file be shared among many users at once over the internet. Rather than everyone downloading from one central web server, users' own computers connect directly to each other as peers, uploading and downloading pieces between themselves, with no single central device and every peer treated equally."
        },
        {
          id: "Q4", marks: 4, difficulty: "hard",
          topic: "Circuit Switching: Benefits & Drawbacks",
          prompt: "Circuit switching can be used for data transmission.\n(a) State two benefits of circuit switching. [2 marks]\n(b) State two drawbacks of circuit switching. [2 marks]",
          markPoints: [
            { text: "(a) Any two of: guaranteed/dedicated bandwidth; minimal delay/real-time transmission; packets arrive in sequence", marks: 2, match: { type: "keywords", groups: [["guaranteed bandwidth","dedicated bandwidth","dedicated channel","dedicated line","dedicated connection","reserved bandwidth"], ["real-time","real time","minimal delay","no delay","low delay","low latency","immediate","consistent speed","constant rate"], ["in sequence","in order","sequential","same order","no reordering","arrive in order"]], needCount: 2, marksPerGroup: 1 } },
            { text: "(b) Any two of: bandwidth wasted when idle; channel unavailable to other users; setup time required; a link failure drops the whole connection", marks: 2, match: { type: "keywords", groups: [["wasted","waste","unused capacity","idle","inefficient use"], ["unavailable","busy","blocked","tied up","in use","can't be used","cannot be used","not available to other"], ["setup time","set up time","time to establish","establish the circuit","connection time","takes time to connect"], ["fail","drop","breaks the connection","connection is lost","call drops","entire connection fails","whole connection fails"]], needCount: 2, marksPerGroup: 1 } }
          ],
          explanation: "Benefits: a dedicated circuit gives guaranteed/reserved bandwidth and a consistent, real-time connection, with packets arriving in the same order they were sent. Drawbacks: that same dedicated channel sits idle (wasting bandwidth) whenever no data is being sent, stays unavailable to every other user for as long as the call lasts, takes time to set up before any data can flow, and the whole connection is lost if any link along that one fixed path fails."
        },
        {
          id: "Q5", marks: 3, difficulty: "hard",
          topic: "Routers & Packet Switching",
          prompt: "Describe the role and function of a router in packet switching across the internet. [3 marks]",
          markPoints: [
            { text: "Examines the destination IP address in the packet header", marks: 1, match: { type: "keywords", groups: [["destination ip","destination address","ip address"]], needCount: 1 } },
            { text: "Consults its internal routing table", marks: 1, match: { type: "keywords", groups: [["routing table"]], needCount: 1 } },
            { text: "Selects the optimal/fastest next hop route across the network", marks: 1, match: { type: "keywords", groups: [["next hop","next-hop","best route","optimal route","fastest route","best path","most efficient route","selects the route","chooses the route","determines the route","forwards it along"]], needCount: 1 } }
          ],
          explanation: "A router reads the destination IP address in a packet's header, checks it against its own routing table, and uses that to choose the best next-hop route to forward the packet along, moving it closer to its destination across the network."
        }
      ]
    },

    // Source: the teacher-supplied "Grade 10AM Practice Quiz: Systematic
    // Troubleshooting" document's Section 3 (Short Answer, Q31-Q35 in that
    // source's own numbering, renumbered Q1-Q5 here to match this paper's
    // own local id convention, same as datarep_exam above). Every
    // question's marks are the verified total of its own markPoints,
    // summing to 7. Two of the source's questions (Q34/Q35) originally
    // awarded 0.5 marks per valid step named (4 steps for 2 marks each) --
    // that doesn't fit this page's self-grading UI, which only offers
    // whole-mark steps (see renderMarkPoints()'s <select> in
    // exam-practice.html), so those two were restructured as "any TWO of
    // several valid steps, worth 1 mark each" instead -- same total marks,
    // same list of acceptable answers, just whole-number marking.
    troubleshoot_exam: {
      key: "troubleshoot_exam",
      title: "Sprint 1.1: Systematic Troubleshooting — Exam Practice",
      subtitle: "5 exam-style questions · Troubleshooting method, data migration, printers, email & displays · 7 marks total",
      classes: ["10AM1","10AM2","10AM3","10AM4","10AM5","10AM6"],
      totalMarks: 7,
      questions: [
        {
          id: "Q1", marks: 1, difficulty: "easy",
          topic: "Troubleshooting Methodology",
          prompt: "List the first two steps of the 6-step systematic troubleshooting methodology, in order.",
          markPoints: [
            {
              text: "Step 1: Identify the problem; Step 2: Establish a hypothesis about the likely cause",
              marks: 1,
              match: { type: "keywords", groups: [["identify the problem","identifying the problem","identify the issue","gather information"], ["establish a hypothesis","hypothesis","establish the cause","likely cause","probable cause"]], needCount: 2 }
            }
          ],
          explanation: "The method begins by identifying the problem — gathering information from the user and the system — then establishing a hypothesis about its probable cause, ready to test as Step 3."
        },
        {
          id: "Q2", marks: 1, difficulty: "intermediate",
          topic: "Data Migration",
          prompt: "Explain why it is necessary to back up data before starting a device migration.",
          markPoints: [
            {
              text: "Protects against permanent data loss if something goes wrong or is interrupted during the transfer",
              marks: 1,
              match: { type: "keywords", groups: [["data loss","lose data","losing data","lost if","nothing is lost","goes wrong","fails","failure","corrupt","interrupted","safety net","in case","backup copy"]], needCount: 1 }
            }
          ],
          explanation: "Backing up first means that if the migration fails, is interrupted, or something is corrupted partway through, nothing is permanently lost — the backup can be used to restore the data."
        },
        {
          id: "Q3", marks: 1, difficulty: "intermediate",
          topic: "Printer Troubleshooting",
          prompt: "A newly installed printer fails to print a test page because of a driver issue. What should you do to resolve this?",
          markPoints: [
            {
              text: "Go to the printer manufacturer's official website and download/install the correct driver for the exact model and operating system",
              marks: 1,
              match: { type: "keywords", groups: [["manufacturer","official website","manufacturer's website","official site"], ["driver"]], needCount: 2 }
            }
          ],
          explanation: "Drivers should come from the printer manufacturer's own official website, matched exactly to the printer model and the operating system version in use — generic or third-party drivers can cause the same failure again."
        },
        {
          id: "Q4", marks: 2, difficulty: "hard",
          topic: "Email Troubleshooting",
          prompt: "Nora cannot send or receive emails on her desktop client. State two troubleshooting steps she should try before reinstalling the software or contacting her service provider.",
          markPoints: [
            {
              text: "Any two of: check the internet connection; verify account credentials/server settings; check mailbox storage capacity; check spam/filter folders; check antivirus/firewall settings; restart the computer",
              marks: 2,
              match: { type: "keywords", groups: [["internet connection","connection is stable","wifi","network connection","check her connection"], ["credentials","password","server settings","account settings","incoming server","outgoing server"], ["storage capacity","mailbox full","mailbox storage","out of space","quota","full mailbox"], ["spam folder","filter","junk folder","filters"], ["antivirus","firewall"], ["restart the computer","reboot","restart the device","power cycle","restart her computer"]], needCount: 2, marksPerGroup: 1 }
            }
          ],
          explanation: "Before escalating to a reinstall or the service provider, sensible checks include: the internet connection itself, the account's credentials and server settings, whether the mailbox has run out of storage, spam/filter folders hiding messages, antivirus or firewall software blocking the client, and simply restarting the computer."
        },
        {
          id: "Q5", marks: 2, difficulty: "hard",
          topic: "HDMI/Display Troubleshooting",
          prompt: "A student's laptop will not project to an external display via HDMI. Describe two steps in a diagnostic escalation path to fix or isolate the issue.",
          markPoints: [
            {
              text: "Any two of: check physical connections/power/input source; check the laptop's display output setting (extend/duplicate); update drivers or try a different cable/port; test a different device or a different display",
              marks: 2,
              match: { type: "keywords", groups: [["cable","connection","power","input source","hdmi port","plugged in"], ["display settings","extend","duplicate","output setting","projection mode","display output"], ["driver","different cable","different port","update"], ["different device","different display","another monitor","another display","isolate","swap"]], needCount: 2, marksPerGroup: 1 }
            }
          ],
          explanation: "A sensible escalation path checks the physical connection and power/input source first, then the laptop's own display output setting (extend vs duplicate), then drivers or swapping the cable/port, and finally isolates the fault by testing a different device on the same display, or the same laptop on a different display."
        }
      ]
    }
  };

  // Mirrors quiz-data.js's EXAM_CHOICES_BY_CLASS / examChoicesForClass:
  // which exam PAPER(s) a class can practise, for the second
  // "Topical Real Exam Questions" dropdown on quiz.html's start screen.
  var EXAM_PAPER_CHOICES_BY_CLASS = [
    { test: /^10am/i, choices: [
      { key: "troubleshoot_exam", label: "Sprint 1.1: Systematic Troubleshooting — exam style" }
    ] },
    { test: /^10br/i, choices: [
      { key: "datarep_exam", label: "Topic 1: Data Representation — IGCSE exam style" },
      { key: "datatrans_exam", label: "Topic 2: Data transmission - IGCSE exam style" },
      { key: "hardware_exam", label: "Topic 3: Hardware - IGCSE exam style" },
      { key: "software_exam", label: "Topic 4: Software - IGCSE exam style" },
      { key: "internet_exam", label: "Topic 5: The Internet and its Uses - IGCSE exam style" },
      { key: "automated_exam", label: "Topic 6: Automated and Emerging Technologies - IGCSE exam style" },
      { key: "algo_exam", label: "Topic 7: Algorithm Design - IGCSE exam style" },
      { key: "programming_exam", label: "Topic 8: Programming - IGCSE exam style" },
      { key: "databases_exam", label: "Topic 9: Databases - IGCSE exam style" },
      { key: "boolean_exam", label: "Topic 10: Boolean Logic - IGCSE exam style" }
    ] },
    { test: /^12br/i, choices: [
      { key: "comm9618_exam", label: "Topic 14: Communication & Internet Technologies — A Level exam style" }
    ] }
  ];

  function examPaperChoicesForClass(cls){
    for(var i = 0; i < EXAM_PAPER_CHOICES_BY_CLASS.length; i++){
      if(EXAM_PAPER_CHOICES_BY_CLASS[i].test.test(cls)) return EXAM_PAPER_CHOICES_BY_CLASS[i].choices;
    }
    return [];
  }

  var EXAM_PAPER_DIFFICULTY_LABELS = { easy: "Easy", intermediate: "Intermediate", hard: "Hard" };
  function examPaperDifficultyLabel(d){
    return EXAM_PAPER_DIFFICULTY_LABELS[d] || (d ? d.charAt(0).toUpperCase() + d.slice(1) : "");
  }
