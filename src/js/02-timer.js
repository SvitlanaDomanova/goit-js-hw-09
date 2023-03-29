// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
require('flatpickr/dist/themes/material_red.css');

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  };
  

  refs.startBtn.disabled = true;

  let deltaTime = 0;
  let timerId = null;
  let selectedDate = null;

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
     selectedDate = selectedDates[0];
     if (selectedDates[0] < new Date()) {
        window.alert('Вибрана дата в минулому');
        return
     } else {
        refs.startBtn.disabled = false;
     }
    },
  };

  flatpickr(refs.input, options); 

 const handleBtnClick = () => {
    timerId = setInterval(() => {
        deltaTime = selectedDate - new Date();
        console.log(deltaTime);
         
      refs.days.textContent = convertMs(deltaTime).days;
      refs.hours.textContent = convertMs(deltaTime).hours;
      refs.minutes.textContent = convertMs(deltaTime).minutes;
      refs.seconds.textContent = convertMs(deltaTime).seconds;

      if (deltaTime <= 1000) {
        clearInterval(timerId);
      }
    }, 1000);
 }
    refs.startBtn.addEventListener('click', handleBtnClick);
     
  function convertMs(ms) {
    // Number of milliseconds per unit of time
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
  // -------------------------------------------------
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
  