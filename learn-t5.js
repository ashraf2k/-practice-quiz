/* iLearn topic 5: The internet and its uses (Cambridge IGCSE Computer Science 0478) */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx;
  var LESSONS = [

  // ---------- 5.1 The internet and the world wide web ----------
  { id:"5.1.1", code:"5.1.1", title:"The internet and the world wide web",
    concept:
      "<p>People often use these two words as if they mean the same thing. They do not.</p>" +
      "<ul><li>The <b>internet</b> is the <b>infrastructure</b>: the huge worldwide network of computers, cables and other hardware that connects devices together. It is a <b>wide area network (WAN)</b> that covers the whole world.</li>" +
      "<li>The <b>world wide web (WWW)</b> is the <b>collection of websites and web pages</b> that can be reached using the internet. It is accessed with a web browser.</li></ul>" +
      "<p>So the web is something that <b>runs on</b> the internet. Email and online games also use the internet but are not part of the web.</p>",
    example:
      "<table class='ln-table'><tr><th>Internet</th><th>World wide web</th></tr><tr><td>The roads, bridges and junctions</td><td>The shops and buildings you can visit using the roads</td></tr><tr><td>Hardware and cables</td><td>Web pages written in HTML</td></tr></table>",
    checks:[
      mc("What is the internet?", "The worldwide infrastructure that connects networks and devices", ["The collection of all the websites and web pages","A program that is used to view websites","A search engine such as the ones used to look for pages"], "The internet is the infrastructure. The web pages that are available through it are the world wide web."),
      mc("Which of these is part of the world wide web?", "A web page", ["An ethernet cable","A router","A modem"], "Web pages and websites form the world wide web. Cables and routers are part of the internet infrastructure.")
    ] },

  { id:"5.1.2", code:"5.1.2", title:"Uniform resource locators (URLs)",
    concept:
      "<p>A <b>URL</b> (uniform resource locator) is the <b>text-based address</b> of a web page. You type it into the address bar of a web browser.</p>" +
      "<p>A URL has three main parts:</p>" +
      "<table class='ln-table'><tr><th>Protocol</th><th>Domain name</th><th>Web page / file name</th></tr><tr><td><code>https://</code></td><td><code>www.cambridge.org</code></td><td><code>/education</code></td></tr></table>" +
      "<ul><li><b>Protocol</b>: the rules used to transfer the data (HTTP or HTTPS).</li><li><b>Domain name</b>: the name of the website's server; it is turned into an IP address by a DNS.</li><li><b>Web page name</b> (file name): the page wanted on that website.</li></ul>",
    example:
      "<p>URL: <code>https://www.bbc.co.uk/news/technology</code></p>" +
      "<ul><li>Protocol: <code>https</code></li><li>Domain name: <code>www.bbc.co.uk</code></li><li>Web page: <code>/news/technology</code></li></ul>",
    checks:[
      mc("Which part of the URL <code>https://www.example.com/shop.html</code> is the web page name?", "/shop.html", ["https","www.example.com","://"], "The last part, after the domain name, identifies the page or file."),
      mc("What is a URL?", "The text-based address of a web page", ["The numerical address of a device","A type of web browser","The program that translates domain names"], "A URL is the text address typed into a browser. The numeric address is the IP address.")
    ] },

  { id:"5.1.3", code:"5.1.3", title:"HTTP and HTTPS",
    concept:
      "<p>A <b>protocol</b> is a set of rules for transferring data. Web browsers and web servers use <b>HTTP</b> (hypertext transfer protocol) to request and send web pages. HTTP data is <b>not encrypted</b>.</p>" +
      "<p><b>HTTPS</b> (HTTP secure) is HTTP with an extra layer of security, <b>SSL/TLS</b>, which <b>encrypts</b> the data. It uses a <b>digital certificate</b> from a certificate authority:</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>The browser asks the web server for its digital certificate.</li><li>The server sends a copy.</li><li>The browser checks that the certificate is authentic.</li><li>If it is, the data transmitted between them is <b>encrypted</b>. If it is not, the browser reports that the site is not secure.</li></ol>" +
      "<p>You can see HTTPS in the URL and as a <b>padlock</b> in the address bar.</p>",
    example:
      "<p>When you log in to an online bank, the URL starts with <code>https://</code> and a padlock appears. Your password is encrypted. If you sent it using plain <code>http://</code>, someone intercepting the data could read it.</p>",
    checks:[
      mc("What is the main difference between HTTP and HTTPS?", "HTTPS encrypts the data that is sent", ["HTTPS is faster than HTTP","HTTP can only send images","HTTPS does not use a web server"], "HTTPS adds SSL/TLS, which encrypts the data."),
      tx("Describe how a web browser uses a digital certificate when HTTPS is used.", [["request","asks","ask"],["certificate"],["send","sends","provides"],["authentic","check","genuine","valid","trust"],["encrypt","secure"]], 4, "The browser asks the web server for its digital certificate and the server sends a copy. The browser checks that the certificate is authentic. If it is, the data sent between them is encrypted; if not, the browser reports that the website is not secure.")
    ] },

  { id:"5.1.4", code:"5.1.4", title:"What a web browser does",
    concept:
      "<p>A <b>web browser</b> is software that lets you access the world wide web. Its main purpose is to <b>request web pages and render</b> (display) the HTML, CSS and any active script. A browser is <b>not</b> a search engine.</p>" +
      "<p>Other functions of a browser:</p>" +
      "<ul><li>provides an <b>address bar</b> to type in a URL,</li><li>records the <b>user history</b> (pages visited),</li><li>lets you <b>bookmark</b> pages (favourites),</li><li>lets you open <b>multiple tabs</b>,</li><li>lets you <b>navigate</b> with forward, back and reload buttons,</li><li><b>stores cookies</b> and manages sending them.</li></ul>",
    example:
      "<p><b>Chrome</b>, <b>Firefox</b> and <b>Edge</b> are browsers. <b>Google Search</b> is a search engine: it is a website you open <i>using</i> a browser.</p>",
    checks:[
      mc("What is the main purpose of a web browser?", "To render web pages so they can be viewed", ["To find the IP address of a domain","To store web pages on a server","To encrypt data on a network"], "A browser requests and renders web pages for the user."),
      mc("Which of these is a function of a web browser?", "Storing the user history", ["Converting domain names to IP addresses","Hosting a website","Assigning IP addresses to devices"], "Browsers keep a history, bookmarks, tabs and cookies. A DNS finds IP addresses.")
    ] },

  { id:"5.1.5", code:"5.1.5", title:"How a web page is located, retrieved and displayed",
    concept:
      "<p>When you type a URL, this happens:</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>The browser sends the <b>URL</b> (domain name) to a <b>domain name server (DNS)</b>.</li><li>The DNS searches its database for the domain name and returns the matching <b>IP address</b> of the web server. If it cannot find it, it asks another DNS; if no DNS has it, the browser is told the site was not found.</li><li>The browser uses the IP address to send a <b>request to the web server</b> using <b>HTTP or HTTPS</b>.</li><li>The web server sends back the page data: <b>HTML, CSS</b> and any <b>active script</b> (such as JavaScript).</li><li>The browser <b>renders</b> the HTML and CSS and runs the script to display the page.</li></ol>",
    example:
      "<p>URL <code>www.example.com</code> &rarr; DNS replies <code>93.184.216.34</code> &rarr; browser requests the page from <code>93.184.216.34</code> &rarr; the server sends HTML, CSS and script &rarr; the browser displays the web page.</p>",
    checks:[
      mc("What does the DNS do when a URL is entered into a browser?", "It finds the IP address that matches the domain name", ["It renders the HTML on the screen for the user","It encrypts the web page before it is sent","It stores the user's cookies on their hard drive"], "The DNS holds domain names with their IP addresses."),
      mc("Which two items does a web server send back to a browser to build a page?", "HTML and CSS", ["IP address and MAC address","Cookies and bookmarks","Domain name and certificate authority"], "The web server returns the HTML, CSS and any active script, which the browser renders.")
    ] },

  { id:"5.1.6a", code:"5.1.6", title:"Cookies and what they are used for",
    concept:
      "<p>A <b>cookie</b> is a small <b>text file</b> that a website creates and the <b>web browser stores</b>. It holds data about the user.</p>" +
      "<p>Cookies are used to:</p>" +
      "<ul><li>save <b>login details</b> (username and password),</li><li>save <b>payment details</b> for online shopping,</li><li>keep items in a <b>virtual shopping cart</b>,</li><li>save the user's <b>preferences</b> (colours, layout),</li><li><b>track</b> the pages a user views so that <b>targeted adverts</b> can be shown.</li></ul>" +
      "<p><b>Concern:</b> cookies build up a profile of a user, which some people feel is an invasion of privacy and may increase the risk of identity theft. Users can limit cookies in the browser settings.</p>",
    example:
      "<p>You search for football boots on one site. Later, adverts for football boots appear on other sites you visit. This happens because cookies recorded the pages you looked at, which allowed <b>targeted advertising</b>.</p>",
    checks:[
      mc("What is a cookie?", "A small text file stored by the browser that holds user data", ["A virus that copies itself to other computers","A program that renders web pages on the screen","A type of digital certificate from an authority"], "Cookies are small text files created by websites and stored by the browser."),
      mc("Which of these is a use of cookies?", "Remembering the items in an online shopping cart", ["Translating domain names into IP addresses","Encrypting the packets sent across a network","Detecting parity errors in transmitted data"], "Cookies can store shopping cart contents, login details and preferences.")
    ] },

  { id:"5.1.6b", code:"5.1.6", title:"Session cookies and persistent cookies",
    concept:
      "<table class='ln-table' style='text-align:left'><tr><th>Session cookie</th><th>Persistent cookie</th></tr>" +
      "<tr><td>Temporary</td><td>Permanent until it expires or is deleted</td></tr>" +
      "<tr><td>Deleted when the <b>browser is closed</b></td><td>Stored on the <b>hard drive</b> with an <b>expiry date</b></td></tr>" +
      "<tr><td>Not recognised the next time you visit</td><td>Sent back to the web server every time you visit, so the site remembers you</td></tr>" +
      "<tr><td>e.g. items in a shopping cart for one visit</td><td>e.g. keeping you logged in, remembering preferences</td></tr></table>",
    example:
      "<p>You add three items to a basket, close the browser and come back later: the basket is empty. A <b>session cookie</b> held it, and it was deleted when the browser closed.</p>" +
      "<p>A shopping site shows &ldquo;Welcome back, Sam&rdquo; a week later. A <b>persistent cookie</b> stored on the hard drive remembered you.</p>",
    checks:[
      mc("When is a session cookie deleted?", "When the web browser is closed", ["When the computer is switched off only","After exactly one year","Never"], "Session cookies exist only while the browser session lasts."),
      mc("Which type of cookie is stored on the hard drive and has an expiry date?", "Persistent cookie", ["Session cookie","HTTPS cookie","Temporary cookie"], "Persistent cookies stay on the hard drive until they expire or are deleted.")
    ] },

  // ---------- 5.2 Digital currency ----------
  { id:"5.2.1", code:"5.2.1", title:"Digital currency",
    concept:
      "<p>A <b>digital currency</b> is money that <b>exists only electronically</b>. It is exchanged between computers instead of notes and coins. Payment data is <b>encrypted</b> when it is sent (for example using HTTPS).</p>" +
      "<p>Common forms: payments by <b>credit card</b>, <b>mobile phone</b> and <b>smart watch</b>.</p>" +
      "<p>A <b>cryptocurrency</b> (for example <b>Bitcoin</b>) is a digital currency that is <b>decentralised</b>: there is <b>no central authority</b>, such as a bank, controlling it, and the payments are encrypted.</p>" +
      "<table class='ln-table'><tr><th>Bank (centralised)</th><th>Cryptocurrency (decentralised)</th></tr><tr><td>A bank manages and checks payments</td><td>No central authority; payments are tracked by a blockchain</td></tr></table>",
    example:
      "<p>Mia buys a pair of headphones online with her bank card. The money is moved electronically between bank computers; no physical money changes hands. That is a digital currency. If she paid with Bitcoin, no bank would be involved, and the payment would be recorded in a blockchain.</p>",
    checks:[
      mc("What is a digital currency?", "Money that exists only electronically", ["Money printed on special paper","Coins used in vending machines","Cash stored in a bank vault"], "Digital currency is exchanged between computers; it has no physical notes or coins."),
      mc("What does it mean to say a cryptocurrency is decentralised?", "No central authority such as a bank controls it", ["It can only be used in one country","It is not encrypted","It is always stored in one server"], "Cryptocurrencies are not managed by a bank or other central authority.")
    ] },

  { id:"5.2.2", code:"5.2.2", title:"Blockchain",
    concept:
      "<p>A <b>blockchain</b> is the method used to keep track of cryptocurrency transactions. In its basic form it is a <b>digital ledger</b>: a list of every payment made.</p>" +
      "<ul><li>Each payment adds a <b>record</b> (a block) to the ledger with a <b>digital signature</b> and the <b>time and date</b>.</li><li>Records <b>cannot be changed</b> once they are added, and the data is <b>encrypted</b>, so nobody can alter past payments.</li><li>Anyone can <b>view</b> the ledger.</li></ul>" +
      "<p><b>Benefit:</b> the transactions are transparent and tamper-proof without needing a bank to keep the records.</p>",
    example:
      "<table class='ln-table'><tr><th>Block</th><th>Record</th><th>Date and time</th></tr><tr><td>1</td><td>Amy pays Raj 0.5 coin</td><td>3 May 10:02</td></tr><tr><td>2</td><td>Raj pays Lee 0.2 coin</td><td>3 May 10:09</td></tr></table>" +
      "<p>Each new payment is added to the end as a new block; blocks 1 and 2 can never be edited.</p>",
    checks:[
      mc("What is stored in a blockchain?", "A ledger of all the payments made with a digital currency", ["A list of the passwords belonging to all users","The domain names and IP addresses of web servers","Copies of all of the cookies saved by browsers"], "A blockchain is a digital ledger of every transaction."),
      tx("Give one benefit of using blockchain to track a digital currency.", [["cannot be changed","can't be changed","not be changed","tamper","unchangeable","permanent","no one can alter","cannot alter","cannot be altered"],["encrypt","secure","transparent","anyone can view","view the","no bank","no central","decentral"]], 1, "Once a record is added it cannot be changed, so payments cannot be altered (it is also encrypted, can be viewed by anyone and needs no central authority).")
    ] },

  // ---------- 5.3 Cyber security ----------
  { id:"5.3.1a", code:"5.3.1", title:"Threat: brute-force attack",
    concept:
      "<p>In a <b>brute-force attack</b> a perpetrator repeatedly <b>tries different password combinations</b> until the correct one is found. It can be done by hand, or by a program that cycles through huge numbers of combinations automatically.</p>" +
      "<ul><li><b>Aim:</b> to get into your computer or account to steal personal data, or to use the account to buy things.</li><li><b>Prevention:</b> a <b>strong password</b> (long, with upper and lower case letters, numbers and symbols, not a word or phrase), <b>limiting the number of attempts</b> before the account is locked, a <b>biometric password</b> (such as a fingerprint) and <b>two-step verification</b>.</li></ul>",
    example:
      "<p>Password <code>mrsnuffles01</code> (a pet's name plus numbers) is quick to crack. Password <code>1gH6dk@dnlwm!dosTsjlpa</code> would take far longer to guess. Locking the account after three wrong attempts also stops a program from making thousands of guesses.</p>",
    checks:[
      mc("How is a brute-force attack carried out?", "By repeatedly trying different passwords until the right one works", ["By sending malware to the user in an email","By flooding a web server with a huge number of requests","By pretending to be a member of the IT department"], "Brute force means guessing password combinations over and over."),
      mc("Which action best helps prevent a brute-force attack?", "Locking the account after a few wrong password attempts", ["Installing adware onto the computer to see adverts","Using the same short password everywhere online","Closing the browser often during the day"], "Limiting attempts stops an attacker from making huge numbers of guesses.")
    ] },

  { id:"5.3.1b", code:"5.3.1", title:"Threat: data interception",
    concept:
      "<p><b>Data interception</b> means stealing data as it travels across a network. A perpetrator uses a <b>packet sniffer</b> (software, often put on a router) to examine the data packets that pass through, and reports useful ones back.</p>" +
      "<ul><li><b>Aim:</b> to steal personal data for criminal use such as identity theft and fraud.</li><li><b>Prevention:</b> <b>encryption</b> (HTTPS with SSL/TLS), which does not stop the interception but makes the data meaningless; check the URL starts with <b>https</b>; take care with <b>free public Wi-Fi</b>, which could be a fake network.</li></ul>",
    example:
      "<p>A fake &ldquo;Free Cafe Wi-Fi&rdquo; network is set up by a criminal. A customer connects and logs in to a shopping site. The criminal's packet sniffer reads the packets. If the site uses HTTPS, the packets are encrypted and are useless to the criminal.</p>",
    checks:[
      mc("What software is used to examine data packets during data interception?", "A packet sniffer", ["An anti-virus program","A proxy server","A web browser"], "A packet sniffer inspects the packets that pass through the device it is installed on."),
      mc("What does encryption do to help against data interception?", "It makes any intercepted data meaningless", ["It stops the packets being intercepted","It deletes the packets after they arrive","It speeds up the connection"], "Encryption does not stop interception; it makes the stolen data unreadable.")
    ] },

  { id:"5.3.1c", code:"5.3.1", title:"Threat: distributed denial of service (DDoS)",
    concept:
      "<p>A <b>DDoS attack</b> floods a web server with so many requests that it slows down or crashes, so real users cannot reach the website.</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>The perpetrator sends <b>malware</b> to many computers. Once downloaded, each computer becomes a <b>bot</b> (a <b>zombie</b> while it is waiting). Together they form a <b>botnet</b>.</li><li>When ready, the perpetrator &ldquo;wakes up&rdquo; the bots, which all send requests to the same web server at the same time.</li></ol>" +
      "<ul><li><b>Aim:</b> to crash the server, perhaps to demand money, or as revenge or activism.</li><li><b>Prevention:</b> a company can use a <b>proxy server</b> that filters and slows incoming requests; users can scan with <b>anti-malware</b> so their computer is not turned into a bot.</li></ul>",
    example:
      "<p>A ticket website is hit by 2 million requests per second from 50,000 infected home computers. Real customers see the message &ldquo;site unavailable&rdquo;. A proxy server in front of the web server could limit the requests and block repeated ones from the same address.</p>",
    checks:[
      mc("What is a botnet?", "A network of infected computers used to attack a server", ["A firewall that blocks packets","A type of persistent cookie","A server that stores digital certificates"], "A botnet is a group of computers infected with malware that are controlled by the attacker."),
      mc("Which security solution can a company use to help stop a DDoS attack?", "A proxy server", ["Adware","A packet sniffer","A cookie"], "A proxy server sits in front of the web server and filters requests.")
    ] },

  { id:"5.3.1d", code:"5.3.1", title:"Threat: hacking",
    concept:
      "<p><b>Hacking</b> is gaining <b>unauthorised access</b> to data or a computer system. A person who does this is a <b>hacker</b>. Hackers may use brute-force attacks or exploit <b>vulnerabilities</b> (weak points) such as out-of-date software or open ports.</p>" +
      "<ul><li><b>Aim:</b> to steal, corrupt or leak data, for identity theft, revenge or activism.</li><li><b>Prevention:</b> a <b>firewall</b>, <b>automatic software updates</b>, <b>strong or biometric passwords</b> and <b>two-step verification</b>.</li></ul>" +
      "<p>A <b>firewall</b> examines all data going in and out of a network against a set of rules, <b>accepts or rejects</b> it, and can <b>close unused ports</b>.</p>",
    example:
      "<p>A school network has software that is two years out of date. A hacker finds a known weakness in it and gets in. If the software had updated automatically, the weakness would have been fixed. The firewall could also have rejected the hacker's data.</p>",
    checks:[
      mc("What is hacking?", "Gaining unauthorised access to data or a system", ["Sending unwanted adverts","Slowing down a network with a virus","Copying a file to a USB drive"], "Hacking means breaking into a system or data without permission."),
      mc("What does a firewall do?", "It checks data entering and leaving against a set of rules", ["It makes the passwords of all users stronger","It stores a backup copy of all of the data","It scans emails for spelling errors and bad grammar"], "A firewall examines data and either accepts or rejects it.")
    ] },

  { id:"5.3.1e", code:"5.3.1", title:"Threat: malware",
    concept:
      "<p><b>Malware</b> is malicious software designed to disrupt your computer or data. You need to know six types:</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Type</th><th>What it does</th></tr>" +
      "<tr><td><b>Virus</b></td><td>Replicates itself, corrupts data or fills the memory, causing the computer to slow or crash</td></tr>" +
      "<tr><td><b>Worm</b></td><td>Replicates itself through weak points in a network and clogs up the bandwidth</td></tr>" +
      "<tr><td><b>Trojan horse</b></td><td>Looks like harmless software (a game, for example) but hides other malware, which it releases once downloaded</td></tr>" +
      "<tr><td><b>Spyware</b></td><td>Records your actions, for example a <b>keylogger</b> records key presses to find passwords</td></tr>" +
      "<tr><td><b>Adware</b></td><td>Automatically creates unwanted pop-up and banner adverts</td></tr>" +
      "<tr><td><b>Ransomware</b></td><td>Encrypts your data and demands a ransom (money) to decrypt it</td></tr></table>",
    example:
      "<p>Ben downloads a free game from an unknown website. It runs normally, but in the background it installs a keylogger and sends his key presses to a criminal. The game was a <b>Trojan horse</b> that carried <b>spyware</b>.</p>",
    checks:[
      mc("Which type of malware encrypts a user's files and demands payment?", "Ransomware", ["Adware","Worm","Virus"], "Ransomware locks data by encryption and asks for a ransom to decrypt it."),
      mc("Which malware is disguised as a harmless program but contains other malware?", "Trojan horse", ["Worm","Adware","Keylogger"], "A Trojan horse hides other malware inside software that looks harmless."),
      tx("Describe how a keylogger can be used to steal a user's password.", [["spyware","keylogger","record"],["key press","key presses","keystrokes","keys pressed","typing","keyboard"],["send","sent","perpetrator","criminal","hacker","attacker"],["password","analys","pattern","login"]], 3, "A keylogger is spyware that records every key press made on the keyboard. The recorded data is sent to the perpetrator, who analyses it to find patterns such as usernames and passwords.")
    ] },

  { id:"5.3.1f", code:"5.3.1", title:"Threats: phishing and pharming",
    concept:
      "<p>Both aim to steal <b>personal data</b> (such as login details) using a <b>fake website</b>.</p>" +
      "<ul><li><b>Phishing</b>: the perpetrator sends an <b>email</b> that looks as if it is from a genuine company (such as your bank). It persuades you to <b>click a link</b> that takes you to a fake website where you enter your details.</li>" +
      "<li><b>Pharming</b>: you click a link or icon and <b>malicious software is downloaded</b> on your hard drive. When you later type the <b>correct URL</b> of a genuine site, the software <b>redirects</b> you to a fake website.</li></ul>" +
      "<p><b>Signs of a phishing email:</b> a generic greeting (“Dear customer”), spelling and grammar mistakes, a sense of urgency or threat, an unfamiliar sender address, and a link whose URL does not match the real company.</p>" +
      "<p><b>Protection:</b> check the URL and look for HTTPS; only download from trusted sources; use anti-malware (to remove the pharming file) and firewall; if you gave details to a fake site, change your password straight away.</p>",
    example:
      "<p>An email says &ldquo;Your account will be closed in 24 hours! Click here to verify.&rdquo; It is sent from <code>support@bank-secure-login.xyz</code> and starts with “Dear customer”. These are signs of <b>phishing</b>.</p>",
    checks:[
      mc("What is the difference between phishing and pharming?", "Phishing uses an email link, pharming uses malicious code to redirect you", ["Phishing uses malicious code to redirect you, pharming uses an email link","Phishing is hardware and pharming is software","There is no difference at all"], "Phishing tricks you with an email. Pharming installs code that redirects your web requests to a fake site."),
      mc("Which of these is a sign of a phishing email?", "A generic greeting such as “Dear customer”", ["It is addressed to you by your full name","The sender's address is your friend's","It has no links"], "Genuine companies usually use your name. Generic greetings, spelling errors and urgent threats are signs of phishing.")
    ] },

  { id:"5.3.1g", code:"5.3.1", title:"Threat: social engineering",
    concept:
      "<p><b>Social engineering</b> is <b>manipulating or deceiving people</b> into giving away confidential or personal data. It targets people, not computers. Phishing is one form of social engineering.</p>" +
      "<ul><li>A criminal phones an employee and pretends to be the <b>IT department</b>, asking for login details.</li><li>A criminal befriends employees to ask questions about the company.</li><li>Fun social-media <b>quizzes</b> (&ldquo;your pet's name&rdquo;) gather facts people use in passwords.</li></ul>" +
      "<p><b>Prevention:</b> staff <b>awareness training</b>; <b>access levels</b> (employees can only see the data they need, so a tricked employee gives away less); high <b>privacy settings</b> on social media.</p>",
    example:
      "<p>&ldquo;Hi, this is IT. We saw your computer problem. Can you tell me your password so I can fix it?&rdquo; An aware employee knows IT staff never need your password, ends the call and reports it.</p>",
    checks:[
      mc("What is social engineering?", "Tricking people into revealing confidential data", ["Using software to guess passwords","Flooding a server with requests","Copying files to a cloud account"], "It manipulates people, rather than hacking the computer directly."),
      mc("How do access levels help protect a company from social engineering?", "A tricked employee can only reach limited data", ["They stop all emails reaching staff","They encrypt all passwords","They remove the need for passwords"], "Access levels limit what each user can see, so a fooled employee can give away less.")
    ] },

  { id:"5.3.2a", code:"5.3.2", title:"Solutions: passwords and authentication",
    concept:
      "<p><b>Authentication</b> proves who a user is before giving access.</p>" +
      "<ul><li><b>Username and password</b>: use a <b>strong password</b> (long, mixed characters). Change it regularly and use a different one for each account.</li><li><b>Biometrics</b>: use unique body data, such as a <b>fingerprint</b> or face scan. It is very hard to guess or copy.</li><li><b>Two-step verification</b>: after the password, a second step, such as a <b>code sent to your phone or email</b>, must also be entered. A perpetrator needs both.</li></ul>" +
      "<p>Also useful: <b>access levels</b> (each user can reach only the data they need), and high <b>privacy settings</b> on accounts.</p>",
    example:
      "<p>A bank customer logs in with a username and password. The bank then texts a 6-digit code to the customer's phone, which must be entered. Even if a criminal guessed the password, they could not log in without the phone.</p>",
    checks:[
      mc("What is two-step verification?", "A password and then a second piece of data, like a code", ["Entering the same password twice in a row","Using two different usernames to log in","Logging in on two devices at the same time"], "It needs two separate steps, usually a password and a code sent to the user."),
      mc("Why is a biometric password hard for a hacker to brute-force?", "It uses unique body data that cannot be guessed", ["It is a very long and complicated text password","It is changed automatically every minute or so","It is stored by the browser in a persistent cookie"], "Biometrics such as fingerprints are unique to the individual.")
    ] },

  { id:"5.3.2b", code:"5.3.2", title:"Solutions: software and network protection",
    concept:
      "<table class='ln-table' style='text-align:left'><tr><th>Solution</th><th>How it helps</th></tr>" +
      "<tr><td><b>Anti-malware</b> (anti-virus, anti-spyware)</td><td>Scans files and compares them with known malware; <b>quarantines</b> and deletes what it finds. Keep it updated.</td></tr>" +
      "<tr><td><b>Firewall</b></td><td>Examines incoming and outgoing data and rejects data that breaks the rules; closes unused ports</td></tr>" +
      "<tr><td><b>Proxy server</b></td><td>Sits between users and a web server and filters requests; helps against DDoS</td></tr>" +
      "<tr><td><b>SSL/TLS (HTTPS)</b></td><td>Encrypts data in transit</td></tr>" +
      "<tr><td><b>Automatic software updates</b></td><td>Fixes vulnerabilities as soon as updates are released</td></tr>" +
      "<tr><td><b>Backups</b></td><td>A copy of data kept separately, so data damaged or locked by malware can be recovered</td></tr>" +
      "<tr><td><b>Checking URLs, spelling and tone of messages</b></td><td>Helps spot phishing and pharming</td></tr></table>",
    example:
      "<p>A computer is infected by ransomware. Because the owner keeps a backup on a separate drive, they restore their files and do not need to pay the ransom. Anti-malware then removes the ransomware file.</p>",
    checks:[
      mc("What does anti-malware software do when it finds a suspicious file?", "It quarantines it and asks whether to delete it", ["It encrypts it with a public key","It sends it to the router","It converts it to HTTPS"], "Anti-malware compares files with a list of known malware, then quarantines and deletes matches."),
      mc("Why should software be set to update automatically?", "Updates fix vulnerabilities that hackers could exploit", ["Updates always make the computer faster","Updates delete cookies","Updates stop the need for passwords"], "Updates remove weak points, so hackers have fewer ways in.")
    ] },

  { id:"5.3.2c", code:"5.3.2", title:"Matching the right solution to a threat",
    concept:
      "<p>In an exam you are asked to match a <b>threat</b> to a suitable <b>solution</b>. Use this guide:</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Threat</th><th>Best solutions</th></tr>" +
      "<tr><td>Brute-force</td><td>Strong password, limit attempts, biometrics, two-step verification</td></tr>" +
      "<tr><td>Data interception</td><td>Encryption (SSL/TLS, HTTPS)</td></tr>" +
      "<tr><td>DDoS</td><td>Proxy server; anti-malware on users' computers</td></tr>" +
      "<tr><td>Hacking</td><td>Firewall, updates, strong passwords, two-step verification</td></tr>" +
      "<tr><td>Malware</td><td>Anti-malware, firewall, careful downloading, backups</td></tr>" +
      "<tr><td>Phishing</td><td>Check sender, spelling, tone and URL; do not click links; firewall/filters</td></tr>" +
      "<tr><td>Pharming</td><td>Anti-malware, check the URL and HTTPS, download from trusted sources</td></tr>" +
      "<tr><td>Social engineering</td><td>Staff training, access levels, privacy settings</td></tr></table>",
    example:
      "<p><b>Scenario:</b> A student finds that someone has logged in to their social media account. Two ways it could have happened: <b>(1)</b> a brute-force attack, because the password was weak; <b>(2)</b> phishing or spyware that captured the login details. Solutions: a strong password and two-step verification.</p>",
    checks:[
      mc("A company wants to keep its customers' data safe while it travels over the internet. Which solution is most suitable?", "SSL/TLS encryption", ["Access levels","A proxy server","Privacy settings"], "Encryption protects data in transit by making it meaningless if intercepted."),
      tx("A student's social media account has been hacked. Explain two ways the hacker could have managed this.", [["brute","guess","weak password","password"],["phishing","email","fake website","link"],["spyware","keylogger","key press","malware"],["social engineering","tricked","deceiv","manipulat"],["data interception","intercept","packet sniffer","public wifi","free wi-fi"]], 2, "For example: a brute-force attack that guessed a weak password; phishing, where the student was tricked into entering details on a fake website; spyware or a keylogger that recorded the password; social engineering that tricked the student into giving the password; or data interception on an unsecured network.")
    ] }

  ];

  var TEST = {
    mcq:[
      mc("In the URL <code>https://www.example.com/page1.html</code>, what is <code>https</code>?", "The protocol", ["The domain name","The web page","The IP address"], "https is the protocol used to transfer the data."),
      mc("Which server finds the IP address that matches a domain name?", "Domain name server (DNS)", ["Web server","Proxy server","Mail server"], "The DNS stores domain names with their IP addresses."),
      mc("Which cookie type is deleted when the web browser is closed?", "Session cookie", ["Persistent cookie","Secure cookie","Digital certificate"], "Session cookies are temporary."),
      mc("Which cyber threat uses a botnet?", "DDoS attack", ["Phishing","Pharming","Brute-force attack"], "A DDoS attack uses a botnet of infected computers."),
      mc("Which solution helps protect against a brute-force attack?", "Two-step verification", ["Anti-adware","A proxy server","Automatic cookies"], "Two-step verification means a guessed password alone is not enough.")
    ],
    typed:[
      { q:"Describe how a web page is retrieved and displayed after the user types a URL into a browser.", groups:[["dns","domain name server"],["ip address"],["request","asks","sends a request"],["web server"],["html","css","script"],["render","display"]], need:4, model:"The browser sends the URL to a DNS, which finds the matching IP address. The browser uses the IP address to send a request to the web server. The web server sends back the HTML, CSS and any script, and the browser renders them to display the web page." },
      { q:"Explain how a firewall helps protect a computer from hackers.", groups:[["examine","check","monitor","inspect"],["incoming","outgoing","in and out","data entering","data leaving"],["rules","criteria","set of"],["reject","block","stop","accept","allow","filter"],["port"]], need:3, model:"A firewall examines all incoming and outgoing data and compares it with a set of rules (criteria). It rejects or blocks data that does not meet the rules, and can close unused ports, so a hacker is stopped from getting in." }
    ]
  };

  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat(LESSONS);
  (root.ILEARN_TESTS = root.ILEARN_TESTS || {})[5] = TEST;
})(typeof window !== "undefined" ? window : this);
