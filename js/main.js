import { YEEPS_URL, MONARCH_URL, SLOW_LOAD_MS } from "./config.js";
import { initScene } from "./scene.js";

const stage = document.getElementById("stage");
const loader = document.getElementById("loader");

const showLoaderIfSlow = () => setTimeout(() => loader.classList.remove("off"), SLOW_LOAD_MS);

const destinations = { "go-yeeps": YEEPS_URL, "go-monarch": MONARCH_URL };
for (const [id, url] of Object.entries(destinations)) {
  const link = document.getElementById(id);
  link.href = url;
  // Leave right away; if the other site is slow to answer, the loading screen covers the wait.
  link.addEventListener("click", showLoaderIfSlow);
}

initScene();

const reveal = () => {
  loader.classList.add("off");
  setTimeout(() => stage.classList.add("ready"), 100); // flowers grow in
};
if (document.readyState === "complete") {
  reveal();
} else {
  const slowStart = showLoaderIfSlow();
  addEventListener("load", () => {
    clearTimeout(slowStart);
    reveal();
  });
}

// Coming back with the browser's back button should not show a stuck loader.
addEventListener("pageshow", (event) => event.persisted && loader.classList.add("off"));
