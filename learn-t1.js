/* iLearn topic 1: topic test (lessons are in learn-data.js) */
(function(root){
  "use strict";
  var mc = root.ILQ.mc;
  var TEST = {
    mcq:[
      mc("What is the denary value of the binary number 00101101?", "45", ["43","53","101"], "32 + 8 + 4 + 1 = 45."),
      mc("What is the denary value of the hexadecimal number 2F?", "47", ["29","215","32"], "2 × 16 = 32, plus F (15) = 47."),
      mc("What is 10110000 written in hexadecimal?", "B0", ["0B","A0","1B"], "1011 = B and 0000 = 0, so B0."),
      mc("Two logical left shifts are applied to 00001101 (13). What is the result?", "00110100", ["00000011","00011010","00110101"], "Each left shift doubles the value, so 13 × 4 = 52 = 00110100."),
      mc("An image is 100 pixels wide and 50 pixels high with a colour depth of 8 bits. What is its file size?", "5000 bytes", ["625 bytes","40 000 bytes","50 bytes"], "100 × 50 = 5000 pixels × 8 bits = 40 000 bits, ÷ 8 = 5000 bytes.")
    ],
    typed:[
      { q:"Explain the difference between lossy and lossless compression.", groups:[["lossy"],["lossless"],["permanently","removed","removes","discard","deleted","lost","loses","some data","less detail"],["original","restored","rebuilt","recreated","no data","nothing is lost","exactly","reconstruct"]], need:3, model:"Lossy compression permanently removes some data, so the original file cannot be restored. Lossless compression reduces file size without losing any data, so the original can be rebuilt exactly." },
      { q:"Give two reasons why hexadecimal is used instead of binary.", groups:[["shorter","fewer digits","less digits","compact","fewer characters"],["easier to read","easier to remember","easier to type","easier to write","less error","fewer mistakes","fewer errors","readable"],["convert","four bits","4 bits","one digit","single digit"]], need:2, model:"Hexadecimal numbers are shorter than binary, so they are easier to read, remember and write with fewer mistakes. One hex digit represents four bits, so conversion is easy." }
    ]
  };
  (root.ILEARN_TESTS = root.ILEARN_TESTS || {})[1] = TEST;
})(typeof window !== "undefined" ? window : this);
