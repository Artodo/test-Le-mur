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
      alert("Заполните обязательные поля!");
    }
  }

  function formValidate() {
    let errors = 0;
    const requiredFields = document.querySelectorAll('.required');
    for (let index = 0; index < requiredFields.length; index++) {
      const input = requiredFields[index];
      fieldRemoveError(input);
      if (input.value === '') {
        fieldAddError(input);
        errors++;
      } else if (input.getAttribute("type") === "checkbox" && !input.checked) {
        fieldAddError(input);
        errors++;
      } else if (input.getAttribute("type") === "radio" && !isRadioChecked()) {
        fieldAddError(input);
        errors++;
      }
    }

    return errors;
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

  function fieldAddError(input) {
    input.classList.add('error');
  }

  function fieldRemoveError(input) {
    input.classList.remove('error');
  }
})
