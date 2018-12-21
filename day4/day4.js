const fs = require('fs');

const inBetweenString = (string, char1, char2) => {
    return string.substring(string.lastIndexOf(char1) + 1, string.lastIndexOf(char2));
}

const getMinutesInBetween = (min1, min2) => {
    let array = [];
    if(min1 > min2) {
        for(let i = min1; i < 60; i++) {
            array.push(i);
        }
        for(let i = 0; i <= min2; i++) {
            array.push(i);
        }
    } else {
        for(let i = min1; i <= min2; i++) {
            array.push(i);
        }
    }
    return array;
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
            const diffMins = Math.floor((awakeDate - prevDate)/60000) - 1;
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
    guardSleep.forEach((mins, guardId) => {
        if(highestGuardMins < mins){
            highestGuardId = guardId;
            highestGuardMins = mins;
        }
    })
    

    // Find minute guard sleeps the most
    const minutes = {};
    highestGuardSleeps = false;
    for(date of dates) {
        const action = date.substring(date.lastIndexOf(']')+2, date.length);
        if(action.startsWith(`Guard #${highestGuardId}`)) {
            highestGuardSleeps = true;
            prevDate = new Date(inBetweenString(date, '[', ']'));
        } else if(highestGuardSleeps && action.startsWith('falls asleep')) {
            prevDate = new Date(inBetweenString(date, '[', ']'));
        } else if(highestGuardSleeps && action.startsWith('wakes up')) {
            const awakeDate = new Date(inBetweenString(date, '[', ']'));
            getMinutesInBetween(prevDate.getMinutes(), awakeDate.getMinutes()-1)
                .forEach(min => {
                    minutes[min] ? minutes[min] += 1 : minutes[min] = 1;
                });
        } else {
            highestGuardSleeps = false
        }
    }

    let highestMinute = 0,
        highestMinuteCount = 0;
    Object.entries(minutes).forEach(([key, value]) => {
        if(value > highestMinuteCount) {
            highestMinuteCount = value;
            highestMinute = key;
        }
    });

    return highestGuardId * highestMinute;
}

const part2 = () => {
    // Sort all the dates
    const dates = fs.readFileSync(`${__dirname}/day4input.txt`).toString().split('\n')
        .sort((a, b) => {
            const dateStringA = inBetweenString(a, '[', ']'),
                dateStringB = inBetweenString(b, '[', ']'),
                dateA = new Date(dateStringA),
                dateB = new Date(dateStringB);
            return dateA - dateB;
        });


    // Find minutes all the guards sleep and store them in a big Map
    const minutesAllGuards = {};
    let guardId = 0,
        prevDate;
    highestGuardSleeps = false;
    for(date of dates) {
        const action = date.substring(date.lastIndexOf(']')+2, date.length);
        if(action.startsWith('Guard')) {
            guardId = inBetweenString(date, '#', ' begins');
            prevDate = new Date(inBetweenString(date, '[', ']'));
        } else if(action.startsWith('falls asleep')) {
            prevDate = new Date(inBetweenString(date, '[', ']'));
        } else if(action.startsWith('wakes up')) {
            const awakeDate = new Date(inBetweenString(date, '[', ']'));
            getMinutesInBetween(prevDate.getMinutes(), awakeDate.getMinutes()-1)
                .forEach(min => {
                    if(minutesAllGuards.hasOwnProperty(guardId)) {
                        const minuteObject = minutesAllGuards[guardId];
                        const hasMinute = minuteObject.hasOwnProperty(min);
                        minutesAllGuards[guardId] = {
                            ...minuteObject,
                            [min]: hasMinute ? minuteObject[min] += 1 : 1
                        }
                    } else {
                        minutesAllGuards[guardId] = { [min]: 1}
                    }
                });
        }
    }


    // Find the best minute of all the guards
    const bestMinuteGuards = {}
    // console.log(minutesAllGuards.values())
    Object.entries(minutesAllGuards).forEach(([guardId, minutes]) => {
        let highestMinute = 0,
            highestMinuteCount = 0;
        Object.entries(minutes).forEach(([key, value]) => {
            if(value > highestMinuteCount) {
                highestMinuteCount = value;
                highestMinute = key;
            }
            bestMinuteGuards[guardId] = [highestMinute, highestMinuteCount];
        });
    })

    // Find the best minute _out_ of all the guards
    let bestMinute = {
        minute: 0,
        count: 0,
        guardId: 0
    };
    Object.entries(bestMinuteGuards).forEach(([guardId, minuteValues]) => {
        if(minuteValues[1] > bestMinute.count) {
            bestMinute = {
                minute: minuteValues[0],
                count: minuteValues[1],
                guardId
            }
        }
    })

    console.log(bestMinute);


    return bestMinute.minute * bestMinute.guardId;
}

console.log(`The solution to day 4 part 1 is ${part1()}`);
console.log(`The solution to day 4 part 2 is ${part2()}`);