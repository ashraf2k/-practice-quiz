/* Unit 5: Data manipulation tutorial content (Sprint 5.1 - Excel functions for business analysis).
   In every mcq, o[0] is the correct answer; the page shuffles the options. Lesson strings may contain simple HTML written by us. */
window.UNIT5TUT = { langs: [
{ id: "xl", title: "Excel data manipulation", blurb: "Sprint 5.1", topics: [

 { id: "x1", title: "Counting records with COUNTIF", anim: "countif", path: "Sprint 5.1 · COUNTIF",
   steps: ["Fetch the unique brand names into a new worksheet.", "Go to cell A2 and list the brands.", "In cell B2, use COUNTIF to count the orders for each brand.", "Lock the data range with $ so the formula still works when copied down."],
   lesson: [
     "Rick owns an electronic store. He keeps five years of sales in a worksheet with 1000 orders. He wants to know, for each <b>brand</b>, how many orders there were. Counting 1000 rows by hand would take forever, so Excel's <b>COUNTIF</b> function does it in one formula.",
     { h: "What COUNTIF does" },
     "<code>COUNTIF(range, criteria)</code> counts how many cells in <b>range</b> match <b>criteria</b>. To count how many orders are for the brand in cell A2, out of the brand column C2:C1001, the formula is:",
     "<code>=COUNTIF($C$2:$C$1001,$A2)</code>",
     { h: "Why the $ signs" },
     "When a formula is copied to other cells, Excel normally shifts every cell reference. The data range must <b>not</b> shift, so both the row and column get a $ : <code>$C$2:$C$1001</code>. This is an <b>absolute reference</b>. The criteria cell changes brand for each row, but the <b>column</b> A must stay fixed while the <b>row</b> can move, so only the column gets a $ : <code>$A2</code>. This is a <b>mixed reference</b>.",
     { h: "The common mistake" },
     "If you forget the $ signs and drag a formula down, the range quietly slides down too (for example C2:C1001 becomes C3:C1002), and the count comes out wrong without any error message appearing.",
     { tip: "Decide what must stay fixed before you drag a formula: the data range almost always needs full $ signs on both row and column." }
   ],
   mcq: [
     { q: "What does COUNTIF(range, criteria) do?", o: ["Counts the cells in a range that match a criteria", "Adds up all the numbers in a range", "Deletes cells that match a criteria", "Finds the largest value in a range"], why: "COUNTIF counts matching cells; it does not add, delete or find a maximum." },
     { q: "Rick wants to count orders for the brand in cell A2, where brands are listed in C2:C1001. Which formula is correct?", o: ["=COUNTIF($C$2:$C$1001,$A2)", "=COUNTIF(A2,C2:C1001)", "=SUM($C$2:$C$1001,$A2)", "=COUNTIF(C2:C1001)"], why: "The range comes first, then the criteria cell; the brand column needs $ on both row and column." },
     { q: "Why does the data range $C$2:$C$1001 need a $ on both the row and the column?", o: ["So it stays fixed wherever the formula is copied", "So Excel saves the file faster", "So the brand names turn into numbers", "So the formula becomes case-sensitive"], why: "An absolute reference like $C$2:$C$1001 never shifts when the formula is dragged to other cells." },
     { q: "In the formula =COUNTIF($C$2:$C$1001,$A2), why does A2 only have a $ before the column letter and not the row number?", o: ["So the column stays fixed but the row can change as the formula is copied down", "Because A2 is a text value, not a number", "Because COUNTIF ignores the second argument", "So the row stays fixed but the column can change"], why: "$A2 is a mixed reference: the column A is locked, but the row number updates for each new brand row." },
     { q: "You drag a COUNTIF formula down without using $ signs on the data range. What is most likely to happen?", o: ["The range quietly shifts down too, giving wrong counts with no error shown", "Excel refuses to copy the formula", "The workbook deletes the original data", "The count is always exactly right anyway"], why: "Without $ signs, every reference shifts when copied, including the data range, which silently breaks the count." }
   ],
   written: { q: "Explain, in your own words, why Rick's COUNTIF formula uses $C$2:$C$1001 but only $A2 (not $A$2).", model: "The data range $C$2:$C$1001 must stay exactly the same in every copy of the formula, so it needs a $ before both the column letter and the row numbers (an absolute reference). The criteria cell $A2 must keep column A fixed, because the brand names are always in column A, but the row number has to change as the formula moves down to the next brand, so only the column gets a $ (a mixed reference).", check: ["Says the data range must stay fixed in every cell (absolute reference)", "Says the criteria column must stay fixed while the row changes (mixed reference)", "Uses the terms absolute or mixed reference, or explains the idea clearly"] } },

 { id: "x2", title: "Counting text with FILTER nested in COUNTA", anim: "filtercount", path: "Sprint 5.1 · FILTER nested in COUNT",
   steps: ["Remember COUNT only counts numbers, not text.", "Use COUNTA instead, because brand names are text.", "Nest FILTER inside COUNTA to pick out the matching rows first.", "Lock the range with $ signs exactly as before."],
   lesson: [
     "There is a second way to count matching records: nest the <b>FILTER</b> function inside a counting function. FILTER pulls out only the rows that match a condition, and the counting function then counts how many rows came through.",
     { h: "COUNT vs COUNTA" },
     "<b>COUNT</b> only counts cells containing <b>numbers</b>. Brand names are text, so COUNT would always return 0. <b>COUNTA</b> counts cells containing <b>anything</b> (text or numbers), so it is the right choice here.",
     { h: "The nested formula" },
     "To count the orders for the brand in A2 using this method:",
     "<code>=COUNTA(FILTER($C$2:$C$1001,$C$2:$C$1001=$A2))</code>",
     "FILTER($C$2:$C$1001,$C$2:$C$1001=$A2) first produces a smaller list containing only the brand names that equal A2. COUNTA then counts how many items are in that list.",
     { h: "Same idea, two tools" },
     "COUNTIF and FILTER-nested-in-COUNTA usually give the <b>same answer</b> for a single condition like this. FILTER becomes more powerful later, when a question needs several conditions joined together.",
     { tip: "If you ever see 0 from a COUNT formula on text data, check whether COUNT should really be COUNTA." }
   ],
   mcq: [
     { q: "Why can't COUNT be used directly on a column of brand names?", o: ["COUNT only counts numeric values, and brand names are text", "COUNT does not exist in Excel", "COUNT can only count one cell at a time", "COUNT always returns an error on text"], why: "COUNT ignores text entirely, so it would return 0 for a column of names." },
     { q: "Which function counts cells containing either text or numbers?", o: ["COUNTA", "COUNT", "SUM", "AVERAGE"], why: "COUNTA counts any non-blank cell, text or numeric." },
     { q: "What does FILTER($C$2:$C$1001,$C$2:$C$1001=$A2) produce on its own?", o: ["A shorter list containing only the brand names equal to A2", "The total number of orders", "A single TRUE or FALSE value", "An error, because FILTER needs COUNTA first"], why: "FILTER returns the matching rows themselves as a spilled array, not a count." },
     { q: "In =COUNTA(FILTER($C$2:$C$1001,$C$2:$C$1001=$A2)), what does COUNTA actually count?", o: ["The number of items FILTER returned", "The number of columns in the sheet", "The number of unique brands in the whole sheet", "The number of blank cells"], why: "COUNTA wraps around FILTER's result and counts how many rows came through the filter." },
     { q: "For a single condition like \"brand equals A2\", how do COUNTIF and FILTER-nested-in-COUNTA usually compare?", o: ["They give the same answer, using different tools", "COUNTIF is always twice as large", "FILTER nested in COUNTA always returns zero", "They can never be used for the same task"], why: "Both approaches count matching rows; for one simple condition they reach the same result." }
   ],
   written: { q: "A classmate writes =COUNT($C$2:$C$1001,$A2) to count orders for a brand and gets 0. Explain the mistake and how to fix it.", model: "COUNT only counts cells that contain numbers, but the brand names in column C are text, so COUNT ignores them all and returns 0. The fix is to either use COUNTIF($C$2:$C$1001,$A2), which counts matching cells directly, or use COUNTA nested with FILTER: =COUNTA(FILTER($C$2:$C$1001,$C$2:$C$1001=$A2)), which first filters the matching text rows and then counts them with COUNTA instead of COUNT.", check: ["Explains COUNT ignores text / only counts numbers", "Mentions COUNTA as the fix, or COUNTIF as an alternative", "Gives a corrected formula or clear fix"] } },

 { id: "x3", title: "Adding values with SUMIFS", anim: "sumifs", path: "Sprint 5.1 · SUMIFS",
   steps: ["Remember SUMIF adds using one condition; SUMIFS can use many.", "Decide which column to add up (the sum range).", "Add the criteria range/criteria pairs after it.", "Lock every range with $ signs, then copy the formula down."],
   lesson: [
     "Counting orders is useful, but Rick also wants the <b>total quantity</b> and <b>total order value</b> for each brand. For that he needs to <b>add numbers</b>, not just count rows, so he needs <b>SUMIFS</b>.",
     { h: "SUMIFS syntax" },
     "<code>SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2, ...])</code> adds up every cell in <b>sum_range</b> whose row matches <b>every</b> criteria pair listed. All the criteria must be true at the same time &mdash; it is an <b>AND</b>, not an <b>OR</b>.",
     { h: "One condition" },
     "To find the total quantity for the brand in A2 (quantities in column D, brands in column C):",
     "<code>=SUMIFS($D$2:$D$1001,$C$2:$C$1001,$A2)</code>",
     { h: "Several conditions" },
     "To restrict the sum further &mdash; for example only orders in a particular year as well as a brand &mdash; just add another criteria range/criteria pair to the same formula: an extra range and value, still joined by AND.",
     { h: "SUMIF vs SUMIFS" },
     "<b>SUMIF</b> only accepts one condition. <b>SUMIFS</b> accepts one or more, and (unlike SUMIF) always expects the sum range <b>first</b>, before any criteria.",
     { tip: "Every range inside SUMIFS must be exactly the same size (same number of rows), or Excel returns an error." }
   ],
   mcq: [
     { q: "What is the main difference between SUMIF and SUMIFS?", o: ["SUMIFS can use more than one condition; SUMIF only uses one", "SUMIF adds text; SUMIFS adds numbers", "SUMIFS is only for dates", "There is no real difference"], why: "SUMIFS extends SUMIF to allow multiple AND conditions." },
     { q: "In SUMIFS(sum_range, criteria_range1, criteria1, ...), what goes in sum_range?", o: ["The column of numbers that should be added up", "The column that holds the criteria", "The brand name itself", "The row number of the first order"], why: "sum_range is the column SUMIFS totals; the criteria ranges only decide which rows qualify." },
     { q: "Rick wants the total order quantity for the brand in A2, where quantities are in D2:D1001 and brands are in C2:C1001. Which formula is correct?", o: ["=SUMIFS($D$2:$D$1001,$C$2:$C$1001,$A2)", "=SUMIFS($C$2:$C$1001,$D$2:$D$1001,$A2)", "=SUMIF($A2,$D$2:$D$1001)", "=COUNTIFS($D$2:$D$1001,$C$2:$C$1001,$A2)"], why: "The quantities to total come first, then the brand range and the brand to match." },
     { q: "If SUMIFS is given two criteria pairs, how must both conditions be satisfied for a row to be included?", o: ["Both conditions must be true at the same time (AND)", "Only one of the two needs to be true (OR)", "Neither condition needs to be true", "Only the first condition matters"], why: "SUMIFS combines every criteria pair with AND logic." },
     { q: "What happens if the criteria ranges in a SUMIFS formula are not all the same size (number of rows)?", o: ["Excel returns an error", "Excel ignores the extra rows silently", "Excel automatically resizes them to match", "Nothing changes; the formula still works"], why: "SUMIFS requires every range argument to have matching dimensions." }
   ],
   written: { q: "Rick now wants the total order value (not quantity) for each brand, using column E for order value and column C for brand. Write the formula for cell C2, assuming A2 holds the brand name, and explain each part.", model: "=SUMIFS($E$2:$E$1001,$C$2:$C$1001,$A2)\nThe first part, $E$2:$E$1001, is the sum_range: the column of order values that will be added up. The second part, $C$2:$C$1001, is the criteria_range: the column checked against the condition. The third part, $A2, is the criteria: only rows where the brand column equals the brand in A2 are included in the total. All three ranges use $ signs so the formula still works correctly when copied down to the other brands.", check: ["Gives a SUMIFS formula with the sum range first", "Correctly identifies the criteria range and criteria", "Explains why $ signs (absolute references) are used"] } },

 { id: "x4", title: "Filtering data with FILTER", anim: "filter", path: "Sprint 5.1 · FILTER",
   steps: ["Extract the year from the Date column using YEAR().", "Use FILTER to pull out records matching the chosen year.", "Join extra conditions (like brand) with the * symbol.", "Handle blank criteria cells with IF, so the filter still works when a box is empty."],
   lesson: [
     "COUNTIF and SUMIFS are great for totals, but sometimes Rick wants to see the <b>actual matching rows</b>, not just a number. The <b>FILTER</b> function returns a whole block of matching records at once.",
     { h: "Step 1: get the year" },
     "Dates are stored as a full date, but Rick wants to filter by year. The <b>YEAR</b> function pulls the year out of a date: <code>=YEAR(B2)</code> turns a date in B2 into just its year, such as 2020.",
     { h: "FILTER syntax" },
     "<code>FILTER(array, include, [if_empty])</code> returns only the rows of <b>array</b> where <b>include</b> is TRUE. For example, to fetch every record from a given year (typed into cell B2 of a filter worksheet):",
     "<code>=FILTER(Data!A2:D1001,YEAR(Data!B2:B1001)=B2)</code>",
     { h: "Combining several conditions" },
     "To filter by <b>year AND brand</b> together, multiply the two TRUE/FALSE conditions using <code>*</code>: <code>(YEAR(...)=B2)*(Data!C2:C1001=B3)</code>. In Excel, TRUE acts like 1 and FALSE like 0, so multiplying them together works like an AND: the result is only 1 (true) when <b>both</b> conditions are true.",
     { h: "Handling blank boxes" },
     "If a criteria cell is left blank, the condition would normally filter out everything. Wrapping each condition in <code>IF(cell=\"\",TRUE,...)</code> means an empty box is simply skipped, so the filter falls back to matching every row for that condition instead of none.",
     { h: "Counting what FILTER found" },
     "FILTER on its own does not count anything. Wrap the filtered range in <b>COUNTA</b> on one of the result columns (not a formula column) to see how many records were found, for example <code>=COUNTA(D2:D1001)</code>.",
     { tip: "Use \"No records found\" as the third FILTER argument (if_empty), so the sheet shows a clear message instead of a #CALC! error when nothing matches." }
   ],
   mcq: [
     { q: "What does the YEAR function do?", o: ["Extracts just the year number from a date", "Adds one year to a date", "Checks if a year is a leap year", "Converts text into a date"], why: "YEAR(date) returns the year part of a date value, such as 2020." },
     { q: "What does FILTER(array, include, [if_empty]) return?", o: ["Only the rows of array where include is TRUE", "A single count of matching rows", "The array sorted alphabetically", "Every row, with matches highlighted"], why: "FILTER is a dynamic array function: it returns the matching rows themselves." },
     { q: "To filter by both year AND brand at the same time, how are the two TRUE/FALSE conditions combined?", o: ["Multiply them together with *", "Add them together with +", "Subtract one from the other", "They cannot be combined in one formula"], why: "Multiplying TRUE (1) and FALSE (0) acts like an AND: the result is 1 only when both are true." },
     { q: "Why wrap each condition in IF(cell=\"\",TRUE,...) before filtering?", o: ["So a blank criteria box matches every row instead of none", "So Excel ignores the whole formula", "So the cell always shows the word TRUE", "So dates are automatically filled in"], why: "Without this, an empty criteria cell would make the condition false for every row, hiding all records." },
     { q: "After using FILTER, how can you count how many records were returned?", o: ["Wrap a result column in COUNTA, for example =COUNTA(D2:D1001)", "FILTER automatically shows the count in cell A1", "Use YEAR on the result", "It is not possible to count filtered results"], why: "COUNTA counts the non-blank cells in the spilled result range, giving the number of matches." }
   ],
   written: { q: "Explain why Rick's filter formula multiplies the year condition and the brand condition together with *, instead of just listing them one after another.", model: "In Excel, a condition like (YEAR(Data!B2:B1001)=B2) produces an array of TRUE and FALSE values, which behave like 1 and 0. Multiplying two such arrays together with * only gives 1 (true) for a row when both conditions are 1 (true) at the same time, and gives 0 (false) if either one is false. This is how Excel performs an AND between two conditions inside FILTER, so only rows matching the chosen year AND the chosen brand are returned, not rows matching either one alone.", check: ["Explains TRUE/FALSE act like 1/0", "Says multiplying gives an AND (both must be true)", "Connects this to why FILTER needs it for two conditions"] } },

 { id: "x5", title: "Master Challenge 1: Monthly summary report", anim: "challenge1", path: "Sprint 5.1 · Master Challenge 1",
   steps: ["Insert a new worksheet and add headers: Month, Total amount spent, Total budget.", "Fetch the unique month names with UNIQUE.", "Use SUMIFS to total the amount spent for each month.", "Copy the formula and repeat it for the budget column."],
   lesson: [
     "The Master Challenges use a different file: a company's monthly expenses across ten categories, with columns <b>Month, Category, Amount spent</b> and <b>Budget</b>, over 120 rows (rows 2 to 121).",
     { h: "The task" },
     "Create a summary report showing, for every month, the <b>total amount spent</b> across all categories and the <b>total budget</b> for that month.",
     { h: "Step 1: unique months" },
     "Go to cell A2 of a new worksheet and fetch the distinct month names with:",
     "<code>=UNIQUE(Expenses!A2:A121)</code>",
     "UNIQUE automatically spills one month into each row below A2, with no repeats.",
     { h: "Step 2: total amount spent" },
     "In cell B2, total the amount spent for the month in A2:",
     "<code>=SUMIFS(Expenses!$C$2:$C$121,Expenses!$A$2:$A$121,$A2)</code>",
     "Then use the fill handle to copy this formula down to the other months.",
     { h: "Step 3: total budget" },
     "In cell C2 (or B2 of a fresh column, depending on layout), total the budget the same way, just pointing to the budget column instead:",
     "<code>=SUMIFS($D$2:$D$121,$A$2:$A$121,$A2)</code>",
     { tip: "UNIQUE plus SUMIFS is a common combination: UNIQUE gives the row labels, SUMIFS fills in the numbers next to each one." }
   ],
   mcq: [
     { q: "What does =UNIQUE(Expenses!A2:A121) return?", o: ["A spilled list of the distinct month names, with no repeats", "The total number of months", "The first month only", "An error, because months repeat in the data"], why: "UNIQUE lists each distinct value once, spilling automatically into the cells below." },
     { q: "In the summary report, what is the purpose of SUMIFS(Expenses!$C$2:$C$121,Expenses!$A$2:$A$121,$A2)?", o: ["It totals the amount spent for the month listed in A2", "It counts how many categories exist", "It finds the unique months", "It lists every expense row for that month"], why: "SUMIFS adds the amount-spent column, restricted to rows where the month matches A2." },
     { q: "Why does the formula use Expenses!$A$2:$A$121 with full $ signs rather than Expenses!A2:A121?", o: ["So the criteria range stays fixed as the formula is copied to other months", "So Excel treats the months as numbers", "So the formula only works for the first month", "$ signs are required by UNIQUE, not SUMIFS"], why: "An absolute reference keeps the data range from shifting when the formula is filled down." },
     { q: "To get the total budget instead of total amount spent, what needs to change in the SUMIFS formula?", o: ["The sum_range should point to the budget column instead of the amount spent column", "Nothing; SUMIFS automatically finds the budget", "SUMIFS must be replaced with COUNTIFS", "The criteria range must point to the budget column"], why: "Only the column being summed changes; the month-matching logic stays the same." },
     { q: "What is a sensible order of steps for this challenge?", o: ["List the unique months first, then SUMIFS the amount spent, then SUMIFS the budget", "SUMIFS everything first, then delete the months", "Sort the data alphabetically before doing anything else", "Use COUNTIF before listing any months"], why: "The month labels from UNIQUE give the rows that the SUMIFS formulas then fill in." }
   ],
   written: { q: "Describe, step by step, how you would build the monthly summary report, including the exact formulas you would use in cells A2 and B2.", model: "First, insert a new worksheet and add the headers Month, Total amount spent and Total budget. In cell A2, type =UNIQUE(Expenses!A2:A121) to spill the list of distinct months down column A. Then in cell B2, type =SUMIFS(Expenses!$C$2:$C$121,Expenses!$A$2:$A$121,$A2) to total the amount spent for that month, using the fill handle to copy it down. Finally, repeat the same idea in column C with =SUMIFS(Expenses!$D$2:$D$121,Expenses!$A$2:$A$121,$A2) to get the total budget for each month.", check: ["Mentions UNIQUE for the month list", "Gives a correct SUMIFS formula for amount spent", "Explains copying the formula down / adapting it for budget"] } },

 { id: "x6", title: "Master Challenge 2: Over-budget filter", anim: "challenge2", path: "Sprint 5.1 · Master Challenge 2",
   steps: ["Insert a new worksheet and copy the headers from Expenses.", "Use FILTER to compare the amount spent column with the budget column.", "Add \"No records found\" as the if_empty argument.", "Count the matching records with COUNTA."],
   lesson: [
     "The second Master Challenge asks: list every month/category record where the <b>amount spent is more than the budget</b>, and count how many such records there are.",
     { h: "The filter condition" },
     "This time the condition compares <b>two columns of the same table</b> to each other, row by row, rather than comparing a column to one typed value. The condition is simply: amount spent &gt; budget.",
     { h: "The formula" },
     "In cell A2 of the new worksheet:",
     "<code>=FILTER(Expenses!A2:D121,Expenses!C2:C121&gt;Expenses!D2:D121,\"No records found\")</code>",
     "Expenses!C2:C121&gt;Expenses!D2:D121 produces TRUE for every row where spending went over budget, and FILTER keeps only those rows from the full table A2:D121.",
     { h: "Counting the records" },
     "Add a label \"Records found\" in a spare cell, for example G2, then count the result in H2 with:",
     "<code>=COUNTA(A2:A121)</code>",
     "Note that COUNTA is applied to the <b>spilled result column</b>, not to the original data, so it counts only the rows FILTER actually returned.",
     { tip: "Comparing two whole columns directly (C2:C121>D2:D121) is simpler than comparing a column to one fixed value &mdash; no $ signs are needed here because both ranges should move together, row by row." }
   ],
   mcq: [
     { q: "What condition does Challenge 2's FILTER use to find overspending records?", o: ["Amount spent is greater than budget, compared row by row", "Amount spent equals budget exactly", "The month is the current month", "Category is not blank"], why: "The task is to find rows where spending exceeded the budget, so > is used between the two columns." },
     { q: "In =FILTER(Expenses!A2:D121,Expenses!C2:C121>Expenses!D2:D121,\"No records found\"), what is the role of \"No records found\"?", o: ["It is shown instead of an error if no rows match", "It is the column being filtered", "It is a criteria range", "It renames the worksheet"], why: "The third FILTER argument (if_empty) is only used when nothing matches, avoiding a #CALC! error." },
     { q: "Why doesn't this FILTER condition need $ signs on C2:C121 and D2:D121?", o: ["Both ranges are meant to move together, row by row, as a single spilled formula, not be copied cell by cell", "FILTER formulas never accept $ signs", "The budget column never changes", "Only text comparisons need $ signs"], why: "FILTER spills from one formula; it is not dragged down row by row like COUNTIF or SUMIFS, so there is nothing to lock." },
     { q: "How is the number of overspending records counted?", o: ["COUNTA is applied to one column of the filtered (spilled) result, e.g. =COUNTA(A2:A121)", "FILTER shows the count automatically in cell A1", "SUM is applied to the category column", "COUNTIF is applied to the budget column"], why: "COUNTA counts the non-blank cells that FILTER actually spilled into the result range." },
     { q: "What would happen if Expenses!C2:C121>Expenses!D2:D121 were changed to Expenses!C2:C121<Expenses!D2:D121?", o: ["It would instead list records where spending was under budget", "The formula would produce an error", "Nothing would change", "It would count records instead of listing them"], why: "Reversing the comparison operator reverses which rows the condition treats as a match." }
   ],
   written: { q: "Explain how FILTER finds rows where the amount spent is more than the budget, and how you would then find out how many such rows exist.", model: "The condition Expenses!C2:C121>Expenses!D2:D121 compares the amount spent column with the budget column for every row at once, producing TRUE for rows where spending is higher than the budget and FALSE otherwise. FILTER then keeps only the full rows (Expenses!A2:D121) where that condition is TRUE, spilling them into the new worksheet, and shows \"No records found\" if none match. To find out how many records were found, I would use COUNTA on one of the spilled result columns, for example =COUNTA(A2:A121), which counts only the rows that actually came through the filter.", check: ["Explains the row-by-row comparison between spending and budget", "Explains FILTER keeps only the TRUE rows", "Mentions COUNTA on the result to count matches"] } },

 { id: "x7", title: "Master Challenge 3: Three-criteria dynamic filter", anim: "challenge3", path: "Sprint 5.1 · Master Challenge 3",
   steps: ["Add three input cells: Month, Category, Amount spent greater than.", "Wrap each condition in IF so a blank box matches everything.", "Multiply the three conditions together inside FILTER.", "Count the results, and check every case: all blank, one filled, two filled, all three filled."],
   lesson: [
     "The final Master Challenge combines everything: a <b>dynamic filter</b> with up to three optional criteria &mdash; <b>Month</b>, <b>Category</b> and <b>Amount spent greater than</b> a value &mdash; where any of the three boxes can be left blank.",
     { h: "Setting up the inputs" },
     "Add three input cells, for example B2 (Month), B3 (Category) and B4 (Amount spent greater than), and a \"Records found\" cell at B5. Copy the headers from Expenses into row 1 of the new sheet, starting at column D.",
     { h: "Building the condition" },
     "Each of the three checks is wrapped in IF so a blank box means \"match everything\" for that condition:",
     "<code>IF(B2=\"\",TRUE,(Expenses!A2:A121=B2))*IF(B3=\"\",TRUE,(Expenses!B2:B121=B3))*IF(B4=\"\",TRUE,(Expenses!C2:C121&gt;B4))</code>",
     "Multiplying the three IF results together (with *) means a row only survives when <b>every</b> active condition is true &mdash; blank boxes simply drop out of the AND.",
     { h: "The full formula" },
     "In cell D2:",
     "<code>=IF(COUNTA(B2:B4)=0,Expenses!A2:D121,FILTER(Expenses!A2:D121,IF(B2=\"\",TRUE,(Expenses!A2:A121=B2))*IF(B3=\"\",TRUE,(Expenses!B2:B121=B3))*IF(B4=\"\",TRUE,(Expenses!C2:C121&gt;B4)),\"No records found\"))</code>",
     "The outer IF is a shortcut: if <b>all three</b> boxes are empty (COUNTA(B2:B4)=0), it skips FILTER entirely and just shows the whole table.",
     { h: "Counting and checking" },
     "Count the records with COUNTA on a results column, e.g. <code>=COUNTA(D2:D121)</code>, excluding the header. Then test every case: no boxes filled, only Month filled, Month and Category filled, Category and Amount filled, and all three filled &mdash; each should return a sensible, correctly filtered result.",
     { tip: "Build and test formulas one condition at a time. Get a single-criteria filter working first, then add the next IF*condition, so it is easy to spot which part broke something." }
   ],
   mcq: [
     { q: "What is the purpose of wrapping each condition in IF(box=\"\",TRUE,...)?", o: ["So a blank input box matches every row instead of none", "So the formula ignores that condition completely", "So Excel highlights the blank cell in red", "So the box automatically fills itself in"], why: "A blank box means TRUE, so multiplying it into the AND has no restricting effect on the result." },
     { q: "Why are the three IF results multiplied together with *, rather than added with +?", o: ["Multiplying TRUE/FALSE values acts like an AND: every active condition must be true", "Adding would always give an error", "Multiplication is required by FILTER's syntax", "There is no difference between * and + here"], why: "TRUE behaves like 1 and FALSE like 0; multiplying several of them is only 1 when all are 1 (an AND)." },
     { q: "What does the outer IF(COUNTA(B2:B4)=0, Expenses!A2:D121, FILTER(...)) do?", o: ["If every input box is empty, it shows the whole table instead of running FILTER", "It always runs FILTER no matter what", "It counts how many rows FILTER returned", "It clears the input boxes automatically"], why: "COUNTA(B2:B4)=0 checks whether all three criteria boxes are blank, and if so skips straight to the full table." },
     { q: "If only the Category box (B3) is filled in and Month and Amount are blank, what should the formula do?", o: ["Filter by Category only, treating Month and Amount as matching every row", "Return an error because two boxes are blank", "Ignore the Category filter completely", "Only ever work when all three boxes are filled"], why: "Each blank condition evaluates to TRUE for every row, leaving only the filled-in condition (Category) actually restricting the results." },
     { q: "Why is it good practice to test the formula with every combination of filled and blank boxes?", o: ["Because each combination exercises different IF branches, and a mistake in one might not show up in the others", "Because Excel requires every combination to be tested before saving", "Because FILTER only works after five tests", "Testing combinations is not necessary once the formula is written once"], why: "Thorough testing of each case (all blank, one filled, two filled, all three) helps catch logic errors that a single test might miss." }
   ],
   written: { q: "A student's formula works when all three boxes (Month, Category, Amount) are filled in, but gives wrong results when a box is left blank. Explain what is probably missing from their formula and how to fix it.", model: "The formula is probably missing the IF(box=\"\",TRUE,...) wrapper around one or more of the conditions. Without it, a blank box is compared directly to the data (for example Expenses!A2:A121=B2 when B2 is blank), which is FALSE for every single row, so that condition wipes out the whole result instead of being ignored. The fix is to wrap every condition in IF, for example IF(B2=\"\",TRUE,(Expenses!A2:A121=B2)), so that a blank box always evaluates to TRUE and simply drops out of the multiplied AND, letting the other active conditions still filter correctly.", check: ["Identifies the missing IF(box=\"\",TRUE,...) wrapper", "Explains why a blank box without IF makes the condition false for every row", "Gives a corrected approach or formula fragment"] } }

] }
] };
