import { createGameboard } from "./gameboard.js";

function createPlayer(type) {
  let gameboard = createGameboard(8);
  return { type, gameboard };
}

export { createPlayer };
