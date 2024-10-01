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

  let toggleButtons = document.querySelectorAll("button");
  for (const button of toggleButtons) {
    button.classList.toggle("not-this-turn");
  }

  //if the board last clicked on was the computer (aka player's turn), let computer choose the next square
  if (id == 1) {
    computerChooses();
  }
}

function computerChooses() {
  const buttons = document.querySelectorAll("button");
  let randomIndex = Math.floor(Math.random() * 64);
  while (true) {
    if (buttons[randomIndex].disabled == false) {
      buttons[randomIndex].click();
      return;
    } else randomIndex = Math.floor(Math.random() * 64);
  }
}

export { startGame, switchTurnOrder };
