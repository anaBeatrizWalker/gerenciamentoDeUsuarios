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

            let values = this.getValues()

            this.getPhoto().then(
                (content)=>{
                //quando der certo
                values.photo = content
                this.addLine(values) 

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
            fileReader.readAsDataURL(file)
        })
        
    }

    getValues(){

        let user = {};

        //elements substitui o fields (prop do objeto de form)
        [...this.formEl.elements].forEach(function(field, index){
            if(field.name == 'gender'){
                if(field.checked){ //(field.checkend === true)
                    user[field.name] = field.value
                }
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

        this.tableEl.innerHTML = `
                <tr>
                    <td><img src="${dataUser.photo}" class="img-circle img-sm"></td>
                    <td>${dataUser.name}</td>
                    <td>${dataUser.email}</td>
                    <td>${dataUser.admin}</td>
                    <td>${dataUser.birth}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                    </td>
                </tr>`
    }
}