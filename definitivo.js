var btn1 = document.querySelector("#btn-1");
var btnPrev2 = document.querySelector("#btn-2-prev");
var btnNext2 = document.querySelector("#btn-2-next");
var btnPrev3 = document.querySelector("#btn-3-prev");
var btnNext3 = document.querySelector("#btn-3-next");
var btnPrev4 = document.querySelector("#btn-4-prev");
var btnNext4 = document.querySelector("#btn-4-next");
var btnPrev5 = document.querySelector("#btn-5-prev");
var btnNext5 = document.querySelector("#btn-5-next");
var btnPrev6 = document.querySelector("#btn-6-prev");
var enviar = document.querySelector("#btn-6");
var btnvolver = document.querySelector("#volver");

btn1.addEventListener("click", function (e) {
  gotoNextForm(btn1, btnNext2, 1, 2);
  e.preventDefault();
});

btnNext2.addEventListener("click", function (e) {
  gotoNextForm(btnNext2, btnNext3, 2, 3);
  e.preventDefault();
});

btnNext3.addEventListener("click", function (e) {
  gotoNextForm(btnNext3, btnNext4, 3, 4);
  e.preventDefault();
});

btnNext4.addEventListener("click", function (e) {
  gotoNextForm(btnNext4, btnNext5, 4, 5);
  e.preventDefault();
});

btnNext5.addEventListener("click", function (e) {
  gotoNextForm(btnNext5, enviar, 5, 6);
  e.preventDefault();
});

btnPrev2.addEventListener("click", function (e) {
  gotoPrevForm(btnPrev2, btn1, 2, 1);
  e.preventDefault();
});

btnPrev3.addEventListener("click", function (e) {
  gotoPrevForm(btnPrev3, btnPrev2, 3, 2);
  e.preventDefault();
});

btnPrev4.addEventListener("click", function (e) {
  gotoPrevForm(btnPrev4, btnPrev3, 4, 3);
  e.preventDefault();
});

btnPrev5.addEventListener("click", function (e) {
  gotoPrevForm(btnPrev5, btnPrev4, 5, 4);
  e.preventDefault();
});

btnPrev6.addEventListener("click", function (e) {
  gotoPrevForm(btnPrev6, btnPrev5, 6, 5);
  e.preventDefault();
});

enviar.addEventListener("click", function (e) {
  gotoNextForm(btnPrev6, btnvolver, 6, 7);
  mostrar();
  e.preventDefault();
});

btnvolver.addEventListener("click", function (e) {
  gotoPrevForm(btnvolver, btn1, 7, 1);
  e.preventDefault();
});

var gotoNextForm = (prev, next, stepPrev, stepNext) => {
  var prevForm = prev.parentElement;
  var nextForm = next.parentElement;
  var nextStep = document.querySelector(`.paso--${stepNext}`);
  var prevStep = document.querySelector(`.paso--${stepPrev}`);

  nextForm.classList.add("form-active");
  nextForm.classList.add("form-enter-from-right");
  prevForm.classList.add("form-exit-to-left");

  prevStep.classList.remove("paso-activo");
  nextStep.classList.add("paso-activo");

  setTimeout(() => {
    prevForm.classList.remove("form-active");
    prevForm.classList.remove("form-exit-to-left");
    nextForm.classList.remove("form-enter-from-right");
  }, 800);
};

var gotoPrevForm = (prev, next, stepPrev, stepNext) => {
  var prevForm = prev.parentElement;
  var nextForm = next.parentElement;
  var nextStep = document.querySelector(`.paso--${stepNext}`);
  var prevStep = document.querySelector(`.paso--${stepPrev}`);

  nextForm.classList.add("form-active");
  nextForm.classList.add("form-enter-from-left");
  prevForm.classList.add("form-exit-to-right");

  prevStep.classList.remove("paso-activo");
  nextStep.classList.add("paso-activo");

  setTimeout(() => {
    prevForm.classList.remove("form-active");
    prevForm.classList.remove("form-exit-to-right");
    nextForm.classList.remove("form-enter-from-left");
  }, 800);
};

var miTabla = document.querySelector("#tabla");
var instruction = document.querySelector("#instruc");

function mostrar() {
  var forename = document.getElementById("name");
  var email = document.getElementById("email");
  var address = document.getElementById("validationDefault04");
  var id = document.getElementById("id");
  var birthdate = document.getElementById("birthdate");
  var positive = document.querySelector("input[name=option1]:checked");
  var taste = document.querySelector("input[name=option2]:checked");
  var work = document.querySelector("input[name=option3]:checked");
  var trip = document.querySelector("input[name=option4]:checked");
  var symps = document.querySelector("input[name=option5]:checked");
  var returntrip = document.querySelector("input[name=option6]:checked");
  texto = `
    <tr>
    <td>${forename.value}</td>
    <td>${email.value}</td>
    <td>${address.value}</td>
    <td>${id.value}</td>
    <td>${birthdate.value}</td>
    <td>${positive.value}</td>
    <td>${taste.value}</td>
    <td>${work.value}</td>
    <td>${trip.value}</td>
    <td>${symps.value}</td>
    <td>${returntrip.value}</td>
    </tr>
    `;
  miTabla.innerHTML += texto;

  //reset de los forms
  forename.value = "";
  email.value = "";
  address.value = "";
  id.value = "";
  birthdate.value = "";
  document.getElementById("Radio2").checked = true; //contacto
  document.getElementById("Radio4").checked = true; //olfato
  document.getElementById("Radio6").checked = true; //trabajo
  document.getElementById("Radio8").checked = true; //exterior
  document.getElementById("Radio10").checked = true; //sintomas
  document.getElementById("Radio11").checked = true; //viaje provincias

  if (positive.value === "Si" || taste.value === "Si") {
    instruc1 = `<h1>
    Te deberías volver a casa</h1>
    `;
    instruction.innerHTML += instruc1;
  }
}
