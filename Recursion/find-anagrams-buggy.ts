export function findAnagram(anagram: string): string[] {
  if (anagram.length === 0) {
    return [];
  }
  if (anagram.length === 1) {
    return [anagram];
  }

  const bigList: string[] = [];
  for (var i = 0; i < anagram.length; i++) {
    console.log(`anagram:${anagram}`);
    const anagramArray = findAnagram(anagram.slice(0, i) + anagram.slice(i + 1));
    console.log(`I ${i}`);
    const smallList: string[] = [];
    console.log(`anagram array: ${anagramArray}`);
    for (var i = 0; i < anagramArray.length; i++) {
      console.log(`anagram: ${anagram}, I: ${i}`);
      smallList.push(anagram[i] + anagramArray[i]);
    }
    console.log(`small list: ${smallList}`);

    for (var i = 0; i < smallList.length; i++) {
      bigList.push(smallList[i]);
    }
    console.log(`big list: ${bigList}`);
  }

  return bigList;
}

console.log(findAnagram("abc"));
