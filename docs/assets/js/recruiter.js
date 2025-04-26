document.addEventListener('DOMContentLoaded', function() {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbz-Q1Vkc8QXQHKvFSYJxduEpIT6x_dpwIiROhHb--yER-dflzXL77QjdibsFxscTDPU/exec';
  
  // This will handle form submission regardless of where the form appears
  document.addEventListener('submit', function(e) {
    if (e.target.name === 'job-form') {
      e.preventDefault();
      fetch(scriptURL, { method: 'POST', body: new FormData(e.target) })
        .then(response => alert("Thank you! Vacancy submitted successfully."))
        .then(() => e.target.reset())
        .catch(error => alert('Error occurred. Please try again.'));
    }
  });

  // Initialize GLightbox
  const lightbox = GLightbox({
    selector: 'a[href="#submit-job"]',
    width: '90%',
    height: 'auto',
    onOpen: () => {
      // If needed, you can add any initialization code for the modal here
    }
  });
});