const scriptURL = "https://script.google.com/macros/s/AKfycbw9oyYpQo2BT98pnXdwDNCZ1ra1NhnnqbdyE8b35Te3cZlQCkEpv5SeDOY5KDEBeJ74XA/exec";
const form = document.getElementById("submit-to-google-sheet");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  // File validation & base64 encoding
  const fileInput = document.getElementById("cv");
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];

    if (file.size > 1024 * 1024 * 2) {
      swal("Error", "File size should be less than 2MB.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = async function () {
      formData.append("cv", reader.result.split(",")[1]);
      await submitForm(formData);
    };
    reader.readAsDataURL(file);
  } else {
    await submitForm(formData);
  }
});

async function submitForm(formData) {
  const button = form.querySelector("button[type='submit']");
  button.disabled = true;
  button.innerText = "Submitting...";

  // save WhatsApp number before form.reset
  const phoneNumber = form.querySelector('input[name="whatsapp"]').value;

  fetch(scriptURL, { method: "POST", body: formData })
    .then(() => {
      swal({
        title: "Success!",
        text: "Registration submitted successfully! \n you will redirect to Whatsapp.",
        icon: "success",
        button: "OK",
      }).then(() => {
        form.reset(); // Clear form after confirmation
      
        // WhatsApp Confirmation
        const encodedMessage = encodeURIComponent(
          `Hi, I have successfully registered on Jobinfo with ${phoneNumber}. Please keep me updated.`
        );
      
        // Redirect to WhatsApp chat (you can customize phone number if needed)
        window.open(`https://wa.me/9847178170?text=${encodedMessage}`, '_blank');
      });
      
    })
    .catch(() => {
      swal("Error", "Something went wrong. Please try again or Contact US.", "error");
    })
    .finally(() => {
      button.disabled = false;
      button.innerText = "Register";
    });
}


document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.querySelector('input[name="full-name"]');
  const whatsappInput = document.querySelector('input[name="whatsapp"]');
  const phoneInput = document.querySelector('input[name="phone"]');

  const nameRegex = /^[A-Za-z\s]{3,}$/;
  const numberRegex = /^\d{10}$/;

  function validateField(input, isValid) {
    if (isValid) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    }
  }

  nameInput.addEventListener("input", () => {
    validateField(nameInput, nameRegex.test(nameInput.value.trim()));
  });

  whatsappInput.addEventListener("input", () => {
    validateField(whatsappInput, numberRegex.test(whatsappInput.value.trim()));
  });

  phoneInput.addEventListener("input", () => {
    validateField(phoneInput, numberRegex.test(phoneInput.value.trim()));
  });
});