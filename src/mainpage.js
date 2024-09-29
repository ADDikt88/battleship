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
      divBlock.setAttribute("class", "block");
      let id = `${player}-${row}_${col}`;
      divBlock.setAttribute("id", id);
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
      //blocks[index].textContent = gameboard.coordinates[row][col];
      //fillColorState(blocks[index], gameboard.coordinates[row][col]);

      //add a img listener
      blockListener(blocks[index], row, col, gameboard.coordinates[row][col]);
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

  if (state.length == 5)
    if (state.charAt(2) == "h") {
      block.textContent = "X";
      block.style.color = "red";
    }
}

function blockListener(block, row, col, state) {
  let button = document.createElement("button");
  button.style.width = "100%";
  button.style.height = "100%";
  button.style.border = "none";

  fillColorState(button, state);

  button.addEventListener("click", () => {
    console.log(`(${row},${col}) clicked`);
    button.textContent = "X";
    button.style.color = "red";
    button.style.fontSize = "2rem";
    button.disabled = "true";
  });

  block.appendChild(button);
}
export { mainpage };
