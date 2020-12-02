// Given a string that includes alphanumeric characters ('3a4B2d') return the expansion of that string: The numeric values represent the occurrence of each letter preceding that numeric value. There should be no numeric characters in the final string. Empty strings should return an empty string.

// The first occurrence of a numeric value should be the number of times each character behind it is repeated, until the next numeric value appears.

// stringExpansion('3D2a5d2f') === 'DDDaadddddff'

function stringExpansion(s) {
  if (s === "") return "";
  let arr = s.match(/(\d{1}[a-zA-Z]+)|[a-zA-Z]+/g);
  if (arr === null) return "";
  return arr
    .map((str) => {
      if (/\d/.test(str[0])) {
        let number = parseInt(str.split("")[0]);
        let repeat = str
          .split("")
          .slice(1)
          .map((letter) => letter.repeat(number))
          .join("");
        return repeat;
      } else {
        return str;
      }
    })
    .join("");
}
