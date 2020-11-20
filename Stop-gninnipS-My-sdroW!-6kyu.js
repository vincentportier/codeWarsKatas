function spinWords(str) {
  let strArray = str
    .split(" ")
    .map((word) =>
      word.length >= 5 ? word.split("").reverse().join("") : word
    );
  return strArray.join(" ");
}
