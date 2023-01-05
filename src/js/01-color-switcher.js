const refs = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.btnStop.disabled = true;
let timerId = null;

refs.btnStart.addEventListener('click', () => {
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
  
    timerId = setInterval(() => {
      document.body.style.background = getRandomHexColor();
    }, 1000);
  });
  
  refs.btnStop.addEventListener('click', () => {
    clearInterval(timerId);
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
  });