// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  };
  let selectedDate = null;
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
     
      selectedDate = selectedDates[0].getTime();
     
      const deltaDate = selectedDate - Date.now();
      
      if (deltaDate <= 0) {
        refs.startBtn.disabled = false;
        return (
          Notify.failure('Вибраний час в минулому'),
          (refs.startBtn.disabled = true)
        );
      }
    },
  };

  flatpickr(refs.input, options); 
  refs.startBtn.addEventListener('click', () => {
    refs.startBtn.disabled = true;
    Notify.info('Відлік почато');

    let intervalId = setInterval(() => {

      const deltaTime = selectedDate - Date.now();
      if (deltaTime <= 0) {
        clearInterval(intervalId);
        return Notify.success('Відлік закінчено');
      }
      const reverseTimer = convertMs(deltaTime);
      
      refs.days.textContent = addLeadingZero(reverseTimer.days);
      refs.hours.textContent = addLeadingZero(reverseTimer.hours);
      refs.minutes.textContent = addLeadingZero(reverseTimer.minutes);
      refs.seconds.textContent = addLeadingZero(reverseTimer.seconds);
    }, 1000);
  });
  
  function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  // -------------------------------------------------
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }