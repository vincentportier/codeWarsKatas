// And here's the rule:
// Input Strings a and b: For every character in string a swap the casing of every occurrence of the same character in string b. Then do the same casing swap with the inputs reversed. Return a single string consisting of the changed version of a followed by the changed version of b. A char of a is in b regardless if it's in upper or lower case - see the testcases too.
// I think that's all;-)...

// Some easy examples:

// Input: "abc" and "cde"      => Output: "abCCde"
// Input: "ab" and "aba"       => Output: "aBABA"
// Input: "abab" and "bababa"  => Output: "ABABbababa"

function workOnStrings(a, b) {
  let arrA = a.split("");
  let arrB = b.split("");

  let getCase = (char) => {
    if (char === char.toUpperCase()) {
      return "upp";
    }
    if (char === char.toLowerCase()) {
      return "low";
    }
  };

  arrA = arrA.map((char) => {
    let myRegex = new RegExp(char, "gi");
    let matches = b.match(myRegex);
    let occurences = matches === null ? 0 : matches.length;
    let casse = getCase(char);
    return occurences % 2 === 0
      ? char
      : casse === "upp"
      ? char.toLowerCase()
      : char.toUpperCase();
  });

  arrB = arrB.map((char) => {
    let myRegex = new RegExp(char, "gi");
    let matches = a.match(myRegex);
    let occurences = matches === null ? 0 : matches.length;
    let casse = getCase(char);
    return occurences % 2 === 0
      ? char
      : casse === "upp"
      ? char.toLowerCase()
      : char.toUpperCase();
  });

  return arrA.concat(arrB).join("");
}
