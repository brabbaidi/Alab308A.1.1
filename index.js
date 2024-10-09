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



//Part 3

//cache the element where the prime numbers will be displayed.

const primeContainer = document.getElementById('prime-container');


//Write a Function to Check Prime Numbers
const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

//Implement Deferred Execution with setTimeout
function displayPrimes(n) {
    let currentNum = 1;

    function findAndRenderPrime() {
        if (currentNum > n) {
            alert('Calculation is finished');
            return;
        }

        // Check if the current number is prime and display it if so
        if (isPrime(currentNum)) {
            const primeElement = document.createElement('p');
            primeElement.textContent = currentNum;
            primeContainer.appendChild(primeElement);
        }

        // Increment the number and set the next execution using setTimeout
        currentNum++;
        setTimeout(findAndRenderPrime, 0); // Defer the next iteration
    }

    findAndRenderPrime();
}

// Run the function for n = 10,000
displayPrimes(10000);

