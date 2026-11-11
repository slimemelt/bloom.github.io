import { SCREENS } from "./config.js";

const stage = document.getElementById("stage");
const popup = document.getElementById("pop");
const closeButton = document.getElementById("close");

const TITLES = {
  yeeps: "Yeeps Channel – Bloom Networks",
  monarch: "Monarch – Bloom Networks",
  about: "About – Bloom Networks",
  home: "Bloom Networks",
};

// The URL hash is the only state: #yeeps / #monarch pick a screen, #dmca opens the popup.
export function renderRoute() {
  const screen = SCREENS[location.hash] ?? "home";
  const popupOpen = location.hash === "#dmca";

  stage.dataset.screen = screen;
  if (popupOpen) {
    stage.dataset.pop = "1";
    setTimeout(() => closeButton.focus(), 50);
  } else {
    delete stage.dataset.pop;
  }
  popup.setAttribute("aria-hidden", String(!popupOpen));
  document.title = popupOpen ? "DMCA – Bloom Networks" : TITLES[screen];
}

const goHome = () => (location.hash = "#home");

export function initScene() {
  // Clicking the flower you're already on goes back to all flowers.
  document.querySelectorAll(".hit").forEach((hit) => {
    const target = hit.dataset.go;
    hit.addEventListener("click", () => (location.hash = stage.dataset.screen === target ? "#home" : `#${target}`));
    const showHover = () => (stage.dataset.hover = target);
    const clearHover = () => delete stage.dataset.hover;
    hit.addEventListener("mouseenter", showHover);
    hit.addEventListener("focus", showHover);
    hit.addEventListener("mouseleave", clearHover);
    hit.addEventListener("blur", clearHover);
  });

  document.getElementById("back").addEventListener("click", goHome);
  closeButton.addEventListener("click", goHome);
  popup.addEventListener("click", (event) => event.target === popup && goHome());
  addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (stage.dataset.pop || stage.dataset.screen !== "home") goHome();
  });

  addEventListener("hashchange", renderRoute);
  renderRoute();
}
