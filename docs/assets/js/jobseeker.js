document.addEventListener("DOMContentLoaded", function () {
  const form = document.forms["jobseeker-form"];
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzdEo3FmDRgGdijn_tbrlD0wY0VlMOmiR2cgeX58qL02oASWu2Majjsv4SWvikcTJOl0g/exec"; // Use your deployed script URL

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const statusBox = document.createElement("div");
    statusBox.style.marginTop = "20px";
    statusBox.style.padding = "10px";
    statusBox.style.borderRadius = "8px";
    statusBox.style.textAlign = "center";
    form.appendChild(statusBox);

    const formData = new FormData(form);
    const file = formData.get("cv-upload");

    if (file && file.size > 0) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result.split(",")[1];
        const uploadPayload = {
          fileName: file.name,
          data: base64Data,
          contentType: file.type,
        };

        try {
            const uploadRes = await fetch(WEB_APP_URL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  mode: "upload",
                  ...uploadPayload,
                }),
              });
              

          const fileUrl = await uploadRes.text();
          sendForm(fileUrl);
        } catch (err) {
          statusBox.textContent = "❌ File upload failed. Try again.";
          statusBox.style.backgroundColor = "#f8d7da";
          statusBox.style.color = "#721c24";
        }
      };
      reader.readAsDataURL(file);
    } else {
      sendForm(""); // No file
    }

    async function sendForm(fileUrl) {
      formData.append("cvLink", fileUrl);

      try {
        const res = await fetch(WEB_APP_URL, {
          method: "POST",
          body: formData,
        });

        const result = await res.text();
        if (result.includes("Success")) {
          statusBox.textContent = "✅ Registration successful! Thank you for joining JobInfo.";
          statusBox.style.backgroundColor = "#d4edda";
          statusBox.style.color = "#155724";
          form.reset();
        } else {
          throw new Error("Failed");
        }
      } catch (err) {
        statusBox.textContent = "❌ There was a problem submitting the form.";
        statusBox.style.backgroundColor = "#f8d7da";
        statusBox.style.color = "#721c24";
      }
    }
  });
});
