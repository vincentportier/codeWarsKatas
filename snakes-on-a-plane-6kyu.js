function snakesOn(aPlane) {
  let result = [];
  let string = aPlane
    .map((arr) => arr.join(""))
    .join("")
    .replace(/\_/g, "")
    .split("")
    .forEach((el) => (result.indexOf(el) !== -1 ? null : result.push(el)));
  return result.length;
}
