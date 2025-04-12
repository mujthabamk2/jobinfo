const scriptURL = 'https://script.google.com/macros/s/AKfycbz-Q1Vkc8QXQHKvFSYJxduEpIT6x_dpwIiROhHb--yER-dflzXL77QjdibsFxscTDPU/exec';
const form = document.forms['job-form'];

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => alert("Thank you! Vacancy submitted successfully."))
    .then(() => form.reset())
    .catch(error => alert('Error occurred. Please try again.'));
});