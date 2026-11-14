/* A tiny Excel-formula engine: enough to run real COUNTIF / COUNTA / COUNT / SUM / SUMIF / SUMIFS / FILTER / YEAR / IF
   formulas against a small practice worksheet in the browser, so students can type the exact formula the lesson
   taught and see it actually run. Not a general spreadsheet - just the functions Unit 5 teaches. */
(function(){
  "use strict";

  // ---------- tokenizer ----------
  function tokenize(src){
    var toks = [], i = 0, n = src.length;
    function isDigit(c){ return c >= "0" && c <= "9"; }
    function isLetter(c){ return /[A-Za-z]/.test(c); }
    while(i < n){
      var c = src[i];
      if(c === " " || c === "\t" || c === "\n"){ i++; continue; }
      if(c === "\""){
        var j = i + 1, s = "";
        while(j < n && src[j] !== "\""){ s += src[j]; j++; }
        toks.push({ t: "str", v: s }); i = j + 1; continue;
      }
      if(c === ">" || c === "<"){
        if(src[i + 1] === "="){ toks.push({ t: "op", v: c + "=" }); i += 2; continue; }
        if(c === "<" && src[i + 1] === ">"){ toks.push({ t: "op", v: "<>" }); i += 2; continue; }
        toks.push({ t: "op", v: c }); i++; continue;
      }
      if("=+-*/(),:".indexOf(c) >= 0){ toks.push({ t: "op", v: c }); i++; continue; }
      if(isDigit(c) || (c === "." && isDigit(src[i + 1]))){
        var num = ""; while(i < n && (isDigit(src[i]) || src[i] === ".")){ num += src[i]; i++; } toks.push({ t: "num", v: parseFloat(num) }); continue;
      }
      if(c === "$" || isLetter(c)){
        var word = ""; while(i < n && (isLetter(src[i]) || isDigit(src[i]) || src[i] === "$")){ word += src[i]; i++; } toks.push({ t: "word", v: word }); continue;
      }
      throw new Error("Unexpected character: " + c);
    }
    return toks;
  }
  function isCellRef(word){ return /^\$?[A-Za-z]+\$?[0-9]+$/.test(word); }
  function cellAddr(word){ var m = word.match(/^\$?([A-Za-z]+)\$?([0-9]+)$/); return { col: m[1].toUpperCase(), row: parseInt(m[2], 10) }; }

  // ---------- parser (recursive descent) -> AST ----------
  function parse(src){
    var toks = tokenize(src.replace(/^=/, "")), p = 0;
    function peek(){ return toks[p]; }
    function next(){ return toks[p++]; }
    function expectOp(v){ var t = next(); if(!t || t.t !== "op" || t.v !== v) throw new Error("Expected '" + v + "'"); }

    function parseExpr(){ return parseCompare(); }
    function parseCompare(){
      var left = parseAdd();
      var t = peek();
      if(t && t.t === "op" && ["=", "<>", ">", ">=", "<", "<="].indexOf(t.v) >= 0){ next(); var right = parseAdd(); return { k: "cmp", op: t.v, l: left, r: right }; }
      return left;
    }
    function parseAdd(){
      var left = parseMul();
      while(peek() && peek().t === "op" && (peek().v === "+" || peek().v === "-")){ var op = next().v; var right = parseMul(); left = { k: "bin", op: op, l: left, r: right }; }
      return left;
    }
    function parseMul(){
      var left = parseUnary();
      while(peek() && peek().t === "op" && (peek().v === "*" || peek().v === "/")){ var op = next().v; var right = parseUnary(); left = { k: "bin", op: op, l: left, r: right }; }
      return left;
    }
    function parseUnary(){
      if(peek() && peek().t === "op" && peek().v === "-"){ next(); return { k: "neg", v: parseUnary() }; }
      return parsePrimary();
    }
    function parsePrimary(){
      var t = peek();
      if(!t) throw new Error("Unexpected end of formula");
      if(t.t === "num"){ next(); return { k: "num", v: t.v }; }
      if(t.t === "str"){ next(); return { k: "str", v: t.v }; }
      if(t.t === "op" && t.v === "("){ next(); var e = parseExpr(); expectOp(")"); return e; }
      if(t.t === "word"){
        next();
        if(peek() && peek().t === "op" && peek().v === "("){
          next(); var args = [];
          if(!(peek() && peek().t === "op" && peek().v === ")")){
            args.push(parseExpr());
            while(peek() && peek().t === "op" && peek().v === ","){ next(); args.push(parseExpr()); }
          }
          expectOp(")");
          return { k: "call", name: t.v.toUpperCase(), args: args };
        }
        if(isCellRef(t.v)){
          if(peek() && peek().t === "op" && peek().v === ":"){
            next(); var t2 = next(); if(!t2 || !isCellRef(t2.v)) throw new Error("Expected cell after ':'");
            return { k: "range", a: cellAddr(t.v), b: cellAddr(t2.v) };
          }
          return { k: "ref", a: cellAddr(t.v) };
        }
        throw new Error("Unknown name: " + t.v);
      }
      throw new Error("Unexpected token in formula");
    }
    var ast = parseExpr();
    if(p < toks.length) throw new Error("Unexpected text after formula");
    return ast;
  }

  // ---------- grid ----------
  // grid: { get(col,row) -> raw value (string|number|undefined) }
  function colLetters(a, b){ var out = []; var ca = a.charCodeAt(0), cb = b.charCodeAt(0); for(var c = ca; c <= cb; c++) out.push(String.fromCharCode(c)); return out; }

  // A "value" in evaluation is either a scalar {s:true, v:...} or an array {s:false, rows:[[v,...],...], cols:[...], rowNums:[...]}
  function scalar(v){ return { s: true, v: v }; }
  function arrVal(rows, cols, rowNums){ return { s: false, rows: rows, cols: cols, rowNums: rowNums }; }

  function evalAst(node, grid){
    switch(node.k){
      case "num": return scalar(node.v);
      case "str": return scalar(node.v);
      case "neg": { var v = evalAst(node.v, grid); if(!v.s) throw new Error("Cannot negate a range"); return scalar(-num(v.v)); }
      case "ref": return scalar(grid.get(node.a.col, node.a.row));
      case "range": {
        var cols = colLetters(node.a.col, node.b.col), r0 = Math.min(node.a.row, node.b.row), r1 = Math.max(node.a.row, node.b.row);
        var rows = [], rowNums = [];
        for(var r = r0; r <= r1; r++){ var row = []; for(var ci = 0; ci < cols.length; ci++) row.push(grid.get(cols[ci], r)); rows.push(row); rowNums.push(r); }
        return arrVal(rows, cols, rowNums);
      }
      case "bin": return evalBin(node, grid);
      case "cmp": return evalCmp(node, grid);
      case "call": return evalCall(node, grid);
    }
    throw new Error("Bad node");
  }
  function num(v){ if(v == null || v === "") return 0; var n = typeof v === "number" ? v : parseFloat(v); return isNaN(n) ? 0 : n; }
  function truthy(v){ return v === true || v === 1 || v === "TRUE"; }

  function elementwise(a, b, fn){
    if(a.s && b.s) return scalar(fn(a.v, b.v));
    if(!a.s && !b.s){
      if(a.rows.length !== b.rows.length || a.rows[0].length !== b.rows[0].length) throw new Error("Array sizes don't match");
      var rows = a.rows.map(function(row, ri){ return row.map(function(v, ci){ return fn(v, b.rows[ri][ci]); }); });
      return arrVal(rows, a.cols, a.rowNums);
    }
    var arr = a.s ? b : a, other = a.s ? a.v : b.v, flip = a.s;
    var rows = arr.rows.map(function(row){ return row.map(function(v){ return flip ? fn(other, v) : fn(v, other); }); });
    return arrVal(rows, arr.cols, arr.rowNums);
  }
  function cmpOne(op, x, y){
    if(op === "="){ return eqLoose(x, y); }
    if(op === "<>"){ return !eqLoose(x, y); }
    var xn = num(x), yn = num(y);
    if(op === ">") return xn > yn; if(op === ">=") return xn >= yn; if(op === "<") return xn < yn; if(op === "<=") return xn <= yn;
    return false;
  }
  function eqLoose(x, y){
    if(x == null) x = ""; if(y == null) y = "";
    if(typeof x === "number" || typeof y === "number"){ if(!isNaN(parseFloat(x)) && !isNaN(parseFloat(y))) return parseFloat(x) === parseFloat(y); }
    return String(x).trim().toLowerCase() === String(y).trim().toLowerCase();
  }
  function evalCmp(node, grid){
    var l = evalAst(node.l, grid), r = evalAst(node.r, grid);
    return elementwise(l, r, function(x, y){ return cmpOne(node.op, x, y) ? 1 : 0; });
  }
  function evalBin(node, grid){
    var l = evalAst(node.l, grid), r = evalAst(node.r, grid);
    var fn = node.op === "+" ? function(a, b){ return num(a) + num(b); }
      : node.op === "-" ? function(a, b){ return num(a) - num(b); }
      : node.op === "*" ? function(a, b){ return num(a) * num(b); }
      : function(a, b){ return num(a) / num(b); };
    return elementwise(l, r, fn);
  }

  function flatten(v){ if(v.s) return [v.v]; var out = []; v.rows.forEach(function(row){ row.forEach(function(x){ out.push(x); }); }); return out; }
  function matchCriteria(value, crit){
    if(typeof crit === "string"){
      var m = crit.match(/^(>=|<=|<>|>|<|=)(.*)$/);
      if(m){ var opv = m[2]; var num2 = parseFloat(opv); return cmpOne(m[1], value, isNaN(num2) ? opv : num2); }
    }
    return eqLoose(value, crit);
  }
  function criteriaVal(v){ return v.s ? v.v : flatten(v)[0]; }

  function evalCall(node, grid){
    var name = node.name, args = node.args;
    if(name === "COUNTIF"){
      var range = evalAst(args[0], grid), crit = criteriaVal(evalAst(args[1], grid));
      return scalar(flatten(range).filter(function(x){ return matchCriteria(x, crit); }).length);
    }
    if(name === "COUNTA"){
      var v = evalAst(args[0], grid); return scalar(flatten(v).filter(function(x){ return x != null && x !== ""; }).length);
    }
    if(name === "COUNT"){
      var v2 = evalAst(args[0], grid); return scalar(flatten(v2).filter(function(x){ return typeof x === "number" || (x !== "" && x != null && !isNaN(parseFloat(x)) && isFinite(x)); }).length);
    }
    if(name === "SUM"){
      var v3 = evalAst(args[0], grid); return scalar(flatten(v3).reduce(function(a, x){ return a + num(x); }, 0));
    }
    if(name === "SUMIF" || name === "SUMIFS"){
      var sumRange, pairs = [];
      if(name === "SUMIF"){ sumRange = evalAst(args[2] ? args[0] : args[0], grid); /* SUMIF(range,crit,[sum_range]) */
        var critRange = evalAst(args[0], grid), crit0 = criteriaVal(evalAst(args[1], grid));
        var target = args[2] ? evalAst(args[2], grid) : critRange;
        pairs.push({ range: critRange, crit: crit0 }); sumRange = target;
      } else {
        sumRange = evalAst(args[0], grid);
        for(var i = 1; i < args.length; i += 2){ pairs.push({ range: evalAst(args[i], grid), crit: criteriaVal(evalAst(args[i + 1], grid)) }); }
      }
      var flatSum = flatten(sumRange), total = 0;
      for(var r = 0; r < flatSum.length; r++){
        var ok = pairs.every(function(p){ return matchCriteria(flatten(p.range)[r], p.crit); });
        if(ok) total += num(flatSum[r]);
      }
      return scalar(total);
    }
    if(name === "FILTER"){
      var arr = evalAst(args[0], grid), inc = evalAst(args[1], grid);
      if(arr.s) throw new Error("FILTER's first argument must be a range");
      var incFlat = inc.s ? [inc.v] : inc.rows.map(function(row){ return row[0]; });
      var keptRows = [], keptNums = [];
      arr.rows.forEach(function(row, ri){ if(truthy(incFlat[ri]) || num(incFlat[ri]) > 0){ keptRows.push(row); keptNums.push(arr.rowNums[ri]); } });
      if(keptRows.length === 0){
        if(args[2]) return evalAst(args[2], grid);
        return { s: false, rows: [], cols: arr.cols, rowNums: [], empty: true };
      }
      return arrVal(keptRows, arr.cols, keptNums);
    }
    if(name === "YEAR"){
      var v4 = evalAst(args[0], grid);
      function yr(x){ if(x == null || x === "") return ""; var d = parseDate(String(x)); return d ? d.getFullYear() : ""; }
      if(v4.s) return scalar(yr(v4.v));
      return arrVal(v4.rows.map(function(row){ return row.map(yr); }), v4.cols, v4.rowNums);
    }
    if(name === "IF"){
      var cond = evalAst(args[0], grid);
      function pick(c){ return truthy(c) || num(c) > 0 ? 1 : 0; }
      if(cond.s){ return evalAst(pick(cond.v) ? args[1] : args[2], grid); }
      var a2 = evalAst(args[1], grid), b2 = evalAst(args[2], grid);
      var rows = cond.rows.map(function(row, ri){ return row.map(function(c, ci){ var p = pick(c); var av = a2.s ? a2.v : a2.rows[ri][ci]; var bv = b2.s ? b2.v : b2.rows[ri][ci]; return p ? av : bv; }); });
      return arrVal(rows, cond.cols, cond.rowNums);
    }
    throw new Error("Unsupported function: " + name);
  }
  function parseDate(s){
    var m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
    if(m){ var yy = parseInt(m[3], 10); if(yy < 100) yy += 2000; return new Date(yy, parseInt(m[1], 10) - 1, parseInt(m[2], 10)); }
    var d = new Date(s); return isNaN(d.getTime()) ? null : d;
  }

  function run(formula, grid){
    var ast = parse(formula);
    return evalAst(ast, grid);
  }
  function makeGrid(cells){
    // cells: { "A2": "Apple", "C2": 3, ... }
    return { get: function(col, row){ var v = cells[col + row]; return v === undefined ? "" : v; } };
  }
  window.XLENGINE = { run: run, makeGrid: makeGrid, flatten: flatten };
})();
