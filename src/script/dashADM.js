class DashBoardAdmin{
  static token = window.localStorage.getItem("@Login:token")
  static headers = {"Content-Type": "application/json", Authorization: `Bearer ${this.token}`}

  static async setoresApi(){
    const setores = await fetch("http://localhost:6278/sectors", {
      headers: this.headers})
      .then(res => res.json())
      .then(res => {return res})
      
      return setores
  }

  static async criandoSetor(){
    const main = document.querySelector(".main")
    const h1 = document.createElement("h1")
    const ul = document.createElement("ul")

    h1.classList = "h1_setores"
    h1.innerText = "Setores"

    const buttonSetor = document.querySelector(".button_ul_setores")

    const setores = await this.setoresApi()

    buttonSetor.addEventListener("click", event=>{
      event.preventDefault()
      main.innerHTML = ""
      ul.innerHTML = ""
      setores.forEach(element => {
        const li = document.createElement("li")
        const h2 = document.createElement("h2")
        
        ul.classList = "ul_setores"
        li.classList = "li_setores"
        h2.classList = "h2_setores"
      
        h2.innerText = element.description
        
        li.appendChild(h2)
        ul.appendChild(li)
        main.append(h1, ul)
      });
    })
  }

  static async empresaApi(){
    const empresas = await fetch("http://localhost:6278/companies")
    .then(res => res.json())
    .then(res => res)

    return empresas
  }

  static async criandoPaginaEmpresas(){
    const main = document.querySelector(".main")
    const ul = document.createElement("ul")
    const h1 = document.createElement("h1")
    
    h1.classList = "h1_empresas"
    h1.innerText = "Empresas"

    const ul_buttons_empresa = document.createElement("ul")
    
    const criarEmpresa = document.createElement("li")
    const h2CriarEmpresa = document.createElement("h2")

    ul_buttons_empresa.classList = "ulButtons"
    criarEmpresa.classList = "cards_buttons"
    h2CriarEmpresa.innerText = "Criar empresa!"
    h2CriarEmpresa.classList = "criarEmpresa"
    
    criarEmpresa.addEventListener("click", event=>{
      event.preventDefault()
      this.modalCriarEmpresa()
    })
    
    criarEmpresa.appendChild(h2CriarEmpresa)
    ul_buttons_empresa.append(criarEmpresa)

    const buttonEmpresas = document.querySelector(".button_ul_empresas")
    
    const empresas = await this.empresaApi()

    buttonEmpresas.addEventListener("click", event=>{
      event.preventDefault()
      main.innerHTML=""
      ul.innerText=""
      empresas.forEach(element =>{
        const li = document.createElement("li") 
        const nomeEmpresa= document.createElement("h2")
        const descricao = document.createElement("p")
        const horarioAbrir = document.createElement("p")
        const setor = document.createElement("p")
        
        this.clickCardsEmpresas(li, element)
        
        nomeEmpresa.innerText = element.name
        descricao.innerText = element.description
        horarioAbrir.innerText = `Abre: ${element.opening_hours}`
        setor.innerText = `Setor: ${element.sectors.description}`
        
        ul.classList = "ul_empresas"
        li.classList = "cards_empresas"
        nomeEmpresa.classList = "nome_empresa"
        descricao.classList = "descricao_empresa"
        horarioAbrir.classList = "horarioAbrir_empresa"
        setor.classList = "setor_empresa"
  
        li.append(nomeEmpresa, descricao, setor,  horarioAbrir)
        ul.appendChild(li)
        main.append(h1, ul_buttons_empresa, ul)
      })
    })    
    
  }

  static async cadastrarEmpresaApi(body){
  const user = await fetch('http://localhost:6278/companies', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`},
    body: JSON.stringify(body)})
    .then(res => {return res.json();})
    .then(res => res)

    return user;
  }

  static async setoresApi(){
  const data = await fetch('http://localhost:6278/sectors', {
      "headers": {Authorization: `Bearer ${this.token}`}})
      .then(resp => resp.json())
      .then(resp => resp)
      .catch(err => err);

      return data;
  }

  static async modalCriarEmpresa(){
    const main = document.querySelector(".main")
    const divModal = document.createElement("div")
    const divFade = document.createElement("div")
    
    const cabecalhoModal = document.createElement("div")
    const h1CriarEmpresa = document.createElement("h1")
    const buttonClose = document.createElement("button")
    
    const bodyModal = document.createElement("div")
    const h2Nome = document.createElement("h2")
    const inputNome = document.createElement("input")
    const h2Horario = document.createElement("h2")
    const inputHorario = document.createElement("input")
    const h2Descricao = document.createElement("h2")
    const inputDescricao = document.createElement("input")
    const h2Setor = document.createElement("label")
    const inputSetor = document.createElement("select")
    const divButtonCadastrar = document.createElement("div")
    const buttonCadastrarEmpresa = document.createElement("button")

    buttonClose.addEventListener("click", event=>{
      event.preventDefault()
      divModal.remove()
      divFade.remove()
    })
    buttonCadastrarEmpresa.addEventListener("click", event=>{
      event.preventDefault()
      const empresa = {
        name: inputNome.value,
        opening_hours: inputHorario.value,
        description: inputDescricao.value,
        sector_uuid: inputSetor.value
      }
      this.cadastrarEmpresaApi(empresa)
      window.location.reload()
      divModal.remove()
      divFade.remove()
    })

    h2Setor.for = "contract"
    h2Setor.innerText = "Setor"
    inputSetor.name = "contract"
    inputSetor.id = "contract"
    inputSetor.required = true
    divModal.classList = "modal"
    divFade.classList = "fade"
    cabecalhoModal.classList = "cabecalho"
    h1CriarEmpresa.classList= "h1CriarEmpresa"
    buttonClose.classList = "closet"
    bodyModal.classList = "bodyModal"
    h2Nome.classList = "h2Nome"
    inputNome.classList = "inputNome"
    h2Horario.classList = "h2Horario"
    inputHorario.classList = "inputHorario"
    h2Descricao.classList = "h2Descricao"
    inputDescricao.classList = "inputDescricao"
    h2Setor.classList = "h2Setor"
    inputSetor.classList = "inputSetor"
    divButtonCadastrar.classList = "divButtonCadastrar"
    buttonCadastrarEmpresa.classList = "buttonCadastrar"

    inputNome.placeholder = "Digite o nome da empresa"
    inputHorario.placeholder = "Digite o horário de abertura da empresa"
    inputDescricao.placeholder = "Digite a descrição da empresa"

    h1CriarEmpresa.innerText = "Criar Empresa"
    buttonClose.innerText = "voltar"
    h2Nome.innerText = "Nome da Empresa"
    h2Horario.innerText = "Horário de abrir"
    h2Descricao.innerText = "Descrição"
    buttonCadastrarEmpresa.innerText="Cadastrar empresa"

    const sectors = await this.setoresApi();

    sectors.forEach(element => {
        const option = document.createElement("option");
        option.value     = element.uuid;
        option.innerHTML = element.description;
        inputSetor.appendChild(option);
    })
    divButtonCadastrar.appendChild(buttonCadastrarEmpresa)
    bodyModal.append(h2Nome, inputNome, h2Horario, inputHorario, h2Descricao, inputDescricao, h2Setor, inputSetor, divButtonCadastrar)
    cabecalhoModal.append(h1CriarEmpresa, buttonClose)
    divModal.append(cabecalhoModal, bodyModal)
    main.append(divFade, divModal)
  }

  static clickCardsEmpresas(li, element){
    li.addEventListener("click", event =>{
      event.preventDefault()
      this.modalLi(element)
    })
  }

  static async modalLi(element){
    const main = document.querySelector(".main")
    const divModal = document.createElement("div")
    const modal = document.createElement("div")
    const fade = document.createElement("div")
    const nomeEmpresa = document.createElement("h1")

    nomeEmpresa.innerText = element.name
    nomeEmpresa.classList = "nomeEmpresa"

    fade.addEventListener("click", event=>{
      event.preventDefault()
      if(event.target === fade){
        divModal.remove(fade, modal)
      }
    })
    
    divModal.classList = "divModal"
    modal.classList = "modal_empresas"
    fade.classList = "fade_empresas"
    
    const buttonDepartamentos = document.createElement("button")
    const buttonCriarDepartamentos = document.createElement("button")

    buttonDepartamentos.addEventListener("click", event=>{
      event.preventDefault()
      divModal.innerHTML = "" 
      this.departamentoModal(element.uuid)
    })
    buttonCriarDepartamentos.addEventListener("click", event =>{
      event.preventDefault()
      divModal.innerHTML = ""
      this.criarModalDepartamento(element.uuid)
    })

    buttonDepartamentos.innerText = "Departamentos"
    buttonCriarDepartamentos.innerText = "Criar departamento"

    buttonDepartamentos.classList = "modal_empresas_button_departamentos"
    buttonCriarDepartamentos.classList = "modal_empresas_button_criarDepartamentos"

    main.appendChild(divModal)
    divModal.append(fade, modal)
    modal.append(nomeEmpresa, buttonDepartamentos, buttonCriarDepartamentos)
    
  }

  static clickSair(){
    const buttonSair = document.querySelector(".button_sair")
    buttonSair.addEventListener("click", event=>{
      event.preventDefault()
      window.location.replace("/index.html")
    })
  }

  static async listarTodosUsersApi(){
    const users = await fetch("http://localhost:6278/users", {
    method: "GET",
    headers: this.headers})
    .then(res => res.json())
    .then(res => {return res})

    return users
  }

  static async usersSemDepartamentoApi(){
    const usersSemDepartamento = await fetch("http://localhost:6278/admin/out_of_work", {
    method: "GET",
    headers: this.headers})
    .then(response => console.log(response))
    .catch(err => console.error(err));
  
    return usersSemDepartamento
  }

  static async listarTodosDepartamentosApi(uuid){
    const departaments = await fetch(`http://localhost:6278/departments/${uuid}`, {
      method: "GET",
      headers: this.headers})
      .then(res => res.json())
      .then(res => {return res})
      
      return departaments
  }

  static async departamentoModal(uuid){
    const divModal = document.querySelector(".divModal")
    const modal = document.createElement("div")
    const fade =  document.createElement("div")
    const labelFuncionario = document.createElement("label")
    const selectFuncuinario = document.createElement("select")
    const buttonDepartamento = document.createElement("button")

    modal.classList = "modal_funcionario"
    fade.classList = "fade_funcionario"

    buttonDepartamento.innerText = "Ver departamento"
    buttonDepartamento.classList = "button_departamento"
    labelFuncionario.for = "contract"
    labelFuncionario.innerText = "Departamentos"
    selectFuncuinario.name = "contract"
    selectFuncuinario.id = "contract"
    selectFuncuinario.required = true

    const departamentos = await this.listarTodosDepartamentosApi(uuid);

    if(departamentos.length === 0){
      const nenhumDepartamento = document.createElement("option")
      nenhumDepartamento.innerHTML = "Nenhum departamento encontrado"
      selectFuncuinario.appendChild(nenhumDepartamento);
      buttonDepartamento.disabled = true
    }else{
      departamentos.forEach(element => {
        const option = document.createElement("option");
        option.value     = element.uuid;
        option.innerHTML = element.description;
        selectFuncuinario.appendChild(option);
    })
    }

    fade.addEventListener("click", event=>{
      event.preventDefault()
      if(event.target === fade){
        divModal.remove(fade, modal)
      }
    })
  
    modal.append(labelFuncionario, selectFuncuinario, buttonDepartamento)
    divModal.append(modal, fade)
  }

  static async criarModalDepartamento(uuid){
    const divModal = document.querySelector(".divModal")
    const h1CriarDepartamento = document.createElement("h1")
    const modal = document.createElement("div")
    const fade =  document.createElement("div")
    const h2Nome = document.createElement("h2")
    const inputNome = document.createElement("input")
    const h2Descricao = document.createElement("h2")
    const inputDescricao = document.createElement("input")
    const buttonCriarDepartamento = document.createElement("button")

    h2Nome.innerText = "Nome"
    inputNome.placeholder = "Digite o nome do departamento"
    h2Descricao.innerText = "Descrição"
    inputDescricao.placeholder = "Digite a descrição do departamento"
    buttonCriarDepartamento.innerText = "criar"
    buttonCriarDepartamento.classList = "buttonCriarDepartamento"

    h1CriarDepartamento.classList = "criarDepartamento"
    h1CriarDepartamento.innerText = "Criar departamento"
    h2Nome.classList = "h2Nome"
    inputNome.classList = "inputNome"
    inputNome.required = true
    h2Descricao.classList = "h2Descricao"
    inputDescricao.classList = "inputDescricao"
    inputDescricao.required = true
    modal.classList = "modal_departamento"
    fade.classList = "fade_departamento"

    fade.addEventListener("click", event=>{
      event.preventDefault()
      if(event.target === fade){
        divModal.remove(fade, modal)
      }
    })

    modal.append(h1CriarDepartamento, h2Nome, inputNome, h2Descricao, inputDescricao, buttonCriarDepartamento)
    divModal.append(modal, fade)
    
    const criarDepartamento = {
      name: inputNome.value,
      description: inputDescricao.value,
      company_uuid: uuid
    }

    // this.criarDepartamentoApi(criarDepartamento)
    

  }

  static async criarDepartamentoApi(body){
    const criandoDepartamento = await fetch("http://localhost:6278/departments", {
    method: "POST",
    headers: this.headers,
    body: JSON.stringify(body)})
    .then(res => res.json())
    .then(res => {return res})

    return criandoDepartamento
  }
}

DashBoardAdmin.setoresApi()
DashBoardAdmin.criandoSetor()
DashBoardAdmin.criandoPaginaEmpresas()
DashBoardAdmin.clickSair()

