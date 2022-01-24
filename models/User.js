//Toda classe começa com letra maiúscula
class User{  
    constructor(name, email, gender, birth, country, password, photo, admin){
        //this.atributo = variável do parâmetro
        //Inicializando os valores para serem usados em métodos dentro da classe
        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date()
    }
    //Métodos que retornam a propriedade corretamente

    get id(){
        return this._id
    }

    get register(){
        return this._register
    }

    get name(){
        return this._name
    }

    get email(){
        return this._email
    }

    get gender(){
        return this._gender
    }

    get birth(){
        return this._birth
    }

    get country(){
        return this._country
    }

    get password(){
        return this._password
    }

    get photo(){
        return this._photo
    }

    get admin(){
        return this._admin
    } 
    
    //Método de alterar a propriedade corretamente
    set photo(value){
        this._photo = value
    }

    loadFromJSON(json){
        for(let name in json){ //pra cada name que encontrar no json
            switch(name){
                case '_register': //convertendo a data para um objeto
                    this[name] = new Date(json[name])
                break;

                default:
                    this[name] = json[name]
            }
        }
    }
    
    static getUsersStorage(){
        let users = []
        //se tem algo no localStorage
        if(localStorage.getItem("user")){
            //sobrescreve
            users = JSON.parse(localStorage.getItem("user"))
        }
        return users
    }

    //Cria um id, para registrar unicamente cada usuário
    getNewId(){

        if(!window.id) window.id = 0

        id++

        return id
    }
    
    save(){
        let users = User.getUsersStorage()

        //se o id existe
        if(this.id > 0){
            //editar o usuário
            users.map(u => {

                if(u._id == this.id){ //se o id for igual ao id do usuário a ser editado pega o objeto do usuário e substitui o que tiver que substituir
                    
                    Object.assign(u, this) //compara os dois e "atualiza" como o que veio do this 
                }
                return u
            })

        } else{
            //se não existe, gera um novo
            this._id = this.getNewId()

            users.push(this)
        }
        localStorage.setItem("user", JSON.stringify(users))
    }
}