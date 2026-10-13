/* iLearn topic 2: Data transmission (Cambridge IGCSE Computer Science 0478) */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx;
  var LESSONS = [

  // ---------- 2.1 Types and methods of data transmission ----------
  { id:"2.1.1a", code:"2.1.1", title:"The structure of a data packet",
    concept:
      "<p>A file can be very large. It cannot be sent all at once, so the data is broken down into small units called <b>packets</b>.</p>" +
      "<p>Every packet has <b>three parts</b>:</p>" +
      "<ul><li><b>Packet header</b>: information about the packet and where it is going. It holds the <b>destination address</b> (usually an IP address), the <b>packet number</b> and the <b>originator's address</b> (the IP address of the sender).</li>" +
      "<li><b>Payload</b>: the <b>actual data</b> from the file that is being sent.</li>" +
      "<li><b>Trailer</b> (footer): marks the <b>end of the packet</b> and holds the data for any <b>error detection</b> method being used.</li></ul>" +
      "<p>The <b>packet number</b> matters because packets can arrive out of order. The receiving device uses the numbers to put the packets back into the right order and rebuild the file.</p>",
    example:
      "<p>You email a photo. The photo is split into many packets. One of them looks like this:</p>" +
      "<table class='ln-table'><tr><th colspan='3'>Header</th><th>Payload</th><th>Trailer</th></tr><tr><td>Destination: 192.168.1.20</td><td>Packet no. 7</td><td>From: 192.168.1.5</td><td>A small piece of the photo</td><td>End marker + error check data</td></tr></table>" +
      "<p>If packets 6 and 7 arrive in the order 7, 6, the packet numbers tell the receiver to swap them back.</p>",
    checks:[
      mc("Which part of a data packet contains the actual data from the file being sent?", "The payload", ["The packet header","The trailer","The packet number"], "The payload carries the data from the file. The header and trailer only hold information about the packet."),
      tx("Name two items of data that are stored in the header of a packet.", [["destination"],["packet number","number of the packet","sequence number","packet no"],["originator","sender","source address","senders address","sender's address"]], 2, "Any two of: the destination address, the packet number, the originator's (sender's) address.")
    ] },

  { id:"2.1.1b", code:"2.1.1", title:"Packet switching",
    concept:
      "<p><b>Packet switching</b> is a method of sending packets across a network. Each packet is sent <b>individually</b> and each packet may take a <b>different pathway</b> to the destination.</p>" +
      "<p>A <b>router</b> controls this. When a packet reaches a router, the router reads the <b>destination address</b> in the header and decides which pathway to send the packet along next. This repeats at every router until the packet reaches the destination.</p>" +
      "<p>Because packets travel different routes, they often <b>arrive out of order</b>. When all packets have arrived, the receiving device uses the <b>packet numbers</b> to <b>reorder</b> them and recreate the file.</p>",
    example:
      "<p>Five packets go from device A to device B through routers 1 to 5.</p>" +
      "<ul><li>Packet 1: Router 1 &rarr; Router 2</li><li>Packet 2: Router 1 &rarr; Router 4 &rarr; Router 5</li><li>Packet 3: Router 1 &rarr; Router 3 &rarr; Router 2</li></ul>" +
      "<p>Packet 2 might arrive after packet 3, because its route was different. Device B waits for all five packets, then uses the packet numbers (1 to 5) to put them in order.</p>",
    checks:[
      mc("In packet switching, which device decides the pathway each packet takes next?", "A router", ["The sending device only","The payload","A USB port"], "A router reads the destination address in the packet header and chooses the next pathway."),
      mc("Packets sent using packet switching often arrive out of order. How is the file put back together correctly?", "The packet numbers are used to reorder the packets", ["The packets are sent again in the right order","The router stores all packets until they are in order","The trailer is used to sort them by size"], "Each packet has a packet number in its header. The receiving device uses these numbers to reorder the packets.")
    ] },

  { id:"2.1.2a", code:"2.1.2", title:"Serial and parallel transmission",
    concept:
      "<p>These two methods describe <b>how many wires</b> are used and <b>how many bits</b> are sent at a time.</p>" +
      "<table class='ln-table'><tr><th></th><th>Serial</th><th>Parallel</th></tr>" +
      "<tr><th>Wires</th><td>One wire</td><td>Several wires</td></tr>" +
      "<tr><th>Bits at a time</th><td>One bit at a time</td><td>Several bits at the same time</td></tr>" +
      "<tr><th>Speed</th><td>Slower</td><td>Faster</td></tr>" +
      "<tr><th>Bits arrive in order?</th><td>Yes, so little skewing</td><td>Not always, so more risk of <b>skew</b> (bits out of order)</td></tr>" +
      "<tr><th>Interference / errors</th><td>Less chance</td><td>More chance</td></tr>" +
      "<tr><th>Cable cost</th><td>Cheaper</td><td>More expensive</td></tr>" +
      "<tr><th>Best distance</th><td>Long distances</td><td>Short distances (about 5 m)</td></tr></table>",
    example:
      "<p>A computer sends data to a printer 2 metres away, and speed matters: <b>parallel</b> is suitable because the distance is short and it is faster.</p>" +
      "<p>A computer sends data to a server 100 metres away and the data must be accurate: <b>serial</b> is suitable because it has less chance of skew and interference over longer distances.</p>",
    checks:[
      mc("Which statement describes serial data transmission?", "Data is sent one bit at a time down a single wire", ["Data is sent several bits at a time down several wires","Data is sent in one direction only","Data is sent in both directions at the same time"], "Serial means one bit at a time along one wire. The other options describe parallel, simplex and full-duplex."),
      mc("A company sends accurate data over a cable 80 metres long. Why is serial transmission more suitable than parallel?", "There is less chance of skew and interference over longer distances", ["Serial sends several bits at once, so it is always faster than parallel","Serial needs more wires than parallel, so the data is better protected","Serial data can travel in both directions at the same time as it arrives"], "Serial has less chance of bits arriving out of order and of interference, so it suits longer distances where accuracy matters.")
    ] },

  { id:"2.1.2b", code:"2.1.2", title:"Simplex, half-duplex and full-duplex",
    concept:
      "<p>These three methods describe the <b>direction</b> data can travel.</p>" +
      "<ul><li><b>Simplex</b>: data travels in <b>one direction only</b>. Example: a keyboard sending key presses to a computer.</li>" +
      "<li><b>Half-duplex</b>: data can travel in <b>both directions, but only one direction at a time</b>. Example: a walkie-talkie, or a Wi-Fi connection.</li>" +
      "<li><b>Full-duplex</b>: data can travel in <b>both directions at the same time</b>. Example: a telephone call.</li></ul>" +
      "<p>A connection always has <b>both</b> kinds of description. It is either serial or parallel, <b>and</b> simplex, half-duplex or full-duplex. For example: a <i>serial simplex</i> connection or a <i>parallel half-duplex</i> connection.</p>",
    example:
      "<table class='ln-table'><tr><th>Device pair</th><th>Direction needed</th><th>Method</th></tr>" +
      "<tr><td>Keyboard &rarr; computer</td><td>One way only</td><td>Simplex</td></tr>" +
      "<tr><td>Two walkie-talkies</td><td>Both ways, taking turns</td><td>Half-duplex</td></tr>" +
      "<tr><td>Phone call</td><td>Both ways, together</td><td>Full-duplex</td></tr></table>",
    checks:[
      mc("Data can be transmitted in both directions, but only one direction at a time. What is this method called?", "Half-duplex", ["Simplex","Full-duplex","Parallel"], "Half-duplex allows both directions but not at the same moment. Full-duplex allows both at once; simplex is one way only."),
      mc("A keyboard sends the keys pressed to a computer. The computer never sends data back to the keyboard. Which method fits best?", "Simplex", ["Half-duplex","Full-duplex","Packet switching"], "Data only ever travels from the keyboard to the computer, so one direction only (simplex) is enough.")
    ] },

  { id:"2.1.2c", code:"2.1.2", title:"Choosing a transmission method for a scenario",
    concept:
      "<p>In the exam you are given a scenario and must <b>choose</b> a method and <b>explain why</b>. Use this plan:</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li><b>Distance</b>: short (about 5 m or less) &rarr; parallel is possible; long &rarr; serial.</li>" +
      "<li><b>Accuracy</b> is vital &rarr; serial (less skew and interference).</li>" +
      "<li><b>Speed</b> is vital over a short distance &rarr; parallel.</li>" +
      "<li><b>Direction</b>: one way &rarr; simplex; both ways, taking turns &rarr; half-duplex; both ways at the same time &rarr; full-duplex.</li></ol>" +
      "<p>Always give <b>both</b> parts of the answer (serial/parallel <b>and</b> the duplex type), and a reason linked to the scenario for each.</p>",
    example:
      "<p><b>Scenario:</b> A company file server is 500 m from the office. Staff send and retrieve files at the same time, and the files must be accurate.</p>" +
      "<ul><li><b>Serial</b>: the distance is long and accuracy is vital, so less skew and interference.</li><li><b>Full-duplex</b>: files must be sent and received at the same time.</li></ul>" +
      "<p>Answer: <b>serial full-duplex</b>.</p>",
    checks:[
      mc("A school prints leaflets on a printer 3 metres from the computer. Speed matters and the distance is short. Which transmission method is most suitable?", "Parallel", ["Serial, because it is faster over short distances","Simplex, because the data goes to the printer","Half-duplex, because the printer is nearby"], "Over a short distance, parallel is suitable and faster because it sends several bits at once. Simplex describes direction, not wires, so it cannot be the full answer."),
      tx("A business manager's computer is 100 m from a file server. Customer data must be sent and received at the same time, and it must be accurate. Which two transmission methods should be used, and why?", [["serial"],["full-duplex","full duplex"],["accura","skew","interference","long distance","distance"],["same time","both directions","both ways"]], 3, "Serial full-duplex. Serial is used because the distance is long and accuracy matters (less skew and interference). Full-duplex is used because data must be sent and received at the same time.")
    ] },

  { id:"2.1.3", code:"2.1.3", title:"The USB interface",
    concept:
      "<p><b>USB</b> (universal serial bus) is an <b>industry standard</b> for connecting devices. The USB <b>interface</b> includes the USB port, USB cable, USB connection and USB device.</p>" +
      "<p>A USB connection uses <b>serial</b> data transmission, but it is a special, <b>high-speed</b> type of serial connection.</p>" +
      "<table class='ln-table'><tr><th>Advantages</th><th>Disadvantages</th></tr>" +
      "<tr><td>The plug fits the port only one way, so few connection errors</td><td>Cable length is limited (about 5 m)</td></tr>" +
      "<tr><td>Fast data transfer</td><td>Slower than some other connections, such as ethernet</td></tr>" +
      "<tr><td>Universal standard: found on many devices</td><td></td></tr>" +
      "<tr><td>Device is detected automatically; drivers install the first time</td><td></td></tr>" +
      "<tr><td>Can power or charge a device</td><td></td></tr></table>",
    example:
      "<p>You plug a memory stick into a laptop. The laptop <b>detects it automatically</b>, installs a driver the first time, and transfers files using a <b>serial</b> connection. A phone plugged in with a USB cable can transfer files <b>and</b> charge at the same time.</p>",
    checks:[
      mc("Which type of data transmission does a USB connection use?", "Serial", ["Parallel","Simplex only","Packet switching"], "USB is a fast, standardised form of serial transmission."),
      tx("Give two benefits of using the USB interface to connect a device to a computer.", [["automatic","detected","plug and play"],["one way","fit","fits"],["standard","universal","many devices","most devices","widely"],["power","charge"],["fast","speed","quick"]], 2, "Any two of: devices are detected automatically; the plug only fits one way; it is a universal standard used by many devices; it is fast; it can power or charge a device.")
    ] },

  // ---------- 2.2 Methods of error detection ----------
  { id:"2.2.1", code:"2.2.1", title:"Why errors happen in transmission",
    concept:
      "<p>Data transmission is not perfect. <b>Interference</b> (for example electromagnetic interference) can cause errors, so data can be:</p>" +
      "<ul><li><b>lost</b> (some data does not arrive),</li><li><b>gained</b> (extra data appears),</li><li><b>changed</b> (a 0 becomes a 1 or the other way round).</li></ul>" +
      "<p>Errors can also happen when data is <b>entered</b> by a person, for example a typing mistake.</p>" +
      "<p>Accuracy matters: a wrong password, address or order can stop a person from logging in, getting their post or receiving what they ordered. So we need ways to <b>detect</b> errors after transmission: <b>parity check, checksum, echo check</b> (and ARQ to resend data).</p>",
    example:
      "<p>The byte <code>01000001</code> (the letter A) is sent. Interference flips one bit and the receiver gets <code>01000101</code>. This is a letter E, so a program would show the wrong character. Without an error check, nobody would know.</p>",
    checks:[
      mc("Which of these can interference cause during data transmission?", "Data can be lost, gained or changed", ["Data can only be lost","Data is always deleted from the sending device","Data is always sent twice"], "Interference can cause data to be lost, gained (extra data) or changed."),
      mc("Why is it important to check for errors after data has been transmitted?", "A wrong password or address could cause real problems", ["Errors make the data transmission faster, so they do not matter much","Errors only ever affect the sender's device and never the receiver","Errors are always found and fixed by the router automatically"], "The data may be wrong (for example a password or an address), which can cause real problems, so errors must be detected.")
    ] },

  { id:"2.2.2a", code:"2.2.2", title:"Parity check (odd and even)",
    concept:
      "<p>A <b>parity check</b> adds one extra bit, the <b>parity bit</b>, to each byte. Each byte has <b>7 bits of data</b> plus <b>1 parity bit</b> (normally the first or last bit).</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>The sender and receiver agree on <b>odd</b> or <b>even</b> parity.</li><li>The sender counts the 1s in the 7 data bits.</li><li>The parity bit is set so that the <b>total number of 1s</b> in the byte is <b>even</b> (even parity) or <b>odd</b> (odd parity).</li><li>After transmission the receiver counts the 1s in each byte. If the total is <b>wrong</b>, an error is detected.</li></ol>" +
      "<p><b>Limit:</b> if <b>two bits</b> change, the number of 1s may still be correct, so the error is <b>not</b> detected. A parity check also cannot say <i>which</i> bit is wrong.</p>",
    example:
      "<p><b>Even parity</b>, data bits <code>1101001</code>: there are four 1s (already even), so the parity bit is <b>0</b>. The byte sent is <code>01101001</code>.</p>" +
      "<p><b>Odd parity</b>, data bits <code>0110101</code>: there are four 1s (even), so the parity bit must be <b>1</b> to make five. The byte sent is <code>10110101</code>.</p>" +
      "<p>The receiver (even parity) gets <code>10110110</code>. It has five 1s, which is odd, so an <b>error is detected</b>.</p>",
    checks:[
      mc("Even parity is used. What parity bit is added to the 7 data bits 1011011?", "1", ["0","2","No bit is needed"], "1011011 has five 1s. To make the total even (six) a parity bit of 1 is added."),
      mc("A receiver uses odd parity. Which received byte shows that an error has occurred?", "01110100", ["10101110","11100000","00000001"], "01110100 has four 1s, which is even, but odd parity was agreed. The other bytes have 5, 3 and 1 ones, which are odd.")
    ] },

  { id:"2.2.2b", code:"2.2.2", title:"Checksum and echo check",
    concept:
      "<p><b>Checksum</b></p>" +
      "<ul><li>A value is <b>calculated from the data</b> (using a method such as modulus 11) <b>before</b> it is sent.</li><li>The checksum is sent <b>with</b> the data.</li><li>After transmission the receiver <b>recalculates</b> the checksum from the data it received.</li><li>If the two values <b>match</b>, no error. If they <b>do not match</b>, an error has occurred.</li></ul>" +
      "<p><b>Echo check</b></p>" +
      "<ul><li>The sender transmits the data.</li><li>The receiver <b>sends a copy of the received data back</b> to the sender.</li><li>The sender <b>compares</b> the returned copy with the original. If they match, no error; if not, an error is detected.</li></ul>" +
      "<p><b>Weakness of the echo check:</b> if the copies do not match, the error may have happened on the <b>way back</b>, so the original data may have arrived correctly.</p>",
    example:
      "<table class='ln-table'><tr><th>Method</th><th>What is compared?</th></tr>" +
      "<tr><td>Parity check</td><td>Number of 1s in each byte (odd or even)</td></tr>" +
      "<tr><td>Checksum</td><td>A calculated value before and after transmission</td></tr>" +
      "<tr><td>Echo check</td><td>The data sent and the copy sent back</td></tr></table>",
    checks:[
      mc("How does an echo check detect an error?", "The data is sent back and compared with the original", ["The receiver counts the number of 1s in each byte and checks it is odd","A value is calculated from the data and then compared after the transmission","The sender types the same data in twice and then compares both copies"], "An echo check compares the original data with the copy returned by the receiver."),
      tx("Describe how a checksum is used to detect errors in transmitted data.", [["calculat"],["before","sent with","with the data","transmit"],["recalculat","calculated again","same method","receiver calculates"],["match","same","compare","different","not equal"]], 3, "A value is calculated from the data before it is sent and sent with the data. The receiver recalculates the value from the data it received and compares the two. If they match there is no error; if they differ an error has occurred.")
    ] },

  { id:"2.2.3", code:"2.2.3", title:"Check digits",
    concept:
      "<p>A <b>check digit</b> detects errors when data is <b>entered</b>, either typed by a person or read automatically (for example a barcode scanner).</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>The check digit is <b>calculated from the other digits</b> of the number (for example a barcode or ISBN) and stored as part of it.</li><li>When the number is entered, the check digit is <b>recalculated</b> from the digits entered.</li><li>If it <b>matches</b>, the data is probably correct. If it <b>does not match</b>, the data was entered incorrectly.</li></ol>" +
      "<p>Examples: the last digit of an <b>ISBN</b> and of a <b>barcode</b> number.</p>" +
      "<p><b>Do not confuse</b>: a <b>check digit</b> checks <b>data entry</b>; a <b>checksum</b> checks <b>data transmission</b>.</p>",
    example:
      "<p>A shop scanner reads a barcode but the label is scratched, so one digit is read wrongly. The scanner recalculates the check digit from the digits it read. It does not match the printed check digit, so the till refuses the item and asks for the barcode to be scanned again.</p>",
    checks:[
      mc("A check digit is used to detect errors in which situation?", "When data is entered, for example a barcode being scanned", ["When data travels across a network as separate packets through routers","When a large file is compressed so that it takes up less space","When a router chooses the pathway for each packet to take next"], "Check digits check data entry (typed or scanned). Checksums, parity and echo checks check transmission."),
      mc("Which pair of items normally contains a check digit?", "ISBN and barcode numbers", ["Passwords and usernames","IP addresses and MAC addresses","Packet headers and trailers"], "ISBN and barcode numbers are the two examples in the syllabus.")
    ] },

  { id:"2.2.4", code:"2.2.4", title:"Automatic repeat request (ARQ)",
    concept:
      "<p>When an error is found, the data must usually be sent again. <b>ARQ</b> (automatic repeat request) uses <b>acknowledgements</b> and a <b>timeout</b> to do this.</p>" +
      "<p><b>Positive acknowledgement</b></p>" +
      "<ul><li>The sender sends a packet.</li><li>The receiver checks it. If it is error free, it sends back a <b>positive acknowledgement</b>.</li><li>The sender then sends the next packet.</li><li>If no acknowledgement arrives before the <b>timeout</b>, the sender <b>resends</b> the packet (sometimes up to a set limit such as 20 times).</li></ul>" +
      "<p><b>Negative acknowledgement</b></p>" +
      "<ul><li>If the receiver finds an error it sends a <b>negative acknowledgement</b>, and the sender <b>resends</b> the packet.</li><li>If no error is found, the receiver sends nothing, and the sender carries on after the timeout.</li></ul>",
    example:
      "<table class='ln-table'><tr><th>Step</th><th>What happens (positive acknowledgement)</th></tr>" +
      "<tr><td>1</td><td>Sender sends packet 1 and starts a timeout</td></tr><tr><td>2</td><td>Receiver finds no errors and sends an acknowledgement</td></tr><tr><td>3</td><td>Sender receives it and sends packet 2</td></tr>" +
      "<tr><td>Fault</td><td>If the acknowledgement does not arrive before the timeout, packet 1 is sent again</td></tr></table>",
    checks:[
      mc("In ARQ, what does the sending device do if it does not receive a positive acknowledgement before the timeout?", "It resends the packet", ["It sends the next packet","It deletes the data","It sends a negative acknowledgement"], "No acknowledgement before the timeout means the sender assumes the packet was not received correctly and resends it."),
      mc("In ARQ using negative acknowledgement, when does the receiver send a message back to the sender?", "When it detects an error in the data", ["When it receives data with no errors","After every packet, whether or not it contained errors","Only when the timeout ends"], "A negative acknowledgement is sent only when an error is detected, telling the sender to resend.")
    ] },

  // ---------- 2.3 Encryption ----------
  { id:"2.3.1", code:"2.3.1", title:"Why data is encrypted",
    concept:
      "<p>Data sent across a network can be intercepted by a hacker. Personal data is valuable. <b>Encryption</b> scrambles data so that it is meaningless if it is stolen.</p>" +
      "<ul><li><b>Plain text</b>: the data before encryption.</li><li><b>Encryption algorithm / key</b>: used to scramble the data.</li><li><b>Cipher text</b>: the scrambled, meaningless data after encryption.</li></ul>" +
      "<p>The receiver uses a key to <b>decrypt</b> the cipher text back to plain text.</p>" +
      "<p><b>Important:</b> encryption does <b>not stop</b> a hacker from stealing data. It only makes the stolen data <b>meaningless</b> to them.</p>",
    example:
      "<p>A bank sends your account details. Plain text <code>PIN 4821</code> is encrypted into cipher text such as <code>x#9Qk!</code> before it travels. A hacker who intercepts it only sees <code>x#9Qk!</code>. The bank's computer uses the key to turn it back into <code>PIN 4821</code>.</p>",
    checks:[
      mc("What is the name given to data after it has been encrypted?", "Cipher text", ["Plain text","An encryption key","A checksum"], "Plain text is encrypted into cipher text."),
      mc("Does encryption stop a hacker from intercepting data?", "No, it only makes the data meaningless to the hacker", ["Yes, the hacker is then unable to access the network at all","Yes, because encrypted data cannot be copied by anyone","No, and the encrypted data stays fully readable to the hacker"], "A hacker can still steal encrypted data, but without the key it is scrambled and meaningless.")
    ] },

  { id:"2.3.2a", code:"2.3.2", title:"Symmetric encryption",
    concept:
      "<p>In <b>symmetric</b> encryption the <b>same key</b> is used to encrypt <i>and</i> decrypt.</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>Plain text is encrypted into cipher text using a key.</li><li>The cipher text and the key are sent (separately) to the receiver.</li><li>The receiver uses the <b>same key</b> to decrypt the cipher text.</li></ol>" +
      "<p>It is the simplest method and is fine for less important data, or data stored on your own device.</p>" +
      "<p><b>Weakness:</b> the key has to be sent to the receiver, so a hacker might intercept <b>both</b> the cipher text and the key.</p>",
    example:
      "<p>You encrypt a document on your laptop with a key and email the document to a friend. You must also give your friend the key. If a hacker intercepts the email <i>and</i> the key, they can decrypt the document. This is why symmetric encryption is less secure for transmission.</p>",
    checks:[
      mc("How many keys are used in symmetric encryption?", "One key, used to both encrypt and decrypt", ["Two keys: one public and one private","No keys are needed","One key to encrypt and a different key to decrypt"], "Symmetric encryption uses the same key for encryption and decryption."),
      mc("What is the main weakness of symmetric encryption when data is sent across a network?", "The key must be sent too, so it could be intercepted", ["The data can then never be decrypted by the receiver at all","It is always much slower than sending data as plain text","It needs a public key to be sent to the receiver first"], "If a hacker gets both the cipher text and the key, they can decrypt the data.")
    ] },

  { id:"2.3.2b", code:"2.3.2", title:"Asymmetric encryption",
    concept:
      "<p>In <b>asymmetric</b> encryption two <b>different keys</b> that work as a pair are used.</p>" +
      "<ul><li>The <b>public key</b> is made public. Anyone can use it to <b>encrypt</b> data to send to you.</li><li>The <b>private key</b> is kept secret by its owner. It is the only key that can <b>decrypt</b> data that was encrypted with the matching public key.</li></ul>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>The sender encrypts the plain text with the receiver's <b>public key</b>.</li><li>The cipher text is sent.</li><li>The receiver decrypts it with their <b>private key</b>.</li></ol>" +
      "<p>It is <b>more secure</b> than symmetric encryption because the private key is <b>never sent</b> across the network, so it cannot be intercepted. Banks use it for transactions.</p>",
    example:
      "<p>Mia wants to send a secret to a bank. She downloads the bank's <b>public key</b> and encrypts her message. A hacker copies the message but the public key cannot decrypt it. Only the bank's <b>private key</b>, which never leaves the bank, can decrypt it.</p>",
    checks:[
      mc("Which key is used to decrypt data that was encrypted with a person's public key?", "Their private key", ["The same public key","The sender's public key","A checksum"], "A public and private key work as a pair: the public key encrypts, the matching private key decrypts."),
      tx("Explain why asymmetric encryption is more secure than symmetric encryption.", [["different","two keys","pair","public","private"],["not sent","never sent","not transmitted","kept secret","secret","not shared","not be intercepted","cannot be intercepted","stays"]], 2, "Asymmetric encryption uses a public key to encrypt and a different, private key to decrypt. The private key is kept secret and is never sent across the network, so a hacker cannot intercept it. In symmetric encryption the same key must be sent with the data.")
    ] }

  ];

  var TEST = {
    mcq:[
      mc("Which three parts make up a data packet?", "Header, payload and trailer", ["Header, key and checksum","Payload, parity bit and router","Header, body and signature"], "Every packet has a header, a payload (the data) and a trailer."),
      mc("Which method of data transmission sends several bits at the same time along several wires?", "Parallel", ["Serial","Simplex","Half-duplex"], "Parallel transmission uses several wires so several bits are sent at once."),
      mc("A mobile phone call lets both people speak and hear at the same time. Which method is used?", "Full-duplex", ["Simplex","Half-duplex","Parallel only"], "Both directions at the same time is full-duplex."),
      mc("An odd parity check is used. A received byte contains six 1s. What does the receiver conclude?", "An error has occurred", ["The byte is correct","The byte must be sent in parallel","The byte has been encrypted"], "Odd parity expects an odd number of 1s. Six is even, so an error is detected."),
      mc("Which key does the receiver use to decrypt data in asymmetric encryption?", "Their private key", ["The sender's private key","A shared secret key sent with the data","The public key"], "Data encrypted with the receiver's public key is decrypted with their private key.")
    ],
    typed:[
      { q:"Explain why and how the packets of a file are put back in the correct order after packet switching.", groups:[["different","each packet","separate","individual","various"],["out of order","arrive in a different order","not in order","arrive at different times"],["packet number","numbers","number"],["reorder","put back","reassemble","recreate","rebuild"]], need:3, model:"Packets take different routes so they can arrive out of order. Each packet has a packet number in its header, which the receiving device uses to reorder the packets and recreate the file." },
      { q:"Describe how an echo check is used to detect errors in transmitted data.", groups:[["sends the data","data is sent","transmit"],["back","returns","return","copy"],["compare","match","same"],["different","not match","error"]], need:3, model:"The sender transmits the data. The receiver sends a copy of the data it received back to the sender. The sender compares the copy with the original: if they match there is no error, if they differ an error is detected." }
    ]
  };

  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat(LESSONS);
  (root.ILEARN_TESTS = root.ILEARN_TESTS || {})[2] = TEST;
})(typeof window !== "undefined" ? window : this);
