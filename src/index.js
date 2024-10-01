import "./styles.css";
import { mainpage, renderPage, clearPage } from "./mainpage.js";

console.log("Battleship STARTS");

renderPage();
mainpage();

//Allow player to randomize ships
const randomizeButton = document.querySelector(".randomize-button");
randomizeButton.addEventListener("click", () => {
  clearPage();
  renderPage();
  mainpage();
});

//Allow player to restart game
const restartButton = document.querySelector(".restart-button");
restartButton.addEventListener("click", () => {
  randomizeButton.disabled = false;
  clearPage();
  renderPage();
  mainpage();
});
