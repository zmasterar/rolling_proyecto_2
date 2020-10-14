const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const logout = document.getElementById("logout");
const loginApiUrl = "http://db.zmaster.com.ar:3003";

function _login(event) {
  event.preventDefault();
  let user;
  fetch(loginApiUrl + "/users?username=" + username.value)
    .then((response) => response.json())
    .then((data) => (user = data[0]))
    .then(() => {
      if (user) {
        if (user.password == password.value) {
          localStorage.setItem("loginSession", JSON.stringify(user));
          loginForm.style.display = "none";
          logout.style.display = "flex";
          username.value = "";
          password.value = "";
          username.classList.remove("is-invalid");
          password.classList.remove("is-invalid");
          logout.innerHTML = logoutHTML(user);
        } else {
          username.classList.add("is-invalid");
          password.classList.add("is-invalid");
        }
      } else {
        username.classList.add("is-invalid");
        password.classList.add("is-invalid");
      }
    });
}

function _logout(event) {
  event.preventDefault();
  loginForm.style.display = "block";
  logout.style.display = "none";
  localStorage.removeItem("loginSession");
  window.location.href = "index.html";
}

function isLogged() {
  let user = JSON.parse(localStorage.getItem("loginSession"));
  if (user) {
    logout.style.display = "flex";

    logout.innerHTML = logoutHTML(user);
  } else {
    loginForm.style.display = "block";
  }
}

function logoutHTML(user) {
  let logoutHTML = "";
  if (user.role == "admin") {
    logoutHTML += `
    <li class="nav-item active">
      <a href="users.html" class="nav-link">Administrar Usuarios</a>
    </li>`;
  }
  logoutHTML += `
      <li class="nav-item">
        <a class="btn btn-outline-primary mr-2" href="profile.html">Mi Perfil</a>
      </li>
      <li class="nav-item">
        <a href="#" class="btn btn-outline-danger" onclick="_logout(event)">Salir</a></p>
      </li>`;
  return logoutHTML;
}

async function signUp(event) {
  let signUpForm = document.signUpForm;
  let usernameInput = signUpForm.usernameInput;
  let passwordInput = signUpForm.passwordInput;
  let passwordConfirmation = signUpForm.passwordConfirmation;
  let passwordError = document.getElementById("passwordError");
  let userError = document.getElementById("userError");
  event.preventDefault();
  let newUser = {
    username: usernameInput.value,
    password: passwordInput.value,
    passwordConfirmation: passwordConfirmation.value,
  };
  if (newUser.password != newUser.passwordConfirmation) {
    passwordError.innerHTML = "Las contraseñas no coinciden";
    console.error(new Error("Las contraseñas no coinciden"));
    passwordInput.classList.add("is-invalid");
    passwordConfirmation.classList.add("is-invalid");
    return;
  }
  let fetchUser = await fetch(
    `${loginApiUrl}/users?username=${newUser.username}`
  );
  let userFetched = await fetchUser.json();

  user = userFetched[0];
  if (user) {
    console.error(new Error("El usuario ya existe"));
    usernameInput.classList.add("is-invalid");
    userError.innerHTML = "El usuario ya existe";
    return;
  }
  usernameInput.classList.remove("is-invalid");
  passwordInput.classList.remove("is-invalid");
  passwordConfirmation.classList.remove("is-invalid");

  let postUser = await fetch(loginApiUrl + "/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: newUser.username,
      password: newUser.password,
      role: "user",
      status: "active",
    }),
  });
  let userPosted = await postUser.json();
  console.log(userPosted);

  if (userPosted) {
    alert("Se ha registrado correctamente");
    localStorage.setItem("loginSession", JSON.stringify(userPosted));
    window.location.href = "index.html";
  } else {
    alert("Hubo un error. Intente nuevamente");
  }
}
