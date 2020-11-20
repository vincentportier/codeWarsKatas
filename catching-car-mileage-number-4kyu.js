function isInteresting(number, awesomePhrases) {
  let phrases;

  phrases =
    awesomePhrases.length <= 0
      ? 0
      : awesomePhrases.includes(number)
      ? 2
      : awesomePhrases.includes(number + 1)
      ? 1
      : awesomePhrases.includes(number + 2)
      ? 1
      : 0;

  if (phrases !== 0) return phrases;

  let twoDigit;

  if (number === 98) return 1;
  if (number === 99) return 1;
  if (number < 98) return 0;

  let keys = [
    "isRound",
    "isSameDigit",
    "isSequentialInc",
    "isSequentialDec",
    "isPalindrome",
  ];

  let current = {
    isRound: isRound(number),
    isSameDigit: isSameDigit(number),
    isSequentialInc: isSequentialInc(number),
    isSequentialDec: isSequentialDec(number),
    isPalindrome: isPalindrome(number),
  };

  let nextOne = {
    isRound: isRound(number + 1),
    isSameDigit: isSameDigit(number + 1),
    isSequentialInc: isSequentialInc(number + 1),
    isSequentialDec: isSequentialDec(number + 1),
    isPalindrome: isPalindrome(number + 1),
  };

  let nextTwo = {
    isRound: isRound(number + 2),
    isSameDigit: isSameDigit(number + 2),
    isSequentialInc: isSequentialInc(number + 2),
    isSequentialDec: isSequentialDec(number + 2),
    isPalindrome: isPalindrome(number + 2),
  };

  let curr = [];
  let nextO = [];
  let nextT = [];

  keys.forEach((key) => {
    if (current[key]) curr.push(2);
    if (nextOne[key]) nextO.push(1);
    if (nextTwo[key]) nextT.push(1);
  });

  if (curr.length > 0) return 2;

  if (nextT.length > 0 || nextO.length > 0) return 1;

  return 0;
}

function isRound(input) {
  return /^[1-9]0+$/.test(input);
}

function isSameDigit(input) {
  let uniqueNumbers = [];
  input
    .toString()
    .split("")
    .forEach((num) => {
      if (!uniqueNumbers.includes(num)) {
        uniqueNumbers.push(num);
      }
    });
  return uniqueNumbers.length === 1;
}

function isSequentialInc(input) {
  let arr = input.toString().split("").map(Number);

  let result = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === 9 && arr[i + 1] === 0) {
      result.push(true);
    } else if (arr[i] === arr[i + 1] - 1) {
      result.push(true);
    } else result.push(false);
  }
  return !result.includes(false);
}

function isSequentialDec(input) {
  let arr = input.toString().split("").map(Number);

  let result = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === 1 && arr[i + 1] === 0) {
      result.push(true);
    } else if (arr[i] === arr[i + 1] + 1) {
      result.push(true);
    } else result.push(false);
  }
  return !result.includes(false);
}

function isPalindrome(input) {
  arr = input.toString().split("");

  if (arr.length % 2 == 0) {
    return arr.slice(0, arr.length / 2).join("") ===
      arr
        .slice(arr.length / 2)
        .reverse()
        .join("")
      ? true
      : false;
  } else {
    return arr.slice(0, Math.floor(arr.length / 2)).join("") ===
      arr
        .slice(Math.floor(arr.length / 2) + 1)
        .reverse()
        .join("")
      ? true
      : false;
  }
}
