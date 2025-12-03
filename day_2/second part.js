//@ts-check

/** @type {HTMLElement | null}*/
const pre = document.querySelector("pre");

if (pre === null) throw Error("pre element not present to extract input");

/**@type {string[]} */
let input = pre.textContent.split("\n").join("").split(",");

const primeNumbers = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]);

/** @type { number[] } */
let invalidIds = [];

for (const idRange of input) {
    const idRangeStart = Number(idRange.split("-")[0]);
    const idRangeEnd = Number(idRange.split("-")[1]);

    const allIds = [...range(idRangeStart, idRangeEnd)];
    invalidIds = invalidIds.concat(checkInvalidIds(allIds));
}

const invalidIdSum = invalidIds.reduce((accu, curr) => accu + curr, 0);

console.log(invalidIdSum);

/**
 *
 * @param {number[]} ids
 * @returns {number[]}
 */
function checkInvalidIds(ids) {
    /**@type {number[]} */
    const invalidIds = [];

    for (const id of ids) {
        const idString = `${id}`;
        if (primeNumbers.has(idString.length))
            hasRepeatingPattern(idString, [1]) ? invalidIds.push(id) : null;
        else {
            /**@type {number[]} */
            const idFactors = getFactors(`${id}`.length);

            if (hasRepeatingPattern(idString, idFactors)) invalidIds.push(id);
        }
    }

    return invalidIds;
}

/**
 *
 * @param {string} string
 * @param {number[]} intervals
 * @returns {boolean}
 */
function hasRepeatingPattern(string, intervals) {
    for (const interval of intervals) {
        const repeatString = string.slice(0, interval);
        let hasRepeat = true;

        for (let i = interval; i < string.length; i = i + interval) {
            const sliceEnd = i + interval;
            const subString = string.slice(i, sliceEnd);
            if (repeatString !== subString) hasRepeat = false;
        }

        if (hasRepeat) return hasRepeat;
    }

    return false;
}

/**
 * a generator function to generate a range of numbers.
 * use it with spread operator like this ```[...range(2, 5)] = [2,3,4,5]```
 * @param {number} start
 * @param {number} end
 */
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

/**
 * This functions returns an array of numbers that are factors of given number
 * @param {number} num
 * @returns {number[]}
 */
function getFactors(num) {
    const midpoint = Math.floor(num / 2);
    const factors = [1];

    for (let i = 2; i <= midpoint; i++) {
        if (num % i === 0) factors.push(i);
    }

    return factors;
}
