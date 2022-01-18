class UserController{
    constructor(formId, tableId){
        this.formEl = document.getElementById(formId)
        this.tableEl = document.getElementById(tableId)

        this.onSubmit()
        this.onEdit()
    }
    
    onEdit(){
        //Botão Cancelar
        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e=>{
        
            this.showPanelUpdate()
        })
    }

    //Quando enviar
    onSubmit(){
        this.formEl.addEventListener("submit", event =>{//arrowFunction evita conflito de escopo do this.getValues()
            //event pega todas as informações sobre o evento chamado
            event.preventDefault() //cancela a atualização de página do submit 

            //trava o botão para não enviar o mesmo usuario varias vezes
            let btn = this.formEl.querySelector("[type=submit]")
            btn.disabled = true

            let values = this.getValues()

            //se value for falso, cancela o envio do form
            if(!values) return false //corrige o problema da foto ser entendida como booleano por conta do isValid

            this.getPhoto().then(
                (content)=>{
                //quando der certo
                values.photo = content
                this.addLine(values) 
                
                //limpa o form e ativa o botão
                this.formEl.reset()
                btn.disabled = false

            }, (e)=>{
                //quando der erro
                console.error(e)
            })
        })
    }

    getPhoto(){
        return new Promise((resolve, reject)=>{
            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item =>{
                if (item.name === 'photo'){//filter retorna apenas as fotos e retorna o arquivo
                    return item
                }
            })
            let file = elements[0].files[0]//da 1º coleção de elementos, pegue o 1º arquivo

            //quando terminar a leitura da imagem
            fileReader.onload = () =>{
                
                resolve(fileReader.result)
            }
            fileReader.onerror = (e)=>{
                reject(e)
            }
            //se tem um arquivo, renderiza
            if(file){
                fileReader.readAsDataURL(file) 
            //se não, renderiza img padrão
            }else{
                resolve('dist/img/boxed-bg.jpg')//resolve para que o envio de arquivo não seja obrigatório
            }
        })
        
    }

    getValues(){

        let user = {};
        let isValid = true;

        //elements substitui o fields (prop do objeto de form)
        [...this.formEl.elements].forEach(function(field, index){

            //se o indexOf do array é > -1, ou seja, encontrou os campos E eles não estão vazios
            if(['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value){
    
                field.parentElement.classList.add('has-error')//acessa o elemento pai, pega a coleção de classes, add +1 classe 'has-error'

                isValid = false //form não tá válido
            }

            if(field.name == 'gender'){
                if(field.checked){ //(field.checked === true)
                    user[field.name] = field.value
                }
            }else if(field.name == 'admin'){
                user[field.name] = field.checked
            }else{
                user[field.name] = field.value
            }
        })
        //form continua válido?
        if(!isValid){
            return false
        }
        return new User(
            user.name, 
            user.email, 
            user.gender, 
            user.birth, 
            user.country, 
            user.password, 
            user.photo, 
            user.admin
        )
    }

    addLine(dataUser){

        let tr = document.createElement('tr')

        tr.dataset.user = JSON.stringify(dataUser) //serialização

        tr.innerHTML = `
                <tr>
                    <td><img src="${dataUser.photo}" class="img-circle img-sm"></td>
                    <td>${dataUser.name}</td>
                    <td>${dataUser.email}</td>
                    <td>${(dataUser.admin) ?'Sim':'Não'}</td>
                    <td>${Utils.dateFormat(dataUser.register)}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                    </td>
                </tr>`
        
        //Editar usuário
        tr.querySelector(".btn-edit").addEventListener('click', e=>{
            
            let json = JSON.parse(tr.dataset.user)
            let form = document.querySelector('#form-user-update')
            //Percorre cada campo que tenha como nome a propriedade do json 
            for(let name in json){
                let field = form.querySelector("[name= "+ name.replace("_", "") +"]")

                if(field){ //o campo existe?

                    switch(field.type){ //analisa o tipo dos campos
                        case 'file':
                            continue;
                            break; //se for file, apenas continue e não faça nada
                        
                        case 'radio':
                            //localiza se o value é M ou F
                            field = form.querySelector("[name= "+ name.replace("_", "") +"][value="+json[name]+"]")
                            field.checked = true
                            break; 

                        case 'checkbox':
                            //se for checkbox, pega o name checkado
                            field.checked = json[name]
                            break;

                        default:
                            field.value = json[name]
                    }
                }               
            }

            this.showPanelUpdate()
            
        })

        this.tableEl.appendChild(tr)

        this.updateCount()
    }

    showPanelCreate(){
        document.querySelector("#box-user-create").style.display = "block"
        document.querySelector("#box-user-update").style.display = "none"
    }
    showPanelUpdate(){
        document.querySelector("#box-user-create").style.display = "none"
        document.querySelector("#box-user-update").style.display = "block"
    }

    //Atualiza a quantidade de usuários
    updateCount(){
        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr=>{

            numberUsers++ //incrementa mais um para cada elemento encontrado

            let user = JSON.parse(tr.dataset.user) //converte para objeto denovo

            if(user._admin) numberAdmin++ //a conversão de json não continua a instância de admin, por isso devemos chamar ele novamente com underline
        })
        //renderiza o resultado
        document.querySelector("#number-users").innerHTML = numberUsers
        document.querySelector("#number-users-admin").innerHTML = numberAdmin
    }
}