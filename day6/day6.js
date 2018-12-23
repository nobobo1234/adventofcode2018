const fs = require('fs');

const part1 = () => {
    const coordinates = fs.readFileSync(`${__dirname}/day6input.txt`).toString().split('\n')
        .map(coordinate => coordinate.split(', ').map(Number));
    let maxX = 0, maxY = 0, minX = coordinates[0][0], minY = coordinates[0][1];
    for(const coordinate of coordinates) {
        if(coordinate[0] > maxX) maxX = coordinate[0];
        if(coordinate[1] > maxY) maxY = coordinate[1];
        if(coordinate[0] < minX) minX = coordinate[0];
        if(coordinate[1] < minY) minY = coordinate[1];
    }
    console.log(`Min: (${minX}, ${minY}), Max: (${maxX}, ${maxY})`)
    const array = Array.from({ length: maxY + 1 }, a => Array.from({ length: maxX + 1 }));
    for(let y = minY; y < array.length; y++) {
        for(let x = minX; y < array[y].length; x++) {
            let lowestDistance = Math.abs(x - coordinates[0][0])+Math.abs(y-coordinates[0][1]);
            for(const point of coordinates) {
                const dist = Math.abs(x - point[0])+Math.abs(y-point[1]);
                if(dist < lowestDistance) lowestDistance = dist;
            }
            array[y][x] = lowestDistance;
        }
    }
}

console.log(part1());