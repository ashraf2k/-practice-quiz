/* learn-helpers.js -- tiny authoring helpers for iLearn lesson files.
   mc(question, rightAnswer, [wrong1, wrong2, wrong3], explanation)  -> multiple choice (options are shuffled when shown)
   fill(question, code, gaps, explanation) -> complete the algorithm: code has {1} {2}.. gaps; gaps[i] = [rightText, [wrong1, wrong2, wrong3]]
   tx(question, [[synonyms]...], pointsNeeded, modelAnswer)           -> typed answer, marked by keyword groups */
(function(root){
  "use strict";
  root.ILQ = {
    mc: function(q, right, wrongs, explain){ return { q:q, options:[right].concat(wrongs), correct:0, explain:explain }; },
    fill: function(q, code, gaps, explain){ return { type:"fill", q:q, code:code, gaps:gaps, explain:explain }; },
    tx: function(q, groups, need, model){ return { type:"text", q:q, groups:groups, need:need, model:model, explain:model }; }
  };
})(typeof window !== "undefined" ? window : this);
