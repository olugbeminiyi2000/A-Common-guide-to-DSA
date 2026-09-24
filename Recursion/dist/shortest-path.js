"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortestPath = void 0;
function shortestPath(right, down) {
    var numShortestPath = 0;
    if (right < 0 || down < 0) {
        return numShortestPath;
    }
    if (right === 1 && down === 1) {
        return 1;
    }
    if (right > 1) {
        numShortestPath = shortestPath(right - 1, down);
        if (down !== 1) {
            numShortestPath += shortestPath(right, down - 1);
        }
    }
    else {
        numShortestPath += shortestPath(right, down - 1);
    }
    return numShortestPath;
}
exports.shortestPath = shortestPath;
console.log(shortestPath(3, 7));
