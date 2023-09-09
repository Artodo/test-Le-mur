"use strict"
// modal
const rules = document.querySelector(".rules");
const processingRules = document.querySelector("#processingRules");

processingRules.addEventListener("click", function () {
  rules.classList.toggle("active")
})


//mASK
$(document).ready(function () {
  $("#phone").inputmask({ "mask": "+7 (999) 999-99-99" });
});


////
// const submitForm = document.querySelector("#submitBtn");
// const nameData = document.querySelector("#name");
// const phone = document.querySelector("#phone");
// const call = document.querySelector("#call");
// const message = document.querySelector("#message");
// const agree = document.querySelector("#agree");

// const agreed = agree.checked;
// const callBack = call.checked;
// const writeMessage = message.checked;

// submitForm.addEventListener("click", function () {
//   if (!nameData.value) {
//     nameData.classList.add("error");
//     return;
//   } else if (!phone.value) {
//     phone.classList.add("error");
//     return;
//   } else {
//     if ((callBack || writeMessage) && agreed) {
//       if (callBack) {
//         console.log("звони");
//       } else {
//         console.log("пиши в телегу")
//       }
//       console.log(nameData.value, phone.value);
//     }
//     else {
//       console.log("Нифига");
//     }
//   }
// })

////////////////////
function isRadioChecked() {
  const radio = document.querySelectorAll('input[type="radio"]');
  for (let el of radio) {
    if (el.checked) {
      return true
    }
  } return false
}



document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);


    if (error === 0) {
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
      } else {
        alert('Ошибка');
      }
    } else {
      alert("Заполните обязательные поля");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');
    let numberRadio = 0;
    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);
      if (input.value === '') {
        formAddError(input);
        error++;
      } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
        isRadioChecked()
        formAddError(input);
        error++;
      } else if (input.getAttribute("type") === "radio") {
        if (!isRadioChecked()) {
          formAddError(input);
          error++;
        }
      }
    }
    console.log(error);
    return error;
  }

  function formAddError(input) {
    input.classList.add('error');
  }

  function formRemoveError(input) {
    input.classList.remove('error');
  }
})


