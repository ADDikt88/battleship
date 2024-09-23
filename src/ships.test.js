import { createShip } from "./ships.js";

test("inflicts 1 damage", () => {
  let battleship = createShip(5);
  battleship.hit();
  expect(battleship.damage).toBe(1);
});

test("inflicts 2 damage", () => {
  let battleship = createShip(5);
  battleship.hit();
  battleship.hit();
  expect(battleship.damage).toBe(2);
});

test("battleship sunk", () => {
  let battleship = createShip(5);
  battleship.hit();
  battleship.hit();
  battleship.hit();
  battleship.hit();
  battleship.hit();
  expect(battleship.isSunk).toBeTruthy();
});

test("battleship switch orientation", () => {
  let battleship = createShip(5);
  battleship.changeOrientation();
  expect(battleship.orientation).toBe("vertical");
});
