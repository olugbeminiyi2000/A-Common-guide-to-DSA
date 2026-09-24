def shortestPath(right, down):
    numShortestPath = 0
    if right < 0 or down < 0:
        return numShortestPath
    if right == 1 and down == 1:
        return 1
    if right > 1:
        numShortestPath = shortestPath(right - 1, down)
        if down != 1:
            numShortestPath += shortestPath(right, down - 1)
    else:
        numShortestPath += shortestPath(right, down - 1)
    
    return numShortestPath

print(shortestPath(3, 7))