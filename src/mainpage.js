function mainpage() {
  renderPage();
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

export { mainpage };
