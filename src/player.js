import { createGameboard } from "./gameboard.js";

function createPlayer(type, ships = []) {
  let gameboard = createGameboard(8);
  return { type, gameboard, ships };
}

export { createPlayer };
