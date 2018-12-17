const fs = require('fs');

const part1 = () => {
    const counts = {
        twice: 0, 
        thrice: 0
    }
    const ids = fs.readFileSync(`${__dirname}/day2input.txt`).toString().split('\n')
        .forEach(id => {
            const idarray = id.split('').sort();
            let i = 0;
            while(i !== idarray.length) {
                let count = 0;
                
            }
        })
}

console.log(part1());