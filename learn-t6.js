/* iLearn topic 6: Automated and emerging technologies (Cambridge IGCSE Computer Science 0478) */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx;
  var LESSONS = [

  // ---------- 6.1 Automated systems ----------
  { id:"6.1.1a", code:"6.1.1", title:"Sensors, microprocessors and actuators",
    concept:
      "<p>An <b>automated system</b> carries out its task <b>without human intervention</b>. It is built from three parts that work together:</p>" +
      "<ul><li><b>Sensors</b> read the environment (for example temperature or movement). They only <b>gather data</b>; they do not process it.</li><li>The <b>microprocessor</b> <b>processes</b> the data: it compares the reading with stored values.</li><li><b>Actuators</b> are the output devices that <b>carry out the action</b> (open a door, switch on a heater).</li></ul>" +
      "<p>A sensor reads <b>analogue</b> data, but the microprocessor only understands <b>digital</b> data. So an <b>analogue-to-digital converter (ADC)</b> sits between them.</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>Sensor reads the environment.</li><li>The data is converted from analogue to digital.</li><li>The data goes to the microprocessor.</li><li>The microprocessor compares it with the stored value or range.</li><li>If action is needed, a signal is sent to the actuator.</li><li>The process <b>repeats</b> until the system is switched off.</li></ol>",
    example:
      "<p><b>Central heating.</b> A temperature sensor reads 17.5 &deg;C. The ADC converts it to binary. The microprocessor compares it with the stored minimum, 20 &deg;C. It is lower, so a signal goes to the actuator that switches the heating on. This keeps repeating while the system is on.</p>",
    checks:[
      mc("In an automated system, what does the actuator do when the microprocessor sends it a signal?", "It carries out the action, such as opening a door", ["It reads the data from the environment around it","It compares the data with the values stored in memory","It converts the analogue data into digital data"], "Actuators are output devices that perform the physical action."),
      mc("Why is an analogue-to-digital converter needed in an automated system?", "Sensors give analogue data but the microprocessor needs digital data", ["Actuators will only accept analogue data as an input","The sensor is not able to read any digital values","It stores the data for the user to look at later"], "The microprocessor works in binary, so the analogue readings must be converted first."),
      tx("Describe how an automated greenhouse system keeps the temperature between 18 and 25 degrees.", [["sensor","temperature sensor"],["analogue","convert","digital","binary"],["microprocessor","processor"],["compare","stored","range","18","25"],["actuator","signal","heater","window","fan","open","switch"]], 4, "A temperature sensor reads the temperature. The analogue reading is converted to digital and sent to the microprocessor, which compares it with the stored range (18 to 25). If it is outside the range, the microprocessor sends a signal to an actuator, which switches on the heater or opens a window. The process repeats.")
    ] },

  { id:"6.1.1b", code:"6.1.1", title:"Describing an automated system: inputs, processes, outputs",
    concept:
      "<p>To describe any automated system in an exam, tell its <b>story</b> in three parts:</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li><b>Input</b>: which <b>sensor(s)</b> gather which data.</li><li><b>Process</b>: analogue data converted to digital; the microprocessor <b>compares</b> the value with the stored value or range.</li><li><b>Output</b>: a signal sent to the <b>actuator</b>, which does the action.</li></ol>" +
      "<p>Pick the sensor that fits the scenario (see the sensor table in lesson 3.2.3), and mention that the system <b>repeats</b>.</p>",
    example:
      "<p><b>Automatic doors:</b> an infra-red (or pressure) sensor detects a person; the data is converted to digital and sent to the microprocessor; the microprocessor compares it with the stored value that means &ldquo;person detected&rdquo;; if so, it signals the actuator to open the door, and keeps it open for 5 seconds after the last person is detected.</p>" +
      "<p><b>Car proximity alarm:</b> a proximity sensor measures the distance to an object; if the distance is less than the stored limit, the microprocessor signals the buzzer (output) to sound.</p>",
    checks:[
      mc("A burglar alarm uses a pressure sensor under a doormat. What does the microprocessor do with the sensor's data?", "It compares it with a stored value to decide whether to sound the alarm", ["It sounds the alarm for every single reading it gets","It stores the data and then does nothing else with it","It converts the digital data back into analogue data"], "The microprocessor compares the reading with a stored value or range and signals the actuator only when needed."),
      mc("A car has a system that switches the headlights on when it gets dark. Which sensor is best?", "Light sensor", ["Pressure sensor","Acoustic sensor","Flow sensor"], "A light sensor measures the brightness of the surroundings.")
    ] },

  { id:"6.1.2", code:"6.1.2", title:"Advantages and disadvantages of automated systems",
    concept:
      "<p>Evaluate automation by thinking about the <b>context</b>. Consider:</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Factor</th><th>Advantage</th><th>Disadvantage</th></tr>" +
      "<tr><td>Cost</td><td>Lower running costs in the long term (fewer staff)</td><td>High initial cost (equipment and software); maintenance</td></tr>" +
      "<tr><td>Safety</td><td>Removes people from dangerous places; fewer human errors</td><td>If the system fails or is hacked it can cause harm</td></tr>" +
      "<tr><td>Jobs</td><td>New jobs to maintain the system</td><td>Some people lose their jobs</td></tr>" +
      "<tr><td>Hours</td><td>Works 24/7 without tiring</td><td>Needs power; a fault can stop everything</td></tr>" +
      "<tr><td>Precision</td><td>Accurate and consistent</td><td>Cannot adapt to unexpected situations as a human can</td></tr></table>" +
      "<p>Always link your points back to the <b>scenario</b> in the question.</p>",
    example:
      "<p><b>Scenario: an auto-pilot on an aircraft.</b> Benefits: it flies precisely and does not get tired on long flights, reducing pilot workload. Drawbacks: if the sensors fail, the aircraft could be put at risk, and the initial cost is very high.</p>",
    checks:[
      mc("Which is an advantage of an automated system in a factory?", "It can work all day and night without getting tired", ["It has no initial cost","It never needs maintenance","It always creates more jobs than it removes"], "Automated systems work continuously. The other options are untrue."),
      tx("A farmer is considering installing an automated system. Give two benefits and one drawback.", [["24","all day","continuous","without rest","not tire","do not get tired","every day"],["accurate","precision","precise","errors","consistent"],["labour","fewer workers","save","staff","less time","jobs"],["cost","expensive","fail","hack","maintenance","job losses","jobs lost","lose their job","power"]], 3, "Benefits: it can work 24 hours a day without getting tired, it measures and adjusts accurately and instantly, and it saves the farmer time and labour. Drawback: the initial cost is high, it needs maintenance, or workers could lose their jobs.")
    ] },

  // ---------- 6.2 Robotics ----------
  { id:"6.2.1", code:"6.2.1", title:"What is robotics?",
    concept:
      "<p>A <b>robot</b> is a machine that <b>replicates the actions or movements of a human</b>, performing a task that a person might otherwise do.</p>" +
      "<p><b>Robotics</b> is the area of computer science that covers the <b>design, construction and operation</b> of robots.</p>" +
      "<p>A robot may be <b>controlled by a person</b>, <b>automated</b> (runs on its own) or a <b>mixture</b> of both.</p>",
    example:
      "<ul><li>A <b>drone</b> can be flown by a person or programmed to move depending on its surroundings.</li><li>A <b>car assembly robot</b> places components automatically without human help.</li><li>A <b>robot vacuum cleaner</b> cleans a room by itself.</li></ul>",
    checks:[
      mc("What is robotics?", "The design, construction and operation of robots", ["The study of how the internet works","The storage of data on servers","Writing programs for web pages"], "Robotics is the field concerned with robots."),
      mc("Which of these is a robot?", "A programmable drone that follows a route", ["A computer keyboard on a desk","A laser printer in an office","A router in a home network"], "A drone is a programmable machine that performs actions in its environment.")
    ] },

  { id:"6.2.2", code:"6.2.2", title:"Characteristics of a robot",
    concept:
      "<p>A robot has three main characteristics:</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>A <b>mechanical structure or framework</b>: the body of the robot.</li><li><b>Electrical components</b>: <b>sensors</b> (to read the environment), <b>microprocessors</b> (to take the readings and decide what to do) and <b>actuators</b> (to make the robot move).</li><li>It is <b>programmable</b>: a program can be written for it to follow.</li></ol>" +
      "<p>So a robot is built using the same parts as an automated system, plus a physical structure.</p>",
    example:
      "<p>A robot vacuum cleaner has: a <b>body</b> with wheels (mechanical structure); <b>proximity sensors</b> to detect obstacles, a <b>microprocessor</b> to decide when to turn, and motors (<b>actuators</b>) to move the wheels; and a <b>program</b> that tells it how to cover the room.</p>",
    checks:[
      mc("Which list gives the three main characteristics of a robot?", "Mechanical structure, electrical components, programmable", ["Keyboard, screen and speaker for output","Cache, clock and cores in a processor","Header, payload and trailer in a packet"], "A robot has a physical framework, sensors/processors/actuators and a program."),
      mc("What is the role of a robot's microprocessor?", "To use the sensor readings to decide the action to perform", ["To move the wheels or arms of the robot","To read the robot's surrounding environment","To act as the body of the robot itself"], "Sensors read, actuators move, and the microprocessor decides.")
    ] },

  { id:"6.2.3a", code:"6.2.3", title:"The roles robots perform",
    concept:
      "<p>Robots are used in many areas:</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Area</th><th>Examples</th></tr>" +
      "<tr><td>Industry</td><td>Car assembly lines, packing items into boxes, testing products, building tiny circuits</td></tr>" +
      "<tr><td>Transport</td><td>Self-driving cars; robots that move boxes in warehouses and factories</td></tr>" +
      "<tr><td>Agriculture</td><td>Automated tractors, planting seeds, removing weeds, adjusting growing conditions</td></tr>" +
      "<tr><td>Medicine</td><td>Robot nurses in hospitals; surgical robots (a surgeon can operate from far away)</td></tr>" +
      "<tr><td>Domestic</td><td>Robot vacuum cleaners and lawnmowers</td></tr>" +
      "<tr><td>Entertainment</td><td>Toy robots, educational robots, drones for filming</td></tr></table>",
    example:
      "<p>A surgeon in one country controls a surgical robot in a hospital in another country. A patient does not need to wait for a specialist to travel, and specialists can share their skills with many hospitals.</p>",
    checks:[
      mc("Which is an example of a robot used in agriculture?", "An automated tractor that ploughs a field", ["A robot vacuum cleaner for the home","A surgical robot used in a hospital","A toy robot dog for a child to play with"], "Automated tractors are used in farming. The others belong to domestic, medicine and entertainment."),
      mc("Which is an example of a robot used in industry?", "A robot that assembles car parts", ["A drone that films a family holiday","A robot lawnmower used in a garden","A robot nurse that visits patients"], "Car assembly is a classic industrial use.")
    ] },

  { id:"6.2.3b", code:"6.2.3", title:"Advantages and disadvantages of robots",
    concept:
      "<table class='ln-table' style='text-align:left'><tr><th>Advantages</th><th>Disadvantages</th></tr>" +
      "<tr><td>Work 24 hours a day, 7 days a week without rest</td><td>High initial cost to buy and program</td></tr>" +
      "<tr><td>More precise and consistent than humans; fewer errors</td><td>Maintenance is needed and can be costly</td></tr>" +
      "<tr><td>Can work in dangerous places (safer for people)</td><td>People lose jobs that robots now do</td></tr>" +
      "<tr><td>Perform repetitive tasks, freeing people for other work</td><td>If the program has errors, or is hacked or loses connection, harm can result</td></tr></table>" +
      "<p>A good answer applies these to the <b>context</b> (e.g. robots in a furniture factory, a domestic robot, a surgical robot).</p>",
    example:
      "<p><b>Robots replacing workers in a furniture factory.</b> Advantages: robots cut and assemble accurately, do not need breaks, can work through the night. Disadvantages: very expensive to install and maintain, and the workers lose their jobs, though some new jobs are created to maintain the robots.</p>",
    checks:[
      mc("Which is a disadvantage of using robots in industry?", "People may lose their jobs", ["They make more mistakes than humans","They can only work for eight hours","They cannot be programmed"], "Robots can replace human workers. They are more precise and can work continuously."),
      tx("Discuss one advantage and one disadvantage of using robots in a car factory.", [["24","continuous","all day","without rest","tire","faster","speed"],["accurate","precis","fewer errors","consistent","safer","dangerous","repetitive"],["cost","expensive","initial","maintenance","job","unemploy","replace workers","program","fault","break down"]], 2, "Advantage: robots can work 24 hours a day and are precise, so fewer faulty cars are made. Disadvantage: high initial cost and maintenance, and workers lose their jobs.")
    ] },

  // ---------- 6.3 Artificial intelligence ----------
  { id:"6.3.1", code:"6.3.1", title:"What is artificial intelligence?",
    concept:
      "<p><b>Artificial intelligence (AI)</b> is a branch of computer science that develops machines or programs that <b>simulate human intelligence and behaviour</b>, doing tasks that normally need human thinking.</p>" +
      "<p>Areas of AI include:</p>" +
      "<ul><li><b>Image recognition</b>: identifying objects or people in a picture,</li><li><b>Speech recognition</b>: identifying spoken words,</li><li><b>Natural language</b>: understanding commands that are not in a fixed format,</li><li><b>Computer games</b>: characters that react to the player,</li><li><b>Diagnosis systems</b>: for example medical diagnosis.</li></ul>",
    example:
      "<p>You ask a phone &ldquo;what time does the sun set today?&rdquo; or &ldquo;sunset time&rdquo;. Either way the phone works out what you mean and gives an answer. That is natural language AI. The phone is simulating how a person would understand your question.</p>",
    checks:[
      mc("What is artificial intelligence?", "Computer systems that simulate human intelligence", ["Programs that store data in the cloud","Hardware that speeds up the CPU","A network of robots and sensors"], "AI aims to make computers do tasks that normally need human thinking."),
      mc("Which of these is an example of AI?", "A system that recognises faces in photographs", ["A calculator adding two numbers","A hard disk saving a file","A printer printing a page"], "Image recognition is an AI application.")
    ] },

  { id:"6.3.2", code:"6.3.2", title:"Characteristics of AI: data, rules and reasoning",
    concept:
      "<p>An AI system can be simplified into key features:</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li><b>Collection of data</b>: from a user (e.g. speech) or from sensors (e.g. a robot's infra-red sensors).</li><li><b>A set of programmed rules</b> for using the data to make decisions (e.g. if an object is in front of the sensor, turn right).</li><li><b>Ability to reason</b>: using rules to work out new facts (all dogs eat meat; Fred is a dog; so Fred eats meat).</li><li><b>Ability to learn and adapt</b>: used by <b>machine learning</b> systems, which change their own rules.</li></ol>" +
      "<p>Not all AI learns. A computer-game character that follows fixed rules reacts to you, but is not learning.</p>",
    example:
      "<p>A robot vacuum: it <b>collects data</b> with proximity sensors, uses <b>rules</b> (&ldquo;if an obstacle is closer than 5 cm, turn&rdquo;), and can <b>reason</b> that an area has been cleaned. A more advanced model <b>learns</b> the layout of your room and adapts its route.</p>",
    checks:[
      mc("Which feature of AI means using rules to work out new facts?", "The ability to reason", ["Collection of data","Programmed rules","Output of results"], "Reasoning uses rules to reach conclusions or new facts."),
      mc("In an AI robot, what is the purpose of the programmed rules?", "To decide what action to take based on the data collected", ["To collect data from the robot's environment","To store the energy that the robot needs","To move the robot's wheels forward"], "Rules link the collected data to decisions.")
    ] },

  { id:"6.3.3a", code:"6.3.3", title:"Machine learning",
    concept:
      "<p><b>Machine learning</b> is a part of AI in which a program can <b>change its own data and rules</b> (its algorithm) based on what it learns, so that it improves with experience.</p>" +
      "<ul><li><b>Supervised learning</b>: the programmer tells the program what the data means (training with labelled examples).</li><li><b>Unsupervised learning</b>: data is input and the program finds patterns or groups by itself (for example, clustering).</li></ul>",
    example:
      "<p><b>Training image recognition (supervised).</b> Show the program thousands of pictures labelled &ldquo;dog&rdquo; or &ldquo;horse&rdquo;. It learns the characteristics of each. When given a new picture, it uses what it learned to decide. If it gets it wrong, the rules can be improved.</p>" +
      "<p><b>Chess AI.</b> The program changes its moves after each game based on which moves worked, like a human learning.</p>",
    checks:[
      mc("What is machine learning?", "A program changing its own rules and data based on experience", ["A program that is written by a machine","A robot that follows fixed rules every time","A way of storing data in the cloud"], "Machine learning systems change their own rules; a fixed-rule program does not learn."),
      tx("Describe how machine learning could be used to develop a speech recognition system.", [["train","training","examples","samples","many recordings","learn"],["spoken","words","speech","voice","recordings"],["match","identify","recognis","compare"],["improve","adapt","correct","feedback","change its","own rules","more accurate","accuracy"]], 3, "The system is trained with many recordings of spoken words, each labelled with the correct word. It learns to match sound patterns to words. When it makes mistakes, it adapts its own rules so that it recognises speech more accurately over time.")
    ] },

  { id:"6.3.3b", code:"6.3.3", title:"Expert systems",
    concept:
      "<p>An <b>expert system</b> is a system that <b>simulates the knowledge of a human expert</b> (such as a doctor or engineer). It asks the user questions and, depending on the answers, asks a different question or gives a conclusion.</p>" +
      "<p>It has four components:</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Component</th><th>Purpose</th></tr>" +
      "<tr><td><b>Knowledge base</b></td><td>A database of <b>facts</b> about the subject</td></tr>" +
      "<tr><td><b>Rule base</b></td><td>A set of <b>logical rules</b> (IF &hellip; THEN) linking the facts</td></tr>" +
      "<tr><td><b>Inference engine</b></td><td>Uses the knowledge base and rule base to <b>decide the next question</b> and work out the answer</td></tr>" +
      "<tr><td><b>User interface</b></td><td>Lets the user <b>input data</b> and outputs questions and results</td></tr></table>",
    example:
      "<p><b>Printer troubleshooting expert system.</b> &ldquo;Is the green light on?&rdquo; If NO &rarr; &ldquo;Press the power button.&rdquo; If YES &rarr; &ldquo;Is the red light on?&rdquo; &hellip; The <b>knowledge base</b> holds the facts about lights; the <b>rule base</b> says IF green light is off THEN printer has no power; the <b>inference engine</b> picks the next question.</p>" +
      "<p>Other uses: medical diagnosis, mineral prospecting, car engine fault finding.</p>",
    checks:[
      mc("Which expert system component stores the facts about a subject?", "Knowledge base", ["Rule base","Inference engine","User interface"], "The knowledge base holds facts; the rule base holds the logical rules."),
      mc("What does the inference engine do?", "Uses facts and rules to choose the next question", ["Stores all of the rules in one place","Displays the questions to the user","Collects data from a set of sensors"], "The inference engine applies the knowledge base and rule base to reach a conclusion.")
    ] }

  ];

  var TEST = {
    mcq:[
      mc("In an automated system, which component converts the sensor's analogue reading into digital data?", "An analogue-to-digital converter", ["An actuator that moves a motor","A rule base of logical rules","A router that forwards packets"], "An ADC sits between the sensor and the microprocessor."),
      mc("Which of these is a characteristic of a robot?", "It is programmable", ["It must have a keyboard","It always looks like a human","It cannot use sensors"], "Robots are programmable machines with a mechanical structure and electrical components."),
      mc("A surgeon controls a robot in another country to carry out an operation. In which area are robots being used?", "Medicine", ["Agriculture","Entertainment","Transport"], "Surgical robots are used in medicine."),
      mc("Which type of learning is used when a programmer labels training images as 'cat' or 'dog'?", "Supervised learning", ["Unsupervised learning","Clustering","Reasoning"], "In supervised learning the data is labelled so the program knows what it means."),
      mc("Which part of an expert system contains logical IF-THEN rules?", "Rule base", ["Knowledge base","User interface","Inference engine"], "The rule base links facts through logical rules.")
    ],
    typed:[
      { q:"Describe how an automatic door that opens when a person approaches uses a sensor, a microprocessor and an actuator.", groups:[["sensor","infra-red","pressure","motion"],["detect","reads","senses","measures"],["digital","convert","analogue"],["microprocessor","processor"],["compare","stored","value"],["actuator","signal","open"]], need:4, model:"A sensor (infra-red or pressure) detects a person. The analogue data is converted to digital and sent to the microprocessor, which compares it with the stored value. If a person is detected it sends a signal to the actuator, which opens the door." },
      { q:"State the four components of an expert system and give the purpose of any two.", groups:[["knowledge base"],["rule base"],["inference engine"],["user interface","interface"],["facts"],["rules","logical"]], need:4, model:"The knowledge base (facts), the rule base (logical rules linking the facts), the inference engine (decides the next question and the answer) and the user interface (lets the user input data and see output)." }
    ]
  };

  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat(LESSONS);
  (root.ILEARN_TESTS = root.ILEARN_TESTS || {})[6] = TEST;
})(typeof window !== "undefined" ? window : this);
