import "./styles.css";
import { mainpage, renderPage, clearPage } from "./mainpage.js";

console.log("Battleship STARTS");

renderPage();
mainpage();
footer();

function footer() {
  const footer = document.querySelector("footer");
  const author = document.createElement("p");
  author.setAttribute("class", "author");
  author.innerHTML =
    'made by: <a href="https://github.com/ADDikt88/" target="_blank">github/ADDikt88</a>';
  footer.appendChild(author);
}

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
