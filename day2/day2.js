const fs = require('fs');

const part1 = () => {
    const counts = {
        twice: 0, 
        thrice: 0
    }
    const ids = fs.readFileSync(`${__dirname}/day2input.txt`).toString().split('\n')
        .forEach(id => {
            const idarray = id.split('').sort();
            let i = 0, 
                letter = idarray[0], 
                count = 0, 
                twiceTaken = false, 
                thriceTaken = false;
            while(i !== idarray.length) {
                if(letter !== idarray[i]) {
                    if(count === 2 && !twiceTaken) {
                        counts.twice++;
                        twiceTaken = true;
                    } else if(count === 3 && !thriceTaken) {
                        counts.thrice++;
                        thriceTaken = true;
                    }
                    count = 0;
                    letter = idarray[i];
                } else if(letter === idarray[i]) {
                    i++;
                    count += 1;
                }
            }
        })
    return counts.twice * counts.thrice;
}

console.log(part1());