export function findAnagram(anagram: string): string[] {
  if (anagram.length === 0) {
    return [];
  }
  if (anagram.length === 1) {
    return [anagram];
  }

  const bigList: string[] = [];
  for (let char = 0; char < anagram.length; char++) {
    const anagramArray = findAnagram(anagram.slice(0, char) + anagram.slice(char + 1));
    const smallList: string[] = [];
    for (let pair = 0; pair < anagramArray.length; pair++) {
      smallList.push(anagram[char] + anagramArray[pair]);
    }

    for (let element = 0; element < smallList.length; element++) {
      bigList.push(smallList[element]);
    }
  }

  return bigList;
}

console.log(findAnagram("bade"));
