var moveZeros = function (arr) {
  return arr
    .filter((item) => item !== 0)
    .concat(arr.filter((item) => item === 0));
};
