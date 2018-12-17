const fs = require('fs');

const hammingDistance = (string1, string2) => {
    let distance = 0;
    for(i = 0; i < string1.length; i++) {
        if(string1[i] !== string2[i]) distance++;
    }
    return distance;
}

const part1 = () => {
    const counts = {
        twice: 0, 
        thrice: 0
    }
    const ids = fs.readFileSync(`${__dirname}/day2input.txt`).toString().split('\n')
        .forEach(id => {
            const idArray = id.split('').sort();
            let i = 0, 
                letter = idArray[0], 
                count = 0, 
                twiceTaken = false, 
                thriceTaken = false;
            while(i !== idArray.length) {
                if(letter !== idArray[i]) {
                    if(count === 2 && !twiceTaken) {
                        counts.twice++;
                        twiceTaken = true;
                    } else if(count === 3 && !thriceTaken) {
                        counts.thrice++;
                        thriceTaken = true;
                    }
                    count = 0;
                    letter = idArray[i];
                } else if(letter === idArray[i]) {
                    i++;
                    count += 1;
                }
            }
        })
    return counts.twice * counts.thrice;
}

const part2 = () => {
    let strings = []
    const ids = fs.readFileSync(`${__dirname}/day2input.txt`).toString().split('\r\n')
    for(id of ids) {
        ids.filter(el => el !== id).forEach(el => {
            if(hammingDistance(id, el) === 1) strings.push(id, el);
        });
    }
    // Removing duplicate two entries and making final string
    strings.splice(0,2);
    let string = '';
    for(let i = 0; i < strings[0].length; i++) {
        if(strings[0][i] === strings[1][i]) string += strings[0][i];
    }
    return string;
}

console.log(`Solution to day 2 part 1 is: ${part1()}`);
console.log(`Solution to day 2 part 2 is: ${part2()}`);