/* Cambridge Final Exam Timetable, June 2027 series, Administrative Zone 3 (Version 1, November 2026).
   One entry per subject; each paper is [paper+variant (2 digits), type, tier, "MM-DD", session, minutes].
   tier: "C" Core, "E" Extended, "A" any. Edit dates here only; the page reads this file.
   Source: the official PDF "June 2027 Zone 3 timetable". Cambridge may publish changes: always confirm with your exam officer. */
(function(){
  "use strict";
  var D = { version: "Version 1, November 2026", zone: "Zone 3", year: 2027, subjects: [] };
  function S(qual, group, name, base, papers){ D.subjects.push({ qual: qual, group: group, name: name, base: base, papers: papers }); }
  // Core / Extended science template builder: [mcqDate, theoryDate, practDate, mcqMin, theoryMin, practMin, altMin]
  function sci(qual, name, base, dates, mins){
    var m = dates[0], t = dates[1], p = dates[2], mm = mins[0], tm = mins[1], pm = mins[2], am = mins[3];
    S(qual, "Sciences", name, base, [
      ["11", "Multiple choice", "C", m, "PM", mm], ["21", "Multiple choice", "E", m, "PM", mm],
      ["31", "Theory", "C", t, "PM", tm], ["41", "Theory", "E", t, "PM", tm],
      ["51", "Practical", "A", p, "PM", pm], ["61", "Alternative to Practical", "A", p, "PM", am]
    ]);
  }
  var q = [["IG", ""], ["91", ""]];
  // ---- Sciences ----
  sci("IG", "Biology", "0610", ["06-08", "04-26", "05-11"], [45, 75, 75, 60]);
  sci("91", "Biology", "0970", ["06-08", "04-26", "05-11"], [45, 75, 75, 60]);
  sci("IG", "Chemistry", "0620", ["06-10", "04-27", "05-13"], [45, 75, 75, 60]);
  sci("91", "Chemistry", "0971", ["06-10", "04-27", "05-13"], [45, 75, 75, 60]);
  sci("IG", "Physics", "0625", ["06-09", "05-07", "05-25"], [45, 75, 75, 60]);
  sci("91", "Physics", "0972", ["06-09", "05-07", "05-25"], [45, 75, 75, 60]);
  sci("IG", "Combined Science", "0653", ["06-09", "05-13", "05-11"], [45, 75, 75, 60]);
  sci("IG", "Co-ordinated Sciences (Double Award)", "0654", ["06-09", "05-13", "05-11"], [45, 120, 120, 90]);
  sci("91", "Co-ordinated Sciences (Double Award)", "0973", ["06-09", "05-13", "05-11"], [45, 120, 120, 90]);
  // ---- Mathematics ----
  var m0580 = [["12", "Written paper", "C", "04-28", "AM", 90], ["22", "Written paper", "E", "04-28", "AM", 120], ["32", "Written paper", "C", "05-05", "AM", 90], ["42", "Written paper", "E", "05-05", "AM", 120]];
  S("IG", "Mathematics", "Mathematics (without coursework)", "0580", m0580);
  S("91", "Mathematics", "Mathematics", "0980", m0580);
  S("IG", "Mathematics", "Cambridge International Mathematics", "0607", [["11", "Written paper", "C", "04-28", "PM", 75], ["21", "Written paper", "E", "04-28", "PM", 90], ["31", "Written paper", "C", "05-03", "PM", 75], ["41", "Written paper", "E", "05-03", "PM", 90], ["51", "Written paper", "C", "05-10", "PM", 75], ["61", "Written paper", "E", "05-10", "PM", 90]]);
  S("IG", "Mathematics", "Additional Mathematics", "0606", [["11", "Written paper", "A", "05-18", "PM", 120], ["21", "Written paper", "A", "05-27", "PM", 120]]);
  // ---- Computing ----
  var cs = [["11", "Computer systems", "A", "05-10", "PM", 105], ["21", "Algorithms, programming and logic", "A", "05-19", "PM", 105]];
  S("IG", "Computing", "Computer Science", "0478", cs);
  S("91", "Computing", "Computer Science", "0984", cs);
  S("IG", "Computing", "Information & Communication Technology", "0417", [["12", "Theory", "A", "05-06", "AM", 90]]);
  S("91", "Computing", "Information & Communication Technology", "0983", [["12", "Theory", "A", "05-06", "AM", 90]]);
  // ---- Languages ----
  S("IG", "Languages", "First Language English", "0500", [["11", "Reading", "A", "04-29", "PM", 120], ["21", "Directed writing and composition", "A", "05-04", "PM", 120]]);
  S("91", "Languages", "First Language English", "0990", [["11", "Reading", "A", "04-29", "PM", 120], ["21", "Directed writing and composition", "A", "05-04", "PM", 120]]);
  var eal = function(){ return [["11", "Listening", "A", "05-24", "PM", 50], ["21", "Reading and writing", "C", "04-29", "PM", 60], ["41", "Reading and writing", "E", "04-29", "PM", 60]]; };
  S("IG", "Languages", "English (as an Additional Language)", "0472", eal());
  S("91", "Languages", "English (as an Additional Language)", "0772", eal());
  S("IG", "Languages", "Arabic (Second Language)", "0544", [["12", "Listening", "A", "05-24", "AM", 50], ["22", "Reading and writing", "A", "04-27", "AM", 60], ["42", "Reading and writing", "A", "05-24", "AM", 60]]);
  S("IG", "Languages", "First Language Arabic", "0508", [["01", "Written paper", "A", "05-13", "AM", 120], ["02", "Written paper", "A", "05-24", "AM", 120]]);
  S("91", "Languages", "Arabic", "7180", [["01", "Written paper", "A", "05-03", "AM", 90], ["02", "Written paper", "A", "05-13", "AM", 90]]);
  // ---- Humanities and business ----
  var geo = [["12", "Written paper", "A", "04-29", "AM", 105], ["22", "Written paper", "A", "05-13", "AM", 105], ["42", "Written paper", "A", "05-18", "AM", 90]];
  S("IG", "Humanities and business", "Geography", "0460", geo); S("91", "Humanities and business", "Geography", "0976", geo);
  var his = [["12", "Written paper", "A", "05-07", "AM", 120], ["22", "Written paper", "A", "05-10", "AM", 105], ["42", "Written paper", "A", "05-20", "AM", 60]];
  S("IG", "Humanities and business", "History", "0470", his); S("91", "Humanities and business", "History", "0977", his);
  var bus = [["11", "Written paper", "A", "05-12", "PM", 90], ["21", "Written paper", "A", "05-21", "PM", 90]];
  S("IG", "Humanities and business", "Business", "0264", bus); S("91", "Humanities and business", "Business", "0774", bus);
  var eco = [["11", "Multiple choice", "A", "06-11", "PM", 60], ["21", "Structured questions", "A", "05-26", "PM", 120]];
  S("IG", "Humanities and business", "Economics", "0455", eco); S("91", "Humanities and business", "Economics", "0987", eco);
  var acc = [["11", "Multiple choice", "A", "06-03", "PM", 90], ["21", "Structured questions", "A", "05-14", "PM", 105]];
  S("IG", "Humanities and business", "Accounting", "0452", acc); S("91", "Humanities and business", "Accounting", "0985", acc);
  S("IG", "Humanities and business", "Global Perspectives", "0457", [["12", "Written exam", "A", "04-29", "AM", 85]]);
  S("IG", "Humanities and business", "Islamiyat", "0493", [["11", "Written paper", "A", "04-26", "PM", 90], ["21", "Written paper", "A", "05-05", "PM", 90]]);
  S("IG", "Humanities and business", "Psychology", "0266", [["11", "Written paper", "A", "05-06", "PM", 90], ["21", "Written paper", "A", "05-18", "PM", 80]]);
  S("IG", "Humanities and business", "Physical Education", "0413", [["12", "Theory", "A", "05-20", "AM", 105]]);
  S("91", "Humanities and business", "Physical Education", "0995", [["12", "Theory", "A", "05-20", "AM", 105]]);

  // ---- More subjects (shown in the "Add another subject" menu) ----
  function M(qual, group, name, base, papers){ S(qual, group, name, base, papers); D.subjects[D.subjects.length - 1].more = true; }
  function both(group, name, igBase, nBase, papers){ M("IG", group, name, igBase, papers); if(nBase) M("91", group, name, nBase, papers); }
  var HB = "Humanities and business";
  both(HB, "Drama", "0411", "0994", [["12", "Written paper", "A", "05-28", "AM", 150]]);
  both(HB, "Music (Listening)", "0410", "0978", [["12", "Listening", "A", "05-21", "AM", 75]]);
  M("IG", HB, "Enterprise", "0454", [["12", "Written paper", "A", "06-03", "AM", 90]]);
  M("IG", HB, "Environmental Management", "0680", [["11", "Written paper", "A", "05-24", "PM", 105], ["21", "Written paper", "A", "05-28", "PM", 105]]);
  M("IG", HB, "Food & Nutrition", "0648", [["12", "Written paper", "A", "06-08", "AM", 120]]);
  M("IG", HB, "Sociology", "0495", [["12", "Paper 1", "A", "05-11", "AM", 120], ["22", "Paper 2", "A", "05-27", "AM", 105]]);
  M("IG", HB, "Marine Science", "0697", [["12", "Paper 1", "A", "05-11", "AM", 105], ["22", "Paper 2", "A", "05-14", "AM", 105]]);
  M("IG", HB, "Travel & Tourism", "0471", [["12", "Paper 1", "A", "05-06", "AM", 90], ["22", "Paper 2", "A", "05-14", "AM", 120]]);
  M("IG", HB, "Statistics", "0479", [["12", "Paper 1", "A", "05-06", "AM", 135], ["22", "Paper 2", "A", "05-21", "AM", 135]]);
  M("IG", HB, "Pakistan Studies", "0448", [["01", "Paper 1", "A", "04-30", "AM", 90], ["02", "Paper 2", "A", "05-03", "AM", 90]]);
  M("IG", "Languages", "Latin", "0480", [["12", "Paper 1", "A", "05-06", "AM", 90], ["22", "Paper 2", "A", "05-11", "AM", 90]]);
  M("IG", "Languages", "Sanskrit", "0499", [["12", "Paper 1", "A", "04-27", "AM", 90], ["22", "Paper 2", "A", "05-04", "AM", 90]]);
  both("Languages", "English as a Second Language (Count-in Speaking)", "0511", "0991", [["11", "Reading and writing", "A", "04-29", "PM", 120], ["21", "Listening", "A", "05-24", "PM", 50]]);
  both("Languages", "English as a Second Language (Speaking Endorsement)", "0510", "0993", [["11", "Reading and writing", "A", "04-29", "PM", 120], ["21", "Listening", "A", "05-24", "PM", 50]]);
  M("IG", "Languages", "First Language Chinese", "0509", [["12", "Paper 1", "A", "04-26", "AM", 135], ["22", "Paper 2", "A", "04-30", "AM", 120]]);
  M("IG", "Languages", "First Language French", "0501", [["01", "Paper 1", "A", "04-26", "AM", 120], ["02", "Paper 2", "A", "05-11", "AM", 120]]);
  M("IG", "Languages", "First Language German", "0505", [["01", "Paper 1", "A", "05-10", "AM", 120], ["02", "Paper 2", "A", "05-18", "AM", 120]]);
  M("IG", "Languages", "First Language Portuguese", "0504", [["01", "Paper 1", "A", "05-20", "PM", 120], ["02", "Paper 2", "A", "05-28", "PM", 120]]);
  M("IG", "Languages", "First Language Spanish", "0502", [["11", "Paper 1", "A", "05-20", "PM", 120], ["21", "Paper 2", "A", "05-31", "PM", 120]]);
  M("IG", "Languages", "First Language Thai", "0518", [["01", "Paper 1", "A", "05-03", "AM", 120], ["02", "Paper 2", "A", "05-13", "AM", 120]]);
  M("IG", "Languages", "First Language Turkish", "0513", [["01", "Paper 1", "A", "04-26", "AM", 120], ["02", "Paper 2", "A", "05-13", "AM", 120]]);
  M("IG", "Languages", "French", "0520", [["11", "Listening", "A", "06-07", "PM", 50], ["21", "Reading and writing", "A", "05-05", "PM", 60], ["41", "Paper 4", "A", "04-28", "PM", 60]]);
  var de = [["12", "Listening", "A", "05-04", "AM", 50], ["22", "Reading and writing", "A", "05-10", "AM", 60], ["42", "Paper 4", "A", "05-04", "AM", 60]];
  both("Languages", "German", "0525", "7159", de);
  M("IG", "Languages", "Italian", "0535", [["12", "Listening", "A", "04-27", "AM", 50], ["22", "Reading and writing", "A", "05-04", "AM", 60], ["42", "Paper 4", "A", "04-27", "AM", 60]]);
  M("IG", "Languages", "Spanish", "0530", [["12", "Listening", "A", "05-26", "AM", 50], ["22", "Reading and writing", "A", "05-14", "AM", 60], ["42", "Paper 4", "A", "05-26", "AM", 60]]);
  M("IG", "Languages", "Chinese as a Second Language", "0523", [["11", "Reading and writing", "A", "04-30", "PM", 120], ["21", "Listening", "A", "05-12", "PM", 45]]);
  M("IG", "Languages", "Mandarin Chinese", "0547", [["11", "Listening", "A", "04-28", "PM", 40], ["21", "Reading and writing", "A", "05-12", "PM", 75], ["41", "Paper 4", "A", "04-26", "PM", 75]]);
  M("IG", "Languages", "Malay", "0546", [["12", "Listening", "A", "05-24", "AM", 50], ["22", "Reading and writing", "A", "05-03", "AM", 60], ["42", "Paper 4", "A", "05-12", "AM", 60]]);
  M("IG", "Languages", "Bahasa Indonesia", "0538", [["01", "Paper 1", "A", "04-30", "AM", 105], ["02", "Paper 2", "A", "05-04", "AM", 105]]);
  M("IG", "Languages", "Urdu as a Second Language", "0539", [["01", "Reading and writing", "A", "05-13", "AM", 120], ["02", "Listening", "A", "05-04", "AM", 45]]);
  M("IG", "Languages", "Swahili", "0262", [["01", "Reading and writing", "A", "04-26", "AM", 120], ["02", "Listening", "A", "05-03", "AM", 45]]);
  window.PQ_TIMETABLE = D;

})();
