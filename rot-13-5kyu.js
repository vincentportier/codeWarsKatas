function rot13(message) {
  return message
    .split("")
    .map((l) => {
      if (/[a-z]/i.test(l) === false) {
        return l;
      } else {
        let charCode = l.charCodeAt();
        if (charCode >= 65 && charCode <= 77)
          return String.fromCharCode(charCode + 13);
        if (charCode >= 78 && charCode <= 90)
          return String.fromCharCode(charCode - 13);
        if (charCode >= 97 && charCode <= 109)
          return String.fromCharCode(charCode + 13);
        if (charCode >= 110 && charCode <= 122)
          return String.fromCharCode(charCode - 13);
      }
    })
    .join("");
}
