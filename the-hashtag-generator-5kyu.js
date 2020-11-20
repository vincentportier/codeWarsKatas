function generateHashtag(str) {
  if (/[a-z]/gi.test(str) === false) return false;
  if (str.split(" ").join("").length >= 140) return false;
  return ["#"]
    .concat(
      str.split(" ").map((word) => {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
      })
    )
    .join("");
}
