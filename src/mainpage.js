function mainpage() {
  renderPage();
}

function renderPage() {
  const bodyElement = document.querySelector("body");
  let pageTitle = document.createElement("h1");
  pageTitle.textContent = "Battleship";

  bodyElement.appendChild(pageTitle);
}

export { mainpage };
