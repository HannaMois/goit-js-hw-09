import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const text = document.querySelector('#datetime-picker');
const timerHtml = document.querySelector('.timer');
const btnStart = document.querySelector('button[data-start]');
const seconds = document.querySelector('span[data-seconds]');
const minutes = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');
const days = document.querySelector('span[data-days]');
const fieldHtml=document.querySelectorAll(".timer .field");

btnStart.disabled = true;
let timer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(text, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

btnStart.addEventListener('click', finallyTime);

function finallyTime() {
  timer = setInterval(() => {
    let countdown = new Date(text.value) - new Date();
    
    btnStart.disabled = true;

    if (countdown >= 0) {
      let finTime = convertMs(countdown);
      days.textContent = addLeadingZero(finTime.days);
      hours.textContent = addLeadingZero(finTime.hours);
      minutes.textContent = addLeadingZero(finTime.minutes);
      seconds.textContent = addLeadingZero(finTime.seconds);
    
    } else {
        Notiflix.Notify.success('Countdown finished');
        clearInterval(timer);
    }
  }, 1000);
};

text.style.border = "2px solid lightgreen";
text.style.borderRadius = "5px";
btnStart.style.border = "2px solid lightblue";
btnStart.style.borderRadius = "5px";
btnStart.style.width = "60px";

timerHtml.style.display = "flex";

fieldHtml.forEach((field) => {
    // field.style.color = "blueviolet";
    field.style.border='1px solid blue';
    field.style.borderRadius='5px';
    field.style.backgroundColor='lightblue';
    field.style.marginTop='30px';
    field.style.marginRight='10px';
    field.style.padding='10px';
   
  });

minutes.style.fontSize = '30px';
days.style.fontSize = '30px';
hours.style.fontSize = '30px';
seconds.style.fontSize = '30px';
