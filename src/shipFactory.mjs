 export const shipFactory = () => {
  const shipFleet = [
    {
      id: 1,
      name: "Aircraft Carrier",
      length: 5,
      hitPoints: 5,
      coordinates: [],
      hit() {
        this.hitPoints--;
      },
      isSunk() {
        if (this.hitPoints === 0) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      id: 2,
      name: "Battleship",
      length: 4,
      hitPoints: 4,
      coordinates: [],
      hit() {
        this.hitPoints--;
      },
      isSunk() {
        if (this.hitPoints === 0) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      id: 3,
      name: "Cruiser",
      length: 3,
      hitPoints: 3,
      coordinates: [],
      hit() {
        this.hitPoints--;
      },
      isSunk() {
        if (this.hitPoints === 0) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      id: 4,
      name: "Submarine One",
      length: 2,
      hitPoints: 2,
      coordinates: [],
      hit() {
        this.hitPoints--;
      },
      isSunk() {
        if (this.hitPoints === 0) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      id: 5,
      name: "Submarine Two",
      length: 2,
      hitPoints: 2,
      coordinates: [],
      hit() {
        this.hitPoints--;
      },
      isSunk() {
        if (this.hitPoints === 0) {
          return true;
        } else {
          return false;
        }
      },
    },
  ];
  return shipFleet;
};

