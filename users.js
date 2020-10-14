const usersContainer = document.getElementById("usersContainer");
const usersTableBody = document.getElementById("usersTableBody");
function checkUser() {
  let user = JSON.parse(localStorage.getItem("loginSession"));
  if (user) {
    if (user.role == "admin") {
      usersContainer.style = "block";
      isLogged();
      getUsers();
    } else {
      document.write(
        `Esta página sólo puede ser accedida por un administrador <a href="index.html">Volver</a>`
      );
    }
  } else {
    document.write(
      `Debe estar logueado para entrar a esta página <a href="index.html">Volver</a>`
    );
  }
}
async function getUsers() {
  let users = await fetch(loginApiUrl + "/users").then((response) =>
    response.json()
  );
  if (users) {
    let usersHTML = "";
    users.forEach((element) => {
      usersHTML += `
      <tr>
        <td scope="col">${element.id}</td>
        <td scope="col">${element.username}</td>
        <td scope="col">
          ${element.role}
          </td>
        <td scope="col">
          <button class="btn btn-sm btn-warning" onclick="toggleUserAdmin(${element.id})">Cambiar Rol</button>
        </td>
        <td scope="col">
          ${element.status}
        </td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="toggleUserStatus(${element.id})">Cambiar estado</button>
        </td>
        <td scope="col">
          <button class="btn btn-sm btn-danger" onclick="deleteUser(${element.id})">Eliminar</button>
        </td>
      </tr>
      `;
    });
    usersTableBody.innerHTML = usersHTML;
  } else {
    console.log("no hay users");
  }
}
function updateUser(userId, changes) {
  return fetch(loginApiUrl + "/users/" + userId, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });
}
async function toggleUserStatus(userId) {
  const user = await fetch(loginApiUrl + "/users/" + userId).then((response) =>
    response.json()
  );
  if (user && user.status == "active") {
    await updateUser(userId, { status: "inactive" });
  } else {
    await updateUser(userId, { status: "active" });
  }
  getUsers();
}
async function toggleUserAdmin(userId) {
  const user = await fetch(loginApiUrl + "/users/" + userId).then((response) =>
    response.json()
  );
  if (user && user.role == "admin") {
    await updateUser(userId, { role: "user" });
  } else {
    await updateUser(userId, { role: "admin" });
  }
  getUsers();
}
async function deleteUser(userId) {
  await fetch(loginApiUrl + "/users/" + userId, {
    method: "DELETE",
  });
  getUsers();
}
async function createUser(event) {
  event.preventDefault();
  let username = document.newUser.username.value;
  let password = document.newUser.password.value;
  let role = document.newUser.role.value;
  if (username != "" && password != "" && role != "") {
    const newUser = await isUserValid({
      username: username,
      password: password,
      role: role,
      status: "active",
    });
    if (newUser) {
      await fetch(loginApiUrl + "/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      getUsers();
      clearForm();
    } else {
      console.log("error");
    }
  }
}
function clearForm() {
  document.newUser.username.value = "";
  document.newUser.password.value = "";
  document.newUser.role.value = "";
}
async function isUserValid(user) {
  //Busco un user con el mismo nombre de usuario
  const usersFound = await fetch(
    loginApiUrl + "/users?username=" + user.username
  ).then((response) => response.json());
  //Creo la expresión regular que matchea: Al menos 1 minúscula,
  //al menos 1 mayúscula, al menos 1 número y al menos 8 letras
  let re = new RegExp("^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}$");
  let password = user.password;
  const isPasswordValid = password.match(re);
  //Si no se encontraron usuarios con mismo nombre y cumple las condiciones de la clave, devuelve el usuario
  if (usersFound == 0 && isPasswordValid) {
    return user;
  } else {
    return false;
  }
}
