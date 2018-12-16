const fs = require('fs');
const readline = require('readline');

const part1 = () => {
    sum = 0;
    fs.readFileSync(`${__dirname}/day1input.txt`)
        .toString()
        .split('\n')
        .forEach(number => {
            sum += parseInt(number)
        });
    return sum;
}

console.log(part1());