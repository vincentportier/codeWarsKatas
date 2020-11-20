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
      let island = [y, x, location, 14, 0, 0];

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

        //look for sharks and treasures

        let north = y - 1 >= 0 && y - 1 <= 7 ? map[y - 1][x] : null;
        let south = y + 1 >= 0 && y + 1 <= 7 ? map[y + 1][x] : null;
        let east = x + 1 >= 0 && x + 1 <= 7 ? map[y][x + 1] : null;
        let west = x - 1 >= 0 && x - 1 <= 7 ? map[y][x - 1] : null;

        north === "s" ? island[4]++ : north === "t" ? island[5]++ : null;
        south === "s" ? island[4]++ : south === "t" ? island[5]++ : null;
        east === "s" ? island[4]++ : east === "t" ? island[5]++ : null;
        west === "s" ? island[4]++ : west === "t" ? island[5]++ : null;

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

    let u = islands.filter((el) => el[2] === "u");
    let m = islands.filter((el) => el[2] === "m");

    let leastSharks = (islands) => {
      islands = islands
        .sort((a, b) => a[4] - b[4])
        .filter((el, idx, arr) => el[4] <= arr[0][4]);
      return islands;
    };
    let closest = (islands) => {
      islands = islands
        .sort((a, b) => a[3] - b[3])
        .filter((el, idx, arr) => el[3] <= arr[0][3]);
      return islands;
    };
    let mostTreasures = (islands) => {
      islands = islands
        .sort((a, b) => b[5] - a[5])
        .filter((el, idx, arr) => el[5] >= arr[0][5]);
      return islands;
    };

    if (u.length > 0) {
      u = leastSharks(u);
      u = closest(u);
      u = mostTreasures(u);

      return u.map((island) => [island[0], island[1]]);
    } else {
      m = leastSharks(m);
      m = closest(m);
      m = mostTreasures(m);
      return m.map((island) => [island[0], island[1]]);
    }
  }
}
