function rgb(r, g, b) {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  let getHex = (num) => {
    if (num < 0) num = 0;
    if (num > 255) num = 255;
    return (
      hex[Math.floor(num / 16)] + hex[(num / 16 - Math.floor(num / 16)) * 16]
    );
  };

  return getHex(r) + getHex(g) + getHex(b);
}
