function conquerIsland(map) {
  let pirates = [];
  let islands = [];

  //search for the pirates locations
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      map[y][x] === "p" ? pirates.push([y, x]) : null;
    }
  }

  //search for all the islands

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      let location = map[y][x];
      let island = [y, x, location, 14];

      //calculate the distance from each island to all the pirates
      if (location === "u" || location === "m") {
        pirates.forEach((pirate) => {
          let yy = [pirate[0], island[0]]
            .sort((a, b) => b - a)
            .reduce((a, b) => a - b);

          let xx = [pirate[1], island[1]]
            .sort((a, b) => b - a)
            .reduce((a, b) => a - b);

          let distance = yy + xx;

          // update the distance on the island only if the matched pirate is closer than the previously matched pirate
          distance <= island[3] ? (island[3] = distance) : null;
        });

        islands.push(island);
      }
    }
  }

  //there are no islands
  if (islands.length === 0) return [];
  //there is at least one island
  else {
    //sort by distance
    islands = islands.sort((a, b) => a[3] - b[3]);
    // get the unoccupied and marine islands and filter the closest one(s). then sort by y coordinate
    let u = islands
      .filter((island) => island[2] === "u")
      .filter((island, idx, arr) => island[3] <= arr[0][3])
      .map((island) => [island[0], island[1]])
      .sort((a, b) => a[0] - b[0]);
    let m = islands
      .filter((island) => island[2] === "m")
      .filter((island, idx, arr) => island[3] <= arr[0][3])
      .map((island) => [island[0], island[1]])
      .sort((a, b) => a[0] - b[0]);

    // return the u islands if there is at least one, otherwise return the m islands
    return u.length > 0 ? u : m;
  }
}
