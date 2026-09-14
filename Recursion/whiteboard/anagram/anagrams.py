def findAnagram(anagram):
    if len(anagram) == 0:
        return []
    if len(anagram) == 1:
        return [anagram]

    bigList = []
    for i in range(0, len(anagram)):
        print("anagram:{}".format(anagram))
        anagram_array = findAnagram(anagram[0:i] + anagram[i+1:])
        print("I {}".format(i))
        smallList = []
        print("anagram array: {}".format(anagram_array))
        for i in range(0, len(anagram_array)):
            print("anagram: {}, I: {}".format(anagram, i))
            smallList.append(anagram[i] + anagram_array[i])
        print("small list: {}".format(smallList))

        for i in range(0, len(smallList)):
            bigList.append(smallList[i])
        print("big list: {}".format(bigList))
    
    return bigList

print(findAnagram("abc"))