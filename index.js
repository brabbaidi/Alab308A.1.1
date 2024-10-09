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

//Part 2

//write a recursive function that flattens an array
const flattenArray = (arr) => {
  return arr.reduce((acc, val) => {
    return Array.isArray(val)
      ? acc.concat(flattenArray(val)) // recursive call for nested arrays
      : acc.concat(val); // base case, push non-array values
  }, []);
};

//Modify the Recursive Function for Trampolining
const flatArrayTrampoline = (arr, acc = []) => {
  if (arr.length === 0) return acc;

  const [first, ...rest] = arr;

  if (Array.isArray(first)) {
    // Return a function instead of making a direct recursive call
    return () => flatArrayTrampoline(first.concat(rest), acc);
  } else {
    return () => flatArrayTrampoline(rest, acc.concat(first));
  }
};

//Implement the Trampoline Function
const trampoline = (fn, ...args) => {
  let result = fn(...args);
  while (typeof result === "function") {
    result = result();
  }
  return result;
};

//Using the Trampolined Flatten Function
const deeplyNestedArray = [1, [2, [3, [4, [5, [6, [7, [8, [9]]]]]]]]];

// Flatten the deeply nested array
const flattenedArray = trampoline(flatArrayTrampoline, deeplyNestedArray);
console.log(flattenedArray);
