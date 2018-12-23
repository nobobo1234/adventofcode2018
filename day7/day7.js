const fs = require('fs');

const part1 = () => {
    const instructions = fs.readFileSync(`${__dirname}/day7input.txt`).toString().split('\n')
        .map(instruction => {
            const req = instruction[5]; // Index of instruction letter requirement
            const after = instruction[instruction.length - 12]; // Index of instruction letter that can be done after requirement is finished
            return [req, after];
        })
    console.log(instructions);
}

console.log(part1())