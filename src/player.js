import { createGameboard } from "./gameboard.js";

function createPlayer(type) {
  let gameboard = createGameboard(5);
  return { type, gameboard };
}
