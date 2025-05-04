document.addEventListener('DOMContentLoaded', function() {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbz-Q1Vkc8QXQHKvFSYJxduEpIT6x_dpwIiROhHb--yER-dflzXL77QjdibsFxscTDPU/exec';
  
  // This will handle form submission regardless of where the form appears
  document.addEventListener('submit', function(e) {
    if (e.target.name === 'job-form') {
      e.preventDefault();
      
      // Get the submit button
      const submitButton = e.target.querySelector('button[type="submit"]');
      
      // Change button text and disable it
      submitButton.innerText = 'Submitting...';
      submitButton.disabled = true;
      
      fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(e.target) 
      })
      .then(response => {
        // Check if SweetAlert is available
        if (typeof swal === 'function') {
          swal({
            title: "Success!",
            text: "Thank you! Vacancy submitted successfully.",
            icon: "success",
            button: "OK",
          });
        } else if (typeof Swal !== 'undefined') {
          // For SweetAlert2
          Swal.fire({
            title: "Success!",
            text: "Thank you! Vacancy submitted successfully.",
            icon: "success",
            confirmButtonText: "OK"
          });
        } else {
          // Fallback to standard alert if SweetAlert isn't available
          alert("Thank you! Vacancy submitted successfully.");
        }
        
        // Reset the form
        e.target.reset();
        
        // Reset button state
        submitButton.innerText = 'Submit Job';
        submitButton.disabled = false;
      })
      .catch(error => {
        console.error('Error!', error.message);
        
        // Check if SweetAlert is available
        if (typeof swal === 'function') {
          swal({
            title: "Error",
            text: "Error occurred. Please try again.",
            icon: "error",
            button: "OK",
          });
        } else if (typeof Swal !== 'undefined') {
          // For SweetAlert2
          Swal.fire({
            title: "Error",
            text: "Error occurred. Please try again.",
            icon: "error",
            confirmButtonText: "OK"
          });
        } else {
          // Fallback to standard alert if SweetAlert isn't available
          alert('Error occurred. Please try again.');
        }
        
        // Reset button state
        submitButton.innerText = 'Submit Job';
        submitButton.disabled = false;
      });
    }
  });

  // Initialize GLightbox if it exists
  if (typeof GLightbox === 'function') {
    const lightbox = GLightbox({
      selector: 'a[href="#submit-job"]',
      width: '90%',
      height: 'auto',
      onOpen: () => {
        // If needed, you can add any initialization code for the modal here
      }
    });
  }
});