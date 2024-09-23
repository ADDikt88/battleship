import { createShip } from "./ships.js";

function createGameboard(size) {
  let coordinates = [];

  coordinates = initializeBoard(coordinates, size);
  console.log(coordinates);

  function placeShip(ship, startRow, startCol) {
    if (startRow > this.size - 1 || startCol > this.size - 1) return false;

    if (this.coordinates[startRow][startCol] !== "empty") return false;

    if (ship.orientation == "vertical") {
      for (let i = 1; i < ship.length; i++) {
        if (startRow + i > this.size - 1) return false;
        if (this.coordinates[startRow + i][startCol] !== "empty") return false;
      }

      for (let i = 0; i < ship.length; i++) {
        this.coordinates[startRow + i][startCol] = ship.name;
      }
    } else if (ship.orientation == "horizontal") {
      for (let i = 1; i < ship.length; i++) {
        if (startCol + i > this.size - 1) return false;
        if (this.coordinates[startRow][startCol + i] !== "empty") return false;
      }

      for (let i = 0; i < ship.length; i++) {
        this.coordinates[startRow][startCol + i] = ship.name;
      }
    }

    console.log(coordinates);
    return true;
  }

  function receiveAttack(targetRow, targetCol, callback) {
    if (targetRow > this.size - 1 || targetCol > this.size - 1) return false;

    // already miss
    if (this.coordinates[targetRow][targetCol] == "miss") return false;

    // already hit
    if (this.coordinates[targetRow][targetCol] == "hit") return false;

    // empty > miss
    if (this.coordinates[targetRow][targetCol] == "empty") {
      this.coordinates[targetRow][targetCol] = "miss";
      console.log(coordinates);
      return true;
    }

    // not empty AND not hit > hit
    if (this.coordinates[targetRow][targetCol] !== "empty") {
      let shipName = this.coordinates[targetRow][targetCol];
      //invoke a callback;
      callback(shipName);
      this.coordinates[targetRow][targetCol] = "hit";
      console.log(coordinates);
      return true;
    }
    return false;
  }
  return { size, coordinates, placeShip, receiveAttack };
}

function initializeBoard(coordinates, size) {
  for (let row = 0; row < size; row++) {
    coordinates[row] = [];
    for (let col = 0; col < size; col++) {
      coordinates[row][col] = "empty";
    }
  }

  return coordinates;
}

export { createGameboard };
