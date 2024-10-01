import { startGame, switchTurnOrder } from "./gameLogic.js";
function mainpage() {
  renderPage();
  const newGame = startGame();

  let p1gameboard = newGame.Player1.gameboard;
  let p2gameboard = newGame.Player2.gameboard;

  let p1ships = newGame.Player1.ships;
  let p2ships = newGame.Player2.ships;

  console.log("Player1 ");
  console.log(p1gameboard.coordinates);
  console.log("Player2 ");
  console.log(p2gameboard.coordinates);

  drawGameboardState(p1gameboard, 0, p1ships);
  drawGameboardState(p2gameboard, 1, p2ships);

  //Player 1 goes first
  let player1Buttons = document.querySelectorAll(".p1 > *");
  for (const button of player1Buttons) {
    button.classList.add("not-this-turn");
  }
}

function renderPage() {
  const player1Container = document.querySelector(
    ".player-1-gameboard-container"
  );
  player1Container.appendChild(drawGrid("p1"));

  const player2Container = document.querySelector(
    ".player-2-gameboard-container"
  );
  player2Container.appendChild(drawGrid("p2"));
}

function drawGrid(player) {
  const gameboardGrid = document.createElement("div");
  gameboardGrid.setAttribute("class", "grid");

  let divRow = [];
  const gridSize = 8;

  for (let row = 0; row < gridSize; row++) {
    divRow[row] = document.createElement("div");
    divRow[row].setAttribute("class", "row");
    for (let col = 0; col < gridSize; col++) {
      let divBlock = document.createElement("div");
      divBlock.setAttribute("class", `block ${player}`);
      let id = `${player}-${row}_${col}`;
      divBlock.setAttribute("id", id);
      divRow[row].appendChild(divBlock);
    }
    gameboardGrid.appendChild(divRow[row]);
  }

  return gameboardGrid;
}

function drawGameboardState(gameboard, id, ships) {
  const gridSize = 8;
  let blocks = document.querySelectorAll(".block");
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let index = gridSize * gridSize * id + (row * gridSize + col);
      //blocks[index].textContent = gameboard.coordinates[row][col];
      //fillColorState(blocks[index], gameboard.coordinates[row][col]);

      //add a img listener
      blockListener(
        blocks[index],
        row,
        col,
        gameboard.coordinates[row][col],
        gameboard,
        id,
        ships
      );
    }
  }
}

function fillColorState(block, state) {
  let colorStates = {
    a: "purple",
    b: "yellow",
    c: "green",
    d: "orange",
    e: "blue",
  };
  block.style.backgroundColor = colorStates[state.charAt(0)];
}

function blockListener(block, row, col, state, gameboard, id, ships) {
  let button = document.createElement("button");
  button.style.width = "100%";
  button.style.height = "100%";
  button.style.border = "none";
  button.style.backgroundColor = "blue";

  if (id == 0) fillColorState(button, state);

  button.addEventListener("click", () => {
    console.log(`(${row},${col}) clicked`);

    gameboard.receiveAttack(row, col, function updateShip(value) {
      if (value == "miss") {
        updateButtonStatus(button, "miss", null, null, null);
      } else {
        console.log("SHIP NAME: " + value);
        let targetShip = ships.find((ship) => ship.name == value);
        targetShip.hit();
        updateButtonStatus(button, "hit", targetShip, gameboard, id);
      }
      switchTurnOrder(id);
    });
  });

  block.appendChild(button);
}

function updateButtonStatus(button, state, ship, gameboard, id) {
  button.style.fontSize = "2rem";

  if (state == "hit") {
    button.textContent = "X";
    button.style.color = "red";
  } else if (state == "miss") {
    button.textContent = "X";
    button.style.color = "gray";
  }

  const gridSize = 8;
  //reveal ship if sunk
  if (ship !== null) {
    if (ship.isSunk()) {
      console.log(`${ship.name} SUNK!!`);
      let targetButtons = document.querySelectorAll(`.p${id + 1} > *`);
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          if (gameboard.coordinates[row][col].charAt(0) == ship.name) {
            let index = row * gridSize + col;
            fillColorState(targetButtons[index], ship.name);
          }
        }
      }
    }
  }

  button.disabled = true;
}
export { mainpage };
