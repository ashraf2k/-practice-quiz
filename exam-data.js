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
      { key: "datarep_exam", label: "Topic 1: Data Representation — IGCSE exam style" }
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
