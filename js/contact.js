if (document.querySelector(".contact_form")) {
  const form = document.querySelector(".contact_form"),
    outputText = form.querySelector(".button-area span");

  form.onsubmit = (e) => {
    e.preventDefault();
    outputText.innerText = "Sending your message...";
    outputText.removeAttribute("style");
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "email.php", true);
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let response = xhr.response;
        if (
          response.indexOf("required") != -1 ||
          response.indexOf("valid") != -1 ||
          response.indexOf("failed") != -1
        ) {
          outputText.classList.remove("text-blue");
          outputText.classList.add("text-red");
        } else {
          outputText.classList.remove("text-red");
          outputText.classList.add("text-blue");
          form.reset();
          setTimeout(() => {
            slideUp(outputText, 500);
          }, 1000);
        }
        outputText.innerText = response;
      }
    };
    let formData = new FormData(form);
    xhr.send(formData);
  };
}
