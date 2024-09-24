import { createPlayer } from "./player.js";
import { createShip } from "./ships.js";
import { createGameboard } from "./gameboard.js";

function startGame() {
  const Player1 = createPlayer("human");
  initializeShips(Player1);

  const Player2 = createPlayer("computer");
}

function initializeShips(player) {
  let ships = [];
  let cruiser = createShip("cruiser", 2);
  let boat = createShip("boat", 3);
  let yacht = createShip("yacht", 4);
  ships.push(cruiser);
  ships.push(boat);
  ships.push(yacht);

  for (let i = 0; i < ships.length; i++) {
    //need to update ship logic
    player.gameboard.placeShip(ships[i], i * 2, i * 2);
  }
}

export { startGame };
