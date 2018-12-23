const fs = require('fs');

const flatten = array => [].concat(...array);

const claimsTo2DArray = (claims) => {
    const array = Array.from({ length: 1000 }, a => Array.from({ length: 1000 }));
    for(const claim of claims) {
        const coordinates = claim.coordinates,
            dimensions = claim.dimensions;
        for(let y = coordinates[1]; y < coordinates[1] + dimensions[1]; y++) {
            for(let x = coordinates[0]; x < coordinates[0] + dimensions[0]; x++) {
                if(array[y][x] === 1) {
                    array[y][x] = true; // Value is overlapped
                    continue;
                } else if(array[y][x] === true) {
                    continue;
                } else {
                    array[y][x] = 1; // Value is taken once
                }
            }
        }
    }
    return array;
}

const part1 = () => {
    const claims = fs.readFileSync(`${__dirname}/day3input.txt`).toString().split('\n')
        .map(el => ({
            coordinates: el.split(' @ ')[1].split(': ')[0].split(',').map(Number),
            dimensions: el.split(' @ ')[1].split(': ')[1].split('x').map(Number)
        }));
    return flatten(claimsTo2DArray(claims)).filter(el => el === 1).length;
}

const part2 = () => {
    const claims = fs.readFileSync(`${__dirname}/day3input.txt`).toString().split('\n')
        .map(el => ({
            coordinates: el.split(' @ ')[1].split(': ')[0].split(',').map(Number),
            dimensions: el.split(' @ ')[1].split(': ')[1].split('x').map(Number)
        }));
    const array = claimsTo2DArray(claims);

    for(let i = 0; i < claims.length; i++) {
        let coordinates = claims[i].coordinates,
            dimensions = claims[i].dimensions,
            equalTo1 = true;
        for(let y = coordinates[1]; y < coordinates[1] + dimensions[1]; y++) {
            for(let x = coordinates[0]; x < coordinates[0] + dimensions[0]; x++) {
                if(equalTo1 === false) break;
                if(array[y][x] === 1) equalTo1 = true;
                if(array[y][x] === true) equalTo1 = false;
            }
        }
        if(equalTo1) return i+1;
    }
    
    return 'No non-overlapping claim was found';
}

console.log(`The solution to day 3 part 1 is: ${part1()}`);
console.log(`The solution to day 3 part 2 is: ${part2()}`);