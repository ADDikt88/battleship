import { createGameboard } from "./gameboard.js";
import { createShip } from "./ships.js";

test("creates empty gameboard", () => {
  let gameboard = createGameboard(3);
  expect(gameboard.coordinates[2][2]).toBe("empty");
});

test("place small ship (2) inside board", () => {
  let gameboard = createGameboard(5);
  let cruiser = createShip("cruiser", 2);
  expect(gameboard.placeShip(cruiser, 2, 2)).toBeTruthy();
});

test("place small ship (3) edge board", () => {
  let gameboard = createGameboard(5);
  let boat = createShip("boat", 3);
  expect(gameboard.placeShip(boat, 0, 0)).toBeTruthy();
});

test("place small ship (3) at OUT OF BOUNDS", () => {
  let gameboard = createGameboard(5);
  let boat = createShip("boat", 3);
  expect(gameboard.placeShip(boat, 6, 6)).toBeFalsy();
});

test("place small ship (3) on board but goes OUT OF BOUNDS", () => {
  let gameboard = createGameboard(5);
  let boat = createShip("boat", 3);
  expect(gameboard.placeShip(boat, 4, 4)).toBeFalsy();
});

test("place small ship (3) on board and miss attack", () => {
  let gameboard = createGameboard(5);
  let boat = createShip("boat", 3);
  gameboard.placeShip(boat, 2, 2);
  gameboard.receiveAttack(0, 0);
  expect(gameboard.coordinates[0][0]).toBe("miss");
});

test("place small ship (3) on board and hits attack", () => {
  let gameboard = createGameboard(5);
  let boat = createShip("boat", 3);
  gameboard.placeShip(boat, 2, 2);
  gameboard.receiveAttack(2, 2, function updateShip(value) {
    console.log(value);
  });

  expect(gameboard.coordinates[2][2]).toBe("hit");
});

test("place small ship (3) on board and hits attack", () => {
  let gameboard = createGameboard(5);
  let ships = [];
  let boat = createShip("boat", 3);
  ships.push(boat);
  gameboard.placeShip(boat, 2, 2);
  gameboard.receiveAttack(2, 2, function updateShip(value) {
    console.log(value);
    ships.find((ship) => ship.name == value).hit();
    expect(boat.damage).toBe(1);
  });
});

test("place small ship (3) on board and hits attack 3x", () => {
  let gameboard = createGameboard(5);
  let ships = [];
  let boat = createShip("boat", 3);
  ships.push(boat);
  gameboard.placeShip(boat, 2, 2);
  gameboard.receiveAttack(2, 2, function updateShip(value) {
    console.log(value);
    ships.find((ship) => ship.name == value).hit();
    //expect(boat.damage).toBe(1);
  });
  gameboard.receiveAttack(2, 3, function updateShip(value) {
    console.log(value);
    ships.find((ship) => ship.name == value).hit();
    //expect(boat.damage).toBe(2);
  });
  gameboard.receiveAttack(2, 4, function updateShip(value) {
    console.log(value);
    ships.find((ship) => ship.name == value).hit();
    //expect(boat.damage).toBe(3);
  });
  gameboard.receiveAttack(2, 4, function updateShip(value) {
    console.log(value);
    ships.find((ship) => ship.name == value).hit();
    //expect(boat.isSunk).toBeTruthy();
    expect(gameboard.checkShipsSunk().toBeTruty());
  });
});

test("place cruiser (3) and place boat (2)", () => {
  let gameboard = createGameboard(5);
  let ships = [];
  let boat = createShip("boat", 3);
  let cruiser = createShip("cruiser", 2);
  cruiser.changeOrientation();
  ships.push(boat);
  ships.push(cruiser);
  gameboard.placeShip(boat, 2, 2);
  gameboard.placeShip(cruiser, 0, 0);
  expect((gameboard.shipArray = ["boat", "cruiser"]));
});

test("place cruiser (3) and place boat (2), but misplace yacht (4)", () => {
  let gameboard = createGameboard(5);
  let ships = [];
  let boat = createShip("boat", 3);
  let cruiser = createShip("cruiser", 2);
  let yacht = createShip("yacht", 4);
  cruiser.changeOrientation();
  ships.push(boat);
  ships.push(cruiser);
  ships.push(yacht);
  gameboard.placeShip(boat, 2, 2);
  gameboard.placeShip(cruiser, 0, 0);
  gameboard.placeShip(yacht, 0, 0);
  expect((gameboard.shipArray = ["boat", "cruiser"]));
});

test("place cruiser (3) and place boat (2), but correctly place yacht (4)", () => {
  let gameboard = createGameboard(5);
  let ships = [];
  let boat = createShip("boat", 3);
  let cruiser = createShip("cruiser", 2);
  let yacht = createShip("yacht", 4);
  cruiser.changeOrientation();
  ships.push(boat);
  ships.push(cruiser);
  ships.push(yacht);
  gameboard.placeShip(boat, 2, 2);
  gameboard.placeShip(cruiser, 0, 0);
  gameboard.placeShip(yacht, 0, 1);
  expect((gameboard.shipArray = ["boat", "cruiser", "yacht"]));
});
