import { startGame } from "./gameLogic.js";
function mainpage() {
  renderPage();
  const newGame = startGame();

  let p1gameboard = newGame.Player1.gameboard;
  let p2gameboard = newGame.Player2.gameboard;
  console.log("Player1 ");
  console.log(p1gameboard.coordinates);
  console.log("Player2 ");
  console.log(p2gameboard.coordinates);

  drawGameboardState(p1gameboard, 0);
  drawGameboardState(p2gameboard, 1);
}

function renderPage() {
  const player1Container = document.querySelector(
    ".player-1-gameboard-container"
  );
  player1Container.appendChild(drawGrid());

  const player2Container = document.querySelector(
    ".player-2-gameboard-container"
  );
  player2Container.appendChild(drawGrid());
}

function drawGrid() {
  const gameboardGrid = document.createElement("div");
  gameboardGrid.setAttribute("class", "grid");

  let divRow = [];
  const gridSize = 8;

  for (let row = 0; row < gridSize; row++) {
    divRow[row] = document.createElement("div");
    divRow[row].setAttribute("class", "row");
    for (let col = 0; col < gridSize; col++) {
      let divBlock = document.createElement("div");
      divBlock.setAttribute("class", "block");
      divRow[row].appendChild(divBlock);
    }
    gameboardGrid.appendChild(divRow[row]);
  }

  return gameboardGrid;
}

function drawGameboardState(gameboard, id) {
  const gridSize = 8;
  let blocks = document.querySelectorAll(".block");
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let index = gridSize * gridSize * id + (row * gridSize + col);
      blocks[index].textContent = gameboard.coordinates[row][col].charAt(0);
    }
  }
}

export { mainpage };
