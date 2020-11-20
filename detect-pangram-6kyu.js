// A pangram is a sentence that contains every single letter of the alphabet at least once. For example, the sentence "The quick brown fox jumps over the lazy dog" is a pangram, because it uses the letters A-Z at least once (case is irrelevant).

// Given a string, detect whether or not it is a pangram. Return True if it is, False if not. Ignore numbers and punctuation.

function isPangram(string) {
  let sortedArray = string.toLowerCase().match(/[a-z]/gi).sort();
  let result = [];
  for (let i = 0; i < sortedArray.length; i++) {
    if (i === 0) {
      result.push(sortedArray[i]);
    } else {
      if (sortedArray[i] !== result[result.length - 1])
        result.push(sortedArray[i]);
    }
  }
  if (result.length === 26) {
    return true;
  } else return false;
}
