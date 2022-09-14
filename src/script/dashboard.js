class DashBoard{
  static token = window.localStorage.getItem("@Login:token")
  static headers = {"Content-Type": "application/json", Authorization: `Bearer ${this.token}`}

  static async infoUser(){
    const userLogado = await fetch("http://localhost:6278/users/profile",{
          headers: this.headers})
          .then(res => res.json())
          .then(res => {return res})

     return userLogado
  }

  static async nomeUser(){
    const nomeUser                 = document.querySelector(".nome_usuario")
    const userLogado               = await this.infoUser()
    nomeUser.innerHTML             = userLogado.username 
    const nivelProfissional        = document.querySelector(".nivel_profissional")
    nivelProfissional.innerText    = userLogado.professional_level
  }

  static async statusEmprego(){
    const user           = await this.infoUser()
    const status         = document.querySelector(".statusMain")
    const Divstatus      = document.querySelector(".statusEmpregabilidade")


    if(user.kind_of_work== null){
          status.style.display = "block"
          status.innerText = "Você não tem contrato com nenhuma empresa."
    }else{
          Divstatus.style.display = "none"
    }
  }

  static clickSair(){
    const buttonSair = document.querySelector(".button_logout")
     
    buttonSair.addEventListener("click", event=>{

          event.preventDefault()
    
          window.location.replace("/index.html")      

    })
  }

  static async modalEditar(){

        const modalContainer             = document.querySelector("#modalEditar")
        const divFade                    = document.createElement('div')
        const divModal                   = document.createElement('div')
        const divHeader                  = document.createElement('div')
        const h2Editar                   = document.createElement('h2')
        const buttonFecharModal          = document.createElement('button')
        const divBody                    = document.createElement('div')
        const h2Nome                     = document.createElement('h2')
        const inputNome                  = document.createElement("input")
        const h2Email                    = document.createElement('h2')
        const inputEmail                 = document.createElement("input")
        const h2Senha                    = document.createElement('h2')
        const inputSenha                 = document.createElement("input")
        const divButtonCadastrar         = document.createElement('div')
        const buttonEditar               = document.createElement('button')
    
        divFade.id                      = 'fade' 
        divModal.id                     = 'modal'
        divModal.classList              = 'modal_control'
        divHeader.id                    = 'header_modal'
        h2Editar.innerText              = 'Editar Conta'
        buttonFecharModal.id            = 'close_modal'
        buttonFecharModal.innerText     = 'X'
        divBody.id                      = 'body_modal'    
        h2Nome.innerText                = "Nome"
        h2Nome.classList                = "descricoes"
        inputNome.placeholder           = "Digite seu nome"
        inputNome.classList             = "input_descricoes"
        inputNome.classList.add("userName")
        h2Email.innerText               = "Email"
        h2Email.classList               = "descricoes"
        inputEmail.placeholder          = "Digite seu email"
        inputEmail.classList            = "input_descricoes"
        inputEmail.classList.add("userEmail")
        h2Senha.innerText               = "Senha"
        h2Senha.classList               = "descricoes"
        inputSenha.placeholder          = "Digite sua senha"
        inputSenha.type                 = "password"
        inputSenha.classList            = "input_descricoes"
        inputSenha.classList.add("userPassword")
        divButtonCadastrar.id           = "button_editar_div"
        buttonEditar.id                 = 'button_editar'
        buttonEditar.innerText          = 'Editar'
        
        divModal.append(divHeader, divBody, divButtonCadastrar)
        divHeader.append(h2Editar, buttonFecharModal)
        divBody.append(h2Nome, inputNome, h2Email, inputEmail, h2Senha, inputSenha)
        divButtonCadastrar.appendChild(buttonEditar)
        modalContainer.append(divFade, divModal)
        
        buttonEditar.addEventListener("click", event=>{

          event.preventDefault()

          const userEdit = {
               username: inputNome.value,
               email: inputEmail.value,
               password: inputSenha.value
          }
          
          this.envairEdicaoApi(userEdit)
          
        })

        buttonFecharModal.addEventListener("click", (event)=>{
         
          event.preventDefault()
          
          modalContainer.removeChild(divFade)
          modalContainer.removeChild(divModal)

        })
        
        
  }

  static async envairEdicaoApi(body){
    const editUser = await fetch("http://localhost:6278/users", {
          method: "PATCH",
          headers: {"Content-Type": "application/json", Authorization: `Bearer ${this.token}`},
          body:JSON.stringify(body)})
          .then(res => res.json())
          .then(res => console.log(res))
          window.location.reload()
          window.alert("Edição feita com sucesso!")
     
     return editUser
  }

  static async clickEditar(){

    const buttonEditarHome = document.querySelector(".button_editar")
    
    buttonEditarHome.addEventListener("click", (event) => { 

           event.preventDefault()

           this.modalEditar()

    })
  }

  static async departamentoUserLogado(){
     const departamentoUserLogado = await fetch("http://localhost:6278/users/departments", {
          method: "GET",
          headers: {Authorization: `Bearer ${this.token}`}})
          .then(response => {return response})
     
     return departamentoUserLogado
  }

  static async usersDepartamento(){
     const usersDepartamentos = await fetch("http://localhost:6278/users/departments/coworkers", {
          method: "GET",
          headers: {Authorization: `Bearer ${this.token}`}})
          .then(response => console.log(response))
          
     return usersDepartamentos
  }

  static async empresaUser(){

     const userLogado         = await this.infoUser() 

     const usersDepartamento  = await this.usersDepartamento()

     const departamentoUser   = await this.departamentoUserLogado()
     
  }


}
DashBoard.nomeUser()
DashBoard.clickSair()
DashBoard.clickEditar()
DashBoard.statusEmprego()
DashBoard.empresaUser()