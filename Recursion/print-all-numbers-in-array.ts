type NumberOrNestedArray = number | NumberOrNestedArray[];

function printAllNumbersInAnArray(arrayGiven: NumberOrNestedArray[]): void {
  arrayGiven.forEach((element) => {
    if (typeof element === "number") {
      console.log(element);
    } else {
      printAllNumbersInAnArray(element);
    }
  });
}

const array: NumberOrNestedArray[] = [
  1,
  2,
  3,
  [4, 5, 6],
  7,
  [8,
    [9, 10, 11,
      [12, 13, 14]
    ]
  ],
  [15, 16, 17, 18, 19,
    [20, 21, 22,
      [23, 24, 25,
        [26, 27, 29]
      ], 30, 31
    ], 32
  ],
  33
];

printAllNumbersInAnArray(array);
