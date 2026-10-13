/* learn-helpers.js -- tiny authoring helpers for iLearn lesson files.
   mc(question, rightAnswer, [wrong1, wrong2, wrong3], explanation)  -> multiple choice (options are shuffled when shown)
   tx(question, [[synonyms]...], pointsNeeded, modelAnswer)           -> typed answer, marked by keyword groups */
(function(root){
  "use strict";
  root.ILQ = {
    mc: function(q, right, wrongs, explain){ return { q:q, options:[right].concat(wrongs), correct:0, explain:explain }; },
    tx: function(q, groups, need, model){ return { type:"text", q:q, groups:groups, need:need, model:model, explain:model }; }
  };
})(typeof window !== "undefined" ? window : this);
