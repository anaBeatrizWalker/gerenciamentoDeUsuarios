class UserController{
    constructor(formId, tableId){
        this.formEl = document.getElementById(formId)
        this.tableEl = document.getElementById(tableId)
    }

    //Quando enviar
    onSubmit(){
        this.formEl.addEventListener("submit", event =>{//arrowFunction evita conflito de escopo do this.getValues()
            //event pega todas as informações sobre o evento chamado
            event.preventDefault() //cancela a atualização de página do submit
        
            let user = this.getValues()

            this.addLine(user)    
        })
    }

    getValues(){

        let user = {}

        //elements substitui o fields (prop do objeto de form)
        let elem = [...this.formEl.elements]
        elem.forEach(function(field, index){
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
                    <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
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