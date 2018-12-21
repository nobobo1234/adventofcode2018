const fs = require('fs');

const inBetweenString = (string, char1, char2) => {
    return string.substring(string.lastIndexOf(char1) + 1, string.lastIndexOf(char2));
}

const getMinutesInBetween = (min1, min2) => {

}

const part1 = () => {
    // Sort all the dates
    const dates = fs.readFileSync(`${__dirname}/day4input.txt`).toString().split('\n')
        .sort((a, b) => {
            const dateStringA = inBetweenString(a, '[', ']'),
                dateStringB = inBetweenString(b, '[', ']'),
                dateA = new Date(dateStringA),
                dateB = new Date(dateStringB);
            return dateA - dateB;
        });

    // Calculate the total minutes slept for each guard
    const guardSleep = new Map();
    let guardId = 0,
        prevDate;
    for(const date of dates) {
        const action = date.substring(date.lastIndexOf(']')+2, date.length);
        if(action.startsWith('Guard')) {
            guardId = parseInt(inBetweenString(action, '#', ' begins'));
            prevDate = new Date(inBetweenString(date, '[', ']'));
        } else if(action.startsWith('falls asleep')) {
            prevDate = new Date(inBetweenString(date, '[', ']'));
        } else if(action.startsWith('wakes up')) {
            const awakeDate = new Date(inBetweenString(date, '[', ']'));
            const diffMins = Math.floor((awakeDate - prevDate)/60000);
            if(guardSleep.has(guardId)) {
                guardSleep.set(guardId, guardSleep.get(guardId) + diffMins);
            } else {
                guardSleep.set(guardId, diffMins);
            }
        }
    }

    // Find guard who slept the most
    let highestGuardId = guardSleep.keys().next().value, 
        highestGuardMins = guardSleep.get(highestGuardId);
    guardSleep.forEach((guardId, mins) => {
        if(highestGuardMins < mins){
            highestGuardId = guardId;
            highestGuardMins = mins;
        }
    })
    

    // Find minute guard sleeps the most
    
}

console.log(part1())