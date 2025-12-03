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

    for (const id of allIds) {
        const idStringLength = `${id}`.length;
        if (idStringLength % 2 !== 0) continue;

        const midpoint = idStringLength / 2;

        const idFirstHalf = `${id}`.slice(0, midpoint);
        const idSecondHalf = `${id}`.slice(midpoint);

        idFirstHalf === idSecondHalf ? invalidIds.push(id) : null;
    }
}

const invalidIdSum = invalidIds.reduce((accu, curr) => accu + curr, 0);
console.log(invalidIdSum);

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
