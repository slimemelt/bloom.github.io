import { YEEPS_URL, MONARCH_URL, LEAVE_DELAY_MS } from "./config.js";
import { initScene } from "./scene.js";

const stage = document.getElementById("stage");
const loader = document.getElementById("loader");

const destinations = { "go-yeeps": YEEPS_URL, "go-monarch": MONARCH_URL };
for (const [id, url] of Object.entries(destinations)) {
  const link = document.getElementById(id);
  link.href = url;
  // Show the loading screen for a beat before leaving, so the jump doesn't feel abrupt.
  link.addEventListener("click", (event) => {
    event.preventDefault();
    loader.classList.remove("off");
    setTimeout(() => (location.href = url), LEAVE_DELAY_MS);
  });
}

initScene();

const reveal = () =>
  setTimeout(() => {
    loader.classList.add("off");
    setTimeout(() => stage.classList.add("ready"), 150); // flowers grow in once the loader is gone
  }, 800);
document.readyState === "complete" ? reveal() : addEventListener("load", reveal);

// Coming back with the browser's back button should not show a stuck loader.
addEventListener("pageshow", (event) => event.persisted && loader.classList.add("off"));
