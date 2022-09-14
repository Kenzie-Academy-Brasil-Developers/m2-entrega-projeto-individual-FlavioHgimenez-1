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
     const main          = document.querySelector(".main")
     const h1            = document.createElement("h1")
     const ul            = document.createElement("ul")

     h1.classList        = "h1_setores"
     h1.innerText        = "Setores"

     const buttonSetor = document.querySelector(".button_ul_setores")

     const setores = await this.setoresApi()

     buttonSetor.addEventListener("click", event=>{

          event.preventDefault()

          main.innerHTML = ""

          ul.innerHTML = ""
          
          setores.forEach(element => {
               const li       = document.createElement("li")
               const h2       = document.createElement("h2")
               
               ul.classList        = "ul_setores"
               li.classList        = "li_setores"
               h2.classList        = "h2_setores"
               h2.innerText        = element.description
               
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
     const main               = document.querySelector(".main")
     const ul                 = document.createElement("ul")
     const h1                 = document.createElement("h1")
     
     h1.classList             = "h1_empresas"
     h1.innerText             = "Empresas"

     const ul_buttons_empresa = document.createElement("ul")
     
     const criarEmpresa       = document.createElement("li")
     const h2CriarEmpresa     = document.createElement("h2")
    

     ul_buttons_empresa.classList       = "ulButtons"
     criarEmpresa.classList             = "cards_buttons"
     h2CriarEmpresa.innerText           = "Criar empresa!"
     h2CriarEmpresa.classList           = "criarEmpresa" 


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
               const li                      = document.createElement("li") 
               const nomeEmpresa             = document.createElement("h2")
               const descricao               = document.createElement("p")
               const horarioAbrir            = document.createElement("p")
               const setor                   = document.createElement("p")
               
               this.clickCardsEmpresas(li, element)
          
               nomeEmpresa.innerText         = element.name
               descricao.innerText           = element.description
               horarioAbrir.innerText        = `Abre: ${element.opening_hours}`
               setor.innerText               = `Setor: ${element.sectors.description}`
          
               ul.classList                  = "ul_empresas"
               li.classList                  = "cards_empresas"
               nomeEmpresa.classList         = "nome_empresa"
               descricao.classList           = "descricao_empresa"
               horarioAbrir.classList        = "horarioAbrir_empresa"
               setor.classList               = "setor_empresa"
          
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
     const main                         = document.querySelector(".main")
     const divModal                     = document.createElement("div")
     const divFade                      = document.createElement("div")
     
     const cabecalhoModal               = document.createElement("div")
     const h1CriarEmpresa               = document.createElement("h1")
     const buttonClose                  = document.createElement("button")
     
     const bodyModal                    = document.createElement("div")
     const h2Nome                       = document.createElement("h2")
     const inputNome                    = document.createElement("input")
     const h2Horario                    = document.createElement("h2")
     const inputHorario                 = document.createElement("input")
     const h2Descricao                  = document.createElement("h2")
     const inputDescricao               = document.createElement("input")
     const h2Setor                      = document.createElement("label")
     const inputSetor                   = document.createElement("select")
     const divButtonCadastrar           = document.createElement("div")
     const buttonCadastrarEmpresa       = document.createElement("button")

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
     const main               = document.querySelector(".main")
     const divModal           = document.createElement("div")
     const modal              = document.createElement("div")
     const fade               = document.createElement("div")
     const nomeEmpresa        = document.createElement("h1")

     nomeEmpresa.innerText    = element.name
     nomeEmpresa.classList    = "nomeEmpresa"

     fade.addEventListener("click", event=>{

          event.preventDefault()
          
          if(event.target === fade){
               divModal.remove(fade, modal)
          }

     })
     
     divModal.classList         = "divModal"
     modal.classList            = "modal_empresas"
     fade.classList             = "fade_empresas"
     
     const buttonDepartamentos          = document.createElement("button")
     const buttonCriarDepartamentos     = document.createElement("button")

     buttonDepartamentos.addEventListener("click", event=>{

          event.preventDefault()

          divModal.innerHTML = "" 

          this.departamentoModal(element, element.uuid)

     })

     buttonCriarDepartamentos.addEventListener("click", event =>{

          event.preventDefault()

          divModal.innerHTML = ""

          this.criarModalDepartamentoSelect(element)

     })

     buttonDepartamentos.innerText           = "Departamentos"
     buttonCriarDepartamentos.innerText      = "Criar departamento"

     buttonDepartamentos.classList           = "modal_empresas_button_departamentos"
     buttonCriarDepartamentos.classList      = "modal_empresas_button_criarDepartamentos"

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

     static async departamentoModal(element){
     
     const divModal                     = document.querySelector(".divModal")
     const modal                        = document.createElement("div")
     const fade                         =  document.createElement("div")
     const labelFuncionario             = document.createElement("label")
     const selectFuncuinario            = document.createElement("select")
     const buttonDepartamento           = document.createElement("button")

     modal.classList                    = "modal_funcionario"
     fade.classList                     = "fade_funcionario"
     divModal.classList                 = "divModal"
     buttonDepartamento.innerText       = "Ver departamento"
     buttonDepartamento.classList       = "button_departamento"
     labelFuncionario.for               = "contract"
     labelFuncionario.innerText         = "Departamentos"
     selectFuncuinario.name             = "contract"
     selectFuncuinario.id               = "contract"
     selectFuncuinario.required         = true 

     modal.append(labelFuncionario, selectFuncuinario, buttonDepartamento)
     divModal.append(modal, fade)

     const departamentos = await this.listarTodosDepartamentosApi(element.uuid);
     
     if(departamentos.length === 0){

          const nenhumDepartamento = document.createElement("option")
   
          nenhumDepartamento.innerHTML = "Nenhum departamento encontrado"
               
          selectFuncuinario.appendChild(nenhumDepartamento);
               
          buttonDepartamento.disabled = true

     }else{

          departamentos.forEach(element => {
               
               const option = document.createElement("option");

               option.innerHTML = element.name
               
               option.classList = element.description
               
               selectFuncuinario.appendChild(option);

          })
     } 

     buttonDepartamento.addEventListener("click", event=>{

          event.preventDefault()

          divModal.innerHTML = ""

          this.departamentoSelecionadoModal(selectFuncuinario.value, element.uuid, departamentos)

     })

     fade.addEventListener("click", event=>{

          event.preventDefault()

          if(event.target === fade){
               divModal.remove(fade, modal)
          }

     })

     }

     static async departamentoSelecionadoModal(elemento, uuid, departamentoUuid){
     const divModal                     = document.querySelector(".divModal")  
     const modal1                       = document.createElement("div")
     const fade1                        =  document.createElement("div")
     const h1Nome                       = document.createElement("h1")
     const h2Descricao                  = document.createElement("h2")
     const labelFuncionario             = document.createElement("label")
     const selectFuncuinario            = document.createElement("select")
     const buttonContratar              = document.createElement("button")
     const buttonDemitir                = document.createElement("button")
     const buttonEditarDepartamento     = document.createElement("button")
     const buttonDeletarDepartamento    = document.createElement("button")

     h1Nome.innerText                        = `Departamento: ${elemento}`
     modal1.classList                        = "modal_departamentoSelecionado"
     fade1.classList                         = "fade_departamentoSelecionado"
     buttonContratar.innerText               = "Contratar"
     buttonContratar.classList               = "buttonContratar"
     buttonEditarDepartamento.innerText      = "Editar departamento"
     buttonEditarDepartamento.classList      = "buttonEditarDepartamento"
     buttonDeletarDepartamento.innerText     = "Deletar departamento"
     buttonDeletarDepartamento.classList     = "buttonDeletarDepartamento"
     buttonDemitir.innerText                 = "Demitir funcionário"
     buttonDemitir.classList                 = "buttonDemitir"
     labelFuncionario.for                    = "contract"
     labelFuncionario.innerText              = "Funcionarios:"
     selectFuncuinario.name                  = "contract"
     selectFuncuinario.id                    = "contract1"
     selectFuncuinario.required              = true

     buttonContratar.addEventListener("click", event=>{

          event.preventDefault()

          this.buttonContratar(elemento, departamentoUuid)

     })  

     buttonEditarDepartamento.addEventListener("click", event=>{

          event.preventDefault()

          divModal.innerHTML = ""

          const divModal1          = document.querySelector(".divModal")
          const modal1             = document.createElement("div")
          const fade1              =  document.createElement("div")
          const h1                 = document.createElement("h1")
          const inputEditar        = document.createElement("input")
          const buttonEditar       = document.createElement("button")

          modal1.classList         = "modal_editarDepartamento"
          fade1.classList          = "fade_editarDepartamento"
          h1.innerText             = "Editar"
          inputEditar.classList    = "inputEditar"
          inputEditar.placeholder  = "Digite a nova descrição aqui"
          buttonEditar.innerText   = "Editar"
          buttonEditar.classList   = "buttonEditar"

          modal1.append(h1, inputEditar, buttonEditar)
          divModal1.append(modal1, fade1)

          buttonEditar.addEventListener("click", ev=>{

               ev.preventDefault()

               departamentoUuid.forEach(e =>{

                    if(e.name === elemento){
                         const uuidD = e.uuid
                         const body = {
                              description: inputEditar.value
                         }                        
                         this.buttonEditarDepartamento(body, uuidD)
                         window.alert("Departamento editado com sucesso!!!")
                         divModal1.innerHTML = ""
                    }

               })          
          })
          
     })

     buttonDeletarDepartamento.addEventListener("click", event=>{

          event.preventDefault()

          divModal.innerHTML = ""

          const divModal2          = document.querySelector(".divModal")
          const modal2             = document.createElement("div")
          const fade2              =  document.createElement("div")
          const h1                 = document.createElement("h1")
          const buttonDeletar       = document.createElement("button")

          modal2.classList         = "modal_editarDepartamento"
          fade2.classList          = "fade_editarDepartamento"
          h1.innerText             = "Deseja mesmo deletar esse departamento?"
          buttonDeletar.innerText   = "Deletar"
          buttonDeletar.classList   = "buttonDeletar"

          modal2.append(h1, buttonDeletar)
          divModal2.append(modal2, fade2)

          fade2.addEventListener("click", evt =>{
               evt.preventDefault()
               divModal2.innerHTML = ""
          })

          buttonDeletar.addEventListener("click", ev=>{

               ev.preventDefault()

               departamentoUuid.forEach(e =>{

                    if(e.name === elemento){
                         const uuidD = e.uuid
                         this.buttonDeletarDepartamento(uuidD)
                         window.alert("Departamento apagado com sucesso!!!")
                         divModal2.innerHTML = ""
                    }

               })

          })

     })

     let uuidSelect = -1

     const departamentos = await this.listarTodosDepartamentosApi(uuid);

     departamentos.forEach(element =>{

          if(elemento === element.name){
               uuidSelect = element.uuid
               h2Descricao.innerText = `Descrição: ${element.description}`
          }

     })

     let temFuncionario = 0

     const funcionariosContratados = await this.listarTodosUsersApi()

     funcionariosContratados.forEach(funcio =>{
          
          if(funcio.department_uuid === uuidSelect){
               const nenhumFuncionario = document.createElement("option")
               nenhumFuncionario.innerHTML = funcio.username
               temFuncionario ++
               selectFuncuinario.appendChild(nenhumFuncionario);
          }

          buttonDemitir.addEventListener("click", async event=>{

               event.preventDefault()

               if(funcio.username.includes(selectFuncuinario.value)){

                    this.buttonDemitirApi(funcio.uuid)
                    window.alert("Funcionário demitido com sucesso!!!")
                    divModal.remove(fade1, modal1)

               }
          })
     })
     
     if(temFuncionario == 0){

          const nenhumFuncionario = document.createElement("option")
          nenhumFuncionario.innerHTML = "Nenhum funcionário encontrado"
          selectFuncuinario.appendChild(nenhumFuncionario);
          buttonDemitir.style.display = "none"

     }

     fade1.addEventListener("click", event=>{
          event.preventDefault()

          if(event.target === fade1){
               divModal.remove(fade1, modal1)
          }

     })

     modal1.append(h1Nome, h2Descricao, labelFuncionario, selectFuncuinario, buttonContratar, buttonDemitir, buttonEditarDepartamento ,buttonDeletarDepartamento)
     divModal.append(modal1, fade1)
     }

     static async criarModalDepartamentoSelect(element){
     const divModal                     = document.querySelector(".divModal")
     const h1CriarDepartamento          = document.createElement("h1")
     const modal                        = document.createElement("div")
     const fade                         =  document.createElement("div")
     const h2Nome                       = document.createElement("h2")
     const inputNome                    = document.createElement("input")
     const h2Descricao                  = document.createElement("h2")
     const inputDescricao               = document.createElement("input")
     const buttonCriarDepartamento      = document.createElement("button")

     h2Nome.innerText                   = "Nome"
     inputNome.placeholder              = "Digite o nome do departamento"
     h2Descricao.innerText              = "Descrição"
     inputDescricao.placeholder         = "Digite a descrição do departamento"
     buttonCriarDepartamento.innerText  = "criar"
     buttonCriarDepartamento.classList  = "buttonCriarDepartamento"
     h1CriarDepartamento.classList      = "criarDepartamento"
     h1CriarDepartamento.innerText      = `${element.name} Criar departamento`
     h2Nome.classList                   = "h2Nome"
     inputNome.classList                = "inputNome"
     inputNome.required                 = true
     h2Descricao.classList              = "h2Descricao"
     inputDescricao.classList           = "inputDescricao"
     inputDescricao.required            = true
     modal.classList                    = "modal_departamento"
     fade.classList                     = "fade_departamento"

     fade.addEventListener("click", event=>{

          event.preventDefault()

          if(event.target === fade){
               divModal.remove(fade, modal)
          }
     })

     modal.append(h1CriarDepartamento, h2Nome, inputNome, h2Descricao, inputDescricao, buttonCriarDepartamento)
     divModal.append(modal, fade)
     
     buttonCriarDepartamento.addEventListener("click", async event=>{

          const criarDepartamento = {
               name: inputNome.value,
               description: inputDescricao.value,
               company_uuid: element.uuid
          }

          event.preventDefault()

          this.criarDepartamentoApi(criarDepartamento)

          divModal.remove(fade, modal)

          window.alert("Departamento criado com sucesso!!!")

     })  
     }

     static async criarDepartamentoApi(body){
          const criandoDepartamento = await fetch("http://localhost:6278/departments", {
               method: "POST",
               headers: this.headers,
               body: JSON.stringify(body)})
               .then(res => res.json())
               .then(res => {return res})
               .catch(err => console.log(err))

          return criandoDepartamento
     }

     static async buttonContratar(elemento, departamentoUuid){
          const divModal                 = document.querySelector(".divModal")
          const modal                    = document.createElement("div")
          const fade                     = document.createElement("div")
          const label                    = document.createElement("label")
          const selectUsers              = document.createElement("select")
          const buttonSelecionarUsers    = document.createElement("button")
          const buttonContratarUser      = document.createElement("button")
          const nomeUser                 = document.createElement("h2")
          const nivelPro                 = document.createElement("h2")
          const type_work                = document.createElement("h2")

          nomeUser.innerText             = `Nome:`
          nivelPro.innerText             = `Nivel Profissional:`
          type_work.innerText            = `modalidade de trabalho:`
          
          departamentoUuid.forEach(element =>{

               if(elemento === element.name){

                    const departUuid = element.uuid
                    window.localStorage.setItem("dpUuid", departUuid)

               }

          })

          const users = await this.listarTodosUsersApi()

          users.forEach(element =>{

               if(element.department_uuid != window.localStorage.getItem("dpUuid")){

                    const option = document.createElement("option")
                    option.innerText = element.username
                    selectUsers.appendChild(option)

               }
               
               buttonSelecionarUsers.addEventListener("click", event=>{
                    event.preventDefault()
                    
                    if(element.username === selectUsers.value){
                         
                         nomeUser.innerText  = `Nome: ${selectUsers.value}`
                         nivelPro.innerText  = `Nivel Profissional: ${element.professional_level}`
                         type_work.innerText = `modalidade de trabalho: ${element.kind_of_work}`
                         
                         buttonContratarUser.onclick = async (e) =>{
                              
                              e.preventDefault()

                              const userContratar = {
                                   user_uuid: element.uuid,
                                   department_uuid: window.localStorage.getItem("dpUuid")
                              }

                              this.contratarApi(userContratar)

                              window.alert("Funcionário Contratado com sucesso!!!")
                              divModal.remove(fade, modal)

                         }
                    }
               })
          })
          fade.addEventListener("click", event=>{

               event.preventDefault()

               if(event.target === fade){
                    divModal.remove(fade, modal)
               }

          })

          modal.classList                    = "modal_contratar"
          fade.classList                     = "fade_contratar"
          label.for                          = "contract"
          label.innerText                    = "Pessoas para contratar:"
          selectUsers.name                   = "contract"
          selectUsers.id                     = "contract1"
          selectUsers.required               = true
          buttonSelecionarUsers.innerText    = "Selecionar usuário"
          buttonSelecionarUsers.classList    = "buttonSelecionarUsers"
          buttonContratarUser.innerText      = "Contratar"
          buttonContratarUser.classList      = "buttonContratarUser"

          modal.append(label, selectUsers, buttonSelecionarUsers, nomeUser, nivelPro, type_work, buttonContratarUser)
          divModal.append(modal, fade)

     }

     static async contratarApi(body){
          
          const user = await fetch("http://localhost:6278/departments/hire/", {
               method: "PATCH",
               headers: {"Content-Type": "application/json", Authorization: `Bearer ${this.token}`},
               body: JSON.stringify(body)})
               .then(res => res.json())
               .then(res => console.log(res))
               .catch(err => console.log(err))

          return user
          
     }

     static async buttonDemitirApi(uuid){
          const userDimiss = await fetch(`http://localhost:6278/departments/dismiss/${uuid}`,{
               method:"PATCH",
               headers: {Authorization: `Bearer ${this.token}`}})
               .then(res => res.json())
               .then(res => console.log(res))

          return userDimiss
     }

     static async buttonEditarDepartamento(body, uuidDepartament){
          const editarDepartamento = await fetch(`http://localhost:6278/departments/${uuidDepartament}`, {
               method: "PATCH",
               headers: this.headers,
               body: JSON.stringify(body)})
               .then(res => res.json())
               .then(res => {return res})
               .catch(err => console.log(err))

          return editarDepartamento
     }

     static async buttonDeletarDepartamento(dppUuid){
          const deletarDepartamento = await fetch(`http://localhost:6278/departments/${dppUuid}`, {
               method: "DELETE",
               headers: {Authorization: `Bearer ${this.token}`}})
               .then(response => console.log(response))
               .catch(err => console.error(err));

          return deletarDepartamento
     }
}

DashBoardAdmin.setoresApi()
DashBoardAdmin.criandoSetor()
DashBoardAdmin.criandoPaginaEmpresas()
DashBoardAdmin.clickSair()

