def findAnagram(anagram):
    if len(anagram) == 0:
        return []
    if len(anagram) == 1:
        return [anagram]

    bigList = []
    for char in range(0, len(anagram)):
        anagram_array = findAnagram(anagram[0:char] + anagram[char+1:])
        smallList = []
        for pair in range(0, len(anagram_array)):
            smallList.append(anagram[char] + anagram_array[pair])

        for element in range(0, len(smallList)):
            bigList.append(smallList[element])
    
    return bigList

print(findAnagram("bade"))