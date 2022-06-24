let justPlayed = null;
const playSound = (key) => {
  if (key === justPlayed) return;
  const keyElement = document.querySelector(`div[data-key="${key}"]`);
  let audio = document.querySelector(`audio[data-key="${key}"]`);
  if (keyElement != null) {
    keyElement.classList.add("playing");
    audio.addEventListener("ended", () => {
      keyElement.classList.remove("playing");
    });
  } else {
    audio = document.querySelector(`audio[data-key="other"]`);
  }
  audio.currentTime = 0;
  audio.play();
  justPlayed = key;
};

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}

window.addEventListener("keydown", (e) => {
  playSound(e.key);
});
window.addEventListener("keyup", () => {
  justPlayed = null;
});

const keys = Array.from(document.querySelectorAll(".key"));
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
window.addEventListener("click", (e) => {
  if (
    e.target.parentNode.classList[0] != "key" &&
    e.target.parentNode.classList[0] != "keys"
  ) {
    playSound(null);
  } else {
    keys.forEach((key) => {
      key.addEventListener("pointerdown", (e) => {
        playSound(e.currentTarget.dataset.key);
      });
      key.addEventListener("pointerup", (e) => {
        justPlayed = null;
      });
    });
  }
});
