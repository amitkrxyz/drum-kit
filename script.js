const playSound = (key) => {
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
};

window.addEventListener("keydown", (e) => {
  playSound(e.key);
});
function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}
const keys = Array.from(document.querySelectorAll(".key"));
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
window.addEventListener("click", (e) => {
  if (e.target.classList[0] != "key") {
    playSound(null);
  }
  keys.forEach((key) =>
    key.addEventListener("click", (e) => {
      playSound(e.currentTarget.dataset.key);
    })
  );
});
