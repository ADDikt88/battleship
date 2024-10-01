import { createPlayer } from "./player.js";
import { createShip } from "./ships.js";
import { createGameboard } from "./gameboard.js";

function startGame() {
  const Player1 = createPlayer("human");
  Player1.ships = initializeShips(Player1);

  const Player2 = createPlayer("computer");
  Player2.ships = initializeShips(Player2);
  return { Player1, Player2 };
}

function initializeShips(player) {
  let ships = [];
  let ark = createShip("a", 2);
  let boat = createShip("b", 3);
  let cruiser = createShip("c", 4);
  cruiser.changeOrientation();
  ships.push(ark);
  ships.push(boat);
  ships.push(cruiser);

  for (let i = 0; i < ships.length; i++) {
    //need to update ship logic
    player.gameboard.placeShip(ships[i], i * 2, i * 2);
  }

  return ships;
}

function switchTurnOrder(id) {
  console.log("SWITCH TURN ORDER");
  let turnOffBoardButtons = document.querySelectorAll(`.p${id + 1} > *`);
  let turnOnBoardButtons = document.querySelectorAll(
    `.p${((id + 1) % 2) + 1} > *`
  );
  console.log(turnOffBoardButtons.length);
  for (let i = 0; i < turnOffBoardButtons.length; i++) {
    turnOffBoardButtons[i].setAttribute("class", "player-turn-off");
    turnOnBoardButtons[i].setAttribute("class", "player-turn-on");
  }
}

export { startGame, switchTurnOrder };
