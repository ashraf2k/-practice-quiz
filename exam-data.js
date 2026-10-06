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
          id: "Q1", marks: 1, difficulty: "easy",
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
          id: "Q2", marks: 2, difficulty: "easy",
          topic: "Hexadecimal Basics",
          prompt: "State the base of the hexadecimal number system, and identify how many binary bits are represented by a single hexadecimal digit.",
          markPoints: [
            { text: "Base 16", marks: 1, match: { type: "keywords", groups: [["16","sixteen"]], needCount: 1 } },
            { text: "4 bits (1 nibble)", marks: 1, match: { type: "keywords", groups: [["4 bit","4-bit","four bit","nibble"]], needCount: 1 } }
          ],
          explanation: "Hexadecimal is a base-16 number system using digits 0–9 and letters A–F (A=10 to F=15). Because 2^4 = 16, exactly 4 binary bits (one nibble) correspond to one hexadecimal digit."
        },
        {
          id: "Q3", marks: 1, difficulty: "easy",
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
          id: "Q4", marks: 1, difficulty: "easy",
          topic: "Storage Units (bits/Bytes)",
          prompt: "Convert 32 bits into Bytes.",
          markPoints: [
            { text: "4 Bytes (Working: 32 / 8 = 4)", marks: 1, match: { type: "numeric", values: ["4"] } }
          ],
          explanation: "There are 8 bits in 1 Byte. Dividing 32 bits by 8 yields 4 Bytes."
        },
        {
          id: "Q5", marks: 1, difficulty: "easy",
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
          id: "Q6", marks: 2, difficulty: "intermediate",
          topic: "Hexadecimal Conversion",
          prompt: "A network router displays an error code in hexadecimal as 3E.\n(a) Convert 3E into an 8-bit binary number.\n(b) Convert 3E into a denary integer.",
          markPoints: [
            { text: "(a) 00111110", marks: 1, match: { type: "numeric", values: ["00111110"] } },
            { text: "(b) 62", marks: 1, match: { type: "numeric", values: ["62"] } }
          ],
          explanation: "Binary: 3 = 0011 and E (14) = 1110. Joining nibbles gives 00111110. Denary: (3 × 16) + (14 × 1) = 48 + 14 = 62."
        },
        {
          id: "Q7", marks: 3, difficulty: "intermediate",
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
          id: "Q8", marks: 2, difficulty: "intermediate",
          topic: "Logical Shifts",
          prompt: "A register contains the 8-bit binary integer 00110100 (denary 52).\n(a) Perform a logical shift 2 places to the left. Give the resulting binary number.\n(b) Perform a logical shift 1 place to the right on the ORIGINAL binary number. State the denary result.",
          markPoints: [
            { text: "(a) 11010000", marks: 1, match: { type: "numeric", values: ["11010000"] } },
            { text: "(b) 26 (00011010)", marks: 1, match: { type: "numeric", values: ["26","00011010"] } }
          ],
          explanation: "Left shift by 2: move all bits left 2 places, fill with 0s on the right → 11010000 (52 × 2² = 208). Right shift by 1: move all bits right 1 place → 00011010 (52 / 2 = 26)."
        },
        {
          id: "Q9", marks: 2, difficulty: "intermediate",
          topic: "Two's Complement",
          prompt: "Convert the negative denary integer −35 into an 8-bit two's complement binary integer. Show your working.",
          markPoints: [
            { text: "Positive binary (00100011) or inverted bits (11011100) shown", marks: 1, match: { type: "numeric", values: ["00100011","11011100"] } },
            { text: "Final answer: 11011101", marks: 1, match: { type: "numeric", values: ["11011101"] } }
          ],
          explanation: "1. Positive +35 in 8-bit binary: 00100011. 2. Invert all bits: 11011100. 3. Add 1: 11011101. Check: −128+64+16+8+4+1 = −35."
        },
        {
          id: "Q10", marks: 2, difficulty: "intermediate",
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
          id: "Q11", marks: 3, difficulty: "intermediate",
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
          id: "Q12", marks: 2, difficulty: "intermediate",
          topic: "Colour Depth",
          prompt: "A digital graphic uses a colour depth of 6 bits per pixel.\n(a) Calculate the maximum number of unique colours that can be represented.\n(b) Explain why increasing the colour depth increases the overall file size of the image.",
          markPoints: [
            { text: "(a) 64 colours (2^6)", marks: 1, match: { type: "numeric", values: ["64"] } },
            { text: "(b) More bits are required to store the colour code for each pixel", marks: 1, match: { type: "keywords", groups: [["more bits","extra bits","bits per pixel","bits to store"], ["file size","larger","bigger","increase"]], needCount: 2 } }
          ],
          explanation: "Colour capacity is 2^(colour depth). With 6 bits, 2^6 = 64 unique colours. Because every pixel holds 6 bits instead of fewer, the file footprint grows proportionally."
        },
        {
          id: "Q13", marks: 2, difficulty: "intermediate",
          topic: "IEC Storage Units",
          prompt: "(a) Calculate how many Mebibytes (MiB) are contained in 3 Gibibytes (GiB).\n(b) State the correct IEC unit abbreviation for 2^40 bytes.",
          markPoints: [
            { text: "(a) 3072 MiB (3 × 1024)", marks: 1, match: { type: "numeric", values: ["3072"] } },
            { text: "(b) Tebibyte / TiB", marks: 1, match: { type: "keywords", groups: [["tib","tebibyte"]], needCount: 1 } }
          ],
          explanation: "The 0478 syllabus uses IEC binary prefixes (1024 = 2^10 multiplier). 1 GiB = 1024 MiB, so 3 GiB = 3072 MiB. 2^10=KiB, 2^20=MiB, 2^30=GiB, 2^40=TiB."
        },
        {
          id: "Q14", marks: 3, difficulty: "intermediate",
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
          id: "Q15", marks: 2, difficulty: "intermediate",
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
          id: "Q16", marks: 4, difficulty: "hard",
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
          id: "Q17", marks: 3, difficulty: "hard",
          topic: "Two's Complement Range & Conversion",
          prompt: "(a) State the smallest (most negative) and largest (most positive) denary integers that can be stored in an 8-bit two's complement register.\n(b) Convert the two's complement binary integer 10101100 into a denary integer. Show your working.",
          markPoints: [
            { text: "(a) Smallest −128, largest +127", marks: 1, match: { type: "keywords", groups: [["-128","128"], ["127"]], needCount: 2 } },
            { text: "(b) −84, with place-value weights shown (−128 + 32 + 8 + 4)", marks: 2, match: { type: "numeric", values: ["-84"] } }
          ],
          explanation: "(a) An 8-bit two's complement system ranges from −2^7 (10000000 = −128) to +2^7−1 (01111111 = +127). (b) (−128×1)+(32×1)+(8×1)+(4×1) = −128+32+8+4 = −84."
        },
        {
          id: "Q18", marks: 4, difficulty: "hard",
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
          id: "Q19", marks: 4, difficulty: "hard",
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
          id: "Q20", marks: 4, difficulty: "hard",
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
          id: "Q1", marks: 3, difficulty: "easy",
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
          id: "Q2", marks: 3, difficulty: "easy",
          topic: "Data Packet Structure",
          prompt: "A data packet has a header, a payload and a trailer. For EACH of the three sections, identify one item of data that is stored in it.",
          markPoints: [
            { text: "Header: destination IP address // sender's/originator's IP address // packet sequence number // packet size // hop count / TTL", marks: 1, match: { type: "keywords", groups: [["destination","ip address","sequence","packet number","packet size","originator","sender","ttl","time to live","hop"]], needCount: 1 } },
            { text: "Payload: the actual data / body of the file being sent", marks: 1, match: { type: "keywords", groups: [["actual data","the data","data being sent","file being sent","body","content","part of the file","part of the message"]], needCount: 1 } },
            { text: "Trailer: CRC // checksum // error-checking bits // end-of-packet marker", marks: 1, match: { type: "keywords", groups: [["crc","cyclic","checksum","error check","error-check","error detect","end of packet","end-of-packet","end marker"]], needCount: 1 } }
          ],
          explanation: "Header: routing information such as the destination IP address, the originator's IP address, the packet sequence number and packet size. Payload: the actual data (part of the file) being sent. Trailer: error-checking data such as a CRC or checksum, and an end-of-packet marker."
        },
        {
          id: "Q3", marks: 4, difficulty: "easy",
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
          id: "Q4", marks: 3, difficulty: "easy",
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
          id: "Q5", marks: 1, difficulty: "easy",
          topic: "USB Interface",
          prompt: "State one drawback of using a USB connection.",
          markPoints: [
            { text: "Any one of: maximum cable length is limited (e.g. about 5 m) without hubs; slower than internal connections / fibre optics; very early USB standards may not be supported by modern systems", marks: 1, match: { type: "keywords", groups: [["length","distance","5 m","5m","metres","meters","short"],["slower","slow","internal","fibre","fiber","pcie"],["early","old","older","usb 1","not supported","compatib"]], needCount: 1 } }
          ],
          explanation: "Drawbacks include: the maximum cable length is restricted (about 5 metres) without hubs; the data transfer speed is slower than internal bus connections or fibre optics; and very early USB standards may not be supported by modern systems."
        },
        {
          id: "Q6", marks: 2, difficulty: "easy",
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
          id: "Q7", marks: 2, difficulty: "easy",
          topic: "Check Digits",
          prompt: "A barcode on a supermarket product includes a check digit. Identify two types of human error that a check digit is designed to detect when a code is entered manually or scanned.",
          markPoints: [
            {
              text: "Any two of: incorrect digit entered; transposition (two adjacent digits swapped); omitted digit; extra digit; phonetic error (e.g. 13 for 30)",
              marks: 2,
              match: {
                type: "keywords",
                groups: [["incorrect digit","wrong digit","wrong number","incorrect number","mistyped","typing error","typo"],["transpos","swapped","swap","wrong order","switched","adjacent digits"],["omit","missing","left out","forgot","leave out","too few"],["extra digit","additional digit","added digit","too many","extra number"],["phonetic","sounds like","sound"]],
                needCount: 2,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "A check digit catches common human data-entry errors: an incorrect digit (e.g. 5 typed instead of 8), a transposition error (e.g. 52 typed instead of 25), an omitted digit, an extra digit, or a phonetic error (e.g. 13 entered instead of 30)."
        },
        {
          id: "Q8", marks: 2, difficulty: "easy",
          topic: "Encryption Concepts",
          prompt: "Data sent across public networks can be encrypted to keep it confidential. State the meaning of the terms plaintext and ciphertext.",
          markPoints: [
            { text: "Plaintext: the original, unencrypted data/text that is human-readable", marks: 1, match: { type: "keywords", groups: [["original","unencrypted","not encrypted","before encrypt","readable","normal text","un-encrypted"]], needCount: 1 } },
            { text: "Ciphertext: encrypted / scrambled data that is unreadable without the decryption key", marks: 1, match: { type: "keywords", groups: [["encrypted","scrambled","unreadable","not readable","after encrypt","cannot be read","can't be read","meaningless","coded"]], needCount: 1 } }
          ],
          explanation: "Plaintext is the original, readable data before encryption. Ciphertext is the scrambled, unreadable data produced by encryption, which only someone with the correct key can turn back into plaintext."
        },
        {
          id: "Q9", marks: 1, difficulty: "easy",
          topic: "Encryption Concepts",
          prompt: "State the major security weakness of symmetric encryption when data is sent across an insecure network.",
          markPoints: [
            { text: "The single secret key has to be shared with the recipient (key distribution problem), so it could be intercepted", marks: 1, match: { type: "keywords", groups: [["key distribution","share the key","shared","send the key","sent the key","transmit the key","transmitted","intercept","same key","one key","secret key"]], needCount: 1 } }
          ],
          explanation: "Symmetric encryption uses one secret key for both encrypting and decrypting, so that key must be passed to the recipient. If it is sent over an insecure channel it can be intercepted, and then anyone can decrypt the data (the key distribution problem)."
        },

        // ============== INTERMEDIATE TIER ==============
        {
          id: "Q10", marks: 4, difficulty: "hard",
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
          id: "Q11", marks: 3, difficulty: "intermediate",
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
          id: "Q12", marks: 2, difficulty: "intermediate",
          topic: "USB Interface",
          prompt: "Explain why USB-C is considered an improvement over older USB-A connectors.",
          markPoints: [
            {
              text: "Any two of: symmetrical / reversible design (can be plugged in either way up); higher data transfer rates; higher power delivery (e.g. up to 100 W); smaller / thinner connector",
              marks: 2,
              match: {
                type: "keywords",
                groups: [["either way","both ways","any way up","reversible","symmetrical","symmetric","wrong way","upside down"],["faster","higher data","transfer rate","higher speed","gbps","speed"],["power","100w","100 w","charge laptop","charging"],["smaller","thinner","compact","slim","footprint"]],
                needCount: 2,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "USB-C is reversible (symmetrical, so it plugs in either way up), supports much higher data transfer rates (about 10–40 Gbps), can deliver more power (up to 100 W, enough for laptops), and has a smaller, thinner connector suited to modern thin devices."
        },
        {
          id: "Q13", marks: 3, difficulty: "intermediate",
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
          id: "Q14", marks: 2, difficulty: "intermediate",
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
          id: "Q15", marks: 2, difficulty: "intermediate",
          topic: "Parity Checks",
          prompt: "A parity block check is used. Describe how the receiving system locates a corrupted bit.",
          markPoints: [
            { text: "Parity is checked for every row (byte) and for every column (bit position)", marks: 1, match: { type: "keywords", groups: [["row","byte"],["column","bit position","vertical"]], needCount: 2 } },
            { text: "The corrupted bit is at the intersection of the row and the column that have the wrong parity", marks: 1, match: { type: "keywords", groups: [["intersection","where they meet","where the row and column","cross","meet","both"]], needCount: 1 } }
          ],
          explanation: "The receiver recalculates the parity of each row (byte) and each column (bit position). The one row and the one column that fail the check cross at the corrupted bit — its intersection."
        },
        {
          id: "Q16", marks: 3, difficulty: "intermediate",
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
          id: "Q17", marks: 2, difficulty: "intermediate",
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
          id: "Q18", marks: 2, difficulty: "intermediate",
          topic: "Check Digits",
          prompt: "Explain the difference between error detection during data transmission and a check digit check.",
          markPoints: [
            { text: "Transmission error detection (parity, checksum, etc.) finds bits corrupted by noise / interference while data travels across a network", marks: 1, match: { type: "keywords", groups: [["transmi","network","interference","noise","corrupt","bits","travel"]], needCount: 1 } },
            { text: "A check digit is a validation check that finds human errors when data is entered manually / scanned", marks: 1, match: { type: "keywords", groups: [["validation","validate","human","manual","typed","typing","entered","entry","scan"]], needCount: 1 } }
          ],
          explanation: "Transmission error detection (parity, checksum, echo check, ARQ) checks whether bits were corrupted by interference while data travelled over a network. A check digit is a validation method that detects human mistakes made when data is entered manually or scanned — it is not used to check network transmission."
        },
        {
          id: "Q19", marks: 3, difficulty: "intermediate",
          topic: "Encryption Concepts",
          prompt: "Describe how symmetric encryption operates.",
          markPoints: [
            {
              text: "Any three of: plaintext is put through an encryption algorithm / cipher; one secret key encrypts the plaintext into ciphertext; the ciphertext is transmitted; the receiver uses the same secret key to decrypt it back into plaintext",
              marks: 3,
              match: {
                type: "keywords",
                groups: [["algorithm","cipher","plaintext","plain text"],["one key","single key","secret key","same key","a key","one secret"],["transmitted","sent","send","travels","across the network","ciphertext"],["decrypt","same key","same secret key","back into plaintext","turn it back","unscramble"]],
                needCount: 3,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "The plaintext is passed through an encryption algorithm using a single secret key to produce ciphertext. The ciphertext is sent across the network, and the receiver uses the same secret key to decrypt it back into plaintext."
        },
        {
          id: "Q20", marks: 2, difficulty: "intermediate",
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
          id: "Q21", marks: 3, difficulty: "hard",
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
          id: "Q22", marks: 4, difficulty: "hard",
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
          id: "Q23", marks: 4, difficulty: "hard",
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
          id: "Q1", marks: 3, difficulty: "easy",
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
          id: "Q2", marks: 2, difficulty: "easy",
          topic: "CPU Performance Factors",
          prompt: "Explain how the clock speed of a CPU affects its performance.",
          markPoints: [
            { text: "Clock speed is the number of clock cycles (FDE cycles) the CPU carries out per second", marks: 1, match: { type: "keywords", groups: [["per second","each second","every second","hertz","ghz","cycles"]], needCount: 1 } },
            { text: "A higher clock speed means more instructions are processed per second, so the CPU is faster", marks: 1, match: { type: "keywords", groups: [["more instructions","faster","more cycles","quicker","higher performance","processes more","executes more"]], needCount: 1 } }
          ],
          explanation: "Clock speed is the number of clock cycles (and so FDE cycles) the CPU can carry out each second. A higher clock speed means more instructions can be processed per second, so the CPU performs faster."
        },
        {
          id: "Q3", marks: 2, difficulty: "easy",
          topic: "CPU Performance Factors",
          prompt: "Explain how the cache size of a CPU affects its performance.",
          markPoints: [
            { text: "Cache is very fast memory in or near the CPU that stores frequently used data and instructions", marks: 1, match: { type: "keywords", groups: [["frequently used","most used","often used","commonly used","fast memory","high-speed","high speed","faster than ram","store"]], needCount: 1 } },
            { text: "A larger cache means less need to fetch from the slower RAM, so processing is faster", marks: 1, match: { type: "keywords", groups: [["slower ram","from ram","less time","fewer","reduces the need","quicker access","faster access","faster","speed"]], needCount: 1 } }
          ],
          explanation: "Cache is high-speed memory inside or near the CPU that stores frequently used data and instructions. A larger cache holds more of them, so the CPU has to fetch from the slower RAM less often, which increases processing speed."
        },
        {
          id: "Q4", marks: 2, difficulty: "easy",
          topic: "CPU Performance Factors",
          prompt: "Explain how the number of cores in a CPU affects its performance.",
          markPoints: [
            { text: "A core is an independent processing unit (with its own ALU, CU and registers)", marks: 1, match: { type: "keywords", groups: [["independent","own alu","processing unit","separate","its own","each core","a core is","individual"]], needCount: 1 } },
            { text: "More cores allow several instructions / FDE cycles to be processed at the same time (parallel processing)", marks: 1, match: { type: "keywords", groups: [["same time","simultaneous","at once","parallel","multiple instructions","several instructions","more instructions","multitask"]], needCount: 1 } }
          ],
          explanation: "A core is an independent processing unit containing its own ALU, control unit and registers. With more cores, several instructions (FDE cycles) can be processed at the same time, which speeds up work that can be run in parallel."
        },
        {
          id: "Q5", marks: 2, difficulty: "easy",
          topic: "Embedded Systems",
          prompt: "Define the term embedded system.",
          markPoints: [
            { text: "A combination of hardware and software designed to perform a dedicated / specific function", marks: 1, match: { type: "keywords", groups: [["dedicated","specific function","one function","single function","particular function","specific task","one task","single task","specific purpose"]], needCount: 1 } },
            { text: "Built into a larger mechanical or electrical device / system", marks: 1, match: { type: "keywords", groups: [["built into","built in","part of a larger","inside a","within a","larger system","larger device","embedded in","inside another","part of another"]], needCount: 1 } }
          ],
          explanation: "An embedded system is a combination of hardware and software designed to carry out a dedicated, specific function, and which is built into a larger mechanical or electrical device (for example a washing machine or a car)."
        },
        {
          id: "Q6", marks: 2, difficulty: "easy",
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
          id: "Q7", marks: 3, difficulty: "easy",
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
          id: "Q8", marks: 1, difficulty: "easy",
          topic: "Virtual Memory",
          prompt: "Define the term thrashing, in relation to virtual memory.",
          markPoints: [
            { text: "The CPU spends more time swapping pages between RAM and virtual memory than executing instructions, so performance slows badly", marks: 1, match: { type: "keywords", groups: [["swapping","swap","moving pages","transferring pages","paging"],["more time","most of its time","constantly","continuously","slow","than executing","instead of executing"]], needCount: 2 } }
          ],
          explanation: "Thrashing is when the CPU spends more time swapping data pages back and forth between RAM and virtual memory than executing instructions, which severely slows down performance."
        },
        {
          id: "Q9", marks: 3, difficulty: "easy",
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
          id: "Q10", marks: 2, difficulty: "easy",
          topic: "Cloud Storage",
          prompt: "Define the term cloud storage.",
          markPoints: [
            { text: "Data is stored remotely on physical servers owned and managed by a third-party hosting company", marks: 1, match: { type: "keywords", groups: [["remote","off-site","offsite","servers","third party","third-party","hosting company","provider","data centre","data center"]], needCount: 1 } },
            { text: "It is accessed over the Internet / a network connection", marks: 1, match: { type: "keywords", groups: [["internet","online","network","web","connection"]], needCount: 1 } }
          ],
          explanation: "Cloud storage keeps data remotely on physical servers that are owned and managed by a third-party hosting company, and the data is accessed through the Internet."
        },
        {
          id: "Q11", marks: 3, difficulty: "easy",
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
          id: "Q12", marks: 2, difficulty: "intermediate",
          topic: "CPU Performance Factors",
          prompt: "A student compares two computers for video editing.\nComputer A: quad-core 2.8 GHz CPU with 8 MiB of cache.\nComputer B: dual-core 3.6 GHz CPU with 2 MiB of cache.\nState which computer is likely to run multi-threaded rendering software more efficiently, and justify your answer.",
          markPoints: [
            { text: "Computer A", marks: 1, match: { type: "keywords", groups: [["computer a","a)","quad","answer a","computer a."]], needCount: 1 } },
            { text: "It has four cores (quad-core) compared with two, so more tasks / threads can be processed at the same time", marks: 1, match: { type: "keywords", groups: [["4 core","four core","quad","more cores","4 cores","four cores"],["same time","simultaneous","parallel","at once","threads","more tasks","more instructions"]], needCount: 2 } }
          ],
          explanation: "Computer A. Multi-threaded software can use several cores at once, and A has four cores compared with B's two, so four tasks or threads can be processed simultaneously."
        },
        {
          id: "Q13", marks: 3, difficulty: "intermediate",
          topic: "Embedded Systems",
          prompt: "An automated espresso machine contains a microcontroller that manages water heating, pump pressure and bean grinding. State three characteristics of an embedded system, as shown by the coffee machine.",
          markPoints: [
            {
              text: "Any three of: dedicated single purpose; program (firmware) stored permanently in ROM / non-volatile memory; uses a microprocessor / microcontroller; hardware dedicated and not easily upgraded; low power consumption; simple user interface (buttons / knobs)",
              marks: 3,
              match: {
                type: "keywords",
                groups: [["dedicated","single purpose","one purpose","single function","one function","specific function","specific task","one task"],["rom","firmware","non-volatile","non volatile","stored permanently","permanently stored"],["microprocessor","microcontroller"],["cannot be upgraded","can't be upgraded","not upgraded","not easily","cannot be expanded","fixed hardware","cannot be changed"],["low power","low electrical","little power","low energy","consumes low"],["simple","buttons","knobs","limited interface","basic interface"]],
                needCount: 3,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "Characteristics of an embedded system: it has one dedicated function; its program (firmware) is stored permanently in ROM or other non-volatile memory; it uses a microprocessor or microcontroller rather than a general-purpose CPU; the hardware cannot easily be upgraded; it uses little power; and it has a simple user interface such as buttons or knobs."
        },
        {
          id: "Q14", marks: 2, difficulty: "intermediate",
          topic: "Touchscreens",
          prompt: "Touchscreens can use capacitive, resistive or infra-red technology. State which TWO of these three technologies allow multi-touch gestures, such as pinching to zoom.",
          markPoints: [
            { text: "Capacitive", marks: 1, match: { type: "keywords", groups: [["capacitive"]], needCount: 1 } },
            { text: "Infra-red", marks: 1, match: { type: "keywords", groups: [["infra-red","infrared","infra red","ir "," ir","ir."]], needCount: 1 } }
          ],
          explanation: "Capacitive screens detect electrostatic changes at several points, and infra-red grids can detect several broken beams, so both support multi-touch. A standard resistive screen registers only a single pressure point at a time."
        },
        {
          id: "Q15", marks: 4, difficulty: "intermediate",
          topic: "Touchscreens",
          prompt: "A worker wants to use a touchscreen while wearing thick cotton gloves.\n(a) State which two of the technologies (capacitive, resistive, infra-red) will work with gloves. [2 marks]\n(b) Explain why a capacitive touchscreen does not work with gloves. [1 mark]\n(c) Explain why a resistive touchscreen does work with gloves. [1 mark]",
          markPoints: [
            { text: "(a) Resistive", marks: 1, match: { type: "keywords", groups: [["resistive"]], needCount: 1 } },
            { text: "(a) Infra-red", marks: 1, match: { type: "keywords", groups: [["infra-red","infrared","infra red"]], needCount: 1 } },
            { text: "(b) The gloves block the electrical conductivity / electrostatic charge of the finger that a capacitive screen needs", marks: 1, match: { type: "keywords", groups: [["conduct","electrical","electrostatic","charge","insulat","block"]], needCount: 1 } },
            { text: "(c) A resistive screen works by mechanical pressure, which a gloved finger (or stylus) can still apply", marks: 1, match: { type: "keywords", groups: [["pressure","press","mechanical","push","physical"]], needCount: 1 } }
          ],
          explanation: "(a) Resistive and infra-red screens work with gloves. (b) Capacitive screens rely on the electrical conductivity of a bare finger, which a glove blocks. (c) Resistive screens respond to physical pressure pushing two layers together, which a gloved finger or stylus can provide. (Infra-red works because a gloved finger still breaks the light beams.)"
        },
        {
          id: "Q16", marks: 4, difficulty: "intermediate",
          topic: "Output Devices",
          prompt: "(a) State which type of printer, inkjet or laser, is best suited to high-volume, high-speed office printing, and give one reason. [2 marks]\n(b) State which type of printer is best suited to low-volume, high-quality photo printing, and give one reason. [2 marks]",
          markPoints: [
            { text: "(a) Laser printer", marks: 1, match: { type: "keywords", groups: [["laser"]], needCount: 1 } },
            { text: "(a) Reason: fast printing and / or a lower cost per page for high volumes (toner, rotating drum and fuser)", marks: 1, match: { type: "keywords", groups: [["fast","speed","quick","cost per page","cheaper per page","cheap","toner","drum","fuser","volume","large"]], needCount: 1 } },
            { text: "(b) Inkjet printer", marks: 1, match: { type: "keywords", groups: [["inkjet","ink jet","ink-jet"]], needCount: 1 } },
            { text: "(b) Reason: liquid ink gives high-quality, smoothly blended colour prints", marks: 1, match: { type: "keywords", groups: [["quality","detail","colour","color","photo","blend","smooth","liquid ink","resolution","nozzle"]], needCount: 1 } }
          ],
          explanation: "(a) A laser printer: it uses dry toner, a rotating drum and a heated fuser, which gives fast printing and a low cost per page at high volumes. (b) An inkjet printer: it squirts liquid ink through micro-nozzles, giving high-quality, smoothly blended colour output that suits photos in low volumes."
        },
        {
          id: "Q17", marks: 3, difficulty: "intermediate",
          topic: "Output Devices",
          prompt: "Describe the operation of a 3D printer.",
          markPoints: [
            {
              text: "Any three of: a 3D model is designed using CAD software; the model is sliced into thin horizontal 2D layers; the printer builds the object additively, layer by layer; material (molten plastic filament / resin / metal powder) is extruded or deposited on to the print bed; each layer is bonded / cured (heat or UV light) before the next is added",
              marks: 3,
              match: {
                type: "keywords",
                groups: [["cad","computer-aided design","computer aided design","3d model","digital model","design"],["slice","sliced","layers","cross-section","cross section"],["layer by layer","layer-by-layer","additive","one layer at a time","builds up","built up"],["filament","resin","powder","extrude","deposit","molten","plastic","material"],["cure","cured","bond","fuse","solidif","harden","uv","heat"]],
                needCount: 3,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "A 3D model is designed with CAD software and sliced into thin horizontal layers. The printer then builds the object additively, layer by layer, depositing material such as molten plastic, resin or metal powder on to the print bed, and each layer is bonded or cured with heat or UV light before the next is added."
        },
        {
          id: "Q18", marks: 3, difficulty: "intermediate",
          topic: "Primary Storage",
          prompt: "State three differences between RAM and ROM.",
          markPoints: [
            {
              text: "Any three of: RAM is volatile, ROM is non-volatile; RAM is read/write, ROM is read-only; RAM stores programs and data in use, ROM stores start-up routines (BIOS / firmware); RAM is usually much larger in capacity than ROM",
              marks: 3,
              match: {
                type: "keywords",
                groups: [["volatile","lost when","loses","power off","power is off","switched off"],["read only","read-only","read/write","read and write","can be written","cannot be written","can't be written","can be changed","cannot be changed"],["in use","currently","running","being used","start-up","startup","bios","boot","firmware"],["larger","bigger","capacity","size","more storage","smaller"]],
                needCount: 3,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "RAM is volatile (contents lost when the power is off) whereas ROM is non-volatile; RAM is read/write whereas ROM is read-only; RAM holds the programs and data currently in use whereas ROM holds start-up routines such as the BIOS; and RAM usually has a much larger capacity than ROM."
        },
        {
          id: "Q19", marks: 3, difficulty: "intermediate",
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
          id: "Q20", marks: 4, difficulty: "hard",
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
          id: "Q21", marks: 2, difficulty: "intermediate",
          topic: "MAC & IP Addresses",
          prompt: "Differentiate between a static IP address and a dynamic IP address.",
          markPoints: [
            { text: "Static: permanently assigned to a device and does not change when it reconnects", marks: 1, match: { type: "keywords", groups: [["permanent","does not change","doesn't change","never changes","fixed","stays the same","same every time","manually"]], needCount: 1 } },
            { text: "Dynamic: temporarily assigned (by a DHCP server) and can change each time the device connects", marks: 1, match: { type: "keywords", groups: [["dhcp","temporar","changes","different each time","each time","every time","reconnect","lease"]], needCount: 1 } }
          ],
          explanation: "A static IP address is permanently assigned to a device and stays the same every time it connects. A dynamic IP address is assigned temporarily by a DHCP server and can be different each time the device connects to the network."
        },
        {
          id: "Q22", marks: 2, difficulty: "intermediate",
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
          id: "Q23", marks: 4, difficulty: "hard",
          topic: "FDE Cycle",
          prompt: "Describe the step-by-step process of the FETCH stage of the Fetch-Decode-Execute cycle, referring to the registers and buses involved.",
          markPoints: [
            {
              text: "Any four of: the address of the next instruction is copied from the PC to the MAR; the PC is incremented; the address is sent from the MAR along the address bus to RAM; the instruction at that address is fetched along the data bus; the instruction is stored in the MDR; the instruction is copied from the MDR to the CIR",
              marks: 4,
              match: {
                type: "keywords",
                groups: [["pc to the mar","pc to mar","program counter to the mar","program counter to mar","copied from the pc","copied from the program counter","pc is copied","address in the pc","from the pc"],["incremented","increased by 1","increase by 1","incremented by 1","adds 1","add 1","plus 1"],["address bus"],["data bus"],["mdr","memory data register"],["cir","current instruction register"]],
                needCount: 4,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "The address in the Program Counter (PC) is copied to the Memory Address Register (MAR). The PC is incremented. The address is sent from the MAR along the address bus to RAM, and the instruction at that address is fetched along the data bus into the Memory Data Register (MDR). The instruction is then copied from the MDR to the Current Instruction Register (CIR)."
        },
        {
          id: "Q24", marks: 4, difficulty: "hard",
          topic: "Sensors & Control Systems",
          prompt: "A smart aquarium keeps the water at a constant 25 °C. Describe how the microprocessor uses data from a temperature sensor to maintain this temperature.",
          markPoints: [
            {
              text: "Any four of: the sensor continuously reads the temperature and sends an analogue signal; an ADC converts it to digital; the microprocessor receives the digital value; it compares the value with the stored preset value (25 °C); if below 25 °C it signals (via a DAC) the actuator to switch the heater ON; if at / above 25 °C it signals the heater OFF; the loop repeats continuously",
              marks: 4,
              match: {
                type: "keywords",
                groups: [["analogue","analog","continuously","sends the temperature","reads the temperature"],["adc","analogue to digital","analog to digital","analogue-to-digital","analog-to-digital"],["compare","compares","comparison","checks it against","checked against"],["stored","preset","pre-set","target","threshold","25"],["below","lower than","less than","too cold","too low","heater on","switch on","switches on","turns on","turn on"],["above","higher than","too hot","too high","heater off","switch off","switches off","turns off","turn off"],["dac","digital to analogue","digital to analog","actuator"],["repeat","continuous","loop","constantly","again"]],
                needCount: 4,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "The temperature sensor continuously reads the water temperature and sends an analogue signal. An ADC converts it to digital, and the microprocessor compares it with the stored value (25 °C). If it is below 25 °C the microprocessor sends a signal (through a DAC) to the actuator to switch the heater on; if it is at or above 25 °C it switches the heater off. This monitoring loop repeats continuously. (The sensor only reads data — it never decides or controls anything.)"
        },
        {
          id: "Q25", marks: 4, difficulty: "hard",
          topic: "Solid-State Storage",
          prompt: "Explain how data is stored and read on a solid-state drive (SSD) that uses flash memory technology.",
          markPoints: [
            {
              text: "Any four of: flash memory is made of semiconductor microchips; millions of floating-gate and control-gate transistors; NAND (or NOR) logic gates; data is stored as electrical charge; a voltage makes electrons tunnel through an insulator and become trapped on the floating gate; the trapped electrons change the voltage threshold, representing 0 or 1; no moving parts, so fast access and durable",
              marks: 4,
              match: {
                type: "keywords",
                groups: [["semiconductor","microchip","chips","transistor","flash memory"],["floating gate","floating-gate","control gate","control-gate"],["nand","nor"],["electrical charge","electric charge","charge","charged"],["tunnel","trapped","trap","insulat","electrons"],["threshold","voltage","0 and 1","0s and 1s","binary"],["no moving parts","not moving","fast","durable","electronic"]],
                needCount: 4,
                marksPerGroup: 1
              }
            }
          ],
          explanation: "An SSD's flash memory is made of semiconductor microchips containing millions of floating-gate and control-gate transistors arranged using NAND (or NOR) gates. Data is stored as electrical charge: a voltage makes electrons tunnel through an insulating layer and become trapped on the floating gate, which changes the transistor's threshold voltage so it represents a 0 or a 1. There are no moving parts, so access is fast and the drive is durable."
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
      { key: "hardware_exam", label: "Topic 3: Hardware - IGCSE exam style" }
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
