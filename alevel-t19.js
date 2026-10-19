/* iLearn A Level topic 19: Computational thinking and problem-solving (Cambridge 9618, section 19)
   Textbook: Hodder "Cambridge International AS & A Level Computer Science", chapter 19 (pages 450-497).
   Past-paper style: 9618/31 Q10 (insertion sort on two arrays, O(n^2)), 9618/33 Q10 (binary search function, O(log n)),
   9618/41-43 (queue, linked list in arrays, binary tree in arrays, insertion sort).
   All traces and tables on this page are produced by running the algorithms in code. */
(function(root){
  "use strict";
  var mc = root.ILQ.mc, tx = root.ILQ.tx, fill = root.ILQ.fill;
  function tbl(heads, rows){
    return "<table class='ln-table'><tr>" + heads.map(function(h){ return "<th>" + h + "</th>"; }).join("") + "</tr>" +
      rows.map(function(r){ return "<tr>" + r.map(function(c){ return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
  }
  function pre(s){ return "<pre class='ln-pre'>" + s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</pre>"; }
  function steps(list){ return "<ol>" + list.map(function(s){ return "<li>" + s + "</li>"; }).join("") + "</ol>"; }
  var LEFT = "←";

  /* ---------- helpers that run the algorithms ---------- */
  var SORTED = [16, 19, 21, 27, 36, 42, 55, 67, 76, 89];
  function binarySearch(a, item){
    var lo = 0, hi = a.length - 1, rows = [], found = -1;
    while(lo <= hi){
      var mid = Math.floor((lo + hi) / 2);
      rows.push([lo, hi, mid, a[mid]]);
      if(a[mid] === item){ found = mid; break; }
      else if(a[mid] < item) lo = mid + 1; else hi = mid - 1;
    }
    return { rows: rows, found: found, comps: rows.length };
  }
  function linearComps(a, item){ for(var i = 0; i < a.length; i++){ if(a[i] === item) return i + 1; } return a.length; }
  var BS19 = binarySearch(SORTED, 19), BS77 = binarySearch(SORTED, 77);

  var DATA = [27, 19, 36, 42, 16, 89, 21, 17, 55];
  function bubble(list){
    var a = list.slice(), passes = [], top = a.length - 1, swapped = true, swaps = 0;
    while(swapped && top > 0){
      swapped = false;
      for(var i = 0; i < top; i++){ if(a[i] > a[i + 1]){ var t = a[i]; a[i] = a[i + 1]; a[i + 1] = t; swapped = true; swaps++; } }
      passes.push(a.slice()); top--;
    }
    return { passes: passes, swaps: swaps, result: a };
  }
  function insertion(list){
    var a = list.slice(), rows = [], moves = 0;
    for(var i = 1; i < a.length; i++){
      var key = a[i], j = i - 1;
      while(j >= 0 && a[j] > key){ a[j + 1] = a[j]; j--; moves++; }
      a[j + 1] = key;
      rows.push([i, key, a.slice()]);
    }
    return { rows: rows, moves: moves, result: a };
  }
  var BUB = bubble(DATA), INS = insertion(DATA);

  /* circular queue of size 5 */
  function makeQueue(n){ return { q: new Array(n).fill("-"), front: 0, rear: -1, len: 0, n: n }; }
  function enq(Q, x){ if(Q.len === Q.n) return false; Q.rear = (Q.rear + 1) % Q.n; Q.q[Q.rear] = x; Q.len++; return true; }
  function deq(Q){ if(Q.len === 0) return null; var x = Q.q[Q.front]; Q.q[Q.front] = "-"; Q.front = (Q.front + 1) % Q.n; Q.len--; return x; }
  function qrow(label, Q){ return [label, Q.q.join(" | "), Q.front, Q.rear, Q.len]; }
  var Q = makeQueue(5), QROWS = [];
  [["Start", null]].forEach(function(){ QROWS.push(qrow("Empty queue", Q)); });
  enq(Q, 7); QROWS.push(qrow("Enqueue 7", Q)); enq(Q, 32); QROWS.push(qrow("Enqueue 32", Q)); enq(Q, 5); QROWS.push(qrow("Enqueue 5", Q));
  deq(Q); QROWS.push(qrow("Dequeue (gives 7)", Q)); enq(Q, 9); QROWS.push(qrow("Enqueue 9", Q)); enq(Q, 12); QROWS.push(qrow("Enqueue 12", Q)); enq(Q, 4); QROWS.push(qrow("Enqueue 4 (wraps round)", Q));

  /* linked list in arrays (as in the textbook) */
  function makeLL(n){ var p = []; for(var i = 0; i < n; i++) p.push(i + 1); p[n - 1] = -1; return { d: new Array(n).fill(""), p: p, start: -1, heap: 0 }; }
  function llAdd(L, x){ if(L.heap === -1) return false; var t = L.start; L.start = L.heap; L.heap = L.p[L.heap]; L.d[L.start] = x; L.p[L.start] = t; return true; }
  function llFind(L, x){ var i = L.start; while(i !== -1){ if(L.d[i] === x) return i; i = L.p[i]; } return -1; }
  function llDelete(L, x){
    if(L.start === -1) return false;
    var idx = L.start, old = -1;
    while(idx !== -1 && L.d[idx] !== x){ old = idx; idx = L.p[idx]; }
    if(idx === -1) return false;
    var nxt = L.p[idx];
    if(old === -1) L.start = nxt; else L.p[old] = nxt;
    L.d[idx] = ""; L.p[idx] = L.heap; L.heap = idx; return true;
  }
  function llTable(L){
    return tbl(["Index", "Data", "Pointer"], L.d.map(function(d, i){ return [i, d === "" ? "&nbsp;" : d, L.p[i]]; })) + "<p>startPointer = <b>" + L.start + "</b>, heapStartPointer = <b>" + L.heap + "</b></p>";
  }
  function llOrder(L){ var out = [], i = L.start; while(i !== -1){ out.push(L.d[i]); i = L.p[i]; } return out; }
  var LL = makeLL(8);
  [27, 19, 36, 42, 16].forEach(function(x){ llAdd(LL, x); });
  var LL_BEFORE = llTable(LL), LL_ORDER1 = llOrder(LL).join(", ");
  llAdd(LL, 18); var LL_AFTERADD = llTable(LL), LL_ORDER2 = llOrder(LL).join(", ");
  llDelete(LL, 36); var LL_AFTERDEL = llTable(LL), LL_ORDER3 = llOrder(LL).join(", ");

  /* binary tree in arrays */
  function makeTree(n){ return { item: new Array(n).fill(""), l: new Array(n).fill(-1), r: new Array(n).fill(-1), root: -1, next: 0 }; }
  function treeAdd(T, x){
    var me = T.next++; T.item[me] = x;
    if(T.root === -1){ T.root = me; return; }
    var cur = T.root;
    while(true){
      if(x < T.item[cur]){ if(T.l[cur] === -1){ T.l[cur] = me; return; } cur = T.l[cur]; }
      else { if(T.r[cur] === -1){ T.r[cur] = me; return; } cur = T.r[cur]; }
    }
  }
  function inorder(T, i, out){ if(i === -1) return out; inorder(T, T.l[i], out); out.push(T.item[i]); inorder(T, T.r[i], out); return out; }
  function preorder(T, i, out){ if(i === -1) return out; out.push(T.item[i]); preorder(T, T.l[i], out); preorder(T, T.r[i], out); return out; }
  function postorder(T, i, out){ if(i === -1) return out; postorder(T, T.l[i], out); postorder(T, T.r[i], out); out.push(T.item[i]); return out; }
  function treeFind(T, x){ var cur = T.root, cmp = []; while(cur !== -1){ cmp.push(T.item[cur]); if(T.item[cur] === x) return { at: cur, path: cmp }; cur = x < T.item[cur] ? T.l[cur] : T.r[cur]; } return { at: -1, path: cmp }; }
  var TR = makeTree(9);
  DATA.forEach(function(x){ treeAdd(TR, x); });
  var TREE_TABLE = tbl(["Index", "Item", "Left", "Right"], TR.item.map(function(x, i){ return [i, x, TR.l[i], TR.r[i]]; }));
  var IN = inorder(TR, TR.root, []), PRE = preorder(TR, TR.root, []), POST = postorder(TR, TR.root, []);
  var F55 = treeFind(TR, 55), F75 = treeFind(TR, 75);

  /* recursion */
  function fact(n){ return n === 0 ? 1 : n * fact(n - 1); }
  function fib(n){ return n <= 1 ? n : fib(n - 1) + fib(n - 2); }
  var FIBS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(fib);

  var LESSONS = [

  /* ===================== 19.1 Algorithms ===================== */
  { id:"19.1a", code:"19.1.1", title:"Linear search",
    concept:
      "<p>A <b>linear search</b> checks each item in turn, from the first to the last, until the item is found or the end of the list is reached. The list <b>does not need to be sorted</b>. With n items, the worst case is n comparisons, so the time grows in proportion to n: <b>O(n)</b>.</p>" +
      pre("DECLARE MyList : ARRAY[0:9] OF INTEGER\nDECLARE Index : INTEGER\nDECLARE Found : BOOLEAN\n\nFound " + LEFT + " FALSE\nIndex " + LEFT + " 0\nOUTPUT \"Enter the item to find\"\nINPUT Item\nWHILE Index <= 9 AND NOT Found DO\n    IF MyList[Index] = Item THEN\n        Found " + LEFT + " TRUE\n    ELSE\n        Index " + LEFT + " Index + 1\n    ENDIF\nENDWHILE\nIF Found THEN\n    OUTPUT \"Found at \", Index\nELSE\n    OUTPUT \"Not found\"\nENDIF"),
    example:
      "<p>The same in Python:</p>" +
      pre("my_list = [4, 2, 8, 17, 9, 3, 7, 12, 34, 21]\nitem = int(input(\"Enter the item to find: \"))\nfound = False\nindex = 0\nwhile index < len(my_list) and not found:\n    if my_list[index] == item:\n        found = True\n    else:\n        index = index + 1\nprint(\"Found at\", index if found else \"nowhere\")") +
      "<p>Searching for 9 takes " + linearComps([4, 2, 8, 17, 9, 3, 7, 12, 34, 21], 9) + " comparisons; searching for 21 takes " + linearComps([4, 2, 8, 17, 9, 3, 7, 12, 34, 21], 21) + " (the worst case); searching for 100 also takes 10 (not found).</p>",
    checks:[
      mc("How many comparisons does a linear search need in the worst case for a list of 10 items?", "10", ["1", "4", "5"], "Every item is checked when the item is last or not in the list."),
      mc("Does a linear search need the list to be sorted?", "No", ["Yes, ascending only", "Yes, descending only", "Yes, always"], "It checks every item in order."),
      mc("What is the Big O time complexity of a linear search?", "O(n)", ["O(1)", "O(log n)", "O(n²)"], "The time grows linearly with the number of items."),
      fill("Complete the linear search loop.", "Index " + LEFT + " 0\nWHILE Index <= 9 {1} NOT Found DO\n    IF MyList[Index] {2} Item THEN\n        Found " + LEFT + " TRUE\n    ELSE\n        Index " + LEFT + " Index {3} 1\n    ENDIF\nENDWHILE", [["AND", ["OR", "NOT", "XOR"]], ["=", ["<>", "<", ">"]], ["+", ["-", "*", "DIV"]]], "Keep going while there are items left AND the item has not been found; compare for equality; move to the next index.")
    ] },

  { id:"19.1b", code:"19.1.1", title:"Binary search",
    concept:
      "<p>A <b>binary search</b> needs the data to be <b>sorted</b> (and in an array, so any item can be reached directly by its index). It compares with the <b>middle</b> item and throws away the half that cannot contain the item, repeating on the remaining half.</p>" +
      pre("FUNCTION BinarySearch(Target : INTEGER) RETURNS INTEGER\n    DECLARE Left, Right, Mid : INTEGER\n    Left " + LEFT + " 0\n    Right " + LEFT + " 9\n    WHILE Left <= Right\n        Mid " + LEFT + " (Left + Right) DIV 2\n        IF MyList[Mid] = Target THEN\n            RETURN Mid\n        ELSE\n            IF MyList[Mid] < Target THEN\n                Left " + LEFT + " Mid + 1\n            ELSE\n                Right " + LEFT + " Mid - 1\n            ENDIF\n        ENDIF\n    ENDWHILE\n    RETURN -1\nENDFUNCTION") +
      "<p>The number of comparisons grows <b>logarithmically</b>: doubling the number of items adds only one comparison. The worst case is <b>O(log n)</b>. For 1024 items the maximum is about 10 comparisons (a linear search could need 1024).</p>",
    example:
      "<p>Sorted data: " + SORTED.join(", ") + " (indexes 0 to 9). Search for <b>19</b>:</p>" +
      tbl(["Left", "Right", "Mid", "MyList[Mid]"], BS19.rows) +
      "<p>Found at index " + BS19.found + " after " + BS19.comps + " comparisons (a linear search needs " + linearComps(SORTED, 19) + ").</p>" +
      "<p>Search for <b>77</b>:</p>" + tbl(["Left", "Right", "Mid", "MyList[Mid]"], BS77.rows) +
      "<p>Not found after " + BS77.comps + " comparisons: Left becomes greater than Right, so the function returns -1.</p>" +
      "<p><b>Exam link (June 2026 Paper 3):</b> a function to search a sorted array of 1 000 000 part names, using Left, Right and Mid, returning the index or -1.</p>",
    checks:[
      mc("What condition must be true before a binary search can be used?", "The data must be sorted", ["The data must be unique", "The data must be numeric", "The list must have an even length"], "The halves are discarded using the order of the data."),
      mc("Using the binary search above on the sorted list, how many comparisons are needed to find 19?", String(BS19.comps), ["1", "4", "10"], "Mid indexes tested: " + BS19.rows.map(function(r){ return r[2]; }).join(", ") + "."),
      mc("What is the index of the first Mid tested when Left = 0 and Right = 9?", "4", ["5", "9", "0"], "(0 + 9) DIV 2 = 4."),
      mc("What is the Big O notation for the worst case of a binary search?", "O(log n)", ["O(n)", "O(n²)", "O(1)"], "The search area halves each time."),
      mc("A binary search is used on 1 000 000 items. Approximately how many comparisons are needed at most?", "20", ["1000", "500000", "10"], "2^20 = 1 048 576, so at most about 20 halvings."),
      tx("Describe how the time taken by a binary search varies with the number of items. [2]", [["log","logarithm","logarithmic","halves","half"],["increases","slowly","more slowly","only one more","doubl","grows","number of items"]], 2, "The time taken increases logarithmically as the number of items increases (O(log n)): doubling the number of items adds only one extra comparison.")
    ] },

  { id:"19.1c", code:"19.1.2", title:"Bubble sort",
    concept:
      "<p>A <b>bubble sort</b> repeatedly passes through the list, comparing <b>adjacent items</b> and swapping them if they are in the wrong order. After each pass the largest unsorted item has 'bubbled' to the end, so each pass can stop one place earlier. The sort ends when a pass makes <b>no swaps</b>.</p>" +
      pre("DECLARE Swapped : BOOLEAN\nDECLARE Top, Index, Temp : INTEGER\nTop " + LEFT + " 8\nREPEAT\n    Swapped " + LEFT + " FALSE\n    FOR Index " + LEFT + " 0 TO Top - 1\n        IF MyList[Index] > MyList[Index + 1] THEN\n            Temp " + LEFT + " MyList[Index]\n            MyList[Index] " + LEFT + " MyList[Index + 1]\n            MyList[Index + 1] " + LEFT + " Temp\n            Swapped " + LEFT + " TRUE\n        ENDIF\n    NEXT Index\n    Top " + LEFT + " Top - 1\nUNTIL NOT Swapped OR Top = 0") +
      "<p><b>Note:</b> the Swapped flag is reset to FALSE <b>before</b> each pass, not inside the FOR loop. The time complexity is <b>O(n²)</b>, and it is slow for large lists.</p>",
    example:
      "<p>Data: " + DATA.join(", ") + ". The list after each pass:</p>" +
      tbl(["Pass", "List after the pass"], BUB.passes.map(function(p, i){ return [i + 1, p.join(", ")]; })) +
      "<p>Result: " + BUB.result.join(", ") + ", using " + BUB.swaps + " swaps in " + BUB.passes.length + " passes (the last pass made no swaps, which stopped the sort).</p>",
    checks:[
      mc("What does a bubble sort compare on each step?", "Two adjacent items", ["The first and last items", "Any two random items", "The smallest and largest items"], "Adjacent items are swapped if in the wrong order."),
      mc("After the first pass of the bubble sort on " + DATA.join(", ") + ", what is the last item in the list?", String(Math.max.apply(null, DATA)), ["27", "55", "16"], "The largest item moves to the end on the first pass."),
      mc("After the first pass, the list is ...", BUB.passes[0].join(", "), [BUB.passes[1].join(", "), DATA.join(", "), BUB.result.join(", ")], "Trace the first pass, swapping adjacent items that are in the wrong order."),
      mc("How many swaps are made in total to sort " + DATA.join(", ") + "?", String(BUB.swaps), [String(BUB.swaps + 3), String(BUB.swaps - 3), "9"], "Count the swaps in all of the passes."),
      mc("What is the time complexity of a bubble sort?", "O(n²)", ["O(n)", "O(log n)", "O(1)"], "Two nested loops over the n items."),
      tx("Explain why a Swapped flag is used in a bubble sort. [2]", [["no swaps","no swap","not swapped","no items swapped","nothing swapped","no more swaps","sorted"],["stop","end","finish","terminate","exit","unnecessary","further passes","complete"]], 2, "The flag records whether any items were swapped in a pass. If no swaps were made the list is sorted, so the algorithm can stop without making unnecessary passes.")
    ] },

  { id:"19.1d", code:"19.1.2", title:"Insertion sort",
    concept:
      "<p>An <b>insertion sort</b> takes each item in turn (from the second) and <b>inserts it into its correct place</b> in the already-sorted part at the start of the list, by shifting larger items one place to the right.</p>" +
      pre("DECLARE Count, Insert, Temp : INTEGER\nFOR Count " + LEFT + " 1 TO 8\n    Temp " + LEFT + " MyList[Count]\n    Insert " + LEFT + " Count - 1\n    WHILE Insert >= 0 AND MyList[Insert] > Temp\n        MyList[Insert + 1] " + LEFT + " MyList[Insert]\n        Insert " + LEFT + " Insert - 1\n    ENDWHILE\n    MyList[Insert + 1] " + LEFT + " Temp\nNEXT Count") +
      "<p>When sorting <b>two parallel arrays</b> (for example MemberID and Names), every move and the final insertion are done on <b>both</b> arrays, comparing only on the sort key. This was the exam question in June 2026 Paper 3 (array of 500 elements, sort on MemberID).</p>" +
      "<p><b>Performance:</b> the more items, the longer it takes; it is quicker if the list is already <b>partly sorted</b>. Worst case <b>O(n²)</b>.</p>",
    example:
      "<p>Data: " + DATA.join(", ") + ". After each outer loop (the item inserted, then the list):</p>" +
      tbl(["Count", "Item inserted", "List after insertion"], INS.rows) +
      "<p>Items shifted in total: " + INS.moves + ". The bubble sort used " + BUB.swaps + " swaps on the same data. The insertion sort moves items about the same distance directly into place.</p>",
    checks:[
      mc("What does an insertion sort do with each item in turn?", "Inserts it into the correct place in the sorted part of the list", ["Swaps it with its neighbour once only", "Discards the larger half of the list", "Moves it to the end of the list"], "Items to the left are shifted along to make room."),
      mc("In the insertion sort pseudocode, what is stored in Temp?", "The item being inserted", ["The index of the last item", "The largest item", "The number of swaps"], "It holds the value while larger items are shifted right."),
      fill("Complete the inner loop of an insertion sort on MyList.", "WHILE Insert >= 0 {1} MyList[Insert] {2} Temp\n    MyList[Insert + 1] " + LEFT + " MyList[Insert]\n    Insert " + LEFT + " Insert {3} 1\nENDWHILE\nMyList[Insert + 1] " + LEFT + " Temp", [["AND", ["OR", "NOT", "THEN"]], [">", ["<", "=", "<>"]], ["-", ["+", "*", "DIV"]]], "Shift larger items right while still inside the array and the item to the left is bigger than Temp."),
      mc("After inserting the first 4 items, what is the sorted part of " + DATA.join(", ") + "?", INS.rows[2][2].slice(0, 4).join(", "), [DATA.slice(0, 4).join(", "), "19, 27, 36, 16", "16, 19, 27, 36"], "The first four items are sorted in order."),
      mc("An insertion sort and a bubble sort are used on a list that is already almost sorted. Which statement is true?", "The insertion sort is usually faster", ["The bubble sort is always faster", "They always take the same time", "The insertion sort cannot sort it"], "Few items need to be shifted."),
      mc("What is the Big O time complexity of the insertion sort in the worst case?", "O(n²)", ["O(n)", "O(log n)", "O(1)"], "Each of the n items may be compared with up to n others.")
    ] },

  { id:"19.1e", code:"19.1.3", title:"Stacks",
    concept:
      "<p>A <b>stack</b> is a <b>last in, first out (LIFO)</b> abstract data type. Items are added (<b>push</b>) and removed (<b>pop</b>) at the same end, the <b>top</b>. A stack stored in an array uses a <b>top pointer</b> (index of the top item; -1 when empty) and checks for full/empty.</p>" +
      pre("CONSTANT StackSize = 10\nDECLARE Stack : ARRAY[0:9] OF INTEGER\nDECLARE TopPointer : INTEGER\nTopPointer " + LEFT + " -1\n\nPROCEDURE Push(Item : INTEGER)\n    IF TopPointer = StackSize - 1 THEN\n        OUTPUT \"Stack is full\"\n    ELSE\n        TopPointer " + LEFT + " TopPointer + 1\n        Stack[TopPointer] " + LEFT + " Item\n    ENDIF\nENDPROCEDURE\n\nFUNCTION Pop() RETURNS INTEGER\n    IF TopPointer = -1 THEN\n        OUTPUT \"Stack is empty\"\n        RETURN -1\n    ELSE\n        Item " + LEFT + " Stack[TopPointer]\n        TopPointer " + LEFT + " TopPointer - 1\n        RETURN Item\n    ENDIF\nENDFUNCTION"),
    example:
      "<p>Python version of the same ADT:</p>" +
      pre("stack = [None] * 10\ntop = -1\n\ndef push(item):\n    global top\n    if top == len(stack) - 1:\n        print(\"Stack is full\")\n    else:\n        top += 1\n        stack[top] = item\n\ndef pop():\n    global top\n    if top == -1:\n        print(\"Stack is empty\")\n        return None\n    item = stack[top]\n    top -= 1\n    return item") +
      "<p><b>Uses:</b> undo in an editor, evaluating RPN expressions, storing return addresses for subroutine calls and recursion, back button in a browser. Push 5, push 8, pop gives <b>8</b> (the last in is the first out).</p>",
    checks:[
      mc("Items are pushed onto a stack in the order 4, 9, 2. What is returned by the first pop?", "2", ["4", "9", "Nothing"], "LIFO: the last item pushed is popped first."),
      mc("In the array stack, what value is TopPointer when the stack is empty?", "-1", ["0", "1", "10"], "No item has been stored yet, so the top pointer is before index 0."),
      mc("A stack has 10 locations (indexes 0 to 9). What is TopPointer when it is full?", "9", ["10", "0", "-1"], "The top item is at index 9."),
      mc("Which use of a stack is correct?", "Storing return addresses when subroutines are called", ["Printing documents in the order requested", "Looking up a record from its key", "Sorting a list of names"], "A stack of return addresses works LIFO as calls are nested."),
      tx("Describe how an item is removed (popped) from a stack held in an array. [3]", [["check","empty","is empty","-1"],["top pointer","pointer","top of the stack","top item"],["read","return","copy","remove","take"],["decrement","decrease","minus 1","-1","reduce","subtract"]], 3, "Check that the stack is not empty (TopPointer is not -1). Read the item at the position given by the top pointer, then decrement (reduce) the top pointer by 1 and return the item.")
    ] },

  { id:"19.1f", code:"19.1.3", title:"Queues",
    concept:
      "<p>A <b>queue</b> is a <b>first in, first out (FIFO)</b> abstract data type. Items are added at the <b>rear</b> (<b>enqueue</b>) and removed from the <b>front</b> (<b>dequeue</b>). A <b>circular queue</b> held in an array uses a <b>front pointer</b>, a <b>rear pointer</b> and a <b>count</b>; when a pointer reaches the end of the array it <b>wraps round</b> to index 0, so freed space at the start is reused.</p>" +
      pre("CONSTANT QueueSize = 5\nDECLARE Queue : ARRAY[0:4] OF INTEGER\nDECLARE FrontPointer, RearPointer, Length : INTEGER\nFrontPointer " + LEFT + " 0\nRearPointer " + LEFT + " -1\nLength " + LEFT + " 0\n\nPROCEDURE Enqueue(Item : INTEGER)\n    IF Length = QueueSize THEN\n        OUTPUT \"Queue is full\"\n    ELSE\n        IF RearPointer = QueueSize - 1 THEN\n            RearPointer " + LEFT + " 0\n        ELSE\n            RearPointer " + LEFT + " RearPointer + 1\n        ENDIF\n        Queue[RearPointer] " + LEFT + " Item\n        Length " + LEFT + " Length + 1\n    ENDIF\nENDPROCEDURE\n\nFUNCTION Dequeue() RETURNS INTEGER\n    IF Length = 0 THEN\n        OUTPUT \"Queue is empty\"\n        RETURN -1\n    ELSE\n        Item " + LEFT + " Queue[FrontPointer]\n        IF FrontPointer = QueueSize - 1 THEN\n            FrontPointer " + LEFT + " 0\n        ELSE\n            FrontPointer " + LEFT + " FrontPointer + 1\n        ENDIF\n        Length " + LEFT + " Length - 1\n        RETURN Item\n    ENDIF\nENDFUNCTION"),
    example:
      "<p>Trace of a queue of 5 places (generated by running the algorithm):</p>" +
      tbl(["Operation", "Queue contents (index 0 to 4)", "Front", "Rear", "Length"], QROWS) +
      "<p>The last enqueue wraps round: the rear pointer goes from 4 back to 0, reusing the space freed by the dequeue. <b>Uses:</b> print queues, keyboard buffers, scheduling (ready queue).</p>",
    checks:[
      mc("Items 7, 32 and 5 are added to a queue and one item is removed. Which item is removed?", "7", ["5", "32", "All three"], "FIFO: first in, first out."),
      mc("In the trace above, what is the Rear pointer after enqueuing 4 (the last operation)?", String(Q.rear), ["4", "1", "5"], "The rear pointer wrapped from the last index (4) back to 0."),
      mc("Why is a circular queue used?", "So that space freed at the front of the array can be reused", ["So that the queue can never be full", "So the items are sorted", "So the pointers are not needed"], "The pointers wrap round to index 0."),
      mc("What is the length of the queue in the trace after the last operation?", String(Q.len), ["3", "4", "6"], "Count the items: " + Q.q.join(", ") + "."),
      tx("Describe how an item is added to a circular queue in an array. [4]", [["full","check","length","count"],["rear pointer","rear","back"],["increment","add 1","+ 1","move","next","wrap","back to 0","reset","zero","0"],["store","place","write","put","add the item","insert"]], 4, "Check the queue is not full (length less than the array size). Move the rear pointer on by 1, wrapping round to 0 if it was at the end of the array. Store the item in the position given by the rear pointer and add 1 to the length.")
    ] },

  { id:"19.1g", code:"19.1.3", title:"Linked lists",
    concept:
      "<p>A <b>linked list</b> is a list where each item holds a <b>pointer</b> to the next item, so the items can be stored anywhere and a new one can be added without shifting the others. When it is implemented with two arrays:</p>" +
      "<ul><li><code>MyLinkedList[i]</code> holds the data and <code>MyLinkedListPointers[i]</code> holds the index of the next item (-1 = null pointer, end of list).</li><li><code>StartPointer</code> gives the first item (-1 when the list is empty).</li><li>The unused locations form a second linked list, the <b>heap</b>, starting at <code>HeapStartPointer</code>.</li></ul>" +
      pre("// Add an item at the start of the list\nPROCEDURE LinkedListAdd(ItemAdd : INTEGER)\n    IF HeapStartPointer = NullPointer THEN\n        OUTPUT \"Linked list full\"\n    ELSE\n        TempPointer " + LEFT + " StartPointer\n        StartPointer " + LEFT + " HeapStartPointer\n        HeapStartPointer " + LEFT + " MyLinkedListPointers[HeapStartPointer]\n        MyLinkedList[StartPointer] " + LEFT + " ItemAdd\n        MyLinkedListPointers[StartPointer] " + LEFT + " TempPointer\n    ENDIF\nENDPROCEDURE") +
      pre("FUNCTION Find(ItemSearch : INTEGER) RETURNS INTEGER\n    ItemPointer " + LEFT + " StartPointer\n    WHILE ItemPointer <> NullPointer AND MyLinkedList[ItemPointer] <> ItemSearch DO\n        ItemPointer " + LEFT + " MyLinkedListPointers[ItemPointer]\n    ENDWHILE\n    RETURN ItemPointer    // -1 if not found\nENDFUNCTION") +
      pre("PROCEDURE LinkedListDelete(ItemDelete : INTEGER)\n    IF StartPointer = NullPointer THEN\n        OUTPUT \"Linked list empty\"\n    ELSE\n        Index " + LEFT + " StartPointer\n        OldIndex " + LEFT + " NullPointer\n        WHILE Index <> NullPointer AND MyLinkedList[Index] <> ItemDelete DO\n            OldIndex " + LEFT + " Index\n            Index " + LEFT + " MyLinkedListPointers[Index]\n        ENDWHILE\n        IF Index = NullPointer THEN\n            OUTPUT \"Item not found\"\n        ELSE\n            TempPointer " + LEFT + " MyLinkedListPointers[Index]\n            MyLinkedListPointers[Index] " + LEFT + " HeapStartPointer\n            HeapStartPointer " + LEFT + " Index\n            IF OldIndex = NullPointer THEN\n                StartPointer " + LEFT + " TempPointer\n            ELSE\n                MyLinkedListPointers[OldIndex] " + LEFT + " TempPointer\n            ENDIF\n        ENDIF\n    ENDIF\nENDPROCEDURE") +
      "<p><b>Note:</b> the delete procedure handles the case where the item to delete is the <b>first</b> item (OldIndex is still the null pointer), by moving StartPointer. The textbook version does not handle this case.</p>",
    example:
      "<p>A list with 8 locations after adding 27, 19, 36, 42 and 16 in that order (each new item goes to the front):</p>" + LL_BEFORE +
      "<p>Reading from the start pointer: <b>" + LL_ORDER1 + "</b>.</p>" +
      "<p>After adding <b>18</b>:</p>" + LL_AFTERADD + "<p>List: <b>" + LL_ORDER2 + "</b>.</p>" +
      "<p>After deleting <b>36</b>: its location is returned to the heap and the pointer of the item before it in the chain (42) is changed to skip it:</p>" + LL_AFTERDEL + "<p>List: <b>" + LL_ORDER3 + "</b>.</p>",
    checks:[
      mc("In a linked list held in two arrays, what does a pointer value of -1 mean?", "There is no next item (end of the list)", ["The item is deleted", "The list is full", "The item is the largest"], "-1 is used as the null pointer."),
      mc("What is the order of the list after adding 27, 19, 36, 42, 16 and then 18 (each added at the front)?", LL_ORDER2, [LL_ORDER1, "18, 27, 19, 36, 42, 16", "16, 18, 42, 36, 19, 27"], "Each new item becomes the start of the list."),
      mc("After adding the six items above, where is 18 stored (its index)?", String(llFind(LL, 18)), ["4", "6", "0"], "Locations are taken from the heap in order 0, 1, 2, ...; 18 is the sixth item added, so it is at index 5."),
      mc("What does the heap in a linked list hold?", "The unused locations, linked together", ["The deleted program files", "The sorted data", "The first item of the list"], "The free list starts at HeapStartPointer."),
      mc("When an item is deleted from a linked list, what happens to its location?", "It is added to the heap of free locations", ["It is filled with the next item", "It is moved to the end of the array", "It is never reused"], "Its pointer is set to the old heap start and HeapStartPointer is set to its index."),
      tx("Explain why a linked list can be easier to insert items into than an array. [2]", [["no need to shift","not shift","no shifting","don't need to move","not move","without moving","does not need to move","not have to move","shifted","shift"],["pointer","pointers","change","update","adjust","next"]], 2, "Items do not need to be shifted along to make room; only the pointers are changed to include the new item.")
    ] },

  { id:"19.1h", code:"19.1.3", title:"Binary trees",
    concept:
      "<p>A <b>binary tree</b> is a hierarchical structure in which every node has at most <b>two children</b> (left and right). In an <b>ordered binary tree</b> (binary search tree): items smaller than a node go in its <b>left</b> subtree, items greater than or equal go in its <b>right</b> subtree.</p>" +
      "<p>It can be held in an array of records with fields Item, LeftPointer and RightPointer (-1 = null) plus a RootPointer and a NextFreePointer.</p>" +
      pre("TYPE Node\n    DECLARE Item : INTEGER\n    DECLARE LeftPointer : INTEGER\n    DECLARE RightPointer : INTEGER\nENDTYPE\nDECLARE MyTree : ARRAY[0:11] OF Node\n\nFUNCTION Find(ItemSearch : INTEGER) RETURNS INTEGER\n    ItemPointer " + LEFT + " RootPointer\n    WHILE ItemPointer <> NullPointer AND MyTree[ItemPointer].Item <> ItemSearch DO\n        IF ItemSearch < MyTree[ItemPointer].Item THEN\n            ItemPointer " + LEFT + " MyTree[ItemPointer].LeftPointer\n        ELSE\n            ItemPointer " + LEFT + " MyTree[ItemPointer].RightPointer\n        ENDIF\n    ENDWHILE\n    RETURN ItemPointer\nENDFUNCTION") +
      "<p><b>To insert</b>, search down as if finding the item until a null pointer is reached, store the new item in the next free node, and set that null pointer to the new node.</p>" +
      "<p><b>Traversals:</b> <b>in-order</b> (left, node, right) gives the items in <b>sorted order</b>; <b>pre-order</b> (node, left, right) is used to copy a tree; <b>post-order</b> (left, right, node) gives <b>Reverse Polish</b> when the tree holds an expression.</p>",
    example:
      "<p>Items added in the order " + DATA.join(", ") + " give this array (root pointer = " + TR.root + "):</p>" + TREE_TABLE +
      "<p>Shape: root " + TR.item[TR.root] + "; left child " + TR.item[TR.l[TR.root]] + ", right child " + TR.item[TR.r[TR.root]] + ".</p>" +
      "<p><b>In-order:</b> " + IN.join(", ") + " (sorted).<br><b>Pre-order:</b> " + PRE.join(", ") + ".<br><b>Post-order:</b> " + POST.join(", ") + ".</p>" +
      "<p>Searching for 55: nodes visited " + F55.path.join(" → ") + " (found at index " + F55.at + "). Searching for 75: nodes visited " + F75.path.join(" → ") + " (returns " + F75.at + ", not found).</p>" +
      "<p><b>Expression tree:</b> (A + B) * (C − A) has * as the root, + (A, B) on the left and − (C, A) on the right. Post-order gives <code>A B + C A − *</code>, the RPN.</p>",
    checks:[
      mc("In an ordered binary tree, where is a value smaller than the current node placed?", "In the left subtree", ["In the right subtree", "At the root", "In a new tree"], "Smaller goes left; greater or equal goes right."),
      mc("Which traversal of an ordered binary tree outputs the items in sorted order?", "In-order", ["Pre-order", "Post-order", "Level-order"], "Left, node, right gives ascending order."),
      mc("What is the in-order traversal of the tree built from " + DATA.join(", ") + "?", IN.join(", "), [PRE.join(", "), POST.join(", "), DATA.join(", ")], "In-order always gives the sorted list."),
      mc("What is the post-order traversal of the tree built from " + DATA.join(", ") + "?", POST.join(", "), [IN.join(", "), PRE.join(", "), DATA.slice().reverse().join(", ")], "Left subtree, right subtree, then the node."),
      mc("How many nodes are visited when searching for 55 in the tree above?", String(F55.path.length), ["3", "9", "1"], "Visited: " + F55.path.join(", ") + "."),
      mc("A binary tree stores the expression (A + B) * (C − A). Which traversal gives the Reverse Polish form?", "Post-order", ["In-order", "Pre-order", "Level-order"], "Post-order gives A B + C A − *."),
      tx("Describe how an item is found in an ordered binary tree. [3]", [["root","start","top"],["compare","less than","smaller","greater","larger"],["left","right"],["null","not found","end","-1","no more","leaf","found"]], 3, "Start at the root and compare the item with the current node. If it is equal it is found. If it is smaller, follow the left pointer; if it is larger, follow the right pointer. Repeat until the item is found or a null pointer is reached (not found).")
    ] },

  { id:"19.1i", code:"19.1.4", title:"Graphs, dictionaries and implementing one ADT from another",
    concept:
      "<p>An <b>abstract data type</b> is a set of data with the operations that can be performed on it, without saying how it is stored. An ADT can be <b>implemented</b> using built-in types or another ADT:</p>" +
      tbl(["ADT", "Can be implemented using"], [
        ["<b>Stack</b>", "A 1D array and a top pointer; or a linked list (push and pop at the start of the list)"],
        ["<b>Queue</b>", "A 1D array with front and rear pointers (circular); or a linked list (add at the end, remove from the front)"],
        ["<b>Linked list</b>", "Two arrays (data and pointers) with a heap of free nodes; or an array of records"],
        ["<b>Binary tree</b>", "An array of records (Item, LeftPointer, RightPointer); or linked nodes"],
        ["<b>Dictionary</b>", "Pairs of a <b>key</b> and a <b>value</b> in two parallel arrays, an array of records, or a hash table; the key is used to find the value"],
        ["<b>Graph</b>", "An adjacency matrix (2D array) or an adjacency list"]]) +
      "<p>A <b>dictionary</b> stores key–value pairs and finds a value quickly from its key (e.g. a Python <code>dict</code>). A <b>graph</b> is a non-linear structure of nodes and edges (see topic 18).</p>",
    example:
      "<p>A <b>stack implemented from a linked list</b>: push = add a node at the start of the list (the start pointer is the top); pop = read the item at the start pointer and move the start pointer to the next node.</p>" +
      pre("# a dictionary in Python\nages = {\"Aisha\": 17, \"Omar\": 16}\nages[\"Sara\"] = 17          # add a pair\nprint(ages[\"Omar\"])         # 16: look up by key\ndel ages[\"Aisha\"]           # delete a pair"),
    checks:[
      mc("Which ADT stores pairs of a key and a value?", "Dictionary", ["Stack", "Queue", "Binary tree"], "The key is used to find the value."),
      mc("Which data structure can be used to implement a stack?", "A one-dimensional array with a top pointer", ["A hash function only", "A compiler", "A page table"], "The top pointer marks the last item pushed."),
      mc("Which structure represents a graph in a program?", "An adjacency matrix", ["A circular queue", "A stack", "A text file"], "Row and column give the vertices; the entry gives the edge weight."),
      tx("Explain how a queue can be implemented using a linked list. [2]", [["add","enqueue","end","rear","back","new node","last"],["remove","dequeue","front","start","first","head"]], 2, "A new item is added at the end of the linked list (rear of the queue) and items are removed from the start of the list (front of the queue), moving the start pointer on to the next node.")
    ] },

  { id:"19.1j", code:"19.1.5", title:"Comparing algorithms: Big O notation",
    concept:
      "<p>Different algorithms for the same task can be compared by the <b>time taken</b> and the <b>memory used</b>. <b>Big O notation</b> describes how these grow as the number of data items <b>n</b> increases, in the worst case, ignoring constants.</p>" +
      tbl(["Big O", "Name", "Growth", "Example"], [
        ["O(1)", "constant", "Always the same time", "Reading an array element by index; push or pop"],
        ["O(log n)", "logarithmic", "Time rises slowly; doubling n adds one step", "Binary search"],
        ["O(n)", "linear", "Time grows in proportion to n", "Linear search"],
        ["O(n²)", "polynomial (quadratic)", "Time grows with the square of n", "Bubble sort, insertion sort (nested loops)"],
        ["O(2ⁿ)", "exponential", "Time doubles for each extra item", "Recursive Fibonacci"]]) +
      "<p>Space complexity: O(1) for a few variables; O(n) for algorithms that use an array of n items.</p>",
    example:
      "<p>How the number of steps grows (n items):</p>" +
      tbl(["n", "O(1)", "O(log₂ n)", "O(n)", "O(n²)"], [10, 100, 1000, 1024].map(function(n){ return [n, 1, Math.ceil(Math.log(n) / Math.LN2), n, n * n]; })) +
      "<p>Doubling n: O(n) doubles the time, O(n²) makes it <b>four</b> times as long, O(log n) adds one step. <b>Exam rule:</b> the notation must be completely correct, including brackets: <i>O(n²)</i> and <i>O(log n)</i>.</p>",
    checks:[
      mc("Which algorithm is O(n²)?", "Bubble sort", ["Binary search", "Linear search", "Reading one array element"], "Nested loops over n items."),
      mc("Which algorithm is O(log n)?", "Binary search", ["Linear search", "Bubble sort", "Insertion sort"], "The search area is halved each time."),
      mc("A bubble sort takes 5 seconds for 1000 items. About how long would it take for 2000 items?", "20 seconds", ["10 seconds", "5 seconds", "40 seconds"], "O(n²): doubling n makes the time four times as long."),
      mc("What does O(1) mean?", "The time taken does not depend on the number of items", ["The algorithm takes exactly one second", "The algorithm has one loop", "The algorithm uses one variable only"], "It is constant time."),
      tx("State the Big O notation of the linear search, and explain what it tells you. [2]", [[" o n "],["linear","in proportion","directly proportional","grows","number of items","increases"]], 2, "O(n): the time taken grows in direct proportion (linearly) to the number of items.")
    ] },

  /* ===================== 19.2 Recursion ===================== */
  { id:"19.2a", code:"19.2.1", title:"Recursion: base case and general case",
    concept:
      "<p>A <b>recursive</b> subroutine is one that <b>calls itself</b>. Every recursive definition needs:</p>" +
      "<ul><li>a <b>base case</b>: a solution that does not need a further recursive call (this stops the recursion);</li><li>a <b>general case</b>: the problem written in terms of a smaller version of itself, which must move <b>closer to the base case</b> at each call.</li></ul>" +
      pre("FUNCTION Factorial(Number : INTEGER) RETURNS INTEGER\n    IF Number = 0 THEN\n        RETURN 1                          // base case\n    ELSE\n        RETURN Number * Factorial(Number - 1)   // general case\n    ENDIF\nENDFUNCTION") +
      "<p>The same in Python: <code>def factorial(n): return 1 if n == 0 else n * factorial(n - 1)</code>.</p>" +
      "<p>While the function keeps calling itself it is <b>winding</b>; once the base case is reached the results are returned and combined in the <b>unwinding</b> phase.</p>",
    example:
      "<p>Tracing <code>Factorial(3)</code>:</p>" +
      tbl(["Call", "Phase", "Working"], [["Factorial(3)", "winding", "3 * Factorial(2)"], ["Factorial(2)", "winding", "2 * Factorial(1)"], ["Factorial(1)", "winding", "1 * Factorial(0)"], ["Factorial(0)", "base case", "returns 1"], ["Factorial(1)", "unwinding", "1 * 1 = 1"], ["Factorial(2)", "unwinding", "2 * 1 = 2"], ["Factorial(3)", "unwinding", "3 * 2 = " + fact(3)]]) +
      "<p>Factorial(5) = " + fact(5) + ". If the base case is missing, or the argument does not get closer to it, the function calls itself forever and the program fails with a <b>stack overflow</b>.</p>",
    checks:[
      mc("What is the purpose of the base case in a recursive function?", "It stops the recursion", ["It starts the recursion", "It stores the stack", "It repeats the general case"], "Without a base case the calls would never stop."),
      mc("What is the value of Factorial(5)?", String(fact(5)), ["60", "24", "720"], "5 × 4 × 3 × 2 × 1 × Factorial(0) = 120."),
      mc("In Factorial, which line is the general case?", "RETURN Number * Factorial(Number - 1)", ["RETURN 1", "IF Number = 0 THEN", "ENDFUNCTION"], "The function calls itself with a smaller argument."),
      mc("What happens if a recursive function has no base case?", "It calls itself until the stack overflows", ["It returns 0", "It runs once", "It behaves as a loop that ends"], "Each call adds to the stack until memory is used up."),
      tx("Define the terms base case and general case in recursion. [2]", [["stops","terminates","ends","no further call","no recursive call","does not call","solution without"],["calls itself","recursive call","smaller","closer","own definition","in terms of itself"]], 2, "The base case is the solution that does not require a further recursive call and so ends the recursion; the general case defines the solution in terms of a call to itself with a smaller problem, moving towards the base case.")
    ] },

  { id:"19.2b", code:"19.2.1", title:"Writing and tracing recursive algorithms",
    concept:
      "<p>Method for writing a recursive subroutine:</p>" +
      steps(["Decide the <b>base case</b> (the smallest problem with a known answer).", "Write the <b>general case</b> using the same subroutine on a smaller input.", "Check the input gets <b>closer to the base case</b> every time.", "Trace with a small example."]) +
      "<p><b>Examples:</b></p>" +
      pre("// Fibonacci: 0, 1, 1, 2, 3, 5, 8, ...\nFUNCTION Fib(N : INTEGER) RETURNS INTEGER\n    IF N <= 1 THEN\n        RETURN N\n    ELSE\n        RETURN Fib(N - 1) + Fib(N - 2)\n    ENDIF\nENDFUNCTION\n\n// Compound interest: Total(0) = Principal; Total(n) = Total(n-1) * Rate\nFUNCTION Total(Principal : REAL, Rate : REAL, Years : INTEGER) RETURNS REAL\n    IF Years = 0 THEN\n        RETURN Principal\n    ELSE\n        RETURN Total(Principal, Rate, Years - 1) * Rate\n    ENDIF\nENDFUNCTION") +
      "<p><b>When recursion is beneficial:</b> problems defined in terms of themselves (tree traversals, divide and conquer, factorial, Fibonacci). Recursive code is short and clear. <b>Disadvantages:</b> uses more memory (a stack frame per call), can overflow the stack, and is often slower than a loop (recursive Fibonacci repeats work: O(2ⁿ)).</p>",
    example:
      "<p>Fib(0) to Fib(9) = " + FIBS.join(", ") + ".</p>" +
      "<p>Trace of <code>Fib(4)</code>: Fib(4) = Fib(3) + Fib(2); Fib(3) = Fib(2) + Fib(1); Fib(2) = Fib(1) + Fib(0) = 1 + 0 = 1; so Fib(3) = 1 + 1 = 2; Fib(2) again = 1; Fib(4) = 2 + 1 = <b>" + fib(4) + "</b>. Note Fib(2) is calculated twice, which is why recursive Fibonacci is slow.</p>" +
      "<p><b>Recursive in-order traversal</b> of a binary tree:</p>" +
      pre("PROCEDURE InOrder(Pointer : INTEGER)\n    IF Pointer <> NullPointer THEN\n        InOrder(MyTree[Pointer].LeftPointer)\n        OUTPUT MyTree[Pointer].Item\n        InOrder(MyTree[Pointer].RightPointer)\n    ENDIF\nENDPROCEDURE"),
    checks:[
      mc("What is Fib(6) if Fib(0) = 0 and Fib(1) = 1?", String(fib(6)), ["5", "13", "21"], "0, 1, 1, 2, 3, 5, 8: Fib(6) = 8."),
      mc("A function Total(Years) returns Principal when Years = 0 and Total(Years − 1) × Rate otherwise. With Principal = 100, Rate = 2 and Years = 3, what is returned?", "800", ["600", "200", "400"], "100 × 2 × 2 × 2 = 800."),
      mc("Which is a disadvantage of recursion?", "It uses more memory because every call is stored on the stack", ["It cannot be traced", "It can only work with numbers", "It cannot have a base case"], "Each call needs a stack frame."),
      mc("When is recursion especially suitable?", "When a problem is defined in terms of a smaller version of itself, such as tree traversal", ["When simple counting is needed", "When no memory is available", "When the problem has no end condition"], "Trees and divide-and-conquer fit recursion naturally."),
      fill("Complete the recursive function to add the numbers 1 to N.", "FUNCTION SumTo(N : INTEGER) RETURNS INTEGER\n    IF N = {1} THEN\n        RETURN 0\n    ELSE\n        RETURN N {2} SumTo(N {3} 1)\n    ENDIF\nENDFUNCTION", [["0", ["1", "N", "-1"]], ["+", ["*", "-", "DIV"]], ["-", ["+", "*", "/"]]], "The base case is N = 0 (sum 0); the general case is N plus the sum to N − 1."),
      tx("Explain why a recursive function needs a base case. [2]", [["stop","terminate","end","exit","finish"],["infinite","forever","never end","stack overflow","indefinitely","keeps calling","endless"]], 2, "The base case stops the recursion. Without it the function would keep calling itself indefinitely and the stack would overflow.")
    ] },

  { id:"19.2c", code:"19.2.2", title:"How a compiler implements recursion",
    concept:
      "<p>When a subroutine is called, the system uses a <b>stack</b>. For each call a <b>stack frame</b> is pushed holding the <b>return address</b>, the <b>parameters</b> and the <b>local variables</b>. A recursive function therefore has several frames on the stack at the same time, one for each unfinished call.</p>" +
      steps(["<b>Winding</b>: each recursive call pushes a new frame, until the base case is reached.", "The base case returns a value: its frame is popped.", "<b>Unwinding</b>: each earlier frame is popped in turn (last in, first out); the returned value is used to finish that call's calculation, and execution returns to the stored return address."]) +
      "<p>If the recursion is too deep (or has no base case) the stack runs out of space: <b>stack overflow</b>. For example <code>Factorial(100)</code> needs 100 frames before it can start to unwind.</p>",
    example:
      "<p>Stack for <code>Factorial(3)</code> at its deepest point (top of stack first):</p>" +
      tbl(["Frame (top first)", "Number", "Waiting to calculate"], [["Factorial(0)", "0", "returns 1 (base case)"], ["Factorial(1)", "1", "1 * result"], ["Factorial(2)", "2", "2 * result"], ["Factorial(3)", "3", "3 * result"]]) +
      "<p>Frames are popped in order Factorial(0), (1), (2), (3), giving 1, 1, 2, 6.</p>" +
      "<p>The compiler (or interpreter) must therefore generate code that <b>pushes</b> and <b>pops</b> return addresses, parameters and local variables on each call and return.</p>",
    checks:[
      mc("What is stored on the stack each time a recursive subroutine is called?", "The return address, parameters and local variables", ["The source code", "The whole hard disk", "Only the final answer"], "These make up a stack frame."),
      mc("During unwinding, in which order are the stack frames removed?", "Most recent call first", ["Oldest call first", "Random order", "Largest value first"], "The stack is LIFO."),
      mc("What is a stack overflow?", "The stack runs out of space because there are too many nested calls", ["The stack is empty", "A pop is made twice", "A queue is full"], "Too deep or infinite recursion fills the stack."),
      tx("Describe how a compiler uses a stack to implement recursion. [3]", [["stack frame","stack","push","pushed"],["return address","parameters","local variables","values"],["pop","popped","unwind","unwinding","return","last in first out","lifo"]], 3, "Each recursive call pushes a stack frame containing the return address, parameters and local variables onto the stack. When the base case is reached the frames are popped one at a time (unwinding), most recent first, and each popped call uses the returned value and returns to its stored return address.")
    ] }

  ];

  var TEST = {
    mcq:[
      mc("Which search needs the data to be sorted?", "Binary search", ["Linear search", "Both", "Neither"], "A binary search discards half the list using the order."),
      mc("What is the maximum number of comparisons for a binary search of 1000 items (nearest whole number)?", "10", ["100", "500", "1000"], "2^10 = 1024, so about 10 halvings."),
      mc("Which sort moves each item directly into place in a sorted part of the list?", "Insertion sort", ["Bubble sort", "Linear search", "Binary search"], "Items to the left are shifted to make room."),
      mc("Items 3, 8 and 5 are pushed onto a stack then popped once. What is returned?", "5", ["3", "8", "Nothing"], "Last in, first out."),
      mc("Items 3, 8 and 5 are enqueued then dequeued once. What is returned?", "3", ["5", "8", "Nothing"], "First in, first out."),
      mc("Which traversal of an ordered binary tree gives sorted output?", "In-order", ["Pre-order", "Post-order", "Breadth-first"], "Left, node, right."),
      mc("What is the time complexity of a bubble sort?", "O(n²)", ["O(n)", "O(log n)", "O(2n)"], "Nested loops."),
      mc("What is the value of Fib(7) if Fib(0) = 0 and Fib(1) = 1?", String(fib(7)), ["8", "21", "11"], "0, 1, 1, 2, 3, 5, 8, 13.")
    ],
    typed:[
      { q:"Describe two differences between a stack and a queue. [2]", groups:[["lifo","last in first out","last in, first out","last in"],["fifo","first in first out","first in, first out","first in"],["one end","top","same end","front and rear","both ends","two ends","push","pop","enqueue","dequeue"]], need:2, model:"A stack is last in, first out (LIFO) with items added and removed at the same end (the top); a queue is first in, first out (FIFO) with items added at the rear and removed from the front." },
      { q:"Explain what is meant by winding and unwinding in recursion. [2]", groups:[["winding","calls itself","repeated calls","until the base case","pushed","calls are made"],["unwinding","returns","values are returned","popped","after the base case","back up","combined"]], need:2, model:"Winding is the repeated recursive calls (each pushed on the stack) until the base case is reached; unwinding is when the calls return in turn, most recent first, and the returned values are used to complete the earlier calls." },
      { q:"State two situations in which a linear search is more suitable than a binary search. [2]", groups:[["not sorted","unsorted","not in order","unordered"],["small","few items","linked list","not an array","sequential","file","no direct access"]], need:2, model:"When the data is not sorted, or when the list is very small (or held in a structure that does not allow direct access to the middle item, such as a linked list or serial file)." }
    ]
  };

  root.ILEARN_LESSONS = (root.ILEARN_LESSONS || []).concat(LESSONS);
  (root.ILEARN_TESTS = root.ILEARN_TESTS || {})[19] = TEST;
})(typeof window !== "undefined" ? window : this);
