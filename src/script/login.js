class Login{
  static headers = {"Content-Type" : "application/json"}
  static clickHome(){
    const buttonHome = document.querySelector(".header_button_home")
    buttonHome.addEventListener("click", event =>{
      event.preventDefault()
      window.location.replace("/index.html")
    })
  }
  static clickCadastro(){
    const buttonCadastro = document.querySelector(".header_button_cadastro")
    buttonCadastro.addEventListener("click", event=>{
      event.preventDefault()
      window.location.replace("/src/pages/cadastro.html")
    })
  }
  static async errorEmail(){
    const errorEmail = document.querySelector(".error_mensagem_email")
    const imgError = document.querySelector(".img_error_email")

    errorEmail.style.display = "block"
    imgError.style.display = "block"
  }
  static async errorSenha(){
    const errorSenha = document.querySelector(".error_mensagem_senha")
    const imgError = document.querySelector(".img_error_senha")

    errorSenha.style.display = "block"
    imgError.style.display = "block"
  }
  static async enviarLoginApi(body){
    const user = await fetch("http://localhost:6278/auth/login", {
      method:"POST",
      headers: this.headers,
      body: JSON.stringify(body)})
      .then(res => res.json())
      .then(res => {
        localStorage.setItem("@Login:userId", res.uuid);
        localStorage.setItem("@Login:token", res.token);
        if(res.is_admin == true){
          window.location.replace("./dashADM.html")
        }if(res.is_admin == false){
          window.location.replace("./dashboard.html")
        }
        return res
      })


      
      if(user.error === 'email invalid!'){
        const errorEmail = document.querySelector(".error_mensagem_email")
        const imgError = document.querySelector(".img_error_email")

        errorEmail.innerHTML = "Email inválido"

        errorEmail.style.display = "block"
        imgError.style.display = "block" 
      }
      if(user.error === "password invalid!"){
        const errorEmail = document.querySelector(".error_mensagem_senha")
        const imgError = document.querySelector(".img_error_senha")

        errorEmail.innerHTML = "Senha inválida"

        errorEmail.style.display = "block"
        imgError.style.display = "block" 
      }

      return user
  }
  static async logar(){
    const inputEmail = document.querySelector(".input_email")
    const inputSenha = document.querySelector(".input_senha")
    const buttonEntrar = document.querySelector(".button_entrar")
    
    buttonEntrar.addEventListener("click", event=>{
      event.preventDefault()
      const user = {
          email: inputEmail.value,
          password: inputSenha.value
      }
      
      if(user.email == ""){
        this.errorEmail()
      }
      if(user.password == ""){
        this.errorSenha()
      }
        this.enviarLoginApi(user)
    })
  }
}
Login.clickHome()
Login.clickCadastro()
Login.logar()