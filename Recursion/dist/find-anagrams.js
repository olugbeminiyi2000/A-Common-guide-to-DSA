"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAnagram = void 0;
function findAnagram(anagram) {
    if (anagram.length === 0) {
        return [];
    }
    if (anagram.length === 1) {
        return [anagram];
    }
    var bigList = [];
    for (var char = 0; char < anagram.length; char++) {
        var anagramArray = findAnagram(anagram.slice(0, char) + anagram.slice(char + 1));
        var smallList = [];
        for (var pair = 0; pair < anagramArray.length; pair++) {
            smallList.push(anagram[char] + anagramArray[pair]);
        }
        for (var element = 0; element < smallList.length; element++) {
            bigList.push(smallList[element]);
        }
    }
    return bigList;
}
exports.findAnagram = findAnagram;
console.log(findAnagram("bade"));
