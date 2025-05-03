document.addEventListener("DOMContentLoaded", function() {
  const toggleBtn = document.getElementById('toggle-question-form');
  const questionFormWrapper = document.getElementById('question-form-wrapper');
  const questionForm = document.getElementById('submit-question-form');
  const submitBtn = questionForm.querySelector('button[type="submit"]'); // get the submit button inside the form

  toggleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (questionFormWrapper.style.display === 'none') {
      questionFormWrapper.style.display = 'block';
      toggleBtn.style.display = 'none'; // Hide the Ask button once form appears
    }
  });

  questionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    submitBtn.innerText = 'Submitting...'; // change button text
    submitBtn.disabled = true; // optional: disable button during submit

    const formData = new FormData(questionForm);

    fetch('https://script.google.com/macros/s/AKfycbwOZfQMNz2rHlDAf2Cxh4DQmsuRUwqnD1GwK8o406Eb8cgvbTwMcS_inERubUNCenBIJA/exec', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      swal("Success!", "Your question has been submitted! We will reach out to you via WhatsApp. Thank you!", "success");
      questionForm.reset();
      questionFormWrapper.style.display = 'none'; 
      toggleBtn.style.display = 'inline-block'; 
      toggleBtn.innerText = 'Ask Another Question'; // Change Ask button text
      submitBtn.innerText = 'Submit'; // reset submit button text
      submitBtn.disabled = false; // re-enable submit button
    })
    .catch(error => {
      console.error('Error!', error.message);
      swal("Error", "There was a problem submitting your question.", "error");
      submitBtn.innerText = 'Submit'; // reset submit button text
      submitBtn.disabled = false; // re-enable submit button
    });
  });
});
