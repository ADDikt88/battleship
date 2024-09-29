import { createPlayer } from "./player.js";
import { createShip } from "./ships.js";
import { createGameboard } from "./gameboard.js";

function startGame() {
  const Player1 = createPlayer("human");
  initializeShips(Player1);

  const Player2 = createPlayer("computer");
  initializeShips(Player2);
  return { Player1, Player2 };
}

function initializeShips(player) {
  let ships = [];
  let ark = createShip("a", 2);
  let boat = createShip("b", 3);
  let cruiser = createShip("c", 4);
  ships.push(ark);
  ships.push(boat);
  ships.push(cruiser);

  for (let i = 0; i < ships.length; i++) {
    //need to update ship logic
    player.gameboard.placeShip(ships[i], i * 2, i * 2);
  }
}

export { startGame };
