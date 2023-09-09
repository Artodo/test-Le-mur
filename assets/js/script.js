document.querySelector("#processingRules").addEventListener("click", function () {
  const rules = document.querySelector(".rules");
  rules.classList.toggle("active")
})

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    const error = formValidate();
    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData));


    if (error === 0) {
      $.ajax({
        url: "../../sendmail.php",
        type: "POST",
        data: json,
        contentType: "application/json",
        success: function () {
          $('#formCallback').html("<p class='success'>Заявка успешно отправлена</p>");
          form.reset();
        },
        error: function () {
          $('#formCallback').html("<p class='fail'>Что-то пошло не так. Пожалуйста, попробуйте ещё раз позже.</p>");
          form.reset();
        }
      });
    } else {
      alert("Заполните обязательные поля");
    }
  }

  function formValidate() {
    let error = 0;
    const formReq = document.querySelectorAll('._req');
    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);
      if (input.value === '') {
        formAddError(input);
        error++;
      } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
        isRadioChecked();
        formAddError(input);
        error++;
      } else if (input.getAttribute("type") === "radio" && !isRadioChecked()) {
        formAddError(input);
        error++;
      }
    }

    return error;
  }

  function isRadioChecked() {
    const allRadio = document.querySelectorAll('input[type="radio"]');
    for (let radio of allRadio) {
      if (radio.checked) {
        return true;
      }
    }
    return false;
  }

  function formAddError(input) {
    input.classList.add('error');
  }

  function formRemoveError(input) {
    input.classList.remove('error');
  }
})
