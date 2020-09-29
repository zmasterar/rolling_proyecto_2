const loginForm = document.getElementById("loginForm")
const username = document.getElementById("username")
const password = document.getElementById("password")
const logout = document.getElementById("logout")
const loginApiUrl = "http://db.zmaster.com.ar:3003"

function _login(event){
  event.preventDefault()
  let user
  fetch(loginApiUrl+"/users?username="+username.value).then(
    response => response.json()
  ).then(
    data => user = data[0]
  ).then(()=>{
    if(user){
      if(user.password==password.value){
        localStorage.setItem("loginSession",JSON.stringify(user))
        loginForm.style.display="none"
        logout.style.display="flex"
        username.value=""
        password.value=""
        username.classList.remove("is-invalid")
        password.classList.remove("is-invalid")
        logout.innerHTML=logoutHTML(user)
      }else{
        username.classList.add("is-invalid")
        password.classList.add("is-invalid")
      }
    }else{
      username.classList.add("is-invalid")
      password.classList.add("is-invalid")
    }
  })
}

function _logout(event){
  event.preventDefault()
  loginForm.style.display="block"
  logout.style.display="none"
  localStorage.removeItem("loginSession")
}

function isLogged(){
  let user=JSON.parse(localStorage.getItem("loginSession"))
  if(user){
    logout.style.display="flex"
    
      logout.innerHTML = logoutHTML(user)
  }else{
    loginForm.style.display="block"
  }
}

function logoutHTML(user){
  let logoutHTML=""
  if(user.role=="admin"){
    logoutHTML+=`
    <li class="nav-item active">
      <a href="users.html" class="nav-link">Administrar Usuarios</a>
    </li>`
  }
  logoutHTML+=`
      <li class="nav-item">
        <a class="btn btn-outline-primary mr-2" href="profile.html">Mi Perfil</a>
      </li>
      <li class="nav-item">
        <a href="#" class="btn btn-outline-danger" onclick="_logout(event)">Salir</a></p>
      </li>`
    return logoutHTML
}