# Counting Shortest Paths in a Grid (Unique Paths, Recursion)

## The Problem

You have a grid of rows and columns. Write a function that accepts a
number of rows and a number of columns, and calculates the number of
possible "shortest" paths from the upper-leftmost square (the start, `S`)
to the lower-rightmost square (the finish, `F`).

By "shortest" path, the book means that at every step you move either one
step to the right or one step downward. The function should return the
*number* of shortest paths, not the paths themselves.

## Step One: What "Shortest" Really Means Here

The word "shortest" made this look like a much harder problem at first. It
suggests you would have to find one path, go back and try the others,
keep a record of every path's length, find the smallest, and finally
count how many paths hit that smallest length.

But the two constraints in the problem remove all of that. The path must
start at the top-left corner and end at the bottom-right corner, and the
only allowed moves are right and down. Drawing a 3 by 3 grid by hand and
tracing every unique path showed that every single path takes exactly the
same number of steps: the same number of moves to the right, and the same
number of moves down, just in a different order. Since no path can ever
be shorter or longer than another, "shortest" carries no extra meaning.
The question simplifies to something much easier: **count every unique
path from the start to the finish.**

[IMAGE PLACEHOLDER: shortestpath_3.jpeg, the hand-drawn grid with every unique path traced from S to F, and the countdown labels along the top and side]




## Step Two: Labeling the Grid With a Countdown

The function takes two numbers, `right` and `down`. They describe how
many columns and how many rows are left to cover, counting the square
you are currently standing on. So on a 3 by 3 grid, the start square is
`(3, 3)` and the finish square is `(1, 1)`. Moving one step to the right
turns `right` into `right - 1`, and moving one step down turns `down`
into `down - 1`. Reaching `(1, 1)` means there is nothing left to cover,
which means one complete path has been found.

## Step Three: The Base Case

The recursion stops when `right == 1` and `down == 1`, and it returns `1`
because reaching that square means exactly one shortest path has been
seen. Every complete path ends here, so adding up all the `1`s that come
back from the recursive calls gives the total number of paths.

The function also starts with a counter, `numShortestPath = 0`, which
collects the number of paths found beneath the current square and is
what gets returned at the end.

## Step Four: The Two Possible Moves

From any square, there are two things you can do, so the function makes
up to two recursive calls:

- **Move right**: `shortestPath(right - 1, down)`
- **Move down**: `shortestPath(right, down - 1)`

Whatever number of paths each call reports back gets added to the
counter. The moves are split across an `if` and an `else`: while
`right > 1` there is still room to move right, so the function tries the
right move first and then the down move. Once `right` has reached `1`,
the last column has been reached, so the only thing left to do is move
down.

[IMAGE PLACEHOLDER: shortestpath_2.jpeg, the pseudocode: the counter, the base case, the right > 1 branch with the down != 1 condition, and the else branch]

## Step Five: Tracing the Recursion by Hand, and the Trick

To make sure this worked before writing it as code, the recursion was
traced by hand on the 3 by 3 grid. The trace starts at `(3, 3)` and keeps
moving right until it can't, reaching `(1, 3)`, then moves down through
`(1, 2)` to `(1, 1)`, which returns `1`. The function then backs up, one
call at a time, and each time it backs up to a square it tries the move
it hasn't tried yet from there, which is how the other paths get found.

That hand trace is where the trick in the code came from. While walking
back up through `(2, 2)`, the trace reaches `(2, 1)`. This square is on
the bottom row, and the natural next step in the pattern would be to
also try moving down from it. But `(2, 1)` is on the last row, so there
is no row below it to move down to. The condition on the down move,
`down != 1`, exists for exactly this reason: **the down move is only made
when there is still a row below the current square.** On the bottom row,
the down call is skipped, and the only thing left to do from `(2, 1)` is
step right to `(1, 1)`. The same happens for `(3, 1)`, which is reached
from `(3, 2)`: it does not branch, it just walks straight along the
bottom row to the finish.

[IMAGE PLACEHOLDER: shortestpath_1.jpeg, the full hand trace of the recursion on a 3 by 3 grid, including the note at (2, 1) that the down move is skipped because down == 1]

### Why the guard matters

Because both moves always shrink `right` or `down`, the recursion always
heads toward the finish square, so the function terminates either way.
What the `down != 1` guard controls is whether the function wastes calls
stepping off the bottom edge of the grid. Without it, calls from the
bottom row would land on a row that doesn't exist, and those calls end up
returning `0` (they are caught by the `down < 0` check at the top), so
the final count comes out the same. With the guard, those pointless calls
never happen. Checking this directly on the 3 by 3 grid, the function
makes 19 calls with the guard and 37 without it, and both give the
answer 6.

## The Answer for the Example

The book's example is a grid with three rows and seven columns. The call
here is `shortestPath(3, 7)`, which reads as 3 columns by 7 rows, the
flipped version of the book's grid. A grid and its flip have exactly the
same number of paths, since swapping "right" and "down" just swaps which
kind of move you make more often, so the answer is the same: **28**.

## The Code (Python: `shortest-path.py`)

```python
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
```

## The Code (TypeScript translation)

```typescript
export function shortestPath(right: number, down: number): number {
  let numShortestPath = 0;
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
  } else {
    numShortestPath += shortestPath(right, down - 1);
  }

  return numShortestPath;
}

console.log(shortestPath(3, 7));
```

Running it prints `28`, matching the number of shortest paths worked out
for the book's example.
