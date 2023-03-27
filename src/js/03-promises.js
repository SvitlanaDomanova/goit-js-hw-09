import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delay: document.querySelector(`input[name='delay']`),
  step: document.querySelector(`input[name='step']`),
  amount: document.querySelector(`input[name='amount']`),
  submitBtn: document.querySelector(`.form`),
};


function createPromise(i, delay) {
  return new Promise((resolve, reject) => {
    const isSuccess = Math.random() > 0.3;
    setTimeout(() => {
      if (isSuccess) {
        resolve({ i, delay });
      } else {
        reject({ i, delay });
      }
    }, delay);
  });
}

refs.submitBtn.addEventListener('submit', evt => {
  evt.preventDefault();
  let delay = Number(refs.delay.value);
  let step = Number(refs.step.value);
  let amount = Number(refs.amount.value);
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ i, delay }) => {
        return Notify.success(`✅ Fulfilled promise ${i} in ${delay} ms`);
      })
      .catch(({ i, delay }) => {
        return Notify.failure(`❌ Rejected promise ${i} in ${delay} ms`);
      });
    delay += step;
  }
});