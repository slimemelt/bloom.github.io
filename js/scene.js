import { SCREENS, POPUP_PATH } from "./config.js";

const stage = document.getElementById("stage");
const popup = document.getElementById("pop");
const closeButton = document.getElementById("close");

const TITLES = {
  yeeps: "Yeeps Channel - Bloom Networks",
  monarch: "Monarch - Bloom Networks",
  about: "About - Bloom Networks",
  "age-guidelines": "Age Guidelines - Bloom Networks",
  home: "Bloom Networks",
};

const cleanPath = () => location.pathname.replace(/\/+$/, "") || "/";

export function renderRoute() {
  const path = cleanPath();
  const screen = SCREENS[path] ?? "home";
  const popupOpen = path === POPUP_PATH;

  stage.dataset.screen = screen;
  document.documentElement.dataset.screen = screen;
  if (popupOpen) {
    stage.dataset.pop = "1";
    setTimeout(() => closeButton.focus(), 50);
  } else {
    delete stage.dataset.pop;
  }
  popup.setAttribute("aria-hidden", String(!popupOpen));
  document.title = popupOpen ? "DMCA - Bloom Networks" : TITLES[screen];
}

function go(path) {
  if (cleanPath() !== path) history.pushState(null, "", path);
  renderRoute();
}

const goHome = () => go("/");

export function initScene() {
  document.querySelectorAll(".hit").forEach((hit) => {
    const target = hit.dataset.go;
    hit.addEventListener("click", () => go(stage.dataset.screen === target ? "/" : `/${target}`));
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

  document.querySelectorAll(".site-footer a[href^='/'], .ages a[href='/'], .about a[href='/']").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      go(link.getAttribute("href"));
    });
  });

  const handedOver = sessionStorage.getItem("bloom-path");
  if (handedOver) {
    sessionStorage.removeItem("bloom-path");
    history.replaceState(null, "", handedOver);
  }

  const legacy = location.hash.replace("#", "/");
  if (location.pathname === "/" && (SCREENS[legacy] || legacy === POPUP_PATH)) history.replaceState(null, "", legacy);

  addEventListener("popstate", renderRoute);
  renderRoute();
}
