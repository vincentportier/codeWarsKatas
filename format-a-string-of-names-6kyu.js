// Given: an array containing hashes of names

// Return: a string formatted as a list of names separated by commas except for the last two names, which should be separated by an ampersand.

// Example:

// list([ {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'} ])
// // returns 'Bart, Lisa & Maggie'

// list([ {name: 'Bart'}, {name: 'Lisa'} ])
// // returns 'Bart & Lisa'

// list([ {name: 'Bart'} ])
// // returns 'Bart'

// list([])
// // returns ''

function list(names) {
  let result = "";
  for (let i = 0; i < names.length; i++) {
    if (i === 0) {
      result = result + names[i].name;
    } else if (i === names.length - 1) {
      result = result + " & " + names[i].name;
    } else {
      result = result + ", " + names[i].name;
    }
    console.log(result);
  }
  return result;
}
