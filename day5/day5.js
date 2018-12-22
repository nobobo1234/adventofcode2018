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

const part2 = () => {
    const polymer = fs.readFileSync(`${__dirname}/day5input.txt`).toString().split('');
    let shortestLength = polymer.length;
    for(let i = 97; i < 97 + 26; i++) {
        const letter = String.fromCharCode(i);
        const filteredPolymer = polymer.filter(unit => !sameChar(letter, unit));
        for(let i = filteredPolymer.length - 1; i > 0; i--) {
            const currU = i !== filteredPolymer.length ? filteredPolymer[i] : filteredPolymer[i-1];
            const prevU = i !== filteredPolymer.length ? filteredPolymer[i-1] : filteredPolymer[i-2];
            if(isUpperCase(currU) && isLowerCase(prevU) && sameChar(currU, prevU)) {
                filteredPolymer.splice(i-1, 2);
            } else if(isLowerCase(currU) && isUpperCase(prevU) && sameChar(currU, prevU)) {
                filteredPolymer.splice(i-1, 2);
            }
        }
        if(filteredPolymer.length < shortestLength) {
            shortestLength = filteredPolymer.length;
        }
    }
    return shortestLength;
}

console.log(`The solution to day 5 part 1 is ${part1()}`);
console.log(`The solution to day 5 part 2 is ${part2()}`);