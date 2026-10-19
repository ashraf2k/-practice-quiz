/* iLearn A Level topic 14: Communication and internet technologies (Cambridge International AS & A Level Computer Science 9618, section 14)
   Textbook: Hodder "Cambridge International AS & A Level Computer Science", chapter 14 (pages 328-345).
   Past-paper style: 9618/31, /32 and /33 May/June 2026 mark schemes (TCP/IP layers and the protocol stack). */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx, fill = root.ILQ.fill;
  function tbl(heads, rows){
    return "<table class='ln-table'><tr>" + heads.map(function(h){ return "<th>" + h + "</th>"; }).join("") + "</tr>" +
      rows.map(function(r){ return "<tr>" + r.map(function(c){ return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
  }
  function pre(s){ return "<pre class='ln-pre'>" + s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</pre>"; }

  var LESSONS = [

  /* ===================== 14.1 Protocols ===================== */
  { id:"14.1a", code:"14.1.1", title:"Why a protocol is essential",
    concept:
      "<p>A <b>protocol</b> is a set of <b>rules</b> that both the sender and the receiver agree to follow so that they can communicate. Without an agreed protocol, a receiver would not know how to interpret what it receives.</p>" +
      "<p>A protocol defines things such as:</p>" +
      "<ul><li>the <b>format</b> of the data and of the messages (headers, packet sizes);</li><li>how the sender and receiver <b>start and end</b> a communication (handshaking);</li><li>how <b>errors</b> are detected and handled (checksums, retransmission);</li><li>the <b>order</b> of the data and how it is <b>acknowledged</b>.</li></ul>" +
      "<p>Many different protocols exist because the internet carries many different kinds of communication (web pages, email, files, video).</p>",
    example:
      "<p>Parity checking is a simple example. Before data is sent, sender and receiver must agree whether <b>even</b> or <b>odd</b> parity is being used. If the sender uses even parity but the receiver checks for odd parity, every byte is wrongly reported as an error. The agreement is the <b>protocol</b>.</p>" +
      "<p>Two computers from different manufacturers can communicate because both follow the same published protocol, such as HTTP.</p>",
    checks:[
      mc("What is a protocol?", "A set of rules agreed by the sender and the receiver", ["A type of network cable", "The speed of a connection", "A program that encrypts data"], "A protocol is an agreed set of rules governing communication."),
      tx("Explain why a protocol is essential for two computers to communicate. [2]", [["rules","agreed","agree","standard"],["format","understand","interpret","errors","order","same way","compatible","both"]], 2, "A protocol is a set of rules that both sender and receiver agree to, so that data is sent in a format the receiver can interpret, and both devices handle things like errors and order in the same way.")
    ] },

  { id:"14.1b", code:"14.1.2", title:"Protocols as a stack of layers",
    concept:
      "<p>The implementation of a protocol suite is viewed as a <b>stack</b> of layers. Each layer:</p>" +
      "<ul><li>has its <b>own specific functionality</b>;</li><li>can only communicate with the <b>adjacent</b> layers (the one above and the one below);</li><li>is implemented in software and can be changed without changing the other layers.</li></ul>" +
      "<p>This is <b>decomposition</b>: the job of communicating is broken into manageable, self-contained modules, which makes it easier to develop and to make hardware and software from different makers compatible.</p>" +
      "<p>When data is <b>sent</b> it passes <b>down</b> the stack (layer 4 to layer 1); when data is <b>received</b> it passes <b>up</b> the stack (layer 1 to layer 4). User interaction is with the <b>highest</b> layer (the application layer).</p>",
    example:
      "<p>In a stack of four layers, the transport layer never talks directly to the link layer. It passes its data to the internet layer, which adds its own header and passes the result down to the link layer.</p>" +
      "<p><b>Exam link:</b> a past-paper gap-fill said: <i>The implementation of a protocol suite can be viewed as a stack. Each layer of the stack has its own specific functionality and can only communicate with adjacent layers. User interaction is associated with the highest level of the stack, which is the Application layer.</i></p>",
    checks:[
      mc("In a protocol stack, each layer can communicate with ...", "only the adjacent layers", ["any other layer", "only the top layer", "only the bottom layer"], "Each layer talks only to the layer above and the layer below it."),
      mc("When data is received, it passes through the layers in which order?", "From the lowest layer to the highest layer", ["From the highest layer to the lowest layer", "Only through the transport layer", "In a random order"], "Sending goes down the stack; receiving goes up the stack."),
      tx("Give two benefits of using a layered protocol stack. [2]", [["decomposition","self-contained","modules","smaller","manageable","independent"],["easier to develop","easier to change","compatible","compatibility","each layer has its own","own functionality","easier to update"]], 2, "The task is broken into self-contained modules (decomposition), which makes it easier to develop and update each layer, and makes hardware and software from different makers compatible.")
    ] },

  { id:"14.1c", code:"14.1.3", title:"The four TCP/IP layers",
    concept:
      "<p>The <b>TCP/IP</b> protocol suite has <b>four layers</b>:</p>" +
      tbl(["Layer", "Purpose and function", "Examples"], [
        ["<b>4 Application</b>", "Contains the <b>programs that exchange data</b> (browsers, email clients, server software) and the protocols they use. Passes data to the transport layer.", "HTTP, FTP, SMTP, POP3, IMAP, DNS"],
        ["<b>3 Transport</b>", "Breaks data into <b>packets (segments)</b>, makes sure they arrive <b>in sequence without errors</b>, using acknowledgements and re-transmission. Sets up the connection between two hosts.", "TCP (UDP)"],
        ["<b>2 Internet</b> (network)", "Identifies the <b>intended network and host</b>: adds the <b>IP addresses</b> of sender and receiver and handles the routing of packets between networks.", "IP"],
        ["<b>1 Link</b> (data-link / network access)", "Moves data across the <b>local network</b>: <b>encapsulates IP packets into frames</b>, maps IP addresses to <b>MAC addresses</b> and makes sure the correct protocols are followed.", "Ethernet, Wi-Fi"]]) +
      "<p>The unit of data has a different name at each layer: <b>segment</b> (transport), <b>datagram / packet</b> (internet), <b>frame</b> (link). Each layer <b>adds its own header</b>.</p>",
    example:
      "<p><b>Past-paper style:</b> match each layer to its description.</p>" +
      tbl(["Layer", "Description"], [["Application", "Contains all the programs that exchange data and includes protocols such as HTTP, FTP and POP3"], ["Transport", "Ensures packets arrive in sequence without errors"], ["Internet", "Identifies the intended network and host"], ["Link", "Interconnects nodes or hosts in a network, encapsulates IP packets into frames and ensures the correct protocols are followed"]]) +
      "<p>Memory aid, top to bottom: <b>A</b>ll <b>T</b>eachers <b>I</b>nspire <b>L</b>earners (Application, Transport, Internet, Link).</p>",
    checks:[
      mc("Which TCP/IP layer ensures that packets arrive in sequence and without errors?", "Transport", ["Application", "Internet", "Link"], "The transport layer (TCP) uses sequence numbers, acknowledgements and re-transmission."),
      mc("Which TCP/IP layer identifies the intended network and host using IP addresses?", "Internet", ["Transport", "Application", "Link"], "The internet layer adds the sender and receiver IP addresses and routes packets."),
      mc("Which layer encapsulates IP packets into frames?", "Link", ["Transport", "Internet", "Application"], "The link layer builds frames for the local network and uses MAC addresses."),
      mc("HTTP, FTP and POP3 belong to which layer?", "Application", ["Transport", "Internet", "Link"], "These are application-layer protocols used by programs such as browsers and email clients."),
      fill("Complete the description of the TCP/IP protocol suite.", "The TCP/IP suite has {1} layers, which can be viewed as a stack. The lowest layer is the {2} layer, which interconnects nodes in the network.", [["four", ["three", "five", "seven"]], ["link", ["transport", "application", "internet"]]], "TCP/IP has four layers: Application, Transport, Internet and Link. The link layer is the lowest.")
    ] },

  { id:"14.1d", code:"14.1.3", title:"Sending a message from one host to another",
    concept:
      "<p>When a message is sent between two <b>hosts</b> (computers or devices that can communicate), it goes <b>down</b> the layers at the sender and <b>up</b> the layers at the receiver.</p>" +
      "<ol><li><b>Application layer</b>: the program (e.g. a browser) creates the message using the application protocol.</li><li><b>Transport layer</b> (TCP): breaks the message into <b>segments</b>, numbers them and adds a header (port numbers, sequence number).</li><li><b>Internet layer</b> (IP): adds a header with the <b>source and destination IP addresses</b>, forming a datagram (packet).</li><li><b>Link layer</b>: puts the datagram into a <b>frame</b> with the <b>MAC addresses</b> and sends it over the physical network.</li></ol>" +
      "<p>The receiver <b>removes each header</b> as the data moves up the layers, and TCP reassembles the segments in order.</p>" +
      "<p><b>TCP handshake</b> (host-to-host): host X sends a segment with synchronisation bits; host Y replies with an acknowledgement and its own synchronisation bits; X acknowledges Y's segment; then data transfer can begin. TCP uses <b>positive acknowledgement with re-transmission</b>: a packet that is not acknowledged is sent again.</p>",
    example:
      "<p><b>Fetching a web page:</b></p>" +
      "<ol><li>The user types a URL into the browser (application layer).</li><li>The DNS server converts the domain name into an IP address.</li><li>HTTP passes the request to TCP, which makes packets and sends them to the server (port 80, or 443 for HTTPS).</li><li>The server acknowledges and sends back the page in HTML as packets.</li><li>The browser interprets the HTML and displays the page.</li></ol>",
    checks:[
      mc("At the sending host, in which order does the data pass through the TCP/IP layers?", "Application, Transport, Internet, Link", ["Link, Internet, Transport, Application", "Transport, Application, Link, Internet", "Application, Internet, Transport, Link"], "Sending goes down the stack from the application layer to the link layer."),
      mc("What does TCP do if it does not receive a positive acknowledgement for a packet?", "It re-sends the packet", ["It deletes the message", "It changes the IP address", "It encrypts the packet"], "Positive acknowledgement with re-transmission: unacknowledged packets are sent again."),
      mc("Which layer adds the IP addresses of the sender and receiver?", "Internet", ["Application", "Transport", "Link"], "The internet layer (IP) adds its own header containing both IP addresses."),
      tx("Describe how a message is sent from one host to another host using the TCP/IP layers. [4]", [["application"],["transport","tcp","segment","packets"],["internet","ip address","ip header","datagram"],["link","frame","mac address"],["receiver","up","headers removed","reassemble","reassembled","in order"]], 4, "The message starts in the application layer; the transport layer (TCP) splits it into numbered segments; the internet layer adds the IP addresses of the sender and receiver; the link layer puts the packets into frames using MAC addresses. At the receiving host the headers are removed as the data passes up the layers and the segments are reassembled in order.")
    ] },

  { id:"14.1e", code:"14.1.4", title:"HTTP and FTP",
    concept:
      "<p>Both are <b>application-layer</b> protocols.</p>" +
      tbl(["Protocol", "Purpose", "Notes"], [
        ["<b>HTTP</b> (hypertext transfer protocol)", "Transfers the <b>files that make up web pages</b> on the world wide web", "A <b>client/server</b> protocol: the browser sends a request, the web server responds. HTTPS adds encryption (Topic 17)."],
        ["<b>FTP</b> (file transfer protocol)", "Transfers <b>files</b> from one computer to another over a network", "Its only job is file transfer. Supports commands (rename, delete, change directory) and <b>anonymous FTP</b>. A user logs on with an ID and password."]]),
    example:
      "<p>A website designer uses <b>FTP</b> to upload new page files to the web server. A visitor then uses <b>HTTP</b> in their browser to download and display those pages.</p>",
    checks:[
      mc("Which protocol is used to transfer the files that make up a web page?", "HTTP", ["FTP", "SMTP", "IMAP"], "HTTP underpins the world wide web."),
      mc("Which protocol is used to upload or download files between computers, with commands such as rename and delete?", "FTP", ["HTTP", "POP3", "DNS"], "FTP's only task is the transfer of files over a network.")
    ] },

  { id:"14.1f", code:"14.1.4", title:"Email protocols: SMTP, POP3 and IMAP",
    concept:
      tbl(["Protocol", "Used for", "Details"], [
        ["<b>SMTP</b> (simple mail transfer protocol)", "<b>Sending</b> email (and transferring email between servers)", "A <b>push</b> protocol: the client opens a connection to the server and uploads the email. Text-based only; <b>MIME</b> is used to send attachments such as images and video."],
        ["<b>POP3</b> (post office protocol)", "<b>Receiving</b> email", "A <b>pull</b> protocol: the client connects, downloads new emails, then closes the connection. Emails are <b>deleted from the server</b> after download, so server and client are not kept in sync."],
        ["<b>IMAP</b> (internet message access protocol)", "<b>Receiving</b> email", "A pull protocol that keeps <b>server and client synchronised</b>: only a <b>copy</b> is downloaded; the original stays on the server until the user deletes it. Suits reading mail from several devices."]]),
    example:
      "<p>Sara sends an email from her laptop: her client uses <b>SMTP</b> to push it to her mail server, which passes it on to the recipient's server using SMTP. The recipient's phone collects it using <b>IMAP</b>, so the message is still available on his laptop too. If his client used <b>POP3</b> and downloaded it to the phone, it would be removed from the server.</p>",
    checks:[
      mc("Which protocol is used to <b>send</b> an email to a server?", "SMTP", ["POP3", "IMAP", "FTP"], "SMTP sends mail (push). POP3 and IMAP receive it (pull)."),
      mc("What is the main difference between POP3 and IMAP?", "IMAP keeps the client and the server synchronised; POP3 downloads and deletes from the server", ["POP3 sends email and IMAP receives it", "IMAP is text-only and POP3 can send attachments", "POP3 is encrypted and IMAP is not"], "IMAP leaves the original on the server and synchronises; POP3 downloads and removes the email from the server."),
      mc("An email contains a photograph as an attachment. SMTP is text-based. Which protocol extension allows the attachment to be sent?", "MIME", ["DNS", "HTTP", "IMAP"], "MIME (multi-purpose internet mail extension) allows media attachments to be sent with email.")
    ] },

  { id:"14.1g", code:"14.1.4", title:"BitTorrent and peer-to-peer file sharing",
    concept:
      "<p><b>BitTorrent</b> is a protocol for <b>peer-to-peer (P2P) file sharing</b>. Instead of downloading a whole file from one server, a <b>peer</b> (a client) downloads <b>pieces</b> of the file from many other peers at the same time.</p>" +
      "<ul><li>The sharer creates a small <b>torrent file</b> holding <b>metadata</b> about the file (names, sizes, tracker address, piece details). The file is split into equal-sized <b>pieces</b>.</li><li>A <b>tracker</b> is a central server that stores the details (IP addresses) of the peers in the <b>swarm</b>, so peers can find each other.</li><li>The <b>swarm</b> is the group of peers sharing the file.</li><li>A <b>seed</b> is a peer that has the complete file (or pieces) and makes it available to others.</li><li>A <b>leech</b> downloads much more than it uploads (share ratio below 1) and harms the swarm. A <b>lurker</b> downloads files but supplies no new content.</li></ul>" +
      "<p>As soon as a peer has a piece it can share it. Pieces arrive <b>out of order</b> and are put in the correct order by the protocol.</p>",
    example:
      "<p>Peer A shares a 20 MiB video. It creates a torrent file and the video is divided into twenty 1 MiB pieces. Peers B, C and D download the torrent, contact the tracker and receive different pieces from A and from each other. When B has all the pieces it becomes a <b>seed</b>.</p>" +
      "<p>Share ratio = data uploaded ÷ data downloaded. Ratio above 1 helps the swarm; below 1 hurts it.</p>" +
      "<p><b>Why use it?</b> Large files download faster, because the load is shared between many peers rather than one server. It is not used for sequential applications that need data in order.</p>",
    checks:[
      mc("In BitTorrent, what is a <b>tracker</b>?", "A central server holding details of the peers in the swarm", ["A peer that has the complete file", "A small file describing the file shared", "A peer that only downloads"], "The tracker lets peers find each other; the torrent file holds the metadata."),
      mc("What is a <b>seed</b>?", "A peer that has downloaded the file (or pieces) and makes it available to the swarm", ["A server that stores all peers' IP addresses", "A peer with a very poor share ratio", "The first piece of a file"], "Seeds share complete copies; more seeds mean faster downloads."),
      mc("A peer has uploaded 2 GB and downloaded 8 GB. Its share ratio is 0.25. What kind of effect does this peer have on the swarm?", "Negative: it is behaving like a leech", ["Positive: it is a seed", "None: only seeds matter", "Positive: it is the tracker"], "Ratio = uploaded / downloaded = 0.25. Below 1 is a negative effect."),
      tx("Describe how a file is shared using the BitTorrent protocol. [4]", [["torrent","metadata"],["pieces","split","divided","segments"],["tracker","central server"],["peers","swarm"],["seed","simultaneously","same time","different peers","many peers"]], 4, "The file is split into pieces and a torrent file with metadata is created. Peers get the torrent file and connect to the tracker, which lists the other peers in the swarm. They download different pieces from many peers at the same time, and share the pieces they have. A peer with the complete file becomes a seed.")
    ] },

  /* ===================== 14.2 Circuit and packet switching ===================== */
  { id:"14.2a", code:"14.2.1", title:"Circuit switching",
    concept:
      "<p><b>Circuit switching</b> sets up a <b>dedicated circuit (channel)</b> between sender and receiver for the whole duration of the communication. There are three stages: (1) the circuit is <b>established</b>; (2) the <b>data is transferred</b> (usually in both directions); (3) the connection is <b>terminated</b>.</p>" +
      tbl(["Benefits", "Drawbacks"], [
        ["The circuit is dedicated to this communication only", "Not flexible: the circuit is <b>tied up</b> even when idle and nobody else can use it"],
        ["The <b>whole bandwidth</b> is available", "Time is needed to <b>set up the circuit</b> before sending"],
        ["Data arrives <b>in order</b> and cannot get lost, since all data follows the same route", "If the line fails there is <b>no alternative route</b>"],
        ["Faster data transfer; works well for <b>real-time</b> applications", "Dedicated channels need a large bandwidth, which is wasted when idle"]]) +
      "<p><b>Where it is applicable:</b> public and private <b>telephone networks (PSTN)</b>, private data networks and real-time communication such as a voice or video call that needs a constant, reliable connection.</p>",
    example:
      "<p>A company rents a private line between two offices to carry video conferences. The <b>dedicated circuit</b> means sound and picture stay in step and there is no delay from reassembling packets.</p>",
    checks:[
      mc("In circuit switching, the data is sent ...", "along one dedicated route that lasts for the whole communication", ["as packets by different routes", "to every router at the same time", "only when the line is idle"], "A dedicated circuit is established first and kept until the communication ends."),
      mc("Which is a <b>drawback</b> of circuit switching?", "The circuit is tied up even when no data is being sent", ["Packets arrive out of order", "Packets can be lost on the way", "It cannot be used for telephone calls"], "The dedicated line cannot be used by anyone else even when it is idle."),
      tx("Explain why circuit switching is preferred for a video conference. [3]", [["dedicated","single route","same route","one route"],["order","in sequence","synchronised","in step","no delay","no reassembl"],["bandwidth","real-time","real time","speed"]], 3, "A dedicated circuit gives the whole bandwidth, and all the data follows the same route so it arrives in order with no delay from reassembling packets, so the sound and video stay synchronised in real time.")
    ] },

  { id:"14.2b", code:"14.2.2", title:"Packet switching and the router",
    concept:
      "<p>In <b>packet switching</b> a message is broken into <b>packets</b> that are sent <b>independently</b> and may take <b>different routes</b>. The packets are <b>reassembled in the correct order</b> at the destination.</p>" +
      "<p>Each packet has a <b>header</b> containing, for example: the <b>IP address of the destination</b> (and source), a <b>sequence number</b> (to allow reassembly), the <b>number of packets</b>, a <b>hop number</b> (time to live) and a <b>checksum</b>.</p>" +
      "<p>A <b>router</b> is a device with connections to many other routers. Its function is to <b>decide where each packet goes next</b>: when a packet arrives, the router reads the header and compares it with its <b>routing table</b>, then forwards the packet to the next router on the best route.</p>",
    example:
      "<p>A web page is sent to a home computer as 40 packets. Each packet has the destination IP address and a sequence number 1 to 40. Routers send them along the least busy path, so packet 7 may arrive before packet 5. The home computer uses the sequence numbers to put them back in order, and the page is displayed.</p>" +
      "<p><b>Hop number:</b> a lost packet could circulate forever. A hop number in the header is decreased by 1 at every router. If it reaches 0 before the destination is reached, the next router <b>deletes</b> the packet.</p>" +
      "<p><b>Checksum:</b> calculated for each packet, added to the header and recalculated at the destination. If the values differ, the packet is re-sent.</p>",
    checks:[
      mc("What is the function of a router in packet switching?", "To decide the next router each packet is sent to, using the header and a routing table", ["To split the message into packets", "To reassemble the packets", "To encrypt each packet"], "The router compares the destination in the packet header with its routing table and forwards the packet."),
      mc("Why is a <b>hop number</b> included in a packet header?", "To stop packets that never reach their destination circulating forever", ["To show the order of the packet", "To check for errors", "To show the packet's priority"], "The hop number is reduced at each router and the packet is deleted when it reaches 0."),
      mc("What is the purpose of the <b>sequence number</b> in a packet header?", "To allow the packets to be reassembled in the correct order", ["To count the number of routers passed", "To identify the sender's MAC address", "To encrypt the packet"], "Packets can arrive out of order, so the sequence number puts them back in order."),
      tx("Explain how packet switching is used to send a web page from a web server to a home computer. [4]", [["split","divided","broken","packets"],["header","destination","ip address"],["router","routing table"],["different route","different path","independently","each packet"],["reassembl","correct order","sequence number"]], 4, "The page is split into packets. Each packet has a header with the destination IP address and a sequence number. Routers check the header against the routing table to forward each packet to the next router. Each packet may take a different route, and the home computer reassembles the packets in the correct order.")
    ] },

  { id:"14.2c", code:"14.2.2", title:"Benefits and drawbacks of packet switching",
    concept:
      tbl(["Benefits", "Drawbacks"], [
        ["No dedicated line is tied up: the <b>bandwidth is shared</b> and used efficiently", "Packets can arrive in a different order and <b>must be reassembled</b>, causing a delay"],
        ["Faulty or busy lines can be avoided by <b>re-routing</b> packets", "A lost packet must be <b>re-sent</b>, wasting time"],
        ["Easy to <b>expand</b>; high data transmission rates are possible", "<b>Not suited to real-time data</b> such as video calls (delays, drop-out, picture and sound out of step)"],
        ["Cheaper: charged for the data / time used, not for the distance and duration of a dedicated circuit", "More complex protocols; needs <b>large amounts of RAM</b> to buffer and reassemble packets"]]),
    example:
      "<p>A video call over VoIP uses packet switching. Packets take different routes and arrive at different times, so the picture may freeze, the sound may be out of step with the video and quality can be reduced. A dedicated circuit (circuit switching) would avoid this.</p>",
    checks:[
      mc("Which is a benefit of packet switching?", "If a line is faulty, packets can be sent by another route", ["Packets always arrive in the correct order", "The whole bandwidth is reserved for one user", "No reassembly is needed"], "Packets can be re-routed around failed or busy lines."),
      mc("Which is a drawback of packet switching?", "Packets may arrive out of order and have to be reassembled", ["A circuit must be set up before sending", "The line is tied up when idle", "No other route can be used if a line fails"], "Reassembly causes delay, which is bad for real-time data."),
      mc("Which statement is true of <b>circuit switching</b> only?", "A dedicated path is used for the whole communication", ["Bandwidth is shared with other data", "Each packet may use a different route", "Packets are reassembled at the destination"], "Dedicated circuit = circuit switching. The other statements describe packet switching.")
    ] }

  ];

  var TEST = {
    mcq:[
      mc("Which TCP/IP layer contains the programs that exchange data, such as a web browser?", "Application", ["Transport", "Internet", "Link"], "The application layer is the top layer, where user programs and their protocols work."),
      mc("Which protocol is used to receive email while keeping the server and client synchronised?", "IMAP", ["SMTP", "POP3", "FTP"], "IMAP leaves the original on the server and keeps both in step."),
      mc("What does a BitTorrent <b>tracker</b> store?", "Details of the peers in the swarm", ["The whole file", "The pieces in order", "Encryption keys"], "The tracker is a central server that lists the peers so they can find each other."),
      mc("Which layer of the TCP/IP suite puts IP packets into frames?", "Link", ["Internet", "Transport", "Application"], "The link layer encapsulates packets into frames."),
      mc("Which is a feature of packet switching?", "Each packet can take a different route to the destination", ["A dedicated circuit is set up first", "Packets always arrive in order", "All the bandwidth is reserved"], "Packets are routed independently."),
      mc("A packet's hop number reaches 0 before it reaches its destination. What happens?", "The next router deletes it", ["It is returned to the sender", "It is sent by a dedicated circuit", "It is encrypted"], "Hopping stops lost packets clogging the network."),
      mc("Why does TCP use acknowledgements?", "So lost or corrupted packets can be detected and re-sent", ["To encrypt each packet", "To find the IP address of the host", "To compress the data"], "Positive acknowledgement with re-transmission."),
      mc("Which application suits circuit switching best?", "A real-time voice call", ["Downloading a large file", "Sending an email", "Loading a web page"], "Real-time communication benefits from a dedicated, ordered, constant connection.")
    ],
    typed:[
      { q:"Draw or describe the four layers of the TCP/IP protocol suite in order, starting with the highest layer. [4]", groups:[["application"],["transport"],["internet","network layer"],["link","data-link","network access"]], need:4, model:"Application, Transport, Internet, Link." },
      { q:"Describe the difference between circuit switching and packet switching. [3]", groups:[["dedicated","single route","same route","one route"],["packets","split","broken"],["different route","different paths","independently","each packet"],["reassembl","order","sequence"]], need:3, model:"In circuit switching a dedicated circuit is set up and all the data follows the same single route for the whole communication. In packet switching the message is split into packets, each packet may take a different route, and the packets are reassembled in order at the destination." },
      { q:"Explain the difference between the POP3 and IMAP protocols. [2]", groups:[["pop3","pop"],["delete","removed","download","pull"],["imap"],["synchronis","synchron","copy","remains on the server","stay on the server","stays on the server"]], need:2, model:"POP3 downloads emails to the client and deletes them from the server so the two are not kept in step. IMAP keeps the server and client synchronised: only a copy is downloaded and the original stays on the server until the user deletes it." }
    ]
  };

  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat(LESSONS);
  (root.ILEARN_TESTS = root.ILEARN_TESTS || {})[14] = TEST;
})(typeof window !== "undefined" ? window : this);
