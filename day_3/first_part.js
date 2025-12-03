//@ts-check

/** @type {HTMLElement | null}*/
const pre = document.querySelector("pre");

if (pre === null) throw Error("pre element not present to extract input");

/**@type {string[]} */
let input = pre.textContent.split("\n");
input.pop(); // remove the "" at the end;

/**@type {number[]} */
const joltages = [];

for (const bank of input) {
    /**@type {string[]} */
    let sortedArray = bank.split("");
    sortedArray = sortedArray.toSorted((a, b) => Number(b) - Number(a));

    const first = sortedArray[0];
    const second = sortedArray[1];
    const indexOfFirst = bank.indexOf(first);
    const indexOfSecond = bank.indexOf(second);

    if (first === second) joltages.push(Number(first.concat(second)));
    else if (indexOfFirst < indexOfSecond)
        joltages.push(Number(first.concat(second)));
    else if (indexOfFirst > indexOfSecond && indexOfFirst === bank.length -1)
        joltages.push(Number(second.concat(first)));
    else {
        let sortedArray = bank.slice(indexOfFirst).split("");
        sortedArray = sortedArray.toSorted((a, b) => Number(b) - Number(a));

        const second = sortedArray[1];
        joltages.push(Number(first.concat(second)));
    }
}

console.log(joltages.reduce((accu, curr) => accu + curr, 0));
