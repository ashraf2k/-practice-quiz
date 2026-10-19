/* iLearn A Level topic 17: Security (Cambridge 9618, section 17)
   Textbook: Hodder "Cambridge International AS & A Level Computer Science", chapter 17 (pages 410-424).
   Past-paper style: 9618/31 Q8 (sending a private message), 9618/32 Q8 (symmetric v asymmetric, verified message), 9618/33 Q8 (quantum cryptography).
   The key-exchange numbers on this page (7^X MOD 11) were checked by program. */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx, fill = root.ILQ.fill;
  function tbl(heads, rows){
    return "<table class='ln-table'><tr>" + heads.map(function(h){ return "<th>" + h + "</th>"; }).join("") + "</tr>" +
      rows.map(function(r){ return "<tr>" + r.map(function(c){ return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
  }
  function pre(s){ return "<pre class='ln-pre'>" + s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</pre>"; }
  function steps(list){ return "<ol>" + list.map(function(s){ return "<li>" + s + "</li>"; }).join("") + "</ol>"; }

  var LESSONS = [

  { id:"17.1a", code:"17.1.1", title:"Why encrypt? Plaintext, ciphertext and keys",
    concept:
      "<p>When data travels over a public network it can be intercepted by an <b>eavesdropper</b> (a hacker). <b>Encryption</b> cannot stop the data being intercepted, but it makes it <b>unreadable</b> to anyone it is not meant for. Four security aims are involved:</p>" +
      tbl(["Aim", "Meaning"], [["<b>Confidentiality</b>", "Only the intended recipient can read the data"], ["<b>Authenticity</b>", "The sender is who they claim to be"], ["<b>Integrity</b>", "The data arrives unchanged"], ["<b>Non-repudiation</b>", "Neither sender nor receiver can deny taking part"]]) +
      "<ul><li><b>Plaintext</b>: the original data before encryption.</li><li><b>Ciphertext</b>: the result of putting plaintext through an encryption algorithm with a key.</li><li>An <b>encryption key</b> is a value used by the algorithm; decryption turns ciphertext back into plaintext with the matching <b>decryption key</b>.</li><li>A <b>block cipher</b> encrypts a group of bits (e.g. 128 bits) at a time; a <b>stream cipher</b> encrypts bit by bit as they arrive. In <b>block chaining</b> each plaintext block is XORed with the previous ciphertext block before encryption, so identical plaintext blocks do not give identical ciphertext.</li></ul>",
    example:
      "<p>plaintext <code>HELLO</code> → encryption algorithm + key → ciphertext (looks like random characters) → sent over the internet → decryption algorithm + key → plaintext <code>HELLO</code>.</p>" +
      "<p>A longer key means more possible keys and so a message that takes longer to crack: a 10-digit key has about 10 billion possibilities (cracked in seconds by a modern computer) but a 256-bit key has 2<sup>256</sup>.</p>",
    checks:[
      mc("What is ciphertext?", "Data that has been through an encryption algorithm", ["The original message before encryption", "The key used to encrypt", "A digital signature"], "Plaintext goes in, ciphertext comes out."),
      mc("Does encryption stop data being intercepted?", "No, it makes intercepted data meaningless to the eavesdropper", ["Yes, it blocks all interception", "Yes, it makes the cable private", "No, and it also makes the data easier to read"], "Encryption protects confidentiality, not the transmission itself."),
      mc("Which security aim means that data reaches its destination without being changed?", "Integrity", ["Confidentiality", "Authenticity", "Non-repudiation"], "Integrity = unchanged data."),
      mc("What does a block cipher do?", "Encrypts a group of bits at the same time", ["Encrypts one bit at a time", "Encrypts only the key", "Compresses the data"], "A stream cipher is the bit-by-bit method."),
      tx("Explain why data is encrypted before being sent over the internet. [2]", [["intercept","eavesdrop","hacker","read","steal"],["unreadable","meaningless","cannot understand","not understand","make no sense","secure","confidential","private"]], 2, "Data sent over a public network can be intercepted by an eavesdropper. Encryption turns it into ciphertext that is meaningless without the key, so it stays confidential.")
    ] },

  { id:"17.1b", code:"17.1.1", title:"Symmetric encryption and the key distribution problem",
    concept:
      "<p>In <b>symmetric encryption</b> the <b>same secret key</b> is used to encrypt and to decrypt. It is fast and suits large amounts of data.</p>" +
      "<p><b>The key distribution problem:</b> the sender must get the secret key to the recipient. If the key is sent over the network an eavesdropper can intercept it and then decrypt every message. Sending it by another route is slow and also open to risk.</p>" +
      "<p>Longer keys are harder to crack (256-bit keys are common).</p>" +
      "<p>One way to share a secret key without sending it is for each side to choose a private number and exchange only a calculated value. In a simple example both use the formula 7<sup>n</sup> MOD 11.</p>",
    example:
      tbl(["Step", "Sender (secret X = 2)", "Recipient (secret Y = 4)"], [
        ["1. Calculate 7^n MOD 11", "7² = 49, 49 MOD 11 = <b>5</b>", "7⁴ = 2401, 2401 MOD 11 = <b>3</b>"],
        ["2. Exchange the results", "sends 5, receives 3", "sends 3, receives 5"],
        ["3. Use the received value as the base", "3² MOD 11 = 9 MOD 11 = <b>9</b>", "5⁴ MOD 11 = 625 MOD 11 = <b>9</b>"]]) +
      "<p>Both now have the shared key <b>9</b>, although 9 was never sent. An eavesdropper sees only 5 and 3.</p>" +
      "<p>The sender used the key to encrypt, the recipient uses the same key to decrypt: <b>symmetric</b>.</p>",
    checks:[
      mc("What is the key distribution problem in symmetric encryption?", "The secret key must be sent to the recipient and could be intercepted", ["The key is too short to be used", "The key can only be used once", "The recipient cannot decrypt the message"], "If an eavesdropper gets the key, all the messages can be read."),
      mc("How many keys are used in symmetric encryption?", "One shared secret key", ["Two: a public key and a private key", "None", "Three"], "The same key encrypts and decrypts."),
      mc("Using the rule 7^n MOD 11, a sender chooses n = 2. What value is sent to the recipient?", "5", ["4", "9", "49"], "7² = 49 and 49 MOD 11 = 5 (49 = 4 × 11 + 5)."),
      mc("A recipient chooses n = 4 and gets 3 (7⁴ MOD 11). The sender's value is 5. What is the shared key?", "5⁴ MOD 11 = 9", ["3² MOD 11 = 4", "5 + 3 = 8", "7"], "625 MOD 11 = 9 (625 = 56 × 11 + 9), and the sender gets 3² MOD 11 = 9 as well."),
      tx("Describe the key distribution problem. [2]", [["same key","secret key","one key","symmetric","single key"],["intercept","eavesdrop","hacker","steal","sent to the","send the key","share the key","get the key"]], 2, "With symmetric encryption the same secret key must be known to both sender and recipient. The sender has to send the key to the recipient and it could be intercepted by an eavesdropper, who could then decrypt the messages.")
    ] },

  { id:"17.1c", code:"17.1.1", title:"Asymmetric encryption: sending a private message",
    concept:
      "<p>In <b>asymmetric encryption</b> each person has a <b>matched pair of keys</b>, generated together by an algorithm:</p>" +
      "<ul><li>a <b>public key</b>: shared with anyone;</li><li>a <b>private key</b>: kept secret by its owner, never shared.</li></ul>" +
      "<p>The pair are mathematically linked, but the private key cannot be worked out from the public key. <b>A message encrypted with one key can be decrypted only with the other key of the pair.</b> There is no key distribution problem, because the private key is never sent.</p>" +
      "<p><b>To send a private (confidential) message to someone:</b> encrypt with the <b>receiver's public key</b>; only the receiver's private key can decrypt it.</p>",
    example:
      "<p>Tom wants to send a private document to Meera:</p>" +
      steps(["Meera generates a matched pair of keys (public and private).", "Meera sends her public key to Tom (or publishes it).", "Tom encrypts the document using Meera's <b>public</b> key.", "Tom sends the ciphertext to Meera.", "Meera decrypts it using her <b>private</b> key. Nobody else can read it, not even Tom."]) +
      "<p><b>Exam link (June 2026 Paper 3):</b> 'Describe how an individual can send a private message to an organisation.' Mark points: the organisation generates a matched pair of keys; the organisation makes its public key available to the individual; the individual encrypts their message with the organisation's public key and sends it; the organisation decrypts it with its private key.</p>",
    checks:[
      mc("Tom wants to send Meera a confidential message using asymmetric encryption. Which key does he use to encrypt it?", "Meera's public key", ["Meera's private key", "Tom's public key", "Tom's private key"], "Anything encrypted with Meera's public key can only be decrypted with her private key."),
      mc("Which key does Meera use to decrypt the message?", "Her own private key", ["Tom's public key", "Her own public key", "Tom's private key"], "Only the matching private key can decrypt."),
      mc("Which key in an asymmetric pair is kept secret?", "The private key", ["The public key", "Both keys", "Neither key"], "The private key never leaves its owner."),
      tx("Describe how an individual can send a private message to an organisation using asymmetric encryption. [4]", [["matched pair","pair of keys","generates","public and private","key pair","two keys"],["public key","makes available","publishes","sends the public key","sends its public key"],["encrypt","encrypts","encrypted"],["private key","decrypt","decrypts"]], 4, "The organisation generates a matched pair of keys and makes its public key available to the individual. The individual encrypts the message using the organisation's public key and sends it. The organisation decrypts the message using its own private key.")
    ] },

  { id:"17.1d", code:"17.1.1", title:"Verified messages and symmetric v asymmetric",
    concept:
      "<p>The pair of keys works in both directions. If the sender encrypts a message with <b>their own private key</b>, anyone with the sender's <b>public key</b> can decrypt it. This does <b>not</b> keep the message secret (the public key is available to all) but it <b>verifies the sender</b>: only the owner of the private key could have produced it. This provides <b>authentication and non-repudiation</b>.</p>" +
      tbl(["Purpose", "Encrypt with", "Decrypt with"], [["<b>Private</b> (confidential) message to B", "B's <b>public</b> key", "B's <b>private</b> key"], ["<b>Verified</b> message from A", "A's <b>private</b> key", "A's <b>public</b> key"]]) +
      "<p><b>Symmetric v asymmetric:</b></p>" +
      tbl(["Symmetric", "Asymmetric"], [
        ["One shared secret key for encrypting and decrypting", "Two linked keys: one encrypts, the other decrypts"],
        ["Has the key distribution problem", "No key distribution problem (matched pair)"],
        ["Faster; shorter keys give good security", "Slower; keys must be much longer for the same security"],
        ["Cannot verify the sender", "Allows the sender to be verified"]]),
    example:
      "<p>An organisation wants everyone to be sure that a notice really came from it:</p>" +
      steps(["The organisation generates a matched pair of keys.", "It publishes its public key (e.g. on its website).", "It encrypts the notice with its <b>private</b> key and sends it.", "Anyone can decrypt it with the organisation's public key.", "A successful decryption verifies the sender (non-repudiation)."]) +
      "<p><b>Exam link (June 2026 Paper 3):</b> 'Describe the difference between symmetric and asymmetric encryption' (3 marks) and 'Describe how a verified message is sent' (4 marks). The order of the steps matters.</p>",
    checks:[
      mc("An organisation encrypts a message with its own <b>private</b> key. What does this show?", "Anyone who decrypts it with the public key knows it came from the organisation", ["Only one person can read it", "The message is secret", "The message has been compressed"], "The public key is available to all, so the message is not confidential, but it is verified."),
      mc("Which key is used to decrypt a verified message?", "The sender's public key", ["The sender's private key", "The receiver's private key", "A shared secret key"], "It reverses what the sender's private key did."),
      mc("Which statement about asymmetric encryption compared with symmetric is true?", "Asymmetric keys must be longer to give the same level of security", ["Asymmetric encryption uses one key", "Asymmetric encryption has the key distribution problem", "Asymmetric encryption cannot verify the sender"], "That is one of the mark points in the exam."),
      mc("Which key use gives <b>both</b> confidentiality and verification of the sender?", "Encrypt with the sender's private key, then with the receiver's public key", ["Encrypt with the sender's public key only", "Encrypt with the receiver's private key only", "No encryption is needed"], "Two layers: the private key verifies, the receiver's public key keeps it secret."),
      tx("Describe the difference between symmetric and asymmetric encryption. [3]", [["one key","same key","single key","shared key","secret key"],["two keys","pair","public and private","matched pair","public key","private key"],["key distribution","longer","verify","sender","faster"]], 3, "Symmetric encryption uses a single secret key for both encrypting and decrypting, whereas asymmetric uses two keys (a public and a private key) that are a matched pair, one encrypting and the other decrypting. Symmetric suffers from the key distribution problem, which the asymmetric pair avoids; asymmetric keys need to be longer for the same security, and asymmetric encryption allows the sender to be verified.")
    ] },

  { id:"17.1e", code:"17.1.1", title:"Quantum cryptography",
    concept:
      "<p><b>Quantum cryptography</b> uses the laws of <b>quantum physics</b> (the properties of <b>photons</b>) rather than mathematical formulae to produce encryption keys. A <b>qubit</b> (quantum bit) can be 0, 1 or both at once. The method used to send the key is <b>quantum key distribution (QKD)</b> over fibre optic cable (e.g. BB84):</p>" +
      steps(["The sender uses a light source to generate photons and passes them through randomly chosen polarising filters, giving four polarisations (vertical or 45° right = 1; horizontal or 45° left = 0).", "The photons travel along the fibre optic cable.", "The receiver passes each photon through a randomly chosen beam splitter (diagonal or vertical/horizontal) and reads the detectors.", "The receiver tells the sender which splitters were used; the sender says which were correct.", "The bits from the correct choices form the shared key. If an eavesdropper measured a photon, its state would change, so the eavesdropping is <b>detected</b> and the key is thrown away."]) +
      tbl(["Benefits", "Drawbacks"], [
        ["Virtually unbreakable (security is based on physics, not maths)", "Short range only (about 250 km at the time of the textbook)"],
        ["Eavesdropping can be <b>detected</b>, so a new key can be requested", "Needs a dedicated line and specialist hardware: expensive"],
        ["Keys cannot be copied (no-cloning)", "Polarisation of the light may be altered in the cable"],
        ["Stays secure against more powerful future computers", "Can be used by criminals to hide their activities"]]),
    example:
      "<p><b>Exam link (June 2026 Paper 3):</b> 'Describe the purpose of quantum cryptography' and 'Give two benefits and two drawbacks'. Purpose points: to provide a virtually unbreakable method of encryption; to detect eavesdropping; to use the laws of physics rather than mathematics to generate keys; to guarantee encryption for longer than current methods.</p>" +
      "<p>Quantum cryptography is used to share the <b>key</b>; the message itself is then encrypted with that key.</p>",
    checks:[
      mc("What does quantum cryptography use to produce keys?", "The properties of photons (quantum physics)", ["Very large prime numbers", "A hash table", "A longer password"], "It uses physics rather than mathematical formulae."),
      mc("Why can an eavesdropper be detected in quantum key distribution?", "Measuring a photon changes its state", ["The photons are louder", "The cable is cut", "The key is repeated three times"], "Measuring disturbs the quantum state, so the receiver sees errors."),
      mc("Which is a drawback of quantum cryptography?", "It has a limited range and needs specialist hardware", ["Eavesdropping goes unnoticed", "It is easily cracked by guessing", "It works on copper cable only"], "It is expensive and only works over short distances."),
      mc("Which is a benefit of quantum cryptography?", "Eavesdropping can be detected so a new key can be requested", ["It needs no hardware", "It is cheap to install", "It works over unlimited distance"], "This is a mark point in the exam."),
      tx("Give two benefits and two drawbacks of quantum cryptography. [4]", [["unbreakable","unhackable","secure","detect","eavesdropping","cannot be copied","no-cloning","clone"],["detect","eavesdropping","new key","request another"],["short distance","limited range","range","distance"],["expensive","cost","specialist hardware","dedicated line","polarisation","altered","criminals"]], 4, "Benefits: virtually unbreakable encryption; eavesdropping can be detected so another key can be requested. Drawbacks: it can only be used over relatively short distances; it is expensive and needs a dedicated line and specialist hardware.")
    ] },

  { id:"17.1f", code:"17.1.2", title:"SSL/TLS: what it does and how the handshake works",
    concept:
      "<p><b>Secure Sockets Layer (SSL)</b> and its more modern replacement <b>Transport Layer Security (TLS)</b> are protocols that secure communication between a <b>client</b> (browser) and a <b>server</b> over the internet. They give <b>encryption</b>, <b>authentication of the server</b> (usually the client is not authenticated) and <b>data integrity</b>. The user sees <b>https://</b> and a padlock.</p>" +
      "<p><b>The handshake</b> (before any data is sent):</p>" +
      steps(["The browser requests a secure page (https) from the web server.", "The server sends its <b>digital certificate</b>, which contains its <b>public key</b>, signed by a certificate authority (CA).", "The browser checks the certificate: the CA's signature is in its trusted list, the dates are valid, and the domain matches the one requested.", "The browser uses the server's public key to send a temporary <b>session key</b> (a symmetric key) to the server.", "The server decrypts the session key with its <b>private key</b> and sends back an acknowledgement encrypted with the session key.", "All following data is encrypted with the session key."]),
    example:
      "<p>SSL/TLS uses <b>both</b> kinds of encryption: asymmetric to share the session key safely, then fast symmetric encryption for the data.</p>" +
      "<p><b>Appropriate situations:</b> online banking and shopping, email, cloud storage, VPNs, messaging and video calls, logging in to any website.</p>" +
      "<p><b>TLS v SSL:</b> TLS is more secure; it has a handshake protocol separate from the record protocol (data), can be extended with new authentication methods, and uses <b>session caching</b> to resume earlier sessions faster.</p>",
    checks:[
      mc("What does the web server send to the browser at the start of the SSL/TLS handshake?", "Its digital certificate containing its public key", ["The user's password", "The session key", "Its private key"], "The certificate proves the server's identity and carries the public key."),
      mc("Why does the browser check the digital certificate?", "To confirm that the server is genuine and the certificate is valid", ["To scan for viruses", "To compress the data", "To find the server's private key"], "It checks the CA's signature, the dates and the domain."),
      mc("Which key is used to encrypt the data after the handshake is complete?", "The session key", ["The server's private key", "The server's public key", "The browser's private key"], "A symmetric session key is used because it is fast."),
      mc("What does the padlock and https show?", "The connection is using SSL/TLS", ["The website is free", "The website is stored on the user's computer", "The website has no adverts"], "https means HTTP over SSL/TLS."),
      tx("Describe the purpose of SSL/TLS in client-server communication. [3]", [["encrypt","encrypted","encryption","secure","private"],["authenticat","identity","certificate","verify","server"],["integrity","not changed","tamper","unchanged"],["https","padlock","handshake","session key","eavesdrop","intercept"]], 3, "SSL/TLS provides a secure connection between the browser and the server: the data is encrypted so it cannot be read if intercepted, the server is authenticated using its digital certificate, and the integrity of the data is checked. It uses a handshake to agree a session key.")
    ] },

  { id:"17.1g", code:"17.1.3", title:"Digital signatures",
    concept:
      "<p>A <b>digital signature</b> shows who sent a document and that it has not been changed. It gives <b>authentication, integrity and non-repudiation</b>. Encrypting a whole document is slow, so a <b>digest</b> is used.</p>" +
      "<p>A <b>hashing algorithm</b> turns a message into a fixed-size number called a <b>digest</b> (hash). A small change in the message produces a completely different digest.</p>" +
      "<p><b>Creating the signature (sender):</b></p>" +
      steps(["Put the plaintext message through a hashing algorithm to get a digest.", "Encrypt the digest with the <b>sender's private key</b>: this is the <b>digital signature</b>.", "Send the message together with the signature."]) +
      "<p><b>Checking it (recipient):</b></p>" +
      steps(["Decrypt the signature with the <b>sender's public key</b> to get the digest.", "Put the received message through the same hashing algorithm to get a second digest.", "If the two digests are <b>identical</b> the message is from the sender and has not been changed."]),
    example:
      "<p>A bank sends a statement and its digital signature. A customer's software hashes the statement and decrypts the signature with the bank's public key. The two digests match, so the statement is genuine and unchanged. If an attacker had altered one figure, the digests would differ.</p>" +
      "<p>The message itself is <b>not encrypted</b> by this process. For confidentiality it must also be encrypted (e.g. with the receiver's public key).</p>",
    checks:[
      mc("Which key is used to create a digital signature?", "The sender's private key", ["The sender's public key", "The receiver's private key", "The receiver's public key"], "Only the sender can encrypt the digest with their private key."),
      mc("What is a digest?", "A fixed-size value produced by putting a message through a hashing algorithm", ["An encrypted copy of the whole message", "The sender's private key", "A list of trusted CAs"], "The digest represents the message."),
      mc("The two digests are different when the recipient checks a signature. What does this mean?", "The message was changed or did not come from the claimed sender", ["The message is confidential", "The keys were too long", "The message has been compressed"], "Digests only match if the message is unchanged and the right key was used."),
      mc("Does a digital signature on its own make a message confidential?", "No, the message is not encrypted", ["Yes, the whole message is encrypted", "Yes, only the sender can read it", "No, because it deletes the message"], "Only the digest is encrypted."),
      tx("Describe how a digital signature is created and checked. [4]", [["hash","digest"],["private key"],["public key"],["match","same","identical","compare","compared"]], 4, "The message is put through a hashing algorithm to produce a digest, and the digest is encrypted with the sender's private key to form the digital signature, which is sent with the message. The recipient decrypts the signature with the sender's public key to get the digest, hashes the received message to get another digest and compares them; if they match the message is genuine and unchanged.")
    ] },

  { id:"17.1h", code:"17.1.3", title:"Digital certificates and certificate authorities",
    concept:
      "<p>A public key alone does not prove who owns it: a criminal could publish a fake public key. A <b>digital certificate</b> solves this. It is an electronic document that proves the identity of a website or individual and contains their <b>public key</b>. It is issued by a <b>certificate authority (CA)</b>, a trusted organisation that checks the owner's identity.</p>" +
      "<p><b>A certificate contains:</b> version and serial number, algorithm used, name of the issuer (CA), start and expiry dates, details of the owner (name, organisation, domain), the owner's <b>public key</b> and the CA's <b>digital signature</b>.</p>" +
      "<p><b>How a certificate is acquired:</b></p>" +
      steps(["The owner generates a matched pair of keys (public and private).", "The owner sends a request to the CA with their identity details and their <b>public key</b>.", "The CA <b>verifies the identity</b> of the owner.", "The CA creates the certificate, hashes its details and encrypts the digest with the <b>CA's private key</b> (the CA's digital signature), then issues it to the owner."]) +
      "<p><b>How it is used:</b> when the browser receives a certificate it checks the CA's signature using the CA's public key (already stored in the browser). If it is valid, the public key in the certificate can be trusted. The set of protocols and services behind this is the <b>public key infrastructure (PKI)</b>.</p>",
    example:
      "<p>A shop owner wants customers to trust the shop's website. The owner generates a key pair, applies to a CA with their business details and public key, and receives a certificate. When a customer visits, the shop's server sends the certificate. The browser verifies the CA's signature and, if it is valid, the browser accepts the shop's public key to set up a secure session.</p>",
    checks:[
      mc("What does a digital certificate contain?", "The owner's identity details and their public key", ["The owner's private key", "The owner's password", "The owner's credit card number"], "The private key must never be shared."),
      mc("Who issues digital certificates?", "A certificate authority (CA)", ["The browser vendor only", "The user", "An internet service provider only"], "A CA checks identity and signs the certificate."),
      mc("Which key does the CA use to sign a digital certificate?", "The CA's private key", ["The owner's private key", "The CA's public key", "The browser's public key"], "The CA's signature can be checked with the CA's public key."),
      mc("Why is a digital certificate needed as well as a public key?", "It proves that the public key really belongs to the claimed owner", ["It makes the public key shorter", "It encrypts the message", "It increases the speed of the internet"], "Otherwise anyone could publish a forged public key."),
      tx("Describe how a digital certificate is acquired by a website owner. [4]", [["key pair","matched pair","generate","public and private","keys"],["request","apply","application","sends","certificate authority","ca"],["verif","check","identity","validate"],["issue","creates","sign","signature","private key of the ca"]], 4, "The owner generates a matched pair of keys and sends a request to a certificate authority with their identity details and public key. The CA verifies the owner's identity, then creates the certificate containing the public key, signs it with the CA's digital signature and issues it to the owner.")
    ] }

  ];

  var TEST = {
    mcq:[
      mc("A sender wants to send a private message using asymmetric encryption. Which key encrypts it?", "The receiver's public key", ["The receiver's private key", "The sender's private key", "The sender's public key"], "Only the receiver's private key can decrypt it."),
      mc("A message is encrypted with the sender's private key. What is guaranteed?", "The sender's identity can be verified", ["The message is confidential", "The message is compressed", "The message is deleted"], "Anyone can decrypt with the public key, but only the sender could have encrypted."),
      mc("What is the key distribution problem?", "The shared secret key may be intercepted when it is sent", ["Public keys are too long", "Private keys cannot be generated", "Certificates have expired"], "It affects symmetric encryption."),
      mc("Using 7^n MOD 11 with n = 2, the value sent is ...", "5", ["4", "9", "49"], "49 MOD 11 = 5."),
      mc("What is used to share a symmetric session key at the start of an SSL/TLS session?", "The server's public key from its certificate", ["The browser's private key", "A paper letter", "The user's password"], "The browser encrypts the session key with the server's public key."),
      mc("Which is a benefit of quantum cryptography?", "Eavesdropping can be detected", ["It is cheap", "It works over any distance", "It needs no special cable"], "Measuring a photon changes it."),
      mc("What is placed in the digital signature?", "The digest of the message, encrypted with the sender's private key", ["The whole message encrypted with the sender's private key", "The receiver's public key", "The CA's private key"], "Only the digest is encrypted."),
      mc("Who verifies the identity of the owner of a digital certificate?", "The certificate authority", ["The website visitor", "The router", "The operating system"], "That is the role of the CA.")
    ],
    typed:[
      { q:"Describe how a verified message can be sent by an organisation to a group of people. [4]", groups:[["matched pair","generate","pair of keys"],["public key","makes available","publish"],["private key","encrypts","encrypt"],["decrypt","public key","verif"]], need:4, model:"The organisation generates a matched pair of keys and makes its public key available. It encrypts the message with its private key and sends it. Anyone can decrypt it with the organisation's public key, which verifies the sender." },
      { q:"State two checks a browser makes on a digital certificate received from a website. [2]", groups:[["signature","ca","certificate authority","trusted"],["date","dates","valid","expir","not expired"],["domain","name matches","url","address"]], need:2, model:"The browser checks that the certificate's signature is from a trusted CA, that it is within its start and end dates, and that the domain in the certificate matches the website requested." },
      { q:"Explain why hashing is used when producing a digital signature. [2]", groups:[["digest","fixed size","fixed-size","short","smaller"],["quicker","faster","less processing","encrypting the whole","not necessary to encrypt","compare","change"]], need:2, model:"Hashing produces a small fixed-size digest of the message, so only the digest needs to be encrypted (quicker than encrypting the whole message), and a changed message gives a different digest." }
    ]
  };

  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat(LESSONS);
  (root.ILEARN_TESTS = root.ILEARN_TESTS || {})[17] = TEST;
})(typeof window !== "undefined" ? window : this);
