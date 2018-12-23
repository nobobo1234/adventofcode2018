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
    const areas = Array.from({ length: coordinates.length }, e => 0);
    for(let y = minY; y <= maxY; y++) {
        for(let x = minX; x <= maxX; x++) {
            let lowestDistance = Math.abs(x - coordinates[0][0])+Math.abs(y-coordinates[0][1]);
            let lowestCoordinate = 0;
            coordinates:
            for(let i = 1; i < coordinates.length; i++) {
                const point = coordinates[i];
                const dist = Math.abs(x - point[0])+Math.abs(y-point[1]);
                if(dist < lowestDistance) {
                    lowestDistance = dist
                    lowestCoordinate = i;
                } else if(dist === lowestDistance) {
                    lowestCoordinate = null;
                    continue coordinates;
                }
            }
            if(y === 0 || x === 0 || y === maxY || x === maxX) {
                areas[lowestCoordinate] = null;
            } else if(lowestDistance !== null) {
                areas[lowestCoordinate] += 1;
            }
        }
    }
    return Math.max(...areas.filter((e, i) => e !== null));
}

console.log(part1());