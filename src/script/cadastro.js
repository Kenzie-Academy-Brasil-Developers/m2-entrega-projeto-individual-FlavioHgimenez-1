class Cadastro{
static headers = {"Content-Type" : "application/json"}

  static clickHome(){
    const buttonHome = document.querySelector(".header_button_home")
    buttonHome.addEventListener("click", event=>{
      event.preventDefault()
      window.location.replace("/index.html")
    })
  }
  static clickLogin(){
    const buttonLogin = document.querySelector(".header_button_cadastro")
    buttonLogin.addEventListener("click", event =>{
      event.preventDefault()
      window.location.replace("/src/pages/login.html")
    })
  }
  static async errorSenha(){
    const errorSenha = document.querySelector(".error_mensagem_senha")
    const imgError = document.querySelector(".img_error_senha")

    errorSenha.style.display = "block"
    imgError.style.display = "block"
  }
  static async errorEmail(){
    const errorEmail = document.querySelector(".error_mensagem_email")
    const imgError = document.querySelector(".img_error_email")

    errorEmail.style.display = "block"
    imgError.style.display = "block"
  }
  static async errorNome(){
    const errorNome = document.querySelector(".error_mensagem_nome")
    const imgError = document.querySelector(".img_error_nome")
    
    errorNome.style.display = "block"
    imgError.style.display = "block"
  }
  static async errorNivelProfissional(){
    const errorNivelProfissional = document.querySelector(".error_mensagem_nivelProfissional")
    const imgError = document.querySelector(".img_error_nivelProfissional")

    errorNivelProfissional.style.display = "block"
    imgError.style.display = "block"
  }
  static async errorNivelProfissional1(){
    const errorNivelProfissional = document.querySelector(".error_mensagem_nivelProfissional")
    const imgError = document.querySelector(".img_error_nivelProfissional")

    errorNivelProfissional.style.display = "none"
    imgError.style.display = "none"
  }
  static async enviarCadastroApi(body){
    const cadastro = await fetch("http://localhost:6278/auth/register/user",{
      method:"POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(body)})
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp.error)
        if(resp.error === undefined){
          window.location.replace("/src/pages/login.html")
        }
      })
      return cadastro
  } 
  static async cadastroUser(){
    const inputNome  = document.querySelector(".input_nome")
    const inputEmail = document.querySelector(".input_email")
    const inputSenha = document.querySelector(".input_senha")
    const buttonCadastrar = document.querySelector(".button_entrar")
    
    
    buttonCadastrar.addEventListener("click", event =>{
      event.preventDefault()

      let select = document.querySelector("input[name='nivel']:checked")
      if(inputNome.value == ""){
        this.errorNome()
      }if(inputEmail.value == ""){
        this.errorEmail()
      }if(inputSenha.value == ""){
        this.errorSenha()
      }if(select == null){
        return this.errorNivelProfissional()
      }
      const dadosUsuario = {
        password: inputSenha.value,
        email: inputEmail.value,
        professional_level: select.value,
        username: inputNome.value,
      }
      this.enviarCadastroApi(dadosUsuario)
    })
  }
}
Cadastro.clickLogin() 
Cadastro.clickHome()
Cadastro.cadastroUser()