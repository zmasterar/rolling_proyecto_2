const usernameTitle = document.getElementById("usernameTitle");
const currentPassword = document.getElementById("currentPassword");
const newPassword = document.getElementById("newPassword");
const newPasswordConfirmation = document.getElementById(
  "newPasswordConfirmation"
);
let user = JSON.parse(localStorage.getItem("loginSession"));

function checkUser() {
  if (user) {
    usernameTitle.innerHTML = user.username;
    isLogged();
  } else {
    document.write(
      `Debe estar logueado para entrar a esta página <a href="index.html">Volver</a>`
    );
  }
}

function changePassword(event) {
  event.preventDefault();
  if (
    currentPassword.value != "" &&
    newPassword.value != "" &&
    newPasswordConfirmation.value != "" &&
    newPassword.value == newPasswordConfirmation.value &&
    currentPassword.value == user.password
  ) {
    user.password = newPassword.value;
    fetch(loginApiUrl + "/users/" + user.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPassword.value }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        currentPassword.value = "";
        newPassword.value = "";
        newPasswordConfirmation.value = "";
        localStorage.setItem("loginSession", JSON.stringify(user));
      });
  }
}
