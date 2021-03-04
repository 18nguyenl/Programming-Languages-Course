// Long Nguyen
// 1001247753
// 3/3/2021

// Lab 1

//////////////
// 1
//////////////
const inputtable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // inputtable for #2.

//////////////
// 2
/////////////

// Helper functions for alternate approaches (using recursion)
const mulN = n => x => n * x; // Multiplies a number by "n"

// given the inputtable and a starting index on it, multiply each number determined by mulN 
function mul (it, index, mulN) {
    // Stop case when index out of bounds
    if (index >= it.length)
        return "";
    else
        return mulN(it[index]) + " " + mul(it, index + 1, mulN);
};

// for each element of inputtable, multiply by 5 to get a multiple of 5
const fiveTable = inputtable.map((x) => {
    return x * 5;
});

// for multiplying by 5
const m5 = mul(inputtable, 0, mulN(5));

// for each element of inputtable, multiply by 13 to get a multiple of 13
const thirteenTable = inputtable.map((x) => {
    return x * 13;
});

// for multiplying by 13
const m13 = mul(inputtable, 0, mulN(13));

// for each element of inputtable, multiply by x to get a square of x
const squaresTable = inputtable.map((x) => {
    return x * x;
});

// for squaring
const msquare = mul(inputtable, 0, (x) => mulN(1)(x) * mulN(1)(x));

console.log(fiveTable);
console.log(thirteenTable);
console.log(squaresTable);

//////////////
// 3
//////////////
const largeInputTable = [
    1,  2,  3,   4,  5,  6,  7,  8,  9, 10, 11, 12,
   13, 14, 15,  16, 17, 18, 19, 20, 21, 22, 23, 24,
   25, 26, 27,  28, 29, 30, 31, 32, 33, 34, 35, 36,
   37, 38, 39,  40, 41, 42, 43, 44, 45, 46, 47, 48,
   49, 50, 51,  52, 53, 54, 55, 56, 57, 58, 59, 60,
   61, 62, 63,  64, 65, 66, 67, 68, 69, 70, 71, 72,
   73, 74, 75,  76, 77, 78, 79, 80, 81, 82, 83, 84,
   85, 86, 87,  88, 89, 90, 91, 92, 93, 94, 95, 96,
   97, 98, 99, 100
 ];

// "filter the large input table if it is even and a multiple of five"
const oddMult5 = largeInputTable.filter((x) => x % 2 == 1 && x % 5 == 0);

console.log(oddMult5);

//////////////
// 4
//////////////

// "filter the large input table if it is even and a multiple of seven then take the filtered values and sum all the values starting at the 0th index"
const evenSumMult7 = largeInputTable.filter((x) => x % 2 == 0 && x % 7 == 0).reduce((prev, curr) => prev + curr, 0);

console.log(evenSumMult7);

//////////////
// 5
//////////////

// This is a currying function (taking multiple arguments and making subfunctions for each w/ one argument)
// I pass r first which sets r in the child function
// After invoking cylinder_volume once, it returns a child function with r set. Passing h would return the cylinder_volume
const cylinder_volume = r => h => 3.14 * r * r * h;

console.log(cylinder_volume(5)(10));

//////////////
// 6
//////////////

// The provided makeTag closure that allows one to specify the beginTag and endTag for a "tag builder"
const makeTag = function(beginTag, endTag) {
    return function(textContent) { 
        return beginTag + textContent + endTag;
    }
}

// For each line, I'm using the makeTag closure to capture the beginTag and endTag in the child function
// The child function will nest text content in between the tags from the parent
// The child function essentially becomes a "tag builder" that I can use to construct HTML tags
// I make three "tag generators below"
const makeTableTag = makeTag("<table>", "</table>");
const makeTrTag = makeTag("<tr>", "</tr>");
const makeTdTag = makeTag("<td>", "</td>");
const makeThTag = makeTag("<th>", "</th>");

// I nest the text output of each tag into the "tag builder" for each function
// This allows me to nest tags, but this is a one-element example
const finalStr = makeTableTag(makeTrTag(makeTdTag("Long")));

// Using tags to nest and nest and nest...
const anotherFinalStr = makeTableTag(
        makeTrTag(
            makeThTag("First Name") + makeThTag("Lastname") + makeThTag("Age")
        ) +
        makeTrTag(
            makeTdTag("Long") + makeTdTag("Nguyen") + makeTdTag("20")
        )
    );

console.log(finalStr);

//////////////
// 8
//////////////

const isMulN = n => x => x % n == 0; // Determines if a number x is a multiple given n

const parity = x => n => (n % 2 === x); // Determines whether to test for even or odd
const isEven = parity(0); // Set the test to even
const isOdd = parity(1);  // Set the test to odd

// par - the determined parity function (even or odd)
// mul - the multiple to compare against
// iscount - are we taking the sum or counting the range?
// stop - which index to stop the range of numbers
// start - which index to start the range of numbers
// a recursive function that returns either the sum or selection of even/odd numbers if it is under a specified multiple
const get = function (par, mul, isCount, stop) {
    // The main recursive function
    return function loop (start) {
        // Stop case when recursion is out of bounds
        if (start > stop) {
            return isCount ? "" : 0;
        }
        // Test the parity and if the number is a multiple
        if (par(start) && mul(start))
            // Return the accumulating selection
            if (isCount)
                return start.toString() + " " + loop(start + 1);
            else 
                // Return the current sum
                return start + loop(start + 1);
        // Continue execution
        return loop(start + 1);
    }
}

const number5 = get(isOdd, isMulN(5), true, 100);
const number3 = get(isEven, isMulN(3), true, 100);
const number7 = get(isEven, isMulN(7), false, 100);
const number72 = get(isEven, isMulN(7), true, 100);

console.log(number3(1));
console.log(number5(1));
console.log(number7(1));
console.log(number72(1));