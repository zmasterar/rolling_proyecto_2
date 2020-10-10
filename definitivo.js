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
  document.querySelector(`.paso--6`).classList.remove("paso-activo");
  document.querySelector(`.paso--7`).classList.add("paso-activo");
  enviar.parentElement.style.display = "none";
  document.querySelector(".form-mensaje").innerHTML = `
    <h1 class="form-mensaje-text">Se envió correctamete <br> <br>
    Abajo se encuentran las instrucciones</h1>
    <button class="form-btn btn-warning" id="volver" onclick="volver()">Volver a Empezar</button>`;
  e.preventDefault();
});

function volver() {
  var reinicio = document.querySelector("#reinicio");
  var texto = `
    <div class="form-cabecera">
                <h1 class="form-cabecera-title">
                    Información Personal
                </h1>
                <p class="form-cabecera-text">
                    Cuéntanos sobre ti
                </p>
            </div>
            <label class="label" for="name">Nombre y Apellido</label>
            <input type="text" placeholder="Ingresa tu nombre" id="name">

            <label class="label" for="email">Correo Electrónico</label>
            <input type="email" placeholder="Ingresa tu Correo Electrónico" id="email">

            <button class="form-btn btn-warning" id="btn-1">Siguiente</button>`;
  console.log("si funciona");
  reinicio.innerHTML += texto;
}

var gotoNextForm = (prev, next, stepPrev, stepNext) => {
  var prevForm = prev.parentElement;
  var nextForm = next.parentElement;
  var nextStep = document.querySelector(`.paso--${stepNext}`);
  var prevStep = document.querySelector(`.paso--${stepPrev}`);



    nextForm.classList.add("form-active");
    nextForm.classList.add("form-active-animate");
    prevForm.classList.add("form-inactive");

  prevStep.classList.remove("paso-activo");
  nextStep.classList.add("paso-activo");

  setTimeout(() => {
    prevForm.classList.remove("form-active");
  }, 800);
};

var miTabla = document.querySelector("#tabla");
var instruction = document.querySelector("#instruc");

var forename = document.getElementById("name");
var email = document.getElementById("email");

var address = document.getElementById("validationDefault04");
var id = document.getElementById("id");
var birthdate = document.getElementById("birthdate");
var positive = document.querySelector("input[name=option1]:checked");
var taste = document.querySelector("input[name=option2]:checked");

function mostrar() {
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

  if (positive.value === "Si" || taste.value === "Si") {
    instruc1 = `<h1>
    Te deberías volver a casa</h1>
    `;
    instruction.innerHTML += instruc1;
  }
}
