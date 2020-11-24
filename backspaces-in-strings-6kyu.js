// Assume "#" is like a backspace in string. This means that string "a#bc#d" actually is "bd"

// Your task is to process a string with "#" symbols.

function cleanString(s) {
  while (/\#/.test(s)) {
    s = s.replace(/.{0,1}\#/, "");
  }
  return s;
}
