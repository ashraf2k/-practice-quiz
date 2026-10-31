/* 11BR past-paper questions for iLearn topic 2 (Communication), objectives 2.1.1 to 2.1.9. Wording and mark-scheme text as published (9618 Paper 1). */
(function(){
  var A = window.PPAS, Q = A.Q, kw = A.kw, val = A.v, re = A.re;

  /* 2.1.1 LAN and WAN: 9618/12 May/June 2023 Q1(a),(b) */
  var q211 = Q("AS-J23-12-1ab", "1", "Benefits and characteristics of a LAN", "A company has a LAN (local area network).",
    [ { id: "a", label: "(a)", text: "Give two benefits of connecting computers to a LAN.\n1\n2", marks: 2, lines: 4 },
      { id: "b", label: "(b)", text: "Give two characteristics of a LAN.\n1\n2", marks: 2, lines: 4 } ],
    [ kw("(a) Max 2: sharing of files/data / communication between devices; sharing of resources e.g. hardware/software; central management e.g. backup, security", 2, "a",
        [["sharing of files", "share files", "share data", "sharing data", "share information", "communicat", "sharing files", "transfer files"], ["share resources", "sharing resources", "share hardware", "share a printer", "shared printer", "share software", "sharing of resources", "share applications", "printer"], ["central", "backup", "back up", "back-up", "security", "managed", "manage"]], true),
      kw("(b) Max 2: covers a small geographical area; the infrastructure is privately owned / not controlled by external organisations", 2, "b",
        [["small geographical", "small area", "small geographic", "one building", "single building", "limited area", "short distance", "small distance", "single site", "close"], ["privately owned", "private", "owned by", "not controlled by external", "own infrastructure", "company owns", "owned by the organisation", "owned by the company"]], true) ],
    [ { q: "1(a)", lead: "1 mark each to max 2", ans: ["Allows the sharing of files/data // Allows communication between the devices", "Allows the sharing of resources e.g. hardware / software (applications)", "Allows central management // by example, backup, security, etc."], marks: "2", guide: [] },
      { q: "1(b)", lead: "1 mark each to max 2", ans: ["Covers a small geographical area", "The infrastructure is privately owned // not controlled by external organisations"], marks: "2", guide: [] } ],
    "A LAN joins devices in a small area (one building or site) using infrastructure the organisation owns. Benefits: sharing files and resources, easy communication and central management.", A.ctx("j2023", 12));

  /* 2.1.2 Client-server and thin client: 9618/13 May/June 2023 Q2(c) */
  var q212 = Q("AS-J23-13-2c", "2", "Thin clients in a client-server model", "A university has two sites. Each site has several computer rooms. The computers are all connected as a WAN (wide area network).",
    [ { id: "c", label: "(c)", text: "The computers in one room are set up as thin-clients in a client-server model.\nDescribe the role of the different computers in this model.", marks: 2, lines: 4 } ],
    [ kw("(c) Server performs all processes required by the task and/or data storage; clients only send requests to the server and display the returned results", 2, "c",
        [["server performs", "server does", "server processes", "server stores", "server carries out", "server runs", "server handles", "server provides", "processing is done by the server", "processing on the server", "server holds", "server does all"], ["send requests", "sends requests", "request", "display", "displays", "show the results", "input and output", "returned results"]], true) ],
    [ { q: "2(c)", lead: "1 mark each to max 2", ans: ["Server performs all processes required by the task and/or data storage", "Clients only sends requests to the server and displays the returned results"], marks: "2", guide: [] } ],
    "In a thin-client system the clients do almost no processing: they send requests and display the results, while the server does the processing and stores the data.", A.ctx("j2023", 13));

  /* 2.1.3 Topologies: 9618/13 May/June 2023 Q2(b) */
  var q213 = Q("AS-J23-13-2b", "2", "Mesh topology", "A university has two sites. Each site has several computer rooms. The computers are all connected as a WAN (wide area network).",
    [ { id: "b1", label: "(b)(i)", text: "The network uses different topologies in different areas of the sites. In one building there are five computers connected in a mesh topology.\nDescribe what is meant by a mesh topology.", marks: 2, lines: 4 },
      { id: "b2", label: "(b)(ii)", text: "Give two advantages of using a mesh topology instead of a bus topology.\n1\n2", marks: 2, lines: 4 } ],
    [ kw("(b)(i) Max 2: all computers are connected to at least one other device; multiple routes between devices; computers can act as relays passing packets towards the destination", 2, "b1",
        [["at least one other", "connected to other", "connected to each other", "every computer is connected", "each computer is connected", "all computers are connected", "connected to every", "directly connected"], ["multiple routes", "more than one route", "many routes", "different routes", "several routes", "alternative route", "multiple paths"], ["relay", "pass packets", "passing packets", "pass on", "forward"]], true),
      kw("(b)(ii) Max 2: if one line goes down there are more routes available; improved security; no/fewer collisions; new nodes can be added without interruption; data sent over a dedicated connection", 2, "b2",
        [["more routes", "another route", "alternative route", "other routes", "if one", "still work", "fault tolerant", "reliable", "continue to work"], ["security", "secure"], ["collision"], ["new node", "add new", "added without", "additional device", "scalab", "easy to add"], ["dedicated"]], true) ],
    [ { q: "2(b)(i)", lead: "1 mark each to max 2", ans: ["All computers are connected to at least one other device", "There are multiple routes between devices", "The computers can act as relays, passing packets on towards the final destination"], marks: "2", guide: [] },
      { q: "2(b)(ii)", lead: "1 mark each to max 2", ans: ["If one line goes down there are more routes available", "Improved security as not using one main line", "No/fewer collisions", "New nodes can be added without interruption or interfering with other nodes", "More secure because data is sent over a dedicated connection"], marks: "2", guide: [] } ],
    "In a mesh, devices have several links, so packets can take more than one route. Faults do not stop the network and there are few collisions, unlike a bus where one cable carries everything.", A.ctx("j2023", 13));

  /* 2.1.4 Cloud computing: 9618/12 Oct/Nov 2025 Q8(a) */
  var q214 = Q("AS-N25-12-8a", "8", "Cloud computing", "A restaurant accesses software and stores data using cloud computing.",
    [ { id: "a1", label: "(a)(i)", text: "Give two benefits of storing data using cloud computing.\n1\n2", marks: 2, lines: 4 },
      { id: "a2", label: "(a)(ii)", text: "Give two drawbacks of using cloud computing.\n1\n2", marks: 2, lines: 4 } ],
    [ kw("(a)(i) Max 2: free for a limited amount; no need for personal storage devices; accessed from any computer with internet; backup and recovery included; easier to share/collaborate; capacity can be increased easily", 2, "a1",
        [["free", "no cost", "low cost", "cheap"], ["no need for", "no storage device", "personal storage", "less local storage", "save space", "local storage"], ["any computer", "anywhere", "any device", "from any", "access from", "remote"], ["backup", "back up", "recovery"], ["share", "collaborat"], ["increase", "scalab", "more storage", "expand", "capacity"]], true),
      kw("(a)(ii) Max 2: only accessed with an internet connection; may be no backups / reliance on third party; uploading/downloading can take long; downtime/technical problems; compatibility issues when moving data; limited storage without paying; more expensive in the long term; security issues", 2, "a2",
        [["internet connection", "need internet", "requires internet", "without internet", "no internet", "internet access"], ["no backup", "backups", "third party", "no control"], ["take a long time", "slow", "takes long", "long time"], ["downtime", "technical problem", "server down", "outage", "unavailable"], ["compatib"], ["pay", "limited storage", "limited amount", "expensive", "subscription", "cost"], ["security", "hack", "breach", "privacy", "unauthorised"]], true) ],
    [ { q: "8(a)(i)", lead: "1 mark per bullet point, max 2 marks", ans: ["Cloud storage can be free of charge for a limited amount", "There is no need for personal storage devices", "The data can be accessed from any computer with an internet connection", "Cloud data services usually include data backup and recovery services", "It is easier to share data / collaborate with colleagues", "Cloud storage capacity can be quickly and easily increased if needed"], marks: "2", guide: [] },
      { q: "8(a)(ii)", lead: "1 mark per bullet point, max 2 marks", ans: ["The storage/cloud can only be accessed with an internet connection", "There may be no backups // possibly no control over backups // reliance on third party for backups", "Uploading / downloading data could take a long time", "Potential issues with the cloud storage company impacting access e.g. downtime or technical problems", "Potential compatibility issues if wanting to move the data", "Limited storage availability without paying extra", "… meaning (possibly) more expensive in the long term", "Possibly security issues"], marks: "2", guide: [] } ],
    "Cloud storage keeps your data on remote servers: accessible anywhere, easy to share and scale, but it needs an internet connection and relies on the provider.", A.ctx("n2025", 12));

  /* 2.1.5 Wired and wireless: 9618/13 Oct/Nov 2025 Q4(a),(b) */
  var q215 = Q("AS-N25-13-4ab", "4", "Wireless and wired LANs", "A network engineer is setting up a Local Area Network (LAN) in an office. The network uses both wired and wireless connectivity.",
    [ { id: "a", label: "(a)", text: "Give three advantages of a wireless network compared to a wired network.\n1\n2\n3", marks: 3, lines: 5 },
      { id: "b", label: "(b)", text: "Give one drawback of using a wireless network.", marks: 1, lines: 2 } ],
    [ kw("(a) Max 3: devices more mobile (no physical connection); no cabling needed so easier to set up; easier to add additional devices; multiple different device types can be connected", 3, "a",
        [["mobile", "portable", "move around", "no physical connection", "move freely", "anywhere"], ["no cabl", "no wires", "without cabl", "easier to set up", "easy to set up", "easier to install", "less cabling", "no need for cabl", "cheaper to install"], ["add", "additional device", "more devices", "new device", "easier to connect", "scalab"], ["different device", "variety of device", "different types", "many devices", "multiple devices"]], true),
      kw("(b) One from: can be less secure; transmission speed can be slow; interference is possible; signal degrades quickly without repeaters/boosters", 1, "b", [["less secure", "security", "hack", "intercept", "slow", "speed", "interference", "signal", "range", "repeater", "booster", "weaker", "degrade"]]) ],
    [ { q: "4(a)", lead: "1 mark for each benefit, max 3", ans: ["Devices can be more mobile as no physical connection is required", "No cabling is needed so easier to set up", "Easier to add additional devices", "Multiple different device types can be connected"], marks: "3", guide: [] },
      { q: "4(b)", lead: "1 mark for a drawback", ans: ["Can be less secure", "Transmission speed can be slow", "Interference is possible", "The signal degrades quickly without repeaters/boosters"], marks: "1", guide: [] } ],
    "Wireless networks need no cables and let devices move, but they can be slower, less secure and affected by interference.", A.ctx("n2025", 13));

  /* 2.1.6 Router, Ethernet and CSMA/CD: 9618/13 May/June 2024 Q5(c) */
  var q216 = Q("AS-J24-13-5c", "5", "Ethernet and CSMA/CD",
    "A multimedia design company has an office with a LAN (local area network). The LAN can have up to 20 devices connected with cables and other devices connected using wireless access.",
    [ { id: "c1", label: "(c)(i)", text: "A different part of the network uses the Ethernet protocol.\nA collision is detected.\nDescribe how the collision is managed using Carrier Sense Multiple Access/Collision Detection (CSMA/CD).", marks: 2, lines: 4 },
      { id: "c2", label: "(c)(ii)", text: "Identify two drawbacks of using CSMA/CD.\n1\n2", marks: 2, lines: 4 } ],
    [ kw("(c)(i) Max 2: jamming signal transmitted by the sending device; transmission aborted; the sending device waits a random time before trying again; if further collisions occur the wait time is increased", 2, "c1",
        [["jam"], ["abort", "stop", "cancel"], ["random", "wait"], ["increase", "longer"]], true),
      kw("(c)(ii) Max 2: random time increased each time so can be infinite waiting; constant jamming signal so nothing sends; certain nodes cannot be prioritised; high power consumption; only suitable for short distance networks; not scalable (more nodes means longer waiting times)", 2, "c2",
        [["infinite", "waiting", "delay", "wait"], ["jamming", "nothing ever sends", "constant"], ["prioritis", "prioritiz", "priority"], ["power"], ["short distance", "limited distance", "distance"], ["scalab", "more nodes", "more devices", "longer waiting"]], true) ],
    [ { q: "5(c)(i)", lead: "1 mark each to max 2", ans: ["Jamming signal is transmitted by the sending device", "Transmission is aborted", "The sending device waits a random time before trying to send data again …", "… if further collisions occur the wait time is increased"], marks: "2", guide: [] },
      { q: "5(c)(ii)", lead: "1 mark each to max 2", ans: ["Random time increased each time so can be infinite waiting", "May be constant jamming signal so nothing ever sends", "Certain nodes cannot be prioritised", "High power consumption", "Only suitable for short distance network // limited distance", "Not scalable // more nodes means exponentially longer waiting times"], marks: "2", guide: [] } ],
    "Ethernet uses CSMA/CD: a device listens before sending; if two send at once the collision is detected, a jamming signal is sent, both stop and wait a random time before trying again.", A.ctx("j2024", 13));

  /* 2.1.7 Bit streaming: 9618/13 Oct/Nov 2024 Q9(c) */
  var q217 = Q("AS-N24-13-9c", "9", "Bit streaming", "A computer is connected to a Local Area Network (LAN) that connects to a Wide Area Network (WAN).",
    [ { id: "c", label: "(c)", text: "The computer on the LAN is used for real-time video conferences, where people connected to the internet communicate in real-time using video and audio.\nExplain how bit streaming is used in a real-time video conference.", marks: 4, lines: 8 } ],
    [ kw("(c) Max 4: data is compressed before transmitting; video and audio transmitted continuously as a series of bits; video uploaded to a media server; on download the media server sends the data to a buffer; the buffer stores data until the receiving device can process it; the receiving device receives the bit stream from the buffer", 4, "c",
        [["compress"], ["continuous", "series of bits", "stream of bits", "bit stream", "sent as a stream"], ["media server", "server"], ["buffer"], ["until the receiving device", "until the device can process", "stores data from", "process it", "can be processed"], ["receiving device receives", "receiver receives", "played", "plays"]], true) ],
    [ { q: "9(c)", lead: "1 mark for each bullet point (max 4)", ans: ["Data is compressed before transmitting", "The video and audio are transmitted continuously as a series of bits", "The video is uploaded to a media server", "On download, the media server sends the data to a buffer", "The buffer stores data from server until the receiving device can process it", "The receiving device receives the bit stream from the buffer"], marks: "4", guide: [] } ],
    "Bit streaming sends the data as a continuous flow of bits. A buffer holds some data so playback can continue smoothly even if the network speed varies.", A.ctx("n2024", 13));

  /* 2.1.8 IP addresses: 9618/12 May/June 2025 Q6(c) */
  var q218 = Q("AS-J25-12-6c", "6", "IPv4, IPv6, static and dynamic IP addresses",
    "A company has multiple sites in different cities. The company has drivers who deliver products to customers. Each driver can connect to the company’s WAN (Wide Area Network) whilst out of the office using a smartphone.",
    [ { id: "c1", label: "(c)", text: "Devices that connect to the WAN have an IP address.\nComplete the following description of IP addresses by writing the missing words.\n\nIPv4 is displayed as four groups of 8-bit numbers separated by ........................ .", marks: 1, lines: 1 },
      { id: "c2", label: "", text: "Each IPv4 address is 32 bits.\nIPv6 is made of eight groups of 4 ........................ numbers separated by colons.", marks: 1, lines: 1 },
      { id: "c3", label: "", text: "Multiple consecutive groups of ........................ can be replaced with a double colon.", marks: 1, lines: 1 },
      { id: "c4", label: "", text: "Each IPv6 address is ........................ bits.", marks: 1, lines: 1 },
      { id: "c5", label: "", text: "A ........................ IP address can change each time the computer connects to a network.", marks: 1, lines: 1 },
      { id: "c6", label: "", text: "A ........................ IP address can only be accessed by other devices in the same LAN and is assigned by the router within the LAN.", marks: 1, lines: 1 } ],
    [ val("(c) full stops", "c1", ["full stops", "full stop", "dots", "dot", "periods", "period"]), val("(c) hexadecimal", "c2", ["hexadecimal", "hex"]), val("(c) zeros", "c3", ["zeros", "zeroes", "zero", "0s"]),
      val("(c) 128", "c4", ["128"]), val("(c) dynamic", "c5", ["dynamic"]), val("(c) private", "c6", ["private"]) ],
    [ { q: "6(c)", lead: "1 mark for each correct word", ans: ["full stops", "hexadecimal", "zeros", "128", "dynamic", "private", "IPv4 is made of four groups of 8-bit numbers separated by full stops. Each IPv4 address is 32 bits.", "IPv6 is made of eight groups of 4 hexadecimal numbers separated by colons. Multiple consecutive groups of zeros can be replaced with a double colon. Each IPv6 address is 128 bits.", "A dynamic IP address can change each time the computer connects to a network.", "A private IP address can only be accessed by other devices in the same LAN and is assigned by the router within the LAN."], marks: "6", guide: [] } ],
    "IPv4 = 32 bits as four 8-bit numbers separated by full stops; IPv6 = 128 bits as eight groups of four hexadecimal digits. Dynamic addresses change; private addresses are only valid inside the LAN.", A.ctx("j2025", 12));

  /* 2.1.9 Internet and how data travels to a resource: 9618/12 May/June 2024 Q3(c) (closest question; no URL/DNS question in the 2023-2026 Paper 1 papers) */
  var q219 = Q("AS-J24-12-3c", "3", "Routers and the PSTN on the internet", "An assessment board scans exam papers and stores the digitised papers on a server. Exam markers download the digitised papers to mark.",
    [ { id: "c1", label: "(c)(i)", text: "Data transmitted on the internet passes through multiple different systems.\nDescribe the role of routers in the transmission of data through the internet.", marks: 2, lines: 4 },
      { id: "c2", label: "(c)(ii)", text: "Describe the role of the PSTN (Public Switched Telephone Network) in the transmission of data through the internet.", marks: 2, lines: 4 } ],
    [ kw("(c)(i) Max 2: receives packets from the internet; analyses the destination IP address of each packet; forwards the packet towards its destination using the routing table; maintains/updates the routing table; finds the most efficient route", 2, "c1",
        [["receives packets", "receive packets", "receives data"], ["destination", "ip address"], ["forward", "pass", "send on"], ["routing table"], ["efficient route", "best route", "shortest route", "fastest route"]], true),
      kw("(c)(ii) Max 2: many different types of communication lines; digital data may be converted to analogue; data transmitted in both directions at the same time (duplex); passes through switching centres/ISPs", 2, "c2",
        [["different types", "communication lines", "telephone lines", "phone lines", "lines"], ["analogue", "convert", "different form"], ["both directions", "duplex", "same time", "simultaneous"], ["switching centre", "switching center", "isp", "exchange"]], true) ],
    [ { q: "3(c)(i)", lead: "1 mark each to max 2:", ans: ["Receives packets from internet", "Analyses the destination IP address of each packet", "Forwards the packet towards its destination", "… using the routing table", "Maintains/updates the routing table", "Finds the most efficient route to the destination"], marks: "2", guide: [] },
      { q: "3(c)(ii)", lead: "1 mark each to max 2:", ans: ["The PSTN consists of many different types of communication lines", "… therefore the digital data may need to be converted into a different form/analogue signal", "Data is transmitted in both directions at the same time // duplex data transmission", "Using a PSTN the communication passes through different switching centres/ISPs"], marks: "2", guide: [] } ],
    "Routers read each packet’s destination IP address and use a routing table to forward it along the best route. The PSTN is the public telephone network used as part of the internet’s infrastructure.", A.ctx("j2024", 12));

  A.paper("2.1.1", "Networks, LAN and WAN", [q211]);
  A.paper("2.1.2", "Client-server and peer-to-peer", [q212]);
  A.paper("2.1.3", "Network topologies", [q213]);
  A.paper("2.1.4", "Cloud computing", [q214]);
  A.paper("2.1.5", "Wired and wireless networks", [q215]);
  A.paper("2.1.6", "Router, Ethernet and CSMA/CD", [q216]);
  A.paper("2.1.7", "Bit streaming and the internet", [q217]);
  A.paper("2.1.8", "IP addresses", [q218]);
  A.paper("2.1.9", "URLs, DNS and how data reaches a resource", [q219]);
})();
