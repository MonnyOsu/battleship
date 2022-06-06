export const gameboardFactory = () => {
  // gameboard array, ship objects will replace current grid.
  // [0] - [9] for a row
  const gameboard = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "76",
    "77",
    "78",
    "79",
    "80",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "90",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
    "100",
  ];
  const shipLocations = [];
  const missedAttacks = [];
  const hitAttacks = [];
  // make sunkShips an array. This will have the ship object that we can use to render in the sunk ships area? can check value with array.length

  let sunkShips = 0;

  function placeShip(ship, startIndex, direction) {
    // ship will = playerFleet[activeShips]
    // startIndex = drop target
    // direction is a boolean for horiz/vert

    // horizontal
    if (direction) {
      if (checkPlaceShipValidHoriz(ship, startIndex)) {
        let i = startIndex - 1;

        while (i < +startIndex + ship.length - 1) {
          //add coordinates to ship
          ship.coordinates.push(gameboard[i]);
          gameboard[i] = "x";
          i++;
        }
        shipLocations.push(ship);
      }
    }

    // vertical
    if (!direction) {
      if (checkPlaceShipValidVert(ship, startIndex)) {
        let i = startIndex - 1;
        while (i <= +startIndex + (ship.length - 1) * 10) {
          ship.coordinates.push(gameboard[i]);
          gameboard[i] = "x";
          i = i + 10;
        }
        shipLocations.push(ship);
      }
    }
  }

  //CPU Gameboard set up
  function placeCpuShips(fleet) {
    let i = 0;
    while (i < fleet.length) {
      //random index from 1 - 100
      let startIndex = "" + (Math.floor(Math.random() * 100) + 1);
      // random boolean
      let direction = Math.random() < 0.5;

      if (direction) {
        if (checkPlaceShipValidHoriz(fleet[i], startIndex)) {
          let j = startIndex - 1;

          while (j < +startIndex + fleet[i].length - 1) {
            //add coordinates to ship
            fleet[i].coordinates.push(gameboard[j]);
            gameboard[j] = "x";
            j++;
          }
          shipLocations.push(fleet[i]);
          i++;
        } else {
          i = i;
        }
      }
      if (!direction) {
        if (checkPlaceShipValidVert(fleet[i], startIndex)) {
          let j = startIndex - 1;
          while (j <= +startIndex + (fleet[i].length - 1) * 10) {
            fleet[i].coordinates.push(gameboard[j]);
            gameboard[j] = "x";
            j = j + 10;
          }
          shipLocations.push(fleet[i]);
          i++;
        } else {
          i = i;
        }
      }
    }
  }

  function checkPlaceShipValidVert(ship, startIndex) {
    let validPosition = false;
    if (
      +startIndex + (ship.length - 1) * 10 <= 100 &&
      checkFreeRows(ship, startIndex)
    ) {
      validPosition = true;
    }
    return validPosition;
  }

  function checkPlaceShipValidHoriz(ship, startIndex) {
    let validPosition = false;

    let breakpoint = 10 - (ship.length - 1);

    if (+startIndex <= breakpoint) {
      validPosition = true;
    } else if (+startIndex > breakpoint && +startIndex <= 10) {
      validPosition = false;
    } else if (startIndex.slice(1) === "0" || startIndex.slice(1) === "00") {
      validPosition = false;
    } else if (
      startIndex.slice(1) <= breakpoint &&
      checkFreeColumns(ship, startIndex)
    ) {
      validPosition = true;
    }
    return validPosition;
  }

  function receiveAttack(attackCoord) {
    isHit(attackCoord);
    isMiss(attackCoord);
    if (sunkShips > 0) {
      console.log('ship has been sunk')
    }
    console.log(sunkShips)
    isGameClear();
  }

  function isHit(attackCoord) {
    for (let ship of shipLocations) {
      if (ship.coordinates.includes(attackCoord)) {
        // if hit already registered, ignore
        if (hitAttacks.includes(attackCoord)) return;
        // call hit on ship, and add to hitAttacks array
        ship.hit();
        hitAttacks.push(attackCoord);
        console.log("hit");
        //check if ship is sunk and add to sunkShips array
        if (ship.isSunk()) {
          sunkShips++;
        }
      }
      // end loop if hit
      if (ship.coordinates.includes(attackCoord)) break
    }
  }

  function isMiss(attackCoord) {
    for (let ship of shipLocations) {
      if (!ship.coordinates.includes(attackCoord)) {
        if (missedAttacks.includes(attackCoord)) {
          return;
        }
        if (hitAttacks.includes(attackCoord)) {
          return
        }
        console.log("miss");
        // add to missed attach array
        missedAttacks.push(attackCoord);
      }
    }
  }

  function cpuAttackGenerator() {
    let cpuAttack = "" + (Math.floor(Math.random() * 100) + 1)
    console.log(cpuAttack)
    return cpuAttack
  }

  function isGameClear() {
    // does not need to run until at least turn 16
    // if (turnNumber < 16) return

    //may have to change to reflect who won
    let gameClear = false;
    if (sunkShips === 1) {
      gameClear = true;
    }
    return gameClear;
  }

  // [Vertical placement] check # of rows below start index for placed ships. These will have an 'x' where the coordinate should be.
  function checkFreeRows(ship, startIndex) {
    let freeRows = 0;
    let i = startIndex - 1;
    while (i <= +startIndex + (ship.length - 1) * 10) {
      if (gameboard[i] !== "x") {
        freeRows++;
      }
      i = i + 10;
    }
    return ship.length <= freeRows;
  }

  // [Horizontal placement]
  function checkFreeColumns(ship, startIndex) {
    let freeCols = 0;
    let i = startIndex - 1;

    while (i < +startIndex + ship.length - 1) {
      if (gameboard[i] !== "x") {
        freeCols++;
      }
      i++;
    }
    return ship.length <= freeCols;
  }

  return {
    gameboard,
    placeShip,
    placeCpuShips,
    receiveAttack,
    isGameClear,
    cpuAttackGenerator,
    shipLocations,
    missedAttacks,
    hitAttacks,
    sunkShips,
  };
};
