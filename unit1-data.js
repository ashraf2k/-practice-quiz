/* Unit 1: Technology, IP and Security tutorial content (Sprint 1.4 Data privacy, Sprint 1.5 Network and security).
   In every mcq, o[0] is the correct answer; the page shuffles the options. Lesson strings may contain simple HTML written by us. */
window.UNIT1TUT = { langs: [
{ id: "dp", title: "Part 1: Data privacy", blurb: "Sprint 1.4", topics: [
 { id: "u1", title: "How your data is collected", anim: "collect", path: "Sprint 1.4 · Data privacy",
   steps: ["You install an app and tap Allow.", "Your data (contacts, location, photos) is sent to the company.", "The company builds a profile of you.", "You see adverts aimed at you."],
   lesson: [
     "<b>Data privacy</b> means you control who can see and use your personal information. Every day, apps, websites and cameras collect data about us, often without us noticing.",
     { h: "Automated data collection" },
     "Data is collected <b>automatically</b>. For example, a social media app can read your account activity even when you are not online, and a shop camera can study how customers behave.",
     { h: "Profiling" },
     "<b>Profiling</b> means using your data (what you search, buy and like) to guess your interests and behaviour. Buy a t-shirt online and you will see more t-shirt adverts. A credit bureau studies how you spend and pay to decide your credit score.",
     { h: "Surveillance" },
     "Cameras in shops and on roads give useful information, but people may not know they are being recorded.",
     { tip: "Many people tap <b>Allow</b> without reading. Before you allow an app, ask: does it really need this?" }
   ],
   mcq: [
     { q: "What is automated data collection?", o: ["Data is collected automatically, often without you noticing", "You type in every piece of data yourself", "Data is deleted after you log out", "A teacher collects your homework"], why: "Apps and cameras can collect data in the background." },
     { q: "What is profiling?", o: ["Using your data to guess your interests and behaviour", "Taking a photo for your profile picture", "Deleting your account", "Making a password"], why: "Profiling groups people and predicts what they like or will do." },
     { q: "You buy a t-shirt online and then see many t-shirt adverts. What is this an example of?", o: ["Profiling", "A virus", "A software update", "A password"], why: "The shop used your browsing and buying history to target you." },
     { q: "Why can shop and road cameras be a privacy problem?", o: ["People may not know they are being recorded", "They are too expensive", "They only work in the day", "They make pictures blurry"], why: "Recording people without them knowing can invade their privacy." },
     { q: "What should you do before tapping Allow on an app?", o: ["Check that the app really needs that permission", "Always tap Allow", "Turn off your phone", "Share your password"], why: "Only give permissions that an app needs to work." }
   ],
   written: { q: "A new game asks to see your contacts, location and camera. What would you do and why? Give two reasons.", model: "I would only allow what the game really needs. A game does not need my contacts, so I would deny that permission.\nReason 1: my contacts belong to my friends too, and the company could collect their data.\nReason 2: the company could use my location and data to build a profile of me and send me targeted adverts.", check: ["Says you would deny permissions the game does not need", "Gives a reason about contacts or friends", "Gives a reason about location, profiling or adverts"] } },

 { id: "u2", title: "The Cambridge Analytica case", anim: "cambridge", path: "Sprint 1.4 · Case study",
   steps: ["A quiz app asks people to log in with Facebook.", "It also collects data about their friends.", "The data is sold to Cambridge Analytica.", "It is used to target voters with political adverts."],
   lesson: [
     "<b>Cambridge Analytica</b> was a British political consulting company. In 2018 it was accused of collecting private data of up to <b>87 million</b> Facebook users without their consent.",
     { h: "What happened" },
     "A researcher made a personality quiz app called <i>This Is Your Digital Life</i> and said the data was only for study. People allowed the app to use their Facebook data. The app also collected data about their <b>friends</b>, who never gave permission.",
     "Cambridge Analytica combined the data with voter information and used it to show political adverts to people and change their opinions.",
     { h: "Why it matters" },
     "The case showed how data can be misused. It made people ask for stronger laws, honest companies and better protection of personal data.",
     { tip: "Remember: the friends of the quiz users did not agree to share anything, but their data was still collected." }
   ],
   mcq: [
     { q: "How many people's data was Cambridge Analytica accused of collecting?", o: ["Up to 87 million", "About 87", "About 870", "Exactly one"], why: "It was up to 87 million Facebook users." },
     { q: "How did the company get the data?", o: ["From a personality quiz app that used Facebook", "From a library book", "From a school exam", "From a weather report"], why: "The quiz app used Facebook's system to read users' data." },
     { q: "Whose data was also collected, even though they did not agree?", o: ["The friends of the quiz users", "Only the teachers", "Nobody's", "Only the researcher's"], why: "The app could read friends' data too." },
     { q: "What was the data used for?", o: ["Targeting voters with political adverts", "Fixing computers", "Making video games", "Selling shoes"], why: "It was used to influence opinions in political campaigns." },
     { q: "What did the case teach us?", o: ["Personal data must be protected by laws and companies", "Data is never valuable", "Privacy does not matter", "Quiz apps are always safe"], why: "It showed the need for better laws and responsibility." }
   ],
   written: { q: "Explain in your own words what Cambridge Analytica did wrong.", model: "Cambridge Analytica collected the private data of up to 87 million Facebook users without their consent. It got the data through a quiz app that also collected data from the users' friends. It then used the data to target people with political adverts and change their opinions. This was a serious privacy problem.", check: ["Says data was collected without consent", "Mentions the quiz app or Facebook", "Says the data was used to target voters or adverts"] } },

 { id: "u3", title: "Laws, society and ethics", anim: "balance", path: "Sprint 1.4 · Legal, social and ethical",
   steps: ["Data can help people: better services, health and safety.", "Data can harm people: misuse, bias and spying.", "Laws are different in different countries.", "Ethics helps us balance the good and the bad."],
   lesson: [
     "Privacy protects our freedom. When people are watched all the time, they stop saying what they think. Trust between people and companies also breaks down.",
     { h: "Laws differ" },
     "Every country has different privacy laws. Some control data collection strictly. Others allow more open data to help new ideas. This is hard for international companies because the rules can clash.",
     { h: "Positive impacts of data" },
     "Better personal services, better decisions, better public services and health care, economic growth, and safer communities through government monitoring.",
     { h: "Negative impacts of data" },
     "Privacy invasion, data misuse (fraud and identity theft), unfair bias, the <b>digital divide</b> (people without access are left behind) and too much government surveillance.",
     { tip: "Ethics means thinking about what is fair and right. It helps us weigh the benefits against the risks." }
   ],
   mcq: [
     { q: "Which is a positive impact of using data?", o: ["Better personal services for customers", "Identity theft", "Unfair bias", "Too much spying"], why: "Companies can improve services when they understand customers." },
     { q: "Which is a negative impact of data misuse?", o: ["Fraud and identity theft", "Better health care", "Faster decisions", "Safer roads"], why: "Misused data can be used by criminals." },
     { q: "What is the digital divide?", o: ["People who cannot use or reach digital tools get left behind", "Two computers that are broken", "A law about screens", "A type of password"], why: "It is a gap between people with and without digital access or skills." },
     { q: "Why are different privacy laws a problem for international companies?", o: ["The rules in different countries can clash", "Laws are the same everywhere", "Companies do not need to follow laws", "Laws are only for schools"], why: "A company must follow the rules of every country where it works." },
     { q: "What does ethics help us do?", o: ["Weigh the benefits and risks of using data", "Make computers faster", "Delete all data", "Avoid using the internet"], why: "Ethical thinking guides responsible decisions." }
   ],
   written: { q: "Give one benefit and one risk of companies collecting data about their customers.", model: "Benefit: companies can understand what customers need and offer better, more personal products and services.\nRisk: if the data is not protected, it can be misused for fraud or identity theft, or it can invade the customers' privacy.", check: ["Gives a clear benefit", "Gives a clear risk", "Both are about collecting or using data"] } },

 { id: "u4", title: "Data breaches", anim: "breach", path: "Sprint 1.4 · Data breaches",
   steps: ["A company stores records of millions of people.", "A hacker breaks in.", "The records are stolen and shared.", "The company tells people to change their passwords."],
   lesson: [
     "A <b>data breach</b> is when private or protected information is seen, shared or stolen by people who should not have it. It can happen through cyber attacks, theft or even human mistakes.",
     { h: "Big breaches" },
     "<b>Yahoo</b> (2013 to 2016): hackers got details of over <b>3 billion</b> accounts, such as names, emails, phone numbers, birthdays, passwords and security questions.",
     "<b>Microsoft Exchange</b>: a cyber attack on email servers reached more than <b>30,000</b> US companies, from small businesses to local governments.",
     { h: "A fake account" },
     "If someone copies your name and photo to make a fake account, they can pretend to be you. This is <b>identity theft</b>. Report the fake account, warn your friends, turn on two-factor authentication and check your privacy settings.",
     { tip: "If a company tells you about a breach, change your passwords straight away." }
   ],
   mcq: [
     { q: "What is a data breach?", o: ["Private information is accessed or stolen by people who should not have it", "A computer update", "A new phone", "A backup of your photos"], why: "A breach means unauthorised people got protected information." },
     { q: "How many accounts were affected in the Yahoo breach?", o: ["Over 3 billion", "About 30", "About 300", "Exactly 3 thousand"], why: "The Yahoo breach affected over 3 billion accounts." },
     { q: "Which company's email servers were attacked, affecting more than 30,000 US companies?", o: ["Microsoft", "A local bakery", "A school bus company", "A radio station"], why: "The Microsoft Exchange attack hit many small and large organisations." },
     { q: "Someone makes a fake account using Eric's name and photo. What is this?", o: ["Identity theft (pretending to be someone else)", "A software update", "A normal feature", "A backup"], why: "The person is pretending to be Eric." },
     { q: "What should Eric do first?", o: ["Report the fake account", "Delete his real account", "Give the fake account his password", "Do nothing"], why: "Reporting lets the website remove the fake account." }
   ],
   written: { q: "Eric finds a fake account with his name and photo. Write three things he should do.", model: "1. Report the fake account to the website.\n2. Tell his friends not to trust or talk to the fake account.\n3. Turn on two-factor authentication and check his privacy settings so that his real account is safe.", check: ["Reports the account", "Warns friends or family", "Improves account security (2FA or privacy settings)"] } },

 { id: "u5", title: "Protect your privacy", anim: "protect", path: "Sprint 1.4 · Staying safe",
   steps: ["Use a strong, different password for each account.", "Turn on multi-factor authentication.", "Check app permissions and privacy settings.", "Use a VPN on public Wi-Fi and keep devices updated."],
   lesson: [
     "You can do many simple things to protect your privacy.",
     { h: "Good habits" },
     "1. Think before you share personal information online.<br>2. Use a <b>unique, complex password</b> for every account.<br>3. Turn on <b>multi-factor authentication (MFA)</b>.<br>4. Check the permissions an app asks for and allow only what it needs.<br>5. Use the privacy settings on social media so only friends can see your posts.",
     { h: "Public Wi-Fi" },
     "Public Wi-Fi can be hacked. Do not do online banking on it. If you must use it, use a <b>VPN (Virtual Private Network)</b>, which scrambles your data.",
     { h: "Keep up to date" },
     "Update your phone and apps often because updates fix security problems. Watch out for <b>phishing</b> messages that ask for passwords. A real company will not ask for them by message.",
     { tip: "Also useful on a new phone: screen lock, ad settings, secure browsing and automatic backups." }
   ],
   mcq: [
     { q: "Which is the best password habit?", o: ["A unique, complex password for each account", "The same simple password everywhere", "Your name and birthday", "Sharing it with friends"], why: "If one password is stolen, the others stay safe." },
     { q: "What does multi-factor authentication add?", o: ["An extra check besides your password", "More adverts", "A faster internet", "A bigger screen"], why: "A second proof, such as a code on your phone, makes stealing an account harder." },
     { q: "What should you do on public Wi-Fi if you must use sensitive services?", o: ["Use a VPN", "Turn off the screen lock", "Share your password", "Turn off updates"], why: "A VPN encrypts your data." },
     { q: "Why should you update your phone and apps?", o: ["Updates fix security problems", "Updates delete your photos", "Updates make the battery bigger", "Updates are only for games"], why: "Security patches close the holes that attackers use." },
     { q: "A message asks for your password. What should you do?", o: ["Do not reply, it may be phishing", "Send it quickly", "Reply with a photo", "Forward it to friends"], why: "Real companies do not ask for passwords by message." }
   ],
   written: { q: "Write four rules that help a student protect their privacy online.", model: "1. Use a strong, different password for every account.\n2. Turn on two-factor (multi-factor) authentication.\n3. Only give an app the permissions it needs, and keep social media private.\n4. Do not use public Wi-Fi for banking, or use a VPN, and keep devices updated.", check: ["Strong or unique passwords", "MFA or 2FA", "Permissions or privacy settings", "VPN, public Wi-Fi, updates or phishing"] } }
] },
{ id: "ns", title: "Part 2: Network and security", blurb: "Sprint 1.5", topics: [
 { id: "n1", title: "The Mirai attack and DDoS", anim: "ddos", path: "Sprint 1.5 · Case study",
   steps: ["A hacker takes control of weak IoT devices.", "The devices form a botnet.", "All the bots send requests to one server at once.", "The server is overloaded and real users cannot get in."],
   lesson: [
     "A <b>cyber attack</b> is an attempt to get into a device or its data without permission.",
     { h: "The Mirai attack (2016)" },
     "Hackers took control of <b>IoT (Internet of Things)</b> devices such as routers, IP cameras and smart appliances. They used them to flood the DNS company <b>Dyn</b> with fake requests. Websites such as Twitter, Netflix and Reddit stopped working for many people.",
     { h: "Why IoT devices?" },
     "They are cheap, often have weak security, rarely get updates and keep their <b>default passwords</b>. Mirai simply tried the default usernames and passwords.",
     { h: "DoS and DDoS" },
     "A <b>DoS</b> attack floods a server with traffic so that it cannot answer real users. In a <b>DDoS</b> (Distributed DoS) attack the traffic comes from thousands of infected devices called <b>bots</b>. A network of bots is a <b>botnet</b>. It is harder to stop because the traffic comes from many places.",
     { tip: "Lesson from Mirai: change default passwords and keep IoT devices updated." }
   ],
   mcq: [
     { q: "Which devices did the Mirai attack mainly use?", o: ["IoT devices such as cameras and routers", "Printers made of paper", "Old books", "Televisions without power"], why: "Mirai infected IoT devices with weak security." },
     { q: "What does DDoS stand for?", o: ["Distributed Denial of Service", "Digital Data of School", "Direct Disk Operating System", "Double Data on Server"], why: "It floods a target from many places." },
     { q: "What is a botnet?", o: ["A network of infected devices controlled by a hacker", "A fishing net", "A fast Wi-Fi", "A type of keyboard"], why: "The hacker controls all the bots together." },
     { q: "Why was Mirai able to infect so many devices?", o: ["They used weak default passwords", "They were turned off", "They had no screens", "They were very old books"], why: "Many owners never changed the default username and password." },
     { q: "How can you help prevent your IoT devices being used in an attack?", o: ["Change the default password and install updates", "Keep the default password", "Never turn them on", "Give the password to a friend"], why: "Strong passwords and updates make devices harder to take over." }
   ],
   written: { q: "Explain how a DDoS attack stops people using a website.", model: "The hacker infects many devices with malware so they become bots in a botnet. At the same time the bots send a huge number of requests to the website's server. The server gets overloaded and cannot answer, so real users cannot open the website.", check: ["Mentions infected devices, bots or a botnet", "Says a huge amount of traffic is sent at once", "Says the server is overloaded so users cannot use the site"] } },

 { id: "n2", title: "Phishing", anim: "phishing", path: "Sprint 1.5 · Cyber threats",
   steps: ["You get an email saying you won a prize.", "You click the link.", "A fake website asks for your details.", "The attacker steals them. Check the sender and do not click."],
   lesson: [
     "<b>Phishing</b> tricks people into giving away private information. The attacker sends a message or email that looks like it is from a bank, a shop or a friend.",
     { h: "How it works" },
     "The message uses <b>greed</b> (you won a prize), <b>urgency</b> (act now!) or <b>fear</b> (your account will be closed). When you click the link you go to a fake website, or malware is put on your device.",
     { h: "How to stay safe" },
     "1. Be careful with emails you did not expect.<br>2. Check the sender's address.<br>3. Do not click suspicious links.<br>4. Look for spelling mistakes and general greetings such as \"Dear customer\".<br>5. Type the official website address yourself or use a trusted bookmark.",
     { tip: "If an email says you won one million dollars, it is almost certainly phishing." }
   ],
   mcq: [
     { q: "What is phishing?", o: ["Tricking people into sharing private information", "Catching fish", "Cleaning a computer", "Making a backup"], why: "Phishing uses fake messages to steal information." },
     { q: "Which is a sign of a phishing email?", o: ["It says you must act now to win a prize", "It comes from your teacher at school", "It is a normal newsletter you chose", "It has no link"], why: "Urgency and prizes are common tricks." },
     { q: "Ms. Nora gets an email saying she won one million dollars. What should she do?", o: ["Do not click the link and check the sender", "Click the link quickly", "Send her password", "Forward it to everyone"], why: "It is a phishing attempt." },
     { q: "Which feelings do phishing messages use?", o: ["Greed, urgency and fear", "Calm and sleep", "Music and art", "Maths and science"], why: "These make people click without thinking." },
     { q: "What is the safest way to open your bank's website?", o: ["Type the official address yourself", "Click the link in the email", "Click a pop-up advert", "Ask a stranger"], why: "This makes sure you reach the real website." }
   ],
   written: { q: "You receive an email: \"You won a prize! Click here now!\" Explain what it is and write three things you should do.", model: "It is a phishing attack. The attacker is using greed and urgency to make me click a link to a fake website or infect my device.\n1. Do not click the link.\n2. Check the sender's email address and look for spelling mistakes.\n3. Delete or report the email, and visit the real website by typing its address myself.", check: ["Names it as phishing", "Says not to click the link", "Checks sender or signs of phishing", "Uses official website or reports/deletes it"] } },

 { id: "n3", title: "Malware: virus, worm and Trojan", anim: "malware1", path: "Sprint 1.5 · Malware (1)",
   steps: ["Malware is harmful software.", "A virus copies itself when you open an infected file.", "A worm spreads across a network by itself.", "A Trojan pretends to be useful software."],
   lesson: [
     "<b>Malware</b> (malicious software) is harmful code that enters your device to steal, change or destroy your data. It often arrives from a bad website, an email or a download.",
     { h: "Virus" },
     "A <b>virus</b> copies itself and spreads when people open infected files or install bad software. It can damage data and slow the computer.",
     { h: "Worm" },
     "A <b>worm</b> spreads by itself across a network using weaknesses. It needs <b>no help from a person</b>. It can slow the network and give attackers a way in.",
     { h: "Trojan horse" },
     "A <b>Trojan</b> looks like normal, useful software, for example from an unofficial website. Once you install it, it can delete files or give attackers access.",
     { tip: "Only download software from official, trusted websites." }
   ],
   mcq: [
     { q: "What is malware?", o: ["Software made to cause harm", "A new keyboard", "A type of screen", "A game controller"], why: "Mal means bad. Malware is bad software." },
     { q: "Which malware spreads by itself across a network without help from a person?", o: ["Worm", "Trojan", "Adware", "Spyware"], why: "A worm spreads on its own." },
     { q: "Which malware spreads when people open infected files?", o: ["Virus", "Firewall", "Router", "Password"], why: "A virus needs user action, such as opening a file." },
     { q: "Mr. Rick downloads software from an unofficial site. It looks normal but contains harmful code. What is it?", o: ["A Trojan horse", "A firewall", "An update", "A backup"], why: "A Trojan is disguised as legitimate software." },
     { q: "How can you reduce the risk of Trojans?", o: ["Download only from official websites", "Download from any site", "Turn off antivirus", "Click all pop-ups"], why: "Official sources are much safer." }
   ],
   written: { q: "Explain the difference between a virus and a worm.", model: "A virus copies itself and spreads when a person does something, such as opening an infected file or installing bad software. A worm spreads by itself across a network by using weaknesses in the system, so it needs no help from a person.", check: ["Virus needs a user action or an infected file", "Worm spreads by itself", "Mentions network for the worm"] } },

 { id: "n4", title: "Malware: ransomware, spyware and more", anim: "malware2", path: "Sprint 1.5 · Malware (2)",
   steps: ["Ransomware locks your device or files and asks for money.", "Spyware secretly watches what you do.", "Adware shows unwanted adverts.", "Bots, and rootkits that hide, give attackers control."],
   lesson: [
     { h: "Ransomware" },
     "<b>Ransomware</b> blocks your access and asks for a ransom. Types: <b>screen lockers</b> lock the screen, <b>scareware</b> shows fake warnings, <b>crypt ransomware</b> encrypts your files and sells the key, and <b>double extortion</b> encrypts <i>and</i> steals the data.",
     { h: "Spyware" },
     "<b>Spyware</b> secretly watches what you do and sends passwords or bank details to the attacker. A <b>keylogger</b> records every key you press.",
     { h: "Adware" },
     "<b>Adware</b> shows unwanted adverts. It is not always harmful, but it can slow your device or open the door to other malware.",
     { h: "Bots and rootkits" },
     "<b>Bots</b> are remote controlled and form a botnet. A <b>rootkit</b> gives the attacker full control and <b>hides</b> other malware. It is hard to find and may need a full reinstall.",
     { tip: "Activity: if your phone screen locks and asks for a ransom, it is ransomware." }
   ],
   mcq: [
     { q: "Mr. Jake's phone screen is locked and a message asks him for money. What is it?", o: ["Ransomware", "Adware", "A firewall", "A backup"], why: "Ransomware blocks access and demands a ransom." },
     { q: "Which malware secretly watches you and sends your passwords to an attacker?", o: ["Spyware", "Adware", "A router", "A cable"], why: "Spyware spies on your activity." },
     { q: "Which program records every key you press?", o: ["A keylogger", "A printer", "A screen", "A mouse"], why: "A keylogger is a kind of spyware." },
     { q: "Which malware shows unwanted adverts?", o: ["Adware", "Rootkit", "Worm", "Crypt ransomware"], why: "Adware is advertising software that you did not ask for." },
     { q: "Which malware hides itself and other malware and gives the attacker admin access?", o: ["A rootkit", "A screen locker", "An email", "A website"], why: "Rootkits are hard to detect." }
   ],
   written: { q: "An attacker gets your passwords by recording the keys you press. Which type of malware is it and how could you protect yourself?", model: "It is spyware, called a keylogger. To protect myself I can install antivirus software and keep it updated, keep my system updated, and only download software from trusted websites. I should also use multi-factor authentication so a stolen password is not enough.", check: ["Names spyware or keylogger", "Mentions antivirus", "Mentions updates, trusted downloads or MFA"] } },

 { id: "n5", title: "Firewall, antivirus and updates", anim: "defence", path: "Sprint 1.5 · Cyber security measures (1)",
   steps: ["Bad and good traffic arrive from the internet.", "The firewall blocks the untrusted traffic.", "The antivirus scans files and removes malware.", "Updates fix the weak spots."],
   lesson: [
     "<b>Cyber security</b> means protecting digital data and devices from people who should not use, change or destroy them. Data includes files, photos, emails, messages and databases.",
     { h: "Firewall" },
     "A <b>firewall</b> is like a guard at the door. It blocks untrusted sources from reaching your private network.",
     { h: "Antivirus" },
     "<b>Antivirus</b> software has a database of known malware. If a new program matches, it stops it from doing harm. Keep it up to date.",
     { h: "Software updates" },
     "Old software has weak spots. Updates fix bugs and security problems. Always get updates from <b>trusted websites</b>.",
     { tip: "Use all three together: firewall, antivirus and updates." }
   ],
   mcq: [
     { q: "What does cyber security protect?", o: ["Digital data and devices", "Paper books only", "Only the printer", "Only the classroom"], why: "It protects data and devices from unauthorised access." },
     { q: "What does a firewall do?", o: ["Blocks untrusted sources from the private network", "Makes the screen brighter", "Plays music", "Prints files"], why: "It acts like a shield or guard." },
     { q: "What does antivirus software use to spot malware?", o: ["A database of known malware", "The weather", "A printer", "A calendar"], why: "It compares programs with known malware definitions." },
     { q: "Why should you install software updates?", o: ["They fix bugs and security problems", "They remove all your files", "They make the screen smaller", "They are not useful"], why: "Outdated software is easier to attack." },
     { q: "Where should you get updates from?", o: ["Trusted websites", "Random pop-ups", "Emails from strangers", "Any link"], why: "Fake updates can contain malware." }
   ],
   written: { q: "Explain how a firewall and antivirus software keep a computer safe.", model: "A firewall works like a guard. It checks the traffic coming into the network and blocks untrusted sources so that attackers cannot get in. Antivirus software scans programs and files and compares them with a database of known malware. If it finds a match, it stops or removes the program before it can do harm.", check: ["Firewall blocks untrusted traffic", "Antivirus scans or uses a database of known malware", "Says it stops or removes harm"] } },

 { id: "n6", title: "Passwords, MFA, encryption and backups", anim: "auth", path: "Sprint 1.5 · Cyber security measures (2)",
   steps: ["Make a strong password: long, with capitals, numbers and symbols.", "Add a second check with multi-factor authentication.", "Encryption scrambles data so only a key can unlock it.", "Backups keep a safe copy if something goes wrong."],
   lesson: [
     { h: "Strong passwords" },
     "A strong password has <b>more than ten characters</b> with letters, numbers, symbols and at least one capital letter.",
     { h: "Multi-factor authentication (MFA)" },
     "MFA uses <b>two or more</b> ways to prove who you are, for example a password plus a code sent to your phone, a fingerprint or a security token.",
     { h: "Encryption and backups" },
     "<b>Encryption</b> changes data into a form that cannot be read. Only someone with the <b>key</b> can decrypt it. A <b>backup</b> is a copy of your data. Keep it encrypted, so you do not lose data in a crash or malware attack.",
     { h: "Training and response" },
     "Most attacks succeed because people do not know the dangers, so <b>awareness training</b> helps. An <b>incident response plan</b> says who to tell and what to do. An <b>audit</b> checks the reported incidents.",
     { tip: "A longer password with a mix of characters is much harder to guess than a short one." }
   ],
   mcq: [
     { q: "Which password is the strongest?", o: ["M7#kPz9!qLw2", "password", "12345", "myname"], why: "It is long and mixes capitals, small letters, numbers and symbols." },
     { q: "What does multi-factor authentication use?", o: ["Two or more ways to prove who you are", "Only one short password", "A photo of the keyboard", "A printed letter"], why: "For example, a password and a phone code." },
     { q: "What is encryption?", o: ["Changing data so it cannot be read without a key", "Deleting data", "Making data bigger", "Printing data"], why: "Only people with the key can read the data." },
     { q: "Why should you make backups?", o: ["To recover your data after a crash or attack", "To use more space", "To slow your computer", "To share your password"], why: "A backup is a safe copy." },
     { q: "What does an incident response plan tell you?", o: ["Who to report to and what to do in a security problem", "How to play a game", "How to print a page", "How to choose a wallpaper"], why: "Acting fast can stop an attack early." }
   ],
   written: { q: "Write three ways to protect your account from being used by a stranger.", model: "1. Use a strong password: more than ten characters with letters, numbers and symbols.\n2. Turn on multi-factor authentication so a code or fingerprint is needed as well.\n3. Do not click suspicious links and keep my device and apps updated.", check: ["Strong password", "MFA", "A third measure (updates, phishing awareness, encryption or backup)"] } },

 { id: "n7", title: "Security trade-offs", anim: "tradeoff", path: "Sprint 1.5 · Trade-offs",
   steps: ["Accessibility vs security: more checks are harder to use.", "Privacy vs monitoring: cameras keep people safe but record them.", "Openness vs control: filters block bad sites but also good ones.", "Cost vs security: better protection costs more."],
   lesson: [
     "Security is important, but it must not stop people from working. We always balance two things. This balance is called a <b>trade-off</b>.",
     { h: "Four trade-offs" },
     "<b>Accessibility vs security:</b> many verification steps and complex passwords protect an account but make it harder to use.<br><b>Privacy vs monitoring:</b> CCTV and digital surveillance help stop crime but can record innocent people.<br><b>Openness vs control:</b> a school web filter blocks harmful sites but can also block useful learning sites.<br><b>Cost vs security:</b> good security tools can be expensive, and free versions may not do everything.",
     { tip: "Check security rules often to keep the right balance." }
   ],
   mcq: [
     { q: "What is a trade-off in security?", o: ["Balancing two things that pull in different directions", "Selling a computer", "Deleting a file", "Buying a phone"], why: "More of one thing often means less of another." },
     { q: "Rick must complete many verification steps every time he opens his device. Which trade-off is this?", o: ["Accessibility versus security", "Cost versus colour", "Sound versus light", "Size versus weight"], why: "Higher security can make a system harder to use." },
     { q: "A school web filter blocks a useful learning website. Which trade-off is this?", o: ["Openness versus control", "Cost versus speed", "Privacy versus size", "Sound versus power"], why: "The filter keeps students safe but limits access." },
     { q: "CCTV cameras keep a street safe but record everyone. Which trade-off is this?", o: ["Privacy versus monitoring", "Cost versus battery", "Openness versus colour", "Accessibility versus sound"], why: "Monitoring helps safety but reduces privacy." },
     { q: "Why do some people use free security tools?", o: ["Good security can be costly, so they choose a cheaper one", "Free tools are always the best", "They do not want any security", "Free tools never have limits"], why: "Cost versus security is a real trade-off." }
   ],
   written: { q: "Choose one security trade-off and explain it with an example.", model: "Accessibility versus security. If a person uses multi-factor authentication and a very complex password, their account is very safe, but they must do many steps every time they log in and they may forget the password. So their work is slower. We need a balance between safety and ease of use.", check: ["Names one trade-off", "Gives an example", "Explains both sides (what is gained and what is lost)"] } }
] }
] };
