function number9Helper(num) {
  var pow = Math.floor(Math.log10(num));
  var round = Math.pow(10, pow);
  var times = Math.floor(num / round);
  var rest = Math.abs(num - round * times);
  var res = pow * (round == 10 ? 1 : round / 10) * times;
  if (num.toString()[0] == "9") res += rest;
  if (rest < 9) return res;
  else return res + number9Helper(rest);
}
function number9(num) {
  var res = number9Helper(num);
  res = res + (num.toString().split("9").length - 1);
  return res;
}
