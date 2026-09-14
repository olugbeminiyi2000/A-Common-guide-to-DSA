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
    for (var i = 0; i < anagram.length; i++) {
        console.log("anagram:".concat(anagram));
        var anagramArray = findAnagram(anagram.slice(0, i) + anagram.slice(i + 1));
        console.log("I ".concat(i));
        var smallList = [];
        console.log("anagram array: ".concat(anagramArray));
        for (var i = 0; i < anagramArray.length; i++) {
            console.log("anagram: ".concat(anagram, ", I: ").concat(i));
            smallList.push(anagram[i] + anagramArray[i]);
        }
        console.log("small list: ".concat(smallList));
        for (var i = 0; i < smallList.length; i++) {
            bigList.push(smallList[i]);
        }
        console.log("big list: ".concat(bigList));
    }
    return bigList;
}
exports.findAnagram = findAnagram;
console.log(findAnagram("abc"));
