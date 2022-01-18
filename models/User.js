//Toda classe começa com letra maiúscula
class User{  
    constructor(name, email, gender, birth, country, password, photo, admin){
        //this.atributo = variável do parâmetro
        //Inicializando os valores para serem usados em métodos dentro da classe
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
}