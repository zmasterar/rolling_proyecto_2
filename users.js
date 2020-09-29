const loginApiUrl = "http://db.zmaster.com.ar:3003"
const usersContainer = document.getElementById("usersContainer")
const usersTableBody = document.getElementById("usersTableBody")
function checkUser(){
  let user=JSON.parse(localStorage.getItem("loginSession"))
  if(user){
    if(user.role=="admin"){
      usersContainer.style="block"
      getUsers()
    }else{
      document.write(`Esta página sólo puede ser accedida por un administrador <a href="index.html">Volver</a>`)
    }
  }else{
    document.write(`Debe estar logueado para entrar a esta página <a href="index.html">Volver</a>`)
  }
}

function getUsers(){
  let users
  fetch(loginApiUrl+"/users").then(
    response => response.json()
  ).then(
    data => users=data
  ).then(()=>{
    if(users){
      let usersHTML=""
      users.forEach((element) => {
        usersHTML += `
        <tr>
          <td scope="col">${element.id}</td>
          <td scope="col">${element.username}</td>
          <td scope="col">
            ${element.role}
            <button class="btn btn-sm btn-warning" onclick="toggleUserAdmin(${element.id})">Cambiar Rol</button>
          </td>
          <td scope="col">
            ${element.status}
            <button class="btn btn-sm btn-warning" onclick="toggleUserStatus(${element.id})">Cambiar estado</button>
          </td>
          <td scope="col">
            
            <button class="btn btn-sm btn-danger" onclick="deleteUser(${element.id})">Eliminar</button>
          </td>
        </tr>
        `;
      })

      usersTableBody.innerHTML=usersHTML
    }else{
      console.log("no hay users")
    }
  }
  )
}

function updateUser(userId, changes){
  fetch(loginApiUrl+"/users/"+userId, {
    method:"PATCH",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(changes) 
  }).then(
    response => response.json()
  )
}

function toggleUserStatus(userId){
  let user
  fetch(loginApiUrl+"/users/"+userId).then(
    response => response.json()
  ).then(
    data => {user=data}
  ).then(()=>{
  if(user&&user.status=="active"){
    updateUser(userId, {"status": "inactive"})
  }else{
    updateUser(userId, {"status": "active"})
  }})
}

function toggleUserAdmin(userId){
  let user
  fetch(loginApiUrl+"/users/"+userId).then(
    response => response.json()
  ).then(
    data => {user=data}
  ).then(()=>{
  if(user&&user.role=="admin"){
    updateUser(userId, {"role": "user"})
  }else{
    updateUser(userId, {"role": "admin"})
  }})
}

function deleteUser(userId){
  fetch(loginApiUrl+"/users/"+userId, {
    method:"DELETE"
  }).then(
    response => response.json()
  )
}

function createUser(event){
  event.preventDefault()
  let username=document.newUser.username.value
  let password=document.newUser.password.value
  let role=document.newUser.role.value
  let newUser={"username":username,"password":password,"role":role, "status": "active"}
  fetch(loginApiUrl+"/users", {
    method:"POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newUser) 
  }).then(
    response => response.json()
  )


}