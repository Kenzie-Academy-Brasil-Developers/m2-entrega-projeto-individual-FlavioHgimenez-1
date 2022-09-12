export class HomePage{

  static clickLogin(){
    const buttonLogin = document.querySelector(".header_button_login")
    buttonLogin.addEventListener("click", event=>{
      event.preventDefault()
      window.location.replace("./src/pages/login.html")
    })
  }
  static clickCadastro(){
    const buttonCadastro = document.querySelector(".header_button_cadastro")
    buttonCadastro.addEventListener("click", event=>{
      event.preventDefault()
      window.location.replace("./src/pages/cadastro.html")
    })
  }

  static async getEmpresas(){
    const empresas = await fetch("http://localhost:6278/companies")
    .then(res => res.json())
    .then(res => res)

    return empresas
  }

  static async listarEmpresas(){
    const ulAlimento = document.querySelector(".ul_alimento")
    const ulAutomotiva = document.querySelector(".ul_automotiva")
    const ulTi = document.querySelector(".ul_ti")
    
    const data = await this.getEmpresas()

    data.forEach(element => {
      const li = document.createElement("li")
      const divNome = document.createElement("div")
      const pNome = document.createElement("div")
      const nomeEmpresa = document.createElement("div")
      const divSetor = document.createElement("div")
      const pSetor = document.createElement("div")
      const setorEmpresa = document.createElement("div")
      const divDescricao = document.createElement("div")
      const pDescricao = document.createElement("div")
      const descricaoEmpresa = document.createElement("div")
      const divHorario = document.createElement("div")
      const pHorario = document.createElement("div")
      const horarioEmpresa = document.createElement("div")

      pNome.innerText = "nome:"
      nomeEmpresa.innerText = element.name
      pSetor.innerText = "setor:"
      setorEmpresa.innerText = element.sectors.description
      pDescricao.innerText = "descrição:"
      descricaoEmpresa.innerText = element.description
      pHorario.innerText = "Abre:"
      horarioEmpresa.innerText = element.opening_hours

      li.classList = "card_empresa"
      divNome.classList = "flex"
      pNome.classList = "campos"
      nomeEmpresa.classList = "nomeEmpresa"
      divSetor.classList = "flex"
      pSetor.classList = "campos"
      setorEmpresa.classList = "setorEmpresa"
      divDescricao.classList = "flex"
      pDescricao.classList = "campos"
      descricaoEmpresa.classList = "descricaoEmpresa"
      divHorario.classList = "flex"
      pHorario.classList = "campos"
      horarioEmpresa.classList = "horarioAbrirEmpresa"
    
      li.append(divNome, divSetor, divDescricao, divHorario)
      divNome.append(pNome, nomeEmpresa)
      divSetor.append(pSetor, setorEmpresa)
      divDescricao.append(pDescricao, descricaoEmpresa)
      divHorario.append(pHorario, horarioEmpresa)

      if(element.sectors.description === "Alimenticio"){
        ulAlimento.appendChild(li)
      }else if(element.sectors.description === "Automotiva"){
        ulAutomotiva.appendChild(li)
      }else if(element.sectors.description === "TI"){
        ulTi.appendChild(li)
      }
    });
   
  }
}
HomePage.clickCadastro()
HomePage.clickLogin()
HomePage.listarEmpresas()