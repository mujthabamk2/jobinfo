const scriptURL = 'https://script.google.com/macros/s/AKfycbwMpqDRw9KcdC2dYqGoxqmoNbmzjNTTYVtOYzxmmm9CP6dKyeGYHj2PY1iRmQ2F_iwz/exec';
const form = document.forms['job-form'];

form.addEventListener('submit', e => {
  e.preventDefault();

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      alert("✅ Job submitted successfully!");
      form.reset(); // Optionally reset the form
    })
    .catch(error => {
      alert("❌ Something went wrong. Please try again.");
      console.error('Error!', error.message);
    });
});