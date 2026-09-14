# Print All Numbers in a Nested Array (Recursion)

## The Problem

Given an array that can contain both numbers and other arrays (arbitrarily
nested), write a recursive function that prints every number contained
anywhere inside it.

```
array = [
  1, 2, 3,
  [4, 5, 6],
  7,
  [8, [9, 10, 11, [12, 13, 14]]],
  [15, 16, 17, 18, 19, [20, 21, 22, [23, 24, 25, [26, 27, 29]], 30, 31], 32],
  33
]
```

## Why Not a For Loop?

The first instinct is usually a simple loop over the array. But a `for`
loop only works when you know exactly what shape the data is in. Here, we
don't: an element could be a plain number, or it could be another array —
and that array could itself contain more arrays, nested to any depth.
There's no certainty about the shape of what we're going to get.

Recursion is the natural fit here: instead of trying to handle every
possible depth up front, the function just handles *one level* at a time,
and calls itself again whenever it runs into another array.

## Finding the Base Case

Every recursive function needs a base case — the point at which it does
not do recursion. This is usually taught as "a check or condition that
sends control back to the parent function that triggered the call." But
it can help to think of it differently: the base case is whatever *you
design* to prevent the recursive function from running forever. Here,
that's simple — when we run into an actual number (not another array),
there's nothing left to recurse into, so we print it and move on.

## Walking Through the Call Stack

The function is `printAllNumbersInAnArray` (nicknamed `PANAA` below for
short). The computer uses a **stack** data structure to know what to do
next, and this is what makes the whole thing work smoothly without
managing any of it by hand.

For each element as `forEach` walks through an array:
- If the element is a number, print it — the base case for that element.
- If the element is an array, call `PANAA` on it again — this pushes a
  new call onto the stack.

Once a call finishes looping through every element in its own array, it
gets popped off the stack, and control goes back to its parent call —
which then continues looping through its own remaining elements, right
where it left off. This keeps happening, call after call finishing and
popping off, until the stack is completely empty. At that point, every
number at every depth has been printed.

## The Code

```typescript
type NumberOrNestedArray = number | NumberOrNestedArray[];

function printAllNumbersInAnArray(arrayGiven: NumberOrNestedArray[]): void {
  // Iterate through the list
  arrayGiven.forEach((element) => {
    if (typeof element === "number") {
      console.log(number);
    } else {
      printAllNumbersInAnArray(element);
    }
  });
}
```

## Typing an Arbitrarily Nested Array

A natural question here: how do you even describe the *type* of "a list
that holds numbers, or arrays of numbers, or arrays of arrays of
numbers... nested to any depth" — and does TypeScript need to check that
at runtime?

TypeScript handles this with a **recursive type alias** — a type that
refers to itself in its own definition:

```typescript
type NumberOrNestedArray = number | NumberOrNestedArray[];
```

The compiler resolves this once, at compile time, no matter how deep the
data actually ends up nested when the program runs — there's no need to
type-check depth as data comes in. What this doesn't do is guarantee
every element really is a number or a further nested array at runtime —
that's still the job of the `typeof element === "number"` check inside
the function itself.
