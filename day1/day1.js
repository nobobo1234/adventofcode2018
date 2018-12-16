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

const part2 = () => {
    const frequencies = fs.readFileSync(`${__dirname}/day1input.txt`).toString().split('\n');
    const sums = [];
    let i = 0,
        sum = 0;
    while(i !== frequencies.length + 1) {
        if(i === frequencies.length) i = 0;

        sum += Number(frequencies[i]);
        if(sums.includes(sum)) return sum;

        sums.push(sum);
        i++;
    }
}

console.log(`Solution to day1 part 1 is: ${part1()}`);
console.log(`Solution to day1 part 2 is: ${part2()}`);