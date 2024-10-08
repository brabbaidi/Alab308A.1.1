//Part 1

let counter = 0; 
function recursiveFunction() {
  counter++;
  recursiveFunction();
}

try {
  recursiveFunction();
} catch (error) {
  console.log("Error caught:", error.message);
  console.log("Maximum call stack size:", counter);
}
