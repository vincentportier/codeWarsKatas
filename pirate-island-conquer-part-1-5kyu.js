// Description:
// You are a captain on a pirate ship. You are looking to conquer islands,
// so that you can do lots of piratey stuff on those islands. Let's take a look at your pirate map of the area:

// ['p', '~', '~', '~', '~', '~', '~', '~'],
// ['~', '~', '~', '~', '~', '~', '~', '~'],
// ['~', '~', '~', '~', '~', '~', '~', '~'],
// ['~', '~', 'u', '~', '~', '~', '~', '~'],
// ['~', '~', '~', '~', 'm', '~', '~', '~'],
// /['~', '~', '~', '~', '~', '~', '~', '~'],
// ['~', '~', '~', '~', '~', '~', '~', '~'],
// ['~', '~', '~', '~', '~', '~', '~', '~']];

// Where:

// 'p' = pirate (that's our home island). There will always be one home island, always in the top left corner of the sea.
// 'u' = unoccupied island
// 'm' = island occupied by marines
// '~' = ocean waves

// Input
// A see map, formatted as an array of arrays of strings.

// Output
// Return an array containing all the best candidates (ordered by lowest x coordinate, then lowest y), or an empty array if no island to conquer.

// Rules (highest priority first)
// Conquer an unoccupied island.
// If there are no unoccupied islands, conquer one of the marines' islands.
// Conquer the island closest to any of our home islands (the p items / distances are computed as Manhattan distances).

function conquerIsland(map) {
  let m = [];
  let u = [];

  //search for all the islands

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      let location = map[y][x];
      location === "u"
        ? u.push([y, x])
        : location === "m"
        ? m.push([y, x])
        : null;
    }
  }

  // if there is 1 or more unoccupied islands

  if (u.length >= 1) {
    if (u.length === 1) return u;
    else {
      let minDistance = u.map((el) => el[0] + el[1]).sort((a, b) => a - b)[0];
      return u
        .filter((el) => el[0] + el[1] === minDistance)
        .sort((a, b) => a[0] - b[0]);
    }
  }

  // if there is 1 or more marine islands

  if (m.length >= 1) {
    if (m.length === 1) return m;
    else {
      let minDistance = m.map((el) => el[0] + el[1]).sort((a, b) => a - b)[0];
      return m
        .filter((el) => el[0] + el[1] === minDistance)
        .sort((a, b) => a[0] - b[0]);
    }
  }

  // if there is no islands
  return [];
}
