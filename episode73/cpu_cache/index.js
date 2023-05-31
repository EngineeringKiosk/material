// write a js program to demonstrate CPU cache missing
// by running through a large matrix

// run the program node index.js <mode> to see the difference
// you can use "all", "row" or "column" as mode (default is "all")
// you can use perf to see more details
// example:
// perf stat -e L1-dcache-loads,L1-dcache-load-misses,L1-dcache-stores node index.js row
// vs.
// perf stat -e L1-dcache-loads,L1-dcache-load-misses,L1-dcache-stores node index.js column

const matrix = [];
const size = 10000;

// initialize matrix
for (let i = 0; i < size; i++) {
  matrix[i] = [];
  for (let j = 0; j < size; j++) {
    matrix[i][j] = 1;
  }
}

// function to run through matrix column by column or row by row
function runThroughMatrix(mode = "row") {
  if (mode === "row") {
    console.log("Running through matrix row by row");
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        matrix[i][j]++;
      }
    }
  } else {
    console.log("Running through matrix column by column");
    for (let j = 0; j < size; j++) {
      for (let i = 0; i < size; i++) {
        matrix[i][j]++;
      }
    }
  }
}

// function which takes a callback to execute and tracks the time to execute
// use clock time for measuring time
function trackTime(callback) {
  const start = process.hrtime();
  callback();
  const end = process.hrtime(start);
  console.log(`Time: ${(end[0] * 1000) + (end[1] / 1000000)}ms \n`);
}

// get first parameter from command line
const mode = process.argv[2] || "all";

if (mode === "all" || mode === "row") {
  console.log("First run through matrix row by row to warm up CPU cache");
  trackTime(() => runThroughMatrix("row"));
  console.log("Second run through matrix row by row, which should be faster than the first run");
  trackTime(() => runThroughMatrix("row"));
  console.log("Third run through matrix row by row");
  trackTime(() => runThroughMatrix("row"));
}

if (mode === "all" || mode === "column") {
  console.log("First run through matrix column by column to warm up CPU cache");
  trackTime(() => runThroughMatrix("column"));
  console.log("Second run through matrix column by column, this is not faster than the first run");
  trackTime(() => runThroughMatrix("column"));
  console.log("Third run through matrix column by column");
  trackTime(() => runThroughMatrix("column"));
}

console.log("done");

