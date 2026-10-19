/* iLearn A Level topic 18: Artificial intelligence (Cambridge 9618, section 18)
   Textbook: Hodder "Cambridge International AS & A Level Computer Science", chapter 18 (pages 425-449).
   Past-paper style: 9618/31 Q9 (supervised v unsupervised), 9618/32 Q9 (deep learning, A* v Dijkstra), 9618/33 Q9 (regression).
   The Dijkstra and A* tables on this page are produced by running the algorithms in code, not typed by hand. */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx, fill = root.ILQ.fill;
  function tbl(heads, rows){
    return "<table class='ln-table'><tr>" + heads.map(function(h){ return "<th>" + h + "</th>"; }).join("") + "</tr>" +
      rows.map(function(r){ return "<tr>" + r.map(function(c){ return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
  }
  function pre(s){ return "<pre class='ln-pre'>" + s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</pre>"; }
  function steps(list){ return "<ol>" + list.map(function(s){ return "<li>" + s + "</li>"; }).join("") + "</ol>"; }

  /* ---------- graph used for Dijkstra (the textbook's route map, vertices A to G) ---------- */
  var EDGES1 = [["A","B",5],["A","C",6],["B","D",4],["B","E",6],["C","E",7],["C","F",6],["D","E",11],["D","G",12],["E","F",5],["E","G",6],["F","G",8]];
  function adj(edges){
    var g = {};
    edges.forEach(function(e){ (g[e[0]] = g[e[0]] || {})[e[1]] = e[2]; (g[e[1]] = g[e[1]] || {})[e[0]] = e[2]; });
    return g;
  }
  function dijkstra(g, start){
    var names = Object.keys(g).sort(), work = {}, fin = {}, prev = {}, order = [], log = [];
    names.forEach(function(n){ work[n] = Infinity; });
    work[start] = 0;
    while(order.length < names.length){
      var best = null;
      names.forEach(function(n){ if(!fin[n] && work[n] < Infinity && (best === null || work[n] < work[best])) best = n; });
      if(best === null) break;
      fin[best] = true; order.push(best);
      var changed = [];
      Object.keys(g[best]).sort().forEach(function(m){
        if(fin[m]) return;
        var d = work[best] + g[best][m];
        if(d < work[m]){ work[m] = d; prev[m] = best; changed.push(m + " = " + d); }
      });
      log.push([order.length, best, work[best], changed.length ? changed.join(", ") : "(no changes)"]);
    }
    return { final: work, prev: prev, order: order, log: log };
  }
  function pathTo(res, end){ var p = [end]; while(res.prev[p[0]]) p.unshift(res.prev[p[0]]); return p; }
  var D1 = dijkstra(adj(EDGES1), "A"), D1PATH = pathTo(D1, "G");

  /* ---------- graph used for A*: edges and heuristic (h never over-estimates) ---------- */
  var EDGES2 = [["S","A",2],["S","B",4],["A","C",3],["A","D",6],["B","D",2],["C","G",7],["D","G",3]];
  var H2 = { S:8, A:7, B:4, C:6, D:2, G:0 };
  function astar(g, h, start, goal){
    var open = {}, closed = {}, gv = {}, prev = {}, log = [];
    open[start] = true; gv[start] = 0;
    while(Object.keys(open).length){
      var cur = null;
      Object.keys(open).sort().forEach(function(n){
        var f = gv[n] + h[n];
        if(cur === null || f < gv[cur] + h[cur] || (f === gv[cur] + h[cur] && h[n] < h[cur])) cur = n;
      });
      delete open[cur]; closed[cur] = true;
      log.push([cur, gv[cur], h[cur], gv[cur] + h[cur]]);
      if(cur === goal) break;
      Object.keys(g[cur]).sort().forEach(function(m){
        if(closed[m]) return;
        var ng = gv[cur] + g[cur][m];
        if(gv[m] === undefined || ng < gv[m]){ gv[m] = ng; prev[m] = cur; open[m] = true; }
      });
    }
    var p = [goal]; while(prev[p[0]]) p.unshift(prev[p[0]]);
    return { log: log, path: p, cost: gv[goal] };
  }
  var G2 = adj(EDGES2), A2 = astar(G2, H2, "S", "G"), D2 = dijkstra(G2, "S");

  /* tables built from the results */
  function dijTable(res){
    return tbl(["Step", "Vertex made final", "Final value", "Working values set or improved"], res.log.map(function(r){ return [r[0], "<b>" + r[1] + "</b>", r[2], r[3]]; }));
  }
  function matrix(names, edges){
    var g = adj(edges);
    return tbl([""].concat(names), names.map(function(a){ return ["<b>" + a + "</b>"].concat(names.map(function(b){ return g[a] && g[a][b] ? g[a][b] : "–"; })); }));
  }
  function adjList(names, edges){
    var g = adj(edges);
    return pre(names.map(function(a){ return a + " → " + Object.keys(g[a]).sort().map(function(b){ return b + "(" + g[a][b] + ")"; }).join(", "); }).join("\n"));
  }
  function edgeList(edges){ return edges.map(function(e){ return e[0] + "–" + e[1] + " = " + e[2]; }).join(", "); }

  var LESSONS = [

  { id:"18.1a", code:"18.1.1", title:"Graphs: vertices, edges and weights",
    concept:
      "<p>A <b>graph</b> is an abstract data type used to model a set of objects and the links between them. It is widely used in AI for route finding, networks and game states.</p>" +
      "<ul><li><b>Vertex (node)</b>: an object, e.g. a town, a junction, a router.</li><li><b>Edge (arc)</b>: a link between two vertices.</li><li><b>Weight</b>: a value on an edge, e.g. distance, time or cost.</li><li><b>Directed graph</b>: edges can only be travelled one way (shown with arrows). <b>Undirected</b>: both ways.</li></ul>" +
      "<p>A graph is stored using an <b>adjacency matrix</b> (a 2D array; the entry for row A, column B holds the weight of the edge, or 0/blank if none) or an <b>adjacency list</b> (for each vertex a list of the vertices next to it). A matrix is quick to look up but wastes space for graphs with few edges; a list uses less space for sparse graphs.</p>",
    example:
      "<p>The route map used in the next lessons has edges: " + edgeList(EDGES1) + ".</p>" +
      "<p><b>Adjacency matrix</b> (symmetrical because the graph is undirected):</p>" + matrix(["A", "B", "C", "D", "E", "F", "G"], EDGES1) +
      "<p><b>Adjacency list:</b></p>" + adjList(["A", "B", "C", "D", "E", "F", "G"], EDGES1),
    checks:[
      mc("In a graph, what is a weight?", "A value on an edge such as a distance or a time", ["The number of vertices", "The name of a vertex", "The memory used by the graph"], "Weights are costs attached to edges."),
      mc("In the matrix above, what does the entry in row A, column D show?", "No direct edge between A and D", ["The weight 4", "The weight 5", "That D is a directed vertex"], "There is no A–D edge in the list of edges, so the matrix shows –."),
      mc("Which structure lists, for each vertex, the vertices joined to it?", "Adjacency list", ["Adjacency matrix", "Stack", "Binary tree"], "An adjacency list stores the neighbours of each vertex."),
      mc("How many edges does the route map have?", "11", ["7", "9", "14"], "Count the entries in the list of edges: A–B, A–C, B–D, B–E, C–E, C–F, D–E, D–G, E–F, E–G and F–G."),
      tx("Describe what is meant by a graph as an abstract data type. [2]", [["vertices","nodes","vertex","node"],["edges","arcs","links","connections","edge"],["weight","cost","distance","directed","adjacency"]], 2, "A graph is a set of vertices (nodes) joined by edges (arcs); edges may have weights such as distance or cost and may be directed.")
    ] },

  { id:"18.1b", code:"18.1.1", title:"Dijkstra's shortest path algorithm",
    concept:
      "<p><b>Dijkstra's algorithm</b> finds the <b>shortest path from a start vertex to every other vertex</b> in a weighted graph. It does not use any idea of direction: it just always expands the closest unvisited vertex.</p>" +
      steps(["Give the start vertex a <b>final value</b> of 0.", "For each vertex joined to the vertex just made final, work out (final value + edge weight) and give it as a <b>working value</b>. If a vertex already has a working value, replace it only if the new value is <b>smaller</b>.", "Among all vertices without a final value, make the one with the <b>smallest working value</b> final.", "Repeat steps 2 and 3 until the end vertex has a final value (or all vertices are final).", "Trace the route back from the end vertex: choose the edge where the difference between the final values equals the edge weight."]),
    example:
      "<p>Shortest path from <b>A</b> to <b>G</b> on the route map (generated by running the algorithm):</p>" + dijTable(D1) +
      "<p>The final value of G is <b>" + D1.final.G + "</b>. Tracing back from G: the route is <b>" + D1PATH.join(" → ") + "</b> (check: the final values differ by exactly the edge weights: " + D1PATH.slice(1).map(function(v, i){ return D1PATH[i] + "→" + v + " = " + (D1.final[v] - D1.final[D1PATH[i]]); }).join(", ") + ").</p>" +
      "<p><b>Rule:</b> a path edge always has weight = difference between the final values at its ends.</p>" +
      "<p><b>Applications:</b> GPS and online maps, IP routing, modelling the spread of infectious diseases.</p>",
    checks:[
      mc("In Dijkstra's algorithm what is the final value of the start vertex?", "0", ["Infinity", "1", "The smallest edge weight"], "The start is zero distance from itself."),
      mc("In the example, what is the shortest distance from A to G?", String(D1.final.G), ["20", "21", "12"], "The shortest route is " + D1PATH.join("→") + " with length 5 + 6 + 6 = 17. The route via D is 21 and via F is 20."),
      mc("What is the shortest route from A to G?", D1PATH.join(" → "), ["A → C → F → G", "A → B → D → G", "A → C → E → G"], "A→B→E→G = 5 + 6 + 6 = 17; A→C→F→G = 6 + 6 + 8 = 20; A→B→D→G = 5 + 4 + 12 = 21; A→C→E→G = 6 + 7 + 6 = 19."),
      mc("Vertex E is first given the working value 11 (from B). Later C is made final with value 6. Edge C–E = 7. What happens to E's working value?", "It stays 11, because 6 + 7 = 13 is larger", ["It becomes 13", "It becomes 7", "It becomes 6"], "A working value is replaced only by a smaller one."),
      mc("What does Dijkstra's algorithm find?", "The shortest path from the start to every vertex", ["The shortest path to one chosen vertex only, ignoring the others", "The longest path in the graph", "The number of vertices"], "It can be stopped early once the end vertex is final, but it finds shortest paths to all the vertices it labels."),
      tx("Describe how Dijkstra's algorithm finds the shortest path between two vertices. [4]", [["start","0","zero"],["working value","working values","adjacent","connected","neighbour"],["smallest","lowest","shortest","minimum"],["final value","final","made final"],["trace","back","route"]], 4, "The start vertex is given a final value of 0. The vertices joined to it are given working values (final value plus edge weight), replacing an existing working value only if the new one is smaller. The unfinished vertex with the smallest working value is made final, and the process is repeated until the end vertex is final. The route is traced back from the end using the final values.")
    ] },

  { id:"18.1c", code:"18.1.1", title:"The A* algorithm",
    concept:
      "<p>Dijkstra explores in every direction, even away from the goal. <b>A*</b> adds a <b>heuristic (h)</b>: an informed guess of how far a node is from the goal (for a grid, the Manhattan distance; for a map, the straight-line distance). For each node:</p>" +
      "<ul><li><b>g</b> = the cost of the path from the start to this node</li><li><b>h</b> = estimated cost from this node to the goal (heuristic)</li><li><b>f = g + h</b> = estimated total cost through this node</li></ul>" +
      "<p>The algorithm keeps an <b>open list</b> (nodes found but not yet expanded) and a <b>closed list</b> (expanded). At each step it expands the open node with the <b>lowest f</b>; it records the previous node so the path can be traced back; it stops when the goal is taken from the open list. For the answer to be the shortest path, h must never <b>over-estimate</b> the real distance.</p>" +
      "<p><b>A* v Dijkstra:</b> A* uses heuristics (intelligent guesses) to head towards the goal and does not necessarily visit every node, so it is usually faster for a single destination. Dijkstra finds the shortest paths to all nodes.</p>",
    example:
      "<p>Graph: " + edgeList(EDGES2) + ". Heuristic h: " + Object.keys(H2).map(function(k){ return k + " = " + H2[k]; }).join(", ") + ". Find the shortest path from S to G.</p>" +
      "<p><b>A*</b> (each row is the node expanded, lowest f first):</p>" +
      tbl(["Node expanded", "g", "h", "f = g + h"], A2.log.map(function(r){ return ["<b>" + r[0] + "</b>", r[1], r[2], r[3]]; })) +
      "<p>Shortest path: <b>" + A2.path.join(" → ") + "</b>, cost <b>" + A2.cost + "</b>. A* expanded only " + A2.log.length + " nodes (" + A2.log.map(function(r){ return r[0]; }).join(", ") + ") and never needed C.</p>" +
      "<p><b>Dijkstra</b> on the same graph made " + D2.order.length + " vertices final (" + D2.order.join(", ") + ") before the answer was known for all vertices; it found the same cost for G (" + D2.final.G + ").</p>",
    checks:[
      mc("What does f equal in the A* algorithm?", "g + h", ["g − h", "g × h", "h only"], "f is the cost so far plus the estimated cost to go."),
      mc("What is the heuristic h in A*?", "An estimate of the distance from a node to the goal", ["The distance travelled so far", "The number of nodes in the graph", "The weight of the previous edge"], "It is an informed guess."),
      mc("Why is A* often faster than Dijkstra's algorithm for finding a route to one destination?", "It uses a heuristic and does not need to search all paths", ["It uses a larger memory", "It ignores the edge weights", "It always starts at the goal"], "A* heads towards the goal; it does not necessarily visit all nodes."),
      mc("In the example, what is the f value for node B when it is first reached from S (g = 4, h = 4)?", "8", ["4", "12", "16"], "f = g + h = 4 + 4."),
      mc("In the example, which route did A* find from S to G?", A2.path.join(" → "), ["S → A → C → G", "S → A → D → G", "S → B → G"], "S→B→D→G = 4 + 2 + 3 = 9. S→A→D→G = 11 and S→A→C→G = 12."),
      tx("Describe how the A* algorithm differs from Dijkstra's algorithm. [3]", [["heuristic","heuristics","intelligent guess","estimate","h value","guess"],["shortest path to all","all nodes","every node","all vertices","all paths"],["not necessarily","does not","fewer","faster","towards the goal","goal"]], 3, "A* uses a heuristic (an intelligent guess of the distance to the goal) to choose which node to expand, so it does not necessarily pass through all nodes; Dijkstra's algorithm finds the shortest path to all nodes without using a heuristic.")
    ] },

  { id:"18.1d", code:"18.1.3", title:"AI, machine learning and deep learning",
    concept:
      "<p><b>Artificial intelligence (AI)</b> is a machine that shows cognitive abilities such as problem solving, learning from examples, reasoning, speech and sight. Types of AI:</p>" +
      tbl(["Type", "Meaning"], [["<b>Narrow AI</b>", "Better than a human at one specific task (e.g. chess)"], ["<b>General AI</b>", "As good as a human at any intellectual task"], ["<b>Strong AI</b>", "Better than a human at many tasks"]]) +
      "<p><b>Machine learning (ML)</b> is a subset of AI: systems that <b>learn from data and past experience</b> without being explicitly programmed for each case. <b>Deep learning (DL)</b> is a subset of machine learning that uses <b>artificial neural networks</b> with many layers.</p>" +
      "<p>AI &#8835; machine learning &#8835; deep learning.</p>" +
      "<p><b>Examples:</b> spam filters and search engines (ML), voice assistants such as Alexa and Siri, chatbots, recommendation systems, medical image diagnosis, turning black and white photos into colour (deep learning).</p>",
    example:
      tbl(["Machine learning", "Deep learning"], [
        ["Can work with a small amount of data", "Needs very large amounts of data to train"],
        ["Features of the data are identified in advance by people", "Learns the features from the data itself"],
        ["Problem solved in modules which are then combined", "Problem solved from start to finish as one whole"],
        ["Testing can take a long time", "Testing takes less time"],
        ["Clear rules explain each decision", "Decisions are hard to explain: a 'black box'"]]) +
      "<p><b>Exam link (June 2026 Paper 3):</b> 'Identify the type of machine learning that uses artificial neural networks' (deep learning; 'machine learning' alone is not accepted as not all ML uses neural networks).</p>",
    checks:[
      mc("Which is a subset of machine learning?", "Deep learning", ["Artificial intelligence", "Compilers", "Spreadsheets"], "Deep learning uses neural networks and sits inside machine learning."),
      mc("A system is better than a human at a single task, e.g. chess. This is ...", "narrow AI", ["general AI", "strong AI", "supervised learning"], "Narrow AI has superior performance at one specific task."),
      mc("Which type of machine learning always uses artificial neural networks with many layers?", "Deep learning", ["Supervised learning", "Regression", "Reinforcement learning"], "Deep learning is the neural-network approach."),
      mc("Which statement about deep learning compared with machine learning is true?", "It needs much more data for training", ["It needs the features to be identified in advance", "Its decisions are always easy to explain", "It takes longer to test"], "Deep learning learns features itself but needs vast amounts of data."),
      tx("Describe the relationship between artificial intelligence, machine learning and deep learning. [2]", [["subset","part of","within","inside"],["machine learning","deep learning","neural network","ai"]], 2, "Machine learning is a subset of AI, and deep learning is a subset of machine learning that uses artificial neural networks.")
    ] },

  { id:"18.1e", code:"18.1.2", title:"Artificial neural networks",
    concept:
      "<p>An <b>artificial neural network (ANN)</b> is a network of interconnected <b>nodes (neurons)</b> modelled on the connections between neurons in the human brain. It is arranged in layers:</p>" +
      "<ul><li>an <b>input layer</b> that receives the data;</li><li>one or more <b>hidden layers</b> that process it (a network with many hidden layers is a <b>deep</b> network);</li><li>an <b>output layer</b> that gives the result.</li></ul>" +
      "<p>Each connection has a <b>weight</b> (a number that shows how strongly one node affects the next). A node adds up its weighted inputs and passes the result on. At the start the weights are <b>random</b>; <b>training</b> adjusts them until the output is correct (see back propagation in 18.1h).</p>" +
      "<p><b>How ANNs have helped machine learning:</b> they can learn complex, non-linear patterns (e.g. recognising faces, speech, handwriting) from large data sets without the programmer writing rules; their accuracy <b>improves with more data</b>; and they can handle unstructured data like images and sound.</p>",
    example:
      "<p>To recognise a handwritten digit, the input layer receives the 784 pixel values. The hidden layers combine pixels into strokes and shapes. The output layer has 10 nodes (0 to 9); the node with the highest value is the answer. No programmer wrote 'a 7 has a horizontal bar on top': the network learned it from thousands of labelled examples.</p>",
    checks:[
      mc("Which layers does an artificial neural network have?", "Input, hidden and output layers", ["Header, body and footer", "Application, transport and link layers", "Kernel and user layers"], "Data goes in, is processed, and comes out."),
      mc("What is the role of the weights in a neural network?", "They show how strongly one node's output affects the next node", ["They store the data permanently", "They are the names of the nodes", "They are the number of layers"], "Training adjusts the weights."),
      mc("What are the weights set to before training starts?", "Random values", ["All zero always", "The expected outputs", "The sizes of the files"], "The designer does not know the best weights at the start."),
      tx("Describe how an artificial neural network is structured. [3]", [["node","nodes","neurons","neuron"],["input layer","input","inputs"],["hidden layer","hidden layers","hidden"],["output layer","output"],["weight","weights","connections","interconnected"]], 3, "An artificial neural network is made of interconnected nodes (neurons) arranged in an input layer, one or more hidden layers and an output layer. The connections between nodes have weights that are adjusted during training.")
    ] },

  { id:"18.1f", code:"18.1.3", title:"Supervised, unsupervised and reinforcement learning",
    concept:
      "<p><b>Labelled data</b> has known target answers (e.g. photos tagged 'cat' or 'dog'). <b>Unlabelled data</b> has no answers attached.</p>" +
      tbl(["Type", "Data", "How it learns", "Example"], [
        ["<b>Supervised</b>", "<b>Labelled</b> training data (inputs and correct outputs)", "Learns the link between inputs and outputs from past data, then <b>predicts</b> outcomes for new data; checks its results against the expected output and is refined if wrong", "Marking emails spam or not; predicting house prices"],
        ["<b>Unsupervised</b>", "<b>Unlabelled</b> data with no instructions or correct answers", "Searches for <b>hidden patterns, structures, similarities or outliers</b> (e.g. clustering)", "Grouping customers with similar buying behaviour"],
        ["<b>Reinforcement</b>", "No training data", "Learns by <b>trial and error</b> using <b>reward and punishment</b> feedback to find the best action", "Game-playing systems, robots"],
        ["<b>Semi-supervised</b>", "A small amount of labelled with a large amount of unlabelled data", "Cheaper than labelling everything", "Classifying web pages found by a web crawler"]]),
    example:
      "<p><b>Exam link (June 2026 Paper 3):</b> 'Describe the difference between supervised and unsupervised learning.' The mark points: supervised uses labelled training data to predict future events from past outcomes; unsupervised uses unlabelled data with no 'right answers', searching for hidden patterns, relationships or outliers.</p>" +
      "<p><b>Remember:</b> in supervised learning the 'supervisor' is the label: a person has already provided the right answer for every training example.</p>",
    checks:[
      mc("Which type of learning uses labelled training data?", "Supervised learning", ["Unsupervised learning", "Reinforcement learning", "None of them"], "Supervised learning needs inputs with known outputs."),
      mc("A system groups customers by buying behaviour without being told any categories. This is ...", "unsupervised learning", ["supervised learning", "regression with labels", "a compiler"], "It finds hidden patterns in unlabelled data."),
      mc("Which type of learning uses reward and punishment?", "Reinforcement learning", ["Supervised learning", "Unsupervised learning", "Semi-supervised learning"], "It learns by trial and error."),
      mc("An email filter is trained with thousands of emails already marked 'spam' or 'not spam'. Which type of machine learning is this?", "Supervised learning", ["Unsupervised learning", "Reinforcement learning", "Random learning"], "The training data is labelled."),
      tx("Describe the difference between supervised and unsupervised learning. [4]", [["labelled","known outputs","correct outputs","expected outcomes"],["predict","future","past","outcomes"],["unlabelled","no labels","without labels","no instructions","no correct"],["hidden pattern","hidden patterns","relationships","structures","similarities","outliers","patterns"]], 4, "Supervised learning uses labelled training data (with the correct outputs) to predict future events from past outcomes. Unsupervised learning uses unlabelled data, with no correct answers given, to search for hidden patterns, relationships or outliers in the data.")
    ] },

  { id:"18.1g", code:"18.1.4", title:"Back propagation and regression",
    concept:
      "<p><b>Back propagation of errors</b> is how a neural network is trained:</p>" +
      steps(["The weights start as <b>random</b> values.", "Training inputs are passed through the network to give <b>actual outputs</b>.", "The actual outputs are compared with the <b>expected outputs</b> and the <b>error</b> is calculated.", "The error is passed <b>backwards</b> through the network and calculus is used to find the <b>error gradient</b>, showing how to change each weight.", "The weights are <b>adjusted</b> to reduce the error.", "Repeat until the error is <b>minimised</b> (within acceptable limits)."]) +
      "<p>Two types: <b>static</b> back propagation (maps a fixed input to a fixed output; instant) and <b>recurrent</b> back propagation (activation is fed forward until a fixed value is reached; harder to train).</p>" +
      "<p><b>Regression</b> is a <b>supervised learning</b> technique that finds a mathematical function (a best-fit line or curve) showing how <b>independent variables</b> (cause) affect a <b>dependent variable</b> (effect). It is used for <b>forecasting trends and predicting outcomes</b> (e.g. weather, sales, house prices), after being trained on past data.</p>",
    example:
      "<p>A network that predicts exam grades has the expected output 80 but gives 65. The error 15 is propagated back; the weights that contributed most are changed a little. After many rounds of training the outputs match the expected results.</p>" +
      "<p><b>Regression example:</b> a graph of hours revised (independent) against exam mark (dependent). The best-fit line is used to predict that 6 hours will give about 72 marks.</p>" +
      "<p><b>Exam link (June 2026 Paper 3):</b> 'Describe regression in machine learning' (3 marks): a supervised technique; finds a function/best-fit line; maps how independent variables influence a dependent variable; used for forecasting.</p>",
    checks:[
      mc("In back propagation, what is propagated backwards through the network?", "The error between actual and expected output", ["The input data", "The training labels only", "The network's weights as a file"], "The error is used to adjust the weights."),
      mc("What is the purpose of back propagation?", "To adjust the weights so that the output error is reduced", ["To store the network on disk", "To increase the number of layers", "To remove the input layer"], "Training repeats until errors are within acceptable limits."),
      mc("Regression is an example of ...", "supervised learning", ["unsupervised learning", "reinforcement learning only", "a hashing algorithm"], "It learns from labelled past data."),
      mc("In regression, what is the dependent variable?", "The value that is predicted or changes because of the other variables", ["Any variable the user chooses", "The input that is changed", "A variable with no effect"], "The independent variables influence it."),
      tx("Describe how back propagation is used to train an artificial neural network. [4]", [["random","weights","weightings"],["compare","difference","error","expected"],["back","backwards","propagat","fed back"],["adjust","update","change","reduce","minimis","repeat"]], 4, "The weights are given random values. The training inputs are run through the network and the actual output is compared with the expected output to find the error. The error is propagated backwards through the network and the weights are adjusted to reduce it. This is repeated until the error is minimised or acceptable.")
    ] }

  ];

  var TEST = {
    mcq:[
      mc("What is the shortest distance from A to G in the route map (edges A–B 5, A–C 6, B–D 4, B–E 6, C–E 7, C–F 6, D–E 11, D–G 12, E–F 5, E–G 6, F–G 8)?", String(D1.final.G), ["19", "20", "21"], "A→B→E→G = 17."),
      mc("What is the final value of vertex F in Dijkstra's algorithm from A?", String(D1.final.F), ["11", "6", "17"], "F is reached via C: 6 + 6 = 12. Via E it would be 11 + 5 = 16."),
      mc("In A*, f = ...", "g + h", ["g − h", "g × h", "h − g"], "Cost so far plus the heuristic estimate."),
      mc("Which statement about A* is true?", "It uses a heuristic and need not search every node", ["It always finds longer paths than Dijkstra", "It searches every node first", "It cannot be used on a graph"], "A* heads towards the goal."),
      mc("Which type of learning is trained on labelled data?", "Supervised", ["Unsupervised", "Reinforcement", "None"], "Labelled = known answers."),
      mc("What does back propagation adjust?", "The weights of the neural network", ["The input data", "The number of users", "The graph edges"], "It updates the weights to minimise the error."),
      mc("Which is a subset of machine learning?", "Deep learning", ["Narrow AI", "Strong AI", "Databases"], "Deep learning uses ANNs."),
      mc("Regression is used to ...", "predict an outcome from the relationship between variables", ["compress data", "encrypt data", "store records"], "It forecasts trends.")
    ],
    typed:[
      { q:"Explain why the A* algorithm may find a route faster than Dijkstra's algorithm. [2]", groups:[["heuristic","guess","estimate","h value"],["not all nodes","fewer nodes","towards the goal","does not search all","not necessarily","direction"]], need:2, model:"A* uses a heuristic (an estimate of the distance to the goal) to choose the next node, so it moves towards the goal and does not have to search all nodes, whereas Dijkstra's algorithm searches outwards in every direction." },
      { q:"Describe what is meant by reinforcement learning. [3]", groups:[["trial and error","trial-and-error"],["reward","punishment","feedback","positive","negative"],["no training","not trained","no labelled","best action","optimal","optimise"]], need:2, model:"Reinforcement learning has no training data. The system learns by trial and error, receiving rewards for good actions and punishments for bad ones, so it learns which actions give the best outcome." },
      { q:"State two differences between machine learning and deep learning. [2]", groups:[["neural network","neural networks","layers","ann"],["more data","large amounts of data","vast","small amount","less data"],["features","identified in advance","manually","modular","black box","explain"]], need:2, model:"Deep learning uses artificial neural networks and needs very large amounts of data, learning the features itself; other machine learning can work with less data and needs features identified in advance." }
    ]
  };

  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat(LESSONS);
  (root.ILEARN_TESTS = root.ILEARN_TESTS || {})[18] = TEST;
})(typeof window !== "undefined" ? window : this);
