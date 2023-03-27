const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');
let timerId = null;
startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    bodyRef.style.background = randomColor;
  }, 1000);
});
stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  clearInterval(timerId);
  console.log('interval is stopped');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
