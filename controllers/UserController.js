class UserController{
    constructor(formId, tableId){
        this.formEl = document.getElementById(formId)
        this.tableEl = document.getElementById(tableId)

        this.onSubmit()
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

        //elements substitui o fields (prop do objeto de form)
        [...this.formEl.elements].forEach(function(field, index){
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
        return new User(
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email, 
            user.password, 
            user.photo, 
            user.admin
        )
    }

    addLine(dataUser){

        let tr = document.createElement('tr')
        tr.innerHTML = `
                <tr>
                    <td><img src="${dataUser.photo}" class="img-circle img-sm"></td>
                    <td>${dataUser.name}</td>
                    <td>${dataUser.email}</td>
                    <td>${(dataUser.admin) ?'Sim':'Não'}</td>
                    <td>${dataUser.register.getDate()}/${dataUser.register.getMonth()+1}/${dataUser.register.getFullYear()}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                    </td>
                </tr>`
        this.tableEl.appendChild(tr)
    }
}