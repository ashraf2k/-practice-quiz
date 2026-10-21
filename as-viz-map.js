/* Which interactive visual goes with which AS (11BR) iLearn lesson. at: 0 = after the idea, 1 = after the worked example. */
(function(root){
  "use strict";
  var M = root.ILEARN_VIZ.MAP;
  function add(id, w, title, at, o, note){ (M[id] = M[id] || []).push({ w: w, title: title, at: at, o: o || {}, note: note || "" }); }
  add("1.1.2a", "bits", "Switch bits on and off: binary, denary and hex", 0);
  add("1.1.2a", "twos", "Two's complement: build and negate", 1);
  add("1.1.4a", "bcd", "BCD: one 4-bit group for every digit", 0);
  add("4.1.1a", "fde", "Inside the CPU", 1);
  add("4.1.5a", "interrupt", "Interrupts and the queue", 1);
  add("9.1.2a", "decomp", "Split a problem into modules", 0);
  add("9.2.1a", "dtype", "Which data type?", 1);
  add("9.2.2a", "trace", "Trace a REPEAT UNTIL loop", 1, { p: "repeat" });
  add("11.2.1a", "trace", "Trace a REPEAT UNTIL loop", 1, { p: "repeat" });
  add("12.3.1a", "errtypes", "Sort the errors: syntax, logic or run-time?", 0);
})(typeof window !== "undefined" ? window : this);
