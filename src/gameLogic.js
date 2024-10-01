import { createPlayer } from "./player.js";
import { createShip } from "./ships.js";
import { createGameboard } from "./gameboard.js";

function startGame() {
  const Player1 = createPlayer("human");
  Player1.ships = initializeShips(Player1, 0);

  const Player2 = createPlayer("computer");
  Player2.ships = initializeShips(Player2, 1);
  return { Player1, Player2 };
}

function initializeShips(player, id) {
  let ships = [];
  const gridSize = 8;
  let ark = createShip("a", 2);
  let boat = createShip("b", 3);
  let cruiser = createShip("c", 4);
  let dragonboat = createShip("d", 5);
  ships.push(ark);
  ships.push(boat);
  ships.push(cruiser);
  ships.push(dragonboat);

  for (let i = 0; i < ships.length; i++) {
    //need to update ship logic
    console.log(`shiparray: ${player.gameboard.shipArray.length}`);
    while (player.gameboard.shipArray.length - 1 < i) {
      //randomly choose orientation
      if (Math.floor(Math.random() * 2) == 0) ships[i].changeOrientation();

      //randomly place boat
      player.gameboard.placeShip(
        ships[i],
        Math.floor(Math.random() * gridSize),
        Math.floor(Math.random() * gridSize)
      );
    }
  }

  return ships;
}

function switchTurnOrder(id, recentHitIndexStack) {
  console.log("SWITCH TURN ORDER");

  let toggleButtons = document.querySelectorAll(".blockBtn");
  for (const button of toggleButtons) {
    button.classList.toggle("not-this-turn");
  }

  //if the board last clicked on was the computer (aka player's turn), let computer choose the next square
  if (id == 1) {
    if (recentHitIndexStack.at(-1) == -1) computerChoosesRandom();
    else {
      while (!computerChoosesNearbyHits(recentHitIndexStack.at(-1))) {
        recentHitIndexStack.pop();
      }
    }
  }
}

function computerChoosesRandom() {
  const buttons = document.querySelectorAll(".blockBtn");
  let randomIndex = Math.floor(Math.random() * 64);
  while (true) {
    if (buttons[randomIndex].disabled == false) {
      buttons[randomIndex].click();
      return;
    } else randomIndex = Math.floor(Math.random() * 64);
  }
}

function computerChoosesNearbyHits(recentHitIndex) {
  const buttons = document.querySelectorAll(".blockBtn");

  const shuffle = (array) => {
    for (let i = 3; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  let myArray = [0, 1, 2, 3];
  const randomNearby = shuffle(myArray);

  for (let j = 0; j < randomNearby.length; j++) {
    //look left
    if (randomNearby[j] == 0) {
      let chosenLeftIndex = recentHitIndex - 1;
      if (chosenLeftIndex >= 0)
        if (buttons[chosenLeftIndex].disabled == false) {
          buttons[chosenLeftIndex].click();
          return true;
        }
    }
    //look right
    else if (randomNearby[j] == 1) {
      let chosenRightIndex = recentHitIndex + 1;
      if (chosenRightIndex <= 63)
        if (buttons[chosenRightIndex].disabled == false) {
          buttons[chosenRightIndex].click();
          return true;
        }
    }
    //look up
    else if (randomNearby[j] == 2) {
      let chosenUpIndex = recentHitIndex - 8;
      if (chosenUpIndex >= 0)
        if (buttons[chosenUpIndex].disabled == false) {
          buttons[chosenUpIndex].click();
          return true;
        }
    }
    //look down
    else if (randomNearby[j] == 3) {
      let chosenDownIndex = recentHitIndex + 8;
      if (chosenDownIndex <= 63)
        if (buttons[chosenDownIndex].disabled == false) {
          buttons[chosenDownIndex].click();
          return true;
        }
    }
  }

  return false;
}

export { startGame, switchTurnOrder };
