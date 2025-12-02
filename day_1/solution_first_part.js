//@ts-check

/** @type {HTMLElement | null}*/
const pre = document.querySelector("pre");

if (pre === null) throw Error("pre element not present to extract input");

/**@type {string[]} */
let input = pre.textContent.split("\n");
input.pop(); //remove the "" at the end of array

let dialCurrentPosition = 50;
let zeroCounter = 0;

for (let element of input) {
    const direction = element.split("")[0];
    const num = Number(element.split("").slice(1).join(""));

    const rotationOffset = getRotationOffset(direction, num);
    dialCurrentPosition = rotateDial(dialCurrentPosition, rotationOffset);

    if (dialCurrentPosition === 0) zeroCounter++;
}

console.log(zeroCounter);

/**
 * @param {number} currentPosition current position of dial
 * @param {number} rotationOffset offset to roate the dial by
 * @returns {number} the new position of the dial
 */
function rotateDial(currentPosition, rotationOffset) {
    let newPosition = currentPosition + rotationOffset;

    while (newPosition < 0 || newPosition > 99) {
        /*use 100 instead of 99 because 99 to 0 and 0 to 99 consumes one rotation */
        if (newPosition < 0) newPosition = 100 - Math.abs(newPosition);
        else if (newPosition > 99) newPosition = newPosition - 100;
    }

    return newPosition;
}

/**
 * @param {string} direction the direction to rotate the dial in
 * @param {number} number exact number to offset the dial by
 * @returns { number } can be negative if direction is "l", postive if direction is "r"
 */
function getRotationOffset(direction, number) {
    return direction.toLocaleLowerCase().trim() === "l" ? -number : number;
}
