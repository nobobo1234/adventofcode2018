const fs = require('fs');

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
    const strings = []
    const ids = fs.readFileSync(`${__dirname}/day2input.txt`).toString().split('\n')
        .forEach(id => {
            const otherIds = 
        })
}

console.log(part1());