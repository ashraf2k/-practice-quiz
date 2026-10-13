/* iLearn topic 3: Hardware (Cambridge IGCSE Computer Science 0478) */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx;
  var LESSONS = [

  // ---------- 3.1 Computer architecture ----------
  { id:"3.1.1", code:"3.1.1", title:"The CPU and the microprocessor",
    concept:
      "<p>The <b>CPU</b> (central processing unit) is where <b>all data and instructions are processed</b>. It works like the brain of the computer.</p>" +
      "<p>A <b>microprocessor</b> does a similar job on a smaller scale. It processes a much more limited set of instructions and is built into devices designed for one specific task, such as a washing machine, traffic light or digital alarm clock.</p>" +
      "<table class='ln-table'><tr><th></th><th>CPU</th><th>Microprocessor</th></tr><tr><th>Found in</th><td>General purpose computers (PC, laptop)</td><td>Devices with one specific task</td></tr><tr><th>Instructions</th><td>Thousands of complex instructions</td><td>A limited set</td></tr></table>",
    example:
      "<p>A laptop has a CPU because it must do many different jobs: browse the web, edit documents, play videos.</p>" +
      "<p>A washing machine has a microprocessor because it only ever controls washing: water level, temperature and drum speed.</p>",
    checks:[
      mc("What is the main role of the CPU?", "To process all the data and instructions", ["To store files permanently","To display the output on screen","To connect the computer to the internet"], "The CPU is where instructions and data are processed."),
      mc("Which device is most likely to contain a microprocessor rather than a general purpose CPU?", "A digital alarm clock", ["A gaming PC","A laptop","A file server"], "A microprocessor is built into a device that does one specific task. A digital alarm clock only keeps and shows the time.")
    ] },

  { id:"3.1.2a", code:"3.1.2", title:"Components of the CPU (Von Neumann)",
    concept:
      "<p>In the <b>Von Neumann architecture</b> data and instructions are stored in <b>RAM</b> and fetched into the CPU. The CPU contains these components:</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Component</th><th>Purpose</th></tr>" +
      "<tr><td><b>Program counter (PC)</b></td><td>A register that stores the <b>address of the next instruction</b> to be fetched</td></tr>" +
      "<tr><td><b>Memory address register (MAR)</b></td><td>Stores the <b>address in RAM</b> that is about to be read or written</td></tr>" +
      "<tr><td><b>Memory data register (MDR)</b></td><td>Holds the <b>data or instruction</b> that has just been fetched from RAM</td></tr>" +
      "<tr><td><b>Current instruction register (CIR)</b></td><td>Holds the <b>instruction currently being decoded and executed</b></td></tr>" +
      "<tr><td><b>Control unit (CU)</b></td><td><b>Decodes</b> instructions and sends <b>signals</b> to control the other components</td></tr>" +
      "<tr><td><b>Arithmetic logic unit (ALU)</b></td><td>Carries out <b>calculations and logic</b> (comparisons)</td></tr>" +
      "<tr><td><b>Accumulator (ACC)</b></td><td>A register in the ALU that stores <b>interim results</b> of calculations</td></tr></table>" +
      "<p>Components are connected by <b>buses</b>: the <b>address bus</b> carries addresses, the <b>data bus</b> carries data and instructions, and the <b>control bus</b> carries control signals from the CU.</p>",
    example:
      "<p>Think of the CU as a conductor of an orchestra. It does not play the music (calculate); it sends signals through the control bus to tell every other component when to act. The ALU is the player that does the calculations, and the ACC is a notepad where it keeps its answers while it works.</p>",
    checks:[
      mc("Which CPU component stores the address of the next instruction to be fetched?", "Program counter (PC)", ["Memory data register (MDR)","Accumulator (ACC)","Current instruction register (CIR)"], "The program counter holds the address of the next instruction."),
      mc("Which component carries out calculations and logical comparisons?", "Arithmetic logic unit (ALU)", ["Control unit (CU)","Memory address register (MAR)","Data bus"], "The ALU does the arithmetic and logic. The CU only controls and decodes.")
    ] },

  { id:"3.1.2b", code:"3.1.2", title:"The fetch stage",
    concept:
      "<p>The <b>fetch-decode-execute cycle</b> is how every instruction is processed. First, the <b>fetch</b> stage brings an instruction from RAM into the CPU:</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>The <b>PC</b> holds the address of the next instruction.</li><li>The address is copied from the PC to the <b>MAR</b> using the <b>address bus</b>.</li><li>The MAR sends the address to <b>RAM</b> (address bus) to find the instruction.</li><li>The instruction is sent from RAM to the <b>MDR</b> using the <b>data bus</b>.</li><li>The instruction is copied from the MDR to the <b>CIR</b> (in the control unit).</li><li>The PC is <b>incremented</b> so it points at the next instruction.</li></ol>" +
      "<p>Quick memory aid for the path: <b>PC &rarr; MAR &rarr; RAM &rarr; MDR &rarr; CIR</b>.</p>",
    example:
      "<table class='ln-table'><tr><th>Step</th><th>PC</th><th>MAR</th><th>MDR</th><th>CIR</th></tr>" +
      "<tr><td>Start</td><td>100</td><td></td><td></td><td></td></tr><tr><td>PC &rarr; MAR</td><td>100</td><td>100</td><td></td><td></td></tr><tr><td>RAM &rarr; MDR</td><td>100</td><td>100</td><td>ADD 5</td><td></td></tr><tr><td>MDR &rarr; CIR, PC +1</td><td>101</td><td>100</td><td>ADD 5</td><td>ADD 5</td></tr></table>",
    checks:[
      mc("During the fetch stage, which component receives the instruction directly from RAM?", "Memory data register (MDR)", ["Program counter (PC)","Memory address register (MAR)","Arithmetic logic unit (ALU)"], "The instruction travels from RAM to the MDR along the data bus, then on to the CIR."),
      mc("Which bus carries the address from the MAR to RAM?", "Address bus", ["Data bus","Control bus","USB bus"], "Addresses always travel on the address bus. Data and instructions use the data bus.")
    ] },

  { id:"3.1.2c", code:"3.1.2", title:"The decode and execute stages",
    concept:
      "<p><b>Decode:</b> the <b>control unit</b> decodes the instruction in the CIR. It uses the CPU's <b>instruction set</b> to work out what has to be done.</p>" +
      "<p><b>Execute:</b> the action is carried out.</p>" +
      "<ul><li>If a calculation or comparison is needed, the data is sent to the <b>ALU</b>, and interim results are stored in the <b>accumulator</b>.</li><li>Otherwise the action is done directly, for example opening a file or displaying a letter.</li><li>The <b>CU</b> sends signals on the <b>control bus</b> to tell all components what to do and when.</li></ul>" +
      "<p>Then the cycle starts again with the next fetch, and repeats billions of times a second.</p>",
    example:
      "<p>Instruction in the CIR: <code>ADD 5</code>.</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li><b>Decode:</b> the CU looks up ADD in the instruction set and works out it must add 5 to the stored value.</li><li><b>Execute:</b> the ALU adds 5 to the value in the ACC and stores the new total back in the ACC.</li></ol>",
    checks:[
      mc("Which component decodes an instruction during the decode stage?", "Control unit (CU)", ["Arithmetic logic unit (ALU)","Accumulator (ACC)","Program counter (PC)"], "The CU decodes the instruction, using the instruction set."),
      mc("An instruction needs two numbers added together. Which component carries out the addition and which stores the interim result?", "The ALU adds; the ACC stores the result", ["The CU adds; the MAR stores the result","The ALU adds; the MDR stores the result","The ACC adds; the ALU stores the result"], "Calculations happen in the ALU, and the accumulator (ACC) holds interim results.")
    ] },

  { id:"3.1.3a", code:"3.1.3", title:"CPU cores",
    concept:
      "<p>A <b>core</b> is a part of the CPU that contains everything needed to carry out the fetch-decode-execute cycle. A core processes <b>one instruction at a time</b>.</p>" +
      "<ul><li>Single core: 1 cycle at a time.</li><li><b>Dual core</b>: 2 cycles at the same time.</li><li><b>Quad core</b>: 4 cycles at the same time.</li></ul>" +
      "<p>More cores can <b>increase performance</b> and let the computer <b>multitask</b> (run several tasks together).</p>" +
      "<p>But performance does not always double when you double the cores. The software must be written so it can <b>share work between cores</b>, and some tasks must be done in order.</p>",
    example:
      "<p>Imagine a task that takes one worker 4 hours. Four workers who can each do part of the task at the same time could finish in about 1 hour. But if the task has steps that can only be done one after another, extra workers cannot speed it up. CPU cores behave in the same way.</p>",
    checks:[
      mc("How does having more cores usually affect CPU performance?", "More instructions can be processed at the same time", ["The clock speed of the CPU is increased automatically","The size of the cache in the CPU is increased as well","The CPU always uses less power for every single task"], "Each core can run its own fetch-decode-execute cycle, so more cores can process more instructions at once."),
      mc("A quad core CPU and a dual core CPU have the same clock speed. Which can run more fetch-decode-execute cycles at once?", "The quad core, which can run four", ["The dual core, which can run four","Both can run the same number","The quad core, which can run two"], "A quad core CPU has four cores, so it can carry out four cycles at the same time.")
    ] },

  { id:"3.1.3b", code:"3.1.3", title:"Clock speed and cache",
    concept:
      "<p><b>Clock speed</b>: the CPU's internal clock controls how fast instructions are processed. It is measured in <b>hertz</b>. One cycle per second is 1 Hz, and modern CPUs use <b>gigahertz (GHz)</b>: 1 GHz is 1 billion cycles per second. A <b>higher clock speed</b> means more instructions per second.</p>" +
      "<p><b>Cache</b>: a small, very fast store inside the CPU that keeps the <b>most frequently used instructions and data</b>. Getting data from the cache is quicker than from RAM, so a <b>larger cache</b> improves performance (up to a point).</p>" +
      "<table class='ln-table'><tr><th>Factor</th><th>Effect on performance</th></tr><tr><td>More cores</td><td>More instructions at the same time</td></tr><tr><td>Higher clock speed</td><td>More instructions per second</td></tr><tr><td>Larger cache</td><td>Less time fetching from RAM</td></tr></table>",
    example:
      "<p>A CPU with a clock speed of <b>3 GHz</b> can process 3 billion instruction cycles per second on each core. A dual core CPU running at 2.4 GHz can process 2.4 billion cycles per second on <b>each</b> core, which is 4.8 billion in total (if both cores are busy).</p>",
    checks:[
      mc("What is the purpose of the cache in a CPU?", "To store frequently used data and instructions close to the CPU", ["To store all of the user's files permanently","To control the speed of the CPU's internal clock","To decode each instruction using the control unit"], "Cache is small, fast storage inside the CPU for the most used data and instructions."),
      mc("A CPU has a clock speed of 3 GHz. What does this mean?", "It can process up to 3 billion cycles per second", ["It has three cores","It has 3 GB of cache","It can process 3 thousand instructions per second"], "1 GHz is one billion cycles per second, so 3 GHz is three billion.")
    ] },

  { id:"3.1.4", code:"3.1.4", title:"The instruction set",
    concept:
      "<p>An <b>instruction set</b> is the <b>complete list of commands</b> that a particular CPU understands and can carry out. The commands are written in <b>machine code</b> (binary).</p>" +
      "<ul><li>The <b>control unit</b> uses the instruction set to <b>decode</b> each instruction.</li><li>Every instruction in a program must be converted to machine code from the instruction set, otherwise the CPU cannot run it.</li><li>Different types of CPU can have different instruction sets, so a program built for one may not run on another.</li></ul>",
    example:
      "<p>A very small instruction set might contain: <code>LOAD</code>, <code>ADD</code>, <code>STORE</code>, <code>JUMP</code>, <code>HALT</code>. Each one has its own binary code (for example <code>0001</code> for LOAD). When the CU sees <code>0001</code> in the CIR, it looks it up in the instruction set and knows it must load a value.</p>",
    checks:[
      mc("What is an instruction set?", "All the commands a CPU can understand and process", ["The order in which a user types instructions","A list of files stored on the hard drive","The speed at which the CPU runs"], "The instruction set is every machine code command a particular CPU can carry out."),
      mc("Which CPU component uses the instruction set to work out what an instruction means?", "Control unit (CU)", ["Program counter (PC)","Memory data register (MDR)","Address bus"], "The CU decodes instructions using the instruction set.")
    ] },

  { id:"3.1.5", code:"3.1.5", title:"Embedded systems",
    concept:
      "<p>An <b>embedded system</b> is a computer system (usually a microprocessor with some memory) that is <b>built into a device</b> to perform <b>one specific function</b>.</p>" +
      "<p>Characteristics:</p>" +
      "<ul><li>Designed for a <b>dedicated task</b> (not general purpose).</li><li>Usually uses a <b>microprocessor</b>, small in size and low cost.</li><li>Its program is stored in <b>ROM</b>/firmware and does not normally change.</li><li>Often has little or no user interface.</li></ul>" +
      "<p>Examples: washing machines, microwave ovens, traffic lights, digital alarm clocks, car engine management systems, security alarms, central heating controllers, smart devices.</p>",
    example:
      "<table class='ln-table'><tr><th>Device</th><th>Single task of its embedded system</th></tr><tr><td>Washing machine</td><td>Controls the wash programme: water, temperature, drum</td></tr><tr><td>Traffic lights</td><td>Changes the lights in sequence</td></tr><tr><td>Digital alarm clock</td><td>Keeps the time and sounds the alarm</td></tr></table>",
    checks:[
      mc("Which statement describes an embedded system?", "A computer system built into a device to do one specific task", ["A general purpose computer that runs many programs","A system that is only used to store data on the internet","A set of devices connected by a network"], "Embedded systems are dedicated to one function inside a larger device."),
      mc("Which device contains an embedded system?", "A microwave oven", ["A desktop PC","A laptop","A web server"], "A microwave oven has a built-in microprocessor that controls only the cooking functions.")
    ] },

  // ---------- 3.2 Input and output devices ----------
  { id:"3.2.1", code:"3.2.1", title:"Input devices",
    concept:
      "<p>An <b>input device</b> allows <b>data to be entered into</b> a computer system. Without input, a computer would have nothing to process.</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Input device</th><th>Data it captures and an example use</th></tr>" +
      "<tr><td>Keyboard</td><td>Text and numbers typed by the user</td></tr>" +
      "<tr><td>Optical mouse</td><td>Movement and clicks, to point at items on screen</td></tr>" +
      "<tr><td>Touch screen</td><td>Touch positions. <b>Resistive</b>: pressure joins two layers. <b>Capacitive</b>: a finger changes the electric field. <b>Infra-red</b>: a finger breaks a grid of infra-red beams</td></tr>" +
      "<tr><td>Microphone</td><td>Sound, for voice calls or recording</td></tr>" +
      "<tr><td>Digital camera</td><td>Still or moving images</td></tr>" +
      "<tr><td>Scanner (2D and 3D)</td><td>2D: a flat page into an image. 3D: the shape of an object</td></tr>" +
      "<tr><td>Barcode scanner</td><td>Reads a barcode, e.g. the price at a supermarket till</td></tr>" +
      "<tr><td>QR code scanner</td><td>Reads a QR code, e.g. opens a website address</td></tr></table>",
    example:
      "<p>At a supermarket till: the <b>barcode scanner</b> reads the product barcode, the computer looks up the price, the <b>touch screen</b> lets the cashier choose options, and the screen and printer (output devices) show and print the result.</p>",
    checks:[
      mc("Which input device would be used to read the data in a barcode at a supermarket till?", "Barcode scanner", ["Microphone","Optical mouse","Laser printer"], "A barcode scanner reads the barcode so the price can be looked up."),
      mc("What is an input device used for?", "To enter data into a computer system", ["To show the results of processing","To store data permanently","To increase the speed of the CPU"], "Input devices get data into the system. Output devices show results.")
    ] },

  { id:"3.2.2", code:"3.2.2", title:"Output devices",
    concept:
      "<p>An <b>output device</b> shows or produces the <b>result of processing</b>, so that the user can see, hear or use it.</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Output device</th><th>What it outputs</th></tr>" +
      "<tr><td>LCD screen / LED screen</td><td>Images and text on a screen (LED screens use LEDs as the backlight)</td></tr>" +
      "<tr><td>LCD projector / DLP projector</td><td>An enlarged image on a wall or screen. DLP uses tiny mirrors</td></tr>" +
      "<tr><td>Inkjet printer</td><td>Prints by spraying tiny droplets of ink onto paper</td></tr>" +
      "<tr><td>Laser printer</td><td>Prints using a laser, a charged drum and toner powder; fast for large jobs</td></tr>" +
      "<tr><td>3D printer</td><td>Builds a solid object layer by layer</td></tr>" +
      "<tr><td>Speaker</td><td>Sound</td></tr>" +
      "<tr><td>Actuator</td><td>An action, usually movement, that makes another device work, e.g. opening a valve or switching on a light</td></tr></table>",
    example:
      "<p>A greenhouse system reads a temperature sensor. If it is too hot, the processor sends a signal to an <b>actuator</b> that opens a window. The actuator is an output device because it turns the result of the processing into a physical action.</p>",
    checks:[
      mc("Which output device builds a solid object one layer at a time?", "3D printer", ["Laser printer","LCD projector","Speaker"], "A 3D printer builds up a solid model in layers."),
      mc("What is the role of an actuator in an automated system?", "To carry out a physical action, such as opening a valve", ["To measure the temperature of the room or object","To store the program that the system runs","To enter data from the user into the system"], "An actuator turns the processor's output into a movement or action.")
    ] },

  { id:"3.2.3a", code:"3.2.3", title:"What a sensor is",
    concept:
      "<p>A <b>sensor</b> is a type of <b>input device</b> that captures data from its <b>immediate environment</b>. The data is <b>analogue</b> (it varies continuously, such as temperature or light). A computer can only process digital data, so the analogue readings are <b>converted to digital</b> before they are processed.</p>" +
      "<p>Sensors are usually set to take readings at <b>regular time intervals</b>, for example every second or every minute. They are used in <b>automated systems</b> such as central heating, greenhouses and burglar alarms.</p>",
    example:
      "<p>A temperature sensor in a room measures 21.4 &deg;C every 10 seconds. Each reading is converted to a digital value and compared by a microprocessor with the target temperature. If the room is too cold, the microprocessor sends a signal to switch the heater on.</p>",
    checks:[
      mc("What type of data does a sensor capture from its environment?", "Analogue data", ["Binary data only","Encrypted data","Cipher text"], "Real-world measurements such as temperature and light are analogue, and are converted to digital for the computer."),
      mc("Why must the readings from a sensor be converted before a computer processes them?", "The computer can only process digital data", ["Sensors only send letters","The computer cannot store numbers","The readings are always encrypted"], "A computer works in binary, so analogue readings must be converted to digital.")
    ] },

  { id:"3.2.3b", code:"3.2.3", title:"Choosing the right sensor",
    concept:
      "<p>You must know what each sensor measures and when it would be used.</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th>Sensor</th><th>Measures</th><th>Example use</th></tr>" +
      "<tr><td>Acoustic</td><td>Sound level</td><td>Burglar alarm detecting a breaking window</td></tr>" +
      "<tr><td>Accelerometer</td><td>Acceleration and vibration</td><td>Phone rotates its screen; airbag in a crash</td></tr>" +
      "<tr><td>Flow</td><td>Flow of liquid, gas or steam</td><td>Factory pipes</td></tr>" +
      "<tr><td>Gas</td><td>Presence/concentration of a gas</td><td>Carbon monoxide alarm</td></tr>" +
      "<tr><td>Humidity</td><td>Moisture in the air</td><td>Greenhouse, art gallery</td></tr>" +
      "<tr><td>Infra-red</td><td>Infra-red radiation</td><td>Intruder detection</td></tr>" +
      "<tr><td>Level</td><td>Level of a substance</td><td>Fuel or oil level in a car</td></tr>" +
      "<tr><td>Light</td><td>Brightness</td><td>Street lights switch on at dusk</td></tr>" +
      "<tr><td>Magnetic field</td><td>A magnetic field</td><td>Counting cars into a car park</td></tr>" +
      "<tr><td>Moisture</td><td>Water in a substance such as soil</td><td>Watering crops</td></tr>" +
      "<tr><td>pH</td><td>Acidity</td><td>Checking a river for pollution</td></tr>" +
      "<tr><td>Pressure</td><td>Force applied</td><td>Pressure pad under a door mat</td></tr>" +
      "<tr><td>Proximity</td><td>How close an object is</td><td>Robot avoiding obstacles</td></tr>" +
      "<tr><td>Temperature</td><td>Heat</td><td>Air conditioning, oven</td></tr></table>",
    example:
      "<p>For a <b>greenhouse</b>, the best sensors are <b>temperature</b> (keep plants warm), <b>humidity</b> (air moisture), <b>moisture</b> (soil water) and <b>light</b> (brightness for growth). For a <b>burglar alarm</b> you might use infra-red, pressure, acoustic or magnetic field sensors.</p>",
    checks:[
      mc("Which sensor would be used by a farmer to check how much water is in the soil?", "Moisture sensor", ["Humidity sensor","Level sensor","Acoustic sensor"], "A moisture sensor measures water in a substance such as soil. A humidity sensor measures moisture in the air."),
      mc("A phone turns its screen when the phone is rotated. Which sensor detects this?", "Accelerometer", ["Proximity sensor","pH sensor","Gas sensor"], "An accelerometer measures acceleration forces, including gravity, so it knows which way up the phone is."),
      tx("A company wants to build an automated system that switches street lights on when it becomes dark. Name the sensor that is needed and explain how it is used.", [["light"],["dark","brightness","dim","level of light"],["microprocessor","processor","compare","signal","switch on","turn on"]], 3, "A light sensor measures the brightness of the surroundings. The reading is sent to a microprocessor, which compares it with a set value. When it gets dark, the microprocessor sends a signal to switch the street lights on.")
    ] },

  // ---------- 3.3 Data storage ----------
  { id:"3.3.1a", code:"3.3.1", title:"Primary storage and RAM",
    concept:
      "<p><b>Primary storage</b> is storage that the <b>CPU can access directly</b>. There are two types: <b>RAM</b> and <b>ROM</b>.</p>" +
      "<p><b>RAM</b> (random access memory):</p>" +
      "<ul><li><b>Volatile</b>: it needs power to hold data. When the power is off, the contents are <b>lost</b>.</li><li>Stores the <b>data and programs currently in use</b>.</li><li>Its contents change constantly as the CPU processes data.</li><li>You can increase the amount of RAM by adding more.</li></ul>",
    example:
      "<p>You open a document from your hard drive. A copy of it is loaded into RAM so the CPU can work on it quickly. If the power fails before you save, the changes in RAM are lost because RAM is volatile.</p>",
    checks:[
      mc("What does it mean when RAM is described as volatile?", "Its contents are lost when the power is turned off", ["Its contents can never be changed","It is stored on a hard disk drive","It is only used when the computer starts"], "Volatile storage needs power to hold its data."),
      mc("What is stored in RAM?", "Data and programs that are currently in use", ["The BIOS that starts the computer","Files that are archived for many years","Only the operating system's backup"], "RAM holds the programs and data the CPU is working on right now.")
    ] },

  { id:"3.3.1b", code:"3.3.1", title:"ROM and comparing it with RAM",
    concept:
      "<p><b>ROM</b> (read only memory) is also primary storage.</p>" +
      "<ul><li><b>Non-volatile</b>: contents are <b>kept</b> when the power is off.</li><li>Stores the program that <b>starts the computer</b> (the <b>bootstrap</b> and <b>BIOS</b>).</li><li>The contents are <b>fixed</b> and do not normally change.</li></ul>" +
      "<table class='ln-table'><tr><th></th><th>RAM</th><th>ROM</th></tr><tr><th>Volatile?</th><td>Yes</td><td>No</td></tr><tr><th>Contents</th><td>Programs and data in use</td><td>Start-up (boot) instructions</td></tr><tr><th>Changes?</th><td>Constantly</td><td>Fixed</td></tr><tr><th>Easy to increase?</th><td>Yes</td><td>No</td></tr></table>",
    example:
      "<p>When you press the power button, the computer is empty (RAM has no data). The CPU runs the <b>bootstrap</b> program that is stored in ROM. This starts the computer and loads the operating system from secondary storage into RAM.</p>",
    checks:[
      mc("Which statement about ROM is correct?", "It is non-volatile and stores the boot-up instructions", ["It is volatile and stores files in use","It is secondary storage with moving parts","It is easily increased by adding more chips"], "ROM keeps its contents without power and holds the program that boots the computer."),
      tx("State two differences between RAM and ROM.", [["volatile","lost when","power off","loses","non-volatile","nonvolatile","retain","kept"],["currently in use","in use","boot","bios","bootstrap","start"],["change","fixed","read only","increase","add more","altered"]], 2, "RAM is volatile but ROM is non-volatile. RAM stores data and programs currently in use but ROM stores the boot-up instructions (bootstrap/BIOS). RAM contents change constantly but ROM contents are fixed.")
    ] },

  { id:"3.3.2", code:"3.3.2", title:"Secondary storage",
    concept:
      "<p><b>Secondary storage</b> is storage that the CPU does <b>not access directly</b>. Data must be copied into RAM before it can be processed.</p>" +
      "<ul><li>It is <b>non-volatile</b>: data stays when the power is off.</li><li>It holds data and programs for the <b>long term</b>, until the user deletes them.</li><li>It usually has a much <b>larger capacity</b> than RAM.</li><li>There are three types: <b>magnetic</b>, <b>optical</b> and <b>solid-state</b>.</li></ul>",
    example:
      "<table class='ln-table'><tr><th></th><th>Primary storage</th><th>Secondary storage</th></tr><tr><th>Accessed directly by CPU?</th><td>Yes</td><td>No</td></tr><tr><th>Examples</th><td>RAM, ROM</td><td>Hard disk drive, SSD, DVD, USB stick</td></tr><tr><th>Capacity</th><td>Smaller</td><td>Larger</td></tr></table>",
    checks:[
      mc("Why is secondary storage needed in a computer?", "To keep data and programs permanently when the power is off", ["To process instructions directly for the CPU at speed","To increase the clock speed of the processor","To connect the computer to a wired or wireless network"], "Secondary storage is non-volatile, so it keeps files and programs for the long term."),
      mc("Which list contains only examples of secondary storage?", "Hard disk drive, DVD, USB flash drive", ["RAM, ROM, DVD","Hard disk drive, RAM, SSD","ROM, USB flash drive, cache"], "RAM, ROM and cache are not secondary storage.")
    ] },

  { id:"3.3.3a", code:"3.3.3", title:"Magnetic storage",
    concept:
      "<p><b>Magnetic storage</b> stores data using magnetism. The main example is the <b>hard disk drive (HDD)</b>.</p>" +
      "<ul><li>It has circular <b>platters</b> that <b>spin</b>, divided into <b>tracks</b> and <b>sectors</b>.</li><li>A <b>read/write head</b> moves across the platter.</li><li>An electromagnet <b>magnetises tiny dots</b>: a magnetised dot stores <b>1</b>, a demagnetised dot stores <b>0</b>.</li></ul>" +
      "<p><b>Advantages:</b> large capacity and low cost per gigabyte. <b>Disadvantages:</b> it has <b>moving parts</b>, so it is slower, uses more power, makes noise and can be damaged if dropped.</p>",
    example:
      "<p>A desktop computer uses a 2 TB hard disk drive to store the operating system and thousands of files cheaply. A laptop that is carried around is better with a solid-state drive, because a hard disk's moving parts can be damaged by knocks.</p>",
    checks:[
      mc("In a hard disk drive, how is a binary 1 stored?", "A dot on the platter is magnetised", ["A pit is burned in the surface","A transistor is switched off","A land is left flat"], "Magnetised dots store 1 and demagnetised dots store 0. Pits and lands are optical storage."),
      mc("Why can a hard disk drive be damaged if it is dropped?", "It has moving parts such as spinning platters", ["It has no power supply of its own inside the case","It uses lasers that are easily knocked out of line","It only stores volatile data that is lost on impact"], "The platters and read/write head are moving parts that can be damaged by shock.")
    ] },

  { id:"3.3.3b", code:"3.3.3", title:"Optical storage",
    concept:
      "<p><b>Optical storage</b> uses <b>lasers</b> to read and write data on a spinning disc: <b>CD, DVD and Blu-ray</b>.</p>" +
      "<ul><li>To write, a laser <b>burns pits</b> into the surface of the disc along a <b>spiral track</b>.</li><li>The flat areas between the pits are called <b>lands</b>.</li><li>To read, a laser shines on the surface; the <b>reflection differs</b> for pits and lands, which gives the 1s and 0s.</li><li>CDs and DVDs use a <b>red laser</b>; Blu-ray uses a <b>blue laser</b>, which gives more capacity.</li></ul>" +
      "<p>It is mainly used to <b>archive</b> data or to <b>distribute</b> films, music and software cheaply. Capacity is lower than a hard disk and the discs can be scratched.</p>",
    example:
      "<p>A film company sells a film on Blu-ray. The film is burned as pits and lands on the disc. A Blu-ray player shines a blue laser over the spiral track and reads the pattern of pits and lands to play the film.</p>",
    checks:[
      mc("In optical storage, what is burned into the surface of the disc to store data?", "Pits", ["Magnetised dots","Floating gates","Platters"], "A laser burns pits; the flat areas in between are called lands."),
      mc("Which type of storage uses a laser to read and write data?", "Optical storage", ["Magnetic storage","Solid-state storage","Virtual memory"], "Optical discs (CD, DVD, Blu-ray) are read and written using lasers.")
    ] },

  { id:"3.3.3c", code:"3.3.3", title:"Solid-state (flash) storage",
    concept:
      "<p><b>Solid-state storage</b> (flash memory) has <b>no moving parts</b>. It is built from <b>semiconductor chips</b> containing a grid of <b>cells</b> made of <b>transistors</b> (a control gate and a floating gate).</p>" +
      "<ul><li>Cells start with the value <b>1</b>. When data is stored, the charge held in the floating gate changes the cell to <b>0</b>.</li><li>Examples: <b>solid-state drive (SSD)</b>, <b>USB flash drive</b>, memory card.</li></ul>" +
      "<table class='ln-table'><tr><th>Advantages</th><th>Disadvantages</th></tr><tr><td>Very fast access</td><td>More expensive per gigabyte</td></tr><tr><td>No moving parts: durable, silent, low power</td><td>Cells wear out after many writes</td></tr><tr><td>Small and light</td><td>Often lower capacity than a hard disk</td></tr></table>",
    example:
      "<p>A phone stores its apps and photos on flash memory. It is chosen because it is small and light, uses little power, is fast and survives being dropped much better than a hard disk drive.</p>",
    checks:[
      mc("Why is solid-state storage better than a hard disk drive for a portable device?", "It has no moving parts so it is more durable", ["It always has more storage capacity","It is cheaper for each gigabyte","It uses lasers to read the data"], "No moving parts means it copes with knocks, is silent and uses less power."),
      mc("Which of these is an example of solid-state storage?", "USB flash drive", ["Blu-ray disc","Hard disk drive","Magnetic tape"], "A USB flash drive stores data using flash memory chips.")
    ] },

  { id:"3.3.4", code:"3.3.4", title:"Virtual memory",
    concept:
      "<p><b>Virtual memory</b> is an extension of RAM that is created on the <b>hard drive</b> (or SSD).</p>" +
      "<ol style='margin:0 0 12px 20px;padding:0'><li>A section of the secondary storage is set aside as virtual memory.</li><li>When <b>RAM becomes full</b>, data that is not needed straight away is moved from RAM into virtual memory in blocks called <b>pages</b>.</li><li>This frees space in RAM for the data the CPU needs now.</li><li>When the moved pages are needed again, they are copied back into RAM (and other pages may be moved out).</li></ol>" +
      "<p><b>Why it is needed:</b> without it, a full RAM could make the computer <b>crash</b> or stop programs from opening. <b>Drawback:</b> secondary storage is much slower than RAM, so using lots of virtual memory makes the computer slow.</p>",
    example:
      "<p>A student opens a game, a browser with 20 tabs and a video editor on a computer with a small amount of RAM. RAM fills up, so pages from programs not being used (the browser tabs) are moved to virtual memory on the hard drive. The game keeps running smoothly. If the student clicks one of the old tabs, its pages are brought back.</p>",
    checks:[
      mc("When is virtual memory used?", "When RAM is full", ["When the computer is switched off","When a file is deleted","When the computer connects to a network"], "Virtual memory gives extra room when RAM has no space left."),
      tx("Describe how virtual memory is created and used.", [["hard drive","secondary storage","hard disk","ssd","storage"],["ram is full","ram becomes full","full","not enough ram","extension of ram"],["page","pages","section","partition","part of"],["move","transfer","swap","back","needed again","copied"]], 3, "A section of the hard drive is set aside as virtual memory. When RAM is full, pages of data that are not needed immediately are moved from RAM to virtual memory. When they are needed again they are moved back to RAM.")
    ] },

  { id:"3.3.5", code:"3.3.5", title:"Cloud storage",
    concept:
      "<p><b>Cloud storage</b> means saving data on <b>servers owned and maintained by a third-party company</b>, and reaching it through the <b>internet</b>. The data is stored <b>remotely</b>.</p>" +
      "<ul><li>The company runs very large data centres with thousands of servers, staff and security 24 hours a day.</li><li>Customers (people and businesses) pay a <b>fee</b> for the amount of storage they use.</li><li>Storing data in your own building or device is storing it <b>locally</b>.</li></ul>" +
      "<p>Many providers also keep <b>copies of the data on several servers</b>, so one failure does not lose it.</p>",
    example:
      "<p>You take a photo on your phone and it uploads to your cloud account. You can then open it from a school computer, because the photo is stored on the provider's servers, not only on your phone.</p>",
    checks:[
      mc("What is meant by cloud storage?", "Data stored on a third party's servers and accessed via the internet", ["Data stored on a hard drive inside your own computer","Data stored on weather satellites high above the Earth","Data stored only on a USB flash drive you carry around"], "Cloud storage is remote storage provided by another company."),
      mc("Which is storing data locally?", "Saving a file on your own laptop's SSD", ["Uploading a file to an online storage account","Backing up photos to a provider's data centre","Emailing a file to a friend's online mailbox"], "Local storage uses hardware that you own, in your own location.")
    ] },

  { id:"3.3.6", code:"3.3.6", title:"Cloud storage compared with local storage",
    concept:
      "<table class='ln-table' style='text-align:left'><tr><th>Cloud storage</th><th>Local storage</th></tr>" +
      "<tr><td><b>+</b> No need to buy or maintain storage hardware</td><td><b>&minus;</b> You must buy and maintain the hardware</td></tr>" +
      "<tr><td><b>+</b> Access from any device with an internet connection</td><td><b>+</b> Works without an internet connection</td></tr>" +
      "<tr><td><b>+</b> Easy to increase or decrease storage space</td><td><b>&minus;</b> Unused capacity may be wasted; upgrading means buying more</td></tr>" +
      "<tr><td><b>&minus;</b> Needs an internet connection; slow if the connection is slow</td><td><b>+</b> You control the data's security</td></tr>" +
      "<tr><td><b>&minus;</b> Ongoing fee; you rely on the provider for security and backups</td><td><b>&minus;</b> You are responsible for security and backups</td></tr></table>",
    example:
      "<p>A small online shop expects a big sale. With cloud storage it can quickly rent more space for the busy period and reduce it afterwards. A hospital storing very sensitive patient records may prefer local storage so it keeps full control of the data, as long as it has the staff to keep it secure.</p>",
    checks:[
      mc("Which is an advantage of cloud storage compared with local storage?", "Data can be accessed from anywhere with an internet connection", ["Data can be accessed without any internet connection","The user is fully in control of security","There are no fees to pay"], "Cloud data is available from any device with internet. The other options are advantages of local storage or untrue."),
      tx("Give one disadvantage of storing data in the cloud rather than locally and explain why it is a problem.", [["internet","connection","online","broadband"],["no access","cannot access","can't access","not able to access","unable","slow","fail","down","cost","fee","pay","security","hack","third party","trust","breach"]], 2, "You need an internet connection to reach your data: if the connection fails or is slow you cannot get to it. Also you pay ongoing fees and rely on a third party to keep your data secure.")
    ] },

  // ---------- 3.4 Network hardware ----------
  { id:"3.4.1", code:"3.4.1", title:"The network interface card (NIC)",
    concept:
      "<p>A <b>network</b> is two or more devices connected together. To join one, a device needs a <b>network interface card (NIC)</b>.</p>" +
      "<ul><li>The NIC is the hardware inside the device that <b>allows it to connect to a network</b>.</li><li>A <b>wired NIC</b> has a socket for a cable; a <b>wireless NIC (WNIC)</b> connects using radio waves (Wi-Fi). Most modern devices have a wireless NIC.</li><li>Each NIC has its own <b>MAC address</b>, set by the manufacturer.</li></ul>",
    example:
      "<p>A new laptop can connect to the school Wi-Fi because it contains a wireless NIC. A desktop PC with a wired NIC connects to the same network with an ethernet cable plugged into the NIC. A device with no NIC could not join the network at all.</p>",
    checks:[
      mc("What is the purpose of a network interface card (NIC)?", "To allow a device to connect to a network", ["To store the operating system","To increase the speed of the CPU","To convert sound to binary"], "Without a NIC a computer cannot join a network."),
      mc("Which statement about NICs is correct?", "A NIC can be wired or wireless", ["A NIC is only used in routers","A NIC has an IP address set by the manufacturer","A NIC must use a USB stick"], "A NIC may use a cable or Wi-Fi. The MAC address, not the IP address, is set by the manufacturer.")
    ] },

  { id:"3.4.2", code:"3.4.2", title:"MAC addresses",
    concept:
      "<p>A <b>MAC address</b> (media access control address) is a <b>unique address given to each NIC</b>. It identifies a device on a network.</p>" +
      "<ul><li>It is <b>assigned by the manufacturer</b> and is not normally changed.</li><li>It has <b>two parts</b>: the <b>manufacturer ID</b> and the <b>serial (device) ID</b>, which together make it unique.</li><li>It is written in <b>hexadecimal</b> as <b>six pairs</b> of digits, separated by colons or dashes, for example <code>34:4D:EA:89:75:B2</code>.</li><li>Data sent from a device includes its MAC address, so you can tell which device sent it.</li></ul>",
    example:
      "<p><code>34:4D:EA : 89:75:B2</code> &rarr; the first half (<code>34:4D:EA</code>) identifies the <b>manufacturer</b>; the second half (<code>89:75:B2</code>) is the <b>serial number</b> of that device. Two devices from the same maker share the first half but never the second.</p>",
    checks:[
      mc("Who assigns the MAC address of a device?", "The manufacturer", ["The router","The internet service provider","The user, each time they connect"], "The MAC address is set by the manufacturer. An IP address is assigned by the network."),
      mc("In which number system is a MAC address normally written?", "Hexadecimal", ["Binary only","Denary only","Octal"], "A MAC address is shown as six pairs of hexadecimal digits, e.g. 34:4D:EA:89:75:B2.")
    ] },

  { id:"3.4.3a", code:"3.4.3", title:"IP addresses: IPv4 and IPv6",
    concept:
      "<p>An <b>IP address</b> (internet protocol address) identifies a device on a network and is used to <b>locate it and send data to it</b>. Unlike a MAC address it is <b>assigned by the network</b> (often by the router), not the manufacturer.</p>" +
      "<table class='ln-table' style='text-align:left'><tr><th></th><th>IPv4</th><th>IPv6</th></tr><tr><th>Size</th><td>32 bits</td><td>128 bits</td></tr><tr><th>Written as</th><td>Four numbers 0-255 separated by <b>full stops</b>, e.g. <code>12.244.233.165</code></td><td>Eight groups of hexadecimal separated by <b>colons</b>, e.g. <code>2001:0db8:0000:0000:0000:ff00:0042:7879</code></td></tr><tr><th>Number of addresses</th><td>About 4.3 billion</td><td>Vastly more</td></tr></table>" +
      "<p>IPv6 was created because the available IPv4 addresses were <b>running out</b> as more devices connected.</p>",
    example:
      "<p>A phone connects to school Wi-Fi. The router gives it an IP address such as <code>192.168.1.23</code>. When the phone opens a web page, the data comes back to this IP address, so the router knows to send it to the phone.</p>",
    checks:[
      mc("Why was IPv6 created?", "There were not enough IPv4 addresses for all the devices", ["IPv4 addresses were too long for devices to store","IPv4 could not use numbers in its address at all","IPv6 addresses are easier for people to type in"], "The number of devices grew so quickly that IPv4 addresses began to run out."),
      mc("Which is a valid IPv4 address?", "172.16.254.1", ["2001:0db8:85a3::8a2e","34:4D:EA:89:75:B2","172.16.254.1.9.4"], "IPv4 is four numbers separated by full stops. The second is IPv6, the third is a MAC address.")
    ] },

  { id:"3.4.3b", code:"3.4.3", title:"Static and dynamic IP addresses",
    concept:
      "<p>An IP address can be <b>static</b> or <b>dynamic</b>.</p>" +
      "<ul><li>A <b>dynamic IP address</b> <b>changes</b>: the device may be given a different address each time it connects to the network. Most devices use dynamic addresses.</li><li>A <b>static IP address</b> <b>never changes</b> until it is changed on request. It is usually supplied by the internet service provider (ISP), and is used for devices that must always be found at the same address, such as web servers.</li></ul>",
    example:
      "<p>A school's web server has a static IP address so that the website can always be found at the same place. A student's phone has a dynamic address, which might change each time it reconnects to the Wi-Fi.</p>",
    checks:[
      mc("What is a static IP address?", "An address that stays the same every time the device connects", ["An address that changes every time it connects","An address that is set by the manufacturer of the NIC","An address that is written as six hexadecimal pairs"], "Static addresses do not change. Dynamic addresses can change each time."),
      mc("Which device is most likely to need a static IP address?", "A web server", ["A student's phone","A visitor's tablet","A smart watch"], "A web server must be found at the same address every time, so it uses a static address.")
    ] },

  { id:"3.4.4", code:"3.4.4", title:"The role of a router",
    concept:
      "<p>A <b>router</b> is a network device that <b>forwards data packets to their correct destination</b>.</p>" +
      "<ul><li>It <b>reads the destination address</b> in each packet (the IP address when sending between networks).</li><li>It decides the best pathway and <b>forwards</b> the packet.</li><li>It <b>connects a local network to the internet</b> (connected devices use it, wired or wirelessly).</li><li>In a home or school network it often <b>assigns IP addresses</b> to devices.</li><li>It has its own NIC and MAC address.</li></ul>",
    example:
      "<p>Your laptop sends a packet to a website. The packet goes to your home router, which reads the destination IP address and sends it onto the internet. Routers along the way read it again and forward it, until it reaches the web server.</p>",
    checks:[
      mc("What does a router do with each data packet it receives?", "It reads the destination address and forwards the packet", ["It encrypts the payload of every packet it gets","It stores the whole packet permanently on its disk","It converts the packet to an analogue signal first"], "A router checks the destination address in the header and sends the packet on."),
      mc("Which of these is another job of a home router?", "Assigning IP addresses to connected devices", ["Assigning MAC addresses to connected devices","Storing the user's cloud files","Compressing images"], "The router usually gives each device an IP address. MAC addresses come from the manufacturer.")
    ] }

  ];

  var TEST = {
    mcq:[
      mc("Which CPU register holds the address of the next instruction to be fetched?", "Program counter", ["Accumulator","Current instruction register","Memory data register"], "The program counter stores the address of the next instruction."),
      mc("What is the effect of increasing the number of cores in a CPU?", "More instructions can be processed at the same time", ["The cache in the CPU is always made larger","RAM then becomes non-volatile storage instead","The instruction set of the CPU gets much smaller"], "Each core can run its own fetch-decode-execute cycle."),
      mc("Which type of storage is volatile?", "RAM", ["ROM","Hard disk drive","SSD"], "RAM loses its contents when the power is turned off."),
      mc("A greenhouse needs to know how much moisture is in the soil. Which sensor is used?", "Moisture sensor", ["Humidity sensor","Pressure sensor","Infra-red sensor"], "Moisture sensors measure water in soil; humidity sensors measure it in the air."),
      mc("Which address is assigned to a NIC by the manufacturer?", "MAC address", ["Dynamic IP address","Static IP address","URL"], "The MAC address is set by the manufacturer.")
    ],
    typed:[
      { q:"Describe the fetch stage of the fetch-decode-execute cycle.", groups:[["program counter","pc"],["memory address register","mar","address bus"],["ram"],["memory data register","mdr","data bus"],["current instruction register","cir"]], need:4, model:"The program counter holds the address of the next instruction, which is sent to the memory address register along the address bus. The address is used to find the instruction in RAM. The instruction is sent along the data bus to the memory data register, and then copied to the current instruction register." },
      { q:"Explain why virtual memory is needed when RAM is full.", groups:[["ram is full","full","no space","not enough"],["crash","stop working","cannot complete","unable to","slow","freeze"],["hard drive","secondary storage","extension"],["page","move","transfer","swap"]], need:3, model:"Without virtual memory the computer may crash or not be able to run the task when RAM is full. Part of the hard drive is used as an extension to RAM, and pages of data not needed immediately are moved there to free space in RAM." }
    ]
  };

  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat(LESSONS);
  (root.ILEARN_TESTS = root.ILEARN_TESTS || {})[3] = TEST;
})(typeof window !== "undefined" ? window : this);
