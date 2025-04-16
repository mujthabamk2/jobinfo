const scriptURL = "https://script.google.com/macros/s/AKfycbwmvCX0NYtLmIIHouYGuKxMZOYz1kKiQ3qTrV0oDdbtBFCTDyCvl9vXF4M6wAzu6a5zTw/exec";
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

  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => {
      swal("Success", "Registration Submitted!", "success");
      form.reset();
    })
    .catch((error) => {
      swal("Error", "Something went wrong. Please try again.", "error");
    })
    .finally(() => {
      button.disabled = false;
      button.innerText = "Register";
    });
}