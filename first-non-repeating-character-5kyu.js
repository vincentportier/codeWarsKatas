function firstNonRepeatingLetter(string) {
  let result = string.split("").filter((letter) => {
    let regex;
    if (/[a-z]/i.test(letter)) {
      regex = new RegExp(letter, "gi");
    } else {
      let test = `[${letter}]`;
      regex = new RegExp(test, "gi");
    }

    console.log(regex);
    return string.match(regex).length <= 1;
  });
  return result.length === 0 ? "" : result[0];
}
