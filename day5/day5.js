const fs = require('fs');

const isUpperCase = (char) => char.toUpperCase() === char;
const isLowerCase = (char) => char.toLowerCase() === char;
const sameChar = (char1, char2) => char1.toLowerCase() === char2.toLowerCase();

const part1 = () => {
    const polymer = fs.readFileSync(`${__dirname}/day5input.txt`).toString().split('');
    for(let i = polymer.length - 1; i > 0; i--) {
        const currU = polymer[i];
        const prevU = polymer[i-1];
        if(isUpperCase(currU) && isLowerCase(prevU) && sameChar(currU, prevU)) {
            polymer.splice(i-1, 2);
        } else if(isLowerCase(currU) && isUpperCase(prevU) && sameChar(currU, prevU)) {
            polymer.splice(i-1, 2);
        }
    }
    return polymer.length;
}

console.log(`The solution to day 5 part 1 is ${part1()}`);