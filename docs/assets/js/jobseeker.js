const scriptURL = "https://script.google.com/macros/s/AKfycbw9oyYpQo2BT98pnXdwDNCZ1ra1NhnnqbdyE8b35Te3cZlQCkEpv5SeDOY5KDEBeJ74XA/exec";

document.addEventListener("DOMContentLoaded", function() {
  // Initialize GLightbox for registration form
  const lightbox = GLightbox({
    selector: 'a[href="#register-jobseeker"]',
    width: '90%',
    height: 'auto'
  });
  
  // Form validation with event delegation
  document.addEventListener('input', function(e) {
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const numberRegex = /^\d{10}$/;
    
    if (e.target.matches('input[name="full-name"]')) {
      validateField(e.target, nameRegex.test(e.target.value.trim()));
    }
    
    if (e.target.matches('input[name="whatsapp"]')) {
      validateField(e.target, numberRegex.test(e.target.value.trim()));
    }
    
    if (e.target.matches('input[name="phone"]')) {
      validateField(e.target, numberRegex.test(e.target.value.trim()));
    }
  });
  
  function validateField(input, isValid) {
    if (isValid) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    }
  }
  
  // Use event delegation for form submission
  document.addEventListener("submit", function(e) {
    if (e.target.id === "submit-to-google-sheet") {
      e.preventDefault();
      const formData = new FormData(e.target);
      const fileInput = e.target.querySelector("#cv");
      
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        
        if (file.size > 1024 * 1024 * 2) {
          swal("Error", "File size should be less than 2MB.", "error");
          return;
        }
        
        const reader = new FileReader();
        reader.onload = function() {
          formData.append("cv", reader.result.split(",")[1]);
          submitForm(formData, e.target, lightbox);
        };
        reader.readAsDataURL(file);
      } else {
        submitForm(formData, e.target, lightbox);
      }
    }
  });
});

function submitForm(formData, form, lightbox) {
  const button = form.querySelector("button[type='submit']");
  button.disabled = true;
  button.innerText = "Submitting...";
  
  // save WhatsApp number before form.reset
  const phoneNumber = form.querySelector('input[name="whatsapp"]').value;
  
  fetch(scriptURL, { method: "POST", body: formData })
    .then(() => {
      // Try to close the GLightbox using its API
      try {
        lightbox.close();
        
        // Alternative close method if the above doesn't work
        setTimeout(() => {
          const closeButton = document.querySelector('.gclose');
          if (closeButton) {
            closeButton.click();
          }
        }, 100);
      } catch (err) {
        console.error("Error closing lightbox:", err);
      }
      
      // Show success message with both OK and Cancel buttons
      setTimeout(() => {
        swal({
          title: "Registration Successful!",
          text: "Your registration has been submitted successfully! Would you like to connect on WhatsApp for updates?",
          icon: "success",
          buttons: {
            cancel: {
              text: "Stay Here",
              value: false,
              visible: true,
              className: "btn-secondary",
            },
            confirm: {
              text: "Go to WhatsApp",
              value: true,
              visible: true,
              className: "btn-success",
            }
          },
        }).then((goToWhatsApp) => {
          // Reset form regardless of choice
          form.reset();
          
          if (goToWhatsApp) {
            // WhatsApp Confirmation
            const encodedMessage = encodeURIComponent(
              `Hi, I have successfully registered on Jobinfo with ${phoneNumber}. Please keep me updated.`
            );
            
            // Redirect to WhatsApp chat
            window.open(`https://wa.me/9847178170?text=${encodedMessage}`, '_blank');
          }
          // If user clicks "Stay Here", just stay on the page
        });
      }, 300);
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
      swal("Error", "Something went wrong. Please try again or Contact US.", "error");
    })
    .finally(() => {
      button.disabled = false;
      button.innerText = "Register";
    });
}