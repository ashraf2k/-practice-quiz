/* iLearn AS Level (11BR) -- Topic 2 Communication (syllabus 2.1 Networks including the internet).
   Every lesson: idea, worked example, quick checks, then a REAL Cambridge 9618 past-paper question marked on the mark-scheme keywords. */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx, tbl = root.ASA.tbl, pre = root.ASA.pre, ASA = root.ASA;
  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat([

  { id:"2.1.1a", code:"2.1.1", title:"Networks and the LAN: why computers are connected",
    concept:
      "<p>A <b>network</b> is two or more computers joined together so that they can share data and resources. Devices such as <b>switches, routers, wireless access points</b> and <b>network interface cards (NICs)</b> make the connections.</p>" +
      "<h4>Benefits of networking</h4>" +
      "<ul><li>Share <b>files and data</b>, and communicate (email, messaging).</li><li>Share <b>resources</b>: printers, scanners, software (applications) and internet access.</li><li><b>Central management</b>: back-up, security and updates can be done from one place.</li></ul>" +
      "<h4>A LAN (local area network)</h4>" +
      "<ul><li>Covers a <b>small geographical area</b> (one building or site).</li><li>The infrastructure (cables, switches) is <b>privately owned</b> by the organisation; it is not controlled by external organisations.</li><li>Can use wired or wireless connections and has a high data transfer rate.</li></ul>",
    example:
      "<p>A school computer room: 30 computers, 2 printers and a file server, all joined to a switch in the same building. Students share one printer, save work on the server so the school can back it up every night, and the IT team installs software once for everybody.</p>" +
      "<p><b>Exam habit:</b> 'give two benefits' needs <b>two different ideas</b>. 'Share files' and 'share data' are the same idea, so they earn one mark. Pair 'share files' with 'share a printer' or 'central backup'.</p>",
    checks:[
      mc("Which of these is a characteristic of a LAN?", "It covers a small geographical area and is usually privately owned", ["It covers a large area using public telephone lines", "It always uses satellites", "It has no cables"], "LANs cover a small area (a building or site) and the infrastructure belongs to the organisation."),
      mc("Which is a benefit of connecting computers to a network?", "Resources such as printers can be shared", ["Each computer becomes faster", "Viruses can no longer spread", "Computers no longer need software"], "Sharing resources (printers, software, data) is a main benefit."),
      mc("Which device provides each wired computer in a LAN with its connection to the network?", "A network interface card (NIC)", ["A monitor", "A scanner", "A USB stick"], "The NIC joins the computer to the network cable or wireless signal."),
      tx("Give two benefits of connecting computers to a LAN. [2]", [["share files","sharing files","share data","sharing data","communicat","email","messag"],["share resources","sharing resources","share a printer","sharing a printer","printer","scanner","share software","internet access"],["central","manage","backup","back up","back-up","security","updates"]], 2, "Any two of: files and data can be shared / computers can communicate; hardware and software resources (such as printers) can be shared; central management (for example back-up and security)."),
      ASA.pp("9618/12 May/June 2023 · Question 1(a) and (b)", "Give two DIFFERENT ideas. Benefits: sharing files/data, sharing resources, central management. LAN: small area and privately owned.",
        [ ASA.text("(a)", 2, "A company has a LAN (local area network). Give two benefits of connecting computers to a LAN.",
            [ ["Allows the sharing of files / data // allows communication between the devices", ["share files", "sharing files", "share data", "sharing data", "shared data", "share information", "communicat", "email", "send messages", "share documents"]], ["Allows the sharing of resources, e.g. hardware / software (applications)", ["share resources", "sharing resources", "share hardware", "share software", "share a printer", "sharing a printer", "share printers", "shared printer", "printer", "scanner", "share applications", "share internet"]], ["Allows central management, for example backup, security", ["central", "manage", "backup", "back up", "back-up", "security", "update"]] ],
            { lead: "1 mark each to a maximum of 2:", lines: 3 }),
          ASA.text("(b)", 2, "Give two characteristics of a LAN.",
            [ ["Covers a small geographical area", ["small geographical", "small area", "small region", "small distance", "single building", "one building", "single site", "short distance", "close together", "small location", "limited area"]], ["The infrastructure is privately owned // not controlled by external organisations", ["privately owned", "private", "owned by", "own infrastructure", "not controlled", "dedicated", "company owned", "organisation owned"]] ],
            { lead: "1 mark each to a maximum of 2:", lines: 3 }) ])
    ] },

  { id:"2.1.1b", code:"2.1.1", title:"The WAN, transmission media and the cell phone network",
    concept:
      "<p>A <b>WAN (wide area network)</b> connects devices over a <b>large geographical area</b>, such as between cities or countries. The internet is the biggest WAN.</p>" +
      tbl(["", "LAN", "WAN"], [["Area", "small (a site or building)", "large (cities, countries)"], ["Infrastructure", "privately owned, dedicated hardware", "uses external / public (not company-owned) media; non-dedicated hardware, often leased"], ["Data rate", "usually high", "usually lower"], ["Connections", "usually physical cables / Wi-Fi", "often virtual or leased"]]) +
      "<h4>Transmission media</h4>" +
      tbl(["Medium", "How it carries data"], [["Copper cable (twisted pair, coaxial)", "electrical signals"], ["Fibre optic cable", "pulses of light (high speed, long distance, no electrical interference)"], ["Radio waves / microwaves (including satellite links)", "electromagnetic waves on different frequencies, no cable needed"]]) +
      "<h4>The cell phone network</h4>" +
      "<ul><li>The land is split into <b>cells</b>; each cell has a <b>tower with an antenna</b>.</li><li>Data goes between the phone and the tower using <b>low power radio signals (wireless)</b>.</li><li>Many devices can use the same tower at the same time.</li></ul>",
    example:
      "<p>A delivery driver's smartphone connects to the cell tower nearest to her. The tower passes the data on towards the company's server over the wider network. As she drives into the next cell, the signal is picked up by the next tower.</p>" +
      "<p><b>Answering 'explain how data is transmitted':</b> write a chain of events in order: cells, tower and antenna, wireless radio signals, many devices at once.</p>",
    checks:[
      mc("Which transmission medium sends data as pulses of light?", "Fibre optic cable", ["Copper cable", "Radio waves", "Coaxial cable"], "Fibre optic cable carries data as light pulses."),
      mc("Which statement is true about a WAN?", "It covers a large area and often uses external, public transmission media", ["It always belongs to one company", "It covers one room", "It cannot use fibre optic cable"], "WANs cover large areas and use non-company-owned media."),
      mc("In a cell phone network, what does each cell contain?", "A tower with an antenna", ["A satellite", "A fibre optic router only", "A hard disk"], "Each cell has a tower with an antenna that sends and receives the radio signals."),
      tx("State two ways that a WAN is different to a LAN. [2]", [["larger","large","wider","bigger"],["geographical","area","distance"],["external","public","not company owned","not owned","leased","non-dedicated","non dedicated","third party"]], 2, "A WAN covers a larger geographical area; a WAN may use non-dedicated hardware / external transmission media that is not company owned."),
      ASA.pp("9618/12 May/June 2025 · Question 6(a) and (b)", "A WAN is wider and uses external, not company-owned, media. For the cell network explain in order: cells, tower and antenna, wireless radio transmission, many devices at once.",
        [ ASA.text("(a)", 2, "A company has multiple sites in different cities. State two ways that a WAN is different to a LAN.",
            [ ["In a WAN devices can connect over a larger geographical area; in a LAN devices connect over a smaller geographical area", ["larger", "large", "wider", "bigger", "greater distance", "geographical"], ["geograph", "area", "distance", "cities", "countries"]], ["A WAN may use non-dedicated hardware; the hardware in a LAN is usually dedicated", ["non-dedicated", "non dedicated", "not dedicated", "shared hardware", "public hardware"]], ["A WAN uses external / not company owned transmission media; the media for a LAN is usually company owned", ["external", "not company owned", "not owned", "public", "third party", "leased", "telecommunication", "isp"]] ],
            { lead: "1 mark each to a maximum of 2:", lines: 3 }),
          ASA.text("(b)", 4, "The smartphones use the cell phone network to connect to the WAN. Explain how data is transmitted using the cell phone network.",
            [ ["Land is split into cells designed for maximum line of sight", ["cell"]], ["Each cell has a tower with an antenna which receives and transmits data", ["tower", "antenna", "base station", "mast", "aerial"]], ["Data is transmitted between the tower and the phone", ["between the tower and", "tower and the phone", "phone and the tower", "phone to the tower", "tower to the phone", "tower and phone", "phone and tower"]], ["Data transmission is wireless using low power radio signals / frequencies", ["wireless", "radio", "frequenc", "microwave", "electromagnetic"]], ["Multiple devices can communicate simultaneously with the same tower", ["multiple", "many devices", "several devices", "simultaneous", "same time", "same tower", "more than one"]] ],
            { lead: "1 mark each to a maximum of 4:", lines: 6 }) ])
    ] },

  { id:"2.1.2a", code:"2.1.2", title:"Client-server and peer-to-peer models",
    concept:
      "<p>In the <b>client-server model</b> a <b>server</b> is a powerful computer that stores data and provides services. <b>Clients</b> are the computers (or browsers) that <b>send requests</b> to the server; the server <b>performs the action</b>, updates its data and <b>sends the results back</b>.</p>" +
      "<p>In the <b>peer-to-peer (P2P) model</b> there is <b>no central server</b>. Every computer (peer) is both a client and a server: each stores its own files and can share them directly with others.</p>" +
      tbl(["", "Client-server", "Peer-to-peer"], [["Control", "central server manages users, data, security", "no central control; every peer is equal"], ["Back-up and security", "easier: done on the server", "harder: every computer must be looked after"], ["If it fails", "server down means service stops", "other peers keep working"], ["Cost / set-up", "server and network manager needed", "cheap and simple for a few computers"], ["Examples", "web, email, online games, databases", "file sharing, small home or office networks"]]),
    example:
      "<p><b>An online game:</b> the web server stores each player's data. The player's web browser is the <b>client</b> and sends requests over the internet. The server performs the action in the game, updates the game data and sends the result back to the player.</p>" +
      "<p><b>'Explain why the statement is correct'</b> needs the <b>reasons applied to the scenario</b>: name the server, name the client, and describe the request and the response.</p>",
    checks:[
      mc("In a client-server network, what does the client do?", "Sends requests to the server and shows the results", ["Stores all the data", "Performs all the processing for other clients", "Connects networks together"], "Clients request services; servers provide them."),
      mc("Which network has no central server?", "Peer-to-peer", ["Client-server", "Thin client", "Star"], "In a peer-to-peer network every computer is equal."),
      mc("Which is a drawback of a peer-to-peer network compared with client-server?", "Security and back-ups are harder to manage", ["It needs an expensive server", "It cannot share files", "It stops if one computer fails"], "With no central control each peer has to be secured and backed up separately."),
      tx("State one advantage of a client-server network over a peer-to-peer network. [1]", [["central","one place","centrally","easier to back up","easier to manage","more secure","security","backup","back up","back-up"]], 1, "Data, security and back-ups are managed centrally on the server."),
      ASA.pp("9618/13 May/June 2025 · Question 3(c)", "Name the client and the server in the scenario, then describe the request and the response.",
        [ ASA.text("(c)", 4, "The computer program allows users to play a game in a virtual world. Users can play the game from any computer with internet access using a web browser. The game allows users to interact with other users. Explain the reasons why the statement 'This computer game uses a client-server model' is correct.",
            [ ["A webserver stores all the data for each player", ["web server", "webserver", "server"], ["stores", "store", "holds", "data"]], ["Each player is on a client computer // the player's web browser is the client", ["client", "browser", "player's computer", "user's computer"]], ["... that sends requests over the internet to the web server", ["request"]], ["The server performs the required action in the game", ["performs", "processes", "carries out", "does the", "runs the", "action in the game", "processing"]], ["The server updates the data in the game", ["updates", "update", "changes the data", "stores the new"]], ["The server sends the results to the player", ["sends the result", "sends the response", "returns", "sent back", "send back", "sends back", "results to the player", "response to the", "sends the data back"]] ],
            { lead: "1 mark each to a maximum of 4:", lines: 7 }) ])
    ] },

  { id:"2.1.2b", code:"2.1.2", title:"Thin clients and thick clients",
    concept:
      "<p>The difference between a <b>thin client</b> and a <b>thick (fat) client</b> is <b>where the processing and storage happen</b>.</p>" +
      tbl(["", "Thin client", "Thick client"], [
        ["Processing", "The <b>server</b> performs all (or most) of the processing. The client only sends requests and displays the results.", "The client does <b>most of its own processing</b> independently. The server does little (for example storing shared files)."],
        ["Storage", "Data and software are stored on the <b>server</b>, not on the client", "Software and data are installed <b>locally</b>"],
        ["Needs", "A reliable network or internet connection and the server being up; <b>few local resources</b> (small memory and processor)", "A powerful computer; can often work without the network"],
        ["Typical use", "Web apps, remote desktops, exam-marking software, cheap terminals in a library", "A designer's workstation, a gaming PC, a laptop with installed software"]]),
    example:
      "<p><b>Exam markers using a thin client:</b> the exam papers are held on the server and not on the examiner's computer (data not stored on the client). A basic laptop will do, because the marking software needs few local resources. But if the server goes down, or there is no network, the examiner cannot mark.</p>" +
      "<p><b>Always link each characteristic to the scenario</b> (examiners, papers, marking). The mark scheme gives one mark for the characteristic and one for the use in this software.</p>",
    checks:[
      mc("Where does most of the processing take place with a thin client?", "On the server", ["On the client", "On the router", "On the printer"], "A thin client only sends requests and shows the results."),
      mc("Which is a drawback of a thin client?", "It cannot work if the network or server is down", ["It needs a very powerful processor", "It stores all the data locally", "It cannot be used in a LAN"], "A thin client relies on the server and the network."),
      mc("Which client stores most of its software and data locally?", "A thick client", ["A thin client", "A web browser only", "A router"], "A thick client does its own work with locally installed software."),
      tx("Describe what is meant by a thick-client model. [2]", [["client","clients","computer"],["own processing","process","independently","locally installed","installed locally","most of the processing","most of the work","own resources","own software","local"],["server","minimal","little","some","stores"]], 2, "The server performs minimal / some processing for the client; the clients do most of their own processing / work independently, with most resources installed locally."),
      ASA.pp("9618/12 May/June 2024 · Question 3(b)", "Two thin-client characteristics, and for each one say how it applies to the marking software: not stored locally, reliant on the server / internet, few local resources, minimal processing.",
        [ ASA.text("(b)", 4, "Exam markers use software that operates as a thin-client to mark exam papers that are stored on a server. Complete the table by identifying two characteristics of a thin-client. Describe how each characteristic will be used in this software. (Write each characteristic and its use.)",
            [ ["Characteristic: data is not stored on the client computer", ["not stored", "no data stored", "stored on the server", "stored on a server", "doesn't store", "does not store", "not saved", "not permanently", "held on the server"]], ["Use: exam papers are stored on the server and not on the examiner's computer / not permanently stored on the examiners' computers", ["exam", "paper", "marker", "examiner", "marking", "script"], ["server"]], ["Characteristic: client computer is reliant on access to the server // heavily reliant on the network / internet connection", ["reliant", "relies", "rely", "depend", "needs the server", "needs a connection", "needs network", "needs internet", "requires"]], ["Use: examiners cannot mark if their device cannot access the server / the marking software will not operate without network / internet access", ["cannot mark", "can't mark", "unable to mark", "without network", "without internet", "server goes down", "server down", "no connection", "not operate", "not work", "not function"]], ["Characteristic: client requires few local resources / memory; performs minimal functions / processes", ["few local", "low spec", "little memory", "minimal", "few resources", "low resources", "small memory", "limited resources", "less processing", "low processing", "basic"]], ["Use: examiners can use low-resource devices and the marking software will still function // the software transmits requests and the server responds", ["low resource", "low spec", "cheap", "basic", "older", "simple device", "still function", "still work", "server responds", "sends requests", "sends the request", "requests", "server processes"]] ],
            { lead: "1 mark for each characteristic and 1 mark for the description of its use in this software, to a maximum of 4:", lines: 7, guide: "Characteristics include: data is not stored on the client; the client is reliant on access to the server; heavily reliant on the network / internet; requires few local resources; performs minimal processing." }) ])
    ] },

  { id:"2.1.3a", code:"2.1.3", title:"Star and bus topologies: how packets travel",
    concept:
      "<p>A <b>topology</b> is the way the devices in a network are arranged and connected.</p>" +
      "<h4>Star</h4>" +
      "<ul><li>Every device has <b>its own cable to a central switch (or router)</b>, and no other connections.</li><li><b>Packets:</b> the sending device sends the packets to the switch; the switch <b>checks the destination address</b> of each packet and forwards it <b>only to the intended receiver</b>.</li><li>One cable fails: only that device is cut off. The switch fails: the whole network stops.</li></ul>" +
      "<h4>Bus</h4>" +
      "<ul><li>All devices connect to <b>one shared backbone cable</b>, with a terminator at each end.</li><li>Only one device can transmit at a time, so <b>collisions</b> can happen. A network on a bus uses <b>Ethernet with CSMA/CD</b> to detect and manage them.</li><li>If the backbone breaks the whole network fails. Cheap and simple for a small number of devices.</li></ul>",
    example:
      "<p>Five computers and a server joined to a switch: that is a <b>star</b>. Computer A sends a file to the server. The packets go to the switch, the switch reads the destination address and sends them only to the server, so the other computers see none of the traffic.</p>" +
      "<p><b>Exam habit:</b> in a bus network, say the three CSMA/CD ideas: the device <b>listens</b> and sends only when the line is idle; if a <b>collision</b> is detected it <b>stops and sends a jamming signal</b>; each device then waits a <b>random time</b> before trying again (longer if there are more collisions).</p>",
    checks:[
      mc("In a star network, what do all the devices connect to?", "A central switch", ["One shared backbone cable", "Each other in a ring", "A printer"], "Each device has its own link to the central switch."),
      mc("What does the switch do with a packet in a star network?", "Reads the destination address and forwards it only to that device", ["Sends it to every device", "Deletes it", "Encrypts it"], "That is why other devices do not see the traffic."),
      mc("Which topology can suffer collisions because devices share one cable?", "Bus", ["Star", "Full mesh", "Hybrid with switches only"], "On a bus only one device can use the shared cable at a time."),
      tx("Describe how packets are transmitted between two devices in a star topology. [2]", [["switch","central device","router","hub"],["destination address","address of the packet","intended","forward","only to"]], 2, "The sending device sends the packets to the switch; the switch checks the destination address and forwards them directly (only) to the intended device."),
      ASA.pp("9618/12 October/November 2025 · Question 5(c) and (d)", "Star: device to switch, switch checks the destination address, forwards only to the receiver. Bus: CSMA/CD - listen, send when idle, jam and abort on collision, random wait that grows.",
        [ ASA.text("(c)", 3, "Describe how packets are transmitted between two hosts using a star topology.",
            [ ["The sending device sends the packets to the switch", ["sends the packets to the switch", "sends to the switch", "packets to the switch", "sent to the switch", "send them to the switch", "sent to the central", "goes to the switch", "to the central device", "to the central switch"]], ["The switch checks the destination address on each packet", ["destination address", "address of the", "address on", "checks the address", "reads the address", "mac address"]], ["... and sends them only to the intended receiver", ["only to the", "intended", "correct device", "recipient", "receiver", "destination device", "directly to"]] ],
            { lead: "1 mark per bullet point, maximum 3 marks:", lines: 5 }),
          ASA.text("(d)", 3, "Another type of network is a bus network. Ethernet is used to transmit and receive data between the devices on the bus network. Describe how collisions are detected and managed on this network.",
            [ ["The use of CSMA/CD // Carrier Sense Multiple Access with Collision Detection", ["csma", "carrier sense"]], ["The workstations listen to the communication channel", ["listen", "monitor", "sense", "check the channel", "check the line", "check if the line", "check whether"]], ["... and send data only when there is no data being transmitted / the line is idle", ["idle", "quiet", "no data being", "no other", "free", "not in use", "clear", "no transmission"]], ["If a collision is detected, transmission is aborted", ["abort", "stop", "cancel", "halt"]], ["... and a jamming signal is sent", ["jam"]], ["The workstation calculates a random wait time before trying to re-transmit", ["random"]], ["The random time is increased if there are multiple collisions", ["increase", "longer", "doubl", "multiple collisions", "more collisions"]] ],
            { lead: "1 mark per bullet point, maximum 3 marks:", lines: 6 }) ])
    ] },

  { id:"2.1.3b", code:"2.1.3", title:"Mesh and hybrid topologies",
    concept:
      "<p>In a <b>mesh topology</b> every device is connected to <b>at least one other</b> device, and usually to several. There are <b>multiple routes</b> between devices, and the devices can <b>act as relays</b>, passing packets on towards their final destination.</p>" +
      tbl(["", "Full mesh", "Partial mesh"], [["Connections", "every device linked to every other device", "some devices linked to several others, some to only one"], ["Cost", "very expensive: n(n&minus;1)/2 links", "cheaper"], ["Reliability", "highest: many alternative routes", "good"]]) +
      "<h4>Advantages of a mesh over a bus</h4>" +
      "<ul><li>If one line goes down there are <b>more routes available</b>.</li><li>No / fewer <b>collisions</b>, and a dedicated connection between nodes, so it is <b>more secure</b>.</li><li>New nodes can be added <b>without interrupting</b> the other nodes.</li></ul>" +
      "<p>A <b>hybrid topology</b> combines two or more topologies, for example several star networks whose switches are joined by a bus or a mesh. Large organisations use hybrids because each part can use the topology that suits it.</p>",
    example:
      "<p>Five computers in a full mesh need 5 &times; 4 &divide; 2 = <b>10 cables</b>. Add a sixth and you need 15. This is why a full mesh is only used where reliability matters more than cost.</p>" +
      "<p>The internet itself is a partial mesh of routers: if one link fails, packets are sent along another route.</p>",
    checks:[
      mc("How many cables are needed to connect 4 computers in a full mesh?", "6", ["4", "8", "12"], "4 x 3 / 2 = 6."),
      mc("Which is an advantage of a mesh topology over a bus topology?", "If one line goes down there are other routes", ["It is cheaper to install", "It needs fewer cables", "It has only one route between devices"], "A mesh has several routes."),
      mc("Which topology is made by joining two or more different topologies?", "Hybrid", ["Star", "Bus", "Ring"], "A hybrid combines topologies."),
      tx("Describe what is meant by a mesh topology. [2]", [["connected to at least one","connected to another","every device","each device","each computer","all computers"],["multiple routes","more than one route","several routes","many routes","relay","relays","pass packets","passing packets","other devices"]], 2, "All computers are connected to at least one other device; there are multiple routes between devices; computers can act as relays passing packets on to their destination."),
      ASA.pp("9618/13 May/June 2023 · Question 2(b)", "Mesh: connected to at least one other, multiple routes, relays. Advantages over bus: other routes if one fails, more secure, fewer collisions, nodes can be added without interruption.",
        [ ASA.text("(b)(i)", 2, "In one building there are five computers connected in a mesh topology. Describe what is meant by a mesh topology.",
            [ ["All computers are connected to at least one other device", ["at least one other", "connected to another", "every computer is connected", "each computer is connected", "all computers are connected", "each device is connected", "every device", "connected to each other", "connected to other"]], ["There are multiple routes between devices", ["multiple routes", "more than one route", "several routes", "many routes", "different routes", "alternative routes", "multiple paths", "many paths"]], ["The computers can act as relays, passing packets on towards the final destination", ["relay", "pass", "forward"]] ],
            { lead: "1 mark each to a maximum of 2:", lines: 3 }),
          ASA.text("(b)(ii)", 2, "Give two advantages of using a mesh topology instead of a bus topology.",
            [ ["If one line goes down there are more routes available", ["more routes", "other routes", "alternative route", "another route", "different route", "line goes down", "cable breaks", "if one", "still work", "keeps working", "redundan"]], ["Improved security as not using one main line", ["secur", "main line", "backbone", "dedicated"]], ["No / fewer collisions", ["collision"]], ["New nodes can be added without interruption or interfering with other nodes", ["new node", "add", "expand", "without interrupt", "without interfering", "without affecting"]] ],
            { lead: "1 mark each to a maximum of 2:", lines: 3 }) ])
    ] },

  { id:"2.1.4a", code:"2.1.4", title:"Cloud computing: public and private clouds",
    concept:
      "<p><b>Cloud computing</b> means storing data and running software on <b>remote servers</b> that you reach over the internet, instead of on your own computer or local server.</p>" +
      tbl(["", "Public cloud", "Private cloud"], [
        ["Who can use it", "<b>Anyone</b> can sign up and use it (shared infrastructure owned by a provider)", "<b>Only one organisation</b>: dedicated, bespoke services / storage on a remote server"],
        ["Cost", "cheaper: you share the infrastructure and pay for what you use", "more expensive: the organisation pays for its own dedicated infrastructure"],
        ["Control and security", "provider controls security, back-ups and updates", "<b>greater control</b> over security, privacy and back-ups; not reliant on a third party"],
        ["Capacity", "very easily scaled", "can be tailored / scaled to the company's requirements"],
        ["Example", "online storage and email services used by the public", "a company's own storage for its employees' work"]]),
    example:
      "<p>An online school sells courses to students in many countries. It uses a <b>public cloud</b> because the courses must be available to anyone, on the internet, and sharing infrastructure with other companies is more economic.</p>" +
      "<p>A design company that stores confidential client work chooses a <b>private cloud</b>: it is not reliant on a third party, it controls security and back-up, and it can tailor the storage to its needs.</p>",
    checks:[
      mc("Which type of cloud is available only to one organisation?", "Private cloud", ["Public cloud", "Hybrid network", "Peer-to-peer"], "A private cloud is dedicated to one organisation."),
      mc("Which is a reason a company might choose a private cloud?", "Greater control over security and back-up", ["It is free for everybody", "It needs no internet connection", "It has no servers"], "Private clouds give more control."),
      mc("Where is data stored when it is 'in the cloud'?", "On remote servers accessed over the internet", ["On the user's USB stick", "In the CPU cache", "In the router"], "Cloud storage is on remote servers."),
      tx("Define the term private cloud. [1]", [["dedicated","bespoke","only available to","only one","single company","one company","one organisation","single organisation","only the company","exclusive"]], 1, "Dedicated / bespoke services or storage on a remote server only available to one company."),
      ASA.pp("9618/13 May/June 2024 · Question 5(a)", "Private cloud = dedicated to the company only. Benefits over public: not reliant on a third party, more control over security/privacy and back-up, storage tailored to the company.",
        [ ASA.text("(a)(i)", 1, "Define the term private cloud.",
            [ ["Dedicated / bespoke services / storage on a remote server only available to the company", ["dedicated", "bespoke", "only available", "only the company", "only one", "single company", "one company", "one organisation", "single organisation", "exclusive", "only that company"]] ],
            { lead: "1 mark for:", lines: 2 }),
          ASA.text("(a)(ii)", 3, "A multimedia design company has private cloud storage for its employees to store their work. Describe the benefits to the company of using private cloud storage instead of public cloud storage.",
            [ ["Not reliant on a third party", ["third party", "not reliant", "not rely", "doesn't rely", "does not rely", "own control", "independent"]], ["... gives greater control over security / privacy", ["control", "secur", "privacy", "private", "confidential"]], ["... gives greater control over backup", ["backup", "back up", "back-up", "backups"]], ["Storage can be tailored / scalable to company requirements", ["tailor", "scalab", "bespoke", "customis", "customiz", "requirements", "needs of", "share files", "sharing of files", "amount of storage"]] ],
            { lead: "1 mark each to a maximum of 3:", lines: 5 }) ])
    ] },

  { id:"2.1.4b", code:"2.1.4", title:"Benefits and drawbacks of cloud storage",
    concept:
      "<p>Cloud services are used by almost everyone, so the exam asks you to weigh them up.</p>" +
      tbl(["Benefits", "Drawbacks"], [
        ["Data can be accessed from <b>any computer with an internet connection</b>", "Needs an <b>internet connection</b> to reach the data"],
        ["No need for your own <b>storage devices</b> to buy, run and replace", "Uploading and downloading large files can take a <b>long time</b>"],
        ["The provider usually includes <b>back-up and recovery</b>", "Little or no control over back-ups: you rely on a <b>third party</b>"],
        ["Easy to <b>share and collaborate</b> with colleagues", "Provider problems (<b>downtime</b>, technical faults) stop access"],
        ["Capacity can be <b>quickly increased</b> when needed; a small amount may be free", "Extra storage costs money, so it can be <b>more expensive in the long term</b>"],
        ["", "Possible <b>security</b> concerns; compatibility issues if you want to move the data"]]) +
      "<p><b>Remember:</b> a benefit or a drawback must be a <b>real consequence</b> ('easier to share files'), not just the word 'good'.</p>",
    example:
      "<p>A restaurant stores its menus and orders in the cloud. <b>Benefit:</b> every waiter's tablet can reach the same menu, and the provider backs the data up. <b>Drawback:</b> if the restaurant's internet connection goes down at lunch, the staff cannot see the menu or take orders.</p>",
    checks:[
      mc("Which is a benefit of cloud storage?", "Files can be accessed from any computer with internet access", ["It works without an internet connection", "It is always free", "The user controls all back-ups"], "Anywhere access is a main benefit."),
      mc("Which is a drawback of cloud storage?", "Access depends on an internet connection", ["No data can be shared", "Files cannot be edited", "It needs a printer"], "Without the internet you cannot reach the cloud."),
      mc("Why might cloud storage be more expensive in the long term?", "Extra storage capacity has to be paid for", ["Servers use no electricity", "It needs more cables", "It has no back-up"], "Providers usually charge for storage over a free limit."),
      tx("Give two drawbacks of using cloud computing. [2]", [["internet connection","internet access","needs internet","without internet","requires internet","wifi","online"],["long time","slow","upload","download","backup","back-up","third party","downtime","security","expensive","cost","compatib","limited storage","pay"]], 2, "For example: it can only be accessed with an internet connection; uploading / downloading can take a long time; possible issues with the cloud company; possible security concerns; limited storage without paying extra."),
      ASA.pp("9618/12 October/November 2025 · Question 8(a)", "Benefits: access anywhere, no personal storage devices, back-up included, easier sharing, easily increased capacity. Drawbacks: needs internet, back-up control, slow uploads, provider downtime, cost, security.",
        [ ASA.text("(a)(i)", 2, "A restaurant accesses software and stores data using cloud computing. Give two benefits of storing data using cloud computing.",
            [ ["Cloud storage can be free of charge for a limited amount", ["free"]], ["There is no need for personal storage devices", ["no need for", "personal storage", "storage devices", "own storage", "local storage", "doesn't take up space", "less storage on", "saves space", "does not take up"]], ["The data can be accessed from any computer with an internet connection", ["any computer", "anywhere", "any device", "from any", "remotely", "access from", "any location", "accessible", "wherever"]], ["Cloud data services usually include data backup and recovery services", ["backup", "back up", "back-up", "recovery", "recover"]], ["It is easier to share data / collaborate with colleagues", ["share", "collaborat"]], ["Cloud storage capacity can be quickly and easily increased if needed", ["capacity", "increase", "scalab", "more storage", "expand", "easily"]] ],
            { lead: "1 mark per bullet point, maximum 2 marks:", lines: 3 }),
          ASA.text("(a)(ii)", 2, "Give two drawbacks of using cloud computing.",
            [ ["The storage / cloud can only be accessed with an internet connection", ["internet connection", "internet access", "needs internet", "without internet", "no internet", "requires internet", "wifi", "online", "connection"]], ["There may be no backups // possibly no control over backups // reliance on third party for backups", ["backup", "back up", "back-up", "third party", "no control", "rely on", "reliance", "reliant"]], ["Uploading / downloading data could take a long time", ["long time", "slow", "takes time", "time to upload", "time to download", "upload", "download"]], ["Potential issues with the cloud storage company impacting access, e.g. downtime or technical problems", ["downtime", "technical problem", "server down", "company goes", "outage", "provider", "technical issue", "fault"]], ["Potential compatibility issues if wanting to move the data", ["compatib", "move the data", "move data", "switch provider", "transfer to another"]], ["Limited storage availability without paying extra ... meaning (possibly) more expensive in the long term", ["pay", "expensive", "cost", "subscription", "charge", "limited storage", "fee"]], ["Possibly security issues", ["secur", "hack", "breach", "privacy", "stolen", "confidential"]] ],
            { lead: "1 mark per bullet point, maximum 2 marks:", lines: 3 }) ])
    ] },

  { id:"2.1.5a", code:"2.1.5", title:"Wired and wireless networks and the hardware that supports them",
    concept:
      "<p>A LAN can connect devices by <b>cables</b> (wired, usually Ethernet) or by <b>radio waves</b> (wireless, Wi-Fi).</p>" +
      tbl(["", "Wired", "Wireless"], [["Speed and reliability", "usually <b>faster and more reliable</b>; less interference", "can be slower; <b>interference</b> from walls and other devices"], ["Security", "<b>more secure</b>: a hacker needs physical access to a cable (private data stays safer)", "signals can be picked up by others, so need encryption and passwords"], ["Mobility", "devices are tied to a cable and a socket", "devices can be used in <b>different rooms, outside, anywhere</b> in range; easy to add and change devices"], ["Cost", "cables and installation", "no cabling, but needs access points"]]) +
      "<h4>Supporting hardware</h4>" +
      "<ul><li><b>Network interface card (NIC)</b>: gives a device its connection (wired or wireless).</li><li><b>Switch</b> / <b>router</b>: joins devices and networks.</li><li><b>Wireless access point (WAP)</b>: lets wireless devices join the wired network.</li><li><b>Cables</b>: twisted pair (copper) or fibre optic.</li></ul>",
    example:
      "<p><b>A university lets students use both.</b> A student with a laptop that has only a Wi-Fi card needs wireless. A student handing in a confidential dissertation or downloading a huge database can plug in by cable for speed and security. Wireless lets them work in the library, a lecture hall or the garden, and bring several devices.</p>" +
      "<p>'Explain the benefits' means: <b>state the benefit and expand it</b> ('wired is faster, so large files download quickly').</p>",
    checks:[
      mc("Which connection is usually more secure and has less interference?", "Wired", ["Wireless", "Both are always the same", "Neither"], "Cables are harder to intercept and have less interference."),
      mc("Which device lets wireless computers join a wired LAN?", "A wireless access point", ["A monitor", "A hard drive", "A scanner"], "The WAP links wireless devices to the wired network."),
      mc("Which is a benefit of a wireless network?", "Devices can be used anywhere within range", ["It is always faster than a cable", "It needs no password", "It cannot be intercepted"], "Mobility is the main benefit."),
      tx("Give one drawback of a wireless connection compared with a wired connection. [1]", [["interference","slower","slow","less secure","security","intercept","range","weaker signal","unreliable","signal"]], 1, "Wireless can suffer interference, may be slower or less reliable, has a limited range and is easier to intercept."),
      ASA.pp("9618/13 May/June 2023 · Question 2(d)", "Four marks means four developed points: say the benefit AND explain it. Consider both the wired benefits (speed, less interference, security) and the wireless benefits (mobility, many devices).",
        [ ASA.text("(d)", 4, "Students can connect their devices to the university network using cables or a wireless connection. Explain the benefits to the students of allowing them to use both wired and wireless connections.",
            [ ["Some students might only have one sort of connection on their device", ["only have one", "only one sort", "only one type", "no cable port", "no ethernet", "no wireless", "not all devices", "some devices", "does not have", "doesn't have", "might not have", "different devices"]], ["Wired provides better performance for the student's device ... for example, enabling faster access to university databases", ["wired", ["faster", "better performance", "better speed", "higher speed", "quicker", "more reliable", "stable"]]], ["There will be less interference if students connect via a cable", ["interference"]], ["Students can transmit private / confidential data / work securely, for example their final dissertation", ["secur", "private", "confidential", "dissertation", "hack", "protect"]], ["Wireless means students can use their devices in different rooms / sites / outside / anywhere more freely // portable", ["different rooms", "anywhere", "outside", "move around", "portab", "freely", "mobile", "mobility", "any room", "different locations", "move about", "walk around"]], ["Wireless enables students to bring multiple devices // their own devices // change devices", ["multiple devices", "own devices", "bring", "more devices", "several devices", "change devices", "different devices", "many devices"]] ],
            { lead: "1 mark each to a maximum of 4:", lines: 7 }) ])
    ] },

  { id:"2.1.6a", code:"2.1.6", title:"The roles of the switch and the router",
    concept:
      "<p>Two devices move packets around a network, but they do different jobs.</p>" +
      tbl(["", "Switch", "Router"], [
        ["Connects", "devices <b>inside one LAN</b> (the central point of a star network)", "<b>different networks</b> (for example a LAN to the internet)"],
        ["Address used", "<b>MAC address</b> of each device: it stores them in a table", "<b>IP address</b>: it reads the destination IP address of each packet"],
        ["What it does", "receives packets, checks the destination, forwards them <b>directly to the intended recipient only</b>", "uses a <b>routing table</b> to find the best route and forwards the packet towards its destination; updates the table; may also give out private IP addresses on the LAN"],
        ["Home / office", "inside the office", "the box that connects the office to the internet service provider"]]) +
      "<p>A router often has <b>two IP addresses</b>: a <b>public</b> one that faces the internet, and a <b>private</b> one that identifies it to the devices inside the LAN.</p>",
    example:
      "<p>Laptop A sends a document to the printer in the same office: the <b>switch</b> reads the MAC address, and sends the frames only to the printer port. Laptop A then opens a web page: the request goes to the <b>router</b>, which reads the destination IP address, finds a route in its routing table and forwards the packets to the ISP.</p>",
    checks:[
      mc("Which device connects two different networks, such as a LAN and the internet?", "A router", ["A switch", "A NIC", "A repeater cable"], "Routers join networks."),
      mc("Which address does a switch use to forward frames inside a LAN?", "MAC address", ["URL", "Email address", "Domain name"], "Switches store the MAC addresses of the devices connected to them."),
      mc("What does a router consult to decide where to send a packet?", "Its routing table", ["Its hard disk", "A DNS cache only", "The CPU registers"], "The routing table holds the best routes."),
      tx("Describe the role of a switch in a network. [3]", [["mac","address"],["receive","receives","packets","frames"],["forward","sends","directly","intended","only to","recipient","destination"],["central","connection point","connect devices","connects the devices","communicat"]], 3, "To store the MAC addresses of connected devices, to receive packets, to forward them directly to the intended recipient, and to provide a central point of connection."),
      ASA.pp("9618/12 May/June 2025 · Question 6(e)", "Switch: central connection point, stores MAC addresses, receives packets, forwards them only to the intended recipient.",
        [ ASA.text("(e)", 3, "Describe the role of a switch in a network.",
            [ ["To store the MAC addresses of devices connected to it", ["mac address", "mac table", "addresses of the devices", "addresses of devices", "stores the address", "address table"]], ["To receive packets from devices", ["receive", "receives", "accepts", "gets packets", "takes in"]], ["To forward packets directly to the intended recipient", ["forward", "intended", "recipient", "destination", "only to", "directly to", "sends the packet"]], ["To provide a central point of connection for the network", ["central", "connection point", "central point", "hub of", "connects all"]], ["To enable connected devices to communicate", ["communicat", "connect devices", "connects devices", "connect the devices", "connects the devices", "link devices", "joins devices"]] ],
            { lead: "1 mark each to a maximum of 3:", lines: 5 }) ])
    ] },

  { id:"2.1.6b", code:"2.1.6", title:"Ethernet and CSMA/CD",
    concept:
      "<p><b>Ethernet</b> is a <b>protocol (suite)</b> for sending data over standard wired networks. Data is sent in <b>frames</b>; each frame has a <b>source and destination address</b> and <b>error-checking data</b>, so a damaged frame can be resent.</p>" +
      "<p>When devices share a cable, two may transmit at once and cause a <b>collision</b>. <b>CSMA/CD</b> (Carrier Sense Multiple Access with Collision Detection) is the method used to manage this:</p>" +
      "<ol><li><b>Carrier sense:</b> the device listens to the channel.</li><li>If the channel is idle it <b>sends</b>; if not, it waits.</li><li>While sending it checks for a <b>collision</b>.</li><li>On a collision it sends a <b>jamming signal</b> and <b>aborts</b> the transmission.</li><li>It waits a <b>random time</b> (back-off) and tries again. After more collisions, the random time is <b>increased</b>.</li></ol>" +
      "<h4>Drawbacks of CSMA/CD</h4>" +
      "<ul><li>Waiting times can keep growing, so there is no guarantee of a time to send.</li><li>Constant jamming can mean nothing gets sent on a busy network.</li><li>Certain nodes cannot be given priority.</li><li>Only suits short distances and few nodes; not scalable (more nodes mean much longer waits).</li><li>High power consumption.</li></ul>",
    example:
      "<p>Two computers on a bus both sense an idle line and send at the same moment. Both detect the collision, both send a jam signal and stop. Computer A picks a random wait of 3 ms and computer B picks 7 ms, so A resends first and B follows. If they collide again, the random range doubles.</p>" +
      "<p><b>Why random?</b> If both waited the same fixed time they would collide again every time.</p>",
    checks:[
      mc("What does CSMA/CD do when it detects a collision?", "Aborts the transmission and sends a jamming signal", ["Sends the data twice", "Deletes the frame and tells the user", "Switches to a star topology"], "A jamming signal is sent, the transmission is aborted, and the device waits a random time."),
      mc("Why does each device wait a random time before resending?", "So the devices do not collide again at the same moment", ["To save electricity", "To encrypt the data", "To increase the signal"], "Different random waits stop another collision."),
      mc("What does an Ethernet frame contain?", "Source and destination addresses and error-checking data", ["Only the data", "The user's password", "A domain name"], "Frames carry addresses and an error check."),
      tx("Identify one drawback of using CSMA/CD. [1]", [["infinite","never","keeps increasing","longer","delay","jam","nothing sends","priorit","power","short distance","limited distance","not scalable","more nodes","slow"]], 1, "For example: random time can increase without limit; constant jamming may stop anything being sent; nodes cannot be prioritised; high power consumption; only suitable for short distances; not scalable."),
      ASA.pp("9618/13 May/June 2024 · Question 5(c)", "Management of a collision: jamming signal, abort, random wait, and longer waits for repeated collisions. Drawbacks: waiting time can grow, constant jamming, no priority, power, short distance, not scalable.",
        [ ASA.text("(c)(i)", 2, "A collision is detected. Describe how the collision is managed using Carrier Sense Multiple Access/Collision Detection (CSMA/CD).",
            [ ["Jamming signal is transmitted by the sending device", ["jam"]], ["Transmission is aborted", ["abort", "stop", "cancel", "halt"]], ["The sending device waits a random time before trying to send data again", ["random"]], ["... if further collisions occur the wait time is increased", ["increase", "longer", "doubl", "further collision", "more collision", "another collision", "multiple collision"]] ],
            { lead: "1 mark each to a maximum of 2:", lines: 4 }),
          ASA.text("(c)(ii)", 2, "Identify two drawbacks of using CSMA/CD.",
            [ ["Random time increased each time so can be infinite waiting", ["infinite", "never", "increases each", "keeps increasing", "wait forever", "waiting time", "longer and longer", "delay"]], ["May be constant jamming signal so nothing ever sends", ["constant jam", "jamming", "nothing", "never send", "keeps jamming"]], ["Certain nodes cannot be prioritised", ["priorit"]], ["High power consumption", ["power", "energy", "electricity"]], ["Only suitable for short distance network // limited distance", ["short distance", "limited distance", "short range", "small network", "distance"]], ["Not scalable // more nodes means exponentially longer waiting times", ["scal", "more nodes", "more devices", "more computers", "larger network", "bigger network", "exponential", "slow"]] ],
            { lead: "1 mark each to a maximum of 2:", lines: 3 }) ])
    ] },

  { id:"2.1.7a", code:"2.1.7", title:"Bit streaming, and the WWW compared with the internet",
    concept:
      "<p><b>Bit streaming</b> sends video or audio as a <b>continuous stream of bits</b>, so it can be played <b>while it is still arriving</b>, without waiting for the whole file. There are two forms: <b>on demand</b> (a stored film played when you ask) and <b>real time</b> (a live video conference).</p>" +
      "<ol><li>The data is <b>compressed</b> (so it can be sent quickly).</li><li>It is uploaded to a <b>media server</b>.</li><li>The server sends the bits continuously; the receiver stores them in a <b>buffer</b>.</li><li>The buffer <b>holds the data until the receiving device can process it</b>, so the playback does not stutter.</li></ol>" +
      "<h4>The internet and the World Wide Web are not the same</h4>" +
      tbl(["", "The internet", "The World Wide Web (WWW)"], [["What it is", "the <b>global network of networks</b>: the infrastructure of cables, routers, servers", "a <b>collection of web pages and resources</b> held on web servers, linked by hyperlinks"], ["How you use it", "carries email, streaming, file transfer, the web, games", "viewed in a <b>web browser</b> using HTTP / HTTPS and URLs"]]) +
      "<p>The web is one <b>service that runs on</b> the internet.</p>",
    example:
      "<p>In a <b>video conference</b>, your camera and microphone data is compressed, sent as a continuous stream of bits, and the other person's device buffers it and plays it back almost straight away.</p>" +
      "<p><b>Why the buffer?</b> The network speed varies. The buffer collects bits ahead of time so that a short slowdown does not stop the picture.</p>",
    checks:[
      mc("What is stored temporarily in a buffer during bit streaming?", "The incoming data until the device can process it", ["The user's password", "The whole film permanently", "The IP address"], "The buffer smooths out changes in the speed of arrival."),
      mc("Which statement is correct?", "The WWW is one service that runs on the internet", ["The internet and the WWW are the same thing", "The WWW is the hardware of the internet", "The internet is a type of web page"], "The internet is the infrastructure; the WWW is the collection of web pages."),
      mc("Why is data compressed before it is streamed?", "So it can be transmitted more quickly", ["So it cannot be copied", "So it uses more bandwidth", "So it is in colour"], "Smaller data needs less bandwidth."),
      tx("State the difference between the internet and the World Wide Web. [2]", [["internet","network of networks","infrastructure","global network"],["web pages","www","world wide web","browser","websites","resources","collection of"]], 2, "The internet is the global network of networks (the infrastructure); the WWW is a collection of web pages / resources accessed with a browser over the internet."),
      ASA.pp("9618/13 October/November 2024 · Question 9(c)", "Bit streaming: compressed, continuous bits, media server, buffer holds the data until the receiver can process it, receiver reads from the buffer.",
        [ ASA.text("(c)", 4, "The computer is used for real-time video conferences, where people connected to the internet communicate in real-time using video and audio. Explain how bit streaming is used in a real-time video conference.",
            [ ["Data is compressed before transmitting", ["compress"]], ["The video and audio are transmitted continuously as a series of bits", ["continuous", "series of bits", "stream of bits", "bits are sent", "constant", "ongoing", "one after another", "sequence of bits"]], ["The video is uploaded to a media server", ["media server", "server"]], ["On download, the media server sends the data to a buffer", ["buffer"], ["server", "sends", "sent", "download"]], ["The buffer stores data from the server until the receiving device can process it", ["stores", "holds", "temporar", "until the", "waits", "queue"], ["buffer"]], ["The receiving device receives the bit stream from the buffer", ["receiving device", "receiver", "device receives", "played", "plays", "displayed", "processes the"], ["buffer"]] ],
            { lead: "1 mark for each bullet point, maximum 4:", lines: 6 }) ])
    ] },

  { id:"2.1.7b", code:"2.1.7", title:"How data crosses the internet: routers and the PSTN",
    concept:
      "<p>Data sent across the internet passes through <b>many different systems</b>. Two important ones:</p>" +
      "<h4>Routers</h4>" +
      "<ul><li>Receive packets from the internet.</li><li>Analyse the <b>destination IP address</b> of each packet.</li><li>Forward it towards its destination <b>using the routing table</b>; they find the most efficient route and keep the table up to date.</li></ul>" +
      "<h4>The PSTN (Public Switched Telephone Network)</h4>" +
      "<ul><li>The original worldwide telephone network, made up of <b>many different kinds of communication line</b> (copper, fibre, microwave).</li><li>Because the lines differ, the <b>digital data may need to be converted</b> into another form (such as an analogue signal) for part of its journey.</li><li>Data travels in <b>both directions at the same time</b> (duplex).</li><li>The communication passes through different <b>switching centres / ISPs</b>.</li></ul>" +
      "<p>Other internet hardware: <b>ISP (internet service provider)</b> servers, <b>modems</b>, fibre cables and <b>cell towers</b>.</p>",
    example:
      "<p>You send an email from Riyadh to a friend in London. Your router passes the packets to your ISP. Routers along the way each read the IP address and choose the next best link. Some of the journey may use telephone lines of the PSTN; there the data may be converted to a different form and passes through switching centres until it reaches the destination.</p>",
    checks:[
      mc("What does a router read to decide where to send a packet?", "The destination IP address", ["The user's name", "The file extension", "The colour depth"], "Routers use destination IP addresses and a routing table."),
      mc("What does PSTN stand for?", "Public Switched Telephone Network", ["Private Secure Transmission Network", "Packet Switched Transfer Node", "Public Server Terminal Network"], "It is the telephone network."),
      mc("Why might digital data need to be converted when it passes through the PSTN?", "The lines are of many different types, some carrying analogue signals", ["Because it is too short", "Because routers cannot read bits", "Because it is encrypted"], "Different line types need different signal forms."),
      tx("Describe the role of routers in the transmission of data through the internet. [2]", [["destination","ip address","address"],["forward","next","towards","routing table","best route","most efficient route","path"]], 2, "Routers receive packets, analyse the destination IP address and forward the packet towards its destination using the routing table."),
      ASA.pp("9618/12 May/June 2024 · Question 3(c)", "Routers: read the destination IP address, forward using the routing table, find the best route. PSTN: many different types of line (so conversion may be needed), duplex, passes through switching centres / ISPs.",
        [ ASA.text("(c)(i)", 2, "Data transmitted on the internet passes through multiple different systems. Describe the role of routers in the transmission of data through the internet.",
            [ ["Receives packets from the internet", ["receives", "receive", "accepts", "takes in"]], ["Analyses the destination IP address of each packet", ["destination", "ip address", "address"]], ["Forwards the packet towards its destination ... using the routing table", ["forward", "sends the packet", "passes the packet", "towards", "next", "routing table"]], ["Maintains / updates the routing table", ["updates", "maintains", "keeps the routing table"]], ["Finds the most efficient route to the destination", ["efficient", "best route", "quickest route", "shortest", "fastest route", "optimal"]] ],
            { lead: "1 mark each to a maximum of 2:", lines: 3 }),
          ASA.text("(c)(ii)", 2, "Describe the role of the PSTN (Public Switched Telephone Network) in the transmission of data through the internet.",
            [ ["The PSTN consists of many different types of communication line", ["different types", "many types", "different lines", "various", "many different", "variety"]], ["... therefore the digital data may need to be converted into a different form / analogue signal", ["convert", "analogue", "analog", "modem", "different form"]], ["Data is transmitted in both directions at the same time // duplex data transmission", ["both directions", "duplex", "same time", "two way", "two-way", "bidirectional", "bi-directional"]], ["Using a PSTN the communication passes through different switching centres / ISPs", ["switching centre", "switching center", "exchange", "isp", "switches", "different centres"]] ],
            { lead: "1 mark each to a maximum of 2:", lines: 3 }) ])
    ] },

  { id:"2.1.8a", code:"2.1.8", title:"IP addresses: IPv4, IPv6, static, dynamic, public and private",
    concept:
      "<p>An <b>IP address</b> identifies a device on a network.</p>" +
      tbl(["", "IPv4", "IPv6"], [["Length", "<b>32 bits</b>", "<b>128 bits</b>"], ["Written as", "four groups (bytes) of denary numbers 0&ndash;255 separated by <b>full stops</b> (dots): <code>192.168.3.2</code>", "eight groups of four <b>hexadecimal</b> digits separated by <b>colons</b>: <code>2001:0db8:0000:0000:0000:ff00:0042:8329</code>"], ["Shortening", "&ndash;", "consecutive groups of <b>zeros</b> can be replaced by a double colon <code>::</code>: <code>2001:db8::ff00:42:8329</code>"], ["Why", "about 4.3 billion addresses: not enough for every device", "so many addresses that every device can have its own"]]) +
      tbl(["Type", "Meaning"], [["Public IP address", "assigned to a device to allow <b>direct access on the internet</b>; unique on the internet"], ["Private IP address", "used for <b>internal LAN communication only</b>; can only be seen/used inside the LAN; assigned by the router"], ["Static IP address", "<b>fixed</b>: does not change each time the device re-joins a network (needed by web servers)"], ["Dynamic IP address", "<b>refreshed / changed</b> each time the device joins the network (assigned automatically)"]]),
    example:
      "<p><b>192.168.3.2 is not an IPv6 address</b> because it has only four groups of digits (IPv6 has eight), uses dots instead of colons, and is a 32-bit address (IPv6 is 128-bit).</p>" +
      "<p>The office printer has a <b>static private</b> address (never changes, only visible inside the LAN). Your phone at a caf&eacute; gets a <b>dynamic</b> address that changes next time.</p>",
    checks:[
      mc("How many bits are in an IPv6 address?", "128", ["32", "64", "256"], "IPv6 = 128 bits; IPv4 = 32 bits."),
      mc("In which number system are IPv6 groups written?", "Hexadecimal", ["Binary", "Denary", "BCD"], "Groups of four hex digits separated by colons."),
      mc("What is a private IP address?", "One used only inside a LAN", ["One used on the whole internet", "One that never changes", "One that is encrypted"], "Private addresses are only visible within the LAN."),
      tx("State what is meant by a static private IP address. [1]", [["does not change","doesn't change","fixed","never change","stays the same","permanent","constant"],["lan","local","within","only","internal","network"]], 2, "Static means the IP for that device does not change and private means it can only be accessed / seen / used within the LAN."),
      ASA.pp("9618/12 May/June 2025 · Question 6(c)", "Know the IPv4 / IPv6 facts: full stops, hexadecimal, zeros, 128, dynamic, private.",
        [ ASA.fields("(c)", 6, "Complete the following description of IP addresses by writing the missing words.<br>IPv4 is displayed as four groups of 8-bit numbers separated by <b>(1)</b>. Each IPv4 address is 32 bits.<br>IPv6 is made of eight groups of 4 <b>(2)</b> numbers separated by colons.<br>Multiple consecutive groups of <b>(3)</b> can be replaced with a double colon.<br>Each IPv6 address is <b>(4)</b> bits.<br>A <b>(5)</b> IP address can change each time the computer connects to a network.<br>A <b>(6)</b> IP address can only be accessed by other devices in the same LAN and is assigned by the router within the LAN.",
            [["(1)", ["full stops", "full stop", "dots", "dot", "periods", "period", "decimal points"], "text", "full stops"], ["(2)", ["hexadecimal", "hex"], "text", "hexadecimal"], ["(3)", ["zeros", "zeroes", "0s", "0"], "text", "zeros"], ["(4)", ["128"], "text", "128"], ["(5)", ["dynamic"], "text", "dynamic"], ["(6)", ["private"], "text", "private"]],
            { lead: "1 mark for each correct word:" }) ])
    ] },

  { id:"2.1.8b", code:"2.1.8", title:"Subnetting and the router's public and private addresses",
    concept:
      "<p><b>Subnetting</b> divides one network into smaller <b>sub-networks (subnets)</b>. An IP address in a subnetwork is divided into two parts:</p>" +
      tbl(["Part", "Meaning"], [["Network ID", "identifies the <b>subnet</b>: every device in the same subnetwork has the <b>same network ID</b>"], ["Host ID", "identifies the <b>device</b> within the subnet: <b>unique</b> within the subnetwork"]]) +
      "<h4>Why subnet?</h4>" +
      "<ul><li><b>Less traffic / congestion:</b> data between devices on the same subnet stays within it, and devices are not flooded with data.</li><li><b>Security:</b> devices do not receive unintended data and a compromised device does not expose the whole network.</li><li><b>Easier management:</b> faults can be isolated, and the network can be expanded in a controlled way; it hides the complexity of the network.</li></ul>" +
      "<h4>A router with two addresses</h4>" +
      "<p>The router's <b>public IP address</b> makes it visible to the internet / external network (WAN). Its <b>private IP address</b> identifies it to the computers inside the LAN.</p>",
    example:
      "<p>A school splits its network into a <b>Staff</b> subnet and a <b>Students</b> subnet. A student laptop cannot reach the staff file server directly, and the heavy traffic of a student download does not slow the staff network.</p>" +
      "<p>The address <code>192.168.1.25</code> in the subnet <code>192.168.1.x</code>: the network ID is the first part (192.168.1) and the host ID is the device (25).</p>",
    checks:[
      mc("Which part of an IP address is the same for every device on a subnet?", "The network ID", ["The host ID", "The checksum", "The file name"], "All devices in the same subnet share the network ID."),
      mc("What does the host ID identify?", "A single device within the subnet", ["The whole network", "The router's public address", "The ISP"], "The host ID is unique within the subnetwork."),
      mc("Why does the router have a public IP address?", "So that it is visible to the internet", ["So the LAN can print", "So it can use IPv4", "So it never changes"], "The public address faces the external network; the private address faces the LAN."),
      tx("Describe the purpose of subnetting in a network. [2]", [["smaller","divide","split","segment","sub-network","subnet","separate"],["traffic","congestion","security","secure","management","manage","fault","performance","expand","complexity"]], 2, "It allows the network to be divided into smaller networks, which reduces traffic / congestion (traffic only travels through the parts necessary), hides the complexity and allows easier maintenance."),
      ASA.pp("9618/13 October/November 2024 · Question 9(d)", "Public IP: router visible to the internet. Private IP: router identified to computers in the LAN. Subnetting: smaller networks, less traffic and congestion, easier maintenance.",
        [ ASA.text("(d)(i)", 2, "The LAN has a router. The router has a public IP address and a private IP address. State the purpose of a public IP address and a private IP address.",
            [ ["Public IP address: so that the router is visible to the internet / external network / WAN", ["internet", "external", "wan", "outside", "visible"], ["public"]], ["Private IP address: so that the router is identified to computers within the LAN", ["lan", "within", "inside", "internal", "local", "identified to"], ["private"]] ],
            { lead: "1 mark for the public IP address and 1 mark for the private IP address:", lines: 4 }),
          ASA.text("(d)(ii)", 2, "The LAN uses subnetting. Describe the purpose of subnetting in a network.",
            [ ["It allows the network to be divided into smaller networks", ["smaller network", "divide", "split", "segment", "sub-network", "subnetwork", "smaller parts", "smaller sections"]], ["... which reduces traffic / congestion because traffic only travels through the parts necessary", ["traffic", "congestion", "less data", "bandwidth"]], ["... which hides the complexity of the network", ["hides", "complexity", "simplif"]], ["... and allows for easier maintenance of the network", ["maintenance", "maintain", "manage", "easier to fix", "isolate", "fault"]] ],
            { lead: "1 mark for each bullet point, maximum 2:", lines: 4 }) ])
    ] },

  { id:"2.1.9a", code:"2.1.9", title:"URLs and the Domain Name System (DNS)",
    nopp: "No question on this objective appears in the 2023 to 2026 past papers you were given, so this lesson has practice questions only.",
    concept:
      "<p>A <b>URL (uniform resource locator)</b> is the web address used to find a resource on the web.</p>" +
      pre("https://www.example.com/shop/index.html\n\\___/   \\_____________/ \\_____________/\nprotocol  domain name        path and file") +
      "<ul><li><b>Protocol:</b> the rules used (<code>http</code> or secure <code>https</code>).</li><li><b>Domain name:</b> the name of the web server (<code>www.example.com</code>).</li><li><b>Path / file:</b> which page or file on the server.</li></ul>" +
      "<p>Computers find each other with <b>IP addresses</b>, not names. The <b>Domain Name Service (DNS)</b> is the system that <b>converts a domain name into the IP address</b> of the web server, like a phone book.</p>" +
      "<ol><li>You type <code>www.example.com</code> into the browser.</li><li>The browser asks a <b>DNS server</b> for the IP address.</li><li>If the DNS server does not know it, it asks other DNS servers up the chain until the address is found.</li><li>The IP address is returned to the browser.</li><li>The browser sends a request to that IP address; the <b>web server</b> sends the page back.</li></ol>",
    example:
      "<p>Typing <code>https://www.bbc.co.uk/news</code>: protocol <b>https</b>, domain <b>www.bbc.co.uk</b>, path <b>/news</b>. DNS turns <code>www.bbc.co.uk</code> into an address such as <code>151.101.x.x</code> (illustrative only). Without DNS you would have to remember numbers instead of names.</p>" +
      "<p><b>Exam habit:</b> a URL <i>locates</i> a resource; DNS <i>translates</i> the domain name into an IP address. Do not mix up the two.</p>",
    checks:[
      mc("What does DNS do?", "Converts a domain name into an IP address", ["Encrypts the web page", "Compresses the web page", "Stores cookies"], "DNS translates names to IP addresses."),
      mc("In the URL https://www.school.org/maths/a.html, what is the domain name?", "www.school.org", ["https", "/maths/a.html", "a.html"], "The domain name identifies the web server."),
      mc("What does the 'https' part of a URL show?", "The protocol used (a secure one)", ["The file name", "The IP address", "The server's size"], "https is the protocol (HTTP with security)."),
      tx("Describe the purpose of the Domain Name Service (DNS). [2]", [["domain name","url","web address","website name"],["ip address","converts","translates","looks up","finds the ip"]], 2, "The DNS converts (looks up) a domain name / URL into the IP address of the web server so that the browser can request the page."),
      tx("Describe the three parts of the URL https://www.example.com/shop/index.html. [3]", [["https","http","protocol"],["www.example.com","domain","server name","web server"],["shop","index.html","path","file","page"]], 3, "https is the protocol; www.example.com is the domain name (the web server); /shop/index.html is the path and file name of the page.")
    ] }

  ]);
})(typeof window !== "undefined" ? window : this);
